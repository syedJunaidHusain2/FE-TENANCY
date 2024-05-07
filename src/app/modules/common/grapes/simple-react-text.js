/* eslint-disable import/no-anonymous-default-export */
import {TEMPLATE_DYNAMIC_FIELDS} from '../../../../constants/constants'
import Listing from './Listing'

export default (editor) => {
    editor.Components.addType('Listing', {
        extend: 'simple-react-text',
        model: {
            defaults: {
                component: Listing,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    mlsid: 'Default MLSID',
                    editable: true,
                },
                // traits: [
                //     {
                //         type: 'number',
                //         label: 'MLS ID',
                //         name: 'mlsid',
                //     },
                // ],
            },
        },
        isComponent: (el) => el.tagName === 'LISTING',
    })

    editor.BlockManager.add('listing', {
        label: '<div >Signature</div>',
        category: 'React Components sign',
        content: `<p style="padding: 25px;width:150px;height:70px;border:2px solid #8c8b8b;background-color:#c2c0c0"><i class="fas fa-bars"></i>Signature
          </p>`,
    })
}
