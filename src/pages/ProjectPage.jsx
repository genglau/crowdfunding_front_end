import { useState, useEffect } from "react";
 import { Link, useParams } from "react-router-dom";
 import useProject from "../hooks/use-project";
 import CreatePledgeForm from "../components/CreatePledgeForm";
 import "./ProjectPage.css"; // Import moved to styles folder
 import "./global.css";

function ProjectPage() {
       // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
   const { id } = useParams();
   // useProject returns three pieces of info, so we need to grab them all here
   const { project, isLoading, error } = useProject(id);

   

   const [current, setCurrent] = useState(0);

   useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % project.pledges.length);
        }, 3000);
    return () => clearInterval(interval);
    }, [project]);

      if (isLoading) {
           return (<p>loading...</p>)
       }
    
       if (error) {
           return (<p>{error.message}</p>)
       }

       return (
            <div className="project-container">
               
               <h2>{project.title}</h2>
               <img src={project.image} alt={project.title} className="project-image" />
               <h3>Created at: {project.date_created}</h3>
               <h3>Description: {project.description}</h3>
               <h3>Status: {project.is_open ? "Open" : "Closed"}</h3>
               <h3>Goal: ${project.goal}</h3>
               


               <CreatePledgeForm projectData={project} />

                <h3>Pledges Recived:</h3>
                <div className="pledge-slideshow">
                 {project.pledges.length > 0 &&
                    project.pledges.slice(current, current + 3).map((pledge, index) => (
                 <div key={index} className="pledge-card">
                  <p>${pledge.amount} - {pledge.supporter}</p>
                  
               </div>

               
              ))}
      </div>
    </div>
  );
}

export default ProjectPage;