(() => {
  const items = [...document.querySelectorAll('.nav-item')]
  const sections = [...document.querySelectorAll('main > section')]

  function updateActiveNavigation() {
    const threshold = nav.offsetHeight + 80
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

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealItems = [...document.querySelectorAll('main > section, .research-card')]
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })

    revealItems.forEach((item) => {
      item.classList.add('reveal-on-scroll')
      observer.observe(item)
    })
  }
})()
