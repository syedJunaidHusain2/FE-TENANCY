import React, {useEffect, useState} from 'react'
import {PayStubChart} from './PayStubChart'
import PayStubTable from './PayStubTable'
import {
    getPastPaystubGraphDataService,
    getPastPaystubTableDataService,
} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import CustomDatePicker from '../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getUserDataSelector} from '../../../../../redux/selectors/AuthSelectors'

const PayStubs = () => {
    const [graphData, setGraphData] = useState(null)
    const [tableData, setTableData] = useState(null)
    const [selectedYear, setYear] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [tableLoading, setTableLoading] = useState(false)
    const [page, setPage] = useState(1)
    const location = useLocation()
    const userData = useSelector(getUserDataSelector)
    useEffect(() => {
        setLoading(true)
        const body = {
            year: selectedYear?.getFullYear(),
            user_id: location?.state?.userId ?? userData?.id,
        }
        getGraphData(body)
        // getTableData(body)
    }, [selectedYear])

    useEffect(() => {
        setTableLoading(true)
        const body = {
            year: selectedYear?.getFullYear(),
            user_id: location?.state?.userId ?? userData?.id,
            page: page,
        }
        getTableData(body)
    }, [page, selectedYear])

    const getGraphData = (body) => {
        getPastPaystubGraphDataService(body).then((res) => setGraphData(res.data))
    }
    const getTableData = (body) => {
        getPastPaystubTableDataService(body)
            .then((res) => setTableData(res?.data))
            .finally(() => {
                setLoading(false)
                setTableLoading(false)
            })
    }
    const handlePageChange = (val) => {
        setPage(val)
    }
    return (
        <div style={{fontWeight: 'Manrope', fontSize: '14px', position: 'relative'}}>
            {/* Top Header */}
            <div
                className='bg-cmwhite py-5 px-10 mb-10'
                style={{
                    borderRadius: '0px 10px 10px 10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <div className='d-flex gap-5 align-items-center'>
                    <div className='text-cmGrey700' style={{fontWeight: '600'}}>
                        Select Financial Year{' '}
                    </div>
                    <div>
                        <CustomDatePicker
                            viewMode='year'
                            maxDate={new Date()}
                            dateFormat='yy'
                            placeholder='YYYY'
                            value={selectedYear}
                            onChange={(e) => {
                                setPage(1)
                                setYear(e?.target?.value)
                            }}
                        />
                    </div>
                </div>
            </div>
            {/* Chart starts */}
            <div className='mb-10' style={{position: 'relative'}}>
                <CustomLoader full visible={loading} />
                <PayStubChart graphData={graphData} />
            </div>
            {/* Chart ends */}
            {/* table  starts */}
            <div style={{position: 'relative'}}>
                <CustomLoader full visible={tableLoading} />
                <PayStubTable
                    tableData={tableData}
                    page={page}
                    onPageChange={handlePageChange}
                    loading={tableLoading}
                />
            </div>
            {/* table  ends */}
        </div>
    )
}

export default PayStubs
