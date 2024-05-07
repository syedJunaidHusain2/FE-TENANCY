import React, {useCallback, useMemo} from 'react'
import moment from 'moment'

import {
    DEFAULT_DATE_FORMAT,
    WEEK_DAYS,
    getValidDate,
} from '../../../../../../../../constants/constants'
import {getDeadlinetoFinalizePayroll} from '../../../../../../../../helpers/CommonHelpers'
import CustomDropdown from '../../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomDatePicker from '../../../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomCheckbox from '../../../../../../../../customComponents/customCheckbox/CustomCheckbox'
const FIRST_PAY_DATE_MONTHS = 6

const BiWeeklyEdit = ({
    payFrequencyData,
    updatePayfrequencySetting,
    updateMultiplePayFrequencySetting,
}) => {
    const firstPayDateList = useMemo(() => {
        if (payFrequencyData?.day_of_week) {
            const data = []
            const afterMonth = moment().add(FIRST_PAY_DATE_MONTHS, 'M')
            const currentDate = moment().startOf('month').day(payFrequencyData?.day_of_week)
            if (currentDate.date() > 7) currentDate.add(7, 'd')
            while (currentDate.toDate() <= afterMonth.toDate()) {
                if (currentDate.toDate() >= new Date()) {
                    const dt = getValidDate(currentDate.toDate())
                    data.push({
                        name: dt,
                        value: dt,
                        date: currentDate.toDate(),
                    })
                }
                currentDate.add(7, 'd')
            }
            return data
        }
        return []
    }, [payFrequencyData?.day_of_week])

    const disableDays = useMemo(() => {
        const foundDay = WEEK_DAYS.find((item) => item?.name == payFrequencyData?.day_of_week)
        return [0, 1, 2, 3, 4, 5, 6].filter((item) => item != foundDay?.dayNumber)
    }, [payFrequencyData?.day_of_week])

    const onFrequencyToggle = (e) => {
        updateMultiplePayFrequencySetting(2, {
            status: e.target.checked == true ? 1 : 0,
            day_of_week: null,
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
            const fromDate = moment(e?.target?.value).toDate()
            const toDate = moment(fromDate).add(13, 'd').toDate()
            const dates = `${getValidDate(fromDate)} - ${getValidDate(toDate)}`
            updatePayfrequencySetting(2, dates, e?.target?.name)
        },
        [updatePayfrequencySetting]
    )

    const payPeriodMinMaxDate = useMemo(() => {
        const dayToCount = 14
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
            <div className='table-responsive shadow-none'>
                <table className='table  text-cmGrey900 '>
                    <tr className='stripRow'>
                        <td className='ps-sm-10 ps-5 w-sm-25' style={{fontWeight: '700'}}>
                            <div className='d-flex gap-3 flex-wrap'>
                                <CustomCheckbox
                                    checked={payFrequencyData?.status == 1 ? true : false}
                                    onChange={onFrequencyToggle}
                                />

                                <span>Bi Weekly</span>
                            </div>
                        </td>
                        <td className=' row gap-5 w-100 mx-auto align-items-center py-3'>
                            <div className='text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0'>
                                Day of the week:
                            </div>
                            <div className='col-6 col-md-4 p-0 w-sm-200px w-100'>
                                <CustomDropdown
                                    searching={false}
                                    name={'day_of_week'}
                                    value={payFrequencyData?.day_of_week}
                                    options={WEEK_DAYS}
                                    onChange={(e) => {
                                        updateMultiplePayFrequencySetting(2, {
                                            day_of_week: e.target.value,
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
                        <td className=' row gap-5 w-100 mx-auto align-items-center py-3 '>
                            <div className='text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0'>
                                First Check Date:
                            </div>
                            <div className='col-6 col-md-4 p-0 w-sm-200px w-100'>
                                <CustomDatePicker
                                    name={'first_day'}
                                    disabledDays={disableDays}
                                    onChange={(e) => {
                                        updateMultiplePayFrequencySetting(2, {
                                            first_day: getValidDate(e.target.value),
                                            pay_period: null,
                                        })
                                    }}
                                    value={
                                        payFrequencyData?.first_day
                                            ? moment(
                                                  payFrequencyData?.first_day,
                                                  'MM/DD/YYYY'
                                              ).toDate()
                                            : null
                                    }
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className='stripRow'>
                        <td className=''></td>
                        <td className='row gap-5 w-100 mx-auto align-items-center py-3'>
                            <div className='text-nowrap text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0'>
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
                                        disabled
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
                            <div className='col-sm-6 col-md-8 w-sm-25 w-100 p-0  '>
                                Deadline to finalize payroll:
                            </div>
                            <div className='col-6 col-md-4 p-0'>
                                <div
                                    className='text-nowrap text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0'
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

export default BiWeeklyEdit
