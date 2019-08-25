document.addEventListener('imgReplacedWithSvg', analyzeSVG)

function analyzeSVG(ev) {
  const svg = ev.detail.$svg[0]
  console.log('Found SVG', svg, 'to analyze')

  const layers = Array.from(svg.querySelectorAll('g')).filter(g => g.getAttribute('inkscape:groupmode') === 'layer')
  console.log('Found layers', layers)

  const layerNames = layers.map((layer) => {
    console.log('woot', layer)
    console.log(layer)
    return layer.getAttribute('inkscape:label')
  })

  console.log('Found layers names', layerNames)
}
