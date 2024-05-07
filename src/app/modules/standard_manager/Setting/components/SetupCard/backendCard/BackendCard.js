import React, {useState, useEffect, useCallback} from 'react'
import More1 from '../../Path1.png'
import More from '../../Path.png'
import {MissingTranslationError} from 'react-intl'
import debounce from 'lodash.debounce'
// import Calander from '../../../Icon'
import {
    getCompanyGlobalReconciliationService,
    getMySalesListService,
    getMySalesAccountInitialRatioGraphService,
    getMySalesGraphService,
} from '../../../../../../../services/Services'
import {useSelector} from 'react-redux'
import useBackendCard from './useBackendCard'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
    getValidDate,
    REPORTS_DURATION_DROPDOWN_LIST,
} from '../../../../../../../constants/constants'
import {MySalesMixChart} from './MySalesMixChart'
import {MysalesTopCards} from '../MysalesTopCards'
import MySalesCustomer from './MySalesCustomer'
import {MySalesEarningChart} from './MySalesEarningChart'

import InstallRatioDonutChart from './InstallRatioDonutChart'
import AccountsDonutChart from './AccountsDonutChart'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import CustomDatePicker from '../../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import {
    getBooleanValue,
    getErrorMessageFromResponse,
} from '../../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import {useLocation} from 'react-router-dom'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'

