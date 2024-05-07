import {useEffect, useState} from 'react'

import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import {loadStripe} from '@stripe/stripe-js'
import {STRIPE_PUBLISH_KEY, getValidDate} from '../../constants/constants'
import {useLocation, useNavigate} from 'react-router-dom'
import {formattedNumberFields} from '../../helpers/CommonHelpers'
import CustomButton from '../../customComponents/customButtton/CustomButton'

const FieldRow = ({title = '-', value = '-'}) => {
    return (
        <div className='d-flex w-100 my-1  align-items-center justify-content-between'>
            <div className='text-start  w-100'>{title}: </div>
            <div className='text-start w-100' style={{fontWeight: 600}}>
                {value ?? '-'}
            </div>
        </div>
    )
}
function StripeIntegration() {
    const [stripePromise, setStripePromise] = useState(null)
    const [clientSecret, setClientSecret] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location?.state?.client_secret) setClientSecret(location?.state?.client_secret)
    }, [location?.state?.client_secret])

    useEffect(() => {
        loadStripe(STRIPE_PUBLISH_KEY).then((res) => {
            setStripePromise(res)
        })
    }, [])

    return (
        <div
            className='d-flex align-items-center justify-content-center w-100 '
            style={{overflowY: 'scroll'}}
        >
            <div
                className={
                    'card bg-white shadow p-5 w-35 mt-10 d-flex align-self-center justify-content-center align-items-center'
                }
                style={{
                    overflowY: 'scroll',
                    padding: '20px',
                    fontSize: '1.2em',
                }}
            >
                {clientSecret && stripePromise ? (
                    <>
                        <h1>Stripe Payments</h1>
                        <div className='card bg-white h-auto shadow p-5 w-90 mt-10'>
                            <FieldRow
                                title={'Billing Date'}
                                value={getValidDate(location?.state?.billingData?.billing_date)}
                            />
                            <FieldRow
                                title={'Invoice Number'}
                                value={location?.state?.billingData?.invoice_no}
                            />
                            <FieldRow
                                title={'Amount'}
                                value={formattedNumberFields(location?.state?.billingData?.amount)}
                            />
                        </div>

                        <Elements stripe={stripePromise} options={{clientSecret}}>
                            <CheckoutForm billingData={location?.state?.billingData} />
                        </Elements>
                    </>
                ) : (
                    <>
                        <h3>Broken Link</h3>
                        <CustomButton
                            buttonLabel='Go To Dashboard'
                            onClick={() => navigate('/dashboard')}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default StripeIntegration
