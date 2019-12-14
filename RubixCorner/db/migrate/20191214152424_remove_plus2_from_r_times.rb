class RemovePlus2FromRTimes < ActiveRecord::Migration[5.2]
  def change
    remove_column :r_times, :plus2
  end
end
