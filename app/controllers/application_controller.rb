class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!
  before_action :set_current_user
  
  def configure_permitted_parameters
    update_attrs = [:password, :password_confirmation, :current_password]
    devise_parameter_sanitizer.permit :account_update, keys: update_attrs
  end
  
  def application
  end
  
  private
      
    def user_params
      params.require(:user).permit!
    end
    
    def profile_params
      params.require(:profile).permit!
    end
    
    def set_current_user
      @current_user = current_user
    end
    
    def default_redirect
      redirect_to authenticated_root_path, notice: "// You can't do that!"
    end
    
    def admin_or_employee?
      current_user.admin? or current_user.has_role? :employee
    end
    
end