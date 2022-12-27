class Chatroom < ApplicationRecord
  validates_uniqueness_of :name
  scope :public_chatrooms, -> { where(is_private: false) }
  # Refresh list when new chatroom is created
  after_create_commit { broadcast_if_public }
  has_many :messages
  has_many :participants, dependent: :destroy

  def broadcast_if_public
    broadcast_append_to "chatrooms" unless is_private
  end

  def self.create_private_room(users, chatroom_name)
    single_chatroom = Chatroom.create(name: chatroom_name, is_private: true)
    users.each do |user|
      Participant.create(user_id: user.id, chatroom_id: single_chatroom.id)
    end
    single_chatroom
  end

  def participant?(chatroom, user)
    chatroom.participants.where(user: user).exists?
  end
end
