/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../accessRights/AccessRights'
import {allPermissionsAccess} from '../../../../../accessRights/useCustomAccessRights'
import {fontsFamily} from '../../../../../assets/fonts/fonts'

const HiringHeader = () => {
    const location = useLocation()

    return (
        <div
            style={{fontSize: '16px', fontWeight: '800', fontFamily: fontsFamily.manrope}}
            className='d-flex flex-nowrap gap-7 text-cmGrey500'
        >
            <AccessRights
                customCondition={allPermissionsAccess.standard.hiring.hiringProgress.view}
            >
                <Link
                    className={`px-3 py-2 bg-cmwhite shadow-sm text-nowrap ${
                        location.pathname === '/hiring/hiring-process' && 'active'
                            ? 'text-cmBlue-Crayola  cursor-pointer'
                            : 'text-cmGrey500 '
                    }`}
                    to='/hiring/hiring-process'
                    style={{borderRadius: '10px 10px 0 0'}}
                >
                    Hiring Progress
                </Link>
            </AccessRights>

            <AccessRights customCondition={allPermissionsAccess.standard.hiring.leads.view}>
                <Link
                    className={
                        `px-3 py-2 bg-cmwhite shadow-sm text-nowrap ` +
                        (location.pathname === '/hiring/hiring-leads' && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500')
                    }
                    to='/hiring/hiring-leads'
                    style={{borderRadius: '10px 10px 0 0'}}
                >
                    Leads
                </Link>
            </AccessRights>

            {/* Pipeline */}

            <AccessRights
                customCondition={allPermissionsAccess.standard.hiring.onboardingEmployees.view}
            >
                <Link
                    className={
                        `px-3 py-2 bg-cmwhite shadow-sm text-nowrap ` +
                        (location.pathname === '/hiring/hiring-onBoardingEmployees' && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500')
                    }
                    to='/hiring/hiring-onBoardingEmployees'
                    style={{borderRadius: '10px 10px 0 0'}}
                >
                    Onboarding Employees
                </Link>
            </AccessRights>
        </div>
    )
}

export default HiringHeader
