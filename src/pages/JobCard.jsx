import { Link } from "react-router-dom";

export default function JobCard({ job, onDelete, isDeleting }) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      onDelete(job._id);
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">

        <h5 className="card-title fw-semibold mb-2">{job.jobTitle}</h5>


        <p className="card-text mb-1">
          <strong>Company name:</strong> {job.company}
        </p>


        <p className="card-text mb-1">
          <strong>Location:</strong> {job.location}
        </p>


        <p className="card-text mb-3">
          <strong>Job Type:</strong> {job.jobType}
        </p>


        <div className="d-flex gap-2">
          <Link
            to={`/jobs/${job._id}`}
            className="btn btn-primary btn-sm flex-grow-1"
          >
            See Details
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}