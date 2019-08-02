import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import DocumentTitle from 'react-document-title';



ReactDOM.render(
  <BrowserRouter>
  <DocumentTitle title='MERN APP'>

</DocumentTitle>
  <App />
  </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister()