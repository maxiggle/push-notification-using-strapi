import React from 'react';
import AllRoutes from './components/Routes/AllRoutes';
import { BrowserRouter } from "react-router-dom";
import { generalContext, StateAndEndpointHOC } from './contexts/MainContext';

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <generalContext.Provider value={props}>
          <AllRoutes />
        </generalContext.Provider>
      </BrowserRouter>
    </div>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => <StateAndEndpointHOC app={App} />;
