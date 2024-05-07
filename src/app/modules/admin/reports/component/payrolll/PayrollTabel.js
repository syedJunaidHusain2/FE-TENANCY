/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import Edit from '../../../sequidocs/Icon/edit.png'
import Pagination from '../../../sequidocs/component/Pagination'

import {TABLE_BORDER, formattedNumberFields} from '../../../../../../helpers/CommonHelpers'

import {useNavigate} from 'react-router-dom'
import {EditRunPayroll} from '../../../payroll/component/runpayroll/EditRunPayroll'
import {PayRollCommissionsTable} from '../../../payroll/component/runpayroll/commisonTable/PayRollCommissionsTable'
import {PayrollAdjustments} from '../../../payroll/component/runpayroll/PayrollAdjustments'
import {PayRollReimbursTable} from '../../../payroll/component/runpayroll/PayRollReimbursTable'
import {PayRollDeductionTable} from '../../../payroll/component/runpayroll/PayRollDeductionTable'
import {PayRollOverridesTable} from '../../../payroll/component/runpayroll/overrideTable/PayRollOverridesTable'
import {useSelector} from 'react-redux'
import {getCompanySettingSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'

const PayrollTabel = ({payrollTableData, activePage, onPageChange, currentPayPeriod}) => {
    const [open, setOpen] = useState(false)
    const [showCreateAppModal, setShowCreateAppModal] = useState(false)
    const [showAdjustmentModal, setShowAdjustmentModal] = useState(false)
    const [showReimbursementsModal, setShowReimbursementsModal] = useState(false)
    const [showDeductionsModal, setShowDeductionsModal] = useState(false)
    const [showOverridesModal, setShowOverridesModal] = useState(false)
    const companySetting = useSelector(getCompanySettingSelector)
    const [payrollMetaData, setPayrollMetaData] = useState(null)

    const navigate = useNavigate()

    const handleCloseCommissions = () => {
        setShowCreateAppModal(false)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleCloseAdjustment = () => {
        setShowAdjustmentModal(false)
    }

    const handleReimbursement = () => {
        setShowReimbursementsModal(false)
    }
    const handleDeduction = () => {
        setShowDeductionsModal(false)
    }
    const handleOverrides = () => {
        setShowOverridesModal(false)
    }

    return (
        <>
            <div className=' py-0 px-0 mx-0 '>
                <div className='table-responsive rounded shadow-sm'>
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
                                <th className='text-nowrap p-5 '>Employee</th>
                                <th className='text-nowrap p-5'>Position</th>
                                <th className=' p-5 text-nowrap'>Commission</th>
                                <th className=' p-5 text-nowrap'>
                                    Overrides
                                    {/* <i
                                        className='bi bi-gear ms-2 fs-5 text-cmGrey700 '
                                        onClick={() => navigate('/setting/setup')}
                                        style={{cursor: 'pointer'}}
                                    ></i> */}
                                </th>

                                <th
                                    data-toggle='tooltip'
                                    data-placement='left'
                                    title='bonuses, advances, incentives, 
                  Fine/Fee, Payroll Dispute '
                                    className=' p-5 text-nowrap'
                                >
                                    Adjustments{' '}
                                    <i
                                        className='bi bi-exclamation-circle ms-1 text-cmGrey700'
                                        style={{cursor: 'pointer'}}
                                    ></i>
                                </th>

                                <th className=' p-5 text-nowrap'>Reimbursements</th>

                                <th className='p-5 text-nowrap'>Deductions </th>
                                {companySetting?.reconciliation ? (
                                    <th className=' p-5 text-nowrap'>Reconciliation</th>
                                ) : null}

                                <th className=' p-5 text-nowrap'>Net Pay</th>
                                <th className='p-5 text-nowrap'></th>
                            </tr>
                        </thead>
                        <tbody className={TABLE_BORDER}>
                            {payrollTableData?.data?.length > 0 ? (
                                <>
                                    {payrollTableData?.data?.map((item, i) => (
                                        <tr
                                            className={`text-cmGrey700 stripRow `}
                                            style={{
                                                fontSize: '14px',
                                                fontFamily: 'Manrope',
                                                fontWeight: 600,
                                            }}
                                        >
                                            <td
                                                className='p-4 text-nowrap text-cmGrey800'
                                                style={{
                                                    textDecoration: 'underline',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '700',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                <RedirectToEmployeeProfile employeeId={item?.id}>
                                                    <CustomImage
                                                        src={item?.employee_image}
                                                        className='avatar me-3'
                                                    />{' '}
                                                    {item?.employee ?? '-'}
                                                </RedirectToEmployeeProfile>
                                            </td>

                                            <td className='text-nowrap p-5'>
                                                {item?.position ?? '-'}
                                            </td>

                                            <td
                                                className='p-5 text-nowrap text-decoration-underline cursor-pointer'
                                                onClick={() => {
                                                    setShowCreateAppModal(true)
                                                    setPayrollMetaData({
                                                        payroll_id: item?.payroll_id,
                                                        name: item?.employee,
                                                        user_id: item?.id,
                                                    })
                                                }}
                                            >
                                                {formattedNumberFields(item?.commission, '$')}
                                            </td>

                                            <td
                                                className='text-nowrap p-5 text-decoration-underline cursor-pointer'
                                                onClick={() => {
                                                    setShowOverridesModal(true)
                                                    setPayrollMetaData({
                                                        payroll_id: item?.payroll_id,
                                                        name: item?.employee,
                                                        user_id: item?.id,
                                                    })
                                                }}
                                            >
                                                {formattedNumberFields(item?.override, '$')}
                                            </td>

                                            <td
                                                className='text-nowrap p-5 text-decoration-underline cursor-pointer'
                                                onClick={() => {
                                                    setShowAdjustmentModal(true)
                                                    setPayrollMetaData({
                                                        payroll_id: item?.payroll_id,
                                                        name: item?.employee,
                                                        user_id: item?.id,
                                                    })
                                                }}
                                            >
                                                {formattedNumberFields(item?.adjustment, '$')}
                                            </td>

                                            <td
                                                className='p-5 text-nowrap text-decoration-underline cursor-pointer'
                                                onClick={() => {
                                                    setShowReimbursementsModal(true)
                                                    setPayrollMetaData({
                                                        payroll_id: item?.payroll_id,
                                                        name: item?.employee,
                                                        user_id: item?.id,
                                                    })
                                                }}
                                            >
                                                {formattedNumberFields(item?.reimbursement, '$')}
                                            </td>

                                            <td
                                                className='p-5 text-nowrap text-decoration-underline cursor-pointer'
                                                onClick={() => {
                                                    setShowDeductionsModal(true)
                                                    setPayrollMetaData({
                                                        payroll_id: item?.payroll_id,
                                                        name: item?.employee,
                                                        user_id: item?.id,
                                                    })
                                                }}
                                            >
                                                {formattedNumberFields(item?.deduction, '$')}
                                            </td>

                                            {companySetting?.reconciliation ? (
                                                <td className='p-5 text-nowrap '>
                                                    {formattedNumberFields(
                                                        item?.reconciliation,
                                                        '$'
                                                    )}
                                                </td>
                                            ) : null}

                                            <td
                                                className='p-5 text-nowrap text-cmGrey900'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '700',
                                                }}
                                            >
                                                {formattedNumberFields(item?.net_pay, '$')}
                                            </td>

                                            {item?.comment ? (
                                                <td className='p-5 text-nowrap'>
                                                    <i
                                                        // className='btn btn-secondary'
                                                        data-toggle='tooltip'
                                                        data-placement='left'
                                                        title='Reimbursement $75 for Flight'
                                                        style={{
                                                            fontSize: '20px',
                                                            cursor: 'pointer',
                                                        }}
                                                        className='bi bi-chat-fill text-hover-black text-cmOrange'
                                                    ></i>
                                                </td>
                                            ) : null}
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
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
                {payrollTableData?.data?.length ? (
                    <Pagination
                        page={activePage && activePage}
                        totalPages={payrollTableData?.last_page}
                        setPage={(changedPage) => onPageChange(changedPage)}
                    />
                ) : null}
            </div>
            <EditRunPayroll
                show={open}
                handleClose={handleClose}
                currentPayPeriod={currentPayPeriod}
            />
            <PayRollCommissionsTable
                show={showCreateAppModal}
                handleClose={handleCloseCommissions}
                payrollMetaData={{...payrollMetaData, ...currentPayPeriod}}
                report={true}
            />
            <PayrollAdjustments
                show={showAdjustmentModal}
                handleClose={handleCloseAdjustment}
                payrollMetaData={{...payrollMetaData, ...currentPayPeriod}}
                report={true}
            />
            <PayRollReimbursTable
                show={showReimbursementsModal}
                handleClose={handleReimbursement}
                payrollMetaData={{...payrollMetaData, ...currentPayPeriod}}
                report={true}
            />
            {showDeductionsModal ? (
                <PayRollDeductionTable
                    show={showDeductionsModal}
                    handleClose={handleDeduction}
                    payrollMetaData={{...payrollMetaData, ...currentPayPeriod}}
                />
            ) : null}
            <PayRollOverridesTable
                show={showOverridesModal}
                handleClose={handleOverrides}
                payrollMetaData={{...payrollMetaData, ...currentPayPeriod}}
                report={true}
            />
        </>
    )
}

export {PayrollTabel}
