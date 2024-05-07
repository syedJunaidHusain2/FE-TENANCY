/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import Edit from '../../Icon/edit.png'
import Pagination from '../Pagination'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import {getValidDate} from '../../../../../../constants/constants'
import CustomEditIcon from '../../../../../../customComponents/customIcons/CustomEditIcon'
import {useNavigate} from 'react-router-dom'
import CustomEllipsis from '../../../../../../customComponents/customEllipsis/CustomEllipsis'
import {TABLE_BORDER} from '../../../../../../helpers/CommonHelpers'
const DocumentTable = ({className, tableData, loading, page, onPageChange}) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false)
    }

    const navigateToDocEdit = (employeeId) => {
        navigate(`/user/document?employeeId=${employeeId}`, {state: {employee_id: employeeId}})
    }
    const documentToDisplay = (item) => {
        return item?.document_data?.map((item) => item?.template_name)?.join(',')
    }
    return (
        <>
            <div className={`bg-cmwhite ${className}`} style={{position: 'relative'}}>
                <CustomLoader visible={loading} full />
                <div className='bg-cmwhite py-0 px-0 mx-0'>
                    <div id='get1' className='table-responsive overflow-auto'>
                        <table className='table' style={{tableLayout: 'fixed', width: '100'}}>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className=' text-cmGrey900 bg-cmGrey300 '
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='w-175px p-5 '>Name</th>
                                    <th className='w-120px p-5  text-center'>No. Of Docs</th>
                                    <th className='w-250px p-5 '>Documents</th>
                                    <th className='w-150px p-5 '>Last Updated</th>
                                    <th className='w-150px p-5  text-center'>Incomplete Docs</th>
                                    <th className='w-75px'></th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {tableData?.data?.length > 0 ? (
                                    <>
                                        {tableData?.data?.map((item, i) => (
                                            <tr
                                                className={`text-cmGrey600 ${
                                                    (i + 1) % 2 === 0 ? 'bg-cmGrey100' : ' '
                                                }`}
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                }}
                                                key={item?.user_id}
                                            >
                                                <td className='p-5 text-cmGrey800 '>
                                                    <RedirectToEmployeeProfile
                                                        employeeId={item?.doc_send_to?.id}
                                                    >
                                                        <CustomImage
                                                            src={item?.doc_send_to?.image}
                                                            className='avatar me-3'
                                                        />
                                                        {item?.doc_send_to?.first_name}{' '}
                                                        {item?.doc_send_to?.last_name}
                                                    </RedirectToEmployeeProfile>
                                                </td>

                                                <td className='p-5 '>
                                                    <div
                                                        className='bg-cmGrey200 text-cmGrey600 py-1 px-3 mx-auto'
                                                        style={{
                                                            width: 'fit-content',
                                                            fontSize: '14px',
                                                            borderRadius: '6px',
                                                            fontWeight: '600',
                                                            fontFamily: 'Manrope',
                                                        }}
                                                    >
                                                        {item?.document_data?.length}
                                                    </div>
                                                </td>

                                                <td
                                                    className='p-5 text-cmGrey500 '
                                                    style={{fontWeight: '500'}}
                                                    width={'250px'}
                                                >
                                                    <span className=''>
                                                        <CustomEllipsis
                                                            width='200px'
                                                            className='text-cmGrey600 '
                                                            style={{
                                                                whiteSpace: 'nowrap',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                            }}
                                                            text={documentToDisplay(item)}
                                                        >
                                                            {documentToDisplay(item)}
                                                        </CustomEllipsis>
                                                    </span>
                                                </td>
                                                <td
                                                    className='p-5 text-cmGrey500 '
                                                    style={{fontWeight: '500'}}
                                                >
                                                    {getValidDate(item?.updated_at, 'MM/DD/YYYY')}
                                                </td>
                                                <td className='p-5  text-center'>
                                                    <div
                                                        className='bg-cmYellow text-cmOrange mx-auto py-1 px-3 bg-opacity-25'
                                                        style={{
                                                            width: 'fit-content',
                                                            fontSize: '14px',
                                                            borderRadius: '6px',
                                                            fontWeight: '600',
                                                            fontFamily: 'Manrope',
                                                        }}
                                                    >
                                                        {item?.incommplete_docs}
                                                    </div>
                                                </td>
                                                <td className='p-5 text-center'>
                                                    <CustomEditIcon
                                                        onClick={() =>
                                                            navigateToDocEdit(item?.user_id)
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <tr>
                                            <td
                                                colSpan={5}
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
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        page={page}
                        totalPages={tableData?.last_page}
                        setPage={(changedPage) => onPageChange(changedPage)}
                    />
                </div>
            </div>
        </>
    )
}

export default DocumentTable
