class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  def new
    if current_user.admin?
      @user = User.new
    end
  end

  def show
    @user = User.find(params[:id])
    if current_user != @user
      if !current_user.admin?
        default_redirect
      end
    end
    @profile = @user.profile
    @roles = Role.includes(:users_role).where(:users_roles => {:user_id => params[:id]})
    if current_user.admin? and current_user == @user
      @activeassignments = Assignment.order(priority: :asc).order(created_at: :desc).where(:active => true).where(:user_id => 1).where(priority: 1..2)
      @completeassignments = Assignment.order(priority: :asc).order(created_at: :desc).where(:active => false)
      @bugreports = Assignment.order(priority: :asc).order(created_at: :desc).where(:active => true).where.not(:user_id => 1)
      @generalreminders = Assignment.order(priority: :asc).order(created_at: :desc).where(:active => true).where(priority: 3)
    end
    @activebugreports = Assignment.order(priority: :asc).order(created_at: :desc).where(:user_id => current_user).where(:active => true)
    @completedbugreports = Assignment.order(priority: :asc).order(created_at: :desc).where(:user_id => current_user).where(:active => false)

    if admin_or_employee?
      @products = Product.where(:brand_name => "Liftbridge Kitchen & Bath")
    elsif current_user.has_role?(:drsharp)
      @products = Product.where(:brand_name => "Dr Sharp")
    elsif current_user.has_role?(:colonial)
      @products = Product.where(:brand_name => "Colonial Elegance")
    elsif current_user.has_role?(:padula)
      @products = Product.where(:brand_name => "Ray Padula")
    else
      default_redirect
    end

  end
  
  def index
    if admin_or_employee?
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
    @user = User.find(params[:id])
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to authenticated_root_path, notice: '// User has been updated!' }
        format.json { respond_with_bip(@user) }
      else
        format.html { render :edit }
        format.json { respond_with_bip(@user) }
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
    
    def set_user
      @user = User.find(params[:id])
    end
    
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