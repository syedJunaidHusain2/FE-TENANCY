import React from 'react'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {IMAGE_TYPE, formattedPhoneNumber} from '../../../../../helpers/CommonHelpers'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import {useSelector} from 'react-redux'
import {getCompanyProfileSelector} from '../../../../../redux/selectors/SettingsSelectors'

const PersonMdHeader = () => {
    const location = useLocation()
    const companyData = useSelector(getCompanyProfileSelector)

    return (
        <div
            className='card mb-2 mb-13 h-md-225px shadow overflow-auto bg-cmwhite'
            style={{marginTop: '-42px', borderRadius: '12px'}}
        >
            <div className='card-body pt-9 pb-0'>
                <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
                    <div className='me-7 mb-4'>
                        <div className='symbol symbol-100px ms-6 symbol-lg-160px symbol-fixed position-relative'>
                            <CustomImage
                                type={IMAGE_TYPE.companyLogo}
                                style={{width: '130px', height: '130px'}}
                                src={companyData.logo}
                                alt='Metornic'
                            />
                        </div>
                    </div>

                    <div className='flex-grow-1'>
                        <div className='d-flex justify-content-between align-items-start flex-wrap'>
                            <div className='d-flex flex-column'>
                                <div className='d-flex align-items-center'>
                                    <a
                                        href='#'
                                        style={{
                                            fontSize: '18px',
                                            color: '#3F4254',
                                            fontFamily: 'Manrope',
                                            fontWeight: '600',
                                        }}
                                        className=' text-hover-primary me-1'
                                    >
                                        {companyData.name}
                                    </a>
                                    <div
                                        className='ms-1'
                                        style={{
                                            background: 'rgba(0, 194, 71, 0.1)',
                                            width: '70px',
                                            height: '20px',
                                            color: '#00C247',
                                            borderRadius: '12px',
                                            fontFamily: 'Manrope',
                                            display: 'flex',
                                            fontWeight: '600',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontSize: '12px',
                                        }}
                                    >
                                        Solar
                                    </div>
                                </div>

                                <div
                                    style={{fontFamily: 'Manrope', fontWeight: '500'}}
                                    className='d-flex-col flex-wrap col fs-12 pe-2'
                                >
                                    <a
                                        href='#'
                                        style={{
                                            fontFamily: 'Manrope',
                                            fontSize: '12px',
                                            color: '#757575                    ',
                                        }}
                                        className='d-flex align-items-center  text-hover-primary me-5 mb-2'
                                    >
                                        <i
                                            style={{
                                                color: '#757575',
                                                width: '10.94px',
                                                // height: '12.55px'
                                            }}
                                            className='bi bi-geo-alt me-3 mt-1'
                                        ></i>
                                        {companyData.address}
                                    </a>
                                    <a
                                        href='#'
                                        style={{
                                            fontFamily: 'Manrope',
                                            fontSize: '12px',
                                            color: '#757575                    ',
                                        }}
                                        className='d-flex align-items-center  text-hover-primary me-5 mb-2'
                                    >
                                        <i
                                            style={{
                                                color: '#757575',
                                                width: '12.52px',
                                                // height: '12.54px'
                                            }}
                                            className='bi bi-telephone me-2 mt-0'
                                        ></i>

                                        {formattedPhoneNumber(companyData.phone_number)}
                                    </a>
                                    <a
                                        href='#'
                                        style={{
                                            fontFamily: 'Manrope',
                                            fontSize: '12px',
                                            color: '#757575                    ',
                                        }}
                                        className='d-flex align-items-center text-hover-primary mb-2'
                                    >
                                        <i
                                            style={{
                                                color: '#757575',
                                                width: '12.54px',
                                                // height: '10.79px'
                                            }}
                                            className='bi bi-envelope me-3 mt-0'
                                        ></i>
                                        sales@keenthemes.io
                                    </a>
                                </div>
                            </div>

                            <div className='d-flex'>
                                <button
                                    // onClick={() => navigate('/account/settings')}
                                    style={{
                                        background: '#6078EC',
                                        color: 'white',
                                        fontFamily: 'Manrope',
                                        width: '122px',
                                        // height: '43px',
                                        fontWeight: '700',
                                        fontSize: '14px',
                                    }}
                                    className='btn btn-lg me-6'
                                    data-bs-toggle='modal'
                                    data-bs-target='#kt_modal_offer_a_deal'
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='text-cmGrey400 py-0 my-0' />
                <div className='d-flex justify-content-between overflow-auto ms-5'>
                    <ul
                        style={{
                            fontFamily: 'Manrope',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#9E9E9E',
                        }}
                        className=' w-100 nav nav-stretch nav-line-tabs nav-line-tabs-8x border-transparent flex-nowrap'
                    >
                        <li className='nav-item bg-cmwhite'>
                            <Link
                                className={
                                    `nav-link ` +
                                    (location.pathname === '/setting/setup' && 'active')
                                }
                                to='/marketing-deal/md-list/md-per-person/health'
                                style={{
                                    color:
                                        location.pathname ===
                                            '/marketing-deal/md-list/md-per-person/health' &&
                                        'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                            >
                                Health
                            </Link>
                        </li>
                        <li className='nav-item ms-7 bg-cmwhite'>
                            <Link
                                style={{
                                    color:
                                        location.pathname ===
                                            '/marketing-deal/md-list/md-per-person/employees' &&
                                        'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                                className={
                                    `nav-link  me-9 ` +
                                    (location.pathname === '/setting/location' && 'active')
                                }
                                to='/marketing-deal/md-list/md-per-person/employees'
                            >
                                Employees
                            </Link>
                        </li>
                        <li className='nav-item ms-5 bg-cmwhite'>
                            <Link
                                style={{
                                    color:
                                        location.pathname ===
                                            '/marketing-deal/md-list/md-per-person/cost-tracking' &&
                                        'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                                className={
                                    `nav-link  me-9 ` +
                                    (location.pathname === '/setting/cost-center' && 'active')
                                }
                                to='/marketing-deal/md-list/md-per-person/cost-tracking'
                            >
                                Cost Tracking
                            </Link>
                        </li>
                        <li className='nav-item ms-4 bg-cmwhite'>
                            <Link
                                style={{
                                    color:
                                        location.pathname ===
                                            '/marketing-deal/md-list/md-per-person/earnings' &&
                                        'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                                className={
                                    `nav-link me-9 ` +
                                    (location.pathname ===
                                        '/marketing-deal/md-list/md-per-person/earnings' &&
                                        'active')
                                }
                                to='/marketing-deal/md-list/md-per-person/earnings'
                            >
                                Earnings
                            </Link>
                        </li>
                        <li className='nav-item ms-4 bg-cmwhite'>
                            <Link
                                style={{
                                    color:
                                        location.pathname ===
                                            '/marketing-deal/md-list/md-per-person/costs' &&
                                        'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                                className={
                                    `nav-link  me-9 ` +
                                    (location.pathname === '/setting/position' && 'active')
                                }
                                to='/marketing-deal/md-list/md-per-person/costs'
                            >
                                Costs
                            </Link>
                        </li>
                        <li className='nav-item ms-4 bg-cmwhite'>
                            <Link
                                className={
                                    `nav-link  me-9 ` +
                                    (location.pathname === '/setting/alert' && 'active')
                                }
                                style={{
                                    color:
                                        location.pathname === '/setting/alert' && 'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                                to='/marketing-deal/md-list/md-per-person/payroll'
                            >
                                Payroll
                            </Link>
                        </li>
                        <li className='nav-item ms-4 bg-cmwhite'>
                            <Link
                                className={
                                    `nav-link  me-9 ` +
                                    (location.pathname === '/setting/alert' && 'active')
                                }
                                style={{
                                    color:
                                        location.pathname === '/setting/alert' && 'active'
                                            ? '#6078EC'
                                            : '#9E9E9E',
                                }}
                                to='/marketing-deal/md-list/md-per-person/reconcilliations'
                            >
                                Reconciliations
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export {PersonMdHeader}
