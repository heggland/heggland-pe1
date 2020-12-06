//show / hide div
function toggleEye(select, value) {
    let write = select;

    if (value == "mediaMenu") {
        write.classList.toggle("hide");
        write.classList.toggle("view-menu");
    } else {
        write.classList.toggle("hide");
    }
}

function menu() {
    let hamburger = document.querySelector(".hamburger-menu");

    hamburger.addEventListener("click", function () {

        let box = document.querySelector(".draw");

        let linje = document.querySelector(".linje");
        let linje1 = document.querySelector(".linje1");
        let linje2 = document.querySelector(".linje2");

        // rotate hamburger
        box.classList.toggle("roter");

        // rotate one line, push another up to the 2nd line center
        linje.classList.toggle("loddrett");
        toggleEye(linje1);
        linje2.classList.toggle("vannrett");

        // toggle menu
        let header = document.querySelector("#header");
        header.classList.toggle("full-height");

        let mediaMenu = document.querySelector(".media-menu");
        toggleEye(mediaMenu, "mediaMenu");

        // toggle content of page
        let content = document.querySelector(".content");
        content.classList.toggle("hide");


    })

}

menu();


// function more(val) {console.log(val);
//     let showMore = document.querySelector(".show-more");
//     showMore.addEventListener("click", function () {
//
//         let mediaMenu = document.querySelector("");
//         toggleEye(mediaMenu,"mediaMenu");
//
//     })
// }


function tilTop() {

    let top = window.top;
    let opp = document.querySelector(".navknapp");


    opp.addEventListener("click", toTop);

    function toTop() {
        window.scrollTo(0, 0);
    }

}

// add a 0 in front of hour/min if below 10
function checkDigit(val) {
    if (val < 10) {
        val = '0' + val;
    }
    return val;
}


// include hack with javascript
function twitter() {

    return `
            <div class="baseline-desktop">
       <div class="boxLink flex-row">
       <a href="https://twitter.com/SpaceX" target="_blank" class="link0 flex-row justify-center row-control baseline">
       <p class="paragraph">SpaceX updates</p>
       <img src="assets/img/Twitter-Social-Icons/Twitter%20Social%20Icons/Twitter%20Social%20Icons/Twitter_SocialIcon_Circle/Twitter_Social_Icon_Circle_Color.svg" class="twitter-svg" alt="Twitter logo">
       </a>
       </div>
       </div>
    `;
}