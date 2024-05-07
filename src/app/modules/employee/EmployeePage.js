import React, {useCallback} from 'react'
import EmployeePageBody from './components/EmployeePageBody'
import signlogo from '../admin/Setting/Icon/1.png'
import {logoutAction} from '../../../redux/actions/AuthActions'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {getCompanyProfileSelector} from '../../../redux/selectors/SettingsSelectors'
import CustomImage from '../../../customComponents/customImage/CustomImage'
import {IMAGE_TYPE} from '../../../helpers/CommonHelpers'
import {fontsFamily} from '../../../assets/fonts/fonts'
import {Link} from 'react-router-dom'

const EmployeePage = () => {
    const dispatch = useDispatch()
    const companyData = useSelector(getCompanyProfileSelector)

    const onLogoutPress = useCallback(() => {
        dispatch(logoutAction())
    }, [dispatch])
    return (
        // IF in future we get any height realated issues add height: '100vh'
        <div className='position-relative' style={{height: '100vh', overflowY: 'auto'}}>
            {/* Head */}
            <nav className='navbar sticky-top px-sm-10 px-5 mb-10 bg-cmGrey100'>
                <div className='d-flex  justify-content-between align-items-center w-100'>
                    <div className=''>
                        <CustomImage
                            src={companyData?.logo}
                            type={IMAGE_TYPE.companyLogo}
                            alt='Company logo'
                            className='w-75px '
                        />
                    </div>
                    <div
                        className='btn d-flex align-items-center gap-3 border border-cmError h-30px w-115px text-cmError'
                        onClick={() => onLogoutPress()}
                    >
                        <span className='bi bi-box-arrow-right fs-3'></span> Logout
                    </div>
                </div>
            </nav>
            {/* body */}
            <div className='m-10'>
                <EmployeePageBody />
            </div>
            |{/* bottom */}
            <div className='bg-cmwhite fixed-bottom px-10 py-5  d-flex align-items-center flex-wrap justify-content-sm-between flex-end gap-sm-0 gap-2'>
                <div
                    className='d-flex flex-end align-items-center gap-5 text-cmGrey600'
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
                <div className='d-flex align-items-center'>
                    <div
                        className='text-cmGrey500'
                        style={{fontWeight: '500', fontSize: '12px', fontFamily: 'Manrope'}}
                    >
                        Powered by
                    </div>
                    <img src={signlogo} alt='' />
                    <div
                        className='text-black fw-bold'
                        style={{fontWeight: 800, fontFamily: 'Manrope'}}
                    >
                        Sequifi
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeePage
