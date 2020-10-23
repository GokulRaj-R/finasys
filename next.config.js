const withImage = require('next-images');
module.exports = withImage();

// module.exports = {
//     webpack(config) {
//       config.module.rules.push({
//         test: /\.svg$/,
//         issuer: {
//           test: /\.(js|ts)x?$/,
//         },
//         use: ['@svgr/webpack'],
//       });
  
//       return config;
//     },
//     withImage();
// };