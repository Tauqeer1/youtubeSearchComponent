import { YoutubeAppPage } from './app.po';

describe('youtube-app App', function() {
  let page: YoutubeAppPage;

  beforeEach(() => {
    page = new YoutubeAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
