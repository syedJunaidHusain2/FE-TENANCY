import {useCallback, useMemo, useState} from 'react'
import {getValidDate} from '../../../../../constants/constants'
import settingIcon from '../assests/settingIcon.png'
import {IntregationSetting} from './IntregationSetting'
import TickCircle from '../assests/TickCircle.png'
import {
    connectDisconnectIntegtationSettingService,
    syncHubSpotDataService,
} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import AccessRights from '../../../../../accessRights/AccessRights'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import {IMAGE_TYPE, getServerImage} from '../../../../../helpers/CommonHelpers'
import {allPermissionsAccess} from '../../../../../accessRights/useCustomAccessRights'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {Badge} from '@mui/material'
import CustomButton, {BUTTON_SIZE} from '../../../../../customComponents/customButtton/CustomButton'
import CustomTooltip from '../../../../../customComponents/customTooltip/CustomTooltip'

const IntregationCards = ({data, onModalClose = () => {}}) => {
    const naviagte = useNavigate()
    const [showSettingModal, setShowSettingModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [syncLoading, setSyncLoading] = useState(false)

    const handleSettingModal = useCallback(() => {
        setShowSettingModal(true)
    }, [])

    const onConnectPress = useCallback(() => {
        if (!data?.status) {
            handleSettingModal()
        } else {
            setLoading(true)
            connectDisconnectIntegtationSettingService(data?.id)
                .then((res) => {
                    CustomToast.success(res?.message)
                    onModalClose()
                })
                .catch((error) => {
                    CustomToast.error(error?.data?.message)
                })
                .finally(() => {
                    setTimeout(() => setLoading(false), 2000)
                })
        }
    }, [data?.id, data?.status, handleSettingModal, onModalClose])

    const syncCRMData = useCallback((crmId) => {
        if (data?.id == 2) {
            setSyncLoading(true)
            syncHubSpotDataService()
                .then((res) => {
                    CustomToast.success('Synced Successfully')
                    onModalClose()
                })
                .catch((err) => CustomToast.error('Sync failed'))
                .finally(() => {
                    setSyncLoading(false)
                })
        }
    }, [])

    const syncDataCount = useMemo(() => {
        if (data?.id == 1) return 0
        if (data?.id == 2) return data?.hubspot_pending
    }, [data?.hubspot_pending, data?.id])

    return (
        <div
            className={`card w-sm-350px h-275px shadow`}
            style={{fontFamily: 'Manrope', borderRadius: '12px'}}
        >
            <CustomLoader visible={loading} full />
            <div className='card-body py-10'>
                <div className='px-10'>
                    <div className='d-flex justify-content-between align-items-center mb-10'>
                        <div
                            className='d-flex align-items-center justify-content-center'
                            style={{background: '#F5F5F5', borderRadius: '6px'}}
                        >
                            <CustomImage
                                type={IMAGE_TYPE.noImage}
                                customSrc={getServerImage(data?.logo)}
                                style={{width: 46, borderRadius: '22%'}}
                            />
                        </div>
                        {data?.status == 1 && (
                            <div
                                className='d-flex align-items-center justify-content-center px-3 py-1'
                                style={{
                                    background: 'rgba(0, 194, 71, 0.1)',
                                    color: '#00C247',
                                    fontWeight: '700',
                                    fontSize: '12px',
                                    borderRadius: '6px',
                                }}
                            >
                                {'Active'}
                            </div>
                        )}
                        {data?.status == 0 && (
                            <div
                                className='d-flex align-items-center justify-content-center px-3 py-1'
                                style={{
                                    background: 'rgba(255, 51, 51, 0.1)',
                                    color: '#FF3333',
                                    fontWeight: '700',
                                    fontSize: '12px',
                                    borderRadius: '6px',
                                }}
                            >
                                {'Inactive'}
                            </div>
                        )}
                        {data?.status == 2 && (
                            <div
                                className='d-flex align-items-center justify-content-center px-3 py-1'
                                style={{
                                    background: 'rgba(0, 76, 232, 0.1)',
                                    color: '#004CE8',
                                    fontWeight: '700',
                                    fontSize: '12px',
                                    borderRadius: '6px',
                                }}
                            >
                                {'In Progress'}
                            </div>
                        )}
                    </div>
                    <div className='d-flex justify-content-between align-items-center mb-10'>
                        <div>
                            <div className='mb-3' style={{fontSize: '20px', fontWeight: '600'}}>
                                {data?.name}
                            </div>
                            <div className='text-cmGrey400' style={{fontWeight: 600}}>
                                {'CRM'}
                            </div>
                        </div>
                        <AccessRights
                            customCondition={
                                allPermissionsAccess.administrator.integrations.integrations.edit
                            }
                        >
                            <div className='d-flex align-items-center gap-7'>
                                {data?.status == 1 && (
                                    <>
                                        <CustomTooltip title='View log'>
                                            <span>
                                                <KTSVG
                                                    svgStyle={{width: '24px', height: '24px'}}
                                                    path='/media/icons/duotune/art/Document-IconBlack.svg'
                                                    className='cursor-pointer'
                                                    onClick={() =>
                                                        naviagte('view-log', {
                                                            state: {id: data?.id, name: data?.name},
                                                        })
                                                    }
                                                />
                                            </span>
                                        </CustomTooltip>
                                        <CustomTooltip title='Settings'>
                                            <img
                                                src={settingIcon}
                                                alt=''
                                                width={21.52}
                                                className='cursor-pointer'
                                                onClick={handleSettingModal}
                                            />
                                        </CustomTooltip>
                                        {/* {syncDataCount > 0 ? ( */}
                                        {data?.id == 2 ? (
                                            <>
                                                <CustomTooltip title='Sync'>
                                                    <Badge
                                                        color='primary'
                                                        badgeContent={syncDataCount}
                                                        max={500}
                                                        style={{paddingTop: '3px'}}
                                                    >
                                                        <i
                                                            className={`pi ${
                                                                syncLoading ? 'pi-spin' : null
                                                            } pi-sync cursor-pointer p-overlay-badge`}
                                                            style={{fontSize: '1.4rem'}}
                                                            onClick={
                                                                !syncLoading
                                                                    ? () => syncCRMData()
                                                                    : null
                                                            }
                                                        />
                                                    </Badge>
                                                </CustomTooltip>
                                            </>
                                        ) : null}
                                        {/* ) : null} */}
                                    </>
                                )}
                            </div>
                        </AccessRights>
                    </div>
                </div>
                {syncLoading ? (
                    <div className='text-center text-cmGrey400'>Syncing..</div>
                ) : (
                    <div></div>
                )}
                <AccessRights
                    customCondition={
                        allPermissionsAccess.administrator.integrations.integrations.edit
                    }
                >
                    <div className=''>
                        {data?.status == 0 && (
                            <div className='text-center'>
                                <CustomButton
                                    buttonLabel='Connect'
                                    buttonSize={BUTTON_SIZE.large}
                                    onClick={onConnectPress}
                                />
                            </div>
                        )}

                        {data?.last_import && data?.status == 1 && (
                            <div
                                className='text-center'
                                style={{color: '#424242', fontSize: '14px', fontWeight: '600'}}
                            >
                                <div className='d-flex justify-content-center align-items-center gap-2'>
                                    <img src={TickCircle} alt='' width={12.5} />
                                    <div>{'Last Successful Import'}</div>
                                </div>
                                <div>{getValidDate(data?.last_import, 'YYYY/MM/DD,hh:mm')}</div>
                            </div>
                        )}
                    </div>
                </AccessRights>
            </div>
            {showSettingModal ? (
                <IntregationSetting
                    data={data}
                    show={showSettingModal}
                    handleClose={() => setShowSettingModal(false)}
                />
            ) : null}
        </div>
    )
}

export {IntregationCards}
