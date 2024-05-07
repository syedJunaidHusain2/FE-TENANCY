/* eslint-disable react-hooks/rules-of-hooks */
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import {MAIN_POSITTIONS_ID, getValidDate} from '../../../../../../constants/constants'
import {
    getMyRecalculateDataService,
    getSalesByPidService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {
    formattedNumberFields,
    formattedPhoneNumber,
    getErrorMessageFromResponse,
    getLocationRedlineHelper,
    getRepRedlineFromSale,
    isInputValueExist,
} from '../../../../../../helpers/CommonHelpers'
import {AddRepPopup} from './AddRepPopup'
import {CloserSetterBottomDisplayValues} from './salesTableComponent/manageSales'
import {
    getAllClosersSelector,
    getAllLocationsSelector,
    getAllSettersSelector,
} from '../../../../../../redux/selectors/SettingsSelectors'
import AccountOverrides from './AccountOverrides'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import {useDispatch} from 'react-redux'
import {getClosersAction, getSettersAction} from '../../../../../../redux/actions/SettingActions'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomEditIcon from '../../../../../../customComponents/customIcons/CustomEditIcon'
import {Badge} from 'primereact/badge'
import CustomLink from '../../../../../../customComponents/customButtton/CustomLink'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'

const SingleSalePage = ({}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const naviagte = useNavigate()
    const [salesData, setReportData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [cstype, setCsType] = useState('')
    const [closerSetterObj] = useState({})
    const allLocations = useSelector(getAllLocationsSelector)
    const pid = location.state?.pid
    const closersList = useSelector(getAllClosersSelector)
    const settersList = useSelector(getAllSettersSelector)

    useEffect(() => {
        getSetterCloser()
    }, [])

    const getSetterCloser = useCallback(() => {
        dispatch(getClosersAction())
        dispatch(getSettersAction())
    }, [dispatch])

    useEffect(() => {
        let PID = location.state?.pid ?? location?.search.split('=')?.[1]
        const body = {
            pid: PID && PID,
        }
        getSalesByPid(body)
    }, [pid])

    const getSalesByPid = (body) => {
        getSalesByPidService(body)
            .then((res) => {
                setReportData(res?.data)
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const getRecalculateData = () => {
        const body = {
            pid: pid && pid,
        }
        getMyRecalculateDataService(body)
            .then((res) => {
                CustomToast.success(res.Message)
                naviagte('/reports/sales')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleClose = () => {
        setOpen(false)
        setLoading(true)
        const body = {
            pid: pid && pid,
        }
        getSalesByPid(body)
    }

    const selectedCustomerState = useMemo(() => {
        const uniqueId = salesData?.customer_state
        const data = allLocations?.find((item) => item?.general_code == uniqueId)
        return data
    }, [allLocations, salesData?.customer_state])

    const stateRedline = useMemo(() => {
        if (selectedCustomerState && salesData?.approved_date) {
            const data = getLocationRedlineHelper(selectedCustomerState, salesData?.approved_date)
            return data
        }
        return null
    }, [salesData?.approved_date, selectedCustomerState])

    const selectedCloser1 = useMemo(() => {
        const uniqueId = salesData?.rep_id ?? salesData?.closer1_detail?.id
        return uniqueId && closersList?.length > 0
            ? closersList?.find((item) => item?.id == uniqueId)
            : null
    }, [closersList, salesData?.closer1_detail?.id, salesData?.rep_id])

    const selectedCloser2 = useMemo(() => {
        const uniqueId = salesData?.rep_id2 ?? salesData?.closer2_detail?.id
        return uniqueId && closersList?.length > 0
            ? closersList?.find((item) => item?.id == uniqueId)
            : null
    }, [closersList, salesData?.closer2_detail?.id, salesData?.rep_id2])

    const selectedSetter1 = useMemo(() => {
        const uniqueId = salesData?.setter_id ?? salesData?.setter1_detail?.id
        return settersList?.length > 0 ? settersList?.find((item) => item?.id == uniqueId) : null
    }, [salesData?.setter1_detail?.id, salesData?.setter_id, settersList])

    const selectedSetter2 = useMemo(() => {
        const uniqueId = salesData?.setter_id2 ?? salesData?.setter2_detail?.id
        return settersList?.length > 0 ? settersList?.find((item) => item?.id == uniqueId) : null
    }, [salesData?.setter2_detail?.id, salesData?.setter_id2, settersList])

    const RepRedlineInfo = ({rep = null, positionType = null}) => {
        const redline_data = getRepRedlineFromSale(
            positionType,
            selectedCustomerState,
            stateRedline?.current?.redline_standard,
            rep,
            salesData?.approved_date
        )
        return rep ? (
            <div className='badge bg-cmPastelsLightgreen text-dark mb-2'>
                Redline: {redline_data?.redline}
                {' | '}
                {redline_data?.type}
            </div>
        ) : null
    }

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />

            <div
                className='bg-cmwhite card pb-10 mb-10'
                style={{
                    zIndex: 1,

                    borderRadius: '0 10px 10px 10px',
                    fontFamily: 'Manrope',
                    fontSize: '14px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                {/* heading */}
                <div className='d-flex flex-wrap align-items-center justify-content-between ps-sm-10 pe-sm-5 px-2 py-5'>
                    <div
                        className='d-flex gap-5 align-items-center cursor-pointer  '
                        onClick={() => naviagte(-1)}
                    >
                        <div className='bi bi-box-arrow-left fs-1 text-cmGrey600 text-hover-dark cursor-pointer'></div>
                        <div
                            className='text-cmGrey900'
                            style={{fontFamily: 'Manrope', fontSize: '16px', fontWeight: '600'}}
                        >
                            {salesData?.pid} - {salesData?.customer_name}{' '}
                            {salesData?.data_source_type ? (
                                <Badge severity='warning' value={salesData?.data_source_type} />
                            ) : null}
                        </div>
                    </div>
                    <div className='d-flex gap-5 align-items-center'>
                        <CustomLink
                            label={'Account Summary'}
                            onClick={() =>
                                naviagte('account-summary', {
                                    state: {
                                        pid: salesData?.pid,
                                        name: salesData?.customer_name,
                                    },
                                })
                            }
                        />

                        <CustomButton
                            buttonLabel='Recalculate'
                            buttonSize={BUTTON_SIZE.small}
                            onClick={getRecalculateData}
                        />
                        <div className=''>
                            <CustomEditIcon
                                onClick={() => {
                                    naviagte(`/reports/sales/add-sales?pid=${salesData?.pid}`, {
                                        state: {
                                            pid: salesData?.pid,
                                            isEditMode: true,
                                        },
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* heading ends */}
                {/* Line 1 */}
                <div
                    className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5  w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25'>PID:</div>
                        <div className='text-cmGrey900 w-sm-25'>{salesData?.pid}</div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5 w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>Customer Name:</div>
                        <div className='text-cmGrey900 w-sm-25'>{salesData?.customer_name}</div>
                    </div>
                </div>
                {/* Line 2 */}
                <div
                    className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25'>Prospect ID:</div>
                        <div className='text-cmGrey900 w-sm-25'>{salesData?.prospect_id}</div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5 w-sm-50'>
                        <div className='text-cmGrey800 text-nowrap w-sm-25'>Customer Address:</div>
                        <div className='text-cmGrey900'>{salesData?.customer_address}</div>
                    </div>
                </div>
                {/* Line 3 */}
                <div
                    className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25'>Homeowner ID:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {salesData?.homeowner_id ?? '-'}
                        </div>
                    </div>

                    <div className='d-flex flex-wrap gap-sm-20 gap-5 w-sm-50'>
                        <div className='text-cmGrey800 text-nowrap w-sm-25'>Customer Address2:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {salesData?.customer_address_2 ?? '-'}
                        </div>
                    </div>
                </div>
                {/* Line 4*/}
                <div
                    className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25'>Proposal ID:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {salesData?.proposal_id ?? '-'}
                        </div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>Customer City:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {salesData?.customer_city ?? '-'}
                        </div>
                    </div>
                </div>
                {/* Line 5*/}
                <div
                    className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25 '>Product:</div>
                        <div className='text-cmGrey900 w-sm-25'>{salesData?.product ?? '-'}</div>
                    </div>

                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5 w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25'>Customer State:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {salesData?.state ?? '-'}
                            {isInputValueExist(stateRedline?.current?.redline_standard) ? (
                                <div className='badge bg-cmPastelsLightgreen text-dark ms-5 mb-2'>
                                    State Redline: {stateRedline?.current?.redline_standard}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                {/* Line 6*/}
                <div
                    className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25 text-nowrap '>
                            Gross Account value:
                        </div>
                        <div className='text-cmGrey900 w-sm-25'>
                            $ {salesData?.gross_account_value ?? '0'}
                        </div>
                    </div>

                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>Customer Zip:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {salesData?.customer_zip ?? '-'}
                        </div>
                    </div>
                </div>
                {/* Line 7*/}
                <div
                    className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25'>Installer:</div>
                        <div className='text-cmGrey900 w-sm-25'>{salesData?.installer}</div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>Customer Email:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {salesData?.customer_email ?? '-'}
                        </div>
                    </div>
                </div>
                {/* Line 8*/}
                <div
                    className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25'>KW:</div>
                        <div className='text-cmGrey900 w-sm-25'>{salesData?.kw ?? '-'}</div>
                    </div>

                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>Customer Phone:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {formattedPhoneNumber(salesData?.customer_phone) ?? '-'}
                        </div>
                    </div>
                </div>

                {/* Line 9*/}
                <div
                    className='py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25 '>EPC:</div>
                        <div className='text-cmGrey900 w-sm-25'>{salesData?.epc ?? '-'}</div>
                    </div>
                    {/* <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
            <div className='text-cmGrey800 w-sm-25'>M1 $ This Week:</div>
            <div className='text-cmGrey900 w-sm-25'>{salesData?.m1_amount ?? '-'}</div>
          </div> */}
                </div>
                {/* line 10 */}
                <div
                    className='bg-cmwhite py-5 stripRow text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25 '>Net EPC:</div>
                        <div className='text-cmGrey900 w-sm-25'>{salesData?.net_epc ?? '-'}</div>
                    </div>
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25 '>Approved Date:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {getValidDate(salesData?.approved_date) ?? '-'}
                        </div>
                    </div>
                </div>
                {/* Line 10*/}

                <div
                    className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25 '>Dealer Fee %:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {salesData?.dealer_fee_percentage
                                ? formattedNumberFields(
                                      Number(salesData?.dealer_fee_percentage) < 1
                                          ? salesData?.dealer_fee_percentage * 100
                                          : salesData?.dealer_fee_percentage,
                                      '%'
                                  )
                                : '-'}
                        </div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>M1 Date:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {getValidDate(salesData?.m1_date) ?? '-'}
                        </div>
                    </div>
                </div>
                {/* ksjd */}
                <div
                    className='bg-cmwhite stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25 '>Dealer Fee $:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {salesData?.dealer_fee_amount
                                ? formattedNumberFields(salesData?.dealer_fee_amount)
                                : '-'}
                        </div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>M2 Date:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {getValidDate(salesData?.m2_date) ?? '-'}
                        </div>
                    </div>
                </div>
                {/* sjfks */}
                <div
                    className=' py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25 '>SOW $:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {salesData?.show != null ? formattedNumberFields(salesData?.show) : '-'}
                        </div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>
                            {salesData?.date_cancelled
                                ? 'Cancel Date:'
                                : salesData?.return_sales_date
                                ? 'Return Sale Date'
                                : 'Cancel Date:'}
                        </div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {getValidDate(salesData?.date_cancelled) ??
                                getValidDate(salesData?.return_sales_date) ??
                                '-'}
                        </div>
                    </div>
                </div>
                {/* Line 11*/}
                <div
                    className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5'>
                        <div className='text-cmGrey800  '>Adders description:</div>
                        <div className='text-cmGrey900 '>
                            {salesData?.adders_description ?? '-'}
                        </div>
                    </div>
                </div>
                {/* shjad */}

                <div
                    className='py-5 text-cmGrey900 px-sm-20 row px-sm-0 px-5 gap-xxl-0 gap-10'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap gap-sm-15 gap-5 col-xxl'>
                        <div className='text-cmGrey800 w-sm-25'>Closer 1:</div>
                        <div className='text-cmGrey900'>
                            <RedirectToEmployeeProfile employeeId={selectedCloser1?.id}>
                                {salesData?.closer1_detail?.first_name ?? '-'}{' '}
                                {salesData?.closer1_detail?.last_name ?? ''}
                                <br />
                                {salesData?.closer1_detail?.email}
                            </RedirectToEmployeeProfile>
                            <RepRedlineInfo
                                rep={selectedCloser1}
                                positionType={MAIN_POSITTIONS_ID.closer}
                            />
                            {salesData?.closer1_detail && (
                                <CloserSetterBottomDisplayValues
                                    m1={salesData?.closer1_m1}
                                    m2={salesData?.closer1_m2}
                                    office={salesData?.closer1_detail?.office}
                                    approvedDate={salesData?.approved_date}
                                    reconciliation={salesData?.closer1_reconcilliation}
                                    showReconciliation={selectedCloser1?.reconciliations?.status}
                                />
                            )}
                        </div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-15 gap-5 col-xxl'>
                        <div className='text-cmGrey800 w-sm-25'>Setter 1:</div>
                        <div className='text-cmGrey900 '>
                            <RedirectToEmployeeProfile employeeId={selectedSetter1?.id}>
                                {salesData?.setter1_detail?.first_name ?? '-'}{' '}
                                {salesData?.setter1_detail?.last_name ?? ''}
                                <br />
                                {salesData?.setter1_detail?.email}
                            </RedirectToEmployeeProfile>
                            <RepRedlineInfo
                                rep={selectedSetter1}
                                positionType={MAIN_POSITTIONS_ID.setter}
                            />
                            {salesData?.setter1_detail && (
                                <CloserSetterBottomDisplayValues
                                    m1={salesData?.setter1_m1}
                                    m2={salesData?.setter1_m2}
                                    approvedDate={salesData?.approved_date}
                                    office={salesData?.setter1_detail?.office}
                                    reconciliation={salesData?.setter1_reconcilliation}
                                    showReconciliation={selectedSetter1?.reconciliations?.status}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div
                    className='py-5 text-cmGrey900 px-sm-20 row px-sm-0 px-5 gap-xxl-0 gap-10 stripRow'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap gap-sm-15 gap-5 col-xxl'>
                        <div className='text-cmGrey800 w-sm-25'>Closer 2:</div>
                        <div className='text-cmGrey900'>
                            <RedirectToEmployeeProfile employeeId={selectedCloser2?.id}>
                                {salesData?.closer2_detail?.first_name ?? '-'}
                                {salesData?.closer2_detail?.last_name ?? ''}
                                <br />
                                {salesData?.closer2_detail?.email}
                            </RedirectToEmployeeProfile>
                            <RepRedlineInfo
                                rep={selectedCloser2}
                                positionType={MAIN_POSITTIONS_ID.closer}
                            />
                            {salesData?.closer2_detail && (
                                <CloserSetterBottomDisplayValues
                                    m1={salesData?.closer2_m1}
                                    m2={salesData?.closer2_m2}
                                    office={salesData?.closer2_detail?.office}
                                    approvedDate={salesData?.approved_date}
                                    reconciliation={salesData?.closer2_reconcilliation}
                                    showReconciliation={selectedCloser2?.reconciliations?.status}
                                />
                            )}
                        </div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-15 gap-5 col-xxl'>
                        <div className='text-cmGrey800 w-sm-25'>Setter 2:</div>
                        <div className='text-cmGrey900'>
                            {' '}
                            <RedirectToEmployeeProfile employeeId={selectedSetter2?.id}>
                                {salesData?.setter2_detail?.first_name ?? '-'}{' '}
                                {salesData?.setter2_detail?.last_name ?? ''}
                                <br />
                                {salesData?.setter2_detail?.email}
                            </RedirectToEmployeeProfile>
                            <RepRedlineInfo
                                rep={selectedSetter2}
                                positionType={MAIN_POSITTIONS_ID.setter}
                            />
                            {salesData?.setter2_detail && (
                                <CloserSetterBottomDisplayValues
                                    m1={salesData?.setter2_m1}
                                    m2={salesData?.setter2_m2}
                                    reconciliation={salesData?.setter2_reconcilliation}
                                    office={salesData?.setter2_detail?.office}
                                    approvedDate={salesData?.approved_date}
                                    showReconciliation={selectedCloser2?.reconciliations?.status}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <AccountOverrides Pid={pid} />
            </div>

            {open && (
                <AddRepPopup
                    show={open}
                    handleClose={handleClose}
                    type={cstype}
                    csObj={closerSetterObj}
                    closerSetterList={{closer: closersList, setter: settersList}}
                />
            )}
        </div>
    )
}

export default SingleSalePage
