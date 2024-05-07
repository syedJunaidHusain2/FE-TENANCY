import React, {useCallback, useState} from 'react'
import {fontsFamily} from '../../../../../assets/fonts/fonts'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomFilterButton from '../../../../../customComponents/customFilterButton/CustomFilterButton'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import Pagination from '../../../admin/sequidocs/component/Pagination'
import {getValidDate} from '../../../../../constants/constants'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import AddAdminModal from './AddAdminModal'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import RedirectToEmployeeProfile from '../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import {
    getUserManagementListService,
    makeSuperAdminService,
    suspendAccessOfUserService,
    userFilterService,
} from '../../../../../services/Services'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import {TABLE_BORDER, getErrorMessageFromResponse} from '../../../../../helpers/CommonHelpers'
import {Badge} from 'primereact/badge'
import UserManagementFilter from './UserManagementFilter'

const initialFilter = {
    office_filter: '',
    position_filter: '',
    showAdmin_filter: '',
    status_filter: '',
}

const UserManagementTable = ({
    userManagementList,
    getUserList,
    onPageChange,
    page,
    onSearch,
    tableLoading,
    onUserFilter,
    onResetFilter,
    handleExport,
}) => {
    const [addAdminModal, setAddAdminModal] = useState(false)
    const [searchVal, setSearchVal] = useState(null)
    const [loadingUserId, setLoadingUserId] = useState(null)

    const handleAddAdmin = () => {
        getUserList()
        setAddAdminModal(!addAdminModal)
    }

    const handleOnSearch = (e) => {
        setSearchVal(e.target.value)
        onSearch(e.target.value)
    }

    const onMakeCompanyAdminPress = useCallback((item) => {
        setLoadingUserId(item?.id)

        makeSuperAdminService(item?.id, !item?.is_super_admin)
            .then(() => {
                CustomToast.success('Made Super Admin')
                getUserList()
            })
            .catch((error) => {
                CustomToast.error(getErrorMessageFromResponse(error))
            })
            .finally(() => {
                setLoadingUserId(null)
            })
    }, [])

    const onSuspendAccessOfUserPress = useCallback((item) => {
        setLoadingUserId(item?.id)
        suspendAccessOfUserService(item?.id)
            .then(() => {
                CustomToast.success('User Access Suspended')
                getUserList()
            })
            .catch((error) => {
                CustomToast.error(getErrorMessageFromResponse(error))
            })
            .finally(() => {
                setLoadingUserId(null)
            })
    }, [])

    return (
        <div
            className='bg-cmwhite shadow-sm'
            style={{
                borderRadius: '10px',
                fontSize: '14px',
                fontFamily: fontsFamily.manrope,
                position: 'relative',
            }}
        >
            <CustomLoader visible={tableLoading} full size={100} />

            {/* top tools */}
            <div className='d-flex flex-wrap gap-5 justify-content-between p-5'>
                <div>
                    <CustomInput
                        type={INPUT_TYPE.search}
                        name='search'
                        onChange={handleOnSearch}
                        value={searchVal}
                    />
                </div>
                <div className='d-flex flex-wrap gap-5'>
                    <UserManagementFilter
                        initialFilter={initialFilter}
                        onApplyFilter={onUserFilter}
                        resetFilter={onResetFilter}
                    />
                    <CustomButton
                        buttonLabel='Add Admin'
                        buttonSize={BUTTON_SIZE.small}
                        onClick={() => handleAddAdmin()}
                    />
                    <CustomButton
                        buttonType={BUTTON_TYPE.disabled}
                        buttonLabel='Export'
                        onClick={handleExport}
                        buttonSize={BUTTON_SIZE.small}
                        icon={'pi pi-file-export'}
                    />
                </div>
            </div>
            {/* table starts */}
            <div className='table-responsive shadow-none overflow-auto'>
                <table className='table'>
                    <thead className={TABLE_BORDER}>
                        <tr
                            className='bg-cmGrey300 text-cmGrey900'
                            style={{
                                fontSize: '14px',
                                fontWeight: '700',
                                fontFamily: fontsFamily.manrope,
                            }}
                        >
                            <th className='p-5 ps-8 text-nowrap'>User</th>
                            <th className='p-5 text-nowrap'>Position</th>
                            <th className='p-5 text-nowrap'>Office Name</th>
                            <th className='p-5 text-nowrap'>Last Login</th>
                            <th className='p-5 text-nowrap'>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className={TABLE_BORDER}>
                        {userManagementList?.data?.data?.length > 0 ? (
                            <>
                                {userManagementList?.data?.data?.map((item, i) => (
                                    <tr
                                        key={null}
                                        className='text-cmGrey800 stripRow '
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        <td className='p-5 ps-8'>
                                            <div className='d-flex align-items-center gap-3 text-cmGrey800 text-nowrap'>
                                                <div>
                                                    <CustomImage
                                                        src={item?.image}
                                                        className='avatar'
                                                        style={{width: 45, height: 45}}
                                                    />
                                                </div>
                                                <div className='d-flex flex-column gap-1 justify-content-between'>
                                                    <div className='d-flex align-items-end gap-3'>
                                                        <div className='text-cmGrey900'>
                                                            {item?.first_name} {item?.last_name}
                                                        </div>
                                                        {/* <div
                                                            className='text-cmBlue-Crayola bg-cmBlue-Crayola bg-opacity-10 rounded-pill px-5'
                                                            style={{fontSize: 12}}
                                                        >
                                                            {item?.position_detail?.position_name}
                                                        </div> */}
                                                        {item?.is_super_admin ? (
                                                            <Badge
                                                                value={'Super Admin'}
                                                                severity={'info'}
                                                            />
                                                        ) : null}
                                                    </div>
                                                    <div
                                                        className='text-cmGrey700'
                                                        style={{fontSize: 12}}
                                                    >
                                                        {item?.email ?? '-'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='p-5 text-nowrap'>
                                            {item?.position_detail?.position_name}
                                        </td>
                                        <td className='p-5 text-nowrap'>
                                            {' '}
                                            {item?.office?.office_name ?? '-'}
                                        </td>
                                        <td className='p-5 text-nowrap'>
                                            {' '}
                                            {getValidDate(
                                                item?.lastLogin,
                                                'MMM D, YYYY [at] hh:mm a'
                                            )}
                                        </td>

                                        <td
                                            className={`p-5 text-nowrap ${
                                                item?.dismiss ? 'text-cmGrey400' : 'text-cmGrey700'
                                            }`}
                                        >
                                            {item?.dismiss ? 'Inactive' : 'Active'}
                                        </td>
                                        <td className='p-5'>
                                            <RedirectToEmployeeProfile
                                                underline={false}
                                                employeeId={item?.id}
                                            >
                                                <CustomButton
                                                    buttonSize={BUTTON_SIZE.small}
                                                    buttonLabel='View'
                                                    buttonType={BUTTON_TYPE.primaryBorder}
                                                />{' '}
                                            </RedirectToEmployeeProfile>
                                        </td>

                                        <td
                                            className='p-5'
                                            style={{fontWeight: 700, width: 'fit-content'}}
                                        >
                                            {item?.id == loadingUserId ? (
                                                <span>Loading...</span>
                                            ) : item?.dismiss == 0 ? (
                                                <div className=''>
                                                    <span
                                                        className='bi bi-three-dots-vertical fs-2 text-cmGrey500 cursor-pointer text-hover-dark'
                                                        data-bs-toggle='dropdown'
                                                        aria-expanded='false'
                                                        style={{
                                                            width: 'fit-content',
                                                            pointerEvents: loadingUserId
                                                                ? 'none'
                                                                : 'auto',
                                                        }}
                                                    />
                                                    <ul
                                                        className='dropdown-menu'
                                                        style={{fontSize: 14}}
                                                    >
                                                        <li
                                                            className='dropdown-item cursor-pointer text-cmGrey800'
                                                            style={{fontWeight: 600}}
                                                            onClick={() =>
                                                                onSuspendAccessOfUserPress(item)
                                                            }
                                                        >
                                                            Suspend access
                                                        </li>
                                                        {/* {!item?.is_super_admin && ( */}
                                                        <li
                                                            className='dropdown-item cursor-pointer text-cmGrey800'
                                                            style={{fontWeight: 600}}
                                                            onClick={() =>
                                                                onMakeCompanyAdminPress(item)
                                                            }
                                                        >
                                                            {item?.is_super_admin
                                                                ? ' Remove Company Admin'
                                                                : 'Make Company Admin'}
                                                        </li>
                                                        {/* )} */}
                                                    </ul>
                                                </div>
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}
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
            {
                <Pagination
                    page={page}
                    totalPages={userManagementList?.data?.last_page}
                    setPage={onPageChange}
                />
            }
            {addAdminModal ? (
                <AddAdminModal handleClose={handleAddAdmin} show={addAdminModal} />
            ) : null}
        </div>
    )
}

export default UserManagementTable
