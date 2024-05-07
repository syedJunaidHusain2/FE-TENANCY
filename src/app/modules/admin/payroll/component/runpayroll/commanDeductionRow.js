import React, {useState} from 'react'
import {formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import {getValidDate} from '../../../../../../constants/constants'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import {editCommissionDetailsService} from '../../../../../../services/Services'
import RunPayrollComment from './RunPayrollComment'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomEditIcon from '../../../../../../customComponents/customIcons/CustomEditIcon'

const CommanDeductionRow = ({item, i, getDeductionDetails, payrollData, finalize_status}) => {
    const [editMode, setEditMode] = useState(false)

    const [comment, setComment] = useState(null)
    const [openCommentBox, setOpenCommentBox] = useState(false)
    const [amount, setAmount] = useState(0)
    const [commentError, setCommentError] = useState(null)

    const closeCommentBox = () => {
        setOpenCommentBox(false)
        setEditMode(false)
    }
    const handleCommentSubmit = (e) => {
        e.preventDefault()
        if (!comment) return setCommentError('Enter comment')
        closeCommentBox()
        const body = {
            payroll_id: payrollData?.payroll_id,
            user_id: payrollData?.userId,
            // pid: item?.pid,
            // type: item?.amount_type,
            cost_center_id: item?.cost_center_id,
            amount: amount,
            // comment: comment,
        }
        editCommissionDetailsService(body)
            .then(() => {
                getDeductionDetails()
                CustomToast.success('Deduction updated successfully')
            })
            .finally(() => {})
    }

    return (
        <>
            <tr
                key={i}
                className=' text-cmGrey700'
                style={{
                    height: '40px',
                    fontSize: '14px',
                    fontFamily: 'Manrope',
                    fontWeight: 500,
                }}
            >
                <td className='p-5 fw-bold text-decoration-underline text-cmGrey800'>
                    {item?.Type ?? '-'}
                </td>

                <td className='p-5 text-cmGrey800 text-nowrap'>
                    <div
                        style={{
                            fontFamily: 'Manrope',
                            fontWeight: '700',
                            fontSize: '14px',
                        }}
                    >
                        {formattedNumberFields(item?.Amount, '$')}
                    </div>
                </td>

                <td className='p-5  '>
                    {formattedNumberFields(item?.Limit, '%') ?? '-'}
                </td>

                <td className='p-5  '>
                    <div>{formattedNumberFields(item?.Total, '$')}</div>
                </td>
                <td className='p-5  '>
                    <div>{item?.Outstanding ? formattedNumberFields(item?.Outstanding) : '-'}</div>
                </td>
                <td className='p-5  '>
                    {editMode ? (
                        <div className='w-100px'>
                            <CustomInput
                                type={INPUT_TYPE.number}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div
                            style={{
                                fontFamily: 'Manrope',
                                fontWeight: '700',
                                fontSize: '14px',
                            }}
                        >
                            {formattedNumberFields(amount, '$')}
                        </div>
                    )}{' '}
                </td>
                {!finalize_status ? (
                    <td className='p-5 '>
                        {!editMode ? (
                            <CustomEditIcon onClick={() => setEditMode(true)} />
                        ) : (
                            <div
                                className='btn bg-cmBlue-Crayola text-cmwhite fw-bold px-5 py-2'
                                onClick={() => setOpenCommentBox(true)}
                            >
                                Save
                            </div>
                        )}
                    </td>
                ) : null}
            </tr>
            {openCommentBox ? (
                <RunPayrollComment
                    comment={comment}
                    setComment={setComment}
                    show={openCommentBox}
                    onHide={closeCommentBox}
                    handleSubmit={handleCommentSubmit}
                    commentError={commentError}
                />
            ) : null}
        </>
    )
}

export default CommanDeductionRow
