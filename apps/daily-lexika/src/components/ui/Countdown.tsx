import React, { useEffect, useState } from 'react';
import { Text } from '@library/shared/ui';
import { DateTimeUtil, Size } from '@library/shared/utils';

export function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState(DateTimeUtil.getTimeUntilMidnightUtcPlusDays(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(DateTimeUtil.getTimeUntilMidnightUtcPlusDays(0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Text fontSize={Size.SM} isCentered opacity='50%'>
      Refresh in {DateTimeUtil.formatTimeDifference(timeRemaining)}
    </Text>
  );
}
