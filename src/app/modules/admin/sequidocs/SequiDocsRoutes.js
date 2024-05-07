import {Navigate, Routes, Route, Outlet, useLocation} from 'react-router-dom'
import {PageTitle} from '../../../../_metronic/layout/core'
import SequiDocsHeader from './SequiDocsHeader'
import Templates from './component/templates/Templates'
import Documents from './component/documents/Documents'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import {useSelector} from 'react-redux'
import {getActiveRoleSelector} from '../../../../redux/selectors/AuthSelectors'
import {ROLES} from '../../../../accessRights/AccessRightsConstants'
import History from './component/templates/history/History'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'
import OfferLettersTable from './component/templates/components/offerLettersComponent/OfferLettersTable'
import ManageOfferLetter from './component/templates/components/offerLettersComponent/ManageOfferLetter'
import AgreementTable from './component/templates/components/agreementComponent/AgreementTable'
import ManageAgreement from './component/templates/components/agreementComponent/ManageAgreement'
import SendLettertoEmployee from './component/templates/components/sendLettertoEmployee.js/SendLettertoEmployee'
import EmailTemplateTable from './component/templates/components/emailTemplateComponent.js/EmailTemplateTable'
import ManageEmailTemplate from './component/templates/components/emailTemplateComponent.js/ManageEmailTemplate'
import AddTemplatesPage from './component/templates/addTemplatefromOtherTemplates/AddTemplatesPage'
import {UseModal} from './component/templates/UseModal'
const profileBreadCrumbs = [
    {
        title: 'Dashboard/',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
    {
        title: 'Sequidocs/',
        path: 'std-sequidocs/templates',
        isSeparator: false,
        isActive: false,
    },
]

const SettingHeader = () => {
    const location = useLocation()

    const activeRole = useSelector(getActiveRoleSelector)

    return (
        <div className='px-sm-10' style={{marginTop: '-20px'}}>
            <Routes>
                <Route
                    element={
                        <>
                            {location.pathname.includes('offer-letters') ||
                            location.pathname.includes('agreements') ||
                            location.pathname.includes('send-letter') ||
                            location.pathname.includes('email') ||
                            location.pathname.includes('add-template') ||
                            location.pathname.includes('history') ? null : (
                                <SequiDocsHeader />
                            )}
                            <Outlet />
                        </>
                    }
                >
                    <Route
                        path='templates'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Templates</PageTitle>
                                <AccessRights
                                    customCondition={
                                        activeRole == ROLES.administrator.roleName
                                            ? allPermissionsAccess.administrator.sequiDocs.templates
                                                  .view
                                            : allPermissionsAccess.standard.sequidocs.templates.view
                                    }
                                    showPlaceHolder
                                >
                                    <Templates />
                                </AccessRights>
                            </>
                        }
                    />

                    <Route
                        path='templates/add-template'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Templates</PageTitle>
                                <AddTemplatesPage />
                            </>
                        }
                    />
                    <Route
                        path='documents'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Documents</PageTitle>
                                <AccessRights
                                    customCondition={
                                        activeRole == ROLES.administrator.roleName
                                            ? allPermissionsAccess.administrator.sequiDocs.documents
                                                  .view
                                            : allPermissionsAccess.standard.sequidocs.documents.view
                                    }
                                    showPlaceHolder
                                >
                                    <Documents />
                                </AccessRights>
                            </>
                        }
                    />

                    <Route
                        path='templates/history'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>History</PageTitle>
                                <History />
                            </>
                        }
                    />

                    <Route
                        path='templates/offer-letters/history'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>History</PageTitle>
                                <History />
                            </>
                        }
                    />

                    <Route
                        path='templates/offer-letters'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Templates</PageTitle>
                                <OfferLettersTable />
                            </>
                        }
                    />

                    <Route
                        path='templates/offer-letters/new-template'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Templates</PageTitle>
                                <ManageOfferLetter />
                            </>
                        }
                    />

                    <Route
                        path='templates/offer-letters/editOfferletter'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Templates</PageTitle>
                                <ManageOfferLetter />
                            </>
                        }
                    />
                    {/* Agreements route */}
                    <Route
                        path='templates/agreements'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Templates</PageTitle>
                                <AgreementTable />
                            </>
                        }
                    />
                    <Route
                        path='templates/agreements/history'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>History</PageTitle>
                                <History />
                            </>
                        }
                    />

                    <Route
                        path='templates/agreements/edit-agreements'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Templates</PageTitle>
                                <ManageAgreement />
                            </>
                        }
                    />
                    <Route
                        path='templates/send-letter'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Templates</PageTitle>
                                <SendLettertoEmployee />
                            </>
                        }
                    />
                    <Route
                        path='templates/use-letter'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Templates</PageTitle>
                                <UseModal />
                            </>
                        }
                    />

                    <Route
                        path='templates/agreements/new-template'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Templates</PageTitle>
                                <ManageAgreement />
                            </>
                        }
                    />
                    {/* Email Templates route */}
                    <Route
                        path='templates/email'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Templates</PageTitle>
                                <EmailTemplateTable />
                            </>
                        }
                    />
                    <Route
                        path='templates/agreements/history'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>History</PageTitle>
                                <History />
                            </>
                        }
                    />
                    <Route
                        path='templates/email/edit-email'
                        element={
                            <>
                                <PageTitle breadcrumbs={profileBreadCrumbs}>Templates</PageTitle>
                                <ManageEmailTemplate />
                            </>
                        }
                    />

                    <Route index element={<Navigate to='/sequidocs' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default SettingHeader
