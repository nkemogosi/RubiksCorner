class AddUserIdToRTimes < ActiveRecord::Migration[5.2]
  def change
    add_column :r_times, :user_id, :integer
  end
end
