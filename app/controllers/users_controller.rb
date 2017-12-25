class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    # @roles = Role.includes(:users_role).where(:users_roles => {:user_id => params[:id]})
  end
  
  def index
    @users = User.includes(:profile)
  end
  
  def edit
    @users = User.find(params[:id])
  end
  
  def create
    @user = User.find( params[:user_id] )
    @profile = @user.build_profile ( profile_params )
    if @profile.save
      flash[:success] = "Profile Updated!"
      redirect_to users_path
    else
      render action: :new
    end
  end

  def update
    @users = User.find(params[:id])
    respond_to do |format|
      if @users.update(user_params)
        format.html { redirect_to @users, notice: 'User was successfully updated.' }
        format.json { respond_with_bip(@users) }
      else
        format.html { render :edit }
        format.json { respond_with_bip(@users) }
      end
    end
  end
  
  def dashboard
    redirect_to current_user
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