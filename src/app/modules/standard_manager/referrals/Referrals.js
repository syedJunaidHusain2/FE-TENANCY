import {useCallback, useEffect, useState} from 'react'
import clsx from 'clsx'
import {KTSVG} from '../../../../_metronic/helpers'
import {AddNewLeadsPopUp} from '../hiring/hiringLeads/AddNewLeadsPopUp'
import {
    changeLeadStatusService,
    getHireLeadsListService,
    postRescheduleInterviewService,
    scheduleInterviewService,
} from '../../../../services/Services'

import moment from 'moment'
import {SchedulePopup} from '../hiring/hiringLeads/SchedulePopup'
import {HIRING_PROCESS_STATUS, getValidDate} from '../../../../constants/constants'
import Pagination from '../../admin/sequidocs/component/Pagination'
import debounce from 'lodash.debounce'
import CustomLoader from '../../../../customComponents/customLoader/CustomLoader'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../accessRights/AccessRights'
import {formattedPhoneNumber, getErrorMessageFromResponse} from '../../../../helpers/CommonHelpers'
import CustomToast from '../../../../customComponents/customToast/CustomToast'
import HireNew from '../hiring/onBoardingEmp/CompensationPlan/HireNew'
import {getUserDataSelector} from '../../../../redux/selectors/AuthSelectors'
import {useSelector} from 'react-redux'
import {Dialog} from 'primereact/dialog'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'

