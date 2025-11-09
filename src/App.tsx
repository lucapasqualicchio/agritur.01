import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Points from './components/Points';
import Alessandro from './components/Alessandro';
import Products from './components/Products';
import Menu from './components/Menu';
import BookingCalendar from './components/BookingCalendar';
import Reviews from './components/Reviews';
import Location from './components/Location';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MenuSeasonale from './components/MenuSeasonale';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import CookiePolicy from './components/CookiePolicy';
import CookieConsent from './components/CookieConsent';
import NotFound from './components/NotFound';
import AboutPage from './components/pages/AboutPage';
import ProductsPage from './components/pages/ProductsPage';
import ContactPage from './components/pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu-stagionale" element={<MenuSeasonale />} />
        <Route path="/prenota" element={<BookingForm />} />
        <Route path="/prenotazioni" element={<BookingList />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        {/* Pagine SEO-friendly */}
        <Route path="/chi-siamo" element={<AboutPage />} />
        <Route path="/prodotti" element={<ProductsPage />} />
        <Route path="/contatti" element={<ContactPage />} />
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Header />
            <Hero />
            <Points />
            <Alessandro />
            <Products />
            <Menu />
            <div id="booking-calendar">
              <BookingCalendar />
            </div>
            <Reviews />
            <Location />
            <Contact />
            <Footer />
            <CookieConsent />
          </div>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
