import { Route } from "react-router-dom"
import CheckAval from "./CheckAval"

export default () => {
    return (
        <section class="home" id="home">

<div class="swiper home-slider">

    <div class="swiper-wrapper">

        <div class="swiper-slide slide" 
        //style={{contentStyle}}
        >   

            <Route render={({history}) => <CheckAval history={history} />} /> 
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
    )
}