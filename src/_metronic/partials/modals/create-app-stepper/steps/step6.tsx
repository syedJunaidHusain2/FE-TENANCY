/* eslint-disable jsx-a11y/anchor-is-valid */
import {StepProps} from '../IAppModels'
import Select from '../../../../../app/modules/admin/Setting/Icon/select.png'
const Step6 = () => {
    return (
        <div className='current' data-kt-stepper-element='content' style={{marginBottom: '88%'}}>
            <div className='w-100'>
                <div className='container mt-3  w-100' style={{marginLeft: '-10px'}}>
                    <div className='row g-2'>
                        <div className='col-6' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                            {/* Select a Permission Plan */}
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
        // <div
        //   className='pb-5'
        //   style={{fontSize: '14px', marginBottom: '0%'}}
        //   data-kt-stepper-element='content'
        // >
        //   <div className='w-100'>
        //     <div className='container mt-2' style={{marginLeft: '-10px'}}>
        //       <div className='row g-2'>
        //         <div className='col-6' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
        //           Direct Overrides
        //           <input
        //             className='form-check-input ms-3'
        //             type='checkbox'
        //             value=''
        //             name='notifications'
        //             defaultChecked={true}
        //           />
        //           <label
        //             className='d-flex flex-row  h-50px'
        //             style={{
        //               background: '',
        //               width: '99.2%',
        //               borderRadius: '6px',
        //               color: '#424242',
        //             }}
        //           >
        //             <label
        //               className='d-flex mt-4 me-2'
        //               style={{fontFamily: 'Manrope #0D1821'}}
        //             >
        //               $
        //             </label>

        //             <input
        //               style={{
        //                 background: '#EEEEEE',
        //                 fontWeight: '800px',
        //                 color: '#424242',
        //                 fontSize: '14px',
        //               }}
        //               name='status'
        //               placeholder='Enter'
        //               className='form-select form-select-black form-select-sm'
        //             ></input>
        //           </label>
        //         </div>
        //         <div
        //           className='col mt-8'
        //           style={{fontFamily: 'Manrope', fontSize: '14px', marginLeft: '15px'}}
        //         >
        //           <label
        //             className='d-flex flex-row  h-50px'
        //             style={{
        //               background: '#EEEEEE',
        //               width: '106%',
        //               borderRadius: '6px',
        //               color: '#424242',
        //             }}
        //           >
        //             <select
        //               style={{
        //                 background: '#EEEEEE',
        //                 fontWeight: '800px',
        //                 color: '#424242',
        //                 fontSize: '14px',
        //               }}
        //               name='status'
        //               data-control='select2'
        //               data-hide-search='true'
        //               className='form-select form-select-black form-select-sm'
        //               defaultValue='1'
        //             >
        //               <option value='1'> None</option>
        //             </select>
        //             <img
        //               className='me-5 mt-7'
        //               style={{
        //                 width: '10.5px',
        //                 height: '7px',
        //               }}
        //               src={Select}
        //             ></img>
        //           </label>
        //         </div>
        //       </div>
        //     </div>

        //     <div className='container mt-8' style={{marginLeft: '-10px'}}>
        //       <div className='row g-2'>
        //         <div className='col-6' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
        //           Indirect Overrides
        //           <input
        //             className='form-check-input ms-3'
        //             type='checkbox'
        //             value=''
        //             name='notifications'
        //             defaultChecked={true}
        //           />{' '}
        //           <label
        //             className='d-flex flex-row  h-50px'
        //             style={{
        //               background: '',
        //               width: '99.2%',
        //               borderRadius: '6px',
        //               color: '#424242',
        //             }}
        //           >
        //             <label
        //               className='d-flex mt-4 me-2'
        //               style={{fontFamily: 'Manrope #0D1821'}}
        //             >
        //               $
        //             </label>

        //             <input
        //               style={{
        //                 background: '#EEEEEE',
        //                 fontWeight: '800px',
        //                 color: '#424242',
        //                 fontSize: '14px',
        //               }}
        //               name='status'
        //               placeholder='Enter'
        //               className='form-select form-select-black form-select-sm'
        //             ></input>
        //           </label>
        //         </div>
        //         <div
        //           className='col mt-8 '
        //           style={{fontFamily: 'Manrope', fontSize: '14px', marginLeft: '15px'}}
        //         >
        //           <label
        //             className='d-flex flex-row  h-50px'
        //             style={{
        //               background: '#EEEEEE',
        //               width: '107%',
        //               borderRadius: '6px',
        //               color: '#424242',
        //             }}
        //           >
        //             <select
        //               style={{
        //                 background: '#EEEEEE',
        //                 fontWeight: '800px',
        //                 color: '#424242',
        //                 fontSize: '14px',
        //               }}
        //               name='status'
        //               data-control='select2'
        //               data-hide-search='true'
        //               className='form-select form-select-black form-select-sm'
        //               defaultValue='1'
        //             >
        //               <option value='1'> None</option>
        //             </select>
        //             <img
        //               className='me-5 mt-7'
        //               style={{
        //                 width: '10.5px',
        //                 height: '7px',
        //               }}
        //               src={Select}
        //             ></img>
        //           </label>
        //         </div>
        //       </div>
        //     </div>

        //     <div className='container mt-8' style={{marginLeft: '-10px'}}>
        //       <div className='row g-2'>
        //         <div className='col-6' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
        //           Office Overrides
        //           <input
        //             className='form-check-input ms-3'
        //             type='checkbox'
        //             value=''
        //             name='notifications'
        //             defaultChecked={true}
        //           />{' '}
        //           <label
        //             className='d-flex flex-row  h-50px'
        //             style={{
        //               background: '',
        //               width: '99.2%',
        //               borderRadius: '6px',
        //               color: '#424242',
        //             }}
        //           >
        //             <label
        //               className='d-flex mt-4 me-2'
        //               style={{fontFamily: 'Manrope #0D1821'}}
        //             >
        //               $
        //             </label>

        //             <input
        //               style={{
        //                 background: '#EEEEEE',
        //                 fontWeight: '800px',
        //                 color: '#424242',
        //                 fontSize: '14px',
        //               }}
        //               name='status'
        //               placeholder='Enter'
        //               className='form-select form-select-black form-select-sm'
        //             ></input>
        //           </label>
        //         </div>
        //         <div
        //           className='col mt-8 '
        //           style={{fontFamily: 'Manrope', fontSize: '14px', marginLeft: '15px'}}
        //         >
        //           <label
        //             className='d-flex flex-row  h-50px'
        //             style={{
        //               background: '#EEEEEE',
        //               width: '107%',
        //               borderRadius: '6px',
        //               color: '#424242',
        //             }}
        //           >
        //             <select
        //               style={{
        //                 background: '#EEEEEE',
        //                 fontWeight: '800px',
        //                 color: '#424242',
        //                 fontSize: '14px',
        //               }}
        //               name='status'
        //               data-control='select2'
        //               data-hide-search='true'
        //               className='form-select form-select-black form-select-sm'
        //               defaultValue='1'
        //             >
        //               <option value='1'> None</option>
        //             </select>
        //             <img
        //               className='me-5 mt-7'
        //               style={{
        //                 width: '10.5px',
        //                 height: '7px',
        //               }}
        //               src={Select}
        //             ></img>
        //           </label>
        //         </div>
        //       </div>
        //     </div>

        //     <div className='mt-8 form-check ml-12px d-flex form-switch form-switch-sm form-check-custom form-check-solid'>
        //       <label
        //         className='form-label'
        //         style={{
        //           fontSize: '16px',
        //           fontFamily: 'Manrope',
        //           color: '#212121',
        //         }}
        //       >
        //         Tier for Overrides{' '}
        //       </label>
        //       <input
        //         style={{marginTop: '-4px'}}
        //         className='form-check-input ms-6'
        //         type='checkbox'
        //         value=''
        //         name='notifications'
        //         defaultChecked={true}
        //       />
        //     </div>

        //     <div className='container mt-6' style={{marginLeft: '-10px'}}>
        //       <div className='row g-2'>
        //         <div className='col-6' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
        //           Sliding Scale
        //           <label
        //             className='d-flex flex-row  h-50px'
        //             style={{
        //               background: '#EEEEEE',
        //               width: '100%',
        //               borderRadius: '6px',
        //               color: '#424242',
        //             }}
        //           >
        //             <select
        //               style={{
        //                 background: '#EEEEEE',
        //                 fontWeight: '800px',
        //                 color: '#424242',
        //                 fontSize: '14px',
        //               }}
        //               name='status'
        //               data-control='select2'
        //               data-hide-search='true'
        //               className='form-select form-select-black form-select-sm'
        //               defaultValue='1'
        //             >
        //               <option value='1'> None</option>
        //             </select>
        //             <img
        //               className='me-5 mt-7'
        //               style={{
        //                 width: '10.5px',
        //                 height: '7px',
        //               }}
        //               src={Select}
        //             ></img>
        //           </label>
        //         </div>
        //         <div
        //           className='col '
        //           style={{fontFamily: 'Manrope', fontSize: '14px', marginLeft: '20px'}}
        //         >
        //           Levels
        //           <label
        //             className='d-flex flex-row  h-50px'
        //             style={{
        //               background: '#EEEEEE',
        //               width: '107%',
        //               borderRadius: '6px',
        //               color: '#424242',
        //             }}
        //           >
        //             <select
        //               style={{
        //                 background: '#EEEEEE',
        //                 fontWeight: '800px',
        //                 color: '#424242',
        //                 fontSize: '14px',
        //               }}
        //               name='status'
        //               data-control='select2'
        //               data-hide-search='true'
        //               className='form-select form-select-black form-select-sm'
        //               defaultValue='1'
        //             >
        //               <option value='1'> None</option>
        //             </select>
        //             <img
        //               className='me-5 mt-7'
        //               style={{
        //                 width: '10.5px',
        //                 height: '7px',
        //               }}
        //               src={Select}
        //             ></img>
        //           </label>
        //         </div>
        //       </div>
        //     </div>

        //     <table style={{border: '3px solid #EEEEEE'}} className='mt-8 table w-md-325px'>
        //       <thead
        //         style={{
        //           background: '#BDBDBD',
        //           fontFamily: 'Manrope',
        //           fontSize: '13.84px',
        //           color: '#212121',
        //         }}
        //       >
        //         <tr className='d-flex flex-row justify-content-between me-4'>
        //           <th className='d-flex ms-4' scope='col'>
        //             Installs from
        //           </th>
        //           <th className='d-flex ms-4' scope='col'>
        //             Upfront Shift
        //           </th>
        //           <th scope='col'>Installs to</th>
        //         </tr>
        //       </thead>
        //       <tbody>
        //         <tr
        //           style={{background: '#F9F9F9 '}}
        //           className='d-flex flex-row justify-content-between'
        //         >
        //           <th className='d-flex ms-4' scope='col'>
        //             0
        //           </th>
        //           <th className='d-flex ms-4' scope='col'>
        //             -0.01
        //           </th>
        //           <th scope='col' className='d-flex me-7'>
        //             3.0
        //           </th>
        //         </tr>

        //         <tr className='d-flex flex-row justify-content-between'>
        //           <th className='d-flex ms-4' scope='col'>
        //             0
        //           </th>
        //           <th className='d-flex ms-4' scope='col'>
        //             -0.01
        //           </th>
        //           <th scope='col' className='d-flex me-7'>
        //             3.0
        //           </th>
        //         </tr>

        //         <tr
        //           style={{background: '#F9F9F9 '}}
        //           className='d-flex flex-row justify-content-between'
        //         >
        //           <th className='d-flex ms-4' scope='col'>
        //             0
        //           </th>
        //           <th className='d-flex ms-4' scope='col'>
        //             -0.01
        //           </th>
        //           <th scope='col' className='d-flex me-7'>
        //             3.0
        //           </th>
        //         </tr>

        //         <tr className='d-flex flex-row justify-content-between'>
        //           <th className='d-flex ms-4' scope='col'>
        //             0
        //           </th>
        //           <th className='d-flex ms-4' scope='col'>
        //             -0.01
        //           </th>
        //           <th scope='col' className='d-flex me-7'>
        //             3.0
        //           </th>
        //         </tr>
        //       </tbody>
        //     </table>
        //   </div>
        // </div>
    )
}

export {Step6}
