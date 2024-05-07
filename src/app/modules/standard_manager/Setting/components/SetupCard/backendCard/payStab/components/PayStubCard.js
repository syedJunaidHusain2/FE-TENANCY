import React, {useMemo, useRef} from 'react'
import {
    IMAGE_TYPE,
    convertToMaskedNumber,
    formattedNumberFields,
    formattedPhoneNumber,
} from '../../../../../../../../../helpers/CommonHelpers'
import CustomImage from '../../../../../../../../../customComponents/customImage/CustomImage'
import {getValidDate} from '../../../../../../../../../constants/constants'
import FirstCapital from '../../../../../../../../../customComponents/customText/CustomCaptializer/FirstCapital'
import {useSelector} from 'react-redux'
import {getCompanySettingSelector} from '../../../../../../../../../redux/selectors/SettingsSelectors'
import PrintOrDownloadPDF from '../../../../../../../../../integrations/jspdf/PrintOrDownloadPDF'

const PayStubCard = ({cardData, onSectionPress = () => {}}) => {
    const viewInvoiceRef = useRef()

    const companySetting = useSelector(getCompanySettingSelector)

    const downloadPdf = () => {
        viewInvoiceRef?.current?.downloadPdf()
    }

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

    return (
        <>
            {!Array.isArray(cardData) ? (
                <div
                    className='card shadow-sm w-sm-75 mx-auto p-sm-10 p-3'
                    style={{fontSize: '14px', fontFamily: 'Manrope', fontWeight: '600'}}
                >
                    {/* Heading */}
                    <PrintOrDownloadPDF ref={viewInvoiceRef} fileName={`paystub.pdf`}>
                        <div className='fs-1 fw-bold page' onClick={downloadPdf}>
                            dowload
                        </div>
                    </PrintOrDownloadPDF>

                    <div className='d-flex flex-wrap flex-md-row flex-column-reverse justify-content-between align-items-center gap-10 mb-10'>
                        <div className='text-cmGrey700'>
                            <div>{cardData?.CompanyProfile?.business_name}</div>
                            <div>
                                {cardData?.CompanyProfile?.business_address},{' '}
                                {cardData?.CompanyProfile?.business_city},
                                {cardData?.CompanyProfile?.business_state},{' '}
                                {cardData?.CompanyProfile?.business_zip == 'null'
                                    ? null
                                    : cardData?.CompanyProfile?.business_zip}
                            </div>
                            <div>
                                {formattedPhoneNumber(cardData?.CompanyProfile?.phone_number)}
                            </div>

                            <div>{cardData?.CompanyProfile?.company_website}</div>
                        </div>
                        <div>
                            <CustomImage
                                type={IMAGE_TYPE.companyLogo}
                                src={cardData?.CompanyProfile?.logo}
                                style={{height: '150px', with: '150px'}}
                            />
                        </div>
                    </div>
                    {/* Pay Stub table */}
                    <div className='text-cmGrey900' style={{fontWeight: 900}}>
                        Pay Date: {getValidDate(cardData?.pay_stub?.pay_date)}
                    </div>
                    <div className='table-responsive overflow-auto mb-5 '>
                        <table className='table border border-cmwhite border-4 w-100'>
                            <tbody>
                                <tr className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola text-center'>
                                    <th
                                        rowSpan='2'
                                        className='py-5 px-1'
                                        style={{
                                            fontSize: '30px',
                                            fontWeight: '700',
                                            letterSpacing: '8px',
                                        }}
                                    >
                                        PAY STUB
                                    </th>
                                    <th>Pay Period</th>
                                    <th>Accounts this pay period</th>
                                    <th className='px-5'>YTD</th>
                                </tr>
                                <tr className='bg-cmGrey100 text-center text-cmGrey700 border border-cmwhite border-4 '>
                                    <td>
                                        {getValidDate(cardData?.pay_stub?.pay_period_from)}-
                                        {getValidDate(cardData?.pay_stub?.pay_period_to)}
                                    </td>
                                    <td>{cardData?.pay_stub?.period_sale_count}</td>
                                    <td>{cardData?.pay_stub?.ytd_sale_count}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* EMPLOYEE INFORMATION */}
                    <div className='mb-10'>
                        <div
                            className='text-cmGrey700 text-center mb-2'
                            style={{letterSpacing: '1px'}}
                        >
                            EMPLOYEE INFORMATION
                        </div>
                        <div className='table-responsive  overflow-auto'>
                            <table className='table  w-100 text-cmGrey700'>
                                <tbody>
                                    <tr className='border border-cmwhite border-4 '>
                                        <th className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola px-1 ps-5 py-3'>
                                            Employee
                                        </th>
                                        <td className='bg-cmGrey100 ps-5'>
                                            {cardData?.employee?.first_name}{' '}
                                            {cardData?.employee?.last_name}
                                        </td>
                                        <th className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola px-1 py-3 ps-5'>
                                            Employee ID
                                        </th>
                                        <td className='bg-cmGrey100 ps-5'>
                                            {cardData?.employee?.employee_id}
                                        </td>
                                    </tr>
                                    <tr className='border border-cmwhite border-4'>
                                        <th className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola px-1 py-3 ps-5'>
                                            SSN
                                        </th>
                                        <td className='bg-cmGrey100 ps-5'>
                                            {convertToMaskedNumber(
                                                cardData?.employee?.social_sequrity_no
                                            )}
                                        </td>
                                        <th className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola px-1 py-3 ps-5'>
                                            Bank Account
                                        </th>
                                        <td className='bg-cmGrey100 ps-5'>
                                            {convertToMaskedNumber(cardData?.employee?.account_no)}
                                        </td>
                                    </tr>
                                    <tr className='border border-cmwhite border-4'>
                                        <th className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola px-1 py-3 ps-5'>
                                            Address
                                        </th>
                                        <td className='bg-cmGrey100 ps-5' colSpan={3}>
                                            {cardData?.employee?.home_address}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* EARNINGS */}
                    <div className='mb-10'>
                        <div
                            className='text-cmGrey700 text-center mb-2'
                            style={{letterSpacing: '1px'}}
                        >
                            EARNINGS
                        </div>
                        <div className='table-responsive  overflow-auto'>
                            <table className='table w-100 text-cmGrey700 text-center '>
                                <tbody>
                                    <tr className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola'>
                                        <th className='px-1 py-3 ps-5 border border-bottom-0 border-4 border-cmwhite'>
                                            Description
                                        </th>
                                        <th className='px-1 py-3 ps-5 border border-bottom-0 border-4 border-cmwhite'>
                                            TOTAL
                                        </th>
                                        <th className='px-1 py-3 ps-5 border border-bottom-0 border-4 border-cmwhite'>
                                            YTD
                                        </th>
                                    </tr>

                                    {cardData?.earnings
                                        ? Object.entries(cardData?.earnings).map(([key, value]) =>
                                              key != 'reconciliation' ? (
                                                  <tr
                                                      className={`bg-cmGrey100 border border-cmwhite border-4`}
                                                  >
                                                      <td
                                                          onClick={() => {
                                                              onSectionPress(key)
                                                          }}
                                                        //   className= {`${key == 'commission' ? 'border-cmSuccess border-end-0' : ''}`}
                                                      >
                                                          <FirstCapital label={key} />
                                                      </td>

                                                      <td
                                                          onClick={() => {
                                                              onSectionPress(key)
                                                          }}
                                                        //   className='px-1 py-3 ps-5'
                                                        //   className= {`${key == 'commission' ? 'border-cmSuccess border-start-0 border-end-0' : ''}`}
                                                      >
                                                          {formattedNumberFields(
                                                              value?.period_total,
                                                              '$'
                                                          )}
                                                      </td>
                                                      <td 
                                                    //   className='px-1 py-3 ps-5'
                                                    //   className= {`${key == 'commission' ? 'border-cmSuccess border-start-0' : ''}`}
                                                      >
                                                          {formattedNumberFields(
                                                              value?.ytd_total,
                                                              '$'
                                                          )}
                                                      </td>
                                                  </tr>
                                              ) : key == 'reconciliation' &&
                                                companySetting?.reconciliation &&
                                                cardData?.employee?.is_reconciliation ? (
                                                  <tr className='bg-cmGrey100 border border-cmwhite border-4'>
                                                      <td
                                                          onClick={() => {
                                                              onSectionPress(key)
                                                          }}
                                                          className='px-1 py-3 ps-5 cursor-pointer'
                                                      >
                                                          <FirstCapital label={key} />
                                                      </td>
                                                      <td
                                                          onClick={() => {
                                                              onSectionPress(key)
                                                          }}
                                                          className='px-1 py-3 ps-5'
                                                      >
                                                          {formattedNumberFields(
                                                              value?.period_total,
                                                              '$'
                                                          )}
                                                      </td>
                                                      <td className='px-1 py-3 ps-5'>
                                                          {formattedNumberFields(
                                                              value?.ytd_total,
                                                              '$'
                                                          )}
                                                      </td>
                                                  </tr>
                                              ) : null
                                          )
                                        : null}

                                    <tr
                                        className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola border border-cmwhite border-4'
                                        style={{fontWeight: '800'}}
                                    >
                                        <th className='px-1 py-3 px-5 text-end'>Gross Pay</th>
                                        <th className='px-1 py-3 ps-5'>
                                            {formattedNumberFields(
                                                earingsGrossPay?.sumPeriodGrossTotal,
                                                '$'
                                            )}
                                        </th>
                                        <th className='px-1 py-3 ps-5'>
                                            {formattedNumberFields(
                                                earingsGrossPay?.sumYtdGrossTotal,
                                                '$'
                                            )}
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* DEDUCTIONS */}
                    <div className='mb-10'>
                        <div
                            className='text-cmGrey700 text-center mb-2'
                            style={{letterSpacing: '1px'}}
                        >
                            DEDUCTIONS
                        </div>
                        <div className='table-responsive  overflow-auto'>
                            <table className='table  w-100 text-cmGrey700 text-center '>
                                <tbody>
                                    <tr className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola border border-cmwhite border-4'>
                                        <th className='px-1 py-3 ps-5'>Description</th>
                                        <th className='px-1 py-3 ps-5'>TOTAL</th>
                                        <th className='px-1 py-3 ps-5'>YTD</th>
                                    </tr>
                                    <tr className='bg-cmGrey100 border border-cmwhite border-4'>
                                        <td
                                            onClick={() => {
                                                onSectionPress('deduction')
                                            }}
                                            className='px-1 py-3 ps-5 text-cmGrey800 cursor-pointer'
                                        >
                                            Standard Deductions
                                        </td>
                                        <td
                                            onClick={() => {
                                                onSectionPress('deduction')
                                            }}
                                            className='px-1 py-3 ps-5 '
                                        >
                                            {formattedNumberFields(
                                                cardData?.deduction?.standard_deduction
                                                    ?.period_total,
                                                '$'
                                            )}
                                        </td>
                                        <td className='px-1 py-3 ps-5'>
                                            {formattedNumberFields(
                                                cardData?.deduction?.standard_deduction?.ytd_total,
                                                '$'
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* MISCELLANEOUS*/}
                    <div className='d-flex flex-wrap'>
                        <div className='w-sm-75 overflow-auto mb-sm-0 mb-5 '>
                            <div
                                className='text-cmGrey700 text-center mb-2'
                                style={{letterSpacing: '1px'}}
                            >
                                MISCELLANEOUS
                            </div>
                            <div className='table-responsive  overflow-auto'>
                                <table className='table  w-100 text-cmGrey700 text-center'>
                                    <tbody>
                                        <tr className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola border border-cmwhite border-4'>
                                            <th className='px-1 py-3 ps-5'>Description</th>
                                            <th className='px-1 py-3 ps-5'>Amount</th>
                                            <th className='px-1 py-3 ps-5'>YTD</th>
                                        </tr>
                                        {cardData?.miscellaneous
                                            ? Object.entries(cardData?.miscellaneous).map(
                                                  ([key, value]) => (
                                                      <tr className='bg-cmGrey100 border-cmwhite border-4'>
                                                          <td
                                                              onClick={() => {
                                                                  onSectionPress(key)
                                                              }}
                                                              className='px-1 py-3 ps-5 cursor-pointer'
                                                          >
                                                              <FirstCapital label={key} />
                                                          </td>
                                                          <td
                                                              onClick={() => {
                                                                  onSectionPress(key)
                                                              }}
                                                              className='px-1 py-3 ps-5'
                                                          >
                                                              {formattedNumberFields(
                                                                  value?.period_total,
                                                                  '$'
                                                              )}
                                                          </td>
                                                          <td className='px-1 py-3 ps-5'>
                                                              {formattedNumberFields(
                                                                  value?.ytd_total,
                                                                  '$'
                                                              )}
                                                          </td>
                                                      </tr>
                                                  )
                                              )
                                            : null}
                                        <tr
                                            className='bg-cmBlue-Crayola bg-opacity-15 text-cmBlue-Crayola border border-cmwhite border-4'
                                            style={{fontWeight: '800'}}
                                        >
                                            <th className='px-1 py-3 px-5 text-end'>Total</th>
                                            <th className='px-1 py-3 ps-5'>
                                                {formattedNumberFields(
                                                    miscellaneousGrossPay?.sumPeriodGrossTotal,
                                                    '$'
                                                )}
                                            </th>
                                            <th className='px-1 py-3 ps-5'>
                                                {formattedNumberFields(
                                                    miscellaneousGrossPay?.sumYtdGrossTotal,
                                                    '$'
                                                )}
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='mx-auto'>
                            <div
                                className='text-cmGrey700 mb-2 text-center'
                                style={{
                                    letterSpacing: '1px',
                                    fontSize: '15px',
                                    fontWeight: 800,
                                }}
                            >
                                NET PAY
                            </div>
                            <table className='w-100 text-center text-cmGrey700 mb-10'>
                                <tbody>
                                    <tr className='bg-cmBlue-Crayola text-cmBlue-Crayola bg-opacity-15'>
                                        <th className='py-3 px-10'>TOTAL</th>
                                    </tr>
                                    <tr>
                                        <td
                                            className='py-3 px-10 bg-cmGrey100 text-cmGrey900'
                                            style={{fontWeight: 800, fontSize: '18px'}}
                                        >
                                            {formattedNumberFields(
                                                cardData?.pay_stub?.net_pay,
                                                '$'
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className='card shadow-sm w-sm-75 mx-auto p-sm-10 p-3'
                    style={{fontSize: '14px', fontFamily: 'Manrope', fontWeight: '600'}}
                >
                    {/* Heading */}
                    <div className='mb-10'>
                        <div
                            className='text-cmGrey700 text-center mb-2'
                            style={{
                                fontSize: '14px',
                                fontFamily: 'Manrope',
                                fontWeight: '600',
                                letterSpacing: '1px',
                            }}
                        >
                            PayStub Is Not Generated Yet
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PayStubCard
