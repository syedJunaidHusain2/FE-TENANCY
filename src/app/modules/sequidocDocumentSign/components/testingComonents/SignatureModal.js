import React, {useRef, useState} from 'react'
import CustomModal from '../../../../../customComponents/customModal/CustomModal'
import SignatureCanvas from 'react-signature-canvas'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import {IMAGE_TYPE} from '../../../../../helpers/CommonHelpers'
import CustomButton, {BUTTON_TYPE} from '../../../../../customComponents/customButtton/CustomButton'

const SignatureModal = ({
    open,
    handleClose,
    signatureData,
    setSignatureData,
    addSignatureToPDF,
}) => {
    const signatureRef = useRef()

    const handleClear = () => {
        signatureRef.current.clear()
        setSignatureData('')
    }

    const handleSave = () => {
        const dataUrl = signatureRef.current.getTrimmedCanvas().toDataURL('image/png')
        setSignatureData(dataUrl)
        addSignatureToPDF(dataUrl)
        handleClose()
    }
    return (
        <CustomModal
            maxWidth='450'
            show={open}
            onHide={handleClose}
            showline={false}
            title={'Add Signature'}
        >
            <SignatureCanvas
                ref={signatureRef}
                penColor='black'
                canvasProps={{height: 150, className: 'w-100 sigCanvas'}}
            />{' '}
            <div className='d-flex flex-end gap-5'>
                <CustomButton
                    buttonLabel='Clear'
                    onClick={handleClear}
                    buttonType={BUTTON_TYPE.secondary}
                />
                <CustomButton buttonLabel='Save' onClick={handleSave} />
            </div>
        </CustomModal>
    )
}

export default SignatureModal
