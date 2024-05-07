import {useEffect} from 'react'
import useQueryString from '../../hooks/useQueryString'
import {paymentCallbackService} from '../../services/Services'
import CustomToast from '../../customComponents/customToast/CustomToast'
import {getErrorMessageFromResponse} from '../../helpers/CommonHelpers'
import CustomButton, {BUTTON_TYPE} from '../../customComponents/customButtton/CustomButton'
import {useNavigate} from 'react-router-dom'
import sequifiIcon from '../../../src/assets/images/sequifiIcon.svg'
const FieldRow = ({title = '-', value = '-'}) => {
    return (
        <div className='w-100 my-1  row'>
            <div className='col-sm-4 text-start  w-100'>{title}: </div>
            <div className='col-sm-8 text-start w-100 flex-wrap' style={{fontWeight: 600}}>
                {value ?? '-'}
            </div>
        </div>
    )
}

function Completion(props) {
    const [searchParams] = useQueryString()
    const navigate = useNavigate()

    useEffect(() => {
        if (
            searchParams?.billing_id &&
            searchParams?.payment_intent &&
            searchParams?.payment_intent_client_secret
        ) {
            const body = {
                billing_id: searchParams?.billing_id,
                payment_intent: searchParams?.payment_intent,
                payment_intent_client_secret: searchParams?.payment_intent_client_secret,
            }
            paymentCallbackService(body).catch((error) =>
                CustomToast.error(getErrorMessageFromResponse(error))
            )
        }
    }, [
        searchParams?.billing_id,
        searchParams?.payment_intent,
        searchParams?.payment_intent_client_secret,
    ])

    return (
        <div className='w-100 mt-10 d-flex align-self-center justify-content-center align-items-center'>
            <div className='card bg-white h-auto shadow  w-sm-35 p-5 d-flex align-items-center justify-content-center'>
                <img
                    src={sequifiIcon}
                    className='app-sidebar-logo-default'
                    style={{width: '150px', height: '150px'}}
                />
                <div className='d-flex align-items-center'>
                    <i
                        className='bi bi-check-circle-fill text-success me-2'
                        style={{fontSize: 20}}
                    />
                    <span style={{fontSize: '20px'}}>{'  '}Payment Succeeded</span>
                </div>

                <FieldRow title={'Billing ID'} value={searchParams?.billing_id} />

                <FieldRow title={'Payment Intent ID'} value={searchParams?.payment_intent} />
                <FieldRow
                    title={'Client Secret'}
                    value={searchParams?.payment_intent_client_secret}
                />

                <div className='mt-10 p-2 gap-2'>
                    <CustomButton
                        buttonLabel={'Go to Billing History'}
                        onClick={() => {
                            navigate('/settings/billings/billing-history')
                        }}
                    />
                    {/* <CustomButton
                        buttonType={BUTTON_TYPE.primaryBorder}
                        style={{marginLeft: '20px'}}
                        buttonLabel={'Download Receipt'}
                        onClick={() => {
                            CustomToast.success('Receipt Downloaded(Under development)')
                        }}
                    /> */}
                </div>
            </div>
        </div>
    )
}

export default Completion
