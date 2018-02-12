/* global $ */
/* global bootbox */
/* global basicConfirm */

//------------------------------------------------------------------------------------------------------
//                               Product "NEW" related JS                                             |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#newProductDiv").animate({left: 0, opacity: 100}, 500);
  $("#vendorHidden").val($("#vendorSelect").val()); // Shows "Select Vendor" box if person logged in doesn"t apply to paramaters in "New" Head
  $("#vendorSelect").val($("#product_vendor_name").val());
  $("#brandSelect").val($("#product_brand_name").val());
  $("#product_vendor_name").hide();
  $("#product_brand_name").hide();

  $(function(){
    $("#vendorSelect").on("change", function() {
      if ($("#vendorSelect").find("option:selected").text() == "Other...") {
        $("#vendorSelect").hide();
        $("#product_vendor_name").show();
      }
      else {
        $("#product_vendor_name").val($("#vendorSelect").val());
      }
    });
    $("#brandSelect").on("change", function() {
      if ($("#brandSelect").find("option:selected").text() == "Other...") {
        $("#brandSelect").hide();
        $("#product_brand_name").show();
      }
      else {
        $("#product_brand_name").val($("#brandSelect").val());
      }
    });
  });

  $("#builder").closest(".row").html("");
  $("#namespace").closest(".row").html("");
  $("#parent_builder").closest(".row").html("");
  $("#child_index").closest(".row").html("");
  $(".productAttributeContainer").on("keyup", ".dynamicAttributeName", function(){
    var nameElem = $(this);
    var valueElem = nameElem.closest(".row").children("td").children(".text_field");
    var value = nameElem.val();
    valueElem.attr("id", "product_details_"+value);
    valueElem.attr("name", "product[details]['+value+']");
  });
  $(".productAttributeContainer").on("click", ".removeRow", function(){
    $(this).closest(".row").html("");
  });
  $(".productAddAttribute").on("click", function(e){
    e.preventDefault();
    var contents = "<tr class='row'>" + $(".attributeTemplate").html() + "</tr>";
    $(".body").append(contents);
  });

});

//------------------------------------------------------------------------------------------------------
//                               Product "EDIT" related JS                                            |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#editProductDiv").animate({left: 0, opacity: 100}, 500);
  $("#editNewImage").hide();
  $("#imageClose").hide();

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

  $(".deleteProduct").on("click", function(e) {
    e.preventDefault();
    basicConfirm("product");
  });

});


//------------------------------------------------------------------------------------------------------
//                               Product "SHOW" related JS                                             |
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

//------------------------------------------------------------------------------------------------------
//                               Product "INDEX" related JS                                            |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#productListDiv").animate({left: 0, opacity: 100}, 500);
  // Function to add a leading zero to dates between 1-9
  var MyDate = new Date();
  var date;
  MyDate.setDate(MyDate.getDate());
  date = MyDate.getFullYear() + "-" + ("0" + (MyDate.getMonth()+1)).slice(-2) + "-" + ("0" + MyDate.getDate()).slice(-2);
  var child_columns = $(".productTableChildren").data("child-columns"); // Employees & Vendors have a different set of columns visible to them adjusted via the ProductTableChildren div on index.html.erb
  var table = $("#productsDataTable").DataTable({
                // fixedHeader: { headerOffset: 56 },
                "scrollX": true,
                "scrollY": true,
                // "products-toolbar" = "top_toobar" function below. "B" = Buttons. "glider-table" = "format" function below that injects the Expando table into each row. "t" = The Table. "ip" = "Showing x of x" and Pagination controls.
                "dom": "<'products-toolbar'>B<'col-md-12 glider-table't><'col-md-12'ip>",
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
                "pageLength": 100,
                "bJQueryUI": true,
                "columnDefs": [
                  {
                  "targets": child_columns,
                  "visible": false,
                  },
                  {
                  "targets": [0,1],
                  "orderable": false
                  }
                ],
                "order": [[2, "asc"]],
                "oLanguage": {"sZeroRecords": "No products to display for this view"}
              });
              
  table.page.len(50000).draw();
  
  $(".product-table tr td.quantities").each(function(){
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

  function top_toolbar (user_check, brand_names, filters) {
    return ""+
    "<ul class='nav nav-tabs'>"+
    " <li class='active'><a data-toggle='tab' class='allproductsTab tab-background'>All Products</a></li>"+
    " <li><div class='dataTables_filter'><input class='form-control' id='productTableSearch' placeholder='Search Table...'></div>"+
    " <li>"+
    "    <div class='dataTables_length'>"+
    "     <select "+
    "       class='form-control'"+
    "       title='Number of records to show'"+
    "       id='productTableLength'>"+
    "       <option value='5'>5</option>"+
    "       <option value='10'>10</option>"+
    "       <option value='25'>25</option>"+
    "       <option selected='selected' value='50'>50</option>"+
    "       <option value='100'>100</option>"+
    "       <option value='-1'>All</option>"+
    "     </select>"+
    "   </div>"+
    " </li>"+//user_check+ -- Temporarily Disabled -- Pulls html from div in Index specifically to check for user permissions on 'Create' buttons
    "  <li>"+
    "    <div class='productsFilterBy'><i class='fa fa-random' aria-hidden='true'></i> Filter By:</div>"+
    "  </li>"+
    ""+brand_names+
    ""+filters+
    "</ul>"+
    "";
  }

  var children = $(".productTableChildren");
  $("div.products-toolbar").html(top_toolbar(children.data("child-user_check"),
                                             children.data("child-brand_names"),
                                             children.data("child-filters")));
  $("#productTableSearch").addClear();
  $("#productTableSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
    table.search("").draw();
  });

  $(document).on("click", ".productsBrandFilterMenu", function (e) {
    e.stopPropagation(); // Stops the Brand Name Filter Menu from closing when an interior option is clicked
  });
  $(".productsBrandFilterMenu").on("change", function() {
    var brands = $("input:checkbox[name='brand']:checked").map(function() {
      return "^" + this.value + ".*\$";
      }).get().join("|");
    if (brands === "") {
      table.column(2).search("xxxxxxxxxx").draw();
    }
    else
      table.column(2).search(brands, true, false, false).draw();
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
    toggle_boolean ("active", 15);
    toggle_boolean ("storeOrderable", 16);
    toggle_boolean ("warrantyOrderable", 17);
    toggle_boolean ("ecommSku", 18);
    toggle_boolean ("inStock", 19);
    toggle_boolean ("hasParts", 14);
  });

  $("input:checkbox").change(function(){ // Takes care of the non-dataTables specific menu styling
    if($(this).is(":checked"))
      $(this).parent().parent().addClass("selected");
    else
      $(this).parent().parent().removeClass("selected");
  });

  $("#productTableSearch").keyup(function(){
    table.search($(this).val()).draw() ;
  });
  $("#productTableLength").on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });

  function format (attributes, parts, manufacturer, upc, srs_sku, uploads, notes, dates) {
    return ""+
   "<div class='glider'>"+
   "  <table class='product-listing-expando'>"+
   "    <thead>"+
   "      <tr>"+
   "        <th>Custom Attributes</th>"+
   "        <th>Associated Parts</th>"+
   "        <th>Manufacturer</th>"+
   "        <th>UPC</th>"+
   "        <th>SRS SKU</th>"+
   "        <th>Associated Files</th>"+
   "        <th>Meta Notes</th>"+
   "        <th>Meta Dates</th>"+
   "      </tr>"+
   "    </thead>"+
   "    <tbody>"+
   "      <tr>"+
   "        <td style='padding:0;'>"+attributes+"</td>"+
   "        <td style='padding:0;'>"+parts+"</td>"+
   "        <td>"+manufacturer+"</td>"+
   "        <td>"+upc+"</td>"+
   "        <td>"+srs_sku+"</td>"+
   "        <td>"+uploads+"</td>"+
   "        <td>"+notes+"</td>"+
   "        <td>"+dates+"</td>"+
   "      </tr>"+
   "    </tbody>"+
   "  </table>"+
   "</div>";
  }

  $("#productsDataTable").on("click", "td.details-control", function() {
    var tr = $(this).closest("tr");
    var td = $(tr).find("td:first-child");
    var row = table.row(tr);
    if (row.child.isShown()) {
      $("div.glider", row.child()).slideUp(function() {
        row.child.hide();
        tr.removeClass("shown");
        td.tooltip("enable");
      });
    }
    else {
      row.child(format(tr.data("child-attributes"), tr.data("child-parts"),
                                                    tr.data("child-manufacturer"),
                                                    tr.data("child-upc"),
                                                    tr.data("child-srs_sku"),
                                                    tr.data("child-uploads"),
                                                    tr.data("child-notes"),
                                                    tr.data("child-dates")), "no-padding").show();
      tr.addClass("shown");
      td.tooltip("disable");
      $("div.glider", row.child()).slideDown();
    }
  });
});

