import React, {useCallback, useEffect, useState} from 'react'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import {KTSVG} from '../../../../../../_metronic/helpers'
import Pagination from '../../../../admin/sequidocs/component/Pagination'
import {useLocation, useNavigate} from 'react-router-dom'
import {manageSubscriptionService} from '../../../../../../services/Services'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import {getValidDate} from '../../../../../../constants/constants'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {Tooltip} from 'primereact/tooltip'

const SubscriptionDetails = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [particularSubscriptionData, setparticularSubscriptionData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isCancelSubscription, setIsCancelSubscription] = useState(0)

    useEffect(() => {
        manageSubscriptionData()
    }, [location, isCancelSubscription])

    const manageSubscriptionData = useCallback(() => {
        const body = {
            is_cancel: isCancelSubscription,
            subscription_id: location?.state?.subscriptionId,
        }
        manageSubscriptionService(body)
            .then((res) => {
                setparticularSubscriptionData(res.data)
            })
            .finally(() => {
                setLoading(false)
                if (isCancelSubscription) navigate(-1)
            })
    }, [isCancelSubscription, location?.state?.subscriptionId])

    const onCancelSubscription = () => {
        CustomDialog.warn('Are you sure want to cancel this subscripion', () => {
            // setLoading(true)
            setIsCancelSubscription(1)
            setLoading(true)
        })
    }
    return (
        <div className='' style={{fontFamily: fontsFamily.manrope}}>
            <div className='d-flex flex-wrap align-items-end justify-content-between gap-5 mb-10'>
                <div
                    className='text-cmGrey900'
                    style={{fontSize: 20, fontFamily: fontsFamily.manrope, fontWeight: 600}}
                >
                    Subscription Details
                </div>
                <div>
                    <CustomButton
                        buttonLabel='Cancel Subscription'
                        className={''}
                        buttonType={BUTTON_TYPE.secondary}
                        onClick={onCancelSubscription}
                        // buttonSize={BUTTON_SIZE.large}
                    />
                </div>
            </div>
            {/* table starts */}
            <div style={{borderRadius: 10, position: 'relative'}} className='shadow-sm'>
                <CustomLoader full visible={loading} />

                <div
                    className='d-flex flex-wrap align-items-center justify-content-between gap-5 bg-cmGrey200 py-8 ps-5 pe-sm-10 pe-5'
                    style={{borderRadius: '10px 10px 0 0'}}
                >
                    <div className='d-flex flex-wrap gap-3 cursor-pointer'>
                        <KTSVG
                            path='/media/icons/duotune/art/SequifiSLogo.svg'
                            className='cursor-pointer'
                            svgClassName='w-70px h-60px'
                        />
                        <div className='d-flex flex-column justify-content-between'>
                            <div className='text-cmGrey900' style={{fontWeight: 600, fontSize: 24}}>
                                Sequifi Payroll
                            </div>
                            <div className='text-cmGrey700' style={{fontWeight: 600, fontSize: 14}}>
                                solar.sequifi.com | E-3GH-BJE-2DJ-SNA
                            </div>
                        </div>
                    </div>
                    <div
                        className='text-sm-end align-items-end justify-content-end'
                        style={{fontSize: 12, fontWeight: 600}}
                    >
                        <div style={{fontSize: 16, fontWeight: 700}} className='text-cmGrey900'>
                            {particularSubscriptionData?.plan}
                        </div>
                        <div className='d-flex gap-5 align-items-center'>
                            <div className='px-5 badge bg-cmSuccess bg-opacity-10 rounded-pill text-cmSuccess'>
                                Active
                            </div>
                            <div>Since {getValidDate(particularSubscriptionData?.start_date)}</div>
                        </div>
                    </div>
                </div>
                <div
                    className='bg-cmwhite w-100 table-responsive overflow-auto'
                    style={{borderRadius: '0 0 10px 10px'}}
                >
                    <table className='table w-100 '>
                        <thead className={TABLE_BORDER}>
                            <tr
                                className='text-cmGrey600 '
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    fontFamily: fontsFamily.manrope,
                                }}
                            >
                                <th className='p-5 ps-8 text-nowrap'>Billing Cycle</th>
                                <th className='p-5 text-nowrap'>
                                    <div>Unique PID</div>
                                    <div style={{fontSize: 10}}>
                                        ${particularSubscriptionData?.pid_singleprice}/watt
                                    </div>
                                </th>
                                <th className='p-5 text-nowrap'>
                                    {' '}
                                    <div>M2 Completed</div>
                                    <div style={{fontSize: 10}}>
                                        ${particularSubscriptionData?.m2_singlprice}/watt
                                    </div>
                                </th>
                                <th className='p-5 text-nowrap'>Next Bill Date</th>
                                <th className='p-5 text-nowrap'>
                                    Price Estimate{' '}
                                    <span
                                        data-pr-tooltip='The provided price estimate does not include taxes. The final charged amount will encompass taxes, along with any applicable discounts, promotions, or credits'
                                        className='priceEstimate bi bi-info-circle'
                                    />
                                    <Tooltip target='.priceEstimate' mouseTrack />
                                </th>
                            </tr>
                        </thead>
                        <tbody className={TABLE_BORDER}>
                            <>
                                {/* {tableData?.data?.data?.map((item, i) => ( */}
                                <tr
                                    key={null}
                                    className='text-cmGrey900 '
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 700,
                                    }}
                                >
                                    <td className='p-5 ps-8 text-nowrap '>
                                        {particularSubscriptionData?.frequency}
                                    </td>
                                    <td
                                        className='p-5 text-nowrap  text-decoration-underline cursor-pointer'
                                        onClick={() =>
                                            navigate('uniquePid', {
                                                state: {uniquePid: location?.state?.subscriptionId},
                                            })
                                        }
                                    >
                                        {particularSubscriptionData?.pid_total_count ?? '0'} (
                                        {formattedNumberFields(
                                            particularSubscriptionData?.pid_total_price
                                        )}
                                        )
                                    </td>
                                    <td
                                        className='p-5 text-nowrap  text-decoration-underline cursor-pointer'
                                        onClick={() =>
                                            navigate('m2complete', {
                                                state: {uniquePid: location?.state?.subscriptionId},
                                            })
                                        }
                                    >
                                        {particularSubscriptionData?.m2_total_count ?? '0'} (
                                        {formattedNumberFields(
                                            particularSubscriptionData?.m2_total_price
                                        )}
                                        )
                                    </td>
                                    <td className='p-5 text-nowrap'>
                                        {getValidDate(particularSubscriptionData?.end_date) ?? '-'}
                                    </td>

                                    <td className='p-5 text-nowrap'>
                                        {formattedNumberFields(
                                            particularSubscriptionData?.total,
                                            '$'
                                        )}
                                    </td>
                                </tr>

                                {/* ))} */}
                            </>
                        </tbody>
                    </table>
                    {1 > 0 ? <Pagination page={null} totalPages={null} setPage={null} /> : null}
                </div>
            </div>
        </div>
    )
}

export default SubscriptionDetails
