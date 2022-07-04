import {
  Application, LifecycleHookUnit,
  ApplicationLifecycle, LifecycleHook, WithApplication, WithContainer,
  Container,
} from '@xprofiler/tegg';
import ejs from 'ejs';
import Render from './render';

@LifecycleHookUnit()
export default class RedisInitialization implements ApplicationLifecycle {
  private app: Application;
  private container: Container;

  constructor(@WithApplication() app: Application, @WithContainer() conainer: Container) {
    this.app = app;
    this.container = conainer;
  }

  @LifecycleHook()
  async didLoad() {
    const config = this.app.config.render;
    if (config.engine === 'ejs') {
      this.container.set({ id: Render, value: new Render(ejs, config.options) });
    }
  }
}
