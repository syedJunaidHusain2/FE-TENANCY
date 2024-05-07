import React from 'react'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'

const RunPayrollComment = ({show, onHide, handleSubmit, comment, setComment, commentError}) => {
    return (
        <CustomModal
            show={show}
            onHide={onHide}
            maxWidth='500'
            title={'To save your changes you need to add comment'}
        >
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex gap-5 align-items-center mb-5'>
                        <CustomImage className='w-30px h-30px' />

                        <CustomInput
                            label={'Comment'}
                            required
                            type={INPUT_TYPE.textarea}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            errorMessage={commentError}
                        />
                    </div>
                    <div className='float-end'>
                        <CustomButton type={BUTTON_TYPE.primary} buttonLabel='Post'></CustomButton>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

export default RunPayrollComment
