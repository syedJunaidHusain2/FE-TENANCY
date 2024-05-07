import {useState, useEffect, useCallback} from 'react'

import {
    addEmployeeDocumentByIdService,
    updateEmployeeDocumentByIdService,
} from '../../../../../services/Services'
import {useDispatch, useSelector} from 'react-redux'
import {getDocumentTypesAction} from '../../../../../redux/actions/SettingActions'
import {getDocumentTypessSelector} from '../../../../../redux/selectors/SettingsSelectors'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import {getErrorMessageFromResponse} from '../../../../../helpers/CommonHelpers'
import CustomModal from '../../../../../customComponents/customModal/CustomModal'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'

const ProfileDocumentFormPopup = ({show, handleClose, employeeDocData, userId}) => {
    const dispatch = useDispatch()
    const [selectedImages, setSelectedImages] = useState(null)
    const [data, setData] = useState(employeeDocData)
    const docType = useSelector(getDocumentTypessSelector)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(getDocumentTypesAction())
    }, [])

    useEffect(() => {
        setData(employeeDocData)
    }, [employeeDocData])

    const addUpdateDocument = useCallback(() => {
        if (!data?.document_type_id) return CustomToast.error('Select Document Type')
        if (!selectedImages) return CustomToast.error('Upload File')

        setLoading(true)
        let formData = new FormData()
        formData.append('user_id', userId)
        formData.append('document_type_id', data?.document_type_id ?? 1)
        formData.append('description', data?.description)
        if (selectedImages?.length > 0) {
            for (let i = 0; i < selectedImages?.length; i++) {
                formData.append('image[]', selectedImages?.[i])
            }
        }
        if (data?.id) {
            formData.append('id', data?.id)
            updateEmployeeDocumentByIdService(formData)
                .then(() => {
                    CustomToast.success('Document updated')
                    handleClose()
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            addEmployeeDocumentByIdService(formData)
                .then(() => {
                    CustomToast.success('Document Added')
                    handleClose()
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })

                .finally(() => {
                    setLoading(false)
                })
        }
    }, [data?.description, data?.document_type_id, data?.id, handleClose, selectedImages, userId])

    const onChangeInputData = (e) => {
        updateData(e?.target?.name, e?.target?.value)
    }
    const fileSelectedHandler = (e) => {
        setSelectedImages(e?.target?.files)
    }
    const updateData = (field, value) => {
        setData((val) => ({
            ...val,
            [field]: value,
        }))
    }
    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            title={'Upload New Documents'}
            maxWidth='1000'
        >
            <CustomLoader full visible={loading} />
            <div
                className='d-flex justify-content-between align-items-center my-3'
                style={{
                    fontFamily: 'Manrope',
                }}
            >
                <div></div>
                <div
                    style={{
                        fontSize: '16px',
                        fontFamily: 'Manrope',
                        fontWeight: '600',
                        marginLeft: '5px',
                    }}
                    className='text-cmBlack'
                >
                    Upload New Documents
                </div>
                {/* begin::Close */}
                <div
                    className='btn btn-sm me-4 btn-icon btn-active-color-primary'
                    onClick={handleClose}
                >
                    <i className='bi bi-x-circle text-cmGrey500' style={{fontSize: '22px'}}></i>
                </div>
            </div>

            <div className='border border-gray-200'></div>

            {/* <div className='modal-body py-lg-5  p-15' style={{fontFamily: 'Manrope', fontSize: '14px'}}> */}
            <div className='mx-sm-auto mt-15 mb-20 w-sm-400px mx-5'>
                {/* <form> */}
                <div className='mb-15'>
                    <label className='form-label text-cmGrey800 mb-5' style={{fontWeight: 600}}>
                        Upload new documents (<span className='text-cmError'>*</span> is mandatory)
                    </label>
                    <select
                        className='form-select text-cmGrey700 bg-cmGrey200 border border-0 cursor-pointer'
                        style={{fontWeight: 600}}
                        onChange={onChangeInputData}
                        name={'document_type_id'}
                        value={data?.document_type_id}
                    >
                        <option value=''>Select document type</option>
                        {docType?.map((list, index) => (
                            <option value={list.id} style={{fontWeight: 600}} key={index}>
                                {list.document_type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='mb-15'>
                    <label className='form-labeltext-cmGrey800 mb-5' style={{fontWeight: 600}}>
                        description
                    </label>
                    <CustomInput
                        type={INPUT_TYPE.textarea}
                        placeholder='Add here'
                        name={'description'}
                        defaultValue={data?.description}
                        onChange={onChangeInputData}
                    />
                </div>
                <div className='mb-15'>
                    <label className='form-labeltext-cmGrey800 mb-5' style={{fontWeight: 600}}>
                        Images or documents (maximum 5 MB each)
                        <span className='text-cmError'>*</span>
                    </label>
                    <input
                        type='file'
                        className='form-control bg-cmbg'
                        required
                        multiple
                        onChange={fileSelectedHandler}
                        name={'image'}
                    />
                    <div
                        style={{
                            marginTop: 20,
                        }}
                    >
                        {data?.document &&
                            data?.document?.length > 0 &&
                            data.document.map((doc) => (
                                <div
                                    key={doc?.document}
                                    className='bg-cmGrey100'
                                    style={{
                                        padding: 5,
                                        paddingLeft: 10,
                                        borderRadius: 10,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: '',
                                        }}
                                    >
                                        {doc.document}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
                <div className='text-center'>
                    <button
                        // type='submit'
                        className='btn bg-cmBlue-Crayola text-cmwhite w-sm-250px '
                        style={{fontWeight: 700, fontSize: '16px'}}
                        onClick={addUpdateDocument}
                    >
                        {employeeDocData?.id == 'edit' ? 'Update Documents' : 'Upload Documents'}
                    </button>
                </div>
            </div>
        </CustomModal>
    )
}

export {ProfileDocumentFormPopup}
