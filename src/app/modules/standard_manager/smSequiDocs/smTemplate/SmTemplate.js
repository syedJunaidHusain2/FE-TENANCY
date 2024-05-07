import React, {useCallback, useEffect, useMemo, useState} from 'react'
import CustomNoData from '../../../../../customComponents/customNoData/CustomNoData'
import {AddCate} from '../../../admin/sequidocs/component/templates/AddCate'
import {KTSVG} from '../../../../../_metronic/helpers'
import CustomDialog from '../../../../../customComponents/customDialog/CustomDialog'
import {fontsFamily} from '../../../../../assets/fonts/fonts'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {getSequiDocsTemplateCategoriesAction} from '../../../../../redux/actions/SequiDocsActions'
import {
    deleteTemplateCategoryService,
    getSequiDocsTemplatesService,
    getSmSequiDocDataService,
} from '../../../../../services/Services'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {getSequiDocsTemplateCategoriesSelector} from '../../../../../redux/selectors/SequiDocsSelectors'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomButton from '../../../../../customComponents/customButtton/CustomButton'
import TestEmailModal from '../../../admin/sequidocs/component/templates/components/offerLettersComponent/TestEmailModal'
import {getValidDate} from '../../../../../constants/constants'
import PreviewOfferLetterModal from '../../../admin/sequidocs/component/templates/components/stepModals/PreviewOfferLetterModal'
import CustomArrow, {ARROW_DIRECTION} from '../../../../../customComponents/customIcons/CustomIcons'

