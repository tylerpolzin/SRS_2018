/* global $ */
/* global bootbox */
/* global basicConfirm */

//------------------------------------------------------------------------------------------------------
//                               Part "NEW" related CSS                                                |
//------------------------------------------------------------------------------------------------------


$(document).on("turbolinks:load", function(){
  $(".newPartProductSearch").select2({
    theme:"bootstrap",
    placeholder: "Select Product...",
  });

  $("#builder").closest(".row").html("");
  $("#namespace").closest(".row").html("");
  $("#parent_builder").closest(".row").html("");
  $("#child_index").closest(".row").html("");
  $(".body").find("tr:empty").remove();

  if ($(".body").find("tr").length > 1) {
    $("#editPartAdditions").addClass("details-highlight");
  }

  $(".partAttributeContainer").on("keyup", ".dynamicAttributeName", function(){
    var nameElem = $(this);
    var valueElem = nameElem.closest(".row").children("td").children(".text_field");
    var value = nameElem.val();
    valueElem.attr("id", "part_details_"+value);
    valueElem.attr("name", "part[details]["+value+"]");
  });
  
  $(".partAttributeContainer").on("click", ".removeRow", function(){
    $(this).closest(".row").html("").parent().find("tr:empty").remove();
  });
  
  $(".partAddAttribute").on("click", function(e){
    e.preventDefault();
    var contents = "<tr class='row'>" + $(".attributeTemplate").html() + "</tr>";
    $(".body").append(contents);
    $(".body").find(".row:last-child").find(".dynamicAttributeName").prop("required", true);
  });

  $("#partFirstSubmit").on("click", function(e) {
    e.preventDefault();
    var tr = $(".body").find("tr").length;
    if (tr > 1) {
      $(".hide-tag").remove();
    }
    $("#jstemplates").html("");
    $("#partSubmit").click();
  });

});

//------------------------------------------------------------------------------------------------------
//                               Part "EDIT" related CSS                                               |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#editNewImage").hide();
  $("#imageClose").hide();

  $(".deletePart").on("click", function(e) {
    e.preventDefault();
    basicConfirm("part");
  });

  if ($("#partFilesContainer tbody").find("tr").length > 0) {
    $("#editPartUploads").addClass("details-highlight");
  }

});

//------------------------------------------------------------------------------------------------------
//                               Part "SHOW" related CSS                                               |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function(){
  $(".partBelongsToSelect").select2({
    theme:"bootstrap",
    placeholder: "Multiple Products...",
    selectOnClose: false,
    allowClear: true,
    minimumResultsForSearch: 20
  });
});

