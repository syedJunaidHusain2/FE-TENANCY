import React from 'react'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomLottie from '../../../../../../customComponents/customLottie/CustomLottie'
import CheckAnimation from '../../../../../../assets/lottieAnimation/CheckAnimation'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import {useNavigate} from 'react-router-dom'

const PayrollExecuteModal = ({show, handleClose, refreshPayFrequency, selectedPayPeriod}) => {
    const naviagte = useNavigate()
    const redirectToReport = () => {
        refreshPayFrequency()
        naviagte('/reports/payroll', {state: {period: selectedPayPeriod}})
    }
    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='425' showHeader={false}>
            <div style={{fontFamily: fontsFamily.manrope}} className='text-center'>
                <div className='d-flex flex-center p-0 m-0'>
                    <CustomLottie lottieJson={CheckAnimation} height={73} width={73} />
                </div>
                <div className='text-center mb-10'>
                    <div style={{fontSize: 20, fontWeight: 600}} className='text-cmGrey800 mb-5'>
                        Payroll Executed!
                    </div>
                    <div
                        style={{fontSize: 16, fontWeight: 600, lineHeight: '26px'}}
                        className='text-cmGrey600'
                    >
                        You can view the executed payroll in the reports section!
                    </div>
                </div>
                {/* Buttons */}
                <div className='d-flex flex-center flex-wrap gap-10'>
                    <CustomButton
                        type={BUTTON_TYPE.primaryBorder}
                        buttonLabel='Thanks!'
                        padding={'px-10'}
                        onClick={handleClose}
                    />
                    <CustomButton
                        buttonLabel='View Report'
                        padding={'px-10'}
                        onClick={redirectToReport}
                    />
                </div>
            </div>
        </CustomModal>
    )
}

export default PayrollExecuteModal
