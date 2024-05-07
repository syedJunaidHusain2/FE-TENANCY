import ReactQuill from 'react-quill'
import QuillToolbar, {modules, formats} from './QuillToolbar'
import './styles.css'
import 'react-quill/dist/quill.snow.css'

const QuillEditor = ({value, setValue, placeholder, style, quillRef = null}) => {
    // let myRef = useRef(quillRef)

    return (
        <>
            <div className='text-editor'>
                <QuillToolbar />
                <ReactQuill
                    className=''
                    ref={quillRef}
                    theme={'snow'}
                    style={style}
                    onChange={setValue}
                    value={value}
                    modules={modules}
                    formats={formats}
                    bounds={'.editor-container'}
                    placeholder={placeholder}
                />
            </div>
        </>
    )
}

export default QuillEditor
