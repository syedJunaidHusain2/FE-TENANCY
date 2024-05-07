/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect, useRef} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {
    payrollReconClawbackPopUpService,
    payrollReconCommissionPopUpService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {getValidDate} from '../../../../../../constants/constants'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
const modalsRoot = document.getElementById('root-modals') || document.body

const ReconAdjustmentTable = ({show, handleClose, userData}) => {
    const [loading, setLoading] = useState(false)
    const [clawbackData, setClawbackData] = useState(null)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        if (show) {
            setLoading(true)
            payrollReconClawbackPopUpService(userData?.user_id)
                .then((res) => setClawbackData(res?.data))
                .finally(() => setLoading(false))
        }
    }, [userData])

    const removeAdjustment = (item) => {
        const body = {
            user_id: item?.id,
        }
        CustomDialog.warn('Are you sure you want to remove this adjustment ?', () => {
            setLoading(true)
            // deleteAdjustmentDetailsService(body).then(() => {
            //     getAdjustmentDetails()
            // })
        })
    }

    return createPortal(
        <Modal
            id='kt_modal_create_app'
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-sm-1000px w-100 p-2 mx-auto'
            show={show}
            onHide={handleClose}
            backdrop={true}
        >
            <div className='d-flex justify-content-between align-items-center me-sm-5 my-3'>
                <div></div>
                <div className='text-cmBlack' style={{fontWeight: '600', fontSize: '16px'}}>
                    Adjustment | {userData?.emp_name}
                </div>
                <div
                    className='btn btn-sm me-4 btn-icon btn-active-color-primary'
                    onClick={handleClose}
                >
                    <i className='bi bi-x-circle' style={{fontSize: '22px', color: '#616161'}}></i>
                </div>
            </div>
            <div className='' style={{borderBottom: '1px solid #EFF2F5'}}></div>

            <div style={{position: 'relative'}}>
                <CustomLoader full visible={loading} />
                <div className='py-lg-7 px-lg-10 px-3 py-3'>
                    <div className='table-responsive overflow-auto rounded w-100 shadow-sm'>
                        <table className='table'>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className='bg-cmGrey300 text-cmGrey900'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='text-nowrap p-5'>Approved By</th>
                                    <th className='text-nowrap p-5 text-nowrap '>Date</th>
                                    <th className=' p-5 text-nowrap'>Type</th>
                                    <th className=' p-5 text-nowrap'> Amount</th>
                                    <th className='text-nowrap p-5'>Description</th>
                                    <th className=' p-6 '></th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {clawbackData?.length > 0 ? (
                                    <>
                                        {clawbackData?.map((item, i) => (
                                            <tr
                                                className=' text-cmGrey700'
                                                style={{
                                                    height: '40px',
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                <td className='p-5 fw-bold  text-cmGrey800'>
                                                    {item?.first_name}{' '}
                                                    {item?.last_name}
                                                </td>
                                                <td
                                                    className='p-5 text-cmGrey800 text-nowrap'
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontWeight: '700',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    {getValidDate(item?.date)}
                                                </td>
                                                <td className='p-5  text-cmGrey800'>
                                                    {item?.type ?? '-'}
                                                </td>
                                                <td className='p-5  text-cmGrey800'>
                                                    {formattedNumberFields(item?.amount, '$')}
                                                </td>
                                                <td className='p-5'>{item?.description ?? '-'}</td>
                                                <td
                                                    className='p-5 text-nowrap cursor-pointer'
                                                    onClick={() => removeAdjustment(item)}
                                                >
                                                    <i className='bi bi-x-circle fs-3 text-cmError'></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: 'Manrope',
                                                fontWeight: '500',
                                                fontSize: 14,
                                                paddingTop: 20,
                                                paddingBottom: 20,
                                            }}
                                        >
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* <div className='d-flex align-items-center justify-content-between mx-10 mt-5'>
                        <div></div>
                        <div style={{fontSize: '15px'}}>
                            <span
                                className='text-cmGrey600 me-5 p-1 '
                                style={{fontWeight: '700', fontFamily: 'Manrope'}}
                            >
                                Sub-Total
                            </span>
                            <span
                                className='text-cmGrey900'
                                style={{fontWeight: '700', fontFamily: 'Manrope'}}
                            >
                                {formattedNumberFields(clawbackData?.subtotal, '$')}
                            </span>
                        </div>
                    </div> */}
                </div>
            </div>
            {/* buttons */}
        </Modal>,
        modalsRoot
    )
}

export {ReconAdjustmentTable}
