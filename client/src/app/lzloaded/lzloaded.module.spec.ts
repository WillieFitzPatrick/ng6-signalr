import { LzloadedModule } from './lzloaded.module';

describe('LzloadedModule', () => {
  let lzloadedModule: LzloadedModule;

  beforeEach(() => {
    lzloadedModule = new LzloadedModule();
  });

  it('should create an instance', () => {
    expect(lzloadedModule).toBeTruthy();
  });
});
