class RTimesController < ApplicationController
  before_action :set_r_time, only: [ :edit, :update, :destroy]

  # GET /r_times
  # GET /r_times.json
  def index
    jsonText= "["
    @user_id = current_user.id
    @r_times = RTime.where('user_id = ?',@user_id).order("created_at asc")
    @r_times.each_with_index do |r, index|
      jsonText+='{"minutes": '+ r.minutes.to_s+","
      jsonText+='"seconds": '+ r.seconds.to_s+","
      jsonText+='"millisecs": '+ r.millisecs.to_s+","
      jsonText+='"dnf": '+ r.seconds.to_s+","
      if index < @r_times.size - 1
        jsonText+='"plus2": '+ r.plus2.to_s+"},"
      else
        jsonText+='"plus2": '+ r.plus2.to_s+"}"
      end
    end
    jsonText += "]"
    respond_to do |format|
      format.json { render json: JSON.parse(jsonText) }
    end
  end

  # GET /r_times/new
  def new
    @r_time = RTime.new
  end

  # GET /r_times/1/edit
  def edit
  end

  # POST /r_times
  # POST /r_times.json
  def create
    @user_id = current_user.id
    @r_time = RTime.new(user_id: @user_id,minutes:params[:minutes],seconds:params[:seconds],millisecs:params[:millisecs],dnf:params[:dnf],plus2:params[:plus2])

    respond_to do |format|
      if @r_time.save
        format.json { render :show, status: :created, location: @r_time }
      else
        format.html { render :new }
        format.json { render json: @r_time.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /r_times/1
  # PATCH/PUT /r_times/1.json
  def update
    respond_to do |format|
      if @r_time.update(r_time_params)
        format.html { redirect_to @r_time, notice: 'R time was successfully updated.' }
        format.json { render :show, status: :ok, location: @r_time }
      else
        format.html { render :edit }
        format.json { render json: @r_time.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /r_times/1
  # DELETE /r_times/1.json
  def destroy
    @r_time.destroy
    respond_to do |format|
      format.html { redirect_to r_times_url, notice: 'R time was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_r_time
      @r_time = RTime.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def r_time_params
      params.require(:r_time).permit(:minutes, :seconds, :millisecs, :dnf, :plus2)
    end
end
