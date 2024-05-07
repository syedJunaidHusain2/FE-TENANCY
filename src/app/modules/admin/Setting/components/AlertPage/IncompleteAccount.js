import React, {useState, useEffect, useCallback} from 'react'
import More1 from '../Path1.png'
import More from '../Path.png'
import Select from '../../Icon/select.png'
import {
    createIncompleteAccountAlertService,
    getDepartmentDropdownService,
    getIncompleteAccountAlertService,
    getPositionByDeparmentService,
    getPositionDropdownService,
    postMarketingDealService,
    putToggleAlertsService,
} from '../../../../../../services/Services'
import {Item1} from '../../../../../../_metronic/partials/content/activity/Item1'
import Edit from '../../../sequidocs/Icon/edit.png'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../../accessRights/AccessRights'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import {getBooleanValue, getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import {getDepartmentWithPositionAction} from '../../../../../../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {getDepartmentWithPositionSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomDelete from '../../../../../../customComponents/customIcons/CustomDelete'
import {allPermissionsAccess} from '../../../../../../accessRights/useCustomAccessRights'

export default function SetupCard1() {
    const [more, setMore] = useState(false)
    const [edit, setEdit] = useState(false)
    const [data, setData] = useState([])
    // const [deparmentDropdown, setDeparmentDropdown] = useState([])
    // const [positionDropdown, setpositionDropdown] = useState([])
    const [loader, setLoader] = useState(true)
    const [showAlerts, setShowAlerts] = useState(false)
    const dispatch = useDispatch()
    const deparmentDropdown = useSelector(getDepartmentWithPositionSelector)

    useEffect(() => {
        getInCompleteAccountAlertData(true)
        // getDepartmentDropdownService().then((res) => setDeparmentDropdown(res?.data))
        // getPositionDropdownService().then((res) => setpositionDropdown(res?.data))
        // getPositionByDeparmentService().then((res) => setDeparmentDropdown(res?.data))
        dispatch(getDepartmentWithPositionAction())
    }, [])

    // const handleShowAlerts = () => {
    //   setShowAlerts((val) => !val)
    //   const body = {
    //     id: data.id,
    //     status: showAlerts == true ? 1 : 0,
    //   }
    //   putToggleAlertsService(body).then((res) => getInCompleteAccountAlertData())
    // }

    const handleShowAlerts = useCallback(() => {
        let body = {
            id: data.id ?? 2,
            status: !showAlerts,
        }
        putToggleAlertsService(body).then((res) => {
            getInCompleteAccountAlertData()
        })
        setShowAlerts(!showAlerts)
    }, [data.id, showAlerts])

    const setMarketingData = (field_name, index, value) => {
        const data1 = {...data}
        data1.details[index][field_name] = value
        // data1.details[index].alert_type = value?.name
        setData(data1)
    }

    const SubmitMarketingDealEdit = () => {
        const request = {
            id: 2,
            data: data.details.map((item) => ({
                alert_type: item?.alert_type,
                department_id: item?.department_id,
                position_id: item?.position_id,
                number: item?.number,
                type: item?.type,
                status: item?.status,
            })),
        }
        const isAnyPropertiesAreEmpty = data?.details?.every(
            (item) =>
                !(
                    item?.alert_type &&
                    item?.department_id &&
                    data?.position_id &&
                    data?.number &&
                    data?.type
                )
        )

        if (!isAnyPropertiesAreEmpty) return CustomToast.error('Fill all incoming alerts data')
        setLoader(true)
        createIncompleteAccountAlertService(request)
            .then((res) => {
                getInCompleteAccountAlertData()
                setEdit(false)
                CustomToast.success('Incoming alerts updated')
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => setLoader(false))
    }

    const getInCompleteAccountAlertData = (first_time = false) => {
        getIncompleteAccountAlertService()
            .then((res) => {
                setData(res?.data?.[0])
                setShowAlerts(res?.data?.[0]?.status)
                setLoader(false)
            })
            .catch((err) => setLoader(false))
    }

    const dumbData = {...data}
    const handleAddAnother = () => {
        dumbData.details.push({
            id: null,
            alert_id: null,
            alert_type: null,
            type: 'day',
            department_id: null,
            department_name: null,
            position_id: null,
            position_name: null,
            amount: null,
        })
        setData(dumbData)
    }

    const onDeleteAlertPress = useCallback(
        (itemIndex) => {
            const tempData = {...data}
            tempData.details = data.details.filter((item, index) => index != itemIndex)
            setData(tempData)
        },
        [data]
    )

    const onToggleStatus = (valueIndex) => {
        let request = {
            id: 2,
            data: data.details.map((item) => ({
                alert_type: item?.alert_type,
                department_id: item?.department_id,
                position_id: item?.position_id,
                number: item?.number,
                type: item?.type,
                status: item?.status,
            })),
        }

        request.data[valueIndex].status = getBooleanValue(!request.data[valueIndex].status)

        setLoader(true)
        createIncompleteAccountAlertService(request)
            .then((res) => {
                getInCompleteAccountAlertData()
                setEdit(false)
                CustomToast.success('Incoming alert status updated')
            })
            .catch((err) => {
                setLoader(false)
            })
    }

    return (
        <div className='card bg-white h-auto mt-6 shadow'>
            <CustomLoader full visible={loader} />
            <div className='mt-6 mb-3 '>
                <div className='d-flex flex-wrap align-items-center justify-content-between px-10 w-100 mx-sm-0'>
                    <div className='form-check  d-flex flex-wrap align-items-center form-switch form-switch-sm form-check-custom form-check-solid'>
                        <label
                            style={{
                                fontSize: '16px',
                                fontFamily: 'Manrope',
                                fontWeight: 600,
                            }}
                            className='form-label text-cmGrey800'
                        >
                            Incomplete account alert
                        </label>
                        {!loader && !edit ? (
                            <input
                                style={{marginLeft: '15px', marginTop: '-3px'}}
                                className='form-check-input ml-8m custom-control-input cursor-pointer'
                                type='checkbox'
                                id='customCheck1'
                                name='notifications'
                                onChange={handleShowAlerts}
                                checked={showAlerts}
                            />
                        ) : null}

                        {showAlerts ? (
                            <>
                                {!more ? (
                                    <img
                                        style={{
                                            marginLeft: '17px',
                                            marginTop: '-3px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            setMore(true)
                                        }}
                                        src={More1}
                                    ></img>
                                ) : (
                                    <img
                                        style={{
                                            marginLeft: '17px',
                                            marginTop: '-3px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            setMore(false)
                                            setEdit(false)
                                        }}
                                        src={More}
                                    ></img>
                                )}
                            </>
                        ) : null}
                    </div>
                    <AccessRights
                        customCondition={allPermissionsAccess.administrator.setting.alerts.edit}
                    >
                        <div>
                            {' '}
                            {more && showAlerts && !edit ? (
                                <div
                                    className='d-flex justify-content-end '
                                    // style={{marginTop: '-34px', paddingRight: '23px'}}
                                >
                                    <button
                                        className=' btn btn-sm btn-icon  btn-bg-light btn-active-color-primary'
                                        data-kt-menu-trigger='click'
                                        data-kt-menu-placement='bottom-end'
                                        data-kt-menu-flip='top-end'
                                        onClick={() => {
                                            setEdit(true)
                                        }}
                                    >
                                        <img src={Edit} alt='' style={{width: '34px'}} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {edit && showAlerts ? (
                                        <div className='d-flex justify-content-end gap-5 align-items-center'>
                                            <CustomButton
                                                buttonType={BUTTON_TYPE.error}
                                                buttonLabel='Cancel'
                                                onClick={() => {
                                                    setLoader(true)
                                                    getInCompleteAccountAlertData()
                                                    setEdit(false)
                                                }}
                                            />
                                            {/* <div
                                                className='btn text-cmGrey700 p-1'
                                                onClick={() => {
                                                    setLoader(true)
                                                    getInCompleteAccountAlertData()
                                                    setEdit(false)
                                                }}
                                            >
                                                Cancel
                                            </div> */}
                                            <CustomButton
                                                buttonType={BUTTON_TYPE.secondary}
                                                buttonLabel='Save'
                                                onClick={SubmitMarketingDealEdit}
                                            />
                                            {/* <button
                                                className='btn btn-sm btn-icon text-cmBlue-Crayola bg-cmBlue-Crayola bg-opacity-10 btn-active-color-primary '
                                                data-kt-menu-trigger='click'
                                                style={{width: '60px'}}
                                                data-kt-menu-placement='bottom-end'
                                                data-kt-menu-flip='top-end'
                                                onClick={() => {
                                                    SubmitMarketingDealEdit()
                                                }}
                                            >
                                                Save
                                            </button> */}
                                        </div>
                                    ) : (
                                        <b></b>
                                    )}
                                </>
                            )}{' '}
                        </div>
                    </AccessRights>
                </div>
                {more ? (
                    <>
                        {!edit ? (
                            <>
                                {' '}
                                <div className='modal-header mb-2 mt-2 ms-8 me-10'></div>
                                <div style={{fontSize: '14px'}}>
                                    {showAlerts ? (
                                        <div className='py-5 mx-sm-10 mx-5 overflow-auto'>
                                            <table className='w-sm-700px w-100'>
                                                <tbody>
                                                    {data?.details?.length > 0
                                                        ? data?.details?.map((item) => (
                                                              <tr className='' key={item?.id}>
                                                                  <td
                                                                      className='text-cmGrey900 w-auto py-2 px-5 text-nowrap'
                                                                      style={{
                                                                          fontWeight: 600,
                                                                          fontSize: '14px',
                                                                          fontFamily: 'Manrope',
                                                                      }}
                                                                  >
                                                                      {item?.alert_type}
                                                                  </td>
                                                                  <td
                                                                      className='text-cmGrey900 w-auto py-2 px-5'
                                                                      style={{
                                                                          fontWeight: 700,
                                                                          fontSize: '16px',
                                                                          fontFamily: 'Manrope',
                                                                      }}
                                                                  >
                                                                      {item?.number}
                                                                  </td>
                                                                  <td
                                                                      className='text-cmGrey800  w-auto py-2 px-5'
                                                                      style={{
                                                                          fontWeight: 600,
                                                                          fontSize: '14px',
                                                                          fontFamily: 'Manrope',
                                                                      }}
                                                                  >
                                                                      {item?.type}
                                                                  </td>
                                                                  <td
                                                                      className='text-cmGrey700  w-auto py-2 px-5'
                                                                      style={{
                                                                          fontWeight: 500,
                                                                          fontSize: '14px',
                                                                          fontFamily: 'Manrope',
                                                                      }}
                                                                  >
                                                                      {' '}
                                                                      {item?.department_name}
                                                                  </td>
                                                                  <td
                                                                      className='text-cmGrey700  w-auto py-2 px-5'
                                                                      style={{
                                                                          fontWeight: 500,
                                                                          fontSize: '14px',
                                                                          fontFamily: 'Manrope',
                                                                      }}
                                                                  >
                                                                      {item?.position_name}
                                                                  </td>
                                                              </tr>
                                                          ))
                                                        : null}
                                                </tbody>
                                            </table>
                                            {!data?.details?.length ? (
                                                <div className='ms-10' style={{color: '#212121'}}>
                                                    No data found
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : null}

                                    {/* <SettingTables /> */}
                                </div>
                            </>
                        ) : (
                            <div style={{fontSize: '14px'}}>
                                <div className='modal-header mb-2 mt-2 ms-8 me-8'></div>
                                {data?.details?.map((value_i, index) => (
                                    <div
                                        className='mb-10 d-md-flex mt-6 m-sm-12 overflow-auto '
                                        key={index}
                                    >
                                        <div className='d-md-flex align-items-center flex-start-md flex-sm mb-3'>
                                            <div className='d-flex align-items-center mb-sm-0 mb-5'>
                                                <CustomDropdown
                                                    name='status'
                                                    searching={false}
                                                    placeholder='Select Type'
                                                    onChange={(e) =>
                                                        setMarketingData(
                                                            'alert_type',
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    value={value_i?.alert_type ?? 'Alert type'}
                                                    options={[
                                                        {
                                                            name: 'M1 complete but unpaid',
                                                            value: 'M1 complete but unpaid',
                                                        },
                                                        {
                                                            name: 'M1 paid, M2 incomplete',
                                                            value: 'M1 paid, M2 incomplete',
                                                        },
                                                        {
                                                            name: 'M2 Complete but unpaid',
                                                            value: 'M2 Complete but unpaid',
                                                        },
                                                        {
                                                            name: 'M2 Complete but PTO Pending',
                                                            value: 'M2 Complete but PTO Pending',
                                                        },
                                                    ]}
                                                />
                                            </div>

                                            <div className='ms-sm-6 mb-sm-0 mb-5'>
                                                <CustomInput
                                                    placeholder='Number of'
                                                    type={INPUT_TYPE.number}
                                                    onChange={(e) =>
                                                        setMarketingData(
                                                            'number',
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    value={value_i?.number ?? 'number'}
                                                />
                                            </div>
                                            <div className=' ms-sm-3 mb-sm-0 mb-5'>
                                                <CustomDropdown
                                                    searching={false}
                                                    name='status'
                                                    onChange={(e) =>
                                                        setMarketingData(
                                                            'type',
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    value={value_i?.type ?? 'type'}
                                                    options={[
                                                        {
                                                            name: ' Day(s)',
                                                            value: 'day',
                                                        },
                                                        {
                                                            name: 'Week(s)',
                                                            value: 'week',
                                                        },
                                                        {
                                                            name: 'Month(s)',
                                                            value: 'months',
                                                        },
                                                    ]}
                                                />
                                            </div>

                                            <div className=' ms-sm-4 mb-sm-0 mb-5'>
                                                <CustomDropdown
                                                    name='status'
                                                    options={deparmentDropdown}
                                                    placeholder='Select Department'
                                                    onChange={(e) =>
                                                        setMarketingData(
                                                            'department_id',
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    valueKey='id'
                                                    value={value_i?.department_id ?? ''}
                                                />
                                            </div>

                                            <div className='ms-sm-5 mb-sm-0 mb-5'>
                                                <CustomDropdown
                                                    name='status'
                                                    placeholder='Select Position'
                                                    displayKey='position_name'
                                                    options={
                                                        data?.details?.[index]?.department_id &&
                                                        deparmentDropdown?.length > 0
                                                            ? deparmentDropdown?.find(
                                                                  (item) =>
                                                                      item?.id ==
                                                                      data?.details?.[index]
                                                                          ?.department_id
                                                              ).position
                                                            : null
                                                    }
                                                    onChange={(e) =>
                                                        setMarketingData(
                                                            'position_id',
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    valueKey='id'
                                                    value={value_i?.position_id ?? ''}
                                                />
                                            </div>

                                            <div className='d-flex align-items-center justify-content-center mx-5'>
                                                <AccessRights
                                                    customCondition={
                                                        allPermissionsAccess.administrator.setting
                                                            .alerts.delete
                                                    }
                                                >
                                                    <CustomDelete
                                                        onClick={() => {
                                                            CustomDialog.warn(
                                                                'Are you sure you want to delete ?',
                                                                () => {
                                                                    onDeleteAlertPress(index)
                                                                }
                                                            )
                                                        }}
                                                    />
                                                </AccessRights>
                                                <AccessRights
                                                    customCondition={
                                                        allPermissionsAccess.administrator.setting
                                                            .alerts.edit
                                                    }
                                                >
                                                    <div className='p-2'>
                                                        <CustomButton
                                                            type='submit'
                                                            buttonType={
                                                                value_i?.status
                                                                    ? BUTTON_TYPE.secondaryBorder
                                                                    : BUTTON_TYPE.successBorder
                                                            }
                                                            buttonLabel={
                                                                value_i?.status
                                                                    ? 'Disable'
                                                                    : 'Enable'
                                                            }
                                                            onClick={() => {
                                                                onToggleStatus(index)
                                                            }}
                                                        />
                                                    </div>
                                                </AccessRights>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className='d-flex mt-0 pt-0 mb-3'>
                                    <ul
                                        style={{
                                            fontFamily: 'Manrope',
                                            fontSize: '14px',
                                        }}
                                        className='nav nav-stretch  nav-line-tabs nav-line-tabs-2x border-transparent  flex-nowrap text-cmBlue-Crayola cursor-pointer'
                                    >
                                        {dumbData?.details?.length < 3 ? (
                                            <div className='nav-item d-flex ms-12'>
                                                <div
                                                    style={{
                                                        width: '15px',
                                                        height: '15px',
                                                        // border: '1px solid blue',
                                                    }}
                                                    className='d-flex text-center align-item-center justify-content-center border border-cmBlue-Crayola border-2'
                                                >
                                                    <b style={{marginTop: '-5px'}}>+</b>
                                                </div>
                                                <div
                                                    className='ms-2 text-cmBlue-Crayola'
                                                    style={{
                                                        fontSize: '14px',
                                                        textDecoration: 'underline',
                                                        padding: '0px',
                                                        marginTop: '-3px',
                                                        fontWeight: 600,
                                                    }}
                                                    onClick={handleAddAnother}
                                                >
                                                    Add Another
                                                </div>
                                            </div>
                                        ) : null}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
