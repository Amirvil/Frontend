import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import '../assets/styles/pages/Dashboard.css'

const COLORS = ['#534AB7', '#7C6FE0', '#A99EF0', '#3B6D11', '#5A9E1A', '#E07C6F', '#E0B46F', '#6FB4E0']

export function Dashboard() {
    const toys = useSelector((state) => state.toyModule.toys)

    const pricePerLabelData = useMemo(() => {
        const labelStats = {}
        toys.forEach(toy => {
            if (!toy.labels?.length) return
            toy.labels.forEach(label => {
                if (!labelStats[label]) labelStats[label] = { sum: 0, count: 0 }
                labelStats[label].sum += toy.price || 0
                labelStats[label].count += 1
            })
        })
        return Object.keys(labelStats).map(label => ({
            label,
            avgPrice: Math.round(labelStats[label].sum / labelStats[label].count)
        }))
    }, [toys])

    const toysPerLabelData = useMemo(() => {
        const labelCount = {}
        toys.forEach(toy => {
            toy.labels?.forEach(label => {
                labelCount[label] = (labelCount[label] || 0) + 1
            })
        })
        return Object.keys(labelCount).map(label => ({ label, count: labelCount[label] }))
    }, [toys])

    const stockData = useMemo(() => [
        { name: 'In Stock', value: toys.filter(t => t.inStock).length },
        { name: 'Out of Stock', value: toys.filter(t => !t.inStock).length }
    ], [toys])

    const stats = useMemo(() => ({
        total: toys.length,
        avgPrice: toys.length ? Math.round(toys.reduce((sum, t) => sum + (t.price || 0), 0) / toys.length) : 0,
        inStock: toys.filter(t => t.inStock).length,
        labels: new Set(toys.flatMap(t => t.labels || [])).size
    }), [toys])

    return (
        <div className="dashboard">
            <div className="chart-card">
                <h3>Average Price per Label</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={pricePerLabelData}>
                        <XAxis dataKey="label" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(val) => [`$${val}`, 'Avg Price']} />
                        <Bar dataKey="avgPrice" fill="#534AB7" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-card">
                <h3>In Stock vs Out of Stock</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie data={stockData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                            {stockData.map((_, index) => (
                                <Cell key={index} fill={index === 0 ? '#534AB7' : '#E07C6F'} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-card">
                <h3>Toys per Label</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={toysPerLabelData}>
                        <XAxis dataKey="label" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(val) => [val, 'Toys']} />
                        <Bar dataKey="count" fill="#3B6D11" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-card stats-card">
                <h3>Quick Stats</h3>
                <div className="stat-grid">
                    <div className="stat-box">
                        <span className="stat-num">{stats.total}</span>
                        <span className="stat-label">Total Toys</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-num">${stats.avgPrice}</span>
                        <span className="stat-label">Avg Price</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-num">{stats.inStock}</span>
                        <span className="stat-label">In Stock</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-num">{stats.labels}</span>
                        <span className="stat-label">Label Types</span>
                    </div>
                </div>
            </div>
        </div>
    )
}