module TasksHelper

  #----------------------------NEW TASK COMMENTS NESTED FIELDS-----------------------------------|

      def new_child_fields_template_task_comment(form_builder, association, options = {})
        options[:object] ||= form_builder.object.class.reflect_on_association(association).klass.new
        options[:partial] ||= association.to_s.singularize
        options[:form_builder_local] ||= :f
    
        content_for :new_task_comment_fields do
          content_tag(:div, :class => "#{association}_fields_template", :style => "display: none") do
            form_builder.fields_for(association, options[:object], :child_index => "new_#{association}") do |f|
              render(:partial => options[:partial], :locals => { options[:form_builder_local] => f })
            end
          end
        end
      end
    
      def add_child_link_task_comment(name, association)
        link_to(name, "javascript:void(0)", :class => "add_child_task_comment", :"data-association" => association)
      end



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
    f.hidden_field(:_destroy) + link_to(name, "javascript:void(0)", :class => "remove_child_ecomm_order hidden")
  end

  #----------------------------ECOMM ORDER COMMENTS NESTED FIELDS-----------------------------------|

      def new_child_fields_template_ecomm_order_comment(form_builder, association, options = {})
        options[:object] ||= form_builder.object.class.reflect_on_association(association).klass.new
        options[:partial] ||= association.to_s.singularize
        options[:form_builder_local] ||= :f
    
        content_for :new_task_ecomm_order_comment_fields do
          content_tag(:div, :class => "#{association}_fields_template", :style => "display: none") do
            form_builder.fields_for(association, options[:object], :child_index => "new_#{association}") do |f|
              render(:partial => options[:partial], :locals => { options[:form_builder_local] => f })
            end
          end
        end
      end
    
      def add_child_link_ecomm_order_comment(name, association)
        link_to(name, "javascript:void(0)", :class => "add_child_ecomm_order_comment", :"data-association" => association)
      end

      def add_child_link_ecomm_order_edit_comment(name, association)
        link_to(name, "javascript:void(0)", :class => "add_child_ecomm_order_edit_comment", :"data-association" => association)
      end

  #----------------------------ECOMM ORDER LINE ITEMS NESTED FIELDS-----------------------------------|

      def new_child_fields_template_ecomm_order_line_item(form_builder, association, options = {})
        options[:object] ||= form_builder.object.class.reflect_on_association(association).klass.new
        options[:partial] ||= association.to_s.singularize
        options[:form_builder_local] ||= :f
    
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
    
      def remove_child_link_line_item(name, f)
        f.hidden_field(:_destroy) + link_to(name, "javascript:void(0)", :class => "remove_child_line_item hidden")
      end

      #----------------------------LINE ITEM TRACKING NUMBERS NESTED FIELDS-----------------------------------|
    
          def new_child_fields_template_line_item_tracking_number(form_builder, association, options = {})
            options[:object] ||= form_builder.object.class.reflect_on_association(association).klass.new
            options[:partial] ||= association.to_s.singularize
            options[:form_builder_local] ||= :f
        
            content_for :line_item_tracking_number_fields do
              content_tag(:div, :class => "#{association}_fields_template", :style => "display: none") do
                form_builder.fields_for(association, options[:object], :child_index => "new_#{association}") do |f|
                  render(:partial => options[:partial], :locals => { options[:form_builder_local] => f })
                end
              end
            end
          end

          def add_child_link_line_item_tracking_number(name, association)
            link_to(name, "javascript:void(0)", :class => "add_child_line_item_tracking_number", :"data-association" => association)
          end
          def add_child_link_line_item_edit_tracking_number(name, association)
            link_to(name, "javascript:void(0)", :class => "add_child_line_item_edit_tracking_number", :"data-association" => association)
          end

          def remove_child_link_line_item_tracking_number(name, f)
            f.hidden_field(:_destroy) + link_to(name, "javascript:void(0)", :class => "remove_child_line_item_tracking_number")
          end

#------------------------------------------------------------------------------------------------------
#                               NEW TASK WARRANTY ORDERS NESTED FIELDS                                |
#------------------------------------------------------------------------------------------------------

  def new_child_fields_template_warranty_order(form_builder, association, options = {})
    options[:object] ||= form_builder.object.class.reflect_on_association(association).klass.new
    options[:partial] ||= association.to_s.singularize
    options[:form_builder_local] ||= :f

    content_for :new_task_warranty_order_fields do
      content_tag(:div, :id => "#{association}_fields_template", :style => "display: none") do
        form_builder.fields_for(association, options[:object], :child_index => "new_#{association}") do |f|
          render(:partial => options[:partial], :locals => { options[:form_builder_local] => f })
        end
      end
    end
  end

  def add_child_link_warranty_order(name, association)
    link_to(name, "javascript:void(0)", :class => "add_child_warranty_order hidden", :"data-association" => association)
  end

  def remove_child_link_warranty_order(name, f)
    f.hidden_field(:_destroy) + link_to(name, "javascript:void(0)", :class => "remove_child_warranty_order hidden")
  end

  #----------------------------WARRANTY ORDER COMMENTS NESTED FIELDS-----------------------------------|

      def new_child_fields_template_warranty_order_comment(form_builder, association, options = {})
        options[:object] ||= form_builder.object.class.reflect_on_association(association).klass.new
        options[:partial] ||= association.to_s.singularize
        options[:form_builder_local] ||= :f
    
        content_for :new_task_warranty_order_comment_fields do
          content_tag(:div, :class => "#{association}_fields_template", :style => "display: none") do
            form_builder.fields_for(association, options[:object], :child_index => "new_#{association}") do |f|
              render(:partial => options[:partial], :locals => { options[:form_builder_local] => f })
            end
          end
        end
      end
    
      def add_child_link_warranty_order_comment(name, association)
        link_to(name, "javascript:void(0)", :class => "add_child_warranty_order_comment", :"data-association" => association)
      end
      def add_child_link_warranty_order_edit_comment(name, association)
        link_to(name, "javascript:void(0)", :class => "add_child_warranty_order_edit_comment", :"data-association" => association)
      end

  #----------------------------WARRANTY ORDER LINE ITEMS NESTED FIELDS-----------------------------------|

      def new_child_fields_template_warranty_order_line_item(form_builder, association, options = {})
        options[:object] ||= form_builder.object.class.reflect_on_association(association).klass.new
        options[:partial] ||= association.to_s.singularize
        options[:form_builder_local] ||= :f
    
        content_for :new_task_warranty_order_line_item_fields do
          content_tag(:div, :class => "#{association}_fields_template", :style => "display: none") do
            form_builder.fields_for(association, options[:object], :child_index => "new_#{association}") do |f|
              render(:partial => options[:partial], :locals => { options[:form_builder_local] => f })
            end
          end
        end
      end
    
      def add_child_link_warranty_order_line_item(name, association)
        link_to(name, "javascript:void(0)", :class => "add_child_warranty_order_line_item", :"data-association" => association)
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
