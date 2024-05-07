/* eslint-disable react/jsx-no-target-blank */
import {KTSVG} from '../../../helpers'
import Logo2 from './../../../../app/modules/admin/Setting/Icon/3.png'
import Logo from './../../../../app/modules/admin/Setting/Icon/5.png'
import Logo3 from './../../../../app/modules/admin/Setting/Icon/4.png'
import sequifiIcon from '../../../../assets/images/sequifiIcon.svg'
import {useLayout} from '../../core'
import CustomImage from '../../../../customComponents/customImage/CustomImage'

const SidebarFooter = () => {
    const {config} = useLayout()
    const appSidebarDefaultMinimizeDesktopEnabled =
        config?.app?.sidebar?.default?.minimize?.desktop?.enabled
    const appSidebarDefaultCollapseDesktopEnabled =
        config?.app?.sidebar?.default?.collapse?.desktop?.enabled
    const toggleType = appSidebarDefaultCollapseDesktopEnabled
        ? 'collapse'
        : appSidebarDefaultMinimizeDesktopEnabled
        ? 'minimize'
        : ''
    const toggleState = appSidebarDefaultMinimizeDesktopEnabled ? 'active' : ''
    const appSidebarDefaultMinimizeDefault =
        config.app?.sidebar?.default?.minimize?.desktop?.default
    return (
        <div className='app-sidebar-footer flex-column pt-2 pb-6 px-6 ' id='kt_app_sidebar_footer'>
            <div
                className='d-sm-block d-none app-sidebar-logo flex-column-auto pb-6 mb-5'
                id='kt_app_sidebar_logo'
                style={{border: 'none'}}
            >
                <div className='text-center mx-auto text-cmGrey600'>
                    <span
                        className='app-sidebar-logo-default'
                        style={{fontWeight: '600', fontFamily: 'Manrope', fontSize: '12px'}}
                    >
                        Powered by
                    </span>

                    <span className='app-sidebar-logo-default'>
                        <KTSVG
                            path='/media/icons/duotune/art/Sequifi-logo-with-text-inline.svg'
                            className='cursor-pointer'
                            svgClassName='w-100px h-30px'
                        />
                    </span>

                    {/* <img
                        className='app-sidebar-logo-default'
                        style={{width: '75px', height: '75px'}}
                        src={sequifiIcon}
                        alt=''
                    ></img> */}

                    <img
                        className='app-sidebar-logo-minimize '
                        style={{width: '60px', height: '60px'}}
                        src={sequifiIcon}
                        alt=''
                    ></img>

                    <div
                        className='app-sidebar-logo-default'
                        style={{fontWeight: '600', fontFamily: 'Manrope', fontSize: '12px'}}
                    >
                        Don't Simplify, Just Sequifi it!
                    </div>
                </div>
            </div>
            <div className='text-center d-sm-none d-block text-cmGrey600'>
                <div className=''>
                    <span
                        className=''
                        style={{fontWeight: '600', fontFamily: 'Manrope', fontSize: '12px'}}
                    >
                        Powered by
                    </span>

                    <img
                        className=''
                        style={{width: '60px', height: '60px'}}
                        src={sequifiIcon}
                        alt=''
                    ></img>

                    <div
                        className=''
                        style={{fontWeight: '600', fontFamily: 'Manrope', fontSize: '12px'}}
                    >
                        Don't Simplify, Just Sequifi it!
                    </div>
                </div>
            </div>
        </div>
        //
        // <div
        //     className='app-sidebar-footer flex-column-auto pt-2 pb-6 px-6'
        //     id='kt_app_sidebar_footer'
        // >
        //     <a
        //         href={process.env.REACT_APP_PREVIEW_DOCS_URL}
        //         target='_blank'
        //         className='btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100'
        //         data-bs-toggle='tooltip'
        //         data-bs-trigger='hover'
        //         data-bs-dismiss-='click'
        //         title='Metronic Docs & Components'
        //     >
        //         <span className=' text-cmBlack '>Docs & Components</span>
        //         <KTSVG
        //             path='/media/icons/duotune/general/gen005.svg'
        //             className='btn-icon svg-icon-2 m-0'
        //         />
        //     </a>
        // </div>
    )
}

export {SidebarFooter}
