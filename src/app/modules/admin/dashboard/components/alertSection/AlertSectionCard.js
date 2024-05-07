import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {getAlertDataAction} from '../../../../../../redux/actions/DashboardActions'
import {useSelector} from 'react-redux'
import {getAlertSelector} from '../../../../../../redux/selectors/DashboardSelectors'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomEllipsis from '../../../../../../customComponents/customEllipsis/CustomEllipsis'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import {useNavigate} from 'react-router'
import {KTSVG} from '../../../../../../_metronic/helpers'
import CustomLink, {LINK_SIZE} from '../../../../../../customComponents/customButtton/CustomLink'

const AlertSectionCard = () => {
    const alertData = useSelector(getAlertSelector)
    const navigate = useNavigate()

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
    }, [alertData, dispatch])

    const alertNavigation = useCallback(
        (item) => {
            let key
            // setViewRepRepRedline(true)
            // return
            switch (item?.type) {
                case 'location Redline':
                    key = 'locationRedline'
                    // path = '/alert-center/clawback'
                    break
                case 'Missing Rep':
                    key = 'missingRep'
                    break
                case 'Closed Payroll':
                    key = 'closedPayroll'
                    break
                case 'Sales':
                    key = 'sales'
                    break

                default:
                    key = ''
            }
            navigate('/alert-center/alerts', {
                state: {alertType: key, search: item?.pid},
            })
        },
        [navigate]
    )

    return (
        <div
            className='mb-10 h-550px bg-cmwhite p-5 pt-5 shadow-sm text-cmGrey900'
            style={{
                fontSize: 14,
                fontWeight: 600,
                fontFamily: fontsFamily.manrope,
                overflowY: 'auto',
                overflowX: 'hidden',
                borderRadius: 12,
            }}
        >
            <CustomLoader visible={fullLoading} full />

            {/* Heading */}
            <div
                className='mb-5 d-flex align-items-center justify-content-between'
                style={{fontSize: 16, fontWeight: 700, position: 'relative'}}
            >
                Alert Section ({alertData?.missing_data?.length ?? 0}
                )
                <CustomLoader visible={loading} size={50} />
                {alertData?.missing_data?.length > 0 ? (
                    <CustomLink
                        linkSize={LINK_SIZE.large}
                        label={'View all'}
                        onClick={() => navigate('/alert-center/alerts')}
                    />
                ) : null}
            </div>
            {/* line 1 */}
            {alertData?.addres_data?.length > 0 ||
            alertData?.missing_data?.length > 0 ||
            alertData?.clawback_data?.length > 0 ||
            alertData?.payroll_alert?.length > 0 ? (
                <>
                    {alertData?.addres_data?.length > 0 &&
                        alertData?.addres_data?.map((item) => (
                            <div className='d-flex align-items-start gap-5 mb-10' key={item?.id}>
                                <div className='bi bi-lightning-charge fs-1 text-cmError bg-cmError bg-opacity-10 rounded px-2 py-1' />
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
                    {alertData?.clawback_data?.length > 0 &&
                        alertData?.clawback_data?.map((item) => (
                            <div className='d-flex align-items-start gap-5 mb-10' key={item.id}>
                                <div className='bi bi-people fs-1 text-cmError bg-cmError bg-opacity-10 rounded px-2 py-1' />
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
                        alertData?.missing_data?.map((item) => (
                            <div
                                className='d-flex align-items-start gap-5 mb-10 cursor-pointer'
                                key={item?.id}
                                onClick={() => alertNavigation(item)}
                            >
                                <div className='bg-cmError bg-opacity-10 p-1 rounded'>
                                    {item?.type == 'Sales' ? (
                                        <KTSVG
                                            path='/media/icons/duotune/art/MissingInfo-Chart.svg'
                                            className='cursor-pointer'
                                            svgClassName='w-25px h-25px'
                                        />
                                    ) : item?.type == 'location Redline' ? (
                                        <i className={'pi pi-map-marker fs-2'}></i>
                                    ) : item?.type == 'Missing Rep' ? (
                                        <i className={'pi pi-user-edit fs-2'}></i>
                                    ) : item?.type == 'Closed Payroll' ? (
                                        <i className={'pi pi-delete-left fs-2'}></i>
                                    ) : null}
                                </div>
                                {/* Title */}
                                <div>
                                    <div style={{fontSize: 14, fontWeight: 800}}>
                                        {item?.heading}
                                    </div>

                                    <CustomEllipsis
                                        width='200px'
                                        className='text-cmGrey600 '
                                        style={{
                                            whiteSpace: 'nowrap',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                        }}
                                        text={item?.alert_summary}
                                    >
                                        {item?.alert_summary}
                                    </CustomEllipsis>
                                </div>
                            </div>
                        ))}
                    {alertData?.payroll_alert?.length > 0 &&
                        alertData?.payroll_alert?.map((item) => (
                            <div className='d-flex align-items-start gap-5 mb-10' key={item?.id}>
                                <div className='bi bi-lightning-charge fs-1 text-cmError bg-cmError bg-opacity-10 rounded px-2 py-1' />
                                {/* Title */}
                                <div>
                                    <div style={{fontSize: 14, fontWeight: 800}}>
                                        {item?.pid} - {item?.sales_rep_name} | Data Missing
                                    </div>
                                    <div className='text-cmGrey600' style={{fontWeight: 600}}>
                                        {' '}
                                        {item?.alert_summary}
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

export default AlertSectionCard
