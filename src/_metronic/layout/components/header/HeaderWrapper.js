/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
import {Navbar} from './Navbar'
import {useEffect, useState} from 'react'
import {getCompanyProfileService} from '../../../../services/Services'
import CustomImage from '../../../../customComponents/customImage/CustomImage'
import {IMAGE_TYPE} from '../../../../helpers/CommonHelpers'
import {useSelector} from 'react-redux'
import {getCompanyProfileSelector} from '../../../../redux/selectors/SettingsSelectors'
export function HeaderWrapper() {
    const {config, classes} = useLayout()
    const companyData = useSelector(getCompanyProfileSelector)

    if (!config.app?.header?.display) {
        return null
    }

    return (
        <div id='kt_app_header' className='app-header bg-cmwhite'>
            <div
                id='kt_app_header_container'
                className={clsx(
                    'app-container flex-lg-grow-1',
                    classes.headerContainer.join(' '),
                    config.app?.header?.default?.containerClass
                )}
            >
                {config.app.sidebar?.display && (
                    <>
                        <div
                            className='d-flex align-items-center d-lg-none ms-n2 me-2'
                            title='Show sidebar menu'
                        >
                            <div
                                className='btn btn-icon btn-active-color-primary w-35px h-35px'
                                id='kt_app_sidebar_mobile_toggle'
                            >
                                <KTSVG
                                    path='/media/icons/duotune/abstract/abs015.svg'
                                    className=' svg-icon-1'
                                />
                            </div>
                            <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
                                <Link to='/dashboard' className='d-lg-none'>
                                    <CustomImage
                                        style={{display: 'flex'}}
                                        type={IMAGE_TYPE.companyLogo}
                                        src={companyData?.logo}
                                        className='w-30px h-30px app-sidebar-logo-default'
                                    />
                                </Link>
                            </div>
                        </div>
                    </>
                )}

                {!config.app.sidebar?.display && (
                    <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15'>
                        <Link to='/dashboard'>
                            {config.layoutType !== 'dark-header' ? (
                                <CustomImage
                                    type={IMAGE_TYPE.companyLogo}
                                    src={companyData?.logo}
                                    className='h-20px h-lg-30px app-sidebar-logo-default'
                                />
                            ) : (
                                <>
                                    <CustomImage
                                        type={IMAGE_TYPE.companyLogo}
                                        src={companyData?.logo}
                                        className='h-20px h-lg-30px app-sidebar-logo-default theme-light-show'
                                    />
                                    <CustomImage
                                        type={IMAGE_TYPE.companyLogo}
                                        src={companyData?.logo}
                                        className='h-20px h-lg-30px app-sidebar-logo-default theme-dark-show'
                                    />
                                </>
                            )}
                        </Link>
                    </div>
                )}

                <div
                    id='kt_app_header_wrapper'
                    className='d-flex align-items-stretch justify-content-between flex-lg-grow-1 '
                >
                    {config.app.header.default?.content === 'menu' &&
                        config.app.header.default.menu?.display && (
                            <div
                                className='app-header-menu  app-header-mobile-drawer align-items-stretch'
                                data-kt-drawer='true'
                                data-kt-drawer-name='app-header-menu'
                                data-kt-drawer-activate='{default: true, lg: false}'
                                data-kt-drawer-overlay='true'
                                data-kt-drawer-width='225px'
                                data-kt-drawer-direction='end'
                                data-kt-drawer-toggle='#kt_app_header_menu_toggle'
                                data-kt-swapper='true'
                                data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                                data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
                            >
                                
                            </div>
                        )}
                    <Navbar />
                </div>
            </div>
        </div>
    )
}
