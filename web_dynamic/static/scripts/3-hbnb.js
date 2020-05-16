/* script allows to listen for changes on each INPUT checkbox tag */

$(() => {
  $.get('http://localhost:5001/api/v1/status/', (response) => {
    if (response.status === 'OK') {
      $('header #api_status').addClass('available');
    }
  });
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    contentType:'application/json',
    data: '{}',
    type: 'POST',
    success: (response) => {
      response.forEach(item => {
        $('article .title_box h2').html(item.name);
	$('article .price_by_night').html(item.price_by_night);
	$('article .information .max_guest').html(item.max_guest + " Guests");
	$('article .information .number_rooms').html(item.number_rooms + " Bedrooms");
	$('article .information .number_bathrooms').html(item.number_bathrooms + " Bathrooms");
	$('article .description').html(item.description);
      });
    }
  });
  const dirAmeny = {};
  $('li input:checkbox').css({ 'margin-right': '10px' });
  $('li input:checkbox').change(function () {
    if ($(this).prop('checked')) {
      // $('li input:checkbox').css('background-color','#33A8FF');
      dirAmeny[$(this).attr('data-id')] = $(this).attr('data-name');
      let allValues = Object.values(dirAmeny);
      allValues = allValues.join(', ');
      $('.amenities h4 p').html(allValues);
    } else {
      // $('li input:checkbox').css('background-color', '#FDFEFE');
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
  });
});
