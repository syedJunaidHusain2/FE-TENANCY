import React from 'react'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import {useNavigate} from 'react-router-dom'

const QuickLinksCardStandard = () => {
    const navigate = useNavigate()
    const navigateToQuickLink = (path) => {
        navigate(path)
    }
    return (
        <>
            {/* QuickLinks Card */}
            <div
                className='bg-cmwhite shadow-sm p-5 mb-10'
                style={{borderRadius: '10px', fontWeight: 700, fontSize: '16px'}}
            >
                <div className='mb-5 text-cmGrey900'>Quick Links</div>
                <div className='d-flex gap-4 flex-wrap align-items-center'>
                    <CustomButton
                        buttonType={BUTTON_TYPE.secondary}
                        buttonLabel='My Overrides'
                        onClick={() => navigateToQuickLink('/mysales/my-overrides')}
                        buttonSize={BUTTON_SIZE.normal}
                    />
                    <CustomButton
                        buttonType={BUTTON_TYPE.secondary}
                        buttonLabel='Recent Sales'
                        onClick={() => navigateToQuickLink('/mysales/sales?recentSale')}
                        buttonSize={BUTTON_SIZE.normal}
                    />
                    <CustomButton
                        buttonType={BUTTON_TYPE.secondary}
                        buttonLabel='My Requests'
                        onClick={() => navigateToQuickLink('/requests/request')}
                        buttonSize={BUTTON_SIZE.normal}
                    />
                    <CustomButton
                        buttonType={BUTTON_TYPE.secondary}
                        buttonLabel=' Current Pay stub'
                        onClick={() => navigateToQuickLink('/mysales/pay-stubs')}
                        buttonSize={BUTTON_SIZE.normal}
                    />
                </div>
            </div>
        </>
    )
}

export default QuickLinksCardStandard
