import React, {useState, useEffect, useMemo, useCallback} from 'react'
import More1 from '../../Path1.png'
import More from '../../Path.png'
import WeeklyEdit from './editComponents/WeeklyEdit'
import SemiMonthlyEdit from './editComponents/SemiMonthlyEdit'
import BiWeeklyEdit from './editComponents/BiWeeklyEdit'
import {
    addPayFrequencySettingService,
    getPayFrequencySettingService,
} from '../../../../../../../services/Services'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import {
    getPayFrequencySettingAction,
    getPayFrequencyTypeAction,
} from '../../../../../../../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'
import {getPayFrequencyTypeSelector} from '../../../../../../../redux/selectors/SettingsSelectors'
import CustomDialog from '../../../../../../../customComponents/customDialog/CustomDialog'
import MonthlyEdit from './editComponents/MonthlyEdit'
import {useSelector} from 'react-redux'
import {
    getDeadlinetoFinalizePayroll,
    getDeadlinetoFinalizePayrollDate,
    getErrorMessageFromResponse,
} from '../../../../../../../helpers/CommonHelpers'
import {getValidDate} from '../../../../../../../constants/constants'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomArrow, {
    ARROW_DIRECTION,
} from '../../../../../../../customComponents/customIcons/CustomIcons'
import CustomEditIcon from '../../../../../../../customComponents/customIcons/CustomEditIcon'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../../customComponents/customButtton/CustomButton'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'

