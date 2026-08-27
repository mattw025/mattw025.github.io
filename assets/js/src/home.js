(() => {
  const items = [...document.querySelectorAll('.nav-item')]
  const sections = [...document.querySelectorAll('main > section')]
  const nav = document.querySelector('.site-nav')

  function updateActiveNavigation() {
    const threshold = (nav?.offsetHeight || 0) + 80
    let activeIndex = -1

    sections.forEach((section, index) => {
      if (window.scrollY >= section.offsetTop - threshold) activeIndex = index
    })

    items.forEach((item, index) => {
      const link = item.querySelector('a')
      const active = index === activeIndex
      item.classList.toggle('nav-item-active', active)
      if (active) link.setAttribute('aria-current', 'location')
      else link.removeAttribute('aria-current')
    })
  }

  updateActiveNavigation()
  window.addEventListener('scroll', () => requestAnimationFrame(updateActiveNavigation), { passive: true })

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const heroItems = [...document.querySelectorAll('.site-hero__content, .site-hero__portrait-wrap')]
  const revealItems = [...document.querySelectorAll('main > section:not(.gallery) > .container, .section-heading, .research-card')]

  if (!reducedMotion) {
    heroItems.forEach((item, index) => {
      item.classList.add('reveal-on-scroll')
      item.style.setProperty('--reveal-delay', `${index * 130}ms`)
    })

    requestAnimationFrame(() => requestAnimationFrame(() => {
      heroItems.forEach((item) => item.classList.add('is-revealed'))
    }))
  }

  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.12 })

    revealItems.forEach((item, index) => {
      item.classList.add('reveal-on-scroll')
      if (item.classList.contains('research-card')) {
        item.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`)
      }
      observer.observe(item)
    })
  } else {
    revealItems.forEach((item) => item.classList.add('is-revealed'))
  }
})()
