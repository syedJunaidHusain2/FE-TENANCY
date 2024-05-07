import PositionCard from './Position/PositionCard'
import {useEffect} from 'react'
import {getPayFrequencySettingAction} from '../../../../../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'
export default function Position() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPayFrequencySettingAction())
    }, [])
    return (
        <>
            <PositionCard />
        </>
    )
}
