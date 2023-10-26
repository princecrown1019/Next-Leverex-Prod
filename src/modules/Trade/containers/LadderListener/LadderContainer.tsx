import { FC } from 'react';

import { useCreateOrderFromWorkingCommand } from '~/modules/Trade/commands/CreateOrderFromWorking/usePlaceOrderFromWorkingCommand';

export const LadderListenerContainer: FC = () => {
  useCreateOrderFromWorkingCommand();

  return null;
};
