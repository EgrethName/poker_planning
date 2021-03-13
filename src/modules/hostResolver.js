const getHostByEnv = (env) => {
    switch (env) {
      case 'development':
        return process.env.VUE_APP_IP;
      case 'production':
        return window.location.host;
      case 'test':
      default:
        return 'localhost:8001';
    }
  };
  
  export default getHostByEnv(process.env.VUE_APP_TEST_MODE || process.env.NODE_ENV);
