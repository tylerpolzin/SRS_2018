/*global $*/

//------------------------------------------------------------------------------------------------------
//                          'MAIN DIV' related JS                                                      |
//------------------------------------------------------------------------------------------------------

  
$(document).on("turbolinks:load", function() {
  $("#newIADiv").animate({left: 0, opacity: 100}, 500);
  $("#jstemplates").find(".productMovementSearchBox").next(".select2-container").addClass('hidden');
  $("#jstemplates").find(".partMovementSearchBox").next(".select2-container").addClass('hidden');
  $("#jstemplates").find(".current-quantity").hide();
  $("#jstemplates").find(".new-quantity").hide();
  $("#jstemplates").find(".negative-quantity").hide();
  $("#addItemButton").hide();
  $("#adjustSubmitButton").hide();
  if ($("#typeSelect option:selected").text() == "Select Type...") {
    $("#typeSelect option:selected").attr("disabled", true);
  }
});

$(function() { // Removes the "Submit" and "Add Item" buttons if either of the "History" tabs are clicked
  $("#newInventoryAdjust").on("click", function() {
    if ($("#typeSelect option:selected").text() == "Select Type...") {
      $("#addItemButton").fadeOut(300);
      $("#adjustSubmitButton").fadeOut(300);
    }
    else {
      $("#addItemButton").fadeIn(300);
      $("#adjustSubmitButton").fadeIn(300);
    }
  });
  $("#adjustHistory").on("click", function() {
    $("#addItemButton").fadeOut(300);
    $("#adjustSubmitButton").fadeOut(300);
  });
  $("#adjustHistoryIndividual").on("click", function() {
    $("#addItemButton").fadeOut(300);
    $("#adjustSubmitButton").fadeOut(300).delay( 800 );
    setTimeout(function(){ // Hacky way to fix the 'Individual' table's header columns.  Used in conjunction with the hidden '#hackFixButton' below
    $("#hackFixButton").click();},200);
  });
});


  
//------------------------------------------------------------------------------------------------------
//                          'NEW ADJUSTMENT' related JS                                                |
//------------------------------------------------------------------------------------------------------

$(function() { // Ensures that the "Add Item" and "Submit" buttons aren't visible when a Adjustment Type isn't selected
  $("#typeSelect").on("change", function() {
    if ($(this).text() == "Select Type...") {
      $("#addItemButton").fadeOut(300);
      $("#adjustSubmitButton").fadeOut(300);
    }
    else {
      $("#addItemButton").fadeIn(300);
      $("#adjustSubmitButton").fadeIn(300);
    }
  });
});

$(document).on("change", '.item-type', function() { // Changes the 'Item Select' box between 'Product' and 'Part' depending on what 'Item Type' is selected
  if ($(this).find('option:selected').text() == "Product") {
    $(this).closest("tr").find(".partMovementSearchBox").val([]).trigger("change").next(".select2-container").addClass('hidden');
    $(this).closest("tr").find(".productMovementSearchBox").next(".select2-container").removeClass('hidden');
    $(this).closest("tr").find(".current-quantity").show();
    $(this).closest("tr").find(".new-quantity").show();
    $(this).closest("tr").find(".negative-quantity").show();
  }
  if ($(this).find('option:selected').text() == "Part") {
    $(this).closest("tr").find(".productMovementSearchBox").val([]).trigger("change").next(".select2-container").addClass('hidden');
    $(this).closest("tr").find(".partMovementSearchBox").next(".select2-container").removeClass('hidden');
    $(this).closest("tr").find(".current-quantity").show();
    $(this).closest("tr").find(".new-quantity").show();
    $(this).closest("tr").find(".negative-quantity").show();
  }
  if ($(this).find('option:selected').text() == "Select Item Type...") {
    $(this).closest("tr").find(".productMovementSearchBox").val([]).trigger("change").next(".select2-container").addClass('hidden');
    $(this).closest("tr").find(".partMovementSearchBox").val([]).trigger("change").next(".select2-container").addClass('hidden');
    $(this).closest("tr").find(".current-quantity").hide();
    $(this).closest("tr").find(".new-quantity").hide();
    $(this).closest("tr").find(".negative-quantity").hide();
  }
});

$(document).on("change", '.productMovementSearchBox', function() {
  var previous_qty = $(this).closest("tr").find(".product-previous-qty").attr("value");
  $(".productMovementSearchBox option[value="+previous_qty+"]").prop("disabled", false);
  $(this).closest("tr").find(".current-quantity").val($(this).find("option:selected").data("quantity"));
  var current_quantity = $(this).closest("tr").find(".current-quantity").val();
  var new_quantity = $(this).closest("tr").find(".new-quantity").val();
  $(this).closest("tr").find(".new-quantity").val(new_quantity = current_quantity - 1);
  var disable_value = $(this).find("option:selected").attr("value"); // To ensure an item doesn't get selected in a batch more than once, the option is disabled the first time it is selected
  $(".productMovementSearchBox option[value="+disable_value+"]").prop("disabled", true);
  $(this).closest("tr").find(".product-previous-qty").attr("value", disable_value);
});

