import React, {useEffect, useMemo, useState} from 'react'
import {
    convertToMaskedNumber,
    formattedNumberFields,
    formattedPhoneNumber,
} from '../../../../../../../../../helpers/CommonHelpers'
import {IMAGE_URL, getValidDate} from '../../../../../../../../../constants/constants'
import FirstCapital from '../../../../../../../../../customComponents/customText/CustomCaptializer/FirstCapital'

import {Page, Text, Font, View, Document, StyleSheet, Image} from '@react-pdf/renderer'
import {
    getAdjustmentDetailsService,
    getCommissionDetailsService,
    getOverrideDetailsService,
    getPayrollDeductionDetailService,
    getPaystubAdjustmentDetailsService,
    getPaystubCommissionDetailsService,
    getPaystubDeductionDetailService,
    getPaystubOverrideDetailsService,
    getPaystubReimbursementDetailsService,
    getReimbursementDetailsService,
} from '../../../../../../../../../services/Services'

Font.register({
    family: 'Manrope',
    fonts: [{}],
})
const ExportPayStub = ({cardData, payroll_id, commonDataShouldBePassAsBodyInApi}) => {
    const [commissionData, setCommissionData] = useState([])
    const [overridesData, setOverridesData] = useState([])
    const [reimbursementData, serRembusrmentData] = useState([])

    const [deductionData, setDeductionData] = useState([])

    const [adjustmentData, setAdjustmentsData] = useState([])

    useEffect(() => {
        if (commonDataShouldBePassAsBodyInApi?.id) {
            getPaystubCommissionDetailsService(commonDataShouldBePassAsBodyInApi).then((res) =>
                setCommissionData(res?.data?.data)
            )
            getPaystubOverrideDetailsService(commonDataShouldBePassAsBodyInApi).then((res) =>
                setOverridesData(res?.data?.data)
            )
            const body = {
                payroll_id: commonDataShouldBePassAsBodyInApi?.id,
                ...commonDataShouldBePassAsBodyInApi,
            }

            if (body?.user_id && body?.payroll_id) {
                getPaystubDeductionDetailService(body).then((res) => {
                    setDeductionData(res?.data?.list)
                })
            }
            getPaystubAdjustmentDetailsService(commonDataShouldBePassAsBodyInApi).then((res) =>
                setAdjustmentsData(res?.data)
            )
            getPaystubReimbursementDetailsService(commonDataShouldBePassAsBodyInApi).then((res) =>
                serRembusrmentData(res?.data)
            )
        }
    }, [commonDataShouldBePassAsBodyInApi])

    const earingsGrossPay = useMemo(() => {
        let sumPeriodGrossTotal = 0
        let sumYtdGrossTotal = 0
        // Loop through the entries and calculate the sum
        Object.entries(cardData?.earnings ?? {}).forEach(([key, value]) => {
            sumPeriodGrossTotal += value?.period_total || 0
            sumYtdGrossTotal += value?.ytd_total || 0
        })
        return {sumPeriodGrossTotal, sumYtdGrossTotal}
    }, [cardData?.earnings])

    const miscellaneousGrossPay = useMemo(() => {
        let sumPeriodGrossTotal = 0
        let sumYtdGrossTotal = 0

        // Loop through the entries and calculate the sum
        Object.entries(cardData?.miscellaneous ?? {}).forEach(([key, value]) => {
            sumPeriodGrossTotal += value?.period_total || 0
            sumYtdGrossTotal += value?.ytd_total || 0
        })
        return {sumPeriodGrossTotal, sumYtdGrossTotal}
    }, [cardData?.miscellaneous])
    const styles = StyleSheet.create({
        body: {
            paddingTop: 0,
            paddingBottom: 5,
            paddingHorizontal: 5,
        },
        userTable: {
            textAlign: 'left',
            fontSize: 12,
            fontWeight: 500,
            padding: 10,
            width: '100%',
            color: '#000',
        },
        userTableTd: {
            color: '#767373',
            textAlign: 'left',
            fontSize: 10,
            fontWeight: 500,
            width: '100%',
            padding: 3,
        },
    })

    return (
        <Document>
            <Page size='A3'>
                <View className='' style={{height: 'auto'}}>
                    <View className='ii gt'>
                        <View
                            style={{
                                boxSizing: 'border-box',
                                color: '#74787e',
                                height: '100%',
                                lineHeight: '1.4',
                                width: '100%!important',
                                wordBreak: 'break-word',
                                margin: 0,
                                padding: 6,
                                backgroundColor: '#ffffff',
                            }}
                        >
                            <View
                                style={{
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    border: 0,
                                    borderSpacing: 0,
                                }}
                            >
                                <View
                                    style={{
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <View
                                        style={{
                                            boxSizing: 'border-box',
                                            padding: '1rem 2rem',
                                            verticalAlign: 'top',
                                            width: '100%',
                                        }}
                                    >
                                        <View
                                            style={{
                                                boxSizing: 'border-box',
                                                maxWidth: 650,
                                                minWidth: 650,
                                                borderCollapse: 'collapse',
                                                border: '1px solid #f3f0f0',
                                                borderSpacing: 0,
                                                textAlign: 'left',
                                                margin: '0px auto',
                                                borderRadius: 8,
                                            }}
                                        >
                                            <View>
                                                <View
                                                    style={{
                                                        boxSizing: 'border-box',
                                                        padding: '40px 0px 0px',
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            boxSizing: 'border-box',
                                                            padding: 20,
                                                            backgroundColor: 'rgb(255,255,255)',
                                                            borderRadius: 5,
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                boxSizing: 'border-box',
                                                                textAlign: 'left',
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    boxSizing: 'border-box',
                                                                    paddingBottom: 30,
                                                                }}
                                                            >
                                                                <View
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                        justifyContent:
                                                                            'space-between',
                                                                        alignItems: 'center',
                                                                    }}
                                                                >
                                                                    <View>
                                                                        <Text
                                                                            style={{
                                                                                marginBottom: 5,
                                                                                marginTop: 0,
                                                                                color: '#767373',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                            }}
                                                                        >
                                                                            {
                                                                                cardData
                                                                                    ?.CompanyProfile
                                                                                    ?.business_name
                                                                            }
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                marginBottom: 5,
                                                                                marginTop: 0,
                                                                                color: '#767373',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                            }}
                                                                        >
                                                                            {
                                                                                cardData
                                                                                    ?.CompanyProfile
                                                                                    ?.business_address
                                                                            }
                                                                            ,{' '}
                                                                            {
                                                                                cardData
                                                                                    ?.CompanyProfile
                                                                                    ?.business_city
                                                                            }
                                                                            ,
                                                                            {
                                                                                cardData
                                                                                    ?.CompanyProfile
                                                                                    ?.business_state
                                                                            }
                                                                            ,{' '}
                                                                            {cardData
                                                                                ?.CompanyProfile
                                                                                ?.business_zip ==
                                                                            'null'
                                                                                ? null
                                                                                : cardData
                                                                                      ?.CompanyProfile
                                                                                      ?.business_zip}
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                marginBottom: 5,
                                                                                marginTop: 0,
                                                                                color: '#767373',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                            }}
                                                                        >
                                                                            {formattedPhoneNumber(
                                                                                cardData
                                                                                    ?.CompanyProfile
                                                                                    ?.phone_number
                                                                            )}
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                marginBottom: 5,
                                                                                marginTop: 0,
                                                                                color: '#767373',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                            }}
                                                                        >
                                                                            {
                                                                                cardData
                                                                                    ?.CompanyProfile
                                                                                    ?.company_website
                                                                            }
                                                                        </Text>
                                                                    </View>

                                                                    <View
                                                                        style={{
                                                                            textAlign: 'right',
                                                                        }}
                                                                    >
                                                                        <Image
                                                                            src={`${IMAGE_URL}/${cardData?.CompanyProfile?.logo}`}
                                                                            style={{width: 135}}
                                                                        />
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View
                                                            style={{
                                                                boxSizing: 'border-box',
                                                                color: 'rgb(0,0,0)',
                                                                textAlign: 'left',
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    marginBottom: 20,
                                                                    marginTop: 0,
                                                                    color: '#000',
                                                                    fontSize: 14,
                                                                    fontWeight: 500,
                                                                }}
                                                            >
                                                                Pay Date :{' '}
                                                                {getValidDate(
                                                                    cardData?.pay_stub?.pay_date
                                                                )}
                                                            </Text>
                                                            <View
                                                                style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                }}
                                                            >
                                                                <Text
                                                                    style={{
                                                                        width: 150,
                                                                        backgroundColor: '#edf2fd',
                                                                        color: '#5379eb',
                                                                        fontSize: 24,
                                                                        textAlign: 'center',
                                                                        fontWeight: 600,
                                                                        letterSpacing: '1.6',
                                                                        padding: 5,
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                    }}
                                                                >
                                                                    PAY STUB
                                                                </Text>
                                                                <View
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                        alignItems: 'start',
                                                                        justifyContent:
                                                                            'space-between',
                                                                        width: '80%',
                                                                    }}
                                                                >
                                                                    <View>
                                                                        <Text
                                                                            style={{
                                                                                backgroundColor:
                                                                                    '#edf2fd',
                                                                                color: '#5379eb',
                                                                                textAlign: 'center',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                                padding: 5,
                                                                                borderLeft:
                                                                                    '1px solid #fff',
                                                                            }}
                                                                        >
                                                                            Pay Period
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                width: 165,
                                                                                backgroundColor:
                                                                                    '#f7f7f7',
                                                                                color: '#767373',
                                                                                textAlign: 'center',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                                padding: 5,
                                                                                borderLeft:
                                                                                    '1px solid #fff',
                                                                                borderTop:
                                                                                    '1px solid #fff',
                                                                            }}
                                                                        >
                                                                            {getValidDate(
                                                                                cardData?.pay_stub
                                                                                    ?.pay_period_from
                                                                            )}
                                                                            -
                                                                            {getValidDate(
                                                                                cardData?.pay_stub
                                                                                    ?.pay_period_to
                                                                            )}
                                                                        </Text>
                                                                    </View>
                                                                    <View style={{width: '50%'}}>
                                                                        <Text
                                                                            style={{
                                                                                backgroundColor:
                                                                                    '#edf2fd',
                                                                                color: '#5379eb',
                                                                                textAlign: 'center',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                                padding: 5,
                                                                                borderLeft:
                                                                                    '1px solid #fff',
                                                                            }}
                                                                        >
                                                                            Accounts this pay period
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                backgroundColor:
                                                                                    '#f7f7f7',
                                                                                color: '#767373',
                                                                                textAlign: 'center',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                                padding: 5,
                                                                                borderLeft:
                                                                                    '1px solid #fff',
                                                                                borderTop:
                                                                                    '1px solid #fff',
                                                                            }}
                                                                        >
                                                                            {
                                                                                cardData?.pay_stub
                                                                                    ?.period_sale_count
                                                                            }
                                                                        </Text>
                                                                    </View>
                                                                    <View style={{width: '20%'}}>
                                                                        <Text
                                                                            style={{
                                                                                backgroundColor:
                                                                                    '#edf2fd',
                                                                                color: '#5379eb',
                                                                                textAlign: 'center',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                                padding: 5,
                                                                                borderLeft:
                                                                                    '1px solid #fff',
                                                                            }}
                                                                        >
                                                                            YTD
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                backgroundColor:
                                                                                    '#f7f7f7',
                                                                                color: '#767373',
                                                                                textAlign: 'center',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                                padding: 5,
                                                                                borderLeft:
                                                                                    '1px solid #fff',
                                                                                borderTop:
                                                                                    '1px solid #fff',
                                                                            }}
                                                                        >
                                                                            {
                                                                                cardData?.pay_stub
                                                                                    ?.ytd_sale_count
                                                                            }
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            <View style={{marginTop: 50}}>
                                                                <Text
                                                                    style={{
                                                                        marginBottom: 20,
                                                                        marginTop: 0,
                                                                        color: '#767373',
                                                                        fontSize: 14,
                                                                        fontWeight: 500,
                                                                        textAlign: 'center',
                                                                        textDivansform: 'uppercase',
                                                                    }}
                                                                >
                                                                    Employee Information
                                                                </Text>
                                                                <View
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#edf2fd',
                                                                            color: '#5379eb',
                                                                            textAlign: 'left',
                                                                            paddingLeft:
                                                                                '8px !important',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: 130,
                                                                        }}
                                                                    >
                                                                        Employee
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#f7f7f7',
                                                                            color: '#767373',
                                                                            textAlign: 'left',
                                                                            paddingLeft:
                                                                                '8px !important',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                            width: '30%',
                                                                        }}
                                                                    >
                                                                        {
                                                                            cardData?.employee
                                                                                ?.first_name
                                                                        }{' '}
                                                                        {
                                                                            cardData?.employee
                                                                                ?.last_name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#edf2fd',
                                                                            color: '#5379eb',
                                                                            textAlign: 'left',
                                                                            paddingLeft:
                                                                                '8px !important',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: 130,
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        Employee ID
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#f7f7f7',
                                                                            color: '#767373',
                                                                            textAlign: 'left',
                                                                            paddingLeft:
                                                                                '8px !important',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                            width: '30%',
                                                                        }}
                                                                    >
                                                                        {
                                                                            cardData?.employee
                                                                                ?.employee_id
                                                                        }
                                                                    </Text>
                                                                </View>
                                                                <View
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#edf2fd',
                                                                            color: '#5379eb',
                                                                            textAlign: 'left',
                                                                            paddingLeft:
                                                                                '8px !important',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: 130,
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        SSN
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#f7f7f7',
                                                                            color: '#767373',
                                                                            textAlign: 'left',
                                                                            paddingLeft:
                                                                                '8px !important',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                            width: '30%',
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        {convertToMaskedNumber(
                                                                            cardData?.employee
                                                                                ?.social_sequrity_no
                                                                        )}
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#edf2fd',
                                                                            color: '#5379eb',
                                                                            textAlign: 'left',
                                                                            paddingLeft:
                                                                                '8px !important',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: 130,
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        Bank Account
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#f7f7f7',
                                                                            color: '#767373',
                                                                            textAlign: 'left',
                                                                            paddingLeft:
                                                                                '8px !important',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                            width: '30%',
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        {convertToMaskedNumber(
                                                                            cardData?.employee
                                                                                ?.account_no
                                                                        )}
                                                                    </Text>
                                                                </View>
                                                                <View
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#edf2fd',
                                                                            color: '#5379eb',
                                                                            textAlign: 'left',
                                                                            paddingLeft:
                                                                                '8px !important',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: 130,
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        Address
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#f7f7f7',
                                                                            color: '#767373',
                                                                            textAlign: 'left',
                                                                            paddingLeft:
                                                                                '8px !important',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                            width: '86%',
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        {
                                                                            cardData?.employee
                                                                                ?.home_address
                                                                        }
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={{marginTop: 50}}>
                                                                <Text
                                                                    style={{
                                                                        marginBottom: 20,
                                                                        marginTop: 0,
                                                                        color: '#767373',
                                                                        fontSize: 14,
                                                                        fontWeight: 500,
                                                                        textAlign: 'center',
                                                                        textDivansform: 'uppercase',
                                                                    }}
                                                                >
                                                                    Earnings
                                                                </Text>
                                                                <View
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#edf2fd',
                                                                            color: '#5379eb',
                                                                            textAlign: 'center',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: '50%',
                                                                        }}
                                                                    >
                                                                        Description
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#edf2fd',
                                                                            color: '#5379eb',
                                                                            textAlign: 'center',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                            width: '30%',
                                                                        }}
                                                                    >
                                                                        Total
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#edf2fd',
                                                                            color: '#5379eb',
                                                                            textAlign: 'center',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                            width: '20%',
                                                                        }}
                                                                    >
                                                                        YTD
                                                                    </Text>
                                                                </View>
                                                                {cardData?.earnings
                                                                    ? Object.entries(
                                                                          cardData?.earnings
                                                                      ).map(
                                                                          ([key, value]) =>
                                                                              (key !=
                                                                                  'reconciliation' ||
                                                                                  (key ==
                                                                                      'reconciliation' &&
                                                                                      cardData
                                                                                          ?.employee
                                                                                          ?.is_reconciliation)) && (
                                                                                  <View
                                                                                      style={{
                                                                                          display:
                                                                                              'flex',
                                                                                          flexDirection:
                                                                                              'row',
                                                                                      }}
                                                                                  >
                                                                                      <Text
                                                                                          style={{
                                                                                              backgroundColor:
                                                                                                  '#f7f7f7',
                                                                                              color: '#767373',
                                                                                              textAlign:
                                                                                                  'center',
                                                                                              fontSize: 14,
                                                                                              fontWeight: 500,
                                                                                              padding: 5,
                                                                                              width: '50%',
                                                                                              borderTop:
                                                                                                  '1px solid #fff',
                                                                                          }}
                                                                                      >
                                                                                          <FirstCapital
                                                                                              label={
                                                                                                  key
                                                                                              }
                                                                                          />
                                                                                      </Text>
                                                                                      <Text
                                                                                          style={{
                                                                                              backgroundColor:
                                                                                                  '#f7f7f7',
                                                                                              color: '#767373',
                                                                                              textAlign:
                                                                                                  'center',
                                                                                              fontSize: 14,
                                                                                              fontWeight: 500,
                                                                                              padding: 5,
                                                                                              width: '30%',
                                                                                              borderLeft:
                                                                                                  '1px solid #fff',
                                                                                              borderTop:
                                                                                                  '1px solid #fff',
                                                                                          }}
                                                                                      >
                                                                                          {/* {formattedNumberFields(
                                                                                      value?.period_total,
                                                                                      '$'
                                                                                  )} */}
                                                                                          ${' '}
                                                                                          {Number(
                                                                                              value?.period_total
                                                                                          )?.toFixed(
                                                                                              2
                                                                                          )}
                                                                                      </Text>
                                                                                      <Text
                                                                                          style={{
                                                                                              backgroundColor:
                                                                                                  '#f7f7f7',
                                                                                              color: '#767373',
                                                                                              textAlign:
                                                                                                  'center',
                                                                                              fontSize: 14,
                                                                                              fontWeight: 500,
                                                                                              padding: 5,
                                                                                              width: '20%',
                                                                                              borderTop:
                                                                                                  '1px solid #fff',
                                                                                              borderLeft:
                                                                                                  '1px solid #fff',
                                                                                          }}
                                                                                      >
                                                                                          {/* {formattedNumberFields(
                                                                                      value?.ytd_total,
                                                                                      '$'
                                                                                  )} */}
                                                                                          ${' '}
                                                                                          {Number(
                                                                                              value?.ytd_total
                                                                                          )?.toFixed(
                                                                                              2
                                                                                          )}
                                                                                      </Text>
                                                                                  </View>
                                                                              )
                                                                      )
                                                                    : null}

                                                                <View
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#edf2fd',
                                                                            color: '#5379eb',
                                                                            textAlign: 'right',
                                                                            paddingRight:
                                                                                '8px !important',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: '50%',
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        Gross Pay
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#edf2fd',
                                                                            color: '#5379eb',
                                                                            textAlign: 'center',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: '30%',
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        ${' '}
                                                                        {Number(
                                                                            earingsGrossPay?.sumPeriodGrossTotal
                                                                        )?.toFixed(2)}
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#edf2fd',
                                                                            color: '#5379eb',
                                                                            textAlign: 'center',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: '20%',
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        ${' '}
                                                                        {Number(
                                                                            earingsGrossPay?.sumYtdGrossTotal
                                                                        )?.toFixed(2)}
                                                                    </Text>
                                                                </View>
                                                            </View>

                                                            <View style={{marginTop: 50}}>
                                                                <Text
                                                                    style={{
                                                                        marginBottom: 20,
                                                                        marginTop: 0,
                                                                        color: '#767373',
                                                                        fontSize: 14,
                                                                        fontWeight: 500,
                                                                        textAlign: 'center',
                                                                        textDivansform: 'uppercase',
                                                                    }}
                                                                >
                                                                    Deductions
                                                                </Text>
                                                                <View
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#edf2fd',
                                                                            color: '#5379eb',
                                                                            textAlign: 'center',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: '50%',
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        Description
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#edf2fd',
                                                                            color: '#5379eb',
                                                                            textAlign: 'center',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: '30%',
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        Total
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#edf2fd',
                                                                            color: '#5379eb',
                                                                            textAlign: 'center',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: '20%',
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        YTD
                                                                    </Text>
                                                                </View>
                                                                <View
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#f7f7f7',
                                                                            color: '#767373',
                                                                            textAlign: 'center',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: '50%',
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        Standard Deductions
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#f7f7f7',
                                                                            color:
                                                                                Number(
                                                                                    cardData
                                                                                        ?.deduction
                                                                                        ?.standard_deduction
                                                                                        ?.period_total
                                                                                ) >= 0
                                                                                    ? '#767373'
                                                                                    : 'red',
                                                                            textAlign: 'center',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: '30%',
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        ${' '}
                                                                        {Number(
                                                                            cardData?.deduction
                                                                                ?.standard_deduction
                                                                                ?.period_total
                                                                        )?.toFixed(2)}
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#f7f7f7',
                                                                            color:
                                                                                Number(
                                                                                    cardData
                                                                                        ?.deduction
                                                                                        ?.standard_deduction
                                                                                        ?.ytd_total
                                                                                ) >= 0
                                                                                    ? '#767373'
                                                                                    : 'red',
                                                                            textAlign: 'center',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            padding: 5,
                                                                            width: '20%',
                                                                            borderTop:
                                                                                '1px solid #fff',
                                                                            borderLeft:
                                                                                '1px solid #fff',
                                                                        }}
                                                                    >
                                                                        ${' '}
                                                                        {Number(
                                                                            cardData?.deduction
                                                                                ?.standard_deduction
                                                                                ?.ytd_total
                                                                        )?.toFixed(2)}
                                                                    </Text>
                                                                </View>
                                                            </View>

                                                            <View
                                                                style={{
                                                                    display: 'flex',
                                                                    marginTop: 20,
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <View
                                                                    style={{
                                                                        marginTop: 40,
                                                                        width: '70%',
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            marginBottom: 10,
                                                                            marginTop: 0,
                                                                            color: '#767373',
                                                                            fontSize: 14,
                                                                            fontWeight: 500,
                                                                            textAlign: 'center',
                                                                            textDivansform:
                                                                                'uppercase',
                                                                        }}
                                                                    >
                                                                        MISCELLANEOUS
                                                                    </Text>
                                                                    <View
                                                                        style={{
                                                                            display: 'flex',
                                                                            flexDirection: 'row',
                                                                        }}
                                                                    >
                                                                        <Text
                                                                            style={{
                                                                                backgroundColor:
                                                                                    '#edf2fd',
                                                                                color: '#5379eb',
                                                                                textAlign: 'center',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                                padding: 5,
                                                                                width: '50%',
                                                                            }}
                                                                        >
                                                                            Description
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                backgroundColor:
                                                                                    '#edf2fd',
                                                                                color: '#5379eb',
                                                                                textAlign: 'center',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                                padding: 5,
                                                                                borderLeft:
                                                                                    '1px solid #fff',
                                                                                width: '30%',
                                                                            }}
                                                                        >
                                                                            Total
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                backgroundColor:
                                                                                    '#edf2fd',
                                                                                color: '#5379eb',
                                                                                textAlign: 'center',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                                padding: 5,
                                                                                borderLeft:
                                                                                    '1px solid #fff',
                                                                                width: '20%',
                                                                            }}
                                                                        >
                                                                            YTD
                                                                        </Text>
                                                                    </View>
                                                                    {cardData?.miscellaneous
                                                                        ? Object.entries(
                                                                              cardData?.miscellaneous
                                                                          ).map(([key, value]) => (
                                                                              <View
                                                                                  style={{
                                                                                      display:
                                                                                          'flex',
                                                                                      flexDirection:
                                                                                          'row',
                                                                                  }}
                                                                              >
                                                                                  <Text
                                                                                      style={{
                                                                                          backgroundColor:
                                                                                              '#f7f7f7',
                                                                                          color: '#767373',
                                                                                          textAlign:
                                                                                              'center',
                                                                                          fontSize: 14,
                                                                                          fontWeight: 500,
                                                                                          padding: 5,
                                                                                          width: '50%',
                                                                                          borderTop:
                                                                                              '1px solid #fff',
                                                                                      }}
                                                                                  >
                                                                                      <FirstCapital
                                                                                          label={
                                                                                              key
                                                                                          }
                                                                                      />
                                                                                  </Text>
                                                                                  <Text
                                                                                      style={{
                                                                                          backgroundColor:
                                                                                              '#f7f7f7',
                                                                                          color:
                                                                                              Number(
                                                                                                  value?.period_total
                                                                                              ) >= 0
                                                                                                  ? '#767373'
                                                                                                  : 'red',
                                                                                          textAlign:
                                                                                              'center',
                                                                                          fontSize: 14,
                                                                                          fontWeight: 500,
                                                                                          padding: 5,
                                                                                          width: '30%',
                                                                                          borderLeft:
                                                                                              '1px solid #fff',
                                                                                          borderTop:
                                                                                              '1px solid #fff',
                                                                                      }}
                                                                                  >
                                                                                      {/* {formattedNumberFields(
                                                                                      value?.period_total,
                                                                                      '$'
                                                                                  )} */}
                                                                                      ${' '}
                                                                                      {Number(
                                                                                          value?.period_total
                                                                                      )?.toFixed(2)}
                                                                                  </Text>
                                                                                  <Text
                                                                                      style={{
                                                                                          backgroundColor:
                                                                                              '#f7f7f7',
                                                                                          color:
                                                                                              Number(
                                                                                                  value?.ytd_total
                                                                                              ) >= 0
                                                                                                  ? '#767373'
                                                                                                  : 'red',
                                                                                          textAlign:
                                                                                              'center',
                                                                                          fontSize: 14,
                                                                                          fontWeight: 500,
                                                                                          padding: 5,
                                                                                          width: '20%',
                                                                                          borderTop:
                                                                                              '1px solid #fff',
                                                                                          borderLeft:
                                                                                              '1px solid #fff',
                                                                                      }}
                                                                                  >
                                                                                      {/* {formattedNumberFields(
                                                                                      value?.ytd_total,
                                                                                      '$'
                                                                                  )} */}
                                                                                      ${' '}
                                                                                      {Number(
                                                                                          value?.ytd_total
                                                                                      )?.toFixed(2)}
                                                                                  </Text>
                                                                              </View>
                                                                          ))
                                                                        : null}
                                                                    <View
                                                                        style={{
                                                                            display: 'flex',
                                                                            flexDirection: 'row',
                                                                        }}
                                                                    >
                                                                        <Text
                                                                            style={{
                                                                                backgroundColor:
                                                                                    '#edf2fd',
                                                                                color: '#5379eb',
                                                                                textAlign: 'right',
                                                                                paddingRight:
                                                                                    '8px !important',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                                padding: 5,
                                                                                width: '50%',
                                                                                borderTop:
                                                                                    '1px solid #fff',
                                                                            }}
                                                                        >
                                                                            Total
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                backgroundColor:
                                                                                    '#edf2fd',
                                                                                color:
                                                                                    miscellaneousGrossPay?.sumPeriodGrossTotal >=
                                                                                    0
                                                                                        ? '#5379eb'
                                                                                        : 'red',
                                                                                textAlign: 'center',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                                padding: 5,
                                                                                width: '30%',
                                                                                borderTop:
                                                                                    '1px solid #fff',
                                                                                borderLeft:
                                                                                    '1px solid #fff',
                                                                            }}
                                                                        >
                                                                            ${' '}
                                                                            {
                                                                                miscellaneousGrossPay?.sumPeriodGrossTotal
                                                                            }
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                backgroundColor:
                                                                                    '#edf2fd',
                                                                                color:
                                                                                    miscellaneousGrossPay?.sumYtdGrossTotal >=
                                                                                    0
                                                                                        ? '#5379eb'
                                                                                        : 'red',
                                                                                textAlign: 'center',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                                padding: 5,
                                                                                width: '20%',
                                                                                borderTop:
                                                                                    '1px solid #fff',
                                                                                borderLeft:
                                                                                    '1px solid #fff',
                                                                            }}
                                                                        >
                                                                            ${' '}
                                                                            {
                                                                                miscellaneousGrossPay?.sumYtdGrossTotal
                                                                            }
                                                                        </Text>
                                                                    </View>
                                                                </View>

                                                                <View
                                                                    style={{
                                                                        width: '40%',
                                                                        textAlign: 'right',
                                                                        padding: 40,
                                                                      paddingTop: '11px'
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            marginBottom: 10,
                                                                            marginTop: 0,
                                                                            color: '#767373',
                                                                            fontSize: 16,
                                                                            fontWeight: 500,
                                                                            textAlign: 'center',
                                                                            textTransform:
                                                                                'uppercase',
                                                                        }}
                                                                    >
                                                                        NET PAY
                                                                    </Text>
                                                                    <View>
                                                                        <Text
                                                                            style={{
                                                                                backgroundColor:
                                                                                    '#edf2fd',
                                                                                color: '#5379eb',
                                                                                textAlign: 'center',
                                                                                fontSize: 14,
                                                                                fontWeight: 500,
                                                                                padding: 5,
                                                                            }}
                                                                        >
                                                                            TOTAL
                                                                        </Text>
                                                                    </View>
                                                                    <View>
                                                                        <Text
                                                                            style={{
                                                                                backgroundColor:
                                                                                    '#f7f7f7',
                                                                                color:
                                                                                    cardData
                                                                                        ?.pay_stub
                                                                                        ?.net_pay >=
                                                                                    0
                                                                                        ? '#000'
                                                                                        : 'red',
                                                                                textAlign: 'center',
                                                                                fontSize: 17,
                                                                                fontWeight: 500,
                                                                                padding: 5,
                                                                            }}
                                                                        >
                                                                            $
                                                                            {Number(
                                                                                cardData?.pay_stub
                                                                                    ?.net_pay
                                                                            )?.toFixed(2)}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={{
                                                            boxSizing: 'border-box',
                                                            paddingTop: 20,
                                                            color: 'rgb(153,153,153)',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                marginTop: 40,
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    marginBottom: 10,
                                                                    marginTop: 0,
                                                                    color: '#767373',
                                                                    fontSize: 14,
                                                                    fontWeight: 500,
                                                                    textAlign: 'start',
                                                                    textTransform: 'uppercase',
                                                                    marginLeft: 10,
                                                                }}
                                                            >
                                                                Commission
                                                            </Text>
                                                            <View
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    flexDirection: 'row',
                                                                    backgroundColor: '#ededed',
                                                                    width: '100%',
                                                                    padding: 2,
                                                                    marginLeft: 2,
                                                                    marginRight: 2,
                                                                }}
                                                            >
                                                                <Text style={styles.userTable}>
                                                                    PID
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Customer
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    State
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Rep Redline
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Kw
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Net EPC
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Adders
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Amount
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Adjustments
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Type
                                                                </Text>
                                                            </View>

                                                            {commissionData?.length > 0
                                                                ? commissionData?.map((item, i) => (
                                                                      <View
                                                                          style={{
                                                                              display: 'flex',
                                                                              justifyContent:
                                                                                  'space-between',
                                                                              flexDirection: 'row',
                                                                              backgroundColor:
                                                                                  '#f9f9f9',
                                                                              width: '100%',
                                                                              padding: 2,
                                                                              marginLeft: 2,
                                                                              marginRight: 2,
                                                                              alignItems:
                                                                                  'flex-start',
                                                                          }}
                                                                      >
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.pid}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.customer_name}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.customer_state ??
                                                                                  '-'}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.rep_redline ??
                                                                                  '-'}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.kw ?? '-'}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.net_epc ?? '-'}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              ${' '}
                                                                              {Number(
                                                                                  item?.adders
                                                                              )?.toFixed(2)}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              ${' '}
                                                                              {Number(
                                                                                  item?.amount
                                                                              )?.toFixed(2)}{' '}
                                                                              {getValidDate(
                                                                                  item?.date
                                                                              )}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {Number(
                                                                                  item?.adjustAmount ??
                                                                                      0
                                                                              )?.toFixed(2)}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.amount_type}
                                                                          </Text>
                                                                      </View>
                                                                  ))
                                                                : null}
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={{
                                                            boxSizing: 'border-box',
                                                            paddingTop: 25,
                                                            color: 'rgb(153,153,153)',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                marginTop: 40,
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    marginBottom: 10,
                                                                    marginTop: 0,
                                                                    color: '#767373',
                                                                    fontSize: 14,
                                                                    fontWeight: 500,
                                                                    textAlign: 'start',
                                                                    textTransform: 'uppercase',
                                                                    marginLeft: 10,
                                                                }}
                                                            >
                                                                Overrides
                                                            </Text>
                                                            <View
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    flexDirection: 'row',
                                                                    backgroundColor: '#ededed',
                                                                    width: '100%',
                                                                    padding: 2,
                                                                    marginLeft: 2,
                                                                    marginRight: 2,
                                                                }}
                                                            >
                                                                <Text style={styles.userTable}>
                                                                    PID
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Customer Name
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Override Over
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Type
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    KW installed
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Override
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Total Amount
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Adjustment
                                                                </Text>
                                                            </View>

                                                            {overridesData?.length > 0
                                                                ? overridesData?.map((item, i) => (
                                                                      <View
                                                                          style={{
                                                                              display: 'flex',
                                                                              justifyContent:
                                                                                  'space-between',
                                                                              flexDirection: 'row',
                                                                              backgroundColor:
                                                                                  '#f9f9f9',
                                                                              width: '100%',
                                                                              padding: 2,
                                                                              marginLeft: 2,
                                                                              marginRight: 2,
                                                                          }}
                                                                      >
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.pid}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.customer_name}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.first_name}{' '}
                                                                              {item?.last_name}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.type ?? '-'}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.kw_installed ??
                                                                                  '-'}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.type == 'Stack'
                                                                                  ? `${Number(
                                                                                        item?.calculated_redline ??
                                                                                            0
                                                                                    )?.toFixed(
                                                                                        2
                                                                                    )} per watt`
                                                                                  : `${Number(
                                                                                        item?.override_amount
                                                                                    )?.toFixed(
                                                                                        2
                                                                                    )} ${
                                                                                        item?.override_type
                                                                                    }`}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              ${' '}
                                                                              {Number(
                                                                                  item?.total_amount
                                                                              )?.toFixed(2)}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              ${' '}
                                                                              {Number(
                                                                                  item?.override_adjustment
                                                                              )?.toFixed(2)}{' '}
                                                                              {/* {getValidDate(
                                                                                  item?.date
                                                                              )} */}
                                                                          </Text>
                                                                      </View>
                                                                  ))
                                                                : null}
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={{
                                                            boxSizing: 'border-box',
                                                            paddingTop: 25,
                                                            color: 'rgb(153,153,153)',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                marginTop: 40,
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    marginBottom: 10,
                                                                    marginTop: 0,
                                                                    color: '#767373',
                                                                    fontSize: 14,
                                                                    fontWeight: 500,
                                                                    textAlign: 'start',
                                                                    textTransform: 'uppercase',
                                                                    marginLeft: 10,
                                                                }}
                                                            >
                                                                Deduction
                                                            </Text>
                                                            <View
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    flexDirection: 'row',
                                                                    backgroundColor: '#ededed',
                                                                    width: '100%',
                                                                    padding: 2,
                                                                    marginLeft: 2,
                                                                    marginRight: 2,
                                                                }}
                                                            >
                                                                <Text style={styles.userTable}>
                                                                    Type
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Amount
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Limit
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Total
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Outstanding
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Adjustment
                                                                </Text>
                                                            </View>

                                                            {deductionData?.length > 0
                                                                ? deductionData?.map((item, i) => (
                                                                      <View
                                                                          style={{
                                                                              display: 'flex',
                                                                              justifyContent:
                                                                                  'space-between',
                                                                              flexDirection: 'row',
                                                                              backgroundColor:
                                                                                  '#f9f9f9',
                                                                              width: '100%',
                                                                              padding: 2,
                                                                              marginLeft: 2,
                                                                              marginRight: 2,
                                                                          }}
                                                                      >
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.Type}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {Number(
                                                                                  item?.Amount
                                                                              )?.toFixed(2)}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.Limit}{' '}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {Number(
                                                                                  item?.Total
                                                                              )?.toFixed(2)}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.Outstanding ??
                                                                                  '-'}
                                                                          </Text>

                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              ${' '}
                                                                              {Number(
                                                                                  item?.amount
                                                                              )?.toFixed(2)}
                                                                          </Text>
                                                                      </View>
                                                                  ))
                                                                : null}
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={{
                                                            boxSizing: 'border-box',
                                                            paddingTop: 25,
                                                            color: 'rgb(153,153,153)',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                marginTop: 40,
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    marginBottom: 10,
                                                                    marginTop: 0,
                                                                    color: '#767373',
                                                                    fontSize: 14,
                                                                    fontWeight: 500,
                                                                    textAlign: 'start',
                                                                    textTransform: 'uppercase',
                                                                    marginLeft: 10,
                                                                }}
                                                            >
                                                                Adjustments
                                                            </Text>
                                                            <View
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    flexDirection: 'row',
                                                                    backgroundColor: '#ededed',
                                                                    width: '100%',
                                                                    padding: 2,
                                                                    marginLeft: 2,
                                                                    marginRight: 2,
                                                                }}
                                                            >
                                                                <Text style={styles.userTable}>
                                                                    Approved By
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Date
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Type
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Amount
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Description
                                                                </Text>
                                                            </View>

                                                            {adjustmentData?.length > 0
                                                                ? adjustmentData?.map((item, i) => (
                                                                      <View
                                                                          style={{
                                                                              display: 'flex',
                                                                              justifyContent:
                                                                                  'space-between',
                                                                              flexDirection: 'row',
                                                                              backgroundColor:
                                                                                  '#f9f9f9',
                                                                              width: '100%',
                                                                              padding: 2,
                                                                              marginLeft: 2,
                                                                              marginRight: 2,
                                                                          }}
                                                                      >
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.first_name}{' '}
                                                                              {item?.last_name ??
                                                                                  '-'}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {getValidDate(
                                                                                  item?.date
                                                                              )}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.type}{' '}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {Number(
                                                                                  item?.amount
                                                                              )?.toFixed(2)}
                                                                          </Text>
                                                                          <Text
                                                                              style={
                                                                                  styles.userTableTd
                                                                              }
                                                                          >
                                                                              {item?.description ??
                                                                                  '-'}
                                                                          </Text>
                                                                      </View>
                                                                  ))
                                                                : null}
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={{
                                                            boxSizing: 'border-box',
                                                            paddingTop: 25,
                                                            color: 'rgb(153,153,153)',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                marginTop: 40,
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    marginBottom: 10,
                                                                    marginTop: 0,
                                                                    color: '#767373',
                                                                    fontSize: 14,
                                                                    fontWeight: 500,
                                                                    textAlign: 'start',
                                                                    textTransform: 'uppercase',
                                                                    marginLeft: 10,
                                                                }}
                                                            >
                                                                Reimbursements
                                                            </Text>
                                                            <View
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    flexDirection: 'row',
                                                                    backgroundColor: '#ededed',
                                                                    width: '100%',
                                                                    padding: 2,
                                                                    marginLeft: 2,
                                                                    marginRight: 2,
                                                                }}
                                                            >
                                                                <Text style={styles.userTable}>
                                                                    Approved By
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Date
                                                                </Text>

                                                                <Text style={styles.userTable}>
                                                                    Amount
                                                                </Text>
                                                                <Text style={styles.userTable}>
                                                                    Description
                                                                </Text>
                                                            </View>

                                                            {reimbursementData?.length > 0
                                                                ? reimbursementData?.map(
                                                                      (item, i) => (
                                                                          <View
                                                                              style={{
                                                                                  display: 'flex',
                                                                                  justifyContent:
                                                                                      'space-between',
                                                                                  flexDirection:
                                                                                      'row',
                                                                                  backgroundColor:
                                                                                      '#f9f9f9',
                                                                                  width: '100%',
                                                                                  padding: 2,
                                                                                  marginLeft: 2,
                                                                                  marginRight: 2,
                                                                              }}
                                                                          >
                                                                              <Text
                                                                                  style={
                                                                                      styles.userTableTd
                                                                                  }
                                                                              >
                                                                                  {item?.first_name}{' '}
                                                                                  {item?.last_name ??
                                                                                      '-'}
                                                                              </Text>
                                                                              <Text
                                                                                  style={
                                                                                      styles.userTableTd
                                                                                  }
                                                                              >
                                                                                  {getValidDate(
                                                                                      item?.date
                                                                                  )}
                                                                              </Text>

                                                                              <Text
                                                                                  style={
                                                                                      styles.userTableTd
                                                                                  }
                                                                              >
                                                                                  {Number(
                                                                                      item?.amount
                                                                                  )?.toFixed(2)}
                                                                              </Text>
                                                                              <Text
                                                                                  style={
                                                                                      styles.userTableTd
                                                                                  }
                                                                              >
                                                                                  {item?.description ??
                                                                                      '-'}
                                                                              </Text>
                                                                          </View>
                                                                      )
                                                                  )
                                                                : null}
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default ExportPayStub
