module UploadBatchesHelper

  def add_child_link_upload(name, association)
    link_to(name, "javascript:void(0)", :class => "add_child_upload hidden", :"data-association" => association)
  end

  def remove_child_link_upload(name, f)
    f.hidden_field(:_destroy) + link_to(name, "javascript:void(0)", :class => "remove_child_upload hidden")
  end

  def new_child_fields_template_upload_comment(form_builder, association, options = {})
    options[:object] ||= form_builder.object.class.reflect_on_association(association).klass.new
    options[:partial] ||= association.to_s.singularize
    options[:form_builder_local] ||= :f

    content_for :new_upload_comment_fields do
      content_tag(:div, :class => "#{association}_fields_template", :style => "display: none") do
        form_builder.fields_for(association, options[:object], :child_index => "new_#{association}") do |f|
          render(:partial => options[:partial], :locals => { options[:form_builder_local] => f })
        end
      end
    end
  end

  def add_child_link_upload_comment(name, association)
    link_to(name, "javascript:void(0)", :class => "add_child_upload_comment", :"data-association" => association)
  end

  def add_child_link_upload_edit_comment(name, association)
    link_to(name, "javascript:void(0)", :class => "add_child_upload_edit_comment", :"data-association" => association)
  end


end
