import { CrissCrossPage } from './app.po';

describe('criss-cross App', () => {
  let page: CrissCrossPage;

  beforeEach(() => {
    page = new CrissCrossPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
