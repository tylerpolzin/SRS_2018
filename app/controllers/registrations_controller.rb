class RegistrationsController < Devise::RegistrationsController

  before_action :one_user_registered?, only: [:new, :create]

  def edit
    @users = User.find(params[:id])
  end
  def update
    @user = User.find(params[:id])
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: '// User has been updated!' }
        format.json { respond_with_bip(@user) }
      else
        format.html { render :edit }
        format.json { respond_with_bip(@user) }
      end
    end
  end

  protected

  def one_user_registered?
    if ((User.count == 1) & (user_signed_in?))
      redirect_to root_path
    elsif User.count == 1
      redirect_to login_path
    end  
  end

  private
      
    def user_params
      params.require(:user).permit!
    end
    
    def role_params
      params.require(:role).permit!
    end
    
    def users_role_params
      params.require(:users_role).permit!
    end
    
    def profile_params
      params.require(:profile).permit!
    end

end