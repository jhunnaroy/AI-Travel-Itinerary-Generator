export const extractTravelInfo = (
  text
) => {
  return {
    flightNumber:
      text.match(
        /Flight\s*[:\-]?\s*([A-Z0-9]+)/i
      )?.[1] || "",

    departureCity:
      text.match(
        /From\s*[:\-]?\s*(.+)/i
      )?.[1]
        ?.split("\n")[0]
        ?.trim() || "",

    arrivalCity:
      text.match(
        /To\s*[:\-]?\s*(.+)/i
      )?.[1]
        ?.split("\n")[0]
        ?.trim() || "",

    travelDate:
      text.match(
        /\d{1,2}\s+\w+\s+\d{4}/
      )?.[0] || "",

    hotelName:
      text.match(
        /Hotel\s*[:\-]?\s*(.+)/i
      )?.[1]
        ?.split("\n")[0]
        ?.trim() || "",
  };
};