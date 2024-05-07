/* eslint-disable jsx-a11y/anchor-is-valid */
import {KTSVG} from '../../../../../helpers'
import {StepProps} from '../IAppModels'
import Select from '../../../../../../app/modules/admin/Setting/Icon/select.png'
const Step1 = ({data, updateData, hasError}: StepProps) => {
    return (
        <div className='current' data-kt-stepper-element='content' style={{marginBottom: '37%'}}>
            <div className='w-100'>
                <div className='fv-row  mb-10'>
                    <label className=' d-flex align-items-center fs-5 fw-semibold mb-2 mt-14'>
                        <span className='' style={{color: '#616161', fontFamily: 'Manrope'}}>
                            Commission Plan Name
                        </span>
                        {/* <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i> */}
                    </label>
                    <input
                        type='text'
                        style={{background: '#FAFAFA', border: '1px solid #D8D8D8'}}
                        className='form-control form-control-lg form-control-solid'
                        name='appname'
                        placeholder='Enter Position Name            '
                        value={data.appBasic.appName}
                        onChange={(e) =>
                            updateData({
                                appBasic: {
                                    appName: e.target.value,
                                    appType: data.appBasic.appType,
                                },
                            })
                        }
                    />
                    {!data.appBasic.appName && hasError && (
                        <div className='fv-plugins-message-container'>
                            <div
                                data-field='appname'
                                data-validator='notEmpty'
                                className='fv-help-block'
                            >
                                Position is required
                            </div>
                        </div>
                    )}
                </div>
                {/*end::Form Group */}
                <div className='container mt-12  w-100' style={{marginLeft: '-10px'}}>
                    <div className='row'>
                        <div className='col' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            Department
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

                <div className='container mt-12  w-100' style={{marginLeft: '-10px'}}>
                    <div className='row'>
                        <div className='col' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            Position
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
                {/*begin::Form Group */}
            </div>
        </div>
    )
}

export {Step1}
