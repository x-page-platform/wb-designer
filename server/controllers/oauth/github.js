const BaseController = require('../../lib/base_controller');
const { getConfig } = require('../../lib/util');
const ajax = require('axios');
const JWTService = require('../../services/jwt');

class GithubController extends BaseController {
  async authorize() {
    const GitHub = getConfig('oauth')['github'];

    this.ctx.redirect(
      `${GitHub.url}/login/oauth/authorize?client_id=${GitHub.clientId}`
    );
  }

  async callback() {
    const { code } = this.ctx.query;

    let GitHub = getConfig('oauth')['github'];

    try {
      let res = await ajax.post(
        `${GitHub.url}/login/oauth/access_token?client_id=${GitHub.clientId}&client_secret=${GitHub.secret}&code=${code}`
      );

      if (res.status === 200) {
        let args = res.data.split('&');
        let tokenInfo = args[0].split('=');
        if (tokenInfo[0] === 'error') {
          throw new Error(tokenInfo[1]);
        }
        let token = tokenInfo[1];
        let res1 = await ajax.get(`${GitHub.api}/user?access_token=${token}`);
        if (res1.status === 200) {
          const { login, id, avatar_url } = res1.data;
          let encodedData = {
            login,
            id,
            avatar_url
          };
          this.ctx.cookies.set(
            'sessionId',
            await new JWTService(this.ctx).encode(encodedData)
          );
          this.ctx.redirect('/');
        } else {
          throw new Error('User fetch error');
        }
      } else {
        throw new Error(res.statusText);
      }
    } catch (e) {
      console.log(e);
      this.ctx.throw(403, `GitHub unauthorized:\n  ${e.message}`);
    }
  }
}

module.exports = GithubController;
