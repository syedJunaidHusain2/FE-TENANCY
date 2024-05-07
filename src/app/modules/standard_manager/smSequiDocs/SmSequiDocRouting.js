import React from 'react'
import {Navigate, Outlet, Route, Routes, useLocation} from 'react-router-dom'
import SequiDocsHeader from '../../admin/sequidocs/SequiDocsHeader'
import {PageTitle} from '../../../../_metronic/layout/core'
import AccessRights from '../../../../accessRights/AccessRights'
import {useSelector} from 'react-redux'
import {getActiveRoleSelector} from '../../../../redux/selectors/AuthSelectors'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'
import AddTemplatesPage from '../../admin/sequidocs/component/templates/addTemplatefromOtherTemplates/AddTemplatesPage'
import History from '../../admin/sequidocs/component/templates/history/History'
import OfferLettersTable from '../../admin/sequidocs/component/templates/components/offerLettersComponent/OfferLettersTable'
import ManageOfferLetter from '../../admin/sequidocs/component/templates/components/offerLettersComponent/ManageOfferLetter'
import AgreementTable from '../../admin/sequidocs/component/templates/components/agreementComponent/AgreementTable'
import ManageAgreement from '../../admin/sequidocs/component/templates/components/agreementComponent/ManageAgreement'
import SendLettertoEmployee from '../../admin/sequidocs/component/templates/components/sendLettertoEmployee.js/SendLettertoEmployee'
import EmailTemplateTable from '../../admin/sequidocs/component/templates/components/emailTemplateComponent.js/EmailTemplateTable'
import ManageEmailTemplate from '../../admin/sequidocs/component/templates/components/emailTemplateComponent.js/ManageEmailTemplate'
import SmTemplate from './smTemplate/SmTemplate'
import Documents from '../../admin/sequidocs/component/documents/Documents'

const SmSequiDocRouting = () => {
    const location = useLocation()
    const profileBreadCrumbs = [
        {
            title: 'Dashboard/',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Sequidocs/',
            path: 'std-sequidocs/templates/',
            isSeparator: false,
            isActive: false,
        },
    ]

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
                                        allPermissionsAccess.standard.sequidocs.templates.view
                                    }
                                    showPlaceHolder
                                >
                                    <SmTemplate />
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
                                        allPermissionsAccess.standard.sequidocs.documents.view
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

export default SmSequiDocRouting
