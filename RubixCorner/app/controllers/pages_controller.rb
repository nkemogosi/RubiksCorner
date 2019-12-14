class PagesController < ApplicationController
  def home
  end
  def about
  end
  def contact
  end
  def request_contact #Setting up mailer
    name = params[:name]
    email = params[:email]
    telephone = params[:telephone]
    message = params[:message]
    if email.blank?
      flash[:alert]=I18n.t('pages.request_contact.no_email')
    else
      flash[:notice]=I18n.t('pages.request_contact.sent')
    end
    redirect_to root_path
  end
  def create_scramble # Action that allows the new scrambles using a gem to be rendered
    size = params[:puzzleSize]
    puzzle = params[:puzzle]
    scramble=0
    case puzzle
    when 0
      scramble = Scrambler::TwoByTwo.new.scramble(size)
    when 1
      scramble = Scrambler::ThreeByThree.new.scramble(size)
    when 2
      scramble = Scrambler::FourByFour.new.scramble(size)
    when 3
      scramble = Scrambler::FiveByFive.new.scramble(size)
    when 4
      scramble = Scrambler::SixBySix.new.scramble(size)
    when 5
      scramble = Scrambler::SevenBySeven.new.scramble(size)
    when 6
      scramble = Scrambler::Pyraminx.new.scramble(size)
    when 7
      scramble = Scrambler::Clock.new.scramble(size)
    when 8
      scramble = Scrambler::Square1.new.scramble(size)
    when 9
      scramble = Scrambler::Square1.new.scramble(size)
    else
      scramble = Scrambler::ThreeByThree.new.scramble(25);
    end
    respond_to do |format|
      format.json { render json: {"value" => scramble} } #Return a JSON script of the string scramble value
    end
  end
end
