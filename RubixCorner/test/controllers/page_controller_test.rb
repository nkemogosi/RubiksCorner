require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "Home page" do
      get root_url
      assert_response :success
      assert_select 'title', 'Rubix\'s Corner'
      assert_select 'h1', 'Rubix\'s Corner'
  end
end
