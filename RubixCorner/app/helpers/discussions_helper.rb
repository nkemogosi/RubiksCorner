module DiscussionsHelper
  def post_author(discussion)
    user_signed_in? && current_user.id == discussion.user.id
  end
  def reply_author(reply)
    user_signed_in? && current_user.id == reply.user.id
  end
end
