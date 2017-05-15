---
layout: welcome
title: Welcome
selected_projects:
  - /projects/hydejack-v6
  - /projects/hyde-v2
selected_posts:
  - /2017/05/03/javascripten
  - /2012/02/07/example-content
more_projects:
  title: Projects
  href: /projects/
more_posts:
  title: Posts
  href: /posts/
---

## Hydejack
Hydejack is a cutting-edge Jekyll theme that combines the best of static sites and modern web apps. It features a suite of JavaScript that makes the page feel like an app, without sacrificing backwards-compatibility, page-load speed or SEO.

> The complete package for professionals: A blog, a portfolio and a resume.
{:.lead}

Hydejack aims to be the complete package for professionals on the web. It features a blog suitable for both prose and technical documentation, a showcase for projects and a resume that fits with the rest of the design.

### Features
* Full in-app page loading --- no Flash of White, no Flash of Unstyled Content[^1]
* Advanced animations, inspired by Material Design
* A customizable sidebar that turns into a touch-enabled app drawer on mobile
* Near-perfect [Google PageSpeed Score](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fqwtel.com%2Fhydejack-pro%2F)[^2]
* Even higher *perceived speed* thanks to pre-fetching and latency-hiding
* Support for categories and tags --- even when hosting on GitHub Pages
* A broad collection of social media icons
* Author section below each article and multiple authors
* Simple and semantic HTML --- can be viewed even with text-based browsers
* Progressive enhancement --- sacrifice features, not content
* Google Analytics and Google Fonts support
* Blog layout with pagination
* Syntax highlighting
* Math formulas via LaTeX
* Disqus comments
* RSS feed
* PSD templates for sidebar backgrounds and project screenshots
* Print layout
* [Extensive documentation]({{ site.baseurl }}{% link docs/6.1.0/index.md %})

### Free Version
If you like the design and tech of Hydejack but all you need is a basic blog, you will be delighted to hear that there is also a [Free Version](http://qwtel.com/hydejack/).

### Skin in the Game
I use Hydejack for [my personal site](https://qwtel.com/), which is why the theme has features well beyond what you would expect from a normal Jekyll theme and why I have an interest in making it as good as I possibly can.

### Credits
Hydejack would not be possible without these assets and libraries:

* Hyde by @mdo
* IcoMoon Icons Free Version
* RxJS
* KaTeX
* Modernizr
* corejs
* web-animations-js

You can find the full list including copyright notices [here]({{ site.baseurl }}{% link docs/6.1.0/licenses.md %}).

### Versions
The current version is 6.1.0, which was released on 15 May 2017.
You can find the full version history including patch notes [here]({{ site.baseurl }}{% link docs/6.1.0/versions.md %}).

[^1]: Applies after the initial page load.

[^2]: Actual page load speed depends on your hosting provider as well as discipline regarding resolution of images and usage of 3rd party plugins.
