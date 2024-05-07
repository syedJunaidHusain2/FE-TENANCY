/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import {useEffect, useState} from 'react'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import {getPayrollDeductionDetailService} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CommanCommisionRow from './commisonTable/CommanCommisionRow'
import CommanDeductionRow from './commanDeductionRow'

const PayRollDeductionTable = ({show, handleClose, payrollMetaData, finalize_status = 1}) => {
    const [deductionData, setDeductionData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getDeductionDetails()
    }, [payrollMetaData])

    const getDeductionDetails = () => {
        setLoading(true)
        const body = {
            payroll_id: payrollMetaData?.payroll_id,
            user_id: payrollMetaData?.user_id,
            pay_period_from: payrollMetaData?.pay_period_from,
            pay_period_to: payrollMetaData?.pay_period_to,
        }
        getPayrollDeductionDetailService(body)
            .then((res) => {
                setDeductionData(res.data)
            })
            .finally(() => setLoading(false))
    }
    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            maxWidth='1300'
            title={`Deductions | ${payrollMetaData?.name}`}
        >
            <CustomLoader full visible={loading} />
            <div className=''>
                <div className='modal-body px-lg-10'>
                    {/* table */}
                    <div className='my-sm-10 table-responsive overflow-auto rounded'>
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
                                    <th className='text-nowrap p-5'>Type</th>
                                    <th className='text-nowrap p-5 text-nowrap '>Amount</th>
                                    <th className=' p-5 text-nowrap'>Limit</th>
                                    <th className=' p-5 text-nowrap'>Total</th>
                                    <th className='text-nowrap p-5'>Outstanding</th>
                                    <th className='text-nowrap p-5'>Adjustment</th>
                                    <th className='p-5 text-nowrap'></th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {deductionData?.list?.length > 0 ? (
                                    <>
                                        {deductionData?.list?.map((item, i) => (
                                            <CommanDeductionRow
                                                item={item}
                                                i={i}
                                                payrollData={payrollMetaData}
                                                getDeductionDetails={getDeductionDetails}
                                                finalize_status={finalize_status}
                                            />
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
                        <div className='d-flex align-items-center mt-5 justify-content-between'>
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
                                    {formattedNumberFields(deductionData?.subtotal)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}

export {PayRollDeductionTable}
