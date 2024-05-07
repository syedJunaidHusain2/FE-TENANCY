import {useCallback, useEffect, useState} from 'react'
import {CreateCompensationAppModal} from './CompensationPlan/CreateCompensationAppModal'
import {
    deletePositionService,
    getCostCenterDropdownService,
    getPositionByIdService,
    updatePositionGroupService,
    updatePositionHierarchyService,
} from '../../../../../../services/Services'
import ViewPositionModal from './ViewPositionModal'
import {useSelector} from 'react-redux'
import {getPermissionsGroupListSelector} from '../../../../../../redux/selectors/PermissionsSelectors'
import {getPermissionGroupListAction} from '../../../../../../redux/actions/PermissionsActions'
import {useDispatch} from 'react-redux'
import {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../../accessRights/AccessRightsConstants'
import AccessRights, {isPermittedForAccess} from '../../../../../../accessRights/AccessRights'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import {
    TABLE_BORDER,
    formattedNumberFieldsWithoutDecimal,
} from '../../../../../../helpers/CommonHelpers'
import Edit from '../../../sequidocs/Icon/edit.png'
import {useNavigate} from 'react-router-dom'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomDelete from '../../../../../../customComponents/customIcons/CustomDelete'
import {allPermissionsAccess} from '../../../../../../accessRights/useCustomAccessRights'
import Pagination from '../../../sequidocs/component/Pagination'
import {KTSVG} from '../../../../../../_metronic/helpers'
import ViewPositionSidebar from './ViewPositionSidebar'

const PositionTabel = ({
    getPosition,
    loader,
    setLoader,
    positionsData,
    setPositionsData,
    className,
    reload,
    onEditPosition,
    activePage,
    setActivePage,
}) => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const [setup, setSetup] = useState(false)
    const [selectedPositionData, setSelectedPositionData] = useState({id: '', position: ''})
    const [viewSideBar, setViewSideBar] = useState(false)

    const handleSideBar = () => {
        setViewSideBar(!viewSideBar)
    }

    const handlSetup = () => {
        setSetup(false)
        setSelectedPositionData(null)
    }
    const deletePosition = (id) => {
        setLoader(true)
        deletePositionService(id).finally((res) => {
            CustomToast.success('Position Deleted Successfully')
            getPosition()
        })
    }
    const [list, setList] = useState([])
    useEffect(() => {
        dispatch(getPermissionGroupListAction())
        getCostCenterDropdownService().then((res) => {
            setList(res.data)
        })
    }, [])

    const [setupLoader, setSetupLoader] = useState(false)
    const [position, setPosition] = useState()
    const [edit1, setEdit1] = useState(false)
    const [override, setOverrides] = useState([])
    const [deductions, setDeduction] = useState([])
    const getPositionid = (id) => {
        getPositionByIdService(id).then((r) => {
            setData(r.data[0])
            setPosition(r.data[0])
            setDeduction(r.data[0].deduction)
            setOverrides(r.data[0].override)
            getPosition()
            setEdit1(false)
        })
    }
    const [data, setData] = useState('')
    const handleid = (type, item) => {
        setSetupLoader(true)
        getPositionByIdService(item?.id)
            .then((res) => {
                setData(res.data[0])
                setSelectedPositionData((val) => ({
                    ...val,
                    ...item,
                    ...res?.data?.[0],
                }))
                if (type == 'edit') setSetup(true)
            })
            .finally(() => {
                setSetupLoader(false)
            })
    }

    const reorder = useCallback((list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }, [])

    const onDragEnd = (result) => {
        if (!result.destination) return
        const items = reorder(positionsData, result.source.index, result.destination.index)
        const body = {
            position_ids: items?.map((item) => item?.id),
        }
        updatePositionHierarchyService(body)
        setPositionsData(items)
    }

    const updatePermissionGroup = useCallback(
        (position_id, group_id) =>
            new Promise((resolve, reject) => {
                updatePositionGroupService(position_id, {group_id})
                    .then(() => {
                        getPosition().finally(resolve)
                    })
                    .catch(reject)
            }),
        [getPosition]
    )
    return (
        <>
            <div className={`card  ${className} mb-6 `}>
                {/* begin::Header */}
                <div className='card-body py-0 px-0 mx-0' style={{marginTop: '-5px'}}>
                    {/* begin::Table container */}
                    <div className='table-responsive'>
                        {/* begin::Table */}
                        <table
                            style={{height: '50px'}}
                            className='table table-row-bordered table-row-gray-100'
                        >
                            {/* begin::Table head */}
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className='text-cmGrey900 bg-cmGrey300'
                                    style={{
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        lineHeight: '21px',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    {/* <th className='min-text-nowrap'>Order Id</th> */}
                                    <th className='text-nowrap p-5 ps-10'>Position</th>
                                    <th className='text-nowrap p-5'>Position Id</th>
                                    <th className='text-nowrap p-5'>Department</th>
                                    <th className='text-nowrap p-5'>People</th>
                                    <th className='text-nowrap p-5'>Pay Frequency</th>
                                    <th className='text-nowrap p-5'>Overrides</th>
                                    <th className='text-nowrap p-5'>Commission Structure </th>
                                    <th className='text-nowrap p-5'>Permissions Group</th>
                                    <th className=' text-nowrap p-5'></th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {positionsData?.data?.length > 0 ? (
                                    <>
                                        {positionsData?.data?.map((item, index) => (
                                            <tr className='stripRow' key={index}>
                                                <td
                                                    className=' ps-10 p-5 text-nowrap text-cmGrey800'
                                                    style={{fontWeight: 600}}
                                                >
                                                    {' '}
                                                    {item?.position}{' '}
                                                </td>
                                                <td
                                                    className='  p-5 text-nowrap text-cmGrey800'
                                                    style={{fontWeight: 600}}
                                                >
                                                    {' '}
                                                    {item?.id}{' '}
                                                </td>
                                                <td
                                                    className=' text-nowrap p-5 text-cmGrey700'
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {item?.Department}
                                                </td>
                                                <td
                                                    className='  text-nowrap text-start p-5 text-cmGrey500'
                                                    style={{fontWeight: '500'}}
                                                    onClick={() =>
                                                        navigate('peoples', {
                                                            state: {
                                                                id: item?.id,
                                                                name: item?.position,
                                                            },
                                                        })
                                                    }
                                                >
                                                    <span className='px-3 py-1 rounded d-flex align-items-center gap-2 text-cmGrey500 cursor-pointer'>
                                                        <i class='fa-regular fa-user'></i>
                                                        {formattedNumberFieldsWithoutDecimal(
                                                            item?.people
                                                        )}
                                                    </span>
                                                </td>
                                                <td
                                                    className='  p-5 text-nowrap text-cmGrey700'
                                                    style={{fontWeight: '500'}}
                                                >
                                                    {item?.pay_frequency ?? 'NA'}
                                                </td>
                                                <td
                                                    className=' p-5'
                                                    style={{
                                                        color: '#616161',
                                                        fontFamily: 'Manrope',
                                                    }}
                                                >
                                                    {item?.override ?? 'NA'}
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontSize: '14px',
                                                        // cursor: 'pointer',
                                                    }}
                                                    className=' p-5 text-cmBlue-Crayola cursor-pointer'
                                                >
                                                    {item.status != 0 ? (
                                                        <div className='d-flex flex-row align-items-center'>
                                                            <div
                                                                onClick={() => {
                                                                    handleid('view', item)
                                                                    handleSideBar()
                                                                }}
                                                                style={{
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                View
                                                            </div>
                                                            {isPermittedForAccess({
                                                                permission:
                                                                    PERMISSIONS_GROUP.administrator
                                                                        .setting.positions,
                                                                type: PERMISSION_TYPE.edit,
                                                            }) && (
                                                                <>
                                                                    <span>
                                                                        {' '}
                                                                        &nbsp;&nbsp;|&nbsp;&nbsp;
                                                                    </span>
                                                                    <div
                                                                        onClick={() => {
                                                                            handleid('edit', item)
                                                                        }}
                                                                        style={{
                                                                            cursor: 'pointer',
                                                                            fontWeight: 'bold',
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className=' '
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() => {
                                                                // setSelectedPositionData(
                                                                //     item
                                                                // )
                                                                handleid('edit', item)
                                                                // setSetup(true)
                                                            }}
                                                        >
                                                            Setup
                                                        </div>
                                                    )}
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontSize: '14px',
                                                    }}
                                                    className='p-5 text-cmBlue-Crayola d-flex align-items-start'
                                                >
                                                    <PermissionGroup
                                                        data={item}
                                                        updateGroup={updatePermissionGroup}
                                                    />
                                                </td>

                                                <td className='p-5'>
                                                    <div className='d-flex gap-2 align-items-center justify-contennt-center'>
                                                        <button
                                                            className=' btn btn-sm btn-icon  btn-bg-light btn-active-color-primary'
                                                            onClick={() => onEditPosition(item)}
                                                        >
                                                            <img
                                                                src={Edit}
                                                                alt=''
                                                                style={{
                                                                    width: '34px',
                                                                }}
                                                            />
                                                        </button>
                                                        {[position]?.includes(item?.id) ||
                                                        item?.people > 0 ? (
                                                            <b></b>
                                                        ) : (
                                                            <CustomDelete
                                                                onClick={() => {
                                                                    CustomDialog.warn(
                                                                        'Are you sure you want to delete ?',
                                                                        () => {
                                                                            deletePosition(item?.id)
                                                                        }
                                                                    )
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr className='no-data'>
                                        <td
                                            colSpan={10}
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
                        totalPages={positionsData?.last_page}
                        setPage={(changedPage) => setActivePage(changedPage)}
                    />
                </div>
                {/* begin::Body */}
                {setup && (
                    <CreateCompensationAppModal
                        show={setup}
                        handleClose={handlSetup}
                        selectedPositionData={selectedPositionData}
                        getPosition={getPosition}
                        setLoader={setLoader}
                    />
                )}
            </div>

            {/* {!setup && selectedPositionData && (
                <ViewPositionModal
                    setupLoader={setupLoader}
                    data={selectedPositionData}
                    setData={setData}
                    editposition={setPosition}
                    setEditPosition={setPosition}
                    list={list}
                    getPositionid={getPositionid}
                    position={position}
                    setPosition={setPosition}
                    edit={edit1}
                    setEdit={setEdit1}
                    override={override}
                    setOverrides={setOverrides}
                    deductions={deductions}
                    setDeduction={setDeduction}
                    setLoader={setLoader}
                    loader={loader}
                />
            )} */}
            {viewSideBar ? (
                <ViewPositionSidebar
                    open={viewSideBar}
                    close={handleSideBar}
                    setupLoader={setupLoader}
                    data={selectedPositionData}
                    setData={setData}
                    editposition={setPosition}
                    setEditPosition={setPosition}
                    list={list}
                    getPositionid={getPositionid}
                    position={position}
                    setPosition={setPosition}
                    edit={edit1}
                    setEdit={setEdit1}
                    override={override}
                    setOverrides={setOverrides}
                    deductions={deductions}
                    setDeduction={setDeduction}
                    setLoader={setLoader}
                    loader={loader}
                />
            ) : null}
        </>
    )
}

export default PositionTabel

const PermissionGroup = ({data, updateGroup}) => {
    const [loading, setLoading] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState(data?.group_id)
    const groupList = useSelector(getPermissionsGroupListSelector)
    const [editPermission, setEditPermission] = useState(false)

    useEffect(() => {
        if (data?.group_id) setSelectedGroup(data?.group_id)
    }, [data?.group_id])

    const updatePermissionGroup = () => {
        setEditPermission(false)
        if (selectedGroup) {
            setLoading(true)
            updateGroup(data?.id, selectedGroup).finally(() => {
                setLoading(false)
                CustomToast.success('Permission Group Updated')
            })
        }
    }

    return (
        <div className='d-flex gap-2 align-items-center justify-content-center'>
            {!editPermission && (
                <>
                    <span>
                        {loading ? 'Loading...' : data?.group_name ?? 'No Permission Group'}
                    </span>
                    <AccessRights
                        customCondition={allPermissionsAccess.administrator.setting.positions.edit}
                    >
                        <>
                            <span className='text-cmBlack'>|</span>
                            <span
                                onClick={() => setEditPermission(!editPermission)}
                                className='cursor-pointer  fw-bold'
                            >
                                Edit
                            </span>
                        </>
                    </AccessRights>
                </>
            )}
            {editPermission && (
                <>
                    <CustomDropdown
                        options={groupList}
                        valueKey={'group_id'}
                        displayKey='group_name'
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e?.target?.value)}
                    />

                    <span onClick={updatePermissionGroup} className='cursor-pointer fw-bold'>
                        Save
                    </span>
                </>
            )}
        </div>
    )
}
