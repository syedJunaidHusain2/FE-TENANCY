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
const modalsRoot = document.getElementById('root-modals') || document.body

const ReconCommissionTable = ({show, handleClose, userData}) => {
    const [loading, setLoading] = useState(false)
    const [commissionData, setCommissionData] = useState(null)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        if (show) {
            setLoading(true)
            payrollReconCommissionPopUpService(userData?.user_id)
                .then((res) => setCommissionData(res?.data))
                .finally(() => setLoading(false))
        }
    }, [userData])

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
                    Commissions | {userData?.emp_name}
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
                    {/* table */}
                    {/* {!editMode ? (
          <div
            className='float-end btn bg-cmBlue-Crayola py-2 mb-5 text-cmwhite '
            onClick={handleEdit}
          >
            Edit
          </div>
        ) : (
          <div className='float-end d-flex align-items-center mb-5 '>
            <div className='btn py-2  text-cmGrey600' onClick={handleEdit}>
              Cancel
            </div>
            <div className='btn bg-cmBlue-Crayola py-2 text-cmwhite' onClick={handleEdit}>
              Save
            </div>
          </div>
        )} */}
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
                                    <th className='text-nowrap p-5'>PID</th>
                                    <th className='text-nowrap p-5 text-nowrap '>Customer</th>
                                    <th className=' p-5 text-nowrap'>State</th>
                                    <th className=' p-5 text-nowrap'>Rep Redline</th>
                                    <th className='text-nowrap p-5'>KW</th>
                                    <th className=' p-5 text-nowrap'>Net EPC</th>
                                    <th className=' p-5 text-nowrap'>Adders</th>
                                    <th className=' p-5 text-nowrap'>Amount</th>
                                    <th className='p-5 text-nowrap'>Type</th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {commissionData?.length > 0 ? (
                                    <>
                                        {commissionData?.map((item, i) => (
                                            <tr
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
                                                <td className='p-5 '>
                                                    {item?.customer_state ?? '-'}
                                                </td>
                                                <td className='p-5  '>
                                                    {item?.rep_redline ?? '-'}
                                                </td>
                                                <td className='p-5'>{item?.kw ?? '-'}</td>
                                                <td className='p- 5  '>
                                                    {item?.net_epc ?? '-'}
                                                </td>
                                                <td className='p-5'>
                                                    {formattedNumberFields(item?.adders, '$')}
                                                </td>
                                                <td className='p-5 d-flex text-cmGrey900 text-nowrap '>
                                                    {!editMode ? (
                                                        <div
                                                            style={{fontWeight: 600}}
                                                            className='me-5'
                                                        >
                                                            {formattedNumberFields(
                                                                item?.amount,
                                                                '$'
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className=''>
                                                            <input
                                                                type='text'
                                                                className='w-75 form-control py-1'
                                                            />
                                                        </div>
                                                    )}
                                                    <div className=''>
                                                        {getValidDate(item?.date)}
                                                    </div>
                                                </td>
                                                <td className='p-5  '>{item?.type}</td>
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
                                {formattedNumberFields(commissionData?.subtotal, '$')}
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

export {ReconCommissionTable}
