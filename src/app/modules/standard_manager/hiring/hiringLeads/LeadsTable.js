import {useCallback, useEffect, useState} from 'react'
import clsx from 'clsx'
import {KTSVG} from '../../../../../_metronic/helpers'
import {AddNewLeadsPopUp} from './AddNewLeadsPopUp'
import {
    changeLeadStatusService,
    deleteLeadService,
    exportLeadsDataService,
    getHireLeadsListService,
    leadsFilterService,
} from '../../../../../services/Services'
import {SchedulePopup} from './SchedulePopup'
import {HIRING_PROCESS_STATUS} from '../../../../../constants/constants'
import Pagination from '../../../admin/sequidocs/component/Pagination'
import debounce from 'lodash.debounce'

import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import HireNew from '../onBoardingEmp/CompensationPlan/HireNew'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../accessRights/AccessRights'
import {
    TABLE_BORDER,
    downloadAnyFileHelper,
    formattedPhoneNumber,
    getErrorMessageFromResponse,
} from '../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import {useNavigate} from 'react-router-dom'
import {AssignModal} from '../../onBoardEmployeProfile/AssignModal'
import {Dialog} from 'primereact/dialog'
import CustomDialog from '../../../../../customComponents/customDialog/CustomDialog'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import LeadsTableFilter from '../../filters/LeadsTableFilter'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import {allPermissionsAccess} from '../../../../../accessRights/useCustomAccessRights'
import moment from 'moment'

const initialFilter = {
    status_filter: '',
    home_state_filter: '',
    recruter_filter: '',
    sources: '',
}

