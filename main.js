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

      if (i === 7) {
        page.classList.add('summary-page')
        page.innerHTML = `
					<div class="summary-container">

						<img src="resources/page-7.jpg" alt="Sumário" class="summary-image">

						<a href="#" data-page="9" class="summary-link" style="top:11.2%; left: 0; width: 100%; height: 4%;"></a>

						<a href="#" data-page="19" class="summary-link" style="top: 18.2%; left: 0; width: 100%; height: 4%;"></a>

						<a href="#" data-page="24" class="summary-link" style="top: 23.5%; left: 0; width: 100%; height: 4%;"></a>

						<a href="#" data-page="31" class="summary-link" style="top: 29%; left: 0; width: 100%; height: 4%;"></a>

						<a href="#" data-page="36" class="summary-link" style="top: 34.3%; left: 0; width: 100%; height: 4%;"></a>

						<a href="#" data-page="45" class="summary-link" style="top: 39.6%; left: 0; width: 100%; height: 4%;"></a>

						<a href="#" data-page="54" class="summary-link" style="top: 45%; left: 0; width: 100%; height: 4%;"></a>

						<a href="#" data-page="63" class="summary-link" style="top: 50.3%; left: 0; width: 100%; height: 4%;"></a>

						<a href="#" data-page="69" class="summary-link" style="top: 55.6%; left: 0; width: 100%; height: 4%;"></a>

						<a href="#" data-page="77" class="summary-link" style="top: 60.9%; left: 0; width: 100%; height: 4%;"></a>

						<a href="#" data-page="87" class="summary-link" style="top: 66.3%; left: 0; width: 100%; height: 6%;"></a>

						<a href="#" data-page="95" class="summary-link" style="top: 74.2%; left: 0; width: 100%; height: 4%;"></a>

						<a href="#" data-page="102" class="summary-link" style="top: 79.5%; left: 0; width: 100%; height: 4%;"></a>

						<a href="#" data-page="110" class="summary-link" style="top: 86.6%; left: 0; width: 100%; height: 4%;"></a>


					</div>
				`
      } else {
        const img = document.createElement('img')
        img.src = `resources/page-${i}.jpg`
        img.alt = `Página ${i}`
        page.appendChild(img)
      }

      pagesContainer.appendChild(page)
    }
  }

  function showPage(pageNumber) {
    pageNumber = Math.max(0, Math.min(pageNumber, totalPages + 1))

    const allPages = document.querySelectorAll('.page')
    allPages.forEach((page) => {
      page.classList.remove('flip-in', 'flip-out', 'active')
      page.style.display = 'none'
    })

    frontCover.classList.remove('flip-in', 'flip-out', 'active')
    backCover.classList.remove('flip-in', 'flip-out', 'active')
    frontCover.style.display = 'none'
    backCover.style.display = 'none'

    if (pageNumber === 0) {
      frontCover.style.display = 'flex'
      frontCover.classList.add('flip-in', 'active')
    } else if (pageNumber === totalPages + 1) {
      backCover.style.display = 'flex'
      backCover.classList.add('flip-in', 'active')
    } else {
      const pageToShow = document.querySelector(
        `.page[data-page-number="${pageNumber}"]`
      )
      if (pageToShow) {
        pageToShow.style.display = 'flex'
        pageToShow.classList.add('flip-in', 'active')
      }
    }

    currentPage = pageNumber
    updateActiveLink()
  }

  function updateActiveLink() {
    itemsLinks.forEach((link) => {
      link.classList.remove('active')
      if (
        link.getAttribute('href') === '/resources/front-cover.jpg' &&
        currentPage === 0
      ) {
        link.classList.add('active')
      } else if (
        link.getAttribute('href') === '/resources/back-cover.jpg' &&
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
        if (this.getAttribute('href') === '/resources/front-cover.jpg') {
          showPage(0)
        } else if (this.getAttribute('href') === '/resources/back-cover.jpg') {
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

  init()
})
