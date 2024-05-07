const OfficeReportCards = ({
    className,
    description,
    icon,
    stats,
    labelColor,
    textColor,
    borderColor,
    background,
    heading,
    smallTitle,
    content,
}) => (
    <div
        className={`card card-flush ${className} border py-8 px-5  w-100`}
        style={{
            background: background,
        }}
    >
        <div
            style={{fontFamily: 'Manrope', fontWeight: '700', fontSize: '20px'}}
            className='text-cmGrey900'
        >
            {heading}
            <span
                className='badge ms-1 px-3 rounded-pill text-cmBlue-Crayola bg-cmBlue-Crayola bg-opacity-10'
                style={{
                    fontSize: '12px',
                    fontWeight: '600',
                }}
            >
                {smallTitle}
            </span>
        </div>
        <div
            className='text-cmGrey800'
            style={{
                fontFamily: 'Manrope',
                fontWeight: '600',
                fontSize: '14px',
            }}
        >
            {content}
        </div>
    </div>
)
export {OfficeReportCards}
