import {useState, useEffect, useCallback} from 'react'
import {
    getCompanyGlobalReconciliationService,
    getMarkettingReconciliationService,
    getSetupActiveInactiveService,
    updateCompanyReconcilationService,
    updateMarkettingReconciliationService,
} from '../../../../../../../services/Services'
import moment from 'moment'
import {getErrorMessageFromResponse} from '../../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
const useBackendCard = () => {
    const [more, setMore] = useState(false)
    const [edit, setEdit] = useState(false)
    const [value, onChange] = useState([new Date(), new Date()])
    const [reconciliation, setReconciliation] = useState('')
    const [marketting, setMarketting] = useState([])
    const [checkreconciliation, setCheckReconciliation] = useState(true)
    const [tempData, setTempData] = useState()
    const [marketting1, setMarketting1] = useState([])
    const [reconciliation1, setReconciliation1] = useState('')

    useEffect(function () {
        getReconliation()
    }, [])
    const updatesettingReconciliation = () => {}
    const getReconliation = () => {
        getCompanyGlobalReconciliationService().then((res) => {
            res.data
                .map((item) => {
                    setReconciliation(item)
                    setReconciliation1(item)
                    setTempData(item)
                })
                .then((e) => {
                    setReconciliation({Schedule: []})
                })
        })
        getMarkettingReconciliationService()
            .then((res) => {
                setMarketting1(res.marketing_reconciliations)

                setMarketting(res.marketing_reconciliations)
            })
            .catch((e) => {
                setMarketting([])
            })
    }
    const toggleMorePress = useCallback((value) => {
        setMore(value)
    }, [])

    const onEditButtonPress = useCallback(() => {
        setMore(false)
        setEdit(true)
    }, [])
    const handleReconciliation = useCallback(() => {
        if (checkreconciliation === false) {
            var body = {type: 'Backend', status: 1}
            getSetupActiveInactiveService(body)
            setCheckReconciliation(true)
            setMore(true)
            setReconciliation(tempData)
        } else {
            setReconciliation({Schedule: []})
            var body = {type: 'Backend', status: 0}
            getSetupActiveInactiveService(body)
            setMore(false)
            setCheckReconciliation(false)
        }
    })
    const onSavePress = () => {
        reconciliation1.Schedule.map((item) => {
            delete item.id
            delete item.backend_setting_id
            item.period_from = moment(item.period_from).format('YYYY-MM-DD')
            item.period_to = moment(item.period_to).format('YYYY-MM-DD')
            item.day_date = moment(item.day_date).format('YYYY-MM-DD')
            reconciliation1.backend_setting_id = item.backend_setting_id
        })
        let markettingid = marketting[0].marketing_setting_id
        marketting.map((item) => {
            delete item.marketing_setting_id
            delete item.id
            item.period_from = moment(item.period_from).format('YYYY-MM-DD')
            item.period_to = moment(item.period_to).format('YYYY-MM-DD')
            item.day_date = moment(item.day_date).format('YYYY-MM-DD')
        })
        const body1 = {
            status: 1,
            marketing_setting_id: markettingid,
            marketing_reconciliations: marketting,
        }
        reconciliation.backend_setting_id = reconciliation.id
        delete reconciliation.id
        var data = reconciliation
        parseInt(data.commission_withheld)
        updateCompanyReconcilationService(data)
            .then((r) => {
                updateMarkettingReconciliationService(body1).then((r) => {
                    getReconliation()
                    setMore(true)
                    setEdit(false)
                })
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }

    const handleFromPeriod = (event, item1, field) => {
        const data = {...reconciliation}
        var formatedDate = moment(event).format('MM-DD-YYYY')
        const itemIndex = reconciliation.Schedule.findIndex((item) => item.id === item1.id)
        data.Schedule[itemIndex][field] = formatedDate
        setReconciliation(data)
    }
    const handleMarketting = (event, item1, field) => {
        const data = [...marketting]
        var formatedDate = moment(event).format('MM-DD-YYYY')
        const itemIndex = marketting.findIndex((item) => item.id === item1.id)
        data[itemIndex][field] = formatedDate
        setMarketting(data)
    }
    const handleCommission = (event, field) => {
        const data = {...reconciliation}
        if (field === 'maximum_withheld') {
            data.maximum_withheld = parseInt(event.target.value)
            setReconciliation(data)
        } else if (field === 'commission_withheld') {
            data.commission_withheld = parseInt(event.target.value)
            setReconciliation(data)
        } else {
            data.commission_type = event.target.value
            setReconciliation(data)
        }
    }
    const filter = (event) => {}
    return {
        reconciliation,
        filter,
        toggleMorePress,
        onEditButtonPress,
        onSavePress,
        more,
        edit,
        onChange,
        handleReconciliation,
        checkreconciliation,
        value,
        marketting,
        setReconciliation,
        handleFromPeriod,
        handleMarketting,
        handleCommission,
        updatesettingReconciliation,
    }
}

export default useBackendCard
