Rails.application.routes.draw do
  resources :discussions
  resources :r_times
  devise_for :users
  devise_scope :user do
    get 'sign_in', to: 'devise/sessions#new'
    get 'sign_up', to: 'devise/registrations#new'
  end
  get 'home',to: 'pages#home'
  get 'about',to: 'pages#about'
  get 'contact', to: 'pages#contact'
  post 'request_contact', to: 'pages#request_contact'

  root 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
