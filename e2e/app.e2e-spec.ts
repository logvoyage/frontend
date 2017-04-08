import { LogvoyagePage } from './app.po';

describe('logvoyage App', () => {
  let page: LogvoyagePage;

  beforeEach(() => {
    page = new LogvoyagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
