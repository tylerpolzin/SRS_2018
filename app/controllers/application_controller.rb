class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  def configure_permitted_parameters
    update_attrs = [:password, :password_confirmation, :current_password]
    devise_parameter_sanitizer.permit :account_update, keys: update_attrs
  end
  
  def application
    @user = User.find(current_user)
  end
  
  private
      
    def user_params
      params.require(:user).permit!
    end
    
    def profile_params
      params.require(:profile).permit!
    end
    
end