/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import Select from '../../Icon/select.png'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import Pagination from '../../../sequidocs/component/Pagination'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import {getValidDate} from '../../../../../../constants/constants'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import {Link} from 'react-router-dom'
import {TABLE_BORDER} from '../../../../../../helpers/CommonHelpers'
import {CustomSortSvg} from '../../../../../../_metronic/helpers/components/CustomSortSVG'

const CrawbackTabel = ({
    className,
    clawBackData,
    onSearchChange,
    loading,
    activePage,
    onPageChange,
    onPress,
    sortingOrder,
    sortValue,
}) => {
    const [open, setOpen] = useState(false)
    const [btn, setBtn] = useState(false)
    const [search, setSearch] = useState('')

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        onSearchChange(e.target.value)
    }

    return (
        <>
            <div className={`card shadow-nones mt-8 ${className}`}>
                <CustomLoader full visible={loading} />
                <div className='card-body shadow-none py-0 px-0 mx-0'>
                    <div
                        className='card bg-white h-auto'
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        <div className='w-100 mt-4 ms-7 mb-3 d-flex flex-wrap justify-content-between'>
                            <div
                                className=' mb-2 d-flex flex-row mt-2'
                                id='kt_chat_contacts_header'
                            >
                                <div
                                    style={{borderRadius: '20px'}}
                                    className='mb-1 me-sm-12'
                                    id='kt_chat_contacts_header'
                                >
                                    <form
                                        className='position-relative'
                                        style={{background: '#F5F5F5', borderRadius: '90px'}}
                                        autoComplete='off'
                                    >
                                        {/* Clawback Table Search Input */}
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
                                            style={{background: '#F5F5F5', borderRadius: '10px'}}
                                            type='text'
                                            className='form-control form-control-solid px-12 '
                                            name='search'
                                            placeholder='Search...'
                                            onChange={handleSearchChange}
                                            value={search}
                                        /> */}
                                    </form>
                                </div>
                            </div>
                            {/* <div className='d-flex flex-row flex-wrap'>
                <div className=' '>
                  <a
                    href=''
                    className={clsx('btn btn-sm btn-flex fw-bold')}
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                    style={{
                      background: '#F5F5F5',
                      color: '#757575',
                      fontSize: '14px',
                      fontFamily: 'Manrope',
                      width: '99px',
                      height: '43px',
                    }}
                  >
                    <KTSVG
                      path='/media/icons/duotune/general/gen031.svg'
                      className='me-3 svg-icon-6 svg-icon-muted me-1'
                    />
                    Filter
                  </a>
                </div>

                <div className='me-16'>
                  <a className='ms-2'>
                    <button
                      style={{
                        color: '#757575',
                        fontSize: '14px',
                        fontStyle: 'bold',
                      }}
                      className='btn btn-sm btn-icon mt-2 btn-bg-white btn-active-color-primary'
                      data-kt-menu-trigger='click'
                      data-kt-menu-placement='top-end'
                      data-kt-menu-flip='bottom-end'
                    >
                      <i
                        style={{marginTop: '-6px'}}
                        className='bi ms-4 bi-three-dots-vertical  fs-3'
                      ></i>
                    </button>
                  </a>
                </div>
              </div> */}
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
                                    <th className='w-auto p-5 text-nowrap'>Customer</th>
                                    <th className='w-auto p-5 text-nowrap'> State</th>
                                    <th className='w-auto p-5 text-nowrap'>Setter</th>
                                    <th className='w-auto p-5 text-nowrap'>Closer</th>
                                    <th
                                        data-toggle='tooltip'
                                        data-placement='left'
                                        title='bonuses, advances, incentives                    '
                                        className='w-auto p-5 text-nowrap'
                                    >
                                        <div className='d-flex flex-row'>
                                            Clawback Date
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'clawback_date'
                                                        ? sortingOrder
                                                        : null
                                                }
                                                onClick={() => onPress('clawback_date')}
                                            />
                                        </div>
                                    </th>

                                    <th className='w-auto p-6 text-nowrap'>
                                        <div className='d-flex flex-row'>
                                            Last Payment
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'last_payment'
                                                        ? sortingOrder
                                                        : null
                                                }
                                                onClick={() => onPress('last_payment')}
                                            />
                                        </div>
                                    </th>

                                    <th
                                        data-toggle='tooltip'
                                        data-placement='left'
                                        title='Amount of payment (M1 or M2)  that will be clawed back from rep'
                                        className='w-auto py-5 text-nowrap'
                                        style={{cursor: 'pointer'}}
                                    >
                                        <div className='d-flex flex-row'>
                                            Amount
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'amount' ? sortingOrder : null
                                                }
                                                onClick={() => onPress('amount')}
                                            />
                                            <div className='align-item-center'>
                                                <i
                                                    className='bi bi-exclamation-circle ms-1'
                                                    style={{
                                                        color: '#616161',
                                                        cursor: 'pointer',
                                                    }}
                                                ></i>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {clawBackData?.data?.length > 0 ? (
                                    <>
                                        {clawBackData?.data?.map((item, index) => (
                                            <tr
                                                key={index}
                                                className={`text-cmGrey700 stripRow `}
                                                style={{
                                                    color: '#757575',
                                                    height: '40px',
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                <td className='p-5'>
                                                    <Link
                                                        style={{
                                                            cursor: 'pointer',
                                                            textDecoration: 'underline',
                                                            fontWeight: 700,
                                                        }}
                                                        className='text-cmGrey800'
                                                        // to='customer-Info'
                                                        to={`/reports/sales/customer-Info?pid=${item?.pid}`}
                                                        state={{pid: item?.pid}}
                                                    >
                                                        {item?.customer_name ?? '-'}
                                                    </Link>
                                                </td>
                                                <td className='p-5'>
                                                    {item?.customer_state ?? '-'}
                                                </td>

                                                <td
                                                    className='p-5'
                                                    style={{textDecoration: 'underline'}}
                                                >
                                                    <RedirectToEmployeeProfile
                                                        employeeId={item?.setter_id}
                                                    >
                                                        {item?.setter ?? '-'}
                                                    </RedirectToEmployeeProfile>
                                                </td>
                                                <td
                                                    className='p-5'
                                                    style={{textDecoration: 'underline'}}
                                                >
                                                    <RedirectToEmployeeProfile
                                                        employeeId={item?.closer_id}
                                                    >
                                                        {item?.closer ?? '-'}
                                                    </RedirectToEmployeeProfile>
                                                </td>
                                                <td className='p-5'>
                                                    {getValidDate(item?.clawback_date)}
                                                </td>
                                                <td className='p-5'>
                                                    {getValidDate(item?.last_payment ?? '-')}
                                                </td>
                                                <td
                                                    className='p-5'
                                                    style={{
                                                        color: '#212121',
                                                        fontFamily: 'Manrope',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    ${item?.amount ?? '0'}
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr key='no-data'>
                                        <td
                                            colSpan={11}
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
                        {clawBackData?.data?.length > 0 ? (
                            <Pagination
                                page={activePage && activePage}
                                totalPages={clawBackData?.last_page}
                                setPage={(changedPage) => onPageChange(changedPage)}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CrawbackTabel
