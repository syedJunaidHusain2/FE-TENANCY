import React, {useCallback, useEffect, useState} from 'react'
import {PageTitle} from '../../../../../_metronic/layout/core'
import {fontsFamily} from '../../../../../assets/fonts/fonts'
import UserManagementTable from './UserManagementTable'
import {
    exportUserManagementListService,
    getUserManagementListService,
} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import debounce from 'lodash.debounce'
import moment from 'moment'
import {
    downloadAnyFileHelper,
    getErrorMessageFromResponse,
} from '../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'

const profileBreadCrumbs = [
    {
        title: 'Settings/',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
]
const INITIAL_FILTER = {
    Position: '',
    Office: '',
    Status: '',
    showOnlyAdmins: '',
}

const UserManagementPage = () => {
    const [userManagementList, setUserManagementList] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState(null)
    const [tableLoading, setTableLoading] = useState(false)
    const [extraFilter, setExtraFilter] = useState(null)
    useEffect(() => {
        getUserList()
    }, [page, searchTerm, extraFilter])

    const getUserList = useCallback(() => {
        if (!searchTerm) setLoading(true)
        const body = {
            page: page,
            filter: searchTerm,
            ...extraFilter,
        }
        getUserManagementListService(body)
            .then((res) => {
                setUserManagementList(res)
            })
            .finally(() => {
                setTableLoading(false)
                setLoading(false)
            })
    }, [page, searchTerm, extraFilter])

    const delaySearch = useCallback(
        debounce((val) => {
            setTableLoading(true)
            setSearchTerm(val)
            setPage(1)
        }, 500),
        []
    )
    const onUserFilter = (filter) => {
        setSearchTerm('')
        setPage(1)
        setExtraFilter(filter)
    }
    const onResetFilter = () => {
        setSearchTerm('')
        setPage(1)
        setExtraFilter(null)
    }

    const onExportUserData = useCallback(() => {
        setLoading(true)
        const body = {
            filter: searchTerm,
            ...extraFilter,
        }
        exportUserManagementListService(body)
            .then((res) => {
                const fileName = `User List - ${moment(new Date()).format('DD MMM YY hh:mm')}.csv`
                downloadAnyFileHelper(res, fileName)
                CustomToast.success('File Downloaded Successfully')
            })
            .catch((err) => {
                CustomToast.success(getErrorMessageFromResponse(err))
            })
            .finally(() => {
                setLoading(false)
            })
    }, [extraFilter, searchTerm])

    return (
        <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Subscription</PageTitle>
            <div
                className=''
                style={{
                    fontFamily: fontsFamily.manrope,
                    fontSize: '14px',
                    marginTop: -20,
                    position: 'relative',
                }}
            >
                <CustomLoader visible={loading} full size={100} />

                <div
                    className='text-cmGrey900 mb-2'
                    style={{fontFamily: fontsFamily.manrope, fontSize: '20px', fontWeight: 600}}
                >
                    Users
                </div>
                <div className='text-cmGrey700 mb-5' style={{fontWeight: 600}}>
                    Only individuals with Company Admin privileges are authorized to add and remove
                    Superadmins and admins.
                </div>
                <div className='container mb-10'>
                    <div className='d-flex flex-wrap gap-sm-10 gap-5'>
                        {/* Card 1 */}
                        <div
                            className='card w-md-250px w-100'
                            style={{borderRadius: 10, backgroundColor: '#E1D3FF'}}
                        >
                            <div className='card-body'>
                                <div
                                    className='card-title text-cmGrey900'
                                    style={{fontSize: 20, fontWeight: 700}}
                                >
                                    {userManagementList?.totalUsers ?? 0}
                                </div>
                                <div className='card-text text-cmGrey800' style={{fontWeight: 600}}>
                                    Total Users
                                </div>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div
                            className='card w-md-250px w-100 d-flex flex-row justify-content-between align-items-center'
                            style={{borderRadius: 10, backgroundColor: '#D7F9EF'}}
                        >
                            <div className='card-body' style={{borderRight: '1px dashed grey'}}>
                                <div
                                    className='card-title text-cmGrey900'
                                    style={{fontSize: 20, fontWeight: 700}}
                                >
                                    {userManagementList?.totalActiveUsers ?? 0}
                                </div>
                                <div className='card-text text-cmGrey800' style={{fontWeight: 600}}>
                                    Active Users
                                </div>
                            </div>
                            <div className='card-body'>
                                <div
                                    className='card-title text-cmGrey900'
                                    style={{fontSize: 20, fontWeight: 700}}
                                >
                                    {userManagementList?.totalInActiveUsers ?? 0}
                                </div>
                                <div className='card-text text-cmGrey800' style={{fontWeight: 600}}>
                                    Inactive Users
                                </div>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div
                            className='card d-flex w-md-250px w-100 flex-row justify-content-between align-items-center'
                            style={{
                                borderRadius: 10,
                                backgroundColor: '#E1E9FF',
                            }}
                        >
                            <div className='card-body' style={{borderRight: '1px dashed grey'}}>
                                <div
                                    className='card-title text-cmGrey900'
                                    style={{fontSize: 20, fontWeight: 700}}
                                >
                                    {userManagementList?.totalAdminActiveUsers ?? 0}
                                </div>
                                <div className='card-text text-cmGrey800' style={{fontWeight: 600}}>
                                    Active Administrators
                                </div>
                            </div>
                            <div className='card-body'>
                                <div
                                    className='card-title text-cmGrey900'
                                    style={{fontSize: 20, fontWeight: 700}}
                                >
                                    {userManagementList?.totalAdminInActiveUsers ?? 0}
                                </div>
                                <div className='card-text text-cmGrey800' style={{fontWeight: 600}}>
                                    Inactive Administrators
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* table */}
                <UserManagementTable
                    userManagementList={userManagementList}
                    getUserList={getUserList}
                    page={page}
                    onPageChange={(val) => setPage(val)}
                    setSearchTerm={setSearchTerm}
                    setPage={setPage}
                    onSearch={(val) => delaySearch(val)}
                    tableLoading={tableLoading}
                    onUserFilter={(updatedFilter) => onUserFilter(updatedFilter)}
                    onResetFilter={onResetFilter}
                    handleExport={onExportUserData}
                />
            </div>
        </>
    )
}

export default UserManagementPage
