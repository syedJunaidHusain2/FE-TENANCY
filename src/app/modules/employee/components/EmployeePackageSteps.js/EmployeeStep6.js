import React from 'react'
import {useNavigate} from 'react-router-dom'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import {IMAGE_TYPE} from '../../../../../helpers/CommonHelpers'

const EmployeeStep6 = ({globalCompanyProfile}) => {
    return (
        <div
            className='w-100 mx-auto mb-20 mt-2 '
            style={{fontSize: '14px', fontFamily: 'Manrope'}}
        >
            <div
                className='text-cmGrey600 text-center mb-10'
                style={{fontWeight: '500', fontSize: '20px'}}
            >
                <div className='text-cmGrey800'> Congratulations! </div>We are excited to have you
                join the team!
            </div>
            <div className='w-auto text-center'>
                <CustomImage
                    src={globalCompanyProfile?.logo}
                    type={IMAGE_TYPE.companyLogo}
                    alt='Company logo'
                    // style={{width: '100%'}}
                    className='w-25'
                />{' '}
                <div
                    className='text-cmGrey900 text-center mb-10'
                    style={{fontWeight: '800', fontSize: '20px'}}
                >
                    {globalCompanyProfile?.name}
                </div>
            </div>
            <div
                className='text-cmGrey700 text-center'
                style={{fontWeight: '500', fontSize: '18px'}}
            >
                We already notified the admin of your Onboarding form Submission!
            </div>
        </div>
    )
}

export default EmployeeStep6
