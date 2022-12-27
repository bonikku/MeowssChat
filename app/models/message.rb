class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chatroom
  after_create_commit { broadcast_append_to chatroom }
  before_create :confirm_participant

  def confirm_participant
    return unless chatroom.is_private

    is_participant = Participant.where(user_id: user.id, chatroom_id: chatroom.id).first
    throw :abort unless is_participant
  end
end
