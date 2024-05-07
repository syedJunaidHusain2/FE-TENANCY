import React, {useRef, useState} from 'react'
import CustomCheckbox from '../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../customComponents/customButtton/CustomButton'
import {useNavigate} from 'react-router-dom'

import DisplayPdf from './testingComonents/DisplayPdf'

const SequidocSigningPdfview = () => {
    const [agreeCheck, setagreeCheck] = useState(false)
    const [lastStep, setlastStep] = useState(false)

    const navigate = useNavigate()
    const windowRef = useRef()

    const handleAgreeCheck = () => {
        setagreeCheck(!agreeCheck)
    }

    const handleViewLastStep = () => {
        setlastStep(!lastStep)
    }

    const blurLayerStyle = {
        position: 'absolute', // Position the blur layer absolutely within the container
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Background color with transparency
        backdropFilter: 'blur(1px)', // Apply a blur effect to the blur layer
    }

    const url = 'https://www.africau.edu/images/default/sample.pdf'

    return (
        <div className='position-relative'>
            <div className='w-100'>
                {lastStep ? (
                    <div className='h-60px bg-cmBlue-Crayola d-flex flex-center'>
                        <CustomButton
                            buttonLabel='Finish'
                            buttonType={BUTTON_TYPE.disabled}
                            buttonSize={BUTTON_SIZE.large}
                            className={'bg-opacity-10'}
                            onClick={() => navigate('/document-signing/download-document')}
                        />
                    </div>
                ) : (
                    <div className='h-60px bg-cmBlue-Crayola d-flex flex-center gap-10'>
                        <div className='d-flex flex-center gap-2'>
                            <span>
                                <CustomCheckbox checked={agreeCheck} onChange={handleAgreeCheck} />
                            </span>
                            <span className='text-cmwhite' style={{fontWeight: 700}}>
                                I agree to use electronics records and signatures{' '}
                            </span>
                        </div>

                        {agreeCheck ? (
                            <CustomButton
                                buttonLabel='Get Started'
                                buttonType={BUTTON_TYPE.primary}
                                buttonSize={BUTTON_SIZE.large}
                                className={'bg-opacity-10'}
                                onClick={handleViewLastStep}
                            />
                        ) : (
                            <CustomButton
                                buttonLabel='Get Started'
                                buttonType={BUTTON_TYPE.disabled}
                                buttonSize={BUTTON_SIZE.large}
                                className={'bg-opacity-10'}
                            />
                        )}
                    </div>
                )}
            </div>
            <div className='container position-relative'>
                <div>
                    {' '}
                    <DisplayPdf url={url} />
                </div>

                {/* Blur layer */}
                <div style={agreeCheck ? null : blurLayerStyle}></div>
            </div>
        </div>
    )
}

export default SequidocSigningPdfview
