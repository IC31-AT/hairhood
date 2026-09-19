import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  ADDONS,
  BARBERS,
  BARBER_PRICING,
  BASE_SERVICES,
  eligibleAddonIds,
  eligibleBarbersForService,
  minPrice,
  serviceName,
} from "../data/shop.js";

// ===========================================================================
// Booking engine — a single state machine shared by both the desktop and
// mobile <Book> layouts, so the two breakpoints can never drift out of sync
// with each other's pricing, steps or copy.
//
// NOTE: this is a front-end-only simulation (ported from the design mockup).
// `confirmBooking()` fakes a network round trip, including a random
// "that slot just got taken" conflict and a random "call the shop instead"
// decline, purely so the UI states are reachable. Before this goes live,
// replace `confirmBooking()`'s body with a real call to your booking
// provider (Square Appointments API is what the shop's copy promises) and
// wire `submitContactForm` in ContactContext-equivalent to a real endpoint.
// ===========================================================================

const slotTimes = ["09:00", "09:45", "10:30", "11:15", "12:00", "13:30", "14:15", "15:00", "15:45", "16:30", "17:15", "18:00"];

function freshBookState() {
  return {
    step: "barber",
    history: [],
    barberId: null,
    filterServiceId: null,
    serviceId: null,
    addOns: [],
    day: 0,
    time: null,
    name: "",
    phone: "",
    email: "",
    timeConflict: false,
    altTimes: [],
    ref: null,
    serviceFirst: false,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "RESET_TO":
      return { ...freshBookState(), ...action.patch };
    case "GO_STEP":
      return { ...state, step: action.step, history: [...state.history, state.step] };
    case "BACK": {
      const h = state.history;
      if (!h.length) return state;
      return { ...state, step: h[h.length - 1], history: h.slice(0, -1) };
    }
    case "PICK_BARBER": {
      const barberId = action.barberId;
      if (state.filterServiceId) {
        const serviceId = state.filterServiceId;
        const addonsExist = eligibleAddonIds(serviceId, barberId).length > 0;
        return { ...state, barberId, serviceId, history: [...state.history, "barber"], step: addonsExist ? "addons" : "time" };
      }
      return { ...state, barberId, history: [...state.history, "barber"], step: "service" };
    }
    case "PICK_SERVICE": {
      const serviceId = action.serviceId;
      if (state.serviceFirst && !state.barberId) {
        return { ...state, serviceId, filterServiceId: serviceId, history: [...state.history, "service"], step: "barber" };
      }
      const addonsExist = eligibleAddonIds(serviceId, state.barberId).length > 0;
      return { ...state, serviceId, addOns: [], history: [...state.history, "service"], step: addonsExist ? "addons" : "time" };
    }
    case "TOGGLE_ADDON": {
      const has = state.addOns.includes(action.addonId);
      return { ...state, addOns: has ? state.addOns.filter((x) => x !== action.addonId) : [...state.addOns, action.addonId] };
    }
    case "SKIP_ADDONS":
      return { ...state, addOns: [], history: [...state.history, "addons"], step: "time" };
    case "SET_DAY":
      return { ...state, day: action.day, time: null };
    case "SET_TIME":
      return { ...state, time: action.time, timeConflict: false, altTimes: [] };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "GO_TIME_FROM_ADDONS":
      return { ...state, history: [...state.history, "addons"], step: "time" };
    case "GO_DETAILS_FROM_TIME":
      return { ...state, history: [...state.history, "time"], step: "details" };
    case "GO_REVIEW_FROM_DETAILS":
      return { ...state, history: [...state.history, "details"], step: "review" };
    case "CONFLICT":
      return { ...state, timeConflict: true, altTimes: action.altTimes };
    case "DECLINE":
      return { ...state, step: "declined", history: [...state.history, "review"] };
    case "DONE":
      return { ...state, step: "done", ref: action.ref };
    default:
      return state;
  }
}

function daysArray(base = new Date()) {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const out = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(base.getTime() + i * 86400000);
    const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : dayNames[d.getDay()].slice(0, 3) + " " + d.getDate();
    out.push({ i, label, full: dayNames[d.getDay()] + " " + d.getDate(), dayName: dayNames[d.getDay()] });
  }
  return out;
}

function resolveBarber(book) {
  if (book.barberId && book.barberId !== "any") return BARBERS.find((b) => b.id === book.barberId);
  const elig = eligibleBarbersForService(book.serviceId).filter((b) => book.addOns.every((aid) => ADDONS[aid].barbers.includes(b.id)));
  return elig[0] || eligibleBarbersForService(book.serviceId)[0];
}

