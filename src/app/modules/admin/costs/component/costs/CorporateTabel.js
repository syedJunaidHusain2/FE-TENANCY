/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useMemo, useState} from 'react'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import {KTSVG} from '../../../../../../_metronic/helpers'
import Select from '../Icon/select.png'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import CustomArrow, {
    ARROW_DIRECTION,
} from '../../../../../../customComponents/customIcons/CustomIcons'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
const CorporateTabel = ({showCostsCentersWithNoValue, className, tableData}) => {
    const [open, setOpen] = useState()

    const filteredData = useMemo(() => {
        if (showCostsCentersWithNoValue) {
            return tableData
        } else {
            let data = {...tableData}
            data.corporate.data = data?.corporate?.data?.filter((item) => item?.amount > 0)
            return data
        }
    }, [showCostsCentersWithNoValue, tableData])

    const openChild = (id) => {
        setOpen(open == id ? '' : id)
    }
    return (
        <>
            <div className={`card shadow-nones mt-0 ${className}`} style={{position: 'relative'}}>
                <div className='card-body shadow-none py-0 px-0 mx-0'>
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
                                    <th className='min-w-100px p-5'>Name</th>
                                    <th className='min-w-100px p-5'>Code</th>
                                    <th className='min-w-100px p-5'>Amount</th>
                                    <th className='min-w-75px p-5 text-center text-nowrap'>
                                        Year-to-Date
                                    </th>

                                    {/* <th></th> */}
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {filteredData?.corporate?.data?.length > 0 ? (
                                    <>
                                        {filteredData?.corporate?.data?.map((item, i) => (
                                            <React.Fragment key={i}>
                                                <tr
                                                    key={i}
                                                    className={`text-cmGrey700 stripRow `}
                                                    style={{
                                                        fontWeight: 600,
                                                        fontSize: '14px',
                                                        fontFamily: 'Manrope',
                                                    }}
                                                >
                                                    <td
                                                        className='p-5 text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                        }}
                                                    >
                                                        {item?.name}
                                                        {item?.childs && (
                                                            <span className='ms-2'>
                                                                <CustomArrow
                                                                    arrowDirection={
                                                                        open
                                                                            ? ARROW_DIRECTION.down
                                                                            : ARROW_DIRECTION.right
                                                                    }
                                                                    onClick={() => {
                                                                        openChild(item?.name)
                                                                    }}
                                                                />
                                                            </span>
                                                        )}{' '}
                                                    </td>

                                                    <td className='p-5'>{item?.code}</td>
                                                    <td
                                                        className='p-5 text-cmGrey900'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        {formattedNumberFields(item?.amount)}
                                                    </td>
                                                    <td
                                                        className='p-5 text-center text-cmGrey900'
                                                        style={{
                                                            fontWeight: 700,

                                                            fontFamily: 'Manrope',
                                                        }}
                                                    >
                                                        {item?.year_to_date ?? '-'}
                                                    </td>
                                                </tr>

                                                {item?.name == open &&
                                                    (showCostsCentersWithNoValue
                                                        ? item?.childs ?? []
                                                        : item?.childs?.filter(
                                                              (childItem) =>
                                                                  Number(childItem?.amount ?? 0) > 0
                                                          )
                                                    )?.map((value, idx) => (
                                                        <tr
                                                            key={idx}
                                                            className=' '
                                                            style={{
                                                                color: '#757575',
                                                                height: '40px',
                                                                fontSize: '14px',
                                                                fontFamily: 'Manrope',
                                                            }}
                                                        >
                                                            <td
                                                                className='p-5'
                                                                style={{
                                                                    color: '#424242',
                                                                    fontFamily: 'Manrope',
                                                                }}
                                                            >
                                                                &nbsp;&nbsp; - &nbsp;{value?.name}{' '}
                                                            </td>
                                                            <td className='p-5'>{value?.code}</td>
                                                            <td
                                                                className='p-5'
                                                                style={{
                                                                    color: '#212121',
                                                                    fontFamily: 'Manrope',
                                                                }}
                                                            >
                                                                {formattedNumberFields(
                                                                    value?.amount
                                                                )}
                                                            </td>
                                                            <td
                                                                className='p-5'
                                                                style={{
                                                                    color: '#212121',
                                                                    fontFamily: 'Manrope',
                                                                }}
                                                            >
                                                                {value?.year_to_date}
                                                            </td>
                                                            {/* <td>
                                <button
                                  style={{
                                    background: 'rgba(96, 120, 236, 0.1)',
                                    border: 'none',
                                    fontFamily: 'Manrope',
                                    borderRadius: '6px',
                                    color: '#6078EC',
                                    width: '116px',
                                    height: '29px',
                                  }}
                                >
                                  Transactions
                                </button>
                              </td> */}
                                                            {/* <td></td> */}
                                                        </tr>
                                                    ))}
                                            </React.Fragment>
                                        ))}
                                    </>
                                ) : (
                                    <tr className='no-data'>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default CorporateTabel
