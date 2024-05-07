import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import CustomToastContainer from '../customComponents/customToast/CustomToastContainer'
import {AuthInit} from './modules/admin/auth'
import { ConfirmDialog } from 'primereact/confirmdialog'

const App = () => {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <I18nProvider>
                <LayoutProvider>
                    <AuthInit>
                        <Outlet />
                        <MasterInit />
                    </AuthInit>
                </LayoutProvider>
            </I18nProvider>
            <CustomToastContainer />
            <ConfirmDialog />
        </Suspense>
    )
}

export {App}
