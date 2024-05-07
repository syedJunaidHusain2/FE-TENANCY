import React, {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {getValidDate} from '../../../../../constants/constants'
import {getAdderByPidAlertCenterService} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {formattedNumberFields} from '../../../../../helpers/CommonHelpers'

const AlertAdders = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [addersData, setAddersData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // setLoading(true);
        getAdderByPidAlertCenterService(location?.state?.pid)
            .then((res) => {
                setAddersData(res.data)
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
                        {addersData?.pid} - {addersData?.customer_name}
                    </div>
                </div>
                {/* Begins body */}
                <div className='mb-sm-20 mb-10'>
                    {/* Line 1 */}
                    <div className='d-flex flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-5 '>
                        <div className='w-sm-50 w-100 d-sm-flex align-items-center justify-content-between px-sm-20'>
                            <div className='w-sm-50'>Customer Name:</div>
                            <div className='text-cmGrey900  w-sm-50' style={{fontWeight: '700'}}>
                                {addersData?.customer_name}
                            </div>
                        </div>
                        <div className='w-sm-50 w-100 d-sm-flex  align-items-center justify-content-between px-sm-20'>
                            <div className='w-sm-50'>PID:</div>
                            <div className='text-cmGrey900  w-sm-50' style={{fontWeight: '700'}}>
                                {addersData?.pid}
                            </div>
                        </div>
                    </div>
                    {/* Line 2 */}
                    <div className='d-flex flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-5 bg-strip'>
                        <div className='w-sm-50 w-100 d-sm-flex align-items-center justify-content-between px-sm-20'>
                            <div className='w-sm-50'>Adders:</div>
                            <div className='text-cmGrey900  w-sm-50' style={{fontWeight: '700'}}>
                                $ 480.24
                            </div>
                        </div>
                        <div className='w-sm-50 w-100 d-sm-flex  align-items-center justify-content-between px-sm-20'>
                            <div className='w-sm-50'>Adders Date:</div>
                            <div className='text-cmGrey900  w-sm-50' style={{fontWeight: '700'}}>
                                09/19/22
                            </div>
                        </div>
                    </div>
                    {/* Line 3 */}
                    <div className='py-3 px-sm-20 px-10'>
                        <div className=' d-flex flex-wrap align-items-center gap-sm-16 gap-1 px-sm-20'>
                            <div className=''>Adders Description:</div>
                            <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                {addersData?.adders_description}
                            </div>
                        </div>
                    </div>
                    {/* Line 4 */}
                    <div className='py-3 px-sm-20 px-10 bg-strip'>
                        <div className=' d-flex flex-wrap align-items-center gap-1 px-sm-20 w-sm-50'>
                            <div className='w-sm-50'>Total M1:</div>
                            <div className='d-flex flex-wrap align-items-center justify-content-between gap-10'>
                                <div className='text-cmGrey900'>
                                    {formattedNumberFields(addersData?.m1_amount, '$')}
                                </div>
                                <div className='d-flex align-items-center gap-2'>
                                    <div className='bi bi-calendar fs-3 text-cmGrey500'></div>
                                    <div className='text-cmGrey900'>
                                        {getValidDate(addersData?.m1_date)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Line 5 */}
                    <div className='py-3 px-sm-20 px-10 '>
                        <div className=' d-flex flex-wrap align-items-center gap-1 px-sm-20 w-sm-50'>
                            <div className='w-sm-50'>Total M2:</div>
                            <div className='d-flex flex-wrap align-items-center justify-content-between gap-10'>
                                <div className='text-cmGrey900'>{addersData?.m2_amount}</div>
                                <div className='d-flex align-items-center gap-2'>
                                    <div className='bi bi-calendar fs-3 text-cmGrey500'></div>
                                    <div className='text-cmGrey900'>{addersData?.m2_date}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Line 6 */}
                    <div className='py-3 px-sm-20 px-10 bg-strip'>
                        <div className=' d-flex flex-wrap align-items-center gap-1 px-sm-20 w-sm-50'>
                            <div className='w-sm-50'>Net EPC:</div>
                            <div className='d-flex flex-wrap align-items-center justify-content-between gap-10'>
                                <div>
                                    <span className='text-cmGrey700 text-decoration-line-through me-5'>
                                        {addersData?.old_net_epc}
                                    </span>
                                    <span className='text-cmGrey900'>{addersData?.net_epc}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-cmwhite' style={{height: '50px'}}></div>
                    {/* Line 7 */}
                    <div className='d-flex flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-5 '>
                        <div className='w-sm-50 w-100 d-sm-flex align-items-center justify-content-between px-sm-20'>
                            <div className='w-sm-50'>Closer1:</div>
                            <div className='text-cmGrey900  w-sm-50' style={{fontWeight: '700'}}>
                                {addersData?.closer1_detail?.first_name ?? '-'}{' '}
                                {addersData?.closer1_detail?.last_name ?? '-'}
                                <div>
                                    <a
                                        href={`mailto:${addersData?.closer1_detail?.email}`}
                                        className={
                                            addersData?.closer1_detail != null
                                                ? 'text-decoration-underline'
                                                : ''
                                        }
                                    >
                                        {addersData?.closer1_detail?.email ?? '-'}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='w-sm-50 w-100 d-sm-flex  align-items-center justify-content-between px-sm-20'>
                            <div className='w-sm-50'>Setter1:</div>
                            <div className='text-cmGrey900  w-sm-50' style={{fontWeight: '700'}}>
                                {addersData?.setter1_detail?.first_name ?? '-'}{' '}
                                {addersData?.setter1_detail?.last_name ?? '-'}
                                <div>
                                    <a
                                        href={`mailto:${addersData?.setter1_detail?.email}`}
                                        className={
                                            addersData?.setter1_detail != null
                                                ? 'text-decoration-underline'
                                                : ''
                                        }
                                    >
                                        {addersData?.setter1_detail?.email ?? '-'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-strip px-sm-20 px-10'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between px-sm-20 py-3 gap-sm-0 gap-5  '>
                            <div className='d-flex align-items-center gap-2'>
                                <div>M1:</div>
                                <div
                                    className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5'
                                    style={{fontSize: '12px', fontWeight: '600'}}
                                >
                                    {addersData?.closer1_m1_paid_status}
                                </div>
                            </div>
                            <div className='text-cmGrey900'>
                                {formattedNumberFields(addersData?.closer1_m1, '$')}{' '}
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div className='bi bi-calendar fs-3 text-cmGrey500'></div>
                                <div className='text-cmGrey900'>-</div>
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div>M1:</div>
                                <div
                                    className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5'
                                    style={{fontSize: '12px', fontWeight: '600'}}
                                >
                                    {addersData?.setter1_m1_paid_status}
                                </div>
                            </div>
                            <div className='text-cmGrey900'>
                                {formattedNumberFields(addersData?.setter1_m1, '$')}
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div className='bi bi-calendar fs-3 text-cmGrey500'></div>
                                <div className='text-cmGrey900'>-</div>
                            </div>
                        </div>
                    </div>
                    <div className=' px-sm-20 px-10'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between px-sm-20 py-3 gap-sm-0 gap-5  '>
                            <div className='d-flex align-items-center gap-2'>
                                <div>M2:</div>
                                <div
                                    className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5'
                                    style={{fontSize: '12px', fontWeight: '600'}}
                                >
                                    {addersData?.closer1_m2_paid_status}
                                </div>
                            </div>
                            <div className='text-cmGrey900'>
                                {formattedNumberFields(addersData?.closer1_m2, '$')}
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div className='bi bi-calendar fs-3 text-cmGrey500'></div>
                                <div className='text-cmGrey900'>
                                    {getValidDate(addersData?.m1_date)}
                                </div>
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div>M2:</div>
                                <div
                                    className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5'
                                    style={{fontSize: '12px', fontWeight: '600'}}
                                >
                                    {addersData?.setter1_m2_paid_status}
                                </div>
                            </div>
                            <div className='text-cmGrey900'>
                                {formattedNumberFields(addersData?.setter1_m2, '$')}
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div className='bi bi-calendar fs-3 text-cmGrey500'></div>
                                <div className='text-cmGrey900'>
                                    {getValidDate(addersData?.m1_date)}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Line 8 */}
                    <div className='d-flex flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-5 bg-strip'>
                        <div className='w-sm-50 w-100 d-sm-flex align-items-center justify-content-between px-sm-20'>
                            <div className='w-sm-50'>Closer2:</div>
                            <div className='text-cmGrey900  w-sm-50' style={{fontWeight: '700'}}>
                                {addersData?.closer2_detail?.first_name ?? '-'}{' '}
                                {addersData?.closer2_detail?.last_name ?? '-'}
                                <div>
                                    <a
                                        href={`mailto:${addersData?.closer2_detail?.email}`}
                                        className={
                                            addersData?.closer2_detail != null
                                                ? 'text-decoration-underline'
                                                : ''
                                        }
                                    >
                                        {addersData?.closer2_detail?.email ?? '-'}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='w-sm-50 w-100 d-sm-flex  align-items-center justify-content-between px-sm-20'>
                            <div className='w-sm-50'>Setter2:</div>
                            <div className='text-cmGrey900  w-sm-50' style={{fontWeight: '700'}}>
                                {addersData?.setter2_detail?.first_name ?? '-'}{' '}
                                {addersData?.setter2_detail?.last_name ?? '-'}
                                <div>
                                    <a
                                        href={`mailto:${addersData?.setter2_detail?.email}`}
                                        className={
                                            addersData?.setter2_detail != null
                                                ? 'text-decoration-underline'
                                                : ''
                                        }
                                    >
                                        {addersData?.setter2_detail?.email ?? '-'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Line 9 */}
                    <div className=' px-sm-20 px-10'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between px-sm-20 py-3 gap-sm-0 gap-5  '>
                            <div className='d-flex align-items-center gap-2'>
                                <div>M1:</div>
                                <div
                                    className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5'
                                    style={{fontSize: '12px', fontWeight: '600'}}
                                >
                                    {addersData?.closer2_m1_paid_status}
                                </div>
                            </div>
                            <div className='text-cmGrey900'>
                                {formattedNumberFields(addersData?.closer2_m1, '$')}
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div className='bi bi-calendar fs-3 text-cmGrey500'></div>
                                <div className='text-cmGrey900'>
                                    {getValidDate(addersData?.m1_date)}
                                </div>
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div>M1:</div>
                                <div
                                    className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5'
                                    style={{fontSize: '12px', fontWeight: '600'}}
                                >
                                    {addersData?.setter2_m1_paid_status}
                                </div>
                            </div>
                            <div className='text-cmGrey900'>
                                {formattedNumberFields(addersData?.setter2_m1, '$')}
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div className='bi bi-calendar fs-3 text-cmGrey500'></div>
                                <div className='text-cmGrey900'>
                                    {getValidDate(addersData?.m1_date)}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Line 10 */}
                    <div className='bg-strip px-sm-20 px-10'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between px-sm-20 py-3 gap-sm-0 gap-5  '>
                            <div className='d-flex align-items-center gap-2'>
                                <div>M2:</div>
                                <div
                                    className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5'
                                    style={{fontSize: '12px', fontWeight: '600'}}
                                >
                                    {addersData?.closer2_m2_paid_status}
                                </div>
                            </div>
                            <div className='text-cmGrey900'>
                                {formattedNumberFields(addersData?.closer2_m2, '$')}{' '}
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div className='bi bi-calendar fs-3 text-cmGrey500'></div>
                                <div className='text-cmGrey900'>-</div>
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div>M2:</div>
                                <div
                                    className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess rounded-pill px-5'
                                    style={{fontSize: '12px', fontWeight: '600'}}
                                >
                                    {addersData?.setter2_m2_paid_status}
                                </div>
                            </div>
                            <div className='text-cmGrey900'>
                                {formattedNumberFields(addersData?.setter2_m2, '$')}
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div className='bi bi-calendar fs-3 text-cmGrey500'></div>
                                <div className='text-cmGrey900'>-</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* body ends */}
                <div className=' text-center'>
                    <div
                        className='btn bg-cmBlue-Crayola text-cmwhite py-3 px-15'
                        style={{fontSize: '16px', fontWeight: 700}}
                        onClick={() => navigate(-1)}
                    >
                        Confirm Adjustment
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlertAdders
