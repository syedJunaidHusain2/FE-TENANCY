/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import {KTSVG} from '../../../../../../_metronic/helpers'
import Select from '../../Icon/select.png'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import {formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import {getValidDate} from '../../../../../../constants/constants'
import {ReconAdjustmentTable} from '../../../payroll/component/reconciliation/ReconAdjustmentTable'
import {ReconClawbackTable} from '../../../payroll/component/reconciliation/ReconClawbackTable'
import {ReconCommissionTable} from '../../../payroll/component/reconciliation/ReconCommissionTable '
import {ReconOverridesTable} from '../../../payroll/component/reconciliation/ReconOverridesTable'

const ReconciliationTabel = ({className, reconcilliationData, loading, onSearchChange}) => {
    const [open, setOpen] = useState(false)
    const [btn, setBtn] = useState(false)
    const [search, setSearch] = useState('')
    const [userData, setUserData] = useState(null)
    const [showOverridesModal, setShowOverridesModal] = useState(false)
    const [showCommissionModal, setShowCommissionModal] = useState(false)
    const [showClawbackModal, setShowClawbackModal] = useState(false)
    const [showAdjustmentModal, setShowAdjustmentModal] = useState(false)

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        onSearchChange(e.target.value)
    }
    const openClawbackModal = (item) => {
        setShowClawbackModal(true)
        setUserData(item)
    }
    const openAdjustmentModal = (item) => {
        setShowAdjustmentModal(true)
        setUserData(item)
    }
    const openOverrideModal = (item) => {
        setShowOverridesModal(true)
        setUserData(item)
    }

    const openCommissionModal = (item) => {
        setShowCommissionModal(true)
        setUserData(item)
    }
    return (
        <div key='reconcilation-table'>
            <CustomLoader full visible={loading} />

            <div className={`card shadow-nones mt-10 ${className}`}>
                <div className='card-body shadow-none py-0 px-0 mx-0'>
                    <div
                        className='card bg-white h-auto'
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        <div className='w-100 mt-4 mb-4 d-flex flex-wrap justify-content-between '>
                            <div className='mt-2 mb-2 w-425px mx-4 ' style={{placeSelf: 'center'}}>
                                <label
                                    className='text-cmGrey700'
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontSize: '16px',
                                        color: '#424242',
                                        fontWeight: 600,
                                    }}
                                >
                                    Total Reconciliation:
                                </label>
                                <label
                                    className='ms-4'
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontWeight: 'bold',
                                        color: '#212121',
                                        fontSize: '16px',
                                    }}
                                >
                                    {formattedNumberFields(
                                        reconcilliationData?.total_reconciliation,
                                        '$'
                                    )}
                                </label>
                            </div>
                            <div>
                                <div
                                    // style={{height: '43px', borderRadius: '20px'}}
                                    className='w-md-300px mx-4 mb-1'
                                >
                                    <form
                                        className='position-relative'
                                        // style={{background: '#F5F5F5', borderRadius: '90px'}}
                                        autoComplete='off'
                                    >
                                        {/* Reconcilation Table Search Input */}
                                        <CustomInput
                                            type={INPUT_TYPE.search}
                                            name='search'
                                            onChange={handleSearchChange}
                                            value={search}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='table-responsive shadow-none overflow-auto'>
                        <table className='table'>
                            <thead>
                                <tr
                                    className='bg-cmGrey300 text-cmGrey800'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='min-w-200px p-6 text-nowrap'>Employee Name</th>
                                    <th className='min-w-150px p-6 text-nowrap'>
                                        Commission Withheld
                                    </th>
                                    <th className='min-w-150px p-6 text-nowrap'>Override Due</th>
                                    <th className='p-6 text-nowrap'>Clawbacks</th>
                                    <th className='p-6 text-nowrap'>Total Adjustments</th>
                                    <th className='min-w-100px p-6 text-nowrap'>Total Due</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reconcilliationData?.result?.data?.length > 0 ? (
                                    <>
                                        {reconcilliationData?.result?.data?.map((item, i) => (
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
                                                    className='p-3 text-cmGrey800'
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
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr key='no-data'>
                                        <td
                                            colSpan={11}
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
                </div>
            </div>
            {showOverridesModal ? (
                <ReconOverridesTable
                    show={showOverridesModal}
                    handleClose={() => setShowOverridesModal(false)}
                    userData={userData}
                />
            ) : null}
            {showCommissionModal ? (
                <ReconCommissionTable
                    show={showCommissionModal}
                    handleClose={() => setShowCommissionModal(false)}
                    userData={userData}
                />
            ) : null}
            {showClawbackModal ? (
                <ReconClawbackTable
                    show={showClawbackModal}
                    handleClose={() => setShowClawbackModal(false)}
                    userData={userData}
                />
            ) : null}
            {showAdjustmentModal ? (
                <ReconAdjustmentTable
                    show={showAdjustmentModal}
                    handleClose={() => setShowAdjustmentModal(false)}
                    userData={userData}
                />
            ) : null}
        </div>
    )
}

export default ReconciliationTabel
