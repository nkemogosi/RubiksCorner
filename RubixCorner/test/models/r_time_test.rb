require 'test_helper'

class RTimeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test 'should not have an empty time' do
    r_time = RTime.new
    r_time.save
    refute r_time.valid?
  end
end
