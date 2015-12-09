require 'nokogiri'
require 'open-uri'

# Connet to 
doc = Nokogiri::HTML(open("http://www.nhl.com/ice/standings.htm"));
# doc = Nokogiri::HTML(open("http://www.nhl.com")); - doesn't want to work

teamMenu = doc.css("div#teamMenu")

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


#Getting Standings Data frin table
doc.css('table.standings') # returns 4

