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

  insertAfter(buttonContainer, svg)
}
