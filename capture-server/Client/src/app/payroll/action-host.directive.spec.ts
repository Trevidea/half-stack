import { ActionHostDirective } from './action-host.directive';

describe('ActionHostDirective', () => {
  it('should create an instance', () => {
    const a = null 
    const b = null
    const directive = new ActionHostDirective(a ,b);
    expect(directive).toBeTruthy();
  });
});
