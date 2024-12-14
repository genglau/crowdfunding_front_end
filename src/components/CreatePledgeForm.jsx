import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import postPledge from "../api/post-pledge.js";

function CreatePledgeForm(props) {
  const { projectData } = props
  const user_id = window.localStorage.getItem("userid")
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    supporter: user_id,
    amount: "",
    anonymous: true,
    project: projectData.id,

    comment: "",
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
        await postPledge(payload, auth.token);
        navigate(`/project/${project_id}`); 
    } catch (err) {
      setError("Error creating pledge: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Pledge</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea id="comment" onChange={handleChange} required />
      </div>
      
      <div>
        <label htmlFor="anonymous">Anonymous:</label>
        <select id="anonymous" onChange={handleChange}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit Pledge</button>
    </form>
  );
}

export default CreatePledgeForm;
