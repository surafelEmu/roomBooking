import React , {Fragment, useEffect}  from 'react'
import './home.css'

import Header from '../componets/header' ;
import Banner from '../componets/banner' ;
import Rooms from '../componets/rooms' ;
import Feautured  from '../componets/freutured_rooms';
import Special from '../componets/special_offers';
import Review from '../componets/review';
import Blog from '../componets/blog' ;
import Footer from '../componets/footer' ;
import Loader from '../componets/layout/loader/Loader';
import { getAllRooms } from '../actions/roomActions';

import {useDispatch , useSelector} from 'react-redux'
import { useAlert } from 'react-alert';

const Home = () => {

    // const contentStyle = {
    //    " background": 'url("assets/image/banner1.jpg")'
    // }

    const alert = useAlert() ;

    const dispatch = useDispatch() ;
    const {loading , rooms , error} = useSelector(state => state.rooms) ;

    useEffect( () => {
        
        if(error) {

            return alert.error(error)
        }

        dispatch(getAllRooms()) ;

       
    } , [dispatch , error  ])
    return (
        <Fragment>
            {loading ? <Loader />:(
        <Fragment>       <div> 
           <Header />
<section class="home" id="home">

<div class="swiper home-slider">

    <div class="swiper-wrapper">

        <div class="swiper-slide slide" 
        //style={{contentStyle}}
        >   

<form class="card">
								<div class="form-group">
									<span class="form-label">Your Destination</span>
									<input class="form-control" type="text" placeholder="Enter a destination or hotel name" />
								</div>
								<div class="row">
									<div class="col-sm-6">
										<div class="form-group">
											<span class="form-label">Check In</span>
											<input class="form-control" type="date" required />
										</div>
									</div>
									<div class="col-sm-6">
										<div class="form-group">
											<span class="form-label">Check out</span>
											<input class="form-control" type="date" required />
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-4">
										<div class="form-group">
											<span class="form-label">Rooms</span>
											<select class="form-control">
												<option>1</option>
												<option>2</option>
												<option>3</option>
											</select>
											<span class="select-arrow"></span>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-group">
											<span class="form-label">Adults</span>
											<select class="form-control">
												<option>1</option>
												<option>2</option>
												<option>3</option>
											</select>
											<span class="select-arrow"></span>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-group">
											<span class="form-label">Children</span>
											<select class="form-control">
												<option>0</option>
												<option>1</option>
												<option>2</option>
											</select>
											<span class="select-arrow"></span>
										</div>
									</div>
								</div>
								<div class="form-btn">
									<button class="btn">Check Avaliablity</button>
								</div>
							</form>
            {/* <div class="content">
                <span>upto 50% off</span>
                <h3>5star Hotels</h3>
                <a href="#" class="btn">Book now</a>
            </div> */}
        </div>

       
    </div>

    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>

</div>

</section>

{/* home section ends */}

{/* banner section starts  */}

<section class="banner-container">
<Banner image="assets/image/banner2.jpg"/>
<Banner image="assets/image/banner3.jpg" />


</section>

{/* banner section ends */}

{/* products section starts  */}

<section class="products" id="products">

<h1 class="heading"> exclusive <span>products</span> </h1>

<div class="filter-buttons">
    <div class="buttons active" data-filter="all">all</div>
    <div class="buttons" data-filter="arrivals">new arrivals</div>
    <div class="buttons" data-filter="featured">featured</div>
    <div class="buttons" data-filter="special">special offer</div>
    <div class="buttons" data-filter="seller">best seller</div>
</div>

<div class="box-container">
        {rooms.map(room => (
            <Rooms key={room._id} data={room} />
        ))}
   
</div>

</section>

{/* products section ends */}

{/* deal section starts  */}

<Feautured />

{/* deal section ends */}

{/* featured section starts  */}

<section class="featured" id="featured">

<h1 class="heading"> <span>featured</span> products </h1>

<div class="swiper featured-slider">
    
    <div class="swiper-wrapper">
    <Special />
    <Special />
       
    </div>

    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>

</div>

</section>

{/* featured section ends */}

{/* reviews section starts  */}

<section class="review" id="review">

<h1 class="heading"> client's <span>review</span> </h1>

<div class="swiper review-slide">

    <div class="swiper-wrapper">

            <Review />
    </div>

</div>

</section>

{/* reviews section ends */}

{/* contact section starts  */}
{/* 
<section class="contact" id="contact">

<h1 class="heading"> <span>contact</span> us </h1>

<div class="icons-container">

    <div class="icons">
        <i class="fas fa-map-marker-alt"></i>
        <h3>address</h3>
        <p>jogeshwari, mumbai, india - 400104</p>
    </div>

    <div class="icons">
        <i class="fas fa-envelope"></i>
        <h3>email</h3>
        <p>shaikhanas@gmail.com</p>
        <p>anasbhai@gmail.com</p>
    </div>

    <div class="icons">
        <i class="fas fa-phone"></i>
        <h3>phone</h3>
        <p>+123-456-7890</p>
        <p>+111-222-3333</p>
    </div>

</div>

<div class="row">

    <form action="">
        <h3>get in touch</h3>
        <div class="inputBox">
            <input type="text" placeholder="your name" />
            <input type="email" placeholder="your email" />
        </div>
        <div class="inputBox">
            <input type="number" placeholder="your number" />
            <input type="text" placeholder="your subject" />
        </div>
        <textarea placeholder="your message" cols="30" rows="10"></textarea>
        <input type="submit" value="send message" class="btn" />
    </form>

    <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30153.788252261566!2d72.82321484621745!3d19.141690214227783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aceef0c69%3A0x2aa80cf2287dfa3b!2sJogeshwari%20West%2C%20Mumbai%2C%20Maharashtra%20400047!5e0!3m2!1sen!2sin!4v1633431163028!5m2!1sen!2sin" allowfullscreen="" loading="lazy"></iframe>

</div>

</section> */}

{/* contact section ends */}

{/* blogs  section starts  */}

<section class="blogs" id="blogs">

<h1 class="heading"> our <span>blogs</span></h1>

<div class="swiper blogs-slider">

    <div class="swiper-wrapper">
        <Blog /> 

    </div>

    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>

</div>

</section>

{/* blogs  section ends */}

{/* footer section starts  */}

    <Footer />
</div>
</Fragment>
)}
</Fragment>

    )
}

export default Home ;