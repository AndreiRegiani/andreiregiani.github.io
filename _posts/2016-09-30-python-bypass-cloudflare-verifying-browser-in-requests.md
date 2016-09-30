---
layout: post
title: "Python: Bypass CloudFlare 'Verifying Browser' in Requests"
---

Usually you can make HTTP requests on CloudFlare-protected websites, but depending on their *Security Level* (as `I'm Under Attack!`), your requests won't pass their firewall.

* **Quick answer**: [cloudflare-scrape](https://github.com/Anorov/cloudflare-scrape){:target="_blank"}

Making requests via command-line you may get the response `503 Service Unavailable`, it means your script is stopping at this page:

![_config.yml]({{ site.baseurl }}/images/blog/3.png)

This is a client-side JavaScript algorithm to determine legitimate traffic, since command-line scripts don't execute JS code, you're never redirected. To bypass we need to make our requests run whatever JS code there is, to behave just like a web browser.

## The 'make it yourself' way
Use [PyExecJS](https://github.com/doloopwhile/PyExecJS){:target="_blank"} to run JS code in Python, you'll still need extra work to evaluate CloudFlare protection. Interesting module though.

## The 'ready to use' way
[cloudflare-scrape](https://github.com/Anorov/cloudflare-scrape){:target="_blank"}

`pip install cfscrape`

```python
import cfscrape

# Requests wrapper
requests_flare = cfscrape.create_scraper()
r = requests_flare.get("https://github.com")  # or post()
r.status_code  # 200
```

* If you're getting a CAPTCHA instead (common for TOR exit nodes), this technique won't work.
