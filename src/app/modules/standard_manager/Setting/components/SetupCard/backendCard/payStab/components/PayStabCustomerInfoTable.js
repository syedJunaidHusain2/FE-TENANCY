import {KTSVG} from '../../../../../../../../../_metronic/helpers'
import {
    formattedNumberFields,
    getGlobalSearchData,
} from '../../../../../../../../../helpers/CommonHelpers'
import {getValidDate} from '../../../../../../../../../constants/constants'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {
    getPaystubAdjustmentDetailsService,
    getPaystubCommissionDetailsService,
    getPaystubDeductionDetailService,
    getPaystubOverrideDetailsService,
    getPaystubReimbursementDetailsService,
    getReimbursementDetailsService,
} from '../../../../../../../../../services/Services'
import CustomLoader from '../../../../../../../../../customComponents/customLoader/CustomLoader'
import CustomImage from '../../../../../../../../../customComponents/customImage/CustomImage'
import {payStubSections} from '../PayStabPage'

// import ViewCostomer from './ViewCostomer'

const PayStabCustomerInfoTable = ({
    sectionRefs,
    exportSectionRefs,
    commonDataShouldBePassAsBodyInApi,
}) => {
    return (
        <>
            {/* Commission */}
            <div
                ref={sectionRefs?.[payStubSections.commission]}
                style={{scrollMargin: '80px', fontFamily: 'Manrope', borderRadius: '10px'}}
                className={`card shadow-cmSuccess mt-7 `}
            >
                <CommissionBreakdown
                    commonDataShouldBePassAsBodyInApi={commonDataShouldBePassAsBodyInApi}
                    commissionRef={exportSectionRefs?.[payStubSections.commission]}
                />
            </div>

            {/* Override */}
            <div
                ref={sectionRefs?.[payStubSections.overrides]}
                style={{scrollMargin: '80px', fontFamily: 'Manrope', borderRadius: '10px'}}
                className={`card shadow-cmSuccess mt-7 `}
            >
                <OverridesBreakdown
                    commonDataShouldBePassAsBodyInApi={commonDataShouldBePassAsBodyInApi}
                    overridesRef={exportSectionRefs?.[payStubSections.overrides]}
                />
            </div>

            {/* Reconciliation	 */}

            {/* Deduction */}
            <div
                ref={sectionRefs?.[payStubSections.deduction]}
                style={{scrollMargin: '80px', fontFamily: 'Manrope', borderRadius: '10px'}}
                className={`card shadow-cmSuccess mt-7 `}
            >
                <DeductionBreakdown
                    commonDataShouldBePassAsBodyInApi={commonDataShouldBePassAsBodyInApi}
                    deductionRef={exportSectionRefs?.[payStubSections.deduction]}
                />
            </div>

            {/* Adjustment */}
            <div
                ref={sectionRefs?.[payStubSections.adjustment]}
                style={{scrollMargin: '80px', fontFamily: 'Manrope', borderRadius: '10px'}}
                className={`card shadow-cmSuccess mt-7 `}
            >
                <AdjustmentsBreakdown
                    commonDataShouldBePassAsBodyInApi={commonDataShouldBePassAsBodyInApi}
                    adjustmentRef={exportSectionRefs?.[payStubSections.adjustment]}
                />
            </div>

            {/* Reimbursement */}
            <div
                ref={sectionRefs?.[payStubSections.reimbursement]}
                style={{scrollMargin: '80px', fontFamily: 'Manrope', borderRadius: '10px'}}
                className={`card shadow-cmSuccess mt-7 `}
            >
                <ReimbursementsBreakdown
                    commonDataShouldBePassAsBodyInApi={commonDataShouldBePassAsBodyInApi}
                    reimbursementRef={exportSectionRefs?.[payStubSections.reimbursement]}
                />
            </div>
        </>
    )
}

export default PayStabCustomerInfoTable

