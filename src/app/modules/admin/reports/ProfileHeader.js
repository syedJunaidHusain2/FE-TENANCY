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
import {useSelector} from 'react-redux'
import {getCompanySettingSelector} from '../../../../redux/selectors/SettingsSelectors'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'
import {fontsFamily} from '../../../../assets/fonts/fonts'

const ProfileHeader = () => {
    const location = useLocation()
    const companySetting = useSelector(getCompanySettingSelector)

    return (
        <div
            style={{
                fontSize: '16px',
                fontWeight: '800',
                fontFamily: fontsFamily.manrope,
                overflowX: 'auto',
            }}
            className='d-flex flex-nowrap gap-7 text-cmGrey500'
        >
            <AccessRights customCondition={allPermissionsAccess.administrator.reports.company.view}>
                <Link
                    className={`${
                        location.pathname === '/reports/company' && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500'
                    } py-2 px-3 cursor-pointer shadow-sm bg-cmwhite`}
                    to='/reports/company'
                    style={{
                        borderRadius: '10px 10px 0px 0px',
                    }}
                >
                    Company
                </Link>
            </AccessRights>

            <AccessRights customCondition={allPermissionsAccess.administrator.reports.sales.view}>
                <Link
                    className={`${
                        location.pathname.includes('sales') && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500'
                    } py-2 px-3 cursor-pointer shadow-sm bg-cmwhite`}
                    to='/reports/sales'
                    style={{
                        borderRadius: '10px 10px 0px 0px',
                    }}
                >
                    Sales
                </Link>
            </AccessRights>

            <AccessRights customCondition={allPermissionsAccess.administrator.reports.cost.view}>
                <Link
                    className={`${
                        location.pathname === '/reports/costs' && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500'
                    } py-2 px-3 cursor-pointer shadow-sm bg-cmwhite`}
                    to='/reports/costs'
                    style={{
                        borderRadius: '10px 10px 0px 0px',
                    }}
                >
                    Costs
                </Link>
            </AccessRights>

            <AccessRights customCondition={allPermissionsAccess.administrator.reports.payroll.view}>
                <Link
                    className={`${
                        location.pathname.includes('/reports/payroll') && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500'
                    } py-2 px-3 cursor-pointer shadow-sm bg-cmwhite`}
                    to='/reports/payroll'
                    style={{
                        borderRadius: '10px 10px 0px 0px',
                    }}
                >
                    Payroll
                </Link>
            </AccessRights>

            {companySetting?.reconciliation ? (
                <AccessRights
                    customCondition={allPermissionsAccess.administrator.reports.reconciliation.view}
                >
                    <Link
                        className={`${
                            location.pathname === '/reports/reconciliation' && 'active'
                                ? 'text-cmBlue-Crayola'
                                : 'text-cmGrey500'
                        } py-2 px-3 cursor-pointer shadow-sm bg-cmwhite`}
                        to='/reports/reconciliation'
                        style={{
                            borderRadius: '10px 10px 0px 0px',
                        }}
                    >
                        Reconciliation
                    </Link>
                </AccessRights>
            ) : null}

            <AccessRights
                customCondition={allPermissionsAccess.administrator.reports.clawback.view}
            >
                <Link
                    className={`${
                        location.pathname === '/reports/clawback' && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500'
                    } py-2 px-3 cursor-pointer shadow-sm bg-cmwhite`}
                    to='/reports/clawback'
                    style={{
                        borderRadius: '10px 10px 0px 0px',
                    }}
                >
                    Clawback
                </Link>
            </AccessRights>

            <AccessRights
                customCondition={allPermissionsAccess.administrator.reports.pendingInstall.view}
            >
                <Link
                    className={`${
                        location.pathname === '/reports/pending-installs' && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500'
                    } py-2 px-3 text-nowrap cursor-pointer shadow-sm bg-cmwhite`}
                    to='/reports/pending-installs'
                    style={{
                        borderRadius: '10px 10px 0px 0px',
                    }}
                >
                    Pending Installs
                </Link>
            </AccessRights>
        </div>
    )
}

export default ProfileHeader
