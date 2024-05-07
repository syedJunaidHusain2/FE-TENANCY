import React, {useState, useEffect, useCallback, useMemo} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {PayrollTabel} from './PayrollTabel'
import {
    exportPayrollReportService,
    getAdminPayrollReportService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {getValidDate} from '../../../../../../constants/constants'
import debounce from 'lodash.debounce'
import usePayFrequency from '../../../../../../hooks/usePayFrequency'
import {
    downloadAnyFileHelper,
    getErrorMessageFromResponse,
} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import ViewSummary from '../../../payroll/component/runpayroll/ViewSummary'
import {useLocation, useNavigate} from 'react-router-dom'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import moment from 'moment'

export default function RunPayroll() {
    const [payrollData, setPayrollData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchVal, setSearchVal] = useState('')
    const [showSummary, setShowSummary] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const {selectedWeekData, executedPayPeriodList, weekDropdownList} = usePayFrequency()

    // useEffect(() => {
    //     // if (location?.state) {
    //     //     setSelectedPayPeriod(location?.state?.period)
    //     // } else
    //     setSelectedPayPeriod(executedPayPeriodList?.[0]?.id)
    // }, [executedPayPeriodList, location, selectedWeekData])

    useEffect(() => {
        let startDate = location?.state?.payPeriod?.pay_period_from ?? null,
            endDate = location?.state?.payPeriod?.pay_period_to ?? null
        if (startDate && endDate) {
            setLoading(true)
            const body = {
                start_date: getValidDate(startDate, 'YYYY-MM-DD'),
                end_date: getValidDate(endDate, 'YYYY-MM-DD'),
                search: searchTerm,
                page: page,
            }
            getAdminPayrollReportService(body)
                .then((res) => {
                    setPayrollData(res.data)
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [page, searchTerm, location])
    // useEffect(() => {
    //     let startDate = executedCurrentPayPeriod?.pay_period_from ?? null,
    //         endDate = executedCurrentPayPeriod?.pay_period_to ?? null
    //     if (startDate && endDate) {
    //         setLoading(true)
    //         const body = {
    //             start_date: getValidDate(startDate, 'YYYY-MM-DD'),
    //             end_date: getValidDate(endDate, 'YYYY-MM-DD'),
    //             search: searchTerm,
    //             page: page,
    //         }
    //         getAdminPayrollReportService(body)
    //             .then((res) => {
    //                 setPayrollData(res.data)
    //             })
    //             .catch((e) => {
    //                 CustomToast.error(getErrorMessageFromResponse(e))
    //             })
    //             .finally(() => {
    //                 setLoading(false)
    //             })
    //     }
    // }, [page, selectedPayPeriod, searchTerm, executedPayPeriodList])

    const onPageChange = (selectedPage) => {
        setPage(selectedPage)
    }
    // const periodChange = (e) => {
    //     setPage(1)
    //     setSelectedPayPeriod(e?.target?.value)
    // }

    const onSearchPayroll = (e) => {
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

    const handleViewSummary = () => {
        setShowSummary(!showSummary)
    }

    const periodList = useMemo(() => {
        return executedPayPeriodList?.map((item) => ({
            ...item,
            period: `${getValidDate(item?.pay_period_from)} to ${getValidDate(
                item?.pay_period_to
            )}`,
        }))
    }, [executedPayPeriodList])

    const downloadCsvFile = useCallback(() => {
        // let startDate = executedCurrentPayPeriod?.pay_period_from ?? null,
        //     endDate = executedCurrentPayPeriod?.pay_period_to ?? null
        let startDate = location?.state?.payPeriod?.pay_period_from ?? null,
            endDate = location?.state?.payPeriod?.pay_period_to ?? null
        setLoading(true)
        const body = {
            start_date: getValidDate(startDate, 'YYYY-MM-DD'),
            end_date: getValidDate(endDate, 'YYYY-MM-DD'),
            pay_frequency: weekDropdownList?.find(
                (item) => selectedWeekData == item?.frequency_type_name
            )?.frequency_type_id,
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
        location?.state?.payPeriod?.pay_period_from,
        location?.state?.payPeriod?.pay_period_to,
        selectedWeekData,
        weekDropdownList,
    ])

    return (
        <div>
            <CustomLoader full visible={loading} />
            <div className='engage-toolbar d-flex position-fixed px-5  zindex-2 top-50 end-0 transform-90 mt-20 gap-2'>
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
                className='card mb-10 bg-cmwhite'
                style={{
                    borderRadius: '0 10px 10px 10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <div
                    className='p-5 d-flex flex-wrap align-items-center justify-content-between gap-5'
                    style={{
                        fontSize: '14px',
                        fontFamily: 'Manrope',
                    }}
                >
                    <div
                        className='d-flex flex-center gap-3 text-cmGrey900'
                        style={{fontWeight: 700, fontSize: 16}}
                    >
                        <KTSVG
                            path='/media/icons/duotune/art/back-square.svg'
                            svgClassName='w-30px h-30px cursor-pointer'
                            onClick={() => navigate(-1)}
                        />
                        <div>
                            {getValidDate(
                                location?.state?.payPeriod?.pay_period_from,
                                'MM/DD/YYYY'
                            )}{' '}
                            -{' '}
                            {getValidDate(location?.state?.payPeriod?.pay_period_to, 'MM/DD/YYYY')}
                        </div>
                    </div>

                    {/* small buttons */}

                    <div>
                        <CustomInput
                            type={INPUT_TYPE.search}
                            name='search'
                            value={searchVal}
                            onChange={onSearchPayroll}
                        />
                    </div>
                    <div>
                        <CustomButton
                            buttonType={BUTTON_TYPE.disabled}
                            buttonLabel='Export To CSV'
                            onClick={downloadCsvFile}
                        />
                    </div>

                    {/* <div>
                    <CustomDropdown
                        placeholder='Select Pay Frequency'
                        searching={false}
                        value={selectedWeekData}
                        options={weekDropdownList}
                        showClear={false}
                        onChange={(e) => {
                            setWeek(e.target.value)
                            handleSelectedWeekData(e.target.value)
                            setPayrollData([])
                        }}
                        valueKey='name'
                    />
                </div>

                <div className=''>
                    <CustomDropdown
                        placeholder='Select Pay period'
                        value={selectedPayPeriod}
                        name='status'
                        options={periodList}
                        onChange={periodChange}
                        valueKey={'id'}
                        displayKey='period'
                    />
                </div> */}
                </div>
            </div>
            <div>
                <PayrollTabel
                    className='mx-0 px-0 mt-8'
                    payrollTableData={payrollData}
                    onPageChange={(selectedPage) => onPageChange(selectedPage)}
                    activePage={page}
                    currentPayPeriod={location?.state?.payPeriod}
                />
            </div>
            {/* <ViewSummary open={showSummary} close={handleViewSummary} /> */}
            {showSummary ? (
                <ViewSummary
                    open={showSummary}
                    close={handleViewSummary}
                    periodList={periodList}
                    selectedWeekData={selectedWeekData}
                    currentPayPeriod={location?.state?.payPeriod}
                    isReport={true}
                />
            ) : null}
        </div>
    )
}
