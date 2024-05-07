import React, {useState, useEffect, useCallback} from 'react'
import MySalesCustomerInfo from '../../Setting/components/SetupCard/backendCard/MySalesCustomerInfo'
import CustomReportsHeader from '../customs/CustomReportsHeader'
import {SalesChart} from './SalesChart'
import SalesDonutChart from './SalesDonutChart'
import SalesInstallRatioDonutChart from './SalesInstallRatioDonutChart'
import {SalesRevenueChart} from './SalesRevenueChart'
import {SalesTopCards} from './SalesTopCards'

import {
    getSalesGraphService,
    getSalesAccountAndInstallRatioGraphService,
    getSalesReportService,
    officeBYUserIDSerices,
    salesReportFilterService,
} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import debounce from 'lodash.debounce'
import moment from 'moment'
import useOfficeLocation from '../../../../../hooks/useOfficeLocation'
import {downloadAnyFileHelper} from '../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
const initialFilter = {
    status_filter: '',
    installer_filter: '',
    date_filter: '',
}

const SalesReport = () => {
    const [reportData, setSalesReportData] = useState(null)
    const [chartData, setSalesChartData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [tableLoading, setTableLoading] = useState(false)
    const [stateList, selectedLocation, setSelectedLocation] = useOfficeLocation()
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('this_year')
    const [page, setPage] = useState(1)
    const [ratioGraphData, setRatioGraphData] = useState(null)
    const [selectedKWType, setSelectedKWType] = useState('sold')
    const [userByOfficeData, setUserByOffceData] = useState([])
    const [repId, setRepId] = useState(null)
    const [isExport, setIsExport] = useState(0)
    const [filterData, setFilterData] = useState(initialFilter)
    const [sortValue, setSortValue] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)

    useEffect(() => {
        const body = {
            office_id: selectedLocation,
            filter: filter,
            page: page,
            kw_type: selectedKWType,
            user_id: repId,
            sort: sortValue,
            sort_val: sortingOrder,
        }
        if (filter == 'custom' && moment(startDate).isValid() && moment(endDate).isValid()) {
            body.start_date = startDate
            body.end_date = endDate
        }
        if (
            selectedLocation &&
            (filter != 'custom' ||
                (filter == 'custom' &&
                    moment(startDate).isValid() &&
                    moment(endDate).isValid() &&
                    startDate <= endDate))
        ) {
            setLoading(true)
            //   getSalesGraphService(body).then((res) => {
            //     setSalesData(res.data)
            //   })
            getSalesGraphService(body)
                .then((res) => {
                    setSalesChartData(res.data)
                })
                .finally(() => {
                    setLoading(false)
                })
            getSalesAccountAndInstallRatioGraphService(body).then((res) => {
                setRatioGraphData(res.data)
            })
        }
    }, [
        filter,
        selectedLocation,
        endDate,
        startDate,
        selectedKWType,
        repId,
        sortValue,
        sortingOrder,
    ])
    useEffect(() => {
        officeBYUserIDSerices(selectedLocation).then((res) => {
            const modifiedRes = res?.data?.map((item) => ({
                ...item,
                name: `${item?.first_name} ${item?.last_name}`,
            }))
            setUserByOffceData(modifiedRes)
        })
    }, [selectedLocation])
    useEffect(() => {
        if (selectedLocation) {
            setTableLoading(true)
            const body = {
                search: searchTerm,
                office_id: selectedLocation,
                filter: filter,
                page,
                user_id: repId,
                ...filterData,
            }
            if (filter == 'custom' && moment(startDate).isValid() && moment(endDate).isValid()) {
                body.start_date = startDate
                body.end_date = endDate
            }
            getReport(body)
        }
    }, [
        searchTerm,
        page,
        filter,
        selectedLocation,
        repId,
        endDate,
        startDate,
        isExport,
        filterData,
    ])

    const getReport = (body) => {
        if (isExport) body.is_export = '1'
        getSalesReportService(body)
            .then((res) => {
                if (isExport) {
                    const fileName = `Sales Reports - ${moment(new Date()).format(
                        'DD MMM YY hh:mm'
                    )}.csv`
                    downloadAnyFileHelper(res, fileName)
                    setIsExport(0)
                    CustomToast.success('File Downloaded Successfully')
                } else {
                    setSalesReportData(res?.data)
                }
            })
            .finally(() => {
                setLoading(false)
                setTableLoading(false)
            })
    }

    const onChangeFilter = (data) => {
        setPage(1)
        setLoading(data == 'custom' ? false : true)
        setFilter(data)
    }

    const onLocationChange = (loc) => {
        setPage(1)
        // setLoading(true)
        setRepId(null)
        setSelectedLocation(loc)
    }
    const changeStartDate = (start) => {
        setPage(1)
        setStartDate(start)
    }
    const changeEndDate = (end) => {
        setPage(1)
        setEndDate(end)
    }
    const handleLocationChange = (e) => {
        delaySaveToDb(e)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            setTableLoading(true)
            setSearchTerm(val)
            setPage(1)
        }, 500),
        []
    )
    const onPageChange = (selectedPage) => {
        setPage(selectedPage)
    }
    const onApplyFilter = (filter) => {
        setPage(1)
        setSearchTerm('')
        setFilterData(filter)

        // setTableLoading(true)
        // salesReportFilterService(filter)
        //     .then((res) => {
        //         setSalesReportData(res?.data)
        //     })
        //     .finally(() => {
        //         setTableLoading(false)
        //     })
    }
    const onResetFilter = () => {
        setPage(1)

        setFilterData(initialFilter)
        // getlocation()
    }
    const onExportSalesData = useCallback(() => {
        setLoading(true)
        setIsExport(1)
    }, [])
    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />
            <div>
                <CustomReportsHeader
                    stateList={stateList}
                    selectedLocation={selectedLocation}
                    onChangeDate={(data) => onChangeFilter(data)}
                    onLocationChange={(loc) => onLocationChange(loc)}
                    onStartDateChange={(start) => changeStartDate(start)}
                    onEndDateChange={(end) => changeEndDate(end)}
                    userByOfficeData={userByOfficeData}
                    setRepId={(val) => {
                        setRepId(val)
                        setPage(1)
                    }}
                    repId={repId}
                    handleExport={onExportSalesData}
                    isExport={true}
                />
            </div>
            <div className='row m-4 mx-auto mt-10  gap-8'>
                <SalesTopCards
                    heading={chartData?.heading_count_kw?.largest_system_size ?? '0' + 'KW'}
                    content='Largest System Size'
                    className='col-sm mb-5 mb-xl-10'
                    background='#FFF4DE'
                />
                <SalesTopCards
                    heading={chartData?.heading_count_kw?.avg_system_size ?? '0' + 'KW'}
                    className='col-sm mb-5 mb-xl-10'
                    background='#E1D3FF'
                    content='Average System Size'
                />
                <SalesTopCards
                    heading={chartData?.heading_count_kw?.install_kw ?? '0'}
                    content='KW Installed (Accounts)'
                    className='col-sm mb-5 mb-xl-10'
                    background='#D7F9EF'
                />
                <SalesTopCards
                    heading={chartData?.heading_count_kw?.pending_kw ?? '0'}
                    content='KW Pending (Accounts)'
                    className='col-sm mb-5 mb-xl-10'
                    background='#E1E9FF'
                />
                <SalesTopCards
                    heading={chartData?.heading_count_kw?.clawBack_account ?? '0'}
                    content='Clawback (Accounts)'
                    className='col-sm mb-5 mb-xl-10'
                    background='#FDDCEA'
                />
            </div>
            <div>
                <SalesChart
                    chartData={chartData?.my_sales}
                    selectedKWType={selectedKWType}
                    setSelectedKWType={setSelectedKWType}
                />
            </div>
            {/* <div>
                <SalesRevenueChart salesData={ratioGraphData?.graph_m1_m2_amount?.graph_amount} />
            </div> */}
            <div className='row mx-auto gap-sm-5 gap-10 my-10 '>
                <div className='col-sm'>
                    <SalesDonutChart accData={ratioGraphData?.accounts} />
                </div>
                <div className='col-sm'>
                    <SalesInstallRatioDonutChart
                        ratioData={ratioGraphData?.install_ratio}
                        a={ratioGraphData?.install_ratio?.install?.replace('%', '')}
                        b={ratioGraphData?.install_ratio?.uninstall?.replace('%', '')}
                    />
                </div>
                {/* <div className='col-xxl-5 '>
          <SalesRevenueChart salesData={ratioGraphData?.graph_m1_m2_amount?.graph_amount} />
        </div> */}
            </div>
            <div>
                <MySalesCustomerInfo
                    reportData={reportData}
                    onSearchChange={(text) => handleLocationChange(text)}
                    loading={tableLoading}
                    onPageChange={(selectedPage) => onPageChange(selectedPage)}
                    activePage={page}
                    applyFilter={(filter) => onApplyFilter(filter)}
                    resetFilter={onResetFilter}
                    onPress={(item) => {
                        setSortValue(item)
                        setSortingOrder(
                            sortValue !== item ? 'asc' : sortingOrder === 'asc' ? 'desc' : 'asc'
                        )
                        setPage(1)
                    }}
                    sortValue={sortValue}
                    sortingOrder={sortingOrder}
                />
            </div>
        </div>
    )
}

export default SalesReport
