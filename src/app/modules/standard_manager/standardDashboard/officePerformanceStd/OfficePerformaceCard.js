import React, {useCallback, useEffect, useMemo, useState} from 'react'
import OfficePerformanceChart from './OfficePerformanceChart'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import {useSelector} from 'react-redux'
import useOfficeLocation from '../../../../../hooks/useOfficeLocation'
import {useDispatch} from 'react-redux'
import {
    getSmOfficePeformanceSelector,
    getSmOfficePeformanceTeamSelector,
} from '../../../../../redux/selectors/DashboardSelectors'
import {
    smOfficePerformanceAction,
    smOfficePerformanceTeamAction,
} from '../../../../../redux/actions/DashboardActions'
import {getUserDataSelector} from '../../../../../redux/selectors/AuthSelectors'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {formattedNumberFields} from '../../../../../helpers/CommonHelpers'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {Dashboard_DURATION_DROPDOWN_LIST} from '../../../../../constants/constants'

const OfficePerformaceCard = () => {
    const officeSalesData = useSelector(getSmOfficePeformanceSelector)
    const officeSalesTeamData = useSelector(getSmOfficePeformanceTeamSelector)
    const [filter, setFilter] = useState('this_week')
    const [loading, setLoading] = useState(false)
    const [fullLoading, setFullLoading] = useState(false)
    const loggedUser = useSelector(getUserDataSelector)
    const [officeList, selectedLocation, setSelectedLocation] = useOfficeLocation()

    const dispatch = useDispatch()
    useEffect(() => {
        getOfficePerofmanceData()
        // getTopPayrollLocations()
    }, [filter])

    const onFilterChange = (e) => {
        setFilter(e.target.value)
    }
    const getOfficePerofmanceData = useCallback(() => {
        if (officeSalesData || officeSalesTeamData) setLoading(true)
        else setFullLoading(true)
        const body = {
            filter: filter,
            user_id: loggedUser?.id,
        }
        dispatch(smOfficePerformanceAction(body)).finally(() => {
            if (officeSalesData) setLoading(false)
            else setFullLoading(false)
        })
        dispatch(smOfficePerformanceTeamAction(body)).finally(() => {
            if (officeSalesTeamData) setLoading(false)
            else setFullLoading(false)
        })
    }, [dispatch, filter])
    // const getTopPayrollLocations = useCallback(() => {
    //     if (payrollSummaryData) setLoading(true)
    //     else setFullLoading(true)
    //     dispatch(getTopPayrollLocationsAction()).finally(() => {
    //         if (payrollSummaryData) setLoading(false)
    //         else setFullLoading(false)
    //     })
    // }, [dispatch, filter])
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
            className=' mb-10 bg-cmwhite shadow-sm gap-5 px-5 py-5 row'
            style={{borderRadius: '10px', position: 'relative'}}
        >
            <CustomLoader full visible={fullLoading} />
            <div className='col-sm-9'>
                <div
                    className='text-cmGrey900 mb-5 d-flex justify-content-between'
                    style={{fontWeight: 700, fontSize: '16px', position: 'relative'}}
                >
                    Office Performance
                    <CustomLoader size={50} visible={loading} />
                </div>
                <div className='d-flex align-items-center justify-content-between'>
                    <div>
                        <CustomDropdown
                            options={Dashboard_DURATION_DROPDOWN_LIST}
                            onChange={onFilterChange}
                            value={filter}
                            searching={false}
                            showClear={false}
                        />
                    </div>
                    <div className='ms-4 d-flex align-items-center gap-4 '>
                        <div className='h-10px rounded w-25px bg-cminfo'></div>{' '}
                        <div>This {thisLastValueDisplayKey}</div>
                    </div>
                    <div className='d-flex align-items-center gap-5'>
                        <div className='h-10px rounded w-25px bg-cmGrey400'></div>{' '}
                        <div>Last {thisLastValueDisplayKey}</div>
                    </div>
                </div>
                {/* Chart begins */}
                <div>
                    <OfficePerformanceChart
                        chartData={officeSalesData}
                        thisLastValueDisplayKey={thisLastValueDisplayKey}
                    />{' '}
                </div>
            </div>
            {/* Side card begins */}
            <div className='col-sm mt-2'>
                {/* Hedings */}
                <div
                    className='d-flex align-items-center gap-5 mb-5'
                    style={{fontSize: '12px', lineHeight: '26px'}}
                >
                    <div className='text-cmGrey800' style={{fontWeight: 600}}>
                        Total Sales:
                    </div>
                    <div className='text-cmGrey900' style={{fontWeight: 700}}>
                        {officeSalesData?.totalSales} Accounts
                    </div>
                </div>
                <div className='d-flex align-items-center mb-5 gap-5' style={{fontSize: '12px'}}>
                    <div className='text-cmGrey800' style={{fontWeight: 600}}>
                        Total KW:
                    </div>
                    <div className='text-cmGrey900' style={{fontWeight: 700}}>
                        {formattedNumberFields(officeSalesData?.totalKw, '')} KW
                    </div>
                </div>
                {/* card 1 */}
                <div className='card bg-none border border-cmGrey300 mb-5 py-3 px-5'>
                    <div className='d-flex align-items-start gap-5'>
                        <div className='text-cmGrey800' style={{fontWeight: 600}}>
                            Top Team:
                        </div>
                        {officeSalesTeamData?.top_team?.team ? (
                            <div>
                                <div>
                                    <div className='d-flex align-items-center gap-5 mb-2'>
                                        {/* <div>
                                             <CustomImage
                                                 src={officeSalesTeamData?.closer?.[0]?.image}
                                                 style={{width: '30px', height: '30px'}}
                                             />
                                         </div> */}
                                        <div className='text-cmGrey800' style={{fontWeight: 600}}>
                                            {officeSalesTeamData?.top_team?.team}
                                        </div>
                                    </div>
                                    <div
                                        className='d-flex align-items-center gap-5 text-cmBlue-Crayola'
                                        style={{fontWeight: 600}}
                                    >
                                        <div>
                                            {formattedNumberFields(
                                                officeSalesTeamData?.top_team?.total_kw,
                                                ''
                                            )}{' '}
                                            KW
                                        </div>
                                        <div className=''>
                                            {officeSalesTeamData?.top_team?.total_account} Accounts
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='text-cmError'>No Teams</div>
                        )}
                    </div>
                </div>
                {/* card 1 */}
                <div className='card bg-none border border-cmGrey300 mb-5 py-3 px-5'>
                    <div className='d-flex align-items-start gap-5'>
                        <div className='text-cmGrey800' style={{fontWeight: 600}}>
                            Top Setter:
                        </div>
                        {officeSalesTeamData?.setter?.setter_first_name ? (
                            <div>
                                <div>
                                    <div className='d-flex align-items-center gap-5 mb-2'>
                                        <div>
                                            <CustomImage
                                                src={officeSalesTeamData?.setter?.setter_image}
                                                style={{width: '30px', height: '30px'}}
                                            />
                                        </div>
                                        <div className='text-cmGrey800' style={{fontWeight: 600}}>
                                            {officeSalesTeamData?.setter?.setter_first_name}{' '}
                                            {officeSalesTeamData?.setter?.setter_last_name}
                                        </div>
                                    </div>
                                    <div
                                        className='d-flex align-items-center gap-5 text-cmBlue-Crayola'
                                        style={{fontWeight: 600}}
                                    >
                                        <div>
                                            {formattedNumberFields(
                                                officeSalesTeamData?.setter?.total_kw,
                                                ''
                                            )}{' '}
                                            KW
                                        </div>
                                        <div className=''>
                                            {officeSalesTeamData?.setter?.total_account} Accounts
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='text-cmError'>No Setter</div>
                        )}
                    </div>
                </div>
                {/* card 1 */}
                <div className='card bg-none border  border-cmGrey300 mb-5 py-3 px-5'>
                    <div className='d-flex align-items-start gap-5'>
                        <div className='text-cmGrey800' style={{fontWeight: 600}}>
                            Top Closer:
                        </div>
                        {officeSalesTeamData?.closer?.closer_first_name ? (
                            <div>
                                <div>
                                    <div className='d-flex align-items-center gap-5 mb-2'>
                                        <div>
                                            <CustomImage
                                                src={officeSalesTeamData?.closer?.closer_image}
                                                style={{width: '30px', height: '30px'}}
                                            />
                                        </div>
                                        <div className='text-cmGrey800' style={{fontWeight: 600}}>
                                            {officeSalesTeamData?.closer?.closer_first_name}{' '}
                                            {officeSalesTeamData?.closer?.closer_last_name}
                                        </div>
                                    </div>
                                    <div
                                        className='d-flex align-items-center gap-5 text-cmBlue-Crayola'
                                        style={{fontWeight: 600}}
                                    >
                                        <div>
                                            {formattedNumberFields(
                                                officeSalesTeamData?.closer?.total_kw,
                                                ''
                                            )}{' '}
                                            KW
                                        </div>
                                        <div className=''>
                                            {officeSalesTeamData?.closer?.total_account} Accounts
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='text-cmError'>No Closer</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfficePerformaceCard
