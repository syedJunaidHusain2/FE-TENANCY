import {Tooltip} from '@mui/material'

const CustomTooltip = ({title = '', style, children, className}) => {
    return children ? (
        <Tooltip
            arrow
            title={
                <span className={className} style={{fontSize: 14, ...style}}>
                    {title}
                </span>
            }
            style={{fontSize: 40}}
        >
            {children}
        </Tooltip>
    ) : null
}

export default CustomTooltip
