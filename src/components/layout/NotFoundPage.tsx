import React from 'react';
import { ErrorPage } from './ErrorPage';

export const NotFoundPage: React.FC = () => {
  return (
    <ErrorPage
      type="404"
      customActions={[
        {
          label: 'Browse Templates',
          action: () => window.location.href = '/explore',
          variant: 'secondary'
        },
        {
          label: 'Take Quiz',
          action: () => window.location.href = '/',
          variant: 'secondary'
        }
      ]}
    />
  );
};