import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service.js'
import { store } from '../store/store.js'
import { SET_USER } from '../store/reducers/user.reducer.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import loginIcon from '../assets/icons/account_circle_24dp_202124_FILL0_wght400_GRAD0_opsz24.svg'
import '../assets/styles/pages/Login.css'

function validate(values) {
    const errors = {}
    if (!values.username) errors.username = 'Username is required'
    if (!values.password) errors.password = 'Password is required'
    else if (values.password.length < 4) errors.password = 'Minimum 4 characters'
    return errors
}

export function Login() {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validate,
        onSubmit: async (values) => {
            try {
                const user = await userService.login(values)
                store.dispatch({ type: SET_USER, user })
                showSuccessMsg(`Welcome back, ${user.fullname || user.username}!`)
                navigate('/')
            } catch (err) {
                showErrorMsg('Invalid username or password')
            }
        }
    })

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <img src={loginIcon} className="login-icon" alt="Login" />
                    <h1>Welcome back</h1>
                    <p>Sign in to your Kiddos account</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            className={formik.touched.username && formik.errors.username ? 'error' : ''}
                        />
                        {formik.touched.username && formik.errors.username &&
                            <span className="error-msg">{formik.errors.username}</span>
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={formik.touched.password && formik.errors.password ? 'error' : ''}
                        />
                        {formik.touched.password && formik.errors.password &&
                            <span className="error-msg">{formik.errors.password}</span>
                        }
                    </div>

                    <button type="submit" className="btn-login" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    )
}