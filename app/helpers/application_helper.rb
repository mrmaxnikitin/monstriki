module ApplicationHelper
	def make_array(str)
  	a = Array.new
  	for i in 0..str.size/3-1
  		a << str[i*3+1]
  	end
  	return a
  end
end
