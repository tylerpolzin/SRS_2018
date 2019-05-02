module ApplicationHelper

  def development?
    @is_development ||= (Rails.env != 'production')
  end

  def production?
    @is_production ||= (Rails.env == 'production')
  end
  
  def tabindex
    @tabindex ||= 0
    @tabindex += 1
  end
  
  def admin_or_employee?
    current_user.admin? or current_user.has_role? :employee
  end

  def new_child_fields_template(form_builder, association, options = {})
    options[:object] ||= form_builder.object.class.reflect_on_association(association).klass.new
    options[:partial] ||= association.to_s.singularize
    options[:form_builder_local] ||= :f

    content_for :jstemplates do
      content_tag(:div, :id => "#{association}_fields_template", :style => "display: none", :"data-count" => 0) do
        form_builder.fields_for(association, options[:object], :child_index => "new_#{association}") do |f|
          render(:partial => options[:partial], :locals => { options[:form_builder_local] => f })
        end
      end
    end
  end

  def add_child_link(name, association)
    link_to(name, "javascript:void(0)", :class => "add_child btn btn-sm fa fa-file", :style => "margin-left: 15px; margin-top: 15px;", :"data-association" => association, :"data-count" => "new_#{association}")
  end

  def remove_child_link(name, f)
    f.hidden_field(:_destroy) + link_to(name, "javascript:void(0)", :style => "height: 30px; margin-left: 5px;", :class => "remove_child btn btn-danger fa fa-close")
  end
  
  def new_comment_fields_template(form_builder, association, options = {})
    options[:object] ||= form_builder.object.class.reflect_on_association(association).klass.new
    options[:partial] ||= association.to_s.singularize
    options[:form_builder_local] ||= :f

    content_for :commentable do
      content_tag(:div, :id => "#{association}_fields_template", :style => "display: none") do
        form_builder.fields_for(association, options[:object], :child_index => "new_#{association}") do |f|
          render(:partial => options[:partial], :locals => { options[:form_builder_local] => f })
        end
      end
    end
  end

  def add_comment_link(name, association)
    link_to(name, "javascript:void(0)", :class => "add_comment hidden", :"data-association" => association)
  end

  def remove_comment_link(name, f)
    f.hidden_field(:_destroy) + link_to(name, "javascript:void(0)", :class => "remove_comment")
  end
  
  def carriers # Not currently used
    {
      "Standard Carriers" =>
      ["UPS", "FedEx", "USPS", "DHL"],
      "LTL Carriers" =>
      ["Estes", "Globaltranz", "Hot Line", "SAIA", "USF Holland", "YRC"]
    }
  end

  def ship_methods
    [
      ["Standard (Ground)"],
      ["First Class (USPS)"],
      ["Priority (USPS)"],
      ["Snail Mail (USPS)"],
      ["2nd Day Air"],
      ["2nd Day Air AM"],
      ["Next Day Air"],
      ["Next Day Air Saver"],
      ["Next Day Air Early"],
      ["3 Day Select"],
      ["Freight LTL"],
      ["Next Day Air Freight"],
      ["2nd Day Air Freight"],
      ["3 Day Freight"]
    ]
  end

  def us_states
    [
      ['', ''],
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['Arizona', 'AZ'],
      ['Arkansas', 'AR'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['District of Columbia', 'DC'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Pennsylvania', 'PA'],
      ['Puerto Rico', 'PR'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY']
    ]
  end
  
  def us_states_with_abbrv
    [
      ['', ''],
      ['Alabama (AL)', 'AL'],
      ['Alaska (AK)', 'AK'],
      ['Arizona (AZ)', 'AZ'],
      ['Arkansas (AR)', 'AR'],
      ['California (CA)', 'CA'],
      ['Colorado (CO)', 'CO'],
      ['Connecticut (CT)', 'CT'],
      ['Delaware (DE)', 'DE'],
      ['District of Columbia (DC)', 'DC'],
      ['Florida (FL)', 'FL'],
      ['Georgia (GA)', 'GA'],
      ['Hawaii (HI)', 'HI'],
      ['Idaho (ID)', 'ID'],
      ['Illinois (IL)', 'IL'],
      ['Indiana (IN)', 'IN'],
      ['Iowa (IA)', 'IA'],
      ['Kansas (KS)', 'KS'],
      ['Kentucky (KY)', 'KY'],
      ['Louisiana (LA)', 'LA'],
      ['Maine (ME)', 'ME'],
      ['Maryland (MD)', 'MD'],
      ['Massachusetts (MA)', 'MA'],
      ['Michigan (MI)', 'MI'],
      ['Minnesota (MN)', 'MN'],
      ['Mississippi (MS)', 'MS'],
      ['Missouri (MO)', 'MO'],
      ['Montana (MT)', 'MT'],
      ['Nebraska (NE)', 'NE'],
      ['Nevada (NV)', 'NV'],
      ['New Hampshire (NH)', 'NH'],
      ['New Jersey (NJ)', 'NJ'],
      ['New Mexico (NM)', 'NM'],
      ['New York (NY)', 'NY'],
      ['North Carolina (NC)', 'NC'],
      ['North Dakota (ND)', 'ND'],
      ['Ohio (OH)', 'OH'],
      ['Oklahoma (OK)', 'OK'],
      ['Oregon (OR)', 'OR'],
      ['Pennsylvania (PA)', 'PA'],
      ['Puerto Rico (PR)', 'PR'],
      ['Rhode Island (RI)', 'RI'],
      ['South Carolina (SC)', 'SC'],
      ['South Dakota (SD)', 'SD'],
      ['Tennessee (TN)', 'TN'],
      ['Texas (TX)', 'TX'],
      ['Utah (UT)', 'UT'],
      ['Vermont (VT)', 'VT'],
      ['Virginia (VA)', 'VA'],
      ['Washington (WA)', 'WA'],
      ['West Virginia (WV)', 'WV'],
      ['Wisconsin (WI)', 'WI'],
      ['Wyoming (WY)', 'WY']
    ]
  end
  
  def vendor
    [
      ['Tuscany', 'Tuscany'],
      ['All Stone', 'All Stone'],
      ['Ray Padula', 'Ray Padula'],
      ['Colonial Elegance', 'Colonial Elegance'],
      ['Dr Sharp', 'Dr Sharp'],
      ['Firplak', 'Firplak'],
      ['Azembla', 'Azembla'],
      ['Lift Bridge', 'Lift Bridge'],
      ['Turn of the Century', 'Turn of the Century'],
      ['Other...', 'Other']
    ]
  end
  
end
