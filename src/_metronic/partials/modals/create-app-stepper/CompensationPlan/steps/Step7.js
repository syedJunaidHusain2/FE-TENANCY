/* eslint-disable jsx-a11y/anchor-is-valid */
import {KTSVG} from '../../../../../helpers'
import {StepProps} from '../IAppModels'
import Select from '../../../../../../app/modules/admin/Setting/Icon/select.png'
const Step7 = ({page}) => {
    return (
        <>
            {page === true ? (
                <div
                    className='current'
                    data-kt-stepper-element='content'
                    style={{marginBottom: '88%'}}
                >
                    <div className='w-100'>
                        <div className='container mt-3  w-100' style={{marginLeft: '-10px'}}>
                            <div className='row g-2'>
                                <div
                                    className='col-6'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    Select a Permission Plan
                                    <select
                                        style={{
                                            fontWeight: '800',
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
