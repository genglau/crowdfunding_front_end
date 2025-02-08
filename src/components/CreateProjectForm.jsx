import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import postProject from "../api/post-project.js";
import "../pages/global.css";

function CreateProjectForm() {
  const user_id = window.localStorage.getItem("userid")
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    owner: user_id,
    title: "",
    description: "",
    goal: "",
    image: "",
    is_open: true,
    current_funded_amount: 0, // Default value
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!auth.token) {
      setError("You must be logged in to create a project.");
      return;
    }

    try {
        // Post the project data (owner will be inferred from auth)
        
        const payload = { ...formData };
        await postProject(payload, auth.token);
        navigate("/"); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="goal">Goal:</label>
        <input type="number" id="goal" onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input type="url" id="image" onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="is_open">Is Open:</label>
        <select id="is_open" onChange={handleChange}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button class="rainbow-button" id="submit" type="submit">Create Project</button>
    </form>
  );
}

export default CreateProjectForm;
