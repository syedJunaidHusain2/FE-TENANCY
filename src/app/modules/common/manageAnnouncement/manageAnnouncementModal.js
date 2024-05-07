import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../customComponents/customModal/CustomModal'
import Edit from '../../admin/sequidocs/Icon/edit.png'
import AddNewAnnouncementModal from './addNewAnnouncementModal'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {deleteAnnouncementService} from '../../../../services/Services'
import CustomLoader from '../../../../customComponents/customLoader/CustomLoader'
import useOfficeLocation from '../../../../hooks/useOfficeLocation'
import CustomDialog from '../../../../customComponents/customDialog/CustomDialog'
import debounce from 'lodash.debounce'
import {getannouncementDataAction} from '../../../../redux/actions/DashboardActions'
import {getAnnouncementSelector} from '../../../../redux/selectors/DashboardSelectors'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {getUserDataSelector} from '../../../../redux/selectors/AuthSelectors'
import {getValidDate} from '../../../../constants/constants'
import {
    TABLE_BORDER,
    getGlobalSearchData,
    sendDataToReducer,
} from '../../../../helpers/CommonHelpers'
import {SET_ANNOUNCEMENT_DATA} from '../../../../redux/reducers/DashboardReducer'
import {getPositionsSelector} from '../../../../redux/selectors/SettingsSelectors'
import CustomEditIcon from '../../../../customComponents/customIcons/CustomEditIcon'
import CustomDelete from '../../../../customComponents/customIcons/CustomDelete'

const STATUS_DROPDOWN_VALUES = [
    {name: 'All Status', value: 'all'},
    {name: 'Upcoming', value: 'Upcoming'},
    {name: 'Live', value: 'Live'},
    {name: 'Expired', value: 'Expired'},
    {name: 'Disabled', value: 'disabled'},
]

