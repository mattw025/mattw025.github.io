---
layout: page
permalink: /publications/
title: publications
description:
years: [2014]
nav: true
---

<div class="publications">

{% for y in page.years %}

  <h2 class="year">{{y}}</h2>
  {% bibliography -f publications -q @*[year={{y}}]* %}
{% endfor %}

</div>
