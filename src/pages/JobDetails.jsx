import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../useFetch";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`http://localhost:4000/api/jobs/${id}`);
  const job = data?.data;

  if (loading) {
    return (
      <div className="container py-5">
        <p>Loading job details...</p>
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

  if (!job) {
    return (
      <div className="container py-5">
        <p className="text-danger">Job not found.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary mb-4"
      >
        ← Back
      </button>


      <div className="card shadow-sm">
        <div className="card-body">

          <h1 className="card-title display-5 fw-semibold mb-3">
            {job.jobTitle}
          </h1>


          <p className="mb-2">
            <strong>Company Name:</strong> {job.company}
          </p>


          <p className="mb-2">
            <strong>Location:</strong> {job.location}
          </p>


          <p className="mb-2">
            <strong>Salary:</strong> ${job.salary?.toLocaleString()}
          </p>


          <p className="mb-4">
            <strong>Job Type:</strong> {job.jobType}
          </p>

          <hr />


          <div className="mb-4">
            <h5 className="fw-semibold mb-2">Description</h5>
            <p className="text-muted">{job.description}</p>
          </div>


          <div className="mb-4">
            <h5 className="fw-semibold mb-2">Qualifications</h5>
            {Array.isArray(job.jobQualifications) ? (
              <ol className="ms-3">
                {job.jobQualifications.map((qual, idx) => (
                  <li key={idx}>{qual}</li>
                ))}
              </ol>
            ) : (
              <p className="text-muted">No qualifications listed.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}