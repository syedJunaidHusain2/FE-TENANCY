import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {getUserProfileAction} from '../../../redux/actions/AuthActions'
import {updateUserImageService} from '../../../services/Services'
import CustomLoader from '../../../customComponents/customLoader/CustomLoader'
import {
    formattedPhoneNumber,
    getErrorMessageFromResponse,
    getServerImage,
} from '../../../helpers/CommonHelpers'
import moment from 'moment'
import CustomImage from '../../../customComponents/customImage/CustomImage'
import CustomToast from '../../../customComponents/customToast/CustomToast'

const ViewProfileHeader = ({employeeData, getProfile}) => {
    const [profileImage, setProfileImage] = useState(employeeData?.image)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const companyProfileFilePickerRef = useRef()
    const [hover, setHover] = useState(false)
    const onHover = () => {
        setHover(true)
    }

    useEffect(() => {
        if (employeeData?.image) setProfileImage(employeeData?.image)
    }, [employeeData?.image])
    const onLeave = () => {
        setHover(false)
    }
    const updateCompanyProfileData = useCallback((value) => {
        const body = {
            user_id: location?.state?.employee_id,
            image: value,
        }
        updateUserImageService(body)
            .then(() => {
                dispatch(getUserProfileAction())
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                getProfile()
            })
    }, [])
    return (
        <div
            className='card mb-2 mb-13 h-md-225px h-auto shadow-sm overflow-auto bg-cmwhite'
            style={{marginTop: '-42px', borderRadius: '12px'}}
        >
            <CustomLoader full visible={!employeeData} />
            <div className='card-body pt-9 pb-0'>
                <div className='d-flex flex-wrap flex-sm-nowrap mb-3 '>
                    <div className='me-7 mb-4'>
                        <div
                            className='symbol symbol-100px ms-6 symbol-lg-160px symbol-fixed position-relative cursor-pointer'
                            onMouseEnter={onHover}
                            onMouseLeave={onLeave}
                            style={{
                                borderRadius: '100px',
                                overflow: 'hidden',
                            }}
                        >
                            <div style={{position: 'relative', width: '130px', height: '130px'}}>
                                {hover && (
                                    <div
                                        onClick={() =>
                                            companyProfileFilePickerRef?.current?.click()
                                        }
                                        style={{
                                            position: 'absolute',
                                            height: '100%',
                                            borderRadius: '100px',
                                            overflow: 'hidden',
                                            justifyContent: 'center',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                        }}
                                    >
                                        <span className='bi bi-pencil-fill fs-15 py-1 px-2 text-white shadow-sm rounded cursor-pointer'></span>
                                    </div>
                                )}
                                <CustomImage
                                    style={{width: '130px', height: '130px'}}
                                    customSrc={
                                        profileImage?.type
                                            ? URL.createObjectURL(profileImage)
                                            : getServerImage(profileImage)
                                    }
                                    alt='Metornic'
                                />
                            </div>
                        </div>
                        <input
                            ref={companyProfileFilePickerRef}
                            type='file'
                            name='logo'
                            accept='.png,.jpeg,.jpg,.heic'
                            onChange={(e) => {
                                setProfileImage(e?.target?.files?.[0])
                                updateCompanyProfileData(e?.target?.files?.[0])
                            }}
                            style={{display: 'none'}}
                        />
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
                                        {employeeData?.first_name} {employeeData?.last_name}
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
                                        {employeeData?.position}
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
                                        className='d-flex align-items-center  text-hover-primary me-5 mb-2 '
                                    >
                                        <i
                                            style={{
                                                color: '#757575',
                                                width: '10.94px',
                                                // height: '12.55px'
                                            }}
                                            className='bi bi-geo-alt me-3 mt-1'
                                        ></i>
                                        {employeeData?.state_name}
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
                                        {formattedPhoneNumber(employeeData.mobile_no)}
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
                                        {employeeData?.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='modal-header'></div> */}
                <hr className='text-cmGrey400 py-0 my-0' />
                <div className='d-flex justify-content-between ms-5 overflow-auto'>
                    <ul
                        style={{
                            fontFamily: 'Manrope',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                        className=' w-100 nav nav-stretch nav-line-tabs nav-line-tabs-8x border-transparent flex-nowrap'
                    >
                        <li className='nav-item'>
                            <Link
                                className={`nav-link ${
                                    location.pathname.includes('personal-info') && 'active'
                                        ? 'text-cmBlue-Crayola '
                                        : 'text-cmGrey500'
                                }`}
                                to='personal-info'
                                state={{employee_id: location?.state?.employee_id}}
                            >
                                Personal Info
                            </Link>
                        </li>
                        <li className='nav-item ms-7'>
                            <Link
                                className={`nav-link  me-9 ${
                                    location.pathname.includes('employment-package') && 'active'
                                        ? 'text-cmBlue-Crayola'
                                        : 'text-cmGrey500'
                                }`}
                                to='employment-package'
                                state={{employee_id: location?.state?.employee_id}}
                            >
                                Employment Package
                            </Link>
                        </li>
                        <li className='nav-item ms-7'>
                            <Link
                                className={`nav-link ${
                                    location.pathname.includes('tax-info') && 'active'
                                        ? 'text-cmBlue-Crayola '
                                        : 'text-cmGrey500'
                                }`}
                                to='tax-info'
                                state={{employee_id: location?.state?.employee_id}}
                            >
                                Tax Info
                            </Link>
                        </li>
                        <li className='nav-item ms-7'>
                            <Link
                                className={`nav-link  me-9 ${
                                    location.pathname.includes('banking') && 'active'
                                        ? 'text-cmBlue-Crayola'
                                        : 'text-cmGrey500'
                                }`}
                                to='banking'
                                state={{employee_id: location?.state?.employee_id}}
                            >
                                Banking
                            </Link>
                        </li>
                        <li className='nav-item ms-7'>
                            <Link
                                className={`nav-link  me-9 ${
                                    location.pathname.includes('document') && 'active'
                                        ? 'text-cmBlue-Crayola'
                                        : 'text-cmGrey500'
                                }`}
                                to='document'
                                state={{employee_id: location?.state?.employee_id}}
                            >
                                Document
                            </Link>
                        </li>
                        {/* Access_remaning */}
                        <li className='nav-item ms-7'>
                            <Link
                                className={`nav-link  me-9 ${
                                    location.pathname.includes('network') && 'active'
                                        ? 'text-cmBlue-Crayola'
                                        : 'text-cmGrey500'
                                }`}
                                to='network'
                                // state={{employee_id: location?.state?.employee_id}}
                            >
                                Network
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ViewProfileHeader
