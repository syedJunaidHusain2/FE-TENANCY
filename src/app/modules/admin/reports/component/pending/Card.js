import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'

export default function Card({CardData}) {
    return (
        <>
            <div className='row w-100 mx-auto gap-8 mt-10'>
                <div
                    style={{background: '#FFF4DE'}}
                    className='shadow-sm pb-5 col-sm mb-4  rounded'
                >
                    <div className='ms-7'>
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
                                {CardData?.pending_count ?? '0'}
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
                        Pending Accounts
                    </div>
                </div>

                <div
                    style={{background: '#E1D3FF'}}
                    className='shadow-sm pb-5 col-sm mb-4  rounded'
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
                                {CardData?.total_pending ?? '0'}
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
                        Total KW Pending
                    </div>
                </div>

                <div
                    style={{background: '#D7F9EF'}}
                    className='shadow-sm pb-5 col-sm mb-4  rounded'
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
                                {CardData?.most_pending_closer?.closer_name ?? '-'}
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
                        Closer with most pending
                    </div>
                </div>

                <div
                    style={{background: '#E1E9FF'}}
                    className='shadow-sm pb-5 col-sm mb-4  rounded'
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
                                {CardData?.most_pending_office?.office_name ?? '-'}
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
                        State with most pending
                    </div>
                </div>

                <div
                    style={{background: '#FDDCEA'}}
                    className='shadow-sm pb-5 col-sm mb-4  rounded'
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
                                {CardData?.most_pending_installer?.install_partner ?? '-'}
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
                        Installer with most pending
                    </div>
                </div>
            </div>
        </>
    )
}
