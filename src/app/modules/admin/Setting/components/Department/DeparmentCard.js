import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {DepartmentTabel} from './DepartmentTabel'
import {Dropdown1} from '../../../../../../_metronic/partials'
import clsx from 'clsx'
import {CreateDepartmentModal} from './CreateDeparmentModal'
import {
    getDepartmentDropdownService,
    getDepartmentListService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import Pagination from '../../../sequidocs/component/Pagination'
import {getDepartmentsAction} from '../../../../../../redux/actions/SettingActions'
import {useDispatch, useSelector} from 'react-redux'
import {getDepartmentsSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import AccessRights from '../../../../../../accessRights/AccessRights'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import {allPermissionsAccess} from '../../../../../../accessRights/useCustomAccessRights'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import {getGlobalSearchData} from '../../../../../../helpers/CommonHelpers'
import debounce from 'lodash.debounce'

export default function DepartmentCard() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const departmentsData = useSelector(getDepartmentsSelector)
    const [loader, setLoader] = useState(true)
    const [searchText, setSearchText] = useState('')
    const [searchVal, setSearchVal] = useState('')
    const [data, setData] = useState('')
    const [activePage, setActivePage] = useState(1)

    const [departmentlist, setDepartmentList] = useState([])
    const [departmentData, setDepartmentData] = useState([])

    useEffect(() => {
        getdepartment()
        getDepartmentDropdownService().then((res) => {
            setDepartmentList(res.data)
        })
    }, [searchVal, activePage])
    const getdepartment = () => {
        const body = {
            page: activePage,
            search: searchVal,
        }
        getDepartmentListService(body)
            .then((res) => {
                setDepartmentData(res?.data)
            })
            .finally(() => setLoader(false))

        // dispatch(getDepartmentsAction()).finally((res) => {
        //     setLoader(false)
        // })
    }
    const handleClose1 = () => {
        setOpen1(false)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const onSearchDeparment = (e) => {
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

    return (
        <>
            <div
                className='card mb-15 bg-white h-auto shadow'
                style={{fontSize: '14px', fontFamily: 'Manrope'}}
            >
                <div className='w-100 p-7 d-sm-flex flex-wrap justify-content-between'>
                    <div
                        className=' ms-2 mb-sm-0 mb-5 text-cmGrey600'
                        style={{
                            fontSize: '16px',
                            fontFamily: 'Manrope',
                            fontWeight: 600,
                            alignSelf: 'center',
                        }}
                    >
                        Organize employees by department with unique compensation plans and
                        permissions.
                    </div>
                    <div className='' style={{alignSelf: 'center'}}>
                        <CustomInput
                            type={INPUT_TYPE.search}
                            value={searchText ?? ''}
                            onChange={onSearchDeparment}
                        />
                    </div>
                    <div className=''>
                        <AccessRights
                            customCondition={
                                allPermissionsAccess.administrator.setting.departments.add
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
                    <DepartmentTabel
                        className='mx-0 px-0'
                        open={open1}
                        setOpen={setOpen1}
                        departmentsData={departmentData}
                        setLoader={setLoader}
                        getdepartment={getdepartment}
                        handleClose={handleClose1}
                        setData={setData}
                        data={data}
                        departmentlist={departmentlist}
                        activePage={activePage}
                        setActivePage={setActivePage}
                    />
                </div>

                <CustomLoader full visible={loader}></CustomLoader>
                {open && (
                    <CreateDepartmentModal
                        show={open}
                        handleClose={handleClose}
                        setLoader={setLoader}
                        getdepartment={getdepartment}
                    />
                )}
            </div>
        </>
    )
}
