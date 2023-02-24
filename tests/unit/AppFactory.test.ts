import AppFactory from '../../src/infrastructure/factories/AppFactory';
import App from '../../src/application/App';
import routes from '../../src/application/routes';

describe('AppFactory', () => {
  let app: App;

  beforeAll(async () => {
    app = await AppFactory.make(routes);
  });

  it('should make the App #unit', () => {
    expect(app).toBeInstanceOf(App);
    expect(app).toHaveProperty('listen');
  });

  it('should call listen func #unit', async () => {
    const spyListen = jest.spyOn(app.app, 'listen').mockImplementation();
    await app.listen();
    expect(spyListen).toHaveBeenCalled();
  });
});
