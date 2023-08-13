const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@animations': path.resolve(__dirname, 'src/assets/animations/'),
      '@icons': path.resolve(__dirname, 'src/assets/icons'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@contexts': path.resolve(__dirname, 'src/contexts/'),
      '@features': path.resolve(__dirname, 'src/features/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@models': path.resolve(__dirname, 'src/models/'),
      '@routes': path.resolve(__dirname, 'src/routes/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@atoms': path.resolve(__dirname, 'src/store/atoms/'),
      '@constants': path.resolve(__dirname, 'src/utils/constants/'),
      '@helpers': path.resolve(__dirname, 'src/utils/helpers/'),
    }
  },
  devServer: {
    port: 5000
  }
};