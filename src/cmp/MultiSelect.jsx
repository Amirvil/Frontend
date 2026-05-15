import React, { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.local.js'

export function MultiSelect({ onSetLabels }) {

    const [selectedLabels, setSelectedLabels] = useState([])
    const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false)

    useEffect(() => {
        onSetLabels(selectedLabels);
    }, [selectedLabels])

    function onSelectLabel(label) {
        setSelectedLabels(prevSelectedLabels => {
            if (isLabelChosen(label)) {
                return prevSelectedLabels.filter(currLabel => currLabel !== label)
            } else {
                return [...prevSelectedLabels, label]
            }
        })
    }

    function isLabelChosen(label) {
        return selectedLabels.includes(label)
    }

    const labels = toyService.getLabels()
    return <section className="multi-select" onMouseLeave={() => setIsOptionsModalOpen(false)}>
        <div className="selected-options-container" onClick={() => setIsOptionsModalOpen(prev => !prev)}>
            selected :
            {selectedLabels.map(label => <div key={label}>{label}</div>)}
        </div>

        <div className={`options-container  ${isOptionsModalOpen ? ' open' : ''}`}>
            {labels.map(label => <div onClick={() => onSelectLabel(label)} key={label}>
                {label} {isLabelChosen(label) ? '🟢' : ''}
            </div>
            )}
        </div>
    </section >
}