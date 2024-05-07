import React, {useEffect, useState} from 'react'
import Select from '../../Icon/select.png'
import Jeni from '../../Icon/jeni.png'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import './style.css'
import {
    getCustomerSaleTrackingService,
    getSalesByPidService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import moment from 'moment'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import {Sidebar} from 'primereact/sidebar'
import {Tree, TreeNode} from 'react-organizational-chart'
import {
    formattedNumberFields,
    formattedPhoneNumber,
    getErrorMessageFromResponse,
} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import {getValidDate} from '../../../../../../constants/constants'

export default function ViewCostomer(props) {
    const [edit, setEdit] = useState(false)
    const [trackData, setTrackData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (props.open && props.id?.id) {
            setLoading(true)
            const body = {
                pid: props?.id?.id,
            }
            getSalesByPidService(body)
                .then((res) => {
                    setTrackData(res?.data)
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [props.id?.id, props.open])
    return (
        <>
            <Sidebar
                visible={props.open}
                position='right'
                onHide={props.onClose}
                showCloseIcon={false}
                // className={'p-sidebar-md '}
                className={'w-sm-25 w-100'}
                icons={() => (
                    <div className='d-flex align-items-center my-2 justify-content-between  w-100 '>
                        <div
                            className=''
                            style={{fontSize: '16px', fontWeight: '600', fontFamily: 'Manrope'}}
                        >
                            {props?.id?.name}
                        </div>
                        <div
                            className='bi bi-x-lg fs-3 bg-hover-cmGrey200 text-cmBlack rounded-circle px-1 '
                            onClick={props.onClose}
                        ></div>
                    </div>
                )}
            >
                <div className='' id='kt_explore_body'>
                    <CustomLoader full visible={loading} />

                    <div>
                        {/* New code */}
                        <div className='mb-10'>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>PID:</div>
                                <div className='col-4 text-cmGrey600'>{trackData?.prospect_id}</div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 stripRow py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>Customer Address:</div>
                                <div className='col-4 text-cmGrey600'>
                                    {trackData?.customer_address ?? '-'}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>Customer City:</div>
                                <div className='col-4 text-cmGrey600'>
                                    {trackData?.customer_city ?? '-'}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 stripRow py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>Customer State:</div>
                                <div className='col-4 text-cmGrey600'>
                                    {trackData?.customer_state ?? '-'}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>Customer Zip:</div>
                                <div className='col-4 text-cmGrey600'>
                                    {trackData?.customer_zip ?? '-'}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 stripRow py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>Customer Email:</div>
                                <div className='col-4 text-cmGrey600'>
                                    {trackData?.customer_email ?? '-'}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>Customer Phone:</div>
                                <div className='col-4 text-cmGrey600'>
                                    {formattedPhoneNumber(trackData?.customer_phone) ?? '-'}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 stripRow py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>Gross Account Value:</div>
                                <div className='col-4 text-cmGrey600'>
                                    {formattedNumberFields(trackData?.gross_account_value, '$')}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>Installer:</div>
                                <div className='col-4 text-cmGrey600'>
                                    {trackData?.installer ?? '-'}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 stripRow py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>EPC:</div>
                                <div className='col-4 text-cmGrey600'>{trackData?.epc ?? '-'}</div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10  py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>Net EPC:</div>
                                <div className='col-4 text-cmGrey600'>
                                    {trackData?.net_epc ?? '-'}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 stripRow py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>{`Dealer Fee %`}</div>
                                <div className='col-4 text-cmGrey600'>
                                    {trackData?.dealer_fee_percentage
                                        ? formattedNumberFields(
                                              trackData?.dealer_fee_percentage,
                                              '%'
                                          )
                                        : '-'}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 stripRow py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>{`Dealer Fee $`}</div>
                                <div className='col-4 text-cmGrey600'>
                                    {trackData?.dealer_fee_amount
                                        ? formattedNumberFields(trackData?.dealer_fee_amount)
                                        : '-'}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>Adders:</div>
                                <div className='col-4 text-cmGrey600'>
                                    {trackData?.adders_description ?? '-'}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 stripRow py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>Cancel Date:</div>
                                <div className='col-4 text-cmGrey600'>
                                    {getValidDate(trackData?.date_cancelled) ?? '-'}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>M1 Date:</div>
                                <div className='col-4 text-cmGrey600'>
                                    {getValidDate(trackData?.m1_date) ?? '-'}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>M2 Date:</div>
                                <div className='col-4 text-cmGrey600'>
                                    {getValidDate(trackData?.m2_date) ?? '-'}
                                </div>
                            </div>
                            <div
                                className='row align-items-center text-cmGrey900 ps-10 py-4'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-4'>Approval Date:</div>
                                <div className='col-4 text-cmGrey600'>
                                    {getValidDate(trackData?.approved_date) ?? '-'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}
