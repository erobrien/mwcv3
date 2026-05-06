// Single source of truth for landing-page locations.
// TODO: Confirm Newport News and Virginia Beach phone numbers.
// Both currently route to (757) 806-6263 — verify with ops if these
// should be distinct lines per clinic.
export const TRT_HEADER_PHONE = "866-344-4955";
export const TRT_HEADER_PHONE_HREF = "tel:+18663444955";

export type TRTLocation = {
  slug: string;
  name: string;
  city: string;
  address: string;
  cityStateZip: string;
  phone: string;
  phoneHref: string;
  hours: string;
};

export const TRT_LOCATIONS: TRTLocation[] = [
  {
    slug: "richmond-va",
    name: "Men's Wellness Centers, Richmond",
    city: "Glen Allen",
    address: "4050 Innslake Dr, Suite 360",
    cityStateZip: "Glen Allen, VA 23060",
    phone: "(804) 346-4636",
    phoneHref: "tel:+18043464636",
    hours: "Mon–Sat 9:00 AM – 5:00 PM",
  },
  {
    slug: "newport-news-va",
    name: "Men's Wellness Centers, Newport News",
    city: "Newport News",
    address: "827 Diligence Drive, Suite 206",
    cityStateZip: "Newport News, VA 23606",
    // TODO: Confirm if Newport News has a dedicated phone number.
    phone: "(757) 806-6263",
    phoneHref: "tel:+17578066263",
    hours: "Mon–Sat 9:00 AM – 5:00 PM",
  },
  {
    slug: "virginia-beach-va",
    name: "Men's Wellness Centers, Virginia Beach",
    city: "Virginia Beach",
    address: "996 First Colonial Road",
    cityStateZip: "Virginia Beach, VA 23454",
    // TODO: Confirm if Virginia Beach has a dedicated phone number (currently shared with Newport News).
    phone: "(757) 806-6263",
    phoneHref: "tel:+17578066263",
    hours: "Mon–Sat 9:00 AM – 5:00 PM",
  },
];
