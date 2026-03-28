import Groq from "groq-sdk";
import { connectDB } from "@/lib/mongoose";
import DestinationModel from "@/models/Destination";

const getGroqClient = () => {
  if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY is not configured");
  return new Groq({ apiKey: process.env.GROQ_API_KEY });
};

const chat = async (prompt: string): Promise<string> => {
  const groq = getGroqClient();
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 300,
    temperature: 0.7,
  });
  return completion.choices[0]?.message?.content?.trim() || "";
};

export const aiController = {
  async generateDescription({ title, type }: { title: string; type?: string }) {
    if (!title) throw new Error("Title is required");

    const prompt =
      type === "blog"
        ? `Write a catchy and engaging travel blog post for the title: "${title}". Around 150 words. Make it inspiring for travelers.`
        : `Write a catchy and informative travel destination description for: "${title}". Around 100 words. Focus on what makes it special for travelers.`;

    return await chat(prompt);
  },

  async recommend({ category, budget, travelers }: { category?: string; budget?: number; travelers?: number }) {
    await connectDB();

    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (budget) query.price = { $lte: budget };

    let destinations = await DestinationModel.find(query).sort({ rating: -1 }).limit(3).lean();
    if (destinations.length === 0) {
      destinations = await DestinationModel.find({}).sort({ rating: -1 }).limit(3).lean();
    }

    let message = "Here are my top picks for you!";
    try {
      const destNames = destinations.map((d) => d.title).join(", ");
      const prompt = `You are a friendly AI travel guide. A traveler is looking for a ${category || "any"} destination with a budget of $${budget || "any"} for ${travelers || 1} traveler(s). Based on these destinations: ${destNames} — write a short, friendly 1-2 sentence recommendation message. Be warm and encouraging.`;
      message = await chat(prompt);
    } catch {
      message = "Based on your preferences, here are my top picks for you!";
    }

    return { message, recommendations: destinations };
  },
};
