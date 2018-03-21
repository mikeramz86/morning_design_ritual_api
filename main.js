
const NEWS_SEARCH_URL = 'http://content.guardianapis.com/search';

function getDataFromApi(searchTerm, callback) {
    const settings = {
        url: NEWS_SEARCH_URL,
        data: {
            q: `${searchTerm}`,
            key: 'bbf4d829-c55d-4dca-b2d3-addc895cb3d2',
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };

    $.ajax(settings);
}

function renderResult(result) {
    return `
            <div> 
                <p>${result.webTitle}</p>
                <p>${result.sectionName}</p>
            </div>
            `;

}

function displayNewsData(data) {
    const showResults = data.results.map((item, index) => renderResult(item));
    $('.js-news').html(showResults);
}

function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        // clear out the input
        queryTarget.val("");
        getDataFromApi(query, displayNewsData);
    });
}

$(watchSubmit);