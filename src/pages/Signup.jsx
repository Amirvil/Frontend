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
    if (!values.fullname) errors.fullname = 'Full name is required'
    if (!values.username) errors.username = 'Username is required'
    if (!values.password) errors.password = 'Password is required'
    else if (values.password.length < 4) errors.password = 'Minimum 4 characters'
    if (!values.rePassword) errors.rePassword = 'Please confirm your password'
    else if (values.rePassword !== values.password) errors.rePassword = 'Passwords do not match'
    return errors
}

export function Signup() {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: { fullname: '', username: '', password: '', rePassword: '' },
        validate,
        onSubmit: async (values) => {
            try {
                const user = await userService.signup({
                    fullname: values.fullname,
                    username: values.username,
                    password: values.password,
                })
                store.dispatch({ type: SET_USER, user })
                showSuccessMsg(`Welcome, ${user.fullname || user.username}!`)
                navigate('/')
            } catch (err) {
                showErrorMsg(err.message || 'Signup failed, username may already exist')
            }
        }
    })

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <img src={loginIcon} className="login-icon" alt="Signup" />
                    <h1>Create account</h1>
                    <p>Join Kiddos today</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            id="fullname"
                            name="fullname"
                            type="text"
                            placeholder="Enter your full name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullname}
                            className={formik.touched.fullname && formik.errors.fullname ? 'error' : ''}
                        />
                        {formik.touched.fullname && formik.errors.fullname &&
                            <span className="error-msg">{formik.errors.fullname}</span>
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Choose a username"
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
                            placeholder="Create a password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={formik.touched.password && formik.errors.password ? 'error' : ''}
                        />
                        {formik.touched.password && formik.errors.password &&
                            <span className="error-msg">{formik.errors.password}</span>
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="rePassword">Confirm Password</label>
                        <input
                            id="rePassword"
                            name="rePassword"
                            type="password"
                            placeholder="Re-enter your password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.rePassword}
                            className={formik.touched.rePassword && formik.errors.rePassword ? 'error' : ''}
                        />
                        {formik.touched.rePassword && formik.errors.rePassword &&
                            <span className="error-msg">{formik.errors.rePassword}</span>
                        }
                    </div>

                    <button type="submit" className="btn-login" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? 'Creating account...' : 'Sign up'}
                    </button>
                    <div className='signup-container'>
                        <p>Already have an account?</p>
                        <button type="button" className="btn-signup" onClick={() => navigate('/auth/login')}>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}