import { BreadcrumbLevel } from './breadcrumb-level.model';

describe('BreadcrumbLevel', () => {
  it('should create an instance', () => {
    expect(new BreadcrumbLevel('Commons', '/en/commons/')).toBeTruthy();
  });
});
