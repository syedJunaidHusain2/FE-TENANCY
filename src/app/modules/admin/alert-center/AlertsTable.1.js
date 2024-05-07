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
import {Inplace, InplaceDisplay, InplaceContent} from 'primereact/inplace'
import {InputText} from 'primereact/inputtext'

export const AlertsTable = ({param, setParam}) => {
    const [loading, setLoading] = useState(true)
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

    useEffect(() => {
        getAlertCenterList()
    }, [currentPayPeriodFromAllPayPeriod, activePage, searchTerm, quickFilter, param])

    const getAlertCenterList = useCallback(() => {
        setLoading(true)
        let startDate = currentPayPeriodFromAllPayPeriod?.pay_period_from ?? null,
            endDate = currentPayPeriodFromAllPayPeriod?.pay_period_to ?? null

        if (startDate && endDate) {
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
        searchForAllAlert(allSearchTerm, page)
    }

    const onChangeQuickFilter = (val) => {
        setQuickFilter(val)
    }

    const searchAllAlert = (e) => {
        setParam({...param, allSearchTerm: e.target.value})
        setAllSearchTerm(e.target.value)
        delaySearch(e.target.value)
    }
    const delaySearch = useCallback(
        debounce((val) => {
            searchForAllAlert(val)
        }, 500),
        [alertData?.data?.data]
    )
    const searchForAllAlert = useCallback((searchVal, pageVal) => {
        setAllLoading(true)
        const body = {
            search: searchVal,
            page: pageVal,
        }
        searchAllAlertDataService(body)
            .then((res) => {
                setAllAlertData(res?.data)
            })
            .finally(() => setAllLoading(false))
    }, [])
    return (
        <div className='' style={{position: 'relative', marginTop: -20}}>
            <div className='d-flex flex-wrap align-items-start gap-10'>
                <div className='w-sm-20'>
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

                <div className='w-sm-75 w-100'>
                    <div className='bg-cmwhite shadow-sm mb-10 p-5 rounded'>
                        <div className=''>
                            <Inplace closable={true} onClose={() => setAllSearchTerm('')}>
                                <InplaceDisplay>
                                    <span
                                        className='text-cmGrey600'
                                        style={{
                                            fontSize: '16px',
                                            fontFamily: ' Manrope',
                                            fontWeight: 600,
                                        }}
                                    >
                                        <div
                                            className='pi pi-search'
                                            style={{fontSize: '1.2rem'}}
                                        ></div>{' '}
                                        {allSearchTerm || 'Search All'}
                                    </span>
                                </InplaceDisplay>
                                <InplaceContent>
                                    <InputText
                                        autoFocus
                                        style={{width: '75%'}}
                                        placeholder={'Search'}
                                        onChange={searchAllAlert}
                                        value={allSearchTerm}
                                    />
                                </InplaceContent>
                            </Inplace>
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
                                    alertType={'searchAll'}
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
                                    alertType={alertType}
                                    getAlertCenterList={getAlertCenterList}
                                />
                            </div>
                        </div>
                    )}
                    {allSearchTerm ? (
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
