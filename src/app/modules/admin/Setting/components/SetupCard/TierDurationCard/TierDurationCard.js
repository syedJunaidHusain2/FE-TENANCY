import React, {useState, useEffect} from 'react'
import More1 from '../../Path1.png'
import More from '../../Path.png'
import {ConfigureTierModal} from './ConfigureTierModal'
import Edit from '../../../../sequidocs/Icon/edit.png'
import useTierDuration from './UseTierDuration'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
export default function TierDurationCard() {
    const {
        handleTier,
        handletiredcommissioncheck,
        handleUpfrontcheck,
        handleoveridescheck,
        getTierLevel,
        toggleMorePress,
        more,
        edit,
        onEditButtonPress,
        onSavePress,
        tiredcommission,
        upfront,
        overrides,
        showCreateAppModal,
        setShowCreateAppModal,
        handleUpfront,
        handleoverides,
        handletiredcommission,
        loading,
        setLoading,
        companySetting,
    } = useTierDuration()
    const [data, setData] = useState([])
    const [tiercheck, setTierCheck] = useState()
    const [overridescheck, setOverridescheck] = useState()
    const [upfrontcheck, setUpfrontCheck] = useState()
    useEffect(
        function () {
            setTierCheck(tiredcommission?.is_check)
            setUpfrontCheck(upfront?.is_check)
            setOverridescheck(overrides?.is_check)
        },
        [tiredcommission, upfront, overrides]
    )
    return (
        <div className='card shadow-sm bg-cmwhite h-auto mt-6'>
            <div className='mt-6 mb-3'>
                <div className='w-100'>
                    <div
                        style={{marginLeft: '36px'}}
                        className='form-check ml-12px d-flex form-switch form-switch-sm form-check-custom form-check-solid'
                    >
                        <label
                            className='form-label ml-8 text-cmBlack'
                            style={{
                                fontSize: '16px',
                                fontFamily: 'Manrope',
                                // fontStyle: 'Medium',

                                fontWeight: '600',
                            }}
                        >
                            Tier Level
                        </label>
                        <input
                            style={{marginLeft: '15px', marginTop: '-3px'}}
                            className='form-check-input ml-8'
                            type='checkbox'
                            checked={companySetting?.tier}
                            name='notifications'
                            onClick={handleTier}
                        />
                        <label
                            className='ms-3 me-2'
                            style={{color: '#757575', fontFamily: 'Manrope', fontSize: '12px'}}
                        >
                            {companySetting?.tier ? 'Enabled' : 'Disabled'}
                        </label>
                        {companySetting?.tier && (
                            <img
                                style={{marginLeft: '17px', marginTop: '-3px', cursor: 'pointer'}}
                                onClick={() => toggleMorePress(!more ? true : false)}
                                src={!more ? More : More1}
                            ></img>
                        )}
                    </div>
                    {more && (
                        <>
                            {edit ? (
                                <div
                                    className='d-flex justify-content-end flex-col '
                                    style={{marginTop: '-34px', paddingRight: '10px'}}
                                >
                                    <button
                                        className='btn btn-sm btn-icon text-cmBlue-Crayola btn-bg-light btn-active-color-primary'
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
                                <div
                                    className='d-flex justify-content-end '
                                    style={{marginTop: '-34px', paddingRight: '23px'}}
                                >
                                    {' '}
                                    <button
                                        className=' btn btn-sm btn-icon  btn-bg-light btn-active-color-primary'
                                        data-kt-menu-trigger='click'
                                        data-kt-menu-placement='bottom-end'
                                        data-kt-menu-flip='top-end'
                                        onClick={onEditButtonPress}
                                    >
                                        <img src={Edit} alt='' style={{width: '34px'}} />

                                        {/* <i className='bi bi-three-dots fs-3'></i> */}
                                    </button>
                                    {/* <Dropdown1 /> */}
                                </div>
                            )}
                        </>
                    )}
                </div>
                {more && (
                    <>
                        {!edit ? (
                            <>
                                {' '}
                                <div className='modal-header mb-2 mt-2 ms-20 me-8'></div>
                                <div className='container mt-2' style={{fontSize: '14px'}}>
                                    <div className='row g-2 w-md-500px ms-4'>
                                        <div className='col-6'>
                                            <div
                                                className='p-3 text-cmGrey900'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    marginTop: '0px',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Default Tier Bump Settlement:
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div
                                                className='p-3 text-cmGrey800'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Reconciliations
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='container mt-2' style={{fontSize: '14px'}}>
                                    <div className='row w-md-1010px ms-4 '>
                                        <div className='col-sm'>
                                            <div
                                                className='p-3 text-cmGrey900'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    marginTop: '0px',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                <input
                                                    style={{marginRight: '10px', marginTop: '0px'}}
                                                    className='form-check-input '
                                                    type='checkbox'
                                                    checked={
                                                        tiredcommission?.is_check === 1
                                                            ? true
                                                            : false
                                                    }
                                                    readOnly
                                                    name='notifications'
                                                />
                                                {tiredcommission?.name}{' '}
                                            </div>
                                        </div>
                                        {tiredcommission?.is_check == 1 ? (
                                            <>
                                                <div className='col-sm '>
                                                    <div
                                                        className='p-3 text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Scale based on:
                                                        <label
                                                            className='ms-sm-6 text-cmGrey800'
                                                            style={{fontWeight: 600}}
                                                        >
                                                            {' '}
                                                            {tiredcommission?.scale_based_on}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-sm'>
                                                    <div
                                                        className='p-3 ms-sm-10 text-cmGrey900 '
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Shifts on:
                                                        <label
                                                            className='ms-sm-6 text-cmGrey800'
                                                            style={{fontWeight: 600}}
                                                        >
                                                            {' '}
                                                            {tiredcommission?.shifts_on}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-sm'>
                                                    <div
                                                        className='p-3 text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: '500',
                                                        }}
                                                    >
                                                        Reset:
                                                        <label
                                                            className='ms-sm-6 text-cmGrey800'
                                                            style={{fontWeight: '600'}}
                                                        >
                                                            {' '}
                                                            {tiredcommission?.Reset}
                                                        </label>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <b></b>
                                        )}
                                    </div>
                                </div>
                                {tiredcommission?.is_check == 1 ? (
                                    <div className='w-75 ms-sm-19 d-flex justify-content-center'>
                                        <table
                                            id='get'
                                            className='table  mt-6 w-md-325px bg-cmGrey300'
                                            style={{
                                                height: 'auto',
                                            }}
                                        >
                                            <thead
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontSize: '13.84px',
                                                    fontWeight: '600',
                                                }}
                                                className='text-cmGrey900 bg-cmGrey300'
                                            >
                                                <tr className='d-flex flex-row justify-content-between me-4'>
                                                    <th className='d-flex ms-4' scope='col'>
                                                        Installs from
                                                    </th>
                                                    <th className='d-flex ms-4' scope='col'>
                                                        Redline Shift
                                                    </th>
                                                    <th scope='col'>Installs to</th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className='text-cmGrey700'
                                                style={{fontWeight: 500}}
                                            >
                                                {tiredcommission?.Configure.map((item, index) => (
                                                    <>
                                                        {' '}
                                                        {(index + 1) % 2 != 0 ? (
                                                            <tr className='d-flex flex-row justify-content-between stripRow'>
                                                                <th
                                                                    className='d-flex ms-4'
                                                                    scope='col'
                                                                >
                                                                    {item.installs_from}
                                                                </th>
                                                                <th
                                                                    className='d-flex ms-4'
                                                                    scope='col'
                                                                >
                                                                    {item.redline_shift}{' '}
                                                                </th>
                                                                <th
                                                                    scope='col'
                                                                    className='d-flex me-7'
                                                                >
                                                                    {item.installs_to}
                                                                </th>
                                                            </tr>
                                                        ) : (
                                                            <tr className='d-flex flex-row justify-content-between'>
                                                                <th
                                                                    className='d-flex ms-4'
                                                                    scope='col'
                                                                >
                                                                    {item.installs_from}
                                                                </th>
                                                                <th
                                                                    className='d-flex ms-4'
                                                                    scope='col'
                                                                >
                                                                    {item.redline_shift}{' '}
                                                                </th>
                                                                <th
                                                                    scope='col'
                                                                    className='d-flex me-7'
                                                                >
                                                                    {item.installs_to}
                                                                </th>
                                                            </tr>
                                                        )}
                                                    </>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <b></b>
                                )}
                                <div className='container mt-2' style={{fontSize: '14px'}}>
                                    <div className='row w-md-1010px ms-4 '>
                                        <div className='col-sm'>
                                            <div
                                                className='p-3 text-cmGrey900'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    marginTop: '0px',
                                                    fontSize: '14px',
                                                    // color: '#424242',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <input
                                                    style={{marginRight: '10px', marginTop: '0px'}}
                                                    className='form-check-input'
                                                    type='checkbox'
                                                    value=''
                                                    name='notifications'
                                                    checked={
                                                        overrides?.is_check === 1 ? true : false
                                                    }
                                                    readOnly
                                                />
                                                {overrides?.name}
                                            </div>
                                        </div>
                                        {overrides?.is_check == 1 ? (
                                            <>
                                                <div className='col-sm '>
                                                    <div
                                                        className='p-3 text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Scale based on:
                                                        <label
                                                            className='ms-sm-6 text-cmGrey800'
                                                            style={{fontWeight: 600}}
                                                        >
                                                            {overrides?.scale_based_on}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-sm'>
                                                    <div
                                                        className='p-3 ms-sm-10 text-cmGrey900 '
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Shifts on:
                                                        <label
                                                            className='ms-sm-6 text-cmGrey800'
                                                            style={{fontWeight: 600}}
                                                        >
                                                            {' '}
                                                            {overrides?.Reset}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div
                                                        className='text-cmGrey800'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        {/* Reset:<label className='ms-sm-6'> Monthly</label> */}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <b></b>
                                        )}
                                    </div>
                                </div>
                                {overrides?.is_check == 1 ? (
                                    <div
                                        style={{}}
                                        className='w-75 ms-sm-19 d-flex justify-content-center'
                                    >
                                        <table
                                            id='get'
                                            className='table  mt-6 w-md-325px  text-cmGrey900'
                                            style={{
                                                height: 'auto',
                                            }}
                                        >
                                            <thead
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontSize: '13.84px',
                                                    fontWeight: 600,
                                                }}
                                                className='text-cmGrey900 bg bg-cmGrey300'
                                            >
                                                <tr className='d-flex flex-row justify-content-between me-4'>
                                                    <th className='d-flex ms-4' scope='col'>
                                                        Installs from
                                                    </th>
                                                    <th className='d-flex ms-4' scope='col'>
                                                        Override
                                                    </th>
                                                    <th scope='col'>Installs to</th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className='text-cmGrey700'
                                                style={{fontWeight: 500}}
                                            >
                                                {overrides?.Configure.map((item, index) => (
                                                    <>
                                                        {' '}
                                                        {(index + 1) % 2 != 0 ? (
                                                            <tr className='d-flex flex-row justify-content-between stripRow'>
                                                                <th
                                                                    className='d-flex ms-4'
                                                                    scope='col'
                                                                >
                                                                    {item.installs_from}
                                                                </th>
                                                                <th
                                                                    className='d-flex ms-4'
                                                                    scope='col'
                                                                >
                                                                    {item.redline_shift}{' '}
                                                                </th>
                                                                <th
                                                                    scope='col'
                                                                    className='d-flex me-7'
                                                                >
                                                                    {item.installs_to}
                                                                </th>
                                                            </tr>
                                                        ) : (
                                                            <tr className='d-flex flex-row justify-content-between'>
                                                                <th
                                                                    className='d-flex ms-4'
                                                                    scope='col'
                                                                >
                                                                    {item.installs_from}
                                                                </th>
                                                                <th
                                                                    className='d-flex ms-4'
                                                                    scope='col'
                                                                >
                                                                    {item.redline_shift}{' '}
                                                                </th>
                                                                <th
                                                                    scope='col'
                                                                    className='d-flex me-7'
                                                                >
                                                                    {item.installs_to}
                                                                </th>
                                                            </tr>
                                                        )}
                                                    </>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <b></b>
                                )}
                                <div className='container mt-2' style={{fontSize: '14px'}}>
                                    <div className='row w-md-1010px ms-4 '>
                                        <div className='col-sm'>
                                            <div
                                                className='p-3 text-cmGrey900'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    marginTop: '0px',
                                                    fontSize: '14px',
                                                    // color: '#424242',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                <input
                                                    style={{marginRight: '10px', marginTop: '0px'}}
                                                    className='form-check-input'
                                                    type='checkbox'
                                                    value=''
                                                    name='notifications'
                                                    checked={upfront?.is_check === 1 ? true : false}
                                                    readOnly
                                                />
                                                {upfront?.name}
                                            </div>
                                        </div>

                                        <div className='col-sm '>
                                            {upfront?.is_check == 1 ? (
                                                <div
                                                    className='p-3 text-cmGrey800'
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontSize: '14px',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {overrides?.shifts_on}
                                                </div>
                                            ) : (
                                                <b></b>
                                            )}
                                        </div>
                                        <div className='col-sm'></div>
                                        <div className='col'></div>
                                    </div>
                                </div>
                                {upfront?.is_check == 1 ? (
                                    <>
                                        <div className='container mt-2' style={{fontSize: '14px'}}>
                                            <div className='row w-md-1010px ms-4 '>
                                                <div className='col-sm'>{/*  */}</div>
                                                <div className='col-sm '>
                                                    <div
                                                        className='p-3 text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Scale based on:
                                                        <label
                                                            className='ms-sm-6 text-cmGrey800'
                                                            style={{fontWeight: '600'}}
                                                        >
                                                            {upfront?.scale_based_on}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-sm mt-sm-3'>
                                                    <div
                                                        className='text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: '500',
                                                        }}
                                                    >
                                                        Shifts on:
                                                        <label
                                                            className='ms-sm-6 text-cmGrey800 '
                                                            style={{fontWeight: '600'}}
                                                        >
                                                            {' '}
                                                            {upfront?.shifts_on}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col mt-sm-3'>
                                                    <div
                                                        className='text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Reset:
                                                        <label
                                                            className='ms-sm-6 text-cmGrey800'
                                                            style={{fontWeight: '600'}}
                                                        >
                                                            {' '}
                                                            {upfront?.Reset}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <b></b>
                                )}
                                {upfront?.is_check == 1 ? (
                                    <div
                                        style={{}}
                                        className='w-75 mb-6 ms-sm-11 d-flex justify-content-center'
                                    >
                                        <table
                                            id='get'
                                            className='table ms-19 mt-6 w-md-325px'
                                            style={{
                                                height: 'auto',
                                            }}
                                        >
                                            <thead
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontSize: '13.84px',
                                                    fontWeight: 600,
                                                }}
                                                className='text-cmGrey900 bg-cmGrey300'
                                            >
                                                <tr className='d-flex flex-row justify-content-between me-4'>
                                                    <th className='d-flex ms-4' scope='col'>
                                                        Installs from
                                                    </th>
                                                    <th className='d-flex ms-4' scope='col'>
                                                        Redline Shift
                                                    </th>
                                                    <th scope='col'>Installs to</th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className='text-cmGrey700'
                                                style={{fontWeight: '500'}}
                                            >
                                                {upfront?.Configure.map((item, index) => (
                                                    <>
                                                        {' '}
                                                        {(index + 1) % 2 != 0 ? (
                                                            <tr className='d-flex flex-row justify-content-between stripRow'>
                                                                <th
                                                                    className='d-flex ms-4'
                                                                    scope='col'
                                                                >
                                                                    {item.installs_from}
                                                                </th>
                                                                <th
                                                                    className='d-flex ms-4'
                                                                    scope='col'
                                                                >
                                                                    {item.redline_shift}{' '}
                                                                </th>
                                                                <th
                                                                    scope='col'
                                                                    className='d-flex me-7'
                                                                >
                                                                    {item.installs_to}
                                                                </th>
                                                            </tr>
                                                        ) : (
                                                            <tr className='d-flex flex-row justify-content-between'>
                                                                <th
                                                                    className='d-flex ms-4'
                                                                    scope='col'
                                                                >
                                                                    {item.installs_from}
                                                                </th>
                                                                <th
                                                                    className='d-flex ms-4'
                                                                    scope='col'
                                                                >
                                                                    {item.redline_shift}{' '}
                                                                </th>
                                                                <th
                                                                    scope='col'
                                                                    className='d-flex me-7'
                                                                >
                                                                    {item.installs_to}
                                                                </th>
                                                            </tr>
                                                        )}
                                                    </>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <b></b>
                                )}
                            </>
                        ) : (
                            <>
                                <div className='modal-header mb-2 mt-2 ms-8 me-8'></div>

                                <div className='container mt-2' style={{fontSize: '14px'}}>
                                    <div className='row g-2 w-md-500px ms-4'>
                                        <div className='col-6'>
                                            <div
                                                className='p-3'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    color: '#212121                          ',
                                                    marginTop: '0px',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Default Tier Bump Settlement:
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div
                                                className='p-3 text-cmGrey800'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontSize: '14px',
                                                    // color: 'red                     ',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Reconciliations
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='container mt-2' style={{fontSize: '14px'}}>
                                    <div className='row w-100 ms-4 '>
                                        <div className='col-sm'>
                                            <div
                                                className='p-3 text-cmGrey900'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    marginTop: '0px',
                                                    fontSize: '14px',
                                                    // color: '#424242',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                <input
                                                    style={{marginRight: '10px', marginTop: '0px'}}
                                                    className='form-check-input '
                                                    type='checkbox'
                                                    onClick={(e) => {
                                                        setTierCheck(e.target.value)
                                                        handletiredcommissioncheck(e, 'is_check')
                                                    }}
                                                    name='notifications'
                                                    value={tiercheck == 1 ? 0 : 1}
                                                    checked={
                                                        tiredcommission?.is_check == 1
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {tiredcommission?.name}
                                            </div>
                                        </div>
                                        {tiercheck == 1 ? (
                                            <>
                                                <div className='col-sm-4 mar1'>
                                                    <div
                                                        className='p-3 d-flex flex-row text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Scale based on:
                                                        <label
                                                            className='ms-7 d-flex flex-row h-35px '
                                                            style={{
                                                                marginTop: '-6px',
                                                                width: '160px',
                                                                borderRadius: '6px',
                                                                fontWeight: 800,
                                                            }}
                                                        >
                                                            <select
                                                                style={{
                                                                    fontSize: '14px',
                                                                    fontWeight: 'bold',
                                                                }}
                                                                name='status'
                                                                data-control='select2'
                                                                defaultValue='1'
                                                                data-hide-search='true'
                                                                onChange={(e) =>
                                                                    handletiredcommission(
                                                                        e,
                                                                        'scale_based_on'
                                                                    )
                                                                }
                                                                className='custom-select form-select form-select-black form-select-sm text-cmGrey900 bg-cmGrey200'
                                                            >
                                                                <option
                                                                    value='none'
                                                                    selected
                                                                    hidden
                                                                >
                                                                    {
                                                                        tiredcommission?.scale_based_on
                                                                    }{' '}
                                                                </option>
                                                                <option value='Monthly'>
                                                                    Monthly
                                                                </option>
                                                                <option value='Bi-Monthly'>
                                                                    Bi-Monthly
                                                                </option>
                                                                <option value='Quaterly'>
                                                                    Quaterly
                                                                </option>
                                                                <option value='Semi-Annually'>
                                                                    Semi-Annually
                                                                </option>
                                                                <option value='Annually'>
                                                                    Annually
                                                                </option>
                                                                <option value='No.of Installs'>
                                                                    No.of Installs
                                                                </option>
                                                            </select>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-sm mar2'>
                                                    <div
                                                        className='p-3 d-flex flex-row text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Shifts on:
                                                        <label
                                                            className='ms-2 d-flex flex-row h-35px'
                                                            style={{
                                                                marginTop: '-6px',
                                                                width: '160px',
                                                                borderRadius: '6px',
                                                            }}
                                                        >
                                                            <select
                                                                style={{
                                                                    fontWeight: '700',
                                                                    fontSize: '14px',
                                                                }}
                                                                name='status'
                                                                data-control='select2'
                                                                data-hide-search='true'
                                                                className='form-select form-select-black form-select-sm text-cmGrey900 bg-cmGrey200'
                                                                defaultValue='1'
                                                                onChange={(e) =>
                                                                    handletiredcommission(
                                                                        e,
                                                                        'shifts_on'
                                                                    )
                                                                }
                                                            >
                                                                <option
                                                                    value='none'
                                                                    selected
                                                                    hidden
                                                                >
                                                                    {tiredcommission?.shifts_on}
                                                                </option>
                                                                <option value='Monthly'>
                                                                    Monthly
                                                                </option>
                                                                <option value='Bi-Monthly'>
                                                                    Bi-Monthly
                                                                </option>
                                                                <option value='Quaterly'>
                                                                    Quaterly
                                                                </option>
                                                                <option value='Semi-Annually'>
                                                                    Semi-Annually
                                                                </option>
                                                                <option value='Annually'>
                                                                    Annually
                                                                </option>
                                                            </select>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className='col-sm mar2'>
                                                    <div
                                                        className='p-3 d-flex flex-row text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Reset:
                                                        <label
                                                            className='ms-2 d-flex flex-row h-35px'
                                                            style={{
                                                                marginTop: '-6px',
                                                                width: '160px',
                                                                borderRadius: '6px',
                                                            }}
                                                        >
                                                            <select
                                                                style={{
                                                                    fontWeight: '700',
                                                                    fontSize: '14px',
                                                                }}
                                                                name='status'
                                                                data-control='select2'
                                                                data-hide-search='true'
                                                                className='form-select form-select-black form-select-sm text-cmGrey900 bg-cmGrey200'
                                                                defaultValue='1'
                                                                onChange={(e) =>
                                                                    handletiredcommission(
                                                                        e,
                                                                        'Reset'
                                                                    )
                                                                }
                                                            >
                                                                <option value='none' selected>
                                                                    {tiredcommission?.Reset}
                                                                </option>
                                                                <option value='Monthly'>
                                                                    Monthly
                                                                </option>
                                                                <option value='Bi-Monthly'>
                                                                    Bi-Monthly
                                                                </option>
                                                                <option value='Quaterly'>
                                                                    Quaterly
                                                                </option>
                                                                <option value='Semi-Annually'>
                                                                    Semi-Annually
                                                                </option>
                                                                <option value='Annually'>
                                                                    Annually
                                                                </option>
                                                            </select>
                                                        </label>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <b></b>
                                        )}
                                    </div>
                                </div>
                                {tiercheck == 1 ? (
                                    <div className='w-75 ms-sm-13 d-flex d-flex-sm flex-row mt-3'>
                                        <div
                                            className='me-sm-19 ms-sm-6 me-sm-5 d-flex-sm d-sm-flex d-flex flex-rows text-cminfo'
                                            style={{
                                                fontSize: '13.84px',
                                                fontWeight: '500',
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                setData(tiredcommission)
                                                setShowCreateAppModal(true)
                                            }}
                                        >
                                            <i
                                                className='bi bi-pencil me-2 d-flex-sm d-sm-flex text-cmBlue-Crayola'
                                                style={{fontSize: '16px'}}
                                            ></i>
                                            Configure Tiers
                                        </div>
                                        {tiredcommission?.Configure?.length > 0 && (
                                            <table
                                                id='get'
                                                className='table d-flex-sm f-sm-flex  w-md-325px'
                                                style={{
                                                    height: 'auto',
                                                }}
                                            >
                                                <thead
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontSize: '13.84px',
                                                    }}
                                                    className='text-cmGrey900 bg-cmGrey300'
                                                >
                                                    <tr className='d-flex flex-row justify-content-between me-4'>
                                                        <th className='d-flex ms-4' scope='col'>
                                                            Installs from
                                                        </th>
                                                        <th className='d-flex ms-4' scope='col'>
                                                            Redline Shift
                                                        </th>
                                                        <th scope='col'>Installs to</th>
                                                    </tr>
                                                </thead>
                                                <tbody
                                                    className='text-cmGrey700'
                                                    style={{fontWeight: 500}}
                                                >
                                                    {tiredcommission?.Configure.map(
                                                        (item, index) => (
                                                            <>
                                                                {' '}
                                                                {(index + 1) % 2 != 0 ? (
                                                                    <tr className='d-flex flex-row justify-content-between stripRow'>
                                                                        <th
                                                                            className='d-flex ms-4'
                                                                            scope='col'
                                                                        >
                                                                            {item.installs_from}
                                                                        </th>
                                                                        <th
                                                                            className='d-flex ms-4'
                                                                            scope='col'
                                                                        >
                                                                            {item.redline_shift}{' '}
                                                                        </th>
                                                                        <th
                                                                            scope='col'
                                                                            className='d-flex me-7'
                                                                        >
                                                                            {item.installs_to}
                                                                        </th>
                                                                    </tr>
                                                                ) : (
                                                                    <tr className='d-flex flex-row justify-content-between'>
                                                                        <th
                                                                            className='d-flex ms-4'
                                                                            scope='col'
                                                                        >
                                                                            {item.installs_from}
                                                                        </th>
                                                                        <th
                                                                            className='d-flex ms-4'
                                                                            scope='col'
                                                                        >
                                                                            {item.redline_shift}{' '}
                                                                        </th>
                                                                        <th
                                                                            scope='col'
                                                                            className='d-flex me-7'
                                                                        >
                                                                            {item.installs_to}
                                                                        </th>
                                                                    </tr>
                                                                )}
                                                            </>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                ) : (
                                    <b></b>
                                )}

                                <div className='container mt-2' style={{fontSize: '14px'}}>
                                    <div className='row w-100 ms-4 '>
                                        <div className='col-sm'>
                                            <div
                                                className='p-3 text-cmGrey900'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    marginTop: '0px',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                <input
                                                    style={{marginRight: '10px', marginTop: '0px'}}
                                                    className='form-check-input'
                                                    type='checkbox'
                                                    onChange={() => {
                                                        if (overrides?.is_check === 1) {
                                                            setOverridescheck(0)
                                                            handleoveridescheck(0, 'is_check')
                                                        } else {
                                                            setOverridescheck(1)

                                                            handleoveridescheck(1, 'is_check')
                                                        }
                                                    }}
                                                    name='notifications'
                                                    checked={
                                                        overrides?.is_check === 1 ? true : false
                                                    }
                                                />
                                                {overrides?.name}
                                            </div>
                                        </div>
                                        {overridescheck == 1 ? (
                                            <>
                                                <div className='col-sm-4 mar1'>
                                                    <div
                                                        className='p-3 d-flex flex-row text-cmGrey700'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Scale based on:
                                                        <label
                                                            className='ms-7 d-flex flex-row h-35px'
                                                            style={{
                                                                marginTop: '-6px',
                                                                maxWidth: '160px',
                                                                borderRadius: '6px',
                                                            }}
                                                        >
                                                            <select
                                                                style={{
                                                                    fontWeight: '700',
                                                                    fontSize: '14px',
                                                                }}
                                                                name='status'
                                                                data-control='select2'
                                                                defaultValue='1'
                                                                data-hide-search='true'
                                                                className='form-select form-select-black form-select-sm text-cmGrey900 bg-cmGrey200 cursor-pointer'
                                                                onChange={(e) =>
                                                                    handleoverides(
                                                                        e,
                                                                        'scale_based_on'
                                                                    )
                                                                }
                                                            >
                                                                <option
                                                                    value='none'
                                                                    selected
                                                                    hidden
                                                                >
                                                                    {overrides?.scale_based_on}
                                                                </option>
                                                                <option value='Monthly'>
                                                                    Monthly
                                                                </option>
                                                                <option value='Bi-Monthly'>
                                                                    Bi-Monthly
                                                                </option>
                                                                <option value='Quaterly'>
                                                                    Quaterly
                                                                </option>
                                                                <option value='Semi-Annually'>
                                                                    Semi-Annually
                                                                </option>
                                                                <option value='Annually'>
                                                                    Annually
                                                                </option>
                                                                <option value='No.of Installs'>
                                                                    No.of Installs
                                                                </option>
                                                            </select>
                                                        </label>
                                                        {/* <label className='ms-sm-6'> No. of Installs</label> */}
                                                    </div>
                                                </div>
                                                <div className='col-sm mar2'>
                                                    <div
                                                        className='p-3 d-flex flex-row text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: '500',
                                                        }}
                                                    >
                                                        Reset:
                                                        <label
                                                            className='ms-2 d-flex flex-row h-35px'
                                                            style={{
                                                                background: '#EEEEEE',
                                                                marginTop: '-6px',
                                                                width: '160px',
                                                                borderRadius: '6px',
                                                                color: '#424242',
                                                            }}
                                                        >
                                                            <select
                                                                style={{
                                                                    fontWeight: '700',
                                                                    fontSize: '14px',
                                                                }}
                                                                name='status'
                                                                data-control='select2'
                                                                defaultValue='1'
                                                                data-hide-search='true'
                                                                className='form-select form-select-black form-select-sm text-cmGrey900 bg-cmGrey200 cursor-pointer'
                                                                onChange={(e) =>
                                                                    handleoverides(e, 'Reset')
                                                                }
                                                            >
                                                                <option
                                                                    value='none'
                                                                    selected
                                                                    hidden
                                                                >
                                                                    {overrides?.Reset}
                                                                </option>
                                                                <option value='Monthly'>
                                                                    Monthly
                                                                </option>
                                                                <option value='Bi-Monthly'>
                                                                    Bi-Monthly
                                                                </option>
                                                                <option value='Quaterly'>
                                                                    Quaterly
                                                                </option>
                                                                <option value='Semi-Annually'>
                                                                    Semi-Annually
                                                                </option>
                                                                <option value='Annually'>
                                                                    Annually
                                                                </option>
                                                            </select>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-sm mar'></div>
                                            </>
                                        ) : (
                                            <b></b>
                                        )}
                                    </div>
                                </div>
                                {overridescheck == 1 ? (
                                    <div className='w-75 ms-sm-13 d-flex flex-row mt-3'>
                                        <div
                                            className='me-sm-19 ms-sm-6 me-5 d-flex-sm d-sm-flex d-flex flex-rows text-cminfo'
                                            style={{
                                                fontSize: '13.84px',
                                                fontWeight: '500',
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                setData(overrides)
                                                setShowCreateAppModal(true)
                                            }}
                                        >
                                            <i
                                                className='bi bi-pencil me-2 text-cmBlue-Crayola'
                                                style={{fontSize: '16px'}}
                                            ></i>
                                            Configure Tiers
                                        </div>
                                        {overrides?.Configure.length > 0 && (
                                            <table
                                                id='get'
                                                className='table d-flex-sm f-sm-flex  w-md-325px'
                                                style={{
                                                    height: 'auto',
                                                }}
                                            >
                                                <thead
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontSize: '13.84px',
                                                        fontWeight: 600,
                                                    }}
                                                    className='text-cmGrey900 bg-cmGrey300'
                                                >
                                                    <tr className='d-flex flex-row justify-content-between me-4'>
                                                        <th className='d-flex ms-4' scope='col'>
                                                            Installs from
                                                        </th>
                                                        <th className='d-flex ms-4' scope='col'>
                                                            Redline Shift
                                                        </th>
                                                        <th scope='col'>Installs to</th>
                                                    </tr>
                                                </thead>
                                                <tbody
                                                    className='text-cmGrey700'
                                                    style={{fontWeight: 500}}
                                                >
                                                    {overrides?.Configure.map((item, index) => (
                                                        <>
                                                            {' '}
                                                            {(index + 1) % 2 != 0 ? (
                                                                <tr className='d-flex flex-row justify-content-between stripRow'>
                                                                    <th
                                                                        className='d-flex ms-4'
                                                                        scope='col'
                                                                    >
                                                                        {item.installs_from}
                                                                    </th>
                                                                    <th
                                                                        className='d-flex ms-4'
                                                                        scope='col'
                                                                    >
                                                                        {item.redline_shift}{' '}
                                                                    </th>
                                                                    <th
                                                                        scope='col'
                                                                        className='d-flex me-7'
                                                                    >
                                                                        {item.installs_to}
                                                                    </th>
                                                                </tr>
                                                            ) : (
                                                                <tr className='d-flex flex-row justify-content-between'>
                                                                    <th
                                                                        className='d-flex ms-4'
                                                                        scope='col'
                                                                    >
                                                                        {item.installs_from}
                                                                    </th>
                                                                    <th
                                                                        className='d-flex ms-4'
                                                                        scope='col'
                                                                    >
                                                                        {item.redline_shift}{' '}
                                                                    </th>
                                                                    <th
                                                                        scope='col'
                                                                        className='d-flex me-7'
                                                                    >
                                                                        {item.installs_to}
                                                                    </th>
                                                                </tr>
                                                            )}
                                                        </>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                ) : (
                                    <b></b>
                                )}
                                <div className='container mt-2' style={{fontSize: '14px'}}>
                                    <div className='row w-md-1010px ms-4 '>
                                        <div className='col-sm-2 '>
                                            <div
                                                className='p-3 text-cmGrey900'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    marginTop: '0px',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                <input
                                                    style={{marginRight: '10px', marginTop: '0px'}}
                                                    className='form-check-input '
                                                    type='checkbox'
                                                    onChange={() => {
                                                        if (upfront?.is_check === 1) {
                                                            setUpfrontCheck(0)
                                                            handleUpfrontcheck(0, 'is_check')
                                                        } else {
                                                            setUpfrontCheck(1)
                                                            handleUpfrontcheck(1, 'is_check')
                                                        }
                                                    }}
                                                    name='notifications'
                                                    checked={upfront?.is_check === 1 ? true : false}
                                                />
                                                {upfront?.name}
                                            </div>
                                        </div>
                                        {upfrontcheck == 1 ? (
                                            <>
                                                <div className='col-sm ms-sm-8'>
                                                    <div
                                                        className='p-3'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        <label
                                                            className='d-flex flex-row h-35px'
                                                            style={{
                                                                marginTop: '-6px',
                                                                width: '160px',
                                                                borderRadius: '6px',
                                                            }}
                                                        >
                                                            <select
                                                                style={{
                                                                    fontWeight: '700',
                                                                    fontSize: '14px',
                                                                }}
                                                                onChange={(e) =>
                                                                    handleoverides(e, 'shifts_on')
                                                                }
                                                                name='status'
                                                                data-control='select2'
                                                                data-hide-search='true'
                                                                className='form-select form-select-black form-select-sm text-cmGrey900 bg-cmGrey200 cursor-pointer'
                                                                defaultValue='1'
                                                            >
                                                                <option
                                                                    value='none'
                                                                    selected
                                                                    hidden
                                                                >
                                                                    {overrides?.shifts_on}
                                                                </option>
                                                                <option value='Tired'>Tired</option>
                                                                <option value='Monthly'>
                                                                    Monthly
                                                                </option>
                                                                <option value='Bi-Monthly'>
                                                                    Bi-Monthly
                                                                </option>
                                                                <option value='Quaterly'>
                                                                    Quaterly
                                                                </option>
                                                                <option value='Semi-Annually'>
                                                                    Semi-Annually
                                                                </option>
                                                                <option value='Annually'>
                                                                    Annually
                                                                </option>
                                                            </select>
                                                        </label>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <b></b>
                                        )}
                                    </div>
                                </div>
                                {upfrontcheck == 1 ? (
                                    <>
                                        <div className='container mt-2' style={{fontSize: '14px'}}>
                                            <div className='row w-100 ms-4 '>
                                                <div className='col-sm'></div>
                                                <div className='col-sm-4 mar1'>
                                                    <div
                                                        className='p-3 d-flex flex-row text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Scale based on:
                                                        <label
                                                            className='ms-7 d-flex flex-row h-35px'
                                                            style={{
                                                                marginTop: '-6px',
                                                                maxWidth: '160px',
                                                                borderRadius: '6px',
                                                            }}
                                                        >
                                                            <select
                                                                style={{
                                                                    fontWeight: '700',
                                                                    fontSize: '14px',
                                                                }}
                                                                name='status'
                                                                data-control='select2'
                                                                data-hide-search='true'
                                                                defaultValue='1'
                                                                className='form-select form-select-black form-select-sm text-cmGrey900 bg-cmGrey200 cursor-pointer'
                                                                onChange={(e) =>
                                                                    handleUpfront(
                                                                        e,
                                                                        'scale_based_on'
                                                                    )
                                                                }
                                                            >
                                                                <option
                                                                    value='none'
                                                                    selected
                                                                    hidden
                                                                >
                                                                    {upfront?.scale_based_on}
                                                                </option>
                                                                <option value='Monthly'>
                                                                    Monthly
                                                                </option>
                                                                <option value='Bi-Monthly'>
                                                                    Bi-Monthly
                                                                </option>
                                                                <option value='Quaterly'>
                                                                    Quaterly
                                                                </option>
                                                                <option value='Semi-Annually'>
                                                                    Semi-Annually
                                                                </option>
                                                                <option value='Annually'>
                                                                    Annually
                                                                </option>
                                                                <option value='No.of Installs'>
                                                                    No.of Installs
                                                                </option>{' '}
                                                            </select>
                                                        </label>
                                                        {/* <label className='ms-sm-6'> No. of Installs</label> */}
                                                    </div>
                                                </div>
                                                <div className='col-sm mar2'>
                                                    <div
                                                        className='p-3 d-flex flex-row text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Shifts on:
                                                        <label
                                                            className='ms-2 d-flex flex-row h-35px'
                                                            style={{
                                                                marginTop: '-6px',
                                                                width: '160px',
                                                                borderRadius: '6px',
                                                            }}
                                                        >
                                                            <select
                                                                style={{
                                                                    fontWeight: '700',
                                                                    fontSize: '14px',
                                                                }}
                                                                onChange={(e) =>
                                                                    handleUpfront(e, 'shifts_on')
                                                                }
                                                                name='status'
                                                                data-control='select2'
                                                                defaultValue='1'
                                                                data-hide-search='true'
                                                                className='form-select form-select-black form-select-sm text-cmGrey900 bg-cmGrey200 cursor-pointer'
                                                            >
                                                                <option
                                                                    value='none'
                                                                    selected
                                                                    hidden
                                                                >
                                                                    {upfront?.shifts_on}
                                                                </option>
                                                                <option value='Monthly'>
                                                                    Monthly
                                                                </option>
                                                                <option value='Bi-Monthly'>
                                                                    Bi-Monthly
                                                                </option>
                                                                <option value='Quaterly'>
                                                                    Quaterly
                                                                </option>
                                                                <option value='Semi-Annually'>
                                                                    Semi-Annually
                                                                </option>
                                                                <option value='Annually'>
                                                                    Annually
                                                                </option>
                                                            </select>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-sm mar'>
                                                    <div
                                                        className='p-3 d-flex flex-row text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Reset:{' '}
                                                        <label
                                                            className='ms-7 d-flex flex-row h-35px'
                                                            style={{
                                                                marginTop: '-6px',
                                                                width: '160px',
                                                                borderRadius: '6px',
                                                            }}
                                                        >
                                                            <select
                                                                style={{
                                                                    fontWeight: '700',
                                                                    fontSize: '14px',
                                                                }}
                                                                onChange={(e) =>
                                                                    handleUpfront(e, 'Reset')
                                                                }
                                                                name='status'
                                                                data-control='select2'
                                                                data-hide-search='true'
                                                                className='form-select form-select-black form-select-sm text-cmGrey900 bg-cmGrey200 cursor-pointer'
                                                                defaultValue='1'
                                                            >
                                                                <option
                                                                    value='none'
                                                                    selected
                                                                    hidden
                                                                >
                                                                    {upfront?.Reset}
                                                                </option>
                                                                <option value='Monthly'>
                                                                    Monthly
                                                                </option>
                                                                <option value='Bi-Monthly'>
                                                                    Bi-Monthly
                                                                </option>
                                                                <option value='Quaterly'>
                                                                    Quaterly
                                                                </option>
                                                                <option value='Semi-Annually'>
                                                                    Semi-Annually
                                                                </option>
                                                                <option value='Annually'>
                                                                    Annually
                                                                </option>
                                                            </select>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <b></b>
                                )}
                                {upfrontcheck == 1 ? (
                                    <div className='w-75 ms-sm-13 d-flex flex-row mt-3'>
                                        <div
                                            className='me-sm-19 ms-sm-6 me-5 d-flex-sm d-sm-flex d-flex flex-rows text-cminfo'
                                            style={{
                                                fontSize: '13.84px',
                                                fontWeight: '500',
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                setData(upfront)
                                                setShowCreateAppModal(true)
                                            }}
                                        >
                                            <i
                                                className='bi bi-pencil me-2'
                                                style={{fontSize: '16px'}}
                                            ></i>
                                            Configure Tiers
                                        </div>
                                        {upfront?.Configure?.length > 0 && (
                                            <table
                                                id='get'
                                                className='table d-flex-sm f-sm-flex  w-md-325px t1'
                                                style={{
                                                    height: 'auto',
                                                }}
                                            >
                                                <thead
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontSize: '13.84px',
                                                        fontWeight: 600,
                                                    }}
                                                    className='text-cmGrey900 bg-cmGrey300'
                                                >
                                                    <tr className='d-flex flex-row justify-content-between me-4'>
                                                        <th className='d-flex ms-4' scope='col'>
                                                            Installs from
                                                        </th>
                                                        <th className='d-flex ms-4' scope='col'>
                                                            Redline Shift
                                                        </th>
                                                        <th scope='col'>Installs to</th>
                                                    </tr>
                                                </thead>
                                                <tbody
                                                    className='text-cmGrey700'
                                                    style={{fontWeight: '500'}}
                                                >
                                                    {upfront?.Configure.map((item, index) => (
                                                        <>
                                                            {' '}
                                                            {(index + 1) % 2 != 0 ? (
                                                                <tr className='d-flex flex-row justify-content-between stripRow'>
                                                                    <th
                                                                        className='d-flex ms-4'
                                                                        scope='col'
                                                                    >
                                                                        {item.installs_from}
                                                                    </th>
                                                                    <th
                                                                        className='d-flex ms-4'
                                                                        scope='col'
                                                                    >
                                                                        {item.redline_shift}{' '}
                                                                    </th>
                                                                    <th
                                                                        scope='col'
                                                                        className='d-flex me-7'
                                                                    >
                                                                        {item.installs_to}
                                                                    </th>
                                                                </tr>
                                                            ) : (
                                                                <tr className='d-flex flex-row justify-content-between'>
                                                                    <th
                                                                        className='d-flex ms-4'
                                                                        scope='col'
                                                                    >
                                                                        {item.installs_from}
                                                                    </th>
                                                                    <th
                                                                        className='d-flex ms-4'
                                                                        scope='col'
                                                                    >
                                                                        {item.redline_shift}{' '}
                                                                    </th>
                                                                    <th
                                                                        scope='col'
                                                                        className='d-flex me-7'
                                                                    >
                                                                        {item.installs_to}
                                                                    </th>
                                                                </tr>
                                                            )}
                                                        </>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                ) : (
                                    <b></b>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
            <ConfigureTierModal
                show={showCreateAppModal}
                handleClose={() => {
                    // setLoading(true)
                    // getTierLevel()
                    setShowCreateAppModal(false)
                }}
                configuredata={data}
                getTierLevel={getTierLevel}
                setLoading={setLoading}
                loading={loading}
            />
            <CustomLoader full visible={loading} />
        </div>
    )
}
