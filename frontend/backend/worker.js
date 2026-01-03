export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Only POST allowed", { status: 405 });
    }

    const { prompt } = await request.json();

    const aiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are Saifi AI, a powerful helpful AI assistant."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

    const data = await aiResponse.json();

    return new Response(
      JSON.stringify({
        reply: data.choices[0].message.content
      }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
