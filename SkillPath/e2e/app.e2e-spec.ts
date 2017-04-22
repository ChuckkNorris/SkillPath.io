import { SkillPathPage } from './app.po';

describe('skill-path App', () => {
  let page: SkillPathPage;

  beforeEach(() => {
    page = new SkillPathPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
