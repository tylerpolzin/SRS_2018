/* global $ */

// New Product JS

$(document).on("turbolinks:load", function() {
$("#newProductDiv").animate({left: 0, opacity: 100}, 500);
$('#vendorHidden').val($('#vendorSelect').val()); // Shows "Select Vendor" box if person logged in doesn't apply to paramaters in 'New' Head
$('#product_vendor_name').hide();
$('#product_brand_name').hide();
});

$(function(){
  $('#vendorSelect').on("change", function() {
    if ($('#vendorSelect').find('option:selected').text() == "Other...") {
      $('#vendorSelect').hide();
      $('#product_vendor_name').show();
    }
    else {
      $('#product_vendor_name').val($('#vendorSelect').val());
    }
  });
  $('#brandSelect').on("change", function() {
    if ($('#brandSelect').find('option:selected').text() == "Other...") {
      $('#brandSelect').hide();
      $('#product_brand_name').show();
    }
    else {
      $('#product_brand_name').val($('#brandSelect').val());
    }
  });
  
});

