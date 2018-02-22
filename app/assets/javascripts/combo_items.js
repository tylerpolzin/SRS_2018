/* global $ */
/* global bootbox */
/* global basicConfirm */

//------------------------------------------------------------------------------------------------------
//                               Combo Item "NEW" related CSS                                          |
//------------------------------------------------------------------------------------------------------


$(document).on("turbolinks:load", function(){

  $(".newComboItemProductSearch").select2({
    theme:"bootstrap",
    placeholder: "Select Product...",
  });
  
  $("#builder").closest(".row").html("");
  $("#namespace").closest(".row").html("");
  $("#parent_builder").closest(".row").html("");
  $("#child_index").closest(".row").html("");
  $(".body").find("tr:empty").remove();

  if ($(".body").find("tr").length > 1) {
    $("#editcomboItemAttributes").addClass("details-highlight");
  }

  $(".comboItemAttributeContainer").on("keyup", ".dynamicAttributeName", function(){
    var nameElem = $(this);
    var valueElem = nameElem.closest(".row").children("td").children(".text_field");
    var value = nameElem.val();
    valueElem.attr("id", "combo_item_details_"+value);
    valueElem.attr("name", "combo_item[details]["+value+"]");
  });
  $(".comboItemAttributeContainer").on("click", ".removeRow", function(){
    $(this).closest(".row").html("").parent().find("tr:empty").remove();
    var tr = $(".body").find("tr").length;
    if (tr == 1) {
      $(".body").append(
        "<tr class='row hacky hidden'>"+
        "  <td>"+
        "    <input class='text_field dynamicAttributeName form-control' id='' name='' placeholder='New Attribute Name' type='text'/>"+
        "  </td>"+
        "  <td>"+
        "    <input class='text_field form-control' id='combo_item_details' name='combo_item[details]' placeholder='Description' type='text'/>"+
        "  </td>"+
        "  <td>"+
        "    <a href='#' class='removeRow'>X</a>"+
        "  </td>"+
        "</tr>"
      );
    }
  });
  $(".comboItemAddAttribute").on("click", function(e){
    e.preventDefault();
    if ($(".row.hacky").length) {
      $(".row.hacky").remove();
    }
    var contents = "<tr class='row'>" + $(".attributeTemplate").html() + "</tr>";
    $(".body").append(contents);
  });

});

