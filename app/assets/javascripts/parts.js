/* global $ */
/* global bootbox */
/* global basicConfirm */

//------------------------------------------------------------------------------------------------------
//                               Part "NEW" related CSS                                                |
//------------------------------------------------------------------------------------------------------


$(document).on("turbolinks:load", function(){
  $("#newPartDiv").animate({left: 0, opacity: 100}, 500);
  $(".newPartProductSearch").select2({
    theme:"bootstrap",
    placeholder: "Select Product...",
    containerCssClass: "select2SearchCss",
    selectOnClose: true,
    dropdownAutoWidth: false
  });

  $("#builder").closest(".row").html("");
  $("#namespace").closest(".row").html("");
  $("#parent_builder").closest(".row").html("");
  $("#child_index").closest(".row").html("");
  $(".partAttributeContainer").on("keyup", ".dynamicAttributeName", function(){
    var nameElem = $(this);
    var valueElem = nameElem.closest(".row").children("td").children(".text_field");
    var value = nameElem.val();
    valueElem.attr("id", "part_details_"+value);
    valueElem.attr("name", "part[details]["+value+"]");
  });
  $(".partAttributeContainer").on("click", ".removeRow", function(){
    $(this).closest(".row").html("");
  });
  $(".partAddAttribute").on("click", function(e){
    e.preventDefault();
    var contents = "<tr class='row'>" + $(".attributeTemplate").html() + "</tr>";
    $(".body").append(contents);
  });

});

//------------------------------------------------------------------------------------------------------
//                               Part "EDIT" related CSS                                               |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#editPartDiv").animate({left: 0, opacity: 100}, 500);
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

  $(".deletePart").on("click", function(e) {
    e.preventDefault();
    basicConfirm("part");
  });

});

//------------------------------------------------------------------------------------------------------
//                               Product "SHOW" related CSS                                            |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#showPartDiv").animate({left: 0, opacity: 100}, 500);
});

