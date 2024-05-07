import {useRef} from 'react'
import Lottie from 'lottie-react'

const CustomLottie = ({
    lottieJson = null,
    height = null,
    width = null,
    autoPlay = true,
    loop = false,
    style = null,
}) => {
    const lottieRef = useRef(null)
    return lottieJson ? (
        <Lottie
            lottieRef={lottieRef}
            animationData={lottieJson}
            loop={loop}
            autoplay={autoPlay}
            style={{
                padding: 0,
                margin: 0,
                height: height,
                width: width,
                ...style,
            }}
        />
    ) : null
}

export default CustomLottie
