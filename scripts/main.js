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

      if (i === 7) {
        pageDiv.className = 'summary-page'
        pageDiv.innerHTML = `
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
        pageDiv.style.backgroundImage = `url(resources/page-${i}.jpg)`
      }

      flipbook.append(pageDiv)
    }

    const backCover = document.createElement('div')
    backCover.className = 'back-cover hard'
    backCover.style.backgroundImage = 'url(resources/back-cover.jpg)'
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
    flipbook.turn('next')
  }

  function prevPage() {
    flipbook.turn('previous')
  }

  function init() {
    createPages()

    // Initialize turn.js
    flipbook.turn({
      display: 'single',
      acceleration: true,
      gradients: !$.isTouch,
      elevation: 50,
      duration: 1000,
      width: 600, // Aumentei para um tamanho melhor em telas maiores
      height: 840, // Mantendo a proporção de 400:560 (5:7)
      pages: totalPages + 2,
      when: {
        turning: function (e, page) {
          currentPage =
            page === 1 ? 0 : page === totalPages + 2 ? totalPages + 1 : page - 1
          updateActiveLink()
        },
      },
    })

    // Adicione este código para ajustar automaticamente o tamanho
    function adjustBookSize() {
      const container = document.getElementById('book-container')
      const book = document.getElementById('book')

      // Tamanhos máximos baseados no viewport
      const maxWidth = window.innerWidth * 0.7
      const maxHeight = window.innerHeight * 0.8

      // Proporção do livro (5:7)
      const aspectRatio = 5 / 7

      // Calcula o tamanho ideal
      let width = Math.min(600, maxWidth)
      let height = width / aspectRatio

      // Verifica se a altura não ultrapassa o máximo
      if (height > maxHeight) {
        height = maxHeight
        width = height * aspectRatio
      }

      // Aplica os tamanhos
      flipbook.turn('size', width, height)

      // Centraliza o livro
      book.style.width = `${width}px`
      book.style.height = `${height}px`
    }

    // Chama a função quando a página carrega e quando redimensiona
    window.addEventListener('load', adjustBookSize)
    window.addEventListener('resize', adjustBookSize)

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
