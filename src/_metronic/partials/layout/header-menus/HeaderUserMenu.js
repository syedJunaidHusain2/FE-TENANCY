/* eslint-disable jsx-a11y/anchor-is-valid */
import {useCallback} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logoutAction} from '../../../../redux/actions/AuthActions'
import {getUserDataSelector} from '../../../../redux/selectors/AuthSelectors'
import CustomImage from '../../../../customComponents/customImage/CustomImage'
import {confirmDialog, ConfirmDialog} from 'primereact/confirmdialog'
import {forgotPasswordService} from '../../../../services/Services'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import CustomToast from '../../../../customComponents/customToast/CustomToast'
import {getUserPositionMetaData} from '../../../../helpers/CommonHelpers'

const HeaderUserMenu = ({handleClose, open, anchorEl}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userData = useSelector(getUserDataSelector)
    const onLogoutPress = useCallback(() => {
        dispatch(logoutAction())
    }, [dispatch])

    const accept = () => {
        forgotPasswordService({email: userData?.email}).then(() => {
            CustomToast.success('Reset password link sent')
        })
    }

    const confirm1 = (event) => {
        confirmDialog({
            target: event.currentTarget,
            message: 'Are you sure you want to reset password?',
            icon: 'pi pi-exclamation-triangle',
            accept,
        })
    }
    return (
        <div className=''>
            <Menu
                id='account-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        borderRadius: 3,
                        padding: 0,
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        fontFamily: 'Manrope',
                        mt: 1.5,
                        marginTop: '53px',
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            top: '65x',
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem className='bg-white' style={{fontFamily: 'Manrope'}}>
                    <Link to={`user/personal-info?employeeId=${userData?.id}`}>
                        <div className='menu-item'>
                            <div className='menu-content d-flex align-items-center'>
                                <div className='symbol symbol-50px me-5'>
                                    <CustomImage
                                        style={{width: '42px', height: '42px', borderRadius: '50%'}}
                                        src={userData?.image}
                                    />
                                </div>

                                <div className='d-flex flex-column'>
                                    <div className='fw-bolder d-flex align-items-center fs-5'>
                                        {/* {currentUser?.first_name} {currentUser?.first_name} */}
                                        <b style={{fontSize: '14px'}} className='me-1'>
                                            {userData?.first_name} {userData?.last_name}
                                        </b>
                                    </div>
                                    <span className='fw-bold text-muted text-hover-primary fs-7'>
                                        {userData?.email}
                                    </span>
                                    <span
                                        className={`badge  mt-2 px-2 bg-${
                                            getUserPositionMetaData(userData)?.position_color
                                        } bg-opacity-10 text-${
                                            getUserPositionMetaData(userData)?.position_color
                                        }`}
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            width: 'fit-content',
                                        }}
                                    >
                                        {getUserPositionMetaData(userData)?.position_name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </MenuItem>
                <Divider />
                <MenuItem style={{fontFamily: 'Manrope'}}>
                    <div className='menu-item w-100'>
                        <Link
                            style={{color: 'black'}}
                            className='menu-link px-5'
                            to={`user/personal-info?employeeId=${userData?.id}`}
                            state={{
                                employee_id: userData?.id,
                            }}
                        >
                            <i style={{fontSize: '16px'}} className='bi bi-pencil-square me-3'></i>
                            View Profile
                        </Link>
                    </div>
                </MenuItem>
                <MenuItem style={{fontFamily: 'Manrope'}} onClick={confirm1}>
                    <div className='menu-item w-100'>
                        <a href='#' className='menu-link px-5'>
                            <span className='menu-title' style={{color: 'black'}}>
                                <i
                                    style={{fontSize: '15px'}}
                                    className='bi bi-person-circle me-4'
                                ></i>
                                Reset Password
                            </span>
                        </a>
                    </div>
                </MenuItem>
                <MenuItem style={{fontFamily: 'Manrope'}} onClick={() => onLogoutPress()}>
                    <div className='menu-item'>
                        <a style={{color: 'black'}} className='menu-link px-5'>
                            <i style={{fontSize: '17px'}} className='bi bi-box-arrow-left me-4'></i>
                            Logout
                        </a>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    )
}

export {HeaderUserMenu}
