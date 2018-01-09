/* global $ */
//------------------------------------------------------------------------------------------------------
//                               Part 'NEW' related CSS                                                |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#newPartDiv").animate({left: 0, opacity: 100}, 500);
});

$(document).on("turbolinks:load", function(){
  $(".newPartProductSearch").select2({
    theme:"bootstrap",
    placeholder: "Select Product...",
    containerCssClass: "select2SearchCss",
    selectOnClose: true,
    dropdownAutoWidth: false
  });
})

//------------------------------------------------------------------------------------------------------
//                               Part 'EDIT' related CSS                                               |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#editPartDiv").animate({left: 0, opacity: 100}, 500);
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
//                               Product 'SHOW' related CSS                                            |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
$("#showPartDiv").animate({left: 0, opacity: 100}, 500);
});

//------------------------------------------------------------------------------------------------------
//                               Part 'INDEX' related CSS                                              |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  var table = $('#partsDataTable').DataTable({
                "scrollX": true,
                "scrollY": true,
                "dom": '<"parts-toolbar"><"col-md-12 glider-table"t><"col-md-12"ip>',
                "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
                "pageLength": 10,
                "bJQueryUI": true,
                "columnDefs": [
                  {
                  "targets": [12],
                  "visible": false,
                  },
                  {
                  "targets": [0],
                  "orderable": false
                  }
                ],
                "order": [[2, 'asc']],
                "oLanguage": {"sZeroRecords": "No parts to display for this view"}
              });
  table.page.len(50).draw();
  function top_toolbar (filter) {
    return ''+
      '<ul class="nav nav-tabs">'+
      ' <li class="active"><a data-toggle="tab" class="allpartsButton tab-background">All Parts</a></li>'+
      ' <li><div class="dataTables_filter"><input class="form-control" id="partTableSearch" placeholder="Search Table..."></div></li>'+
      ' <li><div class="dataTables_product_filter"><select class="form-control" id="partTableProductSearch" name="product[product_id]" id="product_product_id" data-cip-id="cIPJQ342845639"><option selected disabled>Filter by Product...</option><option name="">Clear Filter</option>'+filter+'</select></div></li>'+
      ' <li>'+
      '   <div class="dataTables_length">'+
      '     <select '+
      '       class="form-control"'+
      '       title="Number of records to show"'+
      '       id="partTableLength">'+
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
      '   <form class="button_to" method="get" action="/parts/new">'+
      '     <input class="btn" type="submit" value="Create New Part">'+
      '   </form>'+
      ' </li>'+
      '</ul>'+
      '';
  }
  $("div.parts-toolbar").html(top_toolbar($(".partTableChildren").data('child-filter')));
  
  $('#partTableProductSearch').on('change', function() {
    $('div.glider-table').slideUp(300);
    setTimeout(function() {
      table.column(4).search("").draw();
      table.column(4).search($("#partTableProductSearch").find("option:selected").attr("name")).draw();
    }, 280);
    $('div.glider-table').slideDown(300);
  });
    
  $('#partTableSearch').keyup(function(){
    table.search($(this).val()).draw() ;
  });
  $('#partTableLength').on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });

  function format (manufacturer, location, upc, orders, notes, dates) {
    return ''+
   '<div class="glider">'+
   '  <table class="part-listing-expando">'+
   '    <tr>'+
   '      <td>Manufacturer</td>'+
   '      <td>Location</td>'+
   '      <td>UPC</td>'+
   '      <td>Recent Orders</td>'+
   '      <td>Meta Notes</td>'+
   '      <td>Meta Dates</td>'+
   '    </tr>'+
   '    <tr>'+
   '      <td>'+manufacturer+'</td>'+
   '      <td>'+location+'</td>'+
   '      <td>'+upc+'</td>'+
   '      <td>'+orders+'</td>'+
   '      <td>'+notes+'</td>'+
   '      <td>'+dates+'</td>'+
   '    </tr>'+
   '  </table>'+
   '</div>';
  }

  $('#partsDataTable').on('click', 'td.details-control', function() {
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
      row.child(format(tr.data('child-manufacturer'), tr.data('child-location'), tr.data('child-upc'), tr.data('child-orders'), tr.data('child-notes'), tr.data('child-dates')), 'no-padding').show();
      tr.addClass('shown');
      td.tooltip('disable');
      $('div.glider', row.child()).slideDown();
    }
  });
});
