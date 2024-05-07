import {useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {
    connectDisconnectIntegtationSettingService,
    getIntegrationByIdService,
    updateIntegratioSettingnService,
} from '../../../../../services/Services'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import {getIntegratioListnAction} from '../../../../../redux/actions/IntegrationActions'
import {INTEGRATIONS_ID} from '../../../../../constants/constants'

const useIntegrationSetting = ({show, data, handleClose}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [integrationData, setIntegrationData] = useState({
        userName: null,
        password: null,
        data_fetch_frequency: null,
        day: null,
        time: null,
        timezone: null,
        last_import: null,
    })

    useEffect(() => {
        if (show) {
            setLoading(true)
            getIntegrationByIdService(data?.id)
                .then((res) => {
                    setIntegrationData(res?.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [show])

    const updateIntegrationData = (field, value) => {
        setIntegrationData((val) => ({
            ...val,
            [field]: value,
        }))
    }

    const onChangeInputData = (e) => {
        updateIntegrationData(e?.target?.name, e?.target?.value)
    }

    const onSavePress = useCallback(() => {
        if (data?.id == INTEGRATIONS_ID.lgcy) {
            // LGCY
            if (!integrationData?.userName) return CustomToast.error('Enter username')
            if (!integrationData?.password) return CustomToast.error('Enter password')
        } else if (data?.id == INTEGRATIONS_ID.hubspot) {
            // HUBSPOT
            if (!integrationData?.api_key) return CustomToast.error('Enter API Key')
        } else if (data?.id == INTEGRATIONS_ID.everee) {
            // EVEREE
        } else if (data?.id == INTEGRATIONS_ID.jobNimbuss) {
            // JOB NIMBUSS
            if (!integrationData?.api_key) return CustomToast.error('Enter API Key')
        }

        if (!integrationData?.data_fetch_frequency)
            return CustomToast.error('Select data fetch frequency')
        if (!integrationData?.day) return CustomToast.error('Select timezone')
        if (!integrationData?.time) return CustomToast.error('Select time')
        if (!integrationData?.timezone) return CustomToast.error('Select timezone')

        setLoading(true)
        const body = {
            crm_id: data?.id,
            username: integrationData?.userName,
            password: integrationData?.password,
            api_key: integrationData?.api_key,
            company_id: data?.id,
            data_fetch_frequency: integrationData?.data_fetch_frequency,
            time: integrationData?.time,
            timezone: integrationData?.timezone,
            day: integrationData?.day,
        }
        updateIntegratioSettingnService(body)
            .then((res) => {
                if (!data?.status) {
                    connectDisconnectIntegtationSettingService(data?.id)
                        .then((res) => {
                            dispatch(getIntegratioListnAction())
                            handleClose()
                            CustomToast.success('Integration setting updated')
                            setLoading(false)
                        })
                        .catch((error) => {
                            CustomToast.error(error?.data?.message)
                            setLoading(false)
                        })
                } else {
                    dispatch(getIntegratioListnAction())
                    handleClose()
                    CustomToast.success('Integration setting updated')
                    setLoading(false)
                }
            })
            .catch((error) => {
                setLoading(false)
                CustomToast.error(error?.data?.message)
            })
    }, [
        data?.id,
        data?.status,
        dispatch,
        handleClose,
        integrationData?.api_key,
        integrationData?.data_fetch_frequency,
        integrationData?.day,
        integrationData?.password,
        integrationData?.time,
        integrationData?.timezone,
        integrationData?.userName,
    ])

    const onDisconnectPress = useCallback(() => {
        setLoading(true)
        connectDisconnectIntegtationSettingService(data?.id)
            .then(() => {
                dispatch(getIntegratioListnAction())
                handleClose()
                CustomToast.success('Integration setting disconnected')
            })
            .catch((error) => {
                CustomToast.error(error?.data?.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [data?.id, dispatch, handleClose])
    return {
        integrationData,
        onDisconnectPress,
        onChangeInputData,
        onSavePress,
        loading,
    }
}

export default useIntegrationSetting
