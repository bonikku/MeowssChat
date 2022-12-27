class RenamePrivateColumn < ActiveRecord::Migration[7.0]
  def change
    rename_column :chatrooms, :private, :is_private
  end
end
