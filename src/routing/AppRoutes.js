/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/admin/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes, SuspensedView} from './PrivateRoutes'
import {ErrorsPage} from '../app/modules/admin/errors/ErrorsPage'
import {AuthPage} from '../app/modules/admin/auth'
import {App} from '../app/App'
import {useSelector} from 'react-redux'
import {getTokenSelector, isUserOnboardProcessDoneSelector} from '../redux/selectors/AuthSelectors'
import EmployeePage from '../app/modules/employee/EmployeePage'
import AddNewLeadPage from '../app/modules/common/newLead/AddNewLeadPage'
import Completion from '../integrations/stripe/Completion'
import StripeIntegration from '../integrations/stripe/StripeIntegration'
import ViewBillingInvoice from '../app/modules/common/navSettings/billing/ViewBillingInvoice'
import SequidocDocumentRoutes from '../app/modules/sequidocDocumentSign/SequidocDocumentRoutes'
import MultiTenancyDashboard from '../app/modules/multiTenancy/MultiTenancyDashboard'
import AddNewClient from '../app/modules/multiTenancy/addNewClient/AddNewClient'
import ClientDirectoryPage from '../app/modules/multiTenancy/clientDirectory/ClientDirectoryPage'
import MutliTenancyRoutes from '../app/modules/multiTenancy/MutliTenancyRoutes'
import CompanyOverviewPage from '../app/modules/multiTenancy/companyOverview/CompanyOverviewPage'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */

const AppRoutes = () => {
    const isUserLoggedIn = useSelector(getTokenSelector)
    const isUserOnboardProcessDone = useSelector(isUserOnboardProcessDoneSelector)
    // const isUserOnboardProcessDone = false

    return (
        <BrowserRouter basename='/'>
            <Routes>
                <Route element={<App />}>
                    <Route path='error/*' element={<ErrorsPage />} />
                    <Route path={'referral'} element={<AddNewLeadPage />} />
                    <Route path='stripe' element={<StripeIntegration />} />
                    <Route path='completion' element={<Completion />} />
                    <Route path='viewBilling' element={<ViewBillingInvoice />} />
                    <Route path='onBoarding' element={<EmployeePage />} />
                    <Route
                        path='digisigner'
                        element={
                            <iframe
                                src='https://www.digisigner.com/online/showTemplate?linkId=798e9749-e738-4d9b-b59e-c51327e147fd&invitationId=acfe6dc3-5a07-4edb-b019-ff23e112a020'
                                style={{textAlign: 'center'}}
                                width='820px'
                                height='880px'
                            ></iframe>
                        }
                    />
                    <Route path='document-signing/*' element={<SequidocDocumentRoutes />} />
                    {!isUserLoggedIn ? (
                        <>
                            <>
                                <Route path='/*' element={<PrivateRoutes />} />

                                <Route
                                    path='company-onboarding/*'
                                    element={<MutliTenancyRoutes />}
                                />

                                <Route
                                    path='company-onboarding/client-directory/client-overview'
                                    element={<CompanyOverviewPage />}
                                />

                                <Route index element={<Navigate to='/company-onboarding' />} />
                            </>
                        </>
                    ) : (
                        <>
                            <Route path='auth/*' element={<AuthPage />} />
                            <Route path='*' element={<Navigate to='/auth' />} />
                        </>
                    )}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export {AppRoutes}
