/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useRef, useState} from 'react'
import {CreateDepartmentModal} from './CreateDeparmentModal'
import EditDepartmentModal from './EditDeparmentModal'
import Edit from '../../../sequidocs/Icon/edit.png'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../../accessRights/AccessRights'
import {
    TABLE_BORDER,
    formattedNumberFieldsWithoutDecimal,
} from '../../../../../../helpers/CommonHelpers'
import {TieredMenu} from 'primereact/tieredmenu'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import {deletDepartmentService} from '../../../../../../services/Services'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomEditIcon from '../../../../../../customComponents/customIcons/CustomEditIcon'
import CustomDelete from '../../../../../../customComponents/customIcons/CustomDelete'
import {allPermissionsAccess} from '../../../../../../accessRights/useCustomAccessRights'
import Pagination from '../../../sequidocs/component/Pagination'
import CustomOverlayPanel from '../../../../../../customComponents/customOverlayPanel/CustomOverlayPanel'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'

export const CommanDepartmentTable = ({
    isChild = false,
    item,
    index,
    setShowChild = () => {},
    showChild = false,
    onEditPress = () => {},
    setData,
    getdepartment,
}) => {
    const menu = useRef(null)
    // const positionN = item?.positions_name?.map((item) => {
    //     return {label: item}
    // })
    const deletedepartment = (id) => {
        var body = {
            id: id,
            // parent_id: data.parent_id,
        }
        deletDepartmentService(body).then((res) => {
            getdepartment()
            CustomToast.success('Department Deleted Successfully')
        })
    }
    const positionTemplate = (
        <div className='bg-cmInfo text-dark'>
            {item?.positions_name?.map((item) => (
                <>
                    <div>
                        <ul>
                            <li
                                className='text-cmGrey700'
                                style={{
                                    fontFamily: fontsFamily.manrope,
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    listStyle: 'none',
                                }}
                            >
                                {item}
                            </li>
                        </ul>
                    </div>
                </>
            ))}
        </div>
    )

    return (
        <tr className='stripRow'>
            <td
                className='p-5 ps-10 d-flex align-items-center text-cmGrey800'
                style={{
                    fontSize: '14px',
                    fontFamily: 'Manrope',
                    fontWeight: 600,
                }}
            >
                {isChild ? '- ' : ''}
                {item?.name}
                {item?.subdepartments?.length > 0 && (
                    <i
                        onClick={() => setShowChild(!showChild)}
                        className={
                            !showChild
                                ? 'bi bi-caret-right-fill fs-5 cursor-pointer ms-1 text-cmGrey800'
                                : 'bi bi-caret-down-fill fs-5 cursor-pointer ms-1 text-cmGrey800'
                        }
                        style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                        }}
                    ></i>
                )}
                {/* <i className='fa-solid fa-greater-than ms-4 '></i>{' '} */}
            </td>
            <td
                className='p-5 text-cmGrey700'
                style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    fontStyle: 'Medium',
                }}
            >
                {formattedNumberFieldsWithoutDecimal(item?.subdepartments?.length)}
            </td>
            <td
                style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    fontStyle: 'Medium',
                }}
                className='p-5 text-cmGrey700'
            >
                {item?.position_count != 0 && (
                    <div className='d-flex align-items-center gap-2'>
                        <CustomOverlayPanel
                            showIcon={false}
                            templateData={positionTemplate}
                            hovertemplate={
                                <div
                                    className='text-decoration-underline cursor-pointer text-hover-primary'
                                    onClick={(e) => menu.current.toggle(e)}
                                    style={{fontWeight: '600'}}
                                >
                                    {formattedNumberFieldsWithoutDecimal(item?.position_count)}
                                </div>
                            }
                        />

                        {/* <div
              className='bi bi-info-circle-fill cursor-pointer text-cminfo'
              data-bs-toggle='tooltip'
              data-bs-trigger='hover'
              title={positionN}
            ></div> */}
                    </div>
                )}
            </td>
            <td
                style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    fontStyle: 'Medium',
                }}
                className='p-5 text-cmGrey500'
            >
                <i className='bi bi-person me-1'></i>
                {formattedNumberFieldsWithoutDecimal(item?.people_count)}
            </td>
            <AccessRights
                customCondition={allPermissionsAccess.administrator.setting.departments.add}
            >
                <td>
                    {item.parent_id !== '' && (
                        <div className='d-flex flex-center gap-5'>
                            <CustomEditIcon
                                onClick={() => {
                                    if (item.parent_id === '') {
                                        setData('')
                                        onEditPress()
                                    } else {
                                        onEditPress()
                                        setData(item)
                                    }
                                }}
                            />
                            {item?.subdepartments?.length <= 0 &&
                            item?.people_count <= 0 &&
                            ![1, 2]?.includes(item?.id) ? (
                                <CustomDelete
                                    onClick={() => {
                                        CustomDialog.warn(
                                            'Are you sure you want to delete ?',
                                            () => {
                                                deletedepartment(item?.id)
                                            }
                                        )
                                    }}
                                />
                            ) : null}
                        </div>
                    )}
                </td>
            </AccessRights>
        </tr>
    )
}

