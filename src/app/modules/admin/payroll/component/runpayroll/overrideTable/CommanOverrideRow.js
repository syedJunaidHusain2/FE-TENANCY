import React, {useState} from 'react'
import CustomImage from '../../../../../../../customComponents/customImage/CustomImage'
import {formattedNumberFields} from '../../../../../../../helpers/CommonHelpers'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import {editOverrideDetailsService} from '../../../../../../../services/Services'
import RunPayrollComment from '../RunPayrollComment'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import CustomEditIcon from '../../../../../../../customComponents/customIcons/CustomEditIcon'

const CommanOverrideRow = ({
    item,
    i,
    payrollData,
    getOverrideDetails,
    finalize_status,
    paidStatus,
}) => {
    const [editMode, setEditMode] = useState(false)
    const [amount, setAmount] = useState(item?.override_adjustment)

    const [comment, setComment] = useState(null)
    const [openCommentBox, setOpenCommentBox] = useState(false)
    const [loading, setLoading] = useState(false)

    const closeCommentBox = () => {
        setOpenCommentBox(false)
        setEditMode(false)
    }
    const handleCommentSubmit = (e) => {
        e.preventDefault()
        closeCommentBox()
        const body = {
            payroll_id: payrollData?.payroll_id,
            user_id: item?.id,
            pid: item?.pid,
            type: item?.type,
            amount: amount,
            comment: comment,
        }
        editOverrideDetailsService(body)
            .then(() => {
                getOverrideDetails()
                CustomToast.success('Override updated successfully')
            })
            .finally(() => {})
    }
    return (
        <>
            <tr
                key={i}
                className=' text-cmGrey800'
                style={{
                    height: '40px',
                    fontSize: '14px',
                    fontFamily: 'Manrope',
                    fontWeight: 700,
                    position: 'relative',
                }}
            >
                <td
                    className='p-5 text-nowrap '
                    style={{
                        textDecoration: 'underline',
                        fontFamily: 'Manrope',
                        fontWeight: '700',
                        fontSize: '14px',
                    }}
                >
                    {item?.pid}
                </td>
                <td
                    className='p-5 text-nowrap '
                    style={{
                        textDecoration: 'underline',
                        fontFamily: 'Manrope',
                        fontWeight: '700',
                        fontSize: '14px',
                    }}
                >
                    {item?.customer_name}
                </td>
                <td
                    className='p-5 text-nowrap '
                    style={{
                        textDecoration: 'underline',
                        fontFamily: 'Manrope',
                        fontWeight: '700',
                        fontSize: '14px',
                    }}
                >
                    <CustomImage src={item?.image} className='avatar me-3' /> {item?.first_name}{' '}
                    {item?.last_name}
                </td>
                <td className='p-5 text-nowrap '>{item?.type}</td>
                {/* <td className='p-5 text-nowrap '>{item?.accounts}</td> */}
                <td className='p-5 text-nowrap text-decoration-underline cursor-pointer'>
                    {item?.kw_installed}
                </td>
                <td className='p-5 text-nowrap text-cmGrey800'>
                    {item?.type == 'Stack'
                        ? `${formattedNumberFields(item?.calculated_redline, '$', false)} per watt`
                        : `${formattedNumberFields(
                              item?.override_amount,
                              item?.override_type == 'percent' ? '' : '$',
                              false
                          )} ${item?.override_type == 'percent' ? '%' : item?.override_type}`}
                </td>

                <td className='p-5'>
                    <div>{formattedNumberFields(item?.total_amount, '$')}</div>
                </td>
                <td className='p-5'>
                    {' '}
                    {!editMode ? (
                        <div>{formattedNumberFields(amount, '$')}</div>
                    ) : (
                        <div className='w-75px'>
                            <CustomInput
                                type={INPUT_TYPE.currency}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    )}
                </td>

                {!finalize_status && paidStatus ? (
                    <td className='p-5 text-center'>
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
                />
            ) : null}
        </>
    )
}

export default CommanOverrideRow
