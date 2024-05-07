import React from 'react'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'

const ExecuteConfirmModal = ({show, handleClose}) => {
    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            maxWidth='500'
            showline={false}
            borderColor={'cminfo'}
        >
            <div
                style={{
                    fontSize: 16,
                    fontWeight: 600,
                    lineHeight: '26px',
                    fontFamily: fontsFamily.manrope,
                }}
                className='text-cmGrey800 px-sm-20 text-center'
            >
                All employees are marked as paid. <br /> You can close this payroll now!
            </div>
        </CustomModal>
    )
}

export default ExecuteConfirmModal
