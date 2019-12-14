require 'test_helper'

class RTimesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  setup do
    @r_time = r_times(:one)
    @user = users(:one)
  end

  test "should get index" do
    puts "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    sign_in @user
    time= response.body
    puts time
    assert_equal 1,time['minutes']
  end


  test "should create r_time" do
    assert_difference('RTime.count') do

      post r_times_url, params: { r_time: {user_id: @user.id, millisecs: @r_time.millisecs, minutes: @r_time.minutes, seconds: @r_time.seconds} }
      user = JSON.parse(@response.body)
      puts 1.to_s
      assert_equal "Mike", user['name']
    end
  end

  test "should destroy r_time" do
    assert_difference('RTime.count', -1) do
      delete r_time_url(@r_time)
    end

    assert_redirected_to r_times_url
  end
end
