import {useCallback, useMemo, useState} from 'react'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'
import CustomDatePicker from '../../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomDelete from '../../../../../../../customComponents/customIcons/CustomDelete'
import CustomLink from '../../../../../../../customComponents/customButtton/CustomLink'
import {getValidDate} from '../../../../../../../constants/constants'
import moment from 'moment'
import _ from 'lodash'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import CustomNoData from '../../../../../../../customComponents/customNoData/CustomNoData'
import {deleteReconciliationPeriodService} from '../../../../../../../services/Services'
import {getErrorMessageFromResponse} from '../../../../../../../helpers/CommonHelpers'

const ReconciliationTableEdit = ({
    reconciliation = [],
    setLoading = null,
    getReconliation = null,
    setReconciliation,
    handlePeriod,
    handleToPeriod,
    reconDisableDates,
}) => {
    const [selectedYear, setSelectedYear] = useState(getValidDate(new Date(), 'yyyy'))

    const yearStartDate = useMemo(() => {
        return moment('1/1/' + selectedYear, 'DD/MM/YYYY').toDate()
    }, [selectedYear])

    const yearEndDate = useMemo(() => {
        return moment('31/12/' + selectedYear, 'DD/MM/YYYY').toDate()
    }, [selectedYear])

    const addNewRow = () => {
        const newArray = _.cloneDeep(reconciliation)
        newArray.push({id: null, period_from: null, period_to: null, year: selectedYear})
        setReconciliation(newArray)
    }
    const deleteRow = useCallback(
        (item, index) => {
            let data = _.cloneDeep(reconciliation)
            if (!item?.id) {
                data = reconciliation?.filter((i, ind) => ind != index)
                setReconciliation(data)
            } else {
                setLoading(true)
                deleteReconciliationPeriodService({
                    period_from: item?.period_from,
                    period_to: item?.period_to,
                    id: item?.id,
                })
                    .then(() => {
                        getReconliation().then(() => setLoading(false))
                    })
                    .catch((e) => {
                        CustomToast.error(getErrorMessageFromResponse(e))
                        setLoading(false)
                    })
            }
        },
        [getReconliation, reconciliation, setLoading, setReconciliation]
    )

    const getReconciliationDataAsPerSelectedYear = useCallback(
        (item) => {
            const startDateYear = getValidDate(item?.period_from, 'yyyy')
            const endDateYear = getValidDate(item?.period_from, 'yyyy')
            return (
                (startDateYear == selectedYear && endDateYear == selectedYear) ||
                item?.year == selectedYear
            )
        },
        [selectedYear]
    )

    const isYearCanBeChange = useMemo(() => {
        return reconciliation?.length > 0
            ? reconciliation
                  ?.filter((item) => {
                      return (
                          getReconciliationDataAsPerSelectedYear(item) || item?.year == selectedYear
                      )
                  })
                  ?.every((item) => {
                      return item?.period_from && item?.period_to
                  })
            : true
    }, [getReconciliationDataAsPerSelectedYear, reconciliation, selectedYear])

    const onYearChange = useCallback(
        (e) => {
            const allReconciliationDataFromSelectedYearAdded = isYearCanBeChange
            if (!allReconciliationDataFromSelectedYearAdded) {
                return CustomToast.error(`Select remaining dates for ${selectedYear}`)
            }

            const year = getValidDate(e?.target?.value, 'yyyy')
            setSelectedYear(year)
        },
        [isYearCanBeChange, selectedYear]
    )

    const totalRecords = useMemo(() => {
        return reconciliation.filter((item) => getReconciliationDataAsPerSelectedYear(item))?.length
    }, [getReconciliationDataAsPerSelectedYear, reconciliation])

    const isPayPeriodHasEntries = useCallback((item) => {
        return Number(item?.count) > 0
    }, [])

    return (
        <div style={{fontFamily: fontsFamily.manrope}}>
            <div className='table-responsive'>
                <table
                    className='table table align-middle'
                    style={{tableLayout: 'fixed', width: '100%'}}
                >
                    <thead>
                        <th style={{width: '150px'}}></th>
                        <th style={{width: '100px'}}></th>
                        <th style={{width: '375px'}}></th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr className=''>
                            <td className='' colSpan={2}>
                                <div className='d-flex gap-5 align-items-center justify-content-end'>
                                    <div
                                        className='text-cmGrey800'
                                        style={{fontSize: 14, fontWeight: 700}}
                                    >
                                        Year
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <CustomDatePicker
                                        disabled={!isYearCanBeChange}
                                        value={selectedYear}
                                        showTodayAndClearButton={false}
                                        onChange={onYearChange}
                                        dateFormat='yy'
                                        placeholder='YYYY'
                                        viewMode='year'
                                    />
                                    {!isYearCanBeChange ? (
                                        <div>
                                            <span
                                                className='p-error ms-5'
                                                style={{fontWeight: '600'}}
                                            >
                                                Fill all dates
                                                {/* for {selectedYear} */}
                                            </span>
                                        </div>
                                    ) : null}
                                </div>
                            </td>
                        </tr>
                        {(() => {
                            let reconIndex = 0
                            return totalRecords > 0 ? (
                                reconciliation.map((item, index) => {
                                    const isDataAsPerSelectedYear =
                                        getReconciliationDataAsPerSelectedYear(item)
                                    if (isDataAsPerSelectedYear) reconIndex = reconIndex + 1
                                    return (
                                        <>
                                            {isDataAsPerSelectedYear ||
                                            (!item?.id && item?.year == selectedYear) ? (
                                                <tr
                                                    className='stripRow'
                                                    style={{
                                                        lineHeight: '19.12px',
                                                        fontSize: 14,
                                                        fontWeight: 600,
                                                    }}
                                                    key={index}
                                                >
                                                    <td className='p-5' width={'150px'}>
                                                        {Number(item?.count) > 0 ? (
                                                            <div
                                                                className='badge  bg-cmOrange text-cmOrange bg-opacity-10 rounded-pill d-flex flex-center'
                                                                style={{
                                                                    height: 23,
                                                                    width: 103,

                                                                    fontWeight: 600,
                                                                    fontSize: 14,
                                                                }}
                                                            >
                                                                {item?.count} entries
                                                            </div>
                                                        ) : null}
                                                    </td>

                                                    <td
                                                        className='text-cmGrey500 p-5'
                                                        width={'100px'}
                                                    >
                                                        Recon {reconIndex}
                                                    </td>

                                                    <td
                                                        className='text-cmGrey800 p-5 d-flex flex-center gap-5'
                                                        width={'375px'}
                                                    >
                                                        {isPayPeriodHasEntries(item) ? (
                                                            <>
                                                                {getValidDate(item?.period_from)} -{' '}
                                                                {getValidDate(item?.period_to)}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>
                                                                    <CustomDatePicker
                                                                        disabled={isPayPeriodHasEntries(
                                                                            item
                                                                        )}
                                                                        showTodayAndClearButton={
                                                                            false
                                                                        }
                                                                        readOnlyInput
                                                                        minDate={yearStartDate}
                                                                        maxDate={yearEndDate}
                                                                        disabledDates={
                                                                            reconDisableDates[index]
                                                                        }
                                                                        value={
                                                                            item?.period_from
                                                                                ? new Date(
                                                                                      item?.period_from
                                                                                  )
                                                                                : null
                                                                        }
                                                                        onChange={(event) => {
                                                                            handlePeriod(
                                                                                event.target.value,
                                                                                index,
                                                                                'period_from'
                                                                            )
                                                                        }}
                                                                    />
                                                                </span>{' '}
                                                                -{' '}
                                                                <span>
                                                                    <CustomDatePicker
                                                                        showTodayAndClearButton={
                                                                            false
                                                                        }
                                                                        disabled={isPayPeriodHasEntries(
                                                                            item
                                                                        )}
                                                                        readOnlyInput
                                                                        minDate={yearStartDate}
                                                                        maxDate={yearEndDate}
                                                                        disabledDates={
                                                                            reconDisableDates[index]
                                                                        }
                                                                        value={
                                                                            item?.period_to
                                                                                ? new Date(
                                                                                      item?.period_to
                                                                                  )
                                                                                : null
                                                                        }
                                                                        onChange={(event) => {
                                                                            handlePeriod(
                                                                                event.target.value,
                                                                                index,
                                                                                'period_to'
                                                                            )
                                                                        }}
                                                                    />
                                                                </span>
                                                            </>
                                                        )}
                                                    </td>

                                                    <td>
                                                        {!isPayPeriodHasEntries(item) ? (
                                                            <CustomDelete
                                                                onClick={() =>
                                                                    deleteRow(item, index)
                                                                }
                                                            />
                                                        ) : null}
                                                    </td>
                                                </tr>
                                            ) : null}
                                        </>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={3}>
                                        <CustomNoData
                                            label={'No Recon Periods'}
                                            className={'text-center'}
                                        />
                                    </td>
                                </tr>
                            )
                        })()}
                        <tr>
                            <td></td>
                            <td colSpan={3}>
                                <CustomLink
                                    onClick={addNewRow}
                                    icon='fa-regular fa-square-plus fs-4'
                                    label={'Add Another'}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReconciliationTableEdit
