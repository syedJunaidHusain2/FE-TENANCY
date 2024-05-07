import {useCallback, useEffect, useMemo, useState} from 'react'
import ComissionsCard from './components/ComissionsCard'
import {CommissionBreakdownChart} from './components/CommissionBreakdownChart'
import EarningsBreakdownCard from './components/earningCard/EarningsBreakdownCard'
import ReconcilliationCommanCard from './components/ReconcilliationCommanCard'
import ReconcilliationsTable from './ReconcilliationsTable'
import {getReconcilliationReportService} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'

import {useDispatch, useSelector} from 'react-redux'
import {getCompanyReconciliationAction} from '../../../../../redux/actions/SettingActions'
import {
    getCompanySettingSelector,
    getPositionSettingSelector,
    getReconciliationScheduleSelector,
} from '../../../../../redux/selectors/SettingsSelectors'
import {getValidDate} from '../../../../../constants/constants'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {formattedNumberFields} from '../../../../../helpers/CommonHelpers'

const ReconciliationPage = () => {
    const [reportData, setReportData] = useState(null)
    const [loading, setLoading] = useState(false)
    const reconciliationSchedule = useSelector(getReconciliationScheduleSelector)
    const dispatch = useDispatch()
    const positionSetting = useSelector(getPositionSettingSelector)
    const companySetting = useSelector(getCompanySettingSelector)
    const [selectedReconPeriod, setReconPeriod] = useState(null)

    useEffect(() => {
        dispatch(getCompanyReconciliationAction())
        handleSetCurrentRecon()
    }, [])
    useEffect(() => {
        if (selectedReconPeriod) {
            setLoading(true)
            const body = {
                start_date: selectedReconPeriod?.period_from,
                end_date: selectedReconPeriod?.period_to,
            }
            getReconcilliationReportService(body)
                .then((res) => {
                    setReportData(res.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [selectedReconPeriod])

    const handleSetCurrentRecon = useCallback(() => {
        let data = reconciliationSchedule?.find(
            (item) =>
                getValidDate(item?.period_from, 'YYYY-MM-DD 00:00', true) <=
                    getValidDate(new Date(), 'YYYY-MM-DD 00:00', true) &&
                getValidDate(new Date(), 'YYYY-MM-DD 00:00', true) <=
                    getValidDate(item?.period_to, 'YYYY-MM-DD 00:00', true)
        )
        setReconPeriod(data)
    }, [reconciliationSchedule])

    const periodChange = (e) => {
        setLoading(true)
        const selectedData = reconciliationSchedule?.filter((item) => e.target.value == item.id)
        setReconPeriod(selectedData?.[0])
    }

    const periodList = useMemo(() => {
        return reconciliationSchedule?.map((item) => ({
            ...item,
            period: `${getValidDate(item?.period_from)} - ${getValidDate(item?.period_to)}`,
            // periodValue: `${item?.period_from} , ${item?.period_to}`,
        }))
    })

    return (
        <div
            style={{fontWeight: 'Manrope', fontSize: '14px', position: 'relative'}}
            // className='w-sm-1000px w-100'
        >
            <CustomLoader full visible={loading} />

            {/* Top Header */}
            <div
                className='bg-cmwhite py-5 px-10 d-flex flex-wrap align-items-center mb-10'
                style={{
                    borderRadius: '0px 10px 10px 10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <div
                    className='text-cmGrey700 d-flex mr-2'
                    style={{fontWeight: '600', marginRight: '10px'}}
                >
                    Your accounts serviced through
                </div>
                <div>
                    <CustomDropdown
                        onChange={periodChange}
                        name='status'
                        valueKey={'id'}
                        displayKey='period'
                        options={periodList}
                        value={selectedReconPeriod?.id}
                        showClear={false}
                    />
                </div>
                {/* <div className='btn bg-cmGrey100 text-cmGrey600 mx-sm-0 mx-auto mt-sm-0 mt-3'>
          <span className='bi bi-funnel fs-5 text-cmGrey600 me-2' />
          Filter
        </div> */}
            </div>
            {/* Chart */}
            <div className='mb-10'>
                <CommissionBreakdownChart graphData={reportData?.graph} />
            </div>
            {/* Donut and card */}
            <div className='row align-items-start gap-10 justify-content-between mb-10'>
                <div className='col-sm'>
                    <EarningsBreakdownCard cardData={reportData?.earning_break_down} />
                </div>
                <div className='col-sm'>
                    <ComissionsCard cardData={reportData?.commission} />
                </div>
            </div>

            {/* Card */}
            <div className='row align-items-center gap-10 justify-content-between mb-10'>
                {companySetting?.overrides ? (
                    <div className='col-sm'>
                        <ReconcilliationCommanCard
                            borderColor={'cmBlue-Crayola'}
                            heading={'Overrides'}
                            Li1={'Total Earned'}
                            Li1Data={'$' + reportData?.overrides.total_earnings?.toFixed(2)}
                            Li2={positionSetting?.direct_overrides_status ? 'Direct' : ''}
                            Li2Data={
                                positionSetting?.direct_overrides_status
                                    ? '$' + reportData?.overrides?.direct?.toFixed(2)
                                    : ''
                            }
                            Li3={positionSetting?.indirect_overrides_status ? 'Indirect' : ''}
                            Li3Data={
                                positionSetting?.indirect_overrides_status
                                    ? '$' + reportData?.overrides?.indirect?.toFixed(2)
                                    : ''
                            }
                            Li4={positionSetting?.office_overrides_status ? 'Office' : ''}
                            Li4Data={
                                positionSetting?.office_overrides_status
                                    ? '$' + reportData?.overrides?.offece?.toFixed(2)
                                    : ''
                            }
                            TotalDue={'$' + reportData?.overrides?.total_due?.toFixed(2)}
                        />{' '}
                    </div>
                ) : (
                    <></>
                )}
                <div className='col-sm'>
                    <ReconcilliationCommanCard
                        borderColor={'cmYellow'}
                        heading={'Other Items'}
                        Li1={'Reimbursements '}
                        Li1Data={'$' + reportData?.other_item?.reimbursements?.toFixed(2)}
                        Li2={'Incentives '}
                        Li2Data={'$' + reportData?.other_item?.incentives}
                        Li3={'Miscellaneous'}
                        Li3Data={'$' + reportData?.other_item?.miscellaneous}
                        Li4={'Travel'}
                        Li4Data={'$' + reportData?.other_item?.travel}
                        Li5={'Rent Earned'}
                        Li5Data={'$' + reportData?.other_item?.rent}
                        Li6={'Sign on Bonus Earned'}
                        Li6Data={formattedNumberFields(reportData?.other_item?.bonus, '$')}
                        TotalDue={'$' + reportData?.other_item?.total_due}
                    />
                </div>
                <div className='col-sm'>
                    <ReconcilliationCommanCard
                        borderColor='cmError border-opacity-75'
                        heading={'Deductions'}
                        q
                        Li1={'Rent'}
                        Li1Data={'$' + reportData?.deductions?.rent}
                        Li2={'Sign on Bonus '}
                        Li2Data={'$' + reportData?.deductions?.sign_on_bonus}
                        Li3={'Travel'}
                        Li3Data={reportData?.deductions?.travel}
                        Li4={'Phone Bill'}
                        Li4Data={'$' + reportData?.deductions?.phone_bill}
                        TotalDue={'$' + reportData?.deductions?.total_due}
                    />
                </div>
            </div>
            <div>
                <ReconcilliationsTable tableData={reportData?.payout_summary} />
            </div>
        </div>
    )
}

export default ReconciliationPage
