import {useEffect, useState} from 'react'
import clsx from 'clsx'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Pagination from '../../../admin/sequidocs/component/Pagination'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {
    TABLE_BORDER,
    formattedNumberFields,
    getServerImage,
} from '../../../../../helpers/CommonHelpers'
import RedirectToEmployeeProfile from '../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import {CustomSortSvg} from '../../../../../_metronic/helpers/components/CustomSortSVG'

// import ViewCostomer from './ViewCostomer'

const EmployeePerformance = ({
    EmployeeData,
    onPress,
    sortValue,
    sortingOrder,
    loading,
    onSearchChange,
    page,
    setPage,
}) => {
    const [open, setOpen] = useState(false)
    const [btn, setBtn] = useState(false)
    const [value, setValue] = useState()
    const [tableData, setTableData] = useState([])
    //   const [startDate, setStartDate] = useState(moment().add(-30, 'day').toDate())
    //   const [endDate, setEndDate] = useState(new Date())
    const [search, setSearch] = useState('')

    useEffect(() => {
        setTableData(EmployeeData)
    })
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        onSearchChange(e.target.value)
    }

    return (
        <>
            <div className={`card shadow-sm mt-7 `} style={{fontFamily: 'Manrope'}}>
                <CustomLoader full visible={loading} />
                <div className='card-body shadow-none py-0 px-0 mx-0'>
                    <div
                        className='card bg-white h-auto'
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        <div className='mt-4 mx-sm-7 mb-3 d-sm-flex flex-wrap justify-content-between align-items-center'>
                            {/* Hiring Progress*/}
                            <div
                                style={{
                                    fontFamily: 'Manrope',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                }}
                                className='mx-sm-0 text-center text-cmGrey900 mb-sm-0 mb-3'
                            >
                                Employee Performance
                            </div>

                            {/* fILTER */}
                            {/* Search form */}
                            <div>
                                <form
                                    className='position-relative w-sm-auto w-75 mx-auto'
                                    autoComplete='off'
                                >
                                    {/* Employee Performancetable    Search Input */}
                                    <CustomInput
                                        type={INPUT_TYPE.search}
                                        name='search'
                                        onChange={handleSearchChange}
                                        value={search}
                                    />
                                    {/* <KTSVG
                                        path='/media/icons/duotune/general/gen021.svg'
                                        className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                                    />

                                    <input
                                        style={{borderRadius: '10px'}}
                                        type='text'
                                        className='form-control form-control-solid px-12 bg-cmGrey100  '
                                        name='search'
                                        placeholder='Search...'
                                        onChange={handleSearchChange}
                                        value={search}
                                    /> */}
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='table-responsive shadow-none overflow-auto'>
                        <table className='table'>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className='text-cmGrey900 bg-cmGrey300'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='w-auto text-nowrap p-5'>Name</th>
                                    <th className='w-auto text-nowrap p-5'>Team</th>
                                    <th className='w-auto text-nowrap p-5'>
                                        <div className='d-flex'>
                                            Accounts
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'account' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('account')}
                                            />
                                        </div>
                                    </th>
                                    <th className='w-auto text-nowrap p-5'>
                                        <div className='d-flex'>
                                            Pending
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'pending' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('pending')}
                                            />
                                        </div>
                                    </th>
                                    <th className='w-auto text-nowrap p-5'>
                                        <div className='d-flex'>
                                            Installed
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'install' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('install')}
                                            />
                                        </div>
                                    </th>
                                    <th className='w-auto text-nowrap p-5'>
                                        <div className='d-flex'>
                                            Cancelled
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'cancelled' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('cancelled')}
                                            />
                                        </div>
                                    </th>
                                    <th className='w-auto text-nowrap p-5'>Team Lead</th>
                                    <th className='w-auto text-nowrap p-5 '>
                                        <div className='d-flex'>
                                            Closing Ratio
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'closing_ratio'
                                                        ? sortingOrder
                                                        : null
                                                }
                                                onClick={() => onPress('closing_ratio')}
                                            />
                                        </div>
                                    </th>
                                    <th className='w-auto text-nowrap p-5'>
                                        <div className='d-flex'>
                                            Avg. System size
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'avg_system_size'
                                                        ? sortingOrder
                                                        : null
                                                }
                                                onClick={() => onPress('avg_system_size')}
                                            />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {tableData?.data?.length > 0 ? (
                                    <>
                                        {tableData?.data?.map((item, i) => (
                                            <tr
                                                key={i}
                                                style={{
                                                    height: '40px',
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '600',
                                                }}
                                                className={`text-cmGrey700 stripRow `}
                                            >
                                                <td
                                                    className='p-5 text-cmGrey800 text-nowrap '
                                                    style={{fontWeight: '700'}}
                                                >
                                                    {/* <span>
                            <img
                              className='avatar me-2'
                              src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                              style={{height: '24px', width: '24px'}}
                            />
                          </span> */}
                                                    <RedirectToEmployeeProfile
                                                        employeeId={item?.user_id}
                                                    >
                                                        {/* <img
                              src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                              className='avatar me-3'
                            /> */}
                                                        <CustomImage
                                                            src={item?.user_image}
                                                            className='avatar me-3'
                                                        />
                                                        {item?.user_name}
                                                    </RedirectToEmployeeProfile>
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    <span
                                                        className='badge px-3 rounded-pill text-cmBlue-Crayola bg-cmBlue-Crayola bg-opacity-10'
                                                        style={{
                                                            fontSize: '14px',
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {item?.team == null ? '-' : item?.team}
                                                    </span>
                                                </td>

                                                <td className='p-5 text-nowrap'>{item?.account}</td>
                                                <td className='p-5 text-nowrap'>
                                                    {item?.pending}(
                                                    {formattedNumberFields(
                                                        item?.pending_percentage,
                                                        '%'
                                                    )}
                                                    )
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    {item?.install}(
                                                    {formattedNumberFields(
                                                        item?.install_percentage,
                                                        '%'
                                                    )}
                                                    )
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    {item?.cancelled}(
                                                    {formattedNumberFields(
                                                        item?.cancelled_percentage,
                                                        '%'
                                                    )}
                                                    )
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    {item?.team_lead ? (
                                                        <>
                                                            <span>
                                                                <img
                                                                    className='avatar me-2'
                                                                    src={getServerImage(
                                                                        item?.team_leader_image
                                                                    )}
                                                                    style={{
                                                                        height: '24px',
                                                                        width: '24px',
                                                                    }}
                                                                />
                                                            </span>
                                                            {item?.team_lead}
                                                        </>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    {formattedNumberFields(
                                                        item?.closing_ratio,
                                                        '%'
                                                    )}
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    {formattedNumberFields(
                                                        item?.avg_system_size,
                                                        'KW'
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
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
                    </div>
                    <Pagination
                        setPage={(changedPage) => setPage(changedPage)}
                        page={page}
                        totalPages={tableData?.last_page}
                        totalRecords={tableData?.total}
                    />
                </div>
            </div>
        </>
    )
}

export default EmployeePerformance
