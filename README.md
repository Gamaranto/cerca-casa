# Cerca Casa - Home Scraper

## What is this? 
Cerca Casa is an home scraper built to make it easy to find a place to call home in Italy. I was tired of the fragmentation and bad UI of the current real estate boards websites so I decided to scrape them and serialize the data here.

## How do I use this?

In any way you want, really. You can use this as the backend for your self hosted real estate website, to populate a google sheet or anything you can think of.

If you wish to run this locally/self-hosted, you will need to change the values of the `INPUT.json` file. Change `YOUR_CITY_NAME` to the name of the city you want to search in and voilà, you're good to go.

I personally run this as an actor on the Apify Cloud and I email the results of each run to myself every morning with a Zapier Integration.


## Do I need proxies to make this work?

Not really. Some sites will block you and you might get less results, usually when that happens you will get a 403 or some other error and proxies will solve it for you. Adding Apify proxies is really easy, while adding other proxies requires you to change the code manually (even if by a tiny bit).

## How do I add my own scraping logic?

Each website scraping logic is contained in a module. You can either modify the source code yourself for an existing website or add your own module for a website that's not supported yet.

