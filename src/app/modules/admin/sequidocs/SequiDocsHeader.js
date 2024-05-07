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
import {ROLES} from '../../../../accessRights/AccessRightsConstants'
import {useSelector} from 'react-redux'
import {getActiveRoleSelector} from '../../../../redux/selectors/AuthSelectors'
import {fontsFamily} from '../../../../assets/fonts/fonts'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'

const SequiDocsHeader = () => {
    const location = useLocation()
    const activeRole = useSelector(getActiveRoleSelector)

    return (
        <div
            style={{fontSize: '16px', fontWeight: '800', fontFamily: fontsFamily.manrope}}
            className='d-flex flex-nowrap gap-7 text-cmGrey500'
        >
            <AccessRights
                customCondition={
                    activeRole == ROLES.administrator.roleName
                        ? allPermissionsAccess.administrator.sequiDocs.templates.view
                        : allPermissionsAccess.standard.sequidocs.templates.view
                }
            >
                <Link
                    className={`px-3 py-2 bg-cmwhite shadow-sm  ${
                        location.pathname.includes('templates') && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500'
                    }`}
                    to='templates'
                    style={{borderRadius: '10px 10px 0 0'}}
                >
                    Templates
                </Link>
            </AccessRights>
            <AccessRights
                customCondition={
                    activeRole == ROLES.administrator.roleName
                        ? allPermissionsAccess.administrator.sequiDocs.documents.view
                        : allPermissionsAccess.standard.sequidocs.documents.view
                }
            >
                <Link
                    className={`px-3 py-2 bg-cmwhite shadow-sm ${
                        location.pathname.includes('documents') && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500'
                    }`}
                    to='documents'
                    style={{borderRadius: '10px 10px 0 0'}}
                >
                    Documents
                </Link>
            </AccessRights>
        </div>
    )
}

export default SequiDocsHeader
