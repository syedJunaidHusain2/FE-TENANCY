import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {getValidDate} from '../../../../../../../constants/constants'
import CustomDatePicker from '../../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomNoData from '../../../../../../../customComponents/customNoData/CustomNoData'

const ReconciliationTableview = ({reconciliation}) => {
    const [selectedYear, setSelectedYear] = useState(getValidDate(new Date(), 'yyyy'))

    const onYearChange = useCallback((e) => {
        const year = getValidDate(e?.target?.value, 'yyyy')
        setSelectedYear(year)
    }, [])

    const getReconciliationDataAsPerSelectedYear = useCallback(
        (item) => {
            const startDateYear = getValidDate(item?.period_from, 'yyyy')
            const endDateYear = getValidDate(item?.period_from, 'yyyy')
            return startDateYear == selectedYear && endDateYear == selectedYear
        },
        [selectedYear]
    )

    const totalRecords = useMemo(() => {
        return reconciliation.filter((item) => getReconciliationDataAsPerSelectedYear(item))?.length
    }, [getReconciliationDataAsPerSelectedYear, reconciliation])

    return (
        <div style={{fontFamily: fontsFamily.manrope}}>
            <div className='table-responsive'>
                <table className='table' style={{tableLayout: 'fixed', width: '100%'}}>
                    <thead>
                        <tr className=''>
                            <th className='' style={{width: '150px'}}></th>
                            <th className='' style={{width: '120px'}}></th>
                            <th className=' '></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='stripRow' style={{verticalAlign: 'baseline'}}>
                            <td colSpan={2}>
                                <div
                                    className='text-end text-cmGrey800'
                                    style={{fontSize: 14, fontWeight: 700}}
                                >
                                    Year
                                </div>
                            </td>
                            <td>
                                <div className='d-flex'>
                                    <CustomDatePicker
                                        value={selectedYear}
                                        onChange={onYearChange}
                                        dateFormat='yy'
                                        placeholder='YYYY'
                                        viewMode='year'
                                    />
                                </div>
                            </td>
                        </tr>
                        {(() => {
                            let reconIndex = 0
                            return reconciliation?.length > 0 ? (
                                <>
                                    {totalRecords > 0 ? (
                                        reconciliation?.map((item, index) => {
                                            const isDataAsPerSelectedYear =
                                                getReconciliationDataAsPerSelectedYear(item)
                                            if (isDataAsPerSelectedYear) reconIndex = reconIndex + 1
                                            return isDataAsPerSelectedYear ? (
                                                <tr
                                                    className='stripRow'
                                                    style={{
                                                        lineHeight: '19.12px',
                                                        fontSize: 14,
                                                        fontWeight: 600,
                                                    }}
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
                                                    <td className='text-cmGrey500 p-5'>
                                                        Recon {reconIndex}
                                                    </td>
                                                    <td className='text-cmGrey800 p-5'>
                                                        {getValidDate(item?.period_from)} -{' '}
                                                        {getValidDate(item?.period_to)}
                                                    </td>
                                                </tr>
                                            ) : null
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
                                    )}
                                </>
                            ) : null
                        })()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReconciliationTableview
