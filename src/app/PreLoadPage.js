import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {
    getAllStatesAndCitiesAction,
    getCompanySettingAction,
    getPositionSettingAction,
    getCompanyProfileAction,
    getCompanyProfileWithoutAuthAction,
    getAllStatesWithOfficesAction,
    getAllLocationListAction,
    getWeeklyPayPeriodAction,
    getMonthlyPayPeriodAction,
    getCompanyOverrideSettingAction,
} from '../redux/actions/SettingActions'
import {getIsLoggedInSelector} from '../redux/selectors/AuthSelectors'
import {getUserProfileAction} from '../redux/actions/AuthActions'
import useDocumentTitle from '../hooks/useDocumentTitle'

const PreLoadPage = ({children}) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLoggedInSelector)
    useDocumentTitle()
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getCompanyProfileAction()).then(() => {
                dispatch(getCompanySettingAction()).then(() => {
                    dispatch(getCompanyOverrideSettingAction()).then(() => {
                        dispatch(getUserProfileAction()).then(() => {
                            dispatch(getPositionSettingAction()).then(() => {
                                dispatch(getAllStatesWithOfficesAction()).then(() => {
                                    dispatch(getAllLocationListAction()).then(() => {
                                        dispatch(getAllStatesAndCitiesAction()).then(() => {
                                            dispatch(getWeeklyPayPeriodAction()).then(() => {
                                                dispatch(getMonthlyPayPeriodAction())
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        } else {
            dispatch(getAllStatesAndCitiesAction())
            dispatch(getCompanyProfileWithoutAuthAction())
        }
    }, [isLoggedIn])

    return children
}

export default PreLoadPage
