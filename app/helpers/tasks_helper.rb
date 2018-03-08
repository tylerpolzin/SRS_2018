module TasksHelper

#------------------------------------------------------------------------------------------------------
#                               NEW TASK ECOMM ORDERS NESTED FIELDS                                   |
#------------------------------------------------------------------------------------------------------

  def new_child_fields_template_ecomm_order(form_builder, association, options = {})
    options[:object] ||= form_builder.object.class.reflect_on_association(association).klass.new
    options[:partial] ||= association.to_s.singularize
    options[:form_builder_local] ||= :f

    content_for :new_task_ecomm_order_fields do
      content_tag(:div, :id => "#{association}_fields_template", :style => "display: none") do
        form_builder.fields_for(association, options[:object], :child_index => "new_#{association}") do |f|
          render(:partial => options[:partial], :locals => { options[:form_builder_local] => f })
        end
      end
    end
  end

  def add_child_link_ecomm_order(name, association)
    link_to(name, "javascript:void(0)", :class => "add_child_ecomm_order hidden", :"data-association" => association)
  end

  def remove_child_link_ecomm_order(name, f)
    f.hidden_field(:_destroy) + link_to(name, "javascript:void(0)", :class => "remove_child_ecomm_order")
  end

  #----------------------------ECOMM ORDER LINE ITEMS NESTED FIELDS-----------------------------------|

      def new_child_fields_template_ecomm_order_line_item(form_builder, association, options = {})
        options[:object] ||= form_builder.object.class.reflect_on_association(association).klass.new
        options[:partial] ||= association.to_s.singularize
        options[:form_builder_local] ||= :ff
    
        content_for :new_task_ecomm_order_line_item_fields do
          content_tag(:div, :class => "#{association}_fields_template", :style => "display: none") do
            form_builder.fields_for(association, options[:object], :child_index => "new_#{association}") do |f|
              render(:partial => options[:partial], :locals => { options[:form_builder_local] => f })
            end
          end
        end
      end
    
      def add_child_link_ecomm_order_line_item(name, association)
        link_to(name, "javascript:void(0)", :class => "add_child_ecomm_order_line_item", :"data-association" => association)
      end
    
      def remove_child_link_ecomm_order_line_item(name, f)
        f.hidden_field(:_destroy) + link_to(name, "javascript:void(0)", :class => "remove_child_ecomm_order_line_item")
      end

#------------------------------------------------------------------------------------------------------
#                               NEW TASK UPLOADS NESTED FIELDS                                        |
#------------------------------------------------------------------------------------------------------

  def new_child_fields_template_new_task_upload(form_builder, association, options = {})
    options[:object] ||= form_builder.object.class.reflect_on_association(association).klass.new
    options[:partial] ||= association.to_s.singularize
    options[:form_builder_local] ||= :f

    content_for :new_task_upload_fields do
      content_tag(:div, :id => "#{association}_fields_template", :style => "display: none") do
        form_builder.fields_for(association, options[:object], :child_index => "new_#{association}") do |f|
          render(:partial => options[:partial], :locals => { options[:form_builder_local] => f })
        end
      end
    end
  end

  def add_child_link_new_task_upload(name, association)
    link_to(name, "javascript:void(0)", :class => "add_child_new_task_upload hidden", :"data-association" => association)
  end

  def remove_child_link_new_task_upload(name, f)
    f.hidden_field(:_destroy) + link_to(name, "javascript:void(0)", :class => "remove_child_new_task_upload")
  end

end
