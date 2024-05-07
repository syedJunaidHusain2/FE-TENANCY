import {useState, useEffect, useCallback} from 'react'
import {getTierLevelService, updateTierLevelService} from '../../../../../../../services/Services'
import {
    getCompanySettingAction,
    updateCompanySettingAction,
} from '../../../../../../../redux/actions/SettingActions'
import {useDispatch, useSelector} from 'react-redux'
import {getCompanySettingSelector} from '../../../../../../../redux/selectors/SettingsSelectors'
const usePayrollCard = () => {
    const dispatch = useDispatch()
    const companySetting = useSelector(getCompanySettingSelector)
    const [more, setMore] = useState(false)
    const [edit, setEdit] = useState(false)
    const [showCreateAppModal, setShowCreateAppModal] = useState(false)
    const [tiredcommission, setTiredCommission] = useState()
    const [upfront, setUpfront] = useState([])
    const [loading, setLoading] = useState(false)
    const [overrides, setOverrides] = useState([])

    useEffect(() => {
        dispatch(getCompanySettingAction())
    }, [])

    useEffect(function () {
        getTierLevel()
    }, [])
    const [checktier, setCheckTier] = useState(false)

    const handleTier = useCallback(() => {
        if (companySetting?.tier) {
            setMore(false)
            setEdit(false)
            dispatch(updateCompanySettingAction('tier'))
        } else {
            dispatch(updateCompanySettingAction('tier'))
        }
    }, [companySetting?.tier, dispatch])

    const handleUpfront = (e, field) => {
        const data = upfront
        data[field] = e.target.value
        setUpfront(data)
    }
    const handleUpfrontcheck = (e, field) => {
        const data = upfront
        data[field] = e
        setUpfront(data)
    }
    const handleoveridescheck = (e, field) => {
        const data = overrides
        data[field] = e
        setOverrides(data)
    }
    const handletiredcommissioncheck = (e, field) => {
        if (tiredcommission?.is_check == 1) {
            const data = tiredcommission
            data['is_check'] = 0
            setTiredCommission(data)
        } else {
            const data = tiredcommission
            data['is_check'] = 1
            setTiredCommission(data)
        }
    }
    const handletiredcommission = (e, field) => {
        const data = tiredcommission
        data[field] = e.target.value
        setTiredCommission(data)
    }

    const handleoverides = (e, field) => {
        const data = overrides
        data[field] = e.target.value
        setOverrides(data)
    }

    const getTierLevel = () => {
        getTierLevelService()
            .then((res) => {
                setTiredCommission({
                    ...res.data[0],
                    ...(!res?.data?.[0]?.status && {
                        scale_based_on: 'Monthly',
                        shifts_on: 'Monthly',
                        Reset: 'Monthly',
                    }),
                })
                setUpfront({
                    ...res.data[1],
                    ...(!res?.data?.[1]?.status && {
                        scale_based_on: 'Monthly',
                        shifts_on: 'Monthly',
                        Reset: 'Monthly',
                    }),
                })
                setOverrides({
                    ...res.data[2],
                    ...(!res?.data?.[2]?.status && {
                        scale_based_on: 'Monthly',
                        shifts_on: 'Monthly',
                        Reset: 'Monthly',
                    }),
                })
                setCheckTier(true)
            })
            .catch((e) => {
                setCheckTier(false)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const toggleMorePress = useCallback((value) => {
        setMore(value)
        if (!value) setEdit(false)
    }, [])

    const onSavePress = () => {
        setLoading(true)
        var body = {
            status: 1,
            tier_setting_id: 1,
            data: [
                {
                    id: tiredcommission.id,
                    is_check: tiredcommission?.is_check,
                    scale_based_on: tiredcommission.scale_based_on,
                    shifts_on: tiredcommission.shifts_on,
                    rest: tiredcommission.Reset,
                },
                {
                    id: upfront.id,
                    scale_based_on: upfront.scale_based_on,
                    is_check: upfront?.is_check,
                    shifts_on: upfront.shifts_on,
                    rest: upfront.Reset,
                },
                {
                    id: overrides.id,
                    scale_based_on: overrides.scale_based_on,
                    is_check: overrides?.is_check,
                    shifts_on: overrides.shifts_on,
                    rest: overrides.Reset,
                },
            ],
        }

        updateTierLevelService(body)
            .then((res) => {
                setMore(true)
                setEdit(false)
                getTierLevel()
            })
            .finally((e) => {
                setLoading(false)
            })
    }
    const onEditButtonPress = useCallback(() => {
        setEdit(true)
    }, [])

    return {
        companySetting,
        checktier,
        handleTier,
        handletiredcommissioncheck,
        handleUpfrontcheck,
        handleoveridescheck,
        getTierLevel,
        more,
        edit,
        toggleMorePress,
        onEditButtonPress,
        onSavePress,
        showCreateAppModal,
        setShowCreateAppModal,
        tiredcommission,
        upfront,
        overrides,
        handleUpfront,
        handleoverides,
        handletiredcommission,
        loading,
        setLoading,
    }
}

export default usePayrollCard
