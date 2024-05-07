import {useEffect} from 'react'
import {Link, Outlet, useLocation} from 'react-router-dom'
import {HeaderWrapper} from './components/header'
import {RightToolbar} from '../partials/layout/RightToolbar'
import {ScrollTop} from './components/scroll-top'
import {Content} from './components/content'
import {FooterWrapper} from './components/footer'
import {Sidebar} from './components/sidebar'
import {
    DrawerMessenger,
    ActivityDrawer,
    InviteUsers,
    UpgradePlan,
    ThemeModeProvider,
} from '../partials'
import {PageDataProvider} from './core'
import {reInitMenu} from '../helpers'
import {ToolbarWrapper} from './components/toolbar'

import {fontsFamily} from '../../assets/fonts/fonts'
import {Tooltip} from 'primereact/tooltip'

const MasterLayout = () => {
    const location = useLocation()
    useEffect(() => {
        reInitMenu()
    }, [location.key])

    return (
        <PageDataProvider>
            <ThemeModeProvider>
                <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
                    <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
                        <div style={{position: 'fixed', width: '100%', zIndex: '100'}}>
                            <HeaderWrapper />
                        </div>
                        <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
                            <Sidebar />
                            <div
                                style={{background: '#FAFAFA', overflow: 'auto'}}
                                className='app-main flex-column flex-row-fluid pt-20 appHeight'
                                id='kt_app_main'
                            >
                                <div className='d-flex flex-column flex-column-fluid'>
                                    <Tooltip
                                        target='.aman-tooltip'
                                        mouseTrack
                                        style={{fontSize: '13px', fontFamily: fontsFamily.manrope}}
                                        mouseTrackLeft={10}
                                    />
                                    <ToolbarWrapper />
                                    <Content>
                                        <Outlet />
                                    </Content>
                                    <div style={{background: 'white'}}>
                                        {/* <hr className='text-cmGrey-600' /> */}
                                        <div
                                            className='d-flex flex-center align-items-center gap-5 p-5 text-cmGrey600'
                                            style={{
                                                fontSize: '12px',
                                                fontFamily: fontsFamily.manrope,
                                                fontWeight: 700,
                                            }}
                                        >
                                            <div>
                                                <Link
                                                    to={'PrivacyPolicy.html'}
                                                    target='_blank'
                                                    className='text-cmGrey600 text-hover-primary'
                                                >
                                                    Privacy Policy
                                                </Link>
                                            </div>
                                            <span className='text-cmGrey400'>|</span>
                                            <div>
                                                <Link
                                                    to={'UserAgreement.html'}
                                                    target='_blank'
                                                    className='text-cmGrey600 text-hover-primary'
                                                >
                                                    Terms Of Use
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ActivityDrawer />
                <RightToolbar />
                <DrawerMessenger />

                <InviteUsers />
                <UpgradePlan />
                <ScrollTop />
            </ThemeModeProvider>
        </PageDataProvider>
    )
}

export {MasterLayout}
