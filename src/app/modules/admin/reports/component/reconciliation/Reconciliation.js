import {useState, useEffect, useCallback, useMemo} from 'react'
import debounce from 'lodash.debounce'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import ReconciliationTabel from './ReconciliationTabel'
import FiscalYearTabel from './FiscalYearTabel'
import {getReconciliationReportService} from '../../../../../../services/Services'
import {useSelector} from 'react-redux'
import {getReconciliationScheduleSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import useOfficeLocation from '../../../../../../hooks/useOfficeLocation'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {getValidDate} from '../../../../../../constants/constants'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import {
    downloadAnyFileHelper,
    getErrorMessageFromResponse,
} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'

export default function Reconciliation() {
    const [loading, setLoading] = useState(false)
    const [reconcilliationData, setReconcilliationData] = useState()
    const [stateList, selectedLocation, setSelectedLocation] = useOfficeLocation()
    const [searchTerm, setSearchTerm] = useState('')
    const reconciliationSchedule = useSelector(getReconciliationScheduleSelector)
    const [selectedReconPeriod, setReconPeriod] = useState(reconciliationSchedule?.[0])
    const [activePage, setActivePage] = useState(1)

    const [btn, setBtn] = useState(false)

    useEffect(() => {
        if (selectedLocation) {
            setLoading(true)
            const body = {
                // filter: 'this_year',
                office_id: selectedLocation,
                search: searchTerm,
                start_date: selectedReconPeriod?.period_from,
                end_date: selectedReconPeriod?.period_to,
                page: activePage,
            }
            getReconciliationReportService(body)
                .then((res) => {
                    setReconcilliationData(res.data)
                })
                .catch(() => {})
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [selectedLocation, searchTerm, selectedReconPeriod, activePage])

    const locationChange = (e) => {
        setLoading(true)
        setSelectedLocation(e.target.value)
        setLoading(true)
    }
    const handleLocationChange = (e) => {
        delaySaveToDb(e)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            setLoading(true)
            setSearchTerm(val)
        }, 500),
        []
    )
    const periodChange = (e) => {
        setLoading(true)
        setActivePage(1)
        const selectedData = reconciliationSchedule?.filter((item) => e.target.value == item.id)
        setReconPeriod(selectedData?.[0])
    }

    const periodList = useMemo(() => {
        return reconciliationSchedule?.map((item) => ({
            ...item,
            period: `${getValidDate(item?.period_from)} - ${getValidDate(item?.period_to)}`,
        }))
    })
    const onExportCostData = useCallback(() => {
        setLoading(true)
        const body = {
            office_id: selectedLocation,
            start_date: selectedReconPeriod?.period_from,
            end_date: selectedReconPeriod?.period_to,
            search: '',

            is_export: '1',
        }
        getReconciliationReportService(body)
            .then((res) => {
                const fileName = `Reconcilliation Reports - ${moment(new Date()).format(
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
    }, [selectedLocation, selectedReconPeriod?.period_from, selectedReconPeriod?.period_to])
    return (
        <div style={{position: 'relative'}}>
            <div className=''>
                <div className=' '>
                    <div
                        className='bg-white w-sm-100 '
                        style={{
                            fontSize: '14px',
                            borderRadius: '0 10px 10px 10px',
                            fontFamily: 'Manrope',
                            boxShadow:
                                'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                        }}
                    >
                        <div className='w-100 p-3 d-flex flex-wrap justify-content-between align-items-center'>
                            <div>
                                <label
                                    style={{
                                        color: '#212121',
                                        fontFamily: 'Manrope',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                    }}
                                >
                                    Location:
                                    <label
                                        style={{fontWeight: '400', fontFamily: 'Manrope'}}
                                        className='ms-2'
                                    >
                                        <CustomDropdown
                                            options={stateList}
                                            onChange={locationChange}
                                            value={selectedLocation}
                                            showClear={false}
                                        />
                                    </label>
                                </label>
                            </div>
                            <div className=' py-3 mb-1 text-black fw-bold d-flex flex-row w-225px'>
                                <CustomDropdown
                                    placeholder='Select Pay period'
                                    // value={`${selectedReconPeriod?.period_from + ',' + selectedReconPeriod?.period_to}`}
                                    value={selectedReconPeriod?.id}
                                    name='status'
                                    options={periodList}
                                    onChange={periodChange}
                                    valueKey={'id'}
                                    displayKey='period'
                                    showClear={false}
                                />
                            </div>
                            <div className='mb-2'>
                                <CustomButton
                                    buttonType={BUTTON_TYPE.disabled}
                                    buttonLabel='Export'
                                    onClick={onExportCostData}
                                    padding={'py-3'}
                                    icon={'pi pi-file-export'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {btn === false ? (
                <ReconciliationTabel
                    key='reconcilation-tableData'
                    reconcilliationData={reconcilliationData}
                    loading={loading}
                    onSearchChange={(text) => handleLocationChange(text)}
                    onPageChange={(page) => setActivePage(page)}
                    activePage={activePage}
                />
            ) : (
                <FiscalYearTabel />
            )}
        </div>
    )
}