export let PAY_FREQUENCY_TYPES_ID = {
    weekly: 2,
    monthly: 5,
}
let INITIAL_FREQUENCY = [
    {
        day_of_months: '',
        day_of_week: '',
        deadline_to_run_payroll: '',
        first_day: '',
        first_day_pay_of_manths: '',
        first_months: '',
        first_pay_period_ends_on: '',
        frequency_type_id: 2,
        frequency_type_name: 'Weekly',
        monthly_pay_type: 'Other',
        monthly_per_days: '',
        pay_period: '',
        second_pay_day_of_month: '',
        status: 0,
    },
    {
        day_of_months: '',
        day_of_week: '',
        deadline_to_run_payroll: '',
        first_day: '',
        first_day_pay_of_manths: '',
        first_months: '',
        first_pay_period_ends_on: '',
        frequency_type_id: 5,
        frequency_type_name: 'Monthly',
        monthly_pay_type: 'Other',
        monthly_per_days: '',
        pay_period: '',
        second_pay_day_of_month: '',
        status: 0,
    },
    // {
    //     day_of_months: '',
    //     day_of_week: '',
    //     deadline_to_run_payroll: '',
    //     first_day: '',
    //     first_day_pay_of_manths: '',
    //     first_months: '',
    //     first_pay_period_ends_on: '',
    //     frequency_type_id: 1,
    //     frequency_type_name: 'Daily',
    //     monthly_pay_type: 'Other',
    //     monthly_per_days: '',
    //     pay_period: '',
    //     second_pay_day_of_month: '',
    //     status: 0,
    // },
    // {
    //     day_of_months: '',
    //     day_of_week: '',
    //     deadline_to_run_payroll: '',
    //     first_day: '',
    //     first_day_pay_of_manths: '',
    //     first_months: '',
    //     first_pay_period_ends_on: '',
    //     frequency_type_id: 3,
    //     frequency_type_name: 'Biweekly',
    //     monthly_pay_type: 'Other',
    //     monthly_per_days: '',
    //     pay_period: '',
    //     second_pay_day_of_month: '',
    //     status: 0,
    // },
    // {
    //     day_of_months: '',
    //     day_of_week: '',
    //     deadline_to_run_payroll: '',
    //     first_day: '',
    //     first_day_pay_of_manths: '',
    //     first_months: '',
    //     first_pay_period_ends_on: '',
    //     frequency_type_id: 4,
    //     frequency_type_name: 'Semimonthly',
    //     monthly_pay_type: 'Other',
    //     monthly_per_days: '',
    //     pay_period: '',
    //     second_pay_day_of_month: '',
    //     status: 0,
    // },
]
const SetupPayFrequency = () => {
    const [toggleMorePress, setToggleMorePress] = useState(false)
    const [toggleAddNew, setToggleAddNew] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [payFrequencyData, setPayFrequencyData] = useState(INITIAL_FREQUENCY)
    const [payFrequencyDropDownValue, setPayFrequencyDropDownValue] = useState([])
    const payrollFrequencyTypes = useSelector(getPayFrequencyTypeSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        getPayFrequencySetting()
        dispatch(getPayFrequencySettingAction())
        dispatch(getPayFrequencyTypeAction())
    }, [])

    const getPayFrequencySetting = () => {
        setLoading(true)
        getPayFrequencySettingService()
            .then((res) => {
                const data = res?.frequency
                const isThereActivePayFrequency = data?.some((item) => item?.status)
                const dailyFrequency = data?.find((item) => item.frequency_type_id == 1)
                const weeklyFrequency = data?.find((item) => item.frequency_type_id == 2)
                const biWeeklyFrequency = data?.find((item) => item.frequency_type_id == 3)
                const semiMonthlyFrequency = data?.find((item) => item.frequency_type_id == 4)
                const monthlyFrequency = data?.find((item) => item.frequency_type_id == 5)
                const finalData = [
                    weeklyFrequency ?? INITIAL_FREQUENCY?.[0],
                    monthlyFrequency ?? INITIAL_FREQUENCY?.[1],
                    // dailyFrequency ?? INITIAL_FREQUENCY[0],
                    // biWeeklyFrequency ?? INITIAL_FREQUENCY[2],
                    // semiMonthlyFrequency ?? INITIAL_FREQUENCY[3],
                ]
                setToggleMorePress(isThereActivePayFrequency)
                setPayFrequencyData(finalData)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        let data = payFrequencyData
        data = data?.filter((item) => !item?.status)

        setPayFrequencyDropDownValue(data)
    }, [payFrequencyData])

    const updatePayfrequencySetting = (index, value, name) => {
        let data = [...payFrequencyData]
        data[index][name] = value
        setPayFrequencyData(data)
    }

    const updateMultiplePayFrequencySetting = (index, payPeriodsData) => {
        let data = [...payFrequencyData]
        data[index] = {
            ...data[index],
            ...payPeriodsData,
        }
        setPayFrequencyData(data)
    }

    const handleSaveSettings = () => {
        const finalPayFrequencyData = payFrequencyData?.map((item) => ({
            ...item,
            deadline_to_run_payroll:
                item?.first_day && item?.pay_period
                    ? getDeadlinetoFinalizePayrollDate(item?.first_day)
                    : '',
        }))
        const activePayFrequency = finalPayFrequencyData?.filter((item) => item?.status)
        const errorData = {
            weekly: [],
            monthly: [],
        }
        activePayFrequency?.map((item) => {
            if (item?.frequency_type_id == PAY_FREQUENCY_TYPES_ID.weekly) {
                if (!item?.day_of_week) errorData.weekly.push('Day of week')
                if (!item?.first_day) errorData.weekly.push('First check date')
                if (!item?.pay_period) errorData.weekly.push('Pay period')
            }
            if (item?.frequency_type_id == PAY_FREQUENCY_TYPES_ID.monthly) {
                if (!item?.first_day_pay_of_manths) errorData.monthly.push('First pay day of month')
                if (!item?.first_day) errorData.monthly.push('First check date')
                if (!item?.pay_period) errorData.monthly.push('Pay period')
            }
        })

        if (errorData.weekly?.length > 0)
            return CustomToast.error(`Fill Weekly pay frequency: ${errorData?.weekly?.join(', ')}`)
        if (errorData.monthly?.length > 0)
            return CustomToast.error(
                `Fill Monthly pay frequency: ${errorData?.monthly?.join(', ')}`
            )
        setLoading(true)
        const body = {
            frequency: finalPayFrequencyData,
        }

        addPayFrequencySettingService(body)
            .then(() => {
                setIsEdit(!isEdit)
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => getPayFrequencySetting())
    }

    const onHandleFrequencyChange = (e) => {
        let indexOf = payFrequencyData?.findIndex(
            (item) => item?.frequency_type_name == e.target.value
        )
        if (e.target.value) updatePayfrequencySetting(indexOf, true, 'status')
    }

    const remainingPayFrequencyTypes = useMemo(() => {
        const rawTypes = [...payrollFrequencyTypes]
        const activeTypes = payFrequencyData
            ?.filter((item) => item?.status)
            ?.map((item) => item?.frequency_type_id)
        const remainingTypes = rawTypes.filter((item) => !activeTypes.includes(item?.value))
        return remainingTypes
    }, [payrollFrequencyTypes, payFrequencyData])

    const deadlineToFinalizePayroll = useCallback((dt, pp) => {
        return getDeadlinetoFinalizePayroll(dt, pp)
    }, [])

    const frequencyData = useMemo(() => {
        return {
            weekly: {
                data: payFrequencyData?.find((item) => item?.frequency_type_id == 2),
                index: payFrequencyData?.findIndex((item) => item?.frequency_type_id == 2),
            },
            monthly: {
                data: payFrequencyData?.find((item) => item?.frequency_type_id == 5),
                index: payFrequencyData?.findIndex((item) => item?.frequency_type_id == 5),
            },
        }
    }, [payFrequencyData])
    return (
        <div style={{position: 'relative'}}>
            <CustomLoader visible={loading} full />
            <div
                className='bg-cmwhite shadow-sm mb-10'
                style={{fontFamily: 'Manrope', fontSize: '14px', borderRadius: '10px'}}
            >
                <div className=' px-10'>
                    <div className='py-5 d-flex flex-wrap align-items-center justify-content-between'>
                        <div className='d-flex align-items-center gap-5'>
                            <div
                                className='text-cmBlack'
                                style={{
                                    fontWeight: '700',
                                    fontSize: '16px',
                                    fontFamily: fontsFamily.manrope,
                                    lineHeight: '21.86px',
                                }}
                            >
                                Pay Frequency
                            </div>
                            <div className='d-flex flex-center'>
                                <CustomArrow
                                    arrowDirection={
                                        !toggleMorePress
                                            ? ARROW_DIRECTION.right
                                            : ARROW_DIRECTION.down
                                    }
                                    onClick={() => setToggleMorePress(!toggleMorePress)}
                                />
                            </div>
                        </div>
                        {toggleMorePress && (
                            <>
                                {' '}
                                {isEdit ? (
                                    <div className='d-flex gap-3'>
                                        <CustomButton
                                            buttonLabel='Cancel'
                                            buttonSize={BUTTON_SIZE.small}
                                            buttonType={BUTTON_TYPE.greyText}
                                            onClick={() => {
                                                setIsEdit(!isEdit)
                                                getPayFrequencySetting()
                                            }}
                                        />

                                        <CustomButton
                                            buttonLabel='Save'
                                            buttonType={BUTTON_TYPE.secondary}
                                            buttonSize={BUTTON_SIZE.small}
                                            onClick={() => {
                                                CustomDialog.warn(
                                                    'These changes will affect the entire software. Do you wish to save these changes?',
                                                    () => {
                                                        handleSaveSettings()
                                                    },
                                                    () => {
                                                        setIsEdit(!isEdit)
                                                        getPayFrequencySetting()
                                                    }
                                                )
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <CustomEditIcon onClick={() => setIsEdit(!isEdit)} />
                                )}{' '}
                            </>
                        )}
                    </div>
                    <hr className='border rounded border-cmGrey300 m-0 p-0' />
                </div>
                {toggleMorePress && (
                    <>
                        {!isEdit && (
                            <div className='' style={{fontSize: '14px', fontWeight: '600'}}>
                                {payFrequencyData?.map((item) =>
                                    item?.status && ![1, 4].includes(item?.frequency_type_id) ? (
                                        <div
                                            className='table-responsive '
                                            key={item?.frequency_type_id}
                                        >
                                            <table className='table  text-cmGrey900 w-100'>
                                                <tbody>
                                                    <tr
                                                        className='stripRow'
                                                        key={item?.frequency_type_id}
                                                    >
                                                        <td
                                                            colSpan={2}
                                                            className='ps-sm-10 ps-9 py-2 pt-2'
                                                            style={{fontWeight: '700'}}
                                                        >
                                                            {item?.frequency_type_name}
                                                        </td>
                                                    </tr>

                                                    <tr className='stripRow'>
                                                        <td
                                                            className='ps-sm-10 ps-5 w-sm-25'
                                                            style={{fontWeight: '700'}}
                                                        ></td>
                                                        {item?.frequency_type_id != 5 ? (
                                                            <td className='row gap-10 align-items-center py-3 w-100 mx-auto'>
                                                                <div className='text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0 text-end'>
                                                                    Day of the week:
                                                                </div>
                                                                <div className='text-cmGrey800 col-6 col-md-4 p-0'>
                                                                    {item?.day_of_week}
                                                                </div>
                                                            </td>
                                                        ) : null}
                                                    </tr>

                                                    <tr className='stripRow'>
                                                        <td className=''></td>
                                                        <td className=' row gap-10 align-items-center py-3 w-100 mx-auto'>
                                                            <div className='text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0 text-end'>
                                                                First Check Date:
                                                            </div>
                                                            <div
                                                                className='text-cmGrey800 col-6 col-md-4 p-0'
                                                                style={{fontWeight: '700'}}
                                                            >
                                                                {item?.first_day}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className='px-sm-10 px-5 stripRow '>
                                                        <td className=''></td>
                                                        <td className=' row gap-10 align-items-center py-3 w-100 mx-auto '>
                                                            <div className='text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0 text-end'>
                                                                Pay Period:
                                                            </div>
                                                            <div
                                                                className='text-cmGrey800 col-6 col-md-4 p-0'
                                                                style={{fontWeight: '700'}}
                                                            >
                                                                {item?.pay_period}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className='px-sm-10 px-5 stripRow'>
                                                        <td className=''></td>
                                                        <td className=' row gap-10 align-items-center py-3 w-100 mx-auto '>
                                                            <div className=' col-sm-6 col-md-8 w-sm-25 w-100 p-0 text-end'>
                                                                Deadline to run payroll:
                                                            </div>
                                                            <div
                                                                className='text-cmGrey800 col-6 col-md-4 p-0'
                                                                style={{fontWeight: '700'}}
                                                            >
                                                                {deadlineToFinalizePayroll(
                                                                    item?.first_day,
                                                                    item?.pay_period
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : null
                                )}
                                {/* {payFrequencyData && payFrequencyData[3]?.status ? (
                                    <div className='table-responsive shadow-none overflow-auto'>
                                        <table className='table  text-cmGrey900'>
                                            <tr className='stripRow'>
                                                <td
                                                    className='ps-sm-10 ps-5 w-sm-25 w-100 text-nowrap px-sm-0 px-10'
                                                    style={{fontWeight: '700'}}
                                                >
                                                    Semi monthly
                                                </td>
                                                <td className='row align-items-center py-3'>
                                                    <div className='col-sm-6 d-flex align-items-center gap-10'>
                                                        <div className='text-nowrap'>
                                                            First Pay Date of Month:
                                                        </div>
                                                        <div>
                                                            {
                                                                payFrequencyData?.[3]
                                                                    ?.first_day_pay_of_manths
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-4  p-0 d-flex align-items-center gap-10'>
                                                        <div className='text-nowrap'>
                                                            Second Pay Date of Month:
                                                        </div>
                                                        <div>
                                                            {payFrequencyData &&
                                                                payFrequencyData[3]
                                                                    ?.second_pay_day_of_month}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className='stripRow'>
                                                <td className=''></td>
                                                <td className=' row align-items-center py-3  '>
                                                    <div className=' text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0'>
                                                        First Check Date:
                                                    </div>
                                                    <div
                                                        className='col-6 col-md-4 p-0'
                                                        style={{fontWeight: '700'}}
                                                    >
                                                        {payFrequencyData &&
                                                            payFrequencyData[3]?.first_day}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className='stripRow'>
                                                <td className=''></td>
                                                <td className=' row align-items-center py-3 '>
                                                    <div className='text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0'>
                                                        Pay Period:
                                                    </div>
                                                    <div
                                                        className='col-6 col-md-4 p-0'
                                                        style={{fontWeight: '700'}}
                                                    >
                                                        {payFrequencyData &&
                                                            payFrequencyData[3]?.pay_period}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className='px-sm-10 px-5 stripRow'>
                                                <td className=''></td>
                                                <td className=' row align-items-center py-3  '>
                                                    <div className='text-nowrap col-sm-6 col-md-8 w-sm-25 w-100 p-0'>
                                                        Deadline to run payroll:
                                                    </div>
                                                    <div
                                                        className='text-cmGrey800 col-6 col-md-4 p-0'
                                                        style={{fontWeight: '700'}}
                                                    >
                                                        {deadlineToFinalizePayroll(
                                                            payFrequencyData?.[3]?.first_day,
                                                            payFrequencyData?.[3]?.pay_period
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                ) : null} */}
                            </div>
                        )}
                        {isEdit && (
                            <div className='overflow-auto'>
                                {payFrequencyData[frequencyData?.weekly?.index]?.status ? (
                                    <div>
                                        <WeeklyEdit
                                            payFrequencyIndex={frequencyData?.weekly?.index}
                                            payFrequencyData={
                                                payFrequencyData?.[frequencyData?.weekly?.index]
                                            }
                                            updatePayfrequencySetting={updatePayfrequencySetting}
                                            updateMultiplePayFrequencySetting={
                                                updateMultiplePayFrequencySetting
                                            }
                                        />
                                    </div>
                                ) : null}
                                {/* {payFrequencyData[2]?.status ? (
                                    <div>
                                        <BiWeeklyEdit
                                            payFrequencyData={payFrequencyData?.[2]}
                                            updateMultiplePayFrequencySetting={
                                                updateMultiplePayFrequencySetting
                                            }
                                            updatePayfrequencySetting={updatePayfrequencySetting}
                                        />
                                    </div>
                                ) : null} */}
                                {/* {payFrequencyData[3]?.status ? (
                                    <div>
                                        <SemiMonthlyEdit
                                            payFrequencyData={payFrequencyData?.[3]}
                                            updateMultiplePayFrequencySetting={
                                                updateMultiplePayFrequencySetting
                                            }
                                            updatePayfrequencySetting={updatePayfrequencySetting}
                                        />
                                    </div>
                                ) : null} */}
                                {payFrequencyData[frequencyData?.monthly?.index]?.status ? (
                                    <div>
                                        <MonthlyEdit
                                            updateMultiplePayFrequencySetting={
                                                updateMultiplePayFrequencySetting
                                            }
                                            payFrequencyIndex={frequencyData?.monthly?.index}
                                            payFrequencyData={
                                                payFrequencyData?.[frequencyData?.monthly?.index]
                                            }
                                            updatePayfrequencySetting={updatePayfrequencySetting}
                                        />
                                    </div>
                                ) : null}
                                {!toggleAddNew && payFrequencyDropDownValue?.length > 0 ? (
                                    <div className='d-flex justify-content-start ps-10 text-cmBlue-Crayola my-5'>
                                        <div
                                            className='d-flex align-items-center gap-2 cursor-pointer'
                                            onClick={() => setToggleAddNew(true)}
                                        >
                                            <span className='bi bi-plus-square  fs-5'></span>{' '}
                                            <span className='fw-bold text-decoration-underline'>
                                                {' '}
                                                Add Another
                                            </span>
                                        </div>
                                    </div>
                                ) : payFrequencyDropDownValue?.length > 0 ? (
                                    <div
                                        className='d-flex align-items-center gap-2 text-cmGrey900 m-5 ps-10'
                                        style={{fontWeight: '600'}}
                                    >
                                        <div className=''>Pay Frequency :</div>
                                        <div>
                                            <CustomDropdown
                                                placeholder='Select frequency'
                                                options={remainingPayFrequencyTypes}
                                                valueKey='name'
                                                searching={false}
                                                onChange={onHandleFrequencyChange}
                                                value={payFrequencyData}
                                            />
                                        </div>

                                        <div
                                            className='bi bi-x text-cmError fs-3 bg-cmError bg-opacity-10 px-1 rounded cursor-pointer'
                                            style={{
                                                fontSize: '10px',
                                            }}
                                            onClick={() => setToggleAddNew(false)}
                                        ></div>
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default SetupPayFrequency
