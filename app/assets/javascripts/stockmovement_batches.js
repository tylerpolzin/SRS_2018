/*global $*/
/*global bootbox*/

//------------------------------------------------------------------------------------------------------
//                          "SHOW" related JS                                                          |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $(".showDeleteStockmovement").on("click", function() {
    var id = $(this).attr("id");
    bootbox.confirm("Are you sure you want to undo this adjustment?", function(result){
      if (result === true) {
        $(".showStockmovementDelete[id='"+id+"'").click();
      }
    });
  });
});

//------------------------------------------------------------------------------------------------------
//                          "INVENTORY ADJUSTMENTS" related JS                                         |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#jstemplates").find(".productMovementSearchBox").next(".select2-container").addClass("hidden");
  $("#jstemplates").find(".partMovementSearchBox").next(".select2-container").addClass("hidden");
  $("#jstemplates").find(".current-quantity").hide();
  $("#jstemplates").find(".new-quantity").hide();
  $("#jstemplates").find(".adjust-quantity").hide();
  $("#addItemButton").hide();
  $("#add10ItemsButton").hide();
  $("#adjustSubmitButton").hide();
  if ($("#typeSelect option:selected").text() == "Select Type...") {
    $("#typeSelect option:selected").attr("disabled", true);
  }
});

$(function() { // Removes the "Submit" and "Add Item" buttons if either of the "History" tabs are clicked
  $("#newInventoryAdjust").on("click", function() {
    if ($("#typeSelect option:selected").text() == "Select Type...") {
      $("#addItemButton").fadeOut(300);
      $("#add10ItemsButton").fadeOut(300);
      $("#adjustSubmitButton").fadeOut(300);
    }
    else {
      $("#addItemButton").fadeIn(300);
      $("#add10ItemsButton").fadeIn(300);
      $("#adjustSubmitButton").fadeIn(300);
    }
  });
  $("#adjustHistory").on("click", function() {
    $("#addItemButton").fadeOut(300);
    $("#add10ItemsButton").fadeOut(300);
    $("#adjustSubmitButton").fadeOut(300);
    setTimeout(function(){ // Hacky way to fix the "Individual" tables header columns.  Used in conjunction with the hidden "#bhHackFixButton" below
    $("#bhHackFixButton").click();},200);
  });
  $("#adjustHistoryIndividual").on("click", function() {
    $("#addItemButton").fadeOut(300);
    $("#add10ItemsButton").fadeOut(300);
    $("#adjustSubmitButton").fadeOut(300).delay( 800 );
    setTimeout(function(){ // Hacky way to fix the "Individual" tables header columns.  Used in conjunction with the hidden "#ihHackFixButton" below
    $("#ihHackFixButton").click();},200);
  });
});

//------------------------------------------------------------------------------------------------------
//                          "NEW ADJUSTMENT" related JS                                                |
//------------------------------------------------------------------------------------------------------

$(function() { // Ensures that the "Add Item" and "Submit" buttons arent visible when a Adjustment Type isnt selected
  $("#typeSelect").on("change", function() {
    if ($(this).text() == "Select Type...") {
      $("#addItemButton").fadeOut(300);
      $("#add10ItemsButton").fadeOut(300);
      $("#adjustSubmitButton").fadeOut(300);
    }
    else {
      $("#addItemButton").fadeIn(300);
      $("#add10ItemsButton").fadeIn(300);
      $("#adjustSubmitButton").fadeIn(300);
    }
  });
});

