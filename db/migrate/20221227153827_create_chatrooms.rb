class CreateChatrooms < ActiveRecord::Migration[7.0]
  def change
    create_table :chatrooms do |t|
      t.string :name
      t.boolean :private, default: false

      t.timestamps
    end
  end
end
