function getString() {
    // get the querystring
    const queryString = document.location.search;
// create an object that will allows us to access all the querystring parameters
    const params = new URLSearchParams(queryString);
// get the id parameter from the querystrings
    const missionId = params.get("q");
    const rocketId = params.get("w");

    return {
        missionId: missionId,
        rocketId: rocketId,
    };
}


async function fetchMore() {
    const spacexLaunch = document.querySelector(".rocketLaunch");

    //get querystring
    let object = getString();
    let missionId = object.missionId;
    let rocketId = object.rocketId;

    const aspacex = "https://api.spacexdata.com/v4/launches/";
    const url = aspacex + missionId;

    const spacexRocket = "https://api.spacexdata.com/v4/rockets/";
    const url2 = spacexRocket + rocketId;

    const launchpadUrl = "https://api.spacexdata.com/v4/launchpads";
    const url3 = launchpadUrl;

    try {

        // api call for launchpad
        const response3 = await fetch(url3);
        const intel3 = await response3.json();
        let launchpad = intel3;

        // api call rocket
        const response2 = await fetch(url2);
        const intel2 = await response2.json();

        let rocketName = intel2.name;

        // api call for launch
        const response = await fetch(url);
        const intel = await response.json();


        // send rocketName to write function
        writeLaunch(intel, spacexLaunch, rocketName, launchpad);

    } catch (error) {
        console.log("error occurred", error);
        spacexLaunch.innerHTML = `<div class="full"><h1 class="paragraph text-center error">error fetching data, server down? Try reloading.</h1></div>`;
    } finally {

    }
}


function writeLaunch(get, write, rocketName, pad) {

    //start checking

    let patchLarge = get.links.patch.large;
    let checkedPatch = patchCheck(patchLarge);

    let redditCampaign = checkValue(get.links.reddit.campaign);
    let writeRedditCampaign = writeCheckedValue("redditCampaign", redditCampaign);

    let redditLaunch = checkValue(get.links.reddit.launch);
    let writeRedditLaunch = writeCheckedValue("redditLaunch", redditLaunch);

    let redditMedia = checkValue(get.links.reddit.media);
    let writeredditmedia = writeCheckedValue("redditMedia", redditMedia);

    // let flickr = checkValue(get.links.flickr.original);
    // let writeflickr = writeCheckedValue("flickr", flickr);

    let presskit = checkValue(get.links.presskit);
    let writePresskit = writeCheckedValue("presskit", presskit);

    let webcast = checkValue(get.links.webcast);
    // let writeWebcast = writeCheckedValue("webcast", webcast);

    let wikipedia = checkValue(get.links.wikipedia);
    let writeWikipedia = writeCheckedValue("wikipedia", wikipedia);

    // let staticFire = checkValue(get.static_fire_date_utc); //static_fire_date_utc
    // let writeStaticFire = writeCheckedValue("staticFire", staticFire);

    let failures = checkValue(get.failures);
    let writeFailures = writeCheckedValue("failures", failures);

    let details = checkValue(get.details);
    let writeDetails = writeCheckedValue("details", details);

    let crew = checkValue(get.crew);
    let writeCrew = writeCheckedValue("crew", crew);

    // let capsules = checkValue(get.capsules);
    // let writeCapsules = writeCheckedValue("capsules", capsules);
    //
    // let payloads = checkValue(get.payloads);
    // let writePayloads = writeCheckedValue("payloads", payloads);

    let launchpad = checkValue(get.launchpad);
    let writeLaunchpad = writeCheckedValue("launchpad", launchpad, pad);

    let flightNumber = checkValue(get.flight_number);
    let writeflightNumber = writeCheckedValue("flightNumber", flightNumber);

    let name = checkValue(get.name);
    let writeName = writeCheckedValue("name", name);

    let dateLocal = checkValue(get.date_local);

    let upcoming = checkValue(get.upcoming);
    let writeUpcoming = writeCheckedValue("upcoming", upcoming);

    let newFlightDate = new Date(dateLocal);

    let d = checkDigit(newFlightDate.getDate());
    let m = checkDigit(newFlightDate.getMonth() + 1);
    let y = newFlightDate.getFullYear();
    let hour = checkDigit(newFlightDate.getHours());
    let min = checkDigit(newFlightDate.getMinutes());

    // let cores = checkValue(get.cores[0]);
    // let writeCores = writeCheckedValue("cores", cores);
    // stop checking


    let video;
    if (checkValue(webcast) == "Not available at the moment ..") {
        video = ``;
    } else {
        video = `
       <div class="boxLink flex-row">
       <a href="${webcast}" target="_blank" class="link flex-row row-control">
       <p class="paragraph">Stream</p>

       </a>
       </div> 
       
        `;
    }

    //let flickr = checkValue(get.links.flickr.original);
    // let flickrImg = flickr.forEach(img => console.log(img));

    // time formating before write
    let time = [hour + ":" + min + ":00"];

    write.innerHTML = `   
         <div class="center0 flex-row">
        ${writeName}
        </div>  
    <div class="boxD">
    
  
    
    <div class="innerbox">
   
    <div class="flex-column">
        ${checkedPatch}
    </div>

    <div class="flex-column center0">
 ${writeflightNumber}

        <p class="flex-row paragraph">Date: ${d}.${m}.${y}</p>
            <p class="flex-row paragraph">Time:  ${time}</p>
           
        </div>
        <div class="flex-column center0">
                    
         <p class="flex-row paragraph">Rocket: ${rocketName} </p>
         ${writeUpcoming}  
<p class="flex-row"></p>
    
        </div>
    </div>
  </div>
</div>

 <div class="boxD"><div class="innerbox">
    <div class="flex-column center-mob">
    <p class="flex-row paragraph hide-mobile bold"> Details</p>
        ${writeDetails}
${writeLaunchpad}             
    </div>
  </div>
</div>

    <div class="boxD"><div class="innerbox">
    <div class="flex-column center0">
    <p class="flex-column paragraph bold">Links</p>
    </div>
    <div class="flex-column center0">   
    ${video}
${writePresskit}

</div>
<div class="flex-column center0">
${writeWikipedia}
${writeRedditCampaign}

</div>
<div class="flex-column center0">
${writeRedditLaunch}
${writeredditmedia}

</div>
    </div>

  </div>
</div>
<div class="box"><div class="innerbox">

    
    </div></div>
    
`

}

