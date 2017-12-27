class ProfilesController < ApplicationController
  # before_action :set_profile, only: [:show, :edit, :update, :destroy]
  before_action :only_current_user

  def index
    @profiles = Profile.all
  end

  def show
    @user = User.find( params[:id] )
  end

  def new
    @user = User.find( params[:user_id] )
    @profile = Profile.new
  end

  def edit
    @user = User.find( params[:user_id] )
    @profile = @user.profile
  end

  def create
    @user = User.find( params[:user_id] )
    @profile = @user.build_profile ( profile_params )
    if @profile.save
      flash[:success] = "Profile updated!"
      redirect_to users_path, :notice => "// Profile has been updated!"
    else
      render action: :new
    end
  end

  def update
    @user = User.find( params[:user_id] )
    @profile = @user.profile
    if @profile.update_attributes(profile_params)
      flash[:success] = "Profile updated!"
      redirect_to authenticated_root_path, :notice => "// Profile has been updated!"
    else
      render action: :edit
    end
  end

  def destroy
    @profile.destroy
    respond_to do |format|
      format.html { redirect_to profiles_url, notice: '// Profile has been deleted!' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_profile
      @profile = Profile.find(params[:id])
    end

    def profile_params
      params.require(:profile).permit!
    end
    
    def only_current_user
      @user = User.find( params[:user_id] )
      redirect_to(root_url, :notice => "// You can't do that!") unless @user == current_user
    end
    
end
