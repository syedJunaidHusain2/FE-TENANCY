/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../accessRights/AccessRights'
import {
    getCompanySettingSelector,
    getPositionSettingSelector,
} from '../../../../../redux/selectors/SettingsSelectors'
import useQueryString from '../../../../../hooks/useQueryString'
import {allPermissionsAccess} from '../../../../../accessRights/useCustomAccessRights'
import {fontsFamily} from '../../../../../assets/fonts/fonts'
const SmReportsHeader = () => {
    const location = useLocation()
    var navigate = useNavigate()
    const companySetting = useSelector(getCompanySettingSelector)
    const positionSetting = useSelector(getPositionSettingSelector)

    return (
        <div
            style={{
                fontSize: '16px',
                fontWeight: '800',
                fontFamily: fontsFamily.manrope,
                marginTop: '-20px',
                overflowX: 'auto',
            }}
            className='d-flex flex-nowrap gap-7 text-cmGrey500'
        >
            <AccessRights customCondition={allPermissionsAccess.standard.reports.office.view}>
                <Link
                    className={`px-3 py-2 bg-cmwhite shadow-sm text-nowrap ${
                        location?.pathname === '/smReports/office' && 'active'
                            ? 'text-cmBlue-Crayola '
                            : 'text-cmGrey500'
                    }`}
                    to='/smReports/office'
                    style={{borderRadius: '10px 10px 0 0'}}
                >
                    Office
                </Link>
            </AccessRights>

            <AccessRights customCondition={allPermissionsAccess.standard.reports.sales.view}>
                <Link
                    className={`px-3 py-2 bg-cmwhite shadow-sm text-nowrap ${
                        location?.pathname === '/smReports/sales' && 'active'
                            ? 'text-cmBlue-Crayola '
                            : 'text-cmGrey500'
                    }`}
                    to='/smReports/sales'
                    style={{borderRadius: '10px 10px 0 0'}}
                >
                    Sales
                </Link>
            </AccessRights>

            <AccessRights customCondition={allPermissionsAccess.standard.reports.pastPayStubs.view}>
                <Link
                    className={`px-3 py-2 bg-cmwhite shadow-sm text-nowrap ${
                        location?.pathname === '/smReports/pay-stubs' && 'active'
                            ? 'text-cmBlue-Crayola '
                            : 'text-cmGrey500'
                    }`}
                    to='/smReports/pay-stubs'
                    style={{borderRadius: '10px 10px 0 0'}}
                >
                    Past Pay Stubs
                </Link>
            </AccessRights>

            {companySetting?.reconciliation && positionSetting?.reconciliation_status ? (
                <AccessRights
                    customCondition={allPermissionsAccess.standard.reports.reconciliation.view}
                >
                    <Link
                        className={`px-3 py-2 bg-cmwhite shadow-sm text-nowrap text-nowrap ${
                            location?.pathname === '/smReports/reconciliation' && 'active'
                                ? 'text-cmBlue-Crayola '
                                : 'text-cmGrey500'
                        }`}
                        to='/smReports/reconciliation'
                        style={{borderRadius: '10px 10px 0 0'}}
                    >
                        Reconciliation
                    </Link>
                </AccessRights>
            ) : null}
        </div>
    )
}

export {SmReportsHeader}
