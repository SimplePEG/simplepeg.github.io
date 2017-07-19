import { SimplePegPage } from './app.po';

describe('simple-peg App', () => {
  let page: SimplePegPage;

  beforeEach(() => {
    page = new SimplePegPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
