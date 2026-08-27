(() => {
  const reverse = (value) => [...value].reverse().join('')

  document.querySelectorAll('[data-contact-local][data-contact-domain]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      const local = reverse(link.dataset.contactLocal)
      const domain = reverse(link.dataset.contactDomain)
      window.location.href = `mailto:${local}@${domain}`
    })
  })
})()
