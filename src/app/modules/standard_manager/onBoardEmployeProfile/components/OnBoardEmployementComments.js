import React, {useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {
    addLeadCommentsService,
    getLeadCommentsService,
    replyLeadCommentsService,
} from '../../../../../services/Services'
import {useLocation} from 'react-router-dom'
import {getUserDataSelector} from '../../../../../redux/selectors/AuthSelectors'
import {useSelector} from 'react-redux'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import {getErrorMessageFromResponse} from '../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'

const OnBoardEmployementComments = () => {
    const location = useLocation()
    const [commentsData, setCommentsData] = useState(null)
    const [comment, setComment] = useState(null)
    const [commentReply, setCommentReply] = useState(null)
    const [isReply, setisReply] = useState(false)
    const [selcetedComment, setSelcetedComment] = useState(null)

    const loggedUserData = useSelector(getUserDataSelector)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getComments()
    }, [location?.state?.leadId])
    const getComments = () => {
        setLoading(true)
        getLeadCommentsService(location?.state?.leadId)
            .then((res) => setCommentsData(res?.data))
            .finally(() => setLoading(false))
    }
    const onAddComment = () => {
        if (!comment) return CustomToast.error('Enter comment')
        setLoading(true)
        const body = {
            lead_id: location?.state?.leadId,
            user_id: location?.state?.userId,
            comments: comment,
        }
        addLeadCommentsService(body)
            .then(() => {
                setComment('')
                getComments()
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }
    const onCommentReply = (data) => {
        if (!commentReply) return CustomToast.error('Add reply first')
        setLoading(true)
        const body = {
            comment_id: data?.id,
            comment_reply: commentReply,
        }
        replyLeadCommentsService(body)
            .then(() => {
                setSelcetedComment(null)
                setCommentReply(null)
                getComments()
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }
    return (
        <div
            className='mb-20 bg-cmwhite shadow-sm px-5 py-10'
            style={{
                fontWeight: '700',
                fontFamily: 'Manrope',
                borderRadius: '10px',
                position: 'relative',
            }}
        >
            <CustomLoader full visible={loading} />

            {/* body */}
            <div className='ms-sm-10 mb-10 w-sm-75'>
                {/* input box */}
                <div className='d-flex flex-wrap gap-5 align-items-start mb-5'>
                    <div className='text-cmGrey800' style={{fontWeight: '700', fontSize: '14px'}}>
                        Comment
                    </div>
                    <textarea
                        rows='3'
                        className='form-control  rounded'
                        placeholder='Enter Comment'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment || ''}
                    ></textarea>
                </div>
                <div className='text-end '>
                    <CustomButton onClick={() => onAddComment()} buttonLabel='Add Comment' />
                </div>
            </div>
            {/* comments */}
            {commentsData?.length > 0 ? (
                commentsData?.map((item, index) => (
                    <div key={index}>
                        <div className='d-flex flex-wrap justify-content-between me-10' key={index}>
                            <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5'>
                                <div className='d-flex align-items-center gap-3'>
                                    <CustomImage
                                        src={item?.employee_image}
                                        className='avatar bg-dark'
                                    />
                                    <div>{item?.employee}:</div>
                                </div>
                                <div>{item?.comments}</div>
                            </div>
                            <div>{item?.day_time}</div>
                        </div>
                        {item?.reaply?.length > 0 && (
                            <div className='text-cmGrey500 w-50 ms-12 cursor-pointer'>Reply</div>
                        )}
                        {item?.reaply?.map((reply) => (
                            <div
                                className='d-flex flex-wrap justify-content-between ms-10 mt-5'
                                key={reply?.comment_reply}
                            >
                                <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5'>
                                    <div className='d-flex align-items-center gap-3'>
                                        <CustomImage
                                            src={item?.employee_image}
                                            alt=''
                                            className='avatar bg-dark'
                                        />
                                        <div>{item?.employee}:</div>
                                    </div>
                                    <div key={reply?.comment_reply}>{reply?.comment_reply}</div>
                                </div>
                                {/* <div>{item?.day_time}</div> */}
                            </div>
                        ))}

                        {selcetedComment != index && (
                            <div className='text-start mt-5 w-50 ms-10'>
                                <CustomButton
                                    buttonSize={BUTTON_SIZE.small}
                                    onClick={() => {
                                        setSelcetedComment(index)
                                    }}
                                    buttonLabel='Add Reply'
                                />
                            </div>
                        )}
                        {index !== commentsData?.length - 1 && <hr></hr>}
                        {selcetedComment == index && (
                            <div className='ms-sm-10 mb-10 w-sm-75'>
                                <div className='d-flex flex-wrap gap-5 align-items-start mb-5'>
                                    <div
                                        className='text-cmGrey800'
                                        style={{fontWeight: '600', fontSize: '12px'}}
                                    >
                                        reply
                                    </div>

                                    <textarea
                                        rows='3'
                                        className='form-control  rounded'
                                        placeholder='Enter Reply'
                                        onChange={(e) => setCommentReply(e.target.value)}
                                        value={commentReply || ''}
                                    ></textarea>
                                </div>

                                <div className='text-end'>
                                    <span className='d-flex gap-8 justify-content-end'>
                                        <CustomButton
                                            buttonType={BUTTON_TYPE.error}
                                            buttonSize={BUTTON_SIZE.small}
                                            onClick={() => setSelcetedComment(null)}
                                            buttonLabel='Cancel'
                                        />
                                        <CustomButton
                                            buttonSize={BUTTON_SIZE.small}
                                            onClick={() => onCommentReply(item)}
                                            buttonLabel='Post Reply'
                                        />
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className='d-flex justify-item-between' key='no-reply'>
                    No Reply
                </div>
            )}
        </div>
    )
}

export default OnBoardEmployementComments
