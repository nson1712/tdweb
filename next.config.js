const path = require('path');

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
    ];
  },
  images: {
    domains: ['media.truyenso1.xyz', 'lh3.googleusercontent.com', 'static.truyenfull.bio', "localhost", "media.toidoc.vn", "yymedia.codeprime.net"],
  },
};