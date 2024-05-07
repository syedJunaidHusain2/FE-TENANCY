import {useCallback, useMemo, useState} from 'react'

const useValidation = () => {
    const [beginValidating, setBeginValidating] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const errorMessages = useMemo(() => {
        let data = {}
        if (beginValidating) {
            const rawData = {
                ...data,
                ...errorMessage,
            }
            data = rawData
            data.isValidate = isValidationObjectHasEmptyValue(rawData)
            data.beginValidating = true
        }
        return data
    }, [beginValidating, errorMessage])

    const validate = useCallback(
        (method = () => {}) =>
            new Promise((resolve) => {
                setBeginValidating(true)
                const responseFromValidation = method
                let data = {...responseFromValidation}
                data.isValidate = isValidationObjectHasEmptyValue(responseFromValidation)
                data.beginValidating = true
                setErrorMessage(data)
                resolve(data)
            }),
        []
    )

    return [validate, errorMessages]
}

const isValidationObjectHasEmptyValue = (data) => {
    delete data.beginValidating
    delete data.isValidate
    return Object.keys(data).every((key) => [undefined, null, ''].includes(data[key]))
}

export default useValidation
