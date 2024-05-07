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
            {/* <div className='d-flex flex-row flex-wrap justify-content-between mt-10'> */}
            <div className='row w-100 mx-auto gap-8 mt-10'>
                <div style={{background: '#FFF4DE'}} className='shadow-sm pb-5 mb-4 rounded col-sm'>
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
                                {cardData?.header?.clawback_count}
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
                        Clawback Accounts
                    </div>
                </div>

                <div
                    style={{background: '#E1D3FF'}}
                    className='shadow-sm pb-5 mb-4  rounded col-sm'
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
                                $ {cardData?.header?.total_clawback}
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
                        Total Clawback
                    </div>
                </div>

                <div
                    style={{background: '#D7F9EF'}}
                    className='shadow-sm pb-5 mb-4  rounded col-sm'
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
                                {!cardData?.header?.most_clawback_closer?.user_name ||
                                cardData.header.most_clawback_closer.user_name.length === 0
                                    ? '-'
                                    : cardData.header.most_clawback_closer.user_name}
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
                        Most Clawback - Closer
                    </div>
                </div>

                <div style={{background: '#E1E9FF'}} className='shadow-m pb-5 mb-4  rounded col-sm'>
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
                                {cardData?.header?.most_clawback_state?.name ?? '-'}
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
                        Most Clawback - State
                    </div>
                </div>

                <div style={{background: '#FDDCEA'}} className='shadow-sm mb-4 rounded col-sm pb-5'>
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
                                {cardData?.header?.most_clawback_installer?.install_partner ?? '-'}
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
                        Most Clawback - Installer
                    </div>
                </div>
            </div>
        </>
    )
}
