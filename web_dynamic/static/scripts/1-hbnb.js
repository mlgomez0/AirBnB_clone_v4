/* script allows to listen for changes on each INPUT checkbox tag */

$(() => {
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
