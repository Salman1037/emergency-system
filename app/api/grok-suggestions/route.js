import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, description, category } = await req.json();
  const apiKey = process.env.GROQ_API_KEY;
  try {
    // Prepare prompt for Groq chat completion
    const prompt = `Complaint Title: ${title}\nDescription: ${description}\nCategory: ${category}\n\nSuggest emergency steps the user can follow to resolve or stay safe in this situation. Return the steps as a numbered list.`;
    const grokRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b", // Updated to a supported Groq model from your dashboard
        messages: [
          { role: "system", content: "You are an emergency assistant." },
          { role: "user", content: prompt }
        ],
        max_tokens: 512,
        temperature: 0.7
      }),
    });
    const grokData = await grokRes.json();
    if (!grokRes.ok) {
      console.error("Grok API error:", grokData);
      return NextResponse.json({ suggestions: [], error: grokData.error || "Grok API error" }, { status: 500 });
    }
    // Parse suggestions from Groq response
    let suggestions = [];
    if (grokData.choices && grokData.choices[0] && grokData.choices[0].message && grokData.choices[0].message.content) {
      // Split numbered list into array
      suggestions = grokData.choices[0].message.content.split(/\n\d+\.\s?/).filter(Boolean);
    }
    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Grok integration error:", error);
    return NextResponse.json({ suggestions: [], error: error.message }, { status: 500 });
  }
}