//------------------------------------------------------------------------------------------------------
//                               Combo Items "INDEX" related CSS                                       |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  // Function to add a leading zero to dates between 1-9
  var MyDate = new Date();
  var date;
  MyDate.setDate(MyDate.getDate());
  date = MyDate.getFullYear() + "-" + ("0" + (MyDate.getMonth()+1)).slice(-2) + "-" + ("0" + MyDate.getDate()).slice(-2);
  var table = $("#comboItemsDataTable").DataTable({
                "scrollX": true,
                "scrollY": true,
                "colReorder": true,
                "dom": "<'combo-items-toolbar'>B<'top-row paginate'p><'glider-table't><'bottom-row paginate'ip>",
                "buttons": [
                  // Standard Column Visibility Button that lists all columns.  ".noVis" is disabled via CSS in Application.scss because the ":not" method doesn"t work here
                  {extend: "colvis", restore: "Revert", text: "<i class='fa fa-wrench' aria-hidden='true'></i> Column Visibility <span class='caret'></span>", className: "btn btn-header"},

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
                  "targets": [8,9],
                  "visible": false,
                  },
                  {
                  "targets": 0,
                  "orderable": false
                  }
                ],
                "order": [[2, "asc"]],
                "oLanguage": {"sZeroRecords": "No Combo Items to display for this view"},
              });

  table.page.len(50000).draw();

  table.page.len(50).draw();

  function top_toolbar (filter, brand_names, filters) {
    return ""+
      "<ul class='nav nav-tabs'>"+
      "  <li class='active'><a data-toggle='tab' class='comboItemsButton tab-background'>Combo Items</a></li>"+
      "  <li><div class='dataTables_filter'><input class='form-control' id='comboItemsTableSearch' placeholder='Search Table...'></div></li>"+
      "  <li>"+
      "    <div class='dataTables_product_filter'>"+
      "      <select class='form-control' id='comboItemsTableProductSearch' name='product[product_id]' id='product_product_id' data-cip-id='cIPJQ342845639'>"+
      "        <option selected disabled>Filter by Product...</option>"+
      "        <option name=''>Clear Filter</option>"+filter+
      "      </select>"+
      "    </div>"+
      "  </li>"+
      "  <li>"+
      "    <div class='dataTables_length'>"+
      "      <select class='form-control' title='Number of records to show' id='comboItemsTableLength'>"+
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
      "    <div class='comboItemsFilterBy'><i class='fa fa-random' aria-hidden='true'></i> Filter By:</div>"+
      "  </li>"+
      ""+brand_names+
      ""+filters+
      "</ul>"+
      "";
  }
  var children = $(".comboItemsTableChildren");
  $("div.combo-items-toolbar").html(top_toolbar(children.data("child-filter"),
                                                children.data("child-brand_names"),
                                                children.data("child-filters")));
  $("#comboItemsTableSearch").addClear();
  $("#comboItemsTableSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
    table.search("").draw();
  });

  // "Filter By Product" dropdown executes a search of a given product by searching Column 5, "Combo Items"
  $("#comboItemsTableProductSearch").on("change", function() {
      table.column(5).search("").draw();
      table.column(5).search($("#comboItemsTableProductSearch").find("option:selected").attr("name")).draw();
  });

  $("#comboItemsTableSearch").keyup(function(){
    table.search($(this).val()).draw() ;
  });
  $("#comboItemsTableLength").on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });
  
  $("#comboItemsTableProductSearch").select2({
    theme:"bootstrap",
    placeholder: "Filter by Product...",
    containerCssClass: "combo-item-table-product-search",
    selectOnClose: false,
    dropdownAutoWidth : true,
    minimumResultsForSearch: 10
  });
  
  function format (attributes, product_details, upc, dates) {
    return ""+
   "<div class='glider'>"+
   "  <table class='combo-items-listing-expando'>"+
   "    <thead>"+
   "      <tr>"+
   "        <th>Additional Attributes</th>"+
   "        <th>Product Details</th>"+
   "        <th>UPC</th>"+
   "        <th>Meta Notes</th>"+
   "      </tr>"+
   "    </thead>"+
   "    <tbody>"+
   "      <tr class='no-table'>"+ // "no-table" class allows single-row expandos to not highlight on hover
   "        <td style='padding:0;'>"+attributes+"</td>"+
   "        <td style='padding:0;'>"+product_details+"</td>"+
   "        <td>"+upc+"</td>"+
   "        <td>"+dates+"</td>"+
   "      </tr>"+
   "    </tbody>"+
   "  </table>"+
   "</div>";
  }

  $(document).on("click", ".comboItemsBrandFilterMenu", function (e) {
    e.stopPropagation(); // Stops the Brand Name Filter Menu from closing when an interior option is clicked
  });
  $(".comboItemsBrandFilterMenu").on("change", function() {
    var brands = $("input:checkbox[name='brand']:checked").map(function() {
      return "^" + this.value + ".*\$";
      }).get().join("|");
    if (brands === "") {
      table.column(3).search("xxxxxxxxxx").draw();
    }
    else
      table.column(3).search(brands, true, false, false).draw();
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
    toggle_boolean ("active", 8);
  });

  $("input:checkbox").change(function(){ // Takes care of the non-dataTables specific menu styling
    if($(this).is(":checked"))
      $(this).parent().parent().addClass("selected");
    else
      $(this).parent().parent().removeClass("selected");
  });





















  $("#comboItemsDataTable").on("click", "td.details-control", function() {
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
                       tr.data("child-product_details"),
                       tr.data("child-upc"),
                       tr.data("child-dates")), "no-padding").show();
      tr.addClass("shown");
      $("div.glider", row.child()).slideDown();
    }
  });
});