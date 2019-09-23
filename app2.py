from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import pymongo, json, time 
import jwt
from functools import wraps
import datetime
import bcrypt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'DonaldTrump'
CORS(app)
client = MongoClient('mongodb://localhost:27017')
db = client['houseplan']

def token_required(f):
	@wraps(f)
	def decorated():
		pass
	pass


@app.route('/materials/<string:start>/<string:end>/<string:category>', methods=['GET'])
def getMaterials(start,end,category):
	collections = db['materials']
	result = []
	slicer = slice(1)
	last = {}
	if int(category) == 1000:
		for item in collections.find({},{"data.images" : 1, "data.category" : 1, "data.code" : 1, "data.dateCreated" : 1, "data.name" : 1, }).skip(int(start)).limit(int(end)):
			result.append({str(item['_id']) : item['data']}) 

	else:
		for item in collections.find({"data.category" : int(category)},{"data.images" : 1, "data.category" : 1, "data.code" : 1, "data.dateCreated" : 1, "data.name" : 1, }).skip(int(start)).limit(int(end)):
			result.append({str(item['_id']) : item['data']})
		#as

	for x in range(len(result)):	
		idIndex = str(list(result[x])[0])
		firstImage = result[x][idIndex]['images'][0]
		del result[x][idIndex]['images']
		result[x][idIndex].update({'images' : firstImage})
		#optionObject = result[x][idIndex]['options']
		#firstValue = list(optionObject)[0]
		#price = result[x][idIndex]['options'][firstValue]['price']
		#del result[x][idIndex]['options']
		#result[x][idIndex].update({'price' : price})		
		for item in result:
			last.update(item)
		return jsonify(last)
                                                            


@app.route('/materials/mini', methods=['GET'])
def getMiniMaterials():
	collection = db['materials']
	if request.method == 'GET':
		obj = {}
		for item in collection.find({},{"data.images" : 0, "data.blocks" : 0, "data.category" : 0, "data.code" : 0}):
			obj.update({ str(item['_id']) : item['data'] })
		return jsonify(obj)
	else:
		return 'Nothing'

@app.route('/materials', methods=['POST'])
def addMaterial():
	collection = db['materials']
	data = request.json
	data['data'].update({'dateCreated' : round(time.time())})
	_id = collection.insert_one(data)
	return str(_id.inserted_id)

@app.route('/materials/<string:data>', methods=['GET'])
def getParamsMaterials(data):
	collections = db['materials']
	result = {}
	parameterID = data
	for info in collections.find():
		if str(info[('_id')]) == parameterID:
			result.update(info['data'])
	return jsonify(result)

@app.route('/materials/delete/<string:param>', methods=['DELETE'])
def deleteMaterial(param):
	collections = db['materials']
	result = collections.delete_one({'_id' : ObjectId(param)})
	return jsonify(result.acknowledged)

@app.route('/materials/<string:updateID>', methods=['PUT'])
def updateMaterial(updateID):
	collections = db['materials']
	dataUpdates = request.json
	result = collections.update_one({'_id' : ObjectId(updateID)},{"$set" : dataUpdates})
	return jsonify(result.raw_result['updatedExisting'])

@app.route('/houses', methods=['POST','GET'])
def plan():
	collections = db['houses']
	if request.method == 'POST':
		data = request.json
		data['data'].update({'dateCreated' : round(time.time())})
		_id = collections.insert_one(data)
		return str(_id.inserted_id)
	elif request.method == 'GET':
		collectionMaterial = db['materials']
		result = {}
		houseIds = []
		for houseInfo in collections.find({},{"data.materials.option" : 0, "data.materials.quantity" : 0}):
			result.update({str(houseInfo['_id']) : houseInfo['data']})
			houseIds.append(str(houseInfo['_id']))
		last = []
		for x in range(len(houseIds)):
			ID = houseIds[x]
			materials = result[houseIds[x]]['materials']
			last.append(materials)
		for x in range(len(last)):
			for i in range(len(last[x])):
				materialsIds = last[x][i]['value']
				materialQuery = [data for data in collectionMaterial.find({'_id' : ObjectId(materialsIds)},{"data.images" : 1, "data.name" : 1})][0]
				materialData = materialQuery['data']
				materialId = str(materialQuery['_id'])
				firstImage = materialData['images'][0]
				del materialData['images']
				materialData.update({'images' : firstImage})
				result[houseIds[x]]['materials'][i].update({materialId : materialData})
				del result[houseIds[x]]['materials'][i]['value']
		return jsonify(result)

