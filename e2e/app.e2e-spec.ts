import { AnglishPage } from './app.po';

describe('anglish App', function() {
  let page: AnglishPage;

  beforeEach(() => {
    page = new AnglishPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
