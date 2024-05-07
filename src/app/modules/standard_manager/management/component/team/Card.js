import React, {useState} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import Select from '../../Icon/select.png'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
export default function Card({cardData}) {
    return (
        <>
            <div className='flex-wrap d-sm-flex w-100 align-items-center gap-sm-15 gap-5 justify-content-between mt-8'>
                <div
                    style={{background: '#D7F9EF', height: '100px'}}
                    className='shadow-sm mb-4  rounded col-sm '
                >
                    <div className='avg ms-7'>
                        <div className='d-flex'>
                            <div
                                className='mt-7'
                                style={{
                                    fontFamily: 'Manrope',
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    color: '#212121',
                                }}
                            >
                                {cardData?.total_team ?? '0'}
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            color: '#424242',
                            fontFamily: 'Manrope',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                        className='mt-1 ms-7'
                    >
                        Total Teams
                    </div>
                </div>

                <div
                    style={{background: '#FFF4DE', height: '100px'}}
                    className='shadow-sm mb-4  rounded col-sm '
                >
                    <div className='avg ms-7'>
                        <div className='d-flex'>
                            <div
                                className='mt-7'
                                style={{
                                    fontFamily: 'Manrope',
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    color: '#212121',
                                }}
                            >
                                {cardData?.closer ?? '0'}
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            color: '#424242',
                            fontFamily: 'Manrope',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                        className='mt-1 ms-7'
                    >
                        Closers
                    </div>
                </div>

                <div
                    style={{background: '#E1E9FF ', height: '100px'}}
                    className='shadow-sm mb-4  rounded col-sm'
                >
                    <div className='avg ms-7'>
                        <div className='d-flex'>
                            <div
                                className='mt-7'
                                style={{
                                    fontFamily: 'Manrope',
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    color: '#212121',
                                }}
                            >
                                {cardData?.setter ?? '0'}
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            color: '#424242',
                            fontFamily: 'Manrope',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                        className='mt-1 ms-7'
                    >
                        Setters
                    </div>
                </div>

                <div
                    style={{background: '#FEE3EF', height: '100px'}}
                    className='shadow-sm mb-4  rounded col-sm px-1 '
                >
                    <div className='avg ms-7'>
                        <div className='d-flex'>
                            <div
                                className='mt-7'
                                style={{
                                    fontFamily: 'Manrope',
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    color: '#212121',
                                }}
                            >
                                {cardData?.ratio}
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            color: '#424242',
                            fontFamily: 'Manrope',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                        className='mt-1 ms-7'
                    >
                        Setter Vs Closer Ratio
                    </div>
                </div>
            </div>
        </>
    )
}
