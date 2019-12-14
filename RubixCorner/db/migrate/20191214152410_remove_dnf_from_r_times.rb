class RemoveDnfFromRTimes < ActiveRecord::Migration[5.2]
  def change
    remove_column :r_times, :dnf
  end
end
