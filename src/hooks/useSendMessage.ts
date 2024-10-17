export const sendMessage = async (message: any, phone: any) => {
  try {
    const response = await fetch("http://localhost:4000/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        phone: phone,
      }),
    });

    const data = await response.json();

    console.log("Message sent:", data);
  } catch (error: any) {
    console.error("Error sending message:", error.message);
  }
};
