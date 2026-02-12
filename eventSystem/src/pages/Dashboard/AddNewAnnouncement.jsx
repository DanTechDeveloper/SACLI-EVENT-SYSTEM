import { useState, useEffect } from "react";
import apiRequest from "../../services/apiRequest";
export default function AddNewAnnouncement() {
  // debugger;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [formStorage, setFormStorage] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title: title,
      description: description,
      category: category,
      date: date,
    };
    setFormStorage((prev) => [...prev, formData]);

    async function fetchData() {
      const response = await apiRequest(
        "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/createAnnouncement.php",
        "POST",
        formStorage,
      );
      if (result.success) {
        navigate("/dashboard");
      } else {
        alert("Login failed: " + result.message);
      }
    }
  };

  useEffect(() => {
    console.table(formStorage);
  }, [formStorage]);

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
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>

            {/* <!-- Category --> */}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <option value="" disabled selected>
                    -- Select an Category --
                  </option>
                  <option value="Academic">Academic</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div>
                <label
                  for="event_date"
                  class="block text-sm font-medium text-gray-700 dark:text-slate-300"
                >
                  Event Date
                </label>
                <input
                  value={date}
                  onChange={(E) => setDate(E.target.value)}
                  required
                  type="date"
                  id="date"
                  name="date"
                  class=" mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            {/* <!-- Action Buttons --> */}
            <div class="flex justify-end gap-4 mt-4">
              <button
                // onClick={handleOnClick}
                name="publishAnnouncement"
                type="submit"
                class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
              >
                Publish Announcement
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
