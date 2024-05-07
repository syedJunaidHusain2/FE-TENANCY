import _ from 'lodash'
import {memo} from 'react'
import NoPermission from '../assets/icons/NoPermission.png'
import {
    getAccessRightsSelector,
    isUserCloserOrSetterSelector,
    isUserManagerSelector,
    isUserSuperAdminSelector,
} from '../redux/selectors/AuthSelectors'
import {store} from '../redux/store'
import {PERMISSIONS_GROUP, PERMISSION_TYPE} from './AccessRightsConstants'

export const getPermissionFromModuleAndSubModule = (accessRights = null, module = null) => {
    const currentRole = accessRights?.find((item) => item?.name == module?.roleValue)
    if (currentRole) {
        const currentModule = currentRole?.groupPolicy?.find(
            (item) => item?.policies == module?.moduleValue
        )
        if (currentModule) {
            const currentSubModule = currentModule?.policyTab?.find(
                (item) => item?.tabs == module?.subModuleValue
            )
            if (currentSubModule) {
                const permissions = currentSubModule?.submodule?.map((item) => item?.name)
                return permissions
            } else return null
        } else return null
    } else return null
}

export const setGlobalAccessRights = (accessRights) => {
    const tempData = _.cloneDeep(PERMISSIONS_GROUP)
    Object.keys(PERMISSIONS_GROUP).map((roleItem) => {
        Object?.keys(PERMISSIONS_GROUP[roleItem]).map((moduleItem) => {
            Object.keys(PERMISSIONS_GROUP[roleItem][moduleItem]).map((subModuleItem) => {
                const permission = getPermissionFromModuleAndSubModule(
                    accessRights,
                    PERMISSIONS_GROUP[roleItem][moduleItem][subModuleItem]
                )
                const permissionTypes = {}
                Object.keys(PERMISSION_TYPE).map((permissionTypeItem) => {
                    permissionTypes[permissionTypeItem] = permission?.includes(
                        PERMISSIONS_GROUP[roleItem][moduleItem][subModuleItem][permissionTypeItem]
                    )
                })

                tempData[roleItem][moduleItem][subModuleItem] = {
                    ...tempData[roleItem][moduleItem][subModuleItem],
                    ...permissionTypes,
                }
            })
        })
    })
    return tempData
}

export const isPermittedForAccess = (
    {
        title,
        permission,
        type,
        forSuperAdmin,
        forManager,
        forCloserOrSetter,
        customCondition,
        ignorePosition,
    },
    showLog = false
) => {
    permission = permission ?? customCondition?.permission ?? null
    type = type ?? customCondition?.type ?? PERMISSION_TYPE.view
    forSuperAdmin = forSuperAdmin ?? false
    forCloserOrSetter = forCloserOrSetter ?? false
    ignorePosition = ignorePosition ?? false
    customCondition =
        customCondition?.permission && customCondition?.type ? null : customCondition ?? null
    const state = store.getState()
    const isSuperAdmin = isUserSuperAdminSelector(state)
    const isManager = isUserManagerSelector(state)
    const isCloserOrSetter = isUserCloserOrSetterSelector(state)
    let isPermitted = false
    let allowToSuperAdmin = false,
        allowToManager = false,
        allowToCloserOrSetter = false
    if (!ignorePosition) {
        allowToSuperAdmin = isSuperAdmin && forSuperAdmin ? true : false
        allowToManager = !isSuperAdmin && isManager && forManager ? true : false
        allowToCloserOrSetter =
            !isSuperAdmin && !isManager && isCloserOrSetter && forCloserOrSetter ? true : false
    }

    if (permission && type) {
        const accessRights = getAccessRightsSelector(state)
        isPermitted =
            permission &&
            type &&
            accessRights?.[permission?.roleName]?.[permission?.moduleName]?.[
                permission?.subModuleName
            ]?.[type]
    }
    // if (showLog) debugger

    const hasAccess =
        allowToSuperAdmin ||
        allowToManager ||
        allowToCloserOrSetter ||
        isPermitted ||
        customCondition ||
        false

    if (showLog) {
        /**
         * !DON'T DELETE THIS CONSOLE
         */
        console.log('rk', hasAccess, {
            title,
            permission,
            type,
            allowToSuperAdmin,
            allowToManager,
            allowToCloserOrSetter,
            customCondition,
        })
    }

    return hasAccess
    // return true
}

const AccessRights = ({
    title,
    permission,
    type,
    forSuperAdmin,
    forManager,
    forCloserOrSetter,
    customCondition,
    showPlaceHolder = null,
    children = null,
    showLog = false,
    ignorePosition = false,
}) => {
    const allowAccess = isPermittedForAccess(
        {
            title,
            permission,
            type,
            forSuperAdmin,
            forManager,
            forCloserOrSetter,
            customCondition,
            showPlaceHolder,
            ignorePosition,
        },
        showLog
    )

    return allowAccess ? (
        children
    ) : showPlaceHolder ? (
        <div className='card shadow  bg-cmwhite h-auto d-flex flex-column align-items-center justify-content-center gap-5 py-20 px-10'>
            <img src={NoPermission} alt='' width='78px' height='93px' />
            <div>
                <div
                    className='text-cmGrey800 text-center'
                    style={{
                        fontFamily: 'Manrope',
                        fontSize: '20px',
                        fontWeight: '700',
                        lineHeight: ' 28px',
                    }}
                >
                    Not Permitted!
                </div>
                <div
                    className='text-cmGrey500'
                    style={{fontFamily: 'Manrope', fontSize: '16px', fontWeight: '600'}}
                >
                    You do not have permission to view this page.
                </div>
            </div>
        </div>
    ) : null
}

export {PERMISSIONS_GROUP, PERMISSION_TYPE}
export default memo(AccessRights)