const BookingStateContext = createContext(null);

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, freshBookState);
  const navigate = useNavigate();

  const startBooking = useCallback(
    (filterServiceId) => {
      dispatch({ type: "RESET_TO", patch: { filterServiceId: filterServiceId || null } });
      navigate("/book");
    },
    [navigate]
  );
  const startBookingByService = useCallback(() => {
    dispatch({ type: "RESET_TO", patch: { serviceFirst: true, step: "service" } });
    navigate("/book");
  }, [navigate]);
  const startBookingWithBarber = useCallback(
    (barberId) => {
      dispatch({ type: "RESET_TO", patch: { barberId, step: "service" } });
      navigate("/book");
    },
    [navigate]
  );
  const startBookingAny = useCallback(() => {
    dispatch({ type: "RESET_TO", patch: { barberId: "any", step: "service" } });
    navigate("/book");
  }, [navigate]);

  const pickBarber = useCallback((barberId) => dispatch({ type: "PICK_BARBER", barberId }), []);
  const pickService = useCallback((serviceId) => dispatch({ type: "PICK_SERVICE", serviceId }), []);
  const toggleAddon = useCallback((addonId) => dispatch({ type: "TOGGLE_ADDON", addonId }), []);
  const skipAddons = useCallback(() => dispatch({ type: "SKIP_ADDONS" }), []);
  const setDay = useCallback((day) => dispatch({ type: "SET_DAY", day }), []);
  const setTime = useCallback((time) => dispatch({ type: "SET_TIME", time }), []);
  const setField = useCallback((field, value) => dispatch({ type: "SET_FIELD", field, value }), []);
  const back = useCallback(() => {
    if (!state.history.length) {
      navigate("/");
      return;
    }
    dispatch({ type: "BACK" });
  }, [state.history.length, navigate]);
  const restart = useCallback(() => dispatch({ type: "RESET_TO", patch: {} }), []);

  const next = useCallback(() => {
    if (state.step === "addons") dispatch({ type: "GO_TIME_FROM_ADDONS" });
    else if (state.step === "time") dispatch({ type: "GO_DETAILS_FROM_TIME" });
    else if (state.step === "details") dispatch({ type: "GO_REVIEW_FROM_DETAILS" });
    else if (state.step === "review") confirmBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.step, state.day, state.time, state.timeConflict]);

  const confirmBooking = useCallback(() => {
    // Simulated network round trip — see file header. Replace with a real
    // booking-provider call; keep the CONFLICT/DECLINE/DONE dispatches as
    // the three outcomes your real integration should map onto.
    if (!state.timeConflict && Math.random() < 0.25) {
      const alts = slotTimes.filter((t, i) => t !== state.time && (i + state.day) % 4 !== 0).slice(0, 3);
      dispatch({ type: "CONFLICT", altTimes: alts });
      return;
    }
    if (Math.random() < 0.12) {
      dispatch({ type: "DECLINE" });
      return;
    }
    const ref = "HH-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    dispatch({ type: "DONE", ref });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.timeConflict, state.time, state.day]);

  const callShop = useCallback(() => {
    window.location.href = "tel:+447307453917";
  }, []);

  const actions = useMemo(
    () => ({
      startBooking,
      startBookingByService,
      startBookingWithBarber,
      startBookingAny,
      pickBarber,
      pickService,
      toggleAddon,
      skipAddons,
      setDay,
      setTime,
      setField,
      back,
      next,
      restart,
      callShop,
    }),
    [startBooking, startBookingByService, startBookingWithBarber, startBookingAny, pickBarber, pickService, toggleAddon, skipAddons, setDay, setTime, setField, back, next, restart, callShop]
  );

  const value = useMemo(() => ({ state, actions }), [state, actions]);

  return <BookingStateContext.Provider value={value}>{children}</BookingStateContext.Provider>;
}

/** Raw state + action dispatchers — for starting a booking from anywhere on the site. */
export function useBookingActions() {
  const ctx = useContext(BookingStateContext);
  if (!ctx) throw new Error("useBookingActions must be used within a BookingProvider");
  return ctx.actions;
}

/** Full derived view-model for the <Book> page steps (desktop + mobile layouts). */
export function useBooking() {
  const ctx = useContext(BookingStateContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  const { state: book, actions } = ctx;

  return useMemo(() => {
    const stepTitles = {
      barber: "Choose a barber",
      service: "Choose a service",
      addons: "Add-ons",
      time: "Pick a date & time",
      details: "Your details",
      review: "Review & confirm",
      done: "You're in.",
      declined: "Can't book online",
    };
    const order = book.serviceFirst
      ? ["service", "barber", "addons", "time", "details", "review"]
      : ["barber", "service", "addons", "time", "details", "review"];
    const stepIdx = order.indexOf(book.step);
    const progress = book.step === "done" || book.step === "declined" ? "100%" : Math.round(((stepIdx + 1) / order.length) * 100) + "%";

    const barberChoices = (book.filterServiceId ? eligibleBarbersForService(book.filterServiceId) : BARBERS).map((b) => ({
      id: b.id,
      name: b.name,
      role: b.role,
      note: b.note,
    }));
    const hasAnyOption = !book.filterServiceId || eligibleBarbersForService(book.filterServiceId).length > 0;

    const availableServiceIds = book.barberId && book.barberId !== "any"
      ? BASE_SERVICES.filter((sv) => BARBER_PRICING[book.barberId][sv.id]).map((sv) => sv.id)
      : BASE_SERVICES.filter((sv) => eligibleBarbersForService(sv.id).length > 0).map((sv) => sv.id);
    const serviceChoices = availableServiceIds.map((id) => {
      const svc = BASE_SERVICES.find((x) => x.id === id);
      const specific = book.barberId && book.barberId !== "any";
      const price = specific ? "£" + BARBER_PRICING[book.barberId][id][0] : "from £" + minPrice(id);
      const duration = specific ? BARBER_PRICING[book.barberId][id][1] + " min" : "varies by barber";
      return { id, name: svc.name, price, duration };
    });

    const addonIds = book.serviceId ? eligibleAddonIds(book.serviceId, book.barberId) : [];
    const addonChoices = addonIds.map((aid) => ({
      id: aid,
      name: ADDONS[aid].name,
      price: "+£" + ADDONS[aid].price,
      selected: book.addOns.includes(aid),
    }));
    const basePrice = book.serviceId ? (book.barberId && book.barberId !== "any" ? BARBER_PRICING[book.barberId][book.serviceId][0] : minPrice(book.serviceId)) : 0;
    const addonsTotal = book.addOns.reduce((sum, aid) => sum + ADDONS[aid].price, 0);
    const runningTotal = "£" + (basePrice + addonsTotal);

    const dArr = daysArray();
    const days = dArr.map((d) => ({ i: d.i, label: d.label, full: d.full, on: book.day === d.i }));
    const closedToday = dArr[book.day] && dArr[book.day].dayName === "Sunday";
    const slots = closedToday ? [] : slotTimes.map((t, i) => ({ time: t, taken: (i + book.day) % 4 === 0 }));
    const hasSlots = slots.some((sl) => !sl.taken);

    const resolvedBarber = book.serviceId ? resolveBarber(book) : null;
    const summaryBarber = book.barberId === "any" ? "First available (" + (resolvedBarber ? resolvedBarber.name : "—") + ")" : resolvedBarber ? resolvedBarber.name : "—";
    const summaryService = serviceName(book.serviceId);
    const summaryAddons = book.addOns.map((aid) => ADDONS[aid].name).join(", ");
    const dayLabel = dArr[book.day] ? dArr[book.day].full : "";
    const summaryWhen = [dayLabel, book.time || ""].filter(Boolean).join(" · ");

    const nextLabelMap = { barber: "Choose a barber", service: "Choose a service", addons: "Continue", time: "Continue", details: "Review booking", review: "Confirm booking" };
    const nextDisabledMap = {
      barber: true, // barber/service steps advance via card click, not Next
      service: true,
      addons: false,
      time: !book.time,
      details: !book.name.trim() || !book.phone.trim(),
      review: book.timeConflict,
    };

    return {
      ...book,
      stepTitle: stepTitles[book.step],
      progress,
      atBarber: book.step === "barber",
      atService: book.step === "service",
      atAddons: book.step === "addons",
      atTime: book.step === "time",
      atDetails: book.step === "details",
      atReview: book.step === "review",
      atDone: book.step === "done",
      atDeclined: book.step === "declined",
      showNav: ["addons", "time", "details", "review"].includes(book.step),
      barberChoices,
      hasAnyOption,
      serviceChoices,
      addonChoices,
      runningTotal,
      days,
      hasSlots,
      slots,
      summaryBarber,
      summaryService,
      summaryAddons,
      hasAddonsSummary: book.addOns.length > 0,
      summaryWhen,
      summaryTotal: runningTotal,
      nextLabel: nextLabelMap[book.step] || "Continue",
      nextDisabled: nextDisabledMap[book.step] ?? false,
      altTimesResolved: book.altTimes,
      ...actions,
    };
  }, [book, actions]);
}
