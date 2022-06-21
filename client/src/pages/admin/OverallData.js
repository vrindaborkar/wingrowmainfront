import React,{useState , useEffect} from 'react'

const OverallData = () => {
    const [inwardData, setinwardData] = useState([])
    const [outwardData, setoutwardData] = useState([])
    const [CompleteData, setCompleteData] = useState([])
  
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
  
    useEffect(() => {
      if(inwardData&&outwardData){
        let res = {}
        res.inward = inwardData;
        res.outward = outwardData;
        setCompleteData(res);
      }
    }, [inwardData , outwardData])
  
  
  
    
  
    
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
  
  
    const downloadFile = ({ data, fileName, fileType }) => {
      const blob = new Blob([data], { type: fileType })
      const a = document.createElement('a')
      a.download = fileName
      a.href = window.URL.createObjectURL(blob)
      const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      })
      a.dispatchEvent(clickEvt)
      a.remove()
    }
    
    const exportToJson = e => {
      e.preventDefault()
      downloadFile({
        data: JSON.stringify(CompleteData),
        fileName: 'data.json',
        fileType: 'text/json',
      })
    }
  
  return (
    <div>
        {
        (inwardData&&outwardData)?
        <div className="admin_data">
              <span>Total Farmers Market : {finalMarketsArr.length}</span>
              <span>Total No. of Farmers : {finalNamesArr.length}</span>
              <span>Total quantity purchased : {TotalPurchaseQty}</span>
              <span>Total purchase amount : {TotalPurchaseAmount}</span>
              <span>Total sales quantity : {totalSalesQty}</span>
              <span>Total sales amount : {totalSalesAmount}</span>
              <span>Total farmers profit : {totalFarmersProfit}</span>
              <br/>
            <button onClick={exportToJson}>download data</button>
        </div>:
        <h1>Loading...</h1>
      }
    </div>
  )
}

export default OverallData