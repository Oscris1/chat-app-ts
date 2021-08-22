import {cropText} from './utils';
import {inputValidation} from './utils';

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

// sign up input validation
describe('input validation', () => {
  it('data is correct', () => {
    expect(
      inputValidation(
        'testemail@gmail.com',
        'Test User',
        'Test123!',
        'Test123!',
      ),
    ).toBeUndefined();
  });

  it('one empty field', () => {
    expect(inputValidation('testemail@gmail.com', undefined ,'Test123!', 'Test123!')).toBe(
      'Required fields are not filled',
    );
  });

  // email validation
  describe('email validation', () => {
    it('invalid e-mail returns an error message', () => {
      expect(
        inputValidation('testemail', 'Test User', 'Test123!', 'Test123!'),
      ).toBe('The e-mail is invalid');

      expect(
        inputValidation(
          'testemail@@gmail.com',
          'Test User',
          'Test123!',
          'Test123!',
        ),
      ).toBe('The e-mail is invalid');

      expect(
        inputValidation('testemail@gmail', 'Test User', 'Test123!', 'Test123!'),
      ).toBe('The e-mail is invalid');
    });

    expect(
      inputValidation(
        'testemail@gm_ail.com',
        'Test User',
        'Test123!',
        'Test123!',
      ),
    ).toBe('The e-mail is invalid');
  });

  // password validation
  describe('password validation', () => {
    it('password too short', () => {
      expect(
        inputValidation(
          'testemail@gmail.com',
          'Test User',
          'Test123',
          'Test123',
        ),
      ).toBe(
        `Weak password:\nMinimum eight characters, at least one letter and one number are required`,
      );
    });

    it('password without numbers', () => {
      expect(
        inputValidation(
          'testemail@gmail.com',
          'Test User',
          'Test123',
          'Testaaaaaa',
        ),
      ).toBe(
        `Weak password:\nMinimum eight characters, at least one letter and one number are required`,
      );
    });

    it('password without letters', () => {
      expect(
        inputValidation(
          'testemail@gmail.com',
          'Test User',
          'Test123',
          '12313131231',
        ),
      ).toBe(
        `Weak password:\nMinimum eight characters, at least one letter and one number are required`,
      );
    });
  });

  // two different password
  it('two different password', () => {
    expect(
      inputValidation(
        'testemail@gmail.com',
        'Test User',
        'Test123!',
        'WrongPassword',
      ),
    ).toBe('Passwords do not match');
  });
});
