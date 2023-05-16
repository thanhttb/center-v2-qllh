// i18n
import './locales/i18n';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// map
import './utils/mapboxgl';
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
// redux
import { store, persistor } from './redux/store';
// components
import { SettingsProvider } from './components/settings';
import ScrollToTop from './components/scroll-to-top';

// Check our docs
// https://docs.minimals.cc/authentication/ts-version

import { AuthProvider } from './auth/JwtContext';
// import { AuthProvider } from './auth/Auth0Context';
// import { AuthProvider } from './auth/FirebaseContext';
// import { AuthProvider } from './auth/AwsCognitoContext';

//
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import {registerLicense}  from "@syncfusion/ej2-base"
registerLicense('Mgo+DSMBaFt+QHJqVk1hXk5Hd0BLVGpAblJ3T2ZQdVt5ZDU7a15RRnVfR1xmS39QckViX3pdeQ==;Mgo+DSMBPh8sVXJ1S0R+X1pFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jTH9WdERgXX9fdnJSTw==;ORg4AjUWIQA/Gnt2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtSc0diWntecXJdRmk=;MjA2Nzc1OUAzMjMxMmUzMjJlMzNDUnUzY2tHMGVENGJXSG9lSkVkeDdDUUw2cnFCcm82U3hxMEhmVmZ2UXU0PQ==;MjA2Nzc2MEAzMjMxMmUzMjJlMzNOdFFUTy9VV21MOG0wUnhLU3dXUHdLZHVzaW1YcytoMzNxSUpidlpRQ2dNPQ==;NRAiBiAaIQQuGjN/V0d+Xk9HfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Wd0BhWHxacHVSQmlV;MjA2Nzc2MkAzMjMxMmUzMjJlMzNXYWd3UG1vL3llKzRPYnE4SXk4UGFyT3JtcDlnNDJkdDN1eEF6RXg0TWNVPQ==;MjA2Nzc2M0AzMjMxMmUzMjJlMzNhSi9wQUR0azVHNTU2MVNsa1BzSHZtd2RqT2s1ZUNQS2swQUJGTzVYcUJJPQ==;Mgo+DSMBMAY9C3t2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtSc0diWntecXxUTmk=;MjA2Nzc2NUAzMjMxMmUzMjJlMzNVc0JYcE9RYWhkak1jdnVjdVdYbUNkbk1Ick14K1RhUHZKZ3IyMUFJMHpFPQ==;MjA2Nzc2NkAzMjMxMmUzMjJlMzNpTVo3Zm9kUDVsOWpvNmlicEpJQjJBdjFibmZ3SWpnK294RkxvS3RWbWg4PQ==;MjA2Nzc2N0AzMjMxMmUzMjJlMzNXYWd3UG1vL3llKzRPYnE4SXk4UGFyT3JtcDlnNDJkdDN1eEF6RXg0TWNVPQ==');
// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <AuthProvider>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider>
              <BrowserRouter>
                <ScrollToTop />
                <App />
              </BrowserRouter>
            </SettingsProvider>
          </LocalizationProvider>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  </AuthProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
