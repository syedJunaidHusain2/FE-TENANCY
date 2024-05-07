/* eslint-disable import/no-anonymous-default-export */
import {TEMPLATE_DYNAMIC_FIELDS} from '../../../../constants/constants'
export default (editor) => {
    return (
        <>
            {Object.keys(TEMPLATE_DYNAMIC_FIELDS).map((item, i) => {
                return editor.BlockManager.add(`content-link-${i}`, {
                    label: TEMPLATE_DYNAMIC_FIELDS[item]?.key,
                    category: 'Important Fields',
                    content: CustomContent(item, i),
                })
            })}
        </>
    )
}

const CustomContent = (item, index) => {
    if (TEMPLATE_DYNAMIC_FIELDS[item]?.key == TEMPLATE_DYNAMIC_FIELDS.company_logo.key) {
        return `<img src="[Company_Logo]" width="200" border="0" />`
    } else {
        return `<strong>[${TEMPLATE_DYNAMIC_FIELDS[item]?.key}] </strong>`
    }
}
