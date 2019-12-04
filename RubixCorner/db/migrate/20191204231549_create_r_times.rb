class CreateRTimes < ActiveRecord::Migration[5.2]
  def change
    create_table :r_times do |t|
      t.integer :minutes, null: false, default: 0
      t.integer :seconds, null: false, default: 0
      t.integer :millisecs, null: false, default: 0
      t.boolean :dnf
      t.boolean :plus2

      t.timestamps
    end
  end
end
