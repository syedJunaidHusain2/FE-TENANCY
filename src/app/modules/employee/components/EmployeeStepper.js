import {Step, StepLabel, Stepper} from '@mui/material'
import {styled} from '@mui/material/styles'
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector'

const EmployeeStepper = ({activeStep, steps}) => {
    const QontoConnector = styled(StepConnector)(({theme}) => ({
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#00C247',
                borderLeftWidth: '5px',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#00C247',
                borderLeftWidth: '5px',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#E0E0E0',
            borderRadius: 1,
            borderLeftWidth: '5px',
            marginLeft: '7px',
        },
    }))
    return (
        <div className=''>
            <Stepper activeStep={activeStep} orientation='vertical' connector={<QontoConnector />}>
                {steps.map((label, index) => {
                    return (
                        <Step
                            key={label}
                            sx={{
                                // '.MuiStepConnector-root': {
                                //     top: 100,
                                // },

                                '.MuiSvgIcon-root': {
                                    borderRadius: '50%',
                                    // border: '1px solid grey',
                                    height: '40px',
                                    width: '40px',
                                },
                                '.MuiSvgIcon-root:not(.Mui-completed)': {
                                    color: '#FAFAFA',
                                    border: '2px solid #BDBDBD',
                                },

                                '.MuiSvgIcon-root.Mui-active': {
                                    color: 'white',
                                    padding: '3px',
                                    borderRadius: '50%',
                                    border: '2px solid #6078EC',
                                    marginY: '-3px',
                                },
                                '.MuiStepIcon-text': {
                                    fill: '#BDBDBD',
                                    fontWeight: 600,
                                    fontFamily: 'Manrope',
                                    fontSize: '16px',
                                    textAlign: 'center',
                                },
                                '.Mui-active .MuiStepIcon-text': {
                                    fill: '#6078EC',
                                },
                                '.MuiStepConnector-root span': {
                                    border: '3px #E0E0E0 solid',
                                },
                                '.MuiStepConnector-root.Mui-active span': {
                                    border: '3px #00C247 solid',
                                },
                                '.MuiStepConnector-root.Mui-completed span': {
                                    border: '3px #00C247 solid',
                                },
                                '.MuiStepLabel-label.Mui-completed': {
                                    color: '#9E9E9E',
                                    fontWeight: '600',
                                },
                                '.MuiStepLabel-label.Mui-active': {
                                    color: '#6078EC',
                                    fontWeight: '600',
                                },
                                '.MuiStepLabel-label': {
                                    color: '#9E9E9E',
                                    fontWeight: '600',
                                },
                            }}
                        >
                            <StepLabel
                                StepIconProps={{
                                    sx: {
                                        '&.Mui-completed': {
                                            background: 'white',
                                            color: '#00C247',
                                            border: 'none',
                                        },
                                    },
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: '600',
                                        fontSize: '14px',
                                    }}
                                >
                                    {label}
                                    {/* <div
                                            style={{
                                                fontWeight: '600',
                                                fontSize: '14px',
                                                color: '#9E9E9E',
                                            }}
                                        >
                                            Description
                                        </div> */}
                                </div>
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
        </div>
    )
}

export default EmployeeStepper
