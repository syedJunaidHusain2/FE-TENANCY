import {useState} from 'react'
import {createPortal} from 'react-dom'
import {
    addTemplateCategoryService,
    updateTemplateCategoryService,
} from '../../../../../../services/Services'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomInput from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'

const modalsRoot = document.getElementById('root-modals') || document.body

const AddCate = ({showModal, handleClose, categorydata, template}) => {
    const [error, setError] = useState('')
    const [category, setCategory] = useState(categorydata?.categories ?? '')
    const [loading, setLoading] = useState(false)

    const addCategory = () => {
        const body = {
            categories: category,
        }

        if (!body.categories) return setError('Enter Category')
        setLoading(true)
        if (!categorydata?.id) {
            addTemplateCategoryService(body)
                .then(() => {
                    handleClose()
                    template()
                    CustomToast.success('Category added successfully')
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            updateTemplateCategoryService(categorydata?.id, body)
                .then(() => {
                    handleClose()
                    template()
                    CustomToast.success('Category updated successfully')
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }
    // <Modal
    //     id='kt_modal_create_app'
    //     tabIndex={-1}
    //     aria-hidden='true'
    //     dialogClassName='modal-dialog modal-dialog-centered mw-sm-500px'
    //     show={show}
    //     onHide={handleClose}
    //     backdrop={true}
    // >

    return createPortal(
        <CustomModal
            id='kt_modal_create_app'
            show={showModal}
            onHide={handleClose}
            title={categorydata.categories ? 'Edit category' : 'Add new category'}
        >
            <CustomLoader visible={loading} full />

            <div className=''>
                <div className='py-10 px-2 w-sm-75 mx-auto text-center'>
                    <div className='mb-10'>
                        <CustomInput
                            errorMessage={error}
                            placeholder={
                                categorydata.categories ? 'Edit Category' : 'Enter Category'
                            }
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />
                    </div>

                    <div
                        className='btn bg-cmBlue-Crayola text-cmwhite px-10 py-2'
                        onClick={addCategory}
                    >
                        {categorydata?.id ? 'Save' : 'Add'}
                    </div>
                </div>
            </div>
        </CustomModal>,
        modalsRoot
    )
}

export {AddCate}
