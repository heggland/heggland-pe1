// const navButton = document.querySelector(".navButton");
let main = document.querySelector(".main");


// get url for the api
function getUrl(path, path2 = "") {

    const aspacex = "https://api.spacexdata.com/v4/launches/";
    const anasa = "https://api.nasa.gov/planetary/";
    const v4spaceX = "https://api.spacexdata.com/v4/";
    const company = "https://api.spacexdata.com/v4/company";

    const spacexLaunch = document.querySelector(".rocketLaunch");
    const spacexLaunchLatest = document.querySelector(".rocketLaunchLatest");
    const launchBanner = document.querySelector(".upcomingBanner");
    const apodImage = document.querySelector(".apodimage");
    const companyApp = document.querySelector(".companyapp");

// loader before api answer
    function loader(val, val2) {
        if (val) {
            val.innerHTML = `<img class="load" src="assets/img/load.gif">`;
        }
        // if page has more values, show loading.. on that innerhtml
        if (val2 == "more") {
            val.innerHTML = `<p class="paragraph justify-center"> Loading .. </p>`;
        }

    }

    if (path == "upcoming") {
        const value = path;
        let url = aspacex + value;
        loader(spacexLaunch);
        return url;
    } else if (path == "latest") {
        const value = path;
        let url = aspacex + value;
        loader(spacexLaunchLatest);
        return url;
    } else if (path == "next") {
        const value = path;
        let url = aspacex + value;
        loader(launchBanner);
        return url;
    } else if (path == "past") {
        const value = path;
        let url = aspacex + value;
        loader(spacexLaunch, "more");
        return url;
    } else if (path == "history") {
        const value = path;
        let url = v4spaceX + value;
//       loader(writeHistory, "more")
        return url;
    } else if (path == "apod") {
        const value = path;
        const key = "?api_key=DYxMrJbUSXN3UiJFWfQOAfYcsLYaavQLFqX5Zhpu";
        let url = anasa + value + key;
        loader(apodImage);
        return url;
    } else if (path == "company") {
        let url = company;
        loader(companyApp);
        return url;
    } else {
        // console.log("wrong value in getUrl");
    }
}


// one async function to rule all api calls
async function fetchApi(data, write, number) {

    const spacexLaunch = document.querySelector(".rocketLaunch");
    const spacexLaunchLatest = document.querySelector(".rocketLaunchLatest");
    const launchBanner = document.querySelector(".upcomingBanner");
    const writeHistory = document.querySelector(".history");
    const apodImage = document.querySelector(".apodimage");
    const companyApp = document.querySelector(".companyapp");

    try {
        // getting url for api call
        let man = data;
        // api call
        const response = await fetch(man);
        const intel = await response.json();

        // write to html
        if (write == "writeLatest") {
            writeLatest(intel, spacexLaunchLatest);
        } else if (write == "writePast") {
            writePast(intel, spacexLaunch);
        } else if (write == "writeUpcoming") {
            writeUpcoming(intel, spacexLaunch);
        } else if (write == "writeUpcomingBanner") {
            writeUpcomingBanner(intel, launchBanner);
        } else if (write == "writeHistory") {
            writeSitat(intel, writeHistory, number)
        } else if (write == "writeNasa") {
            writeNasa(intel, apodImage);
        } else if (write == "writeCompany") {
            writeCompany(intel, companyApp);
        }
    } catch (error) {
        console.log("error occurred", error);
        // write to html
        let write2;
        if (write == "writeLatest") {
            write2 = spacexLaunchLatest;
        } else if (write == "writePast") {
            write2 = spacexLaunch;
        } else if (write == "writeUpcoming") {
            write2 = spacexLaunch;
        } else if (write == "writeUpcomingBanner") {
            write2 = launchBanner;
        } else if (write == "writeHistory") {
            write2 = writeHistory;
        } else if (write == "writeNasa") {
            write2 = apodImage;
        } else if (write == "writeCompany") {
            write2 = companyApp;
        }
        write2.innerHTML = `<div class="full"><h1 class="paragraph text-center error">error fetching data, server down? Try reloading</h1></div>`;
    } finally {

    }
}

