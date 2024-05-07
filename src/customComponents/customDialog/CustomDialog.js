import {confirmDialog} from 'primereact/confirmdialog' // To use confirmDialog method
import 'primereact/confirmdialog'

const CustomDialog = {
    warn: (title = 'Are you sure ?', onAcceptPress = () => {}, onRejectPress = () => {}) => {
        confirmDialog({
            header: 'Confirmation',
            message: title,
            icon: 'pi pi-exclamation-triangle',
            accept: onAcceptPress,
            reject: onRejectPress,
            closable: false,
            appendTo: document.body,
            style: {zIndex: 10000},
        })
    },
    confirm: (title = 'Are you sure ?', onAcceptPress = () => {}, onRejectPress = () => {}) => {
        confirmDialog({
            header: 'Confirmation',
            message: title,
            icon: 'pi pi-exclamation-triangle',
            accept: onAcceptPress,
            reject: onRejectPress,
            closable: false,
            appendTo: document.body,
            style: {zIndex: 10000},
        })
    },
}

export default CustomDialog
