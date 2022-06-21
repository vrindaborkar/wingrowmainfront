import './Dashboard.css'
import Location from '../Dashboard/Location'
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ContactsIcon from '@material-ui/icons/Contacts';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';

import CountUp from 'react-countup';

function Dashboard() {

  return (
  <div className="main">
    <div className='dash'>
      <figure className='dash_img img1'>
        <img className='image_dash ' src="./images/6.jpg" alt="img"/>
      </figure>
      <figure className='dash_img img2'>
        <img className='image_dash' src="./images/3.jpg" alt="img"/>
      </figure>
      <figure className='dash_img img3'>
        <img className='image_dash' src="./images/4.jpg" alt="img"/>
      </figure>
      <figure className='dash_img img4'>
        <img className='image_dash' src="./images/5.jpg" alt="img"/>
      </figure>
      <figure className='dash_img img5'>
        <img className='image_dash' src="./images/img.jpg" alt="img"/>
      </figure>
      <figure className='dash_img img6'>
        <img className='image_dash' src="./images/7.jpg" alt="img"/>
      </figure>
    </div>


    <div className="grid_info">
      <h1 className="grid_head heading_tertiary">
         Products before Covid 19
      </h1>
      <div className="grid_countinfo">
          <CountUp className="count" start={0} end={1200} duration={2.75}/>
          <p style={{textAlign:"center"}}>Farmers</p>
      </div>
      <div className="grid_countinfo" >
          <CountUp className="count" start={0} end={12} duration={2.75}/>
          <p style={{textAlign:"center"}}>Farmers Market</p>
      </div>
      <div className="grid_countinfo">
          <CountUp className="count" start={0} end={11000} duration={2.75}/>
          <p style={{textAlign:"center"}}>Consumers Served</p>
      </div>
    </div>


    <div className="info">
      <div style={{textAlign:"center",margin:"4rem 0"}}>
      <h1 className='heading_tertiary'>Our Response to Covid 19</h1>
      <div>
        <p className='p_primary'>
            During the lockdown situation, we started delivering fruits and vegetables at home following all the safety norms. We also set up fruit and vegetable stalls in collaboration with government to help farmers and citizens.
        </p>
      </div>
      </div>
    </div>
    <div className="iconsgrp">
        <div className="icons">
          <CardTravelIcon fontSize="large"/>
          <div className='iconscontent'>
            <h2>Total No. of Deliveries</h2>
            <h1>99450</h1>
          </div>  
        </div>
        <div className="icons">
          <ContactsIcon fontSize="large"/>
          <div className='iconscontent'>
            <h2>Total Quantity Delivered</h2>
            <h1>1002 Tons</h1>
          </div>  
        </div>
        <div className="icons">
          <ThumbUpIcon fontSize="large"/>
          <div className='iconscontent'>
            <h2>Total Revenue</h2>
            <h1>Rs 1.96 Cr</h1>
          </div>
        </div>
        <div className="icons">
          <LabelImportantIcon fontSize="large"/>
          <div className='iconscontent'>
            <h2>Number of Farmers</h2>
            <h1>210</h1>
          </div>  
        </div>
        <div className="icons">
          <SupervisorAccountIcon fontSize="large"/>
          <div className='iconscontent'>
            <h2>Number of Customers</h2>
            <h1>29100</h1>
          </div>
        </div>
        <div className="icons">
          <AirplanemodeActiveIcon fontSize="large"/>
          <div className='iconscontent'>
            <h2>India Air force Pune</h2>
            <h1>25000</h1>
          </div>
        </div>
    </div>
    <div className="restinfo">
    <h1 className='heading_tertiary'>OUR MARKETS</h1>
      <br/>
      <p className='p_primary'>
      We organize weekly markets at key locations in Pune which allows farmers to sell fresh produce directly to the customers, cutting out middlemen in the process. This allows customers to buy farm fresh goods at affordable rates, while the farmers who grow the produce get a fair price for it.
      </p>
        <div className='location_component'>
        <Location/>
        </div>
        <br/>
        <h1 className='heading_tertiary'>Cutting the middleman out</h1>
        <div className="info_scroll" >
        <img className="product-img" data-aos="fade-right" alt="XYZ" src="https://nitrocdn.com/RqugehZVJHpJabrJmBzbnfVbCdjHnQyq/assets/static/optimized/rev-0d4ba04/wp-content/uploads/2019/10/fresh-farm-produce_compressed-1.jpg" />
        <p className="pinfo" data-aos="fade-left">We at Wingrow Agritech facilitate direct interaction between consumers and farmers.</p>
        </div>
        <h1 className='heading_tertiary'>Awards and Accolades</h1>
        <div className="awards">
          <div className="sub_awards">
            <img className="awards_img" src="https://tse1.mm.bing.net/th?id=OIP.KrAOSP4q6rZREEnmLCBwUwHaHa&pid=Api&P=0&w=160&h=160" alt="img" />
            <h1>Youth Inspiration Award 2018</h1>
            <p className='p_secondary'>Wingrow Agritech founder Mr Mayur Pawar was awarded with the Youth Inspiratiuon Award 2018</p>
          </div>
          <div className="sub_awards">
            <img className="awards_img" src="https://tse1.mm.bing.net/th?id=OIP.KrAOSP4q6rZREEnmLCBwUwHaHa&pid=Api&P=0&w=160&h=160" alt="img" />
            <h1>Certified Organizer (Ayojak) of MSMB</h1>
            <p className='p_secondary'>Wingrow Agritech Pvt. Ltd is a Certified Organizer (Ayojak) of MSMB</p>
          </div>
          <div className="sub_awards">
            <img className="awards_img" src="https://tse1.mm.bing.net/th?id=OIP.KrAOSP4q6rZREEnmLCBwUwHaHa&pid=Api&P=0&w=160&h=160" alt="img" />
            <h1>GSEA (Global Student Entrepreneur Award)</h1>
            <p className='p_secondary'>The Global Student Entrepreneur Awards (GSEA) for students operate a business while in university.</p>
          </div>
        </div>
        <h1 className='heading_tertiary'>Supported By</h1>
        <div className="awards">
          <div className="sub_awards">
            <img className="awards_img" src="https://nitrocdn.com/RqugehZVJHpJabrJmBzbnfVbCdjHnQyq/assets/static/optimized/rev-0d4ba04/wp-content/uploads/2020/04/unlimited-india_edit.png" alt="img" />
            <br/>
            <h2>UnLtd India</h2>
          </div>
          <div className="sub_awards">
            <img className="awards_img" src="https://nitrocdn.com/RqugehZVJHpJabrJmBzbnfVbCdjHnQyq/assets/static/optimized/rev-0d4ba04/wp-content/uploads/2020/04/Digital-Impact-Square.png" alt="img" />
            <br/>
            <h2>Digital Impact Square</h2>
          </div>
          <div className="sub_awards">
            <img className="awards_img" src="https://nitrocdn.com/RqugehZVJHpJabrJmBzbnfVbCdjHnQyq/assets/static/optimized/rev-0d4ba04/wp-content/uploads/2020/04/Entrepreneurs_Organization_edit.png" alt="img" />
            <br/>
            <h2>Entrepreneurs' Organization</h2>
          </div>
        </div>
  </div>
  </div>
  );
}

export default Dashboard;
