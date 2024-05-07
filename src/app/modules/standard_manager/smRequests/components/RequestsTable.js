import {useCallback, useEffect, useRef, useState} from 'react'
import {RequestsPop} from './RequestsPop'
import Pagination from '../../../admin/sequidocs/component/Pagination'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {getAdjustmentTypeAction} from '../../../../../redux/actions/RequestApprovalActions'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {getAlLRequestsListService} from '../../../../../services/Services'
import AccessRights from '../../../../../accessRights/AccessRights'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import {allPermissionsAccess} from '../../../../../accessRights/useCustomAccessRights'
import {REQUEST_STATUS_INFO} from '../../../../../constants/constants'
import CustomOverlayPanel from '../../../../../customComponents/customOverlayPanel/CustomOverlayPanel'
import {fontsFamily} from '../../../../../assets/fonts/fonts'
import RequestAndApprovalFilter from '../../../admin/filters/RequestAndApprovalFilter'
import debounce from 'lodash.debounce'

import {TABLE_BORDER, formattedNumberFields} from '../../../../../helpers/CommonHelpers'
import {CustomSortSvg} from '../../../../../_metronic/helpers/components/CustomSortSVG'
const initialFilter = {
    status: '',
    type: '',
}

export const STATUS_DROPDOWN_VALUES = [
    {name: 'Scheduled', value: 'Accept'},
    {name: 'Paid', value: 'Paid'},
    {name: 'Pending', value: 'Pending'},
    {name: 'In Progress', value: 'Approved'},

    {name: 'Declined', value: 'Declined'},
]

