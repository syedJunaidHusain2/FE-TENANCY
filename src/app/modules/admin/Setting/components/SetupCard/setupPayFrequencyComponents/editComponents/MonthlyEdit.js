import React, {useCallback, useMemo, useState} from 'react'
import moment from 'moment'

import {getValidDate} from '../../../../../../../../constants/constants'
import CustomDropdown from '../../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {
    getDeadlinetoFinalizePayroll,
    isInputValueExist,
} from '../../../../../../../../helpers/CommonHelpers'
import CustomDatePicker from '../../../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomCheckbox from '../../../../../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomToast from '../../../../../../../../customComponents/customToast/CustomToast'
const FIRST_PAY_DATE_MONTHS = 6

const MonthlyEdit = ({
    payFrequencyData,
    payFrequencyIndex,
    updatePayfrequencySetting,
    updateMultiplePayFrequencySetting,
}) => {
    const [disabledDates, setDisabledDates] = useState(null)
    const firstPayDayOfMonthList = useMemo(() => {
        return new Array(31).fill(1).map((item, index) => ({
            name: index + 1,
            value: index + 1,
        }))
    }, [])

    const firstPayDateList = useMemo(() => {
        if (isInputValueExist(payFrequencyData?.first_day_pay_of_manths)) {
            const data = []
            const afterMonth = moment().add(FIRST_PAY_DATE_MONTHS, 'M').startOf('month')
            const currentDate = moment().subtract(5, 'M').startOf('month')
            while (
                currentDate.month() != afterMonth.month() &&
                currentDate.year() != afterMonth.year()
            ) {
                if (
                    Number(payFrequencyData?.first_day_pay_of_manths) <=
                    moment(currentDate).daysInMonth()
                ) {
                    const middleDate = moment(currentDate).date(
                        Number(payFrequencyData?.first_day_pay_of_manths)
                    )
                    if (middleDate.toDate() >= currentDate?.toDate()) {
                        data.push({
                            name: getValidDate(middleDate.toDate()),
                            value: getValidDate(middleDate.toDate()),
                            date: middleDate.toDate(),
                        })
                    }
                }
                currentDate.add(1, 'month')
            }
            return data
        }
        return []
    }, [payFrequencyData?.first_day_pay_of_manths])

    const onFrequencyToggle = (e) => {
        updateMultiplePayFrequencySetting(payFrequencyIndex, {
            status: payFrequencyData?.status ? 0 : 0,
            first_day_pay_of_manths: null,
            first_day: null,
            pay_period: null,
        })
    }

    const selectedPayPeriod = useMemo(() => {
        if (payFrequencyData?.pay_period) {
            const startPayPeriod = payFrequencyData?.pay_period?.split(' - ')?.[0] ?? null
            const endPayPeriod = payFrequencyData?.pay_period?.split(' - ')?.[1] ?? null
            return {
                startPayPeriod: startPayPeriod
                    ? moment(startPayPeriod, 'MM/DD/YYYY').toDate()
                    : null,
                endPayPeriod: endPayPeriod ? moment(endPayPeriod, 'MM/DD/YYYY').toDate() : null,
            }
        }
    }, [payFrequencyData?.pay_period])

    const onChangePayPeriodFrom = useCallback(
        (e) => {
            const date = moment(e?.target?.value).date()
            if ([29, 30, 31].includes(date))
                return CustomToast.error("You can't select 29, 30 , 31")
            const nextMonthDate = moment(e?.target?.value).add(1, 'M').subtract(1, 'd').toDate()
            const dates = `${getValidDate(e?.target?.value)} - ${getValidDate(nextMonthDate)}`
            updatePayfrequencySetting(payFrequencyIndex, dates, e?.target?.name)

            return false
        },
        [payFrequencyIndex, updatePayfrequencySetting]
    )

    const onChangePayPeriodTo = useCallback(
        (e) => {
            const dates = `${getValidDate(selectedPayPeriod?.startPayPeriod)} - ${getValidDate(
                e?.target?.value
            )}`
            updatePayfrequencySetting(payFrequencyIndex, dates, e?.target?.name)
        },
        [payFrequencyIndex, selectedPayPeriod?.startPayPeriod, updatePayfrequencySetting]
    )

    const payPeriodMinMaxDate = useMemo(() => {
        const dayToCount = 30
        return {
            payPeiodFrom: {
                minDate: null,
                maxDate: moment(payFrequencyData?.first_day, 'MM/DD/YYYY').toDate(),
            },
            payPeiodTo: {
                minDate: selectedPayPeriod?.startPayPeriod
                    ? selectedPayPeriod?.startPayPeriod
                    : null,
                maxDate:
                    moment(payFrequencyData?.first_day, 'MM/DD/YYYY').toDate() <
                    moment(selectedPayPeriod?.startPayPeriod).add(dayToCount, 'd').toDate()
                        ? moment(payFrequencyData?.first_day, 'MM/DD/YYYY').toDate()
                        : selectedPayPeriod?.startPayPeriod
                        ? moment(selectedPayPeriod?.startPayPeriod).add(dayToCount, 'd').toDate()
                        : null,
            },
        }
    }, [payFrequencyData?.first_day, selectedPayPeriod?.startPayPeriod])

    const deadlineToFinalizePayroll = useMemo(() => {
        return getDeadlinetoFinalizePayroll(
            payFrequencyData?.first_day,
            payFrequencyData?.pay_period
        )
    }, [payFrequencyData?.first_day, payFrequencyData?.pay_period])

    return (
        <div style={{fontSize: '14px', fontWeight: '600'}}>
            <div className='table-responsive shadow-none '>
                <table className='table  text-cmGrey900'>
                    <tr className='stripRow'>
                        <td className='ps-sm-10 ps-5 w-sm-25' style={{fontWeight: '700'}}>
                            <div className='d-flex gap-3 flex-wrap'>
                                <span>
                                    <CustomCheckbox
                                        checked={payFrequencyData?.status ? true : false}
                                        onChange={onFrequencyToggle}
                                    />
                                </span>
                                <span>Monthly</span>
                            </div>
                        </td>

                        <td className='row gap-5 align-items-center py-3 w-100 mx-auto'>
                            <div className='col-sm-6 col-md-8 w-sm-25 w-100 p-0 text-end'>
                                First Pay Day of Month:
                            </div>
                            <div className='col-6 col-md-4 p-0 w-sm-200px w-100'>
                                <CustomDropdown
                                    options={firstPayDayOfMonthList}
                                    name={'first_day_pay_of_manths'}
                                    value={payFrequencyData?.first_day_pay_of_manths}
                                    onChange={(e) => {
                                        updateMultiplePayFrequencySetting(payFrequencyIndex, {
                                            first_day_pay_of_manths: e?.target?.value,
                                            first_day: null,
                                            pay_period: null,
                                        })
                                    }}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className='stripRow'>
                        <td className=''></td>
                        <td className=' row gap-5 align-items-center py-3 w-100 mx-auto'>
                            <div className='text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0 text-end'>
                                First Check Date:
                            </div>
                            <div className='col-6 col-md-4 p-0 w-sm-200px w-100'>
                                <CustomDropdown
                                    options={firstPayDateList}
                                    className='w-auto'
                                    name={'first_day'}
                                    value={payFrequencyData?.first_day}
                                    onChange={(e) => {
                                        updateMultiplePayFrequencySetting(payFrequencyIndex, {
                                            first_day: e.target.value,
                                            pay_period: null,
                                        })
                                    }}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className='stripRow'>
                        <td className=''></td>
                        <td className='row gap-5 align-items-center py-3 w-100 mx-auto'>
                            <div className='text-nowrap text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0 text-end'>
                                Pay Period:
                            </div>
                            <div className='d-sm-flex text-center flex col p-0 align-items-center gap-5 flex-wrap pe-5'>
                                <div className='w-sm-200px w-100'>
                                    <CustomDatePicker
                                        name='pay_period'
                                        disabledDates={disabledDates}
                                        value={selectedPayPeriod?.startPayPeriod}
                                        readOnlyInput={true}
                                        onChange={onChangePayPeriodFrom}
                                        maxDate={payPeriodMinMaxDate.payPeiodFrom.maxDate}
                                    />
                                </div>
                                <div> to </div>
                                <div className='w-sm-200px w-100'>
                                    <CustomDatePicker
                                        name='pay_period'
                                        value={selectedPayPeriod?.endPayPeriod}
                                        disabled
                                        readOnlyInput={true}
                                        onChange={onChangePayPeriodTo}
                                        minDate={payPeriodMinMaxDate.payPeiodTo.minDate}
                                        maxDate={payPeriodMinMaxDate.payPeiodTo.maxDate}
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='stripRow'>
                        <td className=''></td>
                        <td className='row gap-5 align-items-center py-3 w-100 mx-auto'>
                            <div className=' col-md-8 w-sm-25 w-100 p-0 text-end'>
                                Deadline to finalize payroll:
                            </div>
                            <div
                                className='col-md-4 p-0'
                                style={{
                                    fontWeight: 800,
                                }}
                            >
                                {deadlineToFinalizePayroll}
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default MonthlyEdit
