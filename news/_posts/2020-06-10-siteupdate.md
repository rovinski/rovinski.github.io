---
title: A New Look
image: 
description: >
  Time for a website update! Content will be gradually ported over.
---

For anyone who has visited recently, you can tell the site got a clean new look. The [old site](https://web.archive.org/web/20190705081034/http://austinrovin.ski/) was a bit stale with its 2017 copyright and eternal "Under Construction" message. I felt the time was right to put in the effort to finally update the site. Content will be gradually ported over from the old site.

The reason for the extended hiatus was actually *not* due to laziness (well, not entirely). My old site was based off a [Jekyll](https://jekyllrb.com/) template. Through my naivety of not keeping backups of the markdown source, I lost it from a corrupted hard disk (or maybe an inadvertent `rm`, I don't recall at this point). So, all that remained was the generated HTML which was far too cumbersome to maintain.

## Why Now?
I was already experimenting with hosting the site from [GitHub Pages](https://pages.github.com). The old site was hosted from a U-M server, but unfortunately there was no way for me to obtain a subdomain of `umich.edu`, which is required for an A or CNAME DNS record (the record that lets me show `austinrovin.ski` in the URL bar). Before, I was using a feature from my DNS registrar to "cloak" the site in an iframe which loaded the true URL of the UM-hosted site. This wasn't ideal, because any page navigation didn't change the URL and it prevented direct linking to anything other than the homepage.

Well, that service stopped working for some reason, so I went ahead and changed my DNS record to point to my GitHub Pages URL with an A record, so here's the site!

## New Features
I'm pretty jazzed about the site template+host switch because of the features it brings:
* **Dark Mode**: I believe it should be automatically turned on based on your local time. It is also turned on according to your browser settings (shoutout to [Night Reader](https://chrome.google.com/webstore/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh)) or toggled manually with the half-circle icon at the top of the page
* **Enforced HTTPS**: One of my major gripes with U-M hosting is that if you visit a student page using HTTPS, it redirects the user to a U-M login page. Therefore, any public-facing site can only be accessed over HTTP. GitHub Pages makes enforced HTTPS as simple as a checkbox.
* **Fluidity**: This template makes use of a lot of frameworks to add fluidity and make the site feel more modern.
* **Compatibility**: Even if you're like me and block cookies, block JavaScript, and use an adblocker, the site still shows up fine and doesn't lose content (although there are some adblock filter lists which will hide my sidebar icons; oh well)

## Timeline for Porting
I don't have one. My primary focus has, and continues to be, research (shoutout to the [OpenROAD Project](https://theopenroadproject.org)). I won't stick a perpetual "Under Construction" banner on the site, but it might be a while before everything gets migrated.
