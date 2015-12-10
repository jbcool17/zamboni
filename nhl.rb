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

# get_team_homepage()

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#STANDING by Division
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++
@doc.css('table.standings') # returns 4

	#Getting Colum Titles
standings_headers = []
@doc.xpath('//table/thead/tr/th').each do |x|
	standings_headers<< x.text
end

@rows = []
@teams = []
@doc.xpath('//table/tbody/tr').each_with_index do |x, i|

	@rows[i] = Hash.new()
	x.xpath('td').each_with_index do |td, j|

		if ( standings_headers[j].empty? )
			title = 'Rank'
			info = td.text
		elsif ( standings_headers[j] == 'Atlantic')
			title = 'Team'
			team_name = td.text.split('')
			team_name.reverse!
			team_name.pop()
			team_name.reverse!
			@teams<< team_name.join('')

			info = team_name.join('')
		else
			title = standings_headers[j]
			info = td.text
		end		

		@rows[i][title.gsub(/\s/, '')] = info
	end
end

def team_stats()
	puts @teams, "Choose a Team?"
	team = gets.chomp
	@rows.each do |record|
		if ( record["Team"] == team )
			@output = [record["Team"], record["W"], record["L"], record["OT"]]
		end
	end

	if ( @output.nil? )
		puts 'Not Found'
	end
	puts @output
end


team_stats()
#Conference
#http://www.nhl.com/ice/standings.htm?type=con#&navid=nav-stn-conf