const SmTemplate = () => {
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [searchText, setSearchText] = useState('')
    const categoriesList = useSelector(getSequiDocsTemplateCategoriesSelector)
    const [showCateModal, setshowCateModal] = useState(false)
    const [categorydata, setCategorydata] = useState('')
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [templatesData, setTemplatesData] = useState([])
    const [allTemplates, setAllTemplates] = useState([])
    const [testEmailModal, setTestEmailModal] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState(null)

    useEffect(() => {
        getSequiDocsOtherTemplate()
    }, [])
    useEffect(() => {
        dispatch(getSequiDocsTemplateCategoriesAction())
    }, [])

    const HandleTestModal = (item) => {
        setSelectedTemplate(item)

        setTestEmailModal(!testEmailModal)
    }

    const navigate = useNavigate()
    const [componentStates, setComponentStates] = useState([])
    const [openRow, setOpenRow] = useState(false)

    const toggleComponent = (id) => {
        setOpenRow(!openRow)
        let data = [...componentStates]
        const isExistInData = data.some((item) => item == id)
        if (isExistInData) data = data.filter((item) => item != id)
        else data.push(id)
        setComponentStates(data)
    }

    const getSequiDocsOtherTemplate = useCallback(() => {
        setLoading(true)
        getSmSequiDocDataService()
            .then((res) => {
                setTemplatesData(res?.data)
                setAllTemplates(res?.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const categoriesDropDownList = useMemo(() => {
        const newCategory = {id: '0', categories: 'All Categories'}
        const updatedCategoriesList = categoriesList
            ?.filter((item) => ![3]?.includes(item?.id))
            ?.map((category) => category)
        updatedCategoriesList?.unshift(newCategory)
        return updatedCategoriesList
    }, [categoriesList])

    const handleDropDown = (selectedCategory) => {
        setSelectedCategory(selectedCategory)
        if (selectedCategory == 0) return getSequiDocsOtherTemplate()
        const filteredData = allTemplates.filter((item) => item?.id == selectedCategory)
        setTemplatesData(filteredData)
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
            })
            .finally(() => CustomToast.success('Category deleted successfully'))
    }

    const recipientList = (data) => {
        let receipientArr = []
        receipientArr = data?.receipients?.map((item) => item?.position_name)?.join(',')

        return `${receipientArr?.length > 0 ? receipientArr : '-'}`
    }

    const handleSearchChange = (e) => {
        setSelectedCategory(0)
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

    const handleSendTemplate = () => {
        navigate('send-letter')
    }

    const handlePreview = (item) => {
        setSelectedTemplate(item)

        setOpenPreview(!openPreview)
    }
    return (
        <div
            className='bg-cmwhite card'
            style={{
                fontSize: 14,
                fontFamily: fontsFamily.manrope,
                borderRadius: '0 10px 10px 10px',
                boxShadow:
                    'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            }}
        >
            <div className='d-flex flex-wrap gap-5 p-5 align-items-center justify-content-between'>
                <div>
                    <CustomInput
                        type={INPUT_TYPE.search}
                        value={searchText}
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
                    <CustomButton
                        buttonLabel='Send Letter to Employees'
                        onClick={handleSendTemplate}
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
                            <th className='p-5  w-150px'>Name</th>
                            <th className='p-5  w-300px '>Description</th>
                            <th className='p-5  w-250px'>Recipient positions</th>
                            <th className='p-5  w-175px'>Updated at</th>
                            <th className='p-5  w-150px text-center'>Actions</th>
                        </tr>
                    </thead>

                    <tbody className='border-top border-5 border-cmwhite'>
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
                                            <td colSpan={5} className=' p-5 ps-10 '>
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
                                                                svgClassName='px h-25px'
                                                                onClick={() =>
                                                                    toggleComponent(item?.id)
                                                                }
                                                            /> */}
                                                            <CustomArrow
                                                                arrowDirection={
                                                                    openRow
                                                                        ? ARROW_DIRECTION.up
                                                                        : ARROW_DIRECTION.down
                                                                }
                                                                onClick={() =>
                                                                    toggleComponent(item?.id)
                                                                }
                                                            />
                                                        </div>
                                                    ) : null}
                                                    {/* <div onClick={() => handleAddCate(item)}>
                                                        <KTSVG
                                                            path='/media/icons/duotune/art/editIconDark-2.svg'
                                                            className='cursor-pointer'
                                                            svgClassName='w-20px h-20px'
                                                        />
                                                    </div> */}
                                                    {/* <div
                                                        onClick={() => {
                                                            CustomDialog.warn(
                                                                'Are you sure you want to delete ?',
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
                                                    </div> */}
                                                    {/* <div
                                                        className='d-flex flex-center gap-2 text-cmBlue-Crayola cursor-pointer'
                                                        onClick={() =>
                                                            navigate('add-template', {
                                                                state: {categoryId: item?.id},
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
                                                    </div> */}
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
                                                          className='p-5  text-decoration-underline text-cmGrey800 cursor-pointer'
                                                          onClick={() => handlePreview(category)}
                                                      >
                                                          {category?.template_name}
                                                      </td>
                                                      <td className='p-5  text-cmGrey500'>
                                                          {category?.template_description}
                                                      </td>
                                                      <td className='p-5  text-cmGrey800'>
                                                          {recipientList(category)}
                                                      </td>

                                                      <td className='p-5 '>
                                                          {/* 02/06/20, 14:30 */}
                                                          {getValidDate(
                                                              category?.updated_at,
                                                              'MM/DD/YYYY , HH:MM'
                                                          ) ?? '-'}
                                                      </td>
                                                      <td
                                                          className='p-5 d-flex flex-center gap-5 text-cmBlue-Crayola'
                                                          style={{fontSize: 14, fontWeight: 500}}
                                                      >
                                                          <div
                                                              className='d-flex flex-center gap-1 w-70px py-1 bg-cmBlue-Crayola bg-opacity-10 rounded cursor-pointer'
                                                              onClick={() =>
                                                                  navigate('send-letter', {
                                                                      state: {
                                                                          categoryId:
                                                                              category?.categery_id,
                                                                          use: true,
                                                                          templateId: category?.id,
                                                                      },
                                                                  })
                                                              }
                                                          >
                                                              <KTSVG
                                                                  path='/media/icons/duotune/art/mouse-circle-blue.svg'
                                                                  className='cursor-pointer'
                                                                  svgClassName='w-15px h-15px'
                                                              />
                                                              <div>Use</div>
                                                          </div>

                                                          <div
                                                              className='d-flex flex-center gap-1 w-70px py-1 bg-cmBlue-Crayola bg-opacity-10 rounded cursor-pointer'
                                                              onClick={() =>
                                                                  HandleTestModal(category)
                                                              }
                                                          >
                                                              <KTSVG
                                                                  path='/media/icons/duotune/art/story-blue.svg'
                                                                  svgClassName='w-15px h-15px'
                                                              />
                                                              <div>Test</div>
                                                          </div>
                                                      </td>
                                                      {/* <td></td> */}
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
            {openPreview ? (
                <PreviewOfferLetterModal
                    show={openPreview}
                    handleClose={handlePreview}
                    templateHtmlContent={selectedTemplate?.template_content}
                    templateName={selectedTemplate?.template_name}
                />
            ) : null}
            {testEmailModal ? (
                <TestEmailModal
                    show={testEmailModal}
                    handleClose={HandleTestModal}
                    templateData={selectedTemplate}
                />
            ) : null}
        </div>
    )
}

export default SmTemplate
