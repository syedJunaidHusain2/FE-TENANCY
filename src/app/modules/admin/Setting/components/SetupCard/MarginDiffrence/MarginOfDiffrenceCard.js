import React, {useState, useEffect} from 'react'
import More1 from '../../Path1.png'
import Select from '../../../Icon/select.png'
import useMarginCard from './UseMarginCard'
import More from '../../Path.png'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import Edit from '../../../../sequidocs/Icon/edit.png'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
export default function SetupCard1() {
    const {
        loader,
        setLoader,
        toggleMorePress,
        more,
        edit,
        onEditButtonPress,
        onSavePress,
        marginofdiffrence,
        setApplied,
        Applied,
        diffrence,
        setDiffrence,
    } = useMarginCard()
    return (
        <div className='card bg-white h-auto mt-6'>
            <div className='mt-6'>
                <div className='w-100 mb-3 '>
                    <div className='form-check ml-12px d-flex form-switch form-switch-sm form-check-custom form-check-solid'>
                        <label
                            className='form-label ms-11'
                            style={{
                                fontSize: '16px',
                                fontFamily: 'Manrope',
                                // fontStyle: 'Medium',
                                color: '#0D1821',
                                fontWeight: '700',
                            }}
                        >
                            Margin of Difference
                        </label>
                        <img
                            style={{marginLeft: '17px', marginTop: '-3px', cursor: 'pointer'}}
                            onClick={() => toggleMorePress(!more ? true : false)}
                            src={!more ? More : More1}
                        ></img>
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
                                onClick={onEditButtonPress}
                            >
                                <img src={Edit} alt='' style={{width: '34px'}} />

                                {/* <img
                  style={{width: '14px'}}
                  src='https://img.icons8.com/ultraviolet/40/null/pencil--v1.png'
                /> */}
                                {/* <i className='bi bi-three-dots fs-3'></i> */}
                            </button>
                            {/* <Dropdown1 /> */}
                        </div>
                    ) : (
                        <>
                            {edit ? (
                                <div
                                    className='d-flex justify-content-end  me-4 ms-6'
                                    style={{marginTop: '-34px'}}
                                >
                                    <button
                                        className='btn btn-sm btn-icon text-primary  btn-bg-light btn-active-color-primary'
                                        data-kt-menu-trigger='click'
                                        style={{width: '60px', fontWeight: '700'}}
                                        data-kt-menu-placement='bottom-end'
                                        data-kt-menu-flip='top-end'
                                        onClick={onSavePress}
                                    >
                                        Save
                                    </button>
                                </div>
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
                                <div className='modal-header mb-2 mt-2 ms-8 me-8'></div>

                                <div className='d-flex ms-11 mt-6 me-6'>
                                    <ul
                                        style={{
                                            fontFamily: 'Manrope',
                                            color: '#212121',
                                            fontWeight: '400',
                                            fontStyle: 'SemiBold',
                                            fontSize: '16px',
                                        }}
                                        className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent  flex-nowrap'
                                    >
                                        <li
                                            className='nav-item text-cmGrey900'
                                            style={{
                                                fontSize: '14px',
                                                fontFamily: 'Manrope',
                                                fontWeight: '600',
                                            }}
                                        >
                                            Setter - Closer Redline Difference:
                                        </li>
                                        <li
                                            className='nav-item ms-12 text-cmGrey700'
                                            style={{
                                                fontSize: '14px',
                                                fontFamily: 'Manrope',
                                                fontWeight: '600',
                                            }}
                                        >
                                            {marginofdiffrence.difference_parcentage}%
                                        </li>
                                    </ul>
                                </div>
                                <div style={{background: '#F9F9F9', height: '55px'}}>
                                    <div className='d-flex ms-sm-18 mt-4'>
                                        <ul
                                            style={{}}
                                            className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent  flex-nowrap'
                                        >
                                            <li className='nav-item d-flex text-end ms-sm-20 mt-5'>
                                                <li
                                                    className='ms-sm-18 text-cmGrey900'
                                                    style={{
                                                        fontSize: '14px',
                                                        fontFamily: 'Manrope',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Applied to:
                                                </li>
                                                <li
                                                    className='nav-item ms-13 text-cmGrey800'
                                                    style={{
                                                        fontSize: '14px',
                                                        fontFamily: 'Manrope',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {marginofdiffrence.applied_to}
                                                </li>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <b></b>
                        )}
                    </>
                ) : (
                    <>
                        <div className='modal-header mb-2 mt-2 ms-8 me-8'></div>

                        <div className='d-flex ms-11 mt-6 me-6'>
                            <ul
                                style={{
                                    fontFamily: 'Manrope',
                                    color: '#212121',
                                    fontWeight: '400',
                                    fontStyle: 'SemiBold',
                                    fontSize: '16px',
                                }}
                                className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent  flex-nowrap'
                            >
                                <li
                                    className='nav-item text-cmGrey900'
                                    style={{
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                        fontWeight: 600,
                                    }}
                                >
                                    Setter - Closer Redline Difference:
                                </li>
                                <li className='nav-item ms-12'>
                                    <CustomInput
                                        value={diffrence}
                                        onChange={(event) => setDiffrence(event.target.value)}
                                    />
                                </li>
                                <li></li>
                                <li
                                    className='nav-item mt-2 ms-2 w-12px h-21px text-cmGrey700'
                                    style={{
                                        fontWeight: '600',
                                        fontSize: '12px',
                                        height: '21px',
                                        width: '13px',
                                    }}
                                >
                                    %
                                </li>
                            </ul>
                        </div>
                        <div style={{background: '#F9F9F9', height: '55px'}}>
                            <div className='d-flex ms-20 mt-4'>
                                <ul
                                    style={{
                                        fontFamily: 'Manrope',
                                        color: '424242',
                                        fontWeight: '400',
                                        fontSize: '14px',
                                    }}
                                    className='nav  nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent  flex-nowrap'
                                >
                                    <li className='nav-item d-flex text-end ms-sm-20 mt-6 text-cmGrey900'>
                                        <li
                                            className='ms-sm-17'
                                            style={{fontFamily: 'Manrope', fontWeight: '600'}}
                                        >
                                            Applied to:
                                        </li>
                                    </li>
                                    <li className='nav-item ms-sm-13 mt-3 text-cmGrey800'>
                                        <div>
                                            <select
                                                style={{
                                                    fontWeight: '800',
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                }}
                                                onChange={(event) => setApplied(event.target.value)}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select w-150px h-34px form-select-black form-select-sm bg-cmGrey200 text-cmGrey800 cursor-pointer'
                                                defaultValue={Applied}
                                            >
                                                {/* <option defaultChecked>{Applied}</option> */}
                                                <option value='Setter'>Setter</option>
                                                <option value='Closer'>Closer</option>

                                                {/* <option value='1'>$ 100 per KW</option> */}
                                            </select>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <CustomLoader full visible={loader} />
        </div>
    )
}
