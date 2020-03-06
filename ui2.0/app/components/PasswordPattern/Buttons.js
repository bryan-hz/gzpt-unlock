import React from 'react';
import _uniqueId from 'lodash/uniqueId';
import Button from './Button';

export default {
  '1': () => <Button key={_uniqueId()} left="524" top="123" />,
  '2': () => <Button key={_uniqueId()} left="867" top="123" />,
  '3': () => <Button key={_uniqueId()} left="1210" top="123" />,
  '4': () => <Button key={_uniqueId()} left="524" top="451" />,
  '5': () => <Button key={_uniqueId()} left="867" top="451" />,
  '6': () => <Button key={_uniqueId()} left="1210" top="451" />,
  '7': () => <Button key={_uniqueId()} left="524" top="779" />,
  '8': () => <Button key={_uniqueId()} left="867" top="779" />,
  '9': () => <Button key={_uniqueId()} left="1210" top="779" />
};
