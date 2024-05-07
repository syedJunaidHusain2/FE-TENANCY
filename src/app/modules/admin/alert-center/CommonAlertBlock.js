import React, {useCallback, useState} from 'react'

import {useNavigate} from 'react-router-dom'
import {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
    isPermittedForAccess,
} from '../../../../accessRights/AccessRights'
import {MISSING_KEYS} from '../../../../constants/constants'
import {AddRepRedlineAlert} from './alertTypes/AddRepRedlineAlert'
import ManageLocation from '../Setting/components/Location/ManageLocation'
import HireNew from '../../standard_manager/hiring/onBoardingEmp/CompensationPlan/HireNew'
import {TABLE_BORDER} from '../../../../helpers/CommonHelpers'

const CommonAlertBlock = ({alertData, alertType, getAlertCenterList}) => {
    const navigate = useNavigate()
    const [viewRepRedline, setViewRepRepRedline] = useState(false)
    const [showManageLocationModal, setShowManageLocationModal] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [openHireNew, setOpenHireNew] = useState(null)
    const [hireNewData, setHireNewData] = useState(null)

    const openParticularType = useCallback(
        (type, item, pageType) => {
            navigate(type, {
                state: {pid: item?.pid, alertType: item?.type_val, missingKeys: item?.keys},
            })
        },
        [navigate]
    )

    const alertNavigation = useCallback(
        (item) => {
            let path
            // setViewRepRepRedline(true)
            // return
            switch (item?.type_val) {
                case 'Sales':
                    path = '/alert-center/missing-info'
                    // path = '/alert-center/clawback'
                    break
                case 'Missing Rep':
                    path = '/alert-center/missing-info'
                    break
                case 'Closed Payroll':
                    path = '/alert-center/missing-info'
                    break
                case 'Rep Redline':
                    path = `/user/employment-package?employeeId=${item?.id}`
                    break
                case 'People':
                    path = `/user/personal-info?employeeId=${item?.user_id}`
                    break

                default:
                    path = ''
            }
            openParticularType(path, item)
        },
        [openParticularType]
    )

    const onClickPeople = useCallback(
        (data) => {
            let path = ''
            const isRedirecttoBank = data?.keys?.some((key) =>
                MISSING_KEYS.bankDetailArray.includes(key)
            )
            const isRedirectToTax = data?.keys?.some((key) =>
                MISSING_KEYS.taxDetailArray.includes(key)
            )
            if (isRedirecttoBank) {
                path = `/user/banking?employeeId=${data?.user_id}`
            } else if (isRedirectToTax) {
                path = `/user/tax-info?employeeId=${data?.user_id}`
            } else {
                path = `/user/personal-info?employeeId=${data?.user_id}`
            }
            openParticularType(path, data)
        },
        [openParticularType]
    )
    const onClickRepRedline = useCallback(
        (data) => {
            let path = ''

            if (
                data?.keys?.includes('closer_rep_redline') ||
                data?.keys?.includes('closer_self_gen_redline')
            ) {
                path = `/user/employment-package?employeeId=${data?.closer_id}`
            } else if (
                data?.keys?.includes('setter_rep_redline') ||
                data?.keys?.includes('setter_self_gen_redline')
            ) {
                path = `/user/employment-package?employeeId=${data?.setter_id}`
            }
            openParticularType(path, data)
        },
        [openParticularType]
    )

    const onClickLocation = (data) => {
        if (data?.keys?.includes(MISSING_KEYS.locationRedline)) {
            setSelectedLocation(data?.location_data)
            setShowManageLocationModal(true)
        }
        if (data?.keys?.includes(MISSING_KEYS.location)) {
            setSelectedLocation(data?.state_data)
            setShowManageLocationModal(true)
        }
    }

    const handleClose = () => {
        setShowManageLocationModal(false)
        getAlertCenterList()
    }
    const handlerMissingRep = (item) => {
        if (item?.keys?.includes(MISSING_KEYS.newRep)) {
            setHireNewData(item?.new_rep_email)
            setOpenHireNew(true)
        } else {
            alertNavigation(item)
        }
    }

    const closeHireNow = () => {
        setOpenHireNew(false)
        getAlertCenterList()
    }

    return (
        <>
            {alertType == 'sales' && (
                <SalesSection alertData={alertData} alertNavigation={alertNavigation} />
            )}
            {alertType == 'missingRep' && (
                <MissingRepSection alertData={alertData} alertNavigation={handlerMissingRep} />
            )}
            {alertType == 'closedPayroll' && (
                <ClosedPayrollSection alertData={alertData} alertNavigation={alertNavigation} />
            )}
            {alertType == 'locationRedline' && (
                <LocationRedlineSection
                    alertData={alertData}
                    alertNavigation={(data) => onClickLocation(data)}
                />
            )}
            {alertType == 'repRedline' && (
                <RepRedlineSection
                    alertData={alertData}
                    alertNavigation={(data) => onClickRepRedline(data)}
                />
            )}
            {alertType == 'people' && (
                <PeopleSection alertData={alertData} alertNavigation={onClickPeople} />
            )}
            {alertType == 'payroll' && (
                <SerachAllSection
                    alertData={alertData}
                    alertNavigation={alertNavigation}
                    onClickLocation={onClickLocation}
                />
            )}
            {viewRepRedline ? (
                <AddRepRedlineAlert
                    show={viewRepRedline}
                    handleClose={() => setViewRepRepRedline(false)}
                />
            ) : null}
            {showManageLocationModal ? (
                <ManageLocation
                    selectedLocation={selectedLocation}
                    show={showManageLocationModal}
                    handleClose={handleClose}
                    alert={true}
                />
            ) : null}
            {openHireNew ? (
                <HireNew
                    show={openHireNew}
                    handleClose={closeHireNow}
                    prefieldData={{
                        email: hireNewData,
                    }}
                />
            ) : null}
        </>
    )
}

