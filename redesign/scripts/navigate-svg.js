document.addEventListener('imgReplacedWithSvg', analyzeSVG)

function analyzeSVG(ev) {
  const svg = ev.detail.svg
  console.log('Found SVG', svg, 'to analyze')

  const layers = Array.from(svg.querySelectorAll('g')).filter(g => g.getAttribute('inkscape:groupmode') === 'layer')
  const layerNames = layers.map((layer) => layer.getAttribute('inkscape:label'))

  console.log('Found layers names', layerNames)
}
