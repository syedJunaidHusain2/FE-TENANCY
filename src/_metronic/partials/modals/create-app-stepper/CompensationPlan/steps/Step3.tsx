/* eslint-disable jsx-a11y/anchor-is-valid */
import {StepProps} from '../IAppModels'
import Select from '../../../../../../app/modules/admin/Setting/Icon/select.png'
const Step3 = ({data, updateData}: StepProps) => {
    return (
        <div
            className='pb-5'
            style={{fontSize: '14px', marginBottom: '25%'}}
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
                        Upfront{' '}
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
                    <div className='row'>
                        <div className='col' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            Upfront{' '}
                            <label
                                className='d-flex flex-row  h-50px'
                                style={{
                                    background: '',
                                    width: '99.2%',
                                    borderRadius: '6px',
                                    color: '#424242',
                                }}
                            >
                                <label
                                    className='d-flex mt-4 me-4'
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
                                    className='form-select form-select-black form-select-sm'
                                ></input>
                            </label>
                        </div>
                    </div>
                </div>

                <div className='container mt-8' style={{marginLeft: '-10px'}}>
                    <div className='row'>
                        <div className='col' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            Calculated{' '}
                            <select
                                style={{
                                    fontWeight: '800',
                                    color: '#424242',
                                    fontSize: '14px',
                                }}
                                name='status'
                                data-control='select2'
                                data-hide-search='true'
                                className='form-select form-select-black form-select-sm cursor-pointer bg-cmGrey200 '
                                defaultValue='1'
                            >
                                <option value='1'> Per KW</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='container mt-8' style={{marginLeft: '-10px'}}>
                    <div className='row'>
                        <div className='col' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            Upfont System
                            <label
                                className='d-flex flex-row  h-50px'
                                style={{
                                    width: '100%',
                                    borderRadius: '6px',
                                }}
                            >
                                <select
                                    style={{
                                        fontWeight: '800',

                                        fontSize: '14px',
                                    }}
                                    name='status'
                                    data-control='select2'
                                    data-hide-search='true'
                                    className='form-select form-select-black form-select-sm cursor-pointer bg-cmGrey200'
                                    defaultValue='1'
                                >
                                    <option value='1'> Fixed</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>

                <div className='container mt-7' style={{marginLeft: '-10px'}}>
                    <div className='row'>
                        <div className='col' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            Limit
                            <label style={{color: 'grey', fontSize: '12px'}}>
                                &nbsp;(Per Period)
                            </label>{' '}
                            <label
                                className='d-flex flex-row  h-50px'
                                style={{
                                    background: '',
                                    width: '99.2%',
                                    borderRadius: '6px',
                                    color: '#424242',
                                }}
                            >
                                <label
                                    className='d-flex mt-4 me-4'
                                    style={{fontFamily: 'Manrope #0D1821'}}
                                >
                                    $
                                </label>

                                <input
                                    style={{
                                        background: '#FAFAFA',
                                        fontWeight: '800px',
                                        color: '#424242',
                                        fontSize: '14px',
                                    }}
                                    name='status'
                                    className='form-select form-select-black form-select-sm'
                                ></input>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Step3}
