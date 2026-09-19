import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout.jsx";
import { BookingProvider } from "./booking/BookingContext.jsx";
import { CookieConsentProvider } from "./context/CookieConsentContext.jsx";
import { ContentProvider } from "./context/ContentContext.jsx";
import { Home } from "./pages/Home.jsx";
import { Services } from "./pages/Services.jsx";
import { Gallery } from "./pages/Gallery.jsx";
import { Team } from "./pages/Team.jsx";
import { About } from "./pages/About.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Book } from "./pages/Book.jsx";
import { Privacy } from "./pages/legal/Privacy.jsx";
import { Cookies } from "./pages/legal/Cookies.jsx";
import { Terms } from "./pages/legal/Terms.jsx";
import { NotFound } from "./pages/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
        <CookieConsentProvider>
          <BookingProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/team" element={<Team />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/book" element={<Book />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BookingProvider>
        </CookieConsentProvider>
      </ContentProvider>
    </BrowserRouter>
  );
}
