class UsersController < ApplicationController

  before_action :authenticate_user!
  #before_action :only_current_user
  
  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
    @roles = Role.includes(:users_role).where(:users_roles => {:user_id => params[:id]})
    if current_user.admin? or current_user.has_role? (:employee)
      @products = Product.all
    elsif current_user.has_role? (:drsharp)
      @products = Product.where(:brand_name => "Dr Sharp")
    end
  end
  
  def index
    if current_user.admin? or current_user.has_role? (:employee)
      @users = User.includes(:profile)
    else
      @users = User.where(:id => current_user)
    end
  end
  
  def edit
    @users = User.find(params[:id])
  end
  
  def create
    @user = User.find( params[:user_id] )
    @profile = @user.build_profile ( profile_params )
    if @profile.save
      flash[:success] = "Profile Updated!"
      redirect_to users_path, notice: "// User has been created!"
    else
      render action: :new
    end
  end

  def update
    @users = User.find(params[:id])
    respond_to do |format|
      if @users.update(user_params)
        format.html { redirect_to @users, notice: '// User has been updated!' }
        format.json { respond_with_bip(@users) }
      else
        format.html { render :edit }
        format.json { respond_with_bip(@users) }
      end
    end
  end
  
  def update_password
    @user = current_user
    if @user.update(user_params)
      # Sign in the user by passing validation in case their password changed
      bypass_sign_in(@user)
      redirect_to root_path
    else
      render "edit"
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

    def only_current_user
      redirect_to(root_url, :notice => "// You can't do that!") unless current_user.id.to_s == params[:id]
    end

end