$(document).on("change", ".item-type", function() { // Changes the "Item Select" box between "Product" and "Part" depending on what "Item Type" is selected
  var tr = $(this).closest("tr");
  if ($(this).find("option:selected").text() == "Product") {
    tr.find(".partMovementSearchBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".productMovementSearchBox").next(".select2-container").removeClass("hidden");
    tr.find(".current-quantity").show();
    tr.find(".new-quantity").show();
    tr.find(".adjust-quantity").show();
  }
  if ($(this).find("option:selected").text() == "Part") {
    tr.find(".productMovementSearchBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".partMovementSearchBox").next(".select2-container").removeClass("hidden");
    tr.find(".current-quantity").show();
    tr.find(".new-quantity").show();
    tr.find(".adjust-quantity").show();
  }
  if ($(this).find("option:selected").text() == "Select Item Type...") {
    tr.find(".productMovementSearchBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".partMovementSearchBox").val([]).trigger("change").next(".select2-container").addClass("hidden");
    tr.find(".current-quantity").hide();
    tr.find(".new-quantity").hide();
    tr.find(".adjust-quantity").hide();
  }
});

$(document).on("change", ".productMovementSearchBox", function() {
  var tr = $(this).closest("tr");
  var previous_qty = tr.find(".product-previous-qty").attr("value");
  $(".productMovementSearchBox option[value="+previous_qty+"]").prop("disabled", false);
  tr.find(".new-quantity").attr("readonly", false);
  tr.find(".adjust-quantity").attr("readonly", false);
  tr.find(".current-quantity").val($(this).find("option:selected").data("quantity"));
  var current_quantity = tr.find(".current-quantity").val();
  var new_quantity = tr.find(".new-quantity").val();
  tr.find(".new-quantity").val(new_quantity = current_quantity - 1);
  var disable_value = $(this).find("option:selected").attr("value"); // To ensure an item doesnt get selected in a batch more than once, the option is disabled the first time it is selected
  $(".productMovementSearchBox option[value="+disable_value+"]").prop("disabled", true);
  tr.find(".product-previous-qty").attr("value", disable_value);
  if (new_quantity == "0") {
    bootbox.alert("Quantity has reached zero.  Please check inventory before proceeding.");
  }
});

$(document).on("change", ".partMovementSearchBox", function() { // Same notes apply here as are found above in ".productMovementSearchBox"
  var tr = $(this).closest("tr");
  var previous_qty = tr.find(".part-previous-qty").attr("value");
  $("#stockmovement_batch_stockmovements_attributes_new_stockmovements_part_id option[value="+previous_qty+"]").prop("disabled", false);
  tr.find(".current-quantity").val($(this).find("option:selected").data("quantity"));
  var current_quantity = tr.find(".current-quantity").val();
  var new_quantity = tr.find(".new-quantity").val();
  tr.find(".new-quantity").val(new_quantity = current_quantity - 1);
  var disable_value = $(this).find("option:selected").attr("value");
  $("#stockmovement_batch_stockmovements_attributes_new_stockmovements_part_id option[value="+disable_value+"]").prop("disabled", true);
  tr.find(".part-previous-qty").attr("value", disable_value);
  if (new_quantity == "0") {
    bootbox.alert("Quantity has reached zero.  Please check inventory before proceeding.");
  }
});

$(function() { 
  $("#addItemButton").on("click", function() { // Secondary button that clicks the hidden "Add Item" button.  Required due to Helper parameters.
    $(".add_child_ia").click();
  });
});

$(function() { 
  $("#add10ItemsButton").on("click", function() { // Secondary button that clicks the hidden "Add Item" button.  Required due to Helper parameters.
    $(".add_child_ia").click();
    $(".add_child_ia").click();
    $(".add_child_ia").click();
    $(".add_child_ia").click();
    $(".add_child_ia").click();
    $(".add_child_ia").click();
    $(".add_child_ia").click();
    $(".add_child_ia").click();
    $(".add_child_ia").click();
    $(".add_child_ia").click();
  });
});

$(function() { // To avoid sending duplicate items in a batch, each items "option" is disabled across all "Item Select" boxes when that item is first selected.
               // Caveat is that when the form is submitted, a disabled "option" doesnt get passed.  This function re-enables all options before finally submitting.
  $("#adjustSubmitButton").on("click", function() {
    $("option").prop("disabled", false);
  });
});

$(document).on("click", "a.remove_child_ia", function() { // Triggers the removal of the relevant "Item Select" table row when clicked
  var tr = $(this).closest("tr");
  var hidden_field = $(this).prev("input[type=hidden]")[0];
  tr.find(".productMovementSearchBox").val([]).trigger("change");
  tr.find(".partMovementSearchBox").val([]).trigger("change");
  if(hidden_field) {
    hidden_field.value = "1";
  }
  $(this).parents(".fields").remove();
  return false;
});

$(document).on("change keyup", ".adjust-quantity", function() {
  var tr = $(this).closest("tr");
  var current_quantity = tr.find(".current-quantity").val();
  var adjusted_quantity = $(this).val();
  var new_quantity = parseInt(current_quantity, 10) + parseInt(adjusted_quantity, 10);
  tr.find(".new-quantity").val(new_quantity);
  var quantity = tr.find(".new-quantity").val();
  if (quantity == "0") {
    bootbox.hideAll();
    bootbox.alert("Quantity has reached zero.  Please check inventory before proceeding.");
  }
});

$(document).on("change keyup", ".new-quantity", function() {
  var tr = $(this).closest("tr");
  var current_quantity = tr.find(".current-quantity").val();
  var negative_quantity = tr.find(".adjust-quantity");
  var new_quantity = parseInt($(this).val(), 10) - parseInt(current_quantity, 10);
  negative_quantity.val(new_quantity);
  var quantity = tr.find(".new-quantity").val();
  if (quantity == "0") {
    bootbox.hideAll();
    bootbox.alert("Quantity has reached zero.  Please check inventory before proceeding.");
  }
});

$(document).on("click", "a.add_child_ia", function() {
  var association, new_id, regexp, template;
  association = $(this).attr("data-association");
  template = $("#" + association + "_fields_template").html();
  regexp = new RegExp("new_" + association, "g");
  new_id = (new Date).getTime();
  $(this).parent().before(template.replace(regexp, new_id));
  $(this).parent().prev().find(".productMovementSearchBox").select2({
    theme:"bootstrap",
    placeholder: "Select Product...",
    containerCssClass: "vslpSearchCss",
    selectOnClose: true,
    allowClear: true
  });
  $(this).parent().prev().find(".partMovementSearchBox").select2({
    theme:"bootstrap",
    placeholder: "Select Part...",
    containerCssClass: "vslpSearchCss",
    selectOnClose: true,
    allowClear: true
  });
  var prev = $(this).parent().prev();
  prev.find(".select2-container").next(".select2-container").addClass("hidden"); // Cycles through the jstemplate to prepare all relevant box visibility on click
  prev.find(".select2-container").addClass("hidden");
  prev.find(".item-type").val("Product");
  prev.find(".productMovementSearchBox").next(".select2-container").removeClass("hidden");
  prev.find(".current-quantity").show();
  prev.find(".new-quantity").show();
  prev.find(".adjust-quantity").show();
  $(".IAItemSelectHeader").removeClass("hidden");
  $(".IAItemSelectBottomBorder").removeClass("hidden");
  return false;
});

//------------------------------------------------------------------------------------------------------
//                          "BATCH HISTORY" related JS                                                 |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  var table = $("#adjustHistoryDataTable").DataTable({
                "scrollX": true,
                "scrollY": "75vh",
                "scrollCollapse": true,
                "colReorder": true,
                "dom": "<'adjust-history-toolbar'><'top-row paginate'p>t<'bottom-row paginate'ip>",
                "bJQueryUI": true,
                "columnDefs": [
                  {
                  "targets": 5,
                  "visible": false,
                  },
                  {
                  "targets": 0,
                  "orderable": false
                  }
                ],
                "order": [[1, "desc"]],
                "oLanguage": {"sZeroRecords": "No records to display for this view"}
              });
  table.page.len(50000).draw();

  $("div.adjust-history-toolbar").html(""+
    "<ul class='nav nav-tabs'>"+
    "  <li><a class='btn hidden' id='bhHackFixButton'></a></li>"+
    "  <li><div class='dataTables_filter'><input class='form-control' id='adjustHistoryTableSearch' placeholder='Search Table...'></div>"+
    "  <li>"+
    "    <div class='dataTables_length'>"+
    "      <select "+
    "        class='form-control'"+
    "        title='Number of records to show'"+
    "        id='adjustHistoryTableLength'>"+
    "        <option value='5'>5</option>"+
    "        <option value='10'>10</option>"+
    "        <option value='25'>25</option>"+
    "        <option selected='selected' value='50'>50</option>"+
    "        <option value='100'>100</option>"+
    "        <option value='-1'>All</option>"+
    "      </select>"+
    "    </div>"+
    "  </li>"+
    "</ul>"+
    "");
    $("#adjustHistoryTableSearch").addClear();
    $("#adjustHistoryTableSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
      table.search("").draw();
    });
    
  $("#adjustHistoryTableSearch").keyup(function(){
    table.search($(this).val()).draw() ;
  });
  $("#adjustHistoryTableLength").on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });

  function format (undo_header, body) {
    return ""+
   "<div class='glider'>"+
   "  <table class='adjust-history-expando'>"+
   "    <thead>"+
   "      <tr>"+
   "        <th>Item Type</th>"+
   "        <th>Model #</th>"+
   "        <th>Description</th>"+
   "        <th>Difference</th>"+
   "        <th>New Quantity</th>"+undo_header+
   "      </tr>"+
   "    </thead>"+
   "    <tbody>"+body+
   "    </tbody>"+
   "  </table>"+
   "</div>";
  }

  $("#adjustHistoryDataTable").on("click", "td.details-control", function() {
    var tr = $(this).closest("tr");
    var td = $(tr).find("td:first-child");
    var row = table.row(tr);
    if (row.child.isShown()) {
      $("div.glider", row.child()).slideUp(function() {
        row.child.hide();
        tr.removeClass("shown");
      });
    }
    else {
      row.child(format(tr.data("child-undo_header"),
                       tr.data("child-body"),
                       tr.data("child-notes")), "no-padding").show();
      tr.addClass("shown");
      $("div.glider", row.child()).slideDown();
    }
    $(".deleteStockmovement").on("click", function() {
      var id = $(this).attr("id");
      bootbox.confirm("Are you sure you want to undo this adjustment?", function(result){
        if (result === true) {
          $(".stockmovementDelete[id='"+id+"'").click();
        }
      });
    });
  });
  $("#bhHackFixButton").on("click", function(){
    table.page.len(50).draw(); // Fixes header column width issues
  });



});

