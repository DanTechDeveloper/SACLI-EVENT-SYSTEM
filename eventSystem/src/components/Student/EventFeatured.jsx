export default function EventFeatured() {
  return (
    <>
      <section class="mb-10">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold">Featured Events</h2>
          
        </div>
        <div class="relative rounded-2xl overflow-hidden aspect-[21/9] group">
          <img
            alt="Featured Event"
            class="w-full h-full object-cover"
            data-alt="Vibrant night concert with crowd and neon lights"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKjoFo6y0jiCu2XC4a12UbQDx2URvmSiEy65t5qISNOKVACqkfpfpi9uHY-X-nolvDv77o6iYuUKaJjmCww5Yd1KF5jrldOll91PbunIcGltwdKcdIQ3QJAXeH_QDDp9TjGWno3bGNZ6k3gXh-VPU1WtHLmTSY3CgimrA27t4-sXibxMaGIMw0a5MCMQxrJcOXEHBiI53n8niXUPYl2tWprjxATpT6ZXiGDhkLEuPEghcIHNV83aA_u51nzro15io71lBzlQjZZks"
          />
          <div class="absolute inset-0 custom-gradient flex flex-col justify-center mt-4 p-8">
            <div class="max-w-2xl">
              <span class="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold mb-3 tracking-wide uppercase">
                Annual Tech Symposium
              </span>
              <h3 class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Innovate 2024: The Future of Campus Technology
              </h3>
              <p class="text-slate-200 text-lg mb-6 line-clamp-2">
                Join global industry leaders and student innovators for a
                weekend of workshops, keynotes, and networking.
              </p>
              <div class="flex items-center gap-4">
                <button class="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all">
                  Register Now{" "}
                  <span class="material-icons-round text-sm">
                    arrow_forward
                  </span>
                </button>
                <button class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/20">
                  View Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
