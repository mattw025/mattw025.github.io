---
layout: page
permalink: /conference_papers/
title: conference papers
description:
years: [2019, 2018, 2017, 2016]
nav: true
---

<div class="publications">

{% for y in page.years %}

  <h2 class="year">{{y}}</h2>
  {% bibliography -f conference_papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
