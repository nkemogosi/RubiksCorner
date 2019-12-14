require 'test_helper'

class RTimesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @r_time = r_times(:one)
  end

  test "should get index" do
    get r_times_url
    assert_response :success
  end


  test "should create r_time" do
    assert_difference('RTime.count') do
      post r_times_url, params: { r_time: { dnf: @r_time.dnf, millisecs: @r_time.millisecs, minutes: @r_time.minutes, plus2: @r_time.plus2, seconds: @r_time.seconds} }
    end

    assert_redirected_to r_time_url(RTime.last)
  end

  test "should destroy r_time" do
    assert_difference('RTime.count', -1) do
      delete r_time_url(@r_time)
    end

    assert_redirected_to r_times_url
  end
end
