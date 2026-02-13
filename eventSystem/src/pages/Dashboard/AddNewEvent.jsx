import { useState, useEffect } from "react";
import apiRequest from "../../services/apiRequest";

export default function AddNewEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [criteria, setCriteria] = useState("");
  const [location, setLocation] = useState("");
  const [formStorage, setFormStorage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      category,
      date,
      time,
      criteria,
      location,
    };

    const response = await apiRequest(
      "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/createEvent.php",
      "POST",
      formData,
    );

    if (response.success) {
      alert("Event created successfully!");
    }
  };

  return (
    <>
      <div class="flex flex-col gap-8">
        {/* <!-- PageHeading --> */}
        <div class="flex flex-col gap-1">
          <p class="text-[#212529] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Create Event
          </p>
          <p class="text-[#6C757D] dark:text-slate-400 text-base font-normal leading-normal">
            Fill out the form below to schedule a new event.
          </p>
        </div>

        {/* <!-- Form Container --> */}
        <div class="w-full rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <form
            onSubmit={handleSubmit}
            class="flex flex-col gap-6"
            method="POST"
            action="#"
            id="formData"
          >
            {/* <!-- Event Title --> */}
            <div>
              <label
                for="event_title"
                class="block text-sm font-medium text-gray-700 dark:text-slate-300"
              >
                Event Title
              </label>
              <input
                required
                type="text"
                id="title"
                name="title"
                class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary"
                placeholder="e.g., University Foundation Day"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* <!-- Event Description --> */}
            <div>
              <label
                for="event_description"
                class="block text-sm font-medium text-gray-700 dark:text-slate-300"
              >
                Description
              </label>
              <textarea
                required
                id="content"
                name="content"
                rows="6"
                class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary"
                placeholder="Provide details about the event..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* <!-- Date and Time --> */}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  for="category"
                  class="block text-sm font-medium text-gray-700 dark:text-slate-300"
                >
                  Category
                </label>
                <select
                  required
                  id="category"
                  name="category"
                  class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled selected>
                    -- Select an Category --
                  </option>
                  <option value="Technology">Technology</option>
                  <option value="Social">Social</option>
                  <option value="Business">Business</option>
                  <option value="Outdoors">Outdoors</option>
                  <option value="Arts">Arts</option>
                  <option value="Programming">Programming</option>
                  <option value="School Activity">School Activity</option>
                  <option value="Campus Program">Campus Program</option>
                  <option value="Community">Community</option>
                  <option value="Health">Health</option>
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
                  required
                  type="date"
                  id="date"
                  name="date"
                  class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="event_time"
                  class="block text-sm font-medium text-gray-700 dark:text-slate-300"
                >
                  Event Time
                </label>
                <input
                  required
                  type="time"
                  id="time"
                  name="time"
                  class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            {/* <!-- Location --> */}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="criteria"
                  class="block text-sm font-medium text-gray-700 dark:text-slate-300"
                >
                  Select an Criteria
                </label>
                <select
                  required
                  id="criteria"
                  name="criteria"
                  class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary"
                  value={criteria}
                  onChange={(e) => setCriteria(e.target.value)}
                >
                  <option value="" disabled selected>
                    -- Select an Criteria --
                  </option>
                  <option value="Online">Online</option>
                  <option value="Free">Free</option>
                </select>
              </div>
              <div>
                <label
                  for="event_location"
                  class="block text-sm font-medium text-gray-700 dark:text-slate-300"
                >
                  Location
                </label>
                <input
                  required
                  type="text"
                  id="location"
                  name="location"
                  class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary"
                  placeholder="e.g., University Gymnasium"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* <!-- Action Buttons --> */}
            <div class="flex justify-end gap-4 mt-4">
              <button
                name="publishEvent"
                type="submit"
                class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
              >
                Publish Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
