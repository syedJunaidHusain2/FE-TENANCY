import React, {useCallback} from 'react'
import {Outlet, Route, Routes, useNavigate} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import Templates from '../admin/sequidocs/component/templates/Templates'
import MultiTenancyDashboard from './MultiTenancyDashboard'
import AddNewClient from './addNewClient/AddNewClient'
import {useDispatch, useSelector} from 'react-redux'
import {getUserDataSelector} from '../../../redux/selectors/AuthSelectors'
import {logoutAction} from '../../../redux/actions/AuthActions'
import {KTSVG} from '../../../_metronic/helpers'
import {fontsFamily} from '../../../assets/fonts/fonts'
import ClientDirectoryPage from './clientDirectory/ClientDirectoryPage'
import CompanyOverviewPage from './companyOverview/CompanyOverviewPage'

const MutliTenancyRoutes = () => {
    const naviagte = useNavigate()
    const dispatch = useDispatch()

    const userData = useSelector(getUserDataSelector)

    const onLogoutPress = useCallback(() => {
        dispatch(logoutAction())
    }, [dispatch])

    return (
        <div
            className='position-relative'
            style={{height: '100vh', overflowY: 'auto', fontFamily: fontsFamily.manrope}}
        >
            <Routes>
                <Route
                    element={
                        <>
                            <nav className='navbar sticky-top px-sm-10 px-5 mb-10 bg-cmBlue-Crayola'>
                                <div className='d-flex flex-center'>
                                    <KTSVG
                                        path='/media/icons/duotune/art/sequifiWhiteLogo.svg'
                                        className='cursor-pointer'
                                        svgClassName='w-175px h-60px'
                                    />
                                    <div
                                        className='text-cmwhite bg-cmGrey900 text-center h-45px min-w-115px d-flex flex-center cursor-pointer'
                                        style={{
                                            borderRadius: 10,
                                            fontSize: '22px',
                                            fontWeight: 500,
                                            lineHeight: '33px',
                                        }}
                                    >
                                        ADMIN
                                    </div>
                                </div>
                                <div className='menu-item' onClick={() => onLogoutPress()}>
                                    <a
                                        style={{color: 'white', fontWeight: 700, fontSize: '16px'}}
                                        className='menu-link px-5'
                                    >
                                        Logout
                                    </a>
                                </div>
                            </nav>
                            <div className='mb-20 px-sm-0 px-2'>
                                <Outlet />
                            </div>

                            <div
                                className='fixed-bottom my-5 text-center text-cmGrey500 px-sm-0 px-5'
                                style={{
                                    fontFamily: fontsFamily.roboto,
                                    fontSize: 14,
                                    fontWeight: 500,
                                    wordWrap: 'break-word',
                                }}
                            >
                                © Copyright |{' '}
                                <span className='text-cmBlue-Crayola'>www.sequifi.com</span> | All
                                rights reserved
                            </div>
                        </>
                    }
                >
                    <Route
                        path='dashboard'
                        element={
                            <>
                                <MultiTenancyDashboard />
                            </>
                        }
                    />

                    <Route path='new-user' element={<AddNewClient />} />

                    <Route path='client-directory' element={<ClientDirectoryPage />} />

                    <Route path='client-overview' element={<CompanyOverviewPage />} />

                    <Route index element={<navigate to='/dashboard' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default MutliTenancyRoutes