@app.route('/houses/delete/<string:param>', methods=['DELETE'])
def deleteHouse(param):
    collections = db['houses']
    result = collections.delete_one({'_id' : ObjectId(param)})
    return jsonify(result.acknowledged)


@app.route('/houses/<string:updateID>', methods=['PUT'])
def updateHouses(updateID):
	collections = db['houses']
	dataUpdates = request.json
	result = collections.update_one({'_id' : ObjectId(updateID)},{"$set" : dataUpdates})
	return jsonify(result.raw_result['updatedExisting'])

@app.route('/housesraw/<string:data>', methods=['GET'])
def getParamsHousesRaw(data):
    collections = db['houses']
    result = {}
    parameterID = data
    for info in collections.find():
        if str(info[('_id')]) == parameterID:
            result.update(info['data'])
    return jsonify(result)


@app.route('/houses/<string:ID>', methods=['GET'])
def getHouseDataFixed(ID):
		buri = ID
		collections = db['houses']
		collectionMaterial = db['materials']
		result = {}
		houseIds = []
		for houseInfo in collections.find({},{"data.materials.option" : 0, "data.materials.quantity" : 0}):
			result.update({str(houseInfo['_id']) : houseInfo['data']})
			houseIds.append(str(houseInfo['_id']))
		last = []
		end = []
		for x in range(len(houseIds)):
			ID = houseIds[x]
			materials = result[houseIds[x]]['materials']
			last.append(materials)
			offers = result[houseIds[x]]['offers']
			end.append(offers)

		for x in range(len(last)):
			for i in range(len(last[x])):
				materialsIds = last[x][i]['value']
				materialQuery = [data for data in collectionMaterial.find({'_id' : ObjectId(materialsIds)},{"data.images" : 1, "data.name" : 1})][0]
				materialData = materialQuery['data']
				materialId = str(materialQuery['_id'])
				firstImage = materialData['images'][0]
				del materialData['images']
				materialData.update({'images' : firstImage})
				result[houseIds[x]]['materials'][i].update({materialId : materialData})
				del result[houseIds[x]]['materials'][i]['value']
		return jsonify(result[buri])

@app.route('/turshilt', methods=['GET','POST'])
def turshilt():
	db = client['testDatabase'] 
	collections = db['test']
	if request.method == 'POST':
		result = {}
		for data in collections.find():
			result.update({str(data['_id']) : data['data']})
		_id = collections.insert_one(result)
		return str(_id.inserted_id)
	elif request.method == 'GET':
		return '<h1>Data will be inserted here!</h1>'

@app.route('/houses/mini', methods=['GET','POST'])
def houseMiniData():
	collections = db['houses']
	if request.method == 'GET':
		result = []
		slicer = slice(1)
		for info in collections.find({},{"data.activities" : 0, "data.blocks" : 0, "data.materials" : 0}):
			result.append({ str(info['_id']) : info['data'] })
		for x in range(len(result)):
			idIndex = str(list(result[x])[0])
			firstImage = result[x][idIndex]['images'][0]
			del result[x][idIndex]['images']
			result[x][idIndex].update({'image' : firstImage})
		last = {}
		for item in result:
			last.update(item)
		return jsonify(last)
	elif request.method == 'POST':
		result = []
		slicer = slice(1)
		for info in collections.find({},{"data.activities" : 0, "data.blocks" : 0, "data.materials" : 0}):
			result.append({ str(info['_id']) : info['data'] })
		for x in range(len(result)):
			idIndex = str(list(result[x])[0])
			firstImage = result[x][idIndex]['images'][0]
			del result[x][idIndex]['images']
			result[x][idIndex].update({'image' : firstImage})
		last = {}
		for item in result:
			last.update(item)
		return jsonify(last)


