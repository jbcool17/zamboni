require 'nokogiri'
require 'open-uri'

# Connet to 
@doc = Nokogiri::HTML(open("http://www.nhl.com/ice/standings.htm"));
# doc = Nokogiri::HTML(open("http://www.nhl.com")); - doesn't want to work

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#ALL TEAM LINKS
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++
def get_team_homepage()
	teamMenu = @doc.css("div#teamMenu")
	teams = [];
	teamMenu.children.each do |team|
		teams<< team
	end

	teams.each do |team|
		puts team.attributes['href'].value
	end

	return teams
end

get_team_homepage()

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#STANDING by Division
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++
@doc.css('table.standings') # returns 4

headers = []
@doc.xpath('//table/thead/tr/th').each do |x|
	headers<< x.text
end

rows = []

@doc.xpath('//table/tbody/tr').each_with_index do |x, i|
	rows[i] = Hash.new('Rank')
	x.xpath('td').each_with_index do |td, j|
		# title = headers[j].empty? ? 'Rank' : headers[j]

		if ( headers[j].empty? )
			title = 'Rank'
		elsif ( headers[j] == 'Atlantic')
			title = 'Team'
		else
			title = headers[j]
		end
		rows[i][title] = td.text
	end
end

	# Output all teams
30.times do |n|
	puts rows[n]
end

#Conference
#http://www.nhl.com/ice/standings.htm?type=con#&navid=nav-stn-conf