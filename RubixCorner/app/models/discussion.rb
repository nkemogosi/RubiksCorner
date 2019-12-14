class Discussion < ApplicationRecord
  belongs_to :channel
  belongs_to :user
  has_many :replies, :dependent => :destroy # remove all replies related to this discussion
  validates :title, :content, presence: true # checks if the tile and content exist
  resourcify
end
