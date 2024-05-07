import React, {useEffect, useState} from 'react'
import Pagination from '../../../admin/sequidocs/component/Pagination'
import CustomButton, {BUTTON_TYPE} from '../../../../../customComponents/customButtton/CustomButton'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import {fontsFamily} from '../../../../../assets/fonts/fonts'
import {useNavigate} from 'react-router-dom'
import {getSubscriptionListService} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../helpers/CommonHelpers'
import {getValidDate} from '../../../../../constants/constants'

const ManageSubscriptionTable = () => {
    const navigate = useNavigate()
    const [subscriptionData, setSubscriptionData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSubscriptionListService()
            .then((res) => setSubscriptionData(res.data))
            .finally(() => setLoading(false))
    }, [])
    return (
        <div>
            {/* <Tooltip target='.aman-tooltip' mouseTrack mouseTrackLeft={10} /> */}
            <div
                className='text-cmGrey900 mb-10'
                style={{fontSize: 20, fontFamily: fontsFamily.manrope, fontWeight: 600}}
            >
                Manage Subscription
            </div>
            <div
                className='table-responsive shadow-sm overflow-auto bg-cmwhite'
                style={{borderRadius: 10, position: 'relative'}}
            >
                <CustomLoader full visible={loading} />

                <table className='table'>
                    <thead className={TABLE_BORDER}>
                        <tr
                            className='bg-cmGrey300 text-cmGrey900'
                            style={{
                                fontSize: '14px',
                                fontWeight: '700',
                                fontFamily: fontsFamily.manrope,
                            }}
                        >
                            <th className='p-5 ps-8 text-nowrap'>Product</th>
                            <th className='p-5 text-nowrap'>Plan</th>
                            <th className='p-5 text-nowrap text-cmGrey700'>
                                Price estimate{' '}
                                <span
                                    className='pi pi-info-circle aman-tooltip cursor-pointer'
                                    data-pr-tooltip='The provided price estimate does not include taxes. The final charged amount will encompass taxes, along with any applicable discounts, promotions, or credits'
                                />
                            </th>
                            <th className='p-5 text-nowrap'>Billing Frequency</th>
                            <th className='p-5 text-nowrap'>Next Bill Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className={TABLE_BORDER}>
                        {subscriptionData?.id ? (
                            <>
                                {/* {subscriptionData?.map((subscriptionData, i) => ( */}
                                <tr
                                    key={null}
                                    className='text-cmGrey700 stripRow '
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 600,
                                    }}
                                >
                                    <td className='p-5 ps-8'>
                                        <div className='d-flex align-items-center gap-3 text-cmGrey900 text-nowrap'>
                                            <div>
                                                <CustomImage
                                                    src={null}
                                                    className='avatar'
                                                    style={{width: 32, height: 32}}
                                                />
                                            </div>
                                            <div>{subscriptionData?.product}</div>
                                        </div>
                                    </td>
                                    <td className='p-5 text-nowrap'>
                                        {subscriptionData?.plan ?? '-'}
                                    </td>
                                    <td className='p-5 text-nowrap'>
                                        {formattedNumberFields(subscriptionData?.total)}
                                    </td>
                                    <td className='p-5 text-nowrap'>
                                        {subscriptionData?.frequency}
                                    </td>

                                    <td className='p-5 text-nowrap'>
                                        {getValidDate(subscriptionData?.end_date)}
                                    </td>
                                    <td className='p-5'>
                                        <CustomButton
                                            onClick={() =>
                                                navigate('manage', {
                                                    state: {subscriptionId: subscriptionData?.id},
                                                })
                                            }
                                            padding={'py-2'}
                                            width={'100px'}
                                            buttonLabel='Manage'
                                            buttonType={BUTTON_TYPE.primaryBorder}
                                        />
                                    </td>
                                </tr>
                                {/* ))} */}
                            </>
                        ) : (
                            <tr key='no-data'>
                                <td
                                    colSpan={12}
                                    style={{
                                        textAlign: 'center',
                                        fontFamily: 'Manrope',
                                        fontWeight: '500',
                                        fontSize: 14,
                                        paddingTop: 20,
                                        paddingBottom: 20,
                                    }}
                                >
                                    No Subscriptions
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {1 > 0 ? <Pagination page={null} totalPages={null} setPage={null} /> : null}
            </div>
        </div>
    )
}

export default ManageSubscriptionTable
