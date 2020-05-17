/* script allows to listen for changes on each INPUT checkbox tag */

$(() => {
  $.get('http://localhost:5001/api/v1/status/', (response) => {
    if (response.status === 'OK') {
      $('header #api_status').addClass('available');
    }
  });
  function temHtml (item) {
    return (
             `<article>
              <div class="title_box">
                <h2>${item.name}</h2>
                <div class="price_by_night">${item.price_by_night}</div>
              </div>
              <div class="information">
              <div class="max_guest">${item.max_guest} Guests </div>
                <div class="number_rooms">${item.number_rooms} Bedrooms</div>
                <div class="number_bathrooms">${item.number_bathrooms} Bathrooms</div>
              </div>
              <div class="description">${item.description}</div>
              </article>`
    );
  }
  function PostData (dataToPost) {
    if (dataToPost === '') {
      dataToPost = '{}';
    }
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: dataToPost,
      type: 'POST',
      success: (response) => {
        response.forEach(item => {
          const htmlVar = temHtml(item);
          $(htmlVar).appendTo('.places');
        });
      }
    });
  }
  PostData('');
  const dirAmeny = {};
  $('li input:checkbox').css({ 'margin-right': '10px' });
  $('li input:checkbox').change(function () {
    if ($(this).prop('checked')) {
      dirAmeny[$(this).attr('data-id')] = $(this).attr('data-name');
      let allValues = Object.values(dirAmeny);
      allValues = allValues.join(', ');
      $('.amenities h4 p').html(allValues);
    } else {
      const idAmenyRemov = $(this).attr('data-id');
      delete dirAmeny[idAmenyRemov];
      let updateValues = Object.values(dirAmeny);
      updateValues = updateValues.join(', ');
      if (updateValues.length === 0) {
        $('.amenities h4 p').html('&nbsp;');
      } else {
        $('.amenities h4 p').html(updateValues);
      }
    }
    let dataConvert = {};
    const dataToPost = Object.keys(dirAmeny);
    $('button').unbind();
    $('button').click(() => {
      if (dataToPost.length === 0) {
        $('.places').empty();
        PostData(JSON.stringify(dataConvert));
      } else {
        $('.places').empty();
        dataConvert = { amenities: dataToPost };
        PostData(JSON.stringify(dataConvert));
      }
    });
  });
});
