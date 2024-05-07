import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {useLayout} from '../../core'
import {getCompanyProfileService} from '../../../../services/Services'
import {useSelector} from 'react-redux'
import {getCompanyProfileSelector} from '../../../../redux/selectors/SettingsSelectors'
import CustomImage from '../../../../customComponents/customImage/CustomImage'
import {IMAGE_TYPE} from '../../../../helpers/CommonHelpers'
const SidebarLogo = () => {
    const companyData = useSelector(getCompanyProfileSelector)

    const {config} = useLayout()
    const appSidebarDefaultMinimizeDesktopEnabled =
        config?.app?.sidebar?.default?.minimize?.desktop?.enabled
    const appSidebarDefaultCollapseDesktopEnabled =
        config?.app?.sidebar?.default?.collapse?.desktop?.enabled
    const toggleType = appSidebarDefaultCollapseDesktopEnabled
        ? 'collapse'
        : appSidebarDefaultMinimizeDesktopEnabled
        ? 'minimize'
        : ''
    const toggleState = appSidebarDefaultMinimizeDesktopEnabled ? 'active' : ''
    const appSidebarDefaultMinimizeDefault =
        config.app?.sidebar?.default?.minimize?.desktop?.default
    return (
        <div style={{border: 'none'}} className='app-sidebar-logo my-15' id='kt_app_sidebar_logo'>
            {/* <Link to='/dashboard'> */}
            <div>
                <div className='mx-auto text-center'>
                    <CustomImage
                        type={IMAGE_TYPE.companyLogo}
                        src={companyData?.logo}
                        className='w-100 app-sidebar-logo-minimize'
                    />
                    <CustomImage
                        type={IMAGE_TYPE.companyLogo}
                        src={companyData?.logo}
                        className='w-50 h-50 mx-auto app-sidebar-logo-default '
                    />
                </div>
                <div
                    className=' mx-auto app-sidebar-logo-default text-center'
                    style={{fontWeight: '600', fontSize: '16px', fontFamily: 'Manrope'}}
                >
                    {companyData?.business_name}
                </div>
            </div>
            {/* </Link> */}

            {(appSidebarDefaultMinimizeDesktopEnabled ||
                appSidebarDefaultCollapseDesktopEnabled) && (
                <div
                    id='kt_app_sidebar_toggle'
                    className={clsx(
                        'app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-0 start-100 translate-middle rotate',
                        {active: appSidebarDefaultMinimizeDefault}
                    )}
                    data-kt-toggle='true'
                    data-kt-toggle-state={toggleState}
                    data-kt-toggle-target='body'
                    data-kt-toggle-name={`app-sidebar-${toggleType}`}
                >
                    <KTSVG
                        path='/media/icons/duotune/arrows/arr079.svg'
                        className='svg-icon-2 rotate-180'
                    />
                </div>
            )}
        </div>
    )
}

export {SidebarLogo}
