class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  # Stops displaying current user name from all
  scope :all_except, -> (user) { where.not(id: user) }
  # Refresh list when new user is created
  after_create_commit { broadcast_append_to "users" }
  has_many :messages
end
