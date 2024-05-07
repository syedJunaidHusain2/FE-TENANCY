import React from 'react'
import Edit from '../../../sequidocs/Icon/edit.png'
import AccessRights from '../../../../../../accessRights/AccessRights'
import {useNavigate} from 'react-router-dom'
import CustomEditIcon from '../../../../../../customComponents/customIcons/CustomEditIcon'
import CustomDelete from '../../../../../../customComponents/customIcons/CustomDelete'
import {allPermissionsAccess} from '../../../../../../accessRights/useCustomAccessRights'
import {TABLE_BORDER} from '../../../../../../helpers/CommonHelpers'

const PermissionsGroupTable = ({
    manageGroups,
    setManageGroups,
    permissionGroupList,
    deletePermission,
    updatePermission,
}) => {
    const naviagte = useNavigate()

    return (
        <div>
            <div className={` bg-cmwhite`} style={{position: 'relative', fontSize: '14px'}}>
                {/* <CustomLoader visible={loading} full /> */}
                <div className='py-0 px-0 mx-0'>
                    <div id='get1' className='table-responsive overflow-auto'>
                        <table className='table'>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className=' bg-cmGrey300 text-cmGrey900'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='w-200px p-5 text-nowrap '>Group Name</th>
                                    <th className='w-auto p-5 '>Policies</th>
                                    <th className='w-auto p-5 '>Members</th>
                                    <th className='w-auto p-5 '></th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {permissionGroupList?.length > 0 ? (
                                    <>
                                        {permissionGroupList?.map((item, index) => (
                                            <tr
                                                key={index}
                                                className={`stripRow `}
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                <td className='p-5 text-cmGrey800'>
                                                    {item?.group_name}
                                                </td>

                                                <td className='p-5 text-cmGrey600 '>
                                                    <span className=''>
                                                        {item?.policies?.administrator?.length >
                                                            0 && (
                                                            <>
                                                                <span style={{color: 'black'}}>
                                                                    Administrator:
                                                                </span>{' '}
                                                                {item?.policies?.administrator
                                                                    ?.map(
                                                                        (item1) =>
                                                                            item1?.grouppolicydata
                                                                                ?.policies
                                                                    )
                                                                    .join(', ')}
                                                            </>
                                                        )}
                                                        {item?.policies?.standard?.length > 0 && (
                                                            <>
                                                                {item?.policies?.administrator
                                                                    ?.length > 0 ? (
                                                                    <br />
                                                                ) : null}
                                                                <span style={{color: 'black'}}>
                                                                    Standard:
                                                                </span>{' '}
                                                                {item?.policies?.standard
                                                                    ?.map(
                                                                        (item1) =>
                                                                            item1?.grouppolicydata
                                                                                ?.policies
                                                                    )
                                                                    .join(', ')}
                                                            </>
                                                        )}
                                                    </span>
                                                </td>

                                                <td className='p-4 text-cmGrey600 text-center'>
                                                    <div
                                                        className='p-2 rounded bg-cmSuccess bg-opacity-10 text-cmSuccess cursor-pointer'
                                                        onClick={() =>
                                                            naviagte('/permissions/usersOfGroup', {
                                                                state: {
                                                                    id: item?.group_id,
                                                                    name: item?.group_name,
                                                                },
                                                            })
                                                        }
                                                    >
                                                        {item?.members_count}
                                                    </div>
                                                </td>

                                                <td className='p-5'>
                                                    <div className='d-flex align-items-center gap-5'>
                                                        <AccessRights
                                                            customCondition={
                                                                allPermissionsAccess.administrator
                                                                    .permissions.group.edit
                                                            }
                                                        >
                                                            <CustomEditIcon
                                                                onClick={() =>
                                                                    updatePermission(
                                                                        item?.group_id,
                                                                        item?.group_name
                                                                    )
                                                                }
                                                            />
                                                        </AccessRights>
                                                        {item?.members_count <= 0 ? (
                                                            <AccessRights
                                                                customCondition={
                                                                    allPermissionsAccess
                                                                        .administrator.permissions
                                                                        .group.delete
                                                                }
                                                            >
                                                                <CustomDelete
                                                                    onClick={(e) => {
                                                                        deletePermission(
                                                                            item?.group_id
                                                                        )
                                                                    }}
                                                                />
                                                            </AccessRights>
                                                        ) : null}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr key='no-data'>
                                        <td
                                            colSpan={4}
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
        </div>
    )
}

export default PermissionsGroupTable
