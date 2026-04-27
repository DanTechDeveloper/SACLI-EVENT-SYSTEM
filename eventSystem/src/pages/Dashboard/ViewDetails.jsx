import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiRequest from "../../services/apiRequest";

export default function ViewDetails() {
  const location = useLocation();
  const event = location.state?.event;
  const userSession = location.state?.userSession;
  const navigate = useNavigate();
  const [commentData, setCommentData] = useState([]);
  const [userComment,setUserComment] = useState("");

  useEffect(() => {
    if (event?.id) {
      fetchComments();
    }
  }, [event?.id]);

  const addComment = async () => {
    if (!userComment.trim()) return;
    const response = await apiRequest(
      "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Student/UserComments.php",
      "POST",
      {
        comment_description: userComment,
        participation_id: event.participation_id,
      }
    );
    if (response.success) {
      setUserComment("");
      fetchComments();
    } else {
      console.log(response.message);
    }
  };

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button
          onClick={() => navigate("/studentView")}
          className="text-primary underline"
        >
          Event not found. Return to Browse.
        </button>
      </div>
    );
  }

  const fetchComments = async () => {
    const api = `http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Student/UserComments.php?event_id=${event.id}`;
    const response = await apiRequest(api, "GET");
    if (response.success) {
      setCommentData(response.commentData);
    }
  };
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100">
      {/* <!-- Top Navigation Bar --> */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              className="flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity"
              onClick={() => navigate("/studentView")}
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span>Back to Events</span>
            </button>
          </div>
        </div>
      </nav>
      <main className="pb-24">
        {/* <!-- Hero Section --> */}
        <div className="relative w-full h-[400px] overflow-hidden bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"
            alt={event.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-7xl mx-auto w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-white mb-6">
              <span
                className="material-symbols-outlined text-[18px]"
                data-icon="event"
              >
                event
              </span>
              <span className="font-bold text-lg">{event.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined"
                  data-icon="location_on"
                >
                  location_on
                </span>
                <span className="text-lg font-medium">{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">schedule</span>
                <span className="text-lg font-medium">
                  {event.time} - {event.time_end}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* <!-- Left Column: Details & Reviews --> */}
          <div className="lg:col-span-2 space-y-12">
            {/* <!-- About Section --> */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  description
                </span>
                About the Event
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                {event.description || "No description provided for this event."}
              </p>
            </section>

            <section className="space-y-8" id="reviews">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-bold">Community Reviews</h2>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="flex text-amber-400">
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="material-symbols-outlined text-sm">
                        star_half
                      </span>
                    </div>
                    <span>4.5 Average Rating (12 reviews)</span>
                  </div>
                </div>
                <button
                  disabled={event.joined === "joined"}
                  type="button"
                  className={`bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/90 transition-all ${event.joined !== "joined" && "opacity-50 cursor-not-allowed"}`}
                >
                  Add Review
                </button>
              </div>

              {/* Review Feed */}
              <div className="space-y-6">
                {commentData.length > 0 ? (
                  commentData.map((comment, index) => (
                    <div
                      key={index}
                      className={`bg-white dark:bg-slate-900/50 p-6 rounded-2xl border shadow-sm transition-all hover:shadow-md ${
                        comment.user_id === userSession?.id
                          ? "border-primary/30 bg-primary/5"
                          : "border-slate-100 dark:border-slate-800"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0`}
                        >
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900 dark:text-white">
                                {comment.fullName}
                              </h4>
                              {comment.user_id === userSession?.id && (
                                <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full uppercase font-black">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-400">
                              {comment.created_at}
                            </span>
                          </div>
                          <div className="flex gap-0.5 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`material-symbols-outlined text-sm ${i < 5 ? "text-amber-400" : "text-slate-300"}`}
                              >
                                star
                              </span>
                            ))}
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {comment.comment_description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                    <p className="text-slate-500">
                      No reviews yet. Be the first to share your experience!
                    </p>
                  </div>
                )}
              </div>
            </section>
            {/* Leave a Thought Section */}
            <div className="bg-slate-50 dark:bg-slate-900/30 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 mt-12">
              <h3 className="text-xl font-bold mb-6">Leave your thoughts</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-3">
                    Your Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        // key={star}
                        type="button"
                        // onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform active:scale-90"
                      ></button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block">
                    Comment
                  </label>
                  <textarea
                    className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all min-h-[120px] text-slate-700 dark:text-slate-200"
                    placeholder="What did you think about the event?"
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button
                  type="button"
                  onClick={() => addComment()}
                  className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
                >
                  Post Review
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
                <div className="mb-6">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">
                    {event.category}
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-primary">
                      calendar_month
                    </span>
                    {event.date}
                  </li>
                  <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-primary">
                      location_on
                    </span>
                    {event.location}
                  </li>
                  <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-primary">
                      person
                    </span>
                    Organized by: {event.event_author || "Admin"}
                  </li>
                </ul>

                <button
                  onClick={() =>
                    navigate(`/eventRegistration`, {
                      state: { event, userSession },
                    })
                  }
                  disabled={
                    event.timing_status === "Past" || event.joined === "joined"
                  }
                  className={`w-full py-4 rounded-full font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg ${
                    event.joined === "joined" || event.timing_status === "Past"
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed shadow-none"
                      : "bg-primary text-white hover:bg-primary/90 hover:shadow-primary/30"
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {event.joined === "joined" ? "task_alt" : "how_to_reg"}
                  </span>
                  {event.timing_status === "Past"
                    ? "Event Ended"
                    : event.joined === "joined"
                      ? "Already Registered"
                      : "Register Now"}
                </button>
              </div>

              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="h-40 bg-slate-200 dark:bg-slate-700 relative">
                  <img
                    className="w-full h-full object-cover grayscale opacity-30"
                    src="https://maps.googleapis.com/maps/api/staticmap?center=University&zoom=13&size=400x200&key=YOUR_KEY"
                    alt="Map Location"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <span className="material-symbols-outlined">
                        location_on
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold mb-2">Venue</h4>
                  <p className="text-sm text-slate-500">{event.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
