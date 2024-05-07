import React, {useEffect, useMemo, useState} from 'react'
import Select from '../../Icon/select.png'

import {KTSVG} from '../../../../../../_metronic/helpers'
import {Sidebar} from 'primereact/sidebar'
import {
    getPayrollHistoryService,
    getReportPayrollHistoryService,
} from '../../../../../../services/Services'
import {getValidDate} from '../../../../../../constants/constants'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {
    formattedNumberFields,
    formattedNumberFieldsWithoutDecimal,
} from '../../../../../../helpers/CommonHelpers'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
export default function ViewSummary({
    open,
    close,
    periodList,
    selectedWeekData,
    currentPayPeriod,
    isReport,
}) {
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedPeriod, setSelectedPeriod] = useState(currentPayPeriod)

    const [summaryData, setSummaryData] = useState(null)
    useEffect(() => {
        setLoading(true)
        if ((selectedPeriod, selectedWeekData)) {
            const body = {
                start_date: selectedPeriod?.pay_period_from,
                end_date: selectedPeriod?.pay_period_to,
                frequency_type_id: selectedWeekData?.frequency_type_id,
            }

            let apiUrl = isReport
                ? getReportPayrollHistoryService(body)
                : getPayrollHistoryService(body)
            apiUrl
                .then((res) => {
                    setSummaryData(res.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [selectedPeriod])

    const onChangePeriod = (e) => {
        let data =
            periodList?.length > 0 ? periodList?.find((item) => item?.id == e.target.value) : null
        setSelectedPeriod(data)
    }

    const periodDropdownList = useMemo(() => {
        return periodList?.map((item) => ({
            ...item,
            period: `${getValidDate(item?.pay_period_from)} to ${getValidDate(
                item?.pay_period_to
            )}`,
        }))
    })

    return (
        <>
            <Sidebar
                visible={open}
                position='right'
                onHide={close}
                showCloseIcon={false}
                className={'w-lg-25 w-sm-50 w-100'}
                icons={() => (
                    <div className='d-flex align-items-center my-2 justify-content-between  w-100 '>
                        <div
                            style={{
                                fontSize: '16px',
                                color: '#0D1821',
                                fontFamily: 'Manrope',
                                fontWeight: '700',
                            }}
                        >
                            Summary
                        </div>
                        <button
                            onClick={close}
                            style={{border: '1px solid #6078EC', marginTop: '-3px'}}
                            className=' btn btn-flex h-35px bg-body  shadow-sm fs-7 px-3 '
                        >
                            <span style={{color: '#6078EC'}}>Close Summary</span>
                        </button>
                    </div>
                )}
            >
                <CustomLoader full visible={loading} />

                <div className=''>
                    <div style={{borderBottom: '1px solid #EEEEEE'}}></div>
                    <div>
                        <div className='d-flex justify-content-center mt-5'>
                            <div className='shadow w-md-250px mb-5 bg-white rounded'>
                                <div className='container' style={{fontSize: '14px'}}>
                                    <div className='row g-2  p-2'>
                                        <div
                                            className='col-6 mt-4'
                                            style={{color: '#212121', fontFamily: 'Manrope'}}
                                        >
                                            Payroll Period
                                        </div>
                                        {/* <div
                                            className='col-6 mt-4 text-nowrap'
                                            style={{
                                                color: '#004CE8',
                                                textDecoration: 'underline',
                                                fontSize: '12px',
                                                fontFamily: 'Manrope',
                                                marginLeft: '-5px',
                                            }}
                                        >
                                            View past reports
                                        </div> */}
                                    </div>
                                </div>

                                <div className='container' style={{fontSize: '14px'}}>
                                    <div
                                        className='mt-1  mb-1 text-black fw-bold d-flex flex-row'
                                        style={{
                                            width: '100%',

                                            borderRadius: '6px',
                                            height: '43px',
                                            fontSize: '14px',
                                        }}
                                    >
                                        <CustomDropdown
                                            options={periodDropdownList}
                                            onChange={onChangePeriod}
                                            valueKey='id'
                                            displayKey='period'
                                            value={selectedPeriod?.id}
                                            showClear={false}
                                            // value= {`${} to ${}`}
                                        />
                                    </div>
                                </div>

                                <div className='container' style={{fontSize: '14px'}}>
                                    <div className='row g-2 p-2'>
                                        <div
                                            className='col-7 mt-4'
                                            style={{color: '#212121', fontFamily: 'Manrope'}}
                                        >
                                            Payroll Summary
                                        </div>
                                        <div
                                            className={`col-5 mt-4 ${
                                                summaryData?.payroll?.total_payroll_percentage > 0
                                                    ? 'text-cmSuccess'
                                                    : summaryData?.payroll
                                                          ?.total_payroll_percentage < 0
                                                    ? 'text-cmError'
                                                    : 'text-cmOrange'
                                            }`}

                                            // style={{
                                            //     color: '#00C247',
                                            //     marginLeft: '-5px',
                                            // }}
                                        >
                                            <i
                                                // style={{color: '#00C247'}}
                                                className={
                                                    summaryData?.payroll?.total_payroll_percentage >
                                                    0
                                                        ? 'bi bi-arrow-up text-cmSuccess'
                                                        : summaryData?.payroll
                                                              ?.total_payroll_percentage < 0
                                                        ? 'bi bi-arrow-down text-cmError'
                                                        : 'bi bi-dash text-cmOrange'
                                                }
                                            ></i>
                                            {formattedNumberFieldsWithoutDecimal(
                                                summaryData?.payroll?.total_payroll_percentage,
                                                '%'
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='container ms-1'
                                    style={{
                                        fontSize: '14px',
                                        color: '#757575',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <div className='row g-2 p-2 me-2'>
                                        <div className='col-6 mt-2'>Total (M1)</div>
                                        <div className='col-6 mt-2 text-end'>
                                            {formattedNumberFields(summaryData?.payroll?.m1, '$')}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='container ms-1'
                                    style={{
                                        fontSize: '14px',
                                        color: '#757575',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <div className='row g-2 p-2 me-2'>
                                        <div className='col-6 mt-2'>Total (M2)</div>
                                        <div className='col-6 mt-2 text-end'>
                                            {formattedNumberFields(summaryData?.payroll?.m2, '$')}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='container ms-1'
                                    style={{
                                        fontSize: '14px',
                                        color: '#757575',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <div className='row g-2 p-2 me-2'>
                                        <div className='col-6 mt-2'>Total Overrides</div>
                                        <div className='col-6 mt-2 text-end'>
                                            {formattedNumberFields(
                                                summaryData?.payroll?.override,
                                                '$'
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='container ms-1'
                                    style={{
                                        fontSize: '14px',
                                        color: '#757575',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <div className='row g-2 p-2 me-2'>
                                        <div className='col-8 mt-2'>Total Adjustments</div>
                                        <div className='col-4 mt-2 text-end'>
                                            {formattedNumberFields(
                                                summaryData?.payroll?.adjustment,
                                                '$'
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className='container ms-1'
                                    style={{
                                        fontSize: '14px',
                                        color: '#757575',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <div className='row g-2 p-2 me-2'>
                                        <div className='col-9 mt-3'>Total Reimbursements</div>
                                        <div className='col-3 mt-3 text-end'>
                                            {formattedNumberFields(
                                                summaryData?.payroll?.reimbursement,
                                                '$'
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='container ms-1'
                                    style={{
                                        fontSize: '14px',
                                        color: '#757575',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <div className='row g-2 p-2 me-2'>
                                        <div className='col-7 mt-3'>Total Deduction</div>
                                        <div className='col-5 mt-3 text-end'>
                                            {formattedNumberFields(
                                                summaryData?.payroll?.deduction,
                                                '$'
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className='container'
                                    style={{fontSize: '14px', marginLeft: '1px'}}
                                >
                                    <div className='row g-2 p-2 ms-0'>
                                        <div
                                            className='col-6 mt-4'
                                            style={{
                                                color: '#212121',
                                                fontWeight: 'bold',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            Total Payroll
                                        </div>
                                        <div
                                            className='col-6 mt-4 text-end me-0'
                                            style={{
                                                color: '#212121',
                                                fontWeight: 'bold',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            {formattedNumberFields(
                                                summaryData?.payroll?.total_payroll,
                                                '$'
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className='shadow mt-3 w-md-250px d-flex justify-content-center h-auto mb-5 bg-white rounded pb-5'>
                                <div className='container' style={{fontSize: '14px'}}>
                                    <div className='row g-2 p-2 mt-0'>
                                        <div
                                            className='mt-4'
                                            style={{
                                                color: '#212121',
                                                fontWeight: 'bold',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            Earnings Summary
                                            <label
                                                className={
                                                    summaryData?.earning_summary_total_payroll_percentage >
                                                    0
                                                        ? 'text-cmSuccess'
                                                        : summaryData?.earning_summary_total_payroll_percentage <
                                                          0
                                                        ? 'text-cmError'
                                                        : 'text-cmOrange'
                                                }
                                                // style={{
                                                //     color: '#FF3333',
                                                //     marginLeft: '5px',
                                                // }}
                                            >
                                                <i
                                                    // style={{color: '#FF3333'}}
                                                    className={
                                                        summaryData?.earning_summary_total_payroll_percentage >
                                                        0
                                                            ? 'bi bi-arrow-up text-cmSuccess'
                                                            : summaryData?.earning_summary_total_payroll_percentage <
                                                              0
                                                            ? 'bi bi-arrow-down text-cmError'
                                                            : 'bi bi-dash text-cmOrange'
                                                    }
                                                ></i>
                                                {formattedNumberFieldsWithoutDecimal(
                                                    summaryData?.earning_summary_total_payroll_percentage,
                                                    '%'
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                    {summaryData?.earning_summary?.map((item) => (
                                        <div
                                            key={item?.id}
                                            className='container mt-1'
                                            style={{
                                                fontSize: '14px',
                                                marginLeft: '-3px',
                                                color: '#757575',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            <div className='row g-2'>
                                                <div className='col-8 mt-3'>
                                                    {item?.company_name}
                                                </div>
                                                <div className='col-4 mt-3 text-end'>
                                                    {formattedNumberFields(item?.total, '$')}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className='container mt-2' style={{fontSize: '14px,'}}>
                                        <div className='row g-2 '>
                                            <div
                                                className='col-6 mt-4 text-nowrap'
                                                style={{
                                                    color: '#212121',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                Total Earnings
                                            </div>
                                            <div
                                                className='col-6 mt-4 text-end me-0'
                                                style={{
                                                    color: '#212121',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                {formattedNumberFields(
                                                    summaryData?.earning_summary_total_payroll,
                                                    '$'
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <Payrollby location */}
                        <div className='d-flex justify-content-center'>
                            <div className='shadow mt-3 w-md-250px d-flex justify-content-center h-auto bg-white rounded pb-5'>
                                <div className='container' style={{fontSize: '14px'}}>
                                    <div className='row g-2 p-2 mt-0'>
                                        <div
                                            className='mt-4'
                                            style={{
                                                color: '#212121',
                                                fontWeight: 'bold',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            Payroll by Location
                                            <label
                                                className={
                                                    summaryData?.payroll_by_location_total_percentage >
                                                    0
                                                        ? 'text-cmSuccess'
                                                        : summaryData?.payroll_by_location_total_percentage <
                                                          0
                                                        ? 'text-cmError'
                                                        : 'text-cmOrange'
                                                }
                                            >
                                                <i
                                                    className={
                                                        summaryData?.payroll_by_location_total_percentage >
                                                        0
                                                            ? 'bi bi-arrow-up text-cmSuccess'
                                                            : summaryData?.payroll_by_location_total_percentage <
                                                              0
                                                            ? 'bi bi-arrow-down text-cmError'
                                                            : 'bi bi-dash text-cmOrange'
                                                    }
                                                ></i>
                                                {formattedNumberFieldsWithoutDecimal(
                                                    summaryData?.payroll_by_location_total_percentage,
                                                    '%'
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                    {summaryData?.payroll_by_location?.map((item) => (
                                        <div
                                            key={item?.id}
                                            className='container mt-1'
                                            style={{
                                                fontSize: '14px',
                                                marginLeft: '-3px',
                                                color: '#757575',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            <div className='row g-2'>
                                                <div className='col-8 mt-3'>{item?.state}</div>
                                                <div className='col-4 mt-3 text-end'>
                                                    {formattedNumberFields(item?.total, '$')}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className='container mt-2' style={{fontSize: '14px,'}}>
                                        <div className='row g-2 '>
                                            <div
                                                className='col-6 mt-4 text-nowrap'
                                                style={{
                                                    color: '#212121',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                Total Payroll
                                            </div>
                                            <div
                                                className='col-6 mt-4 text-end me-0'
                                                style={{
                                                    color: '#212121',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                {formattedNumberFields(
                                                    summaryData?.payroll_by_location_total,
                                                    '$'
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <Payrollby Position */}
                        <div className='d-flex justify-content-center'>
                            <div className='shadow mt-3 w-md-250px d-flex justify-content-center h-auto bg-white rounded pb-5'>
                                <div className='container' style={{fontSize: '14px'}}>
                                    <div className='row g-2 p-2 mt-0'>
                                        <div
                                            className='mt-4'
                                            style={{
                                                color: '#212121',
                                                fontWeight: 'bold',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            Payroll by Position
                                            <label
                                                className={
                                                    summaryData?.total_payroll_by_position_percentage >
                                                    0
                                                        ? 'text-cmSuccess'
                                                        : summaryData?.total_payroll_by_position_percentage <
                                                          0
                                                        ? 'text-cmError'
                                                        : 'text-cmOrange'
                                                }
                                            >
                                                <i
                                                    className={
                                                        summaryData?.total_payroll_by_position_percentage >
                                                        0
                                                            ? 'bi bi-arrow-up text-cmSuccess'
                                                            : summaryData?.total_payroll_by_position_percentage <
                                                              0
                                                            ? 'bi bi-arrow-down text-cmError'
                                                            : 'bi bi-dash text-cmOrange'
                                                    }
                                                ></i>
                                                {formattedNumberFieldsWithoutDecimal(
                                                    summaryData?.total_payroll_by_position_percentage,
                                                    '%'
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                    {summaryData?.payroll_by_position?.map((item) => (
                                        <div
                                            key={item?.id}
                                            className='container mt-1'
                                            style={{
                                                fontSize: '14px',
                                                marginLeft: '-3px',
                                                color: '#757575',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            <div className='row g-2'>
                                                <div className='col-8 mt-3'>
                                                    {item?.position_name}
                                                </div>
                                                <div className='col-4 mt-3 text-end'>
                                                    {formattedNumberFields(item?.total, '$')}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className='container mt-2' style={{fontSize: '14px,'}}>
                                        <div className='row g-2 '>
                                            <div
                                                className='col-6 mt-4 text-nowrap'
                                                style={{
                                                    color: '#212121',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                Total Payroll
                                            </div>
                                            <div
                                                className='col-6 mt-4 text-end me-0'
                                                style={{
                                                    color: '#212121',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                {formattedNumberFields(
                                                    summaryData?.total_payroll_by_position,
                                                    '$'
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-2 text-white'></div>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}
