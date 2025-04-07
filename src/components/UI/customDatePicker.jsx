import {Datepicker} from '@ui-kitten/components';
import React from 'react';

const CustomDatePicker = ({onSelectDate, ...props}) => (
  <Datepicker {...props} onSelect={onSelectDate} />
);

export default CustomDatePicker;