@app.route('/companies', methods=['POST','GET'])
def addCompany():
	collections = db['companies']
	if request.method == 'POST':
		data = request.json
		data['data'].update( {'dateCreated' : round(time.time()) })
		_id = collections.insert_one(data)
		return str(_id.inserted_id)
	elif request.method == 'GET':
		result = {}
		for info in collections.find({},{"data.activities" : 1,"data.name" : 1, "data.membership" : 1, "data.phone" : 1, "data.email" : 1, "data.logo" : 1}):
			result.update({str(info['_id']) : info['data']})
		return jsonify(result)

@app.route('/companies/mini', methods=['GET'])
def companyMini():
	result = {}
	collections = db['companies']
	for info in collections.find({},{"data.activities" : 1, "data.membership" : 1, "data.name" : 1}):
		result.update({str(info['_id']) : info['data']})
	return jsonify(result)

@app.route('/companies/<string:updateID>', methods=['PUT'])
def updateCompany(updateID):
	collections = db['companies']
	if request.method == 'PUT':
			dataUpdates = request.json
			result = collections.update_one({'_id' : ObjectId(updateID)},{"$set" : dataUpdates})
			return jsonify(result.raw_result['updatedExisting'])

@app.route('/companies/<string:ID>', methods=['DELETE'])
def deleteCompany(ID):
	collections = db['companies']
	result = collections.delete_one({'_id' : ObjectId(ID)})
	return jsonify(result.deleted_count)

@app.route('/companies/<string:ID>', methods=['GET'])
def getCompanyByParam(ID):
	collections = db['companies']
	result = collections.find_one({"_id" : ObjectId(ID)})
	del result['_id']
	return jsonify(result['data'])

@app.route('/posts', methods=['POST'])
def addPost():
    collection = db['posts']
    data = request.json
    data['data'].update({'dateCreated' : round(time.time())})
    _id = collection.insert_one(data)
    return str(_id.inserted_id)

@app.route('/posts/<string:data>', methods=['GET'])
def getParamsPost(data):
    collections = db['posts']
    result = {}
    parameterID = data
    for info in collections.find():
        if str(info[('_id')]) == parameterID:
            result.update(info['data'])
    return jsonify(result)

@app.route('/posts/<string:start>/<string:end>', methods=['GET'])
def getPosts(start,end):
    collection = db['posts']
    obj = {}
    for item in collection.find({},{"data.version": 0, "data.category" : 0, "data.blocks" : {"$slice" : [0,3]} }).skip(int(start)).limit(int(end)):
        obj.update({ str(item['_id']) : item['data']})
    return jsonify(obj)

@app.route('/posts/delete/<string:param>', methods=['DELETE'])
def deletePost(param):
    collections = db['posts']
    result = collections.delete_one({'_id' : ObjectId(param)})
    return jsonify(result.acknowledged)

@app.route('/posts/<string:updateID>', methods=['PUT'])
def updatePosts(updateID):
    collections = db['posts']
    dataUpdates = request.json
    result = collections.update_one({'_id' : ObjectId(updateID)},{"$set" : dataUpdates})
    return jsonify(result.raw_result['updatedExisting'])

@app.route('/companies/<int:startingIndex>/<int:endingIndex>/<int:category>')
def comQry(startingIndex, endingIndex, category):
    collections = db['companies']
    result = {}
    if category != 1000 :
        for document in collections.find({
		    "data.activities" : category},
            {
                "data.activities" : 1,
                "data.logo" : 1,
                "data.membership" : 1,
                "data.name" : 1,
                "data.phone" : 1
            }).skip(startingIndex).limit(endingIndex):
            result.update({str(document['_id']) : document['data']})
    else:
        for document in collections.find({},
            {
                "data.activities" : 1,
                "data.logo" : 1,
                "data.membership" : 1,
                "data.name" : 1,
                "data.phone" : 1
            }).skip(startingIndex).limit(endingIndex):
            result.update({str(document['_id']) : document['data']})
    return jsonify(result)

