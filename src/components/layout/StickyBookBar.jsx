import { useLocation } from "react-router-dom";
import { useBookingActions } from "../../booking/BookingContext.jsx";
import { useNarrow } from "../../lib/useMediaQuery.js";
import { Button } from "../ui/Button.jsx";
import "./StickyBookBar.css";

/** Persistent bottom "Book a chair" CTA on mobile, everywhere except the booking flow itself. */
export function StickyBookBar() {
  const narrow = useNarrow();
  const location = useLocation();
  const { startBooking } = useBookingActions();

  const visible = narrow && location.pathname !== "/book";
  if (!visible) return null;

  return (
    <div className="hh-inverse hh-sticky-bar">
      <Button full onClick={() => startBooking(null)}>
        Book a chair
      </Button>
    </div>
  );
}
