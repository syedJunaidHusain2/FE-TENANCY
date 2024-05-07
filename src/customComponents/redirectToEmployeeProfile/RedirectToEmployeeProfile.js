import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {isUserManagerSelector, isUserSuperAdminSelector} from '../../redux/selectors/AuthSelectors'

const RedirectToEmployeeProfile = ({
    employeeId = null,
    children,
    underline = true,
    className = null,
    style = null,
    target = '_self',
}) => {
    const isSuperAdmin = useSelector(isUserSuperAdminSelector)
    const isManager = useSelector(isUserManagerSelector)

    const hasAccess = employeeId && (isSuperAdmin || isManager)
    return (
        <Link
            to={hasAccess ? `/user/personal-info?employeeId=${employeeId}` : ''}
            target={''}
            state={{
                employee_id: employeeId,
            }}
            style={{
                pointerEvents: hasAccess ? 'auto' : 'none',
            }}
        >
            <span
                className={`${hasAccess ? 'cursor-pointer' : ''} text-cmGrey800 d-flex align-items-center ${className}`}
                style={{
                    fontWeight: 700,
                    ...(hasAccess && underline ? {textDecoration: 'underline'} : null),
                    ...style, 
                }}
            >
                {children}
            </span>
        </Link>
    )
}

export default RedirectToEmployeeProfile
