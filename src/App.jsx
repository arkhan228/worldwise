import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Form from './components/Form.jsx';
import CityList from './components/CityList.jsx';
import City from './components/City.jsx';
import CountryList from './components/CountryList.jsx';
import SpinnerFullPage from './components/SpinnerFullPage.jsx';

// Styles
import './index.css';

// Contexts
import { CitiesProvider } from './contexts/CitiesContext.jsx';
import { AuthProvider } from './contexts/FakeAuthContext.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';

// Polyfills flag emojis
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
polyfillCountryFlagEmojis();

// Pages
const Homepage = lazy(() => import('./pages/Homepage.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));
const Product = lazy(() => import('./pages/Product.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const AppLayout = lazy(() => import('./pages/AppLayout.jsx'));
const PageNotFound = lazy(() => import('./pages/PageNotFound.jsx'));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='product' element={<Product />} />
              <Route path='login' element={<Login />} />
              <Route
                path='app'
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to='cities' replace />} />
                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path='countries' element={<CountryList />} />
                <Route path='form' element={<Form />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
