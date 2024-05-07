import {useState} from 'react'
import {getDefaultImage, getServerImage, IMAGE_TYPE} from '../../helpers/CommonHelpers'

const CustomImage = ({
    src = null,
    customSrc = null,
    type = IMAGE_TYPE.userAvatar,
    className = null,
    alt = 'Sequifi',
    style = null,
    showImageError = true,
    objectFit = 'cover',
}) => {
    const [isImageBroken, setIsImageBroken] = useState(false)
    const onImageError = (e) => {
        if (!isImageBroken) setIsImageBroken(true)
    }

    return (
        <img
            {...(showImageError
                ? {onError: (e) => (showImageError ? onImageError(e) : null)}
                : null)}
            alt= {alt}
            className={className}
            src={
                isImageBroken
                    ? getDefaultImage(type)
                    : customSrc
                    ? customSrc
                    : src
                    ? getServerImage(src, type)
                    : getDefaultImage(type)
            }
            style={{
                objectFit: objectFit,
                ...style,
            }}
        />
    )
}

export default CustomImage
