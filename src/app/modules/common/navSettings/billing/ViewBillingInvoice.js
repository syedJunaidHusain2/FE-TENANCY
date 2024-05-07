import React from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {formattedNumberFields, formattedPhoneNumber} from '../../../../../helpers/CommonHelpers'
import {getValidDate} from '../../../../../constants/constants'
import {fontsFamily} from '../../../../../assets/fonts/fonts'

const ViewBillingInvoice = ({data}) => {
    return (
        <div style={{padding: '10px'}}>
            <meta charSet='UTF-8' />
            <div className='page' style={{fontFamily: fontsFamily.manrope}}>
                <div style={{width: '100%', marginBottom: '30px'}}>
                    <div className='' style={{position: 'relative', marginBottom: 40}}>
                        <div
                            style={{
                                backgroundColor: '#6078ec',
                                width: '100%',
                                height: '94px',
                                borderRadius: '15px',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <span
                                style={{
                                    position: 'absolute',
                                    backgroundColor: '#8598fd',
                                    bottom: '30px',
                                    right: '52px',
                                    width: '200px',
                                    height: '200px',
                                    borderRadius: '50%',
                                }}
                            />
                            <span
                                style={{
                                    position: 'absolute',
                                    backgroundColor: '#8598fd',
                                    top: '30px',
                                    left: '10px',
                                    width: '200px',
                                    height: '200px',
                                    borderRadius: '50%',
                                }}
                            />
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                width: '112px',
                                height: '112px',
                                top: '-5px',
                                left: '20px',
                                borderRadius: '25px',
                                border: '1px solid #ededed',
                                borderTop: 'none',
                                backgroundColor: '#FFFFFF',
                            }}
                        >
                            <KTSVG
                                path='/media/icons/duotune/art/SequifiSLogo.svg'
                                className='cursor-pointer'
                                svgClassName='w-100px h-100px'
                            />
                        </div>

                        <div
                            className=''
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '32px',
                                width: '50%',
                                textAlign: 'right',
                            }}
                        >
                            <h3
                                style={{
                                    boxSizing: 'border-box',
                                    color: '#fff',
                                    fontSize: '22px',
                                    paddingBottom: '0px',
                                    lineHeight: '30px',
                                    marginBottom: '14px',
                                }}
                            >
                                TAX INVOICE
                            </h3>
                            <span
                                style={{
                                    boxSizing: 'border-box',
                                    color: '#000000',
                                    fontSize: '14px',
                                    // lineHeight: '30px',
                                    fontWeight: 600,
                                    backgroundColor: '#fff',
                                    padding: '8px 15px',
                                    borderRadius: '25px',
                                }}
                            >
                                {data?.invoice_data?.invoice_no ?? '-'}
                            </span>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            // marginTop: '40px',
                            gap: '10px',
                        }}
                    >
                        <div style={{width: '33.33%'}}>
                            <h3
                                className=' '
                                style={{
                                    boxSizing: 'border-box',
                                    color: '#19213d',
                                    fontSize: '12px',
                                    lineHeight: '30px',
                                    marginBottom: '0px',
                                    fontWeight: 700,
                                }}
                            >
                                Bill From: {data?.bill_from?.company_name ?? '-'}
                            </h3>
                            <p
                                className=' '
                                style={{
                                    boxSizing: 'border-box',
                                    color: '#616161',
                                    fontSize: '8px',
                                    lineHeight: '12px',
                                    fontWeight: 500,
                                    margin: '0px',
                                }}
                            >
                                <div className='mb-2'> {data?.bill_from?.address ?? '-'}</div>
                                <br /> {data?.bill_from?.phone_number ?? '-'}
                            </p>
                            <p
                                className='mb-2'
                                style={{
                                    boxSizing: 'border-box',
                                    color: '#616161',
                                    fontSize: '8px',
                                    lineHeight: '12px',
                                    fontWeight: 500,
                                    margin: '0px',
                                }}
                            >
                                {data?.bill_from?.email ?? '-'}
                            </p>
                            <p
                                style={{
                                    boxSizing: 'border-box',
                                    color: '#212121',
                                    fontSize: '8px',
                                    lineHeight: '12px',
                                    fontWeight: 700,
                                    margin: '0px',
                                }}
                            >
                                <strong>TAX ID: {data?.bill_from?.tax_id ?? '-'}</strong>
                            </p>
                        </div>
                        <div
                            style={{
                                width: '33.33%',
                                borderLeft: '1px solid #ebeff6',
                                paddingLeft: '25px',
                            }}
                        >
                            <h3
                                style={{
                                    boxSizing: 'border-box',
                                    color: '#19213d',
                                    fontSize: '12px',
                                    lineHeight: '30px',
                                    marginBottom: '0px',
                                    fontWeight: 600,
                                }}
                            >
                                Bill To: {data?.bill_to?.business_name ?? '-'}
                            </h3>
                            <p
                                style={{
                                    boxSizing: 'border-box',
                                    color: '#616161',
                                    fontSize: '8px',
                                    lineHeight: '12px',
                                    fontWeight: 500,
                                    margin: '0px',
                                }}
                            >
                                <span className='mb-2'>
                                    {data?.bill_to?.business_address},{' '}
                                    {data?.bill_to?.business_city}, {data?.bill_to?.business_state},{' '}
                                    {data?.bill_to?.country}, {data?.bill_to?.business_zip}
                                </span>
                                <br /> {formattedPhoneNumber(data?.bill_to?.business_phone)}
                            </p>
                            <p
                                className='mb-2'
                                style={{
                                    boxSizing: 'border-box',
                                    color: '#616161',
                                    fontSize: '8px',
                                    lineHeight: '12px',
                                    fontWeight: 500,
                                    margin: '0px',
                                }}
                            >
                                {data?.bill_to?.company_email ?? '-'}
                            </p>
                            <p
                                style={{
                                    boxSizing: 'border-box',
                                    color: '#212121',
                                    fontSize: '8px',
                                    lineHeight: '12px',
                                    fontWeight: 700,
                                    margin: '0px',
                                }}
                            >
                                <strong>TAX ID: {data?.bill_to?.business_ein ?? '-'}</strong>
                            </p>
                        </div>
                        <div
                            style={{
                                width: '33.33%',
                                borderLeft: '1px solid #ebeff6',
                                paddingLeft: '25px',
                            }}
                        >
                            <h3
                                style={{
                                    boxSizing: 'border-box',
                                    color: '#212121',
                                    fontSize: '12px',
                                    lineHeight: '16px',
                                    marginBottom: '0px',
                                    fontWeight: 600,
                                }}
                            >
                                Invoice:
                            </h3>
                            <p
                                style={{
                                    boxSizing: 'border-box',
                                    color: '#616161',
                                    fontSize: '8px',
                                    lineHeight: '12px',
                                    fontWeight: 500,
                                    margin: '0px',
                                }}
                            >
                                Invoice date:{' '}
                                <strong style={{color: '#212121'}}>
                                    {getValidDate(data?.invoice_data?.billing_date, 'MMM DD, YYYY')}
                                </strong>
                            </p>
                            <p
                                style={{
                                    boxSizing: 'border-box',
                                    color: '#616161',
                                    fontSize: '8px',
                                    lineHeight: '12px',
                                    fontWeight: 500,
                                    margin: '0px',
                                }}
                            >
                                Due date:{' '}
                                <strong style={{color: '#212121'}}>
                                    {getValidDate(data?.invoice_data?.due_date, 'MMM DD, YYYY')}
                                </strong>
                            </p>
                            <p
                                style={{
                                    boxSizing: 'border-box',
                                    color: '#616161',
                                    fontSize: '8px',
                                    lineHeight: '12px',
                                    fontWeight: 500,
                                    margin: '0px',
                                }}
                            >
                                Invoice no.:
                                <strong style={{color: '#212121'}}>
                                    {data?.invoice_data?.invoice_no ?? '-'}
                                </strong>
                            </p>
                        </div>
                    </div>
                    <div style={{marginTop: '30px'}} />
                    <div
                        style={{
                            border: '1px solid #a5a5a5',
                            borderRadius: '15px',
                            padding: '15px',
                            marginTop: '50px',
                        }}
                    >
                        <div style={{display: 'flex', gap: '15px', overflow: 'auto'}}>
                            <div>
                                <span
                                    style={{
                                        backgroundColor: '#eff1fd',
                                        fontSize: '7px',
                                        lineHeight: '12px',
                                        color: '#212121',
                                        padding: '5px 8px',
                                        borderRadius: '25px',
                                        fontWeight: 500,
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Product
                                </span>
                                <p
                                    className='text-nowrap'
                                    style={{
                                        boxSizing: 'border-box',
                                        color: '#000',
                                        fontSize: '9px',
                                        lineHeight: '14px',
                                        fontWeight: 600,
                                        margin: '0px',
                                        marginTop: '10px',
                                    }}
                                >
                                    Sequifi Payroll
                                </p>
                            </div>
                            <div>
                                <div style={{display: 'flex', gap: '15px'}}>
                                    <div className='text-nowrap'>
                                        <span
                                            style={{
                                                backgroundColor: '#eff1fd',
                                                fontSize: '7px',
                                                lineHeight: '12px',
                                                color: '#212121',
                                                padding: '5px 8px',
                                                borderRadius: '25px',
                                                fontWeight: 500,

                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            Price for
                                        </span>
                                        <p
                                            style={{
                                                boxSizing: 'border-box',
                                                color: '#000',
                                                fontSize: '9px',
                                                lineHeight: '14px',
                                                fontWeight: 600,
                                                margin: '0px',
                                                marginTop: '10px',
                                            }}
                                        >
                                            Unique PIDs:
                                        </p>
                                        <p
                                            style={{
                                                boxSizing: 'border-box',
                                                color: '#000',
                                                fontSize: '9px',
                                                lineHeight: '14px',
                                                fontWeight: 600,
                                                margin: '0px',
                                                marginTop: '0px',
                                            }}
                                        >
                                            M2 Completed:
                                        </p>
                                    </div>
                                    <div>
                                        <span
                                            style={{
                                                backgroundColor: '#eff1fd',
                                                fontSize: '7px',
                                                lineHeight: '12px',
                                                color: '#212121',
                                                padding: '5px 8px',
                                                borderRadius: '25px',
                                                fontWeight: 500,

                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            Listed Price
                                        </span>
                                        <p
                                            style={{
                                                boxSizing: 'border-box',
                                                color: '#838383',
                                                fontSize: '9px',
                                                lineHeight: '14px',
                                                fontWeight: 600,
                                                margin: '0px',
                                                marginTop: '10px',
                                            }}
                                        >
                                            $ {data?.invoice_data?.unique_pid_rack_price} / watt
                                        </p>
                                        <p
                                            style={{
                                                boxSizing: 'border-box',
                                                color: '#838383',
                                                fontSize: '9px',
                                                lineHeight: '14px',
                                                fontWeight: 600,
                                                margin: '0px',
                                                marginTop: '0px',
                                            }}
                                        >
                                            $ {data?.invoice_data?.m2_rack_price} / watt
                                        </p>
                                    </div>
                                    <div>
                                        <span
                                            style={{
                                                backgroundColor: '#eff1fd',
                                                fontSize: '7px',
                                                lineHeight: '12px',
                                                color: '#212121',
                                                padding: '5px 8px',
                                                borderRadius: '25px',
                                                fontWeight: 500,

                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            Discounted Price
                                        </span>
                                        <p
                                            style={{
                                                boxSizing: 'border-box',
                                                color: '#838383',
                                                fontSize: '9px',
                                                lineHeight: '14px',
                                                fontWeight: 600,
                                                margin: '0px',
                                                marginTop: '10px',
                                            }}
                                        >
                                            $ {data?.invoice_data?.unique_pid_discount_price} / watt
                                        </p>
                                        <p
                                            style={{
                                                boxSizing: 'border-box',
                                                color: '#838383',
                                                fontSize: '9px',
                                                lineHeight: '14px',
                                                fontWeight: 600,
                                                margin: '0px',
                                                marginTop: '0px',
                                            }}
                                        >
                                            $ {data?.invoice_data?.m2_discount_price} / watt
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span
                                    style={{
                                        backgroundColor: '#eff1fd',
                                        fontSize: '7px',
                                        lineHeight: '12px',
                                        color: '#212121',
                                        padding: '5px 8px',
                                        borderRadius: '25px',
                                        fontWeight: 500,

                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Amount exc. tax
                                </span>
                                <p
                                    style={{
                                        textAlign: 'center',
                                        boxSizing: 'border-box',
                                        color: '#000',
                                        fontSize: '9px',
                                        lineHeight: '14px',
                                        fontWeight: 600,
                                        margin: '0px',
                                        marginTop: '16px',
                                    }}
                                >
                                    {formattedNumberFields(data?.invoice_data?.amount)}
                                </p>
                            </div>
                            <div>
                                <span
                                    style={{
                                        backgroundColor: '#eff1fd',
                                        fontSize: '7px',
                                        lineHeight: '12px',
                                        color: '#212121',
                                        padding: '5px 8px',
                                        borderRadius: '25px',
                                        fontWeight: 500,

                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Sales Tax (
                                    {formattedNumberFields(data?.invoice_data?.sales_tax_per, '%')})
                                </span>
                                <p
                                    style={{
                                        textAlign: 'center',
                                        boxSizing: 'border-box',
                                        color: '#000',
                                        fontSize: '9px',
                                        lineHeight: '12px',
                                        fontWeight: 600,
                                        margin: '0px',
                                        marginTop: '16px',
                                    }}
                                >
                                    {formattedNumberFields(data?.invoice_data?.sales_tax_amount)}
                                </p>
                            </div>
                            <div>
                                <span
                                    style={{
                                        backgroundColor: '#eff1fd',
                                        fontSize: '7px',
                                        lineHeight: '12px',
                                        color: '#212121',
                                        padding: '5px 8px',
                                        borderRadius: '25px',
                                        fontWeight: 500,
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Total Amount
                                </span>
                                <p
                                    style={{
                                        boxSizing: 'border-box',
                                        color: '#000',
                                        fontSize: '11px',
                                        lineHeight: '14px',
                                        fontWeight: 700,
                                        margin: '0px',
                                        marginTop: '16px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {formattedNumberFields(data?.invoice_data?.grand_total)}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <div style={{marginTop: '10px'}} /> */}
                    <div style={{display: 'flex', justifyContent: 'end'}}>
                        <div
                            style={{
                                border: '1px solid #a5a5a5',
                                borderRadius: '15px',
                                padding: '15px',
                                marginTop: '50px',
                                backgroundColor: '#6078ec',
                                width: '50%',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '10px',
                                    width: '100%',
                                    marginBottom: '10px',
                                    paddingBottom: '10px',
                                    borderBottom: '1px solid #e3e3e3',
                                }}
                            >
                                <p
                                    style={{
                                        boxSizing: 'border-box',
                                        color: '#fff',
                                        fontSize: '10px',
                                        lineHeight: '14px',
                                        fontWeight: 500,
                                        margin: '0px',
                                        textAlign: 'left',
                                    }}
                                >
                                    Amount exc. Tax
                                </p>
                                <p
                                    style={{
                                        boxSizing: 'border-box',
                                        color: '#fff',
                                        fontSize: '10px',
                                        lineHeight: '14px',
                                        fontWeight: 500,
                                        margin: '0px',
                                        textAlign: 'right',
                                    }}
                                >
                                    {formattedNumberFields(data?.invoice_data?.amount)}
                                </p>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '10px',
                                    width: '100%',
                                    marginBottom: '10px',
                                    paddingBottom: '10px',
                                    borderBottom: '1px solid #e3e3e3',
                                }}
                            >
                                <p
                                    style={{
                                        boxSizing: 'border-box',
                                        color: '#fff',
                                        fontSize: '10px',
                                        lineHeight: '14px',
                                        fontWeight: 500,
                                        margin: '0px',
                                        textAlign: 'left',
                                    }}
                                >
                                    Discount
                                </p>
                                <p
                                    style={{
                                        boxSizing: 'border-box',
                                        color: '#fff',
                                        fontSize: '10px',
                                        lineHeight: '14px',
                                        fontWeight: 500,
                                        margin: '0px',
                                        textAlign: 'right',
                                    }}
                                >
                                    {formattedNumberFields(data?.invoice_data?.credit_amount)}
                                </p>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '10px',
                                    width: '100%',
                                    marginBottom: '10px',
                                    paddingBottom: '10px',
                                    borderBottom: '1px solid #e3e3e3',
                                }}
                            >
                                <p
                                    style={{
                                        boxSizing: 'border-box',
                                        color: '#fff',
                                        fontSize: '10px',
                                        lineHeight: '14px',
                                        fontWeight: 500,
                                        margin: '0px',
                                        textAlign: 'left',
                                    }}
                                >
                                    Sales TAX (
                                    {formattedNumberFields(data?.invoice_data?.sales_tax_per, '%')})
                                </p>
                                <p
                                    style={{
                                        boxSizing: 'border-box',
                                        color: '#fff',
                                        fontSize: '10px',
                                        lineHeight: '14px',
                                        fontWeight: 500,
                                        margin: '0px',
                                        textAlign: 'right',
                                    }}
                                >
                                    {formattedNumberFields(data?.invoice_data?.sales_tax_amount)}
                                </p>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '10px',
                                    width: '100%',
                                    marginBottom: '10px',
                                }}
                            >
                                <p
                                    style={{
                                        boxSizing: 'border-box',
                                        color: '#fff',
                                        fontSize: '10px',
                                        lineHeight: '14px',
                                        fontWeight: 700,
                                        margin: '0px',
                                        textAlign: 'left',
                                    }}
                                >
                                    AMOUNT DUE
                                </p>
                                <p
                                    style={{
                                        boxSizing: 'border-box',
                                        color: '#fff',
                                        fontSize: '18px',
                                        lineHeight: '22px',
                                        fontWeight: 800,
                                        margin: '0px',
                                        textAlign: 'right',
                                    }}
                                >
                                    {formattedNumberFields(data?.invoice_data?.grand_total)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        width: '100%',
                        marginTop: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'end',
                    }}
                >
                    <p
                        style={{
                            boxSizing: 'border-box',
                            color: '#616161',
                            fontSize: '12px',
                            lineHeight: '12px',
                            fontWeight: 600,
                            margin: '0px',
                            textAlign: 'center',
                        }}
                    >
                        Thank you for your Business!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ViewBillingInvoice
