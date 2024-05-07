import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CustomToastContainer = () => {
    return (
        <ToastContainer
            position='top-right'
            autoClose={2000}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
        />
    )
}
export default CustomToastContainer
