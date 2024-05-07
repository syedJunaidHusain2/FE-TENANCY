import React, {useState, useEffect, useCallback} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import Pagination from '../../../sequidocs/component/Pagination'
import ManageGroups from './ManageGroups'
import PermissionsGroupTable from './PermissionsGroupTable'
import {deletePermissionService, getPermissionService} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {useDispatch} from 'react-redux'
import {
    getPermissionGroupListAction,
    getPermissionGroupPolicyListAction,
} from '../../../../../../redux/actions/PermissionsActions'
import {useSelector} from 'react-redux'
import {getPermissionsGroupListSelector} from '../../../../../../redux/selectors/PermissionsSelectors'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../../accessRights/AccessRights'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import debounce from 'lodash.debounce'
import {getGlobalSearchData} from '../../../../../../helpers/CommonHelpers'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import {allPermissionsAccess} from '../../../../../../accessRights/useCustomAccessRights'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'

const PermissionsGroupPage = () => {
    const dispatch = useDispatch()
    const [manageGroups, setManageGroups] = useState(false)
    const allPermissionGroupList = useSelector(getPermissionsGroupListSelector)
    const [permissionGroupList, setPermissionGroupList] = useState(allPermissionGroupList)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        setPermissionGroupList(allPermissionGroupList)
    }, [allPermissionGroupList])

    const [selectedGroup, setSelectedGroup] = useState([])
    const [addUpdate, setAddUpdate] = useState('Add')
    const [loading, setLoading] = useState(false)
    const [fullLoading, setFullLoading] = useState(false)

    useEffect(() => {
        if (!manageGroups) {
            setSelectedGroup(null)
            getAdminGroupList()
        }
    }, [manageGroups])

    const getAdminGroupList = useCallback(() => {
        if (permissionGroupList) setLoading(true)
        else setFullLoading(true)
        dispatch(getPermissionGroupListAction()).finally(() => {
            if (permissionGroupList) setLoading(false)
            else setFullLoading(false)
        })
    }, [dispatch])

    useEffect(() => {
        dispatch(getPermissionGroupPolicyListAction())
    }, [])

    const deletePermission = (id) => {
        CustomDialog.warn('Are you sure you want to delete ?', () => {
            setFullLoading(true)
            deletePermissionService(id)
                .then(() => {
                    getAdminGroupList()
                    CustomToast.success('Group Deleted')
                })
                .finally(() => {
                    setFullLoading(false)
                })
        })
    }
    const updatePermission = (id, groupName) => {
        setAddUpdate('Update')
        setFullLoading(true)
        setManageGroups(!manageGroups)
        setSelectedGroup({
            group_name: groupName,
            group_id: id,
        })
        getPermissionService(id)
            .then((res) => {
                setSelectedGroup((val) => ({
                    ...val,
                    data: res?.data,
                }))
            })
            .finally(() => {
                setFullLoading(false)
            })
    }
    const handleSearchChange = (e) => {
        delaySaveToDb(e.target.value)
        setSearchValue(e.target.value)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            let filterData = getGlobalSearchData(permissionGroupList, ['group_name'], val)
            if (val) {
                setPermissionGroupList(filterData && filterData)
            } else {
                setPermissionGroupList(permissionGroupList)
            }
        }, 500),
        []
    )

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader visible={fullLoading} full />
            <div
                className='bg-white '
                style={{
                    fontSize: '14px',
                    fontFamily: 'Manrope',
                    borderRadius: '0px 10px 10px 10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                {!manageGroups && (
                    <div className='w-100 px-5 py-5 d-flex gap-5 mx-auto flex-wrap justify-content-between'>
                        <div
                            style={{borderRadius: '20px'}}
                            className=''
                            id='kt_chat_contacts_header'
                        >
                            <form
                                className='position-relative'
                                style={{borderRadius: '90px'}}
                                autoComplete='off'
                            >
                                {/* Permissions Group Table Search Input */}
                                <CustomInput
                                    type={INPUT_TYPE.search}
                                    name='search'
                                    onChange={handleSearchChange}
                                    value={searchValue ?? ''}
                                />
                                {/* <KTSVG
                                    path='/media/icons/duotune/general/gen021.svg'
                                    className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                                />

                                <input
                                    style={{borderRadius: '10px'}}
                                    type='text'
                                    className='form-control form-control-solid px-18 bg-cmGrey100'
                                    placeholder='Search...'
                                    name='search'
                                    onChange={handleSearchChange}
                                /> */}
                            </form>
                        </div>

                        <div className='mx-auto mx-sm-0 d-flex flex-direction-row'>
                            <CustomLoader visible={loading} size={50} />
                            <AccessRights
                                customCondition={
                                    allPermissionsAccess.administrator.permissions.group.add
                                }
                            >
                                <CustomButton
                                    type='submit'
                                    buttonType={BUTTON_TYPE.primary}
                                    buttonLabel=' New Group'
                                    onClick={() => {
                                        setManageGroups(!manageGroups)
                                        setAddUpdate('Add')
                                    }}
                                />
                            </AccessRights>
                        </div>
                    </div>
                )}
                <div className='mb-5'>
                    {!manageGroups && (
                        <PermissionsGroupTable
                            manageGroups={manageGroups}
                            setManageGroups={setManageGroups}
                            permissionGroupList={permissionGroupList}
                            deletePermission={deletePermission}
                            updatePermission={(id, groupName) => updatePermission(id, groupName)}
                        />
                    )}
                    {manageGroups && (
                        <ManageGroups
                            manageGroups={manageGroups}
                            setManageGroups={setManageGroups}
                            addUpdate={addUpdate}
                            selectedGroup={selectedGroup}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default PermissionsGroupPage
