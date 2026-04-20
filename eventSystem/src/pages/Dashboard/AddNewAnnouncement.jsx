import { useState, useEffect } from "react";
import apiRequest from "../../services/apiRequest";
import { useNavigate } from "react-router-dom";
export default function AddNewAnnouncement() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // 1. Client-side Validation
    const validationErrors = {};
    if (!title.trim()) validationErrors.title = "Title is required.";
    if (!message.trim()) validationErrors.message = "Content cannot be empty.";
    if (!category) validationErrors.category = "Please select a category.";
    if (!author.trim()) validationErrors.author = "Author name is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
    const formData = {
      title: title,
      message: message,
      category: category,
      author: author,
    };

    const response = await apiRequest(
      "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Dashboard/AddNewAnnouncement.php",
      "POST",
      formData,
    );

    if (response.success) {
      alert("Announcement published successfully!");
      navigate("/dashboard");
    } else {
      setErrors({ server: response.message || "Failed to save announcement." });
    }
    } catch (err) {
      console.error("Submission error:", err);
      setErrors({ server: "Network error: Could not connect to the server." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div class="flex flex-col gap-8">
        {/* <!-- PageHeading --> */}
        <div class="flex flex-col gap-1">
          <p class="text-[#212529] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Create Announcement
          </p>
          <p class="text-[#6C757D] dark:text-slate-400 text-base font-normal leading-normal">
            Fill out the form below to publish a new announcement.
          </p>
        </div>

        {/* <!-- Form Container --> */}
        <div class="w-full rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <form
            onSubmit={handleSubmit}
            class="flex flex-col gap-6"
            action="#"
            method="POST"
            id="formID"
          >
            <div>
              <label
                for="announcement_title"
                class="block text-sm font-medium text-gray-700 dark:text-slate-300"
              >
                Announcement Title
              </label>
              <input
                required
                type="text"
                id="title"
                name="title"
                class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary"
                placeholder="e.g., Midterm Examination Schedule"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              {errors.title && <p className="mt-1 text-xs text-red-500 font-medium">{errors.title}</p>}
            </div>

            {/* <!-- Content --> */}
            <div>
              <label
                for="announcement_content"
                class="block text-sm font-medium text-gray-700 dark:text-slate-300"
              >
                Content
              </label>
              <textarea
                required
                id="content"
                name="content"
                rows="6"
                class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary"
                placeholder="Write the full details of the announcement here..."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              ></textarea>
              {errors.message && <p className="mt-1 text-xs text-red-500 font-medium">{errors.message}</p>}
            </div>

            {/* <!-- Category --> */}
            <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div>
                <label
                  for="announcement_category"
                  class="block text-sm font-medium text-gray-700 dark:text-slate-300"
                >
                  Category
                </label>
                <select
                  required
                  id="category"
                  name="category"
                  class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="" disabled>
                    -- Select an Category --
                  </option>
                  <option value="IMPORTANT">IMPORTANT</option>
                  <option value="REMINDER">REMINDER</option>
                  <option value="GENERAL">GENERAL</option>
                  <option value="EVENT">EVENT</option>
                  <option value="ACHIEVEMENT">ACHIEVEMENT</option>
                  <option value="EMERGENCY">EMERGENCY</option>
                </select>
                {errors.category && <p className="mt-1 text-xs text-red-500 font-medium">{errors.category}</p>}
              </div>{" "}
              <div>
                <label
                  for="announcement_category"
                  class="block text-sm font-medium text-gray-700 dark:text-slate-300"
                >
                  Author
                </label>
                <input
                  type="text"
                  required
                  id="author"
                  name="author"
                  class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary"
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                  placeholder="e.g., John Doe"
                ></input>
                {errors.author && <p className="mt-1 text-xs text-red-500 font-medium">{errors.author}</p>}
              </div>
            </div>

            {errors.server && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                {errors.server}
              </div>
            )}

            {/* <!-- Action Buttons --> */}
            <div class="flex justify-end gap-4 mt-4">
              <button
                disabled={isSubmitting}
                name="publishAnnouncement"
                type="submit"
                className={`rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? "Publishing..." : "Publish Announcement"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
