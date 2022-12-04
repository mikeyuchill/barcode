# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

* Add following gems to Gemfile
```ruby
gem 'jquery-rails'
gem 'bootstrap-sass'
gem 'simple_form'
gem 'faker'
gem 'font-awesome-sass'
```

* Run install for simple_form
```ruby
# terminal
rails g simple_form:install --bootstrap
```

* Generate scaffold for product and visitors controller
```ruby
# terminal
rails g scaffold product name upc image_url

rails g controller visitors index
```

* modify routes.rb to add get_barcode route
```ruby
resources :products do
  post :get_barcode, on: :collection
end
root to: 'visitors#index'
```
* Download quaggaJS for barcode-scanner https://github.com/serratus/quaggaJS

* The barcode scanner does not work very well, I have to find a product with flat box and make sure there is enough light around the room to make the barcode scanner works to find the right product.
