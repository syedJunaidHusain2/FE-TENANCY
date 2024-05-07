import {useState, useEffect, useMemo, useCallback} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {getDocumentTypessSelector} from '../../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import {
    addEmployeeDocumentByIdService,
    updateEmployeeDocumentByIdService,
} from '../../../../../services/Services'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import {getDocumentTypesAction} from '../../../../../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {getErrorMessageFromResponse} from '../../../../../helpers/CommonHelpers'
import CustomModal from '../../../../../customComponents/customModal/CustomModal'

const modalsRoot = document.getElementById('root-modals') || document.body

const UploadNewDocModal = ({show, handleClose, userData, getDocument, editData}) => {
    const docType = useSelector(getDocumentTypessSelector)
    const [selectedImages, setSelectedImages] = useState(null)
    const [description, setDescription] = useState(editData?.description)
    const [documentType, setDocumentType] = useState(editData?.document_type_id)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDocumentTypesAction())
    }, [])
    useEffect(() => {
        setDescription(editData?.description)
        setDocumentType(editData?.document_type_id)
    }, [editData])
    const fileSelectedHandler = (e) => {
        setSelectedImages(e?.target?.files)
    }

    const addUpdateDocument = useCallback(() => {
        setLoading(true)
        let formData = new FormData()
        formData.append('user_id', userData?.id)
        formData.append('document_type_id', documentType ?? 1)
        formData.append('description', description)
        if (selectedImages?.length > 0) {
            for (let i = 0; i < selectedImages?.length; i++) {
                formData.append('image[]', selectedImages?.[i])
            }
        }
        if (editData) {
            formData.append('id', editData?.id)
            updateEmployeeDocumentByIdService(formData)
                .then(() => {
                    CustomToast.success('Document updated')
                    getDocument()
                    handleClose()
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            addEmployeeDocumentByIdService(formData)
                .then(() => {
                    CustomToast.success('Document Added')
                    getDocument()
                    handleClose()
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [
        userData?.id,
        documentType,
        description,
        selectedImages,
        editData,
        getDocument,
        handleClose,
    ])

    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='750' title={'Upload New Documents'}>
            <CustomLoader visible={loading} full />

            {/* <div className='modal-header '></div> */}
            <form>
                <div className='w-75 mx-auto'>
                    <div className='modal-body  py-lg-7 '>
                        <div className='mb-5' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            <label
                                className='text-cmGrey800 text-center'
                                style={{fontWeight: '600'}}
                            >
                                Upload new documents (* is mandatory)
                            </label>

                            <label
                                className='mt-1 d-flex flex-row  h-50px'
                                style={{
                                    borderRadius: '6px',
                                }}
                            >
                                <select
                                    style={{
                                        fontWeight: '600',
                                        fontSize: '14px',
                                    }}
                                    data-hide-search='true'
                                    className='form-select form-select-black form-select-sm text-cmGrey800 bg-cmbg cursor-pointer'
                                    onChange={(e) => setDocumentType(e.target.value)}
                                    value={documentType}
                                >
                                    <option value={''}>Pick a Type</option>
                                    {docType?.map((list, index) => (
                                        <option
                                            value={list.id}
                                            style={{fontWeight: 600}}
                                            key={index}
                                        >
                                            {list.document_type}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        {/* line 2 */}
                        <div className='mb-5'>
                            <label
                                className='form-label text-cmGrey800'
                                style={{fontWeight: '600'}}
                            >
                                Description
                            </label>
                            <textarea
                                className='form-control'
                                id='textAreaExample4'
                                rows='3'
                                placeholder='Add here'
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            ></textarea>
                        </div>

                        {/* line 3 */}
                        <div className='mb-5'>
                            <label
                                className='required form-label text-cmGrey800'
                                style={{fontWeight: '600'}}
                            >
                                Images or documents (maximum 5 MB each)
                            </label>
                            <input
                                type='file'
                                className='form-control bg-cmbg'
                                required
                                single
                                onChange={fileSelectedHandler}
                                name={'image'}
                            />
                            <div
                                style={{
                                    marginTop: 20,
                                }}
                            >
                                {editData?.document &&
                                    editData?.document?.length > 0 &&
                                    editData.document.map((doc) => (
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
                    </div>
                </div>

                <div className='d-flex justify-content-center mt-4 mb-12'>
                    <div
                        className=' btn text-cmwhite bg-cmPositionSetter'
                        style={{
                            fontWeight: '700',
                            borderRadius: '6px',
                            fontSize: '16px',
                            borderWidth: 0,
                        }}
                        onClick={() => addUpdateDocument()}
                    >
                        {editData ? 'Update Documents' : 'Upload Documents'}
                        {/* Upload Documents */}
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}

export default UploadNewDocModal
