import React, {useState} from 'react'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'
import Pagination from '../../../../../admin/sequidocs/component/Pagination'
import {getValidDate} from '../../../../../../../constants/constants'
import {formattedNumberFields} from '../../../../../../../helpers/CommonHelpers'
import {KTSVG} from '../../../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'

const UnquiePidTable = ({tableData, onPageChange, activePage}) => {
    const [isAscending, setIsAscending] = useState(true)

    //   const handleSortClick = () => {
    //     const newSortedItems = [...tableData].sort((a, b) => {
    //       if (isAscending) {
    //         return a.billed_price - b.billed_price;
    //       } else {
    //         return b.billed_price - a.billed_price;
    //       }
    //     });
    //     setTableData({...tableData,data:newSortedItems});
    //     setIsAscending(!isAscending);
    //   };
    return (
        <div
            className='table-responsive shadow-sm overflow-auto bg-cmwhite'
            style={{borderRadius: 10}}
        >
            <table className='table'>
                <thead>
                    <tr
                        className='bg-cmGrey300 text-cmGrey900'
                        style={{
                            fontSize: '14px',
                            fontWeight: 700,
                            fontFamily: fontsFamily.manrope,
                        }}
                    >
                        <th></th>
                        <th className='p-5 text-nowrap'>PID</th>
                        <th className='p-5 text-nowrap'>Customer</th>
                        <th className='p-5 text-nowrap'>State</th>
                        <th className='p-5 text-nowrap'>
                            KW
                            <span>
                                {/* <KTSVG
                                    path='/media/icons/duotune/art/sort.svg'
                                    className='cursor-pointer'
                                    svgClassName='w-15px h-15px'
                                /> */}
                            </span>
                        </th>
                        <th className='p-5 text-nowrap'>Approval Date</th>
                        <th className='p-5 text-nowrap'>Price</th>
                        <th className='p-5 text-nowrap'>
                            Price Billed{' '}
                            {/* <span>
                                <KTSVG
                                    path='/media/icons/duotune/art/sort.svg'
                                    className='cursor-pointer'
                                    svgClassName='w-15px h-15px'
                                />
                            </span> */}
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tableData?.data?.length > 0 ? (
                        <>
                            {tableData?.data?.map((item, i) => (
                                <tr
                                    key={null}
                                    className='text-cmGrey800 stripRow '
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 600,
                                    }}
                                >
                                    <td></td>
                                    <td className='p-5 text-nowrap text-decoration-underline'>
                                        <Link
                                            style={{
                                                cursor: 'pointer',
                                                textDecoration: 'underline',
                                                fontWeight: 700,
                                            }}
                                            className='text-cmGrey800'
                                            to={`/reports/sales/customer-Info?pid=${item?.pid}`}
                                            state={{pid: item?.pid}}
                                        >
                                            {item?.pid ?? '-'}
                                        </Link>
                                    </td>
                                    <td className='p-5 text-nowrap '>{item?.customer_name}</td>
                                    <td className='p-5 text-nowrap ' style={{fontWeight: 700}}>
                                        {item?.customer_state}
                                    </td>
                                    <td className='p-5 text-nowrap ' style={{fontWeight: 700}}>
                                        {item?.kw ?? '-'}
                                    </td>

                                    <td className='p-5 text-nowrap'>
                                        {getValidDate(item?.approval_date)}
                                    </td>
                                    <td className='p-5 text-nowrap'>$ {item?.price}/watt</td>
                                    <td
                                        className='p-5 text-nowrap text-cmGrey900'
                                        style={{fontWeight: 700}}
                                    >
                                        {formattedNumberFields(item?.billed_price, '$')}
                                    </td>
                                    <td></td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <tr key='no-data'>
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
            {
                <Pagination
                    page={activePage}
                    totalPages={tableData?.last_page}
                    setPage={(changedPage) => onPageChange(changedPage)}
                />
            }
        </div>
    )
}

export default UnquiePidTable
