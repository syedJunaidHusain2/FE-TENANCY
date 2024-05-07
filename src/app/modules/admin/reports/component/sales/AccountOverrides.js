import React, {useCallback, useEffect, useState} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import {getAccountOverridesbyPidService} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import {
    TABLE_BORDER,
    formattedNumberFields,
    getGlobalSearchData,
} from '../../../../../../helpers/CommonHelpers'
import CustomSearchInput from '../../../../../../customComponents/customInputs/customSearchInput/CustomSearchInput'
import debounce from 'lodash.debounce'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'

const AccountOverrides = ({Pid}) => {
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        getAccountOverride()
    }, [])

    const getAccountOverride = () => {
        getAccountOverridesbyPidService(Pid)
            .then((res) => {
                setTableData(res?.data?.account_override)
            })
            .finally(() => setLoading(false))
    }
    const handleSearchChange = (e) => {
        delaySaveToDb(e.target.value)
        setSearchTerm(e.target.value)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            let filterData = getGlobalSearchData(tableData, ['through', 'type', 'first_name'], val)
            if (val) {
                setTableData(filterData && filterData)
            } else {
                getAccountOverride()
            }
        }, 500),
        [tableData]
    )

    return (
        <>
            {/* <ViewCostomer /> */}
            <div className={`shadow`} style={{fontFamily: 'Manrope', borderRadius: '10px'}}>
                <CustomLoader full visible={loading} />
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
                                    fontSize: '18px',
                                }}
                                className='mx-sm-0 ps-sm-0 ps-5 text-cmGrey900'
                            >
                                Account Overrides
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
                                        value={searchTerm}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='table-responsive shadow-none overflow-auto'>
                        <table className='table'>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className=' text-cmGrey800 bg-cmGrey300 '
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='w-auto p-5 text-nowrap'>Through</th>
                                    <th className='w-auto p-5 text-nowrap'>Recipient</th>
                                    <th className='w-auto p-5 text-nowrap'>Type</th>
                                    <th className='w-auto p-5 text-nowrap'>Amount</th>
                                    <th className='w-auto p-5 text-nowrap'>Total</th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {tableData.length > 0 ? (
                                    tableData?.map((item) => (
                                        <tr
                                            key={item?.id}
                                            className=' text-cmGrey900 '
                                            style={{
                                                fontSize: '14px',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            <td
                                                className='p-5 text-nowrap text-cmGrey800'
                                                style={{fontWeight: '700'}}
                                            >
                                                {item?.through}
                                            </td>

                                            <td
                                                className='p-5 text-nowrap'
                                                style={{fontWeight: '600', cursor: 'pointer'}}
                                            >
                                                <RedirectToEmployeeProfile employeeId={item?.id}>
                                                    <CustomImage
                                                        src={item?.image}
                                                        className='avatar me-3'
                                                    />
                                                    {item?.first_name} {item?.last_name}
                                                </RedirectToEmployeeProfile>
                                            </td>

                                            <td
                                                className='p-5 text-nowrap'
                                                style={{fontWeight: '600'}}
                                            >
                                                {item?.type}
                                            </td>

                                            <td
                                                className='p-5 text-nowrap'
                                                style={{fontWeight: '600'}}
                                            >
                                                {item?.type == 'Stack'
                                                    ? `${formattedNumberFields(
                                                          item?.calculated_redline,
                                                          '$',
                                                          false
                                                      )} per watt`
                                                    : `${formattedNumberFields(
                                                          item?.amount,
                                                          item?.weight == 'percent' ? '' : '$',
                                                          false
                                                      )} ${
                                                          item?.weight == 'percent'
                                                              ? '%'
                                                              : item?.weight
                                                      }`}
                                            </td>

                                            <td
                                                className='p-5 text-nowrap'
                                                style={{fontWeight: '900'}}
                                            >
                                                {formattedNumberFields(item?.total, '$')}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className='text-center  py-5' colSpan={6}>
                                            No Overrides found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountOverrides
