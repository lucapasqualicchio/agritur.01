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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu-stagionale" element={<MenuSeasonale />} />
          <Route path="/prenota" element={<BookingForm />} />
          <Route path="/prenotazioni" element={<BookingList />} />
          <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Header />
            <Hero />
            <Points />
            <Alessandro />
            <Products />
            <Menu />
            <BookingCalendar />
            <Reviews />
            <Location />
            <Contact />
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
