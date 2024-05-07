import {useState} from 'react'
import RunPayrollComment from '../RunPayrollComment'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import {formattedNumberFields} from '../../../../../../../helpers/CommonHelpers'
import {MAIN_POSITTIONS_ID, getValidDate} from '../../../../../../../constants/constants'
import {editCommissionDetailsService} from '../../../../../../../services/Services'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import CustomEditIcon from '../../../../../../../customComponents/customIcons/CustomEditIcon'

const CommanCommisionRow = ({
    item,
    i,
    getCommissionDetails,
    payrollData,
    finalize_status,
    paidStatus,
}) => {
    const [editMode, setEditMode] = useState(false)

    const [comment, setComment] = useState(null)
    const [openCommentBox, setOpenCommentBox] = useState(false)
    const [adjustAmount, setAdjustAmount] = useState(item?.commission_adjustment)

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
            user_id: item?.id,
            pid: item?.pid,
            type: item?.amount_type,
            amount: adjustAmount,
            comment: comment,
        }
        editCommissionDetailsService(body)
            .then(() => {
                getCommissionDetails()
                CustomToast.success('Commission updated successfully')
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
                    {item?.pid}
                </td>
                <td
                    className='p-5 text-cmGrey800 text-nowrap'
                    style={{
                        textDecoration: 'underline',
                        fontFamily: 'Manrope',
                        fontWeight: '700',
                        fontSize: '14px',
                    }}
                >
                    {item?.customer_name}
                </td>
                <td className='p-5 text-center '>
                    {MAIN_POSITTIONS_ID.closer == item?.position_id ? 'Closer' : 'Setter' ?? '-'}
                </td>

                <td className='p-5 text-center '>{item?.customer_state ?? '-'}</td>
                <td className='p-5 text-center '>
                    <div>{item?.rep_redline ?? '-'}</div>
                </td>
                <td className='p-5'>{item?.kw ?? '-'}</td>
                <td className='p-5 text-center '>{item?.net_epc ?? '-'}</td>
                <td className='p-5'>{formattedNumberFields(item?.adders, '$')}</td>
                <td className='p-5  text-nowrap '>
                    <div className='d-flex align-items-center gap-2 text-cmGrey900'>
                        <div style={{fontWeight: 600}} className=''>
                            {formattedNumberFields(item?.amount, '$')}
                        </div>

                        <div className=''>{getValidDate(item?.date)}</div>
                    </div>
                </td>
                <td className='p-5  text-nowrap '>
                    <div className='d-flex align-items-center gap-2 text-cmGrey900'>
                        {!editMode ? (
                            <div style={{fontWeight: 600}} className=''>
                                {formattedNumberFields(adjustAmount, '$')}
                            </div>
                        ) : (
                            <div className='w-75px'>
                                <CustomInput
                                    // className=''
                                    type={INPUT_TYPE.currency}
                                    value={adjustAmount}
                                    onChange={(e) => setAdjustAmount(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </td>
                <td className='p-5 text-center '>{item?.amount_type?.toUpperCase()}</td>
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
                    commentError={commentError}
                />
            ) : null}
        </>
    )
}

export default CommanCommisionRow
