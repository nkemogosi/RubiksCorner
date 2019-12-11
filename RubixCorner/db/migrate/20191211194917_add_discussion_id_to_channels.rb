class AddDiscussionIdToChannels < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :discussion_id, :integer
  end
end
