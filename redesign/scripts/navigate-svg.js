document.addEventListener('imgReplacedWithSvg', analyzeSVG)

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function analyzeSVG(ev) {
  const svg = ev.detail.svg
  console.log('Found SVG', svg, 'to analyze')

  const layers = Array.from(svg.querySelectorAll('g')).filter(g => g.getAttribute('inkscape:groupmode') === 'layer')
  const buttonContainer = document.createElement('div')

  const buttonTitle = document.createElement('h3')
  buttonTitle.innerText = 'Toggle Layer Visibility'
  buttonContainer.appendChild(buttonTitle)

  layers.forEach(layer => {
    const button = document.createElement('button')
    const layerName = layer.getAttribute('inkscape:label')
    button.innerText = layerName
    buttonContainer.appendChild(button)
    button.addEventListener('click', (ev) => {
      layer.style.display = layer.style.display === 'none' ?  'inline': 'none';
    })
  })

  const materialPaths = ['headmaterial', 'bodymaterial', 'leftarmmaterial', 'rightarmmaterial', 'backgroundcircle']
    .map(id => svg.getElementById(id)).filter(n => n)

  const buttons = ['controllerbutton1', 'controllerbutton2', 'controllerbutton3', 'controllerbutton4', 'controllerbutton5', 'controllerbutton6', 'controllerbutton7', 'controllerbutton8', 'controllerbutton9', 'controllerbutton10']
    .map(id => svg.getElementById(id)).filter(n => n)

  buttons.forEach(button => {
    button.addEventListener('mousedown', (ev) => {
      materialPaths.forEach(path => {
        path.style.fill = button.style.fill
      })
    })
  })

  insertAfter(buttonContainer, svg)
}
