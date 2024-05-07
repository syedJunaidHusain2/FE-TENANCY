import React from 'react'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCompanySettingSelector} from '../../../../redux/selectors/SettingsSelectors'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'
import {fontsFamily} from '../../../../assets/fonts/fonts'

const ProfileHeader = () => {
    const location = useLocation()
    const companySetting = useSelector(getCompanySettingSelector)
    return (
        <div
            style={{fontSize: '16px', fontWeight: '800', fontFamily: fontsFamily.manrope}}
            className='d-flex flex-nowrap gap-7 text-cmGrey500'
        >
            <AccessRights
                customCondition={
                    allPermissionsAccess.administrator.payroll.runPayrollAndApprovals.view
                }
            >
                <Link
                    className={`${
                        location.pathname === '/payroll/run-payroll' && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500'
                    } py-2 px-3 cursor-pointer shadow-sm bg-cmwhite`}
                    to='/payroll/run-payroll'
                    style={{
                        borderRadius: '10px 10px 0px 0px',
                    }}
                >
                    Run Payroll
                </Link>
            </AccessRights>

            <AccessRights
                customCondition={allPermissionsAccess.administrator.payroll.oneTimePayment.view}
            >
                <Link
                    className={`${
                        location.pathname === '/payroll/one-time-payment' && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500'
                    } py-2 px-3 cursor-pointer shadow-sm bg-cmwhite`}
                    to='/payroll/one-time-payment'
                    style={{
                        borderRadius: '10px 10px 0px 0px',
                    }}
                >
                    One-time Payment
                </Link>
            </AccessRights>

            <AccessRights
                customCondition={allPermissionsAccess.administrator.payroll.paymentRequest.view}
            >
                <Link
                    className={`${
                        location.pathname === '/payroll/payment-request' && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500'
                    } py-2 px-3 cursor-pointer shadow-sm bg-cmwhite`}
                    to='/payroll/payment-request'
                    style={{
                        borderRadius: '10px 10px 0px 0px',
                    }}
                >
                    Payment Request
                </Link>
            </AccessRights>

            {companySetting?.reconciliation ? (
                <AccessRights
                    customCondition={
                        allPermissionsAccess.administrator.payroll.payrollReconciliation.view
                    }
                >
                    <Link
                        className={`${
                            location.pathname === '/payroll/reconciliation' && 'active'
                                ? 'text-cmBlue-Crayola'
                                : 'text-cmGrey500'
                        } py-2 px-3 cursor-pointer shadow-sm bg-cmwhite`}
                        to='/payroll/reconciliation'
                        style={{
                            borderRadius: '10px 10px 0px 0px',
                        }}
                    >
                        Reconciliation
                    </Link>
                </AccessRights>
            ) : null}
        </div>
    )
}

export {ProfileHeader}
