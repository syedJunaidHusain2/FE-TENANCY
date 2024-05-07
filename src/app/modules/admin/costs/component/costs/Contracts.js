import React, {useState} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import Select from '../Icon/select.png'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import './style.css'
import Progress from './Progress'
export default function Contracts({contractData}) {
    return (
        <>
            <div
                className='shadow-sm mt-10 w-100 bg-white rounded py-8'
                style={{fontWeight: '600', fontSize: '14px', fontFamily: 'Manrope'}}
            >
                <div className='d-flex justify-content-between mb-5'>
                    <div className='px-6 py-5'>Contracts</div>
                    {/* <div style={{borderRight: '1px solid black'}}></div> */}
                </div>
                <div className='container mt-3 mb-sm-0 mb-5'>
                    <div className='mx-sm-10 mx-5 my-4'>
                        <div className='d-flex justify-content-between'>
                            <div className='text-cmGrey600'>Avg. Cost per rep:</div>
                            <div className='text-cmBlack'>
                                $ {contractData?.avg_cost_per_rep ?? '0'}
                            </div>
                        </div>
                        <hr className='border-cmGrey500 p-0 my-3 border-dotted' />
                        <div className='d-flex justify-content-between'>
                            <div className='text-cmGrey600'>Avg. Rent per month:</div>
                            <div className='text-cmBlack'>
                                $ {contractData?.avg_rent_per_month ?? '0'}
                            </div>
                        </div>
                        <hr className='border-cmGrey500 p-0 my-3 border-dotted' />

                        <div className='d-flex justify-content-between'>
                            <div className='text-cmGrey600'>Avg. Travel per month:</div>
                            <div className='text-cmBlack'>
                                $ {contractData?.avg_travel_per_month ?? '0'}
                            </div>
                        </div>
                        <hr className='border-cmGrey500 p-0 my-3 border-dotted' />

                        <div className='d-flex justify-content-between'>
                            <div className='text-cmGrey600'>Total cost incurred:</div>
                            <div className='text-cmBlack'>
                                $ {contractData?.total_costs_incurred ?? '0'}
                            </div>
                        </div>
                        {/* <div className='col d-flex flex-row flex-wrap'>
              <div className='container ms-13 mt-1 '>
                <div className='row'>
                  <div className='col d-flex flex-row flex-wrap'>
                    <label className='ms-1 avg'>Avg. Cost per rep:</label>
                  </div>
                  <div className='col-6 flex-row'>
                    <label className='lab'>$ {contractData?.avg_cost_per_rep ?? '0'}</label>
                  </div>
                </div>
              </div>
              <div className='ms-4 bord mt-1'></div>

              <div className='container ms-13 mt-2 '>
                <div className='row'>
                  <div className='col-6 d-flex flex-row flex-wrap text-end'>
                    <label className='ms-1 avg'>Avg. Rent per Month:</label>
                  </div>
                  <div className='col-6 flex-row'>
                    <label className='lab'>$ {contractData?.avg_rent_per_month ?? '0'}</label>
                  </div>
                </div>
              </div>
              <div className='ms-4 bord mt-1'></div>
              <div className='container ms-1 mt-2 '>
                <div className='row'>
                  <div className='col-7 d-flex flex-row flex-wrap'>
                    <label className='ms-1 avg'>Avg. Travel per Month:</label>
                  </div>
                  <div className='col-5 flex-row'>
                    <label className='lab2'>$ {contractData?.avg_travel_per_month ?? '0'}</label>
                  </div>
                </div>
              </div>
              <div className='ms-4 bord mt-1'></div>

              <div className='container ms-13 mt-2 '>
                <div className='row'>
                  <div className='col-6 d-flex flex-row flex-wrap text-end'>
                    <label className='ms-2 avg'>Total Cost incurred:</label>
                  </div>
                  <div className='col-6 flex-row'>
                    <label className='lab3'>$ {contractData?.total_costs_incurred ?? '0'}</label>
                  </div>
                </div>
              </div>
              <div className='ms-4 bord mt-1'></div>
            </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
