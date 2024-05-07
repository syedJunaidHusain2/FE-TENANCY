const HiringProgressCards = ({
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
        className={`card card-flush ${className} border py-8 ps-5 shadow-sm w-sm-225px w-100`}
        style={{
            background: background,
        }}
    >
        <div
            className='text-cmGrey900'
            style={{fontFamily: 'Manrope', fontWeight: '700', fontSize: '20px'}}
        >
            {heading}
        </div>
        <div
            className='text-cmGrey900'
            style={{
                fontFamily: 'Manrope',
                fontWeight: '600',
                fontStyle: 'normal',
                fontSize: '14px',
            }}
        >
            {content}
        </div>
    </div>
)
export {HiringProgressCards}
