import { ai } from "../Config/gemini.js";
import { ProductInput, AIContentResult, RefineInput } from "../types/ai.js";

// Generates initial product content given basic product details.
export const generateAIContent = async (
  input: ProductInput
): Promise<AIContentResult> => {
  const prompt = `
    You are an expert eCommerce copywriter and SEO specialist.
    Generate structured marketing content for the following product:
    - Product Name: ${input.name}
    - Category: ${input.category}
    - Brand Name: ${input.brandName}
    - Key Features: ${input.keyFeatures}
    - Target Audience: ${input.targetAudience}

    Respond strictly with a valid JSON object matching this schema:
    {
      "productDescription": "Detailed product description between 150-200 words",
      "shortDescription": "2-3 lines quick summary",
      "keySellingPoints": "Bullet point list or comma-separated string of 5 key selling points",
      "seoKeywords": "Comma-separated list of 5-8 relevant SEO keywords",
      "productTagline": "Catchy short tagline"
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const responseText = response.text;
  if (!responseText) {
    throw new Error("Gemini returned an empty response.");
  }

  return JSON.parse(responseText) as AIContentResult;
};

// Refines existing product content using a suggestion string.
export const refineAIContent = async (
  input: RefineInput
): Promise<AIContentResult> => {
  const { existingContent, suggestion } = input;

  const prompt = `
    You are an expert eCommerce copywriter. Modify and refine the existing product copy based on the user's specific feedback/suggestion.

    ### Original Product Info:
    - Name: ${existingContent.name}
    - Category: ${existingContent.category}
    - Brand: ${existingContent.brandName}
    - Features: ${existingContent.keyFeatures}
    - Audience: ${existingContent.targetAudience}

    ### Current Content:
    - Description: ${existingContent.productDescription}
    - Short Description: ${existingContent.shortDescription}
    - Selling Points: ${existingContent.keySellingPoints}
    - Keywords: ${existingContent.seoKeywords}
    - Tagline: ${existingContent.productTagline}

    ### User Suggestion / Modification Request:
    "${suggestion}"

    Apply the requested modifications while maintaining overall quality and structure.
    Respond strictly with a valid JSON object matching this schema:
    {
      "productDescription": "Updated product description",
      "shortDescription": "Updated short description",
      "keySellingPoints": "Updated key selling points",
      "seoKeywords": "Updated SEO keywords",
      "productTagline": "Updated tagline"
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const responseText = response.text;
  if (!responseText) {
    throw new Error("Gemini returned an empty response.");
  }

  return JSON.parse(responseText) as AIContentResult;
};