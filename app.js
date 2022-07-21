const express = require('express')
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Inward = require('./models/Inward')
const Outward = require('./models/Outward')
const User = require('./models/User')
const Stalls = require('./models/Stalls')
const Vendors = require('./models/Vendors')
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticate = require('./middleware/Authenticate');
const cookieParser = require('cookie-parser');
const Razorpay = require('razorpay');
const crypto = require('crypto');
app.use(cookieParser());
app.use(cors());
app.use('/', router);
app.use(express.static('client/build'));
router.use(cors());


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true , useUnifiedTopology: true} , console.log("connected to db"));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.get('/inward' , async(req,res)=>{
    const inwardData = await Inward.find()
    res.send(inwardData);
})

router.get('/outward' , async(req,res)=>{
    const outwardData = await Outward.find()
    res.send(outwardData);
})

router.get('/stalls' , async(req,res)=>{
    const stallsData = await Stalls.find()
    res.send(stallsData);
})

router.post('/stalls' , async(req,res)=>
{
    const { stalls , availablestalls , location} = req.body;

    const updates = {
        location,
        stalls,
        availablestalls
    }
    const options = {returnNewDocument:true}

    try{
        const stalldata = await Stalls.findOneAndUpdate({location},updates,options);
        const resdata = await stalldata.save()
        res.status(200).send(resdata)
    } catch (error) {
        res.status(404).send(error)
    }
})

//info page 

router.get('/info', authenticate , (req,res,next)=>

{
    res.send(req.rootUser)
});

//register route
                                                               
router.post('/register' , async(req,res)=>{
    
    const { fname , lname , password , phone } = req.body;

    if(!fname || !lname || !password || !phone)
    {
        return res.status(422).json({error:"please fill the fields properly"})
    }

    try {
        const userExist = await User.findOne({phone:phone})

        if(userExist){
            return res.status(422).json({error:"User already exists"})
        }

        const user = new User({fname , lname , password , phone})
        
        await user.save();
        res.status(201).json({message:"user registered succesfully"})
    } catch (error) {
        console.log(error)
    }
})


//login route

router.post('/signin', async(req,res)=>{
    try {
        const { phone , password} = req.body
        if(!phone || !password){
            return res.status(400).json({error:"data invalid"})
        }

        const userLogin = await User.findOne({phone:phone});
        if(userLogin){
            const isMatch = await bcrypt.compare(password , userLogin.password)
            const token = await userLogin.generateAuthToken()

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now()+25892000000)
            });

            if(isMatch){
                return res.status(200).json({message:"signin successful"})
            }else{
                return res.status(400).json({error:"invalid Credentials"})
            }
        }
            else
        {
            return res.status(400).json({error:"invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error)    
    }
})

//logout

router.get('/logout', (req,res)=>
{
    res.clearCookie('jwtoken')
    res.status(200).send('logout successfully')
})

router.post('/inward' ,async(req,res)=>
{
    const {farmer_name , farmers_market ,data, mobile_num} = req.body
    const inwardData = await Inward.findOne({farmer_name,farmers_market,mobile_num})
    if(!inwardData){
        const response = {...req.body}
        const {data} = response;
        data.forEach((e)=>{
            response.total_cummulative_purchase=e.total_purchase
        })
        try {
            const inward = new Inward(response)
            const createInward = await inward.save();
            res.status(201).send(createInward);
        } catch (error) {
            res.status(404).send(error)
        }
    }else{
        let cummPurchase
        let obj;
        data.forEach((e)=>{
            cummPurchase=e.total_purchase
            obj={...e}
        })
        try {
            const query = {farmer_name,farmers_market,mobile_num}
            const update = {"$push": { "data": obj } , $inc:{total_cummulative_purchase:cummPurchase}}
            const options = { returnNewDocument: true };
            const inwardreq = await Inward.findOneAndUpdate(query, update, options)
            const reqData = await inwardreq.save()
            res.status(201).send(reqData);
        } catch (error) {
            res.status(404).send(error)
        }
    }
})


router.post('/outward',async(req,res)=>{
    const {farmer_name , farmers_market , data , mobile_num} = req.body
    const outwardData = await Outward.findOne({farmers_market,mobile_num,farmer_name})

    if(!outwardData)
    {
        const response = {...req.body}
        const {data} = response;
        data.forEach((e)=>{
            response.total_cummulative_sales=e.total_sales
            response.wingrow_sc=e.sales_quantity
    })
        try {
            const outward = new Outward(response)
            const createOutward = await outward.save();
            res.status(201).send(createOutward);
        } catch (error) {
            res.status(404).send(error)
        }
    }else{
        let cummSales = 0
        let sumSc = 0
        let obj;
        data.forEach((e)=>{
            cummSales=e.total_sales
            sumSc=e.sales_quantity
            obj={...e}
        })

        try {
            const query = {farmer_name,farmers_market,mobile_num}
            const update = {
                "$push": { "data": obj },
                $inc:{total_cummulative_sales:cummSales,wingrow_sc:sumSc}}
            const options = { returnNewDocument: true };
            const outwardreq = await Outward.findOneAndUpdate(query, update, options)
            const reqData = await outwardreq.save()
            res.status(201).send(reqData);
        } catch (error) {
            res.status(404).send(error)
        }
    }
})

//vendors data
router.post('/vendorsdata', async(req,res)=>{
    try {
        const {vendorsName , vendorsMarket , data} = req.body
        if(vendorsName&&vendorsMarket&&data){
        const vendor = new Vendors({vendorsName,vendorsMarket,data})
        
        await vendor.save();
        res.status(201).json({message:"succesful"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/vendors' , async(req,res)=>
{
    const vendorsData = await Vendors.find()
    res.send(vendorsData)
})


//order Api
router.post('/orders' , async(req,res)=>
{
    const {amount} = req.body
    try {
        const instance = new Razorpay({
            key_id:process.env.KEY_ID,
            key_secret:process.env.KEY_SECRET
        });

        const options = ({
            amount:amount,
            currency:"INR"
        })

        instance.orders.create(options,(error , order)=>{
            if(error){
                console.log(error);
                return res.status(500).json({message:'Something went wrong'});
            }
            res.status(200).json({data:order})
        })

        console.log(options)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal error occured"})
    }
})


//payment verify api

router.post('/verify',(req,res)=>
{
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256","VfWVFYsaTjII8KuHoUcIH5BS")
        .update(sign.toString())
        .digest("hex");
        

        if(razorpay_signature===expectedSign)

        {
            res.status(200).json({message:"payment verification succesful"})
        }
        else
        {
            return res.status(500).json({message:"payment failed"})
        }

    } catch (error) 
    {
        console.log(error)
        res.status(500).json({message:"internal error"})
    }
})

    if(process.env.NODE_ENV == "production"){
        app.use(express.static('client/build'))
    }

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}!!!!!!!!!`);
    });