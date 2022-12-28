class ChatroomsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_status

  def index
    @chatroom = Chatroom.new
    @chatrooms = Chatroom.public_chatrooms

    @users = User.all_except(current_user)
    render 'index'
  end

  def show
    @single_chatroom = Chatroom.find(params[:id])
    @chatroom = Chatroom.new
    @chatrooms = Chatroom.public_chatrooms

    @message = Message.new
    @messages = @single_chatroom.messages.order(created_at: :asc)

    @users = User.all_except(current_user)
    render 'index'
  end

  def create
    @chatroom = Chatroom.create(name: params["chatroom"]["name"])
  end

  private

  def set_status
    current_user.update!(status: User.statuses[:online]) if current_user
  end
end
