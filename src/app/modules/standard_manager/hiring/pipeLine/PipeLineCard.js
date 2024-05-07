import React from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'

const PipeLineCard = () => {
    return (
        <div className='bg-white shadow'>
            {/* header */}
            <div className='p-5 mb-10'>
                {' '}
                <div
                    style={{height: '43px', borderRadius: '20px'}}
                    className='w-md-300px '
                    id='kt_chat_contacts_header'
                >
                    <form
                        className='position-relative'
                        style={{borderRadius: '90px'}}
                        autoComplete='off'
                    >
                        {/* PIPELINE Table Search Input */}
                        <CustomInput
                            type={INPUT_TYPE.search}
                            name='search'
                            //    onChange={onChangeSearch}
                        />
                        
                    </form>
                </div>
            </div>

            <div className=''></div>
        </div>
    )
}

export default PipeLineCard
