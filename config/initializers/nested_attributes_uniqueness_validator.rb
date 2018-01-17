class NestedAttributesUniquenessValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, items)
    items = items.reject(&:_destroy) # let's ignore the items to be destroyed here
    unless items.map(&options[:field]).to_a.uniq.size == items.size
      record.errors[attribute] << "-- Duplicate Entries Are Present"
      field = options[:field]
      values = items.map {|item| item.send(field) }
      duplicates = items.find_all {|item| values.count(item.send(field)) > 1 && item.id.nil? }
      duplicates.each { |obj| obj.errors[field] << "has already been taken" }
    end
  end
end