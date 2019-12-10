class RemoveUserIdFromRTimes < ActiveRecord::Migration[5.2]
  def change
    remove_column :r_times, :user_id, :integer
  end
end
