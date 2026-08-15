(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const { RESTAURANTS_DATA, CUISINES_DATA, COLLECTIONS_DATA } = window.YoyakuData;
  const { renderRestaurantCard, attachRestaurantCardEvents } = window.YoyakuComponents;
  const { generateCalendarGrid } = window.YoyakuComponents;






  function renderDiscoverView(state) {
    const isMm = state.currentLanguage === 'MM';

    // Compute Popularity Ranking (#1, #2, #3, #4) based on rating & reviewCount
    const popularRestaurants = [...RESTAURANTS_DATA].sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));

    return `
      <div class="space-y-16 pb-16">
        
        <!-- HERO SEARCH SECTION -->
        <section class="relative pt-6 pb-4 overflow-hidden">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <!-- Left Hero Content & Search Glass Panel -->
              <div class="lg:col-span-7 space-y-6 text-left">
                <div class="inline-flex items-center gap-2 bg-[#840f16]/10 text-[#840f16] px-4 py-1.5 rounded-full font-label text-xs font-bold uppercase tracking-widest border border-[#840f16]/20">
                  <span class="material-symbols-outlined text-sm">restaurant</span>
                  <span>${isMm ? 'မည်သည့် ဘတ်ဂျက်မဆို စားပွဲဝိုင်းများကို အလွယ်တကူ စိုတ်ယူပါ' : 'Table Bookings For Every Budget & Occasion'}</span>
                </div>

                <h1 class="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#231916] leading-[1.15]">
                  ${
                    isMm
                      ? 'ဒီနေ့ ဘာ <span class="text-[#840f16] relative inline-block">စားချင်ပါသလဲ။</span>'
                      : 'What are you <span class="text-[#840f16] relative inline-block">craving today?</span>'
                  }
                </h1>

                <p class="font-body text-base sm:text-lg text-[#58413f] max-w-2xl leading-relaxed font-medium">
                  ${
                    isMm
                      ? 'ရန်ကုန်မြို့၏ နာမည်ကြီး လက်ဖက်ရည်ဆိုင်များ၊ မိသားစု စားသောက်ဆိုင်များနှင့် သီးသန့် အဆင့်မြင့် စားသောက်ဆိုင်များတွင် စားပွဲဝိုင်းများကို အလွယ်တကူ ချက်ချင်း စိုတ်ယူလိုက်ပါ။'
                      : 'Reserve your table instantly — from local teahouses and casual family eateries to romantic lakefronts and fine dining.'
                  }
                </p>

                <!-- Glass Multi-Parameter Search Panel -->
                <div class="glass-panel p-4 sm:p-6 rounded-3xl space-y-4 border border-[#EADFD1] shadow-2xl">
                  <form id="hero-search-form" class="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    
                    <!-- Keyword Search Input -->
                    <div class="sm:col-span-12 bg-[#FFF8F6] border border-[#EADFD1] focus-within:border-[#840f16] rounded-2xl p-3 flex items-center gap-2">
                      <span class="material-symbols-outlined text-[#840f16]">search</span>
                      <input
                        type="text"
                        id="hero-keyword-input"
                        placeholder="${isMm ? 'ဆိုင်အမည် သို့မဟုတ် သော့ချက်စာလုံး (Keywords)...' : 'Search by venue name or keywords...'}"
                        value="${state.searchKeyword || ''}"
                        class="w-full bg-transparent font-body text-xs sm:text-sm text-[#231916] focus:outline-none"
                      />
                    </div>

                    <!-- Area Dropdown (နေရာဒေသ) -->
                    <div class="sm:col-span-6 bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-2.5 flex items-center gap-2">
                      <span class="material-symbols-outlined text-[#840f16] text-lg">location_on</span>
                      <select id="hero-area-select" class="w-full bg-transparent font-label text-xs sm:text-sm text-[#231916] focus:outline-none cursor-pointer">
                        <option value="All Areas">${isMm ? 'နေရာဒေသ (အားလုံး)' : 'All Areas'}</option>
                        <option value="Bahan Township">Bahan Township (ဗဟန်း)</option>
                        <option value="Dagon Township">Dagon Township (ဒဂုံ)</option>
                        <option value="Yangon Downtown">Yangon Downtown (မြို့ထဲ)</option>
                        <option value="Inya Lake Waterfront">Inya Lake Waterfront (အင်းလျား)</option>
                        <option value="Ahlone Township">Ahlone Township (အလုံ)</option>
                      </select>
                    </div>

                    <!-- Cuisine Genre Dropdown (အစားအစာအမျိုးအစား) -->
                    <div class="sm:col-span-6 bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-2.5 flex items-center gap-2">
                      <span class="material-symbols-outlined text-[#840f16] text-lg">restaurant_menu</span>
                      <select id="hero-cuisine-select" class="w-full bg-transparent font-label text-xs sm:text-sm text-[#231916] focus:outline-none cursor-pointer">
                        <option value="All Cuisines">${isMm ? 'အစားအစာအမျိုးအစား (အားလုံး)' : 'All Cuisine Genres'}</option>
                        <option value="Burmese">Burmese (မြန်မာအစားအစာ)</option>
                        <option value="Teahouse & Snacks">Teahouse & Snacks (လက်ဖက်ရည်ဆိုင်)</option>
                        <option value="Japanese">Japanese (ဂျပန်)</option>
                        <option value="Casual Dining">Casual Dining (မိသားစု)</option>
                        <option value="European">European (ဥရောပ)</option>
                        <option value="French">French Fine Dining (ပြင်သစ်)</option>
                      </select>
                    </div>

                    <!-- Date Selector with Calendar View Popover -->
                    <div class="sm:col-span-5 relative">
                      <button
                        type="button"
                        id="hero-date-trigger"
                        class="w-full bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] rounded-2xl p-2.5 flex items-center justify-between gap-2 text-left cursor-pointer hover:border-[#840f16] transition-colors"
                      >
                        <div class="flex items-center gap-2 min-w-0">
                          <span class="material-symbols-outlined text-[#840f16] text-lg shrink-0">calendar_month</span>
                          <span id="hero-date-display" class="font-label text-xs sm:text-sm text-[#231916] font-semibold truncate">
                            ${state.resultsState?.selectedDate || 'Aug 14, 2026'}
                          </span>
                        </div>
                        <span class="material-symbols-outlined text-[#8d7b75] text-sm shrink-0">expand_more</span>
                      </button>

                      <!-- Popover Calendar Grid View -->
                      <div
                        id="hero-calendar-popover"
                        class="hidden absolute bottom-full left-0 mb-2 z-50 w-72 sm:w-80 bg-[#FFF7E8] border border-[#EADFD1] rounded-3xl p-4 shadow-2xl animate-fadeIn"
                      >
                        <div class="text-xs font-label font-bold text-[#840f16] uppercase tracking-wider mb-2 flex items-center justify-between">
                          <span>${isMm ? 'ရက်စွဲ ရွေးချယ်ပါ' : 'Select Dining Date'}</span>
                          <span class="material-symbols-outlined text-sm cursor-pointer text-[#8d7b75] hover:text-[#840f16]" id="hero-calendar-close">close</span>
                        </div>
                        <div id="hero-calendar-container">
                          ${generateCalendarGrid({
                            year: 2026,
                            month: 7,
                            selectedDateStr: state.resultsState?.selectedDate || 'Aug 14, 2026',
                            onDaySelectAttr: 'data-hero-calendar-day'
                          })}
                        </div>
                      </div>
                    </div>

                    <!-- Time Selector -->
                    <div class="sm:col-span-4 bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-2.5 flex items-center gap-2">
                      <span class="material-symbols-outlined text-[#840f16] text-lg">schedule</span>
                      <select id="hero-time-select" class="w-full bg-transparent font-label text-xs sm:text-sm text-[#231916] focus:outline-none cursor-pointer">
                        <option value="18:30">6:30 PM (ညနေ)</option>
                        <option value="12:00">12:00 PM (နေ့လယ်)</option>
                        <option value="13:00">1:00 PM (နေ့လယ်)</option>
                        <option value="18:00">6:00 PM (ညနေ)</option>
                        <option value="19:00">7:00 PM (ညနေ)</option>
                        <option value="20:00">8:00 PM (ညနေ)</option>
                      </select>
                    </div>

                    <!-- Guests / Party Size Selector -->
                    <div class="sm:col-span-3 bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-2.5 flex items-center gap-2">
                      <span class="material-symbols-outlined text-[#840f16] text-lg">group</span>
                      <select id="hero-guests-select" class="w-full bg-transparent font-label text-xs sm:text-sm text-[#231916] focus:outline-none cursor-pointer">
                        <option value="2">2 Guests</option>
                        <option value="1">1 Guest</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="8">8+ Guests</option>
                      </select>
                    </div>

                    <!-- Submit Search CTA -->
                    <div class="sm:col-span-12 pt-1">
                      <button
                        type="submit"
                        class="w-full btn-primary py-3.5 rounded-2xl font-label text-sm font-semibold shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
                      >
                        <span class="material-symbols-outlined text-lg">table_restaurant</span>
                        <span>${isMm ? 'စားပွဲဝိုင်း အသေးစိတ် ရှာဖွေမည်' : 'Search Tables'}</span>
                        <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </button>
                    </div>

                  </form>
                </div>

              </div>

              <!-- Right Hero Image Collage -->
              <div class="lg:col-span-5 relative hidden lg:block">
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-4">
                    <div
                      data-card-select-id="rest-1"
                      class="collage-img h-64 rounded-3xl overflow-hidden shadow-xl border border-[#EADFD1] cursor-pointer relative group"
                    >
                      <img src="${RESTAURANTS_DATA[0].heroImage}" alt="Padonmar" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div class="absolute bottom-4 left-4 text-white font-headline text-sm font-bold">The Gilded Fork</div>
                    </div>
                    <div
                      data-card-select-id="rest-3"
                      class="collage-img h-48 rounded-3xl overflow-hidden shadow-xl border border-[#EADFD1] cursor-pointer relative group"
                    >
                      <img src="${RESTAURANTS_DATA[2].heroImage}" alt="Rangoon Tea House" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div class="absolute bottom-4 left-4 text-white font-headline text-sm font-bold">Rangoon Tea House</div>
                    </div>
                  </div>

                  <div class="space-y-4 pt-8">
                    <div
                      data-card-select-id="rest-2"
                      class="collage-img h-48 rounded-3xl overflow-hidden shadow-xl border border-[#EADFD1] cursor-pointer relative group"
                    >
                      <img src="${RESTAURANTS_DATA[1].heroImage}" alt="Seeds" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div class="absolute bottom-4 left-4 text-white font-headline text-sm font-bold">Seeds Lakefront</div>
                    </div>
                    <div
                      data-card-select-id="rest-4"
                      class="collage-img h-64 rounded-3xl overflow-hidden shadow-xl border border-[#EADFD1] cursor-pointer relative group"
                    >
                      <img src="${RESTAURANTS_DATA[3].heroImage}" alt="L'Alchimiste" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div class="absolute bottom-4 left-4 text-white font-headline text-sm font-bold">L’Alchimiste French</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- EXPLORE BY CUISINE -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div class="flex justify-between items-end mb-6">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#231916]">
                ${isMm ? 'အစားအစာ အမျိုးအစားများ' : 'Explore by Cuisine'}
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#58413f] mt-1">
                ${isMm ? 'မိမိနှစ်သက်သော ဟင်းလျာအလိုက် စားသောက်ဆိုင်များကို ရွေးချယ်ပါ' : 'Select from traditional heritage recipes to contemporary international fusion.'}
              </p>
            </div>
            <button
              data-nav-tab="resultlist"
              class="font-label text-xs font-bold text-[#840f16] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>${isMm ? 'အားလုံးကြည့်ရန်' : 'View All'}</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            ${CUISINES_DATA.map(c => `
              <button
                data-cuisine-filter="${c.name}"
                class="group bg-[#FBF3E2] p-4 rounded-3xl border border-[#EADFD1] hover:border-[#840f16] hover:shadow-lg transition-all text-left flex items-center gap-4 cursor-pointer"
              >
                <div class="w-14 h-14 rounded-2xl overflow-hidden border border-[#EADFD1] shrink-0">
                  <img src="${c.image}" alt="${c.name}" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <div class="font-headline text-base font-bold text-[#231916] group-hover:text-[#840f16] transition-colors">
                    ${isMm ? c.nameMM : c.name}
                  </div>
                  <div class="font-label text-xs text-[#58413f] mt-0.5">
                    ${c.count} ${isMm ? 'ဆိုင်များ' : 'Venues'}
                  </div>
                </div>
              </button>
            `).join('')}
          </div>
        </section>

        <!-- PROMOTION & ANNOUNCEMENT BANNERS (ကြေညာချက်ဘန်နာများ) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Banner 1: KBZPay / WavePay Special Offer -->
            <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#840f16] to-[#a52a2a] p-5 sm:p-6 text-white shadow-xl flex items-center justify-between gap-4 border border-[#840f16]/30">
              <div class="space-y-1.5 z-10 text-left">
                <div class="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] font-label font-bold uppercase tracking-wider text-amber-200">
                  <span class="material-symbols-outlined text-xs">local_activity</span>
                  <span>${isMm ? 'ပရိုမိုးရှင်း အထူးအစီအစဉ်' : 'Exclusive Dining Offer'}</span>
                </div>
                <h3 class="font-headline text-lg sm:text-xl font-extrabold leading-tight">
                  ${isMm ? 'KBZPay & WavePay ဖြင့် စိုတ်ယူပါက ၂၀% လျှော့ဈေး' : '20% Off Weekend Dining Pass with KBZPay'}
                </h3>
                <p class="font-body text-xs text-white/80">
                  ${isMm ? 'ယခုပတ်အတွင်း စားပွဲဝိုင်း စိုတ်ယူသူများအတွက် ရရှိနိုင်သော ကူပွန်' : 'Apply voucher code YOYAKUKBZ50K at checkout for instant table discount.'}
                </p>
              </div>
              <button data-nav-tab="mypage" class="shrink-0 bg-white text-[#840f16] px-4 py-2.5 rounded-2xl font-label text-xs font-bold hover:bg-amber-100 transition-colors shadow-md cursor-pointer z-10">
                ${isMm ? 'ကူပွန်ယူမည်' : 'Claim Voucher'}
              </button>
              <div class="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
            </div>

            <!-- Banner 2: Instant VIP Table Pass Info -->
            <div class="relative overflow-hidden rounded-3xl bg-[#1c1311] p-5 sm:p-6 text-white shadow-xl flex items-center justify-between gap-4 border border-[#362723]">
              <div class="space-y-1.5 z-10 text-left">
                <div class="inline-flex items-center gap-1.5 bg-[#d08e1c]/20 px-3 py-0.5 rounded-full text-[10px] font-label font-bold uppercase tracking-wider text-[#d08e1c]">
                  <span class="material-symbols-outlined text-xs">verified</span>
                  <span>${isMm ? 'စနစ်ဆိုင်ရာ အသိပေးချက်' : 'System Announcement'}</span>
                </div>
                <h3 class="font-headline text-lg sm:text-xl font-extrabold text-[#e8dfd8] leading-tight">
                  ${isMm ? 'ဗဟန်း၊ ဒဂုံ၊ မြို့ထဲတွင် Instant Pass စတင်ပါပြီ' : 'Instant Table Confirmation Enabled in Yangon'}
                </h3>
                <p class="font-body text-xs text-[#bcaaa4]">
                  ${isMm ? 'စောင့်ဆိုင်းရန် မလိုဘဲ စားပွဲဝိုင်းများကို ချက်ချင်းအတည်ပြုပေးပါသည်' : 'No phone calls needed. Receive instant QR entry pass right on your phone.'}
                </p>
              </div>
              <button data-nav-tab="resultlist" class="shrink-0 bg-[#d08e1c] text-white px-4 py-2.5 rounded-2xl font-label text-xs font-bold hover:bg-[#b07616] transition-colors shadow-md cursor-pointer z-10">
                ${isMm ? 'စိုတ်ယူရန်' : 'Book Table'}
              </button>
            </div>

          </div>
        </section>

        <!-- CURATED COLLECTIONS -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <!-- Header Centered -->
          <div class="max-w-2xl mx-auto mb-10 text-center">
            <h2 class="font-headline text-3xl sm:text-4xl font-extrabold text-[#231916]">
              ${isMm ? 'အထူး စုစည်းမှုများ' : 'Curated Collections'}
            </h2>
            <p class="font-body text-sm sm:text-base text-[#58413f] mt-2">
              ${isMm ? 'အစီအစဉ်အမျိုးမျိုးအတွက် အထူးသီးသန့် ရွေးချယ်ပေးထားသော စားသောက်ဆိုင်များ' : 'Hand-picked selections by our editors for every special occasion.'}
            </p>
          </div>

          <!-- Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            ${COLLECTIONS_DATA.map(col => `
              <div
                data-collection-target="${col.targetRestaurantId}"
                class="group relative h-96 sm:h-[400px] rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-end p-6 sm:p-8 text-left text-white"
              >
                <img
                  src="${col.image}"
                  alt="${col.title}"
                  referrerpolicy="no-referrer"
                  loading="lazy"
                  onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <!-- Dark Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <!-- Card Content -->
                <div class="relative z-10 space-y-1">
                  <div class="font-label text-xs font-extrabold uppercase tracking-widest text-[#D08E1C]">
                    ${isMm ? col.categoryTagMM : col.categoryTag}
                  </div>
                  <h3 class="font-headline text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    ${isMm ? col.titleMM : col.title}
                  </h3>
                  <p class="font-body text-xs sm:text-sm text-white/80 line-clamp-2">
                    ${isMm ? col.subtitleMM : col.subtitle}
                  </p>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Centered Bottom Pill Button -->
          <div class="mt-10 text-center">
            <button
              data-nav-tab="curated"
              class="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#EADFD1] bg-[#FBF3E2] hover:bg-[#840f16] hover:text-white hover:border-[#840f16] transition-all text-[#840f16] font-label text-sm font-bold shadow-sm hover:shadow-md cursor-pointer group"
            >
              <span>${isMm ? 'စုစည်းမှုများ အားလုံး ကြည့်မည်' : 'View All Collections'}</span>
              <span class="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </section>


        <!-- TRENDING VENUES SECTION -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div class="flex justify-between items-end mb-6">
            <div>
              <div class="inline-flex items-center gap-1.5 bg-[#840f16]/10 text-[#840f16] px-3 py-1 rounded-full text-xs font-label font-bold uppercase tracking-wider mb-2 border border-[#840f16]/20">
                <span class="material-symbols-outlined text-sm">trending_up</span>
                <span>${isMm ? 'ရေပန်းစားသော စားသောက်ဆိုင်များ' : 'Trending Selection'}</span>
              </div>
              <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#231916]">
                ${isMm ? 'ရေပန်းစားသော စားသောက်ဆိုင်များ' : 'Trending Venues'}
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#58413f] mt-1">
                ${isMm ? 'လက်ရှိ လူကြိုက်များပြီး စိုတ်ယူမှု အများဆုံး စားသောက်ဆိုင်များ' : 'Top trending dining destinations curated dynamically based on user bookings and high ratings.'}
              </p>
            </div>
            <button
              data-nav-tab="resultlist"
              class="font-label text-xs font-bold text-[#840f16] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>${isMm ? 'အားလုံးကြည့်ရန်' : 'View All'}</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${popularRestaurants.slice(0, 4).map(r => {
              const rawStart = r.priceRange ? r.priceRange.split('-')[0].trim() : '150,000 MMK';
              const fitPrice = rawStart.endsWith('MMK') ? rawStart : `${rawStart} MMK`;
              return `
              <div
                data-card-select-id="${r.id}"
                class="group relative bg-[#FFF9EE] border border-[#EADFD1] rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col text-left"
              >
                <!-- Image Container -->
                <div class="relative h-48 overflow-hidden">
                  <img
                    src="${r.heroImage}"
                    alt="${r.name}"
                    referrerpolicy="no-referrer"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div class="absolute top-3 right-3 bg-[#840f16] text-white px-2.5 py-0.5 rounded-full font-label text-[10px] font-bold uppercase tracking-wider">
                    ${r.cuisine}
                  </div>
                </div>

                <!-- Card Content Area -->
                <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div class="space-y-1.5">
                    <!-- Venue Name / Location -->
                    <div class="flex items-center gap-1 text-xs font-label font-bold text-[#840f16] uppercase tracking-wider">
                      <span class="material-symbols-outlined text-sm">location_on</span>
                      <span class="truncate">${r.location || r.area}</span>
                    </div>

                    <!-- Restaurant Name -->
                    <h3 class="font-headline text-lg sm:text-xl font-bold text-[#231916] group-hover:text-[#840f16] transition-colors leading-snug line-clamp-1">
                      ${r.name}
                    </h3>
                  </div>

                  <!-- Price Row -->
                  <div class="pt-2 border-t border-[#EADFD1] flex items-center justify-between">
                    <span class="font-label text-xs text-[#58413f]">${isMm ? 'စျေးနှုန်း' : 'Price'}</span>
                    <span class="font-label text-xs font-bold text-[#231916]">${fitPrice}</span>
                  </div>
                </div>
              </div>
            `;
            }).join('')}
          </div>
        </section>


        <!-- FEATURED VENUES GRID (အကြံပြုထားသောဆိုင်များ) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div class="flex justify-between items-end mb-6">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#231916]">
                ${isMm ? 'အကြံပြုထားသော စားသောက်ဆိုင်များ' : 'Featured Recommended Shops'}
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#58413f] mt-1">
                ${isMm ? 'စနစ်မှ အထူးအကြံပြုထားသော စားသောက်ဆိုင်များ' : 'Hand-picked dining recommendations with instant table booking.'}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${RESTAURANTS_DATA.map(restaurant => renderRestaurantCard(restaurant, state)).join('')}
          </div>
        </section>

      </div>
    `;
  }

  function attachDiscoverViewEvents(containerElement = document) {
    attachRestaurantCardEvents(containerElement);

    // Hero Search Form
    const form = containerElement.querySelector('#hero-search-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const kw = containerElement.querySelector('#hero-keyword-input')?.value || '';
        const area = containerElement.querySelector('#hero-area-select')?.value || 'All Areas';
        const cuisine = containerElement.querySelector('#hero-cuisine-select')?.value || 'All Cuisines';
        const time = containerElement.querySelector('#hero-time-select')?.value || '18:30';
        const partySize = containerElement.querySelector('#hero-guests-select')?.value || '2';

        store.updateResultsState({
          keyword: kw,
          area,
          cuisine,
          partySize: partySize === 'All' ? 'All Sizes' : partySize,
        });
        store.setSearchKeyword(kw);
        store.setActiveTab('resultlist');
      });
    }

    // Cuisine filter buttons
    containerElement.querySelectorAll('[data-cuisine-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cuisine = e.currentTarget.getAttribute('data-cuisine-filter');
        store.updateResultsState({ cuisine, keyword: '' });
        store.setActiveTab('resultlist');
      });
    });

    // Hero Calendar View Popover Logic
    const dateTrigger = containerElement.querySelector('#hero-date-trigger');
    const datePopover = containerElement.querySelector('#hero-calendar-popover');
    const dateClose = containerElement.querySelector('#hero-calendar-close');
    const dateDisplay = containerElement.querySelector('#hero-date-display');
    const calendarContainer = containerElement.querySelector('#hero-calendar-container');

    let activeCalYear = 2026;
    let activeCalMonth = 7; // Aug

    function renderHeroCalendar() {
      if (!calendarContainer) return;
      calendarContainer.innerHTML = generateCalendarGrid({
        year: activeCalYear,
        month: activeCalMonth,
        selectedDateStr: store.state.resultsState?.selectedDate || 'Aug 14, 2026',
        onDaySelectAttr: 'data-hero-calendar-day'
      });
      bindHeroCalendarEvents();
    }

    function bindHeroCalendarEvents() {
      if (!calendarContainer) return;

      // Previous month
      const prevBtn = calendarContainer.querySelector('#cal-prev-month');
      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          activeCalMonth--;
          if (activeCalMonth < 0) {
            activeCalMonth = 11;
            activeCalYear--;
          }
          renderHeroCalendar();
        });
      }

      // Next month
      const nextBtn = calendarContainer.querySelector('#cal-next-month');
      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          activeCalMonth++;
          if (activeCalMonth > 11) {
            activeCalMonth = 0;
            activeCalYear++;
          }
          renderHeroCalendar();
        });
      }

      // Day Selection
      calendarContainer.querySelectorAll('[data-hero-calendar-day]').forEach(dayBtn => {
        dayBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const dateStr = e.currentTarget.getAttribute('data-date-str');
          if (dateStr) {
            store.updateResultsState({ selectedDate: dateStr });
            if (dateDisplay) dateDisplay.textContent = dateStr;
            if (datePopover) datePopover.classList.add('hidden');
          }
        });
      });
    }

    if (dateTrigger && datePopover) {
      dateTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        datePopover.classList.toggle('hidden');
        if (!datePopover.classList.contains('hidden')) {
          renderHeroCalendar();
        }
      });
    }

    if (dateClose && datePopover) {
      dateClose.addEventListener('click', (e) => {
        e.stopPropagation();
        datePopover.classList.add('hidden');
      });
    }

    // Close calendar popover on outside click
    document.addEventListener('click', (e) => {
      if (datePopover && !datePopover.classList.contains('hidden')) {
        if (!datePopover.contains(e.target) && !dateTrigger.contains(e.target)) {
          datePopover.classList.add('hidden');
        }
      }
    });

    // Collection card target clicks
    containerElement.querySelectorAll('[data-collection-target]').forEach(card => {
      card.addEventListener('click', (e) => {
        const targetId = e.currentTarget.getAttribute('data-collection-target');
        const target = RESTAURANTS_DATA.find(r => r.id === targetId);
        if (target) {
          store.setSelectedRestaurant(target);
        }
      });
    });
  }


  window.YoyakuComponents.renderDiscoverView = renderDiscoverView;
  window.YoyakuComponents.attachDiscoverViewEvents = attachDiscoverViewEvents;
})();
