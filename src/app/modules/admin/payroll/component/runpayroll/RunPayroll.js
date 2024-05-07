import {useCallback, useEffect, useMemo, useState} from 'react'
import {
    closePayrollService,
    executePayrollService,
    exportPayrollReportService,
    finilizePayrollService,
    getPayrollDataService,
    markAsPaidPayrollService,
    moveToNextPayrollService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import debounce from 'lodash.debounce'
import {RunPayrollTabel} from './RunPayrollTabel'
import {getValidDate} from '../../../../../../constants/constants'
import usePayFrequency from '../../../../../../hooks/usePayFrequency'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import {
    getMonthlyPayPeriodAction,
    getPayFrequencySettingAction,
    getWeeklyPayPeriodAction,
} from '../../../../../../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import ViewSummary from './ViewSummary'
import MoveToReconcilitationPopUp from './MoveToReconModal'
import {
    downloadAnyFileHelper,
    getErrorMessageFromResponse,
} from '../../../../../../helpers/CommonHelpers'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import RunPayrollFilter from '../../../filters/RunPayrollFilter'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import PayrollExecuteModal from './PayrollExecuteModal'
import ExecuteConfirmModal from './ExecuteConfirmModal'
import {useLocation, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCompanySettingSelector} from '../../../../../../redux/selectors/SettingsSelectors'

import moment from 'moment'
import CustomCheckbox from '../../../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomLink from '../../../../../../customComponents/customButtton/CustomLink'

const initialFilter = {
    position_filter: '',
    netpay_filter: '',
    commission_filter: '',
}

export default function RunPayroll() {
    const [loading, setLoading] = useState(false)
    const [payrollTableData, setPayrollTableData] = useState([])
    const [selectedPayroll, setSelectedPayrollData] = useState([])
    const [showReconModal, setShowReconModal] = useState(false)
    const [selectedPageType, setSelectedPageType] = useState(null)
    const [showOnlyEnabledReconciliation, setShowOnlyEnabledReconciliation] = useState(false)
    const {
        weekDropdownList,
        payPeriodList,
        handleSelectedWeekData,
        selectedPayPeriod,
        currentPayPeriod,
        nextPayPeriod,
        setSelectedPayPeriod,
        selectedWeekData,
    } = usePayFrequency()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchVal, setSearchVal] = useState('')
    const [showSummary, setShowSummary] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [payrollConfigData, setPayrollConfigData] = useState(null)
    const [executePayroll, setExecutePayroll] = useState(false)
    const [executeConfirm, setExecuteConfirm] = useState(false)
    const companySetting = useSelector(getCompanySettingSelector)
    const [filterData, setFilterData] = useState(initialFilter)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPayFrequencySettingAction())
    }, [])

    useEffect(() => {
        setSelectedPayrollData([])
        setSelectedPageType(null)
    }, [showOnlyEnabledReconciliation])

    //get payroll data
    useEffect(() => {
        getPayrollData()
    }, [
        searchTerm,
        selectedPayPeriod,
        payPeriodList,
        page,
        showOnlyEnabledReconciliation,
        filterData,
    ])

    //function to get payroll data
    const getPayrollData = useCallback(() => {
        let startDate = currentPayPeriod?.pay_period_from ?? null,
            endDate = currentPayPeriod?.pay_period_to ?? null

        if (startDate && endDate) {
            setLoading(true)
            const body = {
                office_id: 'all',
                start_date: getValidDate(startDate, 'YYYY-MM-DD'),
                end_date: getValidDate(endDate, 'YYYY-MM-DD'),
                search: searchTerm,
                is_reconciliation: showOnlyEnabledReconciliation ? 1 : 0,
                page: page,
                pay_frequency: weekDropdownList?.find(
                    (item) => selectedWeekData == item?.frequency_type_name
                )?.frequency_type_id,
                ...filterData,
            }
            getPayrollDataService(body)
                .then((res) => {
                    res?.data?.data?.sort((a, b) => a.first_name.localeCompare(b.first_name))
                    setPayrollTableData(res?.data)
                    setPayrollConfigData(res)
                })
                .finally(() => setLoading(false))
        }
    }, [
        currentPayPeriod?.pay_period_from,
        currentPayPeriod?.pay_period_to,
        filterData,
        page,
        searchTerm,
        selectedWeekData,
        showOnlyEnabledReconciliation,
        weekDropdownList,
    ])

    useEffect(() => {
        if (page == 1) setExecuteConfirm(payrollConfigData?.all_paid)
    }, [payrollTableData])

    const payrollSearch = (e) => {
        setSearchVal(e.target.value)
        delaySaveToDb(e.target.value)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            setPage(1)
            setSearchTerm(val)
        }, 500),
        []
    )
    const periodChange = (e) => {
        setSearchVal('')
        setSearchTerm('')
        setSelectedPayrollData([])
        setPage(1)
        setSelectedPageType(null)
        setFilterData(initialFilter)
        setSelectedPayPeriod(e?.target?.value)
    }
    const handleFinilizeAdd = () => {
        if (!payrollConfigData?.finalize_status) {
            CustomDialog.warn('Are you sure you want to finalize ?', () => {
                // setLoading(true)
                setButtonLoading(true)
                const body = {
                    start_date: currentPayPeriod?.pay_period_from,
                    end_date: currentPayPeriod?.pay_period_to,
                    search: searchTerm,
                    select_type: '',
                }

                finilizePayrollService(body)
                    .then(() => {
                        // refreshPayFrequency()
                        getPayrollData()
                    })
                    .catch((e) => {
                        CustomToast.error(getErrorMessageFromResponse(e))
                    })
                    .finally(() => setButtonLoading(false))
            })
        } else {
            CustomDialog.warn('Are you sure you want to execute ?', () => {
                // setLoading(true)
                setButtonLoading(true)
                const body = {
                    start_date: currentPayPeriod?.pay_period_from,
                    end_date: currentPayPeriod?.pay_period_to,
                }
                executePayrollService(body)
                    .then(() => {
                        setExecutePayroll(true)

                        refreshPayFrequency()
                    })
                    .catch((e) => {
                        CustomToast.error(getErrorMessageFromResponse(e))
                    })
                    .finally(() => setButtonLoading(false))
            })
        }
    }

    const onMoveToNextPayroll = () => {
        setLoading(true)
        const body = {
            payrollId: selectedPayroll,
            start_date: nextPayPeriod?.pay_period_from,
            end_date: nextPayPeriod?.pay_period_to,
        }

        moveToNextPayrollService(body)
            .then(() => {
                getPayrollData()
                setSelectedPayrollData([])
                setSelectedPageType(null)
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
                CustomToast.success('Payroll moved to next')
            })
    }
    const onMarkAsPaid = () => {
        setLoading(true)
        const body = {
            payrollId: selectedPayroll,
            pay_period_from: currentPayPeriod?.pay_period_from,
            pay_period_to: currentPayPeriod?.pay_period_to,
            select_type: selectedPageType ?? 'this_page',
        }
        // if (selectedPageType) body.select_type = selectedPageType
        if (selectedPageType == 'all_pages') body.payrollId = []

        markAsPaidPayrollService(body)
            .then(() => {
                getPayrollData()
                setSelectedPayrollData([])
                setSelectedPageType(null)
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
                CustomToast.success('Payroll marked as paid')
            })
    }
    const onMoveToReconciliation = () => {
        setShowReconModal(true)
        return
    }
    const onChangeWeek = (e) => {
        setFilterData(initialFilter)

        handleSelectedWeekData(e.target.value)
    }

    const handleViewSummary = () => {
        setShowSummary(!showSummary)
    }

    const periodList = useMemo(() => {
        return payPeriodList?.map((item) => ({
            ...item,
            period: `${getValidDate(item?.pay_period_from)} to ${getValidDate(
                item?.pay_period_to
            )}`,
        }))
    }, [payPeriodList])

    const onApplyFilter = (filter) => {
        setPage(1)
        setSearchTerm('')
        setSearchVal('')
        setFilterData(filter)
    }

    const onResetFilter = () => {
        setPage(1)
        setSearchTerm('')
        setSearchVal('')
        setFilterData(initialFilter)
        // getlocation()
    }

    const onShowReconciliationsPosiitons = () => {
        setPage(1)
        setSearchTerm('')
        setSearchVal('')
        setShowOnlyEnabledReconciliation((val) => !val)
    }

    const handlePayrolModal = () => {
        setExecutePayroll(!executePayroll)
    }
    const handleExecute = () => {
        setExecuteConfirm(!executeConfirm)
    }

    const refreshPayFrequency = useCallback(() => {
        dispatch(getWeeklyPayPeriodAction())
        dispatch(getMonthlyPayPeriodAction())
        getPayrollData()
    }, [dispatch, getPayrollData])
    // const isAllPayrollPaid = useMemo(() => {
    //     return payrollTableData?.data?.every((item) => item?.status_id === 3)
    // }, [payrollTableData?.data, payrollTableData])

    const handleClosePayroll = () => {
        CustomDialog.warn('Are you sure you want to close this payroll ?', () => {
            setLoading(true)
            const body = {
                start_date: currentPayPeriod?.pay_period_from,
                end_date: currentPayPeriod?.pay_period_to,
            }
            closePayrollService(body)
                .then(() => {
                    refreshPayFrequency()
                })
                .finally(() => {
                    setLoading(false)
                })
        })
    }

    const navigateAlertButton = (type) => {
        navigate(`/alert-center/alerts?alertType=${type}&page=1&search=null`, {
            state: {alertType: type},
        })
    }

    const downloadCsvFile = useCallback(() => {
        let startDate = currentPayPeriod?.pay_period_from ?? null,
            endDate = currentPayPeriod?.pay_period_to ?? null
        setLoading(true)
        const body = {
            start_date: getValidDate(startDate, 'YYYY-MM-DD'),
            end_date: getValidDate(endDate, 'YYYY-MM-DD'),
            pay_frequency: weekDropdownList?.find(
                (item) => selectedWeekData == item?.frequency_type_name
            )?.frequency_type_id,
            type: 'payroll_paid',
        }
        exportPayrollReportService(body)
            .then((res) => {
                const fileName = `Payroll Reports - ${moment(new Date()).format(
                    'DD MMM YY hh:mm'
                )}.csv`
                downloadAnyFileHelper(res, fileName)
                CustomToast.success('File Downloaded Successfully')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [
        currentPayPeriod?.pay_period_from,
        currentPayPeriod?.pay_period_to,
        selectedWeekData,
        weekDropdownList,
    ])

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />
            <div
                className='engage-toolbar d-flex position-fixed px-5 top-50 end-0 transform-90 mt-20 gap-2'
                style={{zIndex: '10'}}
            >
                <button
                    style={{border: '1px solid #6078EC', borderRadius: '12px'}}
                    id='kt_engage_demos_toggle1'
                    className='engage-demos-toggle btn btn-flex h-35px bg-body  shadow-sm fs-6 px-4 rounded-top-0'
                    title={`Check out ${process.env.REACT_APP_THEME_NAME} more demos`}
                    data-bs-placement='left'
                    data-bs-dismiss='click'
                    data-bs-trigger='hover'
                >
                    <span style={{color: '#6078EC'}} onClick={handleViewSummary}>
                        View Summary
                    </span>
                </button>
            </div>
            <div
                className='bg-cmwhite h-auto'
                style={{
                    fontSize: '14px',
                    fontFamily: 'Manrope',
                    borderRadius: '0 10px 10px 10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <div className='w-100 gap-2 p-8 d-flex flex-wrap align-items-center justify-content-between'>
                    <div
                        style={{height: '43px', borderRadius: '20px'}}
                        className='mb-1'
                        id='kt_chat_contacts_header'
                    >
                        <form
                            className='position-relative'
                            style={{borderRadius: '90px'}}
                            autoComplete='off'
                        >
                            {/* Run Payroll Search Input */}
                            <CustomInput
                                type={INPUT_TYPE.search}
                                name='search'
                                value={searchVal}
                                onChange={payrollSearch}
                            />
                        </form>
                    </div>
                    <div>
                        <CustomDropdown
                            onChange={onChangeWeek}
                            options={weekDropdownList}
                            value={selectedWeekData}
                            showClear={false}
                            searching={false}
                            valueKey='name'
                        />
                    </div>
                    <div
                        className=' mb-1 fw-bold d-flex flex-row w-250px'
                        style={{
                            borderRadius: '6px',
                            height: '40px',
                        }}
                    >
                        <CustomDropdown
                            name='status'
                            onChange={periodChange}
                            options={periodList}
                            valueKey='id'
                            displayKey='period'
                            value={selectedPayPeriod}
                            showClear={false}
                        />
                    </div>
                    {/* filter */}

                    <div>
                        {' '}
                        <RunPayrollFilter
                            initialFilter={initialFilter}
                            onApplyFilter={(updatedFilter) => {
                                onApplyFilter(updatedFilter)
                            }}
                            resetFilter={onResetFilter}
                        />
                    </div>
                    <div>
                        <CustomButton
                            buttonType={BUTTON_TYPE.disabled}
                            buttonLabel='Export To CSV'
                            onClick={downloadCsvFile}
                        />
                    </div>
                </div>
            </div>

            {payrollTableData?.data?.length > 0 &&
            selectedPayroll?.length <= 0 &&
            !payrollConfigData?.all_paid ? (
                <div className=' my-5 '>
                    <div className=''>
                        <CustomButton
                            buttonType={
                                !payrollConfigData?.finalize_status
                                    ? BUTTON_TYPE.secondaryBorder
                                    : BUTTON_TYPE.primary
                            }
                            buttonLabel={
                                !payrollConfigData?.finalize_status ? (
                                    <label>
                                        {buttonLoading ? 'Finalizing payroll' : 'Finalize Payroll'}
                                    </label>
                                ) : (
                                    <label>
                                        {buttonLoading ? 'Executing payroll' : 'Execute Payroll'}
                                    </label>
                                )
                            }
                            onClick={handleFinilizeAdd}
                            loading={buttonLoading}
                            buttonSize={BUTTON_SIZE.large}
                            icon={!payrollConfigData?.finalize_status ? 'bi bi-calendar2' : ''}
                        />
                        {companySetting?.reconciliation ? (
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex flex-row align-items-center gap-3 mt-5 justify-content-center'>
                                    <div>
                                        <CustomCheckbox
                                            checked={showOnlyEnabledReconciliation}
                                            onChange={onShowReconciliationsPosiitons}
                                        />
                                    </div>
                                    <div
                                        style={{fontSize: 12, fontWeight: 600}}
                                        className='text-cmGrey600'
                                    >
                                        Show reconciliations positions only
                                    </div>
                                </div>
                                <div className='d-flex flex-end me-2'>
                                    <CustomLink
                                        label={'View all Alert'}
                                        onClick={() => navigate('/alert-center/alerts')}
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}
            {payrollConfigData?.all_paid && currentPayPeriod ? (
                <div className='d-flex justify-content-center my-8'>
                    <CustomButton
                        buttonType={BUTTON_TYPE.successBorder}
                        buttonLabel={'Close Payroll'}
                        onClick={handleClosePayroll}
                    />
                </div>
            ) : null}

            {selectedPayroll?.length > 0 ? (
                <div
                    className='d-flex flex-wrap justify-content-evenly align-items-start my-10'
                    style={{fontWeight: '700', fontSize: '16px'}}
                >
                    <CustomButton
                        key='mark-as-paid-button'
                        buttonType={BUTTON_TYPE.primary}
                        buttonLabel='Mark as Paid'
                        onClick={onMarkAsPaid}
                        buttonSize={BUTTON_SIZE.small}
                    />
                    {companySetting?.reconciliation ? (
                        <div>
                            <CustomButton
                                disabled={!showOnlyEnabledReconciliation}
                                key='move-to-reconciliation-button'
                                buttonType={BUTTON_TYPE.primary}
                                buttonLabel='
                            Move to Reconciliations'
                                onClick={onMoveToReconciliation}
                                buttonSize={BUTTON_SIZE.small}
                            />
                        </div>
                    ) : null}

                    {selectedPageType != 'all_pages' ? (
                        <CustomButton
                            buttonSize={BUTTON_SIZE.small}
                            key='move-to-next-payroll-button'
                            buttonType={BUTTON_TYPE.primary}
                            buttonLabel='Move to Next Payroll'
                            onClick={onMoveToNextPayroll}
                        />
                    ) : null}
                </div>
            ) : null}

            {selectedPayroll?.length > 0 ? (
                <div className='d-flex flex-row align-items-center mb-2'>
                    <CustomCheckbox
                        checked={showOnlyEnabledReconciliation}
                        onChange={onShowReconciliationsPosiitons}
                    />
                    <span style={{fontSize: 12, fontWeight: 600}} className='text-cmGrey600 ms-2'>
                        Show reconciliations positions only
                    </span>
                </div>
            ) : null}

            {selectedPayroll?.length > 0 && (
                <div style={{fontSize: '12px', fontWeight: '700'}}>
                    {selectedPageType == 'all_pages' ? (
                        'All pages selected'
                    ) : (
                        <>
                            {selectedPageType == 'all_pages'
                                ? payrollTableData?.total
                                : selectedPayroll?.length}{' '}
                            / {payrollTableData?.total} Selected
                        </>
                    )}
                </div>
            )}
            <div>
                <RunPayrollTabel
                    pay_period_from={currentPayPeriod?.pay_period_from}
                    pay_period_to={currentPayPeriod?.pay_period_to}
                    selectedPayroll={selectedPayroll}
                    setSelectedPayrollData={setSelectedPayrollData}
                    finalize_status={payrollConfigData?.finalize_status}
                    tableData={payrollTableData}
                    activePage={page}
                    onPageChange={(selectedPage) => setPage(selectedPage)}
                    getPayrollData={getPayrollData}
                    currentPayPeriod={currentPayPeriod}
                    setSelectedPageType={setSelectedPageType}
                    selectedPageType={selectedPageType}
                    isAllPayrollPaid={payrollConfigData?.all_paid}
                />
            </div>

            {showSummary ? (
                <ViewSummary
                    open={showSummary}
                    close={handleViewSummary}
                    periodList={payPeriodList}
                    selectedWeekData={selectedWeekData}
                    currentPayPeriod={currentPayPeriod}
                />
            ) : null}
            {showReconModal ? (
                <MoveToReconcilitationPopUp
                    show={showReconModal}
                    handleClose={() => setShowReconModal(false)}
                    selectedArr={selectedPayroll}
                    setSelectedArr={setSelectedPayrollData}
                    getPayrollData={getPayrollData}
                    selectedPageType={selectedPageType}
                />
            ) : null}
            {executePayroll ? (
                <PayrollExecuteModal
                    show={executePayroll}
                    handleClose={handlePayrolModal}
                    refreshPayFrequency={refreshPayFrequency}
                    selectedPayPeriod={selectedPayPeriod}
                />
            ) : null}
            {executeConfirm ? (
                <ExecuteConfirmModal show={executeConfirm} handleClose={handleExecute} />
            ) : null}
        </div>
    )
}
