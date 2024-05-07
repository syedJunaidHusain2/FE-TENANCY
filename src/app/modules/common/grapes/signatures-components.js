/* eslint-disable import/no-anonymous-default-export */
export default (editor) => {
    editor.BlockManager.add('SignatureComponents', {
        label: "<div class='gjs-fonts gjs-f-b1'>Manager Signature</div>",
        category: 'Signatures',
        content: CustomSignatureContent('Manager Signature'),
    })
    editor.BlockManager.add('SignatureComponents2', {
        label: "<div class='gjs-fonts gjs-f-b1'>Recipient Signature</div>",
        category: 'Signatures',
        content: CustomSignatureContent('Recipient Signature'),
    })
    editor.BlockManager.add('SignatureComponents3', {
        label: "<div class='gjs-fonts gjs-f-b1'>Self Signature</div>",
        category: 'Signatures',
        content: CustomSignatureContent('Self Signature'),
    })
    editor.BlockManager.add('SignatureComponents4', {
        label: "<div class='gjs-fonts gjs-f-b1'>Recruiter Signature</div>",
        category: 'Signatures',
        content: CustomSignatureContent('Recruiter Signature'),
    })
}

const CustomSignatureContent = (text) => {
    return `<div style="width:150px;height:70px;"><p style="padding: 25px;width:150px;height:70px;border:2px solid #8c8b8b;background-color:#c2c0c0">&nbsp;
    </p><p style="text-align:center">${text}</p></div>`
}
