/* eslint-disable jsx-a11y/anchor-is-valid */
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import {StepProps} from '../IAppModels'
import Select from '../../../../../Setting/Icon/select.png'
const Step7 = ({page}) => {
    return (
        <>
            {page === true ? (
                <div className='current' data-kt-stepper-element='content'>
                    <div className='w-100'>
                        <div className='container mt-3  w-100' style={{marginLeft: '-10px'}}>
                            <div className='row g-2'>
                                <div
                                    className='col-6'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    Select a Permission Plan
                                    <label
                                        className='d-flex flex-row  h-50px'
                                        style={{
                                            background: '#EEEEEE',
                                            width: '100%',
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
                        {/*begin::Form Group */}
                    </div>
                </div>
            ) : (
                <b></b>
            )}
        </>
    )
}

export {Step7}
