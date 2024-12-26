const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async redirects() {
    return [
      {
        source: '/rewards',
        destination: '/rewards-dashboard',
        permanent: true,
      },
    ]
  },
}