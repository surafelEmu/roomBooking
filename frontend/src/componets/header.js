const header = () => {
    return (

<header class="header">

<a href="#" class="logo"> Hotella </a>

<nav class="navbar">
    <a href="#home">home</a>
    <a href="#products">products</a>
    <a href="#featured">featured</a>
    <a href="#review">review</a>
    <a href="#contact">contact</a>
    <a href="#blogs">blogs</a>
</nav>

<div class="icons">
    <div id="menu-btn" class="fas fa-bars"></div>
    <div id="search-btn" class="fas fa-search"></div>
    <a href="#" class="fas fa-shopping-cart"></a>
    <a href="#" class="fas fa-heart"></a>
</div>

<form action="" class="search-form">
    <input type="search" name="" placeholder="search here..." id="search-box" />
    <label for="search-box" class="fas fa-search"></label>
</form>

</header>

    )
}

export default header ;