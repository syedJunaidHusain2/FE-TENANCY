import React, {useCallback, useRef} from 'react'
import {OverlayPanel} from 'primereact/overlaypanel'

const CustomOverlayPanel = ({templateData = null, showIcon = true, hovertemplate = null}) => {
    const overlayPanelRef = useRef(null)

    const onEnterButtonPress = useCallback((e) => {
        overlayPanelRef.current.toggle(e)
    }, [])

    const onLeaveButton = useCallback((e) => {
        overlayPanelRef?.current?.hide()
    }, [])

    return (
        <div className=''>
            <span
                className={`${showIcon ? 'bi bi-info-circle' : null} cursor-pointer`}
                // onClick={onEnterButtonPress}
                onMouseOver={onEnterButtonPress}
                onMouseLeave={onLeaveButton}
            >
                {hovertemplate}
            </span>

            <OverlayPanel ref={overlayPanelRef} style={{width: '360px'}} dismissable>
                {templateData}
            </OverlayPanel>
        </div>
    )
}

export default CustomOverlayPanel