export default CommonAlertBlock

export const SalesSection = ({alertData, alertNavigation}) => {
    return (
        <>
            <table className='table'>
                <thead className={TABLE_BORDER}>
                    <tr
                        className='text-cmGrey900 bg-cmGrey300 '
                        style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            fontFamily: 'Manrope',
                        }}
                    >
                        <th className=' p-5 text-nowrap'>PID</th>

                        <th className=' p-5 text-nowrap'>Alert Summary</th>
                    </tr>
                </thead>
                <tbody className={TABLE_BORDER}>
                    {alertData?.data?.length > 0 ? (
                        alertData?.data?.map((item, i) => {
                            return (
                                <tr
                                    className={` text-cmGrey600 cursor-pointer stripRow `}
                                    onClick={() => {
                                        if (
                                            isPermittedForAccess({
                                                permission:
                                                    PERMISSIONS_GROUP.administrator.alertCenter
                                                        .alerts,
                                                type: PERMISSION_TYPE.edit,
                                            })
                                        ) {
                                            alertNavigation(item)
                                        }
                                    }}
                                    key={i}
                                    style={{
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                        fontWeight: '600',
                                    }}
                                >
                                    <td className='p-5 text-cmGrey700' style={{fontWeight: '700'}}>
                                        {item?.pid ?? '-'}
                                    </td>
                                    <td className='p-5'>{item?.alert_summary ?? '-'}</td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={2}
                                style={{
                                    textAlign: 'center',
                                    fontFamily: 'Manrope',
                                    fontWeight: '500',
                                    fontSize: 14,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                }}
                            >
                                No Alerts
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}
export const MissingRepSection = ({alertData, alertNavigation}) => {
    return (
        <>
            <table className='table'>
                <thead className={TABLE_BORDER}>
                    <tr
                        className='text-cmGrey900 bg-cmGrey300'
                        style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            fontFamily: 'Manrope',
                        }}
                    >
                        <th className=' p-5 text-nowrap'>PID</th>
                        <th className=' p-5 text-nowrap'>Customer Name</th>

                        <th className=' p-5 text-nowrap'>Alert Summary</th>
                    </tr>
                </thead>
                <tbody className={TABLE_BORDER}>
                    {alertData?.data?.length > 0 ? (
                        alertData?.data?.map((item, i) => {
                            return (
                                <tr
                                    className={` text-cmGrey600 cursor-pointer stripRow `}
                                    onClick={() => {
                                        if (
                                            isPermittedForAccess({
                                                permission:
                                                    PERMISSIONS_GROUP.administrator.alertCenter
                                                        .alerts,
                                                type: PERMISSION_TYPE.edit,
                                            })
                                        ) {
                                            alertNavigation(item)
                                        }
                                    }}
                                    key={i}
                                    style={{
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                        fontWeight: '600',
                                    }}
                                >
                                    <td
                                        className='p-5 text-cmGrey700  text-start'
                                        style={{fontWeight: '700'}}
                                    >
                                        {item?.pid}
                                    </td>
                                    <td className='p-5'>{item?.customer_name ?? '-'}</td>
                                    <td className='p-5'>{item?.alert_summary}</td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={3}
                                style={{
                                    textAlign: 'center',
                                    fontFamily: 'Manrope',
                                    fontWeight: '500',
                                    fontSize: 14,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                }}
                            >
                                No Alerts
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export const ClosedPayrollSection = ({alertData, alertNavigation}) => {
    return (
        <>
            <table className='table'>
                <thead className={TABLE_BORDER}>
                    <tr
                        className='text-cmGrey900 bg-cmGrey300'
                        style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            fontFamily: 'Manrope',
                        }}
                    >
                        <th className=' p-5 text-nowrap'>PID</th>
                        <th className=' p-5 text-nowrap'>Customer Name</th>

                        <th className=' p-5 text-nowrap'>Alert Summary</th>
                    </tr>
                </thead>
                <tbody className={TABLE_BORDER}>
                    {alertData?.data?.length > 0 ? (
                        alertData?.data?.map((item, i) => {
                            return (
                                <tr
                                    className={` text-cmGrey600 cursor-pointer stripRow `}
                                    onClick={() => {
                                        if (
                                            isPermittedForAccess({
                                                permission:
                                                    PERMISSIONS_GROUP.administrator.alertCenter
                                                        .alerts,
                                                type: PERMISSION_TYPE.edit,
                                            })
                                        ) {
                                            alertNavigation(item)
                                        }
                                    }}
                                    key={i}
                                    style={{
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                        fontWeight: '600',
                                    }}
                                >
                                    <td
                                        className='p-5 text-cmGrey700  text-start'
                                        style={{fontWeight: '700'}}
                                    >
                                        {item?.pid}
                                    </td>
                                    <td className='p-5'>{item?.customer_name ?? '-'}</td>
                                    <td className='p-5'>{item?.alert_summary}</td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={3}
                                style={{
                                    textAlign: 'center',
                                    fontFamily: 'Manrope',
                                    fontWeight: '500',
                                    fontSize: 14,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                }}
                            >
                                No Alerts
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export const LocationRedlineSection = ({alertData, alertNavigation}) => {
    return (
        <>
            <table className='table'>
                <thead className={TABLE_BORDER}>
                    <tr
                        className='text-cmGrey900 bg-cmGrey300'
                        style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: 'Manrope',
                        }}
                    >
                        <th className=' p-5 text-nowrap'>PID</th>
                        <th className=' p-5 text-nowrap'>Customer Name</th>
                        <th className=' p-5 text-nowrap'>State</th>
                        <th className=' p-5 text-nowrap'>General Code</th>
                        <th className=' p-5 text-nowrap'>Alert Summary</th>
                    </tr>
                </thead>
                <tbody className={TABLE_BORDER}>
                    {alertData?.data?.length > 0 ? (
                        alertData?.data?.map((item, i) => {
                            return (
                                <tr
                                    className={` text-cmGrey600 cursor-pointer stripRow `}
                                    onClick={() => {
                                        if (
                                            isPermittedForAccess({
                                                permission:
                                                    PERMISSIONS_GROUP.administrator.alertCenter
                                                        .alerts,
                                                type: PERMISSION_TYPE.edit,
                                            })
                                        ) {
                                            alertNavigation(item)
                                        }
                                    }}
                                    key={i}
                                    style={{
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                        fontWeight: '600',
                                    }}
                                >
                                    <td
                                        className='p-5 text-cmGrey700  text-start'
                                        style={{fontWeight: '700'}}
                                    >
                                        {item?.pid}
                                    </td>
                                    <td className='p-5'>{item?.customer_name ?? '-'}</td>
                                    <td className='p-5'>{item?.state_name ?? '-'} </td>
                                    <td className='p-5'>{item?.state_data?.general_code ?? '-'}</td>
                                    <td className='p-5'>{item?.alert_summary ?? '-'}</td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                style={{
                                    textAlign: 'center',
                                    fontFamily: 'Manrope',
                                    fontWeight: '500',
                                    fontSize: 14,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                }}
                            >
                                No Alerts
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}
export const RepRedlineSection = ({alertData, alertNavigation}) => {
    return (
        <>
            <table className='table'>
                <thead className={TABLE_BORDER}>
                    <tr
                        className='text-cmGrey900 bg-cmGrey300'
                        style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            fontFamily: 'Manrope',
                        }}
                    >
                        <th className=' p-5 text-nowrap'>PID</th>
                        <th className=' p-5 text-nowrap'>Customer Name</th>
                        <th className=' p-5 text-nowrap'>Rep Name</th>
                        <th className=' p-5 text-nowrap'>Position</th>
                        <th className=' p-5 text-nowrap'>Alert Summary</th>
                    </tr>
                </thead>
                <tbody className={TABLE_BORDER}>
                    {alertData?.data?.length > 0 ? (
                        alertData?.data?.map((item, i) => {
                            return (
                                <tr
                                    className={` text-cmGrey600 cursor-pointer stripRow `}
                                    onClick={() => {
                                        if (
                                            isPermittedForAccess({
                                                permission:
                                                    PERMISSIONS_GROUP.administrator.alertCenter
                                                        .alerts,
                                                type: PERMISSION_TYPE.edit,
                                            })
                                        ) {
                                            alertNavigation(item)
                                        }
                                    }}
                                    key={i}
                                    style={{
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                        fontWeight: '600',
                                    }}
                                >
                                    <td
                                        className='p-5 text-cmGrey700  text-start'
                                        style={{fontWeight: '700'}}
                                    >
                                        {item?.pid}
                                    </td>
                                    <td className='p-5'>{item?.customer_name ?? '-'}</td>
                                    <td className='p-5'>{item?.rep_name ?? '-'}</td>
                                    <td className='p-5'>{item?.position_name ?? '-'}</td>
                                    <td className='p-5'>{item?.alert_summary ?? '-'}</td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                style={{
                                    textAlign: 'center',
                                    fontFamily: 'Manrope',
                                    fontWeight: '500',
                                    fontSize: 14,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                }}
                            >
                                No Alerts
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export const PeopleSection = ({alertData, alertNavigation}) => {
    return (
        <>
            <table className='table'>
                <thead className={TABLE_BORDER}>
                    <tr
                        className='text-cmGrey900 bg-cmGrey300'
                        style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: 'Manrope',
                        }}
                    >
                        <th className=' p-5 text-nowrap w-20'>Employee Name</th>
                        <th className=' p-5 text-nowrap w-20'>Position</th>
                        <th className=' p-5 text-nowrap w-60'>Alert Summary</th>
                    </tr>
                </thead>
                <tbody className={TABLE_BORDER}>
                    {alertData?.data?.length > 0 ? (
                        alertData?.data?.map((item, i) => {
                            return (
                                <tr
                                    className={` text-cmGrey600 cursor-pointer stripRow `}
                                    onClick={() => {
                                        if (
                                            isPermittedForAccess({
                                                permission:
                                                    PERMISSIONS_GROUP.administrator.alertCenter
                                                        .alerts,
                                                type: PERMISSION_TYPE.edit,
                                            })
                                        ) {
                                            alertNavigation(item)
                                        }
                                    }}
                                    key={i}
                                    style={{
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                        fontWeight: '600',
                                    }}
                                >
                                    <td
                                        className='p-5 text-cmGrey700  text-start'
                                        style={{fontWeight: '700'}}
                                    >
                                        {item?.user_name ?? '-'}
                                    </td>
                                    <td className='p-5'>{item?.position ?? '-'}</td>
                                    <td className='p-5'>{item?.alert_summary ?? '-'}</td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={3}
                                style={{
                                    textAlign: 'center',
                                    fontFamily: 'Manrope',
                                    fontWeight: '500',
                                    fontSize: 14,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                }}
                            >
                                No Alerts
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export const SerachAllSection = ({alertData, alertNavigation, onClickLocation}) => {
    return (
        <>
            <table className='table'>
                <thead>
                    <tr
                        className='text-cmGrey900 bg-cmGrey300'
                        style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: 'Manrope',
                        }}
                    >
                        <th className=' p-5 text-nowrap'>PID</th>
                        <th className=' p-5 text-nowrap'>Customer Name</th>
                        <th className=' p-5 text-nowrap'>Alert Type</th>

                        <th className=' p-5 text-nowrap'>Alert Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {alertData?.data?.length > 0 ? (
                        alertData?.data?.map((item, i) => {
                            return (
                                <tr
                                    className={` text-cmGrey600 cursor-pointer stripRow `}
                                    onClick={() => {
                                        if (
                                            isPermittedForAccess({
                                                permission:
                                                    PERMISSIONS_GROUP.administrator.alertCenter
                                                        .alerts,
                                                type: PERMISSION_TYPE.edit,
                                            })
                                        ) {
                                            item?.type_val == 'location Redline'
                                                ? onClickLocation(item)
                                                : alertNavigation(item)
                                        }
                                    }}
                                    key={i}
                                    style={{
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                        fontWeight: '600',
                                    }}
                                >
                                    <td
                                        className='p-5 text-cmGrey700  text-start'
                                        style={{fontWeight: '700'}}
                                    >
                                        {item?.pid ?? '-'}
                                    </td>
                                    <td className='p-5'>{item?.customer_name ?? '-'}</td>
                                    <td className='p-5'>{item?.type_val ?? '-'}</td>
                                    <td className='p-5'>{item?.alert_summary ?? '-'}</td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={3}
                                style={{
                                    textAlign: 'center',
                                    fontFamily: 'Manrope',
                                    fontWeight: '500',
                                    fontSize: 14,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                }}
                            >
                                No Alerts
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}
