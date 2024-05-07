import React, {useState, useEffect} from 'react'
import More1 from '../Path1.png'
import More from '../Path.png'
import Select from '../../Icon/select.png'

export default function SetupCard1() {
    const [more, setMore] = useState(false)
    const [edit, setEdit] = useState(false)
    return (
        <div className='card bg-white h-auto mt-6'>
            <div className=''>
                <div className='w-100 ms-3 mt-6 mb-3'>
                    <div className='form-check ms-8 ml-12px d-flex form-switch form-switch-sm form-check-custom form-check-solid'>
                        <label
                            style={{
                                fontSize: '16px',
                                fontFamily: 'Manrope',
                                // fontStyle: 'Medium',
                                color: '#424242',
                                // fontWeight: '700px'
                            }}
                            className='form-label ml-8'
                        >
                            Reconciliations
                        </label>
                        {!more ? (
                            <img
                                style={{marginLeft: '17px', marginTop: '-3px', cursor: 'pointer'}}
                                onClick={() => setMore(true)}
                                src={More}
                            ></img>
                        ) : (
                            <img
                                style={{marginLeft: '17px', marginTop: '-3px', cursor: 'pointer'}}
                                onClick={() => setMore(false)}
                                src={More1}
                            ></img>
                        )}
                    </div>
                    {more ? (
                        <div
                            className='d-flex justify-content-end '
                            style={{marginTop: '-34px', paddingRight: '23px'}}
                        >
                            <button
                                className=' btn btn-sm btn-icon  btn-bg-light btn-active-color-primary'
                                data-kt-menu-trigger='click'
                                data-kt-menu-placement='bottom-end'
                                data-kt-menu-flip='top-end'
                                onClick={() => {
                                    setMore(false)
                                    setEdit(true)
                                }}
                            >
                                <i
                                    className='bi bi-pencil-square'
                                    style={{color: '#6078EC', fontSize: '16px'}}
                                ></i>

                                {/* <i className='bi bi-three-dots fs-3'></i> */}
                            </button>
                            {/* <Dropdown1 /> */}
                        </div>
                    ) : (
                        <>
                            {edit ? (
                                <div
                                    className='d-flex justify-content-end '
                                    style={{marginTop: '-34px', paddingRight: '23px'}}
                                >
                                    <button
                                        className='btn btn-sm btn-icon text-color-primary  btn-bg-light btn-active-color-primary'
                                        data-kt-menu-trigger='click'
                                        style={{color: 'blue', width: '60px'}}
                                        data-kt-menu-placement='bottom-end'
                                        data-kt-menu-flip='top-end'
                                        onClick={() => {
                                            setMore(true)
                                            setEdit(false)
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <b></b>
                            )}
                        </>
                    )}
                    {/* </div> */}
                </div>
                {!edit ? (
                    <>
                        {more ? (
                            <>
                                <div className='modal-header mb-2 mt-2 ms-8 me-8'></div>

                                <div style={{fontSize: '14px'}}>
                                    <div className='mb-10 mt-10  m-sm-12'>
                                        <div className='d-flex ms-sm-20'>
                                            {/* <label className='form-label fw-bold'>Settlement:*</label> */}

                                            <label className='ms-8 form-check form-check-sm form-check-custom form-check-solid me-5'>
                                                {/* <input
                        className='form-check-input ml-8'
                        type='checkbox'
                        value='1'
                        defaultChecked={true}
                      /> */}
                                                <span
                                                    className='form-check-label'
                                                    style={{
                                                        color: '#424242',
                                                        fontWeight: '',
                                                        fontFamily: 'Manrope',
                                                    }}
                                                >
                                                    Reconcilation:
                                                    <font style={{color: 'red'}}>*</font>
                                                </span>
                                            </label>
                                            <label
                                                className='ms-sm-16'
                                                style={{
                                                    color: 'grey',
                                                    marginTop: '3px',
                                                    marginRight: '14px',
                                                }}
                                            >
                                                March 11
                                            </label>
                                            <label
                                                style={{marginTop: '3px', color: 'grey'}}
                                                className='form-check ms-sm-16 form-check-sm form-check-custom form-check-solid'
                                            >
                                                <span className='form-check-label'>June 21</span>
                                            </label>
                                            <label
                                                style={{marginTop: '3px', color: 'grey'}}
                                                className='form-check ms-sm-16 form-check-sm form-check-custom form-check-solid'
                                            >
                                                <span className='form-check-label'>Augest 30</span>
                                            </label>
                                        </div>
                                    </div>
                                    {/* <SettingTables /> */}
                                </div>
                            </>
                        ) : (
                            <b></b>
                        )}
                    </>
                ) : (
                    <>
                        <div className='modal-header mb-2 mt-2 ms-8 me-8'></div>
                        <div style={{fontSize: '14px'}}>
                            <div className='mb-10 d-md-flex mt-6 m-20'>
                                <div className='d-md-flex flex-start-md flex-sm'>
                                    {/* <label className='form-label fw-bold'>Settlement:*</label> */}

                                    <label className='form-check form-check-sm form-check-custom form-check-solid me-5'>
                                        {/* <input
                    className='form-check-input '
                    type='checkbox'
                    value='1'
                    defaultChecked={true}
                  /> */}
                                        <span
                                            style={{
                                                color: '#212121',
                                                fontSize: '14px',
                                                fontFamily: 'Manrope',
                                            }}
                                            className='form-check-label'
                                        >
                                            Recon Date:
                                        </span>
                                    </label>
                                    <div className='d-flex ms-sm-11 align-items-center'>
                                        <div
                                            className=' mt-1'
                                            style={{
                                                width: '102px',
                                                height: '34px',
                                                borderRadius: '6px',

                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: '',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    width: '87px',
                                                    height: '34px',
                                                    fontWeight: '800',
                                                    color: '#424242',
                                                    // fontSize: '14px',
                                                }}
                                                // style={{background: '#EEEEEE'}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm cursor-pointer bg-cmGrey200'
                                                defaultValue='1'
                                            >
                                                <option value='1'>March</option>
                                                {/* <option value='1'>$ 100 per KW</option> */}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='d-flex align-items-center'>
                                        <div
                                            className=' mt-1 ms-sm-3'
                                            style={{
                                                width: '75px',
                                                height: '34px',
                                                borderRadius: '6px',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: '',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    width: '61px',
                                                    height: '34px',
                                                    fontWeight: '800',
                                                    color: '#424242',
                                                }}
                                                // style={{background: '#EEEEEE'}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm cursor-pointer bg-cmGrey200'
                                                defaultValue='1'
                                            >
                                                <option value='1'>11</option>
                                                {/* <option value='1'>$ 100 per KW</option> */}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='d-flex ms-sm-18'>
                                        <div
                                            className=' mt-1'
                                            style={{
                                                width: '102px',
                                                height: '34px',
                                                borderRadius: '6px',

                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: '',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    width: '87px',
                                                    height: '34px',
                                                    fontWeight: '800',
                                                    color: '#424242',
                                                    // fontSize: '14px',
                                                }}
                                                // style={{background: '#EEEEEE'}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm'
                                                defaultValue='1'
                                            >
                                                <option value='1'>June</option>
                                                {/* <option value='1'>$ 100 per KW</option> */}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='d-flex align-items-center'>
                                        <div
                                            className=' mt-1 ms-sm-3'
                                            style={{
                                                background: '#EEEEEE',
                                                width: '81px',
                                                height: '34px',
                                                borderRadius: '6px',
                                                fontWeight: '800px',
                                                color: '#424242',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: '',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    width: '66px',
                                                    height: '34px',
                                                    fontWeight: '800',
                                                    color: '#424242',
                                                }}
                                                // style={{background: '#EEEEEE'}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm'
                                                defaultValue='1'
                                            >
                                                <option value='1'>21</option>
                                                {/* <option value='1'>$ 100 per KW</option> */}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='d-flex ms-sm-18'>
                                        <div
                                            className=' mt-1'
                                            style={{
                                                width: '102px',
                                                height: '34px',
                                                borderRadius: '6px',

                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: '',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    width: '87px',
                                                    height: '34px',
                                                    fontWeight: '800px',
                                                    color: '#424242',
                                                    // fontSize: '14px',
                                                }}
                                                // style={{background: '#EEEEEE'}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm cursor-pointer bg-cmGrey200'
                                                defaultValue='1'
                                            >
                                                <option value='1'>Augests</option>
                                                {/* <option value='1'>$ 100 per KW</option> */}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='d-flex align-items-center'>
                                        <div
                                            className=' mt-1 ms-sm-3'
                                            style={{
                                                width: '81px',
                                                height: '34px',
                                                borderRadius: '6px',

                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: '',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    width: '66px',
                                                    height: '34px',
                                                    fontWeight: '800',
                                                    color: '#424242',
                                                }}
                                                // style={{background: '#EEEEEE'}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm cursor-pointer bg-cmGrey200'
                                                defaultValue='1'
                                            >
                                                <option value='1'>30</option>
                                                {/* <option value='1'>$ 100 per KW</option> */}
                                            </select>
                                        </div>
                                    </div>
                                    {/* <label
                  style={{
                    color: 'grey',
                    marginLeft: '7px',
                    marginTop: '3px',
                    marginRight: '14px',
                  }}
                >
                  March 11
                </label>
                <label
                  style={{marginLeft: '12px', marginTop: '3px'}}
                  className='form-check  form-check-sm form-check-custom form-check-solid'
                >
                  <span className='form-check-label'>June 21</span>
                </label> */}
                                </div>
                            </div>
                            {/* <SettingTables /> */}
                        </div>
                        <div style={{background: '#F9F9F9', height: '55px'}} className=''>
                            <div className='d-flex ms-20 mt-4'>
                                <ul
                                    style={{
                                        fontFamily: 'Manrope',
                                        color: '#212121',
                                        fontWeight: '400',
                                        fontStyle: 'SemiBold',
                                        fontSize: '16px',
                                    }}
                                    className='nav nav-stretch ms-sm-20 nav-line-tabs nav-line-tabs-2x border-transparent  flex-nowrap'
                                >
                                    <li className='nav-item mt-6 ms-20 d-flex text-end ms-sm-20 mt-5'>
                                        <div
                                            style={{
                                                color: 'blue',
                                                width: '15px',
                                                height: '15px',
                                                border: '1px solid blue',
                                            }}
                                            className='d-flex text-center align-item-center justify-content-center'
                                        >
                                            <b style={{marginTop: '-5px'}}>+</b>
                                        </div>
                                        <li
                                            className='ms-2'
                                            style={{
                                                color: 'blue',
                                                fontSize: '14px',
                                                textDecoration: 'underline',
                                                padding: '0px',
                                                marginTop: '-3px',
                                            }}
                                        >
                                            Add Another
                                        </li>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
