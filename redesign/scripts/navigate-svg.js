document.addEventListener('imgReplacedWithSvg', analyzeSVG)

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function keepLayersOnly(g) {
  return g.getAttribute('inkscape:groupmode') === 'layer'
}

function findDirectChildrenForLayer(layer) {
  return Array.from(layer.querySelectorAll('g'))
    .filter(keepLayersOnly)
    .filter(g => g.parentNode === layer)
}

function mapControllerButtons(svg) {
  const backgroundPaths = ['backgroundcircle']
    .map(id => svg.getElementById(id)).filter(n => n)

  const materialPaths = ['headmaterial', 'bodymaterial', 'leftarmmaterial', 'rightarmmaterial']
    .map(id => svg.getElementById(id)).filter(n => n)

  const controllerButtons = ['controllerbutton1', 'controllerbutton2', 'controllerbutton3', 'controllerbutton4', 'controllerbutton5', 'controllerbutton6', 'controllerbutton7', 'controllerbutton8', 'controllerbutton9', 'controllerbutton10']
    .map(id => svg.getElementById(id)).filter(n => n)

  let previousFill = ''

  controllerButtons.forEach(button => {
    button.addEventListener('mousedown', (ev) => {
      const newFill = button.style.fill
      materialPaths.forEach(path => {
        path.style.fill = newFill
      })
      backgroundPaths.forEach(path => {
        path.style.fill = previousFill
      })
      previousFill = newFill
    })
  })
}

function createLayerGroupForLayer(layer) {
  const layerGroup = document.createElement('div')
  layerGroup.className = 'layer group'

  const button = document.createElement('button')
  button.innerText = layer.getAttribute('inkscape:label')
  layerGroup.appendChild(button)

  const childLayersWithChildren = findDirectChildrenForLayer(layer)
    .filter(child => findDirectChildrenForLayer(child).length > 0)

  childLayersWithChildren
    .map(createLayerGroupForLayer)
    .forEach(childLayerGroup => layerGroup.appendChild(childLayerGroup))

  const childLayersWithoutChildren = findDirectChildrenForLayer(layer)
    .filter(child => findDirectChildrenForLayer(child).length === 0)

  if (childLayersWithoutChildren.length > 0) {
    const optionGroup = document.createElement('div')
    optionGroup.className = 'option group'

    childLayersWithoutChildren
      .map(childLayer => createLayerOptionButton(layer, childLayer))
      .forEach(layerButton => optionGroup.appendChild(layerButton))
    layerGroup.appendChild(optionGroup)
  }

  button.addEventListener('click', (ev) => {
    layer.style.display = layer.style.display === 'none' ?  'inline': 'none';
  })

  return layerGroup
}

function createLayerOptionButton(parentLayer, layer) {
    const button = document.createElement('button')
    button.innerText = layer.getAttribute('inkscape:label')

    const siblings = findDirectChildrenForLayer(parentLayer)
      .filter(g => g !== layer)
      .filter(layer => findDirectChildrenForLayer(layer).length === 0)

    button.addEventListener('click', (ev) => {
      siblings.forEach(sibling => {
        sibling.style.display = 'none'
      })
      layer.style.display = layer.style.display === 'inline' ? 'none' : 'inline'
    })

    return button
}

function analyzeSVG(ev) {
  const svg = ev.detail.svg
  console.log('Found SVG', svg, 'to analyze')
  const buttonContainer = document.createElement('div')
  buttonContainer.className = 'toplevel button container'

  const buttonTitle = document.createElement('h3')
  buttonTitle.innerText = 'Toggle Layer Visibility'
  buttonContainer.appendChild(buttonTitle)

  mapControllerButtons(svg)
  Array.from(svg.querySelectorAll('svg > g')).filter(keepLayersOnly)
    .map(createLayerGroupForLayer)
    .forEach(layerGroup => buttonContainer.appendChild(layerGroup))
  insertAfter(buttonContainer, svg)
}
