import {memo} from 'react'
import lottieFiles from '../../../assets/lottieAnimation/lottieFiles'
import CustomLottie from '../../customLottie/CustomLottie'

const CustomToggle = ({value}) => {
    return (
        <div>
            <CustomLottie
                loop
                lottieJson={lottieFiles.toggle}
                width={60}
                style={{backgroundColor: 'red'}}
            />
        </div>
    )
}

export default memo(CustomToggle)
