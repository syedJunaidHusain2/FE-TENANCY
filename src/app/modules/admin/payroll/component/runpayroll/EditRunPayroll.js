/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {
    formattedNumberFields,
    getErrorMessageFromResponse,
} from '../../../../../../helpers/CommonHelpers'
import {
    adjustPayrollDetailService,
    updatePayrollDetailService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import {getValidDate} from '../../../../../../constants/constants'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
const EditRunPayroll = ({show, handleClose, editData, getPayrollData, currentPayPeriod}) => {
    const [data, setData] = useState({
        commission: null,
        override: null,
        deduction: null,
        clawback: null,
        adjustment: null,
        reconciliation: null,
        comment: null,
    })
    const [loading, setLoading] = useState(false)
    const [commentError, setCommentError] = useState(null)

    const handleUpdate = (field, value) => {
        const dummyData = {...data}
        dummyData[field] = value

        setData(dummyData)
    }

    const onEditPayroll = (status) => {
        setLoading(true)
        const body = {
            payroll_id: editData?.payroll_id,
            commission: data?.commission,
            override: data?.override,
            deduction: data?.deduction,
            clawback: data?.clawback,
            adjustment: data?.adjustment,
            // reconciliation: data?.reconciliation,
            comment: data?.comment,
            status: status,
        }
        updatePayrollDetailService(body)
            .then(() => getPayrollData())
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                handleClose()
                setLoading(false)
            })
    }

    const adjustPayroll = () => {
        const body = {
            payroll_id: editData?.payroll_id,
            commission_amount: data?.commission,
            overrides_amount: data?.override,
            deductions_amount: data?.deduction,
            clawbacks_amount: data?.clawback,
            adjustments_amount: data?.adjustment,
            // reconciliations_amount: data?.reconciliation,
            comment: data?.comment,
        }
        if (!body.comment) return setCommentError('Enter Comment')

        setLoading(true)
        adjustPayrollDetailService(body)
            .then(() => {
                getPayrollData()
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                handleClose()
                setLoading(false)
            })
    }
    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='1000' title={'Edit Payroll'}>
            <CustomLoader full visible={loading} />
            {/* Body Starts */}
            <div
                className='d-flex flex-wrap justify-content-between w-sm-75 mx-auto'
                style={{fontWeight: '700', fontFamily: 'Manrope', fontSize: '14px'}}
            >
                {/* block 1 */}
                <div className='w-sm-auto w-100 px-sm-0 px-5 '>
                    <div className='d-flex align-items-center gap-5'>
                        <CustomImage src={editData?.emp_img} className='avatar' />
                        <div>
                            {editData?.first_name} {editData?.last_name} (
                            {getValidDate(currentPayPeriod?.pay_period_from)} -
                            {getValidDate(currentPayPeriod?.pay_period_to)})
                        </div>
                    </div>

                    <div
                        className='my-5 card bg-cmwhite shadow-sm border border-cmGrey200 shadow-sm'
                        style={{borderRadius: '10px'}}
                    >
                        <div className='card-body my-0 p-0'>
                            <div className='d-flex justify-content-between py-2 px-5'>
                                <div className='text-cmGrey600'>Commission</div>
                                <div className='text-cmGrey800'>
                                    {formattedNumberFields(editData?.commission, '$')}
                                </div>
                            </div>
                            <hr className='m-0 p-0 text-cmGrey500' />
                            <div className='d-flex justify-content-between py-2 px-5'>
                                <div className='text-cmGrey600'>Overrides</div>
                                <div className='text-cmGrey800'>
                                    <span className='text-cmGrey500 me-1'>
                                        {formattedNumberFields(
                                            editData?.override_value_is_higher,
                                            '$'
                                        )}
                                    </span>{' '}
                                    <span>{formattedNumberFields(editData?.override, '$')}</span>
                                </div>
                            </div>
                            <hr className='m-0 p-0 text-cmGrey500' />
                            <div className='d-flex justify-content-between py-2 px-5'>
                                <div className='text-cmGrey600'>Adjustments</div>
                                <div className='text-cmGrey800'>
                                    {formattedNumberFields(editData?.adjustment, '$')}
                                </div>
                            </div>
                            <hr className='m-0 p-0 text-cmGrey500' />
                            <hr className='m-0 p-0 text-cmGrey500' />
                            <div className='d-flex justify-content-between py-2 px-5'>
                                <div className='text-cmGrey600'>Deductions</div>
                                <div className='text-cmGrey800'>
                                    {formattedNumberFields(editData?.deduction, '$')}
                                </div>
                            </div>
                            <hr className='m-0 p-0 text-cmGrey500' />

                            <div className='d-flex justify-content-between py-2 px-5'>
                                <div className='text-cmGrey600'>Clawbacks</div>
                                <div className='text-cmGrey800'>
                                    {formattedNumberFields(editData?.clawback, '$')}
                                </div>
                            </div>
                            <hr className='m-0 p-0 text-cmGrey500' />

                            <div className='d-flex justify-content-between py-2 px-5'>
                                <div className='text-cmGrey600'>Reconciliations</div>
                                <div className='text-cmGrey800'>
                                    {formattedNumberFields(editData?.reconciliation, '$')}
                                </div>
                            </div>
                            <hr className='m-0 p-0 text-cmGrey500' />
                        </div>

                        <div className='card-footer border-0 my-0 py-3 px-0 '>
                            <div className='d-flex justify-content-between py-2 px-5'>
                                <div className='text-cmGrey900'>Net Pay</div>
                                <div className='text-cmGrey900'>
                                    {formattedNumberFields(editData?.net_pay, '$')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* block 1 ends*/}
                {/* block 2 */}
                <div className='w-sm-auto w-100'>
                    <div className='mx-sm-0 mx-5' style={{fontFamily: 'Manrope'}}>
                        Adjust Amount
                    </div>

                    <div className='my-5 bg-cmwhite'>
                        <div className=''>
                            <div className='d-sm-flex justify-content-between align-items-center py-2 px-5'>
                                <div className='text-cmGrey600'>Commission</div>
                                <CustomInput
                                    type={INPUT_TYPE.number}
                                    placeholder='Amount'
                                    name='commission'
                                    onChange={(e) => handleUpdate(e.target.name, e.target.value)}
                                    value={data?.commission}
                                />
                            </div>
                            <div className='d-sm-flex justify-content-between align-items-center  py-2 px-5'>
                                <div className='text-cmGrey600'>Overrides</div>
                                <CustomInput
                                    type={INPUT_TYPE.number}
                                    placeholder='Amount'
                                    name='override'
                                    onChange={(e) => handleUpdate(e.target.name, e.target.value)}
                                    value={data?.override}
                                />
                            </div>
                            <div className='d-sm-flex justify-content-between align-items-center py-2 px-5'>
                                <div className='text-cmGrey600'>Adjustments</div>
                                <CustomInput
                                    type={INPUT_TYPE.number}
                                    placeholder='Amount'
                                    name='adjustment'
                                    onChange={(e) => handleUpdate(e.target.name, e.target.value)}
                                    value={data?.adjustment}
                                />
                            </div>
                            <div className='d-sm-flex justify-content-between align-items-center  py-2 px-5'>
                                <div className='text-cmGrey600'>Deductions</div>
                                <CustomInput
                                    type={INPUT_TYPE.number}
                                    placeholder='Amount'
                                    name='deduction'
                                    onChange={(e) => handleUpdate(e.target.name, e.target.value)}
                                    value={data?.deduction}
                                />
                            </div>
                            <div className='d-sm-flex justify-content-between align-items-center  py-2 px-5'>
                                <div className='text-cmGrey600'>Clawbacks</div>
                                <CustomInput
                                    type={INPUT_TYPE.number}
                                    placeholder='Amount'
                                    name='clawback'
                                    onChange={(e) => handleUpdate(e.target.name, e.target.value)}
                                    value={data?.clawback}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* block 2 ends*/}
            </div>
            {/* Body Ends*/}

            <div className='w-75 mx-auto mt-2 px-sm-0 px-5'>
                <CustomInput
                    type={INPUT_TYPE.textarea}
                    placeholder='Add a Comment'
                    name='comment'
                    value={data.comment}
                    onChange={(e) => handleUpdate(e.target.name, e.target.value)}
                    errorMessage={commentError}
                />
            </div>

            <div className='d-flex flex-wrap justify-content-center gap-15 text-center my-15 '>
                <CustomButton
                    buttonType={BUTTON_TYPE.primary}
                    buttonLabel='Edit Payroll'
                    onClick={adjustPayroll}
                />
                <CustomButton
                    buttonType={BUTTON_TYPE.error}
                    buttonLabel='
                        Skip Payroll'
                    onClick={() => onEditPayroll('skipped')}
                />
                <CustomButton
                    buttonType={BUTTON_TYPE.primary}
                    buttonLabel='Move to Next Payroll'
                    onClick={() => onEditPayroll('next_payroll')}
                />
                {/* <button
                    style={{fontSize: '13px', fontWeight: '700'}}
                    className='btn bg-cmBlue-Crayola text-cmwhite'
                    onClick={adjustPayroll}
                >
                    Edit Payroll
                </button>
                <button
                    style={{fontSize: '13px', fontWeight: '700'}}
                    className='btn bg-cmError text-cmError bg-opacity-10'
                    onClick={() => onEditPayroll('skipped')}
                >
                    Skip Payroll
                </button>
                <button
                    style={{fontSize: '13px', fontWeight: '700'}}
                    className='btn bg-cmBlue-Crayola text-cmwhite'
                    onClick={() => onEditPayroll('next_payroll')}
                >
                    Move To Next Payroll
                </button> */}
            </div>
        </CustomModal>
    )
}

export {EditRunPayroll}
