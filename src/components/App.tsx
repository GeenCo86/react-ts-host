import * as React from "react";
import "./../assets/scss/App.scss";
const RemoteApp = React.lazy(() => import("app1/MyButton"));
import { Suspense } from 'react';

const App = () => (
  <div className="app">
    <h1>Hello HOST!</h1>
      <Suspense fallback={"loading..."}>
          <RemoteApp label="Hello inside remote"/>
      </Suspense>
  </div>
);

export default App;
