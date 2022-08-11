import React, {lazy, Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import Error from './Error';
import Loading from './Loading';

const Main = (props) => {

  const Component = lazy(() => import(`./Test.js`));

  return (
    <div>
      <header>
        <div>타이틀</div>
      </header>

      <ErrorBoundary FallbackComponent={Error}>
        <Suspense fallback={Loading}>
          <Component/>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default Main;