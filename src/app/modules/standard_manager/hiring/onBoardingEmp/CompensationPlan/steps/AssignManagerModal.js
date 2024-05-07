import React, {useCallback, useEffect, useState} from 'react'
import {Dialog} from 'primereact/dialog'
import {
    getAllManagerListService,
    getUsersByManagerIdService,
    reAssignManagerService,
} from '../../../../../../../services/Services'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'

const AssignManagerModal = ({show, handleClose, onSuccess, employeeData}) => {
    const [managerList, setManagerList] = useState([])
    const [usersList, setUsersList] = useState([])
    const [managerLoading, setManagerLoading] = useState(true)
    const [userLoading, setUserLoading] = useState(false)

    useEffect(() => {
        setManagerList([])
        if (employeeData?.office_id) {
            getAllManagerListService(employeeData?.office_id).then((res) => {
                setManagerList(res?.data?.filter((item) => item?.id != employeeData?.id))
            })
        }
    }, [employeeData?.office_id])

    useEffect(() => {
        if (employeeData?.id) {
            setUserLoading(true)
            getUsersByManagerIdService(employeeData?.id)
                .then((res) => {
                    setUsersList(res?.data?.user)
                })
                .finally(() => {
                    setManagerLoading(false)
                    setUserLoading(false)
                })
        }
    }, [employeeData?.id])

    const onReassign = useCallback(() => {
        const ifEmptyManager =
            usersList?.length > 0 ? usersList?.some((item) => !item?.manager_id) : true
        if (ifEmptyManager) return CustomToast.error(`Select all user's new manager`)
        const body = {
            old_manager_id: employeeData?.id,
            users: usersList.map((item) => ({
                user_id: item?.user_id,
                manager_id: item?.manager_id,
            })),
        }

        setManagerLoading(true)
        reAssignManagerService(body)
            .then(() => {
                onSuccess()
                CustomToast.success('Manager Assigned Successfully')
            })
            .finally(() => setManagerLoading(false))
    }, [employeeData?.id, onSuccess, usersList])

    const changedManagerOfUser = (userIndex, managerId) => {
        const uList = [...usersList]
        uList[userIndex].manager_id = managerId
        setUsersList(uList)
    }

    const changeManagerOfAllEmployee = (e) => {
        const uList = [...usersList]
        const finalUList = uList.map((item) => ({...item, manager_id: e?.target?.value}))
        setUsersList(finalUList)
    }
    return (
        <Dialog
            id='kt_modal_create_app'
            tabIndex={-1}
            aria-hidden='true'
            header={() => (
                <div className=' w-100 '>
                    <div
                        style={{
                            fontSize: '16px',
                            color: '#0D1821',
                            fontFamily: 'Manrope',
                            fontWeight: '700',
                        }}
                    >
                        Assign New Manager
                    </div>
                    <hr className=' mb-0 pb-0 text-cmGrey900' />
                </div>
            )}
            icons={false}
            className='mw-sm-800px w-sm-75 h-75'
            visible={show}
            onHide={handleClose}
            backdrop={true}
            footer={() => (
                <div className='text-center'>
                    <div
                        className='btn bg-cmBlue-Crayola py-2 px-20 text-cmwhite'
                        style={{fontWeight: '500'}}
                        onClick={onReassign}
                    >
                        Save
                    </div>
                </div>
            )}
        >
            <div>
                <div
                    className='m-0 p-0'
                    style={{fontFamily: 'Manrope', fontSize: '14px', position: 'relative'}}
                >
                    <CustomLoader full visible={managerLoading} />

                    <div className=''>
                        <div className='modal-body  py-2 px-lg-10 mb-5'>
                            <div className='py-lg-7 px-lg-10 '>
                                <>
                                    <div
                                        className='d-flex align-items-center flex-wrap justify-content-between'
                                        style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                    >
                                        <div>
                                            <h4
                                                className='text-cmGrey800 mb-sm-5 mb-3'
                                                style={{fontWeight: '900'}}
                                            >
                                                Select manager for all employees:
                                            </h4>
                                        </div>
                                        <div className='w-sm-25 w-100'>
                                            <select
                                                style={{
                                                    fontWeight: '700',
                                                    fontSize: '14px',
                                                }}
                                                onChange={changeManagerOfAllEmployee}
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm text-cmGrey800 bg-cmGrey200 cursor-pointer'
                                            >
                                                <option style={{fontWeight: 600}} value=''>
                                                    Select Manager
                                                </option>
                                                {managerList.map((managerItem) => (
                                                    <option
                                                        key={managerItem?.id}
                                                        style={{fontWeight: 600}}
                                                        value={managerItem?.id}
                                                    >
                                                        {managerItem?.first_name}&nbsp;
                                                        {managerItem?.last_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <hr style={{height: '2px'}} />
                                    <div
                                        className='d-flex align-items-center flex-wrap justify-content-between'
                                        style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                    >
                                        <div className='w-sm-25 w-100'>
                                            <label
                                                className='text-cmGrey800 mb-sm-5 mb-3 text-decoration-underline'
                                                style={{fontWeight: '600'}}
                                            >
                                                Name:
                                            </label>
                                        </div>
                                        <div className='w-sm-25 w-100'>
                                            <label
                                                className='text-cmGrey800 mb-sm-5 mb-3 text-decoration-underline '
                                                style={{fontWeight: '600'}}
                                            >
                                                Position:
                                            </label>
                                        </div>

                                        <div className='w-sm-25 w-100'>
                                            <div
                                                className='text-cmGrey800 mb-sm-5 mb-3 text-decoration-underline'
                                                style={{fontWeight: '600'}}
                                            >
                                                New Manager:
                                            </div>
                                        </div>
                                    </div>
                                </>
                                <div
                                    style={{
                                        position: 'relative',
                                    }}
                                >
                                    <CustomLoader full visible={userLoading} />
                                    {usersList?.map((item, index) => (
                                        <div key={index}>
                                            <hr style={{height: '2px'}} />
                                            <div
                                                className='d-flex align-items-center flex-wrap justify-content-between'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontSize: '14px',
                                                    position: 'relative',
                                                }}
                                            >
                                                <div className='w-sm-25 w-100'>
                                                    <div
                                                        className='text-cmGrey600 mb-3'
                                                        style={{fontWeight: '600'}}
                                                    >
                                                        {item?.first_name} {item?.last_name}
                                                    </div>
                                                </div>
                                                <div className='w-sm-25 w-100'>
                                                    <div
                                                        className='text-cmGrey600 mb-3'
                                                        style={{fontWeight: '600'}}
                                                    >
                                                        {item?.['position_name ']}
                                                    </div>
                                                </div>

                                                <div className='w-sm-25 w-100'>
                                                    <select
                                                        style={{
                                                            fontWeight: '700',
                                                            fontSize: '14px',
                                                        }}
                                                        value={item?.manager_id}
                                                        onChange={(e) => {
                                                            changedManagerOfUser(
                                                                index,
                                                                e?.target?.value
                                                            )
                                                        }}
                                                        data-control='select2'
                                                        data-hide-search='true'
                                                        className='form-select form-select-black form-select-sm text-cmGrey800 bg-cmGrey200 cursor-pointer'
                                                    >
                                                        <option style={{fontWeight: 600}} value=''>
                                                            Select Manager
                                                        </option>
                                                        {managerList.map((managerItem) => (
                                                            <option
                                                                key={managerItem?.id}
                                                                style={{fontWeight: 600}}
                                                                value={managerItem?.id}
                                                            >
                                                                {managerItem?.first_name}&nbsp;
                                                                {managerItem?.last_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default AssignManagerModal
