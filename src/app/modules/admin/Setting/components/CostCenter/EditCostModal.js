/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {
    disableCostCenterService,
    getCostCenterDropdownService,
    updateCostCenterService,
} from '../../../../../../services/Services'
import {useSelector} from 'react-redux'
import {getParentCostCenterSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'

const EditCostModal = ({show, handleClose, data, setLoader, getcostcenter}) => {
    const [loading, setLoading] = useState(false)
    useEffect(function () {
        getCostCenterDropdownService().then((res) => {})
    }, [])
    useEffect(
        function () {
            if (data === '') {
            } else {
                setCode(data.code)
                setName(data.name)
                setDescription(data.description)
                setCostHead(data.parent_id)
            }
        },
        [data]
    )
    const costcenter = useSelector(getParentCostCenterSelector)

    const desablecostcenter = () => {
        if (data?.chields?.length) {
            CustomDialog.warn(
                'Disabling this Parent will disable all sub-centers. Are you sure, You wish to continue ?',
                () => {
                    var body = {id: data.id, status: 0}
                    setLoading(true)
                    disableCostCenterService(body)
                        .then((res) => {
                            setLoader(true)
                            handleClose()
                            CustomToast.success('Cost Centers Disabled')
                            getcostcenter()
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                }
            )
        } else {
            CustomDialog.warn(
                'Deleting this department will affect the entire software. Do you wish to continue?',
                () => {
                    var body = {id: data.id, status: 0}
                    setLoading(true)
                    disableCostCenterService(body)
                        .then((res) => {
                            setLoader(true)
                            handleClose()
                            CustomToast.success('Cost Centers Disabled')
                            getcostcenter()
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                }
            )
        }
    }
    const activecostcenter = () => {
        var body = {id: data.id, status: 1}
        setLoading(true)
        disableCostCenterService(body)
            .then((res) => {
                setLoader(true)
                handleClose()
                CustomToast.success('Cost Centers Actived')
                getcostcenter()
            })
            .catch((error) => {
                CustomToast.error(getErrorMessageFromResponse(error))
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const [costhead, setCostHead] = useState()
    const [name, setName] = useState()
    const [code, setCode] = useState()
    const [description, setDescription] = useState()
    const AddCostCenter = () => {
        var id = data.id
        var body = {
            name: name,
            code: code,
            description: description,
            parent_id: costhead,
            status: data.status,
        }
        if (!name) return CustomToast.error('Select Cost Head Name')
        if (!code) return CustomToast.error('Select Code')
        setLoading(true)
        updateCostCenterService(id, body)
            .then((res) => {
                setLoader(true)
                handleClose()
                CustomToast.success('Updated Successfully')
                getcostcenter()
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <CustomModal show={show} onHide={handleClose} title={'Edit Cost Head'} maxWidth='600'>
            <CustomLoader visible={loading} full />

            {/* <div className='modal-header '></div> */}
            <div className=''>
                <div className='px-lg-10'>
                    {data?.parent_id ? (
                        <div className='row w-100  mb-5 '>
                            <CustomDropdown
                                label={'Parent Cost Head'}
                                options={costcenter}
                                onChange={(event) => setCostHead(event.target.value)}
                                value={costhead}
                                valueKey='id'
                            />
                        </div>
                    ) : null}

                    <div className='row justify-content-between w-100 mb-5 text-cmGrey700 '>
                        <div className='col'>
                            <CustomInput
                                label={'Cost Head Name'}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Enter Name'
                                rejex={/^[\w\-\s]+$/}
                            />
                        </div>
                        <div className='col text-cmGrey700'>
                            <CustomInput
                                label={'Code'}
                                required
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='w-100'>
                        <CustomInput
                            label={'Description'}
                            type={INPUT_TYPE.textarea}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center my-10 gap-5'>
                <CustomButton
                    buttonType={data.status === 0 ? BUTTON_TYPE.secondary : BUTTON_TYPE.error}
                    buttonLabel={data.status === 0 ? <>Activate</> : <>Deactivate</>}
                    onClick={data.status === 0 ? activecostcenter : desablecostcenter}
                />
                <CustomButton
                    buttonType={BUTTON_TYPE.primary}
                    buttonLabel='Save'
                    onClick={AddCostCenter}
                />
            </div>
        </CustomModal>
    )
}

export {EditCostModal}
