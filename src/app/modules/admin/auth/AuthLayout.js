/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import SeuifiLogo from './SeuifiLogo.png'
import {useSelector} from 'react-redux'
import {getCompanyProfileSelector} from '../../../../redux/selectors/SettingsSelectors'
import CustomImage from '../../../../customComponents/customImage/CustomImage'
import {IMAGE_TYPE} from '../../../../helpers/CommonHelpers'
import {KTSVG} from '../../../../_metronic/helpers'

const AuthLayout = () => {
    const companyData = useSelector(getCompanyProfileSelector)
    useEffect(() => {
        const root = document.getElementById('root')
        if (root) {
            root.style.height = '100%'
        }
        return () => {
            if (root) {
                root.style.height = 'auto'
            }
        }
    }, [])

    return (
        <>
            <div
                className='d-flex flex-column flex-lg-row flex-column-fluid h-100'
                style={{background: '#FAFAFA'}}
            >
                {/* begin::Body */}
                <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 '>
                    {/* begin::Form */}
                    <div className='text-center'>
                        <CustomImage
                            type={IMAGE_TYPE.companyLogo}
                            src={companyData?.logo}
                            style={{width: '150px'}}
                        />
                    </div>
                    <div className='d-flex justify-content-center'>
                        {/* begin::Wrapper */}

                        <div className='w-sm-500px p-sm-10 p-0 w-100 d-flex flex-center '>
                            <Outlet />
                        </div>
                        {/* end::Wrapper */}
                    </div>
                    {/* end::Form */}

                    {/* begin::Footer */}

                    <div className='d-flex flex-end fixed-bottom text-end p-5'>
                        <div className='d-flex fw-semibold align-items-center mx-auto mx-sm-0'>
                            <span className='pe-2' style={{color: '#9E9E9E', fontSize: '12px'}}>
                                Powered by
                            </span>
                            {/* <img src={SeuifiLogo} alt='' className='px-2' /> */}
                            <KTSVG
                                path='/media/icons/duotune/art/SequifiLogoWithText.svg'
                                // className='svg-icon-1'
                                svgClassName='w-75px h-25px'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export {AuthLayout}
