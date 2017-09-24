class Honor < ActiveRecord::Base
	belongs_to :user

	validates :user_id, presence: true
  validates :quest_id, presence: true

  def diploma_number1(location_id, position)
    dnum = rand(100)
  	image = MiniMagick::Image.open("./public/original_diplomas/#{location_id}.jpg")
    subject = ""

    margin_text = -90
    school = self.school
    if school.size > 44
      school_44 = school[0, 44]
      index_inst = school_44.rindex(" ")
      fp_school = school[0, index_inst]
      sp_school = school[index_inst+1, school.size]
      margin_text = 0
    end

    year_text = ""
    if self.age == "5" || self.age == "6" || self.age == "7"
    	year_text = "лет"
    elsif self.age == "4"
    	year_text = "года"
    end

    reward_text_position=840
    margin_date=0
    margin_diploma_number=0
    color_diploma_number="#ffffff"
    if location_id == 6 || location_id == 7
    	reward_text_position = '640'
    	margin_date = -50
    	color_diploma_number="#383838"
    	if location_id == 6
    		margin_diploma_number = -410
    	end
    	if location_id == 7
    		margin_diploma_number = -280
    	end
    elsif location_id == 8 || location_id == 9 || location_id == 10
    	reward_text_position = '720'
    end

    image.resize "1654x2339"
    image.format "jpg"
    image.combine_options do |c|
      c.gravity 'North'
      c.fill '#383838'
      c.pointsize '102'
      c.draw "text 0,#{reward_text_position} 'Награждается'"

      c.pointsize '60'
      c.draw "text 0,#{position+90} '#{self.name}, #{self.age} #{year_text}'"
      c.pointsize '46'
      if school.size > 44
        c.draw "text 0,#{position+200} '#{fp_school}'"
        c.draw "text 0,#{position+290} '#{sp_school}'"
      else
        c.draw "text 0,#{position+200} '#{school}'"
      end
      c.pointsize '46'
      c.draw "text 0,#{position+380+margin_text} 'за учаcтие в интеллектуальной игре'"
      c.pointsize '46'
      c.draw "text 0,#{position+470+margin_text} '\"В стране монстриков\"'"
      if self.curator.size > 0
      	c.pointsize '46'
      	c.draw "text 0,#{position+550} 'Педагог: #{self.curator}'"
      end
      c.pointsize '36'
      c.draw "text #{78+margin_date},1630 '#{Russian::strftime(self.created_at, "%d.%m.%Y г.")}'"
      c.pointsize '36'
      c.draw "text #{50+margin_date},1730 'Главный\nредактор'"
      c.pointsize '36'
      c.draw "text #{600+margin_date},1750 'Никитин М. В.'"
      c.pointsize '36'
      c.fill color_diploma_number
      c.draw "text 0,#{2280+margin_diploma_number} '№ M-#{self.id}'"
      c.pointsize '36'
      if self.location_id != 6
      	c.fill color_diploma_number
      	c.draw "text 410,#{2280+margin_diploma_number} 'www.monstriki.com'"
      end
    end
    output_diploma = "./public/diplomas/diploma#{dnum}.jpg"
    image.write output_diploma
    return "/diplomas/diploma#{dnum}.jpg"
  end

end
