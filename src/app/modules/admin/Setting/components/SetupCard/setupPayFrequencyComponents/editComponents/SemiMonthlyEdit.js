import React, {useCallback, useMemo} from 'react'
import moment from 'moment'

import {MONTHLY_PAY_DAYS, getValidDate} from '../../../../../../../../constants/constants'
import CustomDropdown from '../../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {getDeadlinetoFinalizePayroll} from '../../../../../../../../helpers/CommonHelpers'
import CustomDatePicker from '../../../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomCheckbox from '../../../../../../../../customComponents/customCheckbox/CustomCheckbox'

const FIRST_PAY_DATE_MONTHS = 6
const SemiMonthlyEdit = ({
    payFrequencyData,
    updatePayfrequencySetting,
    updateMultiplePayFrequencySetting,
}) => {
    const firstPayDayOfMonthList = useMemo(() => {
        return new Array(17).fill(1).map((item, index) => ({
            name: index + 1,
            value: index + 1,
        }))
    }, [])
    const secondPayDayOfMonthList = useMemo(() => {
        return new Array(18).fill(14).map((item, index) => {
            if (item + index == 31)
                return {
                    name: 'Last day of month',
                    value: 'Last day of month',
                }
            return {
                name: item + index,
                value: item + index,
            }
        })
    }, [])

    const firstPayDateList = useMemo(() => {
        if (payFrequencyData?.monthly_pay_type) {
            if (
                payFrequencyData?.monthly_pay_type ===
                MONTHLY_PAY_DAYS.fifteenAndLastDayOfMonth.name
            ) {
                const data = [],
                    afterMonth = moment().add(FIRST_PAY_DATE_MONTHS, 'M').startOf('month')
                const currentDate = moment().subtract(5, 'M').startOf('month')
                while (currentDate.month() != afterMonth.month()) {
                    const middleDate = moment(currentDate).date(15)
                    const endDate = moment(currentDate).endOf('month')
                    if (middleDate.toDate() >= new Date()) {
                        data.push({
                            name: getValidDate(middleDate.toDate()),
                            value: getValidDate(middleDate.toDate()),
                            date: middleDate.toDate(),
                        })
                    }
                    if (endDate.toDate() >= currentDate?.toDate()) {
                        data.push({
                            name: getValidDate(endDate.toDate()),
                            value: getValidDate(endDate.toDate()),
                            date: endDate.toDate(),
                        })
                    }
                    currentDate.add(1, 'month')
                }
                return data
            } else if (payFrequencyData?.monthly_pay_type === MONTHLY_PAY_DAYS.other.name) {
                const data = [],
                    afterMonth = moment().add(FIRST_PAY_DATE_MONTHS, 'M').startOf('month')
                const currentDate = moment().startOf('month')
                while (currentDate.month() != afterMonth.month()) {
                    const middleDate = moment(currentDate).date(
                        Number(payFrequencyData?.first_day_pay_of_manths)
                    )
                    const endDate =
                        payFrequencyData?.second_pay_day_of_month != 'Last day of month'
                            ? moment(currentDate).date(
                                  Number(payFrequencyData?.second_pay_day_of_month)
                              )
                            : moment(currentDate).endOf('month')

                    if (middleDate.toDate() >= new Date()) {
                        data.push({
                            name: getValidDate(middleDate.toDate()),
                            value: getValidDate(middleDate.toDate()),
                            date: middleDate.toDate(),
                        })
                    }
                    if (endDate.toDate() >= new Date()) {
                        data.push({
                            name: getValidDate(endDate.toDate()),
                            value: getValidDate(endDate.toDate()),
                            date: endDate.toDate(),
                        })
                    }
                    currentDate.add(1, 'month')
                }
                return data
            }
        }
        return []
    }, [
        payFrequencyData?.first_day_pay_of_manths,
        payFrequencyData?.second_pay_day_of_month,
        payFrequencyData?.monthly_pay_type,
    ])

    const onFrequencyToggle = (e) => {
        updateMultiplePayFrequencySetting(3, {
            status: e.target.checked == true ? 1 : 0,
            monthly_pay_type: null,
            first_day_pay_of_manths: null,
            second_pay_day_of_month: null,
            first_day: null,
            pay_period: null,
        })
    }

    const deadlineToFinalizePayroll = useMemo(() => {
        return getDeadlinetoFinalizePayroll(
            payFrequencyData?.first_day,
            payFrequencyData?.pay_period
        )
    }, [payFrequencyData?.first_day, payFrequencyData?.pay_period])

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
            const dates = `${getValidDate(e?.target?.value)} - `
            updatePayfrequencySetting(3, dates, e?.target?.name)
        },
        [updatePayfrequencySetting]
    )

    const onChangePayPeriodTo = useCallback(
        (e) => {
            const dates = `${getValidDate(selectedPayPeriod?.startPayPeriod)} - ${getValidDate(
                e?.target?.value
            )}`
            updatePayfrequencySetting(3, dates, e?.target?.name)
        },
        [selectedPayPeriod?.startPayPeriod, updatePayfrequencySetting]
    )

    const payPeriodMinMaxDate = useMemo(() => {
        const dayToCount = 16
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

    return (
        <div className='' style={{fontSize: '14px', fontWeight: '600'}}>
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
                                <span> Semi monthly</span>
                            </div>
                        </td>

                        <td className='d-flex align-items-center gap-10'>
                            <div className='d-flex align-items-center gap-5'>
                                <div className='text-nowrap'>Monthly Pay Days:</div>
                                <div className='d-flex align-items-center gap-2'>
                                    <div>
                                        <CustomCheckbox
                                            checked={
                                                payFrequencyData?.monthly_pay_type ==
                                                MONTHLY_PAY_DAYS.fifteenAndLastDayOfMonth.name
                                                    ? true
                                                    : false
                                            }
                                            onChange={(e) => {
                                                updateMultiplePayFrequencySetting(3, {
                                                    monthly_pay_type:
                                                        MONTHLY_PAY_DAYS.fifteenAndLastDayOfMonth
                                                            .name,
                                                    first_day_pay_of_manths: null,
                                                    second_pay_day_of_month: null,
                                                    first_day: null,
                                                    pay_period: null,
                                                })
                                            }}
                                            name='monthly_pay_type'
                                        />
                                    </div>
                                    <div className='text-nowrap'>15th and last day of month</div>
                                </div>
                            </div>
                            <div className=''>
                                <div>or</div>
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div>
                                    <CustomCheckbox
                                        name={'monthly_pay_type'}
                                        checked={
                                            payFrequencyData?.monthly_pay_type ==
                                            MONTHLY_PAY_DAYS.other.name
                                                ? true
                                                : false
                                        }
                                        onChange={(e) => {
                                            updateMultiplePayFrequencySetting(3, {
                                                monthly_pay_type: MONTHLY_PAY_DAYS.other.name,
                                                first_day_pay_of_manths: null,
                                                second_pay_day_of_month: null,
                                                first_day: null,
                                                pay_period: null,
                                            })
                                        }}
                                    />
                                </div>
                                <div>Other</div>
                            </div>
                        </td>
                        {payFrequencyData?.monthly_pay_type == 'other' ? (
                            <td className='row align-items-center'>
                                <div className='col-sm d-flex align-items-center gap-5'>
                                    <div className=''>First Pay Day of Month:</div>
                                    <div className='w-sm-100px w-100'>
                                        <CustomDropdown
                                            options={firstPayDayOfMonthList}
                                            name={'first_day_pay_of_manths'}
                                            value={payFrequencyData?.first_day_pay_of_manths}
                                            onChange={(e) => {
                                                updateMultiplePayFrequencySetting(3, {
                                                    first_day_pay_of_manths: e?.target?.value,
                                                    first_day: null,
                                                    pay_period: null,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm d-flex align-items-center gap-5'>
                                    <div className='text-nowrap'>Second Pay Day of Month:</div>
                                    <div className='w-sm-100px w-100'>
                                        <CustomDropdown
                                            options={secondPayDayOfMonthList}
                                            name={'second_pay_day_of_month'}
                                            value={payFrequencyData?.second_pay_day_of_month}
                                            onChange={(e) => {
                                                updateMultiplePayFrequencySetting(3, {
                                                    second_pay_day_of_month: e?.target?.value,
                                                    first_day: null,
                                                    pay_period: null,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            </td>
                        ) : null}
                    </tr>
                    <tr className='stripRow'>
                        <td className=''></td>
                        <td className=' row gap-5 w-100 mx-auto align-items-center py-3'>
                            <div className='text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0 text-sm-end'>
                                First Check Date:
                            </div>
                            <div className='col-6 col-md-4 p-0 w-sm-200px w-100'>
                                <CustomDropdown
                                    options={firstPayDateList}
                                    className='w-auto'
                                    name={'first_day'}
                                    value={payFrequencyData?.first_day}
                                    onChange={(e) => {
                                        updatePayfrequencySetting(3, e.target.value, e.target.name)
                                    }}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className='stripRow'>
                        <td className=''></td>
                        <td className='row gap-5 w-100 mx-auto align-items-center py-3'>
                            <div className='text-nowrap text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0 text-sm-end'>
                                Pay Period:
                            </div>
                            <div className='d-sm-flex text-center flex col p-0 align-items-center gap-5 flex-wrap pe-5'>
                                <div className='w-sm-200px w-100'>
                                    <CustomDatePicker
                                        name='pay_period'
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
                        <td className='row gap-5 w-100 mx-auto align-items-center py-3'>
                            <div className='col-sm-6 col-md-8 w-sm-25 w-100 p-0'>
                                Deadline to finalize payroll:
                            </div>
                            <div className='col-6 col-md-4 p-0'>
                                <div
                                    className='text-nowrap text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0 text-sm-end'
                                    style={{
                                        fontWeight: 800,
                                    }}
                                >
                                    {deadlineToFinalizePayroll}
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default SemiMonthlyEdit
