import React,{useState , useEffect} from 'react'
import './../pages1/styles.css'
import SummaryBox from '../components1/summary-box/SummaryBox'
import { images} from '../constants'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
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

    const data = {
      user: {
        name: 'Wingrow Agritech',
        img: images.avt
      },
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
                title: 'Purched Quantity (Kg)',
                subtitle: 'Total Quantity Purched',
                value: TotalPurchaseQty,
                percent: (TotalPurchaseQty*100)/maxPurchaseQty
            },
            {
                title: 'Purchase (INR)',
                subtitle: 'Total Purchase Amount',
                value: TotalPurchaseAmount,
                percent: (TotalPurchaseQty*100)/maxPurchaseAmount
            },
            {
                title: 'Sales Quantity (Kg)',
                subtitle: 'Total Sales Quantity',
                value: totalSalesQty,
                percent: (totalSalesQty*100)/maxSalesQty
            },
            {
                title: 'Sales (INR)',
                subtitle: 'Total Sales Amount',
                value:  totalSalesAmount,
                percent: (totalSalesAmount*100)/maxSalesAmount
            },
            {
                title: 'Farmer Profit (INR)',
                subtitle: 'Total Farmer Profit',
                value: totalFarmersProfit,
                percent: totalFarmersProfit
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






// const data = {
//     summary: [
//         {
//             title: 'Farmers Markets',
//             subtitle: 'Total Farmers Markets',
//             value: '1.000',
//             percent: 30
            
//         },
//         {
//             title: 'Farmers',
//             subtitle: 'Total No. of Farmers',
//             value: '1.000',
//             percent: 50
            
//         },
//         {
//             title: 'Purched Quantity',
//             subtitle: 'Total Quantity Purched',
//             value: '1.000 Kgs',
//             percent: 70
//         },
//         {
//             title: 'Purchase',
//             subtitle: 'Total Purchase Amount',
//             value: 'INR 3000',
//             percent: 49
//         },
//         {
//             title: 'Sales Quantity',
//             subtitle: 'Total Sales Quantity',
//             value: '678 Kgs',
//             percent: 38
//         },
//         {
//             title: 'Sales',
//             subtitle: 'Total Sales Amount',
//             value: 'INR 2345',
//             percent: 55
//         },
//         {
//             title: 'Farmer Profit',
//             subtitle: 'Total Farmer Profit',
//             value: 'INR 2345',
//             percent: 55
//         }
//     ],
   
//     overall: [
//         {
//             value: '1200',
//             title: 'Farmers'
//         },
//         {
//             value: '12000',
//             title: 'Customer Served'
//         },
//         {
//             value: '1.234K',
//             title: 'Farmers Markets'
//         }
        
//     ]
    
// }

// export default data