@app.route('/houses/filter/<int:start>/<int:end>', methods=['POST'])
def filter_house(start, end):
    collection = db['houses']
    query_data = request.json
    result = {}
    if query_data['material'] == '':
        for item in collection.find({'$and':[
            {'data.area': {'$gte': int(query_data['area'][0])} },
       	    {'data.area': {'$lte': int(query_data['area'][-1])} },
       	    {'data.rooms': {'$gte': int(query_data['room'][0])} },
       	    {'data.rooms': {'$lte': int(query_data['room'][-1])} },
       	    {'data.floors': {'$gte': int(query_data['floor'][0])} },
       	    {'data.floors': {'$lte': int(query_data['floor'][-1])} },
       	    {'data.price': {'$gte': int(query_data['price'][0])*1000000} },
       	   	{'data.price': {'$lte': int(query_data['price'][-1])*1000000} },
       	    ]},
            {"data.activities" : 0, "data.blocks" : 0, "data.materials" : 0, "data.images" : {"$slice" : [0,1]}}
            ).skip(start).limit(end):
            result.update({str(item['_id']) : item['data']})
    else:
       for item in collection.find({'$and':[
            {'data.area': {'$gte': int(query_data['area'][0])} },
            {'data.area': {'$lte': int(query_data['area'][-1])} },
            {'data.rooms': {'$gte': int(query_data['room'][0])} },
            {'data.rooms': {'$lte': int(query_data['room'][-1])} },
            {'data.floors': {'$gte': int(query_data['floor'][0])} },
            {'data.floors': {'$lte': int(query_data['floor'][-1])} },
            {'data.price': {'$gte': int(query_data['price'][0])*1000000} },
            {'data.price': {'$lte': int(query_data['price'][-1])*1000000} },
            {'data.builtWith': int(query_data['material'])},
            ]},
            {"data.activities" : 0, "data.blocks" : 0, "data.materials" : 0, "data.images" : {"$slice" : [0,1]}}
            ).skip(start).limit(end):
            result.update({str(item['_id']) : item['data']})

    return jsonify(result)


@app.route('/tselmeg/<string:qwerty>', methods=['POST','GET'])
def tselmeg(qwerty):
	if request.method == 'POST':
		js = request.json
		data.append(js)
		return '1'
	elif request.method == 'GET':
		return jsonify(data)

@app.route('/register', methods=['POST'])
def register_user():
	collections = db['users']
	data = request.json
	password = data['password']
	del data['password']

	salt = bcrypt.gensalt()
	hashed_password = bcrypt.hashpw(password.encode('utf-8'),salt)
	data.update({'password' : hashed_password})
	data.update( {'dateCreated' : round(time.time()), 'role' : 0})
	collections.create_index([('email', pymongo.ASCENDING)],unique=True)

	try:
		collections.insert_one(data)
	except:
		return jsonify(401)
	else:
		# return jsonify(data['password'])
		return jsonify(200)
	# return jsonify(data)
@app.route('/login', methods=['POST'])
def login():
	data_input = request.json
	collection = db['users']
	try:
		user = collection.find_one({'email' : data_input['email']})
	except:
		return '404'
	else:
		user_password = data_input['password'].encode('utf-8')
		result = bcrypt.checkpw(user_password, user['password'])
		del user['_id'], user['dateCreated'], user['location'], user['password'], user['phone']
		if result == True:
			user.update({'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=180)})
			token = jwt.encode(user, app.config['SECRET_KEY'])
			return token


@app.route('/materials/search', methods=['POST'])
def search_material():
	data_input = request.json
	collection= db['materials']
	a = collection.find({'data.name' : {"$regex" : str(data_input['text'])}}).limit(16)
	last = {}
	for data in a:
		del data['_id']
		last.update(data)
	return jsonify(last)

@app.route('/state')
def state():
	collection = db['users']
	token = request.headers.get('Authorization')
	data = jwt.decode(token, app.config['SECRET_KEY'])
	email = data['email']
	user = collection.find_one({'email' : email})
	del user['_id'], user['password']
	return user

if __name__== '__main__':
	app.run(host= '0.0.0.0', debug=True, port=7070)
