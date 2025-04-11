// main.js
document.addEventListener('DOMContentLoaded', function () {
  const itemsLinks = document.querySelectorAll('#items a')
  const prevBtn = document.getElementById('prev-btn')
  const nextBtn = document.getElementById('next-btn')
  const searchInput = document.getElementById('search-input')
  const searchBtn = document.getElementById('search-btn')
  const flipbook = $('#flipbook')

  let currentPage = 0
  const totalPages = 112

  function createPages() {
    for (let i = 1; i <= totalPages; i++) {
      const pageDiv = document.createElement('div')
      pageDiv.className = 'img-zoom-container turn-page'
      pageDiv.setAttribute('aria-hidden', 'true')

      if (i === 7) {
        pageDiv.className = 'summary-page'
        pageDiv.setAttribute('aria-hidden', 'true')
        pageDiv.innerHTML = `
          <ul class="summary-container">
  <li>
    <img src="resources/images/page-7.png" alt="Sumário" class="summary-image">
  </li>
  <li><a href="#" data-page="9" class="summary-link" aria-label="Ir para página 8" style="top:9%; left: 0; width: 100%; height: 4%;"></a></li>
  <li><a href="#" data-page="19" class="summary-link" aria-label="Ir para página 18" style="top: 16.4%; left: 0; width: 100%; height: 4%;"></a></li>
  <li><a href="#" data-page="24" class="summary-link" aria-label="Ir para página 24" style="top: 22%; left: 0; width: 100%; height: 4%;"></a></li>
  <li><a href="#" data-page="31" class="summary-link" aria-label="Ir para página 31" style="top: 27.6%; left: 0; width: 100%; height: 4%;"></a></li>
  <li><a href="#" data-page="36" class="summary-link" aria-label="Ir para página 36" style="top: 33.3%; left: 0; width: 100%; height: 4%;"></a></li>
  <li><a href="#" data-page="45" class="summary-link" aria-label="Ir para página 44" style="top: 39%; left: 0; width: 100%; height: 4%;"></a></li>
  <li><a href="#" data-page="54" class="summary-link" aria-label="Ir para página 54" style="top: 44.7%; left: 0; width: 100%; height: 4%;"></a></li>
  <li><a href="#" data-page="63" class="summary-link" aria-label="Ir para página 63" style="top: 50.1%; left: 0; width: 100%; height: 4%;"></a></li>
  <li><a href="#" data-page="69" class="summary-link" aria-label="Ir para página 69" style="top: 55.7%; left: 0; width: 100%; height: 4%;"></a></li>
  <li><a href="#" data-page="77" class="summary-link" aria-label="Ir para página 76" style="top: 61.4%; left: 0; width: 100%; height: 4%;"></a></li>
  <li><a href="#" data-page="87" class="summary-link" aria-label="Ir para página 86" style="top: 67%; left: 0; width: 100%; height: 6%;"></a></li>
  <li><a href="#" data-page="95" class="summary-link" aria-label="Ir para página 94" style="top: 75.3%; left: 0; width: 100%; height: 4%;"></a></li>
  <li><a href="#" data-page="102" class="summary-link" aria-label="Ir para página 102" style="top: 80.8%; left: 0; width: 100%; height: 4%;"></a></li>
  <li><a href="#" data-page="110" class="summary-link" aria-label="Ir para página 110" style="top: 88.2%; left: 0; width: 100%; height: 4%;"></a></li>
</ul>
        `
      } else {
        pageDiv.style.backgroundImage = `url(resources/images/page-${i}.png)`
      }

      flipbook.append(pageDiv)
    }

    const backCover = document.createElement('div')
    backCover.className = 'back-cover hard img-zoom-container'
    backCover.style.backgroundImage = 'url(resources/images/back-cover.png)'
    backCover.setAttribute('aria-hidden', 'true')
    flipbook.append(backCover)
  }

  function showPage(pageNumber) {
    pageNumber = Math.max(0, Math.min(pageNumber, totalPages + 1))
    flipbook.turn('page', pageNumber + 1)
    currentPage = pageNumber
    updateActiveLink()
  }

  function updateActiveLink() {
    itemsLinks.forEach((link) => {
      link.classList.remove('active')
      if (
        link.getAttribute('href') === '/resources/images/front-cover.png' &&
        currentPage === 0
      ) {
        link.classList.add('active')
      } else if (
        link.getAttribute('href') === '/resources/images/back-cover.png' &&
        currentPage === totalPages + 1
      ) {
        link.classList.add('active')
      } else if (
        link.dataset.page &&
        parseInt(link.dataset.page) === currentPage
      ) {
        link.classList.add('active')
      }
    })
  }

  function nextPage() {
    flipbook.turn('next')
  }

  function prevPage() {
    flipbook.turn('previous')
  }

  function init() {
    createPages()

    function adjustBookSize() {
      const container = document.getElementById('book-container')
      const book = document.getElementById('book')

      const maxWidth = window.innerWidth * 0.7
      const maxHeight = window.innerHeight * 0.8

      const aspectRatio = 5 / 7

      let width = Math.min(600, maxWidth)
      let height = width / aspectRatio

      if (height > maxHeight) {
        height = maxHeight
        width = height * aspectRatio
      }

      flipbook.turn('size', width, height)

      book.style.width = `${width}px`
      book.style.height = `${height}px`
    }

    window.addEventListener('load', adjustBookSize)
    window.addEventListener('resize', adjustBookSize)

    // Initialize turn.js
    flipbook.turn({
      display: 'single',
      acceleration: true,
      gradients: !$.isTouch,
      elevation: 50,
      duration: 1000,
      width: 600,
      height: 840,
      pages: totalPages + 2,
      when: {
        turning: function (e, page) {
          currentPage =
            page === 1 ? 0 : page === totalPages + 2 ? totalPages + 1 : page - 1
          updateActiveLink()
        },
      },
    })

    setTimeout(() => showPage(0), 100)

    itemsLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        e.preventDefault()
        if (this.getAttribute('href') === '/resources/images/front-cover.png') {
          showPage(0)
        } else if (
          this.getAttribute('href') === '/resources/images/back-cover.png'
        ) {
          showPage(totalPages + 1)
        } else if (this.dataset.page) {
          showPage(parseInt(this.dataset.page))
        }
      })
    })

    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('summary-link')) {
        e.preventDefault()
        const pageNum = parseInt(e.target.dataset.page)
        if (!isNaN(pageNum)) {
          showPage(pageNum)
        }
      }
    })

    prevBtn.addEventListener('click', prevPage)
    nextBtn.addEventListener('click', nextPage)

    searchBtn.addEventListener('click', function () {
      const pageNum = parseInt(searchInput.value)
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        showPage(pageNum)
      }
    })

    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        const pageNum = parseInt(searchInput.value)
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
          showPage(pageNum)
        }
      }
    })

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        nextPage()
      } else if (e.key === 'ArrowLeft') {
        prevPage()
      }
    })
  }

  const menuToggle = document.getElementById('menu-toggle')
  const sidebar = document.getElementById('sidebar')

  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active')
  })

  itemsLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active')
      }
    })
  })

  init()
})
