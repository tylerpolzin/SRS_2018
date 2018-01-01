/* global $ */
//------------------------------------------------------------------------------------------------------
//                               Product 'NEW' related CSS                                             |
//------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------------
//                               Product 'EDIT' related CSS                                            |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
$("#editProductDiv").animate({left: 0, opacity: 100}, 500);
});

//------------------------------------------------------------------------------------------------------
//                               Product 'SHOW' related CSS                                            |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
$("#showProductDiv").animate({left: 0, opacity: 100}, 500);
});

//------------------------------------------------------------------------------------------------------
//                               Product 'INDEX' related CSS                                           |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  var table = $('#productsDataTable').DataTable({
                "scrollX": true,
                "scrollY": true,
                "dom": '<"products-toolbar"><"col-md-12 glider-table"t><"col-md-12"ip>',
                "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
                "pageLength": 10,
                "bJQueryUI": true,
                "columnDefs": [
                  {
                  "targets": [10],
                  "visible": false,
                  },
                  {
                  "targets": [0],
                  "orderable": false
                  }
                ],
                "order": [[1, 'asc']],
                "oLanguage": {"sZeroRecords": "No products to display for this view"}
              });
  table.page.len(50).draw();

  $("div.products-toolbar").html(''+
    '<ul class="nav nav-tabs">'+
    ' <li class="active"><a data-toggle="tab" class="allproductsButton tab-background">All Products</a></li>'+
    ' <li><div class="dataTables_filter"><input class="form-control" id="productTableSearch" placeholder="Search Table..."></div>'+
    ' <li>'+
    '    <div class="dataTables_length">'+
    '     <select '+
    '       class="form-control"'+
    '       title="Number of records to show"'+
    '       id="productTableLength">'+
    '       <option value="5">5</option>'+
    '       <option value="10">10</option>'+
    '       <option value="25">25</option>'+
    '       <option selected="selected" value="50">50</option>'+
    '       <option value="100">100</option>'+
    '       <option value="-1">All</option>'+
    '     </select>'+
    '   </div>'+
    ' </li>'+
    ' <li>'+
    '   <form class="button_to" method="get" action="/items/new">'+
    '     <input class="btn btn-success" type="submit" value="Create New Product">'+
    '   </form>'+
    ' </li>'+
    '</ul>'+
    '');
  $('#productTableSearch').keyup(function(){
    table.search($(this).val()).draw() ;
  });
  $('#productTableLength').on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });

  function format (parts, upc, uploads, notes, details, photo, pricing) {
    return ''+
   '<div class="glider">'+
   '  <table class="product-listing-expando">'+
   '    <tr>'+
   '      <td>Associated Parts</td>'+
   '      <td>UPC</td>'+
   '      <td>Attached Files</td>'+
   '      <td>Notes</td>'+
   '      <td>Other Details</td>'+
   '      <td>Product Photo</td>'+
   '      <td>Pricing</td>'+
   '    </tr>'+
   '    <tr>'+
   '      <td>'+parts+'</td>'+
   '      <td>'+upc+'</td>'+
   '      <td>'+uploads+'</td>'+
   '      <td>'+notes+'</td>'+
   '      <td>'+details+'</td>'+
   '      <td>'+photo+'</td>'+
   '      <td>'+pricing+'</td>'+
   '    </tr>'+
   '  </table>'+
   '</div>';
  }

  $('#productsDataTable').on('click', 'td.details-control', function() {
    var tr = $(this).closest('tr');
    var td = $(tr).find('td:first-child');
    var row = table.row(tr);
    if (row.child.isShown()) {
      $('div.glider', row.child()).slideUp(function() {
        row.child.hide();
        tr.removeClass('shown');
        td.tooltip('enable');
      });
    }
    else {
      row.child(format(tr.data('child-parts'), tr.data('child-upc'), tr.data('child-uploads'), tr.data('child-notes'), tr.data('child-details'), tr.data('child-photo'), tr.data('child-pricing')), 'no-padding').show();
      tr.addClass('shown');
      td.tooltip('disable');
      $('div.glider', row.child()).slideDown();
    }
  });
});