//------------------------------------------------------------------------------------------------------
//                               Part "INDEX" related CSS                                              |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  // Function to add a leading zero to dates between 1-9
  var MyDate = new Date();
  var date;
  MyDate.setDate(MyDate.getDate());
  date = MyDate.getFullYear() + "-" + ("0" + (MyDate.getMonth()+1)).slice(-2) + "-" + ("0" + MyDate.getDate()).slice(-2);
  var child_columns = $(".partTableChildren").data("child-columns"); // Employees & Vendors have a different set of columns visible to them adjusted via the ProductTableChildren div on index.html.erb
  var table = $("#partsDataTable").DataTable({
                "scrollX": true,
                "scrollY": "75vh",
                "scrollCollapse": true,
                "colReorder": true,
                "dom": "<'parts-toolbar'>B<'top-row paginate'p><'glider-table't><'bottom-row paginate'ip>",
                "buttons": [
                  // Standard Column Visibility Button that lists all columns.  ".noVis" is disabled via CSS in Application.scss because the ":not" method doesn"t work here
                  {extend: "colvis", restore: "Revert", text: "<i class='fa fa-wrench' aria-hidden='true'></i> Columns <span class='caret'></span>", className: "btn btn-header"},

                  {extend: "collection", text: "<i class='fa fa-download' aria-hidden='true'></i> Export <span class='caret'></span>", className: "btn btn-header dtExportOptions",
                    buttons: [

                      {extend: "excelHtml5",
                        text: "<i class='fa fa-file-excel-o' aria-hidden='true'></i> Excel",
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
                        text: "<i class='fa fa-file-pdf-o' aria-hidden='true'></i> PDF",
                        title: "SRS Inventory Report, "+date+".pdf",
                        exportOptions: {columns: ":visible"},
                        className: "btn"},

                      {extend: "print",
                        text: "<i class='fa fa-print' aria-hidden='true'></i> Print",
                        exportOptions: {columns: ":visible"},
                        className: "btn"},

                      {extend: "copyHtml5",
                        text: "<i class='fa fa-copy' aria-hidden='true'></i> Copy",
                        exportOptions: {columns: ":visible"},
                        className: "btn"},
                    ]
                  }
                ],
                "bJQueryUI": true,
                "columnDefs": [
                  {
                  "targets": child_columns,
                  "visible": false,
                  },
                  {
                  "targets": [0],
                  "orderable": false
                  }
                ],
                "order": [[2, "asc"]],
                "oLanguage": {"sZeroRecords": "No parts to display for this view"},
              });

  table.page.len(50000).draw();

  $(".part-table tr td.quantities").each(function(){
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

  table.page.len(50).draw();

  function top_toolbar (products, brand_names, variables) {
    return ""+
      "<ul class='nav nav-tabs'>"+
      "  <li><div class='dataTables_filter'><input class='form-control' id='partTableSearch' placeholder='Search Table...'></div></li>"+
      "  <li>"+
      "    <div class='dataTables_length'>"+
      "      <select class='form-control' title='Number of records to show' id='partTableLength'>"+
      "        <option value='5'>5</option>"+
      "        <option value='10'>10</option>"+
      "        <option value='25'>25</option>"+
      "        <option selected='selected' value='50'>50</option>"+
      "        <option value='100'>100</option>"+
      "        <option value='-1'>All</option>"+
      "      </select>"+
      "   </div>"+
      "  </li>"+
      "  <li>"+
      "    <div class='partsFilterBy'><i class='fa fa-random' aria-hidden='true'></i> Filters:</div>"+
      "  </li>"+
      "  <li>"+
      "    <div class='partsQuantityRangeFilter'>"+
      "      <button type='button' class='btn header-btn dropdown-toggle' data-toggle='dropdown'><i class='fa fa-exchange' aria-hidden='true'></i> Quantity <span class='caret'></span></button>"+
      "      <ul class='dropdown-menu'>"+
      "        <li>"+
      "          <div class='input-quantity input-group'>"+
      "            <input type='number' class='form-control filterStartQty' id='partFilterStartQty' name='start' placeholder='Min' />"+
      "            <span class='input-group-addon'>to</span>"+
      "            <input type='number' class='form-control filterEndQty' id='partFilterEndQty' name='end' placeholder='Max' />"+
      "          </div>"+
      "        </li>"+
      "      </ul>"+
      "    </div>"+
      "  </li>"+
      ""+products+
      ""+brand_names+
      ""+variables+
      "</ul>"+
      "";
  }

  var children = $(".partTableChildren");
  $("div.parts-toolbar").html(top_toolbar(children.data("child-products"),
                                          children.data("child-brand_names"),
                                          children.data("child-variables")));
  $("#partTableSearch").addClear();
  $("#partTableSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
    table.search("").draw();
  });


  $("#partTableSearch").keyup(function(){
    table.search($(this).val()).draw() ;
  });
  
  // "Filter By Product" dropdown executes a search of a given product by searching Column 3, "MFR Product #"
  $("#partTableProductSearch").on("change", function() {
      table.column(3).search("").draw();
      table.column(3).search($("#partTableProductSearch").find("option:selected").attr("name")).draw();
  });
  $("#partTableProductSearch").select2({
    theme:"bootstrap",
    placeholder: "Filter by Product...",
    containerCssClass: "part-table-product-search",
    selectOnClose: false,
    dropdownAutoWidth : true,
    minimumResultsForSearch: 10
  });

  $("#partTableLength").on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });

  $(document).on("click", ".partProductFilterMenu", function (e) {
    e.stopPropagation(); // Stops the Brand Name Filter Menu from closing when an interior option is clicked
  });

  $(document).on("click", ".partsQuantityRangeFilter", function (e) {
    e.stopPropagation(); // Stops the Brand Name Filter Menu from closing when an interior option is clicked
  });
  $(document).on("click", ".partsBrandFilterMenu", function (e) {
    e.stopPropagation(); // Stops the Brand Name Filter Menu from closing when an interior option is clicked
  });
  $(".partsBrandFilterMenu").on("change", function() {
    var brands = $("input:checkbox[name='brand']:checked").map(function() {
      return "^" + this.value + ".*\$";
      }).get().join("|");
    if (brands === "") {
      table.column(2).search("xxxxxxxxxx").draw();
    }
    else
      table.column(2).search(brands, true, false, false).draw();
      console.log(brands);
  });


  $(document).on("click", ".booleanFilterMenu", function (e) {
    e.stopPropagation();
  });

  function toggle_boolean (def, col) { // "Filter" toggle menu which toggles whether the filters below are "On", "Off" or "Nil"
    if ($("input:checkbox[def="+def+"]").attr("bool") == "true" ) {
      table.column(col).search("true").draw();
      $("#"+def+"Clear").prop("disabled", false);
    }
    if ($("input:checkbox[def="+def+"]").attr("bool") == "false" ) {
      table.column(col).search("false").draw();
      $("#"+def+"Clear").prop("disabled", false);
      $("input:checkbox[def="+def+"]").parent().removeClass("nil");
    }
    $("#"+def+"Clear").on("click", function() { // Clears the search and puts the specified column back to "Nil" state
      if ($("input:checkbox[def="+def+"]").attr("bool") == "false") {
        $("input:checkbox[def="+def+"]").click();
      }
      $("input:checkbox[def="+def+"]").attr("bool", "");
      table.column(col).search("").draw();
      $(this).prop("disabled", true);
      $(this).prev().addClass("nil");
    });
  }

  $(".booleanFilterMenu").on("change", function() {
    $("input:checkbox[name='boolean']").on("change", function(){ // Activates the above "toggle_boolean" function
      if($(this).is(":checked"))
        $(this).attr("bool", "true");
      else
        $(this).attr("bool", "false");
    });
    toggle_boolean ("active", 16);
    toggle_boolean ("storeOrderable", 17);
    toggle_boolean ("warrantyOrderable", 18);
    toggle_boolean ("ecommSku", 19);
    toggle_boolean ("inStock", 20);
  });

  $("input:checkbox").change(function(){ // Takes care of the non-dataTables specific menu styling
    if($(this).is(":checked"))
      $(this).parent().parent().addClass("selected");
    else
      $(this).parent().parent().removeClass("selected");
  });


  function format (attributes, uploads, manufacturer, location, upc, orders, notes) {
    return ""+
   "<div class='glider'>"+
   "  <table class='part-listing-expando'>"+
   "    <thead>"+
   "      <tr>"+
   "        <th>Additional Attributes</th>"+
   "        <th>Associated Files</th>"+
   "        <th>Manufacturer</th>"+
   "        <th>Location</th>"+
   "        <th>UPC</th>"+
   "        <th>Recent Orders</th>"+
   "        <th>Meta Notes</th>"+
   "      </tr>"+
   "    </thead>"+
   "    <tbody>"+
   "      <tr class='no-table'>"+ // "no-table" class allows single-row expandos to not highlight on hover
   "        <td style='padding:0;'>"+attributes+"</td>"+
   "        <td style='padding:0;'>"+uploads+"</td>"+
   "        <td>"+manufacturer+"</td>"+
   "        <td>"+location+"</td>"+
   "        <td>"+upc+"</td>"+
   "        <td>"+orders+"</td>"+
   "        <td>"+notes+"</td>"+
   "      </tr>"+
   "    </tbody>"+
   "  </table>"+
   "</div>";
  }

  $("#partsDataTable").on("click", "td.details-control", function() {
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
      row.child(format(tr.data("child-attributes"), 
                       tr.data("child-uploads"),
                       tr.data("child-manufacturer"),
                       tr.data("child-location"),
                       tr.data("child-upc"),
                       tr.data("child-orders"),
                       tr.data("child-notes")), "no-padding").show();
      tr.addClass("shown");
      $("div.glider", row.child()).slideDown();
    }
  });

  $.fn.DataTable.ext.pager.numbers_length = 5; // Number of numbers to show in Pagination controls
  $.fn.dataTable.ext.search.push( // Function for the "Quantity Range Filter"
    function( settings, data, dataIndex ) {
      var min = parseInt( $('#partFilterStartQty').val(), 10 );
      var max = parseInt( $('#partFilterEndQty').val(), 10 );
      var qty = parseFloat( data[7] ) || 0; // '5' is the Quantity Column number

      if ( ( isNaN( min ) && isNaN( max ) ) ||
        ( isNaN( min ) && qty <= max ) ||
        ( min <= qty   && isNaN( max ) ) ||
        ( min <= qty   && qty <= max ) ) {
        return true;
        }
      return false;
    }
  );
  $("#partFilterStartQty").on("change keyup", function() { table.draw(); });
  $("#partFilterEndQty").on("change keyup", function() { table.draw(); });
  
});