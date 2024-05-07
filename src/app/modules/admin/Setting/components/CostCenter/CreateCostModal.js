/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useRef, useEffect} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'

import {
    addCostCenterService,
    getCostCenterDropdownService,
} from '../../../../../../services/Services'
import {useSelector} from 'react-redux'
import {getParentCostCenterSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import {
    ADD_COST_HEAD_VALIDATION_FIELD,
    newCostHeadValidation,
} from '../../../../../../validations/validations'
import {
    getErrorMessageFromResponse,
    isEmptyObjectValue,
} from '../../../../../../helpers/CommonHelpers'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'

const CreateCostModal = ({show, handleClose, getcostcenter, setLoader, loader}) => {
    const costcenter = useSelector(getParentCostCenterSelector)
    const [costhead, setCostHead] = useState(null)
    const [name, setName] = useState()
    const [code, setCode] = useState()
    const [description, setDescription] = useState()
    const [addHeadError, setAddHeadError] = useState(ADD_COST_HEAD_VALIDATION_FIELD)
    const [loading, setloading] = useState(false)

    const AddCostCenter = (e) => {
        e.preventDefault()
        var body = {name: name, code: code, description: description, parent_id: costhead}
        const validationErrors = newCostHeadValidation(body)
        setAddHeadError(validationErrors)
        if (isEmptyObjectValue(validationErrors)) {
            setLoader(true)
            setloading(true)
            addCostCenterService(body)
                .then((res) => {
                    CustomToast.success('Cost Added Successfully')
                    handleClose()
                    getcostcenter()
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally((e) => {
                    setloading(false)
                })
        }
    }

    return (
        <CustomModal show={show} onHide={handleClose} title={'Add Cost Head'} maxWidth='600'>
            <form onSubmit={AddCostCenter}>
                <div className=''>
                    <div className='mb-5'>
                        <div className='d-flex justify-content-center mb-5'>
                            <div className='row d-flex w-500px justify-content-center'>
                                <div className='col text-cmGrey700'>
                                    <CustomDropdown
                                        label={'Parent Cost Head'}
                                        options={costcenter}
                                        onChange={(e) => {
                                            setCostHead(e.target.value)
                                        }}
                                        value={costhead}
                                        valueKey='id'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className=' d-flex justify-content-center mb-5'>
                            <div className='row w-500px'>
                                <div className='col text-cmGrey700 '>
                                    <CustomInput
                                        label={'Cost Head Name'}
                                        required
                                        placeholder='Enter Name'
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                        errorMessage={addHeadError?.codeHeadName}
                                        value={name}
                                        rejex={/^[\w\-\s]+$/}
                                    />
                                </div>
                                <div className='col'>
                                    <CustomInput
                                        label={'Code'}
                                        required
                                        placeholder='xxx-xxx'
                                        onChange={(e) => {
                                            setCode(e.target.value)
                                        }}
                                        errorMessage={addHeadError?.costHeadCode}
                                        value={code}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='px-lg-10 d-flex justify-content-center mb-5'>
                            <div className='row d-flex w-500px justify-content-center'>
                                <div className='col'>
                                    <CustomInput
                                        label={'Description'}
                                        type={INPUT_TYPE.textarea}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        style={{
                                            borderRadius: '6px',
                                        }}
                                        placeholder='Enter Description'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center mb-5'>
                    <CustomButton
                        loading={loading}
                        buttonType={BUTTON_TYPE.primary}
                        buttonLabel='Create'
                        onClick={AddCostCenter}
                        type='submit'
                        buttonSize={BUTTON_SIZE.normal}
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export {CreateCostModal}
