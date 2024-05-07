import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {getSequiDocsTemplateCategoriesSelector} from '../../../../../../redux/selectors/SequiDocsSelectors'
import {getSequiDocsTemplateCategoriesAction} from '../../../../../../redux/actions/SequiDocsActions'
import {useDispatch, useSelector} from 'react-redux'
import {AddCate} from './AddCate'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import {
    deleteSequiDocsParticularTemplateService,
    deleteTemplateCategoryService,
    getSequiDocsTemplatesService,
} from '../../../../../../services/Services'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {useNavigate} from 'react-router-dom'
import CustomNoData from '../../../../../../customComponents/customNoData/CustomNoData'
import {
    TABLE_BORDER,
    getErrorMessageFromResponse,
    getGlobalSearchData,
} from '../../../../../../helpers/CommonHelpers'
import debounce from 'lodash.debounce'
import TestEmailModal from './components/offerLettersComponent/TestEmailModal'
import PreviewOfferLetterModal from './components/stepModals/PreviewOfferLetterModal'
import CustomLink from '../../../../../../customComponents/customButtton/CustomLink'
import CustomArrow, {
    ARROW_DIRECTION,
} from '../../../../../../customComponents/customIcons/CustomIcons'
import {getPositionsSelector} from '../../../../../../redux/selectors/SettingsSelectors'

