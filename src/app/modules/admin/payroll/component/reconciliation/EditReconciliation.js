/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useRef, useEffect} from 'react'
import {
    formattedNumberFields,
    getErrorMessageFromResponse,
} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import {updateReconciliationDetailService} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import {getValidDate} from '../../../../../../constants/constants'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
const EditReconciliation = ({
    show,
    handleClose,
    preData,
    getReconciliationData,
    startDate,
    endDate,
}) => {
    const [commission, setCommission] = useState(null)
    const [overrides, setOverrides] = useState(null)
    const [clawback, setClawback] = useState(null)
    const [comment, setComment] = useState(null)
    const [loading, setLoading] = useState(false)
    const [commentError, setCommentError] = useState(null)

    const onSaveReconciliation = () => {
        const body = {
            reconciliation_id: preData?.id,
            user_id: preData?.user_id,
            commission_withheld: commission,
            overrides_due: overrides,
            clawback: clawback,
            comment: comment,
            start_date: getValidDate(startDate, 'YYYY/MM/DD'),
            end_date: getValidDate(endDate, 'YYYY/MM/DD'),
        }
        if (!body.comment) return setCommentError('Enter Comment')
        setLoading(true)
        updateReconciliationDetailService(body)
            .then(() => {
                getReconciliationData()
                handleClose()
                CustomToast.success('Updated Successfully')
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <CustomModal show={show} onHide={handleClose} title={'Edit Reconciliation'} maxWidth='1000'>
            <CustomLoader full visible={loading} />

            <div className='py-5'>
                <div className='py-lg-0 ms-sm-12 d-flex justify-content-center'>
                    <div className='container mt-2' style={{fontSize: '14px'}}>
                        <div className='row gap-5'>
                            <div className='col-sm'>
                                <div
                                    className='mb-4'
                                    style={{
                                        color: '',
                                        fontFamily: 'Manrope',
                                        fontSize: '15px',
                                    }}
                                >
                                    <CustomImage src={preData?.emp_img} className='avatar me-1' />
                                    <label className='text-cmGrey900' style={{fontWeight: 700}}>
                                        {preData?.emp_name}
                                    </label>
                                    <label
                                        className='ms-1 text-cmGrey700'
                                        style={{fontWeight: 500}}
                                    >
                                        ({getValidDate(startDate)}-{getValidDate(endDate)})
                                    </label>
                                </div>
                                <div
                                    className=' shadow-sm w-md-325px mb-5 bg-white border border-cmGrey200 border-2 p-3'
                                    style={{borderRadius: '10px'}}
                                >
                                    <div
                                        className='container border-bottom border-cmGrey200 border-2'
                                        style={{fontSize: '14px'}}
                                    >
                                        <div className='row g-2 my-1 p-2 align-items-center'>
                                            <div
                                                className='col-6 text-cmGrey600'
                                                style={{fontWeight: 600, fontFamily: 'Manrope'}}
                                            >
                                                Commission Withheld
                                            </div>
                                            <div
                                                className='col-6 text-cmGrey800 '
                                                style={{fontFamily: 'Manrope', fontWeight: 600}}
                                            >
                                                {formattedNumberFields(
                                                    preData?.commissionWithholding ?? '0'
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className='container border-bottom border-cmGrey200 border-2'
                                        style={{fontSize: '14px'}}
                                    >
                                        <div className='row g-2 my-1 p-2 align-items-center'>
                                            <div
                                                className='col-6 text-cmGrey700 '
                                                style={{fontWeight: 600, fontFamily: 'Manrope'}}
                                            >
                                                Overrides Due
                                            </div>
                                            <div
                                                className='col-6 text-cmGrey800'
                                                style={{fontFamily: 'Manrope', fontWeight: 600}}
                                            >
                                                {/* <label className='text-cmGrey500'>
                                                    {formattedNumberFields(
                                                        preData?.override_due,
                                                        '$'
                                                    )}
                                                </label>{' '} */}
                                                {formattedNumberFields(preData?.override_due, '$')}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className='container border-bottom border-cmGrey200 border-2'
                                        style={{fontSize: '14px'}}
                                    >
                                        <div className='row g-2 my-1 p-2 align-items-center'>
                                            <div
                                                className='col-6 text-cmGrey700'
                                                style={{fontWeight: 600, fontFamily: 'Manrope'}}
                                            >
                                                Clawbacks
                                            </div>
                                            <div
                                                className='col-6 text-cmGrey800'
                                                style={{fontFamily: 'Manrope', fontWeight: 600}}
                                            >
                                                {formattedNumberFields(preData?.deduction_due, '$')}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className='container border-bottom border-cmGrey200 border-2'
                                        style={{fontSize: '14px'}}
                                    >
                                        <div className='row g-2 my-1 p-2 align-items-center'>
                                            <div
                                                className='col-6 text-cmGrey700 '
                                                style={{fontWeight: 600, fontFamily: 'Manrope'}}
                                            >
                                                Total Due
                                            </div>
                                            <div
                                                className='col-6 text-cmGrey800'
                                                style={{fontFamily: 'Manrope', fontWeight: 600}}
                                            >
                                                {formattedNumberFields(preData?.total_due, '$')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='container ' style={{fontSize: '14px'}}>
                                        <div className='row g-2 my-1 p-2 align-items-center text-cmGrey900'>
                                            <div
                                                className='col-6 '
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '700',
                                                }}
                                            >
                                                Net Pay
                                            </div>
                                            <div
                                                className='col-6'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                {formattedNumberFields(preData?.total_paid, '$')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm'>
                                <div
                                    className=' text-cmGrey800'
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                    }}
                                >
                                    Adjust Amount
                                </div>
                                <div className='container mt-5' style={{fontSize: '14px'}}>
                                    <div className='row align-items-center'>
                                        <div
                                            className='col-sm text-cmGrey800'
                                            style={{fontWeight: 600, fontFamily: 'Manrope'}}
                                        >
                                            Commission Withheld
                                        </div>
                                        <div
                                            className='col-sm text-cmGrey800'
                                            style={{fontFamily: 'Manrope'}}
                                        >
                                            <CustomInput
                                                type={INPUT_TYPE.number}
                                                placeholder='Amount'
                                                onChange={(e) => setCommission(e.target.value)}
                                                value={commission}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='container mt-5' style={{fontSize: '14px'}}>
                                    <div className='row align-items-center'>
                                        <div
                                            className='col-sm text-cmGrey800'
                                            style={{fontWeight: 600, fontFamily: 'Manrope'}}
                                        >
                                            Overrides Due
                                        </div>
                                        <div
                                            className='col-sm text-cmGrey800'
                                            style={{fontFamily: 'Manrope'}}
                                        >
                                            <CustomInput
                                                type={INPUT_TYPE.number}
                                                placeholder='Amount'
                                                onChange={(e) => setOverrides(e.target.value)}
                                                value={overrides}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='container mt-5' style={{fontSize: '14px'}}>
                                    <div className='row align-items-center'>
                                        <div
                                            className='col-sm text-cmGrey800'
                                            style={{fontWeight: 600, fontFamily: 'Manrope'}}
                                        >
                                            Clawbacks
                                        </div>
                                        <div
                                            className='col-sm text-cmGrey800'
                                            style={{fontFamily: 'Manrope'}}
                                        >
                                            <CustomInput
                                                type={INPUT_TYPE.number}
                                                placeholder='Amount'
                                                onChange={(e) => setClawback(e.target.value)}
                                                value={clawback}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-2 w-75 mx-auto'>
                <CustomInput
                    type={INPUT_TYPE.textarea}
                    errorMessage={commentError}
                    placeholder='Add a Comment (required)'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>

            <div className='d-flex justify-content-center my-10'>
                <button
                    type='button'
                    className='text-cmwhite mb-13 mt-3 bg-cmBlue-Crayola'
                    style={{
                        height: '46px',
                        width: '187px',
                        borderRadius: '6px',
                        fontSize: '16px',
                        borderWidth: 0,
                        fontWeight: 700,
                    }}
                    onClick={() => onSaveReconciliation()}
                >
                    Edit Reconciliation
                </button>
            </div>
        </CustomModal>
    )
}

export {EditReconciliation}
