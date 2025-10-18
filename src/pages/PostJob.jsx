import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function PostJob() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    jobQualifications: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const jobTypeOptions = [
    "Full-time (On-site)",
    "Part-time (On-site)",
    "Full-time (Remote)",
    "Part-time (Remote)",
  ];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job Title is required";
    }
    if (!formData.company.trim()) {
      newErrors.company = "Company Name is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.salary || isNaN(formData.salary) || Number(formData.salary) <= 0) {
      newErrors.salary = "Salary must be a valid number";
    }
    if (!formData.jobType) {
      newErrors.jobType = "Job Type is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Job Description is required";
    }
    if (!formData.jobQualifications.trim()) {
      newErrors.jobQualifications = "Qualifications are required";
    }

    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://full-stack-app-mcr-backend.vercel.app/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle: formData.jobTitle,
          company: formData.company,
          location: formData.location,
          salary: Number(formData.salary),
          jobType: formData.jobType,
          description: formData.description,
          jobQualifications: formData.jobQualifications.split("\n").filter(q => q.trim()),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(errorData.message || "Failed to post job");
      }

      const data = await response.json();
      

      showToast("Job posted successfully!", "success", 3000);
      

      setFormData({
        jobTitle: "",
        company: "",
        location: "",
        salary: "",
        jobType: "",
        description: "",
        jobQualifications: "",
      });
      setErrors({});


      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error posting job:", error);
      showToast("Error posting job. Please try again.", "error", 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h2 className="display-5 fw-semibold mb-4">Post a Job</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded">

        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label fw-semibold">
            Job Title:
          </label>
          <input
            type="text"
            className={`form-control ${errors.jobTitle ? "is-invalid" : ""}`}
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Enter job title"
          />
          {errors.jobTitle && (
            <div className="invalid-feedback d-block">{errors.jobTitle}</div>
          )}
        </div>


        <div className="mb-3">
          <label htmlFor="company" className="form-label fw-semibold">
            Company Name:
          </label>
          <input
            type="text"
            className={`form-control ${errors.company ? "is-invalid" : ""}`}
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name"
          />
          {errors.company && (
            <div className="invalid-feedback d-block">{errors.company}</div>
          )}
        </div>


        <div className="mb-3">
          <label htmlFor="location" className="form-label fw-semibold">
            Location:
          </label>
          <input
            type="text"
            className={`form-control ${errors.location ? "is-invalid" : ""}`}
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
          {errors.location && (
            <div className="invalid-feedback d-block">{errors.location}</div>
          )}
        </div>


        <div className="mb-3">
          <label htmlFor="salary" className="form-label fw-semibold">
            Salary:
          </label>
          <input
            type="number"
            className={`form-control ${errors.salary ? "is-invalid" : ""}`}
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter salary amount"
          />
          {errors.salary && (
            <div className="invalid-feedback d-block">{errors.salary}</div>
          )}
        </div>


        <div className="mb-3">
          <label htmlFor="jobType" className="form-label fw-semibold">
            Job Type:
          </label>
          <select
            className={`form-select ${errors.jobType ? "is-invalid" : ""}`}
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="">-- Select Job Type --</option>
            {jobTypeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.jobType && (
            <div className="invalid-feedback d-block">{errors.jobType}</div>
          )}
        </div>


        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-semibold">
            Job Description:
          </label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter job description"
            rows="4"
          ></textarea>
          {errors.description && (
            <div className="invalid-feedback d-block">{errors.description}</div>
          )}
        </div>


        <div className="mb-3">
          <label htmlFor="jobQualifications" className="form-label fw-semibold">
            Job Qualifications:
          </label>
          <textarea
            className={`form-control ${errors.jobQualifications ? "is-invalid" : ""}`}
            id="jobQualifications"
            name="jobQualifications"
            value={formData.jobQualifications}
            onChange={handleChange}
            placeholder="Enter qualifications (one per line)"
            rows="4"
          ></textarea>
          <small className="text-muted">Enter each qualification on a new line</small>
          {errors.jobQualifications && (
            <div className="invalid-feedback d-block">{errors.jobQualifications}</div>
          )}
        </div>


        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}