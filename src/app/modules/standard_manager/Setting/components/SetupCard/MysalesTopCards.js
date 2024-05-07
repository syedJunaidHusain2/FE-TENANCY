const MysalesTopCards = ({
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
        className={`card card-flush ${className} border py-8 ps-5 shadow-sm`}
        style={{
            background: background,
        }}
    >
        <div style={{color: '#212121', fontFamily: 'Manrope', fontWeight: '700'}}>{heading}</div>
        <div
            style={{
                color: '#424242',
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
export {MysalesTopCards}