//------------------------------------------------------------------------------------------------------
//                               Part "INDEX" related CSS                                              |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#partListDiv").animate({left: 0, opacity: 100}, 500);
  // Function to add a leading zero to dates between 1-9
  var MyDate = new Date();
  var date;
  MyDate.setDate(MyDate.getDate());
  date = MyDate.getFullYear() + "-" + ("0" + (MyDate.getMonth()+1)).slice(-2) + "-" + ("0" + MyDate.getDate()).slice(-2);
  var table = $("#partsDataTable").DataTable({
                "scrollX": true,
                "scrollY": true,
                "dom": "<'parts-toolbar'>B<'col-md-12 glider-table't><'col-md-12'ip>",
                "buttons": [
                  {extend: "collection", text: "<i class='fa fa-download' aria-hidden='true'></i> Export <span class='caret'></span>", className: "btn dtExportOptions",
                    buttons: [

                      {extend: "excelHtml5",
                        text: "<i class='fa fa-file-excel-o' aria-hidden='true'></i> Excel",
                        title: "SRS Inventory Report, "+date+".xlsx",
                        // customize:
                          // Custom function to set the header row green and outlined.
                          // function( xlsx ) {
                          //   var sheet = xlsx.xl.worksheets["sheet1.xml"];
                          //   $("row c[r*='2']", sheet).attr( "s", "42" );
                          // },
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
                  },

                  // Button Collection for toggling visibility of columns
                  {extend: "collection", text: "<i class='fa fa-wrench' aria-hidden='true'></i> Export Options <span class='caret'></span>", className: "btn dtColumnVisibility",
                    buttons: [
                      // Function to quickly collapse columns to be inventory specific.  Columns 3,4,5,6 -- MFR Model #, Description, Qty On Hand, Qty Last Modified
                      {extend: "columnToggle", text: "Inventory Preset", columns: [0,1,2,5,11,12,13,14], className: "btn"},
                      // Standard Column Visibility Button that lists all columns.  ".noVis" is disabled via CSS in Application.scss because the ":not" method doesnt work here
                      {extend: "colvis", text: "Customize Columns", className: "btn"}
                    ]
                  }

                ],
                "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
                "pageLength": 50,
                "bJQueryUI": true,
                "columnDefs": [
                  {
                  "targets": [9,10,15],
                  "visible": false,
                  },
                  {
                  "targets": [0],
                  "orderable": false
                  }
                ],
                "order": [[2, "asc"]],
                "oLanguage": {"sZeroRecords": "No parts to display for this view"}
              });

  table.page.len(50000).draw();

  $(".part-table tr td.quantities").each(function(){
    var cellValue = $(this).html();
    if(!isNaN(parseFloat(cellValue))) {
      if (cellValue == 0) {
        $(this).addClass("zeroQuantity");
      }
      if (cellValue > 1) {
        $(this).addClass("positiveQuantity");
      }
      if (cellValue < 0) {
        $(this).addClass("negativeQuantity");
      }
    }
  });

  table.page.len(50).draw();

  function top_toolbar (filter) {
    return ""+
      "<ul class='nav nav-tabs'>"+
      " <li class='active'><a data-toggle='tab' class='allpartsButton tab-background'>All Parts</a></li>"+
      " <li><div class='dataTables_filter'><input class='form-control' id='partTableSearch' placeholder='Search Table...'></div></li>"+
      " <li><div class='dataTables_product_filter'><select class='form-control' id='partTableProductSearch' name='product[product_id]' id='product_product_id' data-cip-id='cIPJQ342845639'><option selected disabled>Filter by Product...</option><option name=''>Clear Filter</option>"+filter+"</select></div></li>"+
      " <li>"+
      "   <div class='dataTables_length'>"+
      "     <select "+
      "       class='form-control'"+
      "       title='Number of records to show'"+
      "       id='partTableLength'>"+
      "       <option value='5'>5</option>"+
      "       <option value='10'>10</option>"+
      "       <option value='25'>25</option>"+
      "       <option selected='selected' value='50'>50</option>"+
      "       <option value='100'>100</option>"+
      "       <option value='-1'>All</option>"+
      "     </select>"+
      "   </div>"+
      " </li>"+
      " <li>"+
      "   <form class='button_to' method='get' action='/parts/new'>"+
      "     <input class='btn' type='submit' value='Create New Part'>"+
      "   </form>"+
      " </li>"+
      "</ul>"+
      "";
  }

  $("div.parts-toolbar").html(top_toolbar($(".partTableChildren").data("child-filter")));
  $("#partTableSearch").addClear();
  $("#partTableSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
    table.search("").draw();
  });

  // "Filter By Product" dropdown executes a search of a given product by searching Column 3, "MFR Product #"
  $("#partTableProductSearch").on("change", function() {
    $("div.glider-table").slideUp(300);
    setTimeout(function() {
      table.column(3).search("").draw();
      table.column(3).search($("#partTableProductSearch").find("option:selected").attr("name")).draw();
    }, 280);
    $("div.glider-table").slideDown(300);
  });

  $("#partTableSearch").keyup(function(){
    table.search($(this).val()).draw() ;
  });
  $("#partTableLength").on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });

  function format (attributes, manufacturer, location, upc, orders, notes, dates) {
    return ""+
   "<div class='glider'>"+
   "  <table class='part-listing-expando'>"+
   "    <thead>"+
   "      <tr>"+
   "        <th>Custom Attributes</th>"+
   "        <th>Manufacturer</th>"+
   "        <th>Location</th>"+
   "        <th>UPC</th>"+
   "        <th>Recent Orders</th>"+
   "        <th>Meta Notes</th>"+
   "        <th>Meta Dates</th>"+
   "      </tr>"+
   "    </thead>"+
   "    <tbody>"+
   "      <tr>"+
   "        <td style='padding:0;'>"+attributes+"</td>"+
   "        <td>"+manufacturer+"</td>"+
   "        <td>"+location+"</td>"+
   "        <td>"+upc+"</td>"+
   "        <td>"+orders+"</td>"+
   "        <td>"+notes+"</td>"+
   "        <td>"+dates+"</td>"+
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
        td.tooltip("enable");
      });
    }
    else {
      row.child(format(tr.data("child-attributes"), tr.data("child-manufacturer"),
                                                    tr.data("child-location"),
                                                    tr.data("child-upc"),
                                                    tr.data("child-orders"),
                                                    tr.data("child-notes"),
                                                    tr.data("child-dates")), "no-padding").show();
      tr.addClass("shown");
      td.tooltip("disable");
      $("div.glider", row.child()).slideDown();
    }
  });
});