//------------------------------------------------------------------------------------------------------
//                           Product "BATCH_PROCESS" related JS                                        |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#batchProcessDiv").animate({left: 0, opacity: 100}, 500);
  var table = $("#batchProcessDataTable").DataTable({
                "scrollX": true,
                "scrollY": true,
                // fixedHeader: { headerOffset: 56 },
                // "products-toolbar" = "top_toobar" function below. "B" = Buttons. "glider-table" = "format" function below that injects the Expando table into each row. "t" = The Table. "ip" = "Showing x of x" and Pagination controls.
                "dom": "<'batch_process-toolbar'>B<'col-md-12 glider-table't><'col-md-12'ip>",
                "buttons": [
                  // Standard Column Visibility Button that lists all columns.  ".noVis" is disabled via CSS in Application.scss because the ":not" method doesnt work here
                  {extend: "colvis", restore: "Revert", text: "<i class='fa fa-wrench' aria-hidden='true'></i> Column Visibility <span class='caret'></span>", className: "btn btn-header"},
                ],
                "pageLength": 10000,
                "bJQueryUI": true,
                "columnDefs": [
                  // {
                  // "targets": child_columns,
                  // "visible": false,
                  // },
                  // {
                  // "targets": [0,1],
                  // "orderable": false
                  // }
                ],
                "order": [[3, "asc"]],
                "oLanguage": {"sZeroRecords": "No products to display for this view"}
              });
  table.page.len(-1).draw();

  function top_toolbar () {
    return ""+
    "<ul class='nav nav-tabs'>"+
    " <li class='active'><a data-toggle='tab' class='allproductsTab tab-background'>All Products</a></li>"+
    " <li><div class='dataTables_filter'><input class='form-control' id='batchTableSearch' placeholder='Search Table...'></div>"+
    " <li>"+
    "    <div class='dataTables_length'>"+
    "     <select "+
    "       class='form-control'"+
    "       title='Number of records to show'"+
    "       id='batchTableLength'>"+
    "       <option value='5'>5</option>"+
    "       <option value='10'>10</option>"+
    "       <option value='25'>25</option>"+
    "       <option selected='selected' value='50'>50</option>"+
    "       <option value='100'>100</option>"+
    "       <option value='-1'>All</option>"+
    "     </select>"+
    "   </div>"+
    " </li>"+
    "</ul>"+
    "";
  }
  $("div.batch_process-toolbar").html(top_toolbar());

  $("#batchTableSearch").keyup(function(){
    table.search($(this).val()).draw() ;
  });
  $("#batchTableLength").on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });

});