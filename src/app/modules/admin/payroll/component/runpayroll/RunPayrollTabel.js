import React, {useMemo, useRef, useState} from 'react'
import {PayrollAdjustments} from './PayrollAdjustments'
import {PayRollCommissionsTable} from './commisonTable/PayRollCommissionsTable'
import {PayRollDeductionTable} from './PayRollDeductionTable'
import {PayRollReimbursTable} from './PayRollReimbursTable'
import ViewSummary from './ViewSummary'
import Pagination from '../../../sequidocs/component/Pagination'
import {
    TABLE_BORDER,
    formattedNumberFields,
    getErrorMessageFromResponse,
} from '../../../../../../helpers/CommonHelpers'

import {PayRollOverridesTable} from './overrideTable/PayRollOverridesTable'
import {useSelector} from 'react-redux'
import {getCompanySettingSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import CustomCheckbox from '../../../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomArrow, {
    ARROW_DIRECTION,
} from '../../../../../../customComponents/customIcons/CustomIcons'
import {TieredMenu} from 'primereact/tieredmenu'
import {PAYROLL_PROCESS_STATUS} from '../../../../../../constants/constants'
import {
    undoMoveToNextPayrollService,
    undoPaidPayrollService,
    undoReconPayrollService,
} from '../../../../../../services/Services'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import ViewPayrollRequestModal from './ViewPayrollRequestModal'
import {useNavigate} from 'react-router-dom'
import CustomTooltip from '../../../../../../customComponents/customTooltip/CustomTooltip'
import {KTSVG} from '../../../../../../_metronic/helpers'
const RunPayrollTabel = ({
    selectedPayroll,
    setSelectedPayrollData = () => {},
    tableData,
    finalize_status,
    activePage,
    onPageChange,
    getPayrollData,
    currentPayPeriod,
    setSelectedPageType,
    selectedPageType,
    isAllPayrollPaid,
    pay_period_from,
    pay_period_to,
}) => {
    const [showCreateAppModal, setShowCreateAppModal] = useState(false)
    const [showAdjustmentModal, setShowAdjustmentModal] = useState(false)
    const [showReimbursementsModal, setShowReimbursementsModal] = useState(false)
    const [showDeductionsModal, setShowDeductionsModal] = useState(false)
    const [showOverridesModal, setShowOverridesModal] = useState(false)
    const [showRequestModal, setShowRequestModal] = useState(false)
    const companySetting = useSelector(getCompanySettingSelector)
    const [payrollMetaData, setPayrollMetaData] = useState(null)
    const menu = useRef(null)
    const navigate = useNavigate()

    // const items =
    //     tableData?.last_page > 1
    //         ? [
    //                 {
    //                     label: 'Select This Page Only',
    //                     command: () => handleSelectThisPage(),
    //                 },
    //               {
    //                   label:
    //                       selectedPageType == 'all_pages'
    //                           ? 'Cancel all page selection'
    //                           : 'Select All Page',
    //                   command: (e) => handleSelectAllPage(),
    //               },
    //           ]
    //         : [
    //               {
    //                   label: 'Select This Page',
    //                   command: () => handleSelectThisPage(),
    //               },
    //           ]

    const items =
        selectedPageType == 'all_pages'
            ? [
                  {
                      label: 'Cancel all page selection',
                      command: (e) => {
                          setSelectedPageType(null)
                          setSelectedPayrollData([])
                      },
                  },
              ]
            : [
                  {
                      label: 'Select All Pages',
                      command: (e) => {
                          handleSelectAllPage()
                      },
                  },
              ]

    const handleCloseCommissions = () => {
        setShowCreateAppModal(false)
        getPayrollData()
    }
    const handleCloseAdjustment = () => {
        setShowAdjustmentModal(false)
        getPayrollData()
    }

    const handleReimbursement = () => {
        setShowReimbursementsModal(false)
    }
    const handleDeduction = () => {
        setShowDeductionsModal(false)
        getPayrollData()
    }
    const handleOverrides = () => {
        setShowOverridesModal(false)
        getPayrollData()
    }

    const handleCheckbox = (userData, e) => {
        let data = [...selectedPayroll]
        const isExistInData = data.some((item) => item == userData?.payroll_id)
        if (isExistInData) data = data.filter((item) => item != userData?.payroll_id)
        else data.push(userData?.payroll_id)
        setSelectedPayrollData(data)
    }

    const isAllSelected = useMemo(() => {
        const data = []
        tableData?.data
            ?.filter(
                (item) =>
                    !item?.is_mark_paid &&
                    ![PAYROLL_PROCESS_STATUS.paid, PAYROLL_PROCESS_STATUS.finilize].includes(
                        Number(item?.status_id)
                    )
            )
            ?.map((item) => data.push(selectedPayroll.includes(item?.payroll_id)))
        return data?.length > 0 ? data.every((item) => item) : false
    }, [tableData?.data, selectedPayroll])

    const handleSelectThisPage = () => {
        selectAllCheckbox()
        // if (!isAllSelected) setSelectedPageType('this_page')
    }
    const handleSelectAllPage = () => {
        if (!isAllSelected) {
            setSelectedPageType('all_pages')
            selectAllCheckbox()
        } else {
            setSelectedPayrollData([])
            setSelectedPageType(null)
        }
    }

    const selectAllCheckbox = (e) => {
        if (isAllSelected) {
            setSelectedPageType(null)
            let data = [...selectedPayroll]
            tableData?.data?.map((item) => {
                data = data.filter((payrollItem) => payrollItem != item?.payroll_id)
            })
            setSelectedPayrollData(data)
        } else {
            const data = [...selectedPayroll]
            tableData?.data?.map((item) => {
                if (
                    !item?.is_mark_paid &&
                    ![PAYROLL_PROCESS_STATUS.paid, PAYROLL_PROCESS_STATUS.finilize].includes(
                        Number(item?.status_id)
                    ) &&
                    !data.includes(item?.payroll_id)
                )
                    data.push(item?.payroll_id)
            })
            setSelectedPayrollData(data)
        }
    }

    const handleUndo = (item) => {
        let body = {
            payroll_id: item?.payroll_id,
        }

        if (item?.is_mark_paid) {
            const paidBody = {
                payrollId: item?.payroll_id,
            }
            CustomDialog.warn('Are you sure want to undo this paid ', () => {
                undoPaidPayrollService(paidBody)
                    .then(() => getPayrollData())
                    .catch((e) => CustomToast.error(getErrorMessageFromResponse(e)))
            })
        } else if (item?.status_id == 6) {
            CustomDialog.warn('Are you sure want to undo this recon', () => {
                undoReconPayrollService(body)
                    .then(() => getPayrollData())
                    .catch((e) => CustomToast.error(getErrorMessageFromResponse(e)))
            })
        } else if (item?.PayrollShiftHistorie_count > 0) {
            body.pay_period_from = pay_period_from
            body.pay_period_to = pay_period_to
            CustomDialog.warn('Are you sure want to undo this next payroll', () => {
                undoMoveToNextPayrollService(body)
                    .then(() => getPayrollData())
                    .catch((e) => CustomToast.error(getErrorMessageFromResponse(e)))
            })
        }
    }

    return (
        <>
            <div className=' p-0  bg-cmwhite rounded shadow-sm' style={{marginLeft: '-20px'}}>
                <div className='table-responsive shadow-none overflow-auto'>
                    <table className='table rounded' style={{tableLayout: 'fixed', width: '100%'}}>
                        <thead className={TABLE_BORDER}>
                            <tr
                                className='bg-cmGrey300 text-cmGrey900'
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <th className='px-0' style={{width: '65px'}}>
                                    {!finalize_status && tableData?.data?.length > 0 ? (
                                        <div className='d-flex gap-2 ms-3 mb-1'>
                                            {!isAllPayrollPaid && !finalize_status ? (
                                                <CustomCheckbox
                                                    checked={isAllSelected}
                                                    onChange={(e) => selectAllCheckbox(e)}
                                                />
                                            ) : null}
                                            {!isAllPayrollPaid && tableData?.last_page > 1 ? (
                                                <CustomArrow
                                                    arrowDirection={ARROW_DIRECTION.down}
                                                    onClick={(e) => {
                                                        menu.current.toggle(e)
                                                    }}
                                                />
                                            ) : null}
                                            <TieredMenu
                                                className='bg-cmwhite text-center'
                                                style={{borderRadius: '10px'}}
                                                model={items}
                                                popup
                                                ref={menu}
                                                breakpoint='767px'
                                            />
                                        </div>
                                    ) : null}
                                </th>

                                <th className=' p-3 px-2' style={{width: '200px'}}>
                                    Employee
                                </th>

                                <th className=' p-3' style={{width: '80px'}}>
                                    Request
                                </th>

                                {/* <th className=' p-3'>Position</th> */}
                                <th className=' p-3' style={{width: '115px'}}>
                                    Commission
                                </th>
                                <th className=' p-3' style={{width: '120px'}}>
                                    Overrides{' '}
                                    <i
                                        className='bi bi-gear ms-2 fs-5 text-cmGrey700 '
                                        onClick={() => navigate('/setting/setup')}
                                        style={{cursor: 'pointer'}}
                                    ></i>
                                </th>

                                <th
                                    style={{width: '135px'}}
                                    data-toggle='tooltip'
                                    data-placement='left'
                                    title='bonuses, advances, incentives, 
                  Fine/Fee, Payroll Dispute '
                                    className=' p-3 '
                                >
                                    Adjustments{' '}
                                    <i
                                        className='bi bi-exclamation-circle ms-1 text-cmGrey700'
                                        style={{cursor: 'pointer'}}
                                    ></i>
                                </th>

                                <th className=' p-3' style={{width: '135px'}}>
                                    Reimbursements
                                </th>

                                <th className='p-3' style={{width: '110px'}}>
                                    Deductions{' '}
                                </th>
                                {companySetting?.reconciliation ? (
                                    <th className='p-3' style={{width: '120px'}}>
                                        Reconciliation
                                    </th>
                                ) : null}

                                <th className=' p-3' style={{width: '120px'}}>
                                    Net Pay
                                </th>
                                <th className='p-3' style={{width: '60px'}}></th>
                            </tr>
                        </thead>
                        <tbody className={TABLE_BORDER}>
                            {tableData?.data?.length > 0 ? (
                                <>
                                    {tableData?.data?.map((item, i) => {
                                        let isChecked = selectedPayroll?.includes(item?.payroll_id)
                                        return (
                                            <tr
                                                key={i}
                                                className={`text-cmGrey700 stripRow ${
                                                    PAYROLL_PROCESS_STATUS.finilize ==
                                                    item?.status_id
                                                        ? 'bg-cmSuccess bg-opacity-5'
                                                        : !item?.is_mark_paid &&
                                                          [
                                                              PAYROLL_PROCESS_STATUS.paid,
                                                              PAYROLL_PROCESS_STATUS.moveToRecon,
                                                          ].includes(item.status_id)
                                                        ? 'bg-cmGrey300'
                                                        : null
                                                } `}
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: 600,
                                                    verticalAlign: 'middle',
                                                }}
                                            >
                                                <td
                                                    width={'65px'}
                                                    className={`ps-3 ${
                                                        item?.is_mark_paid ||
                                                        [
                                                            PAYROLL_PROCESS_STATUS.moveToRecon,
                                                            PAYROLL_PROCESS_STATUS.paid,
                                                        ].includes(item.status_id) ||
                                                        item?.PayrollShiftHistorie_count > 0
                                                            ? 'border-start border-end-0 border-cminfo border-3'
                                                            : null
                                                    }`}
                                                >
                                                    {!finalize_status &&
                                                    !item?.is_mark_paid &&
                                                    ![
                                                        PAYROLL_PROCESS_STATUS.paid,
                                                        PAYROLL_PROCESS_STATUS.finilize,
                                                        PAYROLL_PROCESS_STATUS.moveToRecon,
                                                    ].includes(item.status_id) ? (
                                                        <div className=''>
                                                            <CustomCheckbox
                                                                checked={isChecked}
                                                                onChange={(e) =>
                                                                    handleCheckbox(item, e)
                                                                }
                                                                disable={
                                                                    selectedPageType == 'all_pages'
                                                                }
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div></div>
                                                    )}
                                                </td>

                                                <td
                                                    width={'200px'}
                                                    className=' text-cmGrey800  cursor-pointer'
                                                    style={{
                                                        textDecoration: 'underline',
                                                        fontFamily: 'Manrope',
                                                        fontWeight: '700',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    <RedirectToEmployeeProfile
                                                        employeeId={item?.id}
                                                    >
                                                        <CustomImage
                                                            src={item?.image}
                                                            className='avatar me-3'
                                                            alt='img'
                                                        />{' '}
                                                        {item?.first_name ?? '-'}{' '}
                                                        {item?.last_name ?? '-'}
                                                    </RedirectToEmployeeProfile>
                                                </td>

                                                <td className='' width={'80px'}>
                                                    {item?.approvals_and_requests_status ? (
                                                        <div
                                                            className='text-cmBlue-Crayola text-decoration-underline cursor-pointer '
                                                            onClick={() => {
                                                                setShowRequestModal(true)
                                                                setPayrollMetaData({
                                                                    payroll_id: item?.payroll_id,
                                                                    name: `${item?.first_name} ${item?.last_name}`,
                                                                    user_id: item?.id,
                                                                    pay_period_from,
                                                                    pay_period_to,
                                                                })
                                                            }}
                                                        >
                                                            View
                                                        </div>
                                                    ) : (
                                                        <div>-</div>
                                                    )}
                                                </td>

                                                {/* <td className='p-3 '>
                                                    {item?.position ?? '-'}
                                                </td> */}

                                                <td
                                                    width={'115x'}
                                                    className=' text-decoration-underline cursor-pointer'
                                                    onClick={() => {
                                                        setShowCreateAppModal(true)
                                                        setPayrollMetaData({
                                                            payroll_id: item?.payroll_id,
                                                            name: `${item?.first_name}  ${item?.last_name}`,
                                                            user_id: item?.id,
                                                            pay_period_from,
                                                            pay_period_to,
                                                        })
                                                    }}
                                                >
                                                    {formattedNumberFields(item?.commission)}
                                                </td>

                                                <td
                                                    width={'120px'}
                                                    className='  text-decoration-underline cursor-pointer'
                                                    onClick={() => {
                                                        setShowOverridesModal(true)
                                                        setPayrollMetaData({
                                                            payroll_id: item?.payroll_id,
                                                            user_id: item?.id,
                                                            name: `${item?.first_name}  ${item?.last_name}`,
                                                            pay_period_from,
                                                            pay_period_to,
                                                        })
                                                    }}
                                                >
                                                    {formattedNumberFields(
                                                        item?.override ?? '000',
                                                        '$'
                                                    )}
                                                </td>

                                                <td
                                                    width={'135px'}
                                                    className='  text-decoration-underline cursor-pointer'
                                                    onClick={() => {
                                                        setShowAdjustmentModal(true)
                                                        setPayrollMetaData({
                                                            payroll_id: item?.payroll_id,
                                                            name: `${item?.first_name}  ${item?.last_name}`,
                                                            pay_period_from,
                                                            pay_period_to,
                                                            user_id: item?.id,
                                                        })
                                                    }}
                                                >
                                                    {formattedNumberFields(
                                                        item?.adjustment ?? '000',
                                                        '$'
                                                    )}
                                                </td>

                                                <td
                                                    width={'135px'}
                                                    className='  text-decoration-underline cursor-pointer'
                                                    onClick={() => {
                                                        setShowReimbursementsModal(true)
                                                        setPayrollMetaData({
                                                            payroll_id: item?.payroll_id,
                                                            name: `${item?.first_name}  ${item?.last_name}`,
                                                            pay_period_from,
                                                            pay_period_to,
                                                            user_id: item?.id,
                                                        })
                                                    }}
                                                >
                                                    {formattedNumberFields(
                                                        item?.reimbursement ?? '000',
                                                        '$'
                                                    )}
                                                </td>

                                                <td
                                                    width={'110px'}
                                                    className=' text-decoration-underline cursor-pointer'
                                                    onClick={() => {
                                                        setShowDeductionsModal(true)
                                                        setPayrollMetaData({
                                                            payroll_id: item?.payroll_id,
                                                            name: `${item?.first_name}  ${item?.last_name}`,
                                                            pay_period_from,
                                                            pay_period_to,
                                                            user_id: item?.id,
                                                        })
                                                    }}
                                                >
                                                    {formattedNumberFields(
                                                        item?.deduction ?? '000',
                                                        '$'
                                                    )}
                                                </td>

                                                {companySetting?.reconciliation ? (
                                                    <td className='' width={'120px'}>
                                                        {formattedNumberFields(
                                                            item?.reconciliation ?? '000',
                                                            '$'
                                                        )}
                                                    </td>
                                                ) : null}

                                                <td
                                                    width={'120px'}
                                                    className={` text-${
                                                        item?.status == 'skipped'
                                                            ? 'cmError'
                                                            : // : item?.status == 'next_payroll'
                                                              // ? 'cminfo'
                                                              'cmGrey900'
                                                    } `}
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontWeight: '700',
                                                    }}
                                                >
                                                    {
                                                        <>
                                                            <span
                                                                className={
                                                                    Number(item?.net_pay ?? 0) < 0
                                                                        ? 'bi bi-exclamation-triangle text-cmError me-2'
                                                                        : ''
                                                                }
                                                            />
                                                            {!item?.is_mark_paid &&
                                                            [
                                                                PAYROLL_PROCESS_STATUS.pending,
                                                                PAYROLL_PROCESS_STATUS.finilize,
                                                                PAYROLL_PROCESS_STATUS.nextPayroll,
                                                            ].includes(item.status_id)
                                                                ? formattedNumberFields(
                                                                      item?.net_pay ?? '000',
                                                                      '$'
                                                                  )
                                                                : null}
                                                            {item?.is_mark_paid ? (
                                                                <span className=' pt-2 text-cminfo'>
                                                                    Paid
                                                                </span>
                                                            ) : null}

                                                            {/* {PAYROLL_PROCESS_STATUS.nextPayroll ==
                                                            item?.status_id ? (
                                                                <span className=' pt-2 text-cminfo'>
                                                                    Next Payroll
                                                                </span>
                                                            ) : null} */}
                                                            {PAYROLL_PROCESS_STATUS.moveToRecon ==
                                                            item?.status_id ? (
                                                                <span className=' pt-2 text-cminfo'>
                                                                    Recon
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    }
                                                </td>

                                                <td width={'60px'} className=' '>
                                                    {item?.is_mark_paid ||
                                                    [
                                                        PAYROLL_PROCESS_STATUS.moveToRecon,
                                                        PAYROLL_PROCESS_STATUS.paid,
                                                    ].includes(item.status_id) ||
                                                    item?.PayrollShiftHistorie_count > 0 ? (
                                                        <CustomTooltip
                                                            title={
                                                                item?.is_mark_paid
                                                                    ? 'Undo Paid'
                                                                    : item?.status_id == 6
                                                                    ? 'Undo Recon'
                                                                    : item?.PayrollShiftHistorie_count >
                                                                      0
                                                                    ? 'Undo Next Payroll'
                                                                    : ''
                                                            }
                                                        >
                                                            {/* <div
                                                                className='bi bi-arrow-counterclockwise text-cminfo bg-cmBlue-Crayola bg-opacity-10 fs-1 border border-1 cursor-pointer px-2 rounded'
                                                                onClick={() => handleUndo(item)}
                                                            /> */}
                                                            <KTSVG
                                                                path='/media/icons/duotune/art/arrow-anti-clockwise.svg'
                                                                svgClassName='h-35px w-35px cursor-pointer'
                                                                onClick={() => handleUndo(item)}
                                                            />
                                                        </CustomTooltip>
                                                    ) : null}

                                                    {item?.comment && (
                                                        <i
                                                            // className='btn btn-secondary'
                                                            data-toggle='tooltip'
                                                            title={item?.comment}
                                                            style={{
                                                                fontSize: '20px',
                                                                cursor: 'pointer',
                                                            }}
                                                            className='bi bi-chat-fill text-hover-black text-cmOrange'
                                                        >
                                                            {' '}
                                                        </i>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                            ) : (
                                <tr key='no-data'>
                                    <td
                                        colSpan={12}
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
                {tableData?.data && !selectedPageType ? (
                    <Pagination
                        page={activePage && activePage}
                        totalPages={tableData?.last_page}
                        setPage={(changedPage) => {
                            onPageChange(changedPage)
                        }}
                    />
                ) : null}
            </div>

            {/* {open ? (
                <EditRunPayroll
                    show={open}
                    handleClose={handleClose}
                    editData={editData}
                    getPayrollData={getPayrollData}
                    currentPayPeriod={currentPayPeriod}
                />
            ) : null} */}
            {showCreateAppModal ? (
                <PayRollCommissionsTable
                    show={showCreateAppModal}
                    handleClose={handleCloseCommissions}
                    payrollMetaData={payrollMetaData}
                    finalize_status={false}
                />
            ) : null}
            <PayrollAdjustments
                show={showAdjustmentModal}
                handleClose={handleCloseAdjustment}
                payrollMetaData={payrollMetaData}
            />
            <PayRollReimbursTable
                show={showReimbursementsModal}
                handleClose={handleReimbursement}
                payrollMetaData={payrollMetaData}
            />
            {showDeductionsModal ? (
                <PayRollDeductionTable
                    show={showDeductionsModal}
                    handleClose={handleDeduction}
                    payrollMetaData={payrollMetaData}
                    finalize_status={false}
                />
            ) : null}
            {showOverridesModal ? (
                <PayRollOverridesTable
                    show={showOverridesModal}
                    handleClose={handleOverrides}
                    payrollMetaData={payrollMetaData}
                    finalize_status={false}
                />
            ) : null}
            {showRequestModal ? (
                <ViewPayrollRequestModal
                    show={showRequestModal}
                    handleClose={() => setShowRequestModal(false)}
                    payrollMetaData={payrollMetaData}
                    getPayrollData={getPayrollData}
                />
            ) : null}
            <ViewSummary />
        </>
    )
}

export {RunPayrollTabel}
