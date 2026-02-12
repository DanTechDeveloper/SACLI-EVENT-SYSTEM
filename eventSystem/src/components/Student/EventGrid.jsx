export default function EventGrid() {
  return (
    <>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* <!-- Event Card 1 --> */}
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
          <div class="relative aspect-video overflow-hidden">
            <img
              alt="Tech Conference"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="Modern tech conference stage with speakers"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZCyRuFu3jLTrcPY9td1ZKHtS5atPcDqpZycgL7_RfL5XnC69Nhz1hWdoIJxeHqdO05Ughv7B43IbJafbHTX6XJSqSB3lWxG7HEqJ2RjQAcxvuSfi4Xe6iMVDmNzW8i3YFtXu2ItGtnj8RO4nKy4oyQNWitZO7zt68qE6shJ-qX6fdPHaa6tlFfFQpvEiWmSQV8QB3mb7xSyLZQ_2nu2HY7uVv9V12dq0LceBC2jw-T-e87Kvs_uqGq9A0TwxIiLveNfAWfpxgSjU"
            />
            <div class="absolute top-3 left-3">
              <span class="bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                Technology
              </span>
            </div>
            <button class="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all">
              <span class="material-icons-round text-lg">favorite_border</span>
            </button>
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <h3 class="text-xl font-bold mb-3 line-clamp-2 leading-tight">
              AI &amp; Ethics Workshop: Navigating the Future
            </h3>
            <div class="space-y-2 mt-auto">
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  schedule
                </span>
                <span>Oct 24 • 10:00 AM</span>
              </div>
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  location_on
                </span>
                <span>Main Auditorium</span>
              </div>
            </div>
            <div class="mt-5 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
              <span class="text-lg font-bold text-primary">Free</span>
              <button class="text-primary font-semibold hover:underline text-sm">
                Details
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Event Card 2 --> */}
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
          <div class="relative aspect-video overflow-hidden">
            <img
              alt="Summer Fest"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="Outdoor music festival during sunset"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLpUpFTrdy4Eqy3vjE1edABfW307s-yL-UQjI9Kaba7d3YJxg-7Vc9xzpd4Oxult7gqHaD1NQV0Paea7Pc6JZvokJbEHUE_E6KLrCOCLPHyPAhG1u_AEV9bY2IOwsPwrSgww_K6ohD3LOzgG2ut8MRGkP_MlvxF29caBGneBRH2PCpqwzJ408r1_vMW_YoZZKI8MqBE8fktNSpwsViKWB2tNNRHjsfjT6kaWNLdXbbVV-S63-eLXpX2BXnhxHJD1aHudIB-R9OxwE"
            />
            <div class="absolute top-3 left-3">
              <span class="bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                Social
              </span>
            </div>
            <button class="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all">
              <span class="material-icons-round text-lg">favorite_border</span>
            </button>
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <h3 class="text-xl font-bold mb-3 line-clamp-2 leading-tight">
              Sunset Sounds: Outdoor Music Festival
            </h3>
            <div class="space-y-2 mt-auto">
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  schedule
                </span>
                <span>Oct 26 • 05:00 PM</span>
              </div>
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  location_on
                </span>
                <span>Campus Central Green</span>
              </div>
            </div>
            <div class="mt-5 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
              <span class="text-lg font-bold text-slate-900 dark:text-white">
                $15.00
              </span>
              <button class="text-primary font-semibold hover:underline text-sm">
                Details
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Event Card 3 --> */}
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
          <div class="relative aspect-video overflow-hidden">
            <img
              alt="Startup Pitch"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="A group of people collaborating in an office"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8EGzzQ24Mwk49V9exJmWZmgfH2c1BecJZpJlK_bTFKw7yYMP9_4_0pVKK2UYuViZA4igQk71FLBGve1qc8pMSw0vQ6llg0QPxphkk0C6hALAPc0Sa8kb9gNNVes3Os8AWyXQzTgB6rN3cH496VH65E0FWskVa2m4zxaHThR27nuhZ_Ut_chqhyx6dmnP6C8ZTEZMmv4XG3BpVl7Q4BEQk-qlDOV8hxrIZ7fHTxVHIGFiGA1Y51NN4ZY-Uyw6jGoOPxbhZ0uc9zWE"
            />
            <div class="absolute top-3 left-3">
              <span class="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                Business
              </span>
            </div>
            <button class="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all">
              <span class="material-icons-round text-lg">favorite_border</span>
            </button>
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <h3 class="text-xl font-bold mb-3 line-clamp-2 leading-tight">
              Startup Weekend: From Idea to Reality
            </h3>
            <div class="space-y-2 mt-auto">
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  schedule
                </span>
                <span>Nov 02 • 09:00 AM</span>
              </div>
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  location_on
                </span>
                <span>Innovation Hub Room 202</span>
              </div>
            </div>
            <div class="mt-5 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
              <span class="text-lg font-bold text-slate-900 dark:text-white">
                $25.00
              </span>
              <button class="text-primary font-semibold hover:underline text-sm">
                Details
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Event Card 4 --> */}
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
          <div class="relative aspect-video overflow-hidden">
            <img
              alt="Adventure Club"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="Hiker standing on mountain top at sunrise"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6pDzMFj3yvUIOsWmd7TmSh1Je2Ai1DSTFV6JZMUFnunB0NdzM9giZAuqmoWBPdIk-yxmxhSF6jckrNSsEDnOvGyTuZLrMKxp4XMFwWailJVgEgWU6DPg9D78D_OtmCEKIZdRy1VZJdM_ytNlKGy35Ed3edEa2ffLr1eYvvWD4ELsI_nwMeyBHgAtGIVVxOe0L5rpKox1MxPvd7AxA_u0b-sM7vGXFhxJlOimrlw_gc9OIX4o0i8pNPmB4cplw5ugWz8CPFkd4O2c"
            />
            <div class="absolute top-3 left-3">
              <span class="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                Outdoors
              </span>
            </div>
            <button class="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all">
              <span class="material-icons-round text-lg">favorite_border</span>
            </button>
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <h3 class="text-xl font-bold mb-3 line-clamp-2 leading-tight">
              Blue Mountain Morning Trail Run
            </h3>
            <div class="space-y-2 mt-auto">
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  schedule
                </span>
                <span>Nov 05 • 06:30 AM</span>
              </div>
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  location_on
                </span>
                <span>South Campus Gate</span>
              </div>
            </div>
            <div class="mt-5 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
              <span class="text-lg font-bold text-primary">Free</span>
              <button class="text-primary font-semibold hover:underline text-sm">
                Details
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Event Card 5 --> */}
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
          <div class="relative aspect-video overflow-hidden">
            <img
              alt="Art Exhibition"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="Paintings hanging in a modern gallery"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2HzgzlZHaUWOWS0Rq6HugFp2wf21iTzFrsbv-fJbzYw4KlfRAdmr4ccnGvTmptGVObHCpfBKycdmp40XCuVJLvudEB9tRXFmZy9NBY7xL-zzP_q0dCQim6tvbxjzyuEtWb1R8Mzi2-hNDuxzgs27SfaYVMxyqp_cwcMNjvv-RJmbD5TTIug6xwgvTjOmo5tvpv-uejFe-0lruGbAxP5UjTuHLSMagtZ0yTjV-D3n0_vHQZzmxwupkhYV7OK8utHHuRJ9j6WtIM1A"
            />
            <div class="absolute top-3 left-3">
              <span class="bg-purple-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                Arts
              </span>
            </div>
            <button class="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all">
              <span class="material-icons-round text-lg">favorite_border</span>
            </button>
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <h3 class="text-xl font-bold mb-3 line-clamp-2 leading-tight">
              Visual Paradox: Senior Art Exhibition
            </h3>
            <div class="space-y-2 mt-auto">
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  schedule
                </span>
                <span>Nov 10 • 06:00 PM</span>
              </div>
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  location_on
                </span>
                <span>The Gallery</span>
              </div>
            </div>
            <div class="mt-5 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
              <span class="text-lg font-bold text-primary">Free</span>
              <button class="text-primary font-semibold hover:underline text-sm">
                Details
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Event Card 6 --> */}
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
          <div class="relative aspect-video overflow-hidden">
            <img
              alt="Code Sprint"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="Laptop screen showing code and terminal"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiZfvC8r02Xn0I7SgsiO1jLsDTZvxRCi0g3_bEEJVA5GHNX5blo2NcPxVkHpUFiEsN8b28LSsNhsJNyy1VbJFv4O5I0XtsCl-XSk3YIzSuAaUlfRdjjgcLPe0-g9x8cepZzBNFVcO9YQcsbhHTGsIayN6nCD7z2t4oOLN_roxvkHoUSKR-ETn97HdTx-o9eWH1UerP5LnNw7wgKDelWxmX369YXQbh3pDm6j5qIVkCtfivTqThP6YkSWOTRiRtbRn6GL0CbMqfQao"
            />
            <div class="absolute top-3 left-3">
              <span class="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                Programming
              </span>
            </div>
            <button class="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all">
              <span class="material-icons-round text-lg">favorite_border</span>
            </button>
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <h3 class="text-xl font-bold mb-3 line-clamp-2 leading-tight">
              Winter Hackathon 2024: Build for Impact
            </h3>
            <div class="space-y-2 mt-auto">
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  schedule
                </span>
                <span>Dec 01 • 08:00 AM</span>
              </div>
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  location_on
                </span>
                <span>Computer Science Bldg</span>
              </div>
            </div>
            <div class="mt-5 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
              <span class="text-lg font-bold text-slate-900 dark:text-white">
                $10.00
              </span>
              <button class="text-primary font-semibold hover:underline text-sm">
                Details
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Event Card 7 --> */}
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
          <div class="relative aspect-video overflow-hidden">
            <img
              alt="Social Mixer"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="Friends laughing together in a cozy cafe"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4b1wYbq9bbvdJIwJwrqdHIMIzotvmk1aUdSjBlopHACL6cphlBpQRLYnny4cXO1yUYv0GEJhjucejGOjacfLkjeBlKgMseXbFiFe_ah8OrdSxKNJMTJKyO4_2a9OlCVW5sDvgdLMiB9SczKcY8icoc3cHzQ4rJESUlk4WY8YENrLVNoj43vuNijljAF7EPesz80VtI-JPTIRGUACoqAlibBmRChYTtraEWZSQEEE5rP7RcPXzx4UA7rnQnpPn7lJP-84lFYRtB8A"
            />
            <div class="absolute top-3 left-3">
              <span class="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                Community
              </span>
            </div>
            <button class="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all">
              <span class="material-icons-round text-lg">favorite_border</span>
            </button>
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <h3 class="text-xl font-bold mb-3 line-clamp-2 leading-tight">
              Inter-Club Networking &amp; Game Night
            </h3>
            <div class="space-y-2 mt-auto">
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  schedule
                </span>
                <span>Nov 15 • 07:00 PM</span>
              </div>
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  location_on
                </span>
                <span>Student Union Lounge</span>
              </div>
            </div>
            <div class="mt-5 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
              <span class="text-lg font-bold text-primary">Free</span>
              <button class="text-primary font-semibold hover:underline text-sm">
                Details
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Event Card 8 --> */}
        <div class="group bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
          <div class="relative aspect-video overflow-hidden">
            <img
              alt="Yoga Session"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="Yoga instructor posing in a studio"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY19Yu1HOzSnHysBZgiS8pVanE3nH_U7pos0WI7rrHkko0Uz4c6g8JcTu8b-T-h35ibdaLXMVU5vCSYNWPx9uhPETv8MrdsRCVD2kfJiegyxB-i9zrx9OGbMMRW0Vyudl-aos_50oohrdhuNT-6rHPFrVjYSNi3GcAdNV2wwNUF_fvbTS9lTMYkSsEbU0LDaEeEfV9uil7zuuAE3hnh3ynHu1_bshHOvu011Z3RIBzEWH97sfT9D8lA0-F-E2tjFHvJJranNKeBWM"
            />
            <div class="absolute top-3 left-3">
              <span class="bg-cyan-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                Health
              </span>
            </div>
            <button class="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all">
              <span class="material-icons-round text-lg">favorite_border</span>
            </button>
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <h3 class="text-xl font-bold mb-3 line-clamp-2 leading-tight">
              Mindful Mornings: Group Yoga &amp; Meditation
            </h3>
            <div class="space-y-2 mt-auto">
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  schedule
                </span>
                <span>Weekly • 07:00 AM</span>
              </div>
              <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <span class="material-icons-round text-base text-primary">
                  location_on
                </span>
                <span>Wellness Center Gym</span>
              </div>
            </div>
            <div class="mt-5 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
              <span class="text-lg font-bold text-primary">Free</span>
              <button class="text-primary font-semibold hover:underline text-sm">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
