export var randomColor = function() {
    let colors = ['primary', 'green', 'pink']
    return colors[Math.floor(Math.random() * colors.length)]
}
