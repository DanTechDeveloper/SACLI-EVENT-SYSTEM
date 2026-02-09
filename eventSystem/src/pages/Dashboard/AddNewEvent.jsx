export default function AddNewEvent() {
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
              ></textarea>
            </div>

            {/* <!-- Date and Time --> */}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="subtype"
                  class="block text-sm font-medium text-gray-700 dark:text-slate-300"
                >
                  Subtype
                </label>
                <select
                  required
                  id="subtype"
                  name="subtype"
                  class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary"
                >
                  <option value="" disabled selected>
                    -- Select an Subtype --
                  </option>
                  <option value="General Event">General Event</option>
                  <option value="School Activity">School Activity</option>
                  <option value="Campus Program">Campus Program</option>
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
                />
              </div>
            </div>

            {/* <!-- Location --> */}
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
              />
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
