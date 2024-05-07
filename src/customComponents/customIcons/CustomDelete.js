import React from 'react'
import {KTSVG} from '../../_metronic/helpers'
import CustomButton, {BUTTON_TYPE} from '../customButtton/CustomButton'

const CustomDelete = ({onClick, loading}) => {
    return (
        <>
            {loading ? (
                <CustomButton buttonType={BUTTON_TYPE.error} loading />
            ) : (
                <KTSVG
                    path='/media/icons/duotune/art/DeleteIcon.svg'
                    className='cursor-pointer'
                    onClick={onClick}
                    svgClassName='w-35px h-35px'
                />
            )}
        </>
    )
}

export default CustomDelete
