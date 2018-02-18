module ProductsHelper

  def remove_child_upload_link(name, f)
    f.hidden_field(:_destroy) + link_to(name, "javascript:void(0)", :style => "color:red;font-weight:normal", :class => "remove_child")
  end

end
