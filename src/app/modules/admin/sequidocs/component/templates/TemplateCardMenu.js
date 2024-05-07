export function TemplateCardMenu() {
    return (
        <div
            className='bg-cmwhite shadow-sm w-100px shadow'
            // data-kt-menu='true'
            style={{borderRadius: '10px'}}
        >
            <div className='text-center'>
                <div className='p-2 bg-hover-cmBlue-Crayola bg-opacity-10 text-hover-white'>
                    Use
                </div>
                <hr className='m-0' />
                <div className='p-2 bg-hover-cmBlue-Crayola bg-opacity-10 text-hover-white'>
                    Assign
                </div>
                <hr className='m-0' />
                <div className='p-2 bg-hover-cmBlue-Crayola bg-opacity-10 text-hover-white'>
                    Delete
                </div>
            </div>
        </div>
    )
}
