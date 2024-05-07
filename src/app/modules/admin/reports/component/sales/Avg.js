import React, {useState, useEffect} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import Select from '../../Icon/select.png'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import './style.css'
import Progress from './Progress'
import {getValidDate} from '../../../../../../constants/constants'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import {formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
export default function Avg({avgData}) {
    useEffect(() => {
        // var dateDay = new Date(item.date).toLocaleString('en-us',{month:'short',day:'numeric'})
        // var dateMonth = new Date(item.date).toLocaleString('en-us',{month:'short'})
    }, [])

    return (
        <div>
            <div
                className='row gap-5 mb-5 mx-auto justify-content-between'
                style={{fontFamily: 'Manrope'}}
            >
                <div
                    style={{background: '#D7F9EF', borderRadius: '10px'}}
                    className='shadow col-sm py-5'
                >
                    <div
                        className='text-cmGrey800 text-center mb-4'
                        style={{fontWeight: '600', fontSize: '12px'}}
                    >
                        Avg. Account per rep
                    </div>
                    <div
                        style={{
                            fontFamily: 'Manrope',
                            fontWeight: '700',
                            fontSize: '20px',
                        }}
                        className='text-center text-cmBlack'
                    >
                        {avgData?.avg_account_per_rep ?? 0}
                    </div>
                </div>
                <div
                    style={{background: '#FFF4DE', borderRadius: '10px'}}
                    className='shadow col-sm py-5 text-center'
                >
                    <div
                        className='text-cmGrey800 mb-4'
                        style={{fontWeight: '600', fontSize: '12px'}}
                    >
                        Avg. KW per rep
                    </div>
                    <div
                        style={{
                            color: '#0D1821',
                            fontFamily: 'Manrope',
                            fontWeight: '700',
                            fontSize: '20px',
                        }}
                        className='text-center  text-cmBlack'
                    >
                        {avgData?.avg_kw_per_rep ?? 0}
                    </div>
                </div>
            </div>

            <div
                style={{fontWeight: 600, borderRadius: '10px'}}
                className='shadow py-2 bg-cmwhite overflow-hidden'
            >
                <div className='row px-5 py-2'>
                    <div className='col text-cmGrey600' style={{fontWeight: 600, fontSize: '12px'}}>
                        Best Day:
                    </div>
                    <div className='col text-nowrap'>
                        {formattedNumberFields(avgData?.bestDay?.kw, '')} KW
                    </div>

                    <div
                        className='col text-cmGrey800'
                        style={{
                            fontFamily: fontsFamily.manrope,
                            fontSize: '14px',
                            fontWeight: 600,
                        }}
                    >
                        {new Date(avgData?.bestDay?.date).toLocaleString('en-us', {
                            month: 'short',
                            day: 'numeric',
                        })}
                    </div>
                </div>

                <div className='bord'></div>

                <div className='row px-5 py-2'>
                    <div
                        className='col-4 text-cmGrey600'
                        style={{fontWeight: 600, fontSize: '12px'}}
                    >
                        Best Week:
                    </div>
                    <div className='col text-nowrap'>{avgData?.bestWeek?.kw} KW</div>
                    <div
                        className='col text-cmGrey800'
                        style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: 600}}
                    >
                        {new Date(avgData?.bestWeek?.date[0]).toLocaleString('en-us', {
                            month: 'short',
                            day: 'numeric',
                        })}
                        -
                        {new Date(avgData?.bestWeek?.date[1]).toLocaleString('en-us', {
                            day: 'numeric',
                        })}
                    </div>
                </div>

                <div className='bord'></div>

                <div className='row px-5 py-2'>
                    <div
                        className='col text-cmGrey600 '
                        style={{fontWeight: 600, fontSize: '12px'}}
                    >
                        Best Month:
                    </div>
                    <div className='col text-nowrap text-cmBlack'>{avgData?.bestMonth?.kw} KW</div>
                    <div
                        className='col text-nowrap text-cmGrey800'
                        style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: 600}}
                    >
                        {getValidDate(avgData?.bestMonth?.date, 'MMMM')}
                    </div>
                </div>
            </div>
        </div>
    )
}
