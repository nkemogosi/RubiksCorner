class AddUsernameToRTimes < ActiveRecord::Migration[5.2]
  def change
    add_column :r_times, :username, :string,null: false,default: ""
    add_index :r_times, :username
  end
end
