document.addEventListener('DOMContentLoaded', function () {
  const itemsLinks = document.querySelectorAll('#items a')
  const pagesContainer = document.querySelector('.pages')
  const prevBtn = document.getElementById('prev-btn')
  const nextBtn = document.getElementById('next-btn')
  const searchInput = document.getElementById('search-input')
  const searchBtn = document.getElementById('search-btn')
  const frontCover = document.querySelector('.front-cover')
  const backCover = document.querySelector('.back-cover')

  let currentPage = 0
  const totalPages = 112

  function createPages() {
    for (let i = 1; i <= totalPages; i++) {
      const page = document.createElement('div')
      page.className = 'page'
      page.dataset.pageNumber = i

      const img = document.createElement('img')
      img.src = `docs/page-${i}.jpg`
      img.alt = `Página ${i}`

      page.appendChild(img)
      pagesContainer.appendChild(page)
    }
  }

  function showPage(pageNumber) {
    pageNumber = Math.max(0, Math.min(pageNumber, totalPages + 1))

    const allPages = document.querySelectorAll('.page')
    allPages.forEach((page) => {
      page.classList.remove('flip-in', 'flip-out')
      page.style.display = 'none'
    })

    frontCover.classList.remove('flip-in', 'flip-out')
    backCover.classList.remove('flip-in', 'flip-out')
    frontCover.style.display = 'none'
    backCover.style.display = 'none'

    if (pageNumber === 0) {
      frontCover.style.display = 'flex'
      frontCover.classList.add('flip-in')
    } else if (pageNumber === totalPages + 1) {
      backCover.style.display = 'flex'
      backCover.classList.add('flip-in')
    } else {
      const pageToShow = document.querySelector(
        `.page[data-page-number="${pageNumber}"]`
      )
      if (pageToShow) {
        pageToShow.style.display = 'flex'
        pageToShow.classList.add('flip-in')
      }
    }

    currentPage = pageNumber
    updateActiveLink()
  }

  function updateActiveLink() {
    itemsLinks.forEach((link) => {
      link.classList.remove('active')
      if (
        link.getAttribute('href') === '/docs/front-cover.jpg' &&
        currentPage === 0
      ) {
        link.classList.add('active')
      } else if (
        link.getAttribute('href') === '/docs/back-cover.jpg' &&
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
    showPage(currentPage + 1)
  }

  function prevPage() {
    showPage(currentPage - 1)
  }

  function init() {
    createPages()
    showPage(0)

    itemsLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        e.preventDefault()
        if (this.getAttribute('href') === '/docs/front-cover.jpg') {
          showPage(0)
        } else if (this.getAttribute('href') === '/docs/back-cover.jpg') {
          showPage(totalPages + 1)
        } else if (this.dataset.page) {
          showPage(parseInt(this.dataset.page))
        }
      })
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

  init()
})