// ${writeCrew}
// ${writeFailures}
// ${writeCapsules}
// ${writeflickr}


fetchMore();


function writeCheckedValue(tag, value, val1 = ``, val2 = ``) {

    let verdi;
    if (value == "Not available at the moment ..") {
        verdi = ``;
        // console.log("!", tag);
        return verdi;
    } else if (!(value == "Not available at the moment ..") && (tag == "redditCampaign")) {
        if (value) {
            // console.log(tag, value);
            verdi = `

            <p class="flex-row paragraph"><a href="${value}" target="_blank" class="link">Reddit Campaign</a></p>
`;
            return verdi;
        } else {
            verdi = ``;
            return verdi;
        }
    } else if (!(value == "Not available at the moment ..") && (tag == "redditLaunch")) {
        if (value) {
            // console.log(tag, value);
            verdi = `
            <p class="flex-row paragraph"><a href="${value}" target="_blank" class="link">Reddit Launch</a></p>
`;
            return verdi;
        } else {
            verdi = ``;
            return verdi;
        }
    } else if (!(value == "Not available at the moment ..") && (tag == "redditMedia")) {
        if (value) {
            //console.log(tag, value);
            verdi = `
            <p class="flex-row paragraph"><a href="${value}" target="_blank" class="link">Reddit Media</a></p>
`;
            return verdi;
        } else {
            verdi = ``;
            return verdi;
        }
//     } else if (!(value == "Not available at the moment ..") && (tag == "flickr")) {  // only 1 image here TODO: show all on a unnerpage?
//         if (value) {
//             //console.log(tag, value);
//             verdi = `
//             <p class="flex-row paragraph"><a href="${value}" target="_blank" class="link">Selected image from flickr</a></p>
// `;
//             return verdi;
//         } else {
//             verdi = ``;
//             return verdi;
//         }
    } else if (!(value == "Not available at the moment ..") && (tag == "presskit")) {
        if (value) {
            //console.log(tag, value);
            verdi = `
            <p class="flex-row paragraph"><a href="${value}" target="_blank" class="link">Presskit</a></p>
`;
            return verdi;
        } else {
            verdi = ``;
            return verdi;
        }
    } else if (!(value == "Not available at the moment ..") && (tag == "wikipedia")) {
        if (value) {
            //console.log(tag, value);
            verdi = `
            <p class="flex-row paragraph"><a href="${value}" target="_blank" class="link">Wikipedia</a></p>
`;
            return verdi;
        } else {
            verdi = ``;
            return verdi;
        }
//     } else if (!(value == "Not available at the moment ..") && (tag == "staticFire")) {
//         if (value) {
//             //console.log(tag, value);
//             verdi = `
//             <p class="flex-row paragraph">${tag}</p>
//             <p class="flex-row paragraph">${value}</p>
// `;
//             return verdi;
//         } else {
//             verdi = ``;
//             return verdi;
//         }
    } else if (!(value == "Not available at the moment ..") && (tag == "failures")) {
        if (value) {
            //console.log(tag, value);
            verdi = `
            <p class="flex-row paragraph">${tag}</p>
            <p class="flex-row paragraph">${value}</p>
`;
            return verdi;
        } else {
            verdi = ``;
            return verdi;
        }
    } else if (!(value == "Not available at the moment ..") && (tag == "details")) {
        if (value) {
            //console.log(tag, value);
            verdi = `
    <p class="flex-row paragraph center-mob bold show-mobile"> Details</p>
            <p class="flex-row paragraph"> ${value}</p>
`;
            return verdi;
        } else {
            verdi = ``;
            return verdi;
        }
//     } else if (!(value == "Not available at the moment ..") && (tag == "capsules")) {
//         if (value) {
//             //console.log(tag, value);
//             verdi = `
//             <p class="flex-row paragraph">${tag}</p>
//             <p class="flex-row paragraph">${value}</p>
// `;
//             return verdi;
//         } else {
//             verdi = ``;
//             return verdi;
//         }
//     } else if (!(value == "Not available at the moment ..") && (tag == "payloads")) {
//         if (value) {
//             //console.log(tag, value);
//             verdi = `
//             <p class="flex-row paragraph">${tag}</p>
//             <p class="flex-row paragraph">${value}</p>
// `;
//             return verdi;
//         } else {
//             verdi = ``;
//             return verdi;
//         }
    } else if (!(value == "Not available at the moment ..") && (tag == "flightNumber")) {
        if (value) {
            //console.log(tag, value);
            verdi = `
            <p class="flex-row paragraph">Number: ${value}</p>
`;
            return verdi;
        } else {
            verdi = ``;
            return verdi;
        }
    } else if (!(value == "Not available at the moment ..") && (tag == "launchpad")) {
        if (value) {
            //console.log(tag, value);


            let launchpadName = checkLaunchpad(val1, value);

            verdi = ` <span class="show-mobile flex-row paragraph justify-center bold">Locaction</span>
            <p class="flex-row paragraph"><span class="hide-mobile bold">Locaction  </span> ${launchpadName}</p>
`;
            return verdi;
        } else {
            verdi = ``;
            return verdi;
        }
    } else if (!(value == "Not available at the moment ..") && (tag == "flightNumber")) {
        if (value) {
            //console.log(tag, value);
            verdi = `
            <p class="flex-row paragraph">Number: ${value}</p>
`;
            return verdi;
        } else {
            verdi = ``;
            return verdi;
        }
    } else if (!(value == "Not available at the moment ..") && (tag == "name")) {
        if (value) {
            //console.log(tag, value);
            verdi = `
            <h1 class="flex-row paragraph bold content-center">${value}</h1>
`;
            return verdi;
        } else {
            verdi = ``;
            return verdi;
        }
    } else if (!(value == "Not available at the moment ..") && (tag == "crew")) {
        if (value) {
            //console.log(tag, value);
            verdi = `
            <p class="flex-row paragraph">${tag}</p>
            <p class="flex-row paragraph">${value}</p>
`;
            return verdi;
        } else {
            verdi = ``;
            return verdi;
        }
    } else if (!(value == "Not available at the moment ..") && (tag == "upcoming")) {
        if (value) {
            //console.log(tag, value);

            if (value) {
                verdi = `
            <p class="flex-row paragraph">Upcoming launch</p>
`;
            } else {
                verdi = `
            <p class="flex-row paragraph">Canceled launch</p>
`;
            }
            return verdi;
        } else {
            verdi = ``;
            return verdi;
        }
    }

}


function checkLaunchpad(get, val) {

    for (let i = 0; i < get.length; i++) {

        let padName = get[i].full_name;
        let padId = get[i].id;

        // console.log(get);

        if (val == padId) {
            return padName;
        }

    }

}
