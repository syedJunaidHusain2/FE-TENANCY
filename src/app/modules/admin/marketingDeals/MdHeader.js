/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

const MdHeader = () => {
    const location = useLocation()

    return (
        <div className='' style={{marginTop: '-20px'}}>
            <div className='d-flex justify-content-between overflow-auto '>
                <ul
                    style={{
                        fontFamily: 'Manrope',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                    className=' w-100 nav nav-stretch flex-nowrap text-cmGrey500'
                >
                    <li
                        className={
                            location.pathname === '/marketing-deal/md-list' && 'active'
                                ? 'nav-item bg-cmwhite'
                                : 'border border-2 border-cmGrey100 nav-item bg-cmwhite'
                        }
                        style={{
                            height: '46px',
                            width: '138px',
                            borderBottom: '0px',
                            borderRadius: '10px',
                            borderBottomLeftRadius: '0px',
                            borderBottomRightRadius: '0px',
                        }}
                    >
                        <Link
                            className={
                                `nav-link` +
                                (location.pathname === '/marketing-deal/md-list' && 'active')
                            }
                            to='/marketing-deal/md-list'
                        >
                            {' '}
                            <label
                                className={
                                    location.pathname === '/marketing-deal/md-list' && 'active'
                                        ? 'text-cmBlue-Crayola ms-3 mt-3 cursor-pointer'
                                        : 'text-cmGrey500 ms-3 mt-3 cursor-pointer'
                                }
                                style={{
                                    // color:
                                    // location.pathname === '/hiring/hiring-process' && 'active'
                                    //   ? '#6078EC'
                                    //   : '#9E9E9E',
                                    fontSize: '16px',
                                }}
                            >
                                Marketing Deal
                            </label>
                        </Link>
                    </li>
                    <li
                        className={
                            location.pathname === '/marketing-deal/cost-tracking' && 'active'
                                ? 'nav-item bg-cmwhite ms-7'
                                : 'bg-cmwhite bg-opacity-60 nav-item ms-7 bg-cmwhite'
                        }
                        style={{
                            height: '46px',
                            width: '138px',
                            borderBottom: '0px',
                            borderRadius: '10px',
                            borderBottomLeftRadius: '0px',
                            borderBottomRightRadius: '0px',
                        }}
                    >
                        <Link
                            className={` ${
                                location.pathname === '/marketing-deal/cost-trackingt' && 'active'
                            }`}
                            to='/marketing-deal/cost-tracking'
                        >
                            {' '}
                            <label
                                className={
                                    location.pathname === '/marketing-deal/cost-tracking' &&
                                    'active'
                                        ? 'text-cmBlue-Crayola ms-3 mt-3 cursor-pointer'
                                        : 'text-cmGrey500 ms-3 mt-3 cursor-pointer'
                                }
                                style={{
                                    // color:
                                    // location.pathname === '/hiring/hiring-process' && 'active'
                                    //   ? '#6078EC'
                                    //   : '#9E9E9E',
                                    fontSize: '16px',
                                }}
                            >
                                Cost Tracking
                            </label>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export {MdHeader}
