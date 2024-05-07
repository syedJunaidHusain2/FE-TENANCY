import React, {useEffect, useState} from 'react'
import EmployeeIdSettings from './components/EmployeeIdSettings'
import PersonalDetails from './components/PersonalDetails'
import AdditionalInfo from './components/AdditionalInfo'
import DocumentToUpload from './components/DocumentToUpload'
import {
    getOnBoardingConfigurationService,
    getTemplateListByCategoryService,
} from '../../../../../../services/Services'
import {useDispatch} from 'react-redux'
import {getOnBoardingConfigurationAction} from '../../../../../../redux/actions/SettingActions'

const SettingHiringPage = () => {
    const [configurationData, setConfigurationData] = useState([])
    const [isEmployeeIdAlreadySet, setIsEmployeeIdAlreadySet] = useState({
        id_code: false,
        id_code_no_to_start_from: false,
        onbording_id_code_no_to_start_from: false,
        onbording_id_code: false,
    })

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getConfigurationData()
        dispatch(getOnBoardingConfigurationAction())
    }, [dispatch])

    const getConfigurationData = () =>
        new Promise((resolve, reject) => {
            setLoading(true)
            const body = {
                id: '1',
            }
            getOnBoardingConfigurationService(body)
                .then((res) => {
                    let data = {...res.data?.[0]}
                    data['employee_personal_detail'] =
                        data?.employee_personal_detail?.map((res) => ({
                            ...res,
                            attribute_option: res?.attribute_option
                                ? JSON.parse(res?.attribute_option)
                                : [],
                        })) ?? []
                    data['additional_info_for_employee_to_get_started'] =
                        data?.additional_info_for_employee_to_get_started?.map((res) => ({
                            ...res,
                            attribute_option: res?.attribute_option
                                ? JSON.parse(res?.attribute_option)
                                : [],
                        })) ?? []

                    setConfigurationData(data)
                    setIsEmployeeIdAlreadySet((val) => ({
                        ...val,
                        id_code: data?.id_code ? true : false,
                        id_code_no_to_start_from: data?.id_code_no_to_start_from ? true : false,
                        onbording_id_code: data?.onbording_id_code ? true : false,
                        onbording_id_code_no_to_start_from: data?.onbording_id_code_no_to_start_from
                            ? true
                            : false,
                    }))
                    resolve(data)
                })
                .catch(reject)
                .finally(() => setLoading(false))
        })

    return (
        <div style={{fontSize: 14, fontWeight: 600}}>
            <div className='mb-10'>
                <EmployeeIdSettings
                    configurationData={configurationData}
                    setConfigurationData={setConfigurationData}
                    isEmployeeIdAlreadySet={isEmployeeIdAlreadySet}
                    getConfigurationData={getConfigurationData}
                />
            </div>
            <div className='mb-10'>
                <PersonalDetails
                    configurationData={configurationData}
                    setConfigurationData={setConfigurationData}
                    getConfigurationData={getConfigurationData}
                />
            </div>
            <div className='mb-10'>
                <AdditionalInfo
                    configurationData={configurationData}
                    setConfigurationData={setConfigurationData}
                    getConfigurationData={getConfigurationData}
                />
            </div>
            <div className='mb-10'>
                <DocumentToUpload
                    configurationData={configurationData}
                    setConfigurationData={setConfigurationData}
                    getConfigurationData={getConfigurationData}
                />
            </div>
        </div>
    )
}

export default SettingHiringPage