// write immage of the day
function writeNasa(get, write) {

    // console.log(get);
    write.innerHTML = "";

    let title = get.title;
    let url = get.url;
    let explanation = get.explanation;
    let copyright = get.copyright;


    // check if copyright is undefined, prints out photographer unknown
    if (!copyright) {
        copyright = "Photographer: unknown ";
    }

    write.innerHTML += `


<div class="flex-row helper-container apod-mobile">
<div class="flex-column">
<h1 class="paragraph text-center apod">${title}</h1>
<img class="flex-row dailyimg text-center" src="${url}">
<aside class="flex-row paragraph text-center apod">&copy; ${copyright} </aside>
</div

</div>

<div class="flex-row helper-container pad-bottom-15">
<p class="paragraph">${explanation}</p>
</div>


`
}

// START PAST
//write latest launch
function writeLatest(get, write) {

    write.innerHTML = ``;

    let flightDate = checkValue(get.date_utc);
    let details = checkValue(get.details);
    let flightNumber = checkValue(get.flight_number);
    let flightPatch = get.links.patch.small;
    let missionName = checkValue(get.name);
    let id = checkValue((get.id));
    let rocketId = checkValue(get.rocket)

    let newFlightDate = new Date(flightDate);

    let checkedPatch = patchCheck(flightPatch);


    let d = checkDigit(newFlightDate.getDate());
    let m = checkDigit(newFlightDate.getMonth() + 1);
    let y = newFlightDate.getFullYear();
    let hour = checkDigit(newFlightDate.getHours());
    let min = checkDigit(newFlightDate.getMinutes());

    write.innerHTML += `
    
    <div class="topbox"><div class="innerbox">
    <div class="flex-column">
        ${checkedPatch}
    </div>
    <div class="flex-column">
        <p class="flex-row paragraph">Mission: ${missionName}</p>
        <p class="flex-row paragraph">Number: ${flightNumber}</p>
        <p class="flex-row paragraph">Details: ${details}</p>
                <div class="flex-row">
    <p class="flex-row paragraph">Date: ${d}.${m}.${y} ${hour}:${min}</p>
    <p class="paragraph boxLink justify-center"><a href="launch.html?q=${id}&w=${rocketId}" class="link">View more</a></p>   
    </div>
    </div>

    </div></div>
    `;
}


// write past rocket launch
function writePast(get, write) {
    write.innerHTML = ``;
    let newGet = get.reverse();

    for (let i = 1; i < newGet.length; i++) {
        let flightDate = checkValue((newGet[i].date_utc));
        let details = checkValue((newGet[i].details));
        let flightNumber = checkValue((newGet[i].flight_number));
        let flightPatch = (newGet[i].links.patch.small);
        let missionName = checkValue((newGet[i].name));
        let id = checkValue((newGet[i].id));
        let rocketId = checkValue(newGet[i].rocket)

        let newFlightDate = new Date(flightDate);

        let d = checkDigit(newFlightDate.getDate());
        let m = checkDigit(newFlightDate.getMonth() + 1);
        let y = newFlightDate.getFullYear();
        let hour = checkDigit(newFlightDate.getHours());
        let min = checkDigit(newFlightDate.getMinutes());

        let checkedPatch = patchCheck(flightPatch);

        write.innerHTML += `

<div class="box"><div class="innerbox">
    <div class="flex-column">
        ${checkedPatch}
    </div>
    <div class="flex-column">
        <p class="flex-row paragraph">Mission: ${missionName}</p>
        <p class="flex-row paragraph">Number: ${flightNumber}</p>
        <p class="flex-row paragraph">Details: ${details}</p>p
        <div class="flex-row">
        <p class="flex-row paragraph">Date: ${d}.${m}.${y} ${hour}:${min}</p>
        <p class="paragraph justify-center"><a href="launch.html?q=${id}&w=${rocketId}" class="link">View more</a></p>   
        </div>
    </div>

    </div></div>`;

    }
}

// STOP PAST


