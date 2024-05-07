import React, {useState} from 'react'
import {formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import More from './icon/more.png'
import More1 from './icon/more1.png'
export default function Card({cardData}) {
    const [payroll, setPayroll] = useState(false)
    const [cost, setCost] = useState(false)
    return (
        <>
            <div className='row w-100 mx-auto gap-8 mt-10'>
                <div
                    style={{borderRadius: '10px'}}
                    className='shadow mt-1 mb-4 col-sm 0 d-flex justify-content-center h-md-275px bg-white border border-cmBlue-Crayola'
                >
                    <div className='container my-0 card pb-5 ' style={{fontSize: '14px'}}>
                        <div className='row g-2 p-2 mt-0'>
                            <div
                                className='mt-4 text-cmGrey900 text-nowrap'
                                style={{fontSize: '16px', fontWeight: '600', fontFamily: 'Manrope'}}
                            >
                                Revenue Summary
                                <span
                                    className={
                                        cardData?.revenue_summary?.revenue_percentage > 0
                                            ? 'text-cmSucccess'
                                            : cardData?.revenue_summary?.revenue_percentage < 0
                                            ? 'text-cmError'
                                            : 'text-warning'
                                    }
                                    style={{
                                        marginLeft: '5px',
                                    }}
                                >
                                    <i
                                        className={
                                            cardData?.revenue_summary?.revenue_percentage > 0
                                                ? 'bi bi-arrow-up text-cmSuccess'
                                                : cardData?.revenue_summary?.revenue_percentage < 0
                                                ? 'bi bi-arrow-down text-cmError'
                                                : 'bi bi-dash text-cmError'
                                        }
                                    ></i>
                                    {cardData?.revenue_summary?.revenue_percentage} %
                                </span>
                            </div>
                        </div>
                        <div className='card-body my-0 p-0'>
                            <div
                                className='container mt-4 text-cmGrey600'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    fontWeight: 500,
                                    fontFamily: 'Manrope',
                                }}
                            >
                                {cardData?.revenue_summary?.data?.length > 0 ? (
                                    <div className='d-flex algin-items-center flex-wrap justify-content-between'>
                                        <div className=''>
                                            {cardData?.revenue_summary?.data?.[0]?.install_partner}
                                        </div>
                                        <div className=''>
                                            {formattedNumberFields(
                                                cardData?.revenue_summary?.data[0]?.gross_total,
                                                '$'
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='row g-2'>
                                        <div className='row g-2'>No Data</div>
                                    </div>
                                )}
                            </div>
                            <div
                                className='container mt-2 text-cmGrey600'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    fontWeight: 500,
                                    fontFamily: 'Manrope',
                                }}
                            >
                                {cardData?.revenue_summary?.data?.length > 0 ? (
                                    <div className='row'>
                                        <div className='col-7 mt-3'>
                                            {cardData?.revenue_summary?.data[1]?.install_partner}
                                        </div>
                                        <div className='col-5 mt-3 text-end'>
                                            {formattedNumberFields(
                                                cardData?.revenue_summary?.data[1]?.gross_total,
                                                '$'
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='row g-2'>
                                        <div className='row g-2'>No Data</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* <div
              className='container mt-4 text-cmGrey600'
              style={{
                fontSize: '14px',
                marginLeft: '-2px',
                fontWeight: 500,
                fontFamily: 'Manrope',
              }}
            >
              <div className='row g-2  '>
                <div className='col-8 mt-3'>SunPower</div>
                <div className='col-4 mt-3 text-end'>$3,486.00</div>
              </div>
            </div> */}

                        <div
                            className='card-footer border-0 my-0 p-0 '
                            style={{fontSize: '14px,', fontWeight: 700}}
                        >
                            <div className='row g-2  me-0 text-cmGrey800'>
                                <div className='col-6 mt-4 ' style={{fontFamily: 'Manrope'}}>
                                    Total Revenue
                                </div>
                                <div
                                    className='col-6 mt-4 text-end me-0 text-cmGrey900'
                                    style={{fontFamily: 'Manrope'}}
                                >
                                    {formattedNumberFields(cardData?.revenue_summary?.total, '$')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{borderRadius: '10px'}}
                    // style={{border: '1px solid #FFB03A'}}
                    className={
                        cost === false
                            ? `shadow mt-1 mb-4 col-sm d-flex justify-content-center border border-cmOrange ${
                                  payroll === false ? 'h-md-275px' : 'h-auto'
                              } bg-white `
                            : `shadow mt-1 mb-4 col-sm d-flex justify-content-center ${
                                  cost === false ? 'h-md-275px' : 'h-auto'
                              } bg-white `
                    }
                >
                    <div
                        className='container my-0 card pb-5'
                        style={{fontSize: '14px', borderRadius: '10px'}}
                    >
                        <div className='row g-2 p-2 mt-0'>
                            <div
                                className='mt-4 text-cmGrey900 text-nowrap'
                                style={{fontSize: '16px', fontWeight: '600', fontFamily: 'Manrope'}}
                            >
                                Cost Summary
                                <span
                                    className={
                                        cardData?.cost_summary?.cost_percentage > 0
                                            ? 'text-cmSucccess'
                                            : cardData?.cost_summary?.cost_percentage < 0
                                            ? 'text-cmError'
                                            : 'text-warning'
                                    }
                                    style={{
                                        marginLeft: '5px',
                                    }}
                                >
                                    <i
                                        className={
                                            cardData?.cost_summary?.cost_percentage > 0
                                                ? 'bi bi-arrow-up text-cmSuccess'
                                                : cardData?.cost_summary?.cost_percentage < 0
                                                ? 'bi bi-arrow-down text-cmError'
                                                : 'bi bi-dash text-cmError'
                                        }
                                    ></i>
                                    {cardData?.cost_summary?.cost_percentage} %
                                </span>
                            </div>
                        </div>

                        <div className='card-body my-0 p-0'>
                            <div
                                className={`container mt-4 ${
                                    cost === false ? 'text-cmGrey600' : 'text-cmGrey900'
                                }`}
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    fontFamily: cost === false ? 'Manrope' : 'Manrope',
                                    fontWeight: cost === false ? '' : 'bold',
                                }}
                            >
                                <div className='row g-2 text-nowrap'>
                                    <div className='col-8 mt-3'>
                                        Costs{' '}
                                        <img
                                            className='ms-1'
                                            onClick={() => {
                                                cost === false ? setCost(true) : setCost(false)
                                            }}
                                            style={{cursor: 'pointer', marginTop: '-3px'}}
                                            src={cost === false ? More : More1}
                                        ></img>
                                    </div>
                                    <div className='col-4 mt-3 text-end'>
                                        {formattedNumberFields(
                                            cardData?.cost_summary?.costs?.total,
                                            '$'
                                        )}
                                    </div>
                                </div>
                            </div>
                            {cost === false ? (
                                <></>
                            ) : (
                                <>
                                    {' '}
                                    {cardData?.cost_summary?.costs?.data?.map((item) => (
                                        <div
                                            className='container mt-2 text-cmGrey600'
                                            style={{
                                                fontSize: '14px',
                                                marginLeft: '-3px',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            <div className='row g-2'>
                                                <div className='col-8 mt-3'>{item?.cost_data}</div>
                                                <div className='col-4 mt-3 text-end'>
                                                    {formattedNumberFields(item?.cost_amount, '$')}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* <div
                  className='container mt-4 text-cmGrey600'
                  style={{
                    fontSize: '14px',
                    marginLeft: '-3px',
                    fontFamily: 'Manrope',
                  }}
                >
                  <div className='row g-2'>
                    <div className='col-8 mt-3'>Travel</div>
                    <div className='col-4 mt-3 text-end'>$21,006.58</div>
                  </div>
                </div>
                <div
                  className='container mt-4 text-cmGrey600'
                  style={{
                    fontSize: '14px',
                    marginLeft: '-3px',
                    fontFamily: 'Manrope',
                  }}
                >
                  <div className='row g-2'>
                    <div className='col-8 mt-3'>Medical</div>
                    <div className='col-4 mt-3 text-end'>$21,006.58</div>
                  </div>
                </div> */}
                                </>
                            )}
                            <div
                                className={`container mt-4 ${
                                    payroll === false ? 'text-cmGrey600' : 'text-cmGrey900'
                                }`}
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    fontFamily: payroll === false ? 'Manrope' : 'Manrope',
                                    fontWeight: payroll === false ? '' : 'bold',
                                }}
                            >
                                <div className='row g-2 text-nowrap'>
                                    <div className='col-8 mt-3'>
                                        Payroll
                                        <img
                                            className='ms-2'
                                            onClick={() => {
                                                payroll === false
                                                    ? setPayroll(true)
                                                    : setPayroll(false)
                                            }}
                                            style={{cursor: 'pointer', marginTop: '-3px'}}
                                            src={payroll === false ? More : More1}
                                        ></img>
                                    </div>
                                    <div className='col-4 mt-3 text-end'>
                                        {formattedNumberFields(
                                            cardData?.cost_summary?.payroll?.total,
                                            '$'
                                        )}
                                    </div>
                                </div>
                            </div>
                            {payroll === false ? (
                                <></>
                            ) : (
                                <>
                                    {' '}
                                    {cardData?.cost_summary?.payroll?.data?.map((item) => (
                                        <div
                                            className='container mt-5 text-cmGrey600'
                                            style={{
                                                fontSize: '14px',
                                                marginLeft: '-3px',

                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            <div className='row g-2'>
                                                <div className='col-8 mt-3'>
                                                    {item?.payroll_data}
                                                </div>
                                                <div className='col-4 mt-3 text-end'>
                                                    {formattedNumberFields(
                                                        item?.payroll_amount,
                                                        '$'
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* <div
                  className='container mt-5 text-cmGrey600'
                  style={{
                    fontSize: '14px',
                    marginLeft: '-3px',

                    fontFamily: 'Manrope',
                  }}
                >
                  <div className='row g-2'>
                    <div className='col-8 mt-3'>Total (M2)</div>
                    <div className='col-4 mt-3 text-end'>$21,006.58</div>
                  </div>
                </div>
                <div
                  className='container mt-5 text-cmGrey600'
                  style={{
                    fontSize: '14px',
                    marginLeft: '-3px',

                    fontFamily: 'Manrope',
                  }}
                >
                  <div className='row g-2'>
                    <div className='col-8 mt-3'>Total Overrides</div>
                    <div className='col-4 mt-3 text-end'>$21,006.58</div>
                  </div>
                </div>
                <div
                  className='container mt-5 text-cmGrey600'
                  style={{
                    fontSize: '14px',
                    marginLeft: '-3px',

                    fontFamily: 'Manrope',
                  }}
                >
                  <div className='row g-2'>
                    <div className='col-8 mt-3'>Total Adjustments</div>
                    <div className='col-4 mt-3 text-end'>$21,006.58</div>
                  </div>
                </div> */}
                                    {/* <div
                  className='container mt-5 text-cmGrey600'
                  style={{
                    fontSize: '14px',
                    marginLeft: '-3px',

                    fontFamily: 'Manrope',
                  }}
                >
                  <div className='row g-2'>
                    <div className='col-8 mt-3'>Total Reimbursements</div>
                    <div className='col-4 mt-3 text-end'>$21,006.58</div>
                  </div>
                </div>
                <div
                  className='container mt-5 text-cmGrey600'
                  style={{
                    fontSize: '14px',
                    marginLeft: '-3px',

                    fontFamily: 'Manrope',
                  }}
                >
                  <div className='row g-2'>
                    <div className='col-8 mt-3'>Employee Deductions</div>
                    <div className='col-4 mt-3 text-end'>$21,006.58</div>
                  </div>
                </div> */}
                                </>
                            )}
                        </div>
                        <div
                            className={
                                cost === false
                                    ? `container card-footer border-0 my-0 p-0 ${
                                          payroll === false ? 'mt-20' : 'mt-0 mb-0'
                                      }`
                                    : `container card-footer border-0 p-0 ${
                                          cost === false ? 'mt-0' : 'mt-0 mb-0'
                                      }`
                            }
                            style={{fontSize: '14px', marginLeft: '-3px'}}
                        >
                            <div
                                className='row g-2 text-cmGrey800'
                                style={{fontWeight: '700', fontFamily: 'Manrope', fontSize: '14px'}}
                            >
                                <div className='col-6 mt-4  '>Total Cost</div>
                                <div className='col-6 mt-4 text-end me-0 text-cmGrey900'>
                                    {formattedNumberFields(
                                        cardData?.cost_summary?.total_costs,
                                        '$'
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{borderRadius: '10px'}}
                    className='shadow mt-1 mb-4 col-sm d-flex justify-content-center h-md-275px bg-white border border-cmSuccess'
                >
                    <div className='container card my-0 card pb-5' style={{fontSize: '14px'}}>
                        <div className='row g-2 p-2 mt-0'>
                            <div
                                className='mt-4 text-cmGrey900 text-nowrap'
                                style={{fontWeight: '600', fontFamily: 'Manrope', fontSize: '16px'}}
                            >
                                Profitability Summary
                                <span
                                    className={
                                        cardData?.profitability_summary?.profitability_percentage >
                                        0
                                            ? 'text-cmSucccess'
                                            : cardData?.profitability_summary
                                                  ?.profitability_percentage < 0
                                            ? 'text-cmError'
                                            : 'text-warning'
                                    }
                                    style={{
                                        marginLeft: '5px',
                                    }}
                                >
                                    <i
                                        className={
                                            cardData?.profitability_summary
                                                ?.profitability_percentage > 0
                                                ? 'bi bi-arrow-up text-cmSuccess'
                                                : cardData?.profitability_summary
                                                      ?.profitability_percentage < 0
                                                ? 'bi bi-arrow-down text-cmError'
                                                : 'bi bi-dash text-cmError'
                                        }
                                    ></i>
                                    {cardData?.profitability_summary?.profitability_percentage}%
                                </span>
                            </div>
                        </div>
                        {/* body */}
                        <div className='card-body my-0 p-0'>
                            <div
                                className='container text-cmGrey600'
                                style={{
                                    fontSize: '14px',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row'>
                                    <div className='col mt-3'>Revenue</div>
                                    <div className='col mt-3 text-end' style={{fontSize: '13px'}}>
                                        {formattedNumberFields(
                                            cardData?.profitability_summary?.data.revenue,
                                            '$'
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div
                                className='container mt-4 text-cmGrey600'
                                style={{
                                    fontSize: '14px',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row  text-nowrap'>
                                    <div className='col '>Cost</div>
                                    <div className='col text-end'>
                                        {formattedNumberFields(
                                            cardData?.profitability_summary?.data.costs,
                                            '$'
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div
                                className='container mt-4 text-cmGrey600'
                                style={{
                                    fontSize: '14px',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row  text-nowrap '>
                                    <div className='col'>Payroll</div>
                                    <div className='col text-end'>
                                        {formattedNumberFields(
                                            cardData?.profitability_summary?.data.payroll,
                                            '$'
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div
                                className='container mt-4 text-cmGrey600'
                                style={{
                                    fontSize: '14px',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row text-nowrap '>
                                    <div className='col'>Clawback</div>
                                    <div className='col text-end'>
                                        {formattedNumberFields(
                                            cardData?.profitability_summary?.data.clowback,
                                            '$'
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='container mt-4 card-footer border-0 my-0 p-0'
                            style={{fontSize: '14px', fontFamily: 'Manrope', fontWeight: '700'}}
                        >
                            <div className='row '>
                                <div className='col text-cmGrey800 '>Total Profits/Loss</div>
                                <div className='col text-end  text-cmGrey900'>
                                    {formattedNumberFields(
                                        cardData?.profitability_summary?.total,
                                        '$'
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
