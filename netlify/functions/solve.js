exports.handler = async (event, context) => {
  // CORS handle karo
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { imageBase64, mimeType } = JSON.parse(event.body);

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.2-90b-vision-preview", // Vision model ye hai
        messages: [{
          role: "user",
          content: [
            { type: "text", text: "Solve this GATE mathematics problem step by step with all calculations." },
            { type: "image_url", image_url: { url: `data:${mimeType};base64,${imageBase64}` } }
          ]
        }],
        max_tokens: 1024
      })
    });

    const data = await groqResponse.json();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};