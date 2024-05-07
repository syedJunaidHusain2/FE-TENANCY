import React from 'react'
import {KTSVG} from '../../../_metronic/helpers'
import {fontsFamily} from '../../../assets/fonts/fonts'
import {Navigate, Outlet, Route, Routes, useLocation} from 'react-router-dom'
import SequiDocLogin from './components/SequiDocLogin'
import SequidocSigningPdfview from './components/SequidocSigningPdfview'
import DownloadDocumentPage from './components/DownloadDocumentPage'

const SequidocDocumentRoutes = () => {
    const location = useLocation()
    return (
        <div style={{fontFamily: fontsFamily.manrope, height: '100vh'}}>
            <Routes>
                <Route
                    element={
                        location.pathname.includes('download-document') ? (
                            <Outlet />
                        ) : (
                            <>
                                <nav className='navbar d-flex flex-column bg-cmwhite sticky-top px-10 flex-center gap-1 h-15'>
                                    <div className='w-200px h-60px mx-auto'>
                                        <KTSVG
                                            path='/media/icons/duotune/art/sequiDocLogo.svg'
                                            svgClassName='w-100'
                                            width={'200px'}
                                            svgStyle={{width: '100%', height: '100%'}}
                                        />
                                    </div>
                                    <div
                                        className='text-cmGrey700'
                                        style={{fontSize: 14, fontWeight: 600}}
                                    >
                                        Please review and sign the document
                                    </div>
                                </nav>

                                <div className='h-sm-80 h-75 overflow-auto'>
                                    <Outlet />
                                </div>

                                <div className='bg-cmwhite d-flex flex-center fixed-bottom h-sm-5 h-10'>
                                    <div className=' d-flex align-items-center justify-content-between w-80 flex-wrap mx-auto'>
                                        <div
                                            className='text-cmGrey500'
                                            style={{fontWeight: '500', fontSize: '14px'}}
                                        >
                                            © Copyright | Sequidocs | All rights reserved
                                        </div>

                                        <div className='d-flex flex-center '>
                                            <div
                                                className='text-cmGrey500'
                                                style={{fontWeight: '500', fontSize: '12px'}}
                                            >
                                                Powered by
                                            </div>

                                            <KTSVG
                                                path='/media/icons/duotune/art/SequifiLogoWithText.svg'
                                                svgStyle={{width: '75px', height: '23px'}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                >
                    <Route
                        path='login'
                        element={
                            <>
                                <SequiDocLogin />
                            </>
                        }
                    />
                    <Route
                        path='step1'
                        element={
                            <>
                                <SequidocSigningPdfview />
                            </>
                        }
                    />

                    <Route
                        path='download-document'
                        element={
                            <>
                                <DownloadDocumentPage />
                            </>
                        }
                    />

                    <Route index element={<Navigate to='/dashboard' />} />
                </Route>
            </Routes>
        </div>
    )
}

export default SequidocDocumentRoutes
