import {Quill} from 'react-quill'
import htmlEditButton from 'quill-html-edit-button'
import './styles.css'

import BlotFormatter, {
    AlignAction,
    DeleteAction,
    ImageSpec,
    ResizeAction,
} from 'quill-blot-formatter'

Quill.register('modules/htmlEditButton', htmlEditButton)
Quill.register('modules/blotFormatter', BlotFormatter)
class CustomImageSpec extends ImageSpec {
    getActions() {
        return [AlignAction, DeleteAction, ResizeAction]
    }
}

// For Toolbar
const alignClass = Quill.import('attributors/style/align')
const backgroundClass = Quill.import('attributors/style/background')
const colorClass = Quill.import('attributors/style/color')
const directionClass = Quill.import('attributors/style/direction')
const fontClass = Quill.import('attributors/style/font')
const sizeClass = Quill.import('attributors/style/size')

Quill.register(alignClass, true)
Quill.register(backgroundClass, true)
Quill.register(colorClass, true)
Quill.register(directionClass, true)
Quill.register(fontClass, true)
Quill.register(sizeClass, true)

// Add fonts to whitelist
let Font = Quill.import('formats/font')
// We do not add Aref Ruqaa since it is the default
Font.whitelist = [
    'Aref Ruqaa',
    'Times New Romance',
    'Calibri Light',
    'Helvetica Infanity',
    'Raleway',
    'Macondo',
    'Roboto',
]
Quill.register(Font, true)

// Add sizes to whitelist and register them
// 'impact', 'courier', 'comic'
const Size = Quill.import('formats/size')
Size.whitelist = [
    '8px',
    '10px',
    '12px',
    '13px',
    '14px',
    '15px',
    '16px',
    '17px',
    '18px',
    '19px',
    '20px',
    '21px',
    '22px',
    '23px',
    '24px',
]
Quill.register(Size, true)
//  Quill modules to attach to editor
//       See https://quilljs.com/docs/modules/ for complete options

export const modules = {
    toolbar: {
        container: '#toolbar',
        handlers: {},
    },

    blotFormatter: {
        specs: [CustomImageSpec],
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
    },
    htmlEditButton: {
        debug: true,
        syntax: false,
    },
}

// Formats objects for setting up the Quill editor
export const formats = [
    'header',
    'font',
    'size',
    'bold',
    'alt',
    'width',
    'height',
    'style',
    'imagewithstyle',
    'italic',
    'underline',
    'align',
    'strike',
    'script',
    'blockquote',
    'background',
    'list',
    'bullet',
    'indent',
    'image',
    'color',
    'code-block',
]

// Quill Toolbar component
export const QuillToolbar = () => (
    <div id='toolbar'>
        <span className='ql-formats'>
            <select className='ql-size w-50px' defaultValue='14px'>
                <option value='8px'>8</option>
                <option value='9px'>9</option>
                <option value='10px'>10</option>
                <option value='11px'>11</option>
                <option value='12px'>12</option>
                <option value='13px'>13</option>
                <option value='14px'>14</option>
                <option value='15px'>15</option>
                <option value='16px'>16</option>
                <option value='17px'>17</option>
                <option value='18px'>18</option>
                <option value='19px'>19</option>
                <option value='20px'>20</option>
                <option value='21px'>21</option>
                <option value='22px'>22</option>
                <option value='23px'>23</option>
                <option value='24px'>24</option>
            </select>
            <select className='ql-font w-150px'>
                <option selected value={'Aref Ruqaa'}>
                    Aref Ruqaa
                </option>
                <option value='Times New Romance'>Times New Romance</option>
                <option value='Calibri Light'>Calibri Light</option>
                <option value='Helvetica Infanity'>Helvetica Infanity</option>
                <option value='Raleway'>Raleway</option>
                <option value='Macondo'>Macondo</option>
                <option value='Roboto'>Roboto</option>
            </select>
            <select className='ql-header' defaultValue='3'>
                <option value='1'>Heading</option>
                <option value='2'>Subheading</option>
                <option value='3'>Normal</option>
            </select>
        </span>
        <span className='ql-formats'>
            <button className='ql-bold' />
            <button className='ql-italic' />
            <button className='ql-underline' />
            <button className='ql-strike' />
        </span>
        <span className='ql-formats'>
            <button className='ql-list' value='ordered' />
            <button className='ql-list' value='bullet' />
        </span>

        <span className='ql-formats'>
            <select className='ql-align' />
            <select className='ql-color' />
            <select className='ql-background' />
        </span>
        <span className='ql-formats'>
            {/* <button className='ql-link' /> */}
            <button className='ql-image' />
        </span>
        {/* <span className='ql-formats'>
            <button className='ql-code-block' />
        </span> */}
    </div>
)

export default QuillToolbar
