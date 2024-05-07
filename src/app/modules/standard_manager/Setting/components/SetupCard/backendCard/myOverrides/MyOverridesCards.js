const MyOverridesCards = ({
    className,
    description,
    icon,
    stats,
    labelColor,
    textColor,
    borderColor,
    background,
    heading,
    content,
}) => (
    <div
        className={`${className} border py-5 ps-5 shadow-sm border border-0`}
        style={{backgroundColor: background, borderRadius: '10px'}}
    >
        <div
            className='text-cmGrey900'
            style={{fontSize: '28px', fontFamily: 'Manrope', fontWeight: '700'}}
        >
            {heading}
        </div>
        <div
            style={{
                fontFamily: 'Manrope',
                fontWeight: '600',
                fontSize: '14px',
            }}
            className='text-cmGrey800'
        >
            {content}
        </div>
    </div>
)
export {MyOverridesCards}
