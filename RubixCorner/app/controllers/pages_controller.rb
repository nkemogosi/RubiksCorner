class PagesController < ApplicationController
  def home
  end
  def about
  end
  def contact
  end
  def request_contact
    name = params[:name]
    email = params[:email]
    telephone = params[:telephone]
    message = params[:message]
    if email.blank?
      flash[:alert]=I18n.t('pages.request_contact.no_email')
    else
      flash[:alert]=I18n.t('pages.request_contact.sent')
    end
    redirect_to root_path
  end
end
