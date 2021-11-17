import React , {Fragment , useState, useEffect}  from 'react'
import './home.css'

import Header from '../componets/layout/header' ;
import Banner from '../componets/layout/banner' ;
import Rooms from '../componets/layout/rooms' ;
import Feautured  from '../componets/layout/freutured_rooms';
import Special from '../componets/layout/special_offers';
import Review from '../componets/layout/review';
import Blog from '../componets/layout/blog' ;
import Footer from '../componets/layout/footer' ;
import Loader from '../componets/layout/loader/Loader';
import { getAllRooms } from '../actions/roomActions';

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import {useDispatch , useSelector} from 'react-redux'
import { useAlert } from 'react-alert';
import HeadBanner from '../componets/layout/HeadBanner';

const { createSliderWithTooltip } = Slider ;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({match}) => {

    // const contentStyle = {
    //    " background": 'url("assets/image/banner1.jpg")'
    // }

    const alert = useAlert() ;

    const dispatch = useDispatch() ;
    const {loading , rooms , error} = useSelector(state => state.rooms) ;

    const keyword = match.params.keyword

    const [currentPage , setCurrentPage] = useState(1)
    const [price , setPrice] = useState([1 , 1000])
    const [catagory , setCatagory] = useState('') ;
    const [rating , setRating] = useState(0) ;

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
           <HeadBanner />

{/* home section ends */}

{/* banner section starts  */}
{keyword ? (
                                <Fragment>
                                    <div class="col-6 col-md-3 mt-5 mb-5">
                                        <div class="px-5">
                                            <Range
                                                marks={{
                                                    1: `$1`,
                                                    1000: `$1000`
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <hr class="my-5" />


                                            <hr class="my-3" />

                                            <div class="mt-5">
                                                <h4 class="mb-3">
                                                    Ratings
                                                </h4>

                                                <ul class="pl-0">
                                                    {[5, 4, 3, 2, 1].map(star => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={star}
                                                            onClick={() => setRating(star)}
                                                        >
                                                            <div class="rating-outer">
                                                                <div class="rating-inner"
                                                                    style={{
                                                                        width: `${star * 20}%`
                                                                    }}
                                                                >
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                    
                            <div class="box-container">
                                {rooms.map(room => (
                                     <Rooms key={room._id} data={room} />
                                     ))}
   
                            </div>
                                </Fragment>
                            ) : (
<Fragment >
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
    </Fragment>
    )
    }
   
</div>

</Fragment>
)}
</Fragment>

    )
}

export default Home ;