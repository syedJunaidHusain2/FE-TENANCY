import React, {useCallback, useEffect, useState} from 'react'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {getSmSalesReportSelector} from '../../../../../redux/selectors/DashboardSelectors'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {smDashboardSalesReportAction} from '../../../../../redux/actions/DashboardActions'
import {
    Dashboard_DURATION_DROPDOWN_LIST,
    REPORTS_DURATION_DROPDOWN_LIST,
} from '../../../../../constants/constants'
import {formattedNumberFields} from '../../../../../helpers/CommonHelpers'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'

const SalesReportCard = ({setGoalFilter}) => {
    const salesReportData = useSelector(getSmSalesReportSelector)
    const [filter, setFilter] = useState('this_week')
    const [loading, setLoading] = useState(false)
    const [fullLoading, setFullLoading] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        getSalesReportData()
    }, [filter])

    const onFilterChange = (e) => {
        setFilter(e.target.value)
        setGoalFilter(e.target.value)
    }
    const getSalesReportData = useCallback(() => {
        if (salesReportData) setLoading(true)
        else setFullLoading(true)
        dispatch(smDashboardSalesReportAction(filter)).finally(() => {
            if (salesReportData) setLoading(false)
            else setFullLoading(false)
        })
    }, [dispatch, filter])

    return (
        <div
            className='bg-cmwhite p-5 shadow-sm mb-1'
            style={{
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'Manrope',
                borderRadius: '10px',
                position: 'relative',
            }}
        >
            <CustomLoader visible={fullLoading} full />
            <div
                className='text-cmGrey900 mb-2 d-flex justify-content-between'
                style={{fontSize: '16px', fontWeight: '700', position: 'relative'}}
            >
                Sales Report
                <CustomLoader visible={loading} size={50} />
            </div>
            <div className='w-sm-90 mb-5'>
                <CustomDropdown
                    options={Dashboard_DURATION_DROPDOWN_LIST}
                    onChange={onFilterChange}
                    showClear={false}
                    value={filter}
                    searching={false}
                />
            </div>
            {/* Cards begin */}
            <div>
                <div
                    className='bg-cmSuccess bg-opacity-25 py-1 px-5 mb-5'
                    style={{borderRadius: '10px', fontFamily: 'Manrope'}}
                >
                    <div style={{fontSize: '14px'}} className='text-cmBlack '>
                        Total Earnings:
                    </div>
                    <div style={{fontSize: '18px', fontWeight: 800}} className='text-cmGrey900'>
                        {formattedNumberFields(salesReportData?.totalEarning, '$')}
                    </div>
                </div>
                <div
                    className='bg-cmBlue-Crayola bg-opacity-25 py-1 px-5 mb-5'
                    style={{borderRadius: '10px', fontFamily: 'Manrope'}}
                >
                    <div style={{fontSize: '14px'}} className='text-cmBlack'>
                        Accounts:
                    </div>
                    <div style={{fontSize: '18px', fontWeight: 800}} className='text-cmGrey900'>
                        {salesReportData?.totalSales ?? 0}
                    </div>
                </div>
                {/* Card 2 */}
                <div
                    className='bg-cmOrange bg-opacity-25 py-1 px-5'
                    style={{borderRadius: '10px', fontFamily: 'Manrope'}}
                >
                    <div style={{fontSize: '14px'}} className='text-cmBlack'>
                        KW Sold:
                    </div>
                    <div style={{fontSize: '18px', fontWeight: 800}} className='text-cmGrey900'>
                        {formattedNumberFields(salesReportData?.totalKw, '')} KW
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesReportCard
