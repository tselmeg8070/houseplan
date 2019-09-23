import React, { Component } from 'react';
import './filter.css';
import * as HOUSE from '../../../constants/house';

class Filter extends Component {
  render() {
    const {filter} = this.props;
    const {
        handleChange,
        handleSubmit,
        handleMaterialChange
    } = this.props;
    const {material, area, floor, price} = filter;

    return(
      <div className='col-md-3 px-0'>
        <div className='darkened-bg mb-5 p-5'>
          {/*<div>*/}
          {/*  <p className='font-weight-bold mb-0 mt-3'>Зургийн компаниуд:</p>*/}
          {/*  <input type='checkbox'></input><label for='all-company'> Бүгд</label><br/>*/}
          {/*  <input type='checkbox'></input><label for='test-company-1'> House Plan Design</label><br/>*/}
          {/*  <input type='checkbox'></input><label for='test-company-2'> Donj House</label><br/>*/}
          {/*  <input type='checkbox'></input><label for='test-company-3'> Saysanaa</label><br/>*/}
          {/*</div>*/}
          <div>
            <p className='font-weight-bold mb-0 mt-3'>Үнийн дүн:</p>
            <input type='radio' name={'price'} onChange={handleChange} checked={price === '0'} value={0}></input><label for='all-company'> Бүгд</label><br/>
            <input type='radio' name={'price'} onChange={handleChange} checked={price === '1'} value={1}></input><label for='test-company-1'> 0₮-2,000,000₮</label><br/>
            <input type='radio' name={'price'} onChange={handleChange} checked={price === '2'} value={2}></input><label for='test-company-2'> 2,000,000₮-4,000,000₮</label><br/>
            <input type='radio' name={'price'} onChange={handleChange} checked={price === '3'} value={3}></input><label for='test-company-3'> 4,000,000₮-6,000,000₮</label><br/>
            <input type='radio' name={'price'} onChange={handleChange} checked={price === '4'} value={4}></input><label for='test-company-4'> 6,000,000₮ {'<'} </label><br/>
          </div>
          <div>
            <p className='font-weight-bold mb-0 mt-3'>Талбайн хэмжээ:</p>
            <input type='radio' name={'area'} onChange={handleChange} checked={area === '0'} value={0}></input><label for='all-company'> Бүгд</label><br/>
            <input type='radio' name={'area'} onChange={handleChange} checked={area === '1'} value={1}></input><label for='test-company-1'> 0мкв-40мкв</label><br/>
            <input type='radio' name={'area'} onChange={handleChange} checked={area === '2'} value={2}></input><label for='test-company-2'> 40мкв-80мкв</label><br/>
            <input type='radio' name={'area'} onChange={handleChange} checked={area === '3'} value={3}></input><label for='test-company-3'>  80мкв-120мкв</label><br/>
            <input type='radio' name={'area'} onChange={handleChange} checked={area === '4'} value={4}></input><label for='test-company-4'> 120мкв {'<'}</label><br/>
          </div>
          <div>
            <p className='font-weight-bold mb-0 mt-3'>Хийцлэл:</p>
            <input type='radio' name={'material'} onChange={handleChange} checked={material === ''} value={''}></input><label for='all-company'> Бүгд</label><br/>
            {HOUSE.builtWith.map(materialItem=>
                <div key={materialItem.id}><input type='radio' name={'material'} onChange={handleChange} checked={parseInt(material) === materialItem.id} value={materialItem.id}></input> < label htmlFor={'test-company-'+ materialItem.id}> {materialItem.text}</label><br/></div>
              )}
          </div>
          <div>
            <p className='font-weight-bold mb-0 mt-3'>Давхарын тоо:</p>
            <input type='radio' name={'floor'} onChange={handleChange} checked={floor === '0'} value={0}></input><label for='all-company'> Бүгд</label><br/>
            <input type='radio' name={'floor'} onChange={handleChange} checked={floor === '1'} value={1}></input><label for='test-company-1'> 1 давхар</label><br/>
            <input type='radio' name={'floor'} onChange={handleChange} checked={floor === '2'} value={2}></input><label for='test-company-2'> 2 давхар</label><br/>
            <input type='radio' name={'floor'} onChange={handleChange} checked={floor === '3'} value={3}></input><label for='test-company-3'> 3{'<'} давхар</label><br/>
          </div>
          <div className='filter-button-container pt-5'>
            <button className='primary-button button-xl' onClick={handleSubmit}>
              ХАЙЛТ ХИЙХ
            </button>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default Filter
