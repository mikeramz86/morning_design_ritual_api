const NEWS_SEARCH_URL = 'https://content.guardianapis.com/section';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: NEWS_SEARCH_URL,
    data: {
      q: `${searchTerm}`,
      key: 'bbf4d829-c55d-4dca-b2d3-addc895cb3d2',
      section: 'Art and Design',
      max_Results: 5
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
            <h2>
                ${result.WebTitle}
            </h2>
        
        </div>`
}

getDataFromApi();
renderResult();