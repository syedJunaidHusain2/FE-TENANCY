import React, {useCallback, useEffect, useMemo, useState} from 'react'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import Pagination from '../../../sequidocs/component/Pagination'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import {
    TABLE_BORDER,
    downloadAnyFileHelper,
    formattedNumberFields,
    getGlobalSearchData,
} from '../../../../../../helpers/CommonHelpers'
import {MONTH_DAYS, getValidDate} from '../../../../../../constants/constants'
import CustomNoData from '../../../../../../customComponents/customNoData/CustomNoData'
import {useNavigate} from 'react-router-dom'
import usePayFrequency from '../../../../../../hooks/usePayFrequency'
import CustomDatePicker from '../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import {getAdminPayrollReportByFiltersService} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import moment from 'moment'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'

const PayrollReport = () => {
    const navigate = useNavigate()
    const {selectedWeekData, handleSelectedWeekData, weekDropdownList} = usePayFrequency()
    const [selectedMonth, setSelectedMonth] = useState(getValidDate(new Date(), 'MM'))
    const [selectedYear, setSelectedYear] = useState(new Date())
    const [payrollData, setPayrollData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchVal, setSearchVal] = useState('')
    const [isExport, setIsExport] = useState(false)

    const frequencyTypeID = useMemo(() => {
        return weekDropdownList?.find((item) => selectedWeekData == item?.frequency_type_name)
            ?.frequency_type_id
    }, [selectedWeekData, weekDropdownList])

    useEffect(() => {
        getPayrollReport()
    }, [frequencyTypeID, selectedMonth, selectedYear])

    const onSearchPayroll = (e) => {
        setSearchVal(e.target.value)
    }

    const getPayrollReport = useCallback(
        (isExport = false) => {
            const body = {
                pay_period_from_year: selectedYear?.getFullYear(),
                pay_period_from_month: selectedMonth,
                frequency_type: frequencyTypeID,
            }
            if (isExport) body.is_export = '1'
            if (body?.frequency_type) {
                setLoading(true)
                getAdminPayrollReportByFiltersService(body)
                    .then((res) => {
                        if (isExport) {
                            const fileName = `Payroll Reports - ${moment(new Date()).format(
                                'DD MMM YY hh:mm'
                            )}.csv`
                            downloadAnyFileHelper(res, fileName)
                            CustomToast.success('File Downloaded Successfully')
                        } else {
                            setPayrollData(res?.data)
                        }
                    })
                    .finally(() => setLoading(false))
            }
        },
        [frequencyTypeID, selectedMonth, selectedYear]
    )

    const displayData = useMemo(() => {
        let filteredData = payrollData?.payroll_report
        if (searchVal) {
            filteredData = getGlobalSearchData(
                payrollData?.payroll_report,
                ['pay_period_from', 'pay_period_to'],
                searchVal
            )
        }
        return filteredData
    }, [payrollData, searchVal])

    const handleExport = () => {
        getPayrollReport(true)
    }

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />

            <div
                className='d-flex flex-wrap align-items-center justify-content-between bg-cmwhite py-5 ps-sm-15 pe-sm-10 px-3 gap-2 shadow-sm mb-10'
                style={{borderRadius: '0 10px 10px 10px'}}
            >
                <div>
                    <CustomDatePicker
                        viewMode='year'
                        maxDate={new Date()}
                        dateFormat='yy'
                        placeholder='YYYY'
                        value={selectedYear}
                        onChange={(e) => {
                            setSelectedYear(e?.target?.value)
                        }}
                    />
                </div>
                <div>
                    <CustomDropdown
                        placeholder='Select Month'
                        options={MONTH_DAYS}
                        showClear={false}
                        onChange={(e) => {
                            setSelectedMonth(e.target.value)
                        }}
                        value={selectedMonth}
                    />
                </div>
                <div>
                    <CustomDropdown
                        placeholder='Select Pay Frequency'
                        searching={false}
                        value={selectedWeekData}
                        options={weekDropdownList}
                        showClear={false}
                        onChange={(e) => {
                            handleSelectedWeekData(e.target.value)
                        }}
                        valueKey='name'
                    />
                </div>
                <div>
                    <CustomButton
                        buttonType={BUTTON_TYPE.disabled}
                        buttonLabel='Export'
                        onClick={handleExport}
                        padding={'py-3'}
                        icon={'pi pi-file-export'}
                    />
                </div>
            </div>

            <div
                className='table-responsive shadow-sm overflow-auto bg-cmwhite'
                style={{borderRadius: 10}}
            >
                <table className='table'>
                    <thead className={TABLE_BORDER}>
                        <tr
                            className='bg-cmGrey300 text-cmGrey900'
                            style={{
                                fontSize: '14px',
                                fontWeight: '700',
                                fontFamily: fontsFamily.manrope,
                            }}
                        >
                            <th className='p-5 text-nowrap'>Pay Period</th>
                            <th className='p-5 text-nowrap'>Payroll Date</th>
                            <th className='p-5 text-nowrap'>Commissions</th>
                            <th className='p-5 text-nowrap'>Overrides</th>
                            <th className='p-5 text-nowrap'>Deductions</th>
                            <th className='p-5 text-nowrap'>Reconciliations</th>
                            <th className='p-5 text-nowrap'>Adjustments</th>
                            <th className='p-5 text-nowrap'>Net Pay</th>
                        </tr>
                    </thead>
                    <tbody
                        style={{
                            fontSize: '14px',
                        }}
                    >
                        <tr
                            style={{fontWeight: 800}}
                            className='bg-cmGrey100 text-cmGrey900 border-bottom border-cmGrey400'
                        >
                            <td className='px-5 py-2 text-nowrap'>{selectedWeekData}</td>
                            <td className='px-5 py-2 text-nowrap '></td>
                            <td className='px-5 py-2 text-nowrap '>
                                {formattedNumberFields(payrollData?.total_commissions, '$')}
                            </td>
                            <td className='px-5 py-2 text-nowrap '>
                                {formattedNumberFields(payrollData?.total_override, '$')}
                            </td>
                            <td className='px-5 py-2 text-nowrap '>
                                {formattedNumberFields(payrollData?.total_deduction, '$')}
                            </td>
                            <td className='px-5 py-2 text-nowrap '>
                                {formattedNumberFields(payrollData?.total_reconciliation, '$')}
                            </td>
                            <td className='px-5 py-2 text-nowrap '>
                                {formattedNumberFields(payrollData?.total_adjustment, '$')}
                            </td>
                            <td className='px-5 py-2 text-nowrap'>
                                {formattedNumberFields(payrollData?.total_Pay, '$')}
                            </td>
                        </tr>

                        {displayData?.length > 0 ? (
                            displayData?.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`${TABLE_BORDER} text-cmGrey800 stripRow `}
                                    style={{fontWeight: 600}}
                                >
                                    <td
                                        className='p-5 text-nowrap text-cmBlue-Crayola text-decoration-underline cursor-pointer'
                                        onClick={() =>
                                            navigate('particular-payroll', {
                                                state: {
                                                    payPeriod: {
                                                        pay_period_from: item?.pay_period_from,
                                                        pay_period_to: item?.pay_period_to,
                                                    },
                                                },
                                            })
                                        }
                                    >
                                        {getValidDate(item?.pay_period_from, 'MM/DD/YYYY')} -{' '}
                                        {getValidDate(item?.pay_period_to, 'MM/DD/YYYY')}
                                    </td>
                                    <td className='p-5 text-nowrap '>
                                        {getValidDate(item?.payroll_date, 'MM/DD/YYYY')}
                                    </td>
                                    <td className='p-5 text-nowrap'>
                                        {formattedNumberFields(item?.commission, '$')}
                                    </td>
                                    <td className='p-5 text-nowrap'>
                                        {formattedNumberFields(item?.override, '$')}
                                    </td>
                                    <td className='p-5 text-nowrap'>
                                        {formattedNumberFields(item?.deduction, '$')}
                                    </td>
                                    <td className='p-5 text-nowrap'>
                                        {formattedNumberFields(item?.reconciliation, '$')}
                                    </td>
                                    <td className='p-5 text-nowrap'>
                                        {formattedNumberFields(item?.adjustment, '$')}
                                    </td>
                                    <td
                                        className='p-5 text-nowrap text-cmGrey900'
                                        style={{fontWeight: 700}}
                                    >
                                        {formattedNumberFields(item?.netPay, '$')}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr key='no-data'>
                                <td colSpan={10}>
                                    <CustomNoData label={'No data found'} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {1 > 0 ? <Pagination page={null} totalPages={null} setPage={null} /> : null}
            </div>
        </div>
    )
}

export default PayrollReport
