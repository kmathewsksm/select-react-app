import { OptionsList } from './OptionsList';

it('OptionsList has the correct number of options', () => {
  expect(OptionsList.length).toBe(6);
});

it('OptionsList contains correct options', () => {
  const values = OptionsList.map(option => option.value);
  expect(values).toContain('chocolate');
  expect(values).toContain('strawberry');
  expect(values).toContain('vanilla');
  expect(values).toContain('mango');
  expect(values).toContain('pistachio');
  expect(values).toContain('butterscotch');
});
