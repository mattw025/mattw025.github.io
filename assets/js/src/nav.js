var menuActive = false
var navFixed = true
var nav = document.querySelector('nav')
var menuButton = document.querySelector('.nav-icon')
var fullMenu = document.querySelector('.nav-full')
var lastFocusedElement = null

function fixNav() {
  nav.classList.add('nav-fixed')
  navFixed = true
}

function setMenu(open) {
  menuActive = open
  menuButton.setAttribute('aria-expanded', String(open))
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  menuButton.classList.toggle('icon-active', open)
  fullMenu.classList.toggle('active', open)
  fullMenu.setAttribute('aria-hidden', String(!open))
  fullMenu.inert = !open
  document.documentElement.classList.toggle('menu-open', open)

  if (open) {
    lastFocusedElement = document.activeElement
    const firstLink = fullMenu.querySelector('a')
    if (firstLink) firstLink.focus()
  } else if (lastFocusedElement) {
    lastFocusedElement.focus()
  }
}

menuButton.addEventListener('click', () => setMenu(!menuActive))

fullMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false))
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuActive) setMenu(false)
})
