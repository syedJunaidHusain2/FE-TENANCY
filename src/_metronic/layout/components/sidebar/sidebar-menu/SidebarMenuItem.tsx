import {FC, useEffect, useState} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {checkIsActive, KTSVG, WithChildren} from '../../../../helpers'
import {useLayout} from '../../../core'
import {Badge} from 'primereact/badge'

type Props = {
    to: string
    title: string
    icon?: string
    fontIcon?: string
    hasBullet?: boolean
    badgeCount?: number
}

const SidebarMenuItem: FC<Props & WithChildren> = ({
    children,
    to,
    title,
    icon,
    fontIcon,
    hasBullet = false,
    badgeCount = 0,
}) => {
    const {pathname} = useLocation()
    const isActive = checkIsActive(pathname, to)
    const {config} = useLayout()
    const {app} = config
    const [flag, setFlag] = useState(false)


    useEffect(() => {
        setFlag((val) => !val)
    }, [pathname])

    const parentRoute = pathname?.split('/')?.[1]
    return (
        <div
            style={{fontSize: '16px', fontFamily: 'Manrope', color: '#757575', overflow: 'auto'}}
            className='menu-item mt-1 overflow-auto'
        >
            <Link
                style={{background: to.includes(parentRoute) ? '#E0E0E0' : ''}}
                className={clsx('menu-link without-sub', {active: isActive})}
                to={to}
            >
                {hasBullet && (
                    <span className='menu-bullet'>
                        <span className='bullet bullet-dot text-black'></span>
                    </span>
                )}
                {icon && app?.sidebar?.default?.menu?.iconType === 'svg' && (
                    <span className='menu-icon text-black'>
                        {' '}
                        <KTSVG
                            path={icon}
                            className={
                                to.includes(parentRoute)
                                    ? 'text-cmBlue-Crayola  svg-icon-2'
                                    : 'text-cmGrey700 svg-icon-2 '
                            }
                        />
                    </span>
                )}
                {fontIcon && app?.sidebar?.default?.menu?.iconType === 'font' && (
                    <i className={clsx('bi fs-3', fontIcon)}></i>
                )}
                <span
                    style={{
                        // color: to.includes(parentRoute) ? '#6078EC' : '#757575',
                        fontFamily: 'Manrope',
                        fontSize: '16px',
                        fontWeight: 600,
                    }}
                    className={
                        to.includes(parentRoute)
                            ? 'text-cmBlue-Crayola  menu-title text-nowrap'
                            : 'text-cmGrey700  menu-title text-nowrap'
                    }
                >
                    {title}
                </span>
                {badgeCount > 0 ? <Badge value={badgeCount} severity='danger'></Badge> : null}
            </Link>
            {children}
        </div>
    )
}

export {SidebarMenuItem}
