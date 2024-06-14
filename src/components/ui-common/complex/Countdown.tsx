import React, { useEffect, useState } from 'react';
import { Size } from '@utils/constants';
import Text from '@components/ui-common/basic/Text';
import DateHelper from '@helpers/DateHelper';

export default function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState(DateHelper.getTimeUntilMidnightUtcPlusDays(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(DateHelper.getTimeUntilMidnightUtcPlusDays(0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Text fontSize={Size.SM} isCentered opacity='50%'>
      Refresh in {DateHelper.formatTimeDifference(timeRemaining)}
    </Text>
  );
}
