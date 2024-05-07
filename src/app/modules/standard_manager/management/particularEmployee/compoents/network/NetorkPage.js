import {useState, useEffect, useMemo, useCallback} from 'react'
import NetworkCard from './NetworkCard'
import NetworkOrg from './NetworkOrg'
import {
    getEmployeeChartService,
    getOverrideOnUserService,
    getPositionSettingService,
    getUserOverideService,
} from '../../../../../../../services/Services'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import {AddNewOverrideOnEmployePop} from './AddNewOverrideOnEmployePop'
import {AddNewOverrideOfEmployePop} from './AddNewOverrideOfEmployePop'
import AccessRights from '../../../../../../../accessRights/AccessRights'
import useCustomAccessRights from '../../../../../../../accessRights/useCustomAccessRights'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {useSelector} from 'react-redux'
import {getCompanyOverrideSettingSelector} from '../../../../../../../redux/selectors/SettingsSelectors'
import {isUserSuperAdminSelector} from '../../../../../../../redux/selectors/AuthSelectors'
import useQueryString from '../../../../../../../hooks/useQueryString'

const NetorkPage = ({employeeData}) => {
    const [searchParam] = useQueryString()
    const [showChart, setShowChart] = useState(false)
    const [overrideOnOff, setOverrideOnOff] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [newOverrideOfEmploye, setNewOverrideOfEmploye] = useState(false)
    const [chartData, setChartData] = useState(null)
    const [overrideData, setOverrideData] = useState(null)
    const [overrideCategory, setOverrideCategory] = useState(searchParam?.networkType ?? 'all')
    const [positionSetting, setPositionSettig] = useState()
    const isSuperAdmin = useSelector(isUserSuperAdminSelector)
    const companyOverrideSetting = useSelector(getCompanyOverrideSettingSelector)
    const {employeeProfileAccess} = useCustomAccessRights({
        employeeData,
    })

    useEffect(() => {
        getPositionSettingService(employeeData?.sub_position_id).then((res) => {
            setPositionSettig(res?.data)
        })
    }, [])

    useEffect(() => {
        if (employeeData?.id) {
            setLoading(true)
            getEmployeeChartService(employeeData?.id)
                .then((res) => {
                    setChartData(res.data)
                })
                .catch(() => setLoading(false))
        }
    }, [employeeData?.id])

    useEffect(() => {
        if (employeeData?.id) {
            setLoading(true)
            if (!overrideOnOff) {
                getUserOverride()
            } else {
                getOverrideOnUser()
            }
        }
    }, [overrideOnOff, employeeData?.id])

    const getUserOverride = () => {
        if (employeeData?.id) {
            getUserOverideService(employeeData?.id)
                .then((res) => {
                    setOverrideData(res.data)
                })
                .catch(() => {})
                .finally(() => {
                    setLoading(false)
                })
        }
    }
    const getOverrideOnUser = () => {
        getOverrideOnUserService(employeeData?.id && employeeData?.id)
            .then((res) => {
                setOverrideData(res.data)
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false)
            })
    }

    const handleClose = () => {
        setOpen(false)
        getOverrideOnUser()
    }
    const newOverrideOfEmployeClose = () => {
        setNewOverrideOfEmploye(false)
        getUserOverride()
    }
    const categoryChange = (e) => {
        setOverrideCategory(e.target.value)
    }
    const overrideDropDownList = useMemo(() => {
        const tempData = [
            {name: 'All', value: 'all'},
            {name: 'Direct', value: 'direct'},
            {name: 'Indirect', value: 'indirect'},
            {name: 'Office', value: 'office'},
            {name: 'Manual', value: 'manual'},
        ]
        return tempData
    }, [])

    const showOverrides = useMemo(() => {
        return {
            direct:
                (overrideCategory == 'direct' || overrideCategory == 'all') &&
                overrideData?.direct?.length > 0
                    ? positionSetting?.direct_overrides_status && !overrideOnOff
                        ? true
                        : overrideOnOff
                    : false,
            indirect:
                (overrideCategory == 'indirect' || overrideCategory == 'all') &&
                overrideData?.indirect?.length > 0
                    ? positionSetting?.indirect_overrides_status && !overrideOnOff
                        ? true
                        : overrideOnOff
                    : false,
            office:
                (overrideCategory == 'office' || overrideCategory == 'all') &&
                overrideData?.office?.length > 0
                    ? positionSetting?.office_overrides_status && !overrideOnOff
                        ? true
                        : overrideOnOff
                    : false,
            manual:
                (overrideCategory == 'manual' || overrideCategory == 'all') &&
                overrideData?.manual?.length > 0 &&
                companyOverrideSetting?.allow_manual_override_status
                    ? !overrideOnOff
                        ? true
                        : overrideOnOff
                    : false,
        }
    }, [
        companyOverrideSetting?.allow_manual_override_status,
        overrideCategory,
        overrideData?.direct?.length,
        overrideData?.indirect?.length,
        overrideData?.manual?.length,
        overrideData?.office?.length,
        overrideOnOff,
        positionSetting?.direct_overrides_status,
        positionSetting?.indirect_overrides_status,
        positionSetting?.office_overrides_status,
    ])

    const overrideCount = useMemo(() => {
        return (
            (showOverrides.direct ? overrideData?.direct?.length : 0) +
            (showOverrides.indirect ? overrideData?.indirect?.length : 0) +
            (showOverrides.office ? overrideData?.office?.length : 0) +
            (showOverrides.manual ? overrideData?.manual?.length : 0)
        )
    }, [
        overrideData?.direct?.length,
        overrideData?.indirect?.length,
        overrideData?.manual?.length,
        overrideData?.office?.length,
        showOverrides.direct,
        showOverrides.indirect,
        showOverrides.manual,
        showOverrides.office,
    ])

    const hideDisabledOverrideForNormalUser = useCallback(
        (item) => {
            return isSuperAdmin || (!isSuperAdmin && item?.status == 0)
        },
        [isSuperAdmin]
    )

    return (
        <div style={{fontFamily: 'Manrope', fontSize: '14px', position: 'relative'}}>
            <CustomLoader full visible={loading} />

            <div className='d-flex flex-wrap justify-content-between align-items-center mb-10'>
                <div className='text-gray-900' style={{fontWeight: '600', fontSize: '20PX'}}>
                    {overrideData?.first_name ? (
                        <>
                            {!overrideOnOff
                                ? overrideData?.first_name +
                                  "'s " +
                                  'Override' +
                                  '(' +
                                  overrideCount +
                                  ')'
                                : 'Override on' +
                                  ' ' +
                                  overrideData?.first_name +
                                  '(' +
                                  overrideCount +
                                  ')'}
                        </>
                    ) : null}
                </div>
                <div className='d-flex flex-wrap gap-sm-10 gap-5 align-items-center'>
                    <AccessRights
                        customCondition={employeeProfileAccess.showOverridesOnButtonAccess}
                    >
                        {!showChart && (
                            <CustomButton
                                buttonType={BUTTON_TYPE.secondary}
                                buttonLabel={
                                    !overrideOnOff
                                        ? 'Overrides on' + ' ' + (overrideData?.first_name ?? '')
                                        : (overrideData?.first_name ?? '') + ' ' + 'Overrides'
                                }
                                onClick={() => setOverrideOnOff(!overrideOnOff)}
                            />
                        )}
                    </AccessRights>
                    <CustomButton
                        buttonType={BUTTON_TYPE.secondary}
                        buttonLabel={!showChart ? 'Org. Chart' : 'Override'}
                        onClick={() => setShowChart(!showChart)}
                    />

                    <AccessRights
                        forSuperAdmin={false}
                        customCondition={
                            isSuperAdmin &&
                            companyOverrideSetting?.allow_manual_override_status &&
                            employeeProfileAccess.addManualOverrideAccess
                        }
                    >
                        <CustomButton
                            buttonType={BUTTON_TYPE.primary}
                            buttonLabel='Add New'
                            onClick={() => {
                                overrideOnOff ? setOpen(true) : setNewOverrideOfEmploye(true)
                            }}
                        />
                    </AccessRights>
                    <div>
                        <CustomDropdown
                            searching={false}
                            onChange={categoryChange}
                            showClear={false}
                            options={overrideDropDownList}
                            value={overrideCategory}
                        />
                    </div>
                </div>
            </div>
            {!showChart &&
            (overrideData?.direct?.length > 0 ||
                overrideData?.indirect?.length > 0 ||
                overrideData?.manual?.length > 0 ||
                overrideData?.office?.length > 0) ? (
                <div className='d-flex gap-15 justify-content-center flex-wrap'>
                    {/* // Direct */}
                    {showOverrides.direct ? (
                        overrideData?.direct?.map((item) =>
                            hideDisabledOverrideForNormalUser(item) ? (
                                <NetworkCard
                                    key={item?.id}
                                    showEnableDisableButton={
                                        employeeProfileAccess.showEnableDisableOverrideButttonAccess
                                    }
                                    data={item}
                                    userId={overrideData?.id}
                                    overrideOnOff={overrideOnOff}
                                    Type='Direct'
                                    getData={() => {
                                        if (!overrideOnOff) {
                                            getUserOverride()
                                        } else {
                                            getOverrideOnUser()
                                        }
                                    }}
                                />
                            ) : null
                        )
                    ) : overrideCategory == 'direct' ? (
                        <div className='d-flex justify-content-center align-item-center py-20 my-20 text-gray-900'>
                            <span style={{fontWeight: '600', fontSize: '20PX'}}>No Overrides</span>
                        </div>
                    ) : null}

                    {/* Indirect */}
                    {showOverrides.indirect ? (
                        overrideData?.indirect?.map((item) =>
                            hideDisabledOverrideForNormalUser(item) ? (
                                <NetworkCard
                                    key={item?.id}
                                    data={item}
                                    showEnableDisableButton={
                                        employeeProfileAccess.showEnableDisableOverrideButttonAccess
                                    }
                                    Type='Indirect'
                                    userId={overrideData?.id}
                                    overrideOnOff={overrideOnOff}
                                    getData={() => {
                                        if (!overrideOnOff) {
                                            getUserOverride()
                                        } else {
                                            getOverrideOnUser()
                                        }
                                    }}
                                />
                            ) : null
                        )
                    ) : overrideCategory == 'indirect' ? (
                        <div className='d-flex justify-content-center align-item-center py-20 my-20 text-gray-900'>
                            <span style={{fontWeight: '600', fontSize: '20PX'}}>No Overrides</span>
                        </div>
                    ) : null}

                    {showOverrides.office ? (
                        overrideData?.office?.map((item) =>
                            hideDisabledOverrideForNormalUser(item) ? (
                                <NetworkCard
                                    key={item?.id}
                                    data={item}
                                    Type='Office'
                                    showEnableDisableButton={
                                        employeeProfileAccess.showEnableDisableOverrideButttonAccess
                                    }
                                    userId={overrideData?.id}
                                    overrideOnOff={overrideOnOff}
                                    getData={() => {
                                        if (!overrideOnOff) {
                                            getUserOverride()
                                        } else {
                                            getOverrideOnUser()
                                        }
                                    }}
                                />
                            ) : null
                        )
                    ) : overrideCategory == 'office' ? (
                        <div className='d-flex justify-content-center align-item-center py-20 my-20 text-gray-900'>
                            <span style={{fontWeight: '600', fontSize: '20PX'}}>No Overrides</span>
                        </div>
                    ) : null}

                    {showOverrides.manual ? (
                        overrideData?.manual?.map((item) =>
                            hideDisabledOverrideForNormalUser(item) ? (
                                <NetworkCard
                                    key={item?.id}
                                    employeeData={employeeData}
                                    data={item}
                                    Type='Manual'
                                    showEnableDisableButton={
                                        employeeProfileAccess.showEnableDisableOverrideButttonAccess
                                    }
                                    userId={overrideData?.id}
                                    overrideOnOff={overrideOnOff}
                                    getData={() => {
                                        if (!overrideOnOff) {
                                            getUserOverride()
                                        } else {
                                            getOverrideOnUser()
                                        }
                                    }}
                                />
                            ) : null
                        )
                    ) : overrideCategory == 'manual' ? (
                        <div className='d-flex justify-content-center align-item-center py-20 my-20 text-gray-900'>
                            <span style={{fontWeight: '600', fontSize: '20PX'}}>No Overrides</span>
                        </div>
                    ) : null}
                </div>
            ) : (
                <>
                    {!showChart && (
                        <div className='d-flex justify-content-center align-item-center py-20 my-20 text-gray-900'>
                            <span style={{fontWeight: '600', fontSize: '20PX'}}>No Overrides</span>
                        </div>
                    )}
                </>
            )}

            {showChart && (
                <div>
                    <NetworkOrg chartData={chartData} />
                </div>
            )}

            {open ? (
                <AddNewOverrideOnEmployePop
                    manualOverrideData={overrideData?.manual}
                    show={open}
                    handleClose={handleClose}
                    employeeData={employeeData}
                />
            ) : null}
            {newOverrideOfEmploye ? (
                <AddNewOverrideOfEmployePop
                    manualOverrideData={overrideData?.manual}
                    show={newOverrideOfEmploye}
                    handleClose={newOverrideOfEmployeClose}
                    employeeData={employeeData}
                />
            ) : null}
        </div>
    )
}

export default NetorkPage
