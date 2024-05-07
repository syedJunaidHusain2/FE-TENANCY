import React, {useState, useEffect, useCallback} from 'react'
import moment from 'moment'
const useCorporate = () => {
    const [more, setMore] = useState(true)
    const [edit, setEdit] = useState(false)
    const [showCostsCentersWithNoValue, setShowCostsCentersWithNoValue] = useState(true)

    const toggleMorePress = useCallback((value) => {
        setMore(value)
    }, [])

    const onEditButtonPress = useCallback(() => {
        setMore(false)
        setEdit(true)
    }, [])

    const onToggleCostCentersWithNoValue = useCallback(() => {
        setShowCostsCentersWithNoValue((val) => !val)
    }, [])
    return {
        more,
        onToggleCostCentersWithNoValue,
        edit,
        toggleMorePress,
        onEditButtonPress,
        setShowCostsCentersWithNoValue,
        showCostsCentersWithNoValue,
    }
}

export default useCorporate
