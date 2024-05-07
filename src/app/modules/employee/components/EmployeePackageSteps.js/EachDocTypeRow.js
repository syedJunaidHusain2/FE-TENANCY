import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {
    deleteOnBoardingDocumentService,
    uploadOnBoardingDocumentService,
} from '../../../../../services/Services'
import {v4 as uuidv4} from 'uuid'
import {saveAs} from 'file-saver'
import {getServerImage} from '../../../../../helpers/CommonHelpers'
import AccessRights from '../../../../../accessRights/AccessRights'
import useCustomAccessRights from '../../../../../accessRights/useCustomAccessRights'
import {getValidDate} from '../../../../../constants/constants'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import {useNavigate} from 'react-router-dom'
import CustomEllipsis from '../../../../../customComponents/customEllipsis/CustomEllipsis'

const EachDocTypeRow = ({employeeData, item, userId, index, getDocument}) => {
    const navigate = useNavigate()
    const profileFilePickerRef = useRef(null)
    const [uploadedDocument, setUploadedDocument] = useState(item?.document)
    const [unUploadedDocument, setUnUploadedDocument] = useState([])
    const {employeeProfileAccess} = useCustomAccessRights({employeeData})

    useEffect(() => {
        setUploadedDocument(item?.document)
    }, [item?.document])

    const deleteDocument = useCallback(
        (docIndex) => {
            const tempData = [...uploadedDocument]
            const itemToBeDelete = uploadedDocument?.[docIndex]
            const finalData = tempData?.filter((tempItem, tempIndex) => tempIndex != docIndex)
            setUploadedDocument(finalData)
            deleteOnBoardingDocumentService(itemToBeDelete?.id)
        },
        [uploadedDocument]
    )

    const onUploadNewDocument = useCallback(
        (e) => {
            if (e?.target?.files?.length > 0) {
                const isUploadingState = unUploadedDocument?.some(
                    (docItem) => docItem?.status == 'uploading'
                )
                const filesData = [...e?.target?.files]?.map((fileItem, fileIndex) => ({
                    id: uuidv4(),
                    status:
                        isUploadingState || (!isUploadingState && fileIndex > 0)
                            ? 'pending'
                            : 'uploading',
                    document: fileItem?.name,
                    progress: 0,
                    file: fileItem,
                }))
                setUnUploadedDocument((val) => [...val, ...filesData])
            }
        },
        [unUploadedDocument]
    )

    const currentUploadDocument = useMemo(() => {
        return unUploadedDocument?.length > 0
            ? unUploadedDocument.find((docItem) => docItem?.status == 'uploading')
            : null
    }, [unUploadedDocument])

    useEffect(() => {
        if (currentUploadDocument) {
            const docIndex = unUploadedDocument?.findIndex(
                (docItem) => docItem?.id == currentUploadDocument?.id
            )
            let formData = new FormData()
            formData.append('document_type_id', item?.id)
            formData.append('description', 'docs')
            formData.append('user_id', userId)
            formData.append('image[]', currentUploadDocument?.file)
            uploadOnBoardingDocumentService(formData, (uploadProgress) => {
                const data = [...unUploadedDocument]
                data[docIndex].progress = uploadProgress?.completed
                setUnUploadedDocument(data)
            }).then((res) => {
                const data = [...unUploadedDocument]
                const uploadedData = [...uploadedDocument]
                data[docIndex].status = 'uploaded'
                if (docIndex < unUploadedDocument?.length - 1) {
                    data[docIndex + 1].status = 'uploading'
                }
                uploadedData.push({
                    ...currentUploadDocument,
                    ...res,
                })
                setUploadedDocument(uploadedData)
                setUnUploadedDocument(data)
                getDocument()
            })
        }
    }, [currentUploadDocument])

    return (
        <tr
            key={index}
            style={{
                fontSize: '14px',
                fontFamily: 'Manrope',
                fontWeight: '600',
            }}
            className={`text-cmGrey700 stripRow `}
        >
            <td width={'175px'} className={`p-5`} style={{fontWeight: '700'}}>
                <div className={`${item?.field_required}`}>{item?.field_name}</div>
                {item?.field_link ? (
                    <a
                        href={item?.field_link}
                        target='_blank'
                        rel='noreferrer'
                        className=' text-cmBlue-Crayola text-decoration-underline'
                    >
                        {item?.field_link}
                    </a>
                ) : null}
            </td>

            <td className='p-5' width={'150px'} style={{fontWeight: '700'}}>
                {uploadedDocument?.length > 0
                    ? getValidDate(uploadedDocument?.[0]?.uploaded_date, 'MM/DD/YYYY')
                        ? getValidDate(uploadedDocument?.[0]?.uploaded_date, 'MM/DD/YYYY')
                        : getValidDate(item?.doc_created_at, 'MM/DD/YYYY')
                        ? getValidDate(item?.doc_created_at, 'MM/DD/YYYY')
                        : '-'
                    : null}
            </td>
            <td className='p-5' width={'300px'}>
                {uploadedDocument?.length > 0
                    ? uploadedDocument?.map((doc, docIndex) => (
                          <EachDocRow
                              employeeData={employeeData}
                              doc={doc}
                              docIndex={docIndex}
                              deleteDocument={() => deleteDocument(docIndex)}
                              key={doc?.document}
                          />
                      ))
                    : null}
                {unUploadedDocument?.length > 0
                    ? unUploadedDocument
                          ?.filter((docItem) => docItem?.status != 'uploaded')
                          .map((doc, docIndex) => <EachDocRow type={'unuploaded'} doc={doc} />)
                    : null}
            </td>
            {!item?.is_deleted ? (
                <AccessRights customCondition={employeeProfileAccess.addDocumentAccess}>
                    <td width={'100px'} className='p-5 d-flex align-items-center gap-4 justify-content-center'>
                        <CustomButton
                            buttonLabel='Browse'
                            buttonType={BUTTON_TYPE.disabled}
                            onClick={() => profileFilePickerRef?.current?.click()}
                            buttonSize={BUTTON_SIZE.small}
                        />
                        <input
                            type='file'
                            ref={profileFilePickerRef}
                            style={{display: 'none'}}
                            required
                            multiple
                            onChange={onUploadNewDocument}
                            name={'image'}
                            accept='.xlsx,.xls,.heic,.png,.jpeg,.jpg,.doc, .docx,.ppt, .pptx,.txt,.pdf'
                        />
                    </td>
                </AccessRights>
            ) : null}
        </tr>
    )
}

