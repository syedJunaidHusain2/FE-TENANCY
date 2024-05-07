import React, {useCallback, useMemo} from 'react'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import CustomImage from '../../../../../../../../customComponents/customImage/CustomImage'
import {formattedNumberFields} from '../../../../../../../../helpers/CommonHelpers'
import {getValidDate} from '../../../../../../../../constants/constants'
import CustomLoader from '../../../../../../../../customComponents/customLoader/CustomLoader'

const Overrides = ({loading, typeFilter, summaryData}) => {
    const totals = useMemo(() => {
        var totalPaid = 0
        var totalDueAmount = 0
        var grandTotal = 0
        if (typeFilter == 1) {
            // totalPaid = summaryData?.commission_paid_total + summaryData?.adjustment_paid_total
            totalDueAmount =
                summaryData?.total_overrides_amount_pending +
                summaryData?.total_adjustment_amount_pending
            totalPaid =
                summaryData?.total_overrides_amount_paid + summaryData?.total_adjustment_amount_paid
        } else {
            totalPaid =
                (summaryData?.setter1?.paid_total ?? 0) +
                (summaryData?.setter2?.paid_total ?? 0) +
                (summaryData?.closer1?.paid_total ?? 0) +
                (summaryData?.closer2?.paid_total ?? 0)
            totalDueAmount =
                (summaryData?.setter1?.unpaid_total ?? 0) +
                (summaryData?.setter2?.unpaid_total ?? 0) +
                (summaryData?.closer1?.unpaid_total ?? 0) +
                (summaryData?.closer2?.unpaid_total ?? 0)
        }
        grandTotal = totalPaid + totalDueAmount

        return {
            totalPaid,
            totalDueAmount,
            grandTotal,
        }
    }, [])

    const payPeriodKey = useCallback((item) => {
        let period = item?.date_paid?.split('to')
        return `${getValidDate(period?.[0], 'MM-DD-YYYY')} to ${getValidDate(
            period?.[1],
            'MM-DD-YYYY'
        )}`
    }, [])

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />
            <div className='m-0 p-0'>
                {/* By team */}
                {typeFilter == 1 ? (
                    summaryData?.total_overrides?.length > 0 ||
                    summaryData?.total_adjustment?.length > 0 ? (
                        <div>
                            <div className='table-responsive mb-10'>
                                <table className='table'>
                                    <thead>
                                        <tr
                                            className='text-cmGrey500 text-cmGrey800 border-bottom-2 border-cmGrey400'
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                fontFamily: fontsFamily.manrope,
                                            }}
                                        >
                                            <th className='text-nowrap p-5 '>Through</th>
                                            <th className='text-nowrap p-5 '>Date</th>
                                            <th className='text-nowrap p-5 '>Description</th>
                                            <th className='text-nowrap p-5 '>Pay Period</th>
                                            <th className='text-nowrap p-5 border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                Paid Amount
                                            </th>
                                            <th className='text-nowrap p-5 text-center '>
                                                Due Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {summaryData?.total_overrides?.length > 0 ? (
                                            <>
                                                {summaryData?.total_overrides?.map((i) => (
                                                    <tr
                                                        className='border border-right-0 border-left-0 border-top-0 border-cmGrey400 text-cmGrey800 stripRow'
                                                        style={{
                                                            fontSize: '14px',
                                                            fontFamily: fontsFamily.manrope,
                                                            fontWeight: 600,
                                                            lineHeight: '20px',
                                                        }}
                                                    >
                                                        <td className='p-5 text-nowrap'>
                                                            {i?.override_over}
                                                        </td>
                                                        <td className='p-5 text-nowrap'>
                                                            {getValidDate(i?.date)}
                                                        </td>
                                                        <td className='p-5 text-nowrap text-cmGrey700'>
                                                            {i?.description}
                                                        </td>
                                                        <td className='p-5 text-nowrap'>
                                                            {payPeriodKey(i)}
                                                        </td>
                                                        <td className='py-5 text-nowrap border border-bottom-0 border-top-0 border-cmGrey400  text-center'>
                                                            {formattedNumberFields(
                                                                i?.PaidAmount,
                                                                '$'
                                                            )}
                                                        </td>
                                                        <td className='p-5 text-nowrap text-center'>
                                                            {' '}
                                                            {formattedNumberFields(
                                                                i?.UnPaidAmount,
                                                                '$'
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr
                                                    className=' text-cmGrey900'
                                                    style={{
                                                        fontSize: '16px',
                                                        fontFamily: fontsFamily.manrope,
                                                        fontWeight: 600,
                                                        lineHeight: '20px',
                                                    }}
                                                >
                                                    <td colSpan={3}></td>
                                                    <td
                                                        style={{fontSize: '14px'}}
                                                        className='text-center'
                                                    >
                                                        Subtotal
                                                    </td>
                                                    <td className='border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                        {formattedNumberFields(
                                                            summaryData?.total_overrides_amount_paid,
                                                            '$'
                                                        )}
                                                    </td>
                                                    <td className='text-center'>
                                                        {' '}
                                                        {formattedNumberFields(
                                                            summaryData?.total_overrides_amount_pending,
                                                            '$'
                                                        )}
                                                    </td>
                                                </tr>
                                            </>
                                        ) : (
                                            <>
                                                <tr>
                                                    <td
                                                        className='text-cmGrey600 fw-bold text-center py-5'
                                                        colSpan={6}
                                                    >
                                                        No data found
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {/* Adjustments table */}
                            <div className='table-responsive mb-10'>
                                <div
                                    className='text-cmGrey900 ms-5'
                                    style={{
                                        fontSize: '18px',
                                        fontFamily: fontsFamily.manrope,
                                        fontWeight: 700,
                                        lineHeight: '21px',
                                    }}
                                >
                                    Adjustments
                                </div>
                                <table className='table'>
                                    <thead>
                                        <tr
                                            className='text-cmGrey500 text-cmGrey800 border-bottom-2 border-cmGrey400 '
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                fontFamily: fontsFamily.manrope,
                                            }}
                                        >
                                            <th className='text-nowrap p-5 '>For</th>
                                            <th className='text-nowrap p-5 '>Date</th>
                                            <th className='text-nowrap p-5 '>Description</th>
                                            <th className='text-nowrap p-5 '>Pay Period</th>
                                            <th className='text-nowrap p-5 border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                Paid Amount
                                            </th>
                                            <th className='text-nowrap p-5 text-center '>
                                                Due Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {summaryData?.total_adjustment?.length > 0 ? (
                                            <>
                                                {summaryData?.total_adjustment?.map((i) => (
                                                    <tr
                                                        className='border border-right-0 border-left-0 border-top-0 border-cmGrey400 text-cmGrey800 stripRow'
                                                        style={{
                                                            fontSize: '14px',
                                                            fontFamily: fontsFamily.manrope,
                                                            fontWeight: 600,
                                                            lineHeight: '20px',
                                                        }}
                                                    >
                                                        <td className='p-5 text-nowrap'>
                                                            {i?.employee}
                                                        </td>
                                                        <td className='p-5 text-nowrap'>
                                                            {' '}
                                                            {getValidDate(i?.date, 'MM-DD-YYYY')}
                                                        </td>
                                                        <td className='p-5 text-nowrap text-cmGrey700'>
                                                            {i?.type}
                                                        </td>
                                                        <td className='p-5 text-nowrap'>
                                                            {payPeriodKey(i)}
                                                        </td>
                                                        <td className='py-5 text-nowrap border border-bottom-0 border-top-0 border-cmGrey400  text-center'>
                                                            {formattedNumberFields(i?.paid, '$')}
                                                        </td>
                                                        <td className='p-5 text-nowrap text-center'>
                                                            {formattedNumberFields(i?.unpaid, '$')}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr
                                                    className=' text-cmGrey900 border border-right-0 border-left-0 border-top-0 border-cmGrey400'
                                                    style={{
                                                        fontSize: '16px',
                                                        fontFamily: fontsFamily.manrope,
                                                        fontWeight: 600,
                                                        lineHeight: '20px',
                                                    }}
                                                >
                                                    <td colSpan={3}></td>
                                                    <td
                                                        style={{fontSize: '14px'}}
                                                        className='text-center'
                                                    >
                                                        Subtotal
                                                    </td>
                                                    <td className='border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                        {formattedNumberFields(
                                                            summaryData?.total_adjustment_amount_paid,
                                                            '$'
                                                        )}
                                                    </td>
                                                    <td className='text-center'>
                                                        {' '}
                                                        {formattedNumberFields(
                                                            summaryData?.total_adjustment_amount_pending,
                                                            '$'
                                                        )}
                                                    </td>
                                                </tr>
                                            </>
                                        ) : (
                                            <>
                                                <tr>
                                                    <td
                                                        className='text-cmGrey600 fw-bold text-center py-5'
                                                        colSpan={6}
                                                    >
                                                        No data found
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                        <>
                                            <tr
                                                className=' text-cmGrey900'
                                                style={{
                                                    fontSize: '20px',
                                                    fontFamily: fontsFamily.manrope,
                                                    fontWeight: 600,
                                                    lineHeight: '20px',
                                                }}
                                            >
                                                <td colSpan={3}></td>
                                                <td
                                                    style={{fontSize: '14px'}}
                                                    className='text-center'
                                                >
                                                    Total
                                                </td>
                                                <td className='border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                    {/* {formattedNumberFields(totals.totalPaid, '$')} */}
                                                    {formattedNumberFields(totals.totalPaid, '$')}
                                                </td>

                                                <td className='text-center'>
                                                    {formattedNumberFields(
                                                        totals.totalDueAmount,
                                                        '$'
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className=''>
                                                <td colSpan={3}></td>
                                                <td colSpan={3} className='text-center p-10 '>
                                                    {/* <div
                                                        className='d-flex align-items-center gap-10 border-dotted border-cmGrey400 py-5 px-10 justify-content-center text-cmGrey900'
                                                        style={{
                                                            borderRadius: '12px',
                                                            fontFamily: fontsFamily.manrope,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontSize: 16,
                                                                fontWeight: 700,
                                                            }}
                                                        >
                                                            GrandTotal
                                                        </div>
                                                        <div
                                                            style={{
                                                                fontSize: '24px',
                                                                fontWeight: 800,
                                                            }}
                                                        >
                                                            {formattedNumberFields(
                                                                totals.grandTotal,
                                                                '$'
                                                            )}
                                                        </div>
                                                    </div> */}
                                                </td>
                                            </tr>
                                        </>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className='p-20 text-center text-cmGrey600' style={{fontWeight: 600}}>
                            No Overrides found
                        </div>
                    )
                ) : summaryData?.closer2 ||
                  summaryData?.closer1 ||
                  summaryData?.setter2 ||
                  summaryData?.setter1 ? (
                    <div
                        className='p-5'
                        style={{fontFamily: fontsFamily.manrope, fontSize: 14, fontWeight: 700}}
                    >
                        {/* Setter 1 */}
                        {summaryData?.setter1 ? (
                            <div className='table-responsive mb-10 P-5'>
                                <div className='d-flex align-items-center gap-3'>
                                    <CustomImage
                                        style={{width: '30px', height: '30px'}}
                                        src={summaryData?.setter1?.info?.image}
                                    />
                                    <div className='text-cmGrey900'>
                                        {summaryData?.setter1?.info?.name}
                                    </div>
                                    <div className='badge text-cminfo bg-cminfo rounded-pill bg-opacity-10 px-5'>
                                        Setter 1
                                    </div>
                                </div>
                                <table className='table'>
                                    <thead>
                                        <tr
                                            className='text-cmGrey500 text-cmGrey800 border-bottom-2 border-cmGrey400'
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                fontFamily: fontsFamily.manrope,
                                            }}
                                        >
                                            <th className='text-nowrap p-5 '>Type</th>
                                            <th className='text-nowrap p-5 '>Date</th>
                                            <th className='text-nowrap p-5 '>Description</th>
                                            <th className='text-nowrap p-5 '>Pay Period</th>
                                            <th className='text-nowrap p-5 border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                Paid Amount
                                            </th>
                                            <th className='text-nowrap p-5 text-center '>
                                                Due Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {summaryData?.setter1?.data?.length > 0 ? (
                                            <>
                                                {summaryData?.setter1?.data?.map((i) => (
                                                    <tr
                                                        className='border border-right-0 border-left-0 border-top-0 border-cmGrey400 text-cmGrey800 stripRow'
                                                        style={{
                                                            fontSize: '14px',
                                                            fontFamily: fontsFamily.manrope,
                                                            fontWeight: 600,
                                                            lineHeight: '20px',
                                                        }}
                                                    >
                                                        <td className='p-5 text-nowrap'>
                                                            {i?.type}
                                                        </td>
                                                        <td className='p-5 text-nowrap'>
                                                            {' '}
                                                            {getValidDate(i?.date, 'MM-DD-YYYY')}
                                                        </td>
                                                        <td className='p-5 text-nowrap text-cmGrey700'>
                                                            {i?.description}
                                                        </td>
                                                        <td className='p-5 text-nowrap'>
                                                            {payPeriodKey(i)}
                                                        </td>
                                                        <td className='py-5 text-nowrap border border-bottom-0 border-top-0 border-cmGrey400  text-center'>
                                                            {formattedNumberFields(
                                                                i?.paid_amount,
                                                                '$'
                                                            )}
                                                        </td>
                                                        <td className='p-5 text-nowrap text-center'>
                                                            {formattedNumberFields(
                                                                i?.unpaid_amount,
                                                                '$'
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr
                                                    className=' text-cmGrey900'
                                                    style={{
                                                        fontSize: '16px',
                                                        fontFamily: fontsFamily.manrope,
                                                        fontWeight: 600,
                                                        lineHeight: '20px',
                                                    }}
                                                >
                                                    <td colSpan={3}></td>
                                                    <td
                                                        style={{fontSize: '14px'}}
                                                        className='text-center'
                                                    >
                                                        Subtotal
                                                    </td>
                                                    <td className='border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                        {formattedNumberFields(
                                                            summaryData?.setter1?.paid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                    <td className='text-center'>
                                                        {' '}
                                                        {formattedNumberFields(
                                                            summaryData?.setter1?.unpaid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                </tr>
                                                {!summaryData?.closer2 &&
                                                !summaryData?.closer1 &&
                                                !summaryData?.setter2 ? (
                                                    <>
                                                        <tr
                                                            className=' text-cmGrey900'
                                                            style={{
                                                                fontSize: '20px',
                                                                fontFamily: fontsFamily.manrope,
                                                                fontWeight: 600,
                                                                lineHeight: '20px',
                                                            }}
                                                        >
                                                            <td colSpan={3}></td>
                                                            <td
                                                                style={{fontSize: '14px'}}
                                                                className='text-center'
                                                            >
                                                                Total
                                                            </td>
                                                            <td className='border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                                {formattedNumberFields(
                                                                    totals.totalPaid,
                                                                    '$'
                                                                )}
                                                            </td>
                                                            <td className='text-center'>
                                                                {formattedNumberFields(
                                                                    totals.totalDueAmount,
                                                                    '$'
                                                                )}
                                                            </td>
                                                        </tr>
                                                        <tr className=''>
                                                            <td colSpan={3}></td>
                                                            <td
                                                                colSpan={3}
                                                                className='text-center p-10 '
                                                            >
                                                                {/* <div
                                                                    className='d-flex align-items-center gap-10 border-dotted border-cmGrey400 py-5 px-10 justify-content-center text-cmGrey900'
                                                                    style={{
                                                                        borderRadius: '12px',
                                                                        fontFamily:
                                                                            fontsFamily.manrope,
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            fontSize: 16,
                                                                            fontWeight: 700,
                                                                        }}
                                                                    >
                                                                        GrandTotal
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            fontSize: '24px',
                                                                            fontWeight: 800,
                                                                        }}
                                                                    >
                                                                        {formattedNumberFields(
                                                                            totals.grandTotal,
                                                                            '$'
                                                                        )}
                                                                    </div>
                                                                </div> */}
                                                            </td>
                                                        </tr>
                                                    </>
                                                ) : null}
                                            </>
                                        ) : (
                                            <>
                                                <tr>
                                                    <td
                                                        className='text-cmGrey600 fw-bold text-center py-5'
                                                        colSpan={6}
                                                    >
                                                        No data found
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : null}
                        {/* Setter 2 */}
                        {summaryData?.setter2 ? (
                            <div className='table-responsive mb-10 P-5'>
                                <div className='d-flex align-items-center gap-3'>
                                    <CustomImage
                                        style={{width: '30px', height: '30px'}}
                                        src={summaryData?.setter2?.info?.image}
                                    />
                                    <div className='text-cmGrey900'>
                                        {summaryData?.setter2?.info?.name}
                                    </div>
                                    <div className='badge text-cminfo bg-cminfo rounded-pill bg-opacity-10 px-5'>
                                        Setter 2
                                    </div>
                                </div>
                                <table className='table'>
                                    <thead>
                                        <tr
                                            className='text-cmGrey500 text-cmGrey800 border-bottom-2 border-cmGrey400'
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                fontFamily: fontsFamily.manrope,
                                            }}
                                        >
                                            <th className='text-nowrap p-5 '>Type</th>
                                            <th className='text-nowrap p-5 '>Date</th>
                                            <th className='text-nowrap p-5 '>Description</th>
                                            <th className='text-nowrap p-5 '>Pay Period</th>
                                            <th className='text-nowrap p-5 border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                Paid Amount
                                            </th>
                                            <th className='text-nowrap p-5 text-center '>
                                                Due Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {summaryData?.setter2?.data?.length > 0 ? (
                                            <>
                                                {summaryData?.setter2?.data?.map((i) => (
                                                    <tr
                                                        className='border border-right-0 border-left-0 border-top-0 border-cmGrey400 text-cmGrey800 stripRow'
                                                        style={{
                                                            fontSize: '14px',
                                                            fontFamily: fontsFamily.manrope,
                                                            fontWeight: 600,
                                                            lineHeight: '20px',
                                                        }}
                                                    >
                                                        <td className='p-5 text-nowrap'>
                                                            {i?.type}
                                                        </td>
                                                        <td className='p-5 text-nowrap'>
                                                            {' '}
                                                            {getValidDate(i?.date, 'MM-DD-YYYY')}
                                                        </td>
                                                        <td className='p-5 text-nowrap text-cmGrey700'>
                                                            {i?.description}
                                                        </td>
                                                        <td className='p-5 text-nowrap'>
                                                            {payPeriodKey(i)}
                                                        </td>
                                                        <td className='py-5 text-nowrap border border-bottom-0 border-top-0 border-cmGrey400  text-center'>
                                                            {formattedNumberFields(
                                                                i?.paid_amount,
                                                                '$'
                                                            )}
                                                        </td>
                                                        <td className='p-5 text-nowrap text-center'>
                                                            {formattedNumberFields(
                                                                i?.unpaid_amount,
                                                                '$'
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr
                                                    className=' text-cmGrey900'
                                                    style={{
                                                        fontSize: '16px',
                                                        fontFamily: fontsFamily.manrope,
                                                        fontWeight: 600,
                                                        lineHeight: '20px',
                                                    }}
                                                >
                                                    <td colSpan={3}></td>
                                                    <td
                                                        style={{fontSize: '14px'}}
                                                        className='text-center'
                                                    >
                                                        Subtotal
                                                    </td>
                                                    <td className='border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                        {formattedNumberFields(
                                                            summaryData?.setter2?.paid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                    <td className='text-center'>
                                                        {' '}
                                                        {formattedNumberFields(
                                                            summaryData?.setter2?.unpaid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                </tr>
                                                {!summaryData?.closer2 && !summaryData?.closer1 ? (
                                                    <>
                                                        <tr
                                                            className=' text-cmGrey900'
                                                            style={{
                                                                fontSize: '20px',
                                                                fontFamily: fontsFamily.manrope,
                                                                fontWeight: 600,
                                                                lineHeight: '20px',
                                                            }}
                                                        >
                                                            <td colSpan={3}></td>
                                                            <td
                                                                style={{fontSize: '14px'}}
                                                                className='text-center'
                                                            >
                                                                Total
                                                            </td>
                                                            <td className='border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                                {formattedNumberFields(
                                                                    totals.totalPaid,
                                                                    '$'
                                                                )}
                                                            </td>
                                                            <td className='text-center'>
                                                                {formattedNumberFields(
                                                                    totals.totalDueAmount,
                                                                    '$'
                                                                )}
                                                            </td>
                                                        </tr>
                                                        <tr className=''>
                                                            <td colSpan={3}></td>
                                                            <td
                                                                colSpan={3}
                                                                className='text-center p-10 '
                                                            >
                                                                {/* <div
                                                                    className='d-flex align-items-center gap-10 border-dotted border-cmGrey400 py-5 px-10 justify-content-center text-cmGrey900'
                                                                    style={{
                                                                        borderRadius: '12px',
                                                                        fontFamily:
                                                                            fontsFamily.manrope,
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            fontSize: 16,
                                                                            fontWeight: 700,
                                                                        }}
                                                                    >
                                                                        GrandTotal
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            fontSize: '24px',
                                                                            fontWeight: 800,
                                                                        }}
                                                                    >
                                                                        {formattedNumberFields(
                                                                            totals.grandTotal,
                                                                            '$'
                                                                        )}
                                                                    </div>
                                                                </div> */}
                                                            </td>
                                                        </tr>
                                                    </>
                                                ) : null}
                                            </>
                                        ) : (
                                            <>
                                                <tr>
                                                    <td
                                                        className='text-cmGrey600 fw-bold text-center py-5'
                                                        colSpan={6}
                                                    >
                                                        No data found
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : null}

                        {/* Closer 1 table */}
                        {summaryData?.closer1 ? (
                            <div className='table-responsive mb-10'>
                                <div className='d-flex align-items-center gap-5'>
                                    <div className='d-flex align-items-center gap-3'>
                                        <CustomImage
                                            style={{width: '30px', height: '30px'}}
                                            src={summaryData?.closer1?.info?.image}
                                        />
                                        <div className='text-cmGrey900'>
                                            {summaryData?.closer1?.info?.name}
                                        </div>
                                    </div>
                                    <div className='badge text-cmPurple bg-cmPurple rounded-pill bg-opacity-10 px-5'>
                                        Closer 1
                                    </div>
                                </div>

                                <table className='table'>
                                    <thead>
                                        <tr
                                            className='text-cmGrey500 text-cmGrey800 border-bottom-2 border-cmGrey400 '
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                fontFamily: fontsFamily.manrope,
                                            }}
                                        >
                                            <th className='text-nowrap p-5 '>Type</th>
                                            <th className='text-nowrap p-5 '>Date</th>
                                            <th className='text-nowrap p-5 '>Description</th>
                                            <th className='text-nowrap p-5 '>Pay Period</th>
                                            <th className='text-nowrap p-5 border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                Paid Amount
                                            </th>
                                            <th className='text-nowrap p-5 text-center '>
                                                Due Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {summaryData?.closer1?.data?.length > 0 ? (
                                            <>
                                                {summaryData?.closer1?.data?.map((i) => (
                                                    <tr
                                                        className='border border-right-0 border-left-0 border-top-0 border-cmGrey400 text-cmGrey800 stripRow'
                                                        style={{
                                                            fontSize: '14px',
                                                            fontFamily: fontsFamily.manrope,
                                                            fontWeight: 600,
                                                            lineHeight: '20px',
                                                        }}
                                                    >
                                                        <td className='p-5 text-nowrap'>
                                                            {i?.type}
                                                        </td>
                                                        <td className='p-5 text-nowrap'>
                                                            {' '}
                                                            {getValidDate(i?.date, 'MM-DD-YYYY')}
                                                        </td>
                                                        <td className='p-5 text-nowrap text-cmGrey700'>
                                                            {i?.description}
                                                        </td>
                                                        <td className='p-5 text-nowrap'>
                                                            {payPeriodKey(i)}
                                                        </td>
                                                        <td className='py-5 text-nowrap border border-bottom-0 border-top-0 border-cmGrey400  text-center'>
                                                            {formattedNumberFields(
                                                                i?.paid_amount,
                                                                '$'
                                                            )}
                                                        </td>
                                                        <td className='p-5 text-nowrap text-center'>
                                                            {formattedNumberFields(
                                                                i?.unpaid_amount,
                                                                '$'
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}

                                                <tr
                                                    className=' text-cmGrey900 border border-right-0 border-left-0 border-top-0 border-cmGrey400'
                                                    style={{
                                                        fontSize: '16px',
                                                        fontFamily: fontsFamily.manrope,
                                                        fontWeight: 600,
                                                        lineHeight: '20px',
                                                    }}
                                                >
                                                    <td colSpan={3}></td>
                                                    <td
                                                        style={{fontSize: '14px'}}
                                                        className='text-center'
                                                    >
                                                        Subtotal
                                                    </td>
                                                    <td className='border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                        {formattedNumberFields(
                                                            summaryData?.closer1?.paid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                    <td className='text-center'>
                                                        {' '}
                                                        {formattedNumberFields(
                                                            summaryData?.setter1?.unpaid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                </tr>
                                                {!summaryData?.closer2 ? (
                                                    <>
                                                        <tr
                                                            className=' text-cmGrey900'
                                                            style={{
                                                                fontSize: '20px',
                                                                fontFamily: fontsFamily.manrope,
                                                                fontWeight: 600,
                                                                lineHeight: '20px',
                                                            }}
                                                        >
                                                            <td colSpan={3}></td>
                                                            <td
                                                                style={{fontSize: '14px'}}
                                                                className='text-center'
                                                            >
                                                                Total
                                                            </td>
                                                            <td className='border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                                {formattedNumberFields(
                                                                    totals.totalPaid,
                                                                    '$'
                                                                )}
                                                            </td>
                                                            <td className='text-center'>
                                                                {formattedNumberFields(
                                                                    totals.totalDueAmount,
                                                                    '$'
                                                                )}
                                                            </td>
                                                        </tr>
                                                        <tr className=''>
                                                            <td colSpan={3}></td>
                                                            <td
                                                                colSpan={3}
                                                                className='text-center p-10 '
                                                            >
                                                                {/* <div
                                                                    className='d-flex align-items-center gap-10 border-dotted border-cmGrey400 py-5 px-10 justify-content-center text-cmGrey900'
                                                                    style={{
                                                                        borderRadius: '12px',
                                                                        fontFamily:
                                                                            fontsFamily.manrope,
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            fontSize: 16,
                                                                            fontWeight: 700,
                                                                        }}
                                                                    >
                                                                        GrandTotal
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            fontSize: '24px',
                                                                            fontWeight: 800,
                                                                        }}
                                                                    >
                                                                        {formattedNumberFields(
                                                                            totals.grandTotal,
                                                                            '$'
                                                                        )}
                                                                    </div>
                                                                </div> */}
                                                            </td>
                                                        </tr>
                                                    </>
                                                ) : null}
                                            </>
                                        ) : (
                                            <>
                                                <tr>
                                                    <td
                                                        className='text-cmGrey600 fw-bold text-center py-5'
                                                        colSpan={6}
                                                    >
                                                        No data found
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : null}

                        {/* Closer 2 table */}
                        {summaryData?.closer2 ? (
                            <div className='table-responsive mb-10'>
                                <div className='d-flex align-items-center gap-5'>
                                    <div className='d-flex align-items-center gap-3'>
                                        <CustomImage
                                            style={{width: '30px', height: '30px'}}
                                            src={summaryData?.closer2?.info?.image}
                                        />
                                        <div className='text-cmGrey900'>
                                            {summaryData?.closer2?.info?.name}
                                        </div>
                                    </div>
                                    <div className='badge text-cmPurple bg-cmPurple rounded-pill bg-opacity-10 px-5'>
                                        Closer 2
                                    </div>
                                </div>

                                <table className='table'>
                                    <thead>
                                        <tr
                                            className='text-cmGrey500 text-cmGrey800 border-bottom-2 border-cmGrey400 '
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                fontFamily: fontsFamily.manrope,
                                            }}
                                        >
                                            <th className='text-nowrap p-5 '>Type</th>
                                            <th className='text-nowrap p-5 '>Date</th>
                                            <th className='text-nowrap p-5 '>Description</th>
                                            <th className='text-nowrap p-5 '>Pay Period</th>
                                            <th className='text-nowrap p-5 border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                Paid Amount
                                            </th>
                                            <th className='text-nowrap p-5 text-center '>
                                                Due Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {summaryData?.closer2?.data?.length > 0 ? (
                                            <>
                                                {summaryData?.closer2?.data?.map((i) => (
                                                    <tr
                                                        className='border border-right-0 border-left-0 border-top-0 border-cmGrey400 text-cmGrey800 stripRow'
                                                        style={{
                                                            fontSize: '14px',
                                                            fontFamily: fontsFamily.manrope,
                                                            fontWeight: 600,
                                                            lineHeight: '20px',
                                                        }}
                                                    >
                                                        <td className='p-5 text-nowrap'>
                                                            {i?.type}
                                                        </td>
                                                        <td className='p-5 text-nowrap'>
                                                            {' '}
                                                            {getValidDate(i?.date, 'MM-DD-YYYY')}
                                                        </td>
                                                        <td className='p-5 text-nowrap text-cmGrey700'>
                                                            {i?.description}
                                                        </td>
                                                        <td className='p-5 text-nowrap'>
                                                            {payPeriodKey(i)}
                                                        </td>
                                                        <td className='py-5 text-nowrap border border-bottom-0 border-top-0 border-cmGrey400  text-center'>
                                                            {formattedNumberFields(
                                                                i?.paid_amount,
                                                                '$'
                                                            )}
                                                        </td>
                                                        <td className='p-5 text-nowrap text-center'>
                                                            {formattedNumberFields(
                                                                i?.unpaid_amount,
                                                                '$'
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr
                                                    className=' text-cmGrey900 border border-right-0 border-left-0 border-top-0 border-cmGrey400'
                                                    style={{
                                                        fontSize: '16px',
                                                        fontFamily: fontsFamily.manrope,
                                                        fontWeight: 600,
                                                        lineHeight: '20px',
                                                    }}
                                                >
                                                    <td colSpan={3}></td>
                                                    <td
                                                        style={{fontSize: '14px'}}
                                                        className='text-center'
                                                    >
                                                        Subtotal
                                                    </td>
                                                    <td className='border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                        {formattedNumberFields(
                                                            summaryData?.closer2?.paid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                    <td className='text-center'>
                                                        {' '}
                                                        {formattedNumberFields(
                                                            summaryData?.closer2?.unpaid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr
                                                    className=' text-cmGrey900'
                                                    style={{
                                                        fontSize: '20px',
                                                        fontFamily: fontsFamily.manrope,
                                                        fontWeight: 600,
                                                        lineHeight: '20px',
                                                    }}
                                                >
                                                    <td colSpan={3}></td>
                                                    <td
                                                        style={{fontSize: '14px'}}
                                                        className='text-center'
                                                    >
                                                        Total
                                                    </td>
                                                    <td className='border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                        {formattedNumberFields(
                                                            totals.totalPaid,
                                                            '$'
                                                        )}
                                                    </td>
                                                    <td className='text-center'>
                                                        {formattedNumberFields(
                                                            totals.totalDueAmount,
                                                            '$'
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr className=''>
                                                    <td colSpan={3}></td>
                                                    <td colSpan={3} className='text-center p-10 '>
                                                        {/* <div
                                                            className='d-flex align-items-center gap-10 border-dotted border-cmGrey400 py-5 px-10 justify-content-center text-cmGrey900'
                                                            style={{
                                                                borderRadius: '12px',
                                                                fontFamily: fontsFamily.manrope,
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    fontSize: 16,
                                                                    fontWeight: 700,
                                                                }}
                                                            >
                                                                GrandTotal
                                                            </div>
                                                            <div
                                                                style={{
                                                                    fontSize: '24px',
                                                                    fontWeight: 800,
                                                                }}
                                                            >
                                                                {formattedNumberFields(
                                                                    totals.grandTotal,
                                                                    '$'
                                                                )}
                                                            </div>
                                                        </div> */}
                                                    </td>
                                                </tr>
                                            </>
                                        ) : (
                                            <>
                                                <tr>
                                                    <td
                                                        className='text-cmGrey600 fw-bold text-center py-5'
                                                        colSpan={6}
                                                    >
                                                        No data found
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div className='p-20 text-center text-cmGrey600' style={{fontWeight: 600}}>
                        No Overrides found
                    </div>
                )}
            </div>
        </div>
    )
}

export default Overrides
