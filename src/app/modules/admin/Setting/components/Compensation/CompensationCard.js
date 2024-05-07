import React, {useState, useEffect} from 'react'
import More1 from '../Path1.png'
import More from '../Path.png'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {CompensationTabel} from '../../../../../../_metronic/partials/widgets'
import {Dropdown1} from '../../../../../../_metronic/partials'
import clsx from 'clsx'
import {CreateCompensationAppModal} from '../../../../../../_metronic/partials'
export default function CompensationCard() {
    const [more, setMore] = useState(false)
    const [edit, setEdit] = useState(false)
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <div className='card bg-white h-auto' style={{fontSize: '14px', fontFamily: 'Manrope'}}>
            <div className='w-100 p-8 d-sm-flex  justify-content-between'>
                <div
                    style={{
                        background: '#F5F5F5',
                        height: '40px',
                        width: '322px',
                        borderRadius: '20px',
                    }}
                    className='w-322px mb-3'
                    id='kt_chat_contacts_header'
                >
                    <form
                        className='position-relative '
                        style={{background: '#F5F5F5', borderRadius: '90px'}}
                        autoComplete='off'
                    >
                        <KTSVG
                            path='/media/icons/duotune/general/gen021.svg'
                            className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                        />

                        <input
                            style={{background: '#F5F5F5', borderRadius: '10px'}}
                            type='text'
                            className='form-control form-control-solid px-12 '
                            name='search'
                            placeholder='Search...'
                        />
                    </form>
                </div>
                <div className=' '>
                    <a
                        href=''
                        className={clsx('btn btn-sm btn-flex fw-bold')}
                        data-kt-menu-trigger='click'
                        data-kt-menu-placement='bottom-end'
                        style={{
                            background: '#F5F5F5',
                            color: '#757575',
                            fontSize: '14px',
                            fontStyle: 'bold',
                            width: '99px',
                            height: '43px',
                        }}
                    >
                        <KTSVG
                            path='/media/icons/duotune/general/gen031.svg'
                            className='me-6 svg-icon-6 svg-icon-muted me-1'
                        />
                        Filter
                    </a>
                    <button
                        href='#'
                        className='btn btn-sm  ms-6'
                        style={{
                            background: '#6078EC',
                            color: 'white',
                            fontSize: '14px',
                            fontStyle: 'bold',
                            width: '119px',
                            height: '43px',
                        }}
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_offer_a_deal'
                        onClick={() => setOpen(true)}
                    >
                        Create New
                    </button>
                    <a className='me-0'>
                        <button
                            style={{
                                color: '#757575',
                                fontSize: '14px',
                                fontStyle: 'bold',
                            }}
                            className='btn btn-sm btn-icon mt-2 btn-bg-white btn-active-color-primary'
                            data-kt-menu-trigger='click'
                            data-kt-menu-placement='top-end'
                            data-kt-menu-flip='bottom-end'
                        >
                            <i
                                style={{marginTop: '-6px'}}
                                className='bi ms-4 bi-three-dots-vertical  fs-3'
                            ></i>
                        </button>
                        <Dropdown1 />
                    </a>
                </div>
            </div>

            <div>
                <CompensationTabel className='mx-0 px-0' />
            </div>
            <CreateCompensationAppModal show={open} handleClose={handleClose} />
        </div>
    )
}
