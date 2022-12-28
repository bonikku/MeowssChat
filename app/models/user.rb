class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  # Stops displaying current user name from all
  scope :all_except, -> (user) { where.not(id: user) }
  # Refresh list when new user is created
  after_create_commit { broadcast_append_to "users" }
  after_update_commit { broadcast_update }
  has_many :messages
  has_one_attached :pfp

  enum status: %i[offline away online]

  after_commit :add_default_pfp, on: %i[create update]

  def pfp_thumbnail
    pfp.variant(resize_to_limit: [150, 150]).processed
  end

  def chat_pfp
    pfp.variant(resize_to_limit: [50, 50]).processed
  end

  def broadcast_update
    broadcast_replace_to 'user_status', partial: 'users/status', user: self
  end

  def status_to_css
    case status
    when 'online'
      'bg-success'
    when 'away'
      'bg-warning'
    when 'offline'
      'bg-secondary'
    else
      'bg-dark'
    end
  end

  private

  def add_default_pfp
    return if pfp.attached?

    pfp.attch(
      io: File.open(Rails.root.join('app', 'assets', 'images', 'default_pfp.png')),
      filename: 'default_pfp.png',
      content_type: 'image/png'
    )
  end

end
