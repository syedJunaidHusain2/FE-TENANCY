import React, {useCallback, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {getListofGroupService} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import Pagination from '../../../sequidocs/component/Pagination'

const UsersOfGroup = () => {
    const navigate = useNavigate()
    const Location = useLocation()
    const [tableData, settableData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setLoading(true)
        const body = {id: Location?.state?.id, page: page}
        getListofGroupService(body)
            .then((res) => {
                settableData(res?.data)
            })
            .finally(() => setLoading(false))
    }, [page])

    const getSerialNumberByPagination = useCallback(
        (index) => {
            return page * 10 - 10 + index + 1
        },
        [page]
    )

    return (
        <div
            className='bg-cmwhite shadow-sm'
            style={{
                fontFamily: 'Manrope',
                fontSize: '14px',
                borderRadius: '12px',
                position: 'relative',
            }}
        >
            <CustomLoader visible={loading} full />

            <div className='d-flex justify-content-between align-items-center p-5'>
                <div
                    className='bi bi-box-arrow-left fs-1 text-cmGrey600 text-hover-dark cursor-pointer'
                    onClick={() => navigate(-1)}
                ></div>
                <div style={{fontSize: '16px', fontWeight: '600', fontFamily: 'Manrope'}}>
                    List Of Group: {Location?.state?.name}
                </div>
                <div></div>
            </div>
            <div className='table-responsive overflow-auto'>
                <table className='table'>
                    <thead>
                        <tr
                            className=' bg-cmGrey300 text-cmGrey800 '
                            style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <th className='w-200px p-5'>S. no</th>
                            <th className='w-auto p-5 '>Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.data?.length > 0 ? (
                            tableData?.data?.map((i, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className={`stripRow `}
                                        style={{
                                            fontSize: '14px',
                                            fontFamily: 'Manrope',
                                            fontWeight: '600',
                                        }}
                                    >
                                        <td className='p-5'>
                                            {getSerialNumberByPagination(index)}
                                        </td>
                                        <td className='text-decoration-underline text-hover-primary cursor-pointer p-5'>
                                            <RedirectToEmployeeProfile employeeId={i?.id}>
                                                <CustomImage
                                                    src={i?.image}
                                                    className='avatar me-3'
                                                />
                                                {i?.first_name} {i?.last_name}{' '}
                                            </RedirectToEmployeeProfile>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={2}
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
                page={page}
                setPage={(changedPage) => setPage(changedPage)}
                totalPages={tableData?.last_page}
            />
        </div>
    )
}

export default UsersOfGroup
