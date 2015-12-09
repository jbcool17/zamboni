require 'nokogiri'
require 'open-uri'


doc = Nokogiri::HTML(open("http://www.nhl.com/ice/standings.htm"));

teamMenu = doc.css("#teamMenu")

teams = [];
teamMenu.children.each do |team|
	teams<< team
end

def get_team_homepage(list)

	list.each do |team|
		puts team.attributes['href'].value
	end
end

get_team_homepage(teams)