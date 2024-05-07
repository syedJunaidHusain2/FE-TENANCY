import React, {useCallback, useEffect, useRef, useState} from 'react'
import Pagination from '../../../admin/sequidocs/component/Pagination'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import {fontsFamily} from '../../../../../assets/fonts/fonts'
import {
    getBillingHistoryDataService,
    getBillingInvoiceService,
    getBillingPaymentGatewayInfoService,
} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {
    TABLE_BORDER,
    formattedNumberFields,
    getErrorMessageFromResponse,
} from '../../../../../helpers/CommonHelpers'
import {getValidDate} from '../../../../../constants/constants'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import {useNavigate} from 'react-router-dom'
import ViewBillingInvoice from './ViewBillingInvoice'
import PrintOrDownloadPDF from '../../../../../integrations/jspdf/PrintOrDownloadPDF'
import {PreviewA4} from '@diagoriente/react-preview-a4'
import CustomModal from '../../../../../customComponents/customModal/CustomModal'

const BillingHistoryTable = () => {
    const navigate = useNavigate()
    const viewInvoiceRef = useRef()
    const [billingData, setBillingData] = useState(null)
    const [billingInvoiceData, setBillingInvoiceData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [openViewInvoice, setopenViewInvoice] = useState(false)

    useEffect(() => {
        getBillingHistoryDataService()
            .then((res) => setBillingData(res?.data))
            .finally(() => setLoading(false))
    }, [])

    const onPayNowPress = useCallback(
        (item) => {
            setLoading(true)
            getBillingPaymentGatewayInfoService({payment_id: item?.id})
                .then((res) => {
                    navigate('/stripe', {
                        state: {
                            client_secret: res?.client_secret,
                            billingData: item,
                        },
                    })
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [navigate]
    )

    useEffect(() => {
        if (billingInvoiceData) {
            setTimeout(() => {
                viewInvoiceRef?.current?.downloadPdf()
            }, 500)
        }
    }, [billingInvoiceData])

    const handleViewInvoice = () => {
        setopenViewInvoice(!openViewInvoice)
    }

    const onViewInvoicePress = useCallback((item) => {
        setLoading(true)
        getBillingInvoiceService(item?.id)
            .then((res) => {
                setBillingInvoiceData(res?.data)
                setopenViewInvoice(!openViewInvoice)
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <div className=''>
            <div
                className='text-cmGrey900 mb-10'
                style={{fontSize: 20, fontFamily: fontsFamily.manrope, fontWeight: 600}}
            >
                Billing History
            </div>
            <div
                className='table-responsive shadow-sm bg-cmwhite'
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
                            <th className='p-5 text-nowrap'>Bill Date</th>
                            <th className='p-5 text-nowrap'>Invoice No.</th>
                            <th className='p-5 text-nowrap'>Unique PID</th>
                            <th className='p-5 text-nowrap'>M2 Completed</th>
                            <th className='p-5 text-nowrap'>Status</th>
                            <th className='p-5 text-nowrap'>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className={TABLE_BORDER}>
                        {billingData?.length > 0 ? (
                            <>
                                {billingData?.map((item, i) => (
                                    <tr
                                        key={item?.id}
                                        className='text-cmGrey800 stripRow '
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        <td className='p-5 text-nowrap text-cmGrey700'>
                                            {item?.billing_date
                                                ? getValidDate(item?.billing_date)
                                                : '-'}
                                        </td>
                                        <td className='p-5 text-nowrap text-cmGrey700'>
                                            {item?.invoice_no ?? '-'}
                                        </td>
                                        <td
                                            className='p-5 text-nowrap text-cmGrey900 cursor-pointer'
                                            style={{fontWeight: 700}}
                                            onClick={() => {
                                                navigate('uniquePid', {
                                                    state: {
                                                        uniquePid: item?.subscription_id,
                                                        billingId: item?.id,
                                                        history: true,
                                                    },
                                                })
                                            }}
                                        >
                                            <div className='text-decoration-underline'>
                                                {item?.pid_count}
                                            </div>
                                            <div style={{fontSize: 10}}>
                                                $ {item?.unique_pid_discount_price} /watt
                                            </div>
                                        </td>
                                        <td
                                            className='p-5 text-nowrap text-cmGrey900 cursor-pointer'
                                            style={{fontWeight: 700}}
                                            onClick={() => {
                                                navigate('m2complete', {
                                                    state: {
                                                        uniquePid: item?.subscription_id,
                                                        billingId: item?.id,
                                                        history: true,
                                                    },
                                                })
                                            }}
                                        >
                                            {/* {item?.m2_completed_count ?? '-'} */}
                                            <div className='text-decoration-underline'>
                                                {item?.m2_pid_count}
                                            </div>
                                            <div style={{fontSize: 10}}>
                                                $ {item?.m2_discount_price} /watt
                                            </div>
                                        </td>
                                        <td
                                            className='p-5 text-nowrap text-cmGrey800'
                                            style={{fontWeight: 700}}
                                        >
                                            {item?.paid_status ? 'paid' : 'Unpaid'}
                                        </td>
                                        <td
                                            className='p-5 text-nowrap text-cmGrey800'
                                            style={{fontWeight: 700}}
                                        >
                                            {formattedNumberFields(item?.amount, '$')}
                                        </td>
                                        <td className='p-5'>
                                            {item?.paid_status ? (
                                                <>
                                                    {/* <CustomButton
                                                        padding={'py-2'}
                                                        width={'w-100px'}
                                                        buttonLabel='View Receipt'
                                                        onClick={() =>
                                                            CustomToast.success(
                                                                'Receipt will be sent via email'
                                                            )
                                                        }
                                                        buttonType={BUTTON_TYPE.primaryBorder}
                                                    /> */}
                                                </>
                                            ) : (
                                                <>
                                                    <div className='d-flex flex-center gap-5'>
                                                        <CustomButton
                                                            buttonSize={BUTTON_SIZE.small}
                                                            buttonLabel='Pay Now'
                                                            onClick={() => onPayNowPress(item)}
                                                        />
                                                        <CustomButton
                                                            buttonSize={BUTTON_SIZE.small}
                                                            onClick={() => onViewInvoicePress(item)}
                                                            buttonLabel='View Invoice'
                                                            buttonType={BUTTON_TYPE.primaryBorder}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
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
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {1 > 0 ? <Pagination page={null} totalPages={null} setPage={null} /> : null}
            </div>

            {openViewInvoice ? (
                <CustomModal
                    maxWidth='700'
                    show={openViewInvoice}
                    onHide={handleViewInvoice}
                    showline={false}
                >
                    {/* <PreviewA4> */}
                    <ViewBillingInvoice data={billingInvoiceData} />
                    {/* </PreviewA4> */}
                </CustomModal>
            ) : null}
        </div>
    )
}

export default BillingHistoryTable
