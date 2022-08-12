const path = require('path'); // стандартная утилита Node.js для построения путей

module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
  mode: 'development' // добавили режим разработчика
}
