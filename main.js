


const NEWS_SEARCH_URL = 'http://content.guardianapis.com/search';
const DESIGN_QUOTE_URL = 'http://quotesondesign.com/wp-json/posts';
const SUNRISE_SUNSET_URL = 'https://api.sunrise-sunset.org/json'
//https://api.sunrise-sunset.org/json?lat=45.5202&lng=-122.6742&date=today
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

// function getDesignDataFromAPI(callback) {
//     const settings = {
//         url: DESIGN_QUOTE_URL,
//         data: {
//             'filter[orderby]': 'rand&filter',
//             posts_per_page: 1
//         },
//         dataType: 'json',
//         type: 'GET',
//         success: callback
//     };

//     $.ajax(settings);
// }

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

// function renderDesignResult(designResult) {
//     return `
//         result[0].content + "<p>— " + results[0].title + "</p>
//     `
// }

function renderSunResult(sunResult) {
    console.log(sunResult);
    return `
    <p>${sunResult.sunrise}</p>
    <p>${sunResult.sunset}</p>
    <p>${sunResult.day_length}</p>
    `

}

/* ---------------------------------------DISPLAY DATA-------------------------------------------- */

function displayNewsData(data) {
    const showResults = data.response.results.map((item, index) => renderResult(item));
    $('.js-news').html(showResults);
}

// function displayDesignData(data) {
//     const showDesignResults = data.content.map((item,index) => renderDesignResult(item));
//     $('.js-quotes').html(showDesignResults);
// }

function displaySunData(sunData) {
    console.log(displaySunData);
    const showSunResults = sunData.results.map((item,index) => renderSunResult(item));
    $('.js-sun').html(showSunResults);
}


// function displayQuote() {
//     $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
//         $(".js-quote").append(a[0].content + "<p>— " + a[0].title + "</p>")
//     });
// }


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
    

}

$(watchSubmit);

// $(displayQuote);