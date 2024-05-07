import {toast} from 'react-toastify'
const CustomToast = {
    success: (content = '') => (content ? toast.success(content) : null),
    error: (content = '') => (content ? toast.error(content) : null),
    info: (content = '') => (content ? toast.info(content) : null),
    warn: (content = '') => (content ? toast.warn(content) : null),
}

export default CustomToast