const LeadsTable = () => {
    const [open, setOpen] = useState(false)
    const [hireOpen, setHireOpen] = useState(false)
    const [statusPopup, setStatusPopup] = useState(false)
    const [tableData, setTableData] = useState([])
    const [hireData, setHireData] = useState([])
    const [openAssigne, setOpenAssigne] = useState(false)
    const [updatedStatus, setUpdatedStatus] = useState(null)
    const [totalData, setTotalData] = useState(null)
    const [page, setPage] = useState(1)
    const [userData, setUserData] = useState(null)
    const [editData, setEditData] = useState(null)
    const [search, setSearch] = useState('')
    const [searchVal, setSearchVal] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [statusModal, setStatusModal] = useState(false)
    const [filterData, setFilterData] = useState(initialFilter)

    const handleClose = () => {
        setOpen(false)
    }

    const handleHireClose = () => {
        setHireOpen(false)
        getHiringList()
    }
    const handleStatusPopup = () => {
        setStatusPopup(false)
    }
    const handleAssignePopup = () => {
        setOpenAssigne(false)
        getHiringList()
    }
    // const handleReject = (id) => {
    //   const body = {
    //     interview_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    //     // interview_schedule_by_id: null,
    //     action_status: 'Rejected',
    //   }
    //   postRescheduleInterviewService(id, body).finally(
    //     () => getHiringList(),
    //     CustomToast.error('Rejected')
    //   )
    // }
    const handleReject = (id) => {
        setLoading(true)
        changeLeadStatusService(id, HIRING_PROCESS_STATUS.rejected)
            .then(() => {
                getHiringList()
                CustomToast.success('Status updated')
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }

    const handleInterviewDone = (id) => {
        setLoading(true)
        changeLeadStatusService(id, HIRING_PROCESS_STATUS.interviewDone)
            .then(() => {
                CustomToast.success('Status updated')
                getHiringList()
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }

    const handleReconsider = (id) => {
        setLoading(true)
        changeLeadStatusService(id, HIRING_PROCESS_STATUS.followUp)
            .then(() => {
                getHiringList()
                CustomToast.success('Status updated')
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }

    const handleHire = (data, hireDirect = false) => {
        setHireData({
            first_name: data?.first_name,
            last_name: data?.last_name,
            email: data?.email,
            mobile_no: data?.mobile_no,
            recruiter_id: data?.recruiter?.id,
            recruiter_name: `${data?.recruiter?.first_name} ${data?.recruiter?.last_name}`,
            hireDirect,
        })
        setHireOpen(true)
    }

    const changeStatus = (statusValue) =>
        new Promise((resolve, reject) => {
            setLoading(true)
            changeLeadStatusService(userData?.id, statusValue)
                .then(resolve)
                .catch(reject)
                .finally(getHiringList)
        })

    useEffect(() => {
        getHiringList()
    }, [page, search, filterData])

    const data = {page: page, filter: search, ...filterData}
    const getHiringList = () => {
        setLoading(true)
        getHireLeadsListService(data)
            .then((res) => {
                setTableData(res?.data)
                setTotalData(res?.data?.last_page)
            })
            .finally(() => setLoading(false))
    }

    const onChangeSearch = (e) => {
        setSearchVal(e?.target?.value)
        delaySearch(e?.target?.value)
    }
    const delaySearch = useCallback(
        debounce((value) => {
            setSearch(value)
        }, 500),
        []
    )

    const handleAction = (e, data) => {
        setUserData(data)
        if (e == 1) setStatusPopup(true)
        if (e == 2) {
            handleHire(data)
        }
        if (e == 3) handleReject(data?.id)
        if (e == 4) setOpenAssigne(true)
        if (e == 5) handleInterviewDone(data?.id)
        if (e == 6) {
            setEditData(data)
            setOpen(true)
        }

        if (e == 7) {
            CustomDialog.warn('Are you sure you want to delete ?', () => {
                setLoading(true)
                deleteLeadService(data?.id)
                    .then(() => getHiringList())
                    .finally(() => {
                        setLoading(false)
                        CustomToast.success('Lead deleted successfully')
                    })
            })
        }
        if (e == 8) handleReconsider(data?.id)
        if (e == 9) handleHire(data, true)
    }

    const onStatusChange = (status) => {
        changeLeadStatusService(userData?.id, updatedStatus)
            .then(() => {
                getHiringList()
                setStatusModal(false)
                CustomToast.success('Status updated')
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }

    //    DropDown Options
    const getOptions = useCallback((item) => {
        let data = []
        // / Schedule / Reschedule Interview /
        if (HIRING_PROCESS_STATUS.Leadhired != item?.status) {
            if (
                [
                    HIRING_PROCESS_STATUS.followUp,
                    HIRING_PROCESS_STATUS.interviewScheduled,
                    HIRING_PROCESS_STATUS.interviewRescheduled,
                ].includes(item?.status)
            ) {
                data.push({
                    name: item?.interview_time ? 'Reschedule Interview' : 'Schedule Interview',
                    value: 1,
                })
            }

            // / Hire /
            if (
                item?.status == HIRING_PROCESS_STATUS.interviewDone &&
                item?.status != HIRING_PROCESS_STATUS.rejected &&
                allPermissionsAccess.standard.hiring.onboardingEmployees.hireNowFunc()
            ) {
                data.push({name: 'Hire', value: 2})
            }

            // / Hire Directly /
            if (allPermissionsAccess.standard.hiring.onboardingEmployees.hireNowFunc()) {
                data.push({name: 'Hire Directly', value: 2})
            }

            // / Assign /
            if (
                [
                    HIRING_PROCESS_STATUS.followUp,
                    HIRING_PROCESS_STATUS.interviewScheduled,
                    HIRING_PROCESS_STATUS.interviewRescheduled,
                ].includes(item?.status)
            ) {
                data.push({name: 'Assign', value: 4})
            }

            // / Interview Done /
            if (
                item?.interview_time &&
                ![HIRING_PROCESS_STATUS.rejected, HIRING_PROCESS_STATUS.interviewDone].includes(
                    item?.status
                )
            ) {
                data.push({name: 'Interview Done', value: 5})
            }

            // / Edit Lead /
            if (item?.status != HIRING_PROCESS_STATUS.rejected) {
                data.push({name: 'Edit Lead', value: 6})
            }

            // / Reject /
            if (item?.status != HIRING_PROCESS_STATUS.rejected) {
                data.push({name: 'Reject', value: 3})
            }

            // / Delete /
            data.push({name: 'Delete', value: 7})

            // / Reconcider /
            if ([HIRING_PROCESS_STATUS.rejected].includes(item?.status)) {
                data.push({name: 'Reconsider', value: 8})
            }
        }

        return data
    }, [])
    const applyFilter = (filter) => {
        setPage(1)
        // setLoading(true)
        setFilterData(filter)
        setSearch('')
        setSearchVal('')
    }

    const onResetFilter = () => {
        setPage(1)

        setFilterData(initialFilter)
        // getlocation()
    }
    const onExportLeadsData = useCallback(() => {
        setLoading(true)
        const body = {
            status: filterData?.status_filter,
            state: filterData?.home_state_filter,
        }
        exportLeadsDataService(body)
            .then((res) => {
                const fileName = `Leads List - ${moment(new Date()).format('DD MMM YY hh:mm')}.csv`
                downloadAnyFileHelper(res, fileName)
                CustomToast.success('File Downloaded Successfully')
            })
            .catch((err) => {
                CustomToast.success(getErrorMessageFromResponse(err))
            })
            .finally(() => {
                setLoading(false)
            })
    }, [filterData?.home_state_filter, filterData?.status_filter])

    return (
        <>
            <div
                className={`bg-cmwhite`}
                style={{
                    fontFamily: 'Manrope',
                    position: 'relative',
                    borderRadius: '0px 10px 10px 10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <Dialog
                    header='Update Status'
                    visible={statusModal}
                    style={{width: '40vw', height: '15vw', background: '#c1cde4'}}
                    onHide={() => {
                        setStatusModal(false)
                    }}
                >
                    <div className='mt-6' style={{fontSize: '14px'}}>
                        <div className='justify-content-between w-100 px-sm-0 px-1   text-center fs-3 mb-10'>
                            <select
                                className='form-select py-2 cursor-pointer w-225px mx-auto bg-cmGrey200 border-0 fw-bold'
                                onChange={(e) => setUpdatedStatus(e.target.value)}
                                value={updatedStatus}
                            >
                                <option value={''}>Select</option>
                                <option value={HIRING_PROCESS_STATUS.interviewDone}>
                                    {HIRING_PROCESS_STATUS.interviewDone}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className='justify-content-between text-center fs-3'>
                        <button
                            onClick={() => {
                                onStatusChange()
                            }}
                            className={clsx('btn btn-sm fw-bold text-cmwhite bg-cmBlue-Crayola')}
                            style={{
                                fontSize: '12px',
                                fontFamily: 'Manrope',
                            }}
                        >
                            Update Status
                        </button>
                    </div>
                </Dialog>
                <CustomLoader full visible={loading} />

                <div className='py-0 px-0 mx-0'>
                    <div
                        className='d-flex flex-wrap h-auto'
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        <div className='w-100 mt-4 ms-sm-7 ms-5 mb-3 d-flex flex-wrap gap-3 justify-content-between align-items-center'>
                            {/* customer info */}
                            <div
                                style={{
                                    fontFamily: 'Manrope',
                                    fontWeight: '600',
                                    fontSize: '17px',
                                }}
                                className='text-cmGrey900'
                            >
                                Leads
                            </div>

                            {/* Search form */}
                            <div
                                style={{height: '43px', borderRadius: '20px'}}
                                className='me-2 mb-1 me-sm-12'
                                id='kt_chat_contacts_header'
                            >
                                <form
                                    className='position-relative'
                                    style={{borderRadius: '90px'}}
                                    autoComplete='off'
                                >
                                    {/* LEADS Table Search Input */}
                                    <CustomInput
                                        type={INPUT_TYPE.search}
                                        name='search'
                                        onChange={onChangeSearch}
                                        value={searchVal}
                                    />
                                </form>
                            </div>

                            <div className='me-7 d-flex gap-5'>
                                {/* filter button */}
                                <LeadsTableFilter
                                    initialFilter={initialFilter}
                                    onApplyFilter={(updatedFilter) => applyFilter(updatedFilter)}
                                    resetFilter={onResetFilter}
                                />

                                <AccessRights
                                    customCondition={allPermissionsAccess.standard.hiring.leads.add}
                                >
                                    <CustomButton
                                        buttonType={BUTTON_TYPE.primary}
                                        buttonLabel=' Add New'
                                        buttonSize={BUTTON_SIZE.small}
                                        onClick={() => {
                                            setEditData(null)
                                            setOpen(true)
                                        }}
                                    />
                                </AccessRights>
                                <CustomButton
                                    buttonType={BUTTON_TYPE.disabled}
                                    buttonLabel='Export'
                                    onClick={onExportLeadsData}
                                    buttonSize={BUTTON_SIZE.small}
                                    icon={'pi pi-file-export'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='table-responsive shadow-none overflow-auto'>
                        <table className='table'>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className='bg-cmGrey300 text-cmGrey900 '
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='text-nowrap p-5'>Name</th>
                                    <th className='text-nowrap p-5'>Source</th>
                                    <th className='text-nowrap p-5'>Phone</th>
                                    <th className='text-nowrap p-5'>Email</th>
                                    <th className='text-nowrap p-5'>Home Location</th>
                                    <th className='text-nowrap p-5'>Reporting Manager</th>
                                    <th className='text-nowrap p-5'>Status</th>
                                    <th className='text-nowrap p-5'>Action</th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {tableData?.data?.length > 0 ? (
                                    <>
                                        {tableData?.data?.map((item, index) => (
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
                                                <td
                                                    className='p-5 text-nowrap text-cmGrey800 text-decoration-underline cursor-pointer'
                                                    style={{fontWeight: '600'}}
                                                    onClick={() =>
                                                        navigate(
                                                            '/onboard-employe-profile/personal-info',
                                                            {
                                                                state: {
                                                                    id: item?.id,
                                                                    moduleType: 'leads',
                                                                },
                                                            }
                                                        )
                                                    }
                                                >
                                                    {item?.first_name} {item?.last_name}
                                                </td>
                                                <td className='p-5 text-nowrap text-start'>
                                                    {item?.source ?? '-'}{' '}
                                                </td>

                                                <td className='p-5 text-nowrap'>
                                                    {formattedPhoneNumber(item?.mobile_no)}
                                                </td>

                                                <td className='p-5 text-nowrap'>{item?.email}</td>
                                                <td className='p-5 text-nowrap'>
                                                    {item?.state?.name ?? ''}
                                                </td>

                                                <td className='p-5 text-nowrap'>
                                                    {item?.reporting_manager?.first_name}{' '}
                                                    {item?.reporting_manager?.last_name}
                                                </td>
                                                <td className='p-5 text-nowrap'>{item?.status}</td>

                                                <AccessRights
                                                    customCondition={
                                                        allPermissionsAccess.standard.hiring.leads
                                                            .edit
                                                    }
                                                >
                                                    <td className='p-5 text-nowrap'>
                                                        <CustomDropdown
                                                            options={getOptions(item)}
                                                            searching={false}
                                                            showClear={false}
                                                            value={item?.status}
                                                            placeholder='Do Action'
                                                            onChange={(e) =>
                                                                handleAction(e.target.value, item)
                                                            }
                                                        />
                                                    </td>
                                                </AccessRights>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
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

            {hireOpen ? (
                <HireNew
                    show={hireOpen}
                    handleClose={handleHireClose}
                    hireDirect={hireData?.hireDirect}
                    getonbording={() => {}}
                    lead_id={userData?.id}
                    recruiter_id={userData?.recruiter_id}
                    prefieldData={hireData}
                />
            ) : null}
            {openAssigne ? (
                <AssignModal
                    show={openAssigne}
                    handleClose={handleAssignePopup}
                    leadId={userData?.id}
                    setLoading={setLoading}
                />
            ) : null}

            {tableData?.data?.length > 0 ? (
                <Pagination setPage={setPage} page={page} totalPages={totalData} />
            ) : null}
            {open ? (
                <AddNewLeadsPopUp
                    show={open}
                    handleClose={handleClose}
                    getList={getHiringList}
                    preData={editData}
                />
            ) : null}
            {statusPopup ? (
                <SchedulePopup
                    show={statusPopup}
                    handleClose={handleStatusPopup}
                    userData={userData}
                    getHiringList={getHiringList}
                    changeStatus={changeStatus}
                />
            ) : null}
        </>
    )
}

export default LeadsTable
