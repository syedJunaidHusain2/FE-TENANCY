import React, {useState, useRef} from 'react'
import {TemplateCardMenu} from './TemplateCardMenu'
import {Dropdown1} from '../../../../../../_metronic/partials'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {TieredMenu} from 'primereact/tieredmenu'
import {UseModal} from './UseModal'
import {GenerateLetter} from './GenerateLetter'
import {useNavigate} from 'react-router-dom'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import {
    deleteSequiDocsTemplateService,
    deleteTemplateCategoryService,
} from '../../../../../../services/Services'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import CustomArrow, {
    ARROW_DIRECTION,
} from '../../../../../../customComponents/customIcons/CustomIcons'
import CustomEditIcon from '../../../../../../customComponents/customIcons/CustomEditIcon'
import CustomDelete from '../../../../../../customComponents/customIcons/CustomDelete'
import {AddCate} from './AddCate'

const TemplatesCard = ({
    templatesData,
    loading,
    onSelectedTemplate = () => {},
    selectedTemplate,
    getTemplate,
}) => {
    const Navigate = useNavigate()
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [toggleIndex, setToggleIndex] = useState(null)
    const [showMennu, setShowMennu] = useState(false)
    const [showAssignModal, setShowAssignModal] = useState(false)
    const [showGenerateLetterModal, setShowGenerateLetterModal] = useState(false)
    const [showCateModal, setshowCateModal] = useState(false)
    const [categorydata, setCategorydata] = useState('')
    const menu = useRef(null)
    const handleAddCate = (data) => {
        setCategorydata(data)
        setshowCateModal(!showCateModal)
        // dispatch(getSequiDocsTemplateCategoriesAction())
    }

    const items = [
        {
            label: 'Use',
            command: () => setShowGenerateLetterModal(true),
        },
        {
            label: 'Assign',
            command: (e) => setShowAssignModal(true),
        },
        {
            label: 'Edit',
            command: (e) => onSelectedTemplate(selectedTemplate, 'edit'),
        },
        {
            label: 'Delete',
            command: (e) => onDeleteTemplate(),
        },
    ]

    const onDeleteTemplate = () => {
        CustomDialog.warn('Are you sure you want to delete ?', () => {
            deleteSequiDocsTemplateService(selectedTemplate?.id)
                .then(() => {
                    getTemplate()
                })
                .finally(() => CustomToast.success('Template deleted successfully'))
        })
    }
    const handleDeletePopUp = () => {
        setDeletePopUp(!deletePopUp)
    }
    const toggleDropdown = (index) => {
        setToggleIndex(toggleIndex == index ? null : index)
    }

    const handleMennu = () => {
        setShowMennu(!showMennu)
    }
    const deleteCategory = (item) => {
        deleteTemplateCategoryService(item?.id)
            .then(() => {
                getTemplate()
            })
            .finally(() => CustomToast.success('Category deleted successfully'))
    }
    return (
        <div
            style={{
                fontSize: '14px',
                fontFamily: 'Manrope',
                position: 'relative',
                borderRadius: 10,
            }}
            className='card bg-white h-auto'
        >
            <CustomLoader visible={loading} full />

            {templatesData?.map((item, index) => (
                <div key={index} className='stripRow' style={{borderRadius: 10}}>
                    <div className='p-5 px-10 d-flex justify-content-between align-items-center'>
                        <div className='d-flex flex-wrap gap-5 align-items-center'>
                            <div
                                className='text-cmGrey900 '
                                style={{fontFamily: 'Manrope', fontSize: '17px', fontWeight: '600'}}
                            >
                                {item?.categories}
                            </div>
                            <div className='text-cmGrey600' style={{}}>
                                <span className='bi bi-file-earmark-text'></span>
                                <span className='ms-2'>{item?.template_categories?.length}</span>
                            </div>

                            <CustomArrow
                                arrowDirection={
                                    toggleIndex == index
                                        ? ARROW_DIRECTION.down
                                        : ARROW_DIRECTION.right
                                }
                                onClick={() => toggleDropdown(index)}
                            />
                        </div>
                        <div className='d-flex gap-3 align-items-center'>
                            <div>
                                <CustomEditIcon onClick={() => handleAddCate(item)} />
                            </div>

                            <div>
                                <CustomDelete
                                    onClick={() => {
                                        CustomDialog.warn(
                                            'Are you sure you want to delete ?',
                                            () => {
                                                deleteCategory(item)
                                            }
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* body */}
                    {toggleIndex == index && (
                        <div className='overflow-auto table-responsive'>
                            <table
                                className='table w-100'
                                style={{fontSize: '14px', fontFamily: 'Manrope'}}
                            >
                                {item?.template_categories?.length > 0 ? (
                                    <tbody>
                                        {item?.template_categories?.map((category) => (
                                            <tr className='stripRow' key={category?.id}>
                                                <th
                                                    className='text-cmGrey800 text-decoration-underline cursor-pointer text-nowrap p-2 px-10'
                                                    style={{fontWeight: '600'}}
                                                    onClick={() => {
                                                        onSelectedTemplate(category, 'edit')
                                                    }}
                                                >
                                                    {category?.template_name}
                                                </th>
                                                <th
                                                    className='text-center text-cmGrey500 text-nowrap p-2 px-10'
                                                    style={{fontWeight: '600'}}
                                                >
                                                    {category?.template_comment}
                                                </th>
                                                <th className='d-flex align-items-center justify-content-end gap-2 text-nowrap p-2 px-10'>
                                                    <div
                                                        className='text-cmBlue-Crayola text-decoration-underline cursor-pointer'
                                                        style={{fontWeight: '600'}}
                                                        onClick={() =>
                                                            Navigate('history', {
                                                                state: {
                                                                    id: category?.id,
                                                                    name: category?.template_name,
                                                                    template_comment:
                                                                        category?.template_comment,
                                                                },
                                                            })
                                                        }
                                                    >
                                                        History
                                                    </div>
                                                    {/* 1 */}
                                                    {/* <div className=''>
                        <div
                          className='bi bi-three-dots-vertical fs-2 text-cmGrey500 cursor-pointer'
                          // data-kt-menu-trigger='click'
                          // data-kt-menu-placement='bottom-end'
                          // data-kt-menu-flip='top-end'
                          onClick={handleMennu}
                        ></div>

                        {showMennu && (
                          <div style={{position: 'absolute', zIndex: 999}}>
                            <TemplateCardMenu />
                          </div>
                        )}
                      </div> */}
                                                    {/* 1 */}
                                                    <div className=' flex justify-content-center'>
                                                        <TieredMenu
                                                            className='bg-cmwhite text-center'
                                                            style={{borderRadius: '10px'}}
                                                            model={items}
                                                            popup
                                                            ref={menu}
                                                            breakpoint='767px'
                                                        />
                                                        <div
                                                            className='bi bi-three-dots-vertical fs-2 text-cmGrey500 cursor-pointer'
                                                            onClick={(e) => {
                                                                onSelectedTemplate(category)
                                                                menu.current.toggle(e)
                                                            }}
                                                        ></div>
                                                    </div>
                                                </th>
                                            </tr>
                                        ))}
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr className='text-center my-5'>
                                            <td> No tempates found</td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                            {showAssignModal && (
                                <UseModal
                                    selectedTemplate={selectedTemplate}
                                    show={showAssignModal}
                                    handleClose={() => setShowAssignModal(false)}
                                    handleUse={(item) => {
                                        onSelectedTemplate(item, 'edit')
                                        setShowAssignModal(false)
                                    }}
                                />
                            )}
                            {showGenerateLetterModal && (
                                <GenerateLetter
                                    selectedTemplate={selectedTemplate}
                                    show={showGenerateLetterModal}
                                    handleClose={() => setShowGenerateLetterModal(false)}
                                />
                            )}
                        </div>
                    )}
                </div>
            ))}
            {showCateModal ? (
                <AddCate
                    showModal={showCateModal}
                    handleClose={handleAddCate}
                    categorydata={categorydata}
                    template={getTemplate}
                />
            ) : null}
        </div>
    )
}

export default TemplatesCard
