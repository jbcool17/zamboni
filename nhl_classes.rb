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
			puts team.attributes['href'].value
		end

		return teams
	end
end


n = NHL.new
n.output('testing...')
n.get_team_homepage()