import React, {useCallback, useState} from 'react'
import CustomImage from '../../../../../../../customComponents/customImage/CustomImage'
import RedirectToEmployeeProfile from '../../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import {formattedNumberFields} from '../../../../../../../helpers/CommonHelpers'
import {useLocation} from 'react-router-dom'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import {changeOverrideStatusService} from '../../../../../../../services/Services'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import AccessRights from '../../../../../../../accessRights/AccessRights'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../../customComponents/customButtton/CustomButton'
import CustomLottie from '../../../../../../../customComponents/customLottie/CustomLottie'
import successIndicator from '../../../../../../../assets/lottieAnimation/successIndicator.json'
import failIndicator from '../../../../../../../assets/lottieAnimation/failIndicator.json'
import CustomEditIcon from '../../../../../../../customComponents/customIcons/CustomEditIcon'
import {EditManualOverride} from './EditManualOverride'
const NetworkCard = ({
    data,
    Type,
    showEnableDisableButton,
    getData,
    userId,
    overrideOnOff,
    employeeData,
}) => {
    const location = useLocation()
    const [showEditManualOverrideModal, setShowEditManualOverrideModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const changeStatus = () => {
        setLoading(true)
        let body = {}
        if (!overrideOnOff) {
            body = {
                user_id: data?.id,
                recruiter_id: userId,
                status: data?.status ? 0 : 1,
                type: Type,
            }
        } else {
            body = {
                user_id: userId,
                recruiter_id: data?.id,
                status: data?.status ? 0 : 1,
                type: Type,
            }
        }
        changeOverrideStatusService(body)
            .then(() => {
                CustomToast.success(`Override ${data?.status == 0 ? 'Disabled' : 'Enabled'}`)
                getData()
            })
            .finally(() => setLoading(false))
    }

    const onEditManualOverridePress = useCallback(() => {
        setShowEditManualOverrideModal(true)
    }, [])

    return (
        <div
            className='bg-cmwhite text-center w-sm-350px w-100 py-5 shadow-sm px-sm-0 '
            style={{fontFamily: 'Manrope', borderRadius: '12px', position: 'relative'}}
            key={data?.id}
        >
            <CustomLoader full visible={loading} />

            {/* type */}
            <div className='mb-10 d-flex justify-content-between px-5'>
                {!data?.status ? (
                    <CustomLottie lottieJson={successIndicator} loop height={30} width={30} />
                ) : (
                    <div
                        className={'bg-danger'}
                        style={{
                            height: '15px',
                            borderRadius: '50px',
                            width: '15px',
                        }}
                    />
                )}
                <div className='text-cmGrey500' style={{fontSize: '16px', fontWeight: 600}}>
                    {Type}
                    <AccessRights forSuperAdmin>
                        {Type == 'Manual' && (
                            <span className='ms-2'>
                                <CustomEditIcon onClick={onEditManualOverridePress} />
                            </span>
                        )}
                    </AccessRights>
                </div>
            </div>

            <div className='d-flex w-75 mx-auto gap-5 align-items-center'>
                <div>
                    <CustomImage
                        src={data?.image}
                        className='avatar'
                        style={{width: '60px', height: '60px'}}
                    />
                </div>
                <div className='my-5'>
                    {/* Profile Name */}
                    <div className='d-flex align-items-center gap-2'>
                        <div
                            className='text-cmGrey900 text-decoration-underline cursor-pointer'
                            style={{fontWeight: 700, fontSize: '18px'}}
                        >
                            <RedirectToEmployeeProfile employeeId={data?.id}>
                                {data?.first_name} {data?.last_name}
                            </RedirectToEmployeeProfile>
                        </div>
                    </div>
                    <div
                        className={`badge bg-opacity-10  text-start text-cmBlue-Crayola px-5 rounded-pill ${
                            data?.position === 'Setter'
                                ? 'bg-cmBlue-Crayola'
                                : 'bg-cmPositionCloser'
                        } `}
                        style={{fontSize: '12px'}}
                    >
                        {data?.sub_position_name}
                    </div>
                </div>
            </div>
            {/* Override & Total Overrides */}
            <div className='d-flex flex-wrap justify-content-center  gap-5 my-5'>
                <div className='border-cmDisabled border-1 border-dashed rounded py-1 px-4'>
                    <div className='text-cmGrey800' style={{fontSize: '14px', fontWeight: 700}}>
                        <spna> {data?.override}</spna>{' '}
                        <span>
                            {data?.override_type == 'percent' ? '%' : data?.override_type ?? 0}
                        </span>
                    </div>
                    <div
                        className='text-start text-cmGrey500'
                        style={{fontSize: '13px', fontWeight: '600'}}
                    >
                        Override
                    </div>
                </div>
                <div className='border-cmDisabled border-1 border-dashed rounded py-1 px-4'>
                    <div className='text-cmGrey800' style={{fontSize: '14px', fontWeight: 700}}>
                        {formattedNumberFields(data?.totalOverrides, '$')}
                    </div>
                    <div
                        className='text-start text-cmGrey500'
                        style={{fontSize: '13px', fontWeight: '600'}}
                    >
                        Total Overrides
                    </div>
                </div>
            </div>
            <div className='d-flex flex-wrap justify-content-center  gap-5 my-5'>
                <div className='border-cmDisabled border-1 border-dashed rounded py-1 px-4'>
                    <div className='text-cmGrey800' style={{fontSize: '14px', fontWeight: 700}}>
                        {data?.account ?? '0'}
                    </div>
                    <div
                        className='text-start text-cmGrey500'
                        style={{fontSize: '13px', fontWeight: '600'}}
                    >
                        Accounts
                    </div>
                </div>
                <div className='border-cmDisabled border-1 border-dashed rounded py-1 px-4'>
                    <div className='text-cmGrey800' style={{fontSize: '14px', fontWeight: 700}}>
                        {formattedNumberFields(data?.kwInstalled, '')}
                    </div>
                    <div
                        className='text-start text-cmGrey500'
                        style={{fontSize: '13px', fontWeight: '600'}}
                    >
                        KW Installed
                    </div>
                </div>
            </div>
            {/* Buttton */}
            <AccessRights customCondition={showEnableDisableButton}>
                {location.pathname?.includes('Network') && (
                    <CustomButton
                        buttonType={!data?.status ? BUTTON_TYPE.error : BUTTON_TYPE.primary}
                        buttonLabel={!data?.status ? 'Disable' : 'Enable'}
                        onClick={changeStatus}
                    />
                )}
            </AccessRights>

            {/* Edit Manual override */}
            {showEditManualOverrideModal ? (
                <EditManualOverride
                    type={overrideOnOff ? 'on' : 'of'}
                    overrideId={data?.manual_overrides_id}
                    show={showEditManualOverrideModal}
                    handleClose={() => {
                        setShowEditManualOverrideModal(false)
                        getData()
                    }}
                />
            ) : null}
        </div>
    )
}

export default NetworkCard
