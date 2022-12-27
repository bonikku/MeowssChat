class Chatroom < ApplicationRecord
  validates_uniqueness_of :name
  scope :public_chatrooms, -> { where(private: false) }
  # Refresh list when new chatroom is created
  after_create_commit { broadcast_append_to 'chatrooms' }
  has_many :messages
end
