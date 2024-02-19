module.exports = {
  reactStrictMode: false,
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
};

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error);
});
