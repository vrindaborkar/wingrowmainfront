import React from 'react'
import './summary-box.scss'
import Box from '../box/Box'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { colors } from '../../constants'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const SummaryBox = ({ item }) => {
    return (
        <>
       {(item)?<Box>
            <div className='summary-box'>
                <div className="summary-box__info">
                    <div className="summary-box__info__title">
                        <div className='summary-box__title'>{item.title}</div>
                        <span className='summary-box__subtitle'>{item.subtitle}</span>
                    </div>
                    <div className="summary-box__info__value">
                        {item.value}
                    </div>
                </div>
                <div className="summary-box__chart">
                    <CircularProgressbarWithChildren
                        value={item.percent}
                        strokeWidth={6}
                        styles={buildStyles({
                            pathColor: item.percent < 50 ? colors.red : colors.purple,
                            trailColor: '#d3d3d3',
                            strokeLinecap: 'round'
                        })}
                    >
                        <div className="summary-box__chart__value">
                            {item.percent}%
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
            </div>
        </Box>:<h2>Loading...</h2>}
        </>
    )
}

export default SummaryBox

export const SummaryBoxSpecial = ({ item }) => {
    const chartOptions = {
        responsive: true,
        scales: {
            xAxis: {
                display: false
            },
            yAxis: {
                display: false
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        elements: {
            point: {
                radius: 0
            }
        }
    }

    const chartData = {
        labels: item.chartData.labels,
        datasets: [
            {
                label: 'Revenue',
                data: item.chartData.data,
                borderColor: '#fff',
                tension: 0.5
            }
        ]
    }
    return (
        <Box purple fullheight>
            <div className="summary-box-special">
                <div className="summary-box-special__title">
                    {item.title}
                </div>
                <div className="summary-box-special__value">
                    {item.value}
                </div>
                <div className="summary-box-special__chart">
                    <Line options={chartOptions} data={chartData} width={`20px`} />
                </div>
            </div>
        </Box>
    )
}
