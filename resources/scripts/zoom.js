// // zoom.js
// document.addEventListener('DOMContentLoaded', function () {
//   console.log('Zoom script loaded')

//   const zoomToggle = document.getElementById('zoom-toggle')
//   const flipbook = document.getElementById('flipbook')
//   const zoomResult = document.getElementById('zoom-result-container')
//   let zoomActive = false
//   let currentZoomImg = null

//   // Create lens element
//   const lens = document.createElement('div')
//   lens.setAttribute('class', 'img-zoom-lens')
//   document.body.appendChild(lens)

//   // Toggle zoom functionality
//   zoomToggle.addEventListener('click', function () {
//     zoomActive = !zoomActive
//     console.log('Zoom toggled, active:', zoomActive)

//     if (zoomActive) {
//       document.body.classList.add('zoom-active')
//       zoomToggle.innerHTML = '<i class="fas fa-search-minus"></i>'
//       zoomToggle.style.backgroundColor = '#c0392b'
//       console.log('Zoom activated')
//     } else {
//       document.body.classList.remove('zoom-active')
//       zoomToggle.innerHTML = '<i class="fas fa-search-plus"></i>'
//       zoomToggle.style.backgroundColor = '#400a0d'
//       lens.style.display = 'none'
//       zoomResult.style.display = 'none'
//       console.log('Zoom deactivated')
//     }
//   })

//   // Handle page clicks to activate zoom
//   document.addEventListener(
//     'click',
//     function (e) {
//       if (!zoomActive) {
//         console.log('Zoom not active, ignoring click')
//         return
//       }

//       // Alternative method to find visible page
//       const pages = document.querySelectorAll('.turn-page')
//       let visiblePage = null

//       pages.forEach((page) => {
//         if (
//           page.style.display !== 'none' &&
//           page.style.visibility !== 'hidden'
//         ) {
//           visiblePage = page
//         }
//       })

//       if (!visiblePage) {
//         console.log('No visible page found using alternative method')
//         return
//       }

//       console.log('Visible page found (alternative method):', visiblePage)

//       // Find the image element within the page
//       let img
//       if (visiblePage.classList.contains('summary-page')) {
//         img = visiblePage.querySelector('.summary-image')
//         console.log('Summary page image found:', img)
//       } else {
//         // For regular pages with background image
//         img = new Image()
//         const bgImage = visiblePage.style.backgroundImage
//         img.src = bgImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1')

//         // Create a temporary div to hold dimensions
//         const tempDiv = document.createElement('div')
//         tempDiv.style.backgroundImage = bgImage
//         tempDiv.style.width = visiblePage.offsetWidth + 'px'
//         tempDiv.style.height = visiblePage.offsetHeight + 'px'
//         tempDiv.style.position = 'absolute'
//         tempDiv.style.top = '0'
//         tempDiv.style.left = '0'

//         img = tempDiv
//         console.log('Created div for background image:', img)
//       }

//       if (img) {
//         currentZoomImg = img
//         zoomResult.style.display = 'block'
//         console.log('Setting up zoom for image:', img)
//         setupZoom(img, visiblePage)
//       } else {
//         console.log('No image found for zoom')
//       }
//     },
//     true
//   )

//   function setupZoom(img, container) {
//     console.log('Setting up zoom...')

//     // Set lens dimensions
//     lens.style.width = '100px'
//     lens.style.height = '100px'

//     const imgWidth = container.offsetWidth
//     const imgHeight = container.offsetHeight
//     console.log('Container dimensions:', imgWidth, imgHeight)

//     // Calculate the ratio between result DIV and lens
//     const cx = zoomResult.offsetWidth / lens.offsetWidth
//     const cy = zoomResult.offsetHeight / lens.offsetHeight
//     console.log('Zoom ratios:', cx, cy)

//     // Set background properties for the result DIV
//     if (img.tagName === 'IMG') {
//       zoomResult.style.backgroundImage = 'url("' + img.src + '")'
//       console.log('Using img src:', img.src)
//     } else {
//       zoomResult.style.backgroundImage = img.style.backgroundImage
//       console.log('Using background image:', img.style.backgroundImage)
//     }

//     const bgSize = imgWidth * cx + 'px ' + imgHeight * cy + 'px'
//     zoomResult.style.backgroundSize = bgSize
//     console.log('Background size set to:', bgSize)

//     // Move lens and zoom when mouse moves
//     container.addEventListener('mousemove', moveLens)
//     console.log('Added mousemove listener to container')

//     function moveLens(e) {
//       if (!zoomActive) {
//         console.log('Zoom not active during mousemove')
//         return
//       }

//       e.preventDefault()

//       const containerRect = container.getBoundingClientRect()
//       let x = e.clientX - containerRect.left
//       let y = e.clientY - containerRect.top

//       // Calculate lens position (centered on cursor)
//       x = x - lens.offsetWidth / 2
//       y = y - lens.offsetHeight / 2

//       // Prevent lens from going outside image
//       const maxX = containerRect.width - lens.offsetWidth
//       const maxY = containerRect.height - lens.offsetHeight

//       x = Math.max(0, Math.min(x, maxX))
//       y = Math.max(0, Math.min(y, maxY))

//       // Set lens position
//       lens.style.left = containerRect.left + x + 'px'
//       lens.style.top = containerRect.top + y + 'px'
//       lens.style.display = 'block'

//       // Display what the lens "sees"
//       zoomResult.style.backgroundPosition =
//         '-' + x * cx + 'px -' + y * cy + 'px'
//     }

//     // Hide lens when mouse leaves the container
//     container.addEventListener('mouseleave', function () {
//       lens.style.display = 'none'
//       console.log('Mouse left container, hiding lens')
//     })
//   }
// })
