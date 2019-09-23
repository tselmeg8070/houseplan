import axios from "axios";

class Server {
    authState() {
        const url = process.env.REACT_APP_API_URL+'/state';
        return axios.get(url, {headers: {"Authorization": JSON.parse(localStorage.getItem('authUser'))}})
        // return new Promise((resolve, reject)=> {
        //     resolve('J7dsahjkh868jncxz6');
        // })
    }
    authRegister(data) {
        const url = process.env.REACT_APP_API_URL+'/register';
        return axios.post(url, data);
    }
    authSignIn(data) {
        const url = process.env.REACT_APP_API_URL+'/login';
        return axios.post(url, data);
    }
    createRequest(data) {
        const url = process.env.REACT_APP_API_URL+'/request';
        console.log(data);
        return axios.post(url, data);
    }
    getRequests() {
        const url = process.env.REACT_APP_API_URL+'/request';
        return axios.get(url);
    }
    /**
     * Create house object in database
     * @param data - Object of house
     * @return Promise
     */
    doAddOrEditHousePlan(data, id, activity) {
        const url=process.env.REACT_APP_API_URL+'/houses';
        if(activity === undefined) {
            delete data.dummy;
            data.images = [];
            let check = 0;
            data.post.blocks = data.post.blocks.filter(block => {
                if (block.type === 'image' && check === 0) {
                    data.images.push(block.data.file.url);
                } else {
                    check = 1;
                }
                return check === 1 && block;
            });
            data.area = parseInt(data.area);
            data.floors = parseInt(data.floors);
            data.price = parseInt(data.price);
            data.rooms = parseInt(data.rooms);

            data.materials.map(material => {
                delete data.materials[material.id].id;
                return material
            });
            data.blocks =  data.post.blocks;
            delete data.post;
            console.log(data);
            if (id !== undefined) {
                data.activitiesTemp = data.activities;
                data.activities.map((activity) => {
                    data.activitiesTemp[activity.id] = activity.value;
                    return activity
                });
                data.activities = data.activitiesTemp;
                delete data.activitiesTemp;
                return axios.put(url+'/'+id, {data})
            }  else {
                data.activitiesTemp = data.activities;

                data.offers = {};
                data.activities.map((activity) => {
                    data.offers[activity.value] = {};
                    data.activitiesTemp[activity.id] = activity.value;
                    return activity
                });
                data.activities = data.activitiesTemp;
                delete data.activitiesTemp;
                return axios.post(url, {data})
            }
        } else {
            return axios.put(url+'/'+id, {data})
        }

    }

    /**
     * Get House data using ID
     * @param id - House's unique reference id
     * @return Promise
     */
    getHouse(id) {
        const url=process.env.REACT_APP_API_URL+'/houses/'+id;
        return axios.get(url);
    }

    getHouses(start, end, filter) {
        return axios.post(process.env.REACT_APP_API_URL+'/houses/filter/'+start+'/'+end, filter);
    }
    getHouseRaw(id) {
        const url=process.env.REACT_APP_API_URL+'/housesraw/'+id;
        return axios.get(url);
    }

    doDeleteHouse(id) {
        const url=process.env.REACT_APP_API_URL + '/houses/delete/' + id;
        return axios.delete(url);
    }
    /**
     * Create or Edit material
     * @param data - Material's data
     * @param id - Material's id for updating Material
     * @return {Promise<AxiosResponse<T>>}
     */
    doAddOrEditMaterial = (data, id) => {
        const url=process.env.REACT_APP_API_URL +'/materials';
        const options = JSON.parse(JSON.stringify(data.options));
        data.images = [];
        let check = 0;
        data.post.blocks = data.post.blocks.filter(block => {
            if (block.type === 'image' && check === 0) {
                data.images.push(block.data.file.url);
            } else {
                check = 1;
            }
            return check === 1 && block;
        });
        data.optionsObject = {};
        options.map(option => {
            data.optionsObject[option.key] = option;
            delete data.optionsObject[option.key].index;
            delete data.optionsObject[option.key].key;
        });
        data.options = data.optionsObject;
        delete data.optionsObject;
        data.blocks = data.post.blocks;
        delete data.post;
        if (id !== undefined) {
            return axios.put(url+'/'+id, {data})
        }  else {
            return axios.post(url, {data})
        }

    };

    doDeleteMaterial = (id) => {
        return axios.delete(process.env.REACT_APP_API_URL + '/materials/delete/'+id);
    };

    /**
     * Gets compressed data of Materials from server
     * @return Request from server
     */
    getMaterialMiniData() {
        return axios.get(process.env.REACT_APP_API_URL+'/materials/mini')
    }

    getMaterials(start, end, category) {
        if(category === undefined || category === null)
            category = 1000;
        return axios.get(process.env.REACT_APP_API_URL+'/materials/'+start+'/'+end+'/'+category)
    }

    searchMaterial(data) {
        const res = {
            text: data
        };
        return axios.post(process.env.REACT_APP_API_URL+'/materials/search', res)
    }
    getMaterial(id) {
        return axios.get(process.env.REACT_APP_API_URL+'/materials/'+id)
    }

    getCompanies(start, end, category) {
        if (category === null || category === undefined)
            category = 1000
        return axios.get(process.env.REACT_APP_API_URL+'/companies/'+start+'/'+end+'/'+category)
    }
    getCompaniesMini() {
        return axios.get(process.env.REACT_APP_API_URL+'/companies/mini')
    }
    getCompany(id) {
        return axios.get(process.env.REACT_APP_API_URL + '/companies/'+id)
    }

    doAddOrEditCompany(data, id) {
        data.activitiesTemp = data.activities;
        data.activities.map((activity) => {
            data.activitiesTemp[activity.id] = activity.value;
            return activity
        });
        data.activities = data.activitiesTemp;
        delete data.activitiesTemp;
        data.logo = data.post.blocks[0].data.file.url;
        data.post.blocks.shift();
        data.blocks =  data.post.blocks;
        delete data.post;
        if (id !== undefined) {
            return axios.put(process.env.REACT_APP_API_URL+'/companies/'+id, {data});
        } else {
            return axios.post(process.env.REACT_APP_API_URL+'/companies', {data});

        }
    };

    doDeleteCompany = (id) => {
        return axios.delete(process.env.REACT_APP_API_URL + '/companies/'+id);
    };

    doAddOrEditPost = (data, id) => {
        if(id === undefined) {
            return axios.post(process.env.REACT_APP_API_URL+'/posts', {data});
        } else {
            return axios.put(process.env.REACT_APP_API_URL+'/posts/'+id, {data});
        }
    };
    deDeletePost = (id) => {
        return axios.delete(process.env.REACT_APP_API_URL + '/posts/delete/'+id);
    };

    getPost(id) {
        return axios.get(process.env.REACT_APP_API_URL + '/posts/' + id);
    };
    getPosts(start, end) {
        return axios.get(process.env.REACT_APP_API_URL + '/posts/'+start+'/'+end);
    }
    searchPosts(query) {
        const res = {
            text: query
        };
        return axios.post(process.env.REACT_APP_API_URL + '/postssearch', res);
    }

}
export default Server