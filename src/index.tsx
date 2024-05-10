//theme
import 'primereact/resources/themes/lara-light-indigo/theme.css'

//core
import 'primereact/resources/primereact.min.css'

//icons
import 'primeicons/primeicons.css'

import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
// Apps
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import {AppRoutes} from './routing/AppRoutes'
import {AuthProvider, setupAxios} from './app/modules/admin/auth'
import {store} from './redux/store'
import {Provider} from 'react-redux'
import oneSignal from './onesignal/oneSignal'
import PreLoadPage from './app/PreLoadPage'
import {pdfjs as reactPdf} from 'react-pdf'
import * as pdfjs from 'pdfjs-dist'
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${reactPdf.version}/pdf.worker.js` 

/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios)
Chart.register(...registerables)
// oneSignal.init()

const container = document.getElementById('root')

const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()

if (container) {
    createRoot(container).render(
        <Provider store={store}>
            <PreLoadPage >
                    <MetronicI18nProvider>
                        <AuthProvider>
                            <AppRoutes />
                        </AuthProvider>
                    </MetronicI18nProvider>
            </PreLoadPage>
        </Provider>
    )
}
