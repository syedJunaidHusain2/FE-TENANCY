import React from 'react'
import CustomModal from '../../../../customComponents/customModal/CustomModal'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {fontsFamily} from '../../../../assets/fonts/fonts'
import CustomButton, {BUTTON_SIZE} from '../../../../customComponents/customButtton/CustomButton'

const AssignPayrollModal = ({show, handleClose}) => {
    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='800' title={'Assign Payroll'}>
            <div style={{position: 'relative'}}>
                <div className=''>
                    <div className='modal-body  py-lg-7 px-lg-10'>
                        <div className='container d-flex justify-content-center'>
                            <div className='row w-sm-450px'>
                                <div
                                    className='mb-5 text-cmGrey800'
                                    style={{
                                        fontFamily: fontsFamily.manrope,
                                        fontSize: '16px',
                                        fontWeight: 600,
                                    }}
                                >
                                    <span>For Setters </span>
                                </div>
                                <div className='mb-5 d-flex gap-5'>
                                    <div
                                        className='text-cmGrey700'
                                        style={{
                                            fontFamily: fontsFamily.manrope,
                                            fontSize: '14px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Pay Frequency:{' '}
                                    </div>{' '}
                                    <div
                                        className='text-cmGrey800'
                                        style={{
                                            fontFamily: fontsFamily.manrope,
                                            fontSize: '16px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Weekly
                                    </div>
                                </div>
                                <div className='mb-10'>
                                    <CustomDropdown
                                        label={'Select Pay Period'}
                                        // name={FIELD_KEYS.adjustment_type_id}
                                        // onChange={onChangeInputData}
                                        // value={requestData?.adjustment_type_id}
                                        // required
                                        // options={adjustmentTypeList}
                                        // valueKey='id'
                                        // searching={false}
                                        // showClear={false}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='container d-flex justify-content-center'>
                            <div className='row w-sm-450px'>
                                <div
                                    className='mb-5 text-cmGrey800'
                                    style={{
                                        fontFamily: fontsFamily.manrope,
                                        fontSize: '16px',
                                        fontWeight: 600,
                                    }}
                                >
                                    <span>For Closers </span>
                                </div>
                                <div className='mb-5 d-flex gap-5'>
                                    <div
                                        className='text-cmGrey700'
                                        style={{
                                            fontFamily: fontsFamily.manrope,
                                            fontSize: '14px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Pay Frequency:{' '}
                                    </div>{' '}
                                    <div
                                        className='text-cmGrey800'
                                        style={{
                                            fontFamily: fontsFamily.manrope,
                                            fontSize: '16px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Bi-Weekly
                                    </div>
                                </div>
                                <div className='mb-10'>
                                    <CustomDropdown
                                        label={'Select Pay Period'}
                                        // name={FIELD_KEYS.adjustment_type_id}
                                        // onChange={onChangeInputData}
                                        // value={requestData?.adjustment_type_id}
                                        // required
                                        // options={adjustmentTypeList}
                                        // valueKey='id'
                                        // searching={false}
                                        // showClear={false}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='text-lg-center text-center mt-5'>
                            <CustomButton
                                buttonSize={BUTTON_SIZE.small}
                                buttonLabel={'Assign Payroll'}
                                // onClick={handleAssignPayroll}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}

export default AssignPayrollModal