const Referrals = () => {
    const [open, setOpen] = useState(false)
    const [hireOpen, setHireOpen] = useState(false)
    const [statusPopup, setStatusPopup] = useState(false)
    const [tableData, setTableData] = useState([])
    const [hireData, setHireData] = useState([])
    const [statusModal, setStatusModal] = useState(false)

    const [totalData, setTotalData] = useState(null)
    const [page, setPage] = useState(1)
    const [popupHead, setPopupHead] = useState('')
    const [itemid, setItemId] = useState(null)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    // for sceduling
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [userData, setUserData] = useState(null)
    const [editData, setEditData] = useState(null)

    const loggedUserData = useSelector(getUserDataSelector)

    const handleClose = () => {
        setOpen(false)
    }

    const handleHireClose = () => {
        setHireOpen(false)
    }
    const handleStatusPopup = () => {
        setStatusPopup(false)
    }

    const handleSchedule = (e) => {
        setLoading(true)
        const body = {
            lead_id: userData?.id,
            user_id: loggedUserData?.id,
            date: getValidDate(date),
            schedule: time,
        }
        scheduleInterviewService(body)
            .then(() => {
                CustomToast.success('Interview Scheduled')
                changeStatus(
                    userData?.interview_time
                        ? HIRING_PROCESS_STATUS.interviewRescheduled
                        : HIRING_PROCESS_STATUS.interviewScheduled
                )
                handleStatusPopup()
            })
            .catch(() => {
                setLoading(false)
            })
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
    }, [page, search])

    const data = {page: page, filter: search}
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
        if (e == 5) setStatusModal(true)
        if (e == 6) {
            setEditData(data)
            setOpen(true)
        }
    }
    const onStatusChange = (status) => {
        setLoading(true)
        changeLeadStatusService(userData?.id, status)
            .then(() => {
                getHiringList()
                setStatusModal(false)
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                // setLoading(false)
                CustomToast.success('Status updated')
            })
    }

    return (
        <>
            <div className={`card shadow-sm`} style={{fontFamily: 'Manrope', position: 'relative'}}>
                <Dialog
                    header='Update Status'
                    visible={statusModal}
                    style={{width: '40vw', height: '18vw', background: '#c1cde4'}}
                    onHide={() => {
                        setStatusModal(false)
                    }}
                >
                    <div className='mt-6' style={{fontSize: '14px'}}>
                        <div className='justify-content-between w-100 px-sm-0 px-1   text-center fs-3'>
                            <select
                                className='form-select py-2 cursor-pointer w-225px mx-auto bg-cmGrey200 border-0 fw-bold'
                                onChange={(e) => onStatusChange(e.target.value)}
                                value={userData?.status}
                            >
                                <option value={''}>Select</option>
                                <option value={HIRING_PROCESS_STATUS.interviewDone}>
                                    {HIRING_PROCESS_STATUS.interviewDone}
                                </option>
                            </select>
                        </div>
                    </div>
                </Dialog>
                <CustomLoader full visible={loading} />

                <div className='py-0 px-0 mx-0'>
                    <div className='h-auto' style={{fontSize: '14px', fontFamily: 'Manrope'}}>
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
                                Referrals
                            </div>

                            {/* Search form */}
                            <div
                                style={{height: '43px', borderRadius: '20px'}}
                                className='w-md-300px mb-1 me-sm-12'
                                id='kt_chat_contacts_header'
                            >
                                <form
                                    className='position-relative'
                                    style={{borderRadius: '90px'}}
                                    autoComplete='off'
                                >
                                    <KTSVG
                                        path='/media/icons/duotune/general/gen021.svg'
                                        className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                                    />

                                    <input
                                        style={{
                                            borderRadius: '10px',
                                            fontWeight: 600,
                                            fontFamily: 'Manrope',
                                        }}
                                        type='text'
                                        className='form-control px-12 bg-cmGrey100 text-cmGrey700'
                                        name='search'
                                        placeholder='Search an employee'
                                        onChange={onChangeSearch}
                                    />
                                </form>
                            </div>

                            <div className='me-20 d-flex gap-5'>
                                {/* filter button */}
                                {/* <button
                  className={clsx('btn btn-sm btn-flex fw-bold text-cmGrey600 bg-cmGrey100')}
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                  style={{
                    fontSize: '14px',
                    fontFamily: 'Manrope',
                    width: '99px',
                    height: '43px',
                  }}
                >
                  <i className='bi bi-funnel fs-5'></i>
                  Filter
                </button> */}

                                <AccessRights
                                    customCondition={
                                        allPermissionsAccess.standard.referrals.referrals.add
                                    }
                                >
                                    <button
                                        onClick={() => {
                                            setEditData(null)
                                            setOpen(true)
                                        }}
                                        className={clsx(
                                            'btn btn-sm fw-bold text-cmwhite bg-cmBlue-Crayola'
                                        )}
                                        data-kt-menu-trigger='click'
                                        data-kt-menu-placement='bottom-end'
                                        style={{
                                            fontSize: '14px',
                                            fontFamily: 'Manrope',
                                            width: '99px',
                                            height: '43px',
                                        }}
                                    >
                                        Add New
                                    </button>
                                </AccessRights>
                                {/* <a className='me-0'>
                  <button
                    style={{
                      fontSize: '14px',
                      fontStyle: 'bold',
                    }}
                    className='btn btn-sm btn-icon mt-2 btn-bg-white btn-active-color-primary text-cmGrey900'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='top-end'
                    data-kt-menu-flip='bottom-end'
                  >
                    <i
                      style={{marginTop: '-6px'}}
                      className='bi ms-4 bi-three-dots-vertical  fs-3'
                    ></i>
                  </button>
                </a> */}
                            </div>
                            {/* <div className='me-20'>
                <a className='me-0'>
                  <button
                    style={{
                      color: '#757575',
                      fontSize: '14px',
                      fontStyle: 'bold',
                    }}
                    className='btn btn-sm btn-icon mt-2 btn-bg-white btn-active-color-primary'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='top-end'
                    data-kt-menu-flip='bottom-end'
                  >
                    <i
                      style={{marginTop: '-6px'}}
                      className='bi ms-4 bi-three-dots-vertical  fs-3'
                    ></i>
                  </button>
                </a>
              </div> */}
                        </div>
                    </div>
                    <div className='table-responsive shadow-none overflow-auto'>
                        <table className='table'>
                            <thead>
                                <tr
                                    className='bg-cmGrey200 text-cmGrey800 '
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='text-nowrap p-5'>Name</th>
                                    <th className='text-nowrap p-5'>Source</th>
                                    <th className='text-nowrap p-5'>Phone</th>
                                    <th className='text-nowrap p-5'>Email</th>
                                    <th className='text-nowrap p-5'>Home State</th>
                                    <th className='text-nowrap p-5'>Status</th>
                                    <th className='text-nowrap p-5'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.data?.length > 0 ? (
                                    tableData?.data?.map((item, index) => (
                                        <tr
                                            key={index}
                                            style={{
                                                height: '40px',
                                                fontSize: '14px',
                                                fontFamily: 'Manrope',
                                                fontWeight: '500',
                                            }}
                                            className={
                                                (index + 1) % 2 === 0
                                                    ? `text-cmGrey700 bg-cmbg`
                                                    : `text-cmGrey700`
                                            }
                                        >
                                            <td className='p-5 text-nowrap text-cmGrey800'>
                                                {item?.first_name} {item?.last_name}
                                            </td>
                                            <td className='p-5 text-nowrap'>
                                                {item?.source ?? 'Mannual'}{' '}
                                            </td>

                                            <td className='p-5 text-nowrap'>
                                                {formattedPhoneNumber(item?.mobile_no)}
                                            </td>

                                            <td className='p-5 text-nowrap'>{item?.email}</td>
                                            <td className='p-5 text-nowrap'>
                                                {item?.state?.name ?? ''}
                                            </td>
                                            <td className='p-5 text-nowrap'>
                                                {item?.status ?? ''}
                                            </td>
                                            <td className='p-5 text-nowrap'>
                                                <select
                                                    className='form-select py-2 cursor-pointer w-175px bg-cmGrey200 border-0 fw-bold'
                                                    onChange={(e) =>
                                                        handleAction(e.target.value, item)
                                                    }
                                                    value={item?.status}
                                                >
                                                    <option value={''}>
                                                        {item?.status !=
                                                        HIRING_PROCESS_STATUS.rejected
                                                            ? 'Actions'
                                                            : 'No Actions'}
                                                    </option>
                                                    {[
                                                        HIRING_PROCESS_STATUS.followUp,
                                                        HIRING_PROCESS_STATUS.interviewScheduled,
                                                        HIRING_PROCESS_STATUS.interviewRescheduled,
                                                    ].includes(item?.status) && (
                                                        <option value={1} className='fw-bold'>
                                                            {item?.interview_time
                                                                ? 'Reschedule Interview'
                                                                : 'Schedule Interview'}
                                                        </option>
                                                    )}
                                                    {item?.interview_time &&
                                                        ![
                                                            HIRING_PROCESS_STATUS.rejected,
                                                            HIRING_PROCESS_STATUS.interviewDone,
                                                        ].includes(item?.status) && (
                                                            <option value={5} className='fw-bold'>
                                                                Update Status
                                                            </option>
                                                        )}

                                                    {item?.status !=
                                                        HIRING_PROCESS_STATUS.rejected && (
                                                        <option value={6} className='fw-bold'>
                                                            Edit Lead
                                                        </option>
                                                    )}
                                                </select>
                                            </td>
                                        </tr>
                                    ))
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
                                            No referrals found
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
                    getonbording={() => {}}
                    setLoader={setLoading}
                    getList={getHiringList}
                    prefieldData={hireData}
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
            <SchedulePopup
                show={statusPopup}
                handleClose={handleStatusPopup}
                popupHead={popupHead}
                setTime={setTime}
                setDate={setDate}
                changeStatus={changeStatus}
                handleSchedule={handleSchedule}
                userData={userData}
            />
        </>
    )
}

export default Referrals
