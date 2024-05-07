import React, {useState, useEffect, useCallback} from 'react'
import More1 from '../Path1.png'
import More from '../Path.png'
import Select from '../../Icon/select.png'
import {
    getMarkettingReconciliationService,
    getSetupActiveInactiveService,
} from '../../../../../../services/Services'

export default function SetupCard1() {
    const [more, setMore] = useState(false)
    const [edit, setEdit] = useState(false)
    const [markettingdeal, setMarkettingDeal] = useState(false)
    const handleMarkeeting = useCallback(() => {
        if (markettingdeal === false) {
            let body = {type: 'marketing', status: 1}
            getSetupActiveInactiveService(body)
            setMarkettingDeal(true)
            setMore(false)
            setEdit(false)
        } else {
            setMarkettingDeal(false)
            setEdit(false)
            let body = {type: 'marketing', status: 0}
            getSetupActiveInactiveService(body)
            setMore(false)
        }
    }, [markettingdeal])
    useEffect(function () {
        getMarkettingReconciliationService().then((res) => {
            if (res.setting_status === 1) {
                setMarkettingDeal(true)
            } else {
                setMarkettingDeal(false)
                setMore(false)
            }
        })
    }, [])
    return (
        <div className='card shadow bg-white h-auto mt-6'>
            <div className='mt-6 mb-3 '>
                <div className='w-100'>
                    <div
                        style={{marginLeft: '36px'}}
                        className='form-check  ml-12px d-flex form-switch form-switch-sm form-check-custom form-check-solid'
                    >
                        <label
                            style={{
                                fontSize: '16px',
                                fontFamily: 'Manrope',
                                // fontStyle: 'Medium',
                                color: '#0D1821',
                                fontWeight: '700',
                            }}
                            className='form-label ml-8'
                        >
                            Marketing Deals (MD)
                        </label>

                        <input
                            style={{marginLeft: '15px', marginTop: '-3px'}}
                            className='form-check-input ml-8'
                            type='checkbox'
                            checked={markettingdeal}
                            name='notifications'
                            onClick={handleMarkeeting}
                        />
                        <label
                            className='ms-3 me-2'
                            style={{color: '#757575', fontFamily: 'Manrope', fontSize: '12px'}}
                        >
                            {markettingdeal ? 'Enabled' : 'Disabled'}
                        </label>
                        {!more ? (
                            <img
                                style={{marginLeft: '17px', marginTop: '-3px', cursor: 'pointer'}}
                                onClick={() => setMore(true)}
                                src={markettingdeal === true ? More : ''}
                            ></img>
                        ) : (
                            <img
                                style={{marginLeft: '17px', marginTop: '-3px', cursor: 'pointer'}}
                                onClick={() => setMore(false)}
                                src={markettingdeal === true ? More : ''}
                            ></img>
                        )}
                    </div>
                    {more ? (
                        <div
                            className='d-flex justify-content-end '
                            style={{marginTop: '-34px', paddingRight: '23px'}}
                        >
                            {/* <button
                className=' btn btn-sm btn-icon  btn-bg-light btn-active-color-primary'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-flip='top-end'
                onClick={() => {
                  setMore(false)
                  setEdit(true)
                }}
              >
                <i className='bi bi-pencil-square' style={{color: '#6078EC', fontSize: '16px'}}></i>
              </button> */}
                            {/* <Dropdown1 /> */}
                        </div>
                    ) : (
                        <>
                            {edit ? (
                                // <div
                                //   className='d-flex justify-content-end '
                                //   style={{marginTop: '-34px', paddingRight: '23px'}}
                                // >
                                //   <button
                                //     className='btn btn-sm btn-icon text-color-primary  btn-bg-light btn-active-color-primary'
                                //     data-kt-menu-trigger='click'
                                //     style={{color: 'blue', width: '60px'}}
                                //     data-kt-menu-placement='bottom-end'
                                //     data-kt-menu-flip='top-end'
                                //     onClick={() => {
                                //       setMore(true)
                                //       setEdit(false)
                                //     }}
                                //   >
                                //     Save
                                //   </button>
                                // </div>
                                <></>
                            ) : (
                                <b></b>
                            )}
                        </>
                    )}
                </div>
                {!edit ? (
                    <>
                        {more ? (
                            <>
                                {' '}
                                <div className='modal-header mb-2 mt-10 ms-8 me-8'></div>
                                <div style={{fontSize: '14px'}}>
                                    <div
                                        className='mb-10 mt-6 m-11 mt-13'
                                        style={{fontWeight: '600'}}
                                    >
                                        <div
                                            className=' me-5 d-flex-sm d-sm-flex d-flex flex-rows'
                                            style={{
                                                fontSize: '13.84px',
                                                color: '#004CE8                ',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            View Marketing Deal
                                        </div>
                                        <div
                                            className=' me-5 mt-3 d-flex-sm d-sm-flex d-flex flex-rows'
                                            style={{
                                                fontSize: '13.84px',
                                                color: '#004CE8                ',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            View Marketing Deal Reconciliations
                                        </div>
                                    </div>

                                    {/* <div className='d-flex'>
                      {/* <label className='form-label fw-bold'>Settlement:*</label> */}
                                    {/* 
                      <label className='form-check form-check-sm form-check-custom form-check-solid me-5'>
                        <input
                          className='form-check-input ml-8'
                          type='checkbox'
                          value='1'
                          defaultChecked={true}
                        />
                        <span
                          className='form-check-label'
                          style={{fontFamily: 'Manrope', fontSize: '14px'}}
                        > */}
                                    {/* Reconcilation:<font style={{color: 'red'}}>*</font>
                        </span>
                      </label>
                      <label
                        style={{
                          color: 'grey',
                          marginLeft: '7px',
                          marginTop: '3px',
                          marginRight: '14px',
                        }} */}
                                    {/* > */}
                                    {/* March 11
                      </label>
                      <label
                        style={{marginLeft: '12px', marginTop: '3px'}}
                        className='form-check  form-check-sm form-check-custom form-check-solid'
                      >
                        <span className='form-check-label'>June 21</span>
                      </label>
                    </div> */}
                                    {/* </div> */}
                                    {/* <SettingTables /> */}
                                </div>
                            </>
                        ) : (
                            <b></b>
                        )}
                    </>
                ) : (
                    <>
                        {' '}
                        <div className='modal-header mb-2 mt-2 ms-8 me-8'></div>
                        <div style={{fontSize: '14px'}}>
                            <div className='mb-10 d-md-flex mt-6 m-20'>
                                <div className='d-md-flex flex-start-md flex-sm'>
                                    {/* <label className='form-label fw-bold'>Settlement:*</label> */}

                                    <label className='form-check form-check-sm form-check-custom form-check-solid me-5'>
                                        <input
                                            className='form-check-input '
                                            type='checkbox'
                                            value='1'
                                            defaultChecked={true}
                                        />
                                        <span
                                            className='form-check-label'
                                            style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                        >
                                            Reconcilation:*
                                        </span>
                                    </label>
                                    <div className='d-flex align-items-center'>
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
                                            className=' mt-1'
                                            style={{
                                                background: '#EEEEEE',
                                                width: '75px',
                                                marginLeft: '15px',
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
                                                    width: '61px',
                                                    height: '34px',
                                                    fontWeight: '800',
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

                                    <div className='d-flex ms-4'>
                                        <div
                                            className=' mt-1'
                                            style={{
                                                width: '102px',
                                                height: '34px',
                                                borderRadius: '6px',
                                                fontWeight: '800',

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

                                                    // fontSize: '14px',
                                                }}
                                                // style={{background: '#EEEEEE'}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm cursor-pointer bg-cmGrey200'
                                                defaultValue='1'
                                            >
                                                <option value='1'>June</option>
                                                {/* <option value='1'>$ 100 per KW</option> */}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='d-flex align-items-center'>
                                        <div
                                            className=' mt-1'
                                            style={{
                                                width: '81px',
                                                marginLeft: '15px',
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
                                                <option value='1'>21</option>
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
                    </>
                )}
            </div>
        </div>
    )
}
