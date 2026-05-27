import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import FormHelperText from '@mui/material/FormHelperText'
import { toyService } from '../services/toy.service.js'

export function MultiSelect({ value = [], onChange, error, helperText }) {
    const labels = toyService.getLabels()

    const handleChange = (event) => {
        const { target: { value: selectedValues } } = event
        
        // Formik expects an array. MUI's select multiple handles adding/removing items 
        // into an array automatically, but we ensure it split strings if autofilled.
        const updatedLabels = typeof selectedValues === 'string' 
            ? selectedValues.split(',') 
            : selectedValues

        if (onChange) onChange(updatedLabels)
    }

    return (
        <FormControl sx={{ width: '100%', mt: 2 }} error={!!error}>
            <InputLabel id="checkbox-multiselect-label">Labels</InputLabel>
            <Select
                labelId="checkbox-multiselect-label"
                id="checkbox-multiselect"
                multiple
                value={value}
                onChange={handleChange}
                input={<OutlinedInput label="Labels" />}
                // Displays the selected array items as a clean comma-separated list
                renderValue={(selected) => selected.join(', ')}
            >
                {labels.map((label) => (
                    <MenuItem key={label} value={label}>
                        {/* Material UI Checkbox tied directly to the selection array status */}
                        <Checkbox checked={value.includes(label)} />
                        <ListItemText primary={label} />
                    </MenuItem>
                ))}
            </Select>
            
            {/* Renders validation errors nicely if passed down from Formik */}
            {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}