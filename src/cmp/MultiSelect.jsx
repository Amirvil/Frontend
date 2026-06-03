import React from 'react'
import { toyService } from '../services/toy.service.js'
import '../assets/styles/cmp/MultiSelect.css'

const labels = toyService.getToyLabels()

export function MultiSelect({ value = [], onChange }) {
    function handleChange(label) {
        const updated = value.includes(label)
            ? value.filter(l => l !== label)
            : [...value, label]
        onChange(updated)
    }

    return (
        <div className="multi-select">
            {labels.map(label => (
                <label key={label} className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={value.includes(label)}
                        onChange={() => handleChange(label)}
                    />
                    {label}
                </label>
            ))}
        </div>
    )
}