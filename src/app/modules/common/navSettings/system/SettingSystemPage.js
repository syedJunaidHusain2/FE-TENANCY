import React, {useState} from 'react'
import {Navigate, Route, Routes} from 'react-router'
import {PageTitle} from '../../../../../_metronic/layout/core'
import SystemGeneral from './components/SystemGeneral'
import SettingsSystemSidebar from './components/SettingsSystemSidebar'
import SystemEmails from './components/SystemEmails'
import SystemNotification from './components/SystemNotification'

const profileBreadCrumbs = [
    {
        title: 'Settings/System/',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
]

const SettingSystemPage = () => {
    return (
        <>
            <div className='d-xl-flex gap-5' style={{height: '75vh'}}>
                <div className='w-xxl-15 w-xl-20 mb-xl-0 mb-5'>
                    <SettingsSystemSidebar />
                </div>
                <div className='w-xxl-85 w-xl-80'>
                    <Routes>
                        <Route
                            path='general'
                            element={
                                <>
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>General</PageTitle>
                                    <SystemGeneral />
                                </>
                            }
                        />
                        <Route
                            path='emails'
                            element={
                                <>
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>Emails</PageTitle>
                                    <SystemEmails />
                                </>
                            }
                        />

                        <Route
                            path='notification'
                            element={
                                <>
                                    <PageTitle breadcrumbs={profileBreadCrumbs}>General</PageTitle>
                                    <SystemNotification />
                                </>
                            }
                        />

                        <Route index element={<Navigate to='/settings' />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default SettingSystemPage