// START UPCOMING
// write upcoming rocket launch
function writeUpcoming(get, write) {

    write.innerHTML = ``;

    for (let i = 0; i < get.length; i++) {
        let flightDate = checkValue((get[i].date_utc));
        let flightNumber = checkValue((get[i].flight_number));
        let flightPatch = (get[i].links.patch.small);
        let missionName = checkValue((get[i].name));
        let id = checkValue((get[i].id));
        let rocketId = checkValue(get[i].rocket)

        let newFlightDate = new Date(flightDate);

        let details;
        if (checkValue((get[i].details)) == "Not available at the moment ..") {
            details = ``;
        } else {
            details = `
       <p class="flex-row paragraph">Details: ${get[i].details}</p>
        `;
        }


        let d = checkDigit(newFlightDate.getDate());
        let m = checkDigit(newFlightDate.getMonth() + 1);
        let y = newFlightDate.getFullYear();
        let hour = newFlightDate.getHours();
        let min = newFlightDate.getMinutes();


        // check if launch time is set
        let time = [hour + min];
        if (time < 5) {
            time = ``;
        } else {
            hour = checkDigit(hour);
            min = checkDigit(min);
            time = [hour + ":" + min + ":00"];
        }


        let checkedPatch = patchCheck(flightPatch);

        write.innerHTML += `
    <div class="box"><div class="innerbox">
    <div class="flex-column">
        ${checkedPatch}
    </div>
    <div class="flex-column">
        <p class="flex-row paragraph">Mission: ${missionName}</p>
        <p class="flex-row paragraph">Number: ${flightNumber}</p>
        ${details}
        <div class="flex-row">
        <p class="flex-row paragraph">Date: ${d}.${m}.${y} ${time}</p>
        <p class="paragraph boxLink justify-center"><a href="launch.html?q=${id}&w=${rocketId}" class="link">View more</a></p>     
        </div>
  
    </div>

    </div></div>
        
        `;

    }

}

// STOP INDEX

// START INDEX
function writeCompany(get, write) {


    let name = get.name;
    let summaryC = get.summary;

    write.innerHTML = `
    <h1 class="paragraph">${name}</h1>
    <p class="paragraph">${summaryC}</p>
    `;
}

function writeSitat(get0, write, teller = 1) {

    let get;
    get = get0.reverse(); //show latest history

    let limit = Object.keys(get).length;

    for (let i = 0; i < get.length; i++) {
        let title = checkValue((get[i].title));
        let details = checkValue((get[i].details));
        let link = checkValue((get[i].links.article));
        let date = checkValue((get[i].event_date_utc));

        let newDate = new Date(date);

        if (i == teller) {
            break
        }

        write.innerHTML = ``;
        write.innerHTML = `
       <div class="sitat"> 
        <p class="paragraph">${title}</p>
<p class="paragraph">${newDate}</p>
        <div class="divscroll">
        <p class="paragraph">${details}</p>
<p class="paragraph"><a href="${link}" class="link">Go to article</a></p>
</div>        
        
        <span class="max">${limit}</span>
</div>
        `
        // <span class="paragraph max">${limit}</span>
    }

}


// countdown timer on launch day
function writeUpcomingBanner(get, write) {

    let tweet = twitter();

    let name = checkValue((get.name));
    let flightDate = checkValue((get.date_utc));
    let id = checkValue((get.id));
    let rocket = checkValue(get.rocket)

    let newFlightDate = new Date(flightDate);


    // convert next flight date
    let d = checkDigit(newFlightDate.getDate());
    let m = checkDigit(newFlightDate.getMonth() + 1);
    let y = newFlightDate.getFullYear();
    let hour = checkDigit(newFlightDate.getHours());
    let min = checkDigit(newFlightDate.getMinutes());

    let today = new Date();
    let d0 = today.getDate();
    let m0 = today.getMonth() + 1;
    let y0 = today.getFullYear();

    // check if upcoming launch is today, if it is - launch timer
    if (d0 == d && m0 == m && y0 == y) {
        console.log("launch in progress");
        showTimer(newFlightDate, today, get, write);

    } else {
        console.log("launched");

        let upcoming = `
        
        <section id="section-launch" class="center-fix upcoming desktop show-section hide">

        <div class="container justify-center">
        <div class="content-text">

        <div class="paragraph text-center">
        <div class="flex-column">
        <h1 class="row-control space">Next launch</h1>
        <p class="row-control space">${name}</p>
        <p class="row-control space">${d}.${m}.${y}</p>
        <p class="row-control space">${hour}:${min}</p>
        ${tweet}
        <a href="launch.html?q=${id}&w=${rocket}" class="link0 banner-link"><p>Read more</p></a>     
        </div>
        </div>
    
       </section>
        `;

        launchDay(upcoming);

        async function launchDay(upcoming) {

            const write = document.querySelector(".upcomingBanner");
            const url = "https://api.spacexdata.com/v4/launches/latest";
            try {

                const response = await fetch(url);
                const intel = await response.json();

                let date = checkValue(intel.date_local);

                let bannerContent = document.querySelector(".banner-content");

                let tweet = twitter();


                // test if today is launch day
                let test = new Date(date);
                let testD = test.getDate();
                let testM = test.getMonth() + 1;

                let today = new Date();
                let todayD = today.getDate();
                let todayM = today.getMonth() + 1;

                if (testD == todayD && testM == todayM) {
                    console.log("launch today");


                    let webcast = intel.links.webcast;
                    let id = checkValue(intel.id);
                    let rocket = checkValue(intel.rocket);
                    let missionName = checkValue((intel.name));

                    let flightDate = new Date(date);
                    let hour = flightDate.getHours();
                    let min = flightDate.getMinutes();

                    let video;
                    if (checkValue(webcast) == "Not available at the moment ..") {
                        video = ``;
                    } else {
                        video = `
       <div class="boxLink flex-row">
       <a href="${webcast}" class="link0 flex-row justify-center row-control baseline">
       <p class="paragraph">Watch stream</p>
       <img src="assets/img/Youtube_logo.svg" class="ytlogo" alt="${webcast}">
       </a>
       </div> 
  
        `;
                    }

                    bannerContent.innerHTML = ``;
                    bannerContent.innerHTML = `
        <p class="paragraph text-center">Recently launched</p>
        `;

                    write.innerHTML = `
       
        <section id="section-launch" class="center-fix upcoming desktop show-section hide">

        <div class="container justify-center">
        <div class="content-text">

        <div class="paragraph text-center">
        <div class="flex-column">
        <p class="row-control">${missionName}</p>
        <div class="baseline-desktop">${video}</div>
        ${tweet}
        <a href="launch.html?q=${id}&w=${rocket}" class="link0 banner-link"><p>Show more</p></a>     
        </div>
        </div>
       
        `;
                } else {
                    console.log("no launch today");
                    bannerContent.innerHTML = ``;
                    bannerContent.innerHTML = `
        <p class="paragraph text-center">Next launch</p>
        `;

                    write.innerHTML = upcoming;
                }

            } catch (error) {
                console.log("error occurred", error);
                write.innerHTML = "error fetching data, server down? Try reloading";
            } finally {

            }
        }

    }
}


