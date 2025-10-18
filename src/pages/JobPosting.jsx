import useFetch from "../useFetch";
import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { useToast } from "../context/ToastContext";

export default function JobPosting() {
  const { data, loading, error } = useFetch("http://localhost:4000/api/jobs");
  const { showToast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);


  useEffect(() => {
    if (data?.data) {
      setJobs(data.data);
    }
  }, [data]);


  const filteredJobs = jobs.filter(job =>
    (job?.jobTitle || "").toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleDeleteJob = async (jobId) => {
    setDeletingId(jobId);
    
    try {
      const response = await fetch(`http://localhost:4000/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }


      setJobs(prev => prev.filter(job => job._id !== jobId));
      showToast("Job deleted successfully!", "success", 3000);
    } catch (error) {
      console.error("Error deleting job:", error);
      showToast("Error deleting job. Please try again.", "error", 3000);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <p className="text-danger">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h2 className="display-5 fw-semibold mb-4">All Jobs</h2>


        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


      <div className="row g-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job._id} className="col-md-6 col-lg-4">
              <JobCard 
                job={job} 
                onDelete={handleDeleteJob}
                isDeleting={deletingId === job._id}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-muted">No jobs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}