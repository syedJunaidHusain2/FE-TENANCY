import {fontsFamily} from '../../assets/fonts/fonts'

const CustomText = ({children, fontFamily = fontsFamily.manrope}) => {
    return <span style={{fontFamily: fontFamily}}>{children}</span>
}

export default CustomText
