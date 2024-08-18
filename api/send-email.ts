export const POST = async (request: Request) => {
  const json = await request.json();
  console.log(json);
  const { email, company, systems } = json;

  const url = "https://api.sendgrid.com/v3/mail/send";

  const apiKey = process.env.SENDGRID_API_KEY;

  const data = {
    personalizations: [
      {
        to: [
          { email: "diekstramilan@gmail.com" },
          { email: "wijnand@karsens.com" },
        ],
      },
    ],
    from: { email: "wijnand@karsens.com" },
    subject: "Aanmelding Board Website",
    content: [
      {
        type: "text/plain",
        value: JSON.stringify({ email, company, systems }, undefined, 2),
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // const result = await response.json();
    console.log("Email sent successfully:", response.status);

    return new Response(JSON.stringify({ isSuccessful: true }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ isSuccessful: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
