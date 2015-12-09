require 'mechanize'

agent = Mechanize.new

nhl_website = agent.get('http://www.nhl.com')

goto_standings = agent.page.link_with(href: /standings/).click
goto_con_standings = agent.page.link_with(text: 'Conference Standings').click