const OtherTemplatesTable = ({
    searchSequiDocsTemplate,
    templatesOtherData,
    getSequiDocsOtherTemplate,
    loading,
    setLoading,
}) => {
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [selectedRecepient, setSelectedReceipient] = useState(1)
    const [searchText, setSearchText] = useState(null)
    const categoriesList = useSelector(getSequiDocsTemplateCategoriesSelector)
    const positonList = useSelector(getPositionsSelector)
    const [showCateModal, setshowCateModal] = useState(false)
    const [categorydata, setCategorydata] = useState('')
    const dispatch = useDispatch()
    const [templatesData, setTemplatesData] = useState(templatesOtherData)
    const [allTemplates, setAllTemplates] = useState(templatesOtherData)
    const [openTestEmailModal, setOpenTestEmailModal] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [openPreviewModal, setOpenPreviewModal] = useState(false)
    const handlePreviewModal = (item) => {
        setSelectedTemplate(item)
        setOpenPreviewModal(!openPreviewModal)
    }

    const navigate = useNavigate()
    const [componentStates, setComponentStates] = useState([])

    const toggleComponent = (id) => {
        let data = [...componentStates]
        const isExistInData = data.some((item) => item == id)
        if (isExistInData) data = data.filter((item) => item != id)
        else data.push(id)
        setComponentStates(data)
    }

    useEffect(() => {
        setTemplatesData(templatesOtherData ?? [])
        setAllTemplates(templatesOtherData ?? [])
        // getSequiDocsOtherTemplate()
        // if (selectedCategory || searchText) {
        //     if (selectedCategory) {
        //         const filteredData = allTemplates.filter((item) => item?.id == selectedCategory)
        //         setTemplatesData(filteredData)
        //     } else if (searchText) {
        //         searchSequiDocsTemplate(searchText)
        //     }
        // } else {
        //     getTemplate()
        // }
    }, [templatesOtherData])

    // const getSequiDocsOtherTemplate = useCallback(() => {
    //     // setLoading(true)
    //     getSequiDocsTemplatesService()
    //         .then((res) => {
    //             // setTemplatesData(res?.data)
    //             setAllTemplates(res?.data)
    //         })
    //         .finally(() => {
    //             setLoading(false)
    //         })
    // }, [])

    const categoriesDropDownList = useMemo(() => {
        const newCategory = {id: '0', categories: 'All Categories'}
        const filterCategoryList = categoriesList
            ?.filter((item) => ![1, 2, 3]?.includes(item?.id))
            ?.map((category) => category)
        filterCategoryList?.unshift(newCategory)
        return filterCategoryList
    }, [categoriesList])

    const receipientDropDownList = useMemo(() => {
        const newCategory = {id: 'all', position: 'All Receipients'}
        const filterCategoryList = positonList
            ?.filter((item) => ![7]?.includes(item?.id))
            ?.map((category) => category)
        filterCategoryList?.unshift(newCategory)
        return filterCategoryList
    }, [positonList])

    const handleDropDown = (selectedCategory) => {
        setComponentStates([])
        setSelectedCategory(selectedCategory)
        if (selectedCategory == 0) return getSequiDocsOtherTemplate()
        const filteredData = allTemplates.filter((item) => item?.id == selectedCategory)
        setTemplatesData(filteredData)
        if (searchText) setSearchText('')
    }
    const handleReceipientDropDown = (selectedRecepient) => {
        setComponentStates([])
        setSelectedReceipient(selectedRecepient)
        if (selectedRecepient == 'all') return getSequiDocsOtherTemplate()
        const data = allTemplates?.filter((item) => {
            const data = item?.sequi_docs_template?.find((sItem) =>
                sItem?.receipient?.find((rItem) => rItem?.position_id == selectedRecepient)
            )
            return data
        })
        setTemplatesData(data)
        if (searchText) setSearchText('')
    }

    const handleAddCate = (data) => {
        setshowCateModal(!showCateModal)
        dispatch(getSequiDocsTemplateCategoriesAction())
        setCategorydata(data)
    }
    const deleteCategory = (item) => {
        deleteTemplateCategoryService(item?.id)
            .then(() => {
                getSequiDocsOtherTemplate()
                CustomToast.success('Category deleted successfully')
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }

    const deleteTemplate = (id) => {
        const body = {
            template_id: id,
        }
        CustomDialog.warn('Are you sure you want to delete ?', () => {
            deleteSequiDocsParticularTemplateService(body)
                .then((res) => {
                    getSequiDocsOtherTemplate()
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => setLoading(false))
        })
    }

    const handleSearchChange = (e) => {
        setSelectedCategory(0)
        setSelectedReceipient(1)
        setSearchText(e.target.value)
        if (e.target.value) {
            const filtered = allTemplates?.filter((item) => {
                return item?.sequi_docs_template?.some((doc) =>
                    doc?.template_name
                        ?.toLowerCase()
                        ?.match(e.target.value?.toLowerCase()?.toString())
                )
            })
            setTemplatesData(filtered)
        } else {
            setTemplatesData(allTemplates)
        }
    }

    const handleTestEmailModal = (item) => {
        setSelectedTemplate(item)
        setOpenTestEmailModal(!openTestEmailModal)
    }

    const recipientList = (data) => {
        let receipientArr = []
        receipientArr = data?.receipient
            ?.map((item) => item?.position_detail?.position_name)
            ?.join(',')

        return `${receipientArr?.length > 0 ? receipientArr : '-'}`
    }
    return (
        <div
            className='bg-cmwhite shadow-sm'
            style={{fontSize: 14, fontFamily: fontsFamily.manrope, borderRadius: 10}}
        >
            <div className='d-flex flex-wrap gap-5 p-5 align-items-center justify-content-between'>
                <div>
                    <CustomInput
                        type={INPUT_TYPE.search}
                        value={searchText ?? ''}
                        // onChange={(e) => {
                        //     if (selectedCategory) setSelectedCategory('')
                        //     setSearchText(e?.target?.value)
                        // }}
                        onChange={handleSearchChange}
                        name='search'
                        placeholder='Search Template'
                    />
                </div>
                <div>
                    <CustomDropdown
                        searching={false}
                        options={categoriesDropDownList}
                        displayKey='categories'
                        valueKey='id'
                        value={selectedCategory}
                        onChange={(e) => handleDropDown(e.target.value)}
                        placeholder='Select Categories'
                        showClear={false}
                    />
                </div>
                <div>
                    <CustomDropdown
                        searching={false}
                        options={receipientDropDownList}
                        displayKey='position'
                        valueKey='id'
                        value={selectedRecepient}
                        onChange={(e) => handleReceipientDropDown(e.target.value)}
                        placeholder='Select Receipient'
                        showClear={false}
                    />
                </div>
                <div>
                    <CustomButton
                        buttonLabel='New Category'
                        onClick={handleAddCate}
                        buttonSize={BUTTON_SIZE.small}
                    />
                </div>
            </div>
            {/* table starts */}

            <div
                className='table-responsive shadow-sm overflow-auto bg-cmwhite'
                style={{position: 'relative'}}
            >
                <CustomLoader visible={loading} full />

                <table className='table' style={{tableLayout: 'fixed', width: '100%'}}>
                    <thead>
                        <tr
                            className='bg-cmGrey300 text-cmGrey800'
                            style={{
                                fontSize: '14px',
                                fontWeight: 800,
                                fontFamily: fontsFamily.manrope,
                            }}
                        >
                            {/* <th></th> */}
                            <th className='p-5 w-150px'>Name</th>
                            <th className='p-5  w-250px'>Description</th>
                            <th className='p-5 w-250px '>Recipient positions</th>
                            <th className='p-5 w-100px '>Status</th>
                            <th className='p-5 w-120px'>Actions</th>
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    {/* {templatesData?.map((item, index) => ( */}
                    <tbody className={`border-top border-5 border-cmwhite`}>
                        {templatesData?.length > 0 ? (
                            templatesData?.map((item, index) => {
                                return (
                                    <>
                                        <tr
                                            className='text-cmGrey900 bg-cmGrey200 '
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: 700,
                                            }}
                                            key={item.id}
                                        >
                                            <td colSpan={5} className=' p-5 text-nowrap'>
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
                                                            {item?.sequi_docs_template?.length}
                                                        </span>
                                                    </div>

                                                    {item?.sequi_docs_template?.length ? (
                                                        <div>
                                                            {/* <KTSVG
                                                                path='/media/icons/duotune/art/corner-arrow-down.svg'
                                                                className='cursor-pointer'
                                                                svgClassName='w-25px h-25px'
                                                                onClick={() =>
                                                                    toggleComponent(item?.id)
                                                                }
                                                            /> */}
                                                            <CustomArrow
                                                                arrowDirection={
                                                                    componentStates?.includes(
                                                                        item?.id
                                                                    )
                                                                        ? ARROW_DIRECTION.up
                                                                        : ARROW_DIRECTION.down
                                                                }
                                                                onClick={() =>
                                                                    toggleComponent(item?.id)
                                                                }
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <div onClick={() => handleAddCate(item)}>
                                                        <KTSVG
                                                            path='/media/icons/duotune/art/editIconDark-2.svg'
                                                            className='cursor-pointer'
                                                            svgClassName='w-20px h-20px'
                                                        />
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            CustomDialog.warn(
                                                                'Are you sure you want to delete?',
                                                                () => {
                                                                    deleteCategory(item)
                                                                }
                                                            )
                                                        }}
                                                    >
                                                        <KTSVG
                                                            path='/media/icons/duotune/art/trash.svg'
                                                            className='cursor-pointer'
                                                            svgClassName='w-20px h-20px'
                                                        />
                                                    </div>
                                                    <div
                                                        className='d-flex flex-center gap-2 text-cmBlue-Crayola cursor-pointer'
                                                        onClick={() =>
                                                            navigate('add-template', {
                                                                state: {
                                                                    categoryId: item?.id,
                                                                    heading: item?.categories,
                                                                },
                                                            })
                                                        }
                                                    >
                                                        <span className='pi pi-plus-circle fs-2' />
                                                        <span
                                                            className=''
                                                            style={{fontWeight: 600, fontSize: 14}}
                                                        >
                                                            Add Template
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        {componentStates?.includes(item?.id)
                                            ? item?.sequi_docs_template?.map((category) => (
                                                  <tr
                                                      key={category?.id}
                                                      className='text-cmGrey800 stripRow  '
                                                      style={{
                                                          fontSize: '14px',
                                                          fontWeight: 600,
                                                      }}
                                                  >
                                                      {/* <td></td> */}
                                                      <td
                                                          className={`p-5 text-cmGrey800 ${
                                                              category?.completed_step == 3
                                                                  ? 'text-decoration-underline cursor-pointer'
                                                                  : ''
                                                          }`}
                                                          onClick={() =>
                                                              category?.completed_step == 3
                                                                  ? handlePreviewModal(category)
                                                                  : null
                                                          }
                                                      >
                                                          {category?.template_name}
                                                      </td>
                                                      <td className='p-5 text-cmGrey500'>
                                                          {category?.template_description}
                                                      </td>
                                                      <td className='p-5  text-cmGrey800'>
                                                          {recipientList(category)}
                                                      </td>
                                                      <td className='p-5 text-nowrap'>
                                                          {/* {isReady ? ( */}
                                                          {category?.completed_step == 3 ? (
                                                              <div className='d-flex gap-2 align-items-center text-cmSuccess'>
                                                                  <div className='bi bi-check-circle fs-5' />
                                                                  <div>Ready!</div>
                                                              </div>
                                                          ) : (
                                                              <div className='text-cmGrey600'>
                                                                  Draft
                                                              </div>
                                                          )}
                                                          {/* ) : (
                                                    'In Progress'
                                                )} */}
                                                          {/* <div className='d-flex flex-center'>
                                                              <div className='' />
                                                          </div> */}
                                                      </td>
                                                      <td className='p-5 '>
                                                          <div className='d-flex align-items-center gap-5'>
                                                              <CustomLink
                                                                  label={'History'}
                                                                  onClick={() =>
                                                                      navigate('history', {
                                                                          state: {
                                                                              id: category?.id,
                                                                              name: null
                                                                                  ?.template_name,
                                                                              template_comment: null
                                                                                  ?.template_comment,
                                                                          },
                                                                      })
                                                                  }
                                                              />

                                                              {/* ) : null} */}
                                                              <div className=''>
                                                                  <span
                                                                      className='bi bi-three-dots-vertical fs-2 text-cmGrey500 cursor-pointer text-hover-dark'
                                                                      data-bs-toggle='dropdown'
                                                                      aria-expanded='false'
                                                                      style={{width: 'fit-content'}}
                                                                  />
                                                                  <ul
                                                                      className='dropdown-menu'
                                                                      style={{fontSize: 14}}
                                                                  >
                                                                      <li
                                                                          className='dropdown-item d-flex align-items-center gap-3 cursor-pointer text-cmGrey800'
                                                                          style={{fontWeight: 500}}
                                                                          onClick={() =>
                                                                              navigate(
                                                                                  'add-template',
                                                                                  {
                                                                                      state: {
                                                                                          templateId:
                                                                                              category?.id,
                                                                                          heading:
                                                                                              category?.template_name,
                                                                                      },
                                                                                  }
                                                                              )
                                                                          }
                                                                      >
                                                                          {' '}
                                                                          <KTSVG
                                                                              path='/media/icons/duotune/art/EditIcon2.svg'
                                                                              svgClassName='h-15px w-15px cursor-pointer'
                                                                          />
                                                                          <div>Edit</div>
                                                                      </li>
                                                                      <hr className='my-2 text-cmGrey300' />

                                                                      {category?.completed_step ==
                                                                      3 ? (
                                                                          <>
                                                                              <li
                                                                                  className='dropdown-item d-flex align-items-center gap-3 cursor-pointer text-cmGrey800'
                                                                                  style={{
                                                                                      fontWeight: 500,
                                                                                  }}
                                                                                  onClick={() =>
                                                                                      navigate(
                                                                                          'send-letter',
                                                                                          {
                                                                                              state: {
                                                                                                  categoryId:
                                                                                                      category?.categery_id,
                                                                                                  use: true,
                                                                                                  templateId:
                                                                                                      category?.id,
                                                                                              },
                                                                                          }
                                                                                      )
                                                                                  }
                                                                              >
                                                                                  <KTSVG
                                                                                      path='/media/icons/duotune/art/mouse-circle.svg'
                                                                                      svgClassName='h-15px w-15px cursor-pointer'
                                                                                  />
                                                                                  <div>Use </div>
                                                                              </li>
                                                                              <hr className='my-2 text-cmGrey300' />
                                                                          </>
                                                                      ) : null}

                                                                      {category?.completed_step ==
                                                                      3 ? (
                                                                          <li
                                                                              className='dropdown-item d-flex align-items-center gap-3 cursor-pointer text-cmGrey800'
                                                                              style={{
                                                                                  fontWeight: 500,
                                                                              }}
                                                                              onClick={() =>
                                                                                  handleTestEmailModal(
                                                                                      category
                                                                                  )
                                                                              }
                                                                          >
                                                                              {' '}
                                                                              <KTSVG
                                                                                  path='/media/icons/duotune/art/story.svg'
                                                                                  svgClassName='h-15px w-15px cursor-pointer'
                                                                              />
                                                                              <div>Test </div>
                                                                          </li>
                                                                      ) : null}
                                                                      <hr className='my-2 text-cmGrey300' />

                                                                      {/* {isReady ? (
                                                            <>
                                                                <li
                                                                    className='dropdown-item d-flex align-items-center gap-3 cursor-pointer text-cmGrey800'
                                                                    style={{fontWeight: 500}}
                                                                >
                                                                    <KTSVG
                                                                        path='/media/icons/duotune/art/mouse-circle.svg'
                                                                        svgClassName='h-15px w-15px cursor-pointer'
                                                                    />
                                                                    <div>Use </div>
                                                                </li>
                                                                <hr className='my-2 text-cmGrey300' />
                                                            </>
                                                        ) : null} */}

                                                                      <li
                                                                          className='dropdown-item d-flex align-items-center gap-3 cursor-pointer text-cmError'
                                                                          style={{fontWeight: 500}}
                                                                          onClick={() =>
                                                                              deleteTemplate(
                                                                                  category?.id
                                                                              )
                                                                          }
                                                                      >
                                                                          <KTSVG
                                                                              path='/media/icons/duotune/art/close-circle.svg'
                                                                              svgClassName='h-15px w-15px cursor-pointer'
                                                                          />
                                                                          <div>Delete </div>
                                                                      </li>
                                                                  </ul>
                                                              </div>
                                                          </div>{' '}
                                                      </td>
                                                      {/* <td
                                                          className='p-5'
                                                          style={{
                                                              fontWeight: 700,
                                                              width: 'fit-content',
                                                          }}
                                                      >
                                                          {' '}
                                                      </td> */}
                                                  </tr>
                                              ))
                                            : null}
                                    </>
                                )
                            })
                        ) : (
                            <tr key='no-data'>
                                <td
                                    colSpan={5}
                                    style={{
                                        textAlign: 'center',
                                        fontFamily: 'Manrope',
                                        fontWeight: '500',
                                        fontSize: 14,
                                        paddingTop: 20,
                                        paddingBottom: 20,
                                    }}
                                >
                                    <CustomNoData label={'No data found'} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                    {/* ))} */}
                </table>
            </div>

            {showCateModal && (
                <AddCate
                    showModal={showCateModal}
                    handleClose={handleAddCate}
                    categorydata={categorydata}
                    template={getSequiDocsOtherTemplate}
                />
            )}
            {openTestEmailModal ? (
                <TestEmailModal
                    show={openTestEmailModal}
                    handleClose={handleTestEmailModal}
                    templateData={selectedTemplate}
                />
            ) : null}
            {openPreviewModal ? (
                <PreviewOfferLetterModal
                    show={openPreviewModal}
                    handleClose={handlePreviewModal}
                    templateHtmlContent={selectedTemplate?.template_content}
                    templateName={selectedTemplate?.template_name}
                />
            ) : null}
        </div>
    )
}

export default OtherTemplatesTable
