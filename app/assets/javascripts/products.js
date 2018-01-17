/* global $ */
//------------------------------------------------------------------------------------------------------
//                               Product 'NEW' related JS                                             |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#newProductDiv").animate({left: 0, opacity: 100}, 500);
  $('#vendorHidden').val($('#vendorSelect').val()); // Shows "Select Vendor" box if person logged in doesn't apply to paramaters in 'New' Head
  $('#vendorSelect').val($('#product_vendor_name').val());
  $('#brandSelect').val($('#product_brand_name').val());
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
//                               Product 'EDIT' related JS                                            |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#editProductDiv").animate({left: 0, opacity: 100}, 500);
  $("#editNewImage").hide();
  $("#imageClose").hide();
});

$(function() {
  $("#editImageOptions").on("change", function() {
    if ($("#editImageOptions").find("option:selected").text() == "Keep Current Image") {
      $("#editRemoveImage").prop("checked", false);
      $("#editNewImage").hide();
      $("#editImageTag").show().removeClass("image-border-red");
    }
    if ($("#editImageOptions").find("option:selected").text() == "Delete Current Image") {
      $("#editRemoveImage").prop("checked", true);
      $("#editNewImage").hide();
      $("#editImageTag").show().addClass("image-border-red");
    }
    if ($("#editImageOptions").find("option:selected").text() == "Replace Current Image") {
      $("#editRemoveImage").prop("checked", false);
      $("#editNewImage").show();
      $("#editImageTag").hide();
    }
  });
});

//------------------------------------------------------------------------------------------------------
//                               Product 'SHOW' related JS                                             |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#showProductDiv").animate({left: 0, opacity: 100}, 500);
  $(".showProductPartTable[id^='part-number-']").hide();
  $(".show-product-part-wrapper[id^='wrapper-number-']").hide();
  $("#part-number-0").show();
  $("#wrapper-number-0").show();
  $("#productShowPartSelect").on("change", function() {
    var selected = $("option:selected", this).val();
    $(".showProductPartTable[id^='part-number-']").hide();
    $(".show-product-part-wrapper[id^='wrapper-number-']").hide();
    $("#wrapper-number-"+selected).show();
    $("#part-number-"+selected).show();
  });
});

//                               'INVENTORY HISTORY' related JS                                        |



//------------------------------------------------------------------------------------------------------
//                               Product 'INDEX' related JS                                            |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  var table = $('#productsDataTable').DataTable({
                "scrollX": true,
                "scrollY": true,
                "dom": 'B<"products-toolbar"><"col-md-12 glider-table"t><"col-md-12"ip>',
                "buttons": [
                            {extend: 'copyHtml5', className: 'btn dtButtonMargin'},
                            {extend: 'excelHtml5', className: 'btn dtButtonMargin'},
                            {extend: 'csvHtml5', className: 'btn dtButtonMargin'},
                            {extend: 'pdfHtml5', className: 'btn dtButtonMargin'},
                            {extend: 'print', className: 'btn dtButtonMargin'},
                            {extend: 'colvis', className: 'btn dtButtonMargin'}
                            ],
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
                "order": [[2, 'asc']],
                "oLanguage": {"sZeroRecords": "No products to display for this view"}
              });
  table.page.len(50).draw();

  function top_toolbar (user_check) {
    return ''+
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
    ' </li>'+user_check+ // Pulls html from div in Index specifically to check for user permissions on "Create" buttons
    '</ul>'+
    '';
  }
  $("div.products-toolbar").html(top_toolbar($(".productTableChildren").data('child-user_check')));

  $('#productTableSearch').keyup(function(){
    table.search($(this).val()).draw() ;
  });
  $('#productTableLength').on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });

  function format (parts, manufacturer, upc, srs_sku, uploads, notes, dates) {
    return ''+
   '<div class="glider">'+
   '  <table class="product-listing-expando">'+
   '    <thead>'+
   '      <tr>'+
   '        <th>Associated Parts</th>'+
   '        <th>Manufacturer</th>'+
   '        <th>UPC</th>'+
   '        <th>SRS SKU</th>'+
   '        <th>Associated Files</th>'+
   '        <th>Meta Notes</th>'+
   '        <th>Meta Dates</th>'+
   '      </tr>'+
   '    </thead>'+
   '    <tbody>'+
   '      <tr>'+
   '        <td style="padding:0;">'+parts+'</td>'+
   '        <td>'+manufacturer+'</td>'+
   '        <td>'+upc+'</td>'+
   '        <td>'+srs_sku+'</td>'+
   '        <td>'+uploads+'</td>'+
   '        <td>'+notes+'</td>'+
   '        <td>'+dates+'</td>'+
   '      </tr>'+
   '    </tbody>'
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
      row.child(format(tr.data('child-parts'), tr.data('child-manufacturer'), tr.data('child-upc'), tr.data('child-srs_sku'), tr.data('child-uploads'), tr.data('child-notes'), tr.data('child-dates')), 'no-padding').show();
      tr.addClass('shown');
      td.tooltip('disable');
      $('div.glider', row.child()).slideDown();
    }
  });
});

