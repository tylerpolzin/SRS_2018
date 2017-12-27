/* global $ */

$(document).on("turbolinks:load", function() {
$("#newProductDiv").animate({left: 0, opacity: 100}, 500);
$('#vendorHidden').val($('#vendorSelect').val()); // Shows "Select Vendor" box if person logged in doesn't apply to paramaters in 'New' Head
});

$(function(){
$('#vendorSelect').on("change", function() {
  if ($('#vendorSelect').find('option:selected').text() == "Other...") {
    $('#vendorHidden').attr('placeholder', 'Enter Vendor Name Here').val("").removeClass('hidden');
    $('#vendorSelect').toggleClass('CustomerSelectBGColorOn');
    $('#vendorNameSelect').addClass('vendorNameSelected')
  }
  else {
    $('#vendorHidden').val($('#vendorSelect').val()).addClass('hidden');
    $('#vendorSelect').removeClass('CustomerSelectBGColorOn');
    $('#vendorNameSelect').removeClass('vendorNameSelected')
  }
});
});