const EachDocRow = ({
    employeeData,
    docIndex,
    doc,
    deleteDocument = () => {},
    type = 'uploaded',
}) => {
    const {employeeProfileAccess} = useCustomAccessRights({employeeData})
    function downloadDoc(file) {
        const fileName = file?.document?.split('/')?.[1]
        saveAs(getServerImage(file?.document), fileName)
    }

    return (
        <CustomEllipsis
            width='275px'
            style={{fontSize: '14px'}}
            text={type == 'unuploaded' && doc?.status != 'uploaded' ? doc?.progress : doc?.document}
        >
            <div
                key={doc?.document}
                className='my-2'
                style={{
                    overflow: 'hidden',
                    borderRadius: 10,
                    position: 'relative',
                    // backgroundColor:
                    //     type == 'uploaded'
                    //         ? 'white'
                    //         : doc?.status != 'uploaded'
                    //         ? '#EEEEEE'
                    //         : 'white',
                }}
            >
                {type == 'unuploaded' && doc?.status != 'uploaded' ? (
                    <div
                        style={{
                            width: `${doc?.progress ?? 0}%`,
                            position: 'absolute',
                            backgroundColor: 'rgba(0,0,0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <span style={{color: 'white', marginRight: 10}}>{doc?.progress}%</span>
                    </div>
                ) : null}
                <div>
                    <AccessRights customCondition={employeeProfileAccess.deleteDocumentAccess}>
                        <span className='me-5'>
                            {type == 'uploaded' ? (
                                <i
                                    className='bi bi-trash text-cmBlue-Crayola cursor-pointer'
                                    onClick={deleteDocument}
                                ></i>
                            ) : null}
                        </span>
                    </AccessRights>
                    <span
                        className='bg-cmBlue-Crayola rounded-pill text-cmBlue-Crayola bg-opacity-10 p-2 cursor-pointer'
                        onClick={() => downloadDoc(doc)}
                    >
                        <span
                            style={{
                                padding: 5,
                                paddingLeft: 10,
                                fontFamily: '',
                            }}
                            className='cursor-pointer text-decoration-underline'
                            onClick={() => downloadDoc(doc)}
                        >
                            {doc?.document}
                        </span>
                    </span>
                </div>
            </div>
        </CustomEllipsis>
    )
}
export default EachDocTypeRow
