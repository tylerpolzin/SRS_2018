/*global $*/
/*global bootbox*/

//------------------------------------------------------------------------------------------------------
//                           "NEW" related JS                                                          |
//------------------------------------------------------------------------------------------------------

$(document).on("turbolinks:load", function() {
  $("#addOrderButton").hide();
  $("#createTaskSubmitButton").hide();

  if ($("#taskTypeSelect option:selected").text() == "Select Type...") {
    $("#taskTypeSelect option:selected").attr("disabled", true);
  }
  if ($("#taskRecipientSelect option:selected").text() == "Select Recipient...") {
    $("#taskRecipientSelect option:selected").attr("disabled", true);
  }
  
  $("#taskTypeSelect").on("change", function() {
    if ($(this).find("option:selected").val() == "Ecomm Order") {
      $("#addOrderButton").fadeIn(300);
      $("#createTaskSubmitButton").fadeIn(300);
    }
    else {
      $("#addOrderButton").fadeOut(300);
      $("#createTaskSubmitButton").fadeOut(300);
    }
  });

  $("#task-datepicker").datepicker({
      format: "yyyy-mm-dd",
      clearBtn: true,
      startView: 0,
      maxViewMode: 2,
      todayBtn: true,
      todayHighlight: true
  });









});