import React, {useState} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import Select from '../Icon/select.png'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import './style.css'
import Progress from './Progress'
export default function Avg({avgData}) {
    return (
        <>
            <div className='w-100 row gap-5 mx-auto mt-10 mb-5'>
                <div
                    style={{background: '#D7F9EF'}}
                    className='rounded shadow-sm col-sm h-100 py-5'
                >
                    <div className='avg d-flex justify-content-center'>
                        <div className='d-flex text-center'>
                            <div className='mt-4 text-center'>Avg. Housing Cost per rep</div>
                        </div>
                    </div>
                    <div
                        style={{
                            color: '#0D1821',
                            fontFamily: 'Manrope',
                            fontWeight: 'bold',
                            fontSize: '20px',
                        }}
                        className='text-center mt-1'
                    >
                        ${avgData?.avg_costs?.avg_housing_cost_per_rep}
                    </div>
                </div>
                <div
                    style={{background: '#FFF4DE'}}
                    className='shadow-sm rounded col-sm h-100 py-5'
                >
                    <div className='avg d-flex justify-content-center'>
                        <div className='d-flex text-center'>
                            <div className='mt-4 text-center'>Avg. Travel Cost per rep</div>
                        </div>
                    </div>
                    <div
                        style={{
                            color: '#0D1821',
                            fontFamily: 'Manrope',
                            fontWeight: 'bold',
                            fontSize: '20px',
                        }}
                        className='text-center mt-1'
                    >
                        ${avgData?.avg_costs?.avg_travel_cost_per_rep}
                    </div>
                </div>
            </div>

            <div
                style={{width: 'auto', height: 'auto'}}
                className='shadow-sm bg-white mb-4 overflow-hidden mt-0 rounded pb-15'
            >
                <div className='container ms-11 py-3'>
                    <div className='row d-flex flex-row mt-3'>
                        <div className='col'>
                            <label
                                className=' avg fw-bold'
                                style={{fontSize: '14px', fontFamily: 'Manrope', fontWeight: '600'}}
                            >
                                Monthly Cost Trends
                            </label>
                        </div>
                    </div>
                </div>
                <div className='bord mt-1 '></div>
                {/* {avgData?.monthly_costs_trends?.avg_travel_cost_per_rep} */}
                <div className='container ms-20 '>
                    <div className='row d-flex flex-row mt-2'>
                        <div className='col-3  text-end '>
                            <label className='ms-1 avg '>
                                {avgData?.monthly_costs_trends?.high?.cost_name}:
                            </label>
                        </div>
                        <div className='col-8'>
                            <label className='lab'>
                                ${avgData?.monthly_costs_trends?.high?.amount ?? '0'}
                            </label>
                            <label
                                className={
                                    avgData?.monthly_costs_trends?.high?.percentage > 0
                                        ? 'text-cmSucccess'
                                        : avgData?.monthly_costs_trends?.high?.percentage < 0
                                        ? 'text-cmError'
                                        : 'text-warning'
                                }
                                style={{
                                    // color: '#00C247',
                                    marginLeft: '5px',
                                }}
                            >
                                <i
                                    className={
                                        avgData?.monthly_costs_trends?.high?.percentage > 0
                                            ? 'bi bi-arrow-up text-cmSuccess'
                                            : avgData?.monthly_costs_trends?.high?.percentage < 0
                                            ? 'bi bi-arrow-down text-cmError'
                                            : 'bi bi-dash text-cmError'
                                    }
                                ></i>
                                {avgData?.monthly_costs_trends?.high?.percentage ?? '0'} %
                            </label>
                        </div>
                    </div>
                </div>
                <div className='bord1 mt-1 '></div>
                <div className='container ms-20 '>
                    <div className='row d-flex flex-row mt-2'>
                        <div className='col-3  text-end'>
                            <label className='ms-1 avg'>
                                {avgData?.monthly_costs_trends?.low?.cost_name}:
                            </label>
                        </div>
                        <div className='col-8'>
                            <label className='lab'>
                                {' '}
                                ${avgData?.monthly_costs_trends?.low?.amount ?? '0'}
                            </label>
                            <label
                                className={
                                    avgData?.monthly_costs_trends?.low?.percentage > 0
                                        ? 'text-cmSucccess'
                                        : avgData?.monthly_costs_trends?.low?.percentage < 0
                                        ? 'text-cmError'
                                        : 'text-warning'
                                }
                                style={{
                                    // color: '#FF3333                  ',
                                    marginLeft: '5px',
                                }}
                            >
                                <i
                                    className={
                                        avgData?.monthly_costs_trends?.low?.percentage > 0
                                            ? 'bi bi-arrow-up text-cmSuccess'
                                            : avgData?.monthly_costs_trends?.low?.percentage < 0
                                            ? 'bi bi-arrow-down text-cmError'
                                            : 'bi bi-dash text-cmError'
                                    }
                                ></i>
                                {avgData?.monthly_costs_trends?.low?.percentage ?? '0'} %
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
