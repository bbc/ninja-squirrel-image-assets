document.addEventListener('imgReplacedWithSvg', analyzeSVG)

function analyzeSVG(ev) {
  $svg = ev.detail.$svg
  console.log('Found SVG', $svg[0], 'to analyze')

  $layers = $(`g[inkscape\\:groupmode='layer']`)
  console.log('Found layers', $layers)

  const layers = $.map($layers, (layer) => {
    console.log(layer, '?')
    return $(layer).attr('inkscape:label')
  })
  console.log('Found layers names', layers)
}
