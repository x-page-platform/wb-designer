const Controllers = require('../lib/load_controllers');
const {
  Root,
  Get,
  Resources,
  Namespace
} =
 require('../lib/router_methods');

module.exports = [
  Root(Controllers.HomeController, 'index'),
  Resources('page', {
    members: [Resources('comment')],
    collections: [Resources('comment')]
  }),
  Namespace('__health__', [
    Get('memory', Controllers.HealthController, 'memory'),
    Get('ping', Controllers.HealthController, 'ping')
  ])
];