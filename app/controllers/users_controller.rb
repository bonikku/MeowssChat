class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @users = User.all_except(current_user)
    @chatroom = Chatroom.new
    @chatrooms = Chatroom.public_chatrooms
    @chatroom_name = get_name(@user, current_user)
    @single_chatroom = Chatroom.where(name: @chatroom_name).first || Chatroom.create_private_room([@user, current_user], @chatroom_name)
    @message = Message.new
    @messages = @single_chatroom.messages.order(created_at: :asc)
    
    render 'chatrooms/index'
  end

  private

  def get_name(u1, u2)
    user = [u1, u2].sort
    "private_#{user[0].id}_#{user[1].id}"
  end
end
