import {useState, useEffect, useCallback} from 'react'
import CostCenterTabel from './CostCenterTabel'
import {CreateCostModal} from './CreateCostModal'
import {getCostCenterListService} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import Pagination from '../../../sequidocs/component/Pagination'
import {useDispatch} from 'react-redux'
import {getParentCostCenterListAction} from '../../../../../../redux/actions/SettingActions'
import AccessRights from '../../../../../../accessRights/AccessRights'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {allPermissionsAccess} from '../../../../../../accessRights/useCustomAccessRights'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import debounce from 'lodash.debounce'

export default function CostCenterCard() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

    const [open1, setOpen1] = useState(false)
    const [costTrackingData, setCostTrackingData] = useState(null)
    const [page, setPage] = useState(1)
    const [loader, setLoader] = useState(true)
    const [data, setData] = useState('')
    const [statusFilter, setstatusFilter] = useState('')
    const handleClose1 = () => {
        setOpen1(false)
    }
    const [search, setSearch] = useState('')
    const [searchVal, setSearchVal] = useState('')

    useEffect(() => {
        getcostcenter()
    }, [page, statusFilter, search])

    const getcostcenter = () => {
        setLoader(true)
        dispatch(getParentCostCenterListAction())
        const body = {
            page: page,
            filter: statusFilter,
            search: search,
        }
        getCostCenterListService(body)
            .then((res) => {
                setCostTrackingData(res?.costCenters)
            })
            .finally(() => {
                setLoader(false)
            })
    }

    const handleSearchChange = (e) => {
        setPage(1)
        setSearchVal(e.target.value)
        delaySaveToDb(e.target.value)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            setSearch(val)
        }, 500),
        []
    )

    return (
        <>
            <div
                className='card bg-cmwhite h-auto shadow'
                style={{fontSize: '14px', borderRadius: 10, fontFamily: 'Manrope'}}
            >
                <div className='w-100 p-7 d-sm-flex  justify-content-between'>
                    <div
                        // className='mt-2 ms-2 mb-sm-0 mb-5 b text-cmGrey600'
                        // style={{ fontSize: '16px', fontFamily: 'Manrope', fontWeight: 600 }}
                        className='mt-2 ms-2 text-cmGrey600 mb-5'
                        style={{fontSize: '16px', fontFamily: 'Manrope', fontWeight: '600'}}
                    >
                        Create cost centers and sub-centers to ensure costs are tracked accurately.
                    </div>
                    <div>
                        <CustomInput
                            type={INPUT_TYPE.search}
                            onChange={handleSearchChange}
                            value={searchVal}
                        />
                    </div>
                    <div className='d-flex align-items-center flex-wrap gap-5 justify-content-center'>
                        <div className='d-flex align-items-center gap-3'>
                            <div className='text-cmGrey800' style={{fontWeight: '600'}}>
                                Status:
                            </div>

                            <CustomDropdown
                                searching={false}
                                options={[
                                    {name: 'All', value: ''},
                                    {name: 'Active', value: 'active'},
                                    {name: 'Inactive', value: 'inactive'},
                                ]}
                                onChange={(e) => {
                                    setstatusFilter(e.value)
                                    setPage(1)
                                }}
                                value={statusFilter}
                            />
                        </div>

                        <AccessRights
                            customCondition={
                                allPermissionsAccess.administrator.setting.costTracking.add
                            }
                        >
                            <CustomButton
                                buttonType={BUTTON_TYPE.primary}
                                buttonLabel='Create New'
                                onClick={() => setOpen(true)}
                            />
                        </AccessRights>
                    </div>
                </div>
                <div>
                    <CostCenterTabel
                        page={page}
                        setPage={setPage}
                        className='mx-0 px-0'
                        costTrackingData={costTrackingData}
                        data={data}
                        setData={setData}
                        open={open1}
                        setOpen={setOpen1}
                        handleClose={handleClose1}
                        setLoader={setLoader}
                        getcostcenter={getcostcenter}
                    />
                </div>
                {open && (
                    <CreateCostModal
                        show={open}
                        handleClose={handleClose}
                        getcostcenter={getcostcenter}
                        setLoader={setLoader}
                        loader={loader}
                    />
                )}
                <CustomLoader full visible={loader} />
            </div>
            {costTrackingData?.data?.length > 0 ? (
                <div className='mt-5'>
                    <Pagination
                        setPage={setPage}
                        page={page}
                        totalPages={costTrackingData?.last_page}
                        totalRecords={costTrackingData?.total}
                    />
                </div>
            ) : null}
        </>
    )
}
