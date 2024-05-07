/* eslint-disable jsx-a11y/anchor-is-valid */
import {StepProps} from '../IAppModels'
import Select from '../../../../../../app/modules/admin/Setting/Icon/select.png'
const Step4 = ({data, updateData}: StepProps) => {
    return (
        <div
            className='pb-5'
            style={{fontSize: '14px', marginBottom: '37%'}}
            data-kt-stepper-element='content'
        >
            <div className='w-100'>
                <div className='form-check ml-12px d-flex form-switch form-switch-sm form-check-custom form-check-solid'>
                    <label
                        className='form-label'
                        style={{
                            fontSize: '16px',
                            fontFamily: 'Manrope',
                            color: '#212121',
                        }}
                    >
                        Deductions{' '}
                    </label>
                    <input
                        style={{marginTop: '-4px'}}
                        className='form-check-input ms-6'
                        type='checkbox'
                        value=''
                        name='notifications'
                        defaultChecked={true}
                    />
                </div>
                <div className='container mt-2' style={{marginLeft: '-10px'}}>
                    <div className='row g-2'>
                        <div className='col-6' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            Deductions
                            <label
                                className='d-flex flex-row  h-50px'
                                style={{
                                    background: '',
                                    width: '99.2%',
                                    borderRadius: '6px',
                                    color: '#424242',
                                }}
                            >
                                {/* <label
                  className='d-flex mt-4 me-4'
                  style={{fontFamily: 'Manrope #0D1821'}}
                >
                  $
                </label> */}

                                <input
                                    style={{
                                        background: '#FAFAFA                    ',
                                        fontWeight: '800px',
                                        color: '#424242',
                                        fontSize: '14px',
                                    }}
                                    name='status'
                                    placeholder='Enter'
                                    className='form-select form-select-black form-select-sm'
                                ></input>
                            </label>
                        </div>

                        <div
                            className='col'
                            style={{fontFamily: 'Manrope', fontSize: '14px', marginLeft: '13px'}}
                        >
                            Amount per paycheck
                            <label
                                className='d-flex flex-row  h-50px'
                                style={{
                                    background: '',
                                    width: '106%',
                                    borderRadius: '10px',
                                    color: '#424242',
                                }}
                            >
                                {/* <label
                  className='d-flex mt-4 me-4'
                  style={{fontFamily: 'Manrope #0D1821'}}
                >
                  $
                </label> */}
                                <label
                                    className='mt-4 me-2 d-flex flex-row'
                                    style={{fontFamily: 'Manrope #0D1821'}}
                                >
                                    ${' '}
                                    <i
                                        className='bi bi-exclamation-circle ms-1 mt-1 '
                                        style={{color: '#616161'}}
                                    ></i>
                                </label>
                                <input
                                    style={{
                                        background: '#FAFAFA                    ',
                                        fontWeight: '800px',
                                        color: '#424242',
                                        fontSize: '14px',
                                    }}
                                    name='status'
                                    placeholder='Enter'
                                    className='form-select form-select-black form-select-sm'
                                ></input>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='container mt-1' style={{marginLeft: '-10px'}}>
                    <div className='row g-2'>
                        <div className='col-6' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            <label
                                className='d-flex flex-row  h-50px'
                                style={{
                                    background: '',
                                    width: '99.2%',
                                    borderRadius: '6px',
                                    color: '#424242',
                                }}
                            >
                                {/* <label
                  className='d-flex mt-4 me-4'
                  style={{fontFamily: 'Manrope #0D1821'}}
                >
                  $
                </label> */}

                                <input
                                    style={{
                                        background: '#FAFAFA                    ',
                                        fontWeight: '800px',
                                        color: '#424242',
                                        fontSize: '14px',
                                    }}
                                    name='status'
                                    placeholder='Enter'
                                    className='form-select form-select-black form-select-sm'
                                ></input>
                            </label>
                        </div>

                        <div
                            className='col'
                            style={{fontFamily: 'Manrope', fontSize: '14px', marginLeft: '10px'}}
                        >
                            <label
                                className='d-flex flex-row  h-50px'
                                style={{
                                    background: '',
                                    width: '106%',
                                    borderRadius: '10px',
                                    color: '#424242',
                                }}
                            >
                                {/* <label
                  className='d-flex mt-4 me-4'
                  style={{fontFamily: 'Manrope #0D1821'}}
                >
                  $
                </label> */}
                                <label
                                    className='mt-4 me-2 d-flex flex-row'
                                    style={{fontFamily: 'Manrope #0D1821'}}
                                >
                                    %{' '}
                                    <i
                                        className='bi bi-exclamation-circle ms-1 mt-1 '
                                        style={{color: '#616161'}}
                                    ></i>
                                </label>
                                <input
                                    style={{
                                        background: '#FAFAFA                    ',
                                        fontWeight: '800px',
                                        color: '#424242',
                                        fontSize: '14px',
                                    }}
                                    name='status'
                                    placeholder='Enter'
                                    className='form-select form-select-black form-select-sm'
                                ></input>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='d-flex mt-5'>
                    <ul
                        style={{
                            fontFamily: 'Manrope',
                            color: '#212121',
                            fontWeight: '400',
                            fontStyle: 'SemiBold',
                            fontSize: '16px',
                        }}
                        className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent  flex-nowrap'
                    >
                        <li className='nav-item d-flex'>
                            <div
                                style={{
                                    color: '#6078EC                  ',
                                    width: '15px',
                                    height: '15px',
                                    border: '1px solid #6078EC                  ',
                                }}
                                className='d-flex text-center align-item-center justify-content-center'
                            >
                                <b style={{marginTop: '-5px'}}>+</b>
                            </div>
                            <li
                                className='ms-2'
                                style={{
                                    color: '#6078EC  ',
                                    fontSize: '14px',
                                    textDecoration: '#6078EC                  ',
                                    padding: '0px',
                                    marginTop: '-3px',
                                }}
                            >
                                Add Another
                            </li>
                        </li>
                    </ul>
                </div>

                <div className='form-check mt-20 ml-12px d-flex form-switch form-switch-sm form-check-custom form-check-solid'>
                    <label
                        className='form-label'
                        style={{
                            fontSize: '16px',
                            fontFamily: 'Manrope',
                            color: '#212121',
                        }}
                    >
                        Limit
                    </label>
                    <input
                        style={{marginTop: '-4px'}}
                        className='form-check-input ms-6'
                        type='checkbox'
                        value=''
                        name='notifications'
                        defaultChecked={true}
                    />
                </div>
                <div className='container mt-0' style={{marginLeft: '-10px'}}>
                    <div className='row g-2'>
                        <div className='col-6' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            <label
                                className='d-flex flex-row  h-50px'
                                style={{
                                    background: '',
                                    width: '100%',
                                    borderRadius: '10px',
                                    color: '#424242',
                                }}
                            >
                                {/* <label
                  className='d-flex mt-4 me-4'
                  style={{fontFamily: 'Manrope #0D1821'}}
                >
                  $
                </label> */}
                                <label
                                    className='mt-4 me-2 d-flex flex-row'
                                    style={{fontFamily: 'Manrope #0D1821'}}
                                >
                                    $
                                </label>
                                <input
                                    style={{
                                        background: '#FAFAFA                    ',
                                        fontWeight: '800px',
                                        color: '#424242',
                                        fontSize: '14px',
                                    }}
                                    name='status'
                                    placeholder='Enter'
                                    className='form-select form-select-black form-select-sm'
                                ></input>
                            </label>
                        </div>
                        <div
                            className='col '
                            style={{fontFamily: 'Manrope', fontSize: '14px', marginLeft: '20px'}}
                        >
                            <select
                                style={{
                                    fontWeight: '800px',
                                    color: '#424242',
                                    fontSize: '14px',
                                }}
                                name='status'
                                data-control='select2'
                                data-hide-search='true'
                                className='form-select form-select-black form-select-sm bg-cmGrey200 cursor-pointer'
                                defaultValue='1'
                            >
                                <option value='1'> None</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Step4}
