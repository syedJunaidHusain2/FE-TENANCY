import React, {useEffect, useMemo, useState} from 'react'
import {getUserOverideService} from '../../../../../../../../services/Services'
import CustomDropdown from '../../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomLoader from '../../../../../../../../customComponents/customLoader/CustomLoader'
import {MyOverridesCards} from './MyOverridesCards'
import NetworkCard from '../../../../../management/particularEmployee/compoents/network/NetworkCard'
import {getUserDataSelector} from '../../../../../../../../redux/selectors/AuthSelectors'
import {useSelector} from 'react-redux'
import {
    getCompanyOverrideSettingSelector,
    getCompanySettingSelector,
    getPositionSettingSelector,
} from '../../../../../../../../redux/selectors/SettingsSelectors'

const MyOverrides = () => {
    const [personOverrideData, setPersonOverrideData] = useState(null)
    const [loading, setLoading] = useState(true)
    const companyOverrideSetting = useSelector(getCompanyOverrideSettingSelector)

    const userData = useSelector(getUserDataSelector)
    const positionSetting = useSelector(getPositionSettingSelector)
    const [overrideCategory, setOverrideCategory] = useState('all')

    useEffect(() => {
        getUserOverideService(userData.id)
            .then((res) => {
                setPersonOverrideData(res?.data)
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false)
            })
    }, [userData?.id])

    const overrideDropDownList = useMemo(() => {
        let tempData = [
            {name: 'All', value: 'all'},
            {name: 'Direct', value: 'direct'},
            {name: 'Indirect', value: 'indirect'},
        ]
        if (positionSetting?.office_overrides_status)
            tempData.push({name: 'Office', value: 'office'})
        if (companyOverrideSetting?.allow_manual_override_status)
            tempData.push({name: 'Manual', value: 'manual'})
        return tempData
    }, [
        companyOverrideSetting?.allow_manual_override_status,
        positionSetting?.office_overrides_status,
    ])

    const showOverrides = useMemo(() => {
        return {
            direct:
                (overrideCategory == 'direct' || overrideCategory == 'all') &&
                personOverrideData?.direct?.length > 0
                    ? positionSetting?.direct_overrides_status
                        ? true
                        : false
                    : false,
            indirect:
                (overrideCategory == 'indirect' || overrideCategory == 'all') &&
                personOverrideData?.indirect?.length > 0
                    ? positionSetting?.indirect_overrides_status
                        ? true
                        : false
                    : false,
            office:
                (overrideCategory == 'office' || overrideCategory == 'all') &&
                personOverrideData?.office?.length > 0
                    ? positionSetting?.office_overrides_status
                        ? true
                        : false
                    : false,
            manual:
                (overrideCategory == 'manual' || overrideCategory == 'all') &&
                personOverrideData?.manual?.length > 0 &&
                companyOverrideSetting?.allow_manual_override_status
                    ? !false
                        ? true
                        : false
                    : false,
        }
    }, [
        companyOverrideSetting?.allow_manual_override_status,
        overrideCategory,
        personOverrideData?.direct?.length,
        personOverrideData?.indirect?.length,
        personOverrideData?.manual?.length,
        personOverrideData?.office?.length,
        positionSetting?.direct_overrides_status,
        positionSetting?.indirect_overrides_status,
        positionSetting?.office_overrides_status,
    ])

    const categoryChange = (e) => {
        setOverrideCategory(e.target.value)
    }
    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />

            <div
                className='bg-cmwhite'
                style={{
                    fontSize: '14px',
                    fontFamily: 'Manrope',
                    borderRadius: '0 10px 10px 10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <div className='mx-sm-7 py-5 mb-3 d-sm-flex flex-wrap justify-content-end w-100 align-items-center text-center'>
                    <div className='me-sm-20 mt-sm-0 mt-5 '>
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
            {/* body begins */}
            <div className=' mx-auto'>
                <div className='row m-4 mx-auto my-15 gap-10 '>
                    {positionSetting?.direct_overrides_status ? (
                        <MyOverridesCards
                            className={'col-sm  mb-xl-5'}
                            heading={
                                personOverrideData?.direct?.filter((item) => !item.status)
                                    ?.length ?? '0'
                            }
                            content='Direct Overrides'
                            background={'#FFF4DE'}
                        />
                    ) : (
                        <></>
                    )}
                    {positionSetting?.indirect_overrides_status ? (
                        <MyOverridesCards
                            className={'col-sm  mb-xl-5'}
                            heading={
                                personOverrideData?.indirect?.filter((item) => !item.status)
                                    ?.length ?? '0'
                            }
                            content='Indirect Overrides'
                            background={'#E1E9FF'}
                        />
                    ) : (
                        <></>
                    )}
                    {positionSetting?.office_overrides_status ? (
                        <MyOverridesCards
                            className={'col-sm  mb-xl-5'}
                            heading={
                                personOverrideData?.office?.filter((item) => !item.status)
                                    ?.length ?? '0'
                            }
                            content='Office Overrides'
                            background='#D7F9EF'
                        />
                    ) : (
                        <></>
                    )}
                    {companyOverrideSetting?.allow_manual_override_status ? (
                        <MyOverridesCards
                            className={'col-sm  mb-xl-5'}
                            heading={
                                personOverrideData?.manual?.filter((item) => !item.status)
                                    ?.length ?? '0'
                            }
                            content='Manual Overrides'
                            background='#E1E9FF'
                        />
                    ) : null}
                </div>
                {/* cards */}
                <div className='d-flex gap-15 justify-content-center flex-wrap'>
                    {showOverrides.direct ? (
                        personOverrideData?.direct?.map((item) =>
                            !item?.status ? (
                                <NetworkCard
                                    key={item?.id}
                                    data={item}
                                    Type='Direct'
                                    button={'Disable'}
                                />
                            ) : null
                        )
                    ) : overrideCategory == 'direct' ? (
                        <div className='d-flex justify-content-center align-item-center py-20 my-20 text-gray-900'>
                            <span style={{fontWeight: '600', fontSize: '20PX'}}>No Overrides</span>
                        </div>
                    ) : null}
                    {showOverrides.indirect ? (
                        personOverrideData?.indirect?.map((item) =>
                            !item?.status ? (
                                <NetworkCard
                                    key={item?.id}
                                    data={item}
                                    Type='Indirect'
                                    button={'Disable'}
                                />
                            ) : null
                        )
                    ) : overrideCategory == 'indirect' ? (
                        <div className='d-flex justify-content-center align-item-center py-20 my-20 text-gray-900'>
                            <span style={{fontWeight: '600', fontSize: '20PX'}}>No Overrides</span>
                        </div>
                    ) : null}
                    {showOverrides.office ? (
                        personOverrideData?.office?.map((item) =>
                            !item?.status ? (
                                <NetworkCard
                                    key={item?.id}
                                    data={item}
                                    Type='Office'
                                    button={'Disable'}
                                />
                            ) : null
                        )
                    ) : overrideCategory == 'office' ? (
                        <div className='d-flex justify-content-center align-item-center py-20 my-20 text-gray-900'>
                            <span style={{fontWeight: '600', fontSize: '20PX'}}>No Overrides</span>
                        </div>
                    ) : null}
                    {showOverrides?.manual ? (
                        personOverrideData?.manual?.map((item) =>
                            !item?.status ? (
                                <NetworkCard
                                    key={item?.id}
                                    data={item}
                                    Type='Manual'
                                    button={'Disable'}
                                />
                            ) : null
                        )
                    ) : overrideCategory == 'manual' ? (
                        <div className='d-flex justify-content-center align-item-center py-20 my-20 text-gray-900'>
                            <span style={{fontWeight: '600', fontSize: '20PX'}}>No Overrides</span>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default MyOverrides
