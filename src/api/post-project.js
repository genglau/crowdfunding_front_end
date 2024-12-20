async function postProject(projectData, token) {
    const url = `${import.meta.env.VITE_API_URL}/projects/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`, // Add the user's token for authentication
      },
      body: JSON.stringify(projectData),
    });
  
    if (!response.ok) {
      const fallbackError = "Error trying to create a project";
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postProject;
  
