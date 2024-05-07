import {useState, useEffect, useCallback} from 'react'
import {
    getMarginofDiffrenceService,
    updateMarginofDiffrenceService,
} from '../../../../../../../services/Services'
const usePayrollCard = () => {
    const [more, setMore] = useState(false)
    const [edit, setEdit] = useState(false)
    const [marginofdiffrence, setMarginofdiffrence] = useState()
    const [diffrence, setDiffrence] = useState('')
    const [Applied, setApplied] = useState('')
    useEffect(function () {
        getMargindiffrrence()
    }, [])
    const [loader, setLoader] = useState(false)
    const getMargindiffrrence = () => {
        getMarginofDiffrenceService().then((res) => {
            // margin_difference
            setLoader(false)
            res.margin_difference.map((item) => {
                setMarginofdiffrence(item)
                setApplied(item.applied_to)
                setDiffrence(item.difference_parcentage)
            })
        })
    }
    const toggleMorePress = useCallback((value) => {
        setMore(value)
    }, [])
    const onSavePress = () => {
        const data = {
            status: 1,
            margin_setting_id: marginofdiffrence.margin_setting_id,
            margin_difference: [
                {
                    difference_parcentage: parseInt(diffrence),
                    applied_to: Applied,
                },
            ],
        }
        updateMarginofDiffrenceService(data).then((res) => {
            setLoader(true)
            setMore(true)
            setEdit(false)
            getMargindiffrrence()
        })
    }
    const onEditButtonPress = useCallback(() => {
        setMore(false)
        setEdit(true)
    }, [])

    return {
        loader,
        setLoader,
        more,
        edit,
        toggleMorePress,
        onEditButtonPress,
        onSavePress,
        setApplied,
        setDiffrence,
        Applied,
        diffrence,
        marginofdiffrence,
    }
}

export default usePayrollCard
