import {PaymentElement} from '@stripe/react-stripe-js'
import {useCallback, useState} from 'react'
import {useStripe, useElements} from '@stripe/react-stripe-js'
import CustomButton, {BUTTON_TYPE} from '../../customComponents/customButtton/CustomButton'
import {useLocation, useNavigate} from 'react-router-dom'
import CustomToast from '../../customComponents/customToast/CustomToast'

export default function CheckoutForm({billingData}) {
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const location = useLocation()

    const [message, setMessage] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        setIsProcessing(true)

        stripe
            .confirmPayment({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: `${window.location.origin}/completion?billing_id=${billingData?.id}`,
                },
            })
            .then((res) => {
                if (res?.error?.type) {
                    setMessage(res?.error.message)
                    setIsProcessing(false)
                }
            })
            .catch((error) => {
                setMessage(error.message)
                setIsProcessing(false)
            })
    }

    const onCancelPress = useCallback(() => {
        CustomToast.error('Payment cancelled')
        navigate('/settings/billings/billing-history')
    }, [navigate])

    return (
        <>
            <form className='card bg-white h-auto shadow p-5 mt-10' onSubmit={handleSubmit}>
                <PaymentElement id='payment-element' />
                <div className='d-flex  mt-5'>
                    <CustomButton
                        type='submit'
                        disabled={isProcessing || !stripe || !elements}
                        id='submit'
                        buttonLabel={isProcessing ? 'Processing ... ' : 'Pay now'}
                    />
                    <CustomButton
                        buttonType={BUTTON_TYPE.error}
                        style={{marginLeft: 10}}
                        disabled={isProcessing || !stripe || !elements}
                        buttonLabel={'Cacnel'}
                        onClick={onCancelPress}
                    />
                </div>
                {/* Show any error or success messages */}
            </form>
            {message ? <div id='payment-message'>{message}</div> : null}
        </>
    )
}
