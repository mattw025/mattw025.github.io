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
})()