const RequestsTable = ({setRequestFilters, requestFilters}) => {
    const dispatch = useDispatch()
    const overLayRef = useRef(null)
    const [showCreateRequestModal, setShowCreateRequestModa] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchVal, setSearchVal] = useState('')
    const [fullLoading, setFullLoading] = useState(true)
    const [tableLoading, setTableLoading] = useState(false)
    const [displayData, setDisplayData] = useState(null)
    const [page, setPage] = useState(1)
    const [sortValue, setSortValue] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)

    useEffect(() => {
        dispatch(getAdjustmentTypeAction())
    }, [])


    useEffect(() => {
        setPage(1)
    }, [searchVal])

    const getRequestList = useCallback(() => {
        setFullLoading(true)
        setTableLoading(true)
        getAlLRequestsListService({
            page,
            filter: searchVal,
            status: requestFilters?.status,
            type: requestFilters?.type,
            sort: sortValue,
            sort_val: sortingOrder,
        })
            .then((res) => {
                setDisplayData(res?.data)
            })
            .finally(() => {
                setTableLoading(false)
                setFullLoading(false)
            })
    }, [page, requestFilters?.status, requestFilters?.type, searchVal, sortValue, sortingOrder])

    useEffect(() => {
        getRequestList()
    }, [searchVal, page, sortValue, sortingOrder, requestFilters])

    const handleClose = () => {
        setShowCreateRequestModa(false)
        getRequestList()
    }
    const handleSearchChange = (e) => {
        setSearchText(e?.target?.value)

        delaySave(e?.target?.value)
    }
    const delaySave = useCallback(
        debounce((val) => {
            setSearchVal(val)
            // setLoading(true)
        }, 500),
        []
    )

    const onPageChange = (val) => {
        setTableLoading(true)
        setPage(val)
    }

    const statusOverleyTemplate = (
        <div className='p-2 bg-cmInfo text-dark'>
            {REQUEST_STATUS_INFO.map((item) => (
                <>
                    <div
                        className={item?.headClass}
                        style={{
                            fontFamily: fontsFamily.manrope,
                            fontSize: '14px',
                            fontWeight: '700',
                        }}
                    >
                        {item?.name}
                    </div>
                    <ul>
                        <li
                            className='text-cmGrey700'
                            style={{
                                fontFamily: fontsFamily.manrope,
                                fontSize: '12px',
                                fontWeight: '700',
                            }}
                        >
                            {item?.value}
                        </li>
                    </ul>
                </>
            ))}
        </div>
    )

    const onApplyFilter = (filters) => {
        setPage(1)
        setSearchText('')
        setSearchVal('')
        setRequestFilters(filters)
    }
    const onResetFilter = (filters) => {
        setPage(1)
        setSearchText('')
        setSearchVal('')
        setRequestFilters(filters)
    }
    return (
        <>
            <div
                className={`card`}
                style={{
                    fontFamily: 'Manrope',
                    position: 'relative',
                    borderRadius: '0 10px 10px 10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <div className='card-body py-0 px-0 mx-0'>
                    <div
                        className='shadow-none bg-cmwhite h-auto'
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        <div className='w-sm-100 mt-4 mb-3'>
                            {/* fILTER */}
                            <div className='d-sm-flex align-items-center justify-content-between ms-sm-10 me-sm-10'>
                                <div className='mx-sm-0 mx-auto w-sm-auto '>
                                    {/* <form
                                        className='position-relative'
                                        style={{borderRadius: '90px'}}
                                        autoComplete='off'
                                    > */}
                                    <CustomInput
                                        type={INPUT_TYPE.search}
                                        name='search'
                                        onChange={handleSearchChange}
                                        value={searchText}
                                    />
                                    {/* </form> */}
                                </div>

                                <div className='d-flex flex-wrap  gap-5 mt-sm-0 mt-5   '>
                                    <div style={{height: '43px', overflow: 'hidden'}}>
                                        <CustomLoader
                                            size={50}
                                            visible={displayData?.length > 0 && fullLoading}
                                        />
                                    </div>
                                    <div>
                                        <RequestAndApprovalFilter
                                            initialFilter={initialFilter}
                                            onApplyFilter={(updatedFilter) =>
                                                onApplyFilter(updatedFilter)
                                            }
                                            resetFilter={onResetFilter}
                                        />
                                    </div>

                                    <AccessRights
                                        customCondition={
                                            allPermissionsAccess.standard.requestAndApprovels
                                                .myRequests.edit
                                        }
                                    >
                                        <CustomButton
                                            buttonType={BUTTON_TYPE.primary}
                                            buttonLabel='Request'
                                            buttonSize={BUTTON_SIZE.small}
                                            onClick={() => setShowCreateRequestModa(true)}
                                        />
                                    </AccessRights>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='table-responsive  overflow-auto' style={{position: 'relative'}}>
                        <CustomLoader full visible={tableLoading} />

                        <table className='table' style={{tableLayout: 'fixed', width: '100%'}}>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className='text-cmGrey900 bg-cmGrey300'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th
                                        className='p-5 w-xxl-150px w-100px'
                                        // style={{maxWidth: '150px', width: '150px'}}
                                    >
                                        ID
                                    </th>
                                    <th
                                        className='p-5 w-xxl-150px w-100px'
                                        // style={{maxWidth: '150px', width: '150px'}}
                                    >
                                        Type
                                    </th>
                                    <th
                                        className='p-5 w-xxl-200px w-150px p-5 '
                                        // style={{maxWidth: '200px', width: '200px'}}
                                    >
                                        <div className='d-flex'>
                                            Disputed Period
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'disputed' ? sortingOrder : null
                                                }
                                                onClick={() => {
                                                    setSortValue('disputed')
                                                    setSortingOrder(
                                                        sortValue !== 'disputed' ? 'asc' : sortingOrder === 'asc' ? 'desc' : 'asc'
                                                    )
                                                    setPage(1)
                                                }}
                                            />
                                        </div>
                                    </th>
                                    <th
                                        className='p-5 p-5 w-xxl-200px w-150px'
                                        // style={{maxWidth: '200px', width: '200px'}}
                                    >
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
                                    <th
                                        className='p-5 p-5 w-xxl-275px w-200px'
                                        // style={{maxWidth: '275px', width: '275px'}}
                                    >
                                        Reason
                                    </th>
                                    <th className='p-5 w-xxl-150px w-100px'>
                                        <div className='d-flex gap-2'>
                                            <span>Status</span>
                                            <span>
                                                <CustomOverlayPanel
                                                    templateData={statusOverleyTemplate}
                                                />
                                            </span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER} style={{fontWeight: 600}}>
                                <tr>
                                    <td colSpan='6' className='m-0 p-0'>
                                        <CustomLoader
                                            full={true}
                                            visible={displayData?.length <= 0 && fullLoading}
                                        />
                                    </td>
                                </tr>
                                {displayData?.data?.length > 0 ? (
                                    <>
                                        {displayData?.data?.map((item) => (
                                            <tr
                                                key={item?.id}
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                }}
                                                className={`stripRow`}
                                            >
                                                <td className='p-5 '>
                                                    <Link
                                                        to={'particular-request'}
                                                        state={{requestData: item}}
                                                        className='text-cmGrey800 text-decoration-underline cursor-pointer'
                                                        style={{fontWeight: '600'}}
                                                    >
                                                        {item?.req_no}
                                                    </Link>
                                                </td>
                                                <td
                                                    className='text-cmGrey800 p-5'
                                                    style={{fontWeight: '600'}}
                                                >
                                                    {item?.type}
                                                </td>

                                                <td
                                                    className='text-cmGrey600 p-5'
                                                    style={{fontWeight: '500'}}
                                                >
                                                    {item?.request_on}
                                                </td>
                                                <td
                                                    className='text-cmGrey900 p-5'
                                                    style={{fontWeight: '600'}}
                                                >
                                                    {formattedNumberFields(item?.amount, '$')}
                                                </td>
                                                <td
                                                    className='text-cmGrey600 p-5'
                                                    style={{fontWeight: '500'}}
                                                >
                                                    {item?.description}
                                                </td>

                                                <td
                                                    className={`p-5 ${
                                                        item?.status === 'Approved'
                                                            ? 'text-cmOrange'
                                                            : item?.status === 'Pending'
                                                            ? 'text-cmOrange'
                                                            : item?.status === 'Declined'
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
                </div>
            </div>

            {displayData?.data?.length > 0 ? (
                <Pagination
                    page={page}
                    setPage={(changedPage) => onPageChange(changedPage)}
                    totalPages={displayData?.last_page}
                />
            ) : null}

            {showCreateRequestModal && (
                <RequestsPop
                    show={showCreateRequestModal}
                    handleClose={() => {
                        handleClose()
                    }}
                />
            )}
        </>
    )
}

export default RequestsTable
