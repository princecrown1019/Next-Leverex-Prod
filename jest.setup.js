// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`
import { setConfig } from 'next/config';
import '@testing-library/jest-dom/extend-expect';

import config from './next.config';

setConfig(config);