$(document).on("change", '.partMovementSearchBox', function() { // Same notes apply here as are found above in '.productMovementSearchBox'
  var previous_qty = $(this).closest("tr").find(".part-previous-qty").attr("value");
  $("#stockmovement_batch_stockmovements_attributes_new_stockmovements_part_id option[value="+previous_qty+"]").prop("disabled", false);
  $(this).closest("tr").find(".current-quantity").val($(this).find("option:selected").data("quantity"));
  var current_quantity = $(this).closest("tr").find(".current-quantity").val();
  var new_quantity = $(this).closest("tr").find(".new-quantity").val();
  $(this).closest("tr").find(".new-quantity").val(new_quantity = current_quantity - 1);
  var disable_value = $(this).find("option:selected").attr("value");
  $("#stockmovement_batch_stockmovements_attributes_new_stockmovements_part_id option[value="+disable_value+"]").prop("disabled", true);
  $(this).closest("tr").find(".part-previous-qty").attr("value", disable_value);
});

$(function() { // Secondary button that clicks the hidden "Add Item" button.  Required due to Helper parameters.
  $("#addItemButton").on("click", function() {
    $(".add_child_ia").click();
  });
});

$(function() { // To avoid sending duplicate items in a batch, each item's 'option' is disabled across all 'Item Select' boxes when that item is first selected.
               // Caveat is that when the form is submitted, a disabled 'option' doesn't get passed.  This function re-enables all options before finally submitting.
  $('#adjustSubmitButton').on("click", function(e) {
    $('option').prop("disabled", false);
  });
});

$(document).on("click", 'a.remove_child_ia', function() { // Triggers the removal of the relevant 'Item Select' table row when clicked
  var hidden_field = $(this).prev('input[type=hidden]')[0];
  $(this).closest("tr").find(".productMovementSearchBox").val([]).trigger("change")
  $(this).closest("tr").find(".partMovementSearchBox").val([]).trigger("change")
  if(hidden_field) {
    hidden_field.value = '1';
  }
  $(this).parents('.fields').remove();
  return false;
});

$(document).on("change keyup", '.negative-quantity', function() {
  var current_quantity = $(this).closest("tr").find(".current-quantity").val();
  var adjusted_quantity = $(this).val();
  var new_quantity = parseInt(current_quantity) + parseInt(adjusted_quantity)
  $(this).closest("tr").find(".new-quantity").val(new_quantity);
});

$(document).on("change keyup", '.new-quantity', function() {
  var current_quantity = $(this).closest("tr").find(".current-quantity").val();
  var negative_quantity = $(this).closest("tr").find(".negative-quantity").val();
  var new_quantity = parseInt($(this).val()) - parseInt(current_quantity)
  $(this).closest("tr").find(".negative-quantity").val(new_quantity);
});

$(document).on('click', 'a.add_child_ia', function() {
  var association, new_id, regexp, template;
  association = $(this).attr('data-association');
  template = $('#' + association + '_fields_template').html();
  regexp = new RegExp('new_' + association, 'g');
  new_id = (new Date).getTime();
  $(this).parent().before(template.replace(regexp, new_id));
  $(this).parent().prev().find(".productMovementSearchBox").select2({
    theme:"bootstrap",
    placeholder: "Select Product...",
    containerCssClass: "vslpSearchCss",
    selectOnClose: true,
  });
  $(this).parent().prev().find(".partMovementSearchBox").select2({
    theme:"bootstrap",
    placeholder: "Select Part...",
    containerCssClass: "vslpSearchCss",
    selectOnClose: true,
  });
  $(this).parent().prev().find('.select2-container').next('.select2-container').addClass('hidden'); // Cycles through the jstemplate to prepare all relevant box visibility on click
  $(this).parent().prev().find('.select2-container').addClass('hidden');
  $(this).parent().prev().find('.item-type').val("Product");
  $(this).parent().prev().find(".productMovementSearchBox").next(".select2-container").removeClass('hidden');
  $(this).parent().prev().find(".current-quantity").show();
  $(this).parent().prev().find(".new-quantity").show();
  $(this).parent().prev().find(".negative-quantity").show();
  $(".IAItemSelectHeader").removeClass("hidden");
  $(".IAItemSelectBottomBorder").removeClass("hidden");
  return false;
});

