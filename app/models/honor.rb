class Honor < ActiveRecord::Base
	belongs_to :user

	validates :user_id, presence: true
  validates :quest_id, presence: true

  def diploma_number1(quest_id, position)
    dnum = rand(100)
  	image = MiniMagick::Image.open("./public/original_diplomas/#{quest_id}.jpg")
    subject = ""

    tour_name = Tour.find(self.location_id).name

    degree = ""
    if self.degree = 1
      degree = "I степени"
    elsif self.degree = 2
      degree = "II степени"
    elsif self.degree = 3
      degree = "III степени"
    elsif self.degree = 0
      degree = "Участника"
    end
      

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
    if quest_id == 3
      reward_text_position=720
    elsif quest_id == 8
      reward_text_position=700
    elsif quest_id == 38 || quest_id == 41
    	reward_text_position = '640'
    	margin_date = -50
    	color_diploma_number="#383838"
    	if quest_id == 38
    		margin_diploma_number = -410
    	end
    	if quest_id == 41
    		margin_diploma_number = -280
    	end
    elsif quest_id == 58 || quest_id == 62 || quest_id == 65
    	reward_text_position = '720'
    end

    image.resize "1654x2339"
    image.format "jpg"
    image.combine_options do |c|
      c.gravity 'North'
      c.fill '#383838'
      c.pointsize '102'
      c.draw "text 0,#{reward_text_position} '#{degree}'"

      c.pointsize '52'
      c.draw "text 0,#{position+80} 'Награждается #{self.name}, #{self.age} #{year_text}'"

      c.pointsize '46'
      if school.size > 44
        c.draw "text 0,#{position+180} '#{fp_school}'"
        c.draw "text 0,#{position+260} '#{sp_school}'"
      else
        c.draw "text 0,#{position+180} '#{school}'"
      end
      c.pointsize '46'
      c.draw "text 0,#{position+340+margin_text} 'за успешное прохождение'"
      c.pointsize '46'
      c.draw "text 0,#{position+420+margin_text} 'Всероссийской олимпиады для дошкольников'"
      c.pointsize '46'
      c.draw "text 0,#{position+500+margin_text} '\"#{tour_name}\"'"
      if self.curator.size > 0
      	c.pointsize '46'
      	c.draw "text 0,#{position+580} 'Педагог: #{self.curator}'"
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
      if self.quest_id != 38
      	c.fill color_diploma_number
      	c.draw "text 410,#{2280+margin_diploma_number} 'www.monstriki.com'"
      end
    end
    output_diploma = "./public/diplomas/diploma#{dnum}.jpg"
    image.write output_diploma
    return "/diplomas/diploma#{dnum}.jpg"
  end

end
