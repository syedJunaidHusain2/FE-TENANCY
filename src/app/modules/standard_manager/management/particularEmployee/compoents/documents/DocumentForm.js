import React from 'react'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'

const DocumentForm = () => {
    return (
        <div className='card shadow-sm' style={{fontSize: '14px', fontFamily: 'Manrope'}}>
            <div className='mx-sm-auto mt-15 mb-20 w-sm-400px mx-5'>
                <form action=''>
                    <div className='mb-15'>
                        <label className='form-label text-cmGrey800 mb-5' style={{fontWeight: 600}}>
                            Upload new documents (<span className='text-cmError'>*</span> is
                            mandatory)
                        </label>
                        <select
                            className='form-select text-cmGrey700 bg-cmGrey200 border border-0 cursor-pointer'
                            style={{fontWeight: 600}}
                        >
                            <option value={''} dselected disabled style={{fontWeight: 600}}>
                                Pick a Type
                            </option>

                            <option value='1' style={{fontWeight: 600}}>
                                Data to come
                            </option>
                        </select>
                    </div>
                    <div className='mb-15'>
                        <label className='form-labeltext-cmGrey800 mb-5' style={{fontWeight: 600}}>
                            Description
                        </label>
                        <CustomInput type={INPUT_TYPE.textarea} placeholder='Add here' />
                    </div>
                    <div className='mb-15'>
                        <label className='form-labeltext-cmGrey800 mb-5' style={{fontWeight: 600}}>
                            Images or documents (maximum 5 MB each)
                            <span className='text-cmError'>*</span>
                        </label>
                        <input type='file' className='form-control bg-cmbg' required />
                    </div>
                    <div className='text-center'>
                        <button
                            type='submit'
                            className='btn bg-cmBlue-Crayola text-cmwhite w-sm-250px '
                            style={{fontWeight: 700, fontSize: '16px'}}
                        >
                            Upload Documents
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DocumentForm
