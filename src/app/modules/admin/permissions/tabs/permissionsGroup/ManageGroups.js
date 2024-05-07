import React, {useState, useEffect, useCallback} from 'react'
import {
    addAdminGroupPermissionService,
    updateAdminGroupPermissionService,
} from '../../../../../../services/Services'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {useSelector} from 'react-redux'
import {getPermissionsGroupPolicyListSelector} from '../../../../../../redux/selectors/PermissionsSelectors'
import _ from 'lodash'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomCheckbox from '../../../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomArrow, {
    ARROW_DIRECTION,
} from '../../../../../../customComponents/customIcons/CustomIcons'
import {PERMISSION_TYPE} from '../../../../../../accessRights/AccessRightsConstants'

const ManageGroups = ({setManageGroups, manageGroups, addUpdate, selectedGroup}) => {
    const groupPolicyList = useSelector(getPermissionsGroupPolicyListSelector)
    const [currentSelectedRole, setCurrentSelectedRole] = useState('')
    const [currentSelectedModule, setCurrentSelectedModule] = useState('')
    const [loading, setLoading] = useState(false)

    const [groupName, setGroupName] = useState(selectedGroup?.group_name)
    const [permissionsGroupPolicyList, setPermissionsGroupPolicyList] = useState(groupPolicyList)

    useEffect(() => {
        let gPolicyList = _.cloneDeep(permissionsGroupPolicyList)
        if (selectedGroup?.data?.length > 0) {
            selectedGroup?.data.map((roleItem) => {
                const roleIndex =
                    gPolicyList?.length > 0
                        ? gPolicyList.findIndex((item) => item?.id == roleItem?.id)
                        : -1
                if (roleIndex > -1 && roleItem?.groupPolicy?.length > 0) {
                    roleItem?.groupPolicy?.map((moduleItem) => {
                        const moduleIndex = gPolicyList?.[roleIndex]?.grouppolicy.findIndex(
                            (item) => item?.id == moduleItem?.id
                        )
                        if (moduleIndex > -1 && moduleItem?.policyTab?.length > 0) {
                            moduleItem?.policyTab?.map((subModuleItem) => {
                                const subModuleIndex = gPolicyList[roleIndex].grouppolicy[
                                    moduleIndex
                                ].policytab.findIndex((item) => item?.id == subModuleItem?.id)
                                if (subModuleIndex > -1 && subModuleItem?.submodule?.length > 0) {
                                    subModuleItem?.submodule?.map((permissionItem) => {
                                        const permissionIndex = gPolicyList[roleIndex].grouppolicy[
                                            moduleIndex
                                        ].policytab[subModuleIndex].permission?.findIndex(
                                            (item) => item?.id == permissionItem?.id
                                        )
                                        const permissionValue = permissionIndex > -1 ? true : false

                                        gPolicyList[roleIndex].grouppolicy[moduleIndex].policytab[
                                            subModuleIndex
                                        ].permission[permissionIndex].checked = permissionValue
                                    })
                                }
                            })
                        }
                    })
                }
            })
            setPermissionsGroupPolicyList([...gPolicyList])
        }
    }, [selectedGroup?.data])

    const updatePolicyList = (role_index, module_index, sub_module_index, permission_index) => {
        Object.freeze(permissionsGroupPolicyList)
        let tempData = _.cloneDeep(permissionsGroupPolicyList)
        let value =
            tempData?.[role_index]?.grouppolicy?.[module_index]?.policytab?.[sub_module_index]
                ?.permission?.[permission_index]?.checked ?? false

        let viewIndex = null,
            deleteIndex = null,
            editIndex = null,
            addIndex = null

        tempData?.[role_index]?.grouppolicy?.[module_index]?.policytab?.[
            sub_module_index
        ]?.permission?.map((item, index) => {
            if (item?.guard_name?.toLowerCase() == PERMISSION_TYPE.view) viewIndex = index
            if (item?.guard_name?.toLowerCase() == PERMISSION_TYPE.edit) editIndex = index
            if (item?.guard_name?.toLowerCase() == PERMISSION_TYPE.delete) deleteIndex = index
            if (item?.guard_name?.toLowerCase() == PERMISSION_TYPE.add) addIndex = index
        })

        const guard_name =
            tempData?.[role_index]?.grouppolicy?.[module_index]?.policytab?.[
                sub_module_index
            ]?.permission?.[permission_index]?.guard_name?.toLowerCase()

        if (addIndex >= 0 && guard_name == PERMISSION_TYPE.add) {
            tempData[role_index].grouppolicy[module_index].policytab[sub_module_index].permission[
                addIndex
            ].checked = value ? false : true
            if (viewIndex >= 0 && !value) {
                tempData[role_index].grouppolicy[module_index].policytab[
                    sub_module_index
                ].permission[viewIndex].checked = true
            }
        }
        if (editIndex >= 0 && guard_name == PERMISSION_TYPE.edit) {
            tempData[role_index].grouppolicy[module_index].policytab[sub_module_index].permission[
                editIndex
            ].checked = value ? false : true
            if (viewIndex >= 0 && !value) {
                tempData[role_index].grouppolicy[module_index].policytab[
                    sub_module_index
                ].permission[viewIndex].checked = true
            }
        }
        if (deleteIndex >= 0 && guard_name == PERMISSION_TYPE.delete) {
            tempData[role_index].grouppolicy[module_index].policytab[sub_module_index].permission[
                deleteIndex
            ].checked = value ? false : true
            if (viewIndex >= 0 && !value) {
                tempData[role_index].grouppolicy[module_index].policytab[
                    sub_module_index
                ].permission[viewIndex].checked = true
            }
        }
        if (viewIndex >= 0 && guard_name == PERMISSION_TYPE.view) {
            if (value) {
                if (addIndex >= 0) {
                    tempData[role_index].grouppolicy[module_index].policytab[
                        sub_module_index
                    ].permission[addIndex].checked = false
                }
                if (editIndex >= 0) {
                    tempData[role_index].grouppolicy[module_index].policytab[
                        sub_module_index
                    ].permission[editIndex].checked = false
                }
                if (deleteIndex >= 0) {
                    tempData[role_index].grouppolicy[module_index].policytab[
                        sub_module_index
                    ].permission[deleteIndex].checked = false
                }
            }
            tempData[role_index].grouppolicy[module_index].policytab[sub_module_index].permission[
                viewIndex
            ].checked = value ? false : true
        }

        if (
            ![
                PERMISSION_TYPE.add,
                PERMISSION_TYPE.view,
                PERMISSION_TYPE.delete,
                PERMISSION_TYPE.edit,
            ].includes(guard_name)
        ) {
            tempData[role_index].grouppolicy[module_index].policytab[sub_module_index].permission[
                permission_index
            ].checked = value ? false : true
        }
        setPermissionsGroupPolicyList(tempData)
    }

    const updateSubModuleToggle = (
        isChecked = false,
        role_index,
        module_index,
        sub_module_index
    ) => {
        Object.freeze(permissionsGroupPolicyList)
        let tempData = _.cloneDeep(permissionsGroupPolicyList)
        permissionsGroupPolicyList?.[role_index]?.grouppolicy?.[module_index]?.policytab?.[
            sub_module_index
        ]?.permission?.map((permissionItem, permissionIndex) => {
            tempData[role_index].grouppolicy[module_index].policytab[sub_module_index].permission[
                permissionIndex
            ].checked = !isChecked
        })
        setPermissionsGroupPolicyList(tempData)
    }

    const updateRoleToggle = useCallback(
        (isChecked, roleIndex) => {
            Object.freeze(permissionsGroupPolicyList)
            let tempData = _.cloneDeep(permissionsGroupPolicyList)
            permissionsGroupPolicyList?.[roleIndex]?.grouppolicy?.map((moduleItem, moduleIndex) => {
                moduleItem?.policytab?.map((subModuleItem, subModuleIndex) => {
                    subModuleItem?.permission?.map((permissionItem, permissionIndex) => {
                        tempData[roleIndex].grouppolicy[moduleIndex].policytab[
                            subModuleIndex
                        ].permission[permissionIndex].checked = !isChecked
                    })
                })
            })
            setPermissionsGroupPolicyList([...tempData])
        },
        [permissionsGroupPolicyList]
    )

    const handleRoleToggle = (roleId) => {
        setCurrentSelectedRole(roleId == currentSelectedRole ? '' : roleId)
    }

    const handleModuleToggle = (moduleId) => {
        setCurrentSelectedModule(moduleId == currentSelectedModule ? '' : moduleId)
    }

    const onSavePress = () => {
        let allPermission = []
        const tempData = permissionsGroupPolicyList.map((roleItem, roleIndex) => {
            return {
                role_id: roleItem.id,
                group_policy: roleItem.grouppolicy.map((policyItem, moduleIndex) => {
                    return {
                        policy_id: policyItem?.id,
                        policy_tabs: policyItem.policytab.map((policyTabItem) => {
                            const foundPermission = policyTabItem?.permission
                                ?.filter((permissionItem) => permissionItem?.checked)
                                ?.map((permissionItem) => permissionItem?.id)
                            allPermission = [...allPermission, ...foundPermission]
                            return {
                                policy_tab_id: policyTabItem?.id,
                                permission_id: foundPermission,
                            }
                        }),
                    }
                }),
            }
        })
        let body = {
            group_name: groupName,
            group_data: tempData,
        }

        if (!groupName) return CustomToast.error('Enter Group Name')
        if (allPermission?.length <= 0) return CustomToast.error('Select atleast 1 permission')

        setLoading(true)
        if (selectedGroup?.group_id) {
            body.group_id = selectedGroup?.group_id
            updateAdminGroupPermissionService(body)
                .then(() => {
                    setManageGroups(!manageGroups)
                    CustomToast.success('Group updated')
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            addAdminGroupPermissionService(body)
                .then(() => {
                    setManageGroups(!manageGroups)
                    CustomToast.success('Group created')
                })
                .catch((error) => {
                    CustomToast.error(getErrorMessageFromResponse(error))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const getIsRoleChecked = useCallback((roleItem) => {
        const data = []
        roleItem?.grouppolicy?.length > 0 &&
            roleItem.grouppolicy.map(
                (moduleItem) =>
                    moduleItem.policytab?.length > 0 &&
                    moduleItem.policytab.map(
                        (subModuleItem) =>
                            subModuleItem?.permission?.length > 0 &&
                            subModuleItem.permission.map((permissionItem) =>
                                data.push(permissionItem?.checked ?? false)
                            )
                    )
            )
        return data?.every((item) => item)
    }, [])
    const getIsSubModuleChecked = useCallback((subModuleItem) => {
        const data = []
        subModuleItem?.permission?.length > 0 &&
            subModuleItem.permission.map((permissionItem) =>
                data.push(permissionItem?.checked ?? false)
            )
        return data?.every((item) => item)
    }, [])

    return (
        <div className='card ' style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: '600'}}>
            <CustomLoader visible={loading} full />
            {/* header */}
            <div className='p-5 d-flex justify-content-between align-items-center flex-wrap'>
                <div className='text-cmGrey900' style={{fontSize: ' 17px', fontFamily: 'Manrope'}}>
                    {addUpdate} Group
                </div>
                {/* Buttons */}
                <div className='d-flex align-items-center gap-10'>
                    <CustomButton
                        buttonType={BUTTON_TYPE.error}
                        buttonLabel='Cancel'
                        onClick={() => setManageGroups(!manageGroups)}
                    />
                    <CustomButton
                        buttonType={BUTTON_TYPE.primary}
                        buttonLabel='Save'
                        onClick={onSavePress}
                    />
                </div>
            </div>
            {/* Line */}
            <div className='border border-cmGrey300'></div>
            {/* Body Starts */}
            <div className='p-sm-10 p-5'>
                {/* Group name */}
                <div className='mb-10 d-flex align-items-center gap-5'>
                    <label
                        className='form-label text-cmGrey900 required'
                        style={{fontWeight: '700'}}
                    >
                        Group Name
                    </label>
                    <div>
                        <CustomInput
                            placeholder=''
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            rejex={/^[\w\-\s]+$/}
                        />
                    </div>
                </div>

                <div
                    className='text-cmGrey900 mb-10'
                    style={{fontSize: '18px', fontFamily: 'Manrope', fontWeight: '600'}}
                >
                    Policies
                </div>
                <div className='border border-cmGrey300'></div>
                {/* Administrator Policies */}
                {permissionsGroupPolicyList?.length > 0 &&
                    permissionsGroupPolicyList?.map((roleItem, roleIndex) => {
                        const isRoleChecked = getIsRoleChecked(roleItem)
                        return (
                            <div className='py-10' key={roleIndex}>
                                <div className='d-flex gap-3 align-items-center mb-5'>
                                    <div
                                        className='text-cmBlack'
                                        style={{
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            fontFamily: 'Manrope',
                                        }}
                                    >
                                        {roleItem?.guard_name} Policies
                                    </div>
                                    <div className='form-check form-check-custom form-check-solid'>
                                        <CustomCheckbox
                                            checked={isRoleChecked}
                                            onChange={() => {
                                                updateRoleToggle(isRoleChecked, roleIndex)
                                            }}
                                        />
                                    </div>

                                    <CustomArrow
                                        onClick={() => handleRoleToggle(roleItem?.id)}
                                        arrowDirection={
                                            currentSelectedRole == roleItem?.id
                                                ? ARROW_DIRECTION.up
                                                : ARROW_DIRECTION.down
                                        }
                                    />
                                </div>
                                {roleItem?.id == currentSelectedRole &&
                                    roleItem?.grouppolicy?.map((moduleItem, moduleIndex) => {
                                        return (
                                            <div key={moduleIndex}>
                                                <div className='d-flex align-items-center'>
                                                    <div
                                                        className='text-cmBlack w-sm-25 mb-2'
                                                        style={{
                                                            fontWeight: 600,
                                                            fontSize: '16px',
                                                            fontFamily: 'Manrope',
                                                        }}
                                                    >
                                                        {moduleItem?.policies}
                                                    </div>

                                                    <CustomArrow
                                                        arrowDirection={
                                                            currentSelectedModule == moduleItem?.id
                                                                ? ARROW_DIRECTION.up
                                                                : ARROW_DIRECTION.down
                                                        }
                                                        onClick={() =>
                                                            handleModuleToggle(moduleItem?.id)
                                                        }
                                                    />
                                                </div>
                                                {moduleItem?.id == currentSelectedModule &&
                                                    moduleItem?.policytab?.map(
                                                        (subModuleItem, subModuleIndex) => {
                                                            const isSubModuleChecked =
                                                                getIsSubModuleChecked(subModuleItem)
                                                            return (
                                                                <div
                                                                    className=''
                                                                    key={subModuleIndex}
                                                                >
                                                                    <div className='my-5'>
                                                                        {/* Setup */}
                                                                        <div className='form-check form-check-custom form-check-solid'>
                                                                            <CustomCheckbox
                                                                                onChange={() => {
                                                                                    updateSubModuleToggle(
                                                                                        isSubModuleChecked,
                                                                                        roleIndex,
                                                                                        moduleIndex,
                                                                                        subModuleIndex
                                                                                    )
                                                                                }}
                                                                                checked={
                                                                                    isSubModuleChecked
                                                                                }
                                                                            />
                                                                            <label className='form-check-label text-cmGrey900'>
                                                                                {subModuleItem.tabs}
                                                                            </label>
                                                                        </div>

                                                                        <div className='ps-sm-20 ps-10 d-sm-flex align-items-center gap-20 mt-5'>
                                                                            {subModuleItem?.permission?.map(
                                                                                (
                                                                                    permission,
                                                                                    permissionIndex
                                                                                ) => {
                                                                                    return (
                                                                                        <div
                                                                                            key={
                                                                                                permissionIndex
                                                                                            }
                                                                                            className='form-check form-check-custom form-check-solid'
                                                                                        >
                                                                                            <CustomCheckbox
                                                                                                checked={
                                                                                                    permission?.checked
                                                                                                }
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    updatePolicyList(
                                                                                                        roleIndex,
                                                                                                        moduleIndex,
                                                                                                        subModuleIndex,
                                                                                                        permissionIndex
                                                                                                    )
                                                                                                }}
                                                                                            />
                                                                                            <label className='form-check-label text-cmGrey700'>
                                                                                                {
                                                                                                    permission?.guard_name
                                                                                                }
                                                                                            </label>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    {/* Line */}
                                                                    <div className='border border-cmGrey300'></div>
                                                                    {/* Settings */}
                                                                </div>
                                                            )
                                                        }
                                                    )}
                                            </div>
                                        )
                                    })}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default ManageGroups
