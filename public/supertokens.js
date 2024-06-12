supertokens.init({
  appInfo: {
    apiDomain: 'http://localhost:12345',
    apiBasePath: '/api/auth',
    appName: 'web-ferbator',
  },
  recipeList: [supertokensSession.init(), supertokensEmailPassword.init()],
});
