import React, {useState, useEffect, useMemo, useRef, useCallback} from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import Doughnut from './Doughnut'
import Accounts from './Accounts'
import Avg from './Avg'
import Tabel from './Tabel'
import ViewCostomer from './ViewCostomer'
import CommanTopbarforReports from '../company/CommanTopbarforReports'
import {
    exportAdminSalesService,
    getAdminAllGraphsService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import debounce from 'lodash.debounce'
import SalesContractCard from './SalesContractCard'
import useOfficeLocation from '../../../../../../hooks/useOfficeLocation'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import {
    downloadAnyFileHelper,
    getErrorMessageFromResponse,
} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
export default function Sales({params, setParams}) {
    const [loading, setLoading] = useState(false)
    const [tableLoading, setTableLoading] = useState(false)
    const [graphsData, setGraphData] = useState(null)
    const [officeList, selectedLocation, setSelectedLocation] = useOfficeLocation(params?.office_id)

    useEffect(() => {
        setParams({
            office_id: selectedLocation,
        })
    }, [selectedLocation])

    useEffect(() => {
        let body = {
            filter: params?.filter,
            m1: params?.m1,
            m2: params?.m2,
            closed: params?.closed,
            office_id: params?.office_id,
        }
        if (
            body?.filter == 'custom' &&
            moment(params?.start_date).isValid() &&
            moment(params?.end_date).isValid()
        ) {
            body.start_date = params?.start_date
            body.end_date = params?.end_date
        }
        if (
            params?.office_id &&
            (body?.filter != 'custom' ||
                (body?.filter == 'custom' &&
                    moment(params?.start_date).isValid() &&
                    moment(params?.end_date).isValid() &&
                    params?.start_date <= params?.end_date))
        ) {
            setLoading(true)
            getAdminAllGraphsService(body)
                .then((res) => {
                    setGraphData(res.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [
        params?.m1,
        params?.m2,
        params?.closed,
        params?.office_id,
        params?.filter,
        params?.start_date,
        params?.end_date,
    ])

    const changeFilter = (val) => {
        setParams({
            filter: val,
            page: 1,
            ...(val != 'custom' && {
                start_date: null,
                end_date: null,
            }),
        })
    }
    const headerFilterChnage = (val, isChecked) => {
        setParams({
            [val]: isChecked,
            page: 1,
        })
    }
    const onLocationChange = (loc) => {
        setSelectedLocation(loc)
        setLoading(true)
        setParams({
            page: 1,
        })
    }
    const changeStartDate = (start) => {
        setParams({
            start_date: moment(start).format('YYYY-MM-DD'),
        })
    }
    const changeEndDate = (end) => {
        setParams({
            end_date: moment(end).format('YYYY-MM-DD'),
        })
    }

    const handleSearchChange = (e) => {
        delaySaveToDb(e)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            setTableLoading(true)
        }, 500),
        []
    )

    const onExportCostData = useCallback(() => {
        setLoading(true)
        const body = {
            office_id: selectedLocation,
            filter: params?.filter,
            m1: params?.m1,
            m2: params?.m2,
            closed: params?.closed,
        }
        if (
            body?.filter == 'custom' &&
            moment(params?.start_date).isValid() &&
            moment(params?.end_date).isValid()
        ) {
            body.start_date = params?.start_date
            body.end_date = params?.end_date
        }
        exportAdminSalesService(body)
            .then((res) => {
                const fileName = `Payroll Reports - ${moment(new Date()).format(
                    'DD MMM YY hh:mm'
                )}.csv`
                downloadAnyFileHelper(res, fileName)
                CustomToast.success('File Downloaded Successfully')
            })
            .catch((err) => {
                CustomToast.success(getErrorMessageFromResponse(err))
            })
            .finally(() => {
                setLoading(false)
            })
    }, [
        selectedLocation,
        params?.filter,
        params?.m1,
        params?.m2,
        params?.closed,
        params?.start_date,
        params?.end_date,
    ])
    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />
            <CommanTopbarforReports
                selectedLocation={selectedLocation}
                filter={params.filter}
                params={params}
                officeList={officeList}
                onChangeFilter={(val) => {
                    changeFilter(val)
                }}
                onLocationChange={(loc) => onLocationChange(loc)}
                onStartDateChange={(start) => changeStartDate(start)}
                onEndDateChange={(end) => changeEndDate(end)}
                handleExport={onExportCostData}
            />
            <div className='row mt-10 mx-auto'>
                {/* <div className=' shadow mb-4  w-md-300px h-md-230px bg-white rounded'> */}
                <div
                    className='col  shadow mb-4 bg-cmwhite'
                    style={{borderRadius: '10px', height: 'fit-content'}}
                >
                    <div
                        className='p-4 text-cmGrey800'
                        style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: fontsFamily.manrope,
                        }}
                    >
                        Accounts
                    </div>
                    <div
                        style={{marginTop: '-50px'}}
                        className='d-flex h-200px justify-content-center mx-auto'
                    >
                        <Doughnut graphsData={graphsData?.accounts} />
                    </div>
                    <div
                        className='bord bg-cmGrey300'
                        style={{
                            marginTop: '-55px',
                        }}
                    ></div>

                    <div className=''>
                        <Accounts graphsData={graphsData?.accounts} />
                    </div>
                </div>

                {/* <Contracts graphsData={graphsData?.install_ratio} contracts={graphsData?.contracts} /> */}

                <div className='col-sm'>
                    <Avg avgData={graphsData?.best_avg} />
                </div>
                <div className='col-xxl-5'>
                    <SalesContractCard
                        graphsData={graphsData?.install_ratio}
                        contracts={graphsData?.contracts}
                    />
                </div>
            </div>
            <Tabel
                params={params}
                setParams={setParams}
                selectedLocation={selectedLocation}
                onSearchChange={(text) => handleSearchChange(text)}
                loading={tableLoading}
                headerFilterChnage={(val, isChecked) => headerFilterChnage(val, isChecked)}
            />
            <ViewCostomer />
        </div>
    )
}