const ManageAnnouncementModal = ({
    show,
    handleClose,
    role,
    // announcementData,
    // getAnnouncementData,
    // headFilters,
    // setHeadFilters,
    // loading,
    // setLoading,
}) => {
    const [showAddNewAnnouncementModal, setShowAddNewAnnouncementModal] = useState(false)
    const [editAnnouncementData, setEditAnnouncementData] = useState(null)
    const loggedUser = useSelector(getUserDataSelector)
    const allPositions = useSelector(getPositionsSelector)

    const [officeList, selectedLocation, setSelectedLocation] = useOfficeLocation()
    const announcementData = useSelector(getAnnouncementSelector)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState()

    const [headFilters, setHeadFilters] = useState({
        search: '',
        // office: selectedLocation,
        position: '',
    })
    const [statusFilter, setStatusFilter] = useState('all')

    useEffect(() => {
        if (selectedLocation) getAnnouncementData()
    }, [headFilters, selectedLocation, statusFilter])

    const getAnnouncementData = useCallback(() => {
        setLoading(true)
        const body = {
            id: loggedUser?.id,
            search: headFilters?.search,
            office: selectedLocation,
            position_filter: headFilters?.position,
            status: statusFilter,
        }
        dispatch(getannouncementDataAction(body)).finally(() => {
            setLoading(false)
        })
    }, [
        dispatch,
        headFilters?.position,
        headFilters?.search,
        loggedUser?.id,
        selectedLocation,
        statusFilter,
    ])
    const onPressDeleteAnnouncemennt = (id) => {
        CustomDialog.warn('Are you sure want to delete this announcement', () => {
            setLoading(true)
            deleteAnnouncementService(id)
                .finally(() => {
                    getAnnouncementData()
                    setLoading(false)
                })
                .catch(() => {})
        })
    }

    const onPressAddandEditModal = (item) => {
        if (item) {
            setEditAnnouncementData(item)
        } else {
            setEditAnnouncementData(null)
        }
        setShowAddNewAnnouncementModal(true)
    }

    const locationChange = (e) => {
        setLoading(true)
        setSelectedLocation(e.target.value)
        setHeadFilters({...headFilters, office: e.target.value})
    }

    const onSearch = (e) => {
        setSearchText(e.target.value)
        // delaySearch(e.target.value)
    }
    const delaySearch = useCallback(
        debounce((val) => {
            setHeadFilters({...headFilters, search: val})
        }, 500),
        []
    )
    const getAnnouncements = () => {
        getAnnouncementData()
    }

    const onStatusChange = (e) => {
        setStatusFilter(e?.value)
    }
    const positionList = useMemo(() => {
        let list = [{name: 'All Positions', value: ''}]
        allPositions.map((i) => {
            list.push({name: i.position_name, value: i.id})
        })
        return list
    }, [])
    const onChangePositonFilter = (e) => {
        setHeadFilters({...headFilters, position: e.target.value})
    }

    const displayData = useMemo(() => {
        let filteredData = announcementData
        if (searchText) {
            filteredData = getGlobalSearchData(announcementData, ['title', 'status'], searchText)
        }
        return filteredData
    }, [announcementData, searchText])
    return (
        <>
            <CustomModal
                show={show}
                onHide={handleClose}
                maxWidth='1000'
                title={'Manage Announcements'}
            >
                {/* Body Starts */}
                <div style={{position: 'relative'}}>
                    <CustomLoader full visible={loading} />

                    <div
                        className='d-flex flex-wrap justify-content-between mb-5 gap-3'
                        style={{fontWeight: '700', fontFamily: 'Manrope', fontSize: '14px'}}
                    >
                        <div>
                            <CustomInput
                                type={INPUT_TYPE.search}
                                name='search'
                                onChange={onSearch}
                                value={searchText}
                            />
                        </div>

                        <div className='d-flex flex-wrap gap-3'>
                            <div>
                                <CustomDropdown
                                    placeholder='Select Status'
                                    value={statusFilter}
                                    onChange={onStatusChange}
                                    options={STATUS_DROPDOWN_VALUES}
                                    showClear={false}
                                    searching={false}
                                />
                            </div>
                            <div>
                                <CustomDropdown
                                    placeholder='Select Office'
                                    value={selectedLocation}
                                    onChange={locationChange}
                                    options={officeList}
                                    showClear={false}
                                    // valueKey='name'
                                />
                            </div>
                            <div>
                                <CustomDropdown
                                    placeholder='Select Position'
                                    value={headFilters?.position}
                                    onChange={onChangePositonFilter}
                                    options={positionList}
                                    showClear={false}
                                />
                            </div>
                            {/* <div>
                                <CustomDropdown
                                    placeholder='Select Status'
                                    value={statusFilter}
                                    onChange={onStatusChange}
                                    options={STATUS_DROPDOWN_VALUES}
                                    showClear={false}
                                />
                            </div> */}
                            <div>
                                <CustomButton
                                    type='submit'
                                    buttonType={BUTTON_TYPE.primary}
                                    buttonSize={BUTTON_SIZE.small}
                                    buttonLabel={'Add New'}
                                    onClick={() => onPressAddandEditModal(null)}
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
                                    <th className='text-nowrap p-5'></th>
                                    <th className='text-nowrap p-5'>Title</th>
                                    <th className='text-nowrap p-5'>Status</th>
                                    <th className='text-nowrap p-5'>Sent to</th>
                                    <th className='text-nowrap p-5'>Office</th>
                                    <th className='text-nowrap p-5'>Start Date</th>
                                    <th className='text-nowrap p-5'>Duration</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {displayData?.length > 0 ? (
                                    displayData?.map((item, index) => {
                                        return (
                                            <tr
                                                key={item?.id}
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '500',
                                                }}
                                                className='stripRow'
                                            >
                                                {/* {role == 'admin' ? ( */}
                                                {item?.pin_to_top ? (
                                                    <td className='text-nowrap text-center px-5 fs-1 text-cminfo'>
                                                        <div className='bi bi-pin-angle' />
                                                    </td>
                                                ) : (
                                                    <td></td>
                                                )}
                                                <td className='p-5 text-nowrap text-cmGrey800'>
                                                    {item?.title}
                                                </td>
                                                <td
                                                    className={`p-5 text-nowrap ${
                                                        item?.status == 'Expired' && 'text-cmError'
                                                    }`}
                                                >
                                                    {item?.status}
                                                </td>

                                                <td className='p-5 text-nowrap'>
                                                    {item?.positions?.map((val, i) => (
                                                        <span key={i}>
                                                            {val?.position_name}

                                                            {item?.positions?.length - 1 > i
                                                                ? ','
                                                                : null}
                                                        </span>
                                                    ))}
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    {item?.office?.map((val, i) => (
                                                        <span key={i}>
                                                            {val?.office_name}{' '}
                                                            {item?.office?.length - 1 > i
                                                                ? ','
                                                                : null}
                                                        </span>
                                                    ))}
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    {getValidDate(item?.start_date)}
                                                </td>
                                                <td className='p-5 text-nowrap'>
                                                    {item?.durations}
                                                </td>
                                                {loggedUser?.id == item?.user_id ? (
                                                    <td className='p-5 text-nowrap d-flex gap-2'>
                                                        <CustomEditIcon
                                                            onClick={() =>
                                                                onPressAddandEditModal(item)
                                                            }
                                                        />
                                                        <CustomDelete
                                                            onClick={() => {
                                                                onPressDeleteAnnouncemennt(item?.id)
                                                            }}
                                                        />
                                                    </td>
                                                ) : null}
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <>
                                        <tr>
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
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </CustomModal>
            {showAddNewAnnouncementModal ? (
                <AddNewAnnouncementModal
                    item={editAnnouncementData}
                    show={showAddNewAnnouncementModal}
                    onClose={() => setShowAddNewAnnouncementModal(false)}
                    getAnnouncements={getAnnouncements}
                />
            ) : null}
        </>
    )
}
export default ManageAnnouncementModal
