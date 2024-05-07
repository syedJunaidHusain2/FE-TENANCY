import {useEffect, useMemo, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {ROLES} from '../accessRights/AccessRightsConstants'
import {getAllStatesWithOfficesAction} from '../redux/actions/SettingActions'
import {
    getActiveRoleSelector,
    getUserDataSelector,
    isUserManagerSelector,
    isUserSuperAdminSelector,
    userHasAdminAccess,
} from '../redux/selectors/AuthSelectors'
import {geyAllStatesWithOfficesSelector} from '../redux/selectors/SettingsSelectors'

const useOfficeLocation = (defaultLocation = null, needAllLocationKey = true) => {
    const dispatch = useDispatch()
    const [selectedOfficeLocation, setSelectedOfficeLocation] = useState(null)
    const activeRole = useSelector(getActiveRoleSelector)
    const isManager = useSelector(isUserManagerSelector)
    const userData = useSelector(getUserDataSelector)
    const allStatesWithOffices = useSelector(geyAllStatesWithOfficesSelector)
    // const hasAdminAccess = useSelector(userHasAdminAccess)
    const hasAdminAccess = useSelector(isUserSuperAdminSelector)

    useEffect(() => {
        dispatch(getAllStatesWithOfficesAction())
    }, [])

    const officeList = useMemo(() => {
        const officeData = []
        if (needAllLocationKey && (activeRole == ROLES.administrator.roleName || hasAdminAccess)) {
            officeData.push({name: 'All Office', value: 'all'})
        }

        if (hasAdminAccess || activeRole == ROLES.administrator.roleName) {
            let oData = []
            allStatesWithOffices.map((item) => {
                if (item?.office?.length > 0) {
                    const offData = item?.office?.map((oItem) => ({
                        name: oItem?.office_name,
                        value: oItem?.id,
                    }))
                    oData = [...oData, ...offData]
                }
            })
            return [...officeData, ...oData]
        } else if (activeRole == ROLES.standard.roleName) {
            if (userData?.office?.id && userData?.office?.office_name) {
                officeData.push({name: userData?.office?.office_name, value: userData?.office?.id})
            }
            if (isManager) {
                if (userData?.additional_location?.length > 0) {
                    userData?.additional_location.map((item) => {
                        if (item?.office_name && item?.id) {
                            officeData.push({name: item?.office_name, value: item?.office_id})
                        }
                    })
                }
            }
        }
        return officeData
    }, [
        activeRole,
        allStatesWithOffices,
        hasAdminAccess,
        isManager,
        needAllLocationKey,
        userData?.additional_location,
        userData?.office?.id,
        userData?.office?.office_name,
    ])

    useEffect(() => {
        if (defaultLocation) {
            setSelectedOfficeLocation(defaultLocation)
        } else if (officeList?.length > 0) {
            setSelectedOfficeLocation(officeList?.[0]?.value)
        }
    }, [officeList])

    return [officeList, selectedOfficeLocation, setSelectedOfficeLocation]
}

export default useOfficeLocation
