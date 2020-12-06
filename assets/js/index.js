fetchApi(getUrl("next"), "writeUpcomingBanner");
fetchApi(getUrl("company"), "writeCompany");
fetchApi(getUrl("history"), "writeHistory");


function showTimer(flightDate, today, get, write) {
    let bannerContent = document.querySelector(".banner-content");

    let name = checkValue(get.name);
    let flight_number = checkValue(get.flight_number);
    let rocket = checkValue(get.rocket);
    let id = checkValue(get.id);

    // get todays date
    let thisDay = today.getDate();
    // get launch day
    let launchDay = flightDate.getDate();

    let webcast = get.links.webcast;

    let video;
    //if (checkValue(webcast) == "Not available at the moment ..") {
    if (!webcast) {
        video = ``;
    } else {
        video = `
       <div class="boxLink flex-row">
       <a href="${webcast}" target="_blank" class="link0 flex-row justify-center row-control baseline">
       <p class="paragraph">Watch stream</p>
       <img src="assets/img/Youtube_logo.svg" class="ytlogo" alt="${webcast}">
       </a>
       </div> 
  
        `;
    }

    let returnedCountdown = setInterval(function () {
        let test = countdown(flightDate, get, write, returnedCountdown);
    }, 1000);

    let tweet = twitter();
    if (flightDate > today) {
        //console.log("teller");

        bannerContent.innerHTML = ``;
        bannerContent.innerHTML += `
        <p class="paragraph text-center">Launching soon!</p> 
        `;

        write.innerHTML = `
       
        <section id="section-launch" class="center-fix upcoming desktop show-section hide">

        <div class="container justify-center">
        <div class="content-text">

        <div class="paragraph text-center">
        <div class="flex-column">
        <p class="row-control">${name}</p>
          <p class="nedteller"></p>
        <div class="baseline-desktop">${video}</div>
        
        ${tweet}

        
        <a href="launch.html?q=${id}&w=${rocket}" class="link0 banner-link"><p>Read more</p></a>    
        </div>
        </div>
       </section>
      
        `;


    } else if (flightDate < today) {
        //console.log("stopped");
        clearInterval(returnedCountdown);
        recentLaunch();

    }

}

// date dummy format:
//    let testDate0 = "2020-11-25T15:21:00.000Z";
//     let testDate = new Date(testDate0);
//todo:  add 00:00 format to hour, min and sec
function countdown(date, get, write) {

    let todayDate = new Date();
    // now
    let nowHour = todayDate.getHours();
    let nowMin = todayDate.getMinutes();
    let nowSec = todayDate.getSeconds();

    // convert to timestamp
    let time = (nowHour * 3600) + (nowMin * 60) + nowSec;

    // end countdown
    let endHour = date.getHours();
    let endMin = date.getMinutes();
    let endSec = date.getSeconds();

    // convert to timestamp
    let time0 = (endHour * 3600) + (endMin * 60) + endSec;

    let timer = time0 - time;

    // convert to hour, min and sek
    let timerHou = Math.floor(timer / 3600);
    let timerMin = Math.floor(timer / 60) - (timerHou * 60);
    let timerSek = Math.floor(timer % 60);

    // merge into one string
    let countdownTimer = [timerHou, "h", timerMin, "min", timerSek, "sec"].join(' ');

    // check if countdown is reached
    if (timerHou < 0 || !timerMin < 0 || !timerSek < 0) {
        console.log("countdown reached");

        location.reload();

    } else {
        //console.log(countdownTimer);
        let nedTeller = document.querySelector(".nedteller");
        nedTeller.innerHTML = `${countdownTimer}`;

    }
}


function bannerButtonMobile() {
    let button = document.querySelector(".banner-mobile");

    button.addEventListener("click", function () {

        // toggle rocket launch view
        let section = document.querySelector(".show-section");
        section.classList.toggle("hide");

        // toggle content of page
        let content = document.querySelector(".section-main");
        content.classList.toggle("hide");
        let content2 = document.querySelector(".section-second");
        content2.classList.toggle("hide");
        let footer = document.querySelector(".footer");
        footer.classList.toggle("hide");

        // toggle banner
        let before = document.querySelector(".banner-before");
        before.classList.toggle("hide");

        // toggle header
        let header = document.querySelector("header");
        header.classList.toggle("hide");

        // show / hide button text
        let after = document.querySelector(".banner-after");
        after.classList.toggle("hide");

        let divdesktop = document.querySelector(".divdesktop");
        divdesktop.classList.toggle("hide");

        let bannerMobile = document.querySelector(".banner-mobile");
        bannerMobile.classList.toggle("close-margin");


        let littleHelper = document.querySelector(".close-bg");
        littleHelper.classList.toggle("trans-bg");

        // edit background
        let littleHelper1 = document.querySelector("#banner-box");
        littleHelper1.classList.toggle("trans-bg");

        let littleHelper2 = document.querySelector(".banner-mobile");
        littleHelper2.classList.toggle("trans-bg");

        let htmlBackground = document.querySelector("#html");
        htmlBackground.classList.toggle("black-bg");

        let sectionLaunch = document.querySelector("#section-launch");
        sectionLaunch.classList.toggle("black-bg");


        window.scrollTo(0, 0);


    })

}

function writeBannerMobile() {

    let write = document.querySelector(".banner-mobile");

    write.innerHTML = ``;

    write.innerHTML = `  
            <div class="littlehelper-container close-bg">
        <section id="banner-mobile">
        <div class="container">
            <div class="paragraph row-control justify-center">
                <div id="banner-button" class="show-button">

                    <div id="banner-box">
                    
                        <div class="flex-row">
                        <div class="banner-content banner-before banner-link0"></div>
                        </div>

                        <div class="flex-row close-zindex">
                            <p class="paragraph text-center banner-after hide">Close</p>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
    `

    bannerButtonMobile();
}


writeBannerMobile();


function scrollMilestone(limit) {
    let nextButton = document.querySelector("#next-milestone");
    let backtButton = document.querySelector("#past-milestone");
    let write = document.querySelector('.teller')

    let teller = 1;


    nextButton.addEventListener("click", function () {

        teller++;

        write.innerHTML = teller;

        console.log(teller);

        if (teller >= limit) {
            teller = limit;
            let stop = limit;
            write.innerHTML = `${stop}`;

        }


        fetchApi(getUrl("history"), "writeHistory", teller);


    });
    backtButton.addEventListener("click", function () {

        teller--;

        if (teller < 1) {
            teller = 1;
        }

        write.innerHTML = teller;

        // console.log(teller);

        fetchApi(getUrl("history"), "writeHistory", teller);

    });


}

setTimeout(function () {
    const teller = document.querySelector(".history-function");
    const limit = document.querySelector(".max").innerText;
    teller.innerHTML = ``;
    teller.innerHTML = `<div class="flex-row justify-center navigere-history">
                    <div class="paragraph" id="past-milestone"> < </div>
                    <div class="pad-lr-10">
                    <span class="paragraph teller">1</span><span class="paragraph"> / ${limit}</span></div>
                    <div class="paragraph" id="next-milestone"> > </div>
                </div>`;


    scrollMilestone(limit);

}, 1000);


