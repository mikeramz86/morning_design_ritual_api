


const NEWS_SEARCH_URL = 'https://content.guardianapis.com/search';
const QUOTE_URL = 'https://favqs.com/api/qotd';
const SUNRISE_SUNSET_URL = 'https://api.sunrise-sunset.org/json';

/* ---------------------------------------get Data from API-------------------------------------------- */
function getDataFromApi(searchTerm, callback) {
    const settings = {
        url: NEWS_SEARCH_URL,
        data: {
            q: `${searchTerm}`,
            'api-key': 'bbf4d829-c55d-4dca-b2d3-addc895cb3d2',
            'page-size': 5
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
            date: 'today',
            formatted: 0
        },
        dataType: 'json',
        type: 'GET',
        success: callback,

    };

    $.ajax(settings);
}

/* ---------------------------------------RENDER RESULTS-------------------------------------------- */
function renderResult(result) {
    return `
            <div class="result"> 
                <a href="${result.webUrl}" target="_blank">${result.webTitle}</a>
            </div>
            `;

}


/* ---------------------------------------Converting UTC to PST-------------------------------------------- */

function convertToPst(dateString) {
    const test = new Date();
    const parseDate = new Date(dateString)
    const pst = parseDate.toLocaleString("en-US", { timeZone: "America/Los_Angeles", hour: 'numeric', minute: 'numeric' });
    return pst;
}


/* ---------------------------------------DISPLAY DATA-------------------------------------------- */

function displayNewsData(data) {
    const showResults = data.response.results.map((item, index) => renderResult(item));
    $('.js-news').html(showResults);
}


function displaySunData(sunData) {
    const convertedSunrise = convertToPst(sunData.results.sunrise);
    const convertedSunset = convertToPst(sunData.results.sunset);
    let sunResultText = `
            <h3> Mindful Day (Portland, OR) </h3>
            <p><small><i>Know when sunrises and sunsets</i></small></p>
            <hr class="line">
            <div class="sun rise">Sunrise: ${convertedSunrise}</div>
            <div class="sun set">Sunset : ${convertedSunset}</div>`
    $('.js-sun').html(sunResultText);
}


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
    getSunDataFromAPI(displaySunData);
    getDesignDataFromAPI(displayQuoteData);

}

$(watchSubmit);
