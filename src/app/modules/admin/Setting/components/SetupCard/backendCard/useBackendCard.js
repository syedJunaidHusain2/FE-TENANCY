import {useState, useEffect, useCallback, useMemo} from 'react'
import {
    checkReconciliationSettingService,
    updateCompanyReconcilationService,
} from '../../../../../../../services/Services'
import {useDispatch, useSelector} from 'react-redux'
import _ from 'lodash'
import {
    getCompanyReconciliationAction,
    getCompanySettingAction,
    updateCompanySettingAction,
} from '../../../../../../../redux/actions/SettingActions'
import {
    getCompanySettingSelector,
    getReconciliationScheduleSelector,
} from '../../../../../../../redux/selectors/SettingsSelectors'
import {getValidDate} from '../../../../../../../constants/constants'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import moment from 'moment'
import {getErrorMessageFromResponse} from '../../../../../../../helpers/CommonHelpers'

const useBackendCard = () => {
    const dispatch = useDispatch()
    const reconciliationList = useSelector(getReconciliationScheduleSelector)
    const [more, setMore] = useState(false)
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [reconciliation, setReconciliation] = useState([])
    const [noOfReconcilationSchedule, setNoOfReconcilationSchedule] = useState(null)
    const companySetting = useSelector(getCompanySettingSelector)

    useEffect(() => {
        dispatch(getCompanySettingAction())
        getReconliation()
    }, [])

    useEffect(() => {
        if (reconciliationList?.length > 0) setMore(true)
        setReconciliation(reconciliationList)
    }, [reconciliationList])

    const getReconliation = useCallback(
        () =>
            new Promise((resolve) => {
                setLoading(true)
                dispatch(getCompanyReconciliationAction())
                    .then((res) => {
                        setNoOfReconcilationSchedule(res.length)
                    })
                    .finally(() => {
                        setLoading(false)
                        resolve(true)
                    })
            }),
        [dispatch]
    )

    const toggleMorePress = useCallback((value) => {
        setMore(value)
        if (!value) setEdit(false)
    }, [])

    const onEditButtonPress = useCallback(() => {
        setEdit(true)
    }, [])
    const handleReconciliation = useCallback(() => {
        if (companySetting?.reconciliation) {
            dispatch(updateCompanySettingAction('reconciliation'))
            return
            setLoading(true)
            // const body = {
            //     group_id: companySetting?.group_id,
            // }
            checkReconciliationSettingService()
                .then((res) => {
                    if (res?.checkStatus)
                        return CustomToast.error(
                            "If an employee's reconciliation is in payroll, you can't turn reconciliation off"
                        )
                    setMore(false)
                    setEdit(false)
                    dispatch(updateCompanySettingAction('reconciliation'))
                })
                .finally(() => setLoading(false))
        } else {
            if (reconciliation?.length > 0) {
                dispatch(updateCompanySettingAction('reconciliation'))
            } else {
                CustomToast.info('First you need to add atleast 1 reconciliation period')
                setEdit(true)
                setMore(true)
            }
        }
    }, [companySetting?.reconciliation, dispatch, reconciliation?.length])

    const onSavePress = useCallback(() => {
        const isFilledData = reconciliation.map((item) =>
            item?.period_from && item?.period_to && item?.period_from <= item?.period_to
                ? true
                : false
        )
        if (isFilledData.includes(false)) {
            CustomToast.error(
                'Please add remaining / valid schedule period from and period to dates'
            )
        } else {
            setLoading(true)
            const Schedule = reconciliation?.map((item) => ({
                period_from: getValidDate(item?.period_from, 'YYYY-MM-DD'),
                period_to: getValidDate(item?.period_to, 'YYYY-MM-DD'),
            }))

            updateCompanyReconcilationService({Schedule})
                .then((r) => {
                    getReconliation()
                    setMore(true)
                    setEdit(false)
                    CustomToast.success('Reconcilation updated')
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [getReconliation, reconciliation])

    const handleFromPeriod = useCallback(
        (date, index, field) => {
            // Object.freeze(reconciliation)
            let reconData = _.cloneDeep(reconciliation)
            let reconDataFinal = [...reconciliation]

            let formatedDate = getValidDate(date, 'YYYY-MM-DD')
            reconData = reconData?.filter((item, i) => i == index)
            reconData[0][field] = formatedDate
            reconDataFinal[index] = reconData[0]
            if (
                field == 'period_from' &&
                reconDataFinal[index].period_to &&
                reconDataFinal[index].period_from > reconDataFinal[index].period_to
            ) {
                reconDataFinal[index].period_to = ''
            }
            // reconData[index][field] = formatedDate
            // if (
            //   field == 'period_from' &&
            //   reconData[index].period_to &&
            //   reconData[index].period_from > reconData[index].period_to
            // ) {
            //   reconData[index].period_to = ''
            // }
            setReconciliation(reconDataFinal)
        },
        [reconciliation]
    )

    const onChangeNoOfReconcilationSchedule = useCallback(
        (e) => {
            setNoOfReconcilationSchedule(e?.target?.value)
            Object.freeze(reconciliation)
            let reconData = _.cloneDeep(reconciliation)
            if (Number(reconData?.length) > Number(e?.target?.value)) {
                const length = Number(reconData?.length) - Number(e?.target?.value)
                reconData?.splice(reconData?.length - length, length)
            } else {
                const length = Number(e?.target?.value) - Number(reconData?.length)
                if (length > 0) {
                    const newArr = new Array(length).fill({
                        id: null,
                        period_from: '',
                        period_to: '',
                        day_date: '',
                        backend_setting_id: null,
                    })

                    reconData = [...reconData, ...newArr]
                }
            }
            setReconciliation(reconData)
        },
        [reconciliation]
    )

    const reconDisableDates = useMemo(() => {
        let dates = []
        reconciliation.map((reconItem, reconIndex) => {
            dates[reconIndex] = []
            reconciliation.map((item, index) => {
                if (reconIndex != index && item.period_from && item.period_to) {
                    let currDate = moment(item?.period_from).startOf('day')
                    let lastDate = moment(item?.period_to).startOf('day')
                    dates[reconIndex].push(currDate.clone().toDate())
                    while (currDate.add(1, 'days').diff(lastDate) <= 0) {
                        dates[reconIndex].push(currDate.clone().toDate())
                    }
                }
            })
        })
        return dates
    }, [reconciliation])

    return {
        reconDisableDates,
        toggleMorePress,
        more,
        edit,
        setEdit,
        onEditButtonPress,
        onSavePress,
        reconciliation,
        setReconciliation,
        handleReconciliation,
        handleFromPeriod,
        loading,
        setLoading,
        noOfReconcilationSchedule,
        onChangeNoOfReconcilationSchedule,
        companySetting,
        getReconliation,
    }
}

export default useBackendCard
