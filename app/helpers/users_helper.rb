module UsersHelper
	def current_user?(user)
    current_user == user
  end

  def expiry_monster_card?
  	current_user.payment_end_date < Time.now
  end
end
