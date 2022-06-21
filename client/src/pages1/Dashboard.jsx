import React,{useState , useEffect} from 'react'
import './styles.css'
import SummaryBox from '../components1/summary-box/SummaryBox'
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
   PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)


const Dashboard = () => {
    const [inwardData, setinwardData] = useState([])
    const [outwardData, setoutwardData] = useState([])
  
    useEffect(() => {
      fetch("/inward")
      .then((res)=>res.json())
      .then(res=>{
        setinwardData(res);
      })
    }, [])
  
  
    useEffect(() => {
      fetch("/outward")
      .then((res)=>res.json())
      .then(res=>{
        setoutwardData(res);
      })
    }, [])

  
    const farmerMarkets = []
    const farmers = []
    let TotalPurchaseQty = 0
    let TotalPurchaseAmount = 0
  
  
    inwardData.forEach((e)=>{
      const {data} = e
      farmerMarkets.push(e.farmers_market)
      farmers.push(e.farmer_name)
      TotalPurchaseAmount+=e.total_cummulative_purchase
      data.forEach((e)=>{
        TotalPurchaseQty+=e.purchase_quantity
      })
    })
  
    let totalSalesQty = 0
    let totalSalesAmount = 0
  
    outwardData.forEach((e)=>{
      totalSalesAmount+=e.total_cummulative_sales
      const {data} = e
      data.forEach((e)=>{
        totalSalesQty+=e.sales_quantity
      })
    })
  
  
    const finalMarketsArr = [...new Set(farmerMarkets)]
    const finalNamesArr = [...new Set(farmers)]
    let totalFarmersProfit = Math.abs(totalSalesAmount-TotalPurchaseAmount)

 

    let maxmarkets = 100;
    let maxFarmers = 1000;
    let maxPurchaseQty = 100000;
    let maxPurchaseAmount = 5000000;
    let maxSalesAmount = 5000000;
    let maxSalesQty = 100000;
    let maxProfit = 100000;

    const data = {
        summary: [
            {
                title: 'Farmers Markets',
                subtitle: 'Total Farmers Markets',
                value: finalMarketsArr.length, 
                percent: (finalMarketsArr.length*100)/maxmarkets
                
            },
            {
                title: 'Farmers',
                subtitle: 'Total No. of Farmers',
                value: finalNamesArr.length,
                percent: (finalNamesArr.length*100)/maxFarmers
                
            },
            {
                title: 'Purched Quantity',
                subtitle: 'Total Quantity Purched',
                value: TotalPurchaseQty,
                percent: (TotalPurchaseQty*100)/maxPurchaseQty
            },
            {
                title: 'Purchase',
                subtitle: 'Total Purchase Amount',
                value: TotalPurchaseAmount,
                percent: (TotalPurchaseQty*100)/maxPurchaseAmount
            },
            {
                title: 'Sales Quantity',
                subtitle: 'Total Sales Quantity',
                value: totalSalesQty,
                percent: (totalSalesQty*100)/maxSalesQty
            },
            {
                title: 'Sales',
                subtitle: 'Total Sales Amount',
                value: totalSalesAmount,
                percent: (totalSalesAmount*100)/maxSalesAmount
            },
            {
                title: 'Farmer Profit',
                subtitle: 'Total Farmer Profit',
                value: totalFarmersProfit,
                percent: (totalFarmersProfit*100)/maxProfit
            }
        ]
       
        
    }

    return (
                <div className="main_wrapper">
                            {
                                data.summary.map((item, index) => (
                                    <div key={`summary-${index}`} className="secondary_wrapper">
                                        <SummaryBox item={item} />
                                    </div>
                                ))
                            }                 
                </div>
    )
}

export default Dashboard