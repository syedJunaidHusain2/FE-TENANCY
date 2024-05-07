import {useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'

import {
    getMonthlyPayPeriodSelector,
    getPayFrequencySettingSelector,
    getWeeklyPayPeriodSelector,
} from '../redux/selectors/SettingsSelectors'
import {getValidDate} from '../constants/constants'
import {getMonthlyPayPeriodAction, getWeeklyPayPeriodAction} from '../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'
import {
    getAllMonthlyPayPeriodService,
    getAllWeeklyPayPeriodService,
    getMonthlyExecutedPayPeriodService,
    getWeeklyExecutedPayPeriodService,
} from '../services/Services'

const usePayFrequency = () => {
    const [selectedWeekData, setSelectedWeekData] = useState(null)
    const getPayFrequencyData = useSelector(getPayFrequencySettingSelector)
    const weeklyPayPeriod = useSelector(getWeeklyPayPeriodSelector)
    const monthlyPayPeriodList = useSelector(getMonthlyPayPeriodSelector)
    const [payPeriodList, setPagePayPeriodList] = useState([])
    const [executedPayPeriodList, setExecutedPayPeriodList] = useState([])
    const [allPayPeriodList, setAllPayPeriodList] = useState([])

    const [selectedPayPeriod, setSelectedPayPeriod] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWeeklyPayPeriodAction())
        dispatch(getMonthlyPayPeriodAction())
    }, [])

    // Set Present Pay Period
    useEffect(() => {
        if (payPeriodList?.length > 0) {
            let presentPeriod = payPeriodList?.find(
                (item) =>
                    getValidDate(item?.pay_period_from, 'YYYY-MM-DD 00:00', true) <=
                        getValidDate(new Date(), 'YYYY-MM-DD 00:00', true) &&
                    getValidDate(new Date(), 'YYYY-MM-DD 00:00', true) <=
                        getValidDate(item?.pay_period_to, 'YYYY-MM-DD 00:00', true)
            )
            if (presentPeriod) {
                setSelectedPayPeriod(presentPeriod?.id)
            } else setSelectedPayPeriod(payPeriodList?.[0]?.id)
        }
    }, [payPeriodList])

    //Return the list of current payPeriod
    const currentPayPeriod = useMemo(() => {
        const currPayPeriod =
            payPeriodList?.length > 0
                ? payPeriodList?.find((item) => item?.id == selectedPayPeriod)
                : null
        return currPayPeriod
    }, [selectedPayPeriod, payPeriodList])

    const currentPayPeriodFromAllPayPeriod = useMemo(() => {
        const currPayPeriod =
            allPayPeriodList?.length > 0
                ? allPayPeriodList?.find((item) => item?.id == selectedPayPeriod)
                : null
        return currPayPeriod
    }, [allPayPeriodList, selectedPayPeriod])

    const executedCurrentPayPeriod = useMemo(() => {
        const currPayPeriod =
            executedPayPeriodList?.length > 0
                ? executedPayPeriodList?.find((item) => item?.id == selectedPayPeriod)
                : null
        return currPayPeriod
    }, [selectedPayPeriod, executedPayPeriodList])

    //Return the list of next payPeriod
    const nextPayPeriod = useMemo(() => {
        const currPayPeriodIndex =
            payPeriodList?.length > 0
                ? payPeriodList?.findIndex((item) => item?.id == selectedPayPeriod)
                : null
        return currPayPeriodIndex > -1 ? payPeriodList?.[currPayPeriodIndex + 1] : null
    }, [selectedPayPeriod, payPeriodList])

    //Return the list of executed pay period
    const pastPayPeriodList = useMemo(() => {
        return payPeriodList?.filter((item) => item?.execute)
    }, [payPeriodList])

    useEffect(() => {
        if (selectedWeekData == 'Weekly') {
            getWeeklyExecutedPayPeriodService().then((res) => {
                setExecutedPayPeriodList(res.data)
            })
            getAllWeeklyPayPeriodService().then((res) => {
                setAllPayPeriodList(res.data)
            })
        } else if (selectedWeekData == 'Monthly') {
            getMonthlyExecutedPayPeriodService().then((res) => {
                setExecutedPayPeriodList(res.data)
            })
            getAllMonthlyPayPeriodService().then((res) => {
                setAllPayPeriodList(res.data)
            })
        }
    }, [selectedWeekData])

    //Handle Frequency type change
    const handleSelectedWeekData = (weekType) => {
        let data = getPayFrequencyData?.filter((item) => item?.frequency_type_name == weekType)
        setSelectedWeekData(data[0]?.frequency_type_name)
    }

    //Create dropdown list of payFrequency type that is enabled
    const weekDropdownList = useMemo(() => {
        let weekName = []
        getPayFrequencyData?.map((item, index) => {
            // if (item.status && index != 0) {
            if (item.status) {
                weekName.push({...item, name: item?.frequency_type_name})
            }
        })
        return weekName
    }, [getPayFrequencyData])

    //Changes pay period list according to the selected pay frequency type
    useEffect(() => {
        if (selectedWeekData == 'Weekly') {
            setPagePayPeriodList(weeklyPayPeriod)
        } else if (selectedWeekData == 'Monthly') {
            setPagePayPeriodList(monthlyPayPeriodList)
        } else {
            setPagePayPeriodList([])
        }
    }, [selectedWeekData, weeklyPayPeriod, monthlyPayPeriodList])

    useEffect(() => {
        if (weekDropdownList?.length > 0) {
            setSelectedWeekData(weekDropdownList?.[0]?.frequency_type_name)
        }
    }, [weekDropdownList])

    return {
        weekDropdownList,
        payPeriodList,
        allPayPeriodList,
        handleSelectedWeekData,
        selectedPayPeriod,
        currentPayPeriod,
        currentPayPeriodFromAllPayPeriod,
        nextPayPeriod,
        setSelectedPayPeriod,
        selectedWeekData,
        monthlyPayPeriodList,
        setSelectedWeekData,
        pastPayPeriodList,
        executedPayPeriodList,
        executedCurrentPayPeriod,
        weeklyPayPeriod,
    }
}

export default usePayFrequency
