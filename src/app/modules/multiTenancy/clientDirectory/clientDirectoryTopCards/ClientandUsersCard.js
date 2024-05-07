import React from 'react'
import {formattedNumberFields} from '../../../../../helpers/CommonHelpers'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import clsx from 'clsx'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import CustomButton, {BUTTON_SIZE} from '../../../../../customComponents/customButtton/CustomButton'

const ClientandUsersCard = ({className, style}) => {
    const items = [
        {name: 'Michael Eberon', src: null},
        {name: 'Susan Redwood', initials: 'S', state: 'primary'},
        {name: 'Melody Macy', src: null},
        {name: 'Alan Warden', initials: 'A', state: 'warning'},
        {name: 'Alan Warden', initials: 'A', state: 'warning'},
        {name: 'Alan Warden', initials: 'A', state: 'warning'},
        {name: 'Alan Warden', initials: 'A', state: 'warning'},
        {name: 'Perry Matthew', initials: 'P', state: 'danger'},
        {name: 'Barry Walter', src: null},
    ]

    return (
        <div className={`bg-cmwhite shadow-sm ${className} `} style={{fontSize: '14px', ...style}}>
            {/* Heading */}
            <div className='d-flex justify-content-between mb-5'>
                <div className=''>
                    <div
                        className='text-cmGrey900'
                        style={{fontSize: 34, fontWeight: 700, lineHeight: '46.5px'}}
                    >
                        6
                    </div>
                    <div
                        className='text-cmGrey600'
                        style={{fontSize: 16, fontWeight: 500, lineHeight: '30px'}}
                    >
                        Clients
                    </div>
                </div>
                <div className='vr my-5' />
                <div className=''>
                    <div
                        className='text-cmGrey900'
                        style={{fontSize: 34, fontWeight: 700, lineHeight: '46.5px'}}
                    >
                        8000
                    </div>
                    <div
                        className='text-cmGrey600'
                        style={{fontSize: 16, fontWeight: 500, lineHeight: '30px'}}
                    >
                        Users
                    </div>
                </div>
            </div>
            <div className='symbol-group symbol-hover flex-nowrap my-10'>
                {items.map((item, index) => (
                    <div
                        className='symbol symbol-35px symbol-circle'
                        data-bs-toggle='tooltip'
                        title={item.name}
                        key={`cw7-item-${index}`}
                    >
                        {item.src && <CustomImage alt='Pic' src={item.src} />}
                        {item.state && item.initials && (
                            <span
                                className={clsx(
                                    'symbol-label fw-bold',
                                    'bg-' + item.state,
                                    'text-inverse-' + item.state
                                )}
                            >
                                {item.initials}
                            </span>
                        )}
                    </div>
                ))}

                <a href='#' className='symbol symbol-35px symbol-circle'>
                    <span
                        className={clsx(
                            'symbol-label fs-8 fw-bold',
                            'bg-' + 'cmError',
                            'text-' + 'cmwhite'
                        )}
                    >
                        +42
                    </span>
                </a>
            </div>

            <CustomButton buttonLabel='Add New' buttonSize={BUTTON_SIZE.small} />
        </div>
    )
}

export default ClientandUsersCard
