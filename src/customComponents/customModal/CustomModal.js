import {Dialog} from 'primereact/dialog'
import React from 'react'
import {fontsFamily} from '../../assets/fonts/fonts'

const CustomModal = ({
    id = null,
    children,
    show,
    onShow = null,
    onHide,
    title,
    showHeader = true,
    footerComponent = null,
    fullScreen = false,
    borderRadius = 15,
    maxWidth = '750',
    borderColor = null,
    zIndex = 0,
    showline = true,
    className = null,
    backgroundColor = 'cmwhite',
    showClose = true,
    style = null,
}) => {
    return (
        <Dialog
            onShow={onShow}
            id={id}
            contentClassName={`bg-${backgroundColor}`}
            className={`mw-${maxWidth}px w-100 mx-auto p-0 m-0 ${
                borderColor ? 'border' : null
            } border-${borderColor} border-1 ${className}`}
            style={{
                borderRadius: borderRadius,
                padding: 0,
                margin: 0,
                fontFamily: fontsFamily.manrope,
                ...style,
            }}
            visible={show}
            maximized={fullScreen}
            onHide={onHide}
            closable={false}
            closeOnEscape
            headerStyle={{
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius,
            }}
            contentStyle={{
                position: 'relative',
                borderBottomLeftRadius: borderRadius,
                borderBottomRightRadius: borderRadius,
            }}
            baseZIndex={zIndex}
            modal
            blockScroll={true}
            header={() =>
                showHeader ? (
                    <div className='w-100 m-0 p-0' style={{fontFamily: fontsFamily.manrope}}>
                        <div className='d-flex justify-content-between align-items-center ps-10 pe-5 py-2'>
                            <div
                                style={{
                                    fontSize: '16px',
                                    color: '#0D1821',
                                    fontWeight: '700',
                                }}
                            >
                                {title}
                            </div>
                            {showClose ? (
                                <div
                                    className={`bi bi-x-circle text-${
                                        borderColor ?? 'cmGrey800'
                                    } fs-1 p-0 m-0 cursor-pointer text-hover-danger`}
                                    onClick={onHide}
                                />
                            ) : (
                                <div></div>
                            )}
                        </div>
                        {showline ? <hr className='mt-0 mb-5 text-cmGrey900' /> : null}
                    </div>
                ) : (
                    false
                )
            }
            headerClassName={`bg-${backgroundColor} ${showHeader ? 'p-0 m-0' : 'p-4'}`}
        >
            {children}
        </Dialog>
    )
}

export default CustomModal
