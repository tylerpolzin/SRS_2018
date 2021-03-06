/* global $*/

//-----------------------------------------------------------------------------------
//          START "USERS DASHBOARD" JS                                              |
//-----------------------------------------------------------------------------------

  $(document).on("turbolinks:load", function() {
    if ($("#assignments-bug_report table tbody").find("tr").length >= 1) {
      $("#assignmentsBugReportTab").addClass("details-highlight");
    }
    $('.changelog_expand').on("click", function(){
        var target_num = $(this).attr('id').split('-')[1];
        var content_id = '#changelog_expandable-'.concat(target_num);
        $(content_id).slideToggle('fast');
    });

    var table = $("#showQuickInventoryTable").DataTable({
                  "scrollX": true,
                  "scrollY": "75vh",
                  "scrollCollapse": true,
                  "colReorder": true,
                  // "products-toolbar" = "top_toobar" function below. "B" = Buttons. "t" = The Table. "ip" = "Showing x of x" and Pagination controls.
                  "dom": "<'quick_inventory-toolbar'>B<'col-md-12't><'col-md-12'ip>",
                  "pageLength": 10000,
                  "bJQueryUI": true,
                  "order": [[1, "asc"]],
                  "oLanguage": {"sZeroRecords": "No products to display for this view"}
                });
    table.page.len(-1).draw();
  
    function top_toolbar () {
      return ""+
      "<ul class='nav nav-tabs'>"+
      " <li><div class='dataTables_filter'><input class='form-control' id='quickInventoryTableSearch' placeholder='Search Table...'></div>"+
      " <li>"+
      "    <div class='dataTables_length'>"+
      "     <select "+
      "       class='form-control'"+
      "       title='Number of records to show'"+
      "       id='quickInventoryTableLength'>"+
      "       <option value='5'>5</option>"+
      "       <option value='10'>10</option>"+
      "       <option value='25'>25</option>"+
      "       <option value='50'>50</option>"+
      "       <option value='100'>100</option>"+
      "       <option selected='selected' value='-1'>All</option>"+
      "     </select>"+
      "   </div>"+
      " </li>"+
      "</ul>"+
      "";
    }
    $("div.quick_inventory-toolbar").html(top_toolbar());
  
    $("#quickInventoryTableSearch").keyup(function(){
      table.search($(this).val()).draw() ;
    });
    $("#quickInventoryTableLength").on("change", function(){
      table.page.len($(this).find("option:selected").attr("value")).draw() ;
    });



  });





//-----------------------------------------------------------------------------------
//          START "USERS TABLE" JS                                                  |
//-----------------------------------------------------------------------------------

  function users_list_format (fakeout, edit, name, company, address, phone, email, latlong, notes) {
    return ""+
   "<div class='glider'>"+
   "  <table class='users-list-expando'>"+
   "    <tr>"+
   "      <td>Full Name</td>"+
   "      <td>Company & Position</td>"+
   "      <td>Address</td>"+
   "      <td>Phone Number(s)</td>"+
   "      <td>Email Address</td>"+
   "      <td>Lat/Long</td>"+
   "      <td>Notes</td>"+
   "      <td></td>"+
   "    </tr>"+
   "    <tr name='"+fakeout+"' class='no-table'>"+ // "no-table" class allows single-row expandos to not highlight on hover
   "      <td>"+name+"</td>"+
   "      <td class='address-margin'>"+company+"</td>"+
   "      <td class='address-margin'>"+address+"</td>"+
   "      <td class='address-margin'>"+phone+"</td>"+
   "      <td>"+email+"</td>"+
   "      <td>"+latlong+"</td>"+
   "      <td>"+notes+"</td>"+
   "      <td>"+edit+"</td>"+
   "    </tr>"+
   "  </table>"+
   "</div>";
  }

  $(document).on("turbolinks:load", function() {
    var table = $("#usersListDataTable").DataTable({
      renderer: "bootstrap",
      "aaSorting": [],
      "scrollX": true,
      "scrollY": true,
      "colReorder": true,
      "dom": "<'users-list-toolbar'><'top-row paginate'p>t<'bottom-row paginate'ip>",
      "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
      "pageLength": 10,
      "bJQueryUI": true,
      "columnDefs": [
        {
          "targets": [11],
        "visible": false
        },
        {
        "targets": [0],
        "orderable": false
        }
      ],
      "order": [[1, "asc"]],
      "oLanguage": {"sZeroRecords": "No users to display for this view"},
      "fnDrawCallback": function() {
      }
    });
      table.page.len(-1).draw();
    $("div.users-list-toolbar").html(""+
      "<ul class='nav nav-tabs'>"+
      " <li><div class='dataTables_filter'><input type='search' class='form-control' id='usersListSearch' placeholder='Search Table...'></div>"+
      " <li>"+
      "    <div class='dataTables_length'>"+
      "     <select "+
      "       class='form-control'"+
      "       title='Number of records to show'"+
      "       id='usersListLength'>"+
      "       <option value='5'>5</option>"+
      "       <option value='25'>25</option>"+
      "       <option value='50'>50</option>"+
      "       <option value='100'>100</option>"+
      "       <option selected='selected' value='-1'>All</option>"+
      "     </select>"+
      "   </div>"+
      " </li>"+
      "</ul>"+
      "");
    $("#usersListSearch").addClear();
    $("#usersListSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
      table.search("").draw();
    });
        $("#usersListSearch").keyup(function(){
      table.search($(this).val()).draw();
    });

    $("#usersListLength").on("change", function(){
      table.page.len($(this).find("option:selected").attr("value")).draw() ;
    });

    $("#usersListDataTable").on("click", "td.details-control", function() {
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
        row.child(users_list_format(tr.data("child-fakeout"),
                                    tr.data("child-edit"),
                                    tr.data("child-name"),
                                    tr.data("child-company"),
                                    tr.data("child-address"),
                                    tr.data("child-phone"),
                                    tr.data("child-email"),
                                    tr.data("child-latlong"),
                                    tr.data("child-notes")), "no-padding").show();
        tr.addClass("shown");
        $("div.glider", row.child()).slideDown();
      }
    });
  });