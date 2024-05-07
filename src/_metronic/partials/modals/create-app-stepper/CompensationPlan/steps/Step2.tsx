/* eslint-disable jsx-a11y/anchor-is-valid */
import {StepProps} from '../IAppModels'
import Select from '../../../../../../app/modules/admin/Setting/Icon/select.png'
const Step2 = ({data, updateData}: StepProps) => {
    return (
        <div
            className='pb-5'
            style={{fontSize: '14px', marginBottom: '55%'}}
            data-kt-stepper-element='content'
        >
            <div className='w-100'>
                <div className='container mt-16  w-100' style={{marginLeft: '-10px'}}>
                    <div className='row'>
                        <div className='col' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            Commission
                            <label
                                className='d-flex flex-row  h-50px'
                                style={{
                                    background: '#FAFAFA                  ',
                                    width: '104%',
                                    border: '2px solid #D8D8D8',
                                    borderRadius: '6px',
                                    color: '#424242',
                                }}
                            >
                                <input
                                    style={{
                                        background: '#FAFAFA                    ',
                                        fontWeight: '800px',
                                        color: '#424242',
                                        fontSize: '14px',
                                        border: 'none',
                                    }}
                                    name='status'
                                    data-control='select2'
                                    placeholder='Enter'
                                    data-hide-search='true'
                                    className='form-select form-select-black form-select-sm'
                                ></input>
                                <label className='p-5'>%</label>
                            </label>
                        </div>
                    </div>
                </div>

                <div className='container mt-12  w-100' style={{marginLeft: '-10px'}}>
                    <div className='row'>
                        <div className='col' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            Commission Structure
                            <label
                                className='d-flex flex-row  h-50px'
                                style={{
                                    background: '#EEEEEE',
                                    width: '104%',
                                    borderRadius: '6px',
                                    color: '#424242',
                                }}
                            >
                                <select
                                    style={{
                                        background: '#EEEEEE',
                                        fontWeight: '800px',
                                        color: '#424242',
                                        fontSize: '14px',
                                    }}
                                    name='status'
                                    data-control='select2'
                                    data-hide-search='true'
                                    className='form-select form-select-black form-select-sm'
                                    defaultValue='1'
                                >
                                    <option value='1'> None</option>
                                </select>
                                <img
                                    className='me-5 mt-7'
                                    style={{
                                        width: '10.5px',
                                        height: '7px',
                                    }}
                                    src={Select}
                                ></img>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Step2}
