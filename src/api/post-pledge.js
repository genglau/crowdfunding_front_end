async function postPledge(pledgeData, token) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`, // Add the user's token for authentication
      },
      body: JSON.stringify(pledgeData),
    });
  
    if (!response.ok) {
      const fallbackError = "Error trying to create a pledge";
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postPledge;
  
