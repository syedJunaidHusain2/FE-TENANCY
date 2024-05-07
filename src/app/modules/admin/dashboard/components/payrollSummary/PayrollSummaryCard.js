import {useEffect, useState, useCallback} from 'react'
import PayrollSummaryDonutChart from './PayrollSummaryDonutChart'
import {Dashboard_DURATION_DROPDOWN_LIST} from '../../../../../../constants/constants'
import {formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {useDispatch} from 'react-redux'
import {
    getDashboardPayrollSummaryDataAction,
    getTopPayrollLocationsAction,
} from '../../../../../../redux/actions/DashboardActions'
import {useSelector} from 'react-redux'
import {
    getAdminDashboardPayrollSelector,
    getTopPayrollLocationsSelector,
} from '../../../../../../redux/selectors/DashboardSelectors'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'

const PayrollSummaryCard = ({setPayrollExecuteStatus}) => {
    const payrollSummaryData = useSelector(getAdminDashboardPayrollSelector)
    const topPayrollLocationsData = useSelector(getTopPayrollLocationsSelector)
    const [filter, setFilter] = useState('this_week')
    const [loading, setLoading] = useState(false)
    const [fullLoading, setFullLoading] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        getPayrollSummaryData()
        getTopPayrollLocations()
    }, [filter])

    const onFilterChange = (e) => {
        setFilter(e.target.value)
    }
    const getPayrollSummaryData = useCallback(() => {
        if (payrollSummaryData) setLoading(true)
        else setFullLoading(true)
        dispatch(getDashboardPayrollSummaryDataAction(filter)).finally(() => {
            if (payrollSummaryData) setLoading(false)
            else setFullLoading(false)
        })
        setPayrollExecuteStatus(payrollSummaryData?.payroll_execute_status)
    }, [dispatch, filter, payrollSummaryData, setPayrollExecuteStatus])

    const getTopPayrollLocations = useCallback(() => {
        if (payrollSummaryData) setLoading(true)
        else setFullLoading(true)
        dispatch(getTopPayrollLocationsAction(filter)).finally(() => {
            if (payrollSummaryData) setLoading(false)
            else setFullLoading(false)
        })
    }, [dispatch, filter, payrollSummaryData])

    return (
        <>
            <div className='row align-itmes-start w-100 mx-auto gap-5 mb-10'>
                <div
                    className='col-xl bg-cmwhite shadow-sm px-10 py-5'
                    style={{
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '16px',
                        position: 'relative',
                    }}
                >
                    <CustomLoader full visible={fullLoading} />

                    <div className='d-flex justify-content-between flex-wrap'>
                        <div className=''>
                            <div className='text-cmGrey900 mb-3'>Payroll Summary</div>
                            <div>
                                <CustomDropdown
                                    options={Dashboard_DURATION_DROPDOWN_LIST}
                                    onChange={onFilterChange}
                                    value={filter}
                                    searching={false}
                                    showClear={false}
                                />
                            </div>
                        </div>

                        <div>
                            <CustomLoader visible={loading} size={50} />
                        </div>

                        <PayrollSummaryDonutChart chartData={payrollSummaryData?.data} />
                    </div>

                    <div className='' style={{marginTop: -40}}>
                        <hr className='p-0 m-0 text-cmGrey400' />
                        <div className='row justify-content-between gap-sm-0 gap-5 align-itmes-center mt-5'>
                            <div className='col'>
                                <div className='h-5px w-50px bg-cmSuccess rounded mb-2' />
                                <div
                                    className='text-cmGrey600 mb-2'
                                    style={{fontSize: 10, fontWeight: 600}}
                                >
                                    Commissions
                                </div>
                                <div
                                    className='text-cmGrey900'
                                    style={{fontSize: 14, fontWeight: 700}}
                                >
                                    {formattedNumberFields(
                                        payrollSummaryData?.data?.commission,
                                        '$'
                                    )}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='h-5px w-50px bg-cmYellow rounded mb-2' />
                                <div
                                    className='text-cmGrey600 mb-2'
                                    style={{fontSize: 10, fontWeight: 600}}
                                >
                                    Overrides
                                </div>
                                <div
                                    className='text-cmGrey900'
                                    style={{fontSize: 14, fontWeight: 700}}
                                >
                                    {formattedNumberFields(payrollSummaryData?.data?.override, '$')}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='h-5px w-50px bg-cmpink rounded mb-2' />
                                <div
                                    className='text-cmGrey600 mb-2'
                                    style={{fontSize: 10, fontWeight: 600}}
                                >
                                    Deductions
                                </div>
                                <div
                                    className='text-cmGrey900'
                                    style={{fontSize: 14, fontWeight: 700}}
                                >
                                    {formattedNumberFields(
                                        payrollSummaryData?.data?.deduction,
                                        '$'
                                    )}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='h-5px w-50px bg-cmPurple rounded mb-2' />
                                <div
                                    className='text-cmGrey600 mb-2'
                                    style={{fontSize: 10, fontWeight: 600}}
                                >
                                    Reimbursements
                                </div>
                                <div
                                    className='text-cmGrey900'
                                    style={{fontSize: 14, fontWeight: 700}}
                                >
                                    {formattedNumberFields(
                                        payrollSummaryData?.data?.reimbursement,
                                        '$'
                                    )}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='h-5px w-50px bg-cmBlue-Crayola rounded mb-2' />
                                <div
                                    className='text-cmGrey600 mb-2'
                                    style={{fontSize: 10, fontWeight: 600}}
                                >
                                    Adjustments
                                </div>
                                <div
                                    className='text-cmGrey900'
                                    style={{fontSize: 14, fontWeight: 700}}
                                >
                                    {formattedNumberFields(
                                        payrollSummaryData?.data?.adjustment,
                                        '$'
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Chart begins */}

                <div className='col-xl-3 card p-5 bg-cmWhite shadow-sm'>
                    <div className='card-body m-0 p-0'>
                        <div
                            className='card-title mb-4'
                            style={{
                                fontSize: '14px',
                                fontFamily: fontsFamily.manrope,
                                fontWeight: 600,
                            }}
                        >
                            Top Payroll Locations
                        </div>
                        <div className='' style={{fontWeight: 600, fontSize: 14}}>
                            {topPayrollLocationsData?.length > 0
                                ? topPayrollLocationsData?.map((item, index) => (
                                      <div
                                          className='d-flex flex-wrap align-itmes-center mb-3 justify-content-between'
                                          key={index}
                                      >
                                          <div className='text-cmGrey900'>{item?.name}</div>
                                          <div className='text-cmGrey600'>
                                              {formattedNumberFields(item?.value, '$')}
                                          </div>
                                      </div>
                                  ))
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PayrollSummaryCard
