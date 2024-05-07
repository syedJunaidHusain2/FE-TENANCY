import React, {useEffect, useState, useMemo} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {
    getPayRollMissingDetailsService,
    getPayrollByidAlertCenterService,
} from '../../../../../services/Services'
import usePayFrequency from '../../../../../hooks/usePayFrequency'
import {getPayFrequencySettingSelector} from '../../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import {getValidDate} from '../../../../../constants/constants'
import {
    formattedNumberFields,
    getErrorMessageFromResponse,
} from '../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import CustomButton from '../../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {fontsFamily} from '../../../../../assets/fonts/fonts'

const PayrollAlert = ({}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [alertData, setAlertData] = useState(null)
    const [payrollError, setPayrollError] = useState(null)
    const [payPeriod, setPayPeriod] = useState(null)

    const payrollData = location?.state?.stateData
    const {payPeriodList, selectedWeekData, setSelectedWeekData} = usePayFrequency()
    const getPayFrequencyData = useSelector(getPayFrequencySettingSelector)

    useEffect(() => {
        getPayRollMissingDetailsService('LIS24253').then((res) => {
            setAlertData(res?.data)
        })
        // .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        let data = getPayFrequencyData?.find(
            (item) => item?.frequency_type_id == payrollData?.frequency_type_id
        )
        setSelectedWeekData(data)
    }, [location?.state?.stateData])
    const periodChange = (e) => {
        setPayrollError(null)
        let data =
            payPeriodList?.length > 0
                ? payPeriodList?.find((item) => item?.id == e.target.value)
                : null
        setPayPeriod(data)
    }
    const adjustPayroll = () => {
        const body = {
            pay_period_from: payPeriod?.pay_period_from,
            pay_period_to: payPeriod?.pay_period_to,
            id: payrollData?.id,
        }
        if (!body?.pay_period_from && !body?.pay_period_to)
            return setPayrollError('Select pay period')
        getPayrollByidAlertCenterService(body)
            .then(() => {})
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                navigate(-1)
            })
    }

    const periodList = useMemo(() => {
        return payPeriodList?.map((item) => ({
            ...item,
            period: `${getValidDate(item?.pay_period_from)} to ${getValidDate(
                item?.pay_period_to
            )}`,
        }))
    }, [payPeriodList])

    return (
        <div style={{position: 'relative'}}>
            {/* <CustomLoader full visible={loading} /> */}
            <div
                className='text-cmGrey800'
                style={{
                    fontFamily: fontsFamily.manrope,
                    fontSize: '14px',
                    fontWeight: '700',
                }}
            >
                {/* Top Bar */}
                <div
                    className='d-flex align-items-center gap-5 shadow-sm bg-cmwhite text-cmGrey900 p-5 mb-10'
                    style={{borderRadius: '10px'}}
                >
                    <div
                        className='bi bi-box-arrow-left fs-1 text-cmGrey600 text-hover-dark cursor-pointer'
                        onClick={() => navigate(-1)}
                    ></div>
                    <div className='' style={{fontFamily: 'Manrope'}}>
                        {alertData?.pid} - {alertData?.customer_name} | Assign Payroll
                    </div>
                </div>
                {/* Body */}
                <div className='container mb-20'>
                    <div className='row  mb-10 gap-10'>
                        <div
                            className='col-md   bg-cmwhite shadow-sm py-3 '
                            style={{borderRadius: 10}}
                        >
                            {/* card title */}
                            <div className='mb-5 px-6' style={{fontSize: 16}}>
                                Closer 1
                            </div>
                            {/* card body */}
                            <div className=''>
                                <div className='row gap-sm-5 py-3'>
                                    <div className='col-sm-4 col col text-sm-end text-cmGrey800'>
                                        Closer Name:
                                    </div>
                                    <div className='col-sm col text-cmGrey900 text-start  '>
                                        Bryce Marsh
                                    </div>
                                </div>

                                <div className='row gap-sm-5 py-3 bg-strip'>
                                    <div className='col-sm-4 col text-sm-end text-cmGrey800'>
                                        Closer Email:
                                    </div>
                                    <div className='col-sm text-cmGrey900 col text-start'>
                                        logafevre@gmail.com
                                    </div>
                                </div>

                                <div className='row gap-5 py-3'>
                                    <div className='col-sm-4 col gap-3 d-flex align-items-center justify-content-sm-end text-cmGrey800'>
                                        <div
                                            className='badge bg-cmSuccess rounded-pill px-5 bg-opacity-10 text-cmSuccess'
                                            style={{fontSize: 12, fontWeight: 600}}
                                        >
                                            Paid
                                        </div>
                                        <div>M1:</div>
                                    </div>
                                    <div className='col-sm row text-cmGrey900 align-items-center'>
                                        <div className='col-4'>
                                            {' '}
                                            {formattedNumberFields(1881.53)}{' '}
                                        </div>
                                        <div className='col d-flex align-items-center gap-3'>
                                            <span className='pi pi-calendar fs-1 text-cmGrey500' />
                                            <span>{getValidDate('09-19-22')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row gap-sm-5 py-3 bg-strip'>
                                    <div className='col-sm-4 col text-sm-end text-cmGrey800'>
                                        Pay Period:
                                    </div>
                                    <div className='col-sm text-cmGrey800 col text-start text-decoration-underline'>
                                        {getValidDate('09-19-22')}
                                        {'  '}-{'  '}
                                        {getValidDate('09-19-22')}
                                    </div>
                                </div>
                                <div className='row gap-5 py-3'>
                                    <div className='col-sm-4 col gap-3 d-flex align-items-center justify-content-sm-end text-cmGrey800'>
                                        <div className='text-cmError'>Assign Pay Period</div>
                                        <div>M2:</div>
                                    </div>
                                    <div className='col-sm text-cmGrey900 row align-items-center'>
                                        <div className='col-4'>
                                            {' '}
                                            {formattedNumberFields(1881.53)}{' '}
                                        </div>
                                        <div className='col d-flex align-items-center gap-3'>
                                            <span className='pi pi-calendar fs-1 text-cmGrey500' />
                                            <span>{getValidDate('09-19-22')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row gap-sm-5 py-3 bg-strip'>
                                    <div className='col-sm-4 col col text-sm-end text-cmGrey800'>
                                        Pay Period:
                                    </div>
                                    <div className='col-sm col text-cmGrey900 text-start  '>--</div>
                                </div>
                            </div>
                        </div>
                        {/* setter 1 */}
                        <div
                            className='col-md bg-cmwhite shadow-sm py-3 '
                            style={{borderRadius: 10}}
                        >
                            {/* card title */}
                            <div className='mb-5 px-6' style={{fontSize: 16}}>
                                Setter 1
                            </div>
                            {/* card body */}
                            <div className=''>
                                <div className='row gap-sm-5 py-3'>
                                    <div className='col-sm-4 col col text-sm-end text-cmGrey800'>
                                        Setter Name:
                                    </div>
                                    <div className='col-sm col text-cmGrey900 text-start  '>
                                        Bryce Marsh
                                    </div>
                                </div>

                                <div className='row gap-sm-5 py-3 bg-strip'>
                                    <div className='col-sm-4 col text-sm-end text-cmGrey800'>
                                        Setter Email:
                                    </div>
                                    <div className='col-sm text-cmGrey900 col text-start'>
                                        logafevre@gmail.com
                                    </div>
                                </div>

                                <div className='row gap-5 py-3'>
                                    <div className='col-sm-4 col gap-3 d-flex align-items-center justify-content-sm-end text-cmGrey800'>
                                        <div
                                            className='badge bg-cmSuccess rounded-pill px-5 bg-opacity-10 text-cmSuccess'
                                            style={{fontSize: 12, fontWeight: 600}}
                                        >
                                            Paid
                                        </div>
                                        <div>M1:</div>
                                    </div>
                                    <div className='col-sm row text-cmGrey900 align-items-center'>
                                        <div className='col-4'>
                                            {' '}
                                            {formattedNumberFields(1881.53)}{' '}
                                        </div>
                                        <div className='col d-flex align-items-center gap-3'>
                                            <span className='pi pi-calendar fs-1 text-cmGrey500' />
                                            <span>{getValidDate('09-19-22')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row gap-sm-5 py-3 bg-strip'>
                                    <div className='col-sm-4 col text-sm-end text-cmGrey800'>
                                        Pay Period:
                                    </div>
                                    <div className='col-sm text-cmGrey800 col text-start text-decoration-underline'>
                                        {getValidDate('09-19-22')}
                                        {'  '}-{'  '}
                                        {getValidDate('09-19-22')}
                                    </div>
                                </div>
                                <div className='row gap-5 py-3'>
                                    <div className='col-sm-4 col gap-3 d-flex align-items-center justify-content-sm-end text-cmGrey800'>
                                        <div className='text-cmError'>Assign Pay Period</div>
                                        <div>M2:</div>
                                    </div>
                                    <div className='col-sm text-cmGrey900 row align-items-center'>
                                        <div className='col-4'>
                                            {' '}
                                            {formattedNumberFields(1881.53)}{' '}
                                        </div>
                                        <div className='col d-flex align-items-center gap-3'>
                                            <span className='pi pi-calendar fs-1 text-cmGrey500' />
                                            <span>{getValidDate('09-19-22')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row gap-sm-5 py-3 bg-strip'>
                                    <div className='col-sm-4 col col text-sm-end text-cmGrey800'>
                                        Pay Period:
                                    </div>
                                    <div className='col-sm col text-cmGrey900 text-start  '>--</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row  gap-10'>
                        {/* closer 2 */}
                        <div
                            className='col-md bg-cmwhite shadow-sm py-3 '
                            style={{borderRadius: 10}}
                        >
                            {/* card title */}
                            <div className='mb-5 px-6' style={{fontSize: 16}}>
                                Closer 2
                            </div>
                            {/* card body */}
                            <div className=''>
                                <div className='row gap-sm-5 py-3'>
                                    <div className='col-sm-4 col col text-sm-end text-cmGrey800'>
                                        Closer Name:
                                    </div>
                                    <div className='col-sm col text-cmGrey900 text-start  '>
                                        Bryce Marsh
                                    </div>
                                </div>

                                <div className='row gap-sm-5 py-3 bg-strip'>
                                    <div className='col-sm-4 col text-sm-end text-cmGrey800'>
                                        Closer Email:
                                    </div>
                                    <div className='col-sm text-cmGrey900 col text-start'>
                                        logafevre@gmail.com
                                    </div>
                                </div>

                                <div className='row gap-5 py-3'>
                                    <div className='col-sm-4 col gap-3 d-flex align-items-center justify-content-sm-end text-cmGrey800'>
                                        <div
                                            className='badge bg-cmSuccess rounded-pill px-5 bg-opacity-10 text-cmSuccess'
                                            style={{fontSize: 12, fontWeight: 600}}
                                        >
                                            Paid
                                        </div>
                                        <div>M1:</div>
                                    </div>
                                    <div className='col-sm row text-cmGrey900 align-items-center'>
                                        <div className='col-4'>
                                            {' '}
                                            {formattedNumberFields(1881.53)}{' '}
                                        </div>
                                        <div className='col d-flex align-items-center gap-3'>
                                            <span className='pi pi-calendar fs-1 text-cmGrey500' />
                                            <span>{getValidDate('09-19-22')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row gap-sm-5 py-3 bg-strip'>
                                    <div className='col-sm-4 col text-sm-end text-cmGrey800'>
                                        Pay Period:
                                    </div>
                                    <div className='col-sm text-cmGrey800 col text-start text-decoration-underline'>
                                        {getValidDate('09-19-22')}
                                        {'  '}-{'  '}
                                        {getValidDate('09-19-22')}
                                    </div>
                                </div>
                                <div className='row gap-5 py-3'>
                                    <div className='col-sm-4 col gap-3 d-flex align-items-center justify-content-sm-end text-cmGrey800'>
                                        <div className='text-cmError'>Assign Pay Period</div>
                                        <div>M2:</div>
                                    </div>
                                    <div className='col-sm text-cmGrey900 row align-items-center'>
                                        <div className='col-4'>
                                            {' '}
                                            {formattedNumberFields(1881.53)}{' '}
                                        </div>
                                        <div className='col d-flex align-items-center gap-3'>
                                            <span className='pi pi-calendar fs-1 text-cmGrey500' />
                                            <span>{getValidDate('09-19-22')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row gap-sm-5 py-3 bg-strip'>
                                    <div className='col-sm-4 col col text-sm-end text-cmGrey800'>
                                        Pay Period:
                                    </div>
                                    <div className='col-sm col text-cmGrey900 text-start  '>--</div>
                                </div>
                            </div>
                        </div>
                        {/* setter 2 */}
                        <div
                            className='col-md bg-cmwhite shadow-sm py-3 '
                            style={{borderRadius: 10}}
                        >
                            {/* card title */}
                            <div className='mb-5 px-6' style={{fontSize: 16}}>
                                Setter 2
                            </div>
                            {/* card body */}
                            <div className=''>
                                <div className='row gap-sm-5 py-3'>
                                    <div className='col-sm-4 col col text-sm-end text-cmGrey800'>
                                        Setter Name:
                                    </div>
                                    <div className='col-sm col text-cmGrey900 text-start  '>
                                        Bryce Marsh
                                    </div>
                                </div>

                                <div className='row gap-sm-5 py-3 bg-strip'>
                                    <div className='col-sm-4 col text-sm-end text-cmGrey800'>
                                        Setter Email:
                                    </div>
                                    <div className='col-sm text-cmGrey900 col text-start'>
                                        logafevre@gmail.com
                                    </div>
                                </div>

                                <div className='row gap-5 py-3'>
                                    <div className='col-sm-4 col gap-3 d-flex align-items-center justify-content-sm-end text-cmGrey800'>
                                        <div
                                            className='badge bg-cmSuccess rounded-pill px-5 bg-opacity-10 text-cmSuccess'
                                            style={{fontSize: 12, fontWeight: 600}}
                                        >
                                            Paid
                                        </div>
                                        <div>M1:</div>
                                    </div>
                                    <div className='col-sm row text-cmGrey900 align-items-center'>
                                        <div className='col-4'>
                                            {' '}
                                            {formattedNumberFields(1881.53)}{' '}
                                        </div>
                                        <div className='col d-flex align-items-center gap-3'>
                                            <span className='pi pi-calendar fs-1 text-cmGrey500' />
                                            <span>{getValidDate('09-19-22')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row gap-sm-5 py-3 bg-strip'>
                                    <div className='col-sm-4 col text-sm-end text-cmGrey800'>
                                        Pay Period:
                                    </div>
                                    <div className='col-sm text-cmGrey800 col text-start text-decoration-underline'>
                                        {getValidDate('09-19-22')}
                                        {'  '}-{'  '}
                                        {getValidDate('09-19-22')}
                                    </div>
                                </div>
                                <div className='row gap-5 py-3'>
                                    <div className='col-sm-4 col gap-3 d-flex align-items-center justify-content-sm-end text-cmGrey800'>
                                        <div className='text-cmError'>Assign Pay Period</div>
                                        <div>M2:</div>
                                    </div>
                                    <div className='col-sm text-cmGrey900 row align-items-center'>
                                        <div className='col-4'>
                                            {' '}
                                            {formattedNumberFields(1881.53)}{' '}
                                        </div>
                                        <div className='col d-flex align-items-center gap-3'>
                                            <span className='pi pi-calendar fs-1 text-cmGrey500' />
                                            <span>{getValidDate('09-19-22')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row gap-sm-5 py-3 bg-strip'>
                                    <div className='col-sm-4 col col text-sm-end text-cmGrey800'>
                                        Pay Period:
                                    </div>
                                    <div className='col-sm col text-cmGrey900 text-start  '>--</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Button */}
                <div className=' text-center'>
                    <CustomButton buttonLabel='Assign Payroll' padding={'px-12'} />
                </div>
            </div>
        </div>
    )
}

export default PayrollAlert