async function recentLaunch() {

    const write = document.querySelector(".upcomingBanner");
    const url = "https://api.spacexdata.com/v4/launches/latest";

    try {

        // api call for launch
        const response = await fetch(url);
        const intel = await response.json();

        let webcast = intel.links.webcast;
        let date = checkValue(intel.date_local);
        let id = checkValue(intel.id);
        let rocket = checkValue(intel.rocket);
        let missionName = checkValue((intel.name));

        let flightDate = new Date(date);
        let hour = flightDate.getHours();
        let min = flightDate.getMinutes();

        let video;
        if (checkValue(webcast) == "Not available at the moment ..") {
            video = ``;
        } else {
            video = `
       <div class="boxLink flex-row">
       <a href="${webcast}" class="link0 flex-row justify-center row-control baseline">
       <p class="paragraph">Watch stream</p>
       <img src="assets/img/Youtube_logo.svg" class="ytlogo" alt="${webcast}">
       </a>
       </div> 
  
        `;
        }

        let bannerContent = document.querySelector(".banner-content");

        let tweet = twitter();

        bannerContent.innerHTML = ``;
        bannerContent.innerHTML = `
        <p class="paragraph text-center">Recently launched</p>
        `;

        write.innerHTML = `
       
        <section id="section-launch" class="center-fix upcoming desktop show-section hide">

        <div class="container justify-center">
        <div class="content-text">

        <div class="paragraph text-center">
        <div class="flex-column">
        <p class="row-control">${name}</p>
        <p class="row-control">${missionName}</p>
        <div class="baseline-desktop">${video}</div>
        ${tweet}
        <a href="launch.html?q=${id}&w=${rocket}" class="link0 banner-link"><p>Show more</p></a>     
        </div>
        </div>
       
        `;

    } catch (error) {
        // console.log("error occurred", error);
        write.innerHTML = "error fetching data, server down? Try reloading";
    } finally {

    }
}


// STOP INDEX


// check functions
function patchCheck(flightPatch) {
    if (flightPatch) {
        flightPatch = `<img src="${flightPatch}" class="flightpatch">`;
        return flightPatch;
    } else {
        flightPatch = `<img src="assets/img/patchcircle.png" class="flightpatch">`;
        return flightPatch;
    }
}

//checks if api call value is true or null. If null, returns nicely formatted text.
function checkValue(value) {
    if (value) {
        return value;
    } else {
        value = `Not available at the moment ..`
        return value;
    }
}
