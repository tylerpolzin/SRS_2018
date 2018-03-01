module UploadsHelper

  def add_child_link_upload(name, association)
    link_to(name, "javascript:void(0)", :class => "add_child_upload hidden", :style => "margin-left: 15px; margin-top: 15px;", :"data-association" => association, :"data-count" => "new_#{association}")
  end

  def remove_child_link_upload(name, f)
    f.hidden_field(:_destroy) + link_to(name, "javascript:void(0)", :class => "remove_child_upload", :title => "Remove This Entry")
  end

end
