import {Route, Routes} from 'react-router-dom'
import {AuthLayout} from './AuthLayout'
import {SuspensedView} from '../../../../routing/PrivateRoutes'
import {lazy} from 'react'

const AuthPage = () => {
    const Login = lazy(() => import('./components/login/Login'))
    const ForgotPassword = lazy(() => import('./components/ForgotPassword'))
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route
                    index
                    element={
                        <SuspensedView>
                            <Login />
                        </SuspensedView>
                    }
                />
                <Route
                    path='login'
                    element={
                        <SuspensedView>
                            <Login />
                        </SuspensedView>
                    }
                />
                <Route
                    path='forgot-password'
                    element={
                        <SuspensedView>
                            <ForgotPassword />
                        </SuspensedView>
                    }
                />
            </Route>
        </Routes>
    )
}

export {AuthPage}
