class AssignmentsController < ApplicationController
  before_action :set_assignment, only: [:show, :edit, :update, :destroy]

  def index
    @assignments = Assignment.all
  end

  def new
    @assignment = Assignment.new
  end

  def create
    @assignment = Assignment.new(assignment_params)

    respond_to do |format|
      if @assignment.save
        if current_user.admin?
          format.html { redirect_to authenticated_root_path, notice: '// Assignment was successfully created.' }
        else
          format.html { redirect_to authenticated_root_path, notice: '// Bug Report was successfully created.' }
        end
        format.json { render :show, status: :created, location: @assignment }
      else
        format.html { render :new }
        format.json { render json: @assignment.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @assignment = Assignment.find(params[:id])
    respond_to do |format|
      if @assignment.update(assignment_params)
        format.html { redirect_to @assignment, notice: 'Assignment was successfully updated.' }
        format.json { respond_with_bip(@assignment) }
      else
        format.html { render :edit }
        format.json { respond_with_bip(@assignment) }
      end
    end
  end

  def destroy
    @assignment.destroy
    respond_to do |format|
      format.html { redirect_to assignments_url, notice: '// Assignment was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_assignment
      @assignment = Assignment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def assignment_params
      params.require(:assignment).permit!
    end
end
