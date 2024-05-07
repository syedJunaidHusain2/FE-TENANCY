/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useCallback, useEffect, useState} from 'react'

import {
    updateCloserByPidService,
    updateSetterByPidService,
} from '../../../../../../services/Services'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'

import CustomAutoCompleteDropdown from '../../../../../../customComponents/customInputs/customAutoCompleteDropdown/CustomAutoCompleteDropdown'
import {
    getAllClosersSelector,
    getAllSettersSelector,
} from '../../../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {getSettersAction} from '../../../../../../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'

const AddRepPopup = ({
    getPosition,
    show,
    handleClose,
    type,
    csObj,
    closerSetterList,
    handleCloserSetterInput,
    getSaleData,
}) => {
    const [loading, setLoading] = useState(false)
    const settersList = useSelector(getAllSettersSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        getSetterCloser()
    }, [])

    const getSetterCloser = useCallback(() => {
        dispatch(getSettersAction())
    }, [dispatch])

    const [closerSetter, setCloserSetter] = useState({
        closer_setter_1: type == 'Setter' ? csObj?.setter1?.id ?? null : csObj?.closer1?.id ?? null,
        closer_setter_2: type == 'Setter' ? csObj?.setter2?.id ?? null : csObj?.closer2?.id ?? null,
    })
    const [closerOrSetter] = useState(
        type == 'Setter' ? closerSetterList?.setter : closerSetterList?.closer
    )
    let showCloserSetter1 = csObj?.closer1
        ? csObj?.closer1 == null
            ? false
            : true
        : csObj?.setter1 == null
        ? false
        : true
    let showCloserSetter2 = csObj?.closer2
        ? csObj?.closer2 == null
            ? false
            : true
        : csObj?.setter2 == null
        ? false
        : true

    const handleInput = (e) => {
        setCloserSetter((val) => ({
            ...val,
            [e?.target?.name]: e?.target?.value,
        }))
    }
    const addCloserSetter = (e) => {
        e.preventDefault()
        let body = {
            pid: csObj?.pid,
        }
        let data = [closerSetter?.closer_setter_1, closerSetter?.closer_setter_2]

        setLoading(true)
        if (type == 'Setter') {
            body.setters = data?.filter((item) => item != null)
            updateSetterByPidService(body)
                .then(handleClose)
                .finally(() => {
                    setLoading(false)
                })
        }
        if (type == 'Closer') {
            body.closer = data?.filter((item) => item != null)
            updateCloserByPidService(body)
                .then(handleClose)
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }
    const addSetter = (e) => {
        e.preventDefault()
        let body = {
            pid: csObj?.pid,
        }
        let data = [closerSetter?.closer_setter_1, closerSetter?.closer_setter_2]

        setLoading(true)

        body.setters = data?.filter((item) => item != null)
        updateSetterByPidService(body)
            .then(() => {
                handleClose()
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
                handleClose()
                getSaleData()
            })
    }
    return (
        <CustomModal show={show} onHide={handleClose} title='Add Setter' maxWidth='650'>
            <CustomLoader visible={loading} full />

            <form onSubmit={addSetter}>
                <div className=''>
                    <div className='modal-body  py-lg-3 px-lg-10'>
                        <div className='container mt-4 d-flex justify-content-center'>
                            <div className='row w-500px'>
                                <p className='mt-1' style={{color: 'red'}}></p>
                            </div>
                        </div>
                        {!showCloserSetter1 && (
                            <>
                                <div className='container py-lg-7 px-lg-10 d-flex justify-content-center'>
                                    <div className='row d-flex w-500px justify-content-center'>
                                        <div
                                            className='col text-cmGrey700'
                                            style={{
                                                fontFamily: 'Manrope',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Setter 1{' '}
                                            <label
                                                className='mt-1 d-flex flex-row  h-50px'
                                                style={{
                                                    width: '99%',
                                                    borderRadius: '6px',
                                                }}
                                            >
                                                <CustomDropdown
                                                    showClear={false}
                                                    name={'closer_setter_1'}
                                                    value={closerSetter?.closer_setter_1}
                                                    options={settersList}
                                                    placeholder='Select Setter 1'
                                                    onChange={handleInput}
                                                    valueKey='id'
                                                    displayKey='name'
                                                    displayFields={['first_name', 'last_name']}
                                                    searchFields={['first_name', 'last_name']}
                                                    // errorMessage={salesErrorData?.setter_id}
                                                />
                                                {/* <CustomDropdown
                                                    name='closer_setter_1'
                                                    value={closerSetter?.closer_setter_1}
                                                    options={settersList}
                                                    placeholder='- Select -'
                                                    onChange={handleInput}
                                                    valueKey='id'
                                                    displayKey='name'
                                                /> */}
                                            </label>
                                        </div>

                                        <p className='mt-1' style={{color: 'red'}}>
                                            {/* {'parentmessage'} */}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className='d-flex justify-content-center mt-0 mb-12'>
                    <button
                        type='button'
                        className=' w-150px text-cmwhite bg-cmBlue-Crayola'
                        style={{
                            height: '46px',
                            borderRadius: '6px',
                            fontSize: '16px',
                            borderWidth: 0,
                        }}
                        onClick={addSetter}
                    >
                        Create
                    </button>
                </div>
            </form>
        </CustomModal>
    )
}

export {AddRepPopup}