export default function SetupCard1() {
    // const {
    //   toggleMorePress,
    //   more,
    //   marketting,
    //   edit,
    //   onEditButtonPress,
    //   onSavePress,
    //   reconciliation,
    //   setReconciliation,
    //   handleCommission,
    //   handleReconciliation,
    //   handleFromPeriod,
    //   handleMarketting,
    //   filter,
    //   checkreconciliation,
    // } = useBackendCard()
    // const [value, onChange] = useState(new Date())
    // const [state, setState] = useState({startDate: new Date()})
    const [listData, setListData] = useState(null)
    const [ratioGraphData, setRatioGraphData] = useState(null)
    const [graphData, setGraphData] = useState(null)
    const [filter, setFilter] = useState('this_year')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [loading, setLoading] = useState(true)
    const [tableLoading, setTableLoading] = useState(false)
    const [selectedKWType, setSelectedKWType] = useState('sold')
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const [headerFilter, setHeaderFilter] = useState({
        m1: '',
        m2: '',
        closed: '',
    })
    const [sortValue, setSortValue] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)
    const location = useLocation()

    useEffect(() => {
        if (location?.search?.includes('?recentSale')) setFilter('this_week')
    }, [location])
    useEffect(() => {
        //Graph 1
        let body = {
            filter: filter,
            kw_type: selectedKWType,
        }
        if (filter == 'custom' && moment(startDate).isValid() && moment(endDate).isValid()) {
            body.start_date = moment(startDate).format('YYYY-MM-DD')
            body.end_date = moment(endDate).format('YYYY-MM-DD')
        }
        if (
            filter != 'custom' ||
            (filter == 'custom' &&
                moment(startDate).isValid() &&
                moment(endDate).isValid() &&
                startDate <= endDate)
        ) {
            setLoading(true)
            salesList()
            getMySalesAccountInitialRatioGraphService(body)
                .then((res) => {
                    setRatioGraphData(res.data)
                })
                .finally(() => {})
            //Graph 2

            getMySalesGraphService(body).then((res) => {
                setGraphData(res.data)
            })
        }
    }, [filter, selectedKWType, endDate, startDate])

    const salesList = () => {
        setTableLoading(true)
        let body = {
            search: searchTerm,
            filter: filter,
            m1: getBooleanValue(headerFilter?.m1),
            m2: getBooleanValue(headerFilter?.m2),
            closed: getBooleanValue(headerFilter?.closed),
            page: page,
            sort: sortValue,
            sort_val: sortingOrder,
        }
        if (filter == 'custom' && moment(startDate).isValid() && moment(endDate).isValid()) {
            body.start_date = moment(startDate).format('YYYY-MM-DD')
            body.end_date = moment(endDate).format('YYYY-MM-DD')
        }
        getMySalesListService(body)
            .then((res) => {
                setListData(res?.data)
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
                setTableLoading(false)
            })
    }
    useEffect(() => {
        salesList()
    }, [searchTerm, page, sortValue, sortingOrder, headerFilter])
    const handleSearchChange = (e) => {
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

    const filterChange = (e) => {
        setPage(1)
        setLoading(e.target.value != 'custom')
        if (e.target.value != 'custom') {
            if (startDate) setStartDate(null)
            if (endDate) setEndDate(null)
        }
        setFilter(e.target.value)
    }
    const startDateChnage = (e) => {
        if (moment(e).format('yyyy-MM-DD') > moment(endDate).format('yyyy-MM-DD')) {
            setEndDate(null)
        }
        setStartDate(e)
    }
    const endDateChnage = (e) => {
        setEndDate(e)
    }
    const headerFilterChnage = (val, isSelected) => {
        setPage(1)
        setHeaderFilter((item) => ({
            ...item,
            [val]: isSelected,
        }))
    }
    const onPageChange = (selectedPage) => {
        setPage(selectedPage)
    }

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />

            <div
                className='bg-cmwhite mb-10'
                style={{
                    fontSize: '14px',
                    fontFamily: fontsFamily.manrope,
                    position: 'relative',
                    borderRadius: '0px 10px 10px 10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <div className='w-100 mx-sm-7 d-sm-flex flex-wrap justify-content-between align-items-center'>
                    <div className='d-flex flex-row justify-content-center flex-wrap align-items-center py-5 gap-10'>
                        <div className=''>
                            <CustomDropdown
                                name='status'
                                showClear={false}
                                onChange={filterChange}
                                options={REPORTS_DURATION_DROPDOWN_LIST}
                                value={filter}
                            />
                        </div>
                        {filter == 'custom' && (
                            <div className='d-flex align-items-center justify-content-center flex-row gap-sm-5 gap-2  flex-wrap'>
                                <div className='d-flex justify-content-center w-sm-auto w-100'>
                                    <CustomDatePicker
                                        name='startDate'
                                        onChange={(e) => startDateChnage(e.target.value)}
                                        value={startDate}
                                        className='w-sm-auto w-100'
                                        placeholder='Start Date'
                                        maxDate={new Date()}
                                    />
                                </div>
                                <div className='text-cmGrey600' style={{fontWeight: '600'}}>
                                    to
                                </div>
                                <div className=' d-flex justify-content-center w-sm-auto w-100'>
                                    <CustomDatePicker
                                        name='startDate'
                                        onChange={(e) => endDateChnage(e.target.value)}
                                        value={endDate}
                                        // className='w-100'
                                        placeholder='End Date'
                                        maxDate={new Date()}
                                        minDate={startDate}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='row mx-auto  gap-8 mb-10 '>
                {/* begin::Col */}

                <MysalesTopCards
                    heading={graphData?.heading_count_kw?.largest_system_size ?? '0' + 'KW'}
                    content='Largest System Size'
                    className='col-sm '
                    background='#FFF4DE'
                />

                <MysalesTopCards
                    heading={graphData?.heading_count_kw?.avg_system_size ?? '0' + 'KW'}
                    className='col-sm '
                    background='#E1D3FF'
                    content='Average System Size'
                />

                <MysalesTopCards
                    heading={graphData?.heading_count_kw?.install_kw ?? '0' + 'KW'}
                    content='KW Installed (Accounts)'
                    className='col-sm '
                    background='#D7F9EF'
                />
                <MysalesTopCards
                    heading={graphData?.heading_count_kw?.pending_kw ?? '0' + 'KW'}
                    content='KW Pending (Accounts)'
                    className='col-sm '
                    background='#E1E9FF'
                />
                <MysalesTopCards
                    heading={'$' + graphData?.heading_count_kw?.clawBack_account ?? '0'}
                    content='Clawback (Accounts)'
                    className='col-sm '
                    background='#FDDCEA'
                />
            </div>

            <div className='mb-10'>
                <MySalesMixChart
                    selectedKWType={selectedKWType}
                    setSelectedKWType={setSelectedKWType}
                    chartData={graphData?.my_sales}
                />
            </div>
            <div className='mb-10'>
                <MySalesEarningChart salesData={ratioGraphData?.graph_m1_m2_amount?.graph_amount} />
            </div>
            <div className='row gap-5 mx-auto mb-10 w-100'>
                <div className='col-sm'>
                    <AccountsDonutChart accountData={ratioGraphData?.accounts} />
                </div>
                <div className='col-sm'>
                    <InstallRatioDonutChart ratioData={ratioGraphData?.install_ratio} />
                </div>
            </div>
            <div className='mx-sm-auto mb-10 '>
                <MySalesCustomer
                    reportData={listData}
                    onSearchChange={(text) => handleSearchChange(text)}
                    loading={tableLoading}
                    headerFilterChnage={(val, isSelected) =>
                        headerFilterChnage(val.toLowerCase(), isSelected)
                    }
                    onPageChange={(selectedPage) => onPageChange(selectedPage)}
                    activePage={page}
                    getSaleData={salesList}
                    sortingOrder={sortingOrder}
                    sortValue={sortValue}
                    onPress={(item) => {
                        setSortValue(item)
                        setSortingOrder(
                            sortValue !== item ? 'asc' : sortingOrder === 'asc' ? 'desc' : 'asc'
                        )
                        setPage(1)
                    }}
                />
            </div>
        </div>
    )
}
