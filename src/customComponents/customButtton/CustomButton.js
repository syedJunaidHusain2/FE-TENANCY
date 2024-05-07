import React, {useMemo} from 'react'
import {Button} from 'primereact/button'
import {fontsFamily} from '../../assets/fonts/fonts'

export const BUTTON_TYPE = {
    primary: 'primary',
    secondary: 'secondary',
    link: 'link',
    success: 'success',
    error: 'error',
    disabled: 'disabled',
    disabledBorder: 'disabledBorder',
    primaryBorder: 'primaryBorder',
    secondaryBorder: 'secondaryBorder',
    successBorder: 'successBorder',
    greyText: 'greyText',
}

export const BUTTON_SIZE = {
    small: 'h-sm-40px min-w-sm-110px',
    normal: 'h-sm-40px min-w-sm-180px',
    large: 'h-sm-45px min-w-sm-225px',
}

const CustomButton = ({
    buttonLabel = '',
    type = 'button',
    buttonType = BUTTON_TYPE.primary,
    buttonSize = null,
    disabled,
    className,
    onlyIcon = true,
    icon = null,
    iconPosition = 'left',
    loading = false,
    onClick,
    style,
    width = null,
    padding = null,
    children = null,
}) => {
    const buttonUiType = useMemo(() => {
        switch (buttonType) {
            case BUTTON_TYPE.primary:
                return {
                    textColor: 'text-cmwhite',
                    className: 'bg-cmBlue-Crayola border-0 ',
                    style: {
                        fontSize: [BUTTON_SIZE.normal, BUTTON_SIZE.large].includes(buttonSize)
                            ? '16px'
                            : '14px',
                    },
                }
            case BUTTON_TYPE.primaryBorder:
                return {
                    textColor: 'text-cmBlue-Crayola',
                    className: 'bg-white',
                    style: {
                        fontSize: [BUTTON_SIZE.normal, BUTTON_SIZE.large].includes(buttonSize)
                            ? '16px'
                            : '14px',
                    },
                    outlined: true,
                }
            case BUTTON_TYPE.link:
                return {
                    textColor: 'text-cmBlue-Crayola',
                    className: 'text-cmBlue-Crayola m-0 p-0',
                    style: {
                        fontSize: [BUTTON_SIZE.normal, BUTTON_SIZE.large].includes(buttonSize)
                            ? '16px'
                            : '14px',
                        textDecoration: 'underline',
                    },
                    link: true,
                }
            case BUTTON_TYPE.secondary:
                return {
                    textColor: 'text-cmBlue-Crayola',
                    className: 'bg-cmBlue-Crayola bg-opacity-10 text-cmBlue-Crayola border-0',
                    style: {
                        fontSize: [BUTTON_SIZE.normal, BUTTON_SIZE.large].includes(buttonSize)
                            ? '16px'
                            : '14px',
                    },
                }
            case BUTTON_TYPE.secondaryBorder:
                return {
                    textColor: 'text-cmBlue-Crayola',
                    className: 'bg-cmBlue-Crayola bg-opacity-10 text-cmBlue-Crayola border-2 ',
                    style: {
                        fontSize: [BUTTON_SIZE.normal, BUTTON_SIZE.large].includes(buttonSize)
                            ? '16px'
                            : '14px',
                    },
                    outlined: true,
                }
            case BUTTON_TYPE.disabled:
                return {
                    textColor: 'text-cmGrey700',
                    className: 'bg-cmGrey200  border-0',
                    style: {
                        fontSize: [BUTTON_SIZE.normal, BUTTON_SIZE.large].includes(buttonSize)
                            ? '16px'
                            : '14px',
                    },
                }
            case BUTTON_TYPE.disabledBorder:
                return {
                    textColor: 'text-cmGrey700',
                    className: ' border border-cmGrey600 bg-transparent',
                    style: {
                        fontSize: [BUTTON_SIZE.normal, BUTTON_SIZE.large].includes(buttonSize)
                            ? '16px'
                            : '14px',
                    },
                }
            case BUTTON_TYPE.greyText:
                return {
                    textColor: 'text-cmGrey700',
                    className: 'bg-transparent border-0 ',
                    style: {
                        fontSize: [BUTTON_SIZE.normal, BUTTON_SIZE.large].includes(buttonSize)
                            ? '16px'
                            : '14px',
                    },
                }
            case BUTTON_TYPE.success:
                return {
                    textColor: 'text-cmSuccess',
                    className: 'bg-cmSuccess bg-opacity-10 text-cmSuccess border-0',
                    style: {
                        fontSize: [BUTTON_SIZE.normal, BUTTON_SIZE.large].includes(buttonSize)
                            ? '16px'
                            : '14px',
                    },
                }
            case BUTTON_TYPE.successBorder:
                return {
                    textColor: 'text-cmSuccess',
                    className: 'bg-cmSuccess bg-opacity-10 text-cmSuccess border-0 ',
                    style: {
                        fontSize: [BUTTON_SIZE.normal, BUTTON_SIZE.large].includes(buttonSize)
                            ? '16px'
                            : '14px',
                    },
                }
            case BUTTON_TYPE.error:
                return {
                    textColor: 'text-cmError',
                    className: 'bg-cmError bg-opacity-10  border-0',
                    style: {
                        fontSize: [BUTTON_SIZE.normal, BUTTON_SIZE.large].includes(buttonSize)
                            ? '16px'
                            : '14px',
                    },
                }
            default:
                return {
                    textColor: 'text-cmwhite',
                    className: 'bg-cmBlue-Crayola  border-0',
                    style: {
                        fontSize: [BUTTON_SIZE.normal, BUTTON_SIZE.large].includes(buttonSize)
                            ? '16px'
                            : '14px',
                    },
                }
        }
    }, [buttonSize, buttonType])

    return (
        <div>
            <Button
                type={type}
                loading={loading}
                disabled={disabled}
                link={buttonUiType?.link ?? false}
                iconPos={iconPosition}
                onClick={onClick}
                className={`${buttonUiType.className} ${
                    buttonUiType.textColor
                } d-flex flex-center gap-3 text-center mx-auto w-sm-${
                    width ?? 'auto'
                } ${buttonSize} `}
                style={{
                    ...buttonUiType.style,
                    fontFamily: fontsFamily.manrope,
                    fontWeight: '700',
                    borderRadius: '7px',

                    ...style,
                }}
            >
                {icon ? <i className={` ${buttonUiType.textColor} ${icon}`} /> : null}
                <span>{buttonLabel}</span>
            </Button>
        </div>
    )
}

export default CustomButton
