import { HttpController, HttpMethod, HTTPMethodEnum, Inject } from '@xprofiler/tegg';
import { Render } from '../plugin/render';

@HttpController()
export default class HomeController {
  @Inject()
  private render: Render;

  @HttpMethod({
    path: '/',
    method: HTTPMethodEnum.GET,
  })
  async index() {
    const html = await this.render.render('index');
    return html;
  }
}
