class ChatroomsController < ApplicationController
  before_action :authenticate_user!

  def index
    @chatroom = Chatroom.new
    @chatrooms = Chatroom.public_chatrooms

    @users = User.all_except(current_user)
    render 'index'
  end

  def show
    @single_room = Chatroom.find(params[:id])
    @chatroom = Chatroom.new
    @chatrooms = Chatroom.public_chatrooms

    @message = Message.new
    @messages = @single_room.messages.order(created_at: :asc)

    @users = User.all_except(current_user)
    render 'index'
  end

  def create
    @chatroom = Chatroom.create(name: params["chatroom"]["name"])
  end
end
