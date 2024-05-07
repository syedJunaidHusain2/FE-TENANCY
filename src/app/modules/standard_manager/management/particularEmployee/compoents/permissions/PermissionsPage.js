import React, {useState, useEffect} from 'react'
import {
    getPermissionService,
    getPermissionGroupListService,
    updateEmployeeGroupService,
} from '../../../../../../../services/Services'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import AccessRights from '../../../../../../../accessRights/AccessRights'
import useCustomAccessRights from '../../../../../../../accessRights/useCustomAccessRights'
import {getErrorMessageFromResponse} from '../../../../../../../helpers/CommonHelpers'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomEditIcon from '../../../../../../../customComponents/customIcons/CustomEditIcon'
import CustomArrow, {
    ARROW_DIRECTION,
} from '../../../../../../../customComponents/customIcons/CustomIcons'
import _ from 'lodash'

const PermissionsPage = ({employeeData, getEmployeeProfile}) => {
    const [editMode, setEditMode] = useState(false)
    const [policyList, setPolicyList] = useState([])
    const [dropDownList, setDropDownList] = useState(null)
    const [groupid, setGroupId] = useState(employeeData?.group_id)
    const [loading, setLoading] = useState(true)
    const {employeeProfileAccess} = useCustomAccessRights({employeeData})

    useEffect(() => {
        getEmployeeProfile()
    }, [])

    useEffect(() => {
        if (employeeData?.group_id) {
            getPolicyList(employeeData?.group_id)
        }
        getPermissionGroupListService()
            .then((res) => {
                setDropDownList(res.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [employeeData?.group_id])

    const getPolicyList = (id) => {
        getPermissionService(id).then((res) => {
            const data = _.cloneDeep(res?.data)
            const finalData = data?.map((item) => {
                let dataItem = {...item, is_open: false}
                dataItem.groupPolicy = dataItem?.groupPolicy?.map((subItem) => ({
                    ...subItem,
                    is_open: false,
                }))
                return dataItem
            })
            setPolicyList(finalData)
        })
    }
    const handleView = (policyListIndex, policyIndex) => {
        const data = _.cloneDeep(policyList)
        data[policyListIndex].groupPolicy[policyIndex].is_open =
            !data?.[policyListIndex]?.groupPolicy?.[policyIndex]?.is_open
        setPolicyList(data)
    }

    const handleMainView = (policyListIndex) => {
        const data = _.cloneDeep(policyList)
        data[policyListIndex].is_open = !data[policyListIndex].is_open
        setPolicyList(data)
    }

    const chnageID = (e) => {
        setGroupId(e.target.value)
    }
    const updateGroup = () => {
        setLoading(true)
        const body = {
            group_id: groupid,
            user_id: employeeData?.id,
        }
        updateEmployeeGroupService(body)
            .then(() => {
                getEmployeeProfile()
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setEditMode(!editMode)
                CustomToast.success('Group Updated')
                setLoading(false)
            })
    }

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader visible={loading} full />

            <div
                className='bg-cmwhite shadow-sm'
                style={{borderRadius: '10px', fontSize: '14px', fontFamily: 'Manrope'}}
            >
                {/* Begins header */}
                <div className='d-flex align-items-center justify-content-between flex-wrap gap-5 p-5'>
                    {/* Texts */}
                    <div
                        className='d-flex align-items-center gap-5 mx-sm-0 mx-auto'
                        style={{fontSize: '18px', fontFamily: 'Manrope', fontWeight: '600'}}
                    >
                        <div>Group:</div>
                        {!editMode && <div>{employeeData?.group_name}</div>}
                        {editMode && (
                            <div>
                                <CustomDropdown
                                    onChange={(e) => chnageID(e)}
                                    value={groupid}
                                    options={dropDownList}
                                    valueKey='group_id'
                                    displayKey='group_name'
                                />
                            </div>
                        )}
                    </div>
                    {/* Buttons */}
                    <AccessRights customCondition={employeeProfileAccess.editPermissionsAccess}>
                        <>
                            {!editMode && <CustomEditIcon onClick={() => setEditMode(!editMode)} />}
                            {editMode && (
                                <div className='d-flex aligns-items-center gap-5 mx-sm-0 mx-auto'>
                                    <CustomButton
                                        buttonType={BUTTON_TYPE.greyText}
                                        buttonLabel='Cancel'
                                        buttonSize={BUTTON_SIZE.small}
                                        onClick={() => setEditMode(!editMode)}
                                    />
                                    <CustomButton
                                        buttonType={BUTTON_TYPE.secondary}
                                        buttonLabel='Save'
                                        buttonSize={BUTTON_SIZE.small}
                                        onClick={updateGroup}
                                    />
                                </div>
                            )}
                        </>
                    </AccessRights>
                </div>
                <hr className='py-0 my-0 text-cmgrey100' />

                <div className='p-5'>
                    {policyList?.length > 0 ? (
                        policyList?.map((policyListItem, policyListIndex, allPolicyList) => {
                            return (
                                <div
                                    key={policyListIndex}
                                    className='px-10'
                                    style={{
                                        fontWeight: '600',
                                        fontFamily: 'Manrope',
                                        fontSize: '16px',
                                    }}
                                >
                                    <div
                                        className='d-flex gap-3 align-items-start my-5'
                                        key='no-permissions'
                                    >
                                        <CustomArrow
                                            onClick={() => handleMainView(policyListIndex)}
                                            arrowDirection={
                                                policyListItem?.is_open
                                                    ? ARROW_DIRECTION.right
                                                    : ARROW_DIRECTION.down
                                            }
                                        />
                                        <span className='text-cmBlack text-nowrap'>
                                            {' '}
                                            {policyListItem?.guard_name} :
                                        </span>{' '}
                                        <span className='text-cmGrey600'>
                                            {policyListItem?.groupPolicy
                                                ?.map((subItem) => subItem?.policies)
                                                ?.join(', ')}
                                        </span>
                                    </div>

                                    {policyListItem?.is_open
                                        ? policyListItem?.groupPolicy?.map(
                                              (heading, policyIndex) => {
                                                  return (
                                                      <div
                                                          key={`${policyListIndex}-${policyIndex}`}
                                                      >
                                                          {
                                                              <div>
                                                                  <hr className='py-0 my-0 text-cmgrey100' />
                                                                  <div className='d-flex gap-3 align-items-center my-5'>
                                                                      <span className='text-cmGrey700'>
                                                                          {heading?.policies}
                                                                      </span>{' '}
                                                                      <CustomArrow
                                                                          onClick={() =>
                                                                              handleView(
                                                                                  policyListIndex,
                                                                                  policyIndex
                                                                              )
                                                                          }
                                                                          arrowDirection={
                                                                              heading?.is_open
                                                                                  ? ARROW_DIRECTION.right
                                                                                  : ARROW_DIRECTION.down
                                                                          }
                                                                      />
                                                                  </div>
                                                              </div>
                                                          }
                                                          {heading?.is_open
                                                              ? heading?.policyTab?.map(
                                                                    (tab, policyTabIndex) => {
                                                                        return (
                                                                            <div
                                                                                className=''
                                                                                key={`${policyListIndex}-${policyIndex}-${policyTabIndex}`}
                                                                            >
                                                                                <div className='my-5'>
                                                                                    <div className='form-check form-check-custom form-check-solid'>
                                                                                        <label className='form-check-label text-cmGrey900'>
                                                                                            {
                                                                                                tab?.tabs
                                                                                            }
                                                                                        </label>
                                                                                    </div>

                                                                                    <div className='ps-sm-20 ps-10 d-sm-flex align-items-center gap-20 mt-5'>
                                                                                        {tab?.submodule?.map(
                                                                                            (
                                                                                                permission,
                                                                                                permissionIndex
                                                                                            ) => {
                                                                                                return (
                                                                                                    <div
                                                                                                        className='form-check form-check-custom form-check-solid'
                                                                                                        key={
                                                                                                            permissionIndex
                                                                                                        }
                                                                                                    >
                                                                                                        <label className='form-check-label text-cmGrey700'>
                                                                                                            {
                                                                                                                permission?.guard_name
                                                                                                            }
                                                                                                        </label>
                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                                <div className='border border-cmGrey300'></div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                )
                                                              : null}
                                                      </div>
                                                  )
                                              }
                                          )
                                        : null}
                                    {allPolicyList?.length - 1 != policyListIndex ? <hr /> : null}
                                </div>
                            )
                        })
                    ) : (
                        <div className='d-flex gap-3 align-items-center my-5'>
                            <h2
                                style={{
                                    textAlign: 'center',
                                    marginLeft: '45%',
                                    fontFamily: 'Manrope',
                                    fontWeight: '500',
                                    fontSize: 14,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                }}
                            >
                                No Permissions
                            </h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PermissionsPage
