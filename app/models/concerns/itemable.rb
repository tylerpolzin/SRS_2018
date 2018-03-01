module Itemable
  extend ActiveSupport::Concern
  included do
    has_many :item_uploads, as: :itemable
    has_many :uploads, through: :item_uploads
  end

end