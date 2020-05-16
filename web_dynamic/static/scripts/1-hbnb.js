/* script allows to listen for changes on each INPUT checkbox tag */

$(() => {
  let dirAmeny = {};
  let str_ameny = null;
  $('li input:checkbox').css({'margin-right':'10px'});
  $('li input:checkbox').change(function () {
    if ($(this).prop('checked')) {
      //$('li input:checkbox').css('background-color','#33A8FF');
      dirAmeny[$(this).attr('data-id')] = $(this).attr('data-name');
      let allValues = Object.values(dirAmeny);
      allValues = allValues.join(', ');
      $('.amenities h4').text(allValues);

      /*
      if(str_ameny === null) {
        strAmeny = dirAmeny[$(this).attr('data-id')]
      } else {
        strAmeny = strAmeny + "," + dirAmeny[$(this).attr('data-id')];
      }
      $('.amenities h4').text(strAmeny);*/
      console.log(dirAmeny);

    } else {
      //$('li input:checkbox').css('background-color', '#FDFEFE');
      const idAmenyRemov = $(this).attr('data-id');
      console.log(idAmenyRemov);
      delete dirAmeny[idAmenyRemov];
      //$('.amenities h4').empty();
      let updateValues = Object.values(dirAmeny);
      updateValues = updateValues.join(', ');
      $('.amenities h4').text(updateValues);
      console.log(dirAmeny);
    }
  });
});
