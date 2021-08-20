import React from 'react';
import {render} from '@testing-library/react-native';

import ErrorMessageBox from './ErrorMessageBox';

it('rendering ErrorMassageBox', () => {
  const {getByText, queryByText} = render(
    <ErrorMessageBox errorMessage="something goes wrong" />,
  );
  expect(getByText('something goes wrong')).toBeTruthy();
  expect(queryByText('random message')).toBeFalsy();
});
