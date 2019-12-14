require "application_system_test_case"

class RTimesTest < ApplicationSystemTestCase
  include Devise::Test::IntegrationHelpers
  setup do
    @r_time = r_times(:one)
    @user = users(:one)
  end

  test "visiting the index" do
    sign_in @user
    visit root_url
    assert_selector "h1", text: "R Times"
  end

  test "creating a R time" do
    visit r_times_url
    click_on "New R Time"
    fill_in "Millisecs", with: @r_time.millisecs
    fill_in "Minutes", with: @r_time.minutes
    fill_in "Seconds", with: @r_time.seconds
    click_on "Create R time"

    assert_text "R time was successfully created"
    click_on "Back"
  end
  test "destroying a R time" do
    visit root_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "R time was successfully destroyed"
  end
end
