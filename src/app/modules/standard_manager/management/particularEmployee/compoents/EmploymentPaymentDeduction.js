import React, {useState} from 'react'
import Edit from '../../../../admin/sequidocs/Icon/edit.png'
import 'react-datepicker/dist/react-datepicker.css'
import {isUserManagerSelector} from '../../../../../../redux/selectors/AuthSelectors'
import {useSelector} from 'react-redux'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'

const EmploymentPackageDeduction = () => {
    const [edit, setEdit] = useState(false)
    const isManager = useSelector(isUserManagerSelector)
    const onEditButtonPress = () => {
        setEdit(!edit)
    }
    const onSavePress = () => {
        setEdit(!edit)
    }
    return (
        <>
            <div
                className='card bg-smwhite shadow h-auto'
                style={{fontFamily: 'Manrope', fontSize: '14px'}}
            >
                <div className=''>
                    <div className='w-100 mb-0'>
                        <div className='d-flex mx-10 align-items-center justify-content-between align-items-center pt-5'>
                            <div
                                className='text-cmGrey900'
                                style={{
                                    fontWeight: '600',
                                }}
                            >
                                Deductions
                            </div>
                            {isManager && (
                                <div className=' '>
                                    {edit ? (
                                        <div className=''>
                                            <button
                                                className='btn btn-sm btn-icon text-color-primary  btn-bg-light btn-active-color-primary text-cmBlue-Crayola'
                                                data-kt-menu-trigger='click'
                                                style={{width: '60px', fontWeight: 600}}
                                                data-kt-menu-placement='bottom-end'
                                                data-kt-menu-flip='top-end'
                                                onClick={onSavePress}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                className=' btn btn-sm btn-icon  btn-bg-light btn-active-color-primary'
                                                data-kt-menu-trigger='click'
                                                data-kt-menu-placement='bottom-end'
                                                data-kt-menu-flip='top-end'
                                                onClick={onEditButtonPress}
                                            >
                                                <img src={Edit} alt='' style={{width: '34px'}} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className='border-bottom border-cmGrey300 my-5' />
                        {!edit ? (
                            <>
                                <div className=''>
                                    <div
                                        className='d-sm-flex py-5 px-sm-20 px-10 bg-cmGrey100'
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='d-flex gap-10 w-sm-50 '>
                                            <div className='text-cmGrey700'> Rent:</div>{' '}
                                            <div className='text-cmgrey900'>$ 100</div>
                                        </div>
                                    </div>
                                    <div
                                        className='d-sm-flex py-5 px-sm-20 px-10 '
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='d-flex gap-10 w-sm-50 '>
                                            <div className='text-cmGrey700'> Travel:</div>{' '}
                                            <div className='text-cmgrey900'>$ 100</div>
                                        </div>
                                    </div>
                                    <div
                                        className='d-sm-flex py-5 px-sm-20 px-10 bg-cmGrey100'
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='d-flex gap-10 w-sm-50 '>
                                            <div className='text-cmGrey700'> Phone Bill:</div>{' '}
                                            <div className='text-cmgrey900'>$ 100</div>
                                        </div>
                                    </div>
                                    {/* Fourth line */}
                                    <div className='d-sm-flex py-5 px-sm-20 px-10'>
                                        <div
                                            className='d-flex gap-10  w-sm-50'
                                            style={{fontWeight: 600}}
                                        >
                                            <div className='text-cmGrey700 '>Rent:</div>
                                            <div className='text-cmgrey900 '>$ 100</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className=''>
                                    {/* first line */}
                                    <div
                                        className='d-sm-flex py-3 px-sm-20 px-10 bg-cmGrey100'
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='d-flex align-items-center  gap-10 w-sm-50 '>
                                            <div className='text-cmGrey700'> Rent:</div>{' '}
                                            <div className='w-sm-25'>
                                                <input
                                                    type='text'
                                                    className='rounded border border-0 bg-cmwhite py-2 ps-2'
                                                    placeholder='Enter amount'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Second line */}
                                    <div
                                        className='d-sm-flex py-3 px-sm-20 px-10  '
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='d-flex align-items-center  gap-10 w-sm-50'>
                                            <div className='text-cmGrey700'> Travel:</div>{' '}
                                            <div className='w-sm-25'>
                                                <CustomInput placeholder='Enter amount' />
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className='d-sm-flex py-3 px-sm-20 px-10 bg-cmGrey100'
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='d-flex align-items-center  gap-10 w-sm-50'>
                                            <div className='text-cmGrey700'> Phone Bill:</div>{' '}
                                            <div className='w-sm-25'>
                                                <CustomInput
                                                    type={INPUT_TYPE.number}
                                                    placeholder='Enter amount'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Fourth line */}
                                    <div className='d-sm-flex py-3 px-sm-20 px-10 '>
                                        <div
                                            className='d-flex align-items-center  gap-10 w-sm-50'
                                            style={{fontWeight: 600}}
                                        >
                                            <div className='text-cmGrey700 '>Rent:</div>
                                            <div className='w-sm-25'>
                                                <CustomInput
                                                    type={INPUT_TYPE.number}
                                                    placeholder='Enter amount'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmploymentPackageDeduction
