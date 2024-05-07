import {sendDataToReducer} from '../../helpers/CommonHelpers'
import {getSequiDocsTemplateCategoriesService} from '../../services/Services'
import {SET_TEMPLATE_CATEGORIES} from '../reducers/SequiDocsReducer'

// Get Sequi Docs Template Categories
export const getSequiDocsTemplateCategoriesAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getSequiDocsTemplateCategoriesService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_TEMPLATE_CATEGORIES, res?.data)
                resolve(res?.data)
            })
            .catch(reject)
    })
