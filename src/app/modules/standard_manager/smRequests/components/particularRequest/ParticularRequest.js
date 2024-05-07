import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {
    addRequestApprovalCommentService,
    getRequestDetailsByRequestNumberService,
    updateStatusOfRequestService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {saveAs} from 'file-saver'
import {
    getUserDataSelector,
    isUserManagerSelector,
    isUserSuperAdminSelector,
} from '../../../../../../redux/selectors/AuthSelectors'
import {useSelector} from 'react-redux'
import AccessRights from '../../../../../../accessRights/AccessRights'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import {getErrorMessageFromResponse, getServerImage} from '../../../../../../helpers/CommonHelpers'
import {getValidDate} from '../../../../../../constants/constants'
import QuillEditor from '../../../../common/quill/QuillEditor'
import CustomButton, { BUTTON_SIZE, BUTTON_TYPE } from '../../../../../../customComponents/customButtton/CustomButton'

const ParticularRequest = () => {
    const naviagte = useNavigate()
    const location = useLocation()
    const userData = useSelector(getUserDataSelector)
    const [requestData, setRequestData] = useState(location?.state?.requestData)
    const [showEditor, setShowEditor] = useState(false)
    const [loading, setLoading] = useState(true)
    const [comment, setComment] = useState(null)
    const [selectedCommentAttachment, setSelectedCommentAttachment] = useState(null)
    const isManager = useSelector(isUserManagerSelector)
    const isSuperAdmin = useSelector(isUserSuperAdminSelector)

    useEffect(() => {
        getSingleRequestData()
    }, [])

    const canApproveOrDeclineAccess = useMemo(() => {
        return userData?.id == requestData?.manager_id || isSuperAdmin
    }, [isSuperAdmin, requestData?.manager_id, userData?.id])

    const getSingleRequestData = useCallback(() => {
        setLoading(true)
        getRequestDetailsByRequestNumberService(requestData?.req_no)
            .then((res) => {
                setRequestData({
                    ...requestData,
                    ...res?.data?.[0],
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }, [requestData])

    const onUpdateStatusPress = useCallback(
        (type) => {
            setLoading(true)
            updateStatusOfRequestService(requestData?.id, type)
                .then(() => {
                    if (type == 'Approved') CustomToast.success('Approved')
                    else {
                        CustomToast.success('Declined')
                    }
                    getSingleRequestData()
                })
                .catch((err) => {
                    CustomToast.error(getErrorMessageFromResponse(err))
                })
                .finally(() => setLoading(false))
        },
        [getSingleRequestData, requestData?.id]
    )

    const handleDisputedPeriodDate = (data) => {
        const date = data.split('to')
        const formattedDate = `${getValidDate(date[0], 'MM/DD/YYYY')} to ${getValidDate(date[1], 'MM/DD/YYYY')}`
        return formattedDate
    }

    const onPostComment = useCallback(() => {
        if (comment?.length > 0) {
            let body = {
                request_id: requestData?.id,
                comment,
            }
            if (selectedCommentAttachment) body.image = selectedCommentAttachment
            setLoading(true)
            addRequestApprovalCommentService(body)
                .then(() => {
                    setShowEditor(!showEditor)
                    setSelectedCommentAttachment(null)
                    setComment(null)
                    getSingleRequestData()
                    CustomToast.success('Reply posted')
                })
                .catch(() => {})
                .finally(() => setLoading(false))
        } else {
            CustomToast.error('Enter comment')
        }
    }, [comment, getSingleRequestData, requestData?.id, selectedCommentAttachment, showEditor])

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />
            <div
                className='bg-cmwhite shadow-sm pb-20'
                style={{
                    zIndex: 1,
                    marginTop: '-15px',
                    borderRadius: '10px',
                    fontFamily: 'Manrope',
                    fontSize: '14px',
                }}
            >
                <div className='d-flex justify-content-between align-items-center px-sm-10 px-2 py-5'>
                    <div className=' cursor-pointer ' onClick={() => naviagte(-1)}>
                        <i className='bi bi-box-arrow-left fs-1 text-cmGrey600 text-hover-dark cursor-pointer'></i>
                    </div>
                    {requestData?.status == 'Pending' &&
                    (isSuperAdmin || canApproveOrDeclineAccess) ? (
                        <AccessRights customCondition={canApproveOrDeclineAccess}>
                            <div className='d-flex flex-wrap gap-3'>
                                <div
                                    className='btn text-cmwhite bg-cmBlue-Crayola px-7 py-2'
                                    style={{fontWeight: '600'}}
                                    onClick={() => onUpdateStatusPress('Approved')}
                                >
                                    Approve
                                </div>
                                <div
                                    className='btn text-cmError px-7 py-2'
                                    style={{fontWeight: '600'}}
                                    onClick={() => onUpdateStatusPress('Declined')}
                                >
                                    DECLINE
                                </div>
                            </div>
                        </AccessRights>
                    ) : (
                        <div>
                            {requestData?.status == 'Approved' ? (
                                <span className='p-5 text-cmOrange' style={{fontWeight: '600'}}>
                                    In Progress
                                </span>
                            ) : requestData?.status == 'Paid With Payroll' ? (
                                <span className='p-5 text-cminfo' style={{fontWeight: '600'}}>
                                    Scheduled
                                </span>
                            ) : requestData?.status == 'Declined' ? (
                                <span className='p-5 text-cmError' style={{fontWeight: '600'}}>
                                    Declined
                                </span>
                            ) : requestData?.status == 'Paid' ? (
                                <span className='p-5 text-cmSuccess' style={{fontWeight: '600'}}>
                                    Paid
                                </span>
                            ) : (
                                <span className='p-5' style={{fontWeight: '600'}}>
                                    {requestData?.status}
                                </span>
                            )}
                        </div>
                    )}
                </div>
                {/* Tab starts */}
                <div style={{fontSize: '14px', fontFamily: 'Manrope'}}>
                    <div
                        className='bg-cmGrey300 py-5 text-cmGrey900 ps-10'
                        style={{fontFamily: 'Manrope', fontSize: '16px', fontWeight: '600'}}
                    >
                        {requestData?.req_no} - {requestData?.type}
                    </div>

                    <div style={{position: 'relative'}}>
                        <div className=''>
                            {/* Line 1 */}
                            <div className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5'>
                                <div className='d-flex flex-wrap align-items-center gap-5 w-sm-50 '>
                                    <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                        Employee Name:
                                    </div>
                                    <div>
                                        <CustomImage
                                            src={requestData?.employee_image}
                                            className='avatar'
                                            style={{width: '30px', height: '30px'}}
                                            alt='img'
                                        />
                                    </div>
                                    <div className='text-cmGrey900' style={{fontWeight: '600'}}>
                                        {requestData?.employee_name ?? '-'}
                                    </div>
                                </div>
                                <div className='d-flex flex-wrap gap-5 w-sm-50'>
                                    <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                        Request ID:
                                    </div>
                                    <div className='text-cmGrey900' style={{fontWeight: '600'}}>
                                        {requestData?.req_no}{' '}
                                    </div>
                                </div>
                            </div>
                            {/* Line 2 */}
                            <div className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5'>
                                <div className='d-flex flex-wrap gap-5 w-sm-50 '>
                                    <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                        Office Location:
                                    </div>
                                    <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                        {requestData?.office_name ?? '-'}
                                    </div>
                                </div>
                                <div className='d-flex flex-wrap gap-5 w-sm-50'>
                                    <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                        Request Date:
                                    </div>
                                    <div className='text-cmGrey900' style={{fontWeight: '600'}}>
                                        {requestData?.request_on ?? '-'}
                                    </div>
                                </div>
                            </div>
                            {/* Payroll Dispute */}
                            {requestData?.type_id == 1 && (
                                <div className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5'>
                                    <div className='d-flex flex-wrap gap-5 w-sm-50 '>
                                        <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                            Disputed Amount:
                                        </div>
                                        <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                            $ {requestData?.amount ?? 0}
                                        </div>
                                    </div>
                                    <div className='d-flex flex-wrap gap-5 w-sm-50'>
                                        <div
                                            className='text-cmGrey800 text-nowrap'
                                            style={{fontWeight: '700'}}
                                        >
                                            Disputed Period:
                                        </div>
                                        <div className='text-cmGrey900' style={{fontWeight: '600'}}>
                                            {handleDisputedPeriodDate(requestData?.pay_period)}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5'>
                                {requestData?.type_id == 1 && (
                                    <div className='d-flex flex-wrap gap-5 w-sm-50 '>
                                        <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                            Dispute Type:
                                        </div>
                                        <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                            {requestData?.dispute_type}
                                        </div>
                                    </div>
                                )}
                                {requestData?.getPid?.length > 0 ? (
                                    <div className='d-flex flex-wrap gap-5 w-sm-50'>
                                        <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                            Customer PID:
                                        </div>
                                        <div
                                            className='text-cmGrey900 text-decoration-underline'
                                            style={{fontWeight: '600'}}
                                        >
                                            {requestData?.getPid?.map((item) => (
                                                <ul style={{listStyleType: 'none'}}>
                                                    <li>
                                                        <span className='me-2 '>
                                                            {item?.pid ?? '-'}
                                                        </span>{' '}
                                                        <span>{item?.customer_name ?? '-'}</span>
                                                    </li>
                                                </ul>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            {/* Reimbursement */}
                            {requestData?.type_id == 2 && (
                                <div className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5'>
                                    <div className='d-flex flex-wrap gap-5 w-sm-50 '>
                                        <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                            Amount:
                                        </div>
                                        <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                            $ {requestData?.amount ?? 0}
                                        </div>
                                    </div>
                                    <div className='d-flex flex-wrap gap-5 w-sm-50'>
                                        <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                            Cost Date:
                                        </div>
                                        <div className='text-cmGrey900' style={{fontWeight: '600'}}>
                                            {getValidDate(requestData?.cost_date) ?? '-'}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {requestData?.type_id == 2 && (
                                <div className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5'>
                                    <div className='d-flex flex-wrap gap-5 w-sm-50 '>
                                        <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                            Cost Head:
                                        </div>
                                        <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                            {requestData?.cost_head ?? '-'}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Advance */}
                            {requestData?.type_id == 4 && (
                                <div className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5'>
                                    <div className='d-flex flex-wrap gap-5 w-sm-50 '>
                                        <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                            Amount:
                                        </div>
                                        <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                            $ {requestData?.amount ?? 0}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Line 4 */}
                            {/* Fine / Fee */}
                            {[3, 5, 6]?.includes(requestData?.type_id) && (
                                <div className='bg-cmWhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5'>
                                    <div className='d-flex flex-wrap gap-5 w-sm-50 '>
                                        <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                            Amount:
                                        </div>
                                        <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                            $ {requestData?.amount ?? 0}
                                        </div>
                                    </div>
                                    <div className='d-flex flex-wrap gap-5 w-sm-50'>
                                        <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                            Date:
                                        </div>
                                        <div className='text-cmGrey900' style={{fontWeight: '600'}}>
                                            {getValidDate(requestData?.request_date) ?? '-'}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Line 5 */}
                            {requestData?.pay_period_from && requestData?.pay_period_to ? (
                                <div
                                    className={`py-5 text-cmGrey900 px-sm-20 px-sm-0 px-5 ${
                                        [3, 4, 5, 6].includes(requestData?.type_id)
                                            ? 'bg-strip'
                                            : 'bg-white'
                                    }`}
                                >
                                    <div className='d-flex flex-wrap gap-5 '>
                                        <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                            Pay Period:
                                        </div>
                                        <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                            {requestData?.pay_period_from
                                                ? getValidDate(requestData?.pay_period_from)
                                                : '-'}{' '}
                                            -
                                            {requestData?.pay_period_to
                                                ? getValidDate(requestData?.pay_period_to)
                                                : '-'}
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {/* Line 5 */}
                            <div
                                className={`py-5 text-cmGrey900 px-sm-20 px-sm-0 px-5 ${
                                    [3, 4, 5, 6].includes(requestData?.type_id)
                                        ? 'bg-strip'
                                        : 'bg-white'
                                }`}
                            >
                                <div className='d-flex flex-wrap gap-5 '>
                                    <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                        Description:
                                    </div>
                                    <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                                        {requestData?.description}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`py-5 text-cmGrey900 px-sm-20 px-sm-0 px-5 ${
                                    ![3, 4, 5, 6].includes(requestData?.type_id)
                                        ? 'bg-strip'
                                        : 'bg-white'
                                }`}
                            >
                                <div className='d-flex flex-wrap gap-5 '>
                                    <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                        Attachments:
                                    </div>
                                    <div
                                        className='text-cmGrey900'
                                        style={{fontWeight: '700', cursor: 'pointer'}}
                                        onClick={() => {
                                            const fileName = requestData?.image?.split('/')?.[1]
                                            saveAs(getServerImage(requestData?.image), fileName)
                                        }}
                                    >
                                        {requestData?.image ?? '-'}
                                    </div>
                                </div>
                            </div>
                            {/* Line 6 */}
                            {/* <div className='bg-strip py-5 text-cmGrey900 px-sm-20 px-sm-0 px-5'>
                    <table className='table table-borderless  w-sm-25' style={{fontSize: '14px'}}>
                    <tr className=''>
                        <td className='text-cmGrey800 py-1' style={{fontWeight: 700}}>
                        Attachments:
                        </td>
                        <td
                        className='text-cmGrey900 text-decoration-underline py-1'
                        style={{fontWeight: 700}}
                        >
                        Screenshot.jpg
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td
                        className='text-cmGrey900 text-decoration-underline py-1'
                        style={{fontWeight: 700}}
                        >
                        Bills.jpg
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td
                        className='text-cmGrey900 text-decoration-underline py-1'
                        style={{fontWeight: 700}}
                        >
                        M1missing.jpg
                        </td>
                    </tr>
                    </table>
                </div> */}

                            {/* Line 8 */}
                            <div className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 px-sm-0 px-5'>
                                <div className='d-flex flex-wrap gap-5 '>
                                    <div
                                        className='text-cmGrey500'
                                        style={{fontWeight: 'bolder', fontSize: 16}}
                                    >
                                        Comments
                                    </div>
                                </div>
                            </div>
                            <div style={{width: '100%'}}>
                                {requestData?.comments?.length > 0 ? (
                                    <>
                                        {requestData?.comments?.map((item) => (
                                            <div
                                                className='bg-cmwhite py-1 text-cmGrey900 px-sm-20 px-sm-0 px-5 mb-5'
                                                key={item?.id}
                                            >
                                                <div className='d-flex flex-wrap gap-5 align-items-center '>
                                                    <div className='d-flex flex-wrap gap-3'>
                                                        <div>
                                                            <CustomImage
                                                                src={item?.user_image}
                                                                className='avatar'
                                                                style={{
                                                                    width: '30px',
                                                                    height: '30px',
                                                                }}
                                                            />
                                                        </div>

                                                        <div
                                                            className='text-cmGrey800'
                                                            style={{
                                                                fontWeight: '700',
                                                                fontSize: 16,
                                                            }}
                                                        >
                                                            {item?.user_name}:
                                                        </div>

                                                        <div>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    alignSelf: 'center',
                                                                }}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item?.comment,
                                                                }}
                                                            />

                                                            <div
                                                                className='text-cmGrey900 text-hover-primary  text-decoration-underline'
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    fontWeight: '700',
                                                                }}
                                                                onClick={() => {
                                                                    const fileName =
                                                                        item?.image?.split('/')?.[1]
                                                                    saveAs(
                                                                        getServerImage(item?.image),
                                                                        fileName
                                                                    )
                                                                }}
                                                            >
                                                                {item?.image && (
                                                                    <span className='bi bi-paperclip fs-4 text-cmBlue-Crayola' />
                                                                )}
                                                                {item?.image ?? '-'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <p
                                        className='text-cmGrey500'
                                        style={{
                                            width: '100%',
                                            marginLeft: '10%',
                                            fontFamily: 'Manrope',
                                            fontWeight: '500',
                                            fontSize: 14,
                                            padding: 10,
                                        }}
                                    >
                                        No comments found
                                    </p>
                                )}
                            </div>
                            {/* line 9 */}
                            {showEditor && (
                                <div>
                                    <div className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 px-sm-0 px-5 mb-5'>
                                        <div className='d-flex flex-wrap gap-5 '>
                                            <div
                                                className='text-cmGrey500'
                                                style={{fontWeight: 'bolder', fontSize: 16}}
                                            >
                                                Add Reply
                                            </div>
                                        </div>
                                    </div>
                                    <div className=' px-sm-20 px-5  d-sm-flex' style={{zIndex: 0}}>
                                        <div className='d-flex  mb-sm-0 mb-2 gap-3'>
                                            <div>
                                                <CustomImage
                                                    src={userData?.image}
                                                    className='avatar'
                                                    style={{width: '30px', height: '30px'}}
                                                />
                                            </div>
                                            <div
                                                className='text-cmGrey800'
                                                style={{fontWeight: '700', fontSize: 16}}
                                            >
                                                {userData?.first_name ?? ''}:&nbsp;&nbsp;
                                            </div>
                                        </div>

                                        <div className='w-sm-75 w-100'>
                                            <QuillEditor
                                                value={comment}
                                                setValue={(val) => {
                                                    setComment(val)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: '50%',
                                            marginLeft: '17%',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }} className='mt-5'
                                    >
                                        <div className='text-cmGrey800' style={{fontWeight: '700'}}>
                                            Attachment:&nbsp;&nbsp;
                                        </div>
                                        <input
                                            type='file'
                                            className='form-control'
                                            placeholder='Select file'
                                            onChange={(e) => {
                                                setSelectedCommentAttachment(e?.target?.files?.[0])
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Line 10 */}
                            {requestData?.status == 'Pending' ? (
                                <div className='mt-5 text-center'>
                                    {!showEditor && (
                                        <div
                                            className='btn text-cmwhite bg-cmBlue-Crayola px-10 py-2'
                                            style={{fontWeight: '600'}}
                                            onClick={() => setShowEditor(!showEditor)}
                                        >
                                            Add Reply
                                        </div>
                                    )}
                                    {showEditor && (
                                        <div className='d-flex justify-content-center flex-wrap gap-5'>
                                            <CustomButton
                                                type='submit'
                                                buttonType={BUTTON_TYPE.error}
                                                buttonSize={BUTTON_SIZE.small}
                                                buttonLabel={'Cancel'}
                                                onClick={() => setShowEditor(!showEditor)}
                                            />
                                            <div
                                                className='btn text-cmwhite bg-cmBlue-Crayola px-10 py-2'
                                                style={{fontWeight: '600'}}
                                                onClick={onPostComment}
                                            >
                                                Post Reply
                                            </div>
                                            {/* <div
                        className='btn text-cmGrey600 bg-cmGrey200 px-10 py-2'
                        style={{fontWeight: '600'}}
                        >
                        <i className='bi bi-paperclip text-cmGrey600 '></i>
                        Attach File
                        </div> */}
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                {/* Tab ends */}
            </div>
        </div>
    )
}

export default ParticularRequest
