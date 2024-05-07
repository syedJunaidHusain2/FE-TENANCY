import React, {useCallback, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {getuserbyPositionIDService} from '../../../../../../services/Services'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import debounce from 'lodash.debounce'
import Pagination from '../../../sequidocs/component/Pagination'

const PositionPeople = () => {
    const navigate = useNavigate()
    const Location = useLocation()
    const [tableData, settableData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState('')
    const [searchVal, setSearchVal] = useState('')
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        // const body = {id: Location?.state?.id}
        const body = {
            page: activePage,
            search: searchVal,
        }
        getuserbyPositionIDService(Location?.state?.id, body)
            .then((res) => {
                settableData(res?.data)
            })
            .finally(() => setLoading(false))
    }, [activePage, searchVal])

    const handleSearchChange = (e) => {
        // setFilterData(initialFilter)
        setActivePage(1)
        setSearchText(e?.target?.value)
        delaySave(e?.target?.value)
    }
    const delaySave = useCallback(
        debounce((val) => {
            setSearchVal(val)
            setLoading(true)
        }, 500),
        [searchVal]
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
                    List of People: {Location?.state?.name}
                </div>
                <div>
                    {' '}
                    <CustomInput
                        type={INPUT_TYPE.search}
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                </div>
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
                            <th className='w-200px p-5'>S.no</th>
                            <th className='w-auto p-5 '>Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.data?.length > 0 ? (
                            tableData?.data?.map((i, index) => (
                                <tr
                                    key={i?.id}
                                    className={`stripRow`}
                                    style={{
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                        fontWeight: '600',
                                    }}
                                >
                                    <td className='p-5'>{index + 1}</td>
                                    <td className='text-decoration-underline text-hover-primary cursor-pointer p-5 text-nowrap'>
                                        <RedirectToEmployeeProfile employeeId={i?.id}>
                                            <CustomImage src={i?.image} className='avatar me-3' />
                                            {i?.first_name} {i?.last_name}{' '}
                                        </RedirectToEmployeeProfile>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className='no-data'>
                                <td
                                    colSpan={3}
                                    className='text-center fw-bold py-10'
                                    style={{
                                        fontFamily: 'Manrope',
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
                page={activePage}
                totalPages={tableData?.last_page}
                setPage={(changedPage) => setActivePage(changedPage)}
            />
        </div>
    )
}

export default PositionPeople
