class RTimesController < ApplicationController
  before_action :set_r_time, only: [ :edit, :update, :destroy]

  # GET /r_times
  # GET /r_times.json
  def index # Create a json script that contains a list of times and the dates they were created in order to render on homepage
    jsonText= "["
    @user_id = current_user.id
    @r_times = RTime.where('user_id = ?',@user_id).order("created_at asc") #Geting the times that apply only to that user
    @r_times.each_with_index do |r, index|
      jsonText+='{"minutes": '+ r.minutes.to_s+","
      jsonText+='"seconds": '+ r.seconds.to_s+","
      datetime = r.created_at.to_s.split(" ")[0]
      jsonText+='"datetime": "'+datetime.to_s+'",'
      if index < @r_times.size - 1  # Ensuring formatting is accurate
        jsonText+='"millisecs": '+ r.millisecs.to_s+"},"
      else
        jsonText+='"millisecs": '+ r.millisecs.to_s+"}"
      end
    end
    jsonText += "]"
    puts jsonText
    respond_to do |format| #Return a json response only
      format.json { render json: jsonText }
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
    @r_time = RTime.new(user_id: @user_id,minutes:params[:minutes],seconds:params[:seconds],millisecs:params[:millisecs])

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
      params.require(:r_time).permit(:minutes, :seconds, :millisecs)
    end
end
