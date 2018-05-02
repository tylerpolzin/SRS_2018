# == Schema Information
#
# Table name: tracking_numbers
#
#  id              :integer          not null, primary key
#  line_item_id    :integer
#  carrier         :string
#  tracking_number :string
#  shipping_cost   :decimal(, )      default(0.0)
#  ship_date       :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  shipping_method :string
#

class TrackingNumber < ApplicationRecord
  belongs_to :line_item

  def ship_date_trunc
    if self.ship_date.present?
      self.ship_date.strftime("%Y-%m-%d")
    else
      self.ship_date
    end
  end

  def tracking_number_present
    if self.tracking_number.present?
      "#{tracking_number}"
    else
      "No Tracking Indicated"
    end
  end

  def tracking_link_select
    if self.carrier == "UPS"
      "//wwwapps.ups.com/WebTracking/processInputRequest?AgreeToTermsAndConditions=yes&loc=en_US&tracknum=#{tracking_number}"
    elsif self.carrier == "FedEx"
      "//www.fedex.com/apps/fedextrack/?action=track&tracknumbers=#{tracking_number}&locale=en_US&cntry_code=us"
    elsif self.carrier == "USPS"
      "//tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=#{tracking_number}"
    elsif self.carrier == "DHL"
      "//www.dhl-usa.com/en/express/tracking.html?AWB=#{tracking_number}&brand=DHL"
    elsif self.carrier.blank?
      "No Tracking Indicated"
    end
  end

end
