import './style.css'
import fish from "/fishing_free/global.png"
import fishList from './fishList.json'

let widthPx = 0
let heightPx = 0
let gridSize = 4
const fishImage = new Image()
fishImage.src = fish
fishImage.onload = () => {
  widthPx = fishImage.naturalWidth
  heightPx = fishImage.naturalHeight
  init(fishImage)
}

const toId = item => item.split(' ').join('_')

const init = (fishImage) => {
  if(!fishImage){
    document.querySelector('#app').innerHTML = `
    <div>
      Loading...
    </div>
  `
  } else {
    
    document.querySelector('#app').innerHTML = `
      <div>
        ${fishList.map((item, index) => {
          const x = index % gridSize * window.innerWidth / gridSize
          const y = Math.floor(index / gridSize) * window.innerHeight / gridSize
          return `<div id="${toId(item)}" style="position:absolute;left:${x}px;top:${y}px;">
          <canvas></canvas>
          </div>`
        }).join('')}
      </div>
    `
    const canvases = document.getElementsByTagName('canvas')
    Array.from(canvases).forEach((canvas, index) => {
      const w = widthPx/gridSize
      const h = heightPx/gridSize
      canvas.width = w
      canvas.height = h

      const ctx = canvas.getContext('2d')
      const x = index % gridSize
      const y = Math.floor(index / gridSize)
      ctx.drawImage(fishImage,-w*x , -h*y)
      canvas.style.width = 64+'px'
      canvas.style.height = 64+'px'
    })
    

  }
}

init()