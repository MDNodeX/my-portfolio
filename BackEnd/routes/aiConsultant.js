import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { prompt, history } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "GEMINI_API_KEY is missing",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    let customPrompt = prompt;

    // Conversation memory
    if (history && Array.isArray(history) && history.length > 0) {
      const historyText = history
        .map((item) => {
          const role = item.role === "user" ? "Client" : "AI Consultant";

          const text = item.parts?.[0]?.text || "";

          return `${role}: ${text}`;
        })
        .join("\n");

      customPrompt = `
${historyText}
Client: ${prompt}
AI Consultant:
`;
    }

    const systemInstruction = `
You are a senior AI web strategy consultant.

Responsibilities:
- Suggest modern website layouts
- Recommend UI/UX improvements
- Suggest color palettes
- Suggest scalable tech stacks
- Suggest SaaS/product features
- Give concise structured responses
- Use bullet points
- Be professional and modern
`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",

      contents: customPrompt,

      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "No response generated.";

    return res.status(200).json({
      success: true,
      response: text,
    });
  } catch (error) {
    console.error("AI Consultant Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

export default router;
