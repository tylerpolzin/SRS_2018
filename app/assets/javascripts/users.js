/* global $*/

//-----------------------------------------------------------------------------------
//          START 'USERS TABLE' JS                                                  |
//-----------------------------------------------------------------------------------

  function users_list_format (fakeout, edit, name, company, address, phone, email, latlong, notes) {
    return ''+
   '<div class="glider">'+
   '  <table class="users-list-expando">'+
   '    <tr>'+
   '      <td>Full Name</td>'+
   '      <td>Company & Position</td>'+
   '      <td>Address</td>'+
   '      <td>Phone Number(s)</td>'+
   '      <td>Email Address</td>'+
   '      <td>Lat/Long</td>'+
   '      <td>Notes</td>'+
   '      <td></td>'+
   '    </tr>'+
   '    <tr name="'+fakeout+'">'+
   '      <td>'+name+'</td>'+
   '      <td class="address-margin">'+company+'</td>'+
   '      <td class="address-margin">'+address+'</td>'+
   '      <td class="address-margin">'+phone+'</td>'+
   '      <td>'+email+'</td>'+
   '      <td>'+latlong+'</td>'+
   '      <td>'+notes+'</td>'+
   '      <td>'+edit+'</td>'+
   '    </tr>'+
   '  </table>'+
   '</div>';
  }
   

  $(document).on("turbolinks:load", function() {
    var table = $('#usersListDataTable').DataTable({
      renderer: "bootstrap",
      "aaSorting": [],
      "scrollX": true,
      "scrollY": true,
      "dom": '<"users-list-toolbar"><"glider-table"t><"col-md-12"ip>',
      "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
      "pageLength": 10,
      "bJQueryUI": true,
      "columnDefs": [
        {
          "targets": [6],
        "visible": false,
        },
        {
        "targets": [0],
        "orderable": false
        }
      ],
      "order": [[1, 'asc']],
      "oLanguage": {"sZeroRecords": "No users to display for this view"},
      "fnDrawCallback": function() {
        $(table).tooltip('enable');
      }
    });
      table.page.len(-1).draw();
    $("div.users-list-toolbar").html(''+
      '<ul class="nav nav-tabs">'+
      ' <li><div class="dataTables_filter"><input type="search" class="form-control" id="usersListSearch" placeholder="Search Table..."></div>'+
      ' <li>'+
      '    <div class="dataTables_length">'+
      '     <select '+
      '       class="form-control"'+
      '       title="Number of records to show"'+
      '       id="usersListLength">'+
      '       <option value="5">5</option>'+
      '       <option value="25">25</option>'+
      '       <option value="50">50</option>'+
      '       <option value="100">100</option>'+
      '       <option selected="selected" value="-1">All</option>'+
      '     </select>'+
      '   </div>'+
      ' </li>'+
      '</ul>'+
      '');
    $("#usersListSearch").addClear();
    $("#usersListSearch").next().on('click', function(){ // Adds "X" button and clears properly when clicked
      table.search("").draw();
    });
        $('#usersListSearch').keyup(function(){
      table.search($(this).val()).draw();
    });

    $('#usersListLength').on("change", function(){
      table.page.len($(this).find("option:selected").attr("value")).draw() ;
    });
    
    $('#usersListDataTable').on('click', 'td.details-control', function() {
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
        row.child(users_list_format(tr.data('child-fakeout'), tr.data('child-edit'), tr.data('child-name'), tr.data('child-company'), tr.data('child-address'), tr.data('child-phone'), tr.data('child-email'), tr.data('child-latlong'), tr.data('child-notes')), 'no-padding').show();
        tr.addClass('shown');
        td.tooltip('disable');
        $('div.glider', row.child()).slideDown();
      }
    });

  });

//-----------------------------------------------------------------------------------
//          START 'USERS DASHBOARD' JS                                              |
//-----------------------------------------------------------------------------------

  $(document).on("turbolinks:load", function() {
    $("#showProfileDiv").animate({left: 0, opacity: 100}, 500);
  });



