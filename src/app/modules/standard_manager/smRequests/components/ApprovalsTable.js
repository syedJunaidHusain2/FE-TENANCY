import {useCallback, useEffect, useRef, useState} from 'react'

import Pagination from '../../../admin/sequidocs/component/Pagination'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getApprovalListSelector} from '../../../../../redux/selectors/RequestApprovalSelectors'
import {
    exportApprovalHistoryService,
    getAllApprovalListService,
} from '../../../../../services/Services'
import {getApprovalListAction} from '../../../../../redux/actions/RequestApprovalActions'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import RedirectToEmployeeProfile from '../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import debounce from 'lodash.debounce'
import moment from 'moment'
import {
    TABLE_BORDER,
    downloadAnyFileHelper,
    formattedNumberFields,
    getErrorMessageFromResponse,
} from '../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import RequestAndApprovalFilter from '../../../admin/filters/RequestAndApprovalFilter'
import {CustomSortSvg} from '../../../../../_metronic/helpers/components/CustomSortSVG'
import CustomEllipsis from '../../../../../customComponents/customEllipsis/CustomEllipsis'
import {fontsFamily} from '../../../../../assets/fonts/fonts'

const initialFilter = {
    status: '',
    type: '',
}

const ApprovalsTable = ({setApprovalFilters, approvalFilters}) => {
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState('')
    const [searchVal, setSearchVal] = useState('')
    const [fullLoading, setFullLoading] = useState(true)
    const [approvalOrHistoryData, setApprovalOrHistoryData] = useState([])
    const [apiType, setApiType] = useState('approval')
    const [page, setPage] = useState(1)
    const filterRef = useRef()
    const [sortValue, setSortValue] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)

    useEffect(() => {
        // getApprovalList()
        getApprovalOrHistoryData()
    }, [page, searchVal, approvalFilters, sortValue, sortingOrder, apiType])

    const getApprovalOrHistoryData = useCallback(() => {
        setFullLoading(true)
        const params = {
            page: page,
            filter: searchVal,
            status: approvalFilters?.status,
            type: approvalFilters?.type,
            api_type: apiType,
            sort: sortValue,
            sort_val: sortingOrder,
        }

        getAllApprovalListService(params)
            .then((res) => {
                setApprovalOrHistoryData(res?.data)
            })
            .finally(() => setFullLoading(false))
    }, [
        apiType,
        approvalFilters?.status,
        approvalFilters?.type,
        page,
        searchVal,
        sortValue,
        sortingOrder,
    ])

    // useEffect(() => {
    //     const dataWithPendingStatus = approvalList?.data?.filter(
    //         (item) => item?.status == 'Pending'
    //     )

    //     setDisplayData(dataWithPendingStatus)
    // }, [approvalList])

    // useEffect(() => {
    //     if (showAppprovals) {
    //         setFullLoading(true)
    //         getApprovalHistoryService({status: approvalFilters?.status})
    //             .then((res) => {
    //                 setDisplayData(res?.data?.data)
    //             })
    //             .finally(() => setFullLoading(false))
    //         //     const dataWithStatus = approvalList?.data?.filter(
    //         //         (item) => item?.status != 'Pending'
    //         //     )
    //     } else {
    //         const dataWithPendingStatus = approvalList?.data?.filter(
    //             (item) => item?.status == 'Pending'
    //         )
    //         setDisplayData(dataWithPendingStatus)
    //     }
    // }, [showAppprovals, approvalFilters])
    const handleSearchChange = (e) => {
        setPage(1)
        searchApproval(e.target.value)
        setSearchText(e.target.value)
    }
    const searchApproval = useCallback(
        debounce((val) => {
            // setLoading(true)
            setSearchVal(val)
        }, 500),
        []
    )

    const getApprovalList = useCallback(() => {
        setFullLoading(true)

        dispatch(
            getApprovalListAction({page, type: approvalFilters?.type, filter: searchVal})
        ).finally(() => {
            setFullLoading(false)
        })
    }, [approvalFilters?.type, dispatch, page, searchVal])

    const onExportHistoryData = useCallback(() => {
        setFullLoading(true)
        const body = {
            type: approvalFilters?.type,
            filter: searchVal,
        }
        exportApprovalHistoryService(body)
            .then((res) => {
                const fileName = `ApprovalHistory List - ${moment(new Date()).format(
                    'DD MMM YY hh:mm'
                )}.csv`
                downloadAnyFileHelper(res, fileName)
                CustomToast.success('File Downloaded Successfully')
            })
            .catch((err) => {
                CustomToast.success(getErrorMessageFromResponse(err))
            })
            .finally(() => {
                setFullLoading(false)
            })
    }, [approvalFilters?.type, searchVal])

    const resetStates = () => {
        setPage(1)
        setSearchText('')
        setSearchVal('')
    }

    const onApplyFilter = (filters) => {
        resetStates()
        setApprovalFilters(filters)
    }
    const onResetFilter = (filters) => {
        resetStates()
        setApprovalFilters(filters)
    }
    const handleApiType = (apiType) => {
        filterRef?.current?.resetFilter()
        onResetFilter(null)
        setApiType(apiType)
    }
    return (
        <>
            <div
                className={``}
                style={{
                    fontFamily: 'Manrope',

                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <div className='card-body py-0 px-0 mx-0' style={{position: 'relative'}}>
                    <CustomLoader
                        full={true}
                        // visible={displayData?.length <= 0 && fullLoading}
                        visible={fullLoading}
                    />
                    <div
                        className='card bg-cmwhite h-auto'
                        style={{
                            fontSize: '14px',
                            fontFamily: 'Manrope',
                            borderRadius: '0 10px 10px 0',
                        }}
                    >
                        <div className='w-sm-100 mt-4 mb-3'>
                            {/* fILTER */}
                            <div className='d-sm-flex align-items-center justify-content-between ms-sm-10 me-sm-10'>
                                <div className='w-sm-325px w-75 mx-sm-0 mx-auto me-sm-12 py-sm-0 '>
                                    {/* Approval Table Search Input */}
                                    <CustomInput
                                        type={INPUT_TYPE.search}
                                        name='search'
                                        onChange={handleSearchChange}
                                        value={searchText}
                                    />
                                </div>

                                <div className='d-flex gap-5 flex-center flex-wrap mt-sm-0 mt-5   '>
                                    <div style={{height: '43px', overflow: 'hidden'}}>
                                        {/* <CustomLoader
                                            size={50}
                                            visible={
                                                true
                                                // (displayData?.length > 0 && fullLoading) || loading
                                            }
                                        /> */}
                                    </div>

                                    <div>
                                        {
                                            <RequestAndApprovalFilter
                                                initialFilter={initialFilter}
                                                onApplyFilter={(updatedFilter) =>
                                                    onApplyFilter(updatedFilter)
                                                }
                                                resetFilter={onResetFilter}
                                                showStatusFilter={apiType == 'history'}
                                                filterRef={filterRef}
                                            />
                                        }
                                    </div>
                                    {apiType == 'approval' ? (
                                        <CustomButton
                                            type='submit'
                                            buttonType={BUTTON_TYPE.secondary}
                                            buttonLabel={'History'}
                                            onClick={() => handleApiType('history')}
                                            icon='bi bi-clock-history'
                                        />
                                    ) : (
                                        <CustomButton
                                            type='submit'
                                            buttonType={BUTTON_TYPE.secondary}
                                            buttonLabel={'Pending Approvals'}
                                            onClick={() => handleApiType('approval')}
                                            icon='bi bi-clock-history'
                                        />
                                    )}

                                    {apiType == 'history' ? (
                                        <CustomButton
                                            buttonType={BUTTON_TYPE.disabled}
                                            buttonLabel='Export'
                                            buttonSize={BUTTON_SIZE.small}
                                            onClick={onExportHistoryData}
                                            // padding={'py-3'}
                                            icon={'pi pi-file-export'}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='table-responsive  '>
                        <table className='table' style={{tableLayout: 'fixed', width: '100%'}}>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className='bg-cmGrey300  text-cmGrey800'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='p-5' style={{width: '100px'}}>
                                        ID
                                    </th>
                                    <th className=' p-5' style={{width: '200px'}}>
                                        Employee
                                    </th>
                                    <th className=' p-5' style={{width: '125px'}}>
                                        Type
                                    </th>
                                    <th className=' p-5' style={{width: '150px'}}>
                                        Disputed Period
                                    </th>
                                    <th className=' p-5' style={{width: '200px'}}>
                                        <div className='d-flex'>
                                            Amount
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'amount' ? sortingOrder : null
                                                }
                                                onClick={() => {
                                                    setSortValue('amount')
                                                    setSortingOrder(
                                                        sortValue !== 'amount' ? 'asc' : sortingOrder === 'asc' ? 'desc' : 'asc'
                                                    )
                                                    setPage(1)
                                                }}
                                            />
                                        </div>
                                    </th>
                                    <th className='p-5 ' style={{width: '200px'}}>
                                        Reason
                                    </th>
                                    {apiType == 'history' && (
                                        <th className='p-5 ' style={{width: '150px'}}>
                                            Status
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {/* {fullLoading ? (
                                    <tr>
                                        <td colSpan='6'>
                                            <CustomLoader
                                                full={true}
                                                // visible={displayData?.length <= 0 && fullLoading}
                                                visible={fullLoading}
                                            />
                                        </td>
                                    </tr>
                                ) : null} */}
                                {approvalOrHistoryData?.data?.length > 0 ? (
                                    <>
                                        {approvalOrHistoryData?.data?.map((item, i) => {
                                            const tooltipAmount = formattedNumberFields(
                                                item?.amount
                                            )?.props?.children

                                            return (
                                                <tr
                                                    key={i}
                                                    className={`stripRow `}
                                                    style={{
                                                        fontSize: '14px',
                                                        fontFamily: 'Manrope',
                                                    }}
                                                >
                                                    <td className='p-5 '>
                                                        <Link
                                                            to={'particular-request'}
                                                            state={{requestData: item}}
                                                            className='text-cmGrey800 text-decoration-underline'
                                                            style={{fontWeight: '600'}}
                                                        >
                                                            {item?.req_no}
                                                        </Link>
                                                    </td>
                                                    <td
                                                        className='d-flex align-items-center text-decoration-underline gap-2  p-5 text-cmGrey800'
                                                        style={{fontWeight: '600'}}
                                                    >
                                                        <RedirectToEmployeeProfile
                                                            employeeId={item?.employee_id}
                                                        >
                                                            <CustomImage
                                                                src={item?.employee_image}
                                                                className='avatar me-3'
                                                                style={{
                                                                    width: '30px',
                                                                    height: '30px',
                                                                }}
                                                                alt='img'
                                                            />
                                                            {item?.employee_name}
                                                        </RedirectToEmployeeProfile>
                                                    </td>
                                                    <td
                                                        className='p-5  text-cmGrey800'
                                                        style={{fontWeight: '600'}}
                                                    >
                                                        {item?.type}
                                                    </td>

                                                    <td
                                                        className='p-5 text-cmGrey600'
                                                        style={{fontWeight: '500'}}
                                                    >
                                                        {item?.request_on}
                                                    </td>

                                                    <td
                                                        className='p-5 text-cmGrey900'
                                                        style={{fontWeight: '600'}}
                                                    >
                                                        <CustomEllipsis
                                                            style={{
                                                                fontFamily: fontsFamily.manrope,
                                                                whiteSpace: 'nowrap',
                                                                fontSize: '14px',
                                                                width: '100px',
                                                                fontWeight: '600',
                                                            }}
                                                            text={tooltipAmount}
                                                        >
                                                            {formattedNumberFields(
                                                                item?.amount,
                                                                '$'
                                                            )}
                                                        </CustomEllipsis>
                                                    </td>
                                                    <td
                                                        className='p-5 text-cmGrey500'
                                                        style={{fontWeight: '500'}}
                                                    >
                                                        {item?.description ?? '-'}
                                                    </td>
                                                    {apiType == 'history' && (
                                                        <>
                                                            <td
                                                                className={`p-5 ${
                                                                    item?.status === 'Approved'
                                                                        ? 'text-cmOrange'
                                                                        : item?.status === 'Pending'
                                                                        ? 'text-cmOrange'
                                                                        : item?.status ===
                                                                          'Declined'
                                                                        ? 'text-cmError'
                                                                        : item?.status === 'Accept'
                                                                        ? 'text-cminfo'
                                                                        : item?.status === 'Paid'
                                                                        ? 'text-cmSuccess'
                                                                        : ''
                                                                }`}
                                                                style={{fontWeight: '600'}}
                                                            >
                                                                {item?.status === 'Approved'
                                                                    ? 'In progress'
                                                                    : item?.status === 'Pending'
                                                                    ? 'Pending'
                                                                    : item?.status === 'Declined'
                                                                    ? 'Declined'
                                                                    : item?.status === 'Accept'
                                                                    ? 'Scheduled'
                                                                    : item?.status}
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={apiType == 'history' ? 7 : 6}
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
                        totalPages={approvalOrHistoryData?.last_page}
                    />
                </div>
            </div>
        </>
    )
}

export default ApprovalsTable
