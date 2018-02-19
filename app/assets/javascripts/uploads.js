/* global $ */
//-----------------------------------------------------------------------------------
//          START "UPLOADS TABLE" JS                                                  |
//-----------------------------------------------------------------------------------

//   function uploads_format (fakeout, edit, name, company, address, phone, email, latlong, notes) {
//     return ""+
//   "<div class='glider'>"+
//   "  <table class='uploads-expando'>"+
//   "    <tr>"+
//   "      <td>Full Name</td>"+
//   "      <td>Company & Position</td>"+
//   "      <td>Address</td>"+
//   "      <td>Phone Number(s)</td>"+
//   "      <td>Email Address</td>"+
//   "      <td>Lat/Long</td>"+
//   "      <td>Notes</td>"+
//   "      <td></td>"+
//   "    </tr>"+
//   "    <tr name='"+fakeout+"' class='no-table'>"+ // "no-table" class allows single-row expandos to not highlight on hover
//   "      <td>"+name+"</td>"+
//   "      <td class='address-margin'>"+company+"</td>"+
//   "      <td class='address-margin'>"+address+"</td>"+
//   "      <td class='address-margin'>"+phone+"</td>"+
//   "      <td>"+email+"</td>"+
//   "      <td>"+latlong+"</td>"+
//   "      <td>"+notes+"</td>"+
//   "      <td>"+edit+"</td>"+
//   "    </tr>"+
//   "  </table>"+
//   "</div>";
//   }

  $(document).on("turbolinks:load", function() {
    var table = $("#uploadsDataTable").DataTable({
      renderer: "bootstrap",
      "aaSorting": [],
      "scrollX": true,
      "scrollY": true,
      "colReorder": true,
      "dom": "<'uploads-toolbar'><'top-row paginate'p>t<'bottom-row paginate'ip>",
      "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
      "pageLength": 25,
      "bJQueryUI": true,
      "columnDefs": [
        { type: "file-size", targets: 3 }
        // {
        //   "targets": [11],
        // "visible": false
        // },
        // {
        // "targets": [0],
        // "orderable": false
        // }
      ],
      "order": [[0, "asc"]],
      "oLanguage": {"sZeroRecords": "No uploads to display for this view"}
    });
      table.page.len(25).draw();
    $("div.uploads-toolbar").html(""+
      "<ul class='nav nav-tabs'>"+
      " <li><div class='dataTables_filter'><input type='search' class='form-control' id='uploadsSearch' placeholder='Search Table...'></div>"+
      " <li>"+
      "    <div class='dataTables_length'>"+
      "     <select "+
      "       class='form-control'"+
      "       title='Number of records to show'"+
      "       id='uploadsLength'>"+
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
    $("#uploadsSearch").addClear();
    $("#uploadsSearch").next().on("click", function(){ // Adds "X" button and clears properly when clicked
      table.search("").draw();
    });
        $("#uploadsSearch").keyup(function(){
      table.search($(this).val()).draw();
    });

    $("#uploadsLength").on("change", function(){
      table.page.len($(this).find("option:selected").attr("value")).draw() ;
    });

    // $("#uploadsDataTable").on("click", "td.details-control", function() {
    //   var tr = $(this).closest("tr");
    //   var td = $(tr).find("td:first-child");
    //   var row = table.row(tr);
    //   if (row.child.isShown()) {
    //     $("div.glider", row.child()).slideUp(function() {
    //       row.child.hide();
    //       tr.removeClass("shown");
    //     });
    //   }
    //   else {
    //     row.child(uploads_format(tr.data("child-fakeout"),
    //                                 tr.data("child-edit"),
    //                                 tr.data("child-name"),
    //                                 tr.data("child-company"),
    //                                 tr.data("child-address"),
    //                                 tr.data("child-phone"),
    //                                 tr.data("child-email"),
    //                                 tr.data("child-latlong"),
    //                                 tr.data("child-notes")), "no-padding").show();
    //     tr.addClass("shown");
    //     $("div.glider", row.child()).slideDown();
    //   }
    // });
  });
  
  // This function allows the File Size column to be sortable
  $.fn.dataTable.ext.type.order['file-size-pre'] = function ( data ) {
    var matches = data.match( /^(\d+(?:\.\d+)?)\s*([a-z]+)/i );
    var multipliers = {
      Byte:  1,
      Bytes: 2,
      KB: 1024,
      MB: 1048576,
      GB: 1073741824,
      TB: 1099511627776,
      PB: 1125899906842624
    };

    if (matches) {
      var multiplier = multipliers[matches[2]];
      return parseFloat( matches[1] ) * multiplier;
    } 
    else {
      return -1;
    }
  };