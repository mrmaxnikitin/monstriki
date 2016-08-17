module ApplicationHelper
	def make_array(str)
  	a = Array.new
  	if str.size == 1
  		a << str[0]
  	else
	  	for i in 0..str.size/3-1
	  		a << str[i*3+1]
	  	end
	  end
  	return a
  end
end
