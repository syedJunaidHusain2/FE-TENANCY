import {useCallback, useEffect, useMemo} from 'react'
import {useSearchParams} from 'react-router-dom'

const useQueryString = (defaultData = null) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const queryString = useMemo(() => {
        let finalData = Object.fromEntries(searchParams.entries())
        Object.keys(finalData).forEach((key) => {
            if ([null, 'null', undefined, 'undefined'].includes(finalData[key])) {
                finalData[key] = ''
            }
        })
        return finalData
    }, [searchParams])

    useEffect(() => {
        if (defaultData) setQueryString(defaultData)
    }, [])

    const setQueryString = useCallback(
        (newQueryString, wantToReplace = false) => {
            if (wantToReplace) {
                setSearchParams(newQueryString)
            } else {
                setSearchParams({
                    ...queryString,
                    ...newQueryString,
                })
            }
        },
        [queryString, setSearchParams]
    )

    return [queryString, setQueryString]
}

export default useQueryString
