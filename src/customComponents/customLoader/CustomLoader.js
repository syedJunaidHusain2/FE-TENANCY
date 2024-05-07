import {memo, useMemo} from 'react'
import lottieFiles from '../../assets/lottieAnimation/lottieFiles'
import CustomLottie from '../customLottie/CustomLottie'

const CustomLoader = ({
    style = null,
    visible = false,
    full = false,
    opacity = 0.9,
    size = 70,
    loaderPosition = 'center',
}) => {
    const position = useMemo(() => {
        switch (loaderPosition) {
            case 'top':
                return 'flex-start'
            case 'bottom':
                return 'flex-start'
            default:
                return 'center'
        }
    }, [loaderPosition])
    return (
        visible && (
            <>
                {full ? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: position,
                            justifyContent: 'center',
                            paddingRight: 15,
                            paddingLeft: 15,
                            backgroundColor: `rgba(255,255,255,${opacity})`,
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            left: 0,
                            zIndex: 100,
                            // height: '100%',
                            // width: '100%',
                            ...style,
                        }}
                    >
                        <CustomLottie
                            loop
                            lottieJson={lottieFiles.loader}
                            height={size}
                            width={size}
                        />
                    </div>
                ) : (
                    <div
                        style={{
                            padding: 20,
                            paddingLeft: 30,
                            paddingRight: 30,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...(full && {
                                height: size,
                                width: size,
                            }),
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingRight: 15,
                                paddingLeft: 15,
                                position: 'absolute',
                                zIndex: 100,
                                height: '100%',
                                width: '100%',
                                ...style,
                            }}
                        >
                            <CustomLottie
                                loop
                                lottieJson={lottieFiles.loader}
                                height={size}
                                width={size}
                            />
                        </div>
                    </div>
                )}
            </>
        )
    )
}

export default memo(CustomLoader)
