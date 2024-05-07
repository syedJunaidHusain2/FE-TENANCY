import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {fontsFamily} from '../../../../assets/fonts/fonts'
import {Badge} from 'primereact/badge'
import {formattedNumberFieldsWithoutDecimal} from '../../../../helpers/CommonHelpers'
import {DYNAMIC_ALERTS_QUICK_FILTER} from '../../../../constants/constants'
import Collapse from '@mui/material/Collapse'
import {KTSVG} from '../../../../_metronic/helpers'
import {Spinner} from 'react-bootstrap'

import {BlockUI} from 'primereact/blockui'

const AlertsTableSidebar = ({
    alertType,
    setAlertType,
    alertList,
    setActivePage,
    setSearchTerm,
    onChangeQuickFilter,
    quickFilter,
    setParam,
    setSearchVal,
    setQuickFilter,
    loader,
    disable,
}) => {
    const [showPayrollAlerts, setShowPayrollAlerts] = useState(true)
    const [showSystemAlerts, setShowSystemAlerts] = useState(true)

    useEffect(() => {
        setShowPayrollAlerts(!disable)
        setShowSystemAlerts(!disable)
    }, [disable])

    const changeAlertType = useCallback(
        (type) => {
            setSearchTerm('')
            setSearchVal('')
            setQuickFilter('')
            setActivePage(1)
            setAlertType(type)
            setParam({alertType: type, page: 1})
        },
        [setActivePage, setAlertType, setParam, setQuickFilter, setSearchTerm, setSearchVal]
    )

    const QuickFilterList = useMemo(() => {
        return DYNAMIC_ALERTS_QUICK_FILTER.filter((item) => item?.type == alertType)
    }, [alertType])

    const handlePayrollAlertDisplay = () => {
        setShowPayrollAlerts(!showPayrollAlerts)
    }
    const handleSystemAlertDisplay = () => {
        setShowSystemAlerts(!showSystemAlerts)
    }
    return (
        // <BlockUI blocked={disable}>
        <div
            className='bg-cmwhite shadow-sm mh-xl-650px py-5 px-3 w-100 text-cmGrey600'
            style={{
                borderRadius: 10,
                fontFamily: fontsFamily.manrope,
                fontSize: '14px',
                fontWeight: 600,
                overflowX: 'hidden',
                overflowY: 'auto',
            }}
        >
            <div className='text-cmGrey600 px-2 mb-2 mt-5' style={{fontSize: '16px'}}>
                <span className='me-2'>PAYROLL ALERTS</span>{' '}
                {showPayrollAlerts ? (
                    <span
                        className='pi fs-5 pi-chevron-circle-down cursor-pointer'
                        onClick={!disable ? handlePayrollAlertDisplay : null}
                    />
                ) : (
                    <span
                        className='pi fs-5 pi-chevron-circle-right cursor-pointer'
                        onClick={!disable ? handlePayrollAlertDisplay : null}
                    />
                )}
            </div>
            <Collapse in={showPayrollAlerts}>
                <div
                    className='d-flex flex-xxl-column gap-5 flex-wrap'
                    style={{
                        transition: 'all 0.7s ease-in-out',
                    }}
                >
                    <div
                        style={{
                            borderRadius: 10,
                        }}
                        className={`${
                            alertType == 'sales' ? 'bg-cmBlue-Crayola' : ''
                        }  bg-opacity-10 py-3 px-5 d-flex align-items-center justify-content-between gap-5 cursor-pointer w-100`}
                        onClick={() => changeAlertType('sales')}
                    >
                        <div className='d-flex align-items-center gap-5'>
                            {/* <i className={'bi bi-lightning fs-2'}></i> */}
                            <KTSVG
                                path='/media/icons/duotune/art/trend-up.svg'
                                svgClassName='h-20px w-20px'
                            />
                            <div>Sales Info</div>
                        </div>
                        {loader ? (
                            <Spinner
                                animation='border'
                                style={{width: '20px', height: '20px'}}
                                variant='cmError'
                            />
                        ) : (
                            <div className='badge rounded-pill bg-cmError'>
                                {formattedNumberFieldsWithoutDecimal(alertList?.totalCount?.sales)}
                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            borderRadius: 10,
                        }}
                        className={`${
                            alertType == 'missingRep' ? 'bg-cmBlue-Crayola' : ''
                        }  bg-opacity-10 py-3 px-5 d-flex align-items-center justify-content-between gap-5 cursor-pointer w-100`}
                        onClick={() => changeAlertType('missingRep')}
                    >
                        <div className='d-flex align-items-center gap-5'>
                            <i className={'pi pi-user-edit fs-2'}></i>
                            <div>Missing Rep</div>
                        </div>

                        {loader ? (
                            <Spinner
                                animation='border'
                                style={{width: '20px', height: '20px'}}
                                variant='cmPurple'
                            />
                        ) : (
                            <div className='badge rounded-pill bg-cmPurple'>
                                {formattedNumberFieldsWithoutDecimal(
                                    alertList?.totalCount?.missingRep
                                )}
                            </div>
                        )}
                    </div>

                    <div
                        style={{
                            borderRadius: 10,
                        }}
                        className={` ${
                            alertType == 'closedPayroll' ? 'bg-cmBlue-Crayola ' : ''
                        }  bg-opacity-10 py-3 px-5 d-flex align-items-center justify-content-between gap-5 cursor-pointer w-100`}
                        onClick={() => changeAlertType('closedPayroll')}
                    >
                        <div className='d-flex align-items-center gap-5'>
                            <i className={'pi pi-delete-left fs-2'}></i>
                            <div>Closed Payroll</div>
                        </div>
                        {loader ? (
                            <Spinner
                                animation='border'
                                style={{width: '20px', height: '20px'}}
                                variant='cminfo'
                            />
                        ) : (
                            // <Badge
                            //     size='normal'
                            //     value={formattedNumberFieldsWithoutDecimal(
                            //         alertList?.totalCount?.closedPayroll
                            //     )}
                            //     severity='warning'
                            // ></Badge>
                            <div className='badge rounded-pill bg-cminfo'>
                                {formattedNumberFieldsWithoutDecimal(
                                    alertList?.totalCount?.closedPayroll
                                )}
                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            borderRadius: 10,
                        }}
                        className={`${
                            alertType == 'locationRedline' ? 'bg-cmBlue-Crayola' : ''
                        }  bg-opacity-10 py-3 px-5 d-flex align-items-center justify-content-between gap-5 cursor-pointer w-100`}
                        onClick={() => changeAlertType('locationRedline')}
                    >
                        <div className='d-flex align-items-center gap-5'>
                            <i className={'pi pi-map-marker fs-2'}></i>
                            <div>Location Redline</div>
                        </div>

                        {loader ? (
                            <Spinner
                                animation='border'
                                style={{width: '20px', height: '20px'}}
                                variant='cmError'
                            />
                        ) : (
                            <div className='badge rounded-pill bg-cmError'>
                                {formattedNumberFieldsWithoutDecimal(
                                    alertList?.totalCount?.locationRedline
                                )}
                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            borderRadius: 10,
                        }}
                        className={`${
                            alertType == 'repRedline' ? 'bg-cmBlue-Crayola' : ''
                        }  bg-opacity-10 py-3 px-5 d-flex align-items-center justify-content-between gap-5 cursor-pointer w-100`}
                        onClick={() => changeAlertType('repRedline')}
                    >
                        <div className='d-flex align-items-center gap-5'>
                            <i className={'pi pi-user-minus fs-2'}></i>
                            <div>Rep Redline</div>
                        </div>

                        {loader ? (
                            <Spinner
                                animation='border'
                                style={{width: '20px', height: '20px'}}
                                variant='cmPurple'
                            />
                        ) : (
                            <div className='badge rounded-pill bg-cmPurple'>
                                {formattedNumberFieldsWithoutDecimal(
                                    alertList?.totalCount?.repRedline
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Collapse>

            <div className='text-cmGrey600 px-2 mb-2 mt-6' style={{fontSize: '16px'}}>
                <span className='me-2'>SYSTEM ALERTS</span>{' '}
                {showSystemAlerts ? (
                    <span
                        className='pi fs-5 pi-chevron-circle-down cursor-pointer'
                        onClick={!disable ? handleSystemAlertDisplay : null}
                    />
                ) : (
                    <span
                        className='pi fs-5 pi-chevron-circle-right cursor-pointer'
                        onClick={!disable ? handleSystemAlertDisplay : null}
                    />
                )}
            </div>
            <Collapse in={showSystemAlerts}>
                <div className='d-flex flex-xxl-column gap-5 flex-wrap'>
                    {/* b2 */}
                    <div
                        style={{
                            borderRadius: 10,
                        }}
                        className={`${
                            alertType == 'people' ? 'bg-cmBlue-Crayola' : ''
                        }  bg-opacity-10 py-3 px-5 d-flex align-items-center justify-content-between gap-5 cursor-pointer w-100`}
                        onClick={() => changeAlertType('people')}
                    >
                        <div className='d-flex align-items-center gap-5'>
                            <i className={'pi pi-users fs-2 '}></i>
                            <div>People</div>
                        </div>

                        {loader ? (
                            <Spinner
                                animation='border'
                                style={{width: '20px', height: '20px'}}
                                variant='cmgreen'
                            />
                        ) : (
                            <div className='badge rounded-pill bg-cmgreen'>
                                {formattedNumberFieldsWithoutDecimal(alertList?.totalCount?.people)}
                            </div>
                        )}
                    </div>
                    {/* b3 */}
                </div>
            </Collapse>
            {/* {showSystemAlerts ? (
                <div className='d-flex flex-xxl-column gap-5 flex-wrap'>
                    <div
                        style={{
                            borderRadius: 10,
                        }}
                        className={`${
                            alertType == 'people' ? 'bg-cmBlue-Crayola' : ''
                        }  bg-opacity-10 py-3 px-5 d-flex align-items-center justify-content-between gap-5 cursor-pointer w-100`}
                    >
                        <div
                            className='d-flex align-items-center gap-5'
                            onClick={() => changeAlertType('people')}
                        >
                            <i className={'bi bi-lightning fs-2 '}></i>
                            <div>People</div>
                        </div>
                        <Badge
                            size='normal'
                            value={formattedNumberFieldsWithoutDecimal(
                                alertList?.totalCount?.people
                            )}
                            severity='danger'
                        ></Badge>
                    </div>
                </div>
            ) : (
                <div />
            )} */}

            {QuickFilterList?.length > 0 && !disable ? (
                <>
                    <div className='text-cmGrey600 px-2 mb-2 mt-8' style={{fontSize: '16px'}}>
                        <span className='me-2'>QUICK FILTER</span>{' '}
                    </div>
                    {QuickFilterList?.map((item, i) => (
                        <div
                            className='d-flex flex-xxl-column  flex-wrap position-relative'
                            key={i}
                        >
                            {/* b2 */}
                            <div
                                style={{
                                    borderRadius: 10,
                                }}
                                className={`${
                                    quickFilter == item?.value ? 'bg-cmBlue-Crayola' : ''
                                }  bg-opacity-10 py-3 px-5 d-flex align-items-center justify-content-between gap-5 cursor-pointer w-100 `}
                                onClick={() => onChangeQuickFilter(item?.value)}
                            >
                                <div className='d-flex align-items-center gap-5'>
                                    <div>{item?.name}</div>
                                </div>
                            </div>
                            {quickFilter == item?.value ? (
                                <span
                                    className='bi bi-x-circle-fill cursor-pointer position-absolute top-0 start-100 translate-middle'
                                    onClick={() => onChangeQuickFilter('')}
                                ></span>
                            ) : null}

                            {/* b3 */}
                        </div>
                    ))}
                </>
            ) : (
                <div></div>
            )}
        </div>
        // </BlockUI>
    )
}

export default AlertsTableSidebar
