;(function () {
  function init() {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'project-back-to-top'
    btn.textContent = 'Back to top'
    btn.setAttribute('aria-label', 'Back to top of page')
    btn.hidden = true
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
    document.body.appendChild(btn)

    function updateBackToTopVisibility() {
      const scrollBottom = window.scrollY + window.innerHeight
      const pageBottom = document.documentElement.scrollHeight
      const nearBottom = pageBottom - scrollBottom <= 80
      btn.hidden = !nearBottom
    }

    window.addEventListener('scroll', updateBackToTopVisibility, { passive: true })
    window.addEventListener('resize', updateBackToTopVisibility)
    updateBackToTopVisibility()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
