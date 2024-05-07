/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {Dropdown1} from '../../../../_metronic/partials'
import {useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {getCompanyProfileService} from '../../../../services/Services'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'
import {fontsFamily} from '../../../../assets/fonts/fonts'

const ProfileHeader = () => {
    const location = useLocation()

    return (
        <div
            style={{fontSize: '16px', fontWeight: '800', fontFamily: fontsFamily.manrope}}
            className='d-flex flex-nowrap gap-7 text-cmGrey500'
        >
            <AccessRights customCondition={allPermissionsAccess.standard.management.employee.view}>
                <Link
                    className={`px-3 py-2 bg-cmwhite shadow-sm text-nowrap ${
                        location.pathname === '/management/employee' && 'active'
                            ? 'text-cmBlue-Crayola '
                            : 'text-cmGrey500'
                    }`}
                    style={{borderRadius: '10px 10px 0 0'}}
                    to='/management/employee'
                >
                    Employees
                </Link>
            </AccessRights>

            <AccessRights customCondition={allPermissionsAccess.standard.management.team.view}>
                <Link
                    className={`px-3 py-2 bg-cmwhite shadow-sm text-nowrap  ${
                        location.pathname === '/management/teams' && 'active'
                            ? 'text-cmBlue-Crayola '
                            : 'text-cmGrey500'
                    }`}
                    to='/management/teams'
                    style={{borderRadius: '10px 10px 0 0'}}
                >
                    Teams
                </Link>
            </AccessRights>
        </div>
    )
}

export {ProfileHeader}
