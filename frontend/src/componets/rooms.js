const rooms = ({image}) => {
    return (
        <div class="box" data-item="featured">
        <div class="icons">
            <a href="#" class="fas fa-shopping-cart"></a>
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-search"></a>
            <a href="#" class="fas fa-eye"></a>
        </div>
        <div class="image">
            <img src={image} alt=""/>
        </div>
        <div class="content">
            <h3>product name</h3>
            <div class="price">
                <div class="amount">$20.00</div>
                <div class="cut">$25.00</div>
                <div class="offer">20% off</div>
            </div>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <span>(50)</span>
            </div>
        </div>
    </div>

    )
}

export default rooms ;