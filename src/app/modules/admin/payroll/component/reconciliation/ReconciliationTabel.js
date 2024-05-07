/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useMemo} from 'react'
import {EditReconciliation} from './EditReconciliation'
import Edit from '../../../sequidocs/Icon/edit.png'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import {getValidDate} from '../../../../../../constants/constants'
import Pagination from '../../../sequidocs/component/Pagination'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import {ReconOverridesTable} from './ReconOverridesTable'
import {ReconCommissionTable} from './ReconCommissionTable '
import {ReconClawbackTable} from './ReconClawbackTable'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {ReconAdjustmentTable} from './ReconAdjustmentTable'
import AddToPayrollPopUp from './addToPayrollPopUp'
import CustomEditIcon from '../../../../../../customComponents/customIcons/CustomEditIcon'
import CustomNoData from '../../../../../../customComponents/customNoData/CustomNoData'

const ReconciliationTabel = ({
    className,
    tableData,
    onSearch,
    onFinilize,
    dateDropDown,
    setStartDate,
    setEndDate,
    getReconciliationData,
    onPageChange,
    activePage,
    startDate,
    endDate,
    selectedPeriod,
    setSelectedPeriod,
    payrollReconHistory,
    setPayrollReconHistory,
    search,
}) => {
    const [open, setOpen] = useState(false)
    const [editData, setEditData] = useState(null)
    const [showAddPayroll, setShowAddPayroll] = useState(false)
    const [showOverridesModal, setShowOverridesModal] = useState(false)
    const [showCommissionModal, setShowCommissionModal] = useState(false)
    const [showClawbackModal, setShowClawbackModal] = useState(false)
    const [showAdjustmentModal, setShowAdjustmentModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState(null)

    const [userData, setUserData] = useState(null)

    const handleClose = () => {
        setOpen(false)
    }

    const handleFinilizeAdd = () => {
        CustomDialog.warn('Are you sure you want to finalize ?', () => {
            onFinilize()
        })
    }

    const periodChange = (e) => {
        const periodData = dateDropDown?.find((item) => item.id == e.target.value)
        setSelectedPeriod(periodData)
        setPayrollReconHistory(false)
        onPageChange(1)
        setStartDate(periodData?.period_from)
        setEndDate(periodData?.period_to)
    }

    const handleAddToPayroll = () => {
        setShowAddPayroll(true)
    }
    const handleOverrides = () => {
        setShowOverridesModal(false)
    }
    const openOverrideModal = (item) => {
        setShowOverridesModal(true)
        setUserData(item)
    }
    const handleCommssion = () => {
        setShowCommissionModal(false)
    }
    const openCommissionModal = (item) => {
        setShowCommissionModal(true)
        setUserData(item)
    }
    const handleClawback = () => {
        setShowClawbackModal(false)
    }
    const handleAdjustment = () => {
        setShowAdjustmentModal(false)
    }
    const openClawbackModal = (item) => {
        setShowClawbackModal(true)
        setUserData(item)
    }
    const openAdjustmentModal = (item) => {
        setShowAdjustmentModal(true)
        setUserData(item)
    }

    const periodList = useMemo(() => {
        return dateDropDown?.map((item) => ({
            ...item,
            period: `${getValidDate(item?.period_from)} to ${getValidDate(item?.period_to)}`,
        }))
    })

    const onHandleSearch = (e) => {
        setSearchTerm(e.target.value)
        onSearch(e.target.value)
    }

    return (
        <>
            <div className={`card shadow-sm mt-7 ${className}`}>
                <div className='card-body shadow-none py-0 px-0 mx-0'>
                    <div className=' bg-cmwhite' style={{fontSize: '14px', fontFamily: 'Manrope'}}>
                        <div className='m-5 d-flex gap-5 flex-wrap justify-content-between'>
                            <div>
                                {/* Reconcilation Search Input */}
                                <CustomInput
                                    type={INPUT_TYPE.search}
                                    name='search'
                                    onChange={onHandleSearch}
                                    value={searchTerm || ''}
                                />
                            </div>

                            <div>
                                <CustomDropdown
                                    name='status'
                                    onChange={periodChange}
                                    options={periodList}
                                    valueKey='id'
                                    displayKey='period'
                                    showClear={false}
                                    value={selectedPeriod?.id}
                                />
                            </div>
                            {/* <button
                                // id='bu'
                                type='button'
                                className={
                                    ' me-sm-14 w-sm-250px mx-sm-0 mx-auto cursor-pointer text-cmwhite'
                                }
                                style={{
                                    height: '43px',
                                    border: 'none',
                                    fontFamily: 'Manrope',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    background: '#F4C2C2',
                                }}
                                onClick={handlePayrollReconHistory}
                            >
                                {!payrollReconHistory ? (
                                    <label>Payroll-Recon History</label>
                                ) : (
                                    <label>Pending Payroll</label>
                                )}
                            </button> */}
                            {tableData?.data?.data?.length > 0 && !payrollReconHistory ? (
                                <CustomButton
                                    buttonType={
                                        !tableData?.finalize_status
                                            ? BUTTON_TYPE.primary
                                            : BUTTON_TYPE.success
                                    }
                                    buttonLabel={
                                        !tableData?.finalize_status ? (
                                            <label>Finalize Reconciliation</label>
                                        ) : (
                                            <label>Add to Payroll</label>
                                        )
                                    }
                                    onClick={() =>
                                        !tableData?.finalize_status
                                            ? handleFinilizeAdd()
                                            : handleAddToPayroll()
                                    }
                                />
                            ) : // <button
                            //     // id='bu'
                            //     type='button'
                            //     className={
                            //         ' me-sm-14 w-sm-250px mx-sm-0 mx-auto cursor-pointer text-cmwhite ' +
                            //         (!tableData?.finalize_status
                            //             ? 'bg-cmBlue-Crayola'
                            //             : 'bg-cmSuccess')
                            //     }
                            //     style={{
                            //         height: '43px',
                            //         border: 'none',
                            //         fontFamily: 'Manrope',
                            //         borderRadius: '6px',
                            //         fontSize: '16px',
                            //         fontWeight: 700,
                            //     }}
                            //     onClick={() =>
                            //         !tableData?.finalize_status
                            //             ? handleFinilizeAdd()
                            //             : handleAddToPayroll()
                            //     }
                            //     // onClick={() => handleAddToPayroll()}
                            // >
                            //     {!tableData?.finalize_status ? (
                            //         <label>Finalize Reconciliation</label>
                            //     ) : (
                            //         <label>Add to Payroll</label>
                            //     )}
                            // </button>
                            null}
                        </div>
                    </div>
                    <div className='table-responsive shadow-none overflow-auto'>
                        <table className='table' style={{tableLayout: 'fixed', width: '100%'}}>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className='bg-cmGrey300 text-cmGrey900'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='w-200px p-5 '>Employee Name</th>
                                    <th className='w-200px p-5 '>Commission Withheld</th>
                                    <th className='w-150px p-5 '>Override Due</th>
                                    <th className='p-5 w-125px'>Clawbacks</th>
                                    <th className='p-5 w-175px'>Total Adjustments</th>
                                    <th className='w-100px p-5 '>Total Due</th>
                                    {payrollReconHistory && (
                                        <th className='w-100px p-5 '>Pay Period</th>
                                    )}

                                    <th className='w-75px p-5'></th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {tableData?.data?.data?.length > 0 ? (
                                    <>
                                        {tableData?.data?.data?.map((item, i) => (
                                            <tr
                                                key={i}
                                                className='text-cmGrey600 '
                                                style={{
                                                    height: '40px',
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <td
                                                    className='p-5 text-cmGrey800'
                                                    style={{
                                                        textDecoration: 'underline',
                                                        fontFamily: 'Manrope',
                                                        fontWeight: '700',
                                                    }}
                                                >
                                                    <RedirectToEmployeeProfile
                                                        employeeId={item?.user_id}
                                                    >
                                                        <CustomImage
                                                            src={item?.emp_img}
                                                            className='avatar me-3'
                                                        />{' '}
                                                        {item?.emp_name ?? '-'}
                                                    </RedirectToEmployeeProfile>
                                                </td>
                                                <td
                                                    className='p-5 text-decoration-underline cursor-pointer'
                                                    onClick={() => openCommissionModal(item)}
                                                >
                                                    {formattedNumberFields(
                                                        item?.commissionWithholding,
                                                        '$'
                                                    )}
                                                </td>
                                                <td
                                                    className='p-5 text-decoration-underline cursor-pointer'
                                                    onClick={() => openOverrideModal(item)}
                                                >
                                                    {formattedNumberFields(item?.overrideDue, '$')}
                                                </td>
                                                <td
                                                    className='p-5 text-decoration-underline cursor-pointer'
                                                    onClick={() => openClawbackModal(item)}
                                                >
                                                    {formattedNumberFields(item?.clawbackDue, '$')}
                                                </td>

                                                <td
                                                    className='p-5 text-decoration-underline cursor-pointer'
                                                    onClick={() => openAdjustmentModal(item)}
                                                >
                                                    {formattedNumberFields(
                                                        item?.totalAdjustments,
                                                        '$'
                                                    )}
                                                </td>
                                                <td
                                                    className='p-5 text-cmGrey900'
                                                    style={{fontWeight: 700}}
                                                >
                                                    {formattedNumberFields(item?.total_due, '$')}
                                                </td>
                                                {payrollReconHistory && (
                                                    <td
                                                        className='p-5 text-cmGrey900'
                                                        style={{fontWeight: 700}}
                                                    >
                                                        {getValidDate(item?.pay_period_from)} -{' '}
                                                        {getValidDate(item?.pay_period_to)}
                                                    </td>
                                                )}

                                                <td
                                                    className='text-center'
                                                    style={{cursor: 'pointer'}}
                                                >
                                                    {!tableData?.finalize_status ? (
                                                        <CustomEditIcon
                                                            onClick={() => {
                                                                setEditData(item)
                                                                setOpen(true)
                                                            }}
                                                        />
                                                    ) : null}
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr key='no-data'>
                                        <td colSpan={7} className='p-5'>
                                            <CustomNoData label={'No data found'} />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {tableData?.data?.data?.length > 0 ? (
                <Pagination
                    page={activePage && activePage}
                    totalPages={tableData?.data?.last_page}
                    setPage={(changedPage) => onPageChange(changedPage)}
                />
            ) : null}
            <EditReconciliation
                show={open}
                handleClose={handleClose}
                preData={editData}
                getReconciliationData={getReconciliationData}
                startDate={startDate}
                endDate={endDate}
            />
            {showAddPayroll ? (
                <AddToPayrollPopUp
                    show={showAddPayroll}
                    handleClose={() => setShowAddPayroll(false)}
                    getReconciliationData={getReconciliationData}
                />
            ) : null}
            {showOverridesModal ? (
                <ReconOverridesTable
                    show={showOverridesModal}
                    handleClose={handleOverrides}
                    userData={userData}
                />
            ) : null}
            {showCommissionModal ? (
                <ReconCommissionTable
                    show={showCommissionModal}
                    handleClose={handleCommssion}
                    userData={userData}
                />
            ) : null}
            {showClawbackModal ? (
                <ReconClawbackTable
                    show={showClawbackModal}
                    handleClose={handleClawback}
                    userData={userData}
                />
            ) : null}
            {showAdjustmentModal ? (
                <ReconAdjustmentTable
                    show={showAdjustmentModal}
                    handleClose={handleAdjustment}
                    userData={userData}
                />
            ) : null}
        </>
    )
}

export default ReconciliationTabel
