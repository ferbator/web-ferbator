window.addEventListener("load", function () {
    let linksArray = document.querySelectorAll("nav.menuOfPage a")
    console.log(linksArray)

    function active() {
        let path = window.location.href;
        let currentElement = path.split('#');
        if (currentElement.length > 1) {
            currentElement = currentElement[1]
        }

        for (let i = 0; i < linksArray.length; ++i) {
            console.log('#' + currentElement === linksArray[i].hash)
            if ('#' + currentElement === linksArray[i].hash) {
                linksArray[i].classList.add("navs")
            } else {
                linksArray[i].classList.remove("navs")
            }
        }
    }

    window.addEventListener("scroll", active)
    active()
})