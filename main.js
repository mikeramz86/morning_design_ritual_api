
const NEWS_SEARCH_URL = 'https://content.guardianapis.com/search';

function getDataFromApi(callback) {
  const settings = {
    url: NEWS_SEARCH_URL,
    data: {
      q: 'business',
      key: 'bbf4d829-c55d-4dca-b2d3-addc895cb3d2',
      max_Results: 5
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
        $(".js-news").append('result.results.webTitle');

}

getDataFromApi();
renderResult();