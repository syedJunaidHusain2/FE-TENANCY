import React, {useState, useEffect, useCallback} from 'react'

import {getAlertCenterListService, searchAllAlertDataService} from '../../../../services/Services'
import CustomLoader from '../../../../customComponents/customLoader/CustomLoader'
import Pagination from '../sequidocs/component/Pagination'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../customComponents/customInputs/customInput/CustomInput'
import usePayFrequency from '../../../../hooks/usePayFrequency'
import AlertsTableSidebar from './AlertsTableSidebar'
import CommonAlertBlock from './CommonAlertBlock'
import debounce from 'lodash.debounce'
import AssignPayrollModal from './AssignPayrollModal'

import {InputText} from 'primereact/inputtext'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {GLOBAL_SEARCH_TYPE} from '../../../../constants/constants'

const AlertsTable = ({param, setParam}) => {
    const [loading, setLoading] = useState(false)
    const [allLoading, setAllLoading] = useState(false)
    const [alertType, setAlertType] = useState('sales')
    const [quickFilter, setQuickFilter] = useState(null)
    const [alertData, setAlertData] = useState([])
    const [allAlertData, setAllAlertData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchVal, setSearchVal] = useState(null)
    const [showAssignModal, setShowAssignModal] = useState(false)
    const [activePage, setActivePage] = useState(1)
    const {currentPayPeriodFromAllPayPeriod} = usePayFrequency()
    const [allSearchTerm, setAllSearchTerm] = useState(param?.allSearchTerm)
    const [activePageForAll, setActivePageForAll] = useState(1)
    const [globalAlertType, setGlobalAlertType] = useState('payroll')
    const [allSearchVal, setAllSearchVal] = useState(param?.allSearchTerm)
    const [toggleAllSearch, setToggleAllSearch] = useState(param?.allSearchTerm ? true : false)

    useEffect(() => {
        if (param?.allSearchTerm) {
            setAllSearchTerm(param?.allSearchTerm)
            setAllSearchVal(param?.allSearchTerm)
            setToggleAllSearch(true)
        }
    }, [param?.allSearchTerm])

    useEffect(() => {
        if (!toggleAllSearch) getAlertCenterList()
    }, [
        currentPayPeriodFromAllPayPeriod,
        activePage,
        searchTerm,
        quickFilter,
        param,
        toggleAllSearch,
    ])

    useEffect(() => {
        if (allSearchTerm) searchForAllAlert()
    }, [allSearchVal, activePageForAll, globalAlertType])

    const getAlertCenterList = useCallback(() => {
        let startDate = currentPayPeriodFromAllPayPeriod?.pay_period_from ?? null,
            endDate = currentPayPeriodFromAllPayPeriod?.pay_period_to ?? null

        if (startDate && endDate) {
            setLoading(true)
            let params = {
                filter: param?.alertType,
                pay_period_from: startDate,
                pay_period_to: endDate,
                page: param?.page,
                search: searchTerm,
                quick_filter: quickFilter,
            }
            setAlertData([])
            getAlertCenterListService(params)
                .then((res) => {
                    setAlertData(res)
                })
                .finally(() => setLoading(false))
        }
    }, [
        currentPayPeriodFromAllPayPeriod?.pay_period_from,
        currentPayPeriodFromAllPayPeriod?.pay_period_to,
        param?.alertType,
        param?.page,
        quickFilter,
        searchTerm,
    ])

    const searchForAllAlert = useCallback(
        (searchVal, pageVal) => {
            setAllLoading(true)

            const body = {
                search: allSearchVal,
                page: activePage,
                filter_type: globalAlertType,
            }
            searchAllAlertDataService(body)
                .then((res) => {
                    setAllAlertData(res?.data)
                })
                .finally(() => setAllLoading(false))
        },
        [activePage, allSearchVal, globalAlertType]
    )

    const handleSearchChange = (e) => {
        setSearchVal(e.target.value)
        delaySaveToDb(e.target.value)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            setSearchTerm(val)
        }, 500),
        [alertData?.data?.data]
    )

    const onPageChange = (page) => {
        setParam({...param, page: page})
        setActivePage(page)
    }

    const onPageChangeForAll = (page) => {
        setActivePageForAll(page)
    }

    const onChangeQuickFilter = (val) => {
        setQuickFilter(val)
    }

    const searchAllAlert = (e) => {
        setAllSearchTerm(e.target.value)
        delaySearch(e.target.value)
    }
    const delaySearch = useCallback(
        debounce((val) => {
            setAllSearchVal(val)
        }, 500),
        [alertData?.data?.data]
    )

    const onChangeDropdownData = (e) => {
        setAllSearchTerm('')
        setAllSearchVal('')
        setGlobalAlertType(e.target.value)
    }

    const handleToggleAllSearch = () => {
        setToggleAllSearch(true)
    }
    const clearAllSearch = () => {
        setToggleAllSearch(false)
        setAllSearchTerm('')
        setAllSearchVal('')
        setParam({...param, allSearchTerm: ''})
    }
    return (
        <div className='' style={{position: 'relative', marginTop: -20}}>
            <div className='d-flex flex-wrap align-items-start gap-10'>
                <div className='w-lg-20 w-sm-30 w-100'>
                    <AlertsTableSidebar
                        alertType={param?.alertType}
                        setAlertType={setAlertType}
                        setParam={setParam}
                        alertList={alertData}
                        setActivePage={setActivePage}
                        setSearchTerm={setSearchTerm}
                        setSearchVal={setSearchVal}
                        onChangeQuickFilter={onChangeQuickFilter}
                        quickFilter={quickFilter}
                        setQuickFilter={setQuickFilter}
                        loader={loading}
                        disable={allSearchTerm ? true : false}
                    />
                </div>

                <div className='w-lg-75 w-sm-60 w-100'>
                    <div className='bg-cmwhite shadow-sm mb-10 p-5 rounded'>
                        <div className='d-flex gap-5 w-100'>
                            {toggleAllSearch ? (
                                <>
                                    <div>
                                        {' '}
                                        <CustomDropdown
                                            value={globalAlertType}
                                            onChange={onChangeDropdownData}
                                            options={GLOBAL_SEARCH_TYPE}
                                            searching={false}
                                            showClear={false}
                                        />
                                    </div>
                                    <div className='w-50 d-flex gap-2 flex-center'>
                                        <InputText
                                            autoFocus
                                            style={{width: '75%'}}
                                            placeholder={
                                                globalAlertType == 'payroll'
                                                    ? 'Search With PID and Customer Name'
                                                    : 'Search With Employee Name'
                                            }
                                            onChange={searchAllAlert}
                                            value={allSearchTerm}
                                        />
                                        <div
                                            className='text-cmGrey600 text-decoration-underline cursor-pointer'
                                            onClick={clearAllSearch}
                                        >
                                            <span
                                                className='pi pi-eraser
'
                                            ></span>
                                            Clear
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <span
                                        className='text-cmGrey600 cursor-pointer'
                                        style={{
                                            fontSize: '16px',
                                            fontFamily: ' Manrope',
                                            fontWeight: 600,
                                        }}
                                        onClick={handleToggleAllSearch}
                                    >
                                        <div
                                            className='pi pi-search'
                                            style={{fontSize: '1.2rem'}}
                                        ></div>{' '}
                                        {allSearchTerm || 'Search All'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    {allSearchTerm ? (
                        <div
                            className='bg-cmwhite shadow-sm'
                            style={{borderRadius: '10px', fontSize: '14px', fontFamily: ' Manrope'}}
                        >
                            {/* Table starts */}
                            <div className='table-responsive' style={{position: 'relative'}}>
                                <CustomLoader full visible={allLoading} />
                                <CommonAlertBlock
                                    alertData={allAlertData}
                                    alertType={globalAlertType}
                                    getAlertCenterList={getAlertCenterList}
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            className='bg-cmwhite shadow-sm'
                            style={{borderRadius: '10px', fontSize: '14px', fontFamily: ' Manrope'}}
                        >
                            <div className='row p-5'>
                                <div className='col'>
                                    <div className='d-flex  align-items-center'>
                                        <CustomInput
                                            type={INPUT_TYPE.search}
                                            name='search'
                                            onChange={handleSearchChange}
                                            value={searchVal}
                                        />
                                    </div>
                                </div>
                                <div className='col'></div>
                            </div>
                            {/* Table starts */}
                            <div className='table-responsive' style={{position: 'relative'}}>
                                <CustomLoader full visible={loading} />
                                <CommonAlertBlock
                                    alertData={alertData?.data}
                                    alertType={param?.alertType}
                                    getAlertCenterList={getAlertCenterList}
                                />
                            </div>
                        </div>
                    )}
                    {toggleAllSearch ? (
                        <Pagination
                            page={activePageForAll}
                            totalPages={allAlertData?.last_page}
                            setPage={(changedPage) => onPageChangeForAll(changedPage)}
                        />
                    ) : (
                        <Pagination
                            page={param?.page}
                            totalPages={alertData?.data?.last_page}
                            setPage={(changedPage) => onPageChange(changedPage)}
                        />
                    )}
                </div>
            </div>
            {showAssignModal ? (
                <AssignPayrollModal
                    show={showAssignModal}
                    handleClose={() => setShowAssignModal(false)}
                />
            ) : null}
        </div>
    )
}

export default AlertsTable
