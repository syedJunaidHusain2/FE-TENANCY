/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect, useMemo} from 'react'

import {} from '../../../../../../_metronic/partials/modals/create-app-stepper/IAppModels'
import {
    AddPositionService,
    getDepartmentDropdownService,
    updatePositionsService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {useDispatch} from 'react-redux'
import {getPermissionGroupListAction} from '../../../../../../redux/actions/PermissionsActions'
import {useSelector} from 'react-redux'
import {getPermissionsGroupListSelector} from '../../../../../../redux/selectors/PermissionsSelectors'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import {
    newPositionValidation,
    NEW_POSITION_VALIDATION_FIELD,
} from '../../../../../../validations/validations'
import {isEmptyObjectValue} from '../../../../../../helpers/CommonHelpers'
import CustomInput from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {getPosittionMailRolesAction} from '../../../../../../redux/actions/SettingActions'
import {
    getPositionsSelector,
    positionMainRolesSelector,
} from '../../../../../../redux/selectors/SettingsSelectors'
import {MAIN_POSITTIONS_ID} from '../../../../../../constants/constants'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'

const ManagePosition = ({getPosition, setLoader, show, handleClose, positionEditdata}) => {
    const dispatch = useDispatch()
    const [departmentlist, setDepartmentList] = useState([])
    const [department, setDepartment] = useState(positionEditdata?.department_id)
    const [name, setName] = useState(positionEditdata?.position)
    const [mainPosition, setMainPosition] = useState(positionEditdata?.parent_id)
    const [selectedGroup, setSelectedGroup] = useState(positionEditdata?.group_id)
    const positionList = useSelector(getPositionsSelector)
    const [selectedOrgParentPosition, setSelectedOrgParentPosition] = useState(
        positionEditdata?.org_parent_id
    )
    const [loading, setLoading] = useState(false)
    const permissionGroupList = useSelector(getPermissionsGroupListSelector)
    const [positionError, setPositionError] = useState(NEW_POSITION_VALIDATION_FIELD)
    const positionMainRoles = useSelector(positionMainRolesSelector)

    const parentPositionList = useMemo(() => {
        return positionList?.filter((item) => item?.id != positionEditdata?.id)
    }, [])

    useEffect(function () {
        dispatch(getPermissionGroupListAction())
        getDepartmentDropdownService().then((res) => {
            setDepartmentList(res.data)
        })
        dispatch(getPosittionMailRolesAction())
    }, [])
    useEffect(() => {
        setName(positionEditdata?.position)
        setMainPosition(positionEditdata?.parent_id)
        setDepartment(positionEditdata?.department_id)
        setSelectedGroup(positionEditdata?.group_id)
    }, [positionEditdata])

    const addposition = (e) => {
        e.preventDefault()
        var body = {
            id: positionEditdata?.id ?? null,
            position_name: name,
            department_id: department,
            parent_position: mainPosition,
            group_id: selectedGroup,
            org_parent_position: selectedOrgParentPosition,
        }
        const validationErrors = newPositionValidation(body)
        setPositionError(validationErrors)
        if (isEmptyObjectValue(validationErrors)) {
            setLoading(true)
            if (positionEditdata) {
                updatePositionsService(positionEditdata?.id, body)
                    .then((r) => {
                        getPosition()
                        setLoader(true)
                        CustomToast.success('Position Updates Successfully')
                        handleClose()
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } else {
                AddPositionService(body)
                    .then((r) => {
                        getPosition()
                        setLoader(true)
                        CustomToast.success('Position Added Successfully')
                        handleClose()
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        }
    }
    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            maxWidth='650'
            title={
                positionEditdata
                    ? `Edit Position | ${positionEditdata?.position_name}`
                    : 'New Position'
            }
        >
            <CustomLoader full visible={loading} />

            {/* <div className='modal-header '></div> */}
            <form onSubmit={addposition}>
                <div className=''>
                    <div className=''>
                        {![MAIN_POSITTIONS_ID.closer, MAIN_POSITTIONS_ID.setter].includes(
                            positionEditdata?.id?.toString()
                        ) ? (
                            <>
                                <div className='container d-flex justify-content-center'>
                                    <div className='row w-500px'>
                                        <div className='col text-cmGrey700'>
                                            <CustomInput
                                                label={'Position Name'}
                                                required
                                                placeholder='Enter Position Name'
                                                onChange={(e) => {
                                                    setName(e.target.value)
                                                }}
                                                errorMessage={positionError?.positionName}
                                                value={name}
                                                rejex={/^[\w\-\s]+$/}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='container mt-5 px-lg-10 d-flex justify-content-center'>
                                    <div className='row d-flex w-500px justify-content-center'>
                                        <div
                                            className='col text-cmGrey700'
                                            style={{
                                                fontFamily: 'Manrope',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                            }}
                                        >
                                            <CustomDropdown
                                                label={'Main Role'}
                                                disabled={positionEditdata}
                                                required
                                                displayKey='position_name'
                                                options={positionMainRoles}
                                                value={mainPosition}
                                                onChange={(e) => setMainPosition(e.target.value)}
                                                errorMessage={positionError?.parenrPosition}
                                                valueKey='id'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}

                        <div className='container mt-5 my-5 px-lg-10 d-flex justify-content-center'>
                            <div className='row d-flex w-500px justify-content-center'>
                                <div
                                    className='col text-cmGrey700'
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                    }}
                                >
                                    <CustomDropdown
                                        label={'Department'}
                                        required
                                        options={departmentlist}
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        errorMessage={positionError?.department}
                                        valueKey='id'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='container my-5 px-lg-10 d-flex justify-content-center'>
                            <div className='row d-flex w-500px justify-content-center'>
                                <div
                                    className='col text-cmGrey700'
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                    }}
                                >
                                    <CustomDropdown
                                        label={'Permission Group'}
                                        required
                                        value={selectedGroup}
                                        options={permissionGroupList}
                                        displayKey='group_name'
                                        valueKey='group_id'
                                        onChange={(e) => setSelectedGroup(e.target.value)}
                                        errorMessage={positionError?.permissionGroup}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='container my-5 px-lg-10 d-flex justify-content-center'>
                            <div className='row d-flex w-500px justify-content-center'>
                                <div
                                    className='col text-cmGrey700'
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                    }}
                                >
                                    <CustomDropdown
                                        label={'Parent Position'}
                                        displayKey='position_name'
                                        options={parentPositionList}
                                        value={selectedOrgParentPosition}
                                        onChange={(e) =>
                                            setSelectedOrgParentPosition(e.target.value)
                                        }
                                        valueKey='id'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center mt-0 my-5'>
                    <CustomButton
                        type='submit'
                        buttonType={BUTTON_TYPE.primary}
                        buttonLabel={!positionEditdata ? 'Create' : 'Update'}
                        onClick={addposition}
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export default ManagePosition
