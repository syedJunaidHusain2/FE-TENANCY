/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'
import { fontsFamily } from '../../../../assets/fonts/fonts'

const PermissionsHeader = () => {
    const location = useLocation()
    var navigate = useNavigate()

    return (
        <div
            style={{fontSize: '16px', fontWeight: '800', fontFamily: fontsFamily.manrope}}
            className='d-flex flex-nowrap gap-7 text-cmGrey500'
        >
            <AccessRights
                customCondition={allPermissionsAccess.administrator.permissions.group.view}
            >
                <Link
                    className={`${
                        location.pathname === '/permissions/groups' && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500'
                    } py-2 px-3 cursor-pointer shadow-sm bg-cmwhite`}
                    to='/permissions/groups'
                    style={{
                        borderRadius: '10px 10px 0px 0px',
                    }}
                >
                    Groups
                </Link>
            </AccessRights>

            <AccessRights
                customCondition={allPermissionsAccess.administrator.permissions.policies.view}
                showPlaceHolder
            >
                <Link
                    className={`${
                        location.pathname === '/permissions/policies' && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500'
                    } py-2 px-3 cursor-pointer shadow-sm bg-cmwhite`}
                    to='/permissions/policies'
                    style={{
                        borderRadius: '10px 10px 0px 0px',
                    }}
                >
                    Policies
                </Link>
            </AccessRights>
        </div>
    )
}

export {PermissionsHeader}