export const DepartmentTableRow = ({item, onEditPress, setData, index, getdepartment}) => {
    const [showChild, setShowChild] = useState(false)
    const childData = item?.subdepartments

    return (
        <>
            <CommanDepartmentTable
                item={item}
                index={index}
                showChild={showChild}
                setShowChild={setShowChild}
                onEditPress={onEditPress}
                setData={setData}
                getdepartment={getdepartment}
            />
            {showChild &&
                (childData ? (
                    childData.map((i) => (
                        <CommanDepartmentTable
                            key={i?.id}
                            isChild={true}
                            item={i}
                            index={index}
                            showChild={showChild}
                            setShowChild={setShowChild}
                            onEditPress={onEditPress}
                            setData={setData}
                            getdepartment={getdepartment}
                        />
                    ))
                ) : (
                    <p>Not found</p>
                ))}
        </>
    )
}

const DepartmentTabel = ({
    className,
    open,
    setOpen,
    departmentsData,
    setLoader,
    getdepartment,
    handleClose,
    setData,
    data,
    departmentlist,
    activePage,
    setActivePage,
}) => {
    return (
        <>
            <div className={`card  ${className}`}>
                {/* begin::Header */}
                <div className='card-body py-0 px-0 mx-0' style={{marginTop: '-5px'}}>
                    {/* begin::Table container */}
                    <div className='table-responsive'>
                        {/* begin::Table */}
                        <table className='table table-row-bordered table-row-gray-100 gs-0 gy-3'>
                            {/* begin::Table head */}
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className='bg-cmGrey300 stripRow text-cmGrey800'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        fontFamily: 'Manrope ',
                                    }}
                                >
                                    <th className='ps-10  p-5 text-nowrap'>Departments</th>
                                    <th className='min-w-120px p-5 text-nowrap'>Sub Dept.</th>
                                    <th className='min-w-120px p-5 text-nowrap'>Positions</th>
                                    <th className='min-w-120px p-5 text-nowrap'>People </th>
                                    <AccessRights
                                        customCondition={
                                            allPermissionsAccess.administrator.setting.departments
                                                .edit
                                        }
                                    >
                                        <th className='min-w-120px'></th>
                                        {/* <th className='min-w-140px'></th> */}
                                    </AccessRights>
                                </tr>
                            </thead>
                            {/* end::Table head */}
                            {/* begin::Table body */}
                            <tbody className={TABLE_BORDER}>
                                {departmentsData?.data?.length > 0 ? (
                                    departmentsData?.data?.map((item, index) => (
                                        <DepartmentTableRow
                                            key={item?.id}
                                            item={item}
                                            index={index}
                                            onEditPress={() => setOpen(true)}
                                            setData={setData}
                                            getdepartment={getdepartment}
                                        />
                                    ))
                                ) : (
                                    <tr className='no-data'>
                                        <td
                                            colSpan={6}
                                            className='text-center fw-bold py-10'
                                            style={{
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        page={activePage}
                        totalPages={departmentsData?.last_page}
                        setPage={(changedPage) => setActivePage(changedPage)}
                    />
                </div>
                {data === '' ? (
                    <>
                        {open ? (
                            <CreateDepartmentModal
                                show={open}
                                handleClose={handleClose}
                                setLoader={setLoader}
                                getdepartment={getdepartment}
                            />
                        ) : null}
                    </>
                ) : (
                    <>
                        {open ? (
                            <EditDepartmentModal
                                show={open}
                                handleClose={handleClose}
                                data={data}
                                departmentlist={departmentlist}
                                setLoader={setLoader}
                                getdepartment={getdepartment}
                            />
                        ) : null}
                    </>
                )}
            </div>
        </>
    )
}

export {DepartmentTabel}
