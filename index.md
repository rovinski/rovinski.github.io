---
layout: welcome
title: Hydejack
description: >
  **Hydejack** is a Jekyll theme with JavaScript powers, combining the best of static sites and modern web apps.
  It features a suite of JavaScript that makes the page feel like an app, without sacrificing backwards-compatibility,
  page-load speed or SEO.
image: /assets/img/projects/default.jpg
hide_description: true
selected_projects:
  - _projects/default.md
  - _projects/pretentious.md
  - _projects/hyde.md
  - _projects/oldschool.md
  - _projects/solid-cyan.md
  - _projects/solid-blue.md
more_projects: projects.md
selected_posts:
  - _posts/2017-11-22-example-content.md
  - _posts/2017-11-17-hydejacks-new-design.md
  - _posts/2017-07-27-better-gem-support.md
  - _posts/2017-06-21-related-projects-and-data-tables.md
  - _posts/2017-06-06-third-party-scripts.md
more_posts: posts.md
content_separator: <!--more-->
---

**Hydejack** is the complete package for professionals on the web.
It features a blog suitable for both prose and technical documentation,
a showcase for your projects, and a resume that is well-integrated with the design.

> Your presence on the web --- A [blog], a [portfolio] and a [resume].
{:.lead}

**Hydejack** is highly customizable and lets you achieve a variety of styles.
Below you can find a selection of variations.

<!--more-->

## Download
There are two versions of **Hydejack**: The *free version* includes basic blogging functionality,
as did previous versions of the theme.
The *PRO version* includes additional features for professionals:
A [portfolio], a [resume] layout and a [welcome] page to feature your favorite projects and posts.

This table details what is and isn't included in each respective version.

|                                     | Free                                   | PRO                                    |
|:------------------------------------|:--------------------------------------:|:--------------------------------------:|
| Blog                                | &#x2714;                               | &#x2714;                               |
| [Features][feat]                    | &#x2714;                               | &#x2714;                               |
| [Portfolio] Layout                  |                                        | &#x2714;                               |
| [Resume] Layout                     |                                        | &#x2714;                               |
| [Welcome] Layout                    |                                        | &#x2714;                               |
| [Newsletter Box][news]              |                                        | &#x2714;                               |
| [Custom Forms][forms]               |                                        | &#x2714;                               |
| No Hydejack Branding                |                                        | &#x2714;                               |
| License                             | [GPL-3.0][license]                     | [PRO]                                  |
| Price                               | Free                                   | $29                                    |
|                                     | [**Download**][kit] or [**Fork**][git] | [Buy Now][buy]{:.btn.btn-primary} [^3] |
{:.stretch-table}

## Features
Both versions include *all* of these features:

* Full in-app page loading, powered by [hy-push-state]{:.external}
* A customizable sidebar that turns into a drawer menu on mobile, powered by [hy-drawer]{:.external}
* Advanced FLIP animations, inspired by Material Design
* Good [Google PageSpeed Score][gpss][^2]
* Higher *perceived speed* thanks to content pre-fetching
* [Syntax highlighting](#syntax-highlighting), powered by [Rouge]
* [LaTeX math blocks](#latex-math-blocks), powered by [KaTeX]
* Change the wording of built-in strings and possibly translate in other languages
* Support for categories and tags
* Built-in icons for many social networks
* Simple and semantic HTML — can be viewed even with text-based browsers
* Author section below each article and support for multiple authors
* Progressive enhancement — sacrifice features, not content
* Google Analytics and Google Fonts support
* Disqus comments
* Print layout — Used to render Hydejack's [PDF documentation][pdf]
* Blog layout via `jekyll-paginate` (optional)
* SEO meta tags via `jekyll-seo-tag` (optional)
* Github avatars via `jekyll-avatar` (optional)
* Gist support via `jekyll-gist` (optional)

### Syntax Highlighting
Syntax highlighting powered by [Rouge].

~~~ruby
# Ruby code with syntax highlighting
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
~~~

### LaTeX Math Blocks
Write formulas in familiar LaTeX syntax. Powered by [KaTeX].

$$
\begin{aligned}
  \phi(x,y) &= \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right) \\[2em]
            &= \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j)            \\[2em]
            &= (x_1, \ldots, x_n)
               \left(\begin{array}{ccc}
                 \phi(e_1, e_1)  & \cdots & \phi(e_1, e_n) \\
                 \vdots          & \ddots & \vdots         \\
                 \phi(e_n, e_1)  & \cdots & \phi(e_n, e_n)
               \end{array}\right)
               \left(\begin{array}{c}
                 y_1    \\
                 \vdots \\
                 y_n
               \end{array}\right)
\end{aligned}
$$

### Newsletter Subscription Box*
The *PRO version* has built-in support for [Tinyletter] subscription boxes.

If you are using a different newsletter service, like MailChimp,
you can build a custom newsletter subscription box using [custom forms][forms].

{% include pro/newsletter.html %}

## Versions
### Free Version
The *free version* features the design and tech of **Hydejack**, but only supports basic blogging.

[Download the Starter Kit][kit] or [Fork the Starter Kit on GitHub][git]

### PRO Version
The *PRO version* aims to be the complete package for professionals on the web.
It includes layouts for your [portfolio],
your [resume] (with support for [JSON Resume](https://jsonresume.org/)),
a [welcome] page to introduce yourself to visitors,
built-in support for [Tinyletter], and from element styles so you can build arbitrary contact forms.

[Buy Now - $29][buy]{:.btn.btn-primary} [^3]

[^1]: Applies after the initial page load.  
[^2]: Actual page load speed depends on your hosting provider, resolution of embedded images and usage of 3rd party plugins.  
[^3]: Transactions secured by [Stripe](https://stripe.com). Downloads handled by [Simple Goods](https://simplegoods.co/).  

[blog]: blog.md
[portfolio]: projects.md
[resume]: resume.md
[download]: download.md
[welcome]: index.md
[forms]: docs/7.4.1/forms-by-example.md

[feat]: #features
[news]: #newsletter-subscription-box
[syntax]: #syntax-highlighting
[latex]: #latex-math-blocks

[license]: LICENSE.md
[pro]: licenses/PRO.md
[docs]: docs/7.4.1/index.md

[kit]: https://github.com/qwtel/hydejack-starter-kit/archive/master.zip
[git]: https://github.com/qwtel/hydejack-starter-kit
[gem]: https://rubygems.org/gems/jekyll-theme-hydejack
[buy]: https://app.simplegoods.co/i/AQTTVBOE

[gpss]: https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fqwtel.com%2Fhydejack%2F
[wiki]: https://github.com/qwtel/hydejack/blob/master/docs/7.4.1/index.md
[pdf]: https://github.com/qwtel/hydejack/releases/download/v7.4.1/Documentation._.Hydejack.pdf
[hy-push-state]: https://qwtel.com/hy-push-state/
[hy-drawer]: https://qwtel.com/hy-drawer/
[rouge]: http://rouge.jneen.net
[katex]: https://khan.github.io/KaTeX/
[tinyletter]: https://tinyletter.com/

*[FLIP]: First-Last-Invert-Play. A coding technique to achieve performant page transition animations.
