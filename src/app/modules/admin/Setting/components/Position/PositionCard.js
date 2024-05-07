import React, {useState, useEffect, useCallback, useMemo} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import PositionTabel from './PositionTabel'
import {Dropdown1} from '../../../../../../_metronic/partials'
import clsx from 'clsx'
import ManagePosition from './ManagePosition'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {useDispatch, useSelector} from 'react-redux'
import {
    getPositionsAction,
    getPositionSettingAction,
} from '../../../../../../redux/actions/SettingActions'
import {getPositionsSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import {
    getErrorMessageFromResponse,
    getGlobalSearchData,
    sendDataToReducer,
} from '../../../../../../helpers/CommonHelpers'
import {SET_POSITIONS} from '../../../../../../redux/reducers/SettingReducer'
import PositionOrgChart from './PositionOrgChart'
import AccessRights, {
    PERMISSIONS_GROUP,
    PERMISSION_TYPE,
} from '../../../../../../accessRights/AccessRights'
import {
    getPositionListService,
    positionFilterService,
    positionOrgChartService,
} from '../../../../../../services/Services'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import PositionFilter from '../../../filters/PositionFilter'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import {allPermissionsAccess} from '../../../../../../accessRights/useCustomAccessRights'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import debounce from 'lodash.debounce'

const initialFilter = {
    pay_frequency_filter: '',
    department: '',
    override_settelement: '',
    permission_group: '',
}
export default function PositionCard() {
    const dispatch = useDispatch()
    const [chartData, setChartData] = useState(null)
    const [loader, setLoader] = useState(true)
    const [open, setOpen] = useState(false)
    const [showOrgchart, setShowOrgchart] = useState(false)
    const [positionEditdata, setPositionEditdata] = useState(null)
    // const positionsData = useSelector(getPositionsSelector)
    const [searchText, setSearchText] = useState('')
    const [positionsData, setPositionData] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [filterData, setFilterData] = useState(null)
    const [searchVal, setSearchVal] = useState(null)

    useEffect(() => {
        dispatch(getPositionsAction())
    }, [])

    const getOrgChart = useCallback(() => {
        positionOrgChartService().then((res) => setChartData(res?.positionsOrgChart))
    }, [])
    const handleClose = () => {
        setOpen(false)
    }
    useEffect(
        function () {
            getPosition()
            getOrgChart()
        },
        [activePage, filterData, searchVal]
    )

    const setPositionsData = useCallback(
        (data) => {
            sendDataToReducer(dispatch, SET_POSITIONS, data)
        },
        [dispatch]
    )

    const getPosition = () => {
        setLoader(true)
        getPositionListService({page: activePage, search_filter: searchVal, ...filterData})
            .then((res) => {
                const finalData = res?.data?.data?.map((item) => ({
                    ...item,
                    position_name: item?.position,
                }))
                // setPositionData(finalData)
                setPositionData({...res?.data, data: finalData})
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally((res) => {
                setLoader(false)
            })
    }
    // new Promise((resolve, reject) => {
    //     dispatch(getPositionSettingAction())
    //     getOrgChart()
    //     dispatch(getPositionsAction())
    //         .catch(reject)
    //         .finally((res) => {
    //             setLoader(false)
    //             resolve(res)
    //         })
    // })
    const handleSearchChange = (e) => {
        // setFilterData(initialFilter)
        setActivePage(1)
        setSearchText(e?.target?.value)
        delaySave(e?.target?.value)
    }
    const delaySave = useCallback(
        debounce((val) => {
            setSearchVal(val)
            setLoader(true)
        }, 500),
        [searchVal]
    )

    const onApplyFilter = (filter) => {
        setSearchVal('')
        setSearchText('')
        setActivePage(1)
        // setLoader(true)
        setFilterData(filter)
        // positionFilterService({...filter, page: 1})
        //     .then((res) => {
        //         setPositionsData(res?.data)
        //     })
        //     .finally((res) => {
        //         setLoader(false)
        //     })
    }

    const resetFilter = () => {
        setSearchVal('')
        setSearchText('')
        setActivePage(1)
        setFilterData(initialFilter)
        // getPosition()
    }

    return (
        <div 
            className='card bg-white h-auto shadow'
            style={{fontSize: '14px', fontFamily: 'Manrope'}}
        >
            <div className='w-100 p-5 d-sm-flex flex-wrap align-items-center  justify-content-between'>
                <div
                    className='mt-2 ms-2 mb-2 text-cmGrey600'
                    style={{fontSize: '14px', fontFamily: 'Manrope', fontWeight: 500}}
                >
                    Create Employee Positions and setup <br /> Compensation plans and Permissions.
                </div>
                <div className=''>
                    <CustomInput
                        type={INPUT_TYPE.search}
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className='d-flex flex-wrap align-items-center gap-5'>
                    <CustomButton
                        buttonType={BUTTON_TYPE.secondary}
                        buttonLabel={showOrgchart ? 'List' : 'Org. Chart'}
                        onClick={() => setShowOrgchart(!showOrgchart)}
                        icon={showOrgchart ? null : 'bi bi-diagram-2 fs-1'}
                    />
                    <PositionFilter
                        initialFilter={initialFilter}
                        onApplyFilter={(updatedFilter) => onApplyFilter(updatedFilter)}
                        onResetFilter={resetFilter}
                    />
                    <AccessRights
                        customCondition={allPermissionsAccess.administrator.setting.positions.add}
                    >
                        <CustomButton
                            buttonType={BUTTON_TYPE.primary}
                            buttonLabel='Create New'
                            onClick={() => {
                                setPositionEditdata(null)
                                setOpen(true)
                            }}
                        />
                    </AccessRights>
                </div>
            </div>

            {!showOrgchart && (
                <div>
                    <PositionTabel
                        getPosition={getPosition}
                        loader={loader}
                        setLoader={setLoader}
                        positionsData={positionsData}
                        setPositionsData={setPositionsData}
                        className='mx-0 px-0'
                        reload={handleClose}
                        onEditPosition={(val) => {
                            setPositionEditdata(val)
                            setOpen(true)
                        }}
                        activePage={activePage}
                        setActivePage={setActivePage}
                    />
                </div>
            )}
            {showOrgchart && (
                <div>
                    <PositionOrgChart
                        setLoader={setLoader}
                        chartData={{position_name: 'Positions', org_chields: chartData}}
                    />
                </div>
            )}
            {open ? (
                <ManagePosition
                    getPosition={getPosition}
                    setLoader={setLoader}
                    show={open}
                    handleClose={handleClose}
                    positionEditdata={positionEditdata}
                />
            ) : null}
            <CustomLoader full visible={loader} />
        </div>
    )
}
