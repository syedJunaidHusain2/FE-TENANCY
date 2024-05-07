import {useState, useEffect, useCallback, useMemo} from 'react'
import {useLocation} from 'react-router-dom'
import {DocumentFormPopup} from './DocumentFormPopup'
import DocumentTable from './DocumentTable'
import {
    getEmployeeDocumentByIdService,
    deleteEmployeeDocumentByIdService,
    getEmployeeSequiDocDocumentByIdService,
    getOnBoardingEmployeeSequiDocDocumentByIdService,
} from '../../../../../../../services/Services'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import {TabPanel, TabView} from 'primereact/tabview'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../customComponents/customButtton/CustomButton'
import CustomNoData from '../../../../../../../customComponents/customNoData/CustomNoData'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import {KTSVG} from '../../../../../../../_metronic/helpers'
import {getValidDate} from '../../../../../../../constants/constants'
import {getServerImage} from '../../../../../../../helpers/CommonHelpers'
import axios from 'axios'
import CustomTooltip from '../../../../../../../customComponents/customTooltip/CustomTooltip'
import CustomArrow, {
    ARROW_DIRECTION,
} from '../../../../../../../customComponents/customIcons/CustomIcons'
import {saveAs} from 'file-saver'

const DocumentsPage = ({employeeData}) => {
    let location = useLocation()
    const [employeeDocData, setEmployeeDocData] = useState(null)
    const [selectedEmployeecData, setSelectedEmployeecData] = useState(null)
    const [sequiDocDocumentData, setSequiDocDocumentData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [componentStates, setComponentStates] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [onBoardingResMsg, setOnBoardingResMsg] = useState(null)

    useEffect(() => {
        if (location?.state?.isOnBoarding) setActiveIndex(1)
        getDocument()
        sequiDocDocument()
    }, [location?.state?.employee_id])

    const sequiDocDocument = useCallback(() => {
        if (location?.state?.isOnBoarding) {
            getOnBoardingEmployeeSequiDocDocumentByIdService(location?.state?.employee_id)
                .then((res) => {
                    setSequiDocDocumentData(res?.data)
                    if (location?.state?.isOnBoarding) setOnBoardingResMsg(res?.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            getEmployeeSequiDocDocumentByIdService(location?.state?.employee_id)
                .then((res) => {
                    setSequiDocDocumentData(res?.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [location?.state?.employee_id, activeIndex])

    const getDocument = () => {
        if (location?.state?.isOnBoarding) {
        } else {
            setLoading(true)
            getEmployeeDocumentByIdService(location?.state?.employee_id)
                .then((res) => {
                    setEmployeeDocData(res)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }
    const handleClose = () => {
        setSelectedEmployeecData(null)
        getDocument()
        setOpen(false)
    }

    const deleteDocument = useCallback(
        (id) => {
            const tempData = {...employeeDocData}
            const finalData = tempData?.data?.filter((item) => item?.id !== id)
            tempData.data = finalData
            setEmployeeDocData(tempData)
            CustomToast.success('Document Deleted')
            const body = {
                user_id: location?.state?.employee_id,
                id: id,
            }
            deleteEmployeeDocumentByIdService(body)
        },
        [employeeDocData, location?.state?.employee_id]
    )

    const totalDocuments = useMemo(() => {
        let count = 0
        employeeDocData?.data?.map((item) => (count += item?.document?.length ?? 0))
        return count
    }, [employeeDocData?.data])

    const documentHeaderTemplate = (options) => {
        return (
            <div className='p-2 b ' onClick={options.onClick}>
                <CustomButton
                    buttonLabel={'Document'}
                    buttonType={BUTTON_TYPE.secondary}
                    // onClick={handleAssignPayroll}
                />
            </div>
        )
    }

    const groupedSequiDocData = useMemo(() => {
        let groupedData = []
        if (sequiDocDocumentData) {
            groupedData = Object.values(
                sequiDocDocumentData?.reduce((acc, item) => {
                    const {categery_id, categories} = item
                    acc[categery_id] = acc[categery_id] || {categery_id, categories, items: []}
                    acc[categery_id]?.items.push(item)
                    return acc
                }, {})
            )
        }

        return groupedData
    }, [sequiDocDocumentData])

    const toggleComponent = (id) => {
        let data = [...componentStates]
        const isExistInData = data.some((item) => item == id)
        if (isExistInData) data = data.filter((item) => item != id)
        else data.push(id)
        setComponentStates(data)
    }

    function downloadDoc(file) {
        const fileName = file?.split('/')?.[1]

        // const filePath = getServerImage(file)
        const filePath = file
        // const filePath = `${BASE_URL}/${file}`
        axios
            .get(filePath, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/pdf',
                },
            })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', fileName) //or any other extension
                document.body.appendChild(link)
                link.click()
            })
            .catch((error) => CustomToast('failed to download'))
        // saveAs(getServerImage(file), fileName)
    }

    const signDocumentStatus = useCallback((item) => {
        if (!item?.is_active) return 'Inactive'
        switch (item?.document_response_status) {
            case 0:
                return 'Not Signed'
            case 1:
                return 'Signed'
            case 2:
                return 'Rejected'
            case 5:
                return 'Expired'
            case 6:
                return 'Request Change'
            default:
                return 'Not Signed'
        }
    }, [])

    return (
        <div>
            <div className='card'>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel
                        // headerTemplate={documentHeaderTemplate}
                        headerClassName='text-cmGrey700'
                        header='Document'
                        headerStyle={{fontFamily: fontsFamily.manrope}}
                    >
                        <div className='mb-10 ' style={{borderRadius: '10px'}}>
                            <div
                                className='mx-10 p-5 d-flex justify-content-between align-items-center'
                                style={{fontWeight: 600, fontFamily: 'Manrope'}}
                            >
                                <div className='d-flex gap-3 align-items-center'>
                                    <div className='text-cmGrey900' style={{fontSize: '14px'}}>
                                        Total Documents:
                                    </div>
                                    <div
                                        className='text-cmGrey900'
                                        style={{fontSize: '16px', fontWeight: 800}}
                                    >
                                        {totalDocuments}
                                    </div>
                                </div>
                            </div>
                            <DocumentTable
                                employeeData={employeeData}
                                onSelectedModal={(val, type) => {
                                    if (type == 'edit') setOpen(true)
                                    setSelectedEmployeecData(val)
                                }}
                                loading={loading}
                                documentData={employeeDocData?.data}
                                deleteDocument={deleteDocument}
                                userId={location?.state?.employee_id}
                                getDocument={getDocument}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel
                        headerClassName='text-cmGrey700'
                        header='Signed Document'
                        headerStyle={{fontFamily: fontsFamily.manrope}}
                    >
                        <div
                            className='table-responsive shadow-sm overflow-auto bg-cmwhite '
                            style={{borderRadius: '10px', position: 'relative'}}
                        >
                            <CustomLoader visible={loading} full />

                            <table className='table'>
                                <thead>
                                    <tr
                                        className='bg-cmGrey300 text-cmGrey900'
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: 700,
                                            fontFamily: fontsFamily.manrope,
                                        }}
                                    >
                                        <th className='w-auto p-5 text-nowrap'>Name</th>
                                        <th className='w-auto p-5 text-nowrap'>Description</th>
                                        <th className='w-auto p-5 text-nowrap'>
                                            Document Send Date
                                        </th>
                                        <th className='w-auto p-5 text-nowrap'>Document</th>
                                        <th className='w-auto p-5 text-nowrap'>Status</th>
                                        <th className='w-auto p-5 text-nowrap'>Comment</th>

                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody className='border-top border-5 border-cmwhite'>
                                    {groupedSequiDocData?.length > 0 ? (
                                        groupedSequiDocData?.map((item, index) => {
                                            return (
                                                <>
                                                    <tr
                                                        className='text-cmGrey900 bg-cmGrey200 '
                                                        style={{
                                                            fontSize: '14px',
                                                            fontWeight: 700,
                                                        }}
                                                        key={item.categery_id}
                                                    >
                                                        <td
                                                            colSpan={9}
                                                            className=' p-5 ps-10 text-nowrap'
                                                        >
                                                            <div className='d-flex align-items-center gap-5'>
                                                                <div style={{fontSize: 16}}>
                                                                    {item?.categories}
                                                                </div>
                                                                <div className='d-flex flex-center gap-2'>
                                                                    <KTSVG
                                                                        path='/media/icons/duotune/art/document-text.svg'
                                                                        className='cursor-pointer'
                                                                        svgClassName='w-15px h-15px'
                                                                    />
                                                                    <span className='text-cmGrey600'>
                                                                        {item?.items?.length}
                                                                    </span>
                                                                </div>

                                                                <div className='mt-1'>
                                                                    <CustomArrow
                                                                        arrowDirection={
                                                                            componentStates?.includes(
                                                                                item?.categery_id
                                                                            )
                                                                                ? ARROW_DIRECTION.down
                                                                                : ARROW_DIRECTION.right
                                                                        }
                                                                        onClick={() =>
                                                                            toggleComponent(
                                                                                item?.categery_id
                                                                            )
                                                                        }
                                                                    />
                                                                    {/* <KTSVG
                                                                        path='/media/icons/duotune/art/corner-arrow-down.svg'
                                                                        className='cursor-pointer'
                                                                        svgClassName='w-25px h-25px'
                                                                        onClick={() =>
                                                                            toggleComponent(
                                                                                item?.categery_id
                                                                            )
                                                                        }
                                                                    /> */}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    {componentStates?.includes(item?.categery_id)
                                                        ? item?.items?.map((category) => (
                                                              <tr
                                                                  key={category?.id}
                                                                  className='text-cmGrey800 stripRow  '
                                                                  style={{
                                                                      fontSize: '14px',
                                                                      fontWeight: 600,
                                                                  }}
                                                              >
                                                                  <td className='p-5 text-nowrap text-cmGrey800 '>
                                                                      {category?.template_name}
                                                                  </td>
                                                                  <td className='p-5  text-cmGrey500'>
                                                                      {category?.description}
                                                                  </td>
                                                                  <td className='p-5 text-nowrap text-cmGrey800'>
                                                                      {getValidDate(
                                                                          category?.document_send_date,
                                                                          'MM/DD/YYYY'
                                                                      )}
                                                                  </td>

                                                                  <td className='p-5 text-nowrap'>
                                                                      {/* {category?.signed_document ? ( */}
                                                                      {category?.signed_status ? (
                                                                          <a
                                                                              href={
                                                                                  category?.signed_document_s3
                                                                              }
                                                                              rel='noreferrer'
                                                                              target='_blank'
                                                                          >
                                                                              <span
                                                                                  className='bg-cmBlue-Crayola rounded-pill text-cmBlue-Crayola bg-opacity-10 p-2 cursor-pointer'
                                                                                  //   onClick={() =>
                                                                                  //       downloadDoc(
                                                                                  //           category?.signed_document_s3
                                                                                  //       )
                                                                                  //   }
                                                                              >
                                                                                  <i className='fa-solid fa-paperclip text-cmBlue-Crayola pe-2'></i>
                                                                                  <span>{1}</span>
                                                                              </span>
                                                                          </a>
                                                                      ) : null}
                                                                      {/* ) : null} */}
                                                                  </td>

                                                                  <td>
                                                                      {signDocumentStatus(category)}
                                                                  </td>
                                                                  <td>
                                                                      {category?.user_request_change_message ? (
                                                                          <CustomTooltip
                                                                              title={
                                                                                  category?.user_request_change_message
                                                                              }
                                                                          >
                                                                              <i
                                                                                  className='bi bi-chat-fill text-warning'
                                                                                  style={{
                                                                                      fontSize: 20,
                                                                                  }}
                                                                              ></i>
                                                                          </CustomTooltip>
                                                                      ) : (
                                                                          'No Comment'
                                                                      )}
                                                                  </td>
                                                              </tr>
                                                          ))
                                                        : null}
                                                </>
                                            )
                                        })
                                    ) : (
                                        <tr key='no-data'>
                                            <td
                                                colSpan={6}
                                                style={{
                                                    textAlign: 'center',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: '500',
                                                    fontSize: 14,
                                                    paddingTop: 20,
                                                    paddingBottom: 20,
                                                }}
                                            >
                                                {onBoardingResMsg ? (
                                                    onBoardingResMsg
                                                ) : (
                                                    <CustomNoData label={'No data found'} />
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                {/* ))} */}
                            </table>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
            {/* <div className='mb-10 bg-cmwhite shadow-sm' style={{borderRadius: '10px'}}>
                <div
                    className='mx-10 p-5 d-flex justify-content-between align-items-center'
                    style={{fontWeight: 600, fontFamily: 'Manrope'}}
                >
                    <div className='d-flex gap-3 align-items-center'>
                        <div className='text-cmGrey900' style={{fontSize: '14px'}}>
                            Total Documents:
                        </div>
                        <div className='text-cmGrey900' style={{fontSize: '16px', fontWeight: 800}}>
                            {totalDocuments}
                        </div>
                    </div>
                </div>
                <DocumentTable
                    employeeData={employeeData}
                    onSelectedModal={(val, type) => {
                        if (type == 'edit') setOpen(true)
                        setSelectedEmployeecData(val)
                    }}
                    loading={loading}
                    documentData={employeeDocData?.data}
                    deleteDocument={deleteDocument}
                    userId={location?.state?.employee_id}
                />
            </div> */}

            {open && (
                <DocumentFormPopup
                    show={open}
                    handleClose={handleClose}
                    employeeDocData={selectedEmployeecData}
                    userId={location?.state?.employee_id}
                />
            )}
        </div>
    )
}

export default DocumentsPage
