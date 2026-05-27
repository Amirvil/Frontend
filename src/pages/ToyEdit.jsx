import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Formik, Form, Field } from 'formik'
import {
    Button,
    TextField,
    MenuItem,
    Container,
    Paper,
    Typography,
    Box,
    Grid,
    CircularProgress,
    Divider
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveIcon from '@mui/icons-material/Save'
import * as Yup from 'yup'

import { MultiSelect } from '../cmp/MultiSelect.jsx'
import { toyService } from '../services/toy.service.js'
import { saveToy } from "../store/actions/toy.actions.js"

const ToySchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    price: Yup.number()
        .typeError('Price must be a number')
        .positive('Price must be greater than 0')
        .required('Price is required'),
    labels: Yup.array()
        .of(Yup.string())
        .min(1, 'Please select at least one label/category'),
    inStock: Yup.boolean().required()
})

export function ToyEdit() {
    const [initialValues, setInitialValues] = useState({
        name: '',
        price: '',
        labels: [],
        inStock: true
    })
    const [isLoading, setIsLoading] = useState(false)

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!toyId) return

        setIsLoading(true)
        toyService.getById(toyId)
            .then(toy => {
                setInitialValues({
                    ...toy,
                    price: toy.price || '',
                    labels: toy.labels || [],
                    inStock: toy.inStock ?? true
                })
            })
            .catch(err => {
                console.error('Failed to load toy:', err)
            })
            .finally(() => setIsLoading(false))
    }, [toyId])

    function onSubmit(values, { setSubmitting }) {
        const toyToSave = {
            ...initialValues,
            ...values,
            price: +values.price,
            inStock: values.inStock === 'true' || values.inStock === true
        }

        saveToy(toyToSave)
            .then(() => {
                navigate('/toy')
            })
            .catch(err => {
                console.error('Cannot save toy:', err)
            })
            .finally(() => setSubmitting(false))
    }

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {toyId ? 'Edit Toy Details' : 'Add New Toy'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Fill out the configuration settings below to save your inventory data.
                </Typography>

                <Divider sx={{ mb: 4 }} />

                <Formik
                    initialValues={initialValues}
                    validationSchema={ToySchema}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                >
                    {({ values, setFieldValue, errors, touched, isSubmitting }) => (
                        <Form autoComplete="off">
                            <Grid container spacing={3}>

                                {/* Toy Name Column */}
                                <Grid size={12}>
                                    <Field
                                        as={TextField}
                                        id="name"
                                        name="name"
                                        label="Toy Name"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </Grid>

                                {/* Price Column */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Field
                                        as={TextField}
                                        id="price"
                                        name="price"
                                        label="Price ($)"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.price && Boolean(errors.price)}
                                        helperText={touched.price && errors.price}
                                    />
                                </Grid>

                                {/* Stock Selection Dropdown */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Field
                                        as={TextField}
                                        id="inStock"
                                        name="inStock"
                                        select
                                        label="Availability"
                                        fullWidth
                                        error={touched.inStock && Boolean(errors.inStock)}
                                        helperText={touched.inStock && errors.inStock}
                                    >
                                        <MenuItem value="true">Available / In Stock</MenuItem>
                                        <MenuItem value="false">Out of Stock</MenuItem>
                                    </Field>
                                </Grid>

                                {/* Labels Component Integration */}
                                <Grid size={12}>
                                    <MultiSelect
                                        value={values.labels}
                                        onChange={(selectedLabels) => setFieldValue('labels', selectedLabels)}
                                        error={touched.labels && Boolean(errors.labels)}
                                        helperText={touched.labels && errors.labels}
                                    />
                                </Grid>

                                {/* Form Action Buttons */}
                                <Grid size={12} sx={{ mt: 2 }}>
                                    <Box display="flex" gap={2} justifyContent="flex-end">
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => navigate('/toy')}
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SaveIcon />}
                                            disabled={isSubmitting}
                                        >
                                            {toyId ? 'Save Changes' : 'Create Toy'}
                                        </Button>
                                    </Box>
                                </Grid>

                            </Grid>
                        </Form>
                    )}
                </Formik >
            </Paper>
        </Container>
    )
}