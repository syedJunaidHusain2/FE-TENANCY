import {useEffect, useState} from 'react'
import clsx from 'clsx'
import {KTSVG} from '../../../../../_metronic/helpers'
import DatePicker from 'react-datepicker'
import moment from 'moment'

// import ViewCostomer from './ViewCostomer'

const FineFreeForm = () => {
    const [open, setOpen] = useState(false)
    const [btn, setBtn] = useState(false)
    const [value, setValue] = useState()
    const [tableData, setTableData] = useState([])
    //   const [startDate, setStartDate] = useState(moment().add(-30, 'day').toDate())
    //   const [endDate, setEndDate] = useState(new Date())
    const [page, setPage] = useState(1)

    const DemoStatus = 'Declined'
    //

    return (
        <>
            <div className={`card`} style={{fontFamily: 'Manrope'}}>
                <div className='card-body py-0 px-0 mx-0'>
                    <div
                        className='card bg-cmwhite h-auto'
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        <div className='w-sm-100 mt-4 mb-3'>
                            {/* form begins */}
                            <form action='' className='w-50 mx-auto mt-10 mb-20'>
                                <div className='mb-10'>
                                    <label
                                        className='form-label text-cmGrey700'
                                        style={{fontSize: '14px', fontWeight: '600'}}
                                    >
                                        <span>Employee Name</span>
                                        <span className='text-cmError'>*</span>
                                    </label>

                                    <select
                                        className='form-select border-0 cursor-pointer bg-cmGrey100 text-cmGrey700'
                                        style={{fontWeight: 600}}
                                        aria-label='Select example'
                                    >
                                        <option>Select Employee</option>
                                        <option value='1'>One</option>
                                        <option value='2'>Two</option>
                                        <option value='3'>Three</option>
                                    </select>
                                </div>

                                <div className='mb-10'>
                                    <label
                                        className='form-label'
                                        style={{fontSize: '14px', fontWeight: '600'}}
                                    >
                                        <span>Type</span>
                                        <span className='text-cmError'>*</span>
                                    </label>

                                    <select
                                        className='form-select border-0 cursor-pointer bg-cmGrey100 text-cmGrey700'
                                        style={{fontWeight: 600}}
                                        aria-label='Select example'
                                    >
                                        <option>Fine</option>
                                        <option value='1'>One</option>
                                        <option value='2'>Two</option>
                                        <option value='3'>Three</option>
                                    </select>
                                </div>

                                <div className='mb-10'>
                                    <label
                                        className='form-label text-cmGrey700'
                                        style={{fontSize: '14px', fontWeight: '600'}}
                                    >
                                        <span>Amount</span>
                                        <span className='text-cmError'>*</span>
                                    </label>

                                    <input
                                        type='text'
                                        style={{fontWeight: 600}}
                                        className='form-control border-0 bg-cmbg text-cmGrey700'
                                        placeholder='Enter Amount'
                                    />
                                </div>

                                <div className='mb-10'>
                                    <label
                                        className='form-label'
                                        style={{fontSize: '14px', fontWeight: '600'}}
                                    >
                                        <span>Date of Fine/Fee</span>
                                        <span className='text-cmError'>*</span>
                                    </label>

                                    <input
                                        type='text'
                                        style={{fontWeight: 600}}
                                        className='form-control border-0 bg-cmbg text-cmGrey700'
                                        placeholder='Date'
                                    />
                                </div>

                                <div className='mb-10'>
                                    <label
                                        className='form-label'
                                        style={{fontSize: '14px', fontWeight: '600'}}
                                    >
                                        <span>Description</span>
                                        <span className='text-cmError'>*</span>
                                    </label>
                                    <textarea
                                        className='form-control bg-cmbg'
                                        id='DescriptionBox'
                                        rows='3'
                                        placeholder='Enter Description'
                                    ></textarea>
                                </div>
                                <div className='text-center'>
                                    <button
                                        className='btn mx-auto py-2 px-20 text-cmwhite bg-cmBlue-Crayola'
                                        type='submit'
                                        style={{fontSize: '16px', fontWeight: 700}}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FineFreeForm
