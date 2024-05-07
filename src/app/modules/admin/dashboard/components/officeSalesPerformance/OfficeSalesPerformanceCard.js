import React, {useCallback, useEffect, useMemo, useState} from 'react'
import OfficeSalesPerformanceChart from './OfficeSalesPerformanceChart'
import CustomOfficeSalesRadialChart from './CustomOfficeSalesRadialChart'
import {
    getOfficeSalesPeformanceGraphSelector,
    getOfficeSalesPeformanceSelector,
} from '../../../../../../redux/selectors/DashboardSelectors'
import {
    officeSalesPerformanceDataAction,
    officeSalesPerformanceGraphAction,
} from '../../../../../../redux/actions/DashboardActions'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {getUserDataSelector} from '../../../../../../redux/selectors/AuthSelectors'
import useOfficeLocation from '../../../../../../hooks/useOfficeLocation'
import {
    Dashboard_DURATION_DROPDOWN_LIST,
    REPORTS_DURATION_DROPDOWN_LIST,
} from '../../../../../../constants/constants'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {
    formattedNumberFields,
    formattedNumberFieldsWithoutDecimal,
} from '../../../../../../helpers/CommonHelpers'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'

const OfficeSalesPerformanceCard = () => {
    const officeSalesPeformanceData = useSelector(getOfficeSalesPeformanceSelector)
    const officeSalesPeformanceGraphData = useSelector(getOfficeSalesPeformanceGraphSelector)
    const [filter, setFilter] = useState('this_week')
    const [loading, setLoading] = useState(false)
    const [fullLoading, setFullLoading] = useState(false)
    const loggedUser = useSelector(getUserDataSelector)
    const [officeList, selectedLocation, setSelectedLocation] = useOfficeLocation()

    const dispatch = useDispatch()
    useEffect(() => {
        if (selectedLocation) {
            getOfficeSalesPeformanceData()
            getOfficeSalesPeformanceGraphData()
        }
    }, [filter, selectedLocation])

    // useEffect(() => {
    //     getOfficeSalesPeformanceGraphData()
    // }, [filter,])

    const onFilterChange = (e) => {
        setFilter(e.target.value)
    }
    const getOfficeSalesPeformanceData = useCallback(() => {
        if (officeSalesPeformanceData) setLoading(true)
        else setFullLoading(true)
        const body = {
            filter: filter,
            user_id: loggedUser?.id,
            office_id: selectedLocation,
        }

        dispatch(officeSalesPerformanceDataAction(body)).finally(() => {
            if (officeSalesPeformanceData) setLoading(false)
            else setFullLoading(false)
        })
    }, [dispatch, filter, selectedLocation])

    const getOfficeSalesPeformanceGraphData = useCallback(() => {
        if (officeSalesPeformanceData) setLoading(true)
        else setFullLoading(true)
        const body = {
            filter: filter,
            user_id: loggedUser?.id,
            office_id: selectedLocation,
        }

        dispatch(officeSalesPerformanceGraphAction(body)).finally(() => {
            if (officeSalesPeformanceData) setLoading(false)
            else setFullLoading(false)
        })
    }, [dispatch, filter, selectedLocation])
    const accountInstalledPercentage = useMemo(() => {
        const value =
            officeSalesPeformanceGraphData?.totalSales > 0
                ? (officeSalesPeformanceGraphData?.install_account * 100) /
                  officeSalesPeformanceGraphData?.totalSales
                : 0
        return formattedNumberFieldsWithoutDecimal(value, '')
    }, [officeSalesPeformanceGraphData])

    const kwInstalledPercentage = useMemo(() => {
        const value =
            officeSalesPeformanceGraphData?.totalKw > 0
                ? (officeSalesPeformanceGraphData?.install_kw * 100) /
                  officeSalesPeformanceGraphData?.totalKw
                : 0
        return formattedNumberFieldsWithoutDecimal(value, '')
    }, [officeSalesPeformanceGraphData])

    const onLocationChange = (e) => {
        setSelectedLocation(e.target.value)
    }

    const thisLastValueDisplayKey = useMemo(() => {
        let text = ''
        switch (filter) {
            case 'this_week':
                text = 'Week'
                break
            case 'this_year':
                text = 'Year'
                break
            case 'this_month':
                text = 'Month'
                break
            case 'this_quarter':
                text = 'Quarter'
                break
            default:
            // code block
        }
        return text
    }, [filter])

    return (
        <div
            className='mb-10 bg-cmwhite shadow-sm px-5 py-5'
            style={{borderRadius: '10px', position: 'relative'}}
        >
            <CustomLoader visible={fullLoading} full />
            <div className='mb-20'>
                <div
                    className='d-flex justify-content-between text-cmGrey900 mb-5'
                    style={{fontWeight: 600, fontSize: '16px', position: 'relative'}}
                >
                    Office Sales Performance
                    <CustomLoader visible={loading} size={50} />
                </div>

                <div className='d-flex align-items-center justify-content-between flex-wrap'>
                    <div>
                        <CustomDropdown
                            options={Dashboard_DURATION_DROPDOWN_LIST}
                            onChange={onFilterChange}
                            value={filter}
                            showClear={false}
                            searching={false}
                        />
                    </div>

                    <div>
                        <CustomDropdown
                            options={officeList}
                            onChange={onLocationChange}
                            value={selectedLocation}
                            showClear={false}
                            searching={false}
                        />{' '}
                    </div>

                    <div className='d-flex align-items-center gap-3 '>
                        <div className='h-10px w-25px bg-cmBlue-Crayola'></div>{' '}
                        <div className='text-cmGrey900' style={{fontWeight: 600, fontSize: '12px'}}>
                            This {thisLastValueDisplayKey}
                        </div>
                    </div>
                    <div className='d-flex align-items-center gap-3'>
                        <div className='h-10px w-25px bg-cmGrey400'></div>{' '}
                        <div className='text-cmGrey900' style={{fontWeight: 600, fontSize: '12px'}}>
                            Last {thisLastValueDisplayKey}
                        </div>
                    </div>
                </div>
                {/* Chart begins */}
                <div>
                    <OfficeSalesPerformanceChart
                        chartData={officeSalesPeformanceData}
                        thisLastValueDisplayKey={thisLastValueDisplayKey}
                    />
                </div>
            </div>

            <div className='row'>
                <div className='col-sm'>
                    <CustomOfficeSalesRadialChart
                        TotalHeadName='Total Sales'
                        TotalHeadValue={`${officeSalesPeformanceGraphData?.totalSales} Accounts`}
                        MajorValueName={`Accounts Installed`}
                        MajorValue={officeSalesPeformanceGraphData?.install_account}
                        MinorValueName='Accounts Pending'
                        MinorValue={officeSalesPeformanceGraphData?.pending_account}
                        MajorValueColor='cmSuccess'
                        progressColor={'#00c247'}
                        nonProgressColor={'#CCF3DA'}
                        percentage={accountInstalledPercentage}
                    />
                </div>
                <div className='col-sm'>
                    <CustomOfficeSalesRadialChart
                        TotalHeadName='Total KW'
                        TotalHeadValue={`${formattedNumberFieldsWithoutDecimal(
                            officeSalesPeformanceGraphData?.totalKw,
                            ''
                        )} KW`}
                        MajorValueName={`KW Installed`}
                        MajorValue={formattedNumberFieldsWithoutDecimal(
                            officeSalesPeformanceGraphData?.install_kw,
                            ''
                        )}
                        MinorValueName='KW Pending'
                        MinorValue={formattedNumberFieldsWithoutDecimal(
                            officeSalesPeformanceGraphData?.pending_kw,
                            ''
                        )}
                        MajorValueColor='cmOrange'
                        progressColor={'#f29913'}
                        nonProgressColor={'#FFEFD8'}
                        percentage={kwInstalledPercentage}
                    />
                </div>
            </div>
        </div>
    )
}

export default OfficeSalesPerformanceCard
