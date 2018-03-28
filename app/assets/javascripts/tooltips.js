/*global $*/

function basic_tooltip (selector, header, body, placement_select) {
  if (placement_select === undefined) placement_select = "bottom";
  $(selector).tooltip({
    template: ""+
    "<div class='tooltip'>"+
    "  <div class='tooltip-arrow'></div>"+
    "  <div class='tooltip-head'>"+
    "    <h3><i class='fa fa-info-circle'></i> "+header+"</h3>"+
    "  </div>"+
    "  <div class='tooltip-inner'></div>"+
    "</div>",
    title: body,
    html: true,
    delay: {show: 500, hide: 200},
    placement: placement_select,
  });
}