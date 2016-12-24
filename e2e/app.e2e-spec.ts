import { TarefasAppPage } from './app.po';

describe('tarefas-app App', function() {
  let page: TarefasAppPage;

  beforeEach(() => {
    page = new TarefasAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
