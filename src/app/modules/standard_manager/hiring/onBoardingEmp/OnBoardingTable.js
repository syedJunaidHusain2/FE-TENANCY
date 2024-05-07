import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {
    deleteOnBoardingEmployeeListService,
    exportOnBoardingEmployeeListService,
    getOnBoardingEmployeeListService,
} from '../../../../../services/Services'
import _ from 'lodash'
import HireNew from './CompensationPlan/HireNew'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import Pagination from '../../../admin/sequidocs/component/Pagination'
import debounce from 'lodash.debounce'
import AccessRights, {
    isPermittedForAccess,
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../accessRights/AccessRights'
import useOfficeLocation from '../../../../../hooks/useOfficeLocation'
import {
    TABLE_BORDER,
    downloadAnyFileHelper,
    formattedPhoneNumber,
    getBooleanValue,
    getErrorMessageFromResponse,
} from '../../../../../helpers/CommonHelpers'
import {useNavigate} from 'react-router-dom'
import {HireNowModal} from './hireNowModal/HireNowModal'
import {allPermissionsAccess} from '../../../../../accessRights/useCustomAccessRights'
import {
    DIGISIGNER_CONFIG,
    HIRING_PROCESS_STATUS,
    getValidDate,
} from '../../../../../constants/constants'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import OnboardingEmployeeFilter from '../../filters/OnboardingEmployeeFilter'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import {TieredMenu} from 'primereact/tieredmenu'
import CustomDialog from '../../../../../customComponents/customDialog/CustomDialog'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import {getPositionsAction} from '../../../../../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'
import moment from 'moment'
import {KTSVG} from '../../../../../_metronic/helpers'
import {CustomSortSvg} from '../../../../../_metronic/helpers/components/CustomSortSVG'

const initialFilter = {
    status_filter: '',
    position_filter: '',
    manager_filter: '',
    other_status_filter: '',
}
const OnBoardingTable = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const filtereDataRef = useRef()
    const [tableData, setTableData] = useState([])
    const [totalData, setTotalData] = useState(null)
    const [loader, setLoader] = useState(false)
    const [id, setid] = useState()
    const [showHireNowModal, setShowHireNowModal] = useState(false)
    const [stateList, selectedLocation, setSelectedLocation] = useOfficeLocation(null, true)
    const [searchValue, setSearchValue] = useState('')
    const [sortValue, setSortValue] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)

    const [filterData, setFilterData] = useState({
        page: 1,
        filter: '',
    })

    useEffect(() => {
        filtereDataRef.current = filterData
    }, [filterData])

    useEffect(() => {
        dispatch(getPositionsAction())
    }, [])

    const menu = useRef(null)
    const [selectedEmployee, setSelectedEmployee] = useState('')
    const menuItems = [
        {
            label: 'Delete',
            command: (e) => onDeleteDraftTable(),
        },
    ]

    const onDeleteDraftTable = () => {
        CustomDialog.warn('Are you sure you want to delete ?', () => {
            deleteOnBoardingEmployeeListService(selectedEmployee)
                .then(() => {
                    CustomToast.success('Employee deleted successfully')
                    getonbording()
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
        })
    }

    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false)
        setid(null)
    }
    useEffect(() => {
        if (selectedLocation) {
            getonbording()
        }
    }, [filterData, sortValue, sortingOrder, selectedLocation])

    const getonbording = useCallback(() => {
        setLoader(true)
        let filters = {...filterData}
        getOnBoardingEmployeeListService({
            ...filters,
            office_id: selectedLocation,
            sort: sortValue,
            sort_val: sortingOrder,
        })
            .then((res) => {
                setTableData(res?.data?.data)
                setTotalData(res?.data?.last_page)
            })
            .finally(() => {
                setLoader(false)
            })
    }, [filterData, selectedLocation, sortValue, sortingOrder])

    const onChangeSearch = (e) => {
        delaySearch(e?.target?.value)
        setSearchValue(e?.target?.value)
    }
    const onLocationChange = (e) => {
        setFilterData((val) => ({
            ...val,
            page: 1,
        }))
        setSelectedLocation(e.target.value)
    }
    const delaySearch = useCallback(
        debounce((value) => {
            setFilterData((val) => ({
                ...val,
                filter: value,
            }))
        }, 500),
        []
    )
    const onHireNowPress = useCallback((item) => {
        setid(item?.id)
        setShowHireNowModal(true)
    }, [])

    const onApplyFilter = useCallback((filter) => {
        setFilterData((val) => ({
            ...val,
            ...filter,
            page: 1,
        }))
    }, [])
    const onResetFilter = () => {
        setFilterData((val) => ({
            ...val,
            ...initialFilter,
            page: 1,
        }))
    }

    const handleHireNowModalClose = useCallback(() => {
        setShowHireNowModal(false)
        setid(null)
        getonbording()
    }, [getonbording])

    const onExportOnBoardingData = useCallback(() => {
        setLoader(true)
        const body = {
            position_filter: filterData?.position_filter,
            status_filter: filterData?.status_filter,
            manager_filter: filterData?.manager_filter,
            office_id: selectedLocation,
        }
        exportOnBoardingEmployeeListService(body)
            .then((res) => {
                const fileName = `OnBoarding User List - ${moment(new Date()).format(
                    'DD MMM YY hh:mm'
                )}.csv`
                downloadAnyFileHelper(res, fileName)
                CustomToast.success('File Downloaded Successfully')
            })
            .catch((err) => {
                CustomToast.success(getErrorMessageFromResponse(err))
            })
            .finally(() => {
                setLoader(false)
            })
    }, [filterData, selectedLocation])

    if (!selectedLocation) {
        return (
            <div
                className={`card d-flex align-items-center justify-content-center p-10`}
                style={{fontFamily: 'Manrope', fontSize: '16px'}}
            >
                There is no offices on system
            </div>
        )
    }

    return (
        <>
            <div
                className={`card`}
                style={{
                    fontFamily: 'Manrope',
                    borderRadius: '0 10px 10px 10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <div className='card-body shadow-none py-0 px-0 mx-0'>
                    <div
                        className='card bg-white h-auto'
                        style={{fontSize: '17px', fontFamily: 'Manrope', fontWeight: 600}}
                    >
                        <div className='mt-4 mx-sm-7 mb-3 d-flex flex-wrap gap-3 justify-content-between align-items-center'>
                            {/* customer info */}
                            <div className='mx-sm-0 mx-auto d-flex gap-3'>
                                <div style={{alignSelf: 'center'}}>Office:</div>
                                <CustomDropdown
                                    onChange={onLocationChange}
                                    options={stateList}
                                    value={selectedLocation}
                                    showClear={false}
                                />
                            </div>

                            {/* Search form */}
                            <div className='mx-sm-0 mx-auto'>
                                <form className='position-relative' autoComplete='off'>
                                    {/* Onboarding Table Search Input */}
                                    <CustomInput
                                        type={INPUT_TYPE.search}
                                        name='search'
                                        onChange={onChangeSearch}
                                        value={searchValue ?? ''}
                                    />
                                </form>
                            </div>

                            <div className='px-2 d-flex align-items-center flex-wrap gap-5 mx-sm-0 mx-auto'>
                                <OnboardingEmployeeFilter
                                    office_id={selectedLocation}
                                    initialFilter={initialFilter}
                                    onApplyFilter={onApplyFilter}
                                    resetFilter={onResetFilter}
                                />

                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.hiring.onboardingEmployees.add
                                    }
                                >
                                    <CustomButton
                                        buttonSize={BUTTON_SIZE.small}
                                        buttonType={BUTTON_TYPE.primary}
                                        buttonLabel='Hire New'
                                        onClick={() => {
                                            setid(null)
                                            setOpen(true)
                                        }}
                                    />
                                </AccessRights>
                                <div className=''>
                                    <CustomButton
                                        buttonSize={BUTTON_SIZE.small}
                                        buttonType={BUTTON_TYPE.disabled}
                                        buttonLabel='Export'
                                        onClick={onExportOnBoardingData}
                                        icon={'pi pi-file-export'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='table-responsive shadow-none overflow-auto'>
                        <table className='table'>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        fontFamily: 'Manrope',
                                    }}
                                    className=' text-cmGrey800 bg-cmGrey300'
                                >
                                    <th className='w-auto p-5 '>ID</th>
                                    <th className='w-auto p-5 text-cmGrey800'>Name</th>
                                    <th className='w-auto p-5 '>Position</th>
                                    <th className='w-auto p-5'>Office</th>
                                    <th
                                        className='w-auto p-5'
                                        data-toggle='tooltip'
                                        data-placement='left'
                                        title='Value is higher than expected '
                                    >
                                        Manager
                                    </th>
                                    <th
                                        data-toggle='tooltip'
                                        data-placement='left'
                                        title='bonuses, advances, incentives                    '
                                        className='w-auto p-5'
                                    >
                                        Phone
                                    </th>
                                    <th className='w-auto p-5'>Status</th>
                                    <th className='w-auto p-5 text-nowrap'>
                                        <div className='d-flex'>
                                            Last Update
                                            <CustomSortSvg
                                                sortingOrder={
                                                    sortValue === 'last_update'
                                                        ? sortingOrder
                                                        : null
                                                }
                                                onClick={() => {
                                                    setSortValue('last_update')
                                                    setSortingOrder(
                                                        sortValue !== 'last_update' ? 'asc' : sortingOrder === 'asc' ? 'desc' : 'asc'
                                                    )
                                                    setFilterData(() => ({
                                                        page: 1,
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </th>
                                    <th className='w-auto p-5 text-nowrap'></th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {tableData?.length > 0 ? (
                                    <>
                                        {tableData?.map((item, index) => {
                                            return (
                                                <OnboardEmployeeRow
                                                    menu={menu}
                                                    menuItems={menuItems}
                                                    navigate={navigate}
                                                    setOpen={setOpen}
                                                    item={item}
                                                    getonbording={getonbording}
                                                    index={index}
                                                    onHireNowPress={onHireNowPress}
                                                    setid={setid}
                                                    setLoader={setLoader}
                                                    setSelectedEmployee={setSelectedEmployee}
                                                />
                                            )
                                        })}
                                    </>
                                ) : (
                                    <tr className='no-data'>
                                        <td
                                            colSpan={8}
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
                <CustomLoader full visible={loader}></CustomLoader>
            </div>
            {tableData?.length > 0 ? (
                <Pagination
                    setPage={(pg) => {
                        setFilterData((val) => ({
                            ...val,
                            page: pg,
                        }))
                    }}
                    page={filterData?.page}
                    totalPages={totalData}
                />
            ) : null}

            {open ? (
                <HireNew
                    show={open}
                    handleClose={handleClose}
                    getonbording={getonbording}
                    setLoader={setLoader}
                />
            ) : null}

            {showHireNowModal ? (
                <HireNowModal
                    handleClose={handleHireNowModalClose}
                    show={showHireNowModal}
                    id={id}
                />
            ) : null}
        </>
    )
}

export default OnBoardingTable

const OnboardEmployeeRow = ({
    item,
    index,
    menu,
    menuItems,
    navigate,
    onHireNowPress,
    setid,
    setSelectedEmployee,
    getonbording,
    setLoader,
}) => {
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
        setid(null)
    }

    return (
        <>
            {open ? (
                <HireNew
                    id={item?.id}
                    show={open}
                    handleClose={handleClose}
                    getonbording={getonbording}
                    setLoader={setLoader}
                />
            ) : null}
            <tr
                key={item?.id}
                style={{
                    height: '40px',
                    fontSize: '14px',
                    fontFamily: 'Manrope',
                    fontWeight: '500',
                }}
                className='stripRow '
            >
                <td className='text-cmGrey700 p-5' style={{fontWeight: 500}}>
                    {item?.id ?? 'null'}
                </td>
                <td className='p-5 text-start  text-nowrap text-cmGrey800 text-decoration-underline cursor-pointer'>
                    <div
                        onClick={() =>
                            navigate('/onboard-employe-profile/employement-package', {
                                state: {
                                    id: item?.id,
                                    moduleType: 'onboarding',
                                },
                            })
                        }
                    >
                        <p
                            style={{
                                textAlign: 'start',
                                fontWeight: 600,
                            }}
                            className=''
                        >
                            {item.first_name} {item.last_name}
                        </p>
                    </div>
                </td>

                <td className='p-5 text-cmGrey700' style={{fontWeight: 500}}>
                    {item.sub_position_name ?? 'null'}
                </td>

                <td className='p-5 text-cmGrey700' style={{fontWeight: 500}}>
                    <p>{item.office_name ?? 'null'}</p>
                </td>

                <td className='p-5 text-cmGrey700 text-nowrap' style={{fontWeight: 500}}>
                    {item.manager_name ?? 'null'}
                </td>
                <td className='p-5 text-cmGrey700 text-nowrap' style={{fontWeight: 500}}>
                    {formattedPhoneNumber(item.mobile_no) ?? 'NA'}
                </td>

                <td
                    className='px-5 py-3 text-cmGrey700 d-flex gap-3 '
                    style={{
                        fontWeight: 500,
                    }}
                >
                    {[HIRING_PROCESS_STATUS.declined].includes(item?.status_id) ? (
                        <span className='text-nowrap pt-2 text-danger'>Offer Letter Rejected</span>
                    ) : null}

                    {[HIRING_PROCESS_STATUS.adminRejected].includes(item?.status_id) ? (
                        <span className='text-nowrap pt-2 text-danger'>Admin Rejected</span>
                    ) : null}

                    {[HIRING_PROCESS_STATUS.active].includes(item?.status_id) ? (
                        <span className='text-nowrap pt-2 text-success'>{item?.status_name}</span>
                    ) : null}

                    {[
                        HIRING_PROCESS_STATUS.offerLetterSent,
                        HIRING_PROCESS_STATUS.requestedChange,
                        HIRING_PROCESS_STATUS.onboardFollowUp,
                        HIRING_PROCESS_STATUS.offerLetterRejected,
                        HIRING_PROCESS_STATUS.offerLetterAccepted,
                        HIRING_PROCESS_STATUS.offerLetterResent,
                    ].includes(item.status_id) ? (
                        <span className='text-nowrap pt-2'>{item.status_name}</span>
                    ) : null}

                    {[HIRING_PROCESS_STATUS.onboarding].includes(item.status_id) ? (
                        <span className='text-nowrap pt-2'>Onboarding</span>
                    ) : null}

                    {item.status_id === HIRING_PROCESS_STATUS.offerExpired && (
                        <span className='text-cmError pt-2'>{item.status_name}</span>
                    )}

                    {item.status_id === HIRING_PROCESS_STATUS.draft && (
                        <span
                            className='cursor-pointer text-cmBlue-Crayola text-nowrap '
                            style={{
                                textDecoration: 'underline',
                                fontWeight: 500,
                            }}
                            onClick={() => {
                                if (
                                    isPermittedForAccess({
                                        permission:
                                            PERMISSIONS_GROUP.standard.hiring.onboardingEmployees,
                                        type: PERMISSION_TYPE.edit,
                                        forManager: true,
                                    })
                                ) {
                                    setid(item.id)
                                    setOpen(true)
                                }
                            }}
                        >
                            {item.status_name}
                        </span>
                    )}

                    {item.status_id === HIRING_PROCESS_STATUS.accepted && (
                        <>
                            {allPermissionsAccess.standard.hiring.onboardingEmployees.hireNowFunc() ? (
                                <>
                                    {[1, 2]?.includes(item?.other_doc_status?.w9) &&
                                    [1, 2]?.includes(
                                        item?.other_doc_status?.backgroundVerification
                                    ) ? (
                                        <div className='text-nowrap pt-1'>
                                            <CustomButton
                                                buttonType={BUTTON_TYPE.primary}
                                                buttonLabel=' Hire Now'
                                                onClick={() => onHireNowPress(item)}
                                                buttonSize={BUTTON_SIZE.small}
                                            />
                                        </div>
                                    ) : (
                                        <>{'Offer Letter Accepted'}</>
                                    )}
                                </>
                            ) : (
                                <>{item?.status_name}</>
                            )}
                        </>
                    )}
                </td>

                <td className='p-5 text-cmGrey700 ' style={{fontWeight: 500}}>
                    {getValidDate(item.last_update)}
                </td>

                <td className='p-5 text-cmGrey700 ' style={{fontWeight: 500}}>
                    {[
                        HIRING_PROCESS_STATUS.draft,
                        HIRING_PROCESS_STATUS.declined,
                        HIRING_PROCESS_STATUS.offerExpired,
                        HIRING_PROCESS_STATUS.offerLetterAccepted,
                        HIRING_PROCESS_STATUS.offerLetterSent,
                        HIRING_PROCESS_STATUS.offerLetterResent,
                        HIRING_PROCESS_STATUS.requestedChange,
                    ].includes(Number(item.status_id)) ? (
                        <div className=''>
                            <TieredMenu
                                className='bg-cmwhite '
                                style={{borderRadius: '10px'}}
                                model={menuItems}
                                popup
                                ref={menu}
                                breakpoint='767px'
                            />
                            <div
                                className='bi bi-three-dots-vertical fs-2 text-cmGrey500 cursor-pointer'
                                onClick={(e) => {
                                    setSelectedEmployee(item.id)
                                    menu.current.toggle(e)
                                }}
                            ></div>
                        </div>
                    ) : null}
                </td>
            </tr>
        </>
    )
}
