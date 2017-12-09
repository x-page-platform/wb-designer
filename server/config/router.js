const Controllers = require('../lib/load_controllers');
const { Root, Get, Resources, Namespace } = require('../lib/router_methods');

module.exports = [
  Root(Controllers.HomeController, 'index'),
  Namespace('login', [
    Root(Controllers.SessionController, 'new'),
    Get('github', Controllers.Oauth.GithubController, 'authorize')
  ]),
  Get('logout', Controllers.SessionController, 'destroy'),
  Namespace('oauth2', [
    Get('github/callback', Controllers.Oauth.GithubController, 'callback')
  ]),

  Namespace('__health__', [
    Get('memory', Controllers.HealthController, 'memory'),
    Get('ping', Controllers.HealthController, 'ping')
  ])
];
