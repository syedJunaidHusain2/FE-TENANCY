import React, {useCallback, useEffect, useState} from 'react'
import {
    getAlertSelector,
    getHiringAlertSelector,
} from '../../../../../redux/selectors/DashboardSelectors'
import {useDispatch} from 'react-redux'
import {getAlertDataAction} from '../../../../../redux/actions/DashboardActions'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {useSelector} from 'react-redux'
import {getUserDataSelector} from '../../../../../redux/selectors/AuthSelectors'
import {getValidDate} from '../../../../../constants/constants'

const AlertSectionCardStandard = () => {
    const alertData = useSelector(getAlertSelector)
    const hiringAlertData = useSelector(getHiringAlertSelector)

    const [loading, setLoading] = useState(false)
    const [fullLoading, setFullLoading] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        getAlertData()
    }, [])

    const getAlertData = useCallback(() => {
        if (alertData) setLoading(true)
        else setFullLoading(true)
        dispatch(getAlertDataAction()).finally(() => {
            if (alertData) setLoading(false)
            else setFullLoading(false)
        })
    }, [dispatch])
    return (
        <div
            className='mb-15 bg-cmwhite rounded p-5 shadow-sm text-cmGrey900'
            style={{fontSize: 14, fontWeight: 600, fontFamily: 'Manrope'}}
        >
            <CustomLoader visible={fullLoading} full />

            {/* Heading */}
            <div
                className='mb-5 d-flex'
                style={{fontSize: 16, fontWeight: 700, position: 'relative'}}
            >
                Alert Section(
                {alertData?.addres_data?.length +
                    alertData?.missing_data?.length +
                    alertData?.clawback_data?.length +
                    alertData?.payroll_alert?.length ?? 0}
                )
                <CustomLoader visible={loading} size={50} />
            </div>
            {/* line 1 */}
            {alertData?.addres_data?.length > 0 ||
            alertData?.missing_data?.length > 0 ||
            alertData?.clawback_data?.length > 0 ||
            alertData?.payroll_alert?.length > 0 ? (
                <>
                    {alertData?.addres_data?.length > 0 &&
                        alertData?.addres_data?.map((item, i) => (
                            <div key={i}>
                                <div className='d-flex align-items-center gap-5 mb-2'>
                                    <div className='bi bi-lightning fs-1 text-cmError bg-cmError bg-opacity-10 rounded px-2 h-auto' />
                                    {/* Title */}
                                    <div>
                                        <div style={{fontSize: 14, fontWeight: 800}}>
                                            LIS13014 - Scott Huber | Data Missing
                                        </div>
                                        <div className='text-cmGrey600' style={{fontWeight: 600}}>
                                            {' '}
                                            Update KW sold
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    {alertData?.clawback_data?.length > 0 &&
                        alertData?.clawback_data?.map((item, i) => (
                            <div className='d-flex align-items-center gap-5 mb-2' key={i}>
                                <div className='bi bi-people fs-1 text-cmError bg-cmError bg-opacity-10 rounded px-2 h-auto' />
                                {/* Title */}
                                <div>
                                    <div style={{fontSize: 14, fontWeight: 800}}>
                                        LIS13014 - Scott Huber | Data Missing
                                    </div>
                                    <div className='text-cmGrey600' style={{fontWeight: 600}}>
                                        {' '}
                                        Update KW sold
                                    </div>
                                </div>
                            </div>
                        ))}
                    {alertData?.missing_data?.length > 0 &&
                        alertData?.missing_data?.map((item, i) => (
                            <div className='d-flex align-items-center gap-5 mb-2' key={i}>
                                <div className='bi bi-lightning fs-1 text-cmError bg-cmError bg-opacity-10 rounded px-2 h-auto' />
                                {/* Title */}
                                <div>
                                    <div style={{fontSize: 14, fontWeight: 800}}>
                                        {item?.heading}
                                    </div>
                                    <div className='text-cmGrey600' style={{fontWeight: 600}}>
                                        {' '}
                                        {item?.alert_summary}
                                    </div>
                                </div>
                            </div>
                        ))}
                    {alertData?.payroll_alert?.length > 0 &&
                        alertData?.payroll_alert?.map((item, i) => (
                            <div className='d-flex align-items-center gap-5 mb-2' key={i}>
                                <div className='bi bi-lightning fs-1 text-cmError bg-cmError bg-opacity-10 rounded px-2 h-auto' />
                                {/* Title */}
                                <div>
                                    <div style={{fontSize: 14, fontWeight: 800}}>
                                        LIS13014 - Scott Huber | Data Missing
                                    </div>
                                    <div className='text-cmGrey600' style={{fontWeight: 600}}>
                                        {' '}
                                        Update KW sold
                                    </div>
                                </div>
                            </div>
                        ))}
                </>
            ) : (
                <div className='text-cmError text-center'>No Alerts</div>
            )}
        </div>
    )
}

export default AlertSectionCardStandard
