// useDocumentTitle.js
import {useCallback, useEffect, useMemo} from 'react'
import {useSelector} from 'react-redux'
import {getCompanyProfileSelector} from '../redux/selectors/SettingsSelectors'

const useDocumentTitle = (websiteTitle = '') => {
    const companyData = useSelector(getCompanyProfileSelector)
    const pageTitle = useCallback(
        (title) => {
            return `${title ? `${title} | ` : ''}${
                companyData?.business_name ? `${companyData?.business_name} | Sequifi` : 'Sequifi'
            }`
        },
        [companyData?.business_name]
    )

    useEffect(() => {
        document.title = pageTitle(websiteTitle)
    }, [companyData?.business_name, websiteTitle])

    useEffect(
        () => () => {
            document.title = pageTitle()
        },
        []
    )
}

export default useDocumentTitle