export const CommissionBreakdown = ({commissionRef, commonDataShouldBePassAsBodyInApi}) => {
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (commonDataShouldBePassAsBodyInApi?.id) {
            setLoading(true)
            getPaystubCommissionDetailsService(commonDataShouldBePassAsBodyInApi)
                .then((res) => setData(res?.data))
                .finally(() => setLoading(false))
        }
    }, [commonDataShouldBePassAsBodyInApi])

    const displayData = useMemo(() => {
        let filteredData = data?.data
        if (searchText) {
            filteredData = getGlobalSearchData(
                data?.data,
                ['customer_name', 'pid', 'customer_state'],
                searchText
            )
        }
        return filteredData
    }, [data, searchText])

    const handleSearchChange = useCallback((e) => {
        setSearchText(e?.target?.value)
    }, [])

    return (
        <>
            <CustomLoader visible={loading} full />
            <div className='card-body py-0 px-0 mx-0' ref={commissionRef}>
                <div
                    className='card bg-white h-auto'
                    style={{fontSize: '14px', fontFamily: 'Manrope'}}
                >
                    <div className=' mt-4 ms-sm-7 me-sm-20 mb-3 d-sm-flex flex-wrap justify-content-between align-items-center'>
                        {/* customer info */}
                        <div
                            style={{
                                fontFamily: 'Manrope',
                                fontWeight: '700',
                                fontSize: '17px',
                            }}
                            className='mx-sm-0 ps-sm-0 ps-5 text-cmGrey900'
                        >
                            Commission
                        </div>

                        {/* Search form */}
                        <div
                            style={{borderRadius: '20px'}}
                            className='w-md-300px w-75 mx-sm-0 mx-auto mb-1'
                            id='search'
                        >
                            <form
                                className='position-relative'
                                style={{borderRadius: '90px'}}
                                autoComplete='off'
                            >
                                <KTSVG
                                    path='/media/icons/duotune/general/gen021.svg'
                                    className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                                />

                                <CustomInput
                                    type={INPUT_TYPE.search}
                                    name='search'
                                    onChange={handleSearchChange}
                                    value={searchText}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className='table-responsive shadow-none overflow-auto'>
                    <table className='table'>
                        <thead>
                            <tr
                                className='bg-cmGrey200 text-cmGrey800'
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <th className='text-nowrap p-5'>PID</th>
                                <th className='text-nowrap p-5 text-nowrap '>Customer</th>
                                <th className=' p-5 text-nowrap'>State</th>
                                <th className=' p-5 text-nowrap'>Rep Redline</th>
                                <th className='text-nowrap p-5'>KW</th>
                                <th className=' p-5 text-nowrap'>Net EPC</th>
                                <th className=' p-5 text-nowrap'>Adders</th>
                                <th className=' p-5 text-nowrap'>Amount</th>
                                <th className=' p-5 text-nowrap'>Adjustment</th>
                                <th className='p-5 text-nowrap'>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayData?.length > 0 ? (
                                <>
                                    {displayData.map((item, i) => (
                                        <tr
                                            key={i}
                                            className=' text-cmGrey700 stripRow'
                                            style={{
                                                height: '40px',
                                                fontSize: '14px',
                                                fontFamily: 'Manrope',
                                                fontWeight: 500,
                                            }}
                                        >
                                            <td className='p-5 fw-bold text-decoration-underline text-cmGrey800'>
                                                {item?.pid}
                                            </td>
                                            <td
                                                className='p-5 text-cmGrey800 text-nowrap'
                                                style={{
                                                    textDecoration: 'underline',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '700',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                {item?.customer_name}
                                            </td>
                                            <td className='p-5 text-center '>
                                                {item?.customer_state ?? '-'}
                                            </td>
                                            <td className='p-5 text-center '>
                                                <div>
                                                    {['m1'].includes(item?.amount_type)
                                                        ? '-'
                                                        : item?.rep_redline ?? '-'}
                                                </div>
                                            </td>
                                            <td className='p-5'>{item?.kw ?? '-'}</td>
                                            <td className='p- 5 text-center '>
                                                {item?.net_epc ?? '-'}
                                            </td>
                                            <td className='p-5'>
                                                {formattedNumberFields(item?.adders, '$')}
                                            </td>
                                            <td className='p-5  text-nowrap '>
                                                <div className='d-flex align-items-center gap-2 text-cmGrey900'>
                                                    <div style={{fontWeight: 600}} className=''>
                                                        {formattedNumberFields(item?.amount, '$')}
                                                    </div>

                                                    <div className=''>
                                                        {getValidDate(item?.date)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='p-5  text-nowrap '>
                                                <div className='d-flex align-items-center gap-2 text-cmGrey900'>
                                                    <div style={{fontWeight: 600}} className=''>
                                                        {formattedNumberFields(
                                                            item?.adjustAmount,
                                                            '$'
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='p-5 text-center '>
                                                {item?.amount_type?.toUpperCase()}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td
                                        colSpan={9}
                                        style={{
                                            textAlign: 'center',
                                            fontFamily: 'Manrope',
                                            fontWeight: '500',
                                            fontSize: 14,
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                        }}
                                    >
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/*      */}
                </div>
            </div>
        </>
    )
}

//Overrides
export const OverridesBreakdown = ({overridesRef, commonDataShouldBePassAsBodyInApi}) => {
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (commonDataShouldBePassAsBodyInApi?.id) {
            setLoading(true)
            getPaystubOverrideDetailsService(commonDataShouldBePassAsBodyInApi)
                .then((res) => setData(res?.data))
                .finally(() => setLoading(false))
        }
    }, [commonDataShouldBePassAsBodyInApi])
    const displayData = useMemo(() => {
        let filteredData = data?.data
        if (searchText) {
            filteredData = getGlobalSearchData(
                data?.data,
                ['customer_name', 'pid', 'customer_state', 'first_name', 'last_name'],
                searchText
            )
        }
        return filteredData
    }, [data, searchText])

    const handleSearchChange = useCallback((e) => {
        setSearchText(e?.target?.value)
    }, [])

    return (
        <>
            <CustomLoader visible={loading} full />
            <div className='card-body py-0 px-0 mx-0' ref={overridesRef}>
                <div
                    className='card bg-white h-auto'
                    style={{fontSize: '14px', fontFamily: 'Manrope'}}
                >
                    <div className=' mt-4 ms-sm-7 me-sm-20 mb-3 d-sm-flex flex-wrap justify-content-between align-items-center'>
                        {/* customer info */}
                        <div
                            style={{
                                fontFamily: 'Manrope',
                                fontWeight: '700',
                                fontSize: '17px',
                            }}
                            className='mx-sm-0 ps-sm-0 ps-5 text-cmGrey900'
                        >
                            Overrides
                        </div>

                        {/* Search form */}
                        <div
                            style={{borderRadius: '20px'}}
                            className='w-md-300px w-75 mx-sm-0 mx-auto mb-1'
                        >
                            <form
                                className='position-relative'
                                style={{borderRadius: '90px'}}
                                autoComplete='off'
                            >
                                <KTSVG
                                    path='/media/icons/duotune/general/gen021.svg'
                                    className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                                />

                                <CustomInput
                                    type={INPUT_TYPE.search}
                                    name='search'
                                    onChange={handleSearchChange}
                                    value={searchText}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className='table-responsive shadow-none overflow-auto'>
                    <table className='table'>
                        <thead>
                            <tr
                                className='bg-cmGrey200 text-cmGrey800'
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <th className='text-nowrap p-5 '>PID</th>
                                <th className='text-nowrap p-5 '>Customer Name</th>
                                <th className='text-nowrap p-5 '>Override Over</th>
                                <th className='text-nowrap p-5 '>Type</th>
                                {/* <th className='text-nowrap p-5'>Account</th> */}
                                <th className='text-nowrap p-5 '>KW installed</th>
                                <th className='text-nowrap p-5 '>Override</th>
                                <th className='text-nowrap p-5 '>Total Amount</th>
                                <th className='text-nowrap p-5 '>Adjustment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayData?.length > 0 ? (
                                <>
                                    {displayData.map((item, i) => (
                                        <tr
                                            key={i}
                                            className=' text-cmGrey800'
                                            style={{
                                                height: '40px',
                                                fontSize: '14px',
                                                fontFamily: 'Manrope',
                                                fontWeight: 700,
                                                position: 'relative',
                                            }}
                                        >
                                            <td
                                                className='p-5 text-nowrap '
                                                style={{
                                                    textDecoration: 'underline',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '700',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                {item?.pid}
                                            </td>
                                            <td
                                                className='p-5 text-nowrap '
                                                style={{
                                                    textDecoration: 'underline',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '700',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                {item?.customer_name}
                                            </td>
                                            <td
                                                className='p-5 text-nowrap '
                                                style={{
                                                    textDecoration: 'underline',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '700',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                <CustomImage
                                                    src={item?.image}
                                                    className='avatar me-3'
                                                />{' '}
                                                {item?.first_name} {item?.last_name}
                                            </td>
                                            <td className='p-5 text-nowrap '>{item?.type}</td>
                                            {/* <td className='p-5 text-nowrap '>{item?.accounts}</td> */}
                                            <td className='p-5 text-nowrap text-decoration-underline cursor-pointer'>
                                                {item?.kw_installed}
                                            </td>
                                            <td className='p-5 text-nowrap text-cmGrey800'>
                                                {item?.type == 'Stack'
                                                    ? `${formattedNumberFields(
                                                          item?.calculated_redline,
                                                          '$',
                                                          false
                                                      )} per watt`
                                                    : `${formattedNumberFields(
                                                          item?.override_amount,
                                                          '$',
                                                          false
                                                      )} ${item?.override_type}`}
                                            </td>

                                            <td className='p-5'>
                                                <div>
                                                    {formattedNumberFields(item?.total_amount, '$')}
                                                </div>
                                            </td>
                                            <td className='p-5'>
                                                <div>
                                                    {formattedNumberFields(item?.amount, '$')}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td
                                        colSpan={9}
                                        style={{
                                            textAlign: 'center',
                                            fontFamily: 'Manrope',
                                            fontWeight: '500',
                                            fontSize: 14,
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                        }}
                                    >
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/*      */}
                </div>
            </div>
        </>
    )
}

//Deduction
export const DeductionBreakdown = ({deductionRef, commonDataShouldBePassAsBodyInApi}) => {
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        const body = {
            payroll_id: commonDataShouldBePassAsBodyInApi?.id,
            ...commonDataShouldBePassAsBodyInApi,
        }

        if (body?.user_id && body?.id) {
            setLoading(true)

            getPaystubDeductionDetailService(body)
                .then((res) => {
                    setData(res?.data?.list)
                })
                .finally(() => setLoading(false))
        }
    }, [commonDataShouldBePassAsBodyInApi])

    const displayData = useMemo(() => {
        let filteredData = data
        if (searchText) {
            filteredData = getGlobalSearchData(data, ['Type'], searchText)
        }
        return filteredData
    }, [data, searchText])

    const handleSearchChange = useCallback((e) => {
        setSearchText(e?.target?.value)
    }, [])

    return (
        <>
            <CustomLoader visible={loading} full />
            <div className='card-body py-0 px-0 mx-0' ref={deductionRef}>
                <div
                    className='card bg-white h-auto'
                    style={{fontSize: '14px', fontFamily: 'Manrope'}}
                >
                    <div className=' mt-4 ms-sm-7 me-sm-20 mb-3 d-sm-flex flex-wrap justify-content-between align-items-center'>
                        {/* customer info */}
                        <div
                            style={{
                                fontFamily: 'Manrope',
                                fontWeight: '700',
                                fontSize: '17px',
                            }}
                            className='mx-sm-0 ps-sm-0 ps-5 text-cmGrey900'
                        >
                            Deduction
                        </div>

                        {/* Search form */}
                        <div
                            style={{borderRadius: '20px'}}
                            className='w-md-300px w-75 mx-sm-0 mx-auto mb-1'
                        >
                            <form
                                className='position-relative'
                                style={{borderRadius: '90px'}}
                                autoComplete='off'
                            >
                                <KTSVG
                                    path='/media/icons/duotune/general/gen021.svg'
                                    className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                                />

                                <CustomInput
                                    type={INPUT_TYPE.search}
                                    name='search'
                                    onChange={handleSearchChange}
                                    value={searchText}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className='table-responsive shadow-none overflow-auto'>
                    <table className='table'>
                        <thead>
                            <tr
                                className='bg-cmGrey200 text-cmGrey800'
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <th className='text-nowrap p-5'>Type</th>
                                <th className='text-nowrap p-5 text-nowrap '>Amount</th>
                                <th className=' p-5 text-nowrap'>Limit</th>
                                <th className=' p-5 text-nowrap'>Total</th>
                                <th className='text-nowrap p-5'>Outstanding</th>
                                <th className='text-nowrap p-5'>Adjustment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayData?.length > 0 ? (
                                <>
                                    {displayData.map((item, i) => (
                                        <tr
                                            key={i}
                                            className=' text-cmGrey700'
                                            style={{
                                                height: '40px',
                                                fontSize: '14px',
                                                fontFamily: 'Manrope',
                                                fontWeight: 500,
                                            }}
                                        >
                                            <td className='p-5 fw-bold text-decoration-underline text-cmGrey800'>
                                                {item?.Type ?? '-'}
                                            </td>
                                            <td className='p-5 text-cmGrey800 text-nowrap'>
                                                <div
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontWeight: '700',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    {formattedNumberFields(item?.Amount, '$')}
                                                </div>
                                            </td>
                                            <td className='p-5 text-center '>
                                                {formattedNumberFields(item?.Limit, '%') ?? '-'}
                                            </td>
                                            <td className='p-5 text-center '>
                                                <div>{formattedNumberFields(item?.Total, '$')}</div>
                                            </td>
                                            <td className='p-5 text-center '>
                                                <div>
                                                    {item?.Outstanding
                                                        ? formattedNumberFields(item?.Outstanding)
                                                        : '-'}
                                                </div>
                                            </td>
                                            <td className='p-5 text-center '>
                                                <div
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontWeight: '700',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    {formattedNumberFields(item?.amount, '$')}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td
                                        colSpan={9}
                                        style={{
                                            textAlign: 'center',
                                            fontFamily: 'Manrope',
                                            fontWeight: '500',
                                            fontSize: 14,
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                        }}
                                    >
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/*      */}
                </div>
            </div>
        </>
    )
}

//Adjustments
export const AdjustmentsBreakdown = ({adjustmentRef, commonDataShouldBePassAsBodyInApi}) => {
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (commonDataShouldBePassAsBodyInApi?.id) {
            setLoading(true)
            getPaystubAdjustmentDetailsService(commonDataShouldBePassAsBodyInApi)
                .then((res) => setData(res?.data))
                .finally(() => setLoading(false))
        }
    }, [commonDataShouldBePassAsBodyInApi])

    const displayData = useMemo(() => {
        let filteredData = data
        if (searchText) {
            filteredData = getGlobalSearchData(
                data,
                ['first_name', 'last_name', 'type'],
                searchText
            )
        }
        return filteredData
    }, [data, searchText])

    const handleSearchChange = useCallback((e) => {
        setSearchText(e?.target?.value)
    }, [])

    return (
        <>
            <CustomLoader visible={loading} full />
            <div className='card-body py-0 px-0 mx-0' ref={adjustmentRef}>
                <div
                    className='card bg-white h-auto'
                    style={{fontSize: '14px', fontFamily: 'Manrope'}}
                >
                    <div className=' mt-4 ms-sm-7 me-sm-20 mb-3 d-sm-flex flex-wrap justify-content-between align-items-center'>
                        {/* customer info */}
                        <div
                            style={{
                                fontFamily: 'Manrope',
                                fontWeight: '700',
                                fontSize: '17px',
                            }}
                            className='mx-sm-0 ps-sm-0 ps-5 text-cmGrey900'
                        >
                            Adjustments
                        </div>

                        {/* Search form */}
                        <div
                            style={{borderRadius: '20px'}}
                            className='w-md-300px w-75 mx-sm-0 mx-auto mb-1'
                        >
                            <form
                                className='position-relative'
                                style={{borderRadius: '90px'}}
                                autoComplete='off'
                            >
                                <KTSVG
                                    path='/media/icons/duotune/general/gen021.svg'
                                    className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                                />

                                <CustomInput
                                    type={INPUT_TYPE.search}
                                    name='search'
                                    onChange={handleSearchChange}
                                    value={searchText}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className='table-responsive shadow-none overflow-auto'>
                    <table className='table'>
                        <thead>
                            <tr
                                className='bg-cmGrey200 text-cmGrey800'
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <th className='w-auto p-6 text-nowrap '>Approved By</th>
                                <th className=' p-6 w-auto'>Date</th>
                                <th className=' p-6 w-auto'>Type</th>
                                <th className=' p-6 w-auto'>Amount</th>
                                <th className=' p-6 '>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayData?.length > 0 ? (
                                <>
                                    {displayData.map((item, i) => (
                                        <tr
                                            key={i}
                                            className=' text-cmGrey800'
                                            style={{
                                                height: '40px',
                                                fontSize: '14px',
                                                fontFamily: 'Manrope',
                                                fontWeight: 500,
                                            }}
                                        >
                                            <td
                                                className='p-3 text-nowrap '
                                                style={{
                                                    textDecoration: 'underline',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '700',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                <CustomImage
                                                    src={item?.image}
                                                    className='avatar me-3'
                                                />{' '}
                                                {item?.first_name} {item?.last_name ?? '-'}
                                            </td>
                                            <td
                                                className='p-5 text-nowrap '
                                                style={{fontWeight: 700}}
                                            >
                                                {getValidDate(item?.date)}
                                            </td>
                                            <td
                                                className='p-5 text-nowrap '
                                                style={{fontWeight: 700}}
                                            >
                                                {item?.type ?? '-'}
                                            </td>
                                            <td
                                                className='p-5 text-nowrap '
                                                style={{fontWeight: 700}}
                                            >
                                                {formattedNumberFields(item?.amount, '$')}
                                            </td>
                                            <td
                                                className='p-5 text-nowrap '
                                                style={{fontWeight: 600}}
                                            >
                                                {item?.description ?? '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td
                                        colSpan={9}
                                        style={{
                                            textAlign: 'center',
                                            fontFamily: 'Manrope',
                                            fontWeight: '500',
                                            fontSize: 14,
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                        }}
                                    >
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/*      */}
                </div>
            </div>
        </>
    )
}

//Reimbursements
export const ReimbursementsBreakdown = ({reimbursementRef, commonDataShouldBePassAsBodyInApi}) => {
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (commonDataShouldBePassAsBodyInApi?.id) {
            setLoading(true)
            getPaystubReimbursementDetailsService(commonDataShouldBePassAsBodyInApi)
                .then((res) => setData(res?.data))
                .finally(() => setLoading(false))
        }
    }, [commonDataShouldBePassAsBodyInApi])

    const displayData = useMemo(() => {
        let filteredData = data
        if (searchText) {
            filteredData = getGlobalSearchData(data, ['first_name', 'last_name'], searchText)
        }
        return filteredData
    }, [data, searchText])

    const handleSearchChange = useCallback((e) => {
        setSearchText(e?.target?.value)
    }, [])

    return (
        <div
            className={`card shadow-cmSuccess mt-7 `}
            style={{fontFamily: 'Manrope', borderRadius: '10px'}}
            ref={reimbursementRef}
        >
            <CustomLoader visible={loading} full />
            <div className='card-body py-0 px-0 mx-0'>
                <div
                    className='card bg-white h-auto'
                    style={{fontSize: '14px', fontFamily: 'Manrope'}}
                >
                    <div className=' mt-4 ms-sm-7 me-sm-20 mb-3 d-sm-flex flex-wrap justify-content-between align-items-center'>
                        {/* customer info */}
                        <div
                            style={{
                                fontFamily: 'Manrope',
                                fontWeight: '700',
                                fontSize: '17px',
                            }}
                            className='mx-sm-0 ps-sm-0 ps-5 text-cmGrey900'
                        >
                            Reimbursements
                        </div>

                        {/* Search form */}
                        <div
                            style={{borderRadius: '20px'}}
                            className='w-md-300px w-75 mx-sm-0 mx-auto mb-1'
                        >
                            <form
                                className='position-relative'
                                style={{borderRadius: '90px'}}
                                autoComplete='off'
                            >
                                <KTSVG
                                    path='/media/icons/duotune/general/gen021.svg'
                                    className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                                />

                                <CustomInput
                                    type={INPUT_TYPE.search}
                                    name='search'
                                    onChange={handleSearchChange}
                                    value={searchText}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className='table-responsive shadow-none overflow-auto'>
                    <table className='table'>
                        <thead>
                            <tr
                                className='bg-cmGrey200 text-cmGrey800'
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <th className='p-5 text-nowrap '>Approved By</th>
                                <th className=' p-5 '>Date</th>
                                <th className=' p-5'>Amount</th>
                                <th className=' p-5 '>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayData?.length > 0 ? (
                                <>
                                    {displayData.map((item, i) => (
                                        <tr
                                            key={i}
                                            className=' text-cmGrey700'
                                            style={{
                                                height: '40px',
                                                fontSize: '14px',
                                                fontFamily: 'Manrope',
                                                fontWeight: 500,
                                            }}
                                        >
                                            <td
                                                className='p-5 text-cmGrey800 text-nowrap '
                                                style={{
                                                    textDecoration: 'underline',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '700',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                <CustomImage
                                                    src={item?.image}
                                                    className='avatar me-3'
                                                />{' '}
                                                {item?.first_name} {item?.last_name ?? '-'}
                                            </td>
                                            <td
                                                className='p-5 text-cmGrey800 text-nowrap '
                                                style={{fontWeight: '700'}}
                                            >
                                                {getValidDate(item?.date)}
                                            </td>
                                            <td
                                                className='p-5 text-cmGrey800 text-nowrap '
                                                style={{fontWeight: '700'}}
                                            >
                                                {formattedNumberFields(item?.amount, '$')}
                                            </td>
                                            <td
                                                className='p-5 text-cmGrey800 text-nowrap '
                                                style={{fontWeight: '600'}}
                                            >
                                                {item?.description ?? '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td
                                        colSpan={9}
                                        style={{
                                            textAlign: 'center',
                                            fontFamily: 'Manrope',
                                            fontWeight: '500',
                                            fontSize: 14,
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                        }}
                                    >
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/*      */}
                </div>
            </div>
        </div>
    )
}
