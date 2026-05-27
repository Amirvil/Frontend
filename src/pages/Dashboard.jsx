import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { RechartsDevtools } from '@recharts/devtools'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export function Dashboard() {

    const toys = useSelector((state) => state.toyModule.toys)
    const pricePerLabelData = useMemo(() => {
        const labelStats = {}
        toys.forEach(toy => {
            if (!toy.labels || !toy.labels.length) return
            const price = toy.price || 0

            toy.labels.forEach(label => {
                if (!labelStats[label]) {
                    labelStats[label] = { sum: 0, count: 0 }
                }
                labelStats[label].sum += price
                labelStats[label].count += 1
            })
        })
        const result = Object.keys(labelStats).map(label => {
            const avg = labelStats[label].sum / labelStats[label].count

            return {
                label: label,
                avgPrice: Math.round(avg)
            }
        })

        return result
    }, [toys])

    return (<div>
        <div>
            <h3>Average Price per Label</h3>
            <div style={{ width: '100%', height: '300px' }}>

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pricePerLabelData}>
                        <XAxis dataKey="label" stroke="#94a3b8" />
                        <Tooltip />
                        <Bar dataKey="avgPrice" fill="#ff0303" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>

            </div>
        </div>
    </div>)
}