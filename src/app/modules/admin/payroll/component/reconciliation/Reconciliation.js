import {useCallback, useEffect, useState} from 'react'
import ReconciliationTabel from './ReconciliationTabel'
import {
    finilizeReconciliationService,
    getReconciliationDetailService,
    payrollReconciliationHistoryService,
} from '../../../../../../services/Services'
import debounce from 'lodash.debounce'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {getReconciliationScheduleSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import {getCompanyReconciliationAction} from '../../../../../../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import {useLocation} from 'react-router-dom'
import {getValidDate} from '../../../../../../constants/constants'

export default function Reconciliation() {
    const reconciliationSchedule = useSelector(getReconciliationScheduleSelector)
    const [loading, setLoading] = useState(false)
    const [reconciliationData, setReconcilliationData] = useState(null)
    const [startDate, setStartDate] = useState(reconciliationSchedule[0]?.period_from)
    const [endDate, setEndDate] = useState(reconciliationSchedule[0]?.period_to)
    const [search, setSearch] = useState('')
    const [activePage, setActivePage] = useState(1)
    const [payrollReconHistory, setPayrollReconHistory] = useState(false)
    const [selectedPeriod, setSelectedPeriod] = useState(reconciliationSchedule?.[0])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCompanyReconciliationAction())
    }, [])
    useEffect(() => {
        // if (location?.search?.includes('?currentRecon')) {
        let data = reconciliationSchedule?.find(
            (item) =>
                getValidDate(item?.period_from, 'YYYY-MM-DD 00:00', true) <=
                    getValidDate(new Date(), 'YYYY-MM-DD 00:00', true) &&
                getValidDate(new Date(), 'YYYY-MM-DD 00:00', true) <=
                    getValidDate(item?.period_to, 'YYYY-MM-DD 00:00', true)
        )
        setSelectedPeriod(data)
        // }
    }, [])

    useEffect(() => {
        getReconciliation()
    }, [search, selectedPeriod, activePage])

    const getReconciliation = () => {
        setLoading(true)
        const body = {
            start_date: selectedPeriod?.period_from,
            end_date: selectedPeriod?.period_to,
            search: search,
            page: activePage,
        }
        getReconciliationDetailService(body)
            .then((res) => {
                setReconcilliationData(res)
            })
            .finally(() => setLoading(false))
    }
    const onPayrollReconHistory = () => {
        setLoading(true)
        const body = {
            start_date: startDate,
            end_date: endDate,
        }
        payrollReconciliationHistoryService(body)
            .then((res) => {
                setReconcilliationData(res)
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => setLoading(false))
    }

    const delaySearch = useCallback(
        debounce((val) => {
            setSearch(val)
        }, 500),
        []
    )
    const handleFinilizeAdd = () => {
        setLoading(true)
        const body = {
            start_date: startDate,
            end_date: endDate,
        }
        finilizeReconciliationService(body)
            .then(() => getReconciliation())
            .catch((e) => {
                setLoading(false)
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }

    const onPageChange = (page) => {
        setActivePage(page)
    }
    const handlePayrollReconHistory = (type) => {
        setPayrollReconHistory(!payrollReconHistory)

        if (!payrollReconHistory) {
            onPayrollReconHistory()
        } else {
            getReconciliation()
        }
    }
    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />
            <div className='engage-toolba r d-flex position-fixed px-5  zindex-2 top-50 end-0 transform-90 mt-20 gap-2'></div>
            <div className='card bg-white h-auto' style={{fontSize: '14px'}}>
                <div className='px-5  py-5 d-flex flex-wrap justify-content-start'>
                    <div className='d-flex justify-content-between gap-3'>
                        {/* <div
                            href=''
                            className={clsx(
                                'btn btn-sm btn-flex fw-bold bg-cmGrey100 text-cmGrey600'
                            )}
                            data-kt-menu-trigger='click'
                            data-kt-menu-placement='bottom-end'
                            style={{
                                fontSize: '14px',
                                width: '99px',
                                height: '43px',
                                fontWeight: 600,
                                fontFamily: 'Manrope',
                            }}
                        >
                            <KTSVG
                                path='/media/icons/duotune/general/gen031.svg'
                                className='me-3 svg-icon-6 svg-icon-muted me-1'
                            />
                            Export
                        </div> */}
                        <div>
                            <CustomButton
                                buttonType={BUTTON_TYPE.secondary}
                                style={{height: '43px'}}
                                buttonLabel={
                                    !payrollReconHistory ? (
                                        <label>Payroll-Recon History</label>
                                    ) : (
                                        <label>Pending Payroll</label>
                                    )
                                }
                                onClick={handlePayrollReconHistory}
                                icon='bi bi-clock-history'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ReconciliationTabel
                    key='reconcilation-table'
                    className='mx-0 px-0'
                    tableData={reconciliationData}
                    onSearch={(value) => delaySearch(value)}
                    setEndDate={setEndDate}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    onFinilize={handleFinilizeAdd}
                    dateDropDown={reconciliationSchedule}
                    getReconciliationData={getReconciliation}
                    activePage={activePage}
                    onPageChange={(page) => onPageChange(page)}
                    onPayrollReconHistory={onPayrollReconHistory}
                    setPayrollReconHistory={setPayrollReconHistory}
                    payrollReconHistory={payrollReconHistory}
                    search={search}
                    setSelectedPeriod={setSelectedPeriod}
                    selectedPeriod={selectedPeriod}
                />
            </div>
        </div>
    )
}
