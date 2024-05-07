import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react'
import {
    addDomainSettingService,
    deleteDomainSettingService,
    getDomainSettingService,
    getEmailNotificationSettingService,
    updateDomainSettingService,
    updateEmailNotificationSettingService,
    getPositionByDeparmentService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import {confirmDialog} from 'primereact/confirmdialog'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import {getBooleanValue, getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomDelete from '../../../../../../customComponents/customIcons/CustomDelete'
import CustomCheckbox from '../../../../../../customComponents/customCheckbox/CustomCheckbox'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'

const AlertsEmail = () => {
    const [toggle, setToggle] = useState(false)
    const [domainToggle, setDomainToggle] = useState(false)
    const [domainData, setDomainData] = useState(null)
    const [domainName, setDomainName] = useState(null)
    const [loading, setLoading] = useState(false)
    const [domainError, setDomainError] = useState('')
    const [isAllDomainAllowed, setIsAllDomainAllowed] = useState(false)
    const [confirmPop, setConfirmPop] = useState(false)

    useEffect(() => {
        getEmailSeting()
    }, [])
    const getEmailSeting = () => {
        setLoading(true)
        getEmailNotificationSettingService().then((res) => {
            setToggle(res?.data[0]?.status == 1 ? true : false)
            // setEmaildata(res?.data)
            getDomain()
        })
    }
    const getDomain = () => {
        getDomainSettingService()
            .then((res) => {
                setIsAllDomainAllowed(res?.email_setting_type)
                setDomainData(res.data)
            })
            .finally(() => setLoading(false))
    }
    const updateEmailSetting = (status) => {
        setToggle(!toggle)
        setLoading(true)
        const body = {
            company_id: '1',
            status: status == false ? 0 : 1,
        }
        updateEmailNotificationSettingService(body)
            .then((res) => getEmailSeting())
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }
    const addDomain = () => {
        const body = {
            domain_setting: [
                {
                    domain_name: domainName,
                    status: '1',
                },
            ],
        }
        if (!body.domain_setting[0]?.domain_name) return setDomainError('Enter domain name')
        setLoading(true)
        addDomainSettingService(body)
            .then(() => {
                setDomainName('')
                getDomain()
                CustomToast.success('Domain created successfully')
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)

                setDomainError('')
            })
    }
    const updateDomainSetting = (status, name, id) => {
        let data = domainData?.map((res) => {
            if (res?.id == id) {
                return {...res, status: status == 1 ? 0 : 1}
            } else {
                return res
            }
        })
        setDomainData(data)

        setLoading(true)
        const body = {
            domain_name: name,
            status: status == 1 ? 0 : 1,
            id: id,
        }
        updateDomainSettingService(body)
            .then((res) => getDomain())
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => CustomToast.success('Domain updated successfully'))
    }
    const deleteDomain = (id) => {
        setConfirmPop(true)
        setLoading(true)
        deleteDomainSettingService(id)
            .then(() => getDomain())
            .finally(() => CustomToast.success('Domain deleted successfully'))
    }

    const onEnableDisableAllPress = useCallback(() => {
        setLoading(true)
        const body = {
            email_setting_type: isAllDomainAllowed == 1 ? 0 : 1,
        }
        updateDomainSettingService(body)
            .then((res) => getDomain())
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() =>
                CustomToast.success(
                    isAllDomainAllowed == 1
                        ? 'Domain settings updated successfully. Please review custom domains'
                        : 'Domain settings updated successfully'
                )
            )
    }, [isAllDomainAllowed])

    return (
        <div
            className='bg-cmwhite w-100 shadow-sm '
            style={{fontWeight: '600', borderRadius: '10px', position: 'relative'}}
        >
            <CustomLoader full visible={loading} />

            {/* begins */}
            <div className='d-flex flex-row justify-content-between'>
                <div className='d-flex align-items-center gap-10 px-10 py-5'>
                    <div
                        className='text-cmBlack'
                        style={{
                            fontWeight: '700',
                            fontSize: '16px',
                            fontFamily: fontsFamily.manrope,
                            lineHeight: '21.86px',
                        }}
                    >
                        Email
                    </div>

                    <div className=' form-switch form-check-custom form-check-solid my-auto'>
                        <input
                            className='cursor-pointer form-check-input h-20px w-35px '
                            type='checkbox'
                            value=''
                            id='flexSwitchDefault'
                            checked={toggle}
                            onChange={() => updateEmailSetting(!toggle)}
                        />
                    </div>
                </div>
                {toggle ? (
                    <div className='d-flex justify-content-between align-items-center gap-5 me-5'>
                        <CustomCheckbox
                            checked={getBooleanValue(isAllDomainAllowed) == 1}
                            onChange={onEnableDisableAllPress}
                        />
                        <div
                            className='text-cmGrey900'
                            style={{
                                fontWeight: 600,
                                fontSize: '14px',
                                fontFamily: 'Manrope',
                            }}
                        >
                            Allow all domains
                        </div>
                    </div>
                ) : null}
            </div>
            <hr className='m-0 p-0 text-cmGrey500' />
            {/* body */}
            {toggle && (
                <div className=''>
                    {/* emails */}
                    {domainData?.length > 0 ? (
                        domainData?.map((item) => (
                            <div className='py-3 px-10 stripRow' key={item?.id}>
                                {/* Seqifi.com starts */}
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='d-flex justify-content-between align-items-center gap-5'>
                                        <div className=' form-switch form-check-custom form-check-solid my-auto'>
                                            <input
                                                className='cursor-pointer form-check-input h-20px w-35px '
                                                type='checkbox'
                                                value={''}
                                                checked={item?.status == 1 ? true : false}
                                                id='flexSwitchDefault'
                                                onChange={() =>
                                                    updateDomainSetting(
                                                        item?.status,
                                                        item?.domain_name,
                                                        item?.id
                                                    )
                                                }
                                            />
                                        </div>
                                        <div
                                            className='text-cmGrey900'
                                            style={{
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            {item?.domain_name}
                                        </div>
                                    </div>

                                    <CustomDelete
                                        onClick={() => {
                                            CustomDialog.warn(
                                                'Are you sure you want to delete ?',
                                                () => {
                                                    deleteDomain(item?.id)
                                                }
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <></>
                    )}

                    <div className='d-flex gap-sm-20 gap-5 align-items-center px-10 py-10 '>
                        <CustomInput
                            type={INPUT_TYPE.email}
                            errorMessage={domainError}
                            placeholder='Domain'
                            value={domainName}
                            onChange={(e) => setDomainName(e.target.value)}
                        />

                        <CustomButton
                            buttonType={BUTTON_TYPE.primary}
                            buttonLabel='Add'
                            padding={'px-10'}
                            onClick={addDomain}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default AlertsEmail
