/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect, useRef} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {KTSVG, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {
    getOverrideDetailsService,
    payrollReconOverridePopUpService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {getValidDate} from '../../../../../../constants/constants'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import CustomNoData from '../../../../../../customComponents/customNoData/CustomNoData'
const modalsRoot = document.getElementById('root-modals') || document.body

const ReconOverridesTable = ({show, handleClose, userData}) => {
    const [loading, setLoading] = useState(false)
    const [overrideData, setOverrideData] = useState(null)

    useEffect(() => {
        if (show) {
            setLoading(true)
            payrollReconOverridePopUpService(userData?.user_id)
                .then((res) => setOverrideData(res?.data))
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
                    Overrides | {userData?.emp_name}
                </div>
                <div
                    className='btn btn-sm me-4 btn-icon btn-active-color-primary'
                    onClick={handleClose}
                >
                    <i className='bi bi-x-circle' style={{fontSize: '22px', color: '#616161'}}></i>
                </div>
            </div>
            <div className='' style={{borderBottom: '1px solid #EFF2F5'}}></div>

            <div className='' tyle={{position: 'relative'}}>
                <CustomLoader full visible={loading} />

                <div className='modal-body  py-lg-7 px-lg-10' s>
                    {/* table */}
                    <div className='my-sm-10 table-responsive overflow-auto rounded w-100'>
                        <table className='table'>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className='bg-cmGrey300 text-cmGrey900 '
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    {/* <th st></th> */}
                                    <th className='text-nowrap p-5'>PID</th>
                                    <th className='text-nowrap p-5 '>Customer Name</th>
                                    <th className='text-nowrap p-5 '>Override Over</th>
                                    <th className='text-nowrap p-5 '>Type</th>
                                    <th className='text-nowrap p-5 '>KW installed</th>
                                    <th className='text-nowrap p-5 '>Override</th>
                                    <th className='text-nowrap p-5 '>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {overrideData?.length > 0 ? (
                                    <>
                                        {overrideData?.map((item, i) => (
                                            <tr
                                                className=' text-cmGrey800'
                                                style={{
                                                    height: '40px',
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: 700,
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
                                                    <CustomImage
                                                        src={item?.override_over_image}
                                                        className='avatar me-3'
                                                    />{' '}
                                                    {item?.override_over_first_name}{' '}
                                                    {item?.override_over_last_name}
                                                </td>
                                                <td className='p-5 text-nowrap '>{item?.type}</td>

                                                <td className='p-5 text-nowrap text-decoration-underline cursor-pointer'>
                                                    {item?.kw}
                                                </td>
                                                <td className='p-5 text-nowrap text-cmGrey800'>
                                                    {formattedNumberFields(
                                                        item?.overrides_amount,
                                                        '$'
                                                    )}
                                                    /{item?.overrides_type}
                                                </td>
                                                <td className='p-5'>
                                                    {formattedNumberFields(item?.amount, '$')}
                                                </td>
                                                {/* <td className='p-5'>
                       {' '}
                       <form
                         className='position-relative bg-cmGrey100'
                         style={{borderRadius: '90px'}}
                         autoComplete='off'
                       >
                         <div className='bi bi-search position-absolute top-50 ms-3 translate-middle-y my-auto fs-4' />
   
                         <input
                           style={{borderRadius: '10px', fontWeight: 800}}
                           type='text'
                           className='form-control ps-10 bg-cmwhite text-cmGrey900 py-2'
                           name='search'
                           placeholder='Search'
                         />
                       </form>
                     </td> */}
                                                {/* <td className='p-5'>
                       <div className='btn bg-cmBlue-Crayola text-cmwhite py-2 fw-bold'>Apply</div>
                     </td> */}
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan={7}>
                                            <CustomNoData label={'No data found'} />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {/* <div className='d-flex align-items-center mt-5'>
                            <div></div>
                            <div className='text-nowrap p-2 ' style={{fontSize: '15px'}}>
                                <span
                                    className='text-cmGrey600 me-5'
                                    style={{fontWeight: '700', fontFamily: 'Manrope'}}
                                >
                                    Sub-Total
                                </span>
                                <span
                                    className='text-cmGrey900'
                                    style={{fontWeight: '700', fontFamily: 'Manrope'}}
                                >
                                    {formattedNumberFields(overrideData?.sub_total)}
                                </span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* buttons */}
        </Modal>,
        modalsRoot
    )
}

export {ReconOverridesTable}
