require 'nokogiri'
require 'open-uri'


HTML_DOC_STANDINGS = Nokogiri::HTML(open("http://www.nhl.com/ice/standings.htm"));

class NHL

	def output(message)
		puts message
	end

	def get_team_homepage()
		teamMenu = HTML_DOC_STANDINGS.css("div#teamMenu")
		teams = [];
		teamMenu.children.each do |team|
			teams<< team
		end

		teams.each do |team|
			team_name = team.attributes['href'].value.match(/[^http:\/\/](\w)+(?=.)/)
			test = team_name[0].split('')
			test[0].capitalize!
			#.slice(0,1).capitalize + team_name.slice(1..-1) 
			puts "Team: #{test.join('')} Link: #{team.attributes['href'].value}"

		end

		return teams
	end



end


n = NHL.new
n.output('testing...')
n.get_team_homepage()