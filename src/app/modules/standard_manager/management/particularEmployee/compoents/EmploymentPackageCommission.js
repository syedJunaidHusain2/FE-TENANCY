import React, {useState, useEffect, useCallback} from 'react'
import Edit from '../../../../admin/sequidocs/Icon/edit.png'
import 'react-datepicker/dist/react-datepicker.css'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {UNIT_TYPE1} from '../../../../../../constants/constants'
import {updateEmployeeCommissionService} from '../../../../../../services/Services'
import {useSelector} from 'react-redux'
import {isUserManagerSelector} from '../../../../../../redux/selectors/AuthSelectors'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'

const EMPLOYEE_KEYS = {
    upfront_pay_amount: 'upfront_pay_amount',
    upfront_sale_type: 'upfront_sale_type',
    direct_overrides_amount: 'direct_overrides_amount',
    direct_overrides_type: 'direct_overrides_type',
    indirect_overrides_amount: 'indirect_overrides_amount',
    indirect_overrides_type: 'indirect_overrides_type',
    office_overrides_amount: 'office_overrides_amount',
    office_overrides_type: 'office_overrides_type',
}

const EmploymentPackageCommission = ({empData, empId, loading, getEmployeeData}) => {
    const [edit, setEdit] = useState(false)
    const [employeeData, setEmployeeData] = useState(null)
    const [loader, setLoader] = useState(false)
    const isManager = useSelector(isUserManagerSelector)
    const onEditButtonPress = () => {
        setEdit(!edit)
    }
    const onSavePress = useCallback(() => {
        const body = {
            user_id: empId,
            upfront_pay_amount: employeeData?.upfront_pay_amount,
            upfront_sale_type: employeeData?.upfront_sale_type,
            direct_overrides_amount: employeeData?.direct_overrides_amount,
            direct_overrides_type: employeeData?.direct_overrides_type,
            indirect_overrides_amount: employeeData?.indirect_overrides_amount,
            indirect_overrides_type: employeeData?.indirect_overrides_type,
            office_overrides_amount: employeeData?.office_overrides_amount,
            office_overrides_type: employeeData?.office_overrides_type,
        }
        setLoader(true)
        updateEmployeeCommissionService(body)
            .then(() => {
                getEmployeeData()
                setLoader(false)
                setEdit(false)
                CustomToast.success('Employee commission updated')
            })
            .catch((error) => {
                CustomToast.error(error?.data?.message)
                setLoader(false)
            })
            .finally(() => {})
    }, [
        empId,
        employeeData?.direct_overrides_amount,
        employeeData?.direct_overrides_type,
        employeeData?.indirect_overrides_amount,
        employeeData?.indirect_overrides_type,
        employeeData?.office_overrides_amount,
        employeeData?.office_overrides_type,
        employeeData?.upfront_pay_amount,
        employeeData?.upfront_sale_type,
        getEmployeeData,
    ])

    useEffect(() => {
        setEmployeeData(empData)
    }, [empData])

    const updateEmployeeData = (field, value) => {
        setEmployeeData((val) => ({
            ...val,
            [field]: value,
        }))
    }

    const onChangeInputData = (e) => {
        updateEmployeeData(e?.target?.name, e?.target?.value)
    }
    return (
        <>
            <div
                className='card shadow bg-white h-auto'
                style={{fontFamily: 'Manrope', fontSize: '14px'}}
            >
                <CustomLoader visible={loading || loader} full />
                <div className=''>
                    <div className='w-100 mb-0'>
                        <div className='d-flex mx-10 align-items-center justify-content-between align-items-center pt-5'>
                            <div
                                className='text-cmGrey700'
                                style={{
                                    fontWeight: '600',
                                }}
                            >
                                Commission{' '}
                                <span className='text-cmGrey900 ms-2'>
                                    {employeeData?.commission ?? 0}%
                                </span>
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
                                    {/* first line */}
                                    <div
                                        className='d-sm-flex justify-content-evenly py-5 px-sm-20 px-10 bg-cmGrey100'
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='d-flex gap-10 w-sm-50 '>
                                            <div className='text-cmGrey600'> Upfront:</div>{' '}
                                            <div className='text-cmgrey900'>
                                                $ {employeeData?.upfront_pay_amount}{' '}
                                                {employeeData?.upfront_sale_type}
                                            </div>
                                        </div>
                                        <div className='w-sm-50'></div>
                                    </div>
                                    {/* Second line */}
                                    <div
                                        className='d-sm-flex py-5 px-sm-20 px-10 '
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='d-sm-flex gap-10  '>
                                            <div className='text-cmGrey900'> Overrides</div>
                                            <div className='d-flex gap-10 mt-sm-0 mt-2'>
                                                <div className='text-cmGrey600'> Direct:</div>{' '}
                                                <div className='text-cmgrey900'>
                                                    $ {employeeData?.direct_overrides_amount}{' '}
                                                    {employeeData?.direct_overrides_type}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' '></div>
                                    </div>
                                    {/* Third line */}
                                    <div
                                        className='d-sm-flex justify-content-evenly py-5 px-sm-15 px-10 bg-cmGrey100'
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='d-flex gap-10 w-sm-50 '>
                                            <div className='text-cmGrey600'> Indirect:</div>{' '}
                                            <div className='text-cmgrey900'>
                                                $ {employeeData?.indirect_overrides_amount}{' '}
                                                {employeeData?.indirect_overrides_type}
                                            </div>
                                            <div className='w-sm-225'></div>
                                        </div>
                                    </div>
                                    {/* Fourth line */}
                                    <div className='d-sm-flex justify-content-evenly py-5 px-sm-15 px-10'>
                                        <div
                                            className='d-flex gap-10  w-sm-50'
                                            style={{fontWeight: 600}}
                                        >
                                            <div className='text-cmGrey600 '>Office:</div>
                                            <div className='text-cmgrey900 '>
                                                $ {employeeData?.office_overrides_amount}{' '}
                                                {employeeData?.office_overrides_type}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            // Edit section
                            <>
                                <div className=''>
                                    {/* first line */}
                                    <div
                                        className='d-sm-flex justify-content-evenly py-5 px-sm-20 px-10 bg-cmGrey100'
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='d-sm-flex align-items-center gap-10'>
                                            <div className='text-cmGrey900'> Upfront:</div>
                                            <div className='d-flex gap-5  mt-sm-0 mt-2'>
                                                <CustomInput
                                                    type={INPUT_TYPE.currency}
                                                    onChange={onChangeInputData}
                                                    name={EMPLOYEE_KEYS.upfront_pay_amount}
                                                    value={employeeData.upfront_pay_amount}
                                                    placeholder='Enter amount'
                                                />
                                                <div className='text-cmgrey900'>
                                                    <select
                                                        className='border border-0 cursor-pointer text-cmGrey600 rounded bg-cmwhite ps-2 py-2'
                                                        aria-label='Select example'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontWeight: '600',
                                                            fontSize: '14px',
                                                        }}
                                                        onChange={onChangeInputData}
                                                        name={EMPLOYEE_KEYS?.upfront_sale_type}
                                                        value={employeeData?.upfront_sale_type}
                                                    >
                                                        <option
                                                            style={{fontWeight: 600}}
                                                            dselected
                                                            disabled
                                                        >
                                                            -Select-
                                                        </option>
                                                        {UNIT_TYPE1.map((item) => (
                                                            <option
                                                                style={{fontWeight: 600}}
                                                                value={item?.value}
                                                            >
                                                                {item?.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-sm-50'></div>
                                    </div>
                                    {/* Second line */}
                                    <div
                                        className='d-sm-flex justify-content-evenly py-5 px-sm-20 px-10 '
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='d-sm-flex align-items-center gap-10 '>
                                            <div className='text-cmGrey900'> Overrides</div>
                                            <div className='text-cmGrey600'> Direct:</div>{' '}
                                            <div className='d-flex gap-5 mt-sm-0 mt-2'>
                                                <CustomInput
                                                    type={INPUT_TYPE.currency}
                                                    onChange={onChangeInputData}
                                                    name={EMPLOYEE_KEYS.direct_overrides_amount}
                                                    value={employeeData.direct_overrides_amount}
                                                    placeholder='Enter amount'
                                                />
                                                <div className='text-cmgrey900 mt-sm-0'>
                                                    <select
                                                        className='border border-0 cursor-pointer text-cmGrey600 rounded stripRow ps-2 py-2'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontWeight: '600',
                                                            fontSize: '14px',
                                                        }}
                                                        onChange={onChangeInputData}
                                                        name={EMPLOYEE_KEYS?.direct_overrides_type}
                                                        value={employeeData?.direct_overrides_type}
                                                    >
                                                        <option
                                                            style={{fontWeight: 600}}
                                                            dselected
                                                            disabled
                                                        >
                                                            -Select-
                                                        </option>
                                                        {UNIT_TYPE1?.map((item) => (
                                                            <option
                                                                style={{fontWeight: 600}}
                                                                value={item?.value}
                                                            >
                                                                {item?.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-sm-50 '></div>
                                    </div>
                                    {/* Third line */}
                                    <div
                                        className='d-sm-flex justify-content-evenly py-5 px-10 bg-cmGrey100'
                                        style={{fontWeight: 600}}
                                    >
                                        <div className='d-sm-flex align-items-center gap-10 w-sm-50 '>
                                            <div className='text-cmGrey600'> Indirect:</div>{' '}
                                            <div className='d-flex gap-5 mt-sm-0 mt-2'>
                                                <CustomInput
                                                    type={INPUT_TYPE.currency}
                                                    onChange={onChangeInputData}
                                                    name={EMPLOYEE_KEYS.indirect_overrides_amount}
                                                    value={employeeData.indirect_overrides_amount}
                                                    placeholder='Enter amount'
                                                />
                                                <div className='text-cmgrey900 mt-sm-0'>
                                                    <select
                                                        className='border border-0 cursor-pointer text-cmGrey600 rounded bg-cmwhite ps-2 py-2'
                                                        aria-label='Select example'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontWeight: '600',
                                                            fontSize: '14px',
                                                        }}
                                                        onChange={onChangeInputData}
                                                        name={EMPLOYEE_KEYS.indirect_overrides_type}
                                                        value={employeeData.indirect_overrides_type}
                                                    >
                                                        <option
                                                            style={{fontWeight: 600}}
                                                            dselected
                                                            disabled
                                                        >
                                                            -Select-
                                                        </option>
                                                        {UNIT_TYPE1.map((item) => (
                                                            <option
                                                                style={{fontWeight: 600}}
                                                                value={item.value}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Fourth line */}
                                    <div className='d-sm-flex justify-content-evenly py-5 px-10'>
                                        <div
                                            className='d-sm-flex align-items-center gap-10 w-sm-50 '
                                            style={{fontWeight: 600}}
                                        >
                                            <div className='text-cmGrey600 '>Office:</div>
                                            <div className='d-flex gap-5 mt-sm-0 mt-2'>
                                                <CustomInput
                                                    type={INPUT_TYPE.currency}
                                                    onChange={onChangeInputData}
                                                    name={EMPLOYEE_KEYS.office_overrides_amount}
                                                    value={employeeData.office_overrides_amount}
                                                    placeholder='Enter amount'
                                                />
                                                <div className='text-cmgrey900 mt-sm-0'>
                                                    <select
                                                        className='border border-0 cursor-pointer text-cmGrey600 rounded stripRow ps-2 py-2'
                                                        aria-label='Select example'
                                                        style={{
                                                            fontFamily: 'Manrope',
                                                            fontWeight: '600',
                                                            fontSize: '14px',
                                                        }}
                                                        onChange={onChangeInputData}
                                                        name={EMPLOYEE_KEYS.office_overrides_type}
                                                        value={employeeData.office_overrides_type}
                                                    >
                                                        <option style={{fontWeight: 600}}>
                                                            -Select-
                                                        </option>
                                                        {UNIT_TYPE1.map((item) => (
                                                            <option
                                                                style={{fontWeight: 600}}
                                                                value={item.value}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmploymentPackageCommission
