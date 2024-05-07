import React, {useState} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import Select from '../../Icon/select.png'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import './style.css'
import Progress from './Progress'
import {formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
export default function Contracts({graphsData, contracts}) {
    return (
        <>
            <div className='shadow mb-4 w-475px h-md-225px bg-white rounded mb-5'>
                <div className='d-flex justify-content-between '>
                    <div
                        className='p-4 cont text-cmGrey800 mb-5'
                        style={{fontFamily: 'Manrope', fontWeight: '600', fontSize: '14px'}}
                    >
                        Contracts
                    </div>
                    {/* <div style={{borderRight: '1px solid black'}}></div> */}

                    <div
                        className='p-4 cont mx-sm-5 text-cmGrey800'
                        style={{fontWeight: 600, fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        Install Ratio
                    </div>
                </div>
                <div className='container' style={{fontFamily: 'Manrope'}}>
                    <div className='d-sm-flex '>
                        <div className=' d-flex flex-row flex-wrap'>
                            <div className='container ms-1  '>
                                <div className='d-flex gap-10'>
                                    <div className=''>
                                        <label
                                            className='text-cmGrey600'
                                            style={{fontSize: '14px', fontWeight: 600}}
                                        >
                                            Avg. profit per rep:
                                        </label>
                                    </div>
                                    <div className=''>
                                        <label
                                            className='text-cmBlack'
                                            style={{fontWeight: '600', fontSize: '14px'}}
                                        >
                                            {formattedNumberFields(
                                                contracts?.avg_profit_per_rep,
                                                '$'
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='ms-4 bord mt-1'></div>

                            <div className='container ms-1 mt-1 '>
                                <div className='d-flex gap-10'>
                                    <div className=' text-start'>
                                        <label
                                            className='text-cmGrey600'
                                            style={{fontSize: '14px', fontWeight: 600}}
                                        >
                                            Total KW Installed:
                                        </label>
                                    </div>
                                    <div className=''>
                                        <label
                                            className='text-cmBlack'
                                            style={{fontWeight: '600', fontSize: '14px'}}
                                        >
                                            {formattedNumberFields(
                                                contracts?.total_kw_installed,
                                                ''
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='ms-4 bord mt-1'></div>
                            <div className='container mt-1 ms-1  '>
                                <div className='d-flex gap-10'>
                                    <div className=''>
                                        <label
                                            className='text-cmGrey600'
                                            style={{fontSize: '14px', fontWeight: 600}}
                                        >
                                            Total Revenue Generated:
                                        </label>
                                    </div>
                                    <div className=''>
                                        <label
                                            className='text-cmBlack'
                                            style={{fontWeight: '600', fontSize: '14px'}}
                                        >
                                            {formattedNumberFields(
                                                contracts?.total_revenue_generated,
                                                '$'
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='ms-4 bord mt-1'></div>

                            <div className='container ms-1 mt-1 '>
                                <div className='d-flex gap-10'>
                                    <div className=''>
                                        <label
                                            className='text-cmGrey600'
                                            style={{fontSize: '14px', fontWeight: 600}}
                                        >
                                            Total KW Pending:
                                        </label>
                                    </div>
                                    <div className=''>
                                        <label
                                            className='text-cmBlack'
                                            style={{fontWeight: '600', fontSize: '14px'}}
                                        >
                                            {formattedNumberFields(contracts?.total_kw_pending, '')}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='ms-4 bord mt-1'></div>

                            <div className='container ms-1 mt-1 '>
                                <div className='d-flex gap-10'>
                                    <div className=''>
                                        <label
                                            className='text-cmGrey600'
                                            style={{fontSize: '14px', fontWeight: 600}}
                                        >
                                            Total Revenue Pending:
                                        </label>
                                    </div>
                                    <div className=''>
                                        <label
                                            className='text-cmBlack'
                                            style={{fontWeight: '600', fontSize: '14px'}}
                                        >
                                            {formattedNumberFields(
                                                contracts?.total_revenue_pending,
                                                '$'
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='border-start'
                            //  '
                            style={{
                                // borderLeft: '0.1px solid  rgba(167, 167, 167, 0.15)',
                                marginTop: '-36px',
                                position: '',
                            }}
                        >
                            <div className='' style={{marginTop: '-36px'}}></div>
                            <div className='mt-20'>
                                <Progress
                                    a={graphsData?.install?.replace('%', '')}
                                    b={graphsData?.uninstall?.replace('%', '')}
                                />

                                <div className=' ms-sm-3' style={{marginTop: '-12px'}}>
                                    <label
                                        className='bg-cmBlue-Crayola'
                                        style={{
                                            width: '11px',
                                            height: '11px',
                                            borderRadius: '20px',
                                        }}
                                    ></label>
                                    <label
                                        className='ms-1 text-cmGrey600'
                                        style={{fontFamily: 'Manrope', fontSize: '12px'}}
                                    >
                                        Installed Accounts
                                    </label>
                                </div>
                                <div className='ms-sm-3 mt-0'>
                                    <label
                                        className=''
                                        style={{
                                            width: '11px',
                                            height: '11px',
                                            borderRadius: '20px',
                                            background: '#DFE4FB',
                                        }}
                                    ></label>
                                    <label
                                        className='ms-1 text-cmGrey600'
                                        style={{fontFamily: 'Manrope', fontSize: '12px'}}
                                    >
                                        Unserviced Accounts
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
