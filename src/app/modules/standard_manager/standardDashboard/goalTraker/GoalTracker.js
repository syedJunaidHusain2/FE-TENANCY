import React, {useCallback, useEffect, useState} from 'react'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {BUTTON_SIZE} from '../../../../../customComponents/customButtton/CustomButton'
import {BUTTON_TYPE} from '../../../../../customComponents/customButtton/CustomButton'
import YourProcessChart from './yourProgress/YourProcessChart'
import {useSelector} from 'react-redux'
import {goalTrackerDataAction} from '../../../../../redux/actions/DashboardActions'
import {getGoalTrackerDataSelector} from '../../../../../redux/selectors/DashboardSelectors'
import {useDispatch} from 'react-redux'
import {getUserDataSelector} from '../../../../../redux/selectors/AuthSelectors'
import 'primeicons/primeicons.css'
import {setGoalTrackerService} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {
    ADD_GOAL_TRACKER_VALIDATION_FIELD,
    goalTackerValidation,
} from '../../../../../validations/validations'
import {isEmptyObjectValue} from '../../../../../helpers/CommonHelpers'

const GoalTracker = ({filter}) => {
    const goalTrackerData = useSelector(getGoalTrackerDataSelector)
    const loggedUser = useSelector(getUserDataSelector)

    const [loading, setLoading] = useState(false)
    const [fullLoading, setFullLoading] = useState(false)
    const [miniLoading, setMiniLoading] = useState(false)
    const [earnings, setEarnings] = useState(goalTrackerData?.weekly_set_value?.earning)
    const [accounts, setAccounts] = useState(goalTrackerData?.weekly_set_value?.account)
    const [kwSold, setKWSold] = useState(goalTrackerData?.weekly_set_value?.kw_sold)

    // validation errors
    // const [earningError, setEarningError] = useState(null)
    // const [accountsError, setAccountsError] = useState(null)
    // const [kwSoldError, setKwSoldError] = useState(null)
    const [addGoalTrackerError, setAddGoalTrackerError] = useState(
        ADD_GOAL_TRACKER_VALIDATION_FIELD
    )

    const dispatch = useDispatch()
    useEffect(() => {
        getGoalTrackerData()
    }, [filter])

    useEffect(() => {
        setEarnings(goalTrackerData?.weekly_set_value?.earning)
        setAccounts(goalTrackerData?.weekly_set_value?.account)
        setKWSold(goalTrackerData?.weekly_set_value?.kw_sold)
    }, [goalTrackerData])

    const getGoalTrackerData = useCallback(() => {
        if (goalTrackerData) setLoading(true)
        else setFullLoading(true)
        const body = {
            user_id: loggedUser?.id,
            filter: filter,
        }
        dispatch(goalTrackerDataAction(body)).finally(() => {
            if (goalTrackerData) setLoading(false)
            else setFullLoading(false)
            setMiniLoading(false)
        })
    }, [dispatch, filter])

    const refreshGoalTracker = () => {
        setMiniLoading(true)
        getGoalTrackerData()
    }

    const onSetGoal = () => {
        const body = {
            user_id: loggedUser?.id,
            earning: earnings,
            account: accounts,
            kw_sold: kwSold,
            filter: filter,
        }
        const validationErrors = goalTackerValidation(body)
        setAddGoalTrackerError(validationErrors)
        if (isEmptyObjectValue(validationErrors)) {
            setFullLoading(true)
            setGoalTrackerService(body)
                .then(() => {
                    getGoalTrackerData()
                })
                .finally(() => {
                    setFullLoading(false)
                    setAddGoalTrackerError(null)
                })
        }
    }
    return (
        <div
            className='bg-cmwhite p-5 shadow-sm '
            style={{
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'Manrope',
                borderRadius: '10px',
                position: 'relative',
            }}
        >
            <CustomLoader visible={fullLoading} full />
            <div className='row w-100'>
                <div className='col-sm-6 mb-5'>
                    <div
                        className='mb-5 d-flex'
                        style={{fontSize: '16px', fontWeight: '700', position: 'relative'}}
                    >
                        Goal Tracker
                        <CustomLoader visible={loading} size={50} />
                    </div>
                    <div className='d-flex align-items-center gap-3 text-cmGrey900 mb-3'>
                        <div className='text-cmGrey900' style={{fontWeight: 700, fontSize: '14px'}}>
                            {filter == 'this_week'
                                ? 'Weekly'
                                : filter == 'this_year'
                                ? 'Yearly'
                                : filter == 'this_month'
                                ? 'Monthly'
                                : filter == 'this_quarter'
                                ? 'Quartely'
                                : null}{' '}
                            Goals
                        </div>
                        {/* <div className='bi bi-arrow-repeat fs-1' /> */}
                        <i
                            className={`pi ${
                                miniLoading ? 'pi-spin' : null
                            } pi-sync cursor-pointer`}
                            style={{fontSize: '1.1rem'}}
                            onClick={() => refreshGoalTracker()}
                        ></i>
                    </div>
                    <form className=''>
                        {/* 1 */}
                        <div className='mb-5'>
                            <div className='row align-items-center mb-3'>
                                <label className='col-5 text-cmGrey700 required'>Earnings</label>
                                <div className='col'>
                                    <CustomInput
                                        errorMessage={addGoalTrackerError?.earningError}
                                        type={INPUT_TYPE.currency}
                                        prefixText='$'
                                        onChange={(e) => setEarnings(e.target.value)}
                                        value={earnings}
                                    />
                                </div>
                            </div>
                            {/* 2 */}
                            <div className='row align-items-center mb-3'>
                                <label className='col-5 text-cmGrey700 required'>Accounts</label>
                                <div className='col'>
                                    <CustomInput
                                        errorMessage={addGoalTrackerError?.accountErorr}
                                        type={INPUT_TYPE.number}
                                        onChange={(e) => setAccounts(e.target.value)}
                                        value={accounts}
                                    />
                                </div>
                            </div>
                            {/* 3 */}
                            <div className='row align-items-center mb-3'>
                                <label className='col-5 text-cmGrey700 required'>KW Sold</label>
                                <div className='col'>
                                    <CustomInput
                                        errorMessage={addGoalTrackerError?.kw_soldError}
                                        type={INPUT_TYPE.number}
                                        onChange={(e) => setKWSold(e.target.value)}
                                        value={kwSold}
                                    />
                                </div>
                            </div>
                        </div>
                        <CustomButton
                            buttonType={BUTTON_TYPE.primary}
                            buttonLabel='Set Goals'
                            onClick={onSetGoal}
                            buttonSize={BUTTON_SIZE.small}
                        />
                    </form>
                </div>
                <div className='col-sm-6'>
                    <div
                        className='mb-5 text-center text-cmGrey900'
                        style={{fontSize: '16px', fontWeight: '700'}}
                    >
                        Your Progress
                    </div>
                    <div>
                        <YourProcessChart
                            graphdata={goalTrackerData}
                            targetGoal={goalTrackerData?.weekly_set_value}
                            achievedGoal={goalTrackerData?.get_value}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GoalTracker
