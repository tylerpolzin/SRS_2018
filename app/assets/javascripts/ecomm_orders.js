/*global $*/
/*global bootbox*/
/*global dateFormat*/
/*global CollapsibleLists*/
/*global basic_tooltip*/
/*global barebones_tooltip*/
/*global json*/



//------------------------------------------------------------------------------------------------------
//                               Ecomm Orders "INDEX" related JS                                       |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  barebones_tooltip(".table_header_tooltip", "", "top");
  setTimeout(function(){ $("#ecommOrdersHackFixButton").click(); }, 200); // Hacky way to fix the "Individual" tables header columns.  Used in conjunction with the hidden "#ihHackFixButton" below
  // Function to add a leading zero to dates between 1-9
  var MyDate = new Date();
  var date;
  MyDate.setDate(MyDate.getDate());
  date = MyDate.getFullYear() + "-" + ("0" + (MyDate.getMonth()+1)).slice(-2) + "-" + ("0" + MyDate.getDate()).slice(-2);
  var table = $("#ecommOrdersDataTable").DataTable({
                // fixedHeader: { headerOffset: 56 },
                "scrollX": true,
                "scrollY": "75vh",
                "scrollCollapse": true,
                "colReorder": true,
                // "products-toolbar" = "top_toobar" function below. "B" = Buttons. "top-row paginate" = Parent class to help with adding CSS to Pagination controls. "t" = The Table. "bottom-row paginate ip" = "Showing x of x" and Pagination controls.
                "dom": "<'ecomm-orders-toolbar'>B<'top-row paginate'p>t<'bottom-row paginate'ip>",
                "buttons": [
                  // Standard Column Visibility Button that lists all columns.  ".noVis" is disabled via CSS in Application.scss because the ":not" method doesn"t work here
                  {extend: "colvis", restore: "Revert", text: "<i class='fa fa-wrench' aria-hidden='true'></i> Columns <span class='caret'></span>", className: "btn btn-header", columnText: function ( dt, idx, title ) {return ': '+title;}},

                  {extend: "collection", text: "<i class='fa fa-download' aria-hidden='true'></i> Export <span class='caret'></span>", className: "btn btn-header dtExportOptions",
                    buttons: [

                      {extend: "excelHtml5",
                        text: "<i class='fa fa-file-excel-o' aria-hidden='true'></i> Excel",
                        title: "SRS E-Commerce Orders, "+date+".xlsx",
                        // Only exports columns that are currently visible.  Adjusted by the "Visibility" dropdown and Filtered text.
                        exportOptions: { columns: ":visible" },
                        className: "btn"
                      },

                      {extend: "pdfHtml5",
                        text: "<i class='fa fa-file-pdf-o' aria-hidden='true'></i> PDF",
                        title: "SRS E-Commerce Orders, "+date+".pdf",
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
                  "targets": [9, 10],
                  "visible": false,
                  },
                  {
                  "targets": [0,7,8],
                  "orderable": false
                  }
                ],
                "order": [[0, "desc"]],
                "oLanguage": {"sZeroRecords": "No orders to display for this view"}
              });

  // Reduces the amount of text displayed for this particular item in the Columns Dropdown
  // $(table.buttons()[0].inst.s.buttons[0].conf._collection).find('a:nth-child(8) span').text("Line Items & Tracking Information");

  table.page.len(50000).draw();
  
  function top_toolbar (top_toolbar) {
    return top_toolbar;
  }

  var children = $(".ecommOrdersTableChildren");
  $("div.ecomm-orders-toolbar").html(top_toolbar(children.data("child-top_toolbar")));
  $("#ecommOrdersTableSearch").addClear();
  $("#ecommOrdersTableSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
    table.search("").draw();
  });

  $(document).on("click", ".orderDateRangeFilter", function (e) {
    e.stopPropagation(); // Stops the Order Date Range Filter Menu from closing when an interior option is clicked
  });
  $(".input-daterange").datepicker({
      format: "yyyy-mm-dd",
      clearBtn: true,
      startView: 1,
      maxViewMode: 2,
      todayBtn: true,
      todayHighlight: true
  });
  // $.fn.dataTableExt.afnFiltering.push( // Used for the "Filter By Date" Function
  //   function( oSettings, aData, iDataIndex ) {
  //     if(oSettings.nTable.id == "ecommOrdersDataTable"){
  //       var startDate = document.getElementById("ecommOrderDatefilterStartDate").value;
  //       var endDate = document.getElementById("ecommOrderDatefilterEndDate").value;
  //       var iStartDateCol = 1; // Column where the filtering takes place
  //       var iEndDateCol = 1;
  //       startDate=startDate.substring(0,4) + startDate.substring(5,7)+ startDate.substring(8,10); // 0,4 = yyyyy 5,7 = dd 8,10 = dd == yyyy-mm-dd
  //       endDate=endDate.substring(0,4) + endDate.substring(5,7)+ endDate.substring(8,10);
  //       var datofini=aData[iStartDateCol].substring(0,4) + aData[iStartDateCol].substring(5,7)+ aData[iStartDateCol].substring(8,10);
  //       var datoffin=aData[iEndDateCol].substring(0,4) + aData[iEndDateCol].substring(5,7)+ aData[iEndDateCol].substring(8,10);
  //       if ( startDate == "" && endDate == "" ) { return true }
  //       else if ( startDate <= datofini && endDate == "") { return true }
  //       else if ( endDate >= datoffin && startDate == "") { return true }
  //       else if (startDate <= datofini && endDate >= datoffin) { return true }

  //       return false;
  //     }
  //     return true;
  //   }
  // );
  // $("#ecommOrderDatefilterStartDate").on("change keyup", function() { table.draw(); });
  // $("#ecommOrderDatefilterEndDate").on("change keyup", function() { table.draw(); });

  $(document).on("click", ".ecommOrdersStatusFilterMenu", function (e) {
    e.stopPropagation(); // Stops the Status Filter Menu from closing when an interior option is clicked
  });
  $(".ecommOrdersStatusFilterMenu").on("change", function() {
    var status = $("input:checkbox[name='status']:checked").map(function() {
      return "^" + this.value + ".*\$";
      }).get().join("|");
    if (status === "") {
      table.column(2).search("xxxxxxxxxx").draw();
    }
    else
      table.column(2).search(status, true, false, false).draw();
  });

  $(document).on("click", ".ecommOrdersRetailerFilterMenu", function (e) {
    e.stopPropagation(); // Stops the Retailer Filter Menu from closing when an interior option is clicked
  });
  $(".ecommOrdersRetailerFilterMenu").on("change", function() {
    var retailers = $("input:checkbox[name='retailer']:checked").map(function() {
      return "^" + this.value + ".*\$";
      }).get().join("|");
    console.log(retailers);
    if (retailers === "") {
      table.column(10).search("xxxxxxxxxx").draw();
    }
    else
      table.column(10).search(retailers, true, false, false).draw();
  });


  $("input:checkbox").change(function(){ // Takes care of the non-dataTables specific menu styling
    if($(this).is(":checked"))
      $(this).parent().parent().addClass("selected");
    else
      $(this).parent().parent().removeClass("selected");
  });

  $("#ecommOrdersTableSearch").keyup(function(){
    table.search($(this).val()).draw() ;
  });
  $("#ecommOrdersTableLength").on("change", function(){
    table.page.len($(this).find("option:selected").attr("value")).draw() ;
  });

  function format (expando) {
    return expando;
  }

  $("#ecommOrdersDataTable").on("click", "td.details-control", function() {
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
      row.child(format(tr.data("child-expando")), "no-padding").show();
      tr.addClass("shown");
      $("div.glider", row.child()).slideDown();
    }
    barebones_tooltip(".barebones_tooltip");
    $(".link_trim").each(function() {
      $(this).text($(this).text().replace(/\["/g, ''));
      $(this).text($(this).text().replace(/\"]/g, ''));
    });
    $(".hidden_user_list span").each(function() { // Sets the correct Users Profile Name for the "Initiated By/For" column
      $(".assignment_trim[id='v-u-" + $(this).attr("id") + "']").text( $(this).text() );
    });
  });

  $.fn.DataTable.ext.pager.numbers_length = 5; // Number of numbers to show in Pagination controls

  $("#ecommOrdersHackFixButton").on("click", function(){
    table.page.len(50).draw(); // Fixes header column width issues
  });

  $(".ecomm_order_status").each(function() {
    var field = $(this);
    var cellValue = $(this).children(".order_status_value").html();
    if (cellValue == "New") {
      $(this).addClass("order_status_new");
    }
    if (cellValue == "Open") {
      $(this).addClass("order_status_open");
    }
    if (cellValue == "Completed") {
      $(this).addClass("order_status_completed");
    }
    if (cellValue == "Cancelled") {
      $(this).addClass("order_status_cancelled");
      basic_tooltip(field.find(".order_status_value"), "Cancellation Reason", "<ul><li>"+field.find(".cancellation_reason_grab").html()+".</li></ul>");
    }
  });

  $("#ecommHighlightCheck").on("click", function() {
    if ($(this).is(":checked")) {
      $(this).closest(".defaultDiv").find("td").addClass("highlightable");
      $(this).closest(".defaultDiv").find("td.details-control").removeClass("highlightable");
      $(this).closest(".defaultDiv").find("td.no-padding").removeClass("highlightable");
      $(this).closest(".defaultDiv").find("td.zero-pad").removeClass("highlightable");
      $(this).closest(".defaultDiv").find(".no-hover td").removeClass("highlightable");
    }
    else {
      $(this).closest(".defaultDiv").find("td").removeClass("highlightable").removeClass("enabled");
    }
  });

  $(document).on("click", "td.highlightable", function() {
    $(this).toggleClass("enabled");
  });
  
  $(document).on("click", ".copy-cut", function() {
    $(this).parent().find("input").select();
    document.execCommand("Copy");
    $(this).parent().addClass("tracking_highlight_selected");
  });

});

