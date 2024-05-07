/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../../../accessRights/AccessRights'
import {getCompanySettingSelector} from '../../../../../../../redux/selectors/SettingsSelectors'
import {allPermissionsAccess} from '../../../../../../../accessRights/useCustomAccessRights'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'

const MySalesHeader = () => {
    const location = useLocation()
    const companySetting = useSelector(getCompanySettingSelector)

    return (
        <div
            style={{fontSize: '16px', fontWeight: '800', fontFamily: fontsFamily.manrope}}
            className='d-flex flex-nowrap gap-7 text-cmGrey500'
        >
            <AccessRights customCondition={allPermissionsAccess.standard.mySales.mysales.view}>
                <Link
                    className={`py-2 px-3 bg-cmwhite shadow-sm ${
                        location.pathname == '/mysales/sales' && 'active'
                            ? 'text-cmBlue-Crayola'
                            : 'text-cmGrey500'
                    }`}
                    style={{
                        borderRadius: '10px 10px 0px 0px',
                    }}
                    to='/mysales/sales'
                >
                    My Sales
                </Link>
            </AccessRights>

            {companySetting?.overrides ? (
                <AccessRights
                    customCondition={allPermissionsAccess.standard.mySales.myOverrides.view}
                >
                    <Link
                        className={` py-2 px-3 bg-cmwhite shadow-sm
                            ${
                                location.pathname === '/mysales/my-overrides' && 'active'
                                    ? 'text-cmBlue-Crayola'
                                    : 'text-cmGrey500'
                            }`}
                        to='/mysales/my-overrides'
                        style={{
                            borderRadius: '10px 10px 0px 0px',
                        }}
                    >
                        My Overrides
                    </Link>
                </AccessRights>
            ) : (
                <></>
            )}
            <AccessRights customCondition={allPermissionsAccess.standard.mySales.payStubs.view}>
                <Link
                    className={` py-2 px-3 bg-cmwhite shadow-sm
                        ${
                            location.pathname === '/mysales/pay-stubs' && 'active'
                                ? 'text-cmBlue-Crayola'
                                : 'text-cmGrey500'
                        }`}
                    to='/mysales/pay-stubs'
                    style={{
                        borderRadius: '10px 10px 0px 0px',
                    }}
                >
                    Pay Stubs
                </Link>
            </AccessRights>
        </div>
    )
}

export {MySalesHeader}
