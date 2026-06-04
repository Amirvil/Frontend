import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { MultiSelect } from '../cmp/MultiSelect.jsx'
import { toyService } from '../services/toy.service.js'
import { saveToy } from '../store/actions/toy.actions.js'
import '../assets/styles/pages/ToyEdit.css'

const ToySchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short').max(50, 'Too long').required('Required'),
    price: Yup.number().typeError('Must be a number').positive('Must be greater than 0').required('Required'),
    labels: Yup.array().min(1, 'Select at least one label'),
    inStock: Yup.boolean().required()
})

export function ToyEdit() {
    const [isLoading, setIsLoading] = useState(false)
    const { toyId } = useParams()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            labels: [],
            inStock: true
        },
        validationSchema: ToySchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const toyToSave = {
                    ...values,
                    price: +values.price,
                    inStock: values.inStock === 'true' || values.inStock === true
                }
                if (toyId) toyToSave._id = toyId
                await saveToy(toyToSave)
                navigate('/toy')
            } catch (err) {
                console.error('Cannot save toy:', err)
            } finally {
                setSubmitting(false)
            }
        }
    })

    useEffect(() => {
        if (!toyId) return
        setIsLoading(true)
        toyService.getById(toyId)
            .then(toy => {
                formik.setValues({
                    name: toy.name || '',
                    price: toy.price || '',
                    labels: toy.labels || [],
                    inStock: toy.inStock ?? true
                })
            })
            .catch(err => console.error('Failed to load toy:', err))
            .finally(() => setIsLoading(false))
    }, [toyId])

    if (isLoading) return <div className="loading">Loading...</div>

    return (
        <div className="toy-edit-page">
            <div className="toy-edit-card">
                <div className="toy-edit-header">
                    <h1>{toyId ? 'Edit Toy' : 'Add New Toy'}</h1>
                    <p>{toyId ? 'Update the toy details below' : 'Fill in the details to add a new toy'}</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="toy-edit-form">
                    <div className="form-group">
                        <label htmlFor="name">Toy Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter toy name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className={formik.touched.name && formik.errors.name ? 'error' : ''}
                        />
                        {formik.touched.name && formik.errors.name &&
                            <span className="error-msg">{formik.errors.name}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">Price ($)</label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="Enter price"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                                className={formik.touched.price && formik.errors.price ? 'error' : ''}
                            />
                            {formik.touched.price && formik.errors.price &&
                                <span className="error-msg">{formik.errors.price}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="inStock">Availability</label>
                            <select
                                id="inStock"
                                name="inStock"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.inStock}
                            >
                                <option value="true">In Stock</option>
                                <option value="false">Out of Stock</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Labels</label>
                        <MultiSelect
                            value={formik.values.labels}
                            onChange={(labels) => formik.setFieldValue('labels', labels)}
                        />
                        {formik.touched.labels && formik.errors.labels &&
                            <span className="error-msg">{formik.errors.labels}</span>}
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={() => navigate('/toy')}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-save" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? 'Saving...' : toyId ? 'Save Changes' : 'Create Toy'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}