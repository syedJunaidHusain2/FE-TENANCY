import {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getIntegratioListnAction} from '../../../../redux/actions/IntegrationActions'
import {getIntegrationListSelector} from '../../../../redux/selectors/IntegrationSelectors'

const useIntegration = () => {
    const dispatch = useDispatch()
    const integrationList = useSelector(getIntegrationListSelector)

    useEffect(() => {
        dispatch(getIntegratioListnAction())
    }, [])

    const onModalClose = useCallback(() => {
        dispatch(getIntegratioListnAction())
    }, [dispatch])

    return {
        integrationList,
        onModalClose,
    }
}

export default useIntegration
