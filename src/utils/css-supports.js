export function toCamelCase (cssProperty) {
  cssProperty = cssProperty
    .split('-')
    .filter(word => !!word)
    .map(word => word[0].toUpperCase() + word.substr(1))
    .join('')

  return cssProperty[0].toLowerCase() + cssProperty.substr(1)
}
