import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {getValidDate} from '../../../../../constants/constants'
import {getClawbackByPidAlertCenterService} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {
    formattedNumberFields,
    getErrorMessageFromResponse,
} from '../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import {fontsFamily} from '../../../../../assets/fonts/fonts'

const AlertsClawback = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [clawbackData, setClawbackData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getClawbackByPidAlertCenterService(location?.state?.pid)
            .then((res) => {
                setClawbackData(res.data)
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
            })
    }, [location?.state?.pid])
    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />
            <div
                className='bg-cmwhite shadow-sm text-cmGrey800 pb-20'
                style={{
                    fontFamily: 'Manrope',
                    fontSize: '14px',
                    fontWeight: '700',
                    borderRadius: '10px',
                }}
            >
                <div className='d-flex align-items-center gap-5 text-cmGrey900 p-5'>
                    <div
                        className='bi bi-box-arrow-left fs-1 text-cmGrey600 text-hover-dark cursor-pointer'
                        onClick={() => navigate(-1)}
                    ></div>
                    <div className='' style={{fontFamily: 'Manrope'}}>
                        {clawbackData?.pid} - {clawbackData?.customer_name} | Clawback
                    </div>
                </div>
                {/* begins body */}
                <div className='mb-sm-20 mb-10'>
                    {/* Line 1 */}
                    <div className='py-5'>
                        <div className='row  mx-auto'>
                            <div className='col-sm row'>
                                <div className='text-nowrap col text-sm-end'>Customer Name:</div>
                                <div
                                    className='text-cmGrey900 col text-nowrap '
                                    style={{fontWeight: '700'}}
                                >
                                    {clawbackData?.customer_name}
                                </div>
                            </div>

                            <div className='col-sm row'>
                                <div className='col text-sm-end'>PID:</div>
                                <div className='text-cmGrey900 col' style={{fontWeight: '700'}}>
                                    {clawbackData?.pid}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Line 2 */}
                    <div className='bg-strip py-5'>
                        <div className='row  mx-auto'>
                            <div className='col-sm row'>
                                <div className='text-nowrap col text-sm-end '>Clawback Amount:</div>
                                <div
                                    className='text-cmGrey900 text-nowrap col'
                                    style={{fontWeight: '700'}}
                                >
                                    {formattedNumberFields(clawbackData?.clawback_amount, '$')}
                                </div>
                            </div>
                            <div className='col-sm row'>
                                <div className='text-nowrap col text-sm-end '>Clawback Date:</div>
                                <div
                                    className='text-cmGrey900 text-nowrap col '
                                    style={{fontWeight: '700'}}
                                >
                                    {getValidDate(clawbackData?.clawback_date)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='bg-cmwhite' style={{height: '40px'}}></div>
                    {/* Line 3 */}
                    <div className='bg-strip py-5'>
                        <div className='row  mx-auto'>
                            <div className='col-sm row'>
                                <div className='text-nowrap col text-sm-end'>Closer1:</div>
                                <div
                                    className='text-cmGrey900 text-nowrap col'
                                    style={{fontWeight: '700'}}
                                >
                                    {clawbackData?.closer1_detail?.first_name ?? '-'}{' '}
                                    {clawbackData?.closer1_detail?.last_name ?? '-'}
                                    <div className=''>
                                        <a
                                            href={`mailto:${clawbackData?.closer1_detail?.email}`}
                                            className={
                                                clawbackData?.closer1_detail != null
                                                    ? 'text-decoration-underline'
                                                    : ''
                                            }
                                        >
                                            {clawbackData?.closer1_detail?.email ?? '-'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm row'>
                                <div className='text-nowrap col text-sm-end'>Setter1:</div>
                                <div
                                    className='text-cmGrey900 text-nowrap col'
                                    style={{fontWeight: '700'}}
                                >
                                    {clawbackData?.setter1_detail?.first_name ?? '-'}{' '}
                                    {clawbackData?.setter1_detail?.last_name ?? '-'}
                                    <div>
                                        <a
                                            href={`mailto:${clawbackData?.setter1_detail?.email}`}
                                            className={
                                                clawbackData?.setter1_detail != null
                                                    ? 'text-decoration-underline'
                                                    : ''
                                            }
                                        >
                                            {clawbackData?.setter1_detail?.email ?? '-'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Line 4 */}
                    <div className='py-5 '>
                        <div className='row align-items-center w-100 mx-auto'>
                            <div className='col-xl row align-items-center'>
                                <div className='row col align-items-center text-sm-end'>
                                    <div className='col '>
                                        <div
                                            className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5'
                                            style={{fontSize: '12px', fontWeight: '600'}}
                                        >
                                            {clawbackData?.closer1_m1_paid_status ?? '-'}
                                        </div>
                                    </div>

                                    <div className='col-sm-2 col'>M1:</div>
                                </div>

                                <div className='row col align-items-center'>
                                    <div className='text-cmGrey900 col-sm-4 col'>
                                        {formattedNumberFields(clawbackData?.closer1_m1, '$')}
                                    </div>
                                    <div className='col-sm-5 col d-flex flex-center gap-3 '>
                                        <div className='bi bi-calendar fs-3 text-cmGrey500 '></div>
                                        <div className='text-cmGrey900'>
                                            {getValidDate(clawbackData?.closer1_m1_paid_date) ??
                                                '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-xl align-items-center row '>
                                <div className='row align-items-center col text-sm-end'>
                                    <div className='col'>
                                        <div
                                            className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5  '
                                            style={{fontSize: '12px', fontWeight: '600'}}
                                        >
                                            {clawbackData?.setter1_m1_paid_status ?? '-'}
                                        </div>
                                    </div>

                                    <div className='col-sm-2 col'>M1:</div>
                                </div>

                                <div className='row col align-items-center'>
                                    <div className='text-cmGrey900 col-sm-4 col'>
                                        {formattedNumberFields(clawbackData?.setter1_m1, '$')}
                                    </div>
                                    <div className='col-sm-5 col d-flex flex-center gap-3 '>
                                        <div className='bi bi-calendar fs-3 text-cmGrey500 '></div>
                                        <div className='text-cmGrey900'>
                                            {getValidDate(clawbackData?.setter1_m1_paid_date) ??
                                                '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Line 5 */}
                    <div className='py-5 bg-strip'>
                        <div className='row align-items-center w-100 mx-auto'>
                            <div className='col-sm row align-items-center'>
                                <div className='row col align-items-center text-sm-end'>
                                    <div className='col '>
                                        <div
                                            className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5'
                                            style={{fontSize: '12px', fontWeight: '600'}}
                                        >
                                            {clawbackData?.closer1_m2_paid_status ?? '-'}
                                        </div>
                                    </div>

                                    <div className='col-sm-2 col'>M2:</div>
                                </div>

                                <div className='row col align-items-center'>
                                    <div className='text-cmGrey900 col-sm-4 col'>
                                        {formattedNumberFields(clawbackData?.closer1_m2, '$')}
                                    </div>
                                    <div className='col-sm-5 col d-flex flex-center gap-3 '>
                                        <div className='bi bi-calendar fs-3 text-cmGrey500 '></div>
                                        <div className='text-cmGrey900'>
                                            {getValidDate(clawbackData?.closer1_m2_paid_date) ??
                                                '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-sm align-items-center row '>
                                <div className='row align-items-center col text-sm-end'>
                                    <div className='col'>
                                        <div
                                            className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5  '
                                            style={{fontSize: '12px', fontWeight: '600'}}
                                        >
                                            {clawbackData?.setter1_m2_paid_status ?? '-'}
                                        </div>
                                    </div>

                                    <div className='col-sm-2 col'>M2:</div>
                                </div>

                                <div className='row col align-items-center'>
                                    <div className='text-cmGrey900 col-sm-4 col'>
                                        {formattedNumberFields(clawbackData?.setter1_m2, '$')}
                                    </div>
                                    <div className='col-sm-5 col d-flex flex-center gap-3 '>
                                        <div className='bi bi-calendar fs-3 text-cmGrey500 '></div>
                                        <div className='text-cmGrey900'>
                                            {getValidDate(clawbackData?.setter1_m2_paid_date) ??
                                                '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Line 6 */}
                    <div className='py-5'>
                        <div className='row mx-auto'>
                            <div className='row col-sm'>
                                <div className='col text-nowrap text-sm-end'>Closer2:</div>
                                <div className='text-cmGrey900 col' style={{fontWeight: '700'}}>
                                    {clawbackData?.closer2_detail?.first_name ?? '-'}{' '}
                                    {clawbackData?.closer2_detail?.last_name ?? '-'}
                                    <div>
                                        <a
                                            href={`mailto:${clawbackData?.closer2_detail?.email}`}
                                            className={
                                                clawbackData?.closer2_detail != null
                                                    ? 'text-decoration-underline'
                                                    : ''
                                            }
                                        >
                                            {clawbackData?.closer2_detail?.email ?? '-'}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className='row col-sm'>
                                <div className='col text-sm-end'>Setter2:</div>
                                <div className='text-cmGrey900 col' style={{fontWeight: '700'}}>
                                    {clawbackData?.setter2_detail?.first_name ?? '-'}{' '}
                                    {clawbackData?.setter2_detail?.last_name ?? '-'}
                                    <div>
                                        <a
                                            href={`mailto:${clawbackData?.setter2_detail?.email}`}
                                            className={
                                                clawbackData?.setter2_detail != null
                                                    ? 'text-decoration-underline'
                                                    : ''
                                            }
                                        >
                                            {clawbackData?.setter2_detail?.email ?? '-'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Line 7 */}

                    <div className='py-5 bg-strip'>
                        <div className='row align-items-center w-100 mx-auto'>
                            <div className='col-sm row align-items-center'>
                                <div className='row col align-items-center text-sm-end'>
                                    <div className='col '>
                                        <div
                                            className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5'
                                            style={{fontSize: '12px', fontWeight: '600'}}
                                        >
                                            {clawbackData?.closer2_m1_paid_status ?? '-'}
                                        </div>
                                    </div>

                                    <div className='col-sm-2 col'>M1:</div>
                                </div>

                                <div className='row col align-items-center'>
                                    <div className='text-cmGrey900 col-sm-4 col'>
                                        {formattedNumberFields(clawbackData?.closer2_m1, '$')}
                                    </div>
                                    <div className='col-sm-5 col d-flex flex-center gap-3 '>
                                        <div className='bi bi-calendar fs-3 text-cmGrey500 '></div>
                                        <div className='text-cmGrey900'>
                                            {getValidDate(clawbackData?.closer2_m1_paid_date) ??
                                                '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-sm align-items-center row '>
                                <div className='row align-items-center col text-sm-end'>
                                    <div className='col'>
                                        <div
                                            className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5  '
                                            style={{fontSize: '12px', fontWeight: '600'}}
                                        >
                                            {clawbackData?.setter2_m1_paid_status ?? '-'}
                                        </div>
                                    </div>

                                    <div className='col-sm-2 col'>M1:</div>
                                </div>

                                <div className='row col align-items-center'>
                                    <div className='text-cmGrey900 col-sm-4 col'>
                                        {formattedNumberFields(clawbackData?.setter2_m1, '$')}
                                    </div>
                                    <div className='col-sm-5 col d-flex flex-center gap-3 '>
                                        <div className='bi bi-calendar fs-3 text-cmGrey500 '></div>
                                        <div className='text-cmGrey900'>
                                            {getValidDate(clawbackData?.setter2_m1_paid_date) ??
                                                '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Line 8 */}

                    <div className='py-5'>
                        <div className='row align-items-center w-100 mx-auto'>
                            <div className='col-sm row align-items-center'>
                                <div className='row col align-items-center text-sm-end'>
                                    <div className='col '>
                                        <div
                                            className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5'
                                            style={{fontSize: '12px', fontWeight: '600'}}
                                        >
                                            {clawbackData?.closer2_m2_paid_status ?? '-'}
                                        </div>
                                    </div>

                                    <div className='col-sm-2 col'>M2:</div>
                                </div>

                                <div className='row col align-items-center'>
                                    <div className='text-cmGrey900 col-sm-4 col'>
                                        {formattedNumberFields(clawbackData?.closer2_m2, '$')}
                                    </div>
                                    <div className='col-sm-5 col d-flex flex-center gap-3 '>
                                        <div className='bi bi-calendar fs-3 text-cmGrey500 '></div>
                                        <div className='text-cmGrey900'>
                                            {getValidDate(clawbackData?.closer2_m2_paid_date) ??
                                                '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-sm align-items-center row '>
                                <div className='row align-items-center col text-sm-end'>
                                    <div className='col'>
                                        <div
                                            className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5  '
                                            style={{fontSize: '12px', fontWeight: '600'}}
                                        >
                                            {clawbackData?.setter2_m2_paid_status ?? '-'}
                                        </div>
                                    </div>

                                    <div className='col-sm-2 col'>M2:</div>
                                </div>

                                <div className='row col align-items-center'>
                                    <div className='text-cmGrey900 col-sm-4 col'>
                                        {formattedNumberFields(clawbackData?.setter2_m2, '$')}
                                    </div>
                                    <div className='col-sm-5 col d-flex flex-center gap-3 '>
                                        <div className='bi bi-calendar fs-3 text-cmGrey500 '></div>
                                        <div className='text-cmGrey900'>
                                            {getValidDate(clawbackData?.setter2_m2_paid_date) ??
                                                '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* body ends */}
                <div className=' text-center'>
                    <div
                        className='btn px-15 py-3 bg-cmBlue-Crayola text-cmwhite text-nowrap'
                        style={{fontSize: '14px', fontWeight: 700}}
                        onClick={() => navigate(-1)}
                    >
                        Confirm Adjustment
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlertsClawback
