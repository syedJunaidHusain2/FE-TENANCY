import React, {useCallback, useMemo} from 'react'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import CustomImage from '../../../../../../../../customComponents/customImage/CustomImage'
import {formattedNumberFields} from '../../../../../../../../helpers/CommonHelpers'
import {getValidDate} from '../../../../../../../../constants/constants'
import CustomLoader from '../../../../../../../../customComponents/customLoader/CustomLoader'

const Commisions = ({typeFilter, sumData, loading}) => {
    const summaryData = useMemo(() => {
        const data = typeFilter == 1 ? sumData?.data : sumData
        return data
    }, [sumData, typeFilter])

    const totals = useMemo(() => {
        let totalPaid = 0
        let totalDueAmount = 0
        let grandTotal = 0
        if (typeFilter == 1) {
            totalPaid = summaryData?.commission_paid_total + summaryData?.adjustment_paid_total
            totalDueAmount =
                summaryData?.commission_unpaid_total + summaryData?.adjustment_unpaid_total
        } else {
            totalPaid =
                (summaryData?.commission?.setter1?.paid_total ?? 0) +
                (summaryData?.commission?.setter2?.paid_total ?? 0) +
                (summaryData?.commission?.closer1?.paid_total ?? 0) +
                (summaryData?.commission?.closer2?.paid_total ?? 0)
            totalDueAmount =
                (summaryData?.commission?.setter1?.unpaid_total ?? 0) +
                (summaryData?.commission?.setter2?.unpaid_total ?? 0) +
                (summaryData?.commission?.closer1?.unpaid_total ?? 0) +
                (summaryData?.commission?.closer2?.unpaid_total ?? 0)
        }
        grandTotal = totalPaid + totalDueAmount

        return {
            totalPaid,
            totalDueAmount,
            grandTotal,
        }
    }, [
        summaryData?.adjustment_paid_total,
        summaryData?.adjustment_unpaid_total,
        summaryData?.commission?.closer1?.paid_total,
        summaryData?.commission?.closer1?.unpaid_total,
        summaryData?.commission?.closer2?.paid_total,
        summaryData?.commission?.closer2?.unpaid_total,
        summaryData?.commission?.setter1?.paid_total,
        summaryData?.commission?.setter1?.unpaid_total,
        summaryData?.commission?.setter2?.paid_total,
        summaryData?.commission?.setter2?.unpaid_total,
        summaryData?.commission_paid_total,
        summaryData?.commission_unpaid_total,
        typeFilter,
    ])

    const payPeriodKey = useCallback((item) => {
        let period = item?.date_paid?.split(' to ')
        return `${getValidDate(period?.[0])} to ${getValidDate(period?.[1])}`
    }, [])

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />
            <div className='m-0 p-0'>
                {/* By team */}

                {typeFilter == 1 ? (
                    summaryData?.total_commissions?.length > 0 ||
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
                                            <th className='text-nowrap p-5 '>To</th>
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
                                        {summaryData?.total_commissions?.length > 0 ? (
                                            <>
                                                {summaryData?.total_commissions?.map((item) => (
                                                    <>
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
                                                                {item?.employee}
                                                            </td>
                                                            <td className='p-5 text-nowrap'>
                                                                {getValidDate(
                                                                    item?.date,
                                                                    'MM/DD/YYYY'
                                                                )}
                                                            </td>
                                                            <td className='p-5 text-nowrap text-cmGrey700'>
                                                                {item?.type?.toUpperCase() ?? '-'}
                                                            </td>
                                                            <td className='p-5 text-nowrap'>
                                                                {payPeriodKey(item)}
                                                            </td>
                                                            <td className='py-5 text-nowrap border border-bottom-0 border-top-0 border-cmGrey400  text-center'>
                                                                {formattedNumberFields(
                                                                    item?.paid,
                                                                    '$'
                                                                )}
                                                            </td>
                                                            <td className='p-5 text-nowrap text-center'>
                                                                {formattedNumberFields(
                                                                    item?.unpaid,
                                                                    '$'
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </>
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
                                                            summaryData?.commission_paid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                    <td className='text-center'>
                                                        {formattedNumberFields(
                                                            summaryData?.commission_unpaid_total,
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
                                                {summaryData?.total_adjustment?.map((item) => (
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
                                                            {item?.employee}
                                                        </td>
                                                        <td className='p-5 text-nowrap'>
                                                            {getValidDate(item?.date, 'MM-DD-YYYY')}
                                                        </td>
                                                        <td className='p-5 text-nowrap text-cmGrey700'>
                                                            {item?.type.toUpperCase()}
                                                        </td>
                                                        <td className='p-5 text-nowrap'>
                                                            {payPeriodKey(item)}
                                                        </td>
                                                        <td className='py-5 text-nowrap border border-bottom-0 border-top-0 border-cmGrey400  text-center'>
                                                            {formattedNumberFields(item?.paid, '$')}
                                                        </td>
                                                        <td className='p-5 text-nowrap text-center'>
                                                            {formattedNumberFields(
                                                                item?.unpaid,
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
                                                            summaryData?.adjustment_paid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                    <td className='text-center'>
                                                        {' '}
                                                        {formattedNumberFields(
                                                            summaryData?.adjustment_unpaid_total,
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
                                            <td style={{fontSize: '14px'}} className='text-center'>
                                                Total
                                            </td>
                                            <td className='border border-bottom-0 border-top-0 border-cmGrey400 text-center'>
                                                {formattedNumberFields(totals.totalPaid, '$')}
                                            </td>
                                            <td className='text-center'>
                                                {' '}
                                                {formattedNumberFields(totals.totalDueAmount, '$')}
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
                                                        {' '}
                                                        {formattedNumberFields(
                                                            totals.grandTotal,
                                                            '$'
                                                        )}
                                                    </div>
                                                </div> */}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className='p-20 text-center text-cmGrey600' style={{fontWeight: 600}}>
                            No Commisions found
                        </div>
                    )
                ) : // Setter table
                summaryData?.commission?.setter1 ||
                  summaryData?.commission?.setter2 ||
                  summaryData?.commission?.closer1 ||
                  summaryData?.commission?.closer2 ? (
                    <div
                        className='p-5'
                        style={{fontFamily: fontsFamily.manrope, fontSize: 14, fontWeight: 700}}
                    >
                        {/* Setter 1 */}
                        {summaryData?.commission?.setter1 ? (
                            <div className='table-responsive mb-10'>
                                <div className='d-flex align-items-center gap-5'>
                                    <div className='d-flex align-items-center gap-3'>
                                        <CustomImage
                                            style={{width: '30px', height: '30px'}}
                                            src={summaryData?.commission?.setter1?.info?.image}
                                        />
                                        <div className='text-cmGrey900'>
                                            {summaryData?.commission?.setter1?.info?.name}
                                        </div>
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
                                        {summaryData?.commission?.setter1?.data?.length > 0 ? (
                                            <>
                                                {summaryData?.commission?.setter1?.data?.map(
                                                    (item) => (
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
                                                                {item?.type ?? '-'}
                                                            </td>
                                                            <td className='p-5 text-nowrap'>
                                                                {getValidDate(item?.date)}
                                                            </td>
                                                            <td className='p-5 text-nowrap text-cmGrey700'>
                                                                {item?.description}
                                                            </td>
                                                            <td className='p-5 text-nowrap'>
                                                                {payPeriodKey(item)}
                                                            </td>
                                                            <td className='py-5 text-nowrap border border-bottom-0 border-top-0 border-cmGrey400  text-center'>
                                                                {formattedNumberFields(
                                                                    item?.paid_amount,
                                                                    '$'
                                                                )}
                                                            </td>
                                                            <td className='p-5 text-nowrap text-center'>
                                                                {formattedNumberFields(
                                                                    item?.unpaid_amount,
                                                                    '$'
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
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
                                                            summaryData?.commission?.setter1
                                                                ?.paid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                    <td className='text-center'>
                                                        {formattedNumberFields(
                                                            summaryData?.commission?.setter1
                                                                ?.unpaid_total,
                                                            '$'
                                                        )}{' '}
                                                    </td>
                                                </tr>
                                                {!summaryData?.commission?.closer2 &&
                                                !summaryData?.commission?.closer1 &&
                                                !summaryData?.commission?.setter2 ? (
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
                        {summaryData?.commission?.setter2 ? (
                            <div className='table-responsive mb-10'>
                                <div className='d-flex align-items-center gap-5'>
                                    <div className='d-flex align-items-center gap-3'>
                                        <CustomImage
                                            style={{width: '30px', height: '30px'}}
                                            src={summaryData?.commission?.setter2?.info?.image}
                                        />
                                        <div className='text-cmGrey900'>
                                            {summaryData?.commission?.setter2?.info?.name}
                                        </div>
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
                                        {summaryData?.commission?.setter2?.data?.length > 0 ? (
                                            <>
                                                {summaryData?.commission?.setter2?.data?.map(
                                                    (item) => (
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
                                                                {item?.type ?? '-'}
                                                            </td>
                                                            <td className='p-5 text-nowrap'>
                                                                {getValidDate(item?.date)}
                                                            </td>
                                                            <td className='p-5 text-nowrap text-cmGrey700'>
                                                                {item?.description}
                                                            </td>
                                                            <td className='p-5 text-nowrap'>
                                                                {payPeriodKey(item)}
                                                            </td>
                                                            <td className='py-5 text-nowrap border border-bottom-0 border-top-0 border-cmGrey400  text-center'>
                                                                {formattedNumberFields(
                                                                    item?.paid_amount,
                                                                    '$'
                                                                )}
                                                            </td>
                                                            <td className='p-5 text-nowrap text-center'>
                                                                {formattedNumberFields(
                                                                    item?.unpaid_amount,
                                                                    '$'
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
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
                                                            summaryData?.commission?.setter2
                                                                ?.paid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                    <td className='text-center'>
                                                        {formattedNumberFields(
                                                            summaryData?.commission?.setter2
                                                                ?.unpaid_total,
                                                            '$'
                                                        )}{' '}
                                                    </td>
                                                </tr>
                                                {!summaryData?.commission?.closer2 &&
                                                !summaryData?.commission?.closer1 ? (
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

                        {/*    closer table*/}
                        {/* Closer 1 */}
                        {summaryData?.commission?.closer1 ? (
                            <div className='table-responsive mb-10'>
                                <div className='d-flex align-items-center gap-5'>
                                    <div className='d-flex align-items-center gap-3'>
                                        <CustomImage
                                            style={{width: '30px', height: '30px'}}
                                            src={summaryData?.commission?.closer1?.info?.image}
                                        />
                                        <div className='text-cmGrey900'>
                                            {summaryData?.commission?.closer1?.info?.name}
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
                                        {summaryData?.commission?.closer1?.data?.length > 0 ? (
                                            <>
                                                {summaryData?.commission?.closer1?.data?.map(
                                                    (item) => (
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
                                                                {item?.type ?? '-'}
                                                            </td>
                                                            <td className='p-5 text-nowrap'>
                                                                {getValidDate(item?.date)}
                                                            </td>
                                                            <td className='p-5 text-nowrap text-cmGrey700'>
                                                                {item?.description}
                                                            </td>
                                                            <td className='p-5 text-nowrap'>
                                                                {payPeriodKey(item)}
                                                            </td>
                                                            <td className='py-5 text-nowrap border border-bottom-0 border-top-0 border-cmGrey400  text-center'>
                                                                {formattedNumberFields(
                                                                    item?.paid_amount,
                                                                    '$'
                                                                )}
                                                            </td>
                                                            <td className='p-5 text-nowrap text-center'>
                                                                {formattedNumberFields(
                                                                    item?.unpaid_amount,
                                                                    '$'
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
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
                                                            summaryData?.commission?.closer1
                                                                ?.paid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                    <td className='text-center'>
                                                        {formattedNumberFields(
                                                            summaryData?.commission?.closer1
                                                                ?.unpaid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                </tr>
                                                {!summaryData?.commission?.closer2 ? (
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
                        {/* Closer 2 */}
                        {summaryData?.commission?.closer2 ? (
                            <div className='table-responsive mb-10'>
                                <div className='d-flex align-items-center gap-5'>
                                    <div className='d-flex align-items-center gap-3'>
                                        <CustomImage
                                            style={{width: '30px', height: '30px'}}
                                            src={summaryData?.commission?.closer2?.info?.image}
                                        />
                                        <div className='text-cmGrey900'>
                                            {summaryData?.commission?.closer2?.info?.name}
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
                                        {summaryData?.commission?.closer2?.data?.length > 0 ? (
                                            <>
                                                {summaryData?.commission?.closer2?.data?.map(
                                                    (item) => (
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
                                                                {item?.type ?? '-'}
                                                            </td>
                                                            <td className='p-5 text-nowrap'>
                                                                {getValidDate(item?.date)}
                                                            </td>
                                                            <td className='p-5 text-nowrap text-cmGrey700'>
                                                                {item?.description}
                                                            </td>
                                                            <td className='p-5 text-nowrap'>
                                                                {payPeriodKey(item)}
                                                            </td>
                                                            <td className='py-5 text-nowrap border border-bottom-0 border-top-0 border-cmGrey400  text-center'>
                                                                {formattedNumberFields(
                                                                    item?.paid_amount,
                                                                    '$'
                                                                )}
                                                            </td>
                                                            <td className='p-5 text-nowrap text-center'>
                                                                {formattedNumberFields(
                                                                    item?.unpaid_amount,
                                                                    '$'
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
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
                                                            summaryData?.commission?.closer2
                                                                ?.paid_total,
                                                            '$'
                                                        )}
                                                    </td>
                                                    <td className='text-center'>
                                                        {formattedNumberFields(
                                                            summaryData?.commission?.closer
                                                                ?.unpaid_total,
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
                        No Commisions found
                    </div>
                )}
            </div>
        </div>
    )
}

export default Commisions
