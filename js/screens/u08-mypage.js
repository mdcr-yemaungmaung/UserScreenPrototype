(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

  function renderDiningPlateIcon() {
    return `
      <div class="w-12 h-12 rounded-2xl bg-[#FFF8F6] border border-[#EADFD1] flex items-center justify-center shrink-0 shadow-2xs">
        <svg class="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Fork -->
          <path d="M13 14V20C13 21.6569 14.3431 23 16 23V34" stroke="#840f16" stroke-width="2" stroke-linecap="round"/>
          <path d="M16 14V23" stroke="#840f16" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M19 14V20C19 21.6569 17.6569 23 16 23" stroke="#840f16" stroke-width="2" stroke-linecap="round"/>
          <!-- Plate Rim -->
          <circle cx="26" cy="24" r="10" fill="#FBF3E2" stroke="#D08E1C" stroke-width="2"/>
          <circle cx="26" cy="24" r="6.5" stroke="#EADFD1" stroke-width="1.5" stroke-dasharray="2 2"/>
          <!-- Knife -->
          <path d="M35 14V34M35 14C35 14 32 16.5 32 20.5V23.5H35" stroke="#840f16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    `;
  }

  function renderStatusPill(status, isMm) {
    const s = (status || '').toLowerCase();
    if (s === 'confirmed') {
      return `
        <span class="inline-flex items-center gap-1.5 bg-[#104b2b]/10 text-[#104b2b] border border-[#104b2b]/25 px-3 py-1 rounded-full font-label text-xs font-bold">
          <span class="w-2 h-2 rounded-full bg-[#104b2b]"></span>
          <span>${isMm ? 'အတည်ပြုပြီး' : 'Confirmed'}</span>
        </span>
      `;
    }
    if (s === 'pending') {
      return `
        <span class="inline-flex items-center gap-1.5 bg-[#D08E1C]/15 text-[#8f5d0b] border border-[#D08E1C]/30 px-3 py-1 rounded-full font-label text-xs font-bold">
          <span class="w-2 h-2 rounded-full bg-[#D08E1C]"></span>
          <span>${isMm ? 'စောင့်ဆိုင်းဆဲ' : 'Pending'}</span>
        </span>
      `;
    }
    if (s === 'completed') {
      return `
        <span class="inline-flex items-center gap-1.5 bg-[#104b2b] text-white px-3 py-1 rounded-full font-label text-xs font-bold shadow-2xs">
          <span class="w-1.5 h-1.5 rounded-full bg-[#b5f0c4]"></span>
          <span>${isMm ? 'ပြီးမြောက်ပြီး' : 'Completed'}</span>
        </span>
      `;
    }
    if (s === 'cancelled' || s === 'canceled') {
      return `
        <span class="inline-flex items-center gap-1.5 bg-[#840f16]/10 text-[#840f16] border border-[#840f16]/25 px-3 py-1 rounded-full font-label text-xs font-bold">
          <span class="w-2 h-2 rounded-full bg-[#840f16]"></span>
          <span>${isMm ? 'ပယ်ဖျက်ပြီး' : 'Cancelled'}</span>
        </span>
      `;
    }
    return `
      <span class="inline-flex items-center gap-1.5 bg-[#EADFD1] text-[#58413f] px-3 py-1 rounded-full font-label text-xs font-bold">
        <span class="w-2 h-2 rounded-full bg-[#8d7b75]"></span>
        <span>${status}</span>
      </span>
    `;
  }

  function renderReservationsContent(state) {
    const isMm = state.currentLanguage === 'MM';
    const currentSubTab = state.myPageSubTab || 'past';
    const allReservations = state.reservations || [];
    let displayedReservations = allReservations;

    if (currentSubTab === 'upcoming') {
      displayedReservations = allReservations.filter(r => r.status === 'Confirmed' || r.status === 'Pending');
    } else if (currentSubTab === 'past') {
      displayedReservations = allReservations;
    }

    return `
      <!-- SUB-TABS (Upcoming Reservations vs Past Reservations) -->
      <div class="flex items-center gap-8 border-b border-[#EADFD1] pb-0.5">
        <button
          data-subtab="upcoming"
          class="pb-3 font-label text-xs sm:text-sm tracking-wide transition-all cursor-pointer relative ${
            currentSubTab === 'upcoming'
              ? 'font-bold text-[#840f16] border-b-2 border-[#840f16] -mb-[1.5px]'
              : 'font-semibold text-[#58413f] hover:text-[#231916]'
          }"
        >
          ${isMm ? 'လာမည့် စိုတ်ထားမှုများ' : 'Upcoming Reservations'}
        </button>
        <button
          data-subtab="past"
          class="pb-3 font-label text-xs sm:text-sm tracking-wide transition-all cursor-pointer relative ${
            currentSubTab === 'past'
              ? 'font-bold text-[#840f16] border-b-2 border-[#840f16] -mb-[1.5px]'
              : 'font-semibold text-[#58413f] hover:text-[#231916]'
          }"
        >
          ${isMm ? 'ယခင် စိုတ်ထားမှုများ' : 'Past Reservations'}
        </button>
      </div>

      <!-- RESERVATION CARDS LIST -->
      <div class="space-y-4">
        ${
          displayedReservations.length === 0
            ? `
              <div class="bg-[#FBF3E2] rounded-3xl border border-[#EADFD1] p-8 sm:p-12 text-center space-y-4 shadow-sm">
                <div class="w-14 h-14 bg-[#840f16]/10 text-[#840f16] rounded-full flex items-center justify-center mx-auto">
                  <span class="material-symbols-outlined text-2xl">event_busy</span>
                </div>
                <h3 class="font-headline text-xl font-bold text-[#231916]">
                  ${isMm ? 'စိုတ်ထားမှု မှတ်တမ်း မရှိသေးပါ' : `No ${currentSubTab} reservations found`}
                </h3>
                <p class="font-body text-xs sm:text-sm text-[#58413f] max-w-sm mx-auto">
                  ${isMm ? 'ရန်ကုန်မြို့ရှိ အဆင့်မြင့် စားသောက်ဆိုင်များကို ရှာဖွေပြီး စားပွဲဝိုင်း ချက်ချင်း စိုတ်ယူလိုက်ပါ' : `You have no ${currentSubTab} reservations. Browse our curated collection to book your next dining experience.`}
                </p>
                <button
                  id="mypage-explore-btn"
                  class="btn-primary px-6 py-2.5 rounded-full font-label text-xs font-semibold shadow-md inline-flex items-center gap-2 cursor-pointer mt-2"
                >
                  <span>${isMm ? 'ဆိုင်များ ရှာဖွေရန်' : 'Explore Restaurants'}</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            `
            : displayedReservations
                .map(item => {
                  const isCompleted = (item.status || '').toLowerCase() === 'completed';
                  return `
                    <div class="bg-[#FBF3E2] rounded-3xl border border-[#EADFD1] p-4 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-5">
                      
                      <!-- Left: Icon & Details -->
                      <div class="flex items-start gap-3.5 sm:gap-4 min-w-0">
                        ${renderDiningPlateIcon()}

                        <div class="space-y-1.5 min-w-0">
                          <h3
                            data-resv-select-id="${item.restaurantId}"
                            class="font-headline text-base sm:text-xl font-bold text-[#231916] hover:text-[#840f16] cursor-pointer transition-colors truncate"
                          >
                            ${item.restaurantName}
                          </h3>

                          <div class="flex items-center flex-wrap gap-x-2.5 gap-y-1 text-xs text-[#58413f] font-medium font-label">
                            <span class="inline-flex items-center gap-1 text-[#840f16] font-semibold">
                              <span class="material-symbols-outlined text-[15px]">calendar_today</span>
                              <span>${item.date} at ${item.time}</span>
                            </span>
                            <span class="text-[#8d7b75]">·</span>
                            <span class="inline-flex items-center gap-1">
                              <span class="material-symbols-outlined text-[15px] text-[#8d7b75]">group</span>
                              <span>${item.guests} ${isMm ? 'ဦး' : 'guests'}</span>
                            </span>
                            ${item.location ? `
                              <span class="text-[#8d7b75] hidden sm:inline">·</span>
                              <span class="hidden sm:inline-flex items-center gap-1 text-[#8d7b75]">
                                <span class="material-symbols-outlined text-[14px]">location_on</span>
                                <span class="truncate max-w-[180px]">${item.location}</span>
                              </span>
                            ` : ''}
                          </div>

                          <div class="flex items-center gap-2 pt-0.5">
                            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-label font-bold uppercase tracking-wider ${
                              item.status === 'Confirmed'
                                ? 'bg-[#31572C]/15 text-[#1b3d17] border border-[#31572C]/30'
                                : item.status === 'Pending'
                                  ? 'bg-[#D08E1C]/15 text-[#8f5d0b] border border-[#D08E1C]/30'
                                  : item.status === 'Cancelled'
                                    ? 'bg-[#840f16]/15 text-[#840f16] border border-[#840f16]/30'
                                    : 'bg-[#58413f]/15 text-[#58413f] border border-[#58413f]/30'
                            }">
                              <span class="w-1.5 h-1.5 rounded-full ${
                                item.status === 'Confirmed'
                                  ? 'bg-[#31572C]'
                                  : item.status === 'Pending'
                                    ? 'bg-[#D08E1C]'
                                    : item.status === 'Cancelled'
                                      ? 'bg-[#840f16]'
                                      : 'bg-[#58413f]'
                              }"></span>
                              <span>${item.status}</span>
                            </span>

                            <span class="font-mono text-[10px] text-[#8d7b75]">
                              #${item.id}
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- Right Actions -->
                      <div class="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[#EADFD1]/80">
                        <button
                          data-mypage-view-pass-id="${item.id}"
                          class="btn-secondary px-3.5 sm:px-4 py-2 rounded-xl font-label text-xs font-semibold flex items-center gap-1.5 shadow-2xs hover:border-[#840f16] hover:text-[#840f16] cursor-pointer"
                        >
                          <span class="material-symbols-outlined text-sm">qr_code_2</span>
                          <span>${isMm ? 'QR Pass ကြည့်ရန်' : 'QR Pass'}</span>
                        </button>

                        ${
                          item.status === 'Confirmed' || item.status === 'Pending'
                            ? `
                              <button
                                data-mypage-cancel-resv-id="${item.id}"
                                class="px-3 sm:px-4 py-2 rounded-xl text-xs font-label font-semibold text-[#840f16] hover:bg-[#840f16]/10 border border-[#840f16]/30 transition-colors cursor-pointer"
                              >
                                ${isMm ? 'ဖျက်သိမ်းရန်' : 'Cancel'}
                              </button>
                            `
                            : ''
                        }

                        ${
                          isCompleted
                            ? `
                              <button
                                data-mypage-review-resv-id="${item.id}"
                                class="btn-primary px-3.5 sm:px-4 py-2 rounded-xl font-label text-xs font-semibold flex items-center gap-1 shadow-2xs cursor-pointer"
                              >
                                <span class="material-symbols-outlined text-sm">rate_review</span>
                                <span>${isMm ? 'သုံးသပ်ချက်ရေးမည်' : 'Review'}</span>
                              </button>
                            `
                            : ''
                        }
                      </div>

                    </div>
                  `;
                })
                .join('')
        }
      </div>
    `;
  }

  function renderMyPageView(state) {
    const isMm = state.currentLanguage === 'MM';
    const myData = state.myPageData || {};
    const activeModal = state.myPageModal || 'none';
    const currentSubTab = state.myPageSubTab || 'past';
    const activeMenu = state.myPageActiveMenu || 'reservations';

    const menuItems = [
      { id: 'reservations', label: isMm ? 'စိုတ်ထားမှု မှတ်တမ်း' : 'Reservation History', icon: 'calendar_today' },
      { id: 'favorites', label: isMm ? 'အကြိုက်ဆုံး ဆိုင်များ' : 'Favorites', icon: 'favorite_border' },
      { id: 'waitlist', label: isMm ? 'လူပြည့် စောင့်ဆိုင်းစာရင်း' : 'Cancel Waitlist', icon: 'schedule' },
      { id: 'coupons', label: isMm ? 'ဘောက်ချာနှင့် ကူပွန်များ' : 'Coupons', icon: 'sell' },
      { id: 'points', label: isMm ? 'အမှတ်နှင့် အသင်းဝင်အဆင့်' : 'Points & Membership', icon: 'workspace_premium' },
      { id: 'notifications', label: isMm ? 'အသိပေးချက် စင်တာ' : 'Notification Center', icon: 'notifications' },
      { id: 'notif-settings', label: isMm ? 'အသိပေးချက် ဆက်တင်' : 'Notification Settings', icon: 'tune' },
      { id: 'announcements', label: isMm ? 'အထူး ကြေညာချက်များ' : 'Announcements', icon: 'campaign' },
      { id: 'account', label: isMm ? 'အကောင့် ဆက်တင်' : 'Account Settings', icon: 'manage_accounts' }
    ];

    const allReservations = state.reservations || [];
    let displayedReservations = allReservations;

    if (currentSubTab === 'upcoming') {
      displayedReservations = allReservations.filter(r => r.status === 'Confirmed' || r.status === 'Pending');
    } else if (currentSubTab === 'past') {
      displayedReservations = allReservations;
    }

    const isSubPageActiveOnMobile = activeMenu === 'account' || activeMenu === 'notif-settings' || activeMenu === 'reservations-view';

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 lg:space-y-8 text-left">
        
        <!-- DESKTOP HEADER (HIDDEN ON MOBILE/TABLET) -->
        <div class="hidden lg:flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 class="font-headline text-3xl sm:text-4xl font-extrabold text-[#231916] tracking-tight">
              ${isMm ? 'ကျွန်ုပ်၏ စာမျက်နှာ' : 'My Page'}
            </h1>
            <p class="font-body text-xs sm:text-sm text-[#58413f] mt-1">
              ${isMm ? 'သင်၏ စားပွဲဝိုင်း စိုတ်ထားမှုများ၊ အကြိုက်ဆုံးဆိုင်များနှင့် အသင်းဝင်အချက်အလက်များကို စီမံခန့်ခွဲပါ' : 'Manage your reservations, saved favorites, member perks, and account preferences.'}
            </p>
          </div>

          <button
            id="mypage-new-reservation-btn"
            class="btn-primary px-6 py-2.5 rounded-full font-label text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>${isMm ? 'ဝိုင်းအသစ် စိုတ်ရန်' : 'Book New Table'}</span>
            <span class="material-symbols-outlined text-sm">add</span>
          </button>
        </div>

        <!-- MAIN DUAL-COLUMN GRID -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          <!-- MOBILE/TABLET VIEW -->
          <div class="lg:hidden space-y-4">
            
            ${
              isSubPageActiveOnMobile
                ? `
                  <!-- Back to My Page Menu Bar on Mobile -->
                  <div class="flex items-center justify-between bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-3 shadow-xs">
                    <button
                      data-mypage-back="menu"
                      class="inline-flex items-center gap-2 text-xs font-label font-bold text-[#840f16] hover:text-[#680b11] cursor-pointer"
                    >
                      <span class="material-symbols-outlined text-base">arrow_back</span>
                      <span>${isMm ? 'ကျွန်ုပ်၏ စာမျက်နှာ မီနူးသို့ ပြန်သွားရန်' : 'Back to My Page'}</span>
                    </button>
                    <span class="font-label text-[11px] font-bold uppercase tracking-wider text-[#8d7b75]">
                      ${
                        activeMenu === 'account'
                          ? (isMm ? 'အကောင့် ဆက်တင်' : 'Account Settings')
                          : activeMenu === 'notif-settings'
                            ? (isMm ? 'အသိပေးချက် ဆက်တင်' : 'Notification Settings')
                            : (isMm ? 'စိုတ်ထားမှုများ' : 'Reservations')
                      }
                    </span>
                  </div>

                  <!-- Render active screen in mobile view -->
                  <div>
                    ${
                      activeMenu === 'account'
                        ? (window.YoyakuComponents.renderAccountSettingsView ? window.YoyakuComponents.renderAccountSettingsView(state) : '')
                        : activeMenu === 'notif-settings'
                          ? (window.YoyakuComponents.renderNotificationSettingsView ? window.YoyakuComponents.renderNotificationSettingsView(state) : '')
                          : ''
                    }
                  </div>
                `
                : `
            <!-- User Profile Card -->
            <div class="bg-[#FFF8F6] rounded-3xl border border-[#EADFD1] p-6 text-center shadow-sm space-y-3 relative">
              <div class="relative inline-block mx-auto">
                <img
                  src="assets/images/user_avatar.jpg"
                  alt="${myData.userName || 'alex'}"
                  onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';"
                  class="w-20 h-20 rounded-full object-cover border-4 border-[#EADFD1] mx-auto shadow-md"
                />
              </div>

              <div class="space-y-1">
                <h2 class="font-headline font-bold text-xl text-[#231916]">
                  ${isMm ? (myData.userNameMM || myData.userName || 'alex') : (myData.userName || 'alex')}
                </h2>
                <p class="font-body text-xs text-[#58413f]">
                  ${myData.userEmail || 'alex@example.com'}
                </p>
              </div>

              <div class="pt-1">
                <span class="inline-flex items-center gap-1.5 bg-[#FFF3D6] text-[#8f5d0b] border border-[#D08E1C]/40 text-xs font-label font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-2xs">
                  <span class="material-symbols-outlined text-sm text-[#D08E1C]">star</span>
                  <span>VIP Member</span>
                </span>
              </div>
            </div>

            <!-- Group 1: Primary Navigation (Reservation History) -->
            <div class="bg-[#FFF8F6] rounded-2xl border border-[#EADFD1] overflow-hidden shadow-sm">
              <button
                data-mypage-nav="reservations"
                class="w-full flex items-center justify-between p-4 text-left hover:bg-[#FBF3E2] transition-colors cursor-pointer"
              >
                <div class="flex items-center gap-3.5">
                  <div class="w-9 h-9 rounded-full bg-[#840f16]/10 text-[#840f16] flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-xl">history</span>
                  </div>
                  <span class="font-headline font-bold text-sm text-[#231916]">
                    ${isMm ? 'စိုတ်ထားမှု မှတ်တမ်း' : 'Reservation History'}
                  </span>
                </div>
                <span class="material-symbols-outlined text-lg text-[#8d7b75]">chevron_right</span>
              </button>
            </div>

            <!-- Group 2: User Activity Items -->
            <div class="bg-[#FFF8F6] rounded-2xl border border-[#EADFD1] divide-y divide-[#EADFD1] overflow-hidden shadow-sm">
              <!-- Favorites -->
              <button
                data-mypage-nav="favorites"
                class="w-full flex items-center justify-between p-4 text-left hover:bg-[#FBF3E2] transition-colors cursor-pointer"
              >
                <div class="flex items-center gap-3.5">
                  <span class="material-symbols-outlined text-xl text-[#8d7b75]">favorite_border</span>
                  <span class="font-headline font-bold text-sm text-[#231916]">${isMm ? 'အကြိုက်ဆုံး ဆိုင်များ' : 'Favorites'}</span>
                </div>
                <span class="material-symbols-outlined text-lg text-[#8d7b75]">chevron_right</span>
              </button>

              <!-- Cancel Waitlist -->
              <button
                data-mypage-nav="waitlist"
                class="w-full flex items-center justify-between p-4 text-left hover:bg-[#FBF3E2] transition-colors cursor-pointer"
              >
                <div class="flex items-center gap-3.5">
                  <span class="material-symbols-outlined text-xl text-[#8d7b75]">cancel</span>
                  <span class="font-headline font-bold text-sm text-[#231916]">${isMm ? 'လူပြည့် စောင့်ဆိုင်းစာရင်း' : 'Cancel Waitlist'}</span>
                </div>
                <span class="material-symbols-outlined text-lg text-[#8d7b75]">chevron_right</span>
              </button>

              <!-- Coupons -->
              <button
                data-mypage-nav="coupons"
                class="w-full flex items-center justify-between p-4 text-left hover:bg-[#FBF3E2] transition-colors cursor-pointer"
              >
                <div class="flex items-center gap-3.5">
                  <span class="material-symbols-outlined text-xl text-[#8d7b75]">confirmation_number</span>
                  <span class="font-headline font-bold text-sm text-[#231916]">${isMm ? 'ဘောက်ချာနှင့် ကူပွန်များ' : 'Coupons'}</span>
                </div>
                <span class="material-symbols-outlined text-lg text-[#8d7b75]">chevron_right</span>
              </button>

              <!-- Points & Membership -->
              <button
                data-mypage-nav="points"
                class="w-full flex items-center justify-between p-4 text-left hover:bg-[#FBF3E2] transition-colors cursor-pointer"
              >
                <div class="flex items-center gap-3.5">
                  <span class="material-symbols-outlined text-xl text-[#8d7b75]">loyalty</span>
                  <span class="font-headline font-bold text-sm text-[#231916]">${isMm ? 'အမှတ်နှင့် အသင်းဝင်အဆင့်' : 'Points & Membership'}</span>
                </div>
                <span class="material-symbols-outlined text-lg text-[#8d7b75]">chevron_right</span>
              </button>
            </div>

            <!-- Group 3: System & Account Settings -->
            <div class="bg-[#FFF8F6] rounded-2xl border border-[#EADFD1] divide-y divide-[#EADFD1] overflow-hidden shadow-sm">
              <!-- Notification Center -->
              <button
                data-mypage-nav="notifications"
                class="w-full flex items-center justify-between p-4 text-left hover:bg-[#FBF3E2] transition-colors cursor-pointer"
              >
                <div class="flex items-center gap-3.5">
                  <span class="material-symbols-outlined text-xl text-[#8d7b75]">notifications</span>
                  <span class="font-headline font-bold text-sm text-[#231916]">${isMm ? 'အသိပေးချက် စင်တာ' : 'Notification Center'}</span>
                </div>
                <span class="material-symbols-outlined text-lg text-[#8d7b75]">chevron_right</span>
              </button>

              <!-- Notification Settings -->
              <button
                data-mypage-nav="notif-settings"
                class="w-full flex items-center justify-between p-4 text-left hover:bg-[#FBF3E2] transition-colors cursor-pointer"
              >
                <div class="flex items-center gap-3.5">
                  <span class="material-symbols-outlined text-xl text-[#8d7b75]">tune</span>
                  <span class="font-headline font-bold text-sm text-[#231916]">${isMm ? 'အသိပေးချက် ဆက်တင်' : 'Notification Settings'}</span>
                </div>
                <span class="material-symbols-outlined text-lg text-[#8d7b75]">chevron_right</span>
              </button>

              <!-- Announcements -->
              <button
                data-mypage-nav="announcements"
                class="w-full flex items-center justify-between p-4 text-left hover:bg-[#FBF3E2] transition-colors cursor-pointer"
              >
                <div class="flex items-center gap-3.5">
                  <span class="material-symbols-outlined text-xl text-[#8d7b75]">campaign</span>
                  <span class="font-headline font-bold text-sm text-[#231916]">${isMm ? 'အထူး ကြေညာချက်များ' : 'Announcements'}</span>
                </div>
                <span class="material-symbols-outlined text-lg text-[#8d7b75]">chevron_right</span>
              </button>

              <!-- Account Settings -->
              <button
                data-mypage-nav="account"
                class="w-full flex items-center justify-between p-4 text-left hover:bg-[#FBF3E2] transition-colors cursor-pointer"
              >
                <div class="flex items-center gap-3.5">
                  <span class="material-symbols-outlined text-xl text-[#8d7b75]">manage_accounts</span>
                  <span class="font-headline font-bold text-sm text-[#231916]">${isMm ? 'အကောင့် ဆက်တင်' : 'Account Settings'}</span>
                </div>
                <span class="material-symbols-outlined text-lg text-[#8d7b75]">chevron_right</span>
              </button>
            </div>

            <!-- Get App Promo Banner -->
            <div class="bg-[#FBF3E2] rounded-2xl border border-[#EADFD1] p-4 flex items-center justify-between shadow-xs">
              <div class="space-y-0.5 text-left pr-2">
                <div class="font-headline font-bold text-xs text-[#231916]">Get the EzBookNow App</div>
                <div class="font-body text-[11px] text-[#58413f]">For a faster booking experience</div>
              </div>
              <button
                id="mypage-mobile-app-install-btn"
                class="px-4 py-1.5 rounded-lg bg-[#840f16] hover:bg-[#680b11] text-white font-label font-bold text-xs shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                Install
              </button>
            </div>

            <!-- Logout Button -->
            <button
              data-mypage-nav="logout"
              class="w-full py-3 rounded-2xl border border-[#840f16]/30 bg-[#FFF8F6] text-[#840f16] font-headline font-bold text-sm hover:bg-[#840f16]/10 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span class="material-symbols-outlined text-lg">logout</span>
              <span>${isMm ? 'အကောင့်ထွက်ရန်' : 'Logout'}</span>
            </button>
            `
            }

          </div>

          </div>

          <!-- LEFT SIDEBAR (DESKTOP ONLY) -->
          <div class="hidden lg:block lg:col-span-4 xl:col-span-3 bg-[#FBF3E2] rounded-3xl border border-[#EADFD1] p-6 space-y-6 shadow-sm">
            
            <!-- User Profile Summary -->
            <div class="flex items-center gap-3.5 pb-4 border-b border-[#EADFD1]/80">
              <img
                src="assets/images/user_avatar.jpg"
                alt="${myData.userName || 'alex'}"
                onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';"
                class="w-12 h-12 rounded-2xl object-cover border border-[#EADFD1] shadow-sm shrink-0"
              />
              <div class="space-y-0.5 min-w-0">
                <h2 class="font-headline font-bold text-base text-[#231916] truncate">
                  ${isMm ? (myData.userNameMM || myData.userName || 'alex') : (myData.userName || 'alex')}
                </h2>
                <p class="font-body text-xs text-[#58413f] truncate">
                  ${myData.userEmail || 'alex@example.com'}
                </p>
                <div class="pt-1">
                  <span class="inline-flex items-center gap-1 bg-[#D08E1C]/15 text-[#8f5d0b] border border-[#D08E1C]/30 text-[10px] font-label font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    <span class="material-symbols-outlined text-[12px] text-[#D08E1C]">workspace_premium</span>
                    <span>VIP Member</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Navigation Links -->
            <nav class="space-y-1.5">
              ${menuItems
                .map(item => {
                  const isActive = activeMenu === item.id;
                  if (isActive) {
                    return `
                      <button
                        data-mypage-nav="${item.id}"
                        class="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#840f16] text-white font-label font-bold text-xs tracking-wide shadow-sm transition-all text-left cursor-pointer"
                      >
                        <span class="material-symbols-outlined text-lg">${item.icon}</span>
                        <span class="truncate flex-1">${item.label}</span>
                        <span class="material-symbols-outlined text-sm opacity-80">chevron_right</span>
                      </button>
                    `;
                  }
                  return `
                    <button
                      data-mypage-nav="${item.id}"
                      class="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[#58413f] hover:bg-[#840f16]/8 hover:text-[#840f16] font-label font-semibold text-xs tracking-wide transition-colors text-left cursor-pointer"
                    >
                      <span class="material-symbols-outlined text-lg text-[#8d7b75]">${item.icon}</span>
                      <span class="truncate flex-1">${item.label}</span>
                    </button>
                  `;
                })
                .join('')}

              <div class="pt-3 border-t border-[#EADFD1]">
                <button
                  data-mypage-nav="logout"
                  class="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[#840f16] hover:bg-[#840f16]/10 font-label font-bold text-xs tracking-wide transition-colors text-left cursor-pointer"
                >
                  <span class="material-symbols-outlined text-lg">logout</span>
                  <span>${isMm ? 'အကောင့်ထွက်ရန်' : 'Logout'}</span>
                </button>
              </div>

              <!-- PWA Install & Offline Badge -->
              <div class="pt-3 border-t border-[#EADFD1]">
                <div class="bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-3.5 space-y-2 text-left">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-lg bg-[#840f16] text-white flex items-center justify-center">
                      <span class="material-symbols-outlined text-sm">install_mobile</span>
                    </div>
                    <span class="font-headline font-bold text-xs text-[#231916]">${isMm ? 'EzBookNow PWA အက်ပ်' : 'EzBookNow Mobile PWA'}</span>
                  </div>
                  <p class="font-body text-[11px] text-[#58413f] leading-relaxed">
                    ${isMm ? 'အော့ဖ်လိုင်း QR Pass နှင့် လျင်မြန်သော ဝိုင်းစိုတ်မှုအတွက် သင့်ဖုန်းတွင် ထည့်သွင်းပါ' : 'Instant offline passes and lightning-fast table reservations.'}
                  </p>
                  <button
                    type="button"
                    id="mypage-pwa-install-btn"
                    class="w-full py-2 px-3 rounded-xl bg-[#840f16] hover:bg-[#680b11] text-white font-label text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span class="material-symbols-outlined text-sm">download</span>
                    <span>${isMm ? 'အက်ပ် ထည့်သွင်းရန်' : 'Install App'}</span>
                  </button>
                </div>
              </div>
            </nav>

          </div>

          <!-- RIGHT MAIN CONTENT (DESKTOP ONLY OR WHEN SPECIFIC SECTION OPENED) -->
          <div class="hidden lg:block lg:col-span-8 xl:col-span-9 space-y-6">
            
            ${
              activeMenu === 'account'
                ? (window.YoyakuComponents.renderAccountSettingsView ? window.YoyakuComponents.renderAccountSettingsView(state) : '')
                : activeMenu === 'notif-settings'
                  ? (window.YoyakuComponents.renderNotificationSettingsView ? window.YoyakuComponents.renderNotificationSettingsView(state) : '')
                  : `
                  <!-- SUB-TABS (Upcoming Reservations vs Past Reservations) -->
                  <div class="flex items-center gap-8 border-b border-[#EADFD1] pb-0.5">
                    <button
                      data-subtab="upcoming"
                      class="pb-3 font-label text-xs sm:text-sm tracking-wide transition-all cursor-pointer relative ${
                        currentSubTab === 'upcoming'
                          ? 'font-bold text-[#840f16] border-b-2 border-[#840f16] -mb-[1.5px]'
                          : 'font-semibold text-[#58413f] hover:text-[#231916]'
                      }"
                    >
                      ${isMm ? 'လာမည့် စိုတ်ထားမှုများ' : 'Upcoming Reservations'}
                    </button>
                    <button
                      data-subtab="past"
                      class="pb-3 font-label text-xs sm:text-sm tracking-wide transition-all cursor-pointer relative ${
                        currentSubTab === 'past'
                          ? 'font-bold text-[#840f16] border-b-2 border-[#840f16] -mb-[1.5px]'
                          : 'font-semibold text-[#58413f] hover:text-[#231916]'
                      }"
                    >
                      ${isMm ? 'ယခင် စိုတ်ထားမှုများ' : 'Past Reservations'}
                    </button>
                  </div>

                  <!-- RESERVATION CARDS LIST -->
                  <div class="space-y-4">
                    ${
                      displayedReservations.length === 0
                        ? `
                          <div class="bg-[#FBF3E2] rounded-3xl border border-[#EADFD1] p-12 text-center space-y-4 shadow-sm">
                            <div class="w-14 h-14 bg-[#840f16]/10 text-[#840f16] rounded-full flex items-center justify-center mx-auto">
                              <span class="material-symbols-outlined text-2xl">event_busy</span>
                            </div>
                            <h3 class="font-headline text-xl font-bold text-[#231916]">
                              ${isMm ? 'စိုတ်ထားမှု မှတ်တမ်း မရှိသေးပါ' : `No ${currentSubTab} reservations found`}
                            </h3>
                            <p class="font-body text-xs sm:text-sm text-[#58413f] max-w-sm mx-auto">
                              ${isMm ? 'ရန်ကုန်မြို့ရှိ အဆင့်မြင့် စားသောက်ဆိုင်များကို ရှာဖွေပြီး စားပွဲဝိုင်း ချက်ချင်း စိုတ်ယူလိုက်ပါ' : `You have no ${currentSubTab} reservations. Browse our curated collection to book your next dining experience.`}
                            </p>
                            <button
                              id="mypage-explore-btn"
                              class="btn-primary px-6 py-2.5 rounded-full font-label text-xs font-semibold shadow-md inline-flex items-center gap-2 cursor-pointer mt-2"
                            >
                              <span>${isMm ? 'ဆိုင်များ ရှာဖွေရန်' : 'Explore Restaurants'}</span>
                              <span class="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                          </div>
                        `
                        : displayedReservations
                            .map(item => {
                              const isCompleted = (item.status || '').toLowerCase() === 'completed';
                              return `
                                <div class="bg-[#FBF3E2] rounded-3xl border border-[#EADFD1] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                                  
                                  <!-- Left: Icon & Details -->
                                  <div class="flex items-start gap-4 min-w-0">
                                    ${renderDiningPlateIcon()}

                                    <div class="space-y-1.5 min-w-0">
                                      <h3
                                        data-resv-select-id="${item.restaurantId}"
                                        class="font-headline text-lg sm:text-xl font-bold text-[#231916] hover:text-[#840f16] cursor-pointer transition-colors truncate"
                                      >
                                        ${item.restaurantName}
                                      </h3>

                                      <div class="flex items-center flex-wrap gap-x-2.5 gap-y-1 text-xs text-[#58413f] font-medium font-label">
                                        <span class="inline-flex items-center gap-1 text-[#840f16] font-semibold">
                                          <span class="material-symbols-outlined text-[15px]">calendar_today</span>
                                          <span>${item.date} at ${item.time}</span>
                                        </span>
                                        <span class="text-[#8d7b75]">·</span>
                                        <span class="inline-flex items-center gap-1">
                                          <span class="material-symbols-outlined text-[15px] text-[#8d7b75]">group</span>
                                          <span>${item.guests} ${isMm ? 'ဦး' : 'guests'}</span>
                                        </span>
                                        ${item.location ? `
                                          <span class="text-[#8d7b75] hidden sm:inline">·</span>
                                          <span class="hidden sm:inline-flex items-center gap-1 text-[#8d7b75]">
                                            <span class="material-symbols-outlined text-[14px]">location_on</span>
                                            <span class="truncate max-w-[180px]">${item.location}</span>
                                          </span>
                                        ` : ''}
                                      </div>

                                      <div class="text-[11px] text-[#8d7b75] font-mono tracking-tight pt-0.5">
                                        ID: ${item.reservationNo || item.id}
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Right: Status Badge & Action Buttons -->
                                  <div class="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end shrink-0 pt-2 md:pt-0">
                                    
                                    <!-- Status Pill -->
                                    <div>
                                      ${renderStatusPill(item.status, isMm)}
                                    </div>

                                    <!-- Action: Write a Review (for Completed) -->
                                    ${
                                      isCompleted
                                        ? `
                                          <button
                                            data-write-review-id="${item.id}"
                                            data-review-restaurant="${item.restaurantName}"
                                            class="bg-white border border-[#231916] hover:bg-[#231916] hover:text-white text-[#231916] font-label font-bold text-xs px-4 py-2 rounded-full transition-all cursor-pointer shadow-2xs"
                                          >
                                            ${isMm ? 'သုံးသပ်ချက် ရေးရန်' : 'Write a Review'}
                                          </button>
                                        `
                                        : ''
                                    }

                                    <!-- Action: Rebook with Same Conditions -->
                                    <button
                                      data-rebook-id="${item.id}"
                                      data-rebook-rest-id="${item.restaurantId}"
                                      data-rebook-rest-name="${item.restaurantName}"
                                      data-rebook-date="${item.date}"
                                      data-rebook-time="${item.time}"
                                      data-rebook-guests="${item.guests}"
                                      class="btn-primary px-4 py-2 rounded-full font-label font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                                    >
                                      <span class="material-symbols-outlined text-sm">restart_alt</span>
                                      <span>${isMm ? 'ယခင် အချက်အလက်များဖြင့် ပြန်စိုတ်ရန်' : 'Rebook with Same Conditions'}</span>
                                    </button>

                                    <!-- Action: View Pass -->
                                    <button
                                      data-mypage-view-pass-id="${item.id}"
                                      class="bg-[#FFF8F6] border border-[#EADFD1] hover:border-[#840f16] text-[#58413f] hover:text-[#840f16] font-label font-semibold text-xs px-3 py-2 rounded-full transition-colors cursor-pointer"
                                      title="${isMm ? 'QR လက်မှတ် ကြည့်ရန်' : 'View Pass'}"
                                    >
                                      <span class="material-symbols-outlined text-sm">qr_code</span>
                                    </button>

                                  </div>

                                </div>
                              `;
                            })
                            .join('')
                    }
                  </div>
                `
            }

          </div>

        </div>

        <!-- MODALS -->

        <!-- PASS / QR MODAL -->
        ${
          activeModal === 'qr_pass'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-md rounded-3xl border border-[#EADFD1] p-6 space-y-6 shadow-2xl text-center">
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <h3 class="font-headline text-lg font-bold text-[#231916]">${isMm ? 'စားပွဲဝိုင်း Check-in QR' : 'Table Check-in Pass'}</h3>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <div class="p-6 bg-white rounded-2xl border border-[#EADFD1] inline-block shadow-inner">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=YOYAKU-PASS-${state.reservations[0]?.reservationNo || '2026'}"
                      alt="QR Code"
                      class="w-44 h-44 mx-auto"
                      loading="lazy"
                    />
                  </div>

                  <div class="space-y-1">
                    <div class="font-headline font-bold text-base text-[#231916]">${state.reservations[0]?.restaurantName || 'The Glass Pavilion'}</div>
                    <p class="font-body text-xs text-[#58413f]">${isMm ? 'စားသောက်ဆိုင်သို့ ရောက်ရှိပါက ဤ QR ကုဒ်ကို ပြသပါ' : 'Present this digital pass upon arrival for instant seating.'}</p>
                  </div>

                  <button id="modal-close-btn" class="btn-primary w-full py-3 rounded-full font-label text-xs font-bold cursor-pointer">
                    ${isMm ? 'ပိတ်မည်' : 'Close Pass'}
                  </button>
                </div>
              </div>
            `
            : ''
        }

        <!-- WRITE REVIEW MODAL -->
        ${
          activeModal === 'review'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-lg rounded-3xl border border-[#EADFD1] p-6 space-y-6 shadow-2xl text-left">
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <div>
                      <h3 class="font-headline text-lg font-bold text-[#231916]">${isMm ? 'သုံးသပ်ချက် ရေးသားရန်' : 'Write a Review'}</h3>
                      <p class="font-body text-xs text-[#58413f]" id="review-modal-restaurant-name">${isMm ? 'သင်၏ စားသောက်မှု အတွေ့အကြုံကို မျှဝေပါ' : 'Share your dining experience with other guests'}</p>
                    </div>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <form id="write-review-form" class="space-y-4">
                    <div>
                      <label class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-2">
                        ${isMm ? 'အလုံးစုံ အဆင့်သတ်မှတ်ချက်' : 'Overall Rating'}
                      </label>
                      <div class="flex items-center gap-2" id="star-rating-selector">
                        <button type="button" data-star="1" class="text-amber-400 text-2xl cursor-pointer">★</button>
                        <button type="button" data-star="2" class="text-amber-400 text-2xl cursor-pointer">★</button>
                        <button type="button" data-star="3" class="text-amber-400 text-2xl cursor-pointer">★</button>
                        <button type="button" data-star="4" class="text-amber-400 text-2xl cursor-pointer">★</button>
                        <button type="button" data-star="5" class="text-amber-400 text-2xl cursor-pointer">★</button>
                        <span class="font-label text-xs font-bold text-[#D08E1C] ml-2" id="star-rating-label">5.0 - Exceptional</span>
                      </div>
                    </div>

                    <div>
                      <label class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-1">
                        ${isMm ? 'သုံးသပ်ချက် အသေးစိတ်' : 'Your Review'}
                      </label>
                      <textarea
                        id="review-text-input"
                        rows="4"
                        placeholder="${isMm ? 'အစားအသောက် အရသာ၊ ဝန်ဆောင်မှုနှင့် ဆိုင်အပြင်အဆင် အကြောင်းကို ရေးသားပါ...' : 'Share what you loved about the food, ambiance, seating, and service...'}"
                        class="w-full bg-white border border-[#EADFD1] focus:border-[#840f16] rounded-2xl p-3 font-body text-xs text-[#231916] focus:outline-none"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      class="btn-primary w-full py-3 rounded-full font-label font-bold text-xs cursor-pointer shadow-md"
                    >
                      ${isMm ? 'သုံးသပ်ချက် တင်သွင်းမည်' : 'Publish Review'}
                    </button>
                  </form>
                </div>
              </div>
            `
            : ''
        }

        <!-- WAITLIST MODAL -->
        ${
          activeModal === 'waitlist'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-lg rounded-3xl border border-[#EADFD1] p-6 space-y-6 shadow-2xl text-left">
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <div>
                      <h3 class="font-headline text-lg font-bold text-[#231916]">${isMm ? 'လူပြည့် စောင့်ဆိုင်းစာရင်း' : 'Waitlist Management'}</h3>
                      <p class="font-body text-xs text-[#58413f]">${isMm ? 'တန်းစီ စောင့်ဆိုင်းနေသော ဆိုင်များနှင့် အခြေအနေ' : 'Active table queues and estimated notification status'}</p>
                    </div>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>
                  <div class="space-y-3">
                    ${(myData.waitlists || [])
                      .map(
                        w => `
                      <div class="bg-white p-4 rounded-2xl border border-[#EADFD1] flex justify-between items-center">
                        <div class="space-y-0.5">
                          <div class="font-headline font-bold text-sm text-[#231916]">${w.restaurantName}</div>
                          <div class="font-body text-xs text-[#58413f]">${w.requestedDate} • ${w.partySize} Guests</div>
                          <div class="font-label text-[11px] text-[#104b2b] font-bold mt-1">${w.status}</div>
                        </div>
                        <button
                          data-cancel-waitlist-id="${w.id}"
                          class="px-3.5 py-1.5 rounded-full border border-[#840f16] text-[#840f16] hover:bg-[#840f16] hover:text-white font-label text-xs font-semibold cursor-pointer transition-colors"
                        >
                          ${isMm ? 'ပယ်ဖျက်မည်' : 'Cancel Queue'}
                        </button>
                      </div>
                    `
                      )
                      .join('')}
                  </div>
                </div>
              </div>
            `
            : ''
        }

        <!-- COUPONS MODAL -->
        ${
          activeModal === 'coupons'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-lg rounded-3xl border border-[#EADFD1] p-6 space-y-6 shadow-2xl text-left">
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <h3 class="font-headline text-lg font-bold text-[#231916]">${isMm ? 'ကူပွန်နှင့် လျှော့စျေးများ' : 'My Vouchers & Promo Codes'}</h3>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>
                  <div class="space-y-3">
                    ${(myData.claimedCoupons || [])
                      .map(
                        c => `
                      <div class="bg-white p-4 rounded-2xl border border-[#EADFD1] flex justify-between items-center">
                        <div class="space-y-0.5">
                          <div class="font-headline font-bold text-sm text-[#840f16]">${c.title}</div>
                          <div class="font-body text-[11px] text-[#58413f]">Valid till ${c.validTill}</div>
                        </div>
                        <button
                          data-copy-coupon="${c.code}"
                          class="btn-primary px-4 py-1.5 rounded-full font-label font-bold text-xs cursor-pointer shadow-xs"
                        >
                          ${isMm ? 'ကုဒ်ကူးမည်' : 'Copy Code'}
                        </button>
                      </div>
                    `
                      )
                      .join('')}
                  </div>
                </div>
              </div>
            `
            : ''
        }

        <!-- NOTIFICATIONS MODAL -->
        ${
          activeModal === 'notifications'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-lg rounded-3xl border border-[#EADFD1] p-6 space-y-6 shadow-2xl text-left">
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <h3 class="font-headline text-lg font-bold text-[#231916]">${isMm ? 'အသိပေးချက်များ' : 'Notification Center'}</h3>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>
                  <div class="space-y-3">
                    ${(myData.notifications || [])
                      .map(
                        n => `
                      <div class="bg-white p-4 rounded-2xl border border-[#EADFD1] flex justify-between items-center">
                        <div class="space-y-0.5">
                          <div class="font-headline font-bold text-sm text-[#231916]">${n.title}</div>
                          <div class="font-body text-[10px] text-[#8d7b75]">${n.time}</div>
                        </div>
                        ${
                          n.isUnread
                            ? `<span class="w-2.5 h-2.5 rounded-full bg-[#840f16]"></span>`
                            : ''
                        }
                      </div>
                    `
                      )
                      .join('')}
                  </div>
                </div>
              </div>
            `
            : ''
        }

        <!-- NOTIFICATION SETTINGS MODAL -->
        ${
          activeModal === 'notif-settings'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-lg rounded-3xl border border-[#EADFD1] p-6 space-y-6 shadow-2xl text-left">
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <h3 class="font-headline text-lg font-bold text-[#231916]">${isMm ? 'အသိပေးချက် ဆက်တင်များ' : 'Notification Channels'}</h3>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <div class="space-y-3">
                    <div class="bg-white p-4 rounded-2xl border border-[#EADFD1] flex justify-between items-center">
                      <div>
                        <div class="font-headline font-bold text-sm text-[#231916]">Viber Instant Reservation Passes</div>
                        <div class="font-body text-xs text-[#58413f]">Receive digital passes & arrival reminders on Viber</div>
                      </div>
                      <button
                        id="toggle-viber-btn"
                        class="px-4 py-2 rounded-full font-label text-xs font-bold cursor-pointer transition-colors ${
                          myData.viberConnected ? 'btn-primary' : 'bg-[#EADFD1] text-[#58413f]'
                        }"
                      >
                        ${myData.viberConnected ? 'Connected' : 'Connect'}
                      </button>
                    </div>

                    <div class="bg-white p-4 rounded-2xl border border-[#EADFD1] flex justify-between items-center">
                      <div>
                        <div class="font-headline font-bold text-sm text-[#231916]">Email Confirmations</div>
                        <div class="font-body text-xs text-[#58413f]">Instant receipts to ${myData.userEmail}</div>
                      </div>
                      <span class="font-label text-xs font-bold text-[#104b2b] bg-[#104b2b]/10 border border-[#104b2b]/20 px-3 py-1 rounded-full">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            `
            : ''
        }

        <!-- ANNOUNCEMENTS MODAL -->
        ${
          activeModal === 'announcements'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-lg rounded-3xl border border-[#EADFD1] p-6 space-y-6 shadow-2xl text-left">
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <h3 class="font-headline text-lg font-bold text-[#231916]">${isMm ? 'စနစ် ကြေညာချက်များ' : 'System Announcements'}</h3>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>
                  <div class="space-y-3 font-body text-xs text-[#58413f]">
                    <div class="bg-white p-4 rounded-2xl border border-[#EADFD1] space-y-1.5">
                      <div class="font-headline font-bold text-sm text-[#840f16]">Seasonal Degustation Menus Launched</div>
                      <p>Experience special monsoon wine pairings and chef degustation sets across our top-rated lakeside dining venues.</p>
                    </div>
                  </div>
                </div>
              </div>
            `
            : ''
        }

        <!-- POINTS & MEMBERSHIP MODAL -->
        ${
          activeModal === 'points'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-lg rounded-3xl border border-[#EADFD1] p-6 space-y-6 shadow-2xl text-left">
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <h3 class="font-headline text-lg font-bold text-[#231916]">${isMm ? 'အသင်းဝင် အမှတ်နှင့် အဆင့်' : 'Points & Membership Tier'}</h3>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <div class="bg-gradient-to-r from-[#231916] to-[#58413f] text-white p-6 rounded-3xl space-y-3 shadow-lg border border-[#D08E1C]/30">
                    <div class="font-label text-xs uppercase font-bold tracking-widest text-[#D08E1C]">VIP Gold Gourmet Member</div>
                    <div class="font-headline text-3xl font-extrabold text-white">2,450 PTS</div>
                    <p class="font-body text-xs text-[#EADFD1]">Earn 550 more points from table bookings to achieve Platinum Concierge Privileges.</p>
                  </div>
                </div>
              </div>
            `
            : ''
        }

        <!-- PHONE OTP VERIFICATION MODAL -->
        ${
          activeModal === 'phone_otp'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-md rounded-3xl border border-[#EADFD1] p-6 space-y-6 shadow-2xl text-left">
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-full bg-[#D08E1C]/10 text-[#D08E1C] flex items-center justify-center">
                        <span class="material-symbols-outlined text-lg">sms</span>
                      </div>
                      <h3 class="font-headline text-lg font-bold text-[#231916]">${isMm ? 'ဖုန်းနံပါတ် OTP အတည်ပြုခြင်း' : 'Verify Phone Number (OTP)'}</h3>
                    </div>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <div class="space-y-3">
                    <p class="font-body text-xs text-[#58413f] leading-relaxed">
                      ${isMm ? `လျှို့ဝှက် ဂဏန်း ၆ လုံးပါ SMS ကို <strong class="text-[#231916]">${myData.userPhone || ''}</strong> သို့ ပေးပို့ထားပါသည်။` : `We have sent a 6-digit verification code to <strong class="text-[#231916]">${myData.userPhone || ''}</strong> via SMS.`}
                    </p>

                    <div class="p-3 bg-[#FFF3D6] rounded-2xl border border-[#EADFD1] flex items-center justify-between text-xs">
                      <span class="text-[#58413f] font-mono">${isMm ? 'နမူနာကုဒ်:' : 'Demo Code:'} <strong>123456</strong></span>
                      <button id="u20-autofill-otp-btn" type="button" class="text-[#840f16] font-bold underline cursor-pointer hover:opacity-80">
                        ${isMm ? 'အလိုအလျောက် ထည့်ရန်' : 'Auto Fill'}
                      </button>
                    </div>

                    <form id="u20-otp-form" class="space-y-4 pt-2">
                      <div>
                        <label class="font-label text-xs font-bold text-[#231916] uppercase block mb-1.5">${isMm ? 'ဂဏန်း ၆ လုံး ထည့်သွင်းပါ' : 'Enter 6-Digit Code'}</label>
                        <input
                          type="text"
                          id="u20-otp-input"
                          maxlength="6"
                          placeholder="123456"
                          class="w-full bg-white border border-[#EADFD1] rounded-2xl px-4 py-3 text-center tracking-[0.5em] font-mono text-xl font-bold text-[#231916] focus:outline-none focus:border-[#840f16]"
                          required
                        />
                      </div>

                      <div class="flex items-center justify-between font-label text-xs text-[#58413f]">
                        <span>${isMm ? 'SMS မရောက်ရှိသေးပါက' : 'Didn\'t receive SMS?'}</span>
                        <button type="button" id="u20-resend-otp-btn" class="font-bold text-[#840f16] hover:underline cursor-pointer">
                          ${isMm ? 'ကုဒ် အသစ်ပြန်ပို့ရန်' : 'Resend Code'}
                        </button>
                      </div>

                      <div class="flex gap-3 pt-2">
                        <button type="button" id="modal-close-btn" class="w-1/2 py-2.5 rounded-full border border-[#EADFD1] bg-white font-label font-bold text-xs text-[#58413f] hover:bg-[#FBF3E2] cursor-pointer">
                          ${isMm ? 'မလုပ်တော့ပါ' : 'Cancel'}
                        </button>
                        <button type="submit" class="w-1/2 btn-primary py-2.5 rounded-full font-label font-bold text-xs cursor-pointer shadow-md">
                          ${isMm ? 'အတည်ပြုမည်' : 'Verify & Save'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            `
            : ''
        }

        <!-- WITHDRAWAL CONFIRMATION MODAL -->
        ${
          activeModal === 'confirm_withdrawal'
            ? `
              <div class="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-lg rounded-3xl border border-[#840f16]/30 p-6 space-y-6 shadow-2xl text-left">
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-full bg-[#840f16]/15 text-[#840f16] flex items-center justify-center">
                        <span class="material-symbols-outlined text-lg">warning</span>
                      </div>
                      <h3 class="font-headline text-lg font-bold text-[#840f16]">${isMm ? 'အကောင့် အပြီးတိုင် ဖျက်သိမ်းခြင်း' : 'Permanent Account Withdrawal'}</h3>
                    </div>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <div class="space-y-4">
                    <div class="p-4 bg-[#840f16]/10 rounded-2xl border border-[#840f16]/20 text-[#840f16] text-xs font-body leading-relaxed space-y-2">
                      <div class="font-bold flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-sm">error</span>
                        <span>${isMm ? 'သတိပေးချက်' : 'Irreversible Action Notice'}</span>
                      </div>
                      <p>
                        ${isMm
                          ? 'သင်၏ EzBookNow အကောင့်ကို ဖျက်သိမ်းလိုက်ပါက လာမည့် စားပွဲဝိုင်း စိုတ်ထားမှုများ (Upcoming Reservations) အားလုံး အလိုအလျောက် ပယ်ဖျက်သွားမည် ဖြစ်ပြီး စုဆောင်းထားသော Points နှင့် VIP အဆင့်များ ပျက်ပြယ်သွားမည် ဖြစ်ပါသည်။'
                          : 'Withdrawing your EzBookNow account will automatically cancel all upcoming table reservations and immediately forfeit your accumulated gourmet points and membership status.'}
                      </p>
                    </div>

                    <div class="p-3.5 bg-white rounded-2xl border border-[#EADFD1] text-xs text-[#58413f] space-y-1">
                      <div class="font-semibold text-[#231916]">${isMm ? 'PDPA လိုက်နာမှု အချက်အလက်:' : 'PDPA Compliance:'}</div>
                      <div>${isMm ? 'သင်၏ ကိုယ်ရေးအချက်အလက်များကို ရက် ၃၀ ကြာပြီးနောက် စနစ်အတွင်းမှ အပြီးတိုင် အမည်ဖျက် (Anonymize) ပေးပါမည်။' : 'Personal identifiable data will be anonymized within 30 days pursuant to data privacy protection protocols.'}</div>
                    </div>

                    <div class="flex gap-3 pt-2">
                      <button type="button" id="modal-close-btn" class="w-1/2 py-3 rounded-full border border-[#EADFD1] bg-white font-label font-bold text-xs text-[#58413f] hover:bg-[#FBF3E2] cursor-pointer">
                        ${isMm ? 'အကောင့် ဆက်သုံးမည်' : 'Keep Account'}
                      </button>
                      <button type="button" id="u20-confirm-withdraw-final-btn" class="w-1/2 bg-[#840f16] hover:bg-[#680b11] text-white py-3 rounded-full font-label font-bold text-xs cursor-pointer shadow-md transition-all">
                        ${isMm ? 'အကောင့် အပြီးတိုင် ဖျက်မည်' : 'Confirm Withdrawal'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `
            : ''
        }

        <!-- ACCOUNT SETTINGS MODAL -->
        ${
          activeModal === 'account'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-lg rounded-3xl border border-[#EADFD1] p-6 space-y-6 shadow-2xl text-left">
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <h3 class="font-headline text-lg font-bold text-[#231916]">${isMm ? 'အကောင့် ဆက်တင်' : 'Account Settings'}</h3>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <form id="account-settings-form" class="space-y-4">
                    <div>
                      <label class="font-label text-xs font-bold text-[#231916] uppercase block mb-1">Full Name</label>
                      <input type="text" id="acc-name-en" value="${myData.userName || 'alex'}" class="w-full bg-white border border-[#EADFD1] rounded-2xl px-4 py-2.5 font-body text-xs text-[#231916] focus:outline-none focus:border-[#840f16]" />
                    </div>
                    <div>
                      <label class="font-label text-xs font-bold text-[#231916] uppercase block mb-1">Email</label>
                      <input type="email" id="acc-email" value="${myData.userEmail || 'alex@example.com'}" class="w-full bg-white border border-[#EADFD1] rounded-2xl px-4 py-2.5 font-body text-xs text-[#231916] focus:outline-none focus:border-[#840f16]" />
                    </div>
                    <div>
                      <label class="font-label text-xs font-bold text-[#231916] uppercase block mb-1">Phone</label>
                      <input type="tel" id="acc-phone" value="${myData.userPhone || '+95 9 791 234 567'}" class="w-full bg-white border border-[#EADFD1] rounded-2xl px-4 py-2.5 font-body text-xs text-[#231916] focus:outline-none focus:border-[#840f16]" />
                    </div>
                    <button type="submit" class="btn-primary w-full py-3 rounded-full font-label font-bold text-xs cursor-pointer shadow-md">
                      ${isMm ? 'ပြောင်းလဲမှုများ သိမ်းမည်' : 'Save Changes'}
                    </button>
                  </form>
                </div>
              </div>
            `
            : ''
        }

      </div>
    `;
  }

  function attachMyPageViewEvents(containerElement = document) {
    // Sub-tab switching
    containerElement.querySelectorAll('[data-subtab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sub = e.currentTarget.getAttribute('data-subtab');
        store.setMyPageSubTab(sub);
      });
    });

    // Book new table button
    const newBookBtn = containerElement.querySelector('#mypage-new-reservation-btn');
    if (newBookBtn) {
      newBookBtn.addEventListener('click', () => {
        store.setSelectedRestaurant(null);
        store.setActiveTab('discover');
      });
    }

    // PWA Install Button
    const pwaInstallBtn = containerElement.querySelector('#mypage-pwa-install-btn');
    if (pwaInstallBtn) {
      pwaInstallBtn.addEventListener('click', () => {
        if (window.PwaManager) {
          window.PwaManager.promptInstall();
        } else {
          store.openInfoModal('pwa_install');
        }
      });
    }

    const mobileAppInstallBtn = containerElement.querySelector('#mypage-mobile-app-install-btn');
    if (mobileAppInstallBtn) {
      mobileAppInstallBtn.addEventListener('click', () => {
        if (window.PwaManager) {
          window.PwaManager.promptInstall();
        } else {
          store.openInfoModal('pwa_install');
        }
      });
    }

    // Mobile Back to Menu button
    containerElement.querySelectorAll('[data-mypage-back]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.setMyPageActiveMenu('menu');
      });
    });

    // Sidebar navigation
    containerElement.querySelectorAll('[data-mypage-nav]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const navId = e.currentTarget.getAttribute('data-mypage-nav');
        if (navId === 'reservations') {
          store.setMyPageActiveMenu('reservations-view');
        } else if (navId === 'account') {
          store.setMyPageActiveMenu('account');
        } else if (navId === 'notif-settings') {
          store.setMyPageActiveMenu('notif-settings');
        } else if (navId === 'favorites') {
          store.setActiveTab('favorites');
        } else if (navId === 'logout') {
          const isMm = store.getState().currentLanguage === 'MM';
          store.toggleAuth(false);
          store.setActiveTab('discover');
          store.showToast(isMm ? 'အကောင့်ထွက်ပြီးပါပြီ' : 'Logged out successfully.');
        } else {
          store.setMyPageActiveMenu(navId);
          store.openMyPageModal(navId);
        }
      });
    });

    // If Account settings view is active, attach U-20 events
    const state = store.getState();
    if (state.myPageActiveMenu === 'account' && window.YoyakuComponents.attachAccountSettingsEvents) {
      window.YoyakuComponents.attachAccountSettingsEvents(containerElement);
    }

    // If Notification settings view is active, attach U-17 events
    if (state.myPageActiveMenu === 'notif-settings' && window.YoyakuComponents.attachNotificationSettingsEvents) {
      window.YoyakuComponents.attachNotificationSettingsEvents(containerElement);
    }

    // OTP Modal: Autofill button
    const autofillOtpBtn = containerElement.querySelector('#u20-autofill-otp-btn');
    if (autofillOtpBtn) {
      autofillOtpBtn.addEventListener('click', () => {
        const otpInput = containerElement.querySelector('#u20-otp-input');
        if (otpInput) otpInput.value = '123456';
      });
    }

    // OTP Modal: Resend SMS
    const resendOtpBtn = containerElement.querySelector('#u20-resend-otp-btn');
    if (resendOtpBtn) {
      resendOtpBtn.addEventListener('click', () => {
        store.showToast('New verification code sent via SMS!');
      });
    }

    // OTP Modal: Submit form
    const otpForm = containerElement.querySelector('#u20-otp-form');
    if (otpForm) {
      otpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const otpInput = containerElement.querySelector('#u20-otp-input');
        const code = otpInput ? otpInput.value.trim() : '';
        const res = store.verifyPhoneNumberOtp(code);
        if (res.success) {
          store.closeMyPageModal();
          store.showToast(res.message);
        } else {
          store.showToast(res.message);
        }
      });
    }

    // Withdrawal Modal: Final Confirm
    const confirmWithdrawBtn = containerElement.querySelector('#u20-confirm-withdraw-final-btn');
    if (confirmWithdrawBtn) {
      confirmWithdrawBtn.addEventListener('click', () => {
        const res = store.withdrawAccount('Permanent withdrawal confirmed');
        store.closeMyPageModal();
        store.showToast(res.message);
      });
    }

    // Explore button in empty state
    const exploreBtn = containerElement.querySelector('#mypage-explore-btn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        store.setActiveTab('discover');
      });
    }

    // Restaurant title click -> view restaurant detail
    containerElement.querySelectorAll('[data-resv-select-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        const restId = e.currentTarget.getAttribute('data-resv-select-id');
        const { RESTAURANTS_DATA } = window.YoyakuData;
        const target = RESTAURANTS_DATA.find(r => r.id === restId) || RESTAURANTS_DATA[0];
        if (target) store.setSelectedRestaurant(target);
      });
    });

    // View QR Pass modal
    containerElement.querySelectorAll('[data-mypage-view-pass-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.openMyPageModal('qr_pass');
      });
    });

    // Rebook with same conditions
    containerElement.querySelectorAll('[data-rebook-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const restId = e.currentTarget.getAttribute('data-rebook-rest-id');
        const restName = e.currentTarget.getAttribute('data-rebook-rest-name');
        const date = e.currentTarget.getAttribute('data-rebook-date');
        const time = e.currentTarget.getAttribute('data-rebook-time');
        const guests = parseInt(e.currentTarget.getAttribute('data-rebook-guests') || '2', 10);

        const { RESTAURANTS_DATA } = window.YoyakuData;
        let targetRestaurant = RESTAURANTS_DATA.find(r => r.id === restId || r.name.toLowerCase() === (restName || '').toLowerCase());
        
        if (!targetRestaurant) {
          targetRestaurant = {
            ...RESTAURANTS_DATA[0],
            name: restName || 'The Glass Pavilion'
          };
        }

        store.openBookingModal(targetRestaurant, date, time, guests);
        store.showToast(`Rebooking at ${targetRestaurant.name} with ${guests} guests...`);
      });
    });

    // Write review button
    containerElement.querySelectorAll('[data-write-review-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const restName = e.currentTarget.getAttribute('data-review-restaurant');
        store.openMyPageModal('review');
        setTimeout(() => {
          const titleElem = document.getElementById('review-modal-restaurant-name');
          if (titleElem && restName) {
            titleElem.innerText = `Reviewing: ${restName}`;
          }
        }, 10);
      });
    });

    // Star rating picker
    let selectedRating = 5;
    const ratingLabels = {
      1: '1.0 - Poor',
      2: '2.0 - Fair',
      3: '3.0 - Good',
      4: '4.0 - Very Good',
      5: '5.0 - Exceptional'
    };

    containerElement.querySelectorAll('#star-rating-selector [data-star]').forEach(starBtn => {
      starBtn.addEventListener('click', (e) => {
        const rating = parseInt(e.currentTarget.getAttribute('data-star'), 10);
        selectedRating = rating;
        const parent = document.getElementById('star-rating-selector');
        if (parent) {
          parent.querySelectorAll('[data-star]').forEach(b => {
            const starVal = parseInt(b.getAttribute('data-star'), 10);
            b.className = starVal <= rating ? 'text-amber-400 text-2xl cursor-pointer' : 'text-gray-300 text-2xl cursor-pointer';
          });
          const lbl = document.getElementById('star-rating-label');
          if (lbl) lbl.innerText = ratingLabels[rating] || `${rating}.0`;
        }
      });
    });

    // Review submit
    const reviewForm = containerElement.querySelector('#write-review-form');
    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        store.closeMyPageModal();
        store.showToast('Thank you! Your review has been submitted.');
      });
    }

    // Cancel waitlist queue
    containerElement.querySelectorAll('[data-cancel-waitlist-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const wId = e.currentTarget.getAttribute('data-cancel-waitlist-id');
        store.updateMyPageData(data => ({
          ...data,
          waitlists: (data.waitlists || []).filter(w => w.id !== wId)
        }));
        store.showToast('Waitlist queue cancelled.');
      });
    });

    // Modal close button
    containerElement.querySelectorAll('#modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        store.closeMyPageModal();
      });
    });

    // Copy coupon code
    containerElement.querySelectorAll('[data-copy-coupon]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = e.currentTarget.getAttribute('data-copy-coupon');
        navigator.clipboard.writeText(code);
        e.currentTarget.innerText = 'Copied!';
        store.showToast('Coupon code copied to clipboard!');
      });
    });

    // Toggle Viber
    const toggleViberBtn = containerElement.querySelector('#toggle-viber-btn');
    if (toggleViberBtn) {
      toggleViberBtn.addEventListener('click', () => {
        store.updateMyPageData(data => ({ ...data, viberConnected: !data.viberConnected }));
        store.showToast('Viber settings updated.');
      });
    }

    // Account settings form submit
    const accForm = containerElement.querySelector('#account-settings-form');
    if (accForm) {
      accForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameEn = containerElement.querySelector('#acc-name-en')?.value || 'alex';
        const email = containerElement.querySelector('#acc-email')?.value || 'alex@example.com';
        const phone = containerElement.querySelector('#acc-phone')?.value || '+95 9 791 234 567';

        store.updateMyPageData(data => ({
          ...data,
          userName: nameEn,
          userEmail: email,
          userPhone: phone
        }));

        store.closeMyPageModal();
        store.showToast('Profile updated successfully!');
      });
    }
  }

  window.YoyakuComponents.renderMyPageView = renderMyPageView;
  window.YoyakuComponents.attachMyPageViewEvents = attachMyPageViewEvents;
})();
