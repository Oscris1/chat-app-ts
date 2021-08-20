import {cropText} from './utils';

describe('cropText tests', () => {
  it('crop too long text', () => {
    const croppedText = cropText('Too long text which should be cropped', 12);
    expect(croppedText).toBe('Too long tex...');
    expect(croppedText).not.toBe('Too long text which should be cropped');
    expect(croppedText.length).toEqual(15);
  });

  it("Don't crop too short text", () => {
    const croppedText = cropText('Short text', 12);
    expect(croppedText).toBe('Short text');
    expect(croppedText).not.toBe('Short text...');
    expect(croppedText.length).toEqual(10);
  });
});
