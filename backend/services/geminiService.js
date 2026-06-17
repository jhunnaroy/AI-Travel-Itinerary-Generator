import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);



export const generateItinerary = async (
  extractedData,
  extractedText
) => {
  try {
    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

    const prompt = `
You are an expert travel planner.

If the uploaded document is not related to travel, flight tickets, hotel bookings, train tickets, visa documents, boarding passes, or travel reservations, return only:

"This document is not a travel booking document. Please upload a valid travel-related document."

Travel Booking Information:

${JSON.stringify(
  extractedData,
  null,
  2
)}

Raw Extracted Text:

${extractedText}

If the document contains travel information, generate a professional travel itinerary.

Include:

1. Trip Summary
2. Travel Schedule
3. Hotel Information
4. Transportation Details
5. Important Reminders
6. Travel Tips
7. Emergency Checklist

Return the response in clean markdown format.
`;

    const result =
      await model.generateContent(
        prompt
      );

    const response =
      await result.response;

    return response.text();
  } catch (error) {
    console.error(
      "Gemini Error:",
      error
    );

    if (error.status === 503) {
      throw new Error(
        "Gemini service is currently busy. Please try again in a few minutes."
      );
    }

    if (error.status === 429) {
      throw new Error(
        "Gemini API rate limit exceeded. Please try again later."
      );
    }

    if (error.status === 401) {
      throw new Error(
        "Invalid Gemini API Key."
      );
    }

    throw new Error(
      error.message ||
        "Failed to generate itinerary"
    );
  }
};