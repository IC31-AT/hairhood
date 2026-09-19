import { Link } from "react-router-dom";
import { LegalPage } from "./LegalPage.jsx";
import { useContent } from "../../context/ContentContext.jsx";

export function Privacy() {
  const { shop } = useContent();
  const sections = [
    { heading: "Who we are", body: `${shop.name}, ${shop.addressSingleLine}, is the data controller for this site.` },
    { heading: "What we collect", body: "Name, phone number, email address and appointment details, submitted when you book. Anything you send us directly is also kept." },
    { heading: "Why we use it", body: "To create and manage bookings through Square, our booking and payments provider, to contact you about appointments, and to respond to enquiries." },
    { heading: "Legal basis", body: "Performance of contract — fulfilling your booking. Anything beyond that only happens with your consent." },
    {
      heading: "Who we share it with",
      body: (
        <>
          Square processes and stores booking data on our behalf. Google receives aggregated data for ad performance measurement — see our{" "}
          <Link to="/cookies" style={{ color: "var(--hh-black)" }}>Cookie Policy</Link>. We don't sell your data.
        </>
      ),
    },
    { heading: "How long we keep it", body: "While you're an active customer, plus 2 years afterwards for record-keeping. Then it's deleted." },
    {
      heading: "Your rights",
      body: (
        <>
          You can ask to access, correct, delete or object to how we use your data. Use the{" "}
          <Link to="/contact" style={{ color: "var(--hh-black)" }}>contact form</Link> on our Contact &amp; FAQ page, or complain to the ICO at ico.org.uk.
        </>
      ),
    },
    { heading: "Changes", body: "We'll update this policy if how we handle your data changes." },
  ];

  return <LegalPage title="Privacy Policy" sections={sections} />;
}
