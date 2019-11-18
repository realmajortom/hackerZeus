# Hacker Zeus: Hacker News Reader for the Gods
A desktop web app for perusing Hacker News

Check it out here: https://hackerzeus.appspot.com

## Introduction
A while ago I came across Postlight's Mercury Parser project, and I have wanted to try using it in a project of my own.

Hacker Zeus uses Hacker News' public api to populate its feed and uses Mercury Parser to display the article content within the app (as opposed to opening up the linked articles separately).

Hacker Zeus also display's the comments posted on HN. The loading of comments could use some optimization, but it works ok.

## Tools
- React
- Node.js + Express
- Google Cloud Platform

## Upcoming Features & Fixes
- DARK MODE SO YOU DON'T GO BLIND
- Right now when you open an article, it begins loading *all* of its comments...not great.

## Credits
- The gear icon and "load more" icon are from ANTD:  https://ant.design/
- The article box-shadow css is from this great gist (Sergej Lotz is a saint for putting this together):  https://gist.github.com/serglo/f9f0be9a66fd6755a0bda85f9c64e85f
- Create React App:  https://create-react-app.dev/
- There are probably 100,000,000,000+ npm dependencies whose authors I simply cannot list here. Feel free to peruse the package-lock.json files if you'd like your brain to melt.
