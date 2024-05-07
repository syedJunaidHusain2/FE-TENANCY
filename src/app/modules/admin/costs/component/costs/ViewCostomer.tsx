import React, {useState} from 'react'
import Select from '../Icon/select.png'
import Jeni from '../Icon/jeni.png'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import './style.css'
export default function ViewCostomer() {
    const [edit, setEdit] = useState(false)
    return (
        <>
            <div
                id='kt_engage_demos2'
                className='bg-body'
                data-kt-drawer='true'
                data-kt-drawer-name='explore'
                data-kt-drawer-activate='true'
                data-kt-drawer-overlay='true'
                data-kt-drawer-width="{default:'350px', 'lg': '450px'}"
                data-kt-drawer-direction='end'
                data-kt-drawer-toggle='#kt_engage_demos_toggle2'
                data-kt-drawer-close='#kt_engage_demos_close2'
            >
                <div className='card-body' id='kt_explore_body'>
                    <div className='d-flex justify-content-between me-6 mb-3 mt-6 ms-9'>
                        <div style={{fontSize: '16px', color: '#0D1821', fontFamily: 'Manrope'}}>
                            Jennifer Brown
                        </div>

                        <div
                            id='kt_engage_demos_close2'
                            className='btn btn-sm me-4 btn-icon btn-active-color-primary'
                        >
                            <i
                                id='kt_engage_demos_close2'
                                className='bi bi-x-circle'
                                style={{fontSize: '22px', color: '#616161'}}
                            ></i>
                        </div>
                    </div>
                    <div style={{borderBottom: '1px solid #EEEEEE'}}></div>
                    <div
                        id='kt_explore_scroll'
                        className='scroll-y me-n5 pe-5 d-flex justify-content-center flex-column mt-6'
                        data-kt-scroll='true'
                        data-kt-scroll-height='auto'
                        data-kt-scroll-wrappers='#kt_engage_demos_body'
                        data-kt-scroll-dependencies='#kt_engage_demos_header'
                        data-kt-scroll-offset='5px'
                    >
                        <div className='d-flex justify-content-center'>
                            <div>
                                <img className='w-md-400px ms-2 h-125px' src={Jeni}></img>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px mt-13 ms-14 mt-1'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4 mt-3 d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #6078EC',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-5 mt-3' style={{marginLeft: '-10px'}}>
                                        Account Acquired
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='container w-md-400px ms-sm-12 '
                            style={{
                                fontSize: '14px',
                                color: '#757575',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <div className='row g-2'>
                                <div
                                    className='col-3 d-flex flex-row'
                                    style={{color: '#3F4254'}}
                                ></div>
                                <div className='col-3 ms-2'>
                                    <div
                                        style={{
                                            background: '#D0D0D0',
                                            width: '3px',
                                            height: '40px',
                                            marginLeft: '1px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px ms-14'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4  d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #FF3333',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-5' style={{marginLeft: '-10px'}}>
                                        Account Acquired
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='container w-md-400px ms-sm-12 '
                            style={{
                                fontSize: '14px',
                                color: '#757575',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <div className='row g-2'>
                                <div
                                    className='col-3 d-flex flex-row'
                                    style={{color: '#3F4254'}}
                                ></div>
                                <div className='col-3 ms-2'>
                                    <div
                                        style={{
                                            background: '#D0D0D0',
                                            width: '3px',
                                            height: '40px',
                                            marginLeft: '1px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px ms-14'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4  d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #6078EC                        ',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-5' style={{marginLeft: '-10px'}}>
                                        Account Acquired
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='container w-md-400px ms-sm-12 '
                            style={{
                                fontSize: '14px',
                                color: '#757575',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <div className='row g-2'>
                                <div
                                    className='col-3 d-flex flex-row'
                                    style={{color: '#3F4254'}}
                                ></div>
                                <div className='col-3 ms-2'>
                                    <div
                                        style={{
                                            background: '#D0D0D0',
                                            width: '3px',
                                            height: '40px',
                                            marginLeft: '1px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px ms-14'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4  d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #00C247',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-8' style={{marginLeft: '-10px'}}>
                                        Setter Paid{' '}
                                        <label
                                            className='ms-5'
                                            style={{
                                                textDecoration: 'underline',
                                                color: '#424242',
                                                fontFamily: 'Manrope',
                                                fontWeight: 'bold',
                                                marginTop: '-6px',
                                            }}
                                        >
                                            <img
                                                src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                                                className='avatar me-3'
                                            />{' '}
                                            Annette Black
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='container w-md-400px ms-sm-12 '
                            style={{
                                fontSize: '14px',
                                color: '#757575',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <div className='row g-2'>
                                <div
                                    className='col-3 d-flex flex-row'
                                    style={{color: '#3F4254'}}
                                ></div>
                                <div className='col-3 ms-2'>
                                    <div
                                        style={{
                                            background: '#D0D0D0',
                                            width: '3px',
                                            height: '40px',
                                            marginTop: '-5px',
                                            marginLeft: '1px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px ms-14'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4  d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #F64E60',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-8' style={{marginLeft: '-10px'}}>
                                        Setter Paid{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='container w-md-400px ms-sm-12 '
                            style={{
                                fontSize: '14px',
                                color: '#757575',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <div className='row g-2'>
                                <div
                                    className='col-3 d-flex flex-row'
                                    style={{color: '#3F4254'}}
                                ></div>
                                <div className='col-3 ms-2'>
                                    <div
                                        style={{
                                            background: '#D0D0D0',
                                            width: '3px',
                                            height: '40px',
                                            marginTop: '-5px',
                                            marginLeft: '1px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px ms-14'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4  d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #6078EC ',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-8' style={{marginLeft: '-10px'}}>
                                        Setter Paid{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='container w-md-400px ms-sm-12 '
                            style={{
                                fontSize: '14px',
                                color: '#757575',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <div className='row g-2'>
                                <div
                                    className='col-3 d-flex flex-row'
                                    style={{color: '#3F4254'}}
                                ></div>
                                <div className='col-3 ms-2'>
                                    <div
                                        style={{
                                            background: '#D0D0D0',
                                            width: '3px',
                                            height: '40px',
                                            marginTop: '-5px',
                                            marginLeft: '1px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px ms-14'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4  d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #6078EC ',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-8' style={{marginLeft: '-10px'}}>
                                        Setter Paid{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='container w-md-400px ms-sm-12 '
                            style={{
                                fontSize: '14px',
                                color: '#757575',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <div className='row g-2'>
                                <div
                                    className='col-3 d-flex flex-row'
                                    style={{color: '#3F4254'}}
                                ></div>
                                <div className='col-3 ms-2'>
                                    <div
                                        style={{
                                            background: '#D0D0D0',
                                            width: '3px',
                                            height: '40px',
                                            marginTop: '-5px',
                                            marginLeft: '1px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px ms-14'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4  d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #6078EC ',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-8' style={{marginLeft: '-10px'}}>
                                        Setter Paid{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='container w-md-400px ms-sm-12 '
                            style={{
                                fontSize: '14px',
                                color: '#757575',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <div className='row g-2'>
                                <div
                                    className='col-3 d-flex flex-row'
                                    style={{color: '#3F4254'}}
                                ></div>
                                <div className='col-3 ms-2'>
                                    <div
                                        style={{
                                            background: '#D0D0D0',
                                            width: '3px',
                                            height: '40px',
                                            marginTop: '-5px',
                                            marginLeft: '1px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px ms-14'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4  d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #6078EC ',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-8' style={{marginLeft: '-10px'}}>
                                        Setter Paid{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='container w-md-400px ms-sm-12 '
                            style={{
                                fontSize: '14px',
                                color: '#757575',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <div className='row g-2'>
                                <div
                                    className='col-3 d-flex flex-row'
                                    style={{color: '#3F4254'}}
                                ></div>
                                <div className='col-3 ms-2'>
                                    <div
                                        style={{
                                            background: '#D0D0D0',
                                            width: '3px',
                                            height: '40px',
                                            marginTop: '-5px',
                                            marginLeft: '1px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px ms-14'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4  d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #6078EC ',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-8' style={{marginLeft: '-10px'}}>
                                        Setter Paid{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='container w-md-400px ms-sm-12 '
                            style={{
                                fontSize: '14px',
                                color: '#757575',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <div className='row g-2'>
                                <div
                                    className='col-3 d-flex flex-row'
                                    style={{color: '#3F4254'}}
                                ></div>
                                <div className='col-3 ms-2'>
                                    <div
                                        style={{
                                            background: '#D0D0D0',
                                            width: '3px',
                                            height: '40px',
                                            marginTop: '-5px',
                                            marginLeft: '1px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px ms-14'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4  d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #F64E60                        ',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-8' style={{marginLeft: '-10px'}}>
                                        Setter Paid{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='container w-md-400px ms-sm-12 '
                            style={{
                                fontSize: '14px',
                                color: '#757575',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <div className='row g-2'>
                                <div
                                    className='col-3 d-flex flex-row'
                                    style={{color: '#3F4254'}}
                                ></div>
                                <div className='col-3 ms-2'>
                                    <div
                                        style={{
                                            background: '#D0D0D0',
                                            width: '3px',
                                            height: '40px',
                                            marginTop: '-5px',
                                            marginLeft: '1px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px ms-14'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4  d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #00C247',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-8' style={{marginLeft: '-10px'}}>
                                        Setter Paid{' '}
                                        <label
                                            className='ms-5'
                                            style={{
                                                textDecoration: 'underline',
                                                color: '#424242',
                                                fontFamily: 'Manrope',
                                                fontWeight: 'bold',
                                                marginTop: '-6px',
                                            }}
                                        >
                                            <img
                                                src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                                                className='avatar me-3'
                                            />{' '}
                                            Annette Black
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='container w-md-400px ms-sm-12 '
                            style={{
                                fontSize: '14px',
                                color: '#757575',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <div className='row g-2'>
                                <div
                                    className='col-3 d-flex flex-row'
                                    style={{color: '#3F4254'}}
                                ></div>
                                <div className='col-3 ms-2'>
                                    <div
                                        style={{
                                            background: '#D0D0D0',
                                            width: '3px',
                                            height: '40px',
                                            marginTop: '-5px',
                                            marginLeft: '1px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center mb-11'>
                            <div
                                className='container w-md-400px ms-14'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4  d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #F64E60 ',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-8' style={{marginLeft: '-10px'}}>
                                        Setter Paid{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <yyy */}
                    </div>
                </div>
            </div>
        </>
    )
}
