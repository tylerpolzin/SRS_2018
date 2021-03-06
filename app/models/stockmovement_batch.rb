# == Schema Information
#
# Table name: stockmovement_batches
#
#  id                 :integer          not null, primary key
#  user_id            :integer
#  stockmovement_type :string
#  notes              :text
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class StockmovementBatch < ApplicationRecord
  has_many :stockmovements, dependent: :destroy
  has_many :comments, as: :commentable
  belongs_to :user

  accepts_nested_attributes_for :stockmovements, :reject_if => :item_id_blank, :allow_destroy => true
  
  validates_presence_of :stockmovement_type
  
  # validates :stockmovements, :nested_attributes_uniqueness => {:field => :product_id || :part_id}
  # Validates that a product or part is not duplicated in the same batch. 
  # Redundant along with JS that disables an item in the proceeding select boxes once a unique item is selected.
  # config/Initializers/nested_attributes_uniqueness_validator.rb

  def item_id_blank(a) # If a item is added to the batch, but an item is not selected in that field, it is automatically rejected & deleted.
    self.new_record? && a[:product_id].blank? && a[:part_id].blank?
  end

end