//------------------------------------------------------------------------------------------------------
//                          "INDIVIDUAL HISTORY" related JS                                            |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  // Function to add a leading zero to dates between 1-9
  var MyDate = new Date();
  var date;
  MyDate.setDate(MyDate.getDate());
  date = MyDate.getFullYear() + "-" + ("0" + (MyDate.getMonth()+1)).slice(-2) + "-" + ("0" + MyDate.getDate()).slice(-2);

  var table = $("#adjustHistoryIndividualDataTable").DataTable({
                "scrollX": true,
                "scrollY": "75vh",
                "scrollCollapse": true,
                "colReorder": true,
                "dom": "<'adjust-history-individual-toolbar'>B<'top-row paginate'p>t<'bottom-row paginate'ip>",
                "buttons": [
                  // Button for toggling visibility of columns
                  {extend: "colvis", text: "<i class='fa fa-wrench' aria-hidden='true'></i> Columns <span class='caret'></span>", className: "btn btn-header"},

                  {extend: "collection", text: "<i class='fa fa-download' aria-hidden='true'></i> Export <span class='caret'></span>", className: "btn btn-header dtExportOptions",
                    buttons: [

                      {extend: "excelHtml5",
                        text: "<i class='fa fa-download' aria-hidden='true'></i> Excel <i class='fa fa-file-excel-o' aria-hidden='true'></i>",
                        title: "SRS Inventory Report, "+date+".xlsx",
                        // customize:
                        //   // Custom function to set the header row green and outlined.
                        //   function( xlsx ) {
                        //     var sheet = xlsx.xl.worksheets["sheet1.xml"];
                        //     $("row c[r*='2']", sheet).attr( "s", "42" );
                        //   },
                        // Only exports columns that are currently visible.  Adjusted by the "Visibility" dropdown and Filtered text.
                        exportOptions: { columns: ":visible" },
                        className: "btn"
                      },

                      {extend: "pdfHtml5",
                        text: "<i class='fa fa-download' aria-hidden='true'></i> PDF <i class='fa fa-file-pdf-o' aria-hidden='true'></i>",
                        title: "SRS Inventory Report, "+date+".pdf",
                        exportOptions: {columns: ":visible"},
                        className: "btn"},

                      {extend: "print",
                        text: "<i class='fa fa-download' aria-hidden='true'></i> Print <i class='fa fa-print' aria-hidden='true'></i>",
                        exportOptions: {columns: ":visible"},
                        className: "btn"},

                      {extend: "copyHtml5",
                        text: "<i class='fa fa-copy' aria-hidden='true'></i> Copy <i class='fa fa-file-text-o' aria-hidden='true'></i>",
                        exportOptions: {columns: ":visible"},
                        className: "btn"},

                    ]
                  }

                ],
                "columnDefs": [
                  {
                  "targets": [1,2],
                  "visible": false
                  },
                ],
                "bJQueryUI": true,
                "order": [[0, "desc"]],
                "oLanguage": {"sZeroRecords": "No records to display for this view"},
                "fnDrawCallback": function() {
                }

              });

  table.page.len(50000).draw();
  
  $(".adjust-history-individual-table tr td.quantities").each(function(){
    var cellValue = $(this).html();
    if(!isNaN(parseFloat(cellValue))) {
      if (cellValue == 0) {
        $(this).addClass("zeroQuantity");
      }
      if (cellValue > 0) {
        $(this).addClass("positiveQuantity");
      }
      if (cellValue < 0) {
        $(this).addClass("negativeQuantity");
      }
    }
  });
  

  function top_toolbar (brand_names) {
    return ""+
    "<ul class='nav nav-tabs'>"+
    "  <li><a class='btn hidden' id='ihHackFixButton'></a></li>"+
    "  <li><div class='dataTables_filter'><input class='form-control' id='adjustHistoryIndividualTableSearch' placeholder='Search Table...'></div>"+
    "  <li>"+
    "    <div class='dataTables_length'>"+
    "      <select class='form-control' title='Number of records to show' id='adjustHistoryIndividualTableLength'>"+
    "        <option value='5'>5</option>"+
    "        <option value='10'>10</option>"+
    "        <option value='25'>25</option>"+
    "        <option selected='selected' value='50'>50</option>"+
    "        <option value='100'>100</option>"+
    "        <option value='-1'>All</option>"+
    "      </select>"+
    "    </div>"+
    "  </li>"+
    "  <li>"+
    "    <div class='inventoryFilterBy'><i class='fa fa-random' aria-hidden='true'></i> Filter By:</div>"+
    "  </li>"+
    "  <li>"+
    "    <div class='inventoryDateRangeFilter'>"+
    "      <button type='button' class='btn header-btn dropdown-toggle' data-toggle='dropdown'><i class='fa fa-calendar' aria-hidden='true'></i> Date Range <span class='caret'></span></button>"+
    "      <ul class='dropdown-menu'>"+
    "        <li>"+
    "          <div class='input-daterange input-group' id='datepicker'>"+
    "            <input type='text' class='form-control filterStartDate' id='filterStartDate' name='start' placeholder='Start Date' />"+
    "            <span class='input-group-addon'>to</span>"+
    "            <input type='text' class='form-control filterEndDate' id='filterEndDate' name='end' placeholder='End Date' />"+
    "          </div>"+
    "        </li>"+
    "      </ul>"+
    "    </div>"+
    "  </li>"+brand_names+
    "  <li>"+
    "    <div class='button-group inventoryTypeFilter'>"+
    "      <button type='button' class='btn header-btn dropdown-toggle' data-toggle='dropdown'><i class='fa fa-wrench' aria-hidden='true'></i> Type <span class='caret'></span></button>"+
    "      <ul class='dropdown-menu inventoryTypeFilterMenu'>"+
    "        <li class='selected'><label><input type='checkbox' checked name='type' value='Ecomm Order'/>&nbsp;Ecomm Order</label></li>"+
    "        <li class='selected'><label><input type='checkbox' checked name='type' value='Warranty Order'/>&nbsp;Warranty Order</label></li>"+
    "        <li class='selected'><label><input type='checkbox' checked name='type' value='Physical Inventory'/>&nbsp;Physical Inventory</label></li>"+
    "        <li class='selected'><label><input type='checkbox' checked name='type' value='Product Return'/>&nbsp;Product Return</label></li>"+
    "        <li class='selected'><label><input type='checkbox' checked name='type' value='Defective Destroy'/>&nbsp;Defective Destroy</label></li>"+
    "      </ul>"+
    "    </div>"+
    "  </li>"+
    "</ul>"+
    "";
  }

  $("div.adjust-history-individual-toolbar").html(top_toolbar($(".adjustHistoryIndividualChildren").data("child-brand_names")));
  $("#adjustHistoryIndividualTableSearch").addClear();
  $("#adjustHistoryIndividualTableSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
    table.search("").draw();
  });
  
  $(document).on("click", ".inventoryDateRangeFilter", function (e) {
    e.stopPropagation(); // Stops the Inventory Type Filter Menu from closing when an interior option is clicked
  });
  $(document).on("click", ".inventoryTypeFilterMenu", function (e) {
    e.stopPropagation(); // Stops the Inventory Type Filter Menu from closing when an interior option is clicked
  });
  $(document).on("click", ".brandFilterMenu", function (e) {
    e.stopPropagation(); // Stops the Inventory Type Filter Menu from closing when an interior option is clicked
  });
  $(".inventoryTypeFilterMenu").on("change", function() {
    var types = $("input:checkbox[name='type']:checked").map(function() {
      return "^" + this.value + "\$"; // Searches the table for any of the values from the "inventoryTypeFilter" dropdown above
      }).get().join("|"); // example of generated text that is filtered: "^Ecomm Order$|^Warranty Order$|^Physical Inventory$"
    console.log(types);
    if (types === "") {
      table.column(7).search("xxxxxxxxxx").draw(); // if all checkboxes are unchecked, returns a true "Nil" instead of clearing the entire search parameter
    }
    else
      table.column(7).search(types, true, false, false).draw(); // RegEx?: True, Smart Filter?: False, Case Insensitive?: False
  });
  $(".brandFilterMenu").on("change", function() { // Same concept as Inventory Type Filter above
    var brands = $("input:checkbox[name='brand']:checked").map(function() {
      return "^" + this.value + "\$";
      }).get().join("|");
    if (brands === "") {
      table.column(2).search("xxxxxxxxxx").draw();
    }
    else
      table.column(2).search(brands, true, false, false).draw();
  });
  $("#adjustHistoryIndividualTableSearch").keyup(function(){
    table.search($(this).val()).draw();
  });
  $("#adjustHistoryIndividualTableLength").on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw();
  });
  $("#ihHackFixButton").on("click", function(){
    table.page.len(50).draw(); // Fixes header column width issues
  });
  $(".input-daterange").datepicker({
      format: "yyyy-mm-dd",
      clearBtn: true,
      startView: 1,
      maxViewMode: 2,
      todayBtn: true,
      todayHighlight: true
  });

  $("input:checkbox").change(function(){ // Takes care of the non-dataTables specific menu styling
    if($(this).is(":checked"))
      $(this).parent().parent().addClass("selected");
    else
      $(this).parent().parent().removeClass("selected");
  });



  $.fn.dataTableExt.afnFiltering.push( // Used for the "Filter By Date" Function
    function( oSettings, aData, iDataIndex ) {
      if(oSettings.nTable.id == "adjustHistoryIndividualDataTable"){
        var startDate = document.getElementById("filterStartDate").value;
        var endDate = document.getElementById("filterEndDate").value;
        var iStartDateCol = 0;
        var iEndDateCol = 0;
        startDate=startDate.substring(0,4) + startDate.substring(5,7)+ startDate.substring(8,10); // 0,4 = yyyyy 5,7 = dd 8,10 = dd == yyyy-mm-dd
        endDate=endDate.substring(0,4) + endDate.substring(5,7)+ endDate.substring(8,10);
        var datofini=aData[iStartDateCol].substring(0,4) + aData[iStartDateCol].substring(5,7)+ aData[iStartDateCol].substring(8,10);
        var datoffin=aData[iEndDateCol].substring(0,4) + aData[iEndDateCol].substring(5,7)+ aData[iEndDateCol].substring(8,10);
        if ( startDate == "" && endDate == "" ) { return true }
        else if ( startDate <= datofini && endDate == "") { return true }
        else if ( endDate >= datoffin && startDate == "") { return true }
        else if (startDate <= datofini && endDate >= datoffin) { return true }

        return false;
      }
      return true;
    }
  );
  $("#filterStartDate").on("change keyup", function() { table.draw(); });
  $("#filterEndDate").on("change keyup", function() { table.draw(); });

});