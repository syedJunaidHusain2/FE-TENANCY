import React from 'react'
import CustomButton, {BUTTON_TYPE} from '../../../customComponents/customButtton/CustomButton'
import {useNavigate} from 'react-router-dom'
import CustomModal from '../../../customComponents/customModal/CustomModal'

// const AgreementHtml = require('../../../assets/docs/UserAgreement.html')
const EmployeTerms = ({onAcceptOrDecline = () => {}, show = false}) => {
    const navigate = useNavigate()

    return (
        <CustomModal show={show} showClose={false} title={'User Agreement'}>
            <div className=''>
                <iframe
                    title='HTML Viewer'
                    src='UserAgreement.html' // Replace with the URL or path to your HTML file
                    width='100%'
                    height='500px'
                />
            </div>
            <div className='d-flex flex-end mx-5 mt-5'>
                <CustomButton
                    buttonLabel='Decline'
                    buttonType={BUTTON_TYPE.greyText}
                    onClick={() => onAcceptOrDecline(0)}
                />
                <CustomButton
                    buttonLabel='Accept'
                    buttonType={BUTTON_TYPE.primary}
                    onClick={() => onAcceptOrDecline(1)}
                />
            </div>
        </CustomModal>
    )
}

export default EmployeTerms
