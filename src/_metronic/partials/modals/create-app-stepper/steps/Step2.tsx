/* eslint-disable jsx-a11y/anchor-is-valid */
import {StepProps} from '../IAppModels'
import Select from '../../../../../app/modules/admin/Setting/Icon/select.png'
const Step2 = ({data, updateData}: StepProps) => {
    return (
        <div
            className='pb-5'
            style={{fontSize: '14px', marginBottom: '2%'}}
            data-kt-stepper-element='content'
        >
            <div className='w-100'>
                <div className='container mt-2' style={{marginLeft: '-10px'}}>
                    <div className='row g-2'>
                        <div className='col-6' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            Select a Compensation Plan
                            <span style={{color: 'red'}}>*</span>
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
                        <div
                            className='col'
                            style={{fontFamily: 'Manrope', fontSize: '14px', marginLeft: '20px'}}
                        >
                            Compensation Plan Name
                            <label
                                className='d-flex flex-row  h-50px'
                                style={{
                                    background: '#FAFAFA',
                                    width: '108%',
                                    borderRadius: '6px',
                                    color: '#424242',
                                }}
                            >
                                <input
                                    style={{
                                        background: '#FAFAFA',
                                        fontWeight: '800px',
                                        color: '#424242',
                                        fontSize: '14px',
                                    }}
                                    placeholder='Enter'
                                    name='status'
                                    className='form-select form-select-black form-select-sm'
                                ></input>
                            </label>
                        </div>
                    </div>
                </div>

                <div className='container mt-8' style={{marginLeft: '-10px'}}>
                    <div className='row g-2'>
                        <div className='col-6' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            Commission{' '}
                            <label
                                className='d-flex flex-row  h-50px'
                                style={{
                                    background: '',
                                    width: '99%',
                                    borderRadius: '6px',
                                    color: '#424242',
                                }}
                            >
                                <input
                                    style={{
                                        background: '#FAFAFA',
                                        fontWeight: '800px',
                                        color: '#424242',
                                        fontSize: '14px',
                                    }}
                                    name='status'
                                    placeholder='Enter'
                                    className='form-select form-select-black form-select-sm'
                                ></input>
                                <label className='mt-4 ms-4'>%</label>
                            </label>
                        </div>
                        <div
                            className='col '
                            style={{fontFamily: 'Manrope', fontSize: '14px', marginLeft: '20px'}}
                        >
                            Commission Structure
                            <label
                                className='d-flex flex-row  h-50px'
                                style={{
                                    background: '#EEEEEE',
                                    width: '107%',
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

                <div className='container mt-8' style={{marginLeft: '-10px'}}>
                    <div className='row g-2'>
                        <div className='col-6' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            Tier Shift based on
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
                        <div
                            className='col '
                            style={{fontFamily: 'Manrope', fontSize: '14px', marginLeft: '20px'}}
                        >
                            Tier Scale based on
                            <label
                                className='d-flex flex-row  h-50px'
                                style={{
                                    background: '#EEEEEE',
                                    width: '107%',
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
                <table id='get' className='mt-8 table w-md-325px'>
                    <thead
                        style={{
                            background: '#BDBDBD',
                            fontFamily: 'Manrope',
                            fontSize: '13.84px',
                            color: '#212121',
                        }}
                    >
                        <tr className='d-flex flex-row justify-content-between me-4'>
                            <th className='d-flex ms-4' scope='col'>
                                Installs from
                            </th>
                            <th className='d-flex ms-4' scope='col'>
                                Redline Shift
                            </th>
                            <th scope='col'>Installs to</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            style={{background: '#F9F9F9 '}}
                            className='d-flex flex-row justify-content-between'
                        >
                            <th className='d-flex ms-4' scope='col'>
                                0
                            </th>
                            <th className='d-flex ms-4' scope='col'>
                                -0.01
                            </th>
                            <th scope='col' className='d-flex me-7'>
                                3.0
                            </th>
                        </tr>

                        <tr className='d-flex flex-row justify-content-between'>
                            <th className='d-flex ms-4' scope='col'>
                                0
                            </th>
                            <th className='d-flex ms-4' scope='col'>
                                -0.01
                            </th>
                            <th scope='col' className='d-flex me-7'>
                                3.0
                            </th>
                        </tr>

                        <tr
                            style={{background: '#F9F9F9 '}}
                            className='d-flex flex-row justify-content-between'
                        >
                            <th className='d-flex ms-4' scope='col'>
                                0
                            </th>
                            <th className='d-flex ms-4' scope='col'>
                                -0.01
                            </th>
                            <th scope='col' className='d-flex me-7'>
                                3.0
                            </th>
                        </tr>

                        <tr className='d-flex flex-row justify-content-between'>
                            <th className='d-flex ms-4' scope='col'>
                                0
                            </th>
                            <th className='d-flex ms-4' scope='col'>
                                -0.01
                            </th>
                            <th scope='col' className='d-flex me-7'>
                                3.0
                            </th>
                        </tr>
                    </tbody>
                    {/* <tbody>
            <tr>
              <th scope='row'>1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope='row'>2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope='row'>3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody> */}
                </table>
            </div>
        </div>
    )
}

export {Step2}
