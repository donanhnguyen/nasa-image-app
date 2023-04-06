function HotelPicSlider (props) {

    const {hotelsState} = props;

    function displaySlides () {
        if (hotelsState) {
            return hotelsState.map((hotel) => {
                return (
                    <div class="slide">
                        <img src={require(`../pics/${hotel.name.split(' ').join('')}.jpg`)} height="200" width="250" alt="" />
                    </div>
                )
            })    
        }
    }

    return (
        <div class="slider">
            <div class="slide-track">
                {displaySlides()};
            </div>
        </div>
    )
}

export default HotelPicSlider;