//------------------------------------------------------------------------------------------------------
//                          'BATCH HISTORY' related JS                                                 |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  var table = $('#adjustHistoryDataTable').DataTable({
                "scrollX": true,
                "scrollY": true,
                "dom": '<"adjust-history-toolbar"><"col-md-12 glider-table"t><"col-md-12"ip>',
                "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
                "pageLength": 10,
                "bJQueryUI": true,
                "columnDefs": [
                  {
                  "targets": [4],
                  "visible": false,
                  },
                  {
                  "targets": [0],
                  "orderable": false
                  }
                ],
                "order": [[1, 'desc']],
                "oLanguage": {"sZeroRecords": "No records to display for this view"}
              });
  table.page.len(10).draw();

  $("div.adjust-history-toolbar").html(''+
    '<ul class="nav nav-tabs">'+
    ' <li><div class="dataTables_filter"><input class="form-control" id="adjustHistoryTableSearch" placeholder="Search Table..."></div>'+
    ' <li>'+
    '    <div class="dataTables_length">'+
    '     <select '+
    '       class="form-control"'+
    '       title="Number of records to show"'+
    '       id="adjustHistoryTableLength">'+
    '       <option value="5">5</option>'+
    '       <option value="10">10</option>'+
    '       <option value="25">25</option>'+
    '       <option selected="selected" value="50">50</option>'+
    '       <option value="100">100</option>'+
    '       <option value="-1">All</option>'+
    '     </select>'+
    '   </div>'+
    ' </li>'+
    '</ul>'+
    '');
  $('#adjustHistoryTableSearch').keyup(function(){
    table.search($(this).val()).draw() ;
  });
  $('#adjustHistoryTableLength').on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });

  function format (type, items, adjust_quantity, new_quantity, notes) {
    return ''+
   '<div class="glider">'+
   '  <table class="adjust-history-expando">'+
   '    <tr>'+
   '      <td>Type</td>'+
   '      <td>Items</td>'+
   '      <td>Difference</td>'+
   '      <td>New Quantity</td>'+
   '      <td>Notes</td>'+
   '    </tr>'+
   '    <tr>'+
   '      <td>'+type+'</td>'+
   '      <td>'+items+'</td>'+
   '      <td>'+adjust_quantity+'</td>'+
   '      <td>'+new_quantity+'</td>'+
   '      <td>'+notes+'</td>'+
   '    </tr>'+
   '  </table>'+
   '</div>';
  }

  $('#adjustHistoryDataTable').on('click', 'td.details-control', function() {
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
      row.child(format(tr.data('child-type'), tr.data('child-items'), tr.data('child-adjust_quantity'), tr.data('child-new_quantity'), tr.data('child-notes')), 'no-padding').show();
      tr.addClass('shown');
      td.tooltip('disable');
      $('div.glider', row.child()).slideDown();
    }
  });
});

//------------------------------------------------------------------------------------------------------
//                          'INDIVIDUAL HISTORY' related JS                                            |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  var table = $('#adjustHistoryIndividualDataTable').DataTable({
                "scrollX": true,
                "scrollY": true,
                "dom": '<"adjust-history-individual-toolbar"><"col-md-12 glider-table"t><"col-md-12"ip>',
                "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
                "pageLength": 10,
                "bJQueryUI": true,
                "order": [[0, 'desc']],
                "oLanguage": {"sZeroRecords": "No records to display for this view"},
                "fnDrawCallback": function() {
                  $(table).tooltip('enable');
                }
              });

  $("div.adjust-history-individual-toolbar").html(''+
    '<ul class="nav nav-tabs">'+
    ' <li><a class="btn hidden" id="hackFixButton">Click Me</a></li>'+
    ' <li><div class="dataTables_filter"><input class="form-control" id="adjustHistoryIndividualTableSearch" placeholder="Search Table..."></div>'+
    ' <li>'+
    '    <div class="dataTables_length">'+
    '     <select '+
    '       class="form-control"'+
    '       title="Number of records to show"'+
    '       id="adjustHistoryIndividualTableLength">'+
    '       <option value="5">5</option>'+
    '       <option value="10">10</option>'+
    '       <option value="25">25</option>'+
    '       <option selected="selected" value="50">50</option>'+
    '       <option value="100">100</option>'+
    '       <option value="-1">All</option>'+
    '     </select>'+
    '   </div>'+
    ' </li>'+
    '</ul>'+
    '');
  $('#adjustHistoryIndividualTableSearch').keyup(function(){
    table.search($(this).val()).draw();
  });
  $('#adjustHistoryIndividualTableLength').on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw();
  });
  $('#hackFixButton').on("click", function(){
    table.page.len(25).draw();
  });
  table.page.len(50).draw();
});
$(document).on("turbolinks:load", function() {
  $('#adjustHistoryIndividualTableSearch').val("f");
  $('#adjustHistoryIndividualTableSearch').val("");
});
