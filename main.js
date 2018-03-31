


const NEWS_SEARCH_URL = 'http://content.guardianapis.com/search';
const QUOTE_URL = 'https://favqs.com/api/qotd';
const SUNRISE_SUNSET_URL = 'https://api.sunrise-sunset.org/json';

/* ---------------------------------------get Data from API-------------------------------------------- */
function getDataFromApi(searchTerm, callback) {
    const settings = {
        url: NEWS_SEARCH_URL,
        data: {
            q: `${searchTerm}`,
            'api-key': 'bbf4d829-c55d-4dca-b2d3-addc895cb3d2',
            total: 4
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };

    $.ajax(settings);
}

function getDesignDataFromAPI(callback) {
    const settings = {
        url: QUOTE_URL,
        dataType: 'json',
        type: 'GET',
        success: callback
    };

    $.ajax(settings);
}

function getSunDataFromAPI(callback) {
    const settings = {
        url: SUNRISE_SUNSET_URL,
        data: {
         lat: 45.5202,
         lng: -122.6742,
         date: 'today'
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };

    $.ajax(settings);
}

/* ---------------------------------------RENDER RESULTS-------------------------------------------- */
function renderResult(result) {
    return `
            <div class="js-news"> 
                <a href="${result.webUrl}" target="_blank">${result.webTitle}</a>
            </div>
            `;

}

function renderDesignResult(designResult) {
    console.log(designResult);
    return `
        result[0].content + "<p>— " + results[0].title + "</p>
    `
}


/* ---------------------------------------DISPLAY DATA-------------------------------------------- */

function convertToPst(time) {
    console.log(time);
    moment.utc(time).toDate();
}

function displayNewsData(data) {
    const showResults = data.response.results.map((item, index) => renderResult(item));
    $('.js-news').html(showResults);
}


function displaySunData(sunData) {
    const convertedSunrise = convertToPst(sunData.results.sunrise);
    const convertedSunset = convertToPst(sunData.results.sunset);
    let sunResultText = `
            <h3> Mindful Day </h3>
            <div class="sun rise">Sunrise: ${convertedSunrise}</div>
            <div class="sun set">Sunset : ${convertedSunset}</div>
            <div class="sun day">Day Length : ${sunData.results.day_length}</div>`
    $('.js-sun').html(sunResultText);
}

// function displaySunData(sunData) {
//     let sunResultText = `
//             <h3> Mindful Day </h3>
//             <div class="sun rise">Sunrise: ${sunData.results.sunrise}</div>
//             <div class="sun set">Sunset : ${sunData.results.sunset}</div>
//             <div class="sun day">Day Length : ${sunData.results.day_length}</div>`
//     $('.js-sun').html(sunResultText);
// }

function displayQuoteData(quoteData) {
    let quoteResultText = `
    <p> " ${quoteData.quote.body}" -${quoteData.quote.author}`
    $('.js-quotes').html(quoteResultText);
}




/* ---------------------------------------WATCH SUBMIT------------------------------------------- */

function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        // clear out the input
        queryTarget.val("");
        getDataFromApi(query, displayNewsData);
    });
    // getDesignDataFromAPI(displayDesignData);
        getSunDataFromAPI(displaySunData);
        getDesignDataFromAPI(displayQuoteData);
    

}

$(watchSubmit);

// $(displayQuote);