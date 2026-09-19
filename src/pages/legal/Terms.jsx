import { LegalPage } from "./LegalPage.jsx";

const sections = [
  { heading: "Confirmation", body: "Bookings made through the site are confirmed instantly." },
  { heading: "Cancellations", body: "Give at least 24 hours' notice to cancel or reschedule." },
  { heading: "Arriving late", body: "More than 10 minutes late and your appointment may be shortened or rebooked, depending on availability." },
  { heading: "Right to refuse", body: "We reserve the right to decline a booking at our discretion." },
];

export function Terms() {
  return <LegalPage title="Booking Terms" sections={sections} />;
}
