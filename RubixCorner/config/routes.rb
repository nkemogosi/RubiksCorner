Rails.application.routes.draw do
  resources :discussions
  resources :r_times
  devise_for :users
  get 'home',to: 'pages#home'
  get 'about',to: 'pages#about'
  get 'contact', to: 'pages#contact'
  post 'request_contact', to: 'pages#request_contact'

  root 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
