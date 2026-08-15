(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;



  function renderTopNavBar(state) {
    const isMm = state.currentLanguage === 'MM';
    const isMyPageActive = state.activeTab === 'mypage';
    const unreadNotifsCount = state.myPageData.notifications.filter(n => n.isUnread).length;

    return `
      <header class="sticky top-0 z-40 bg-[#FFF7E8]/95 backdrop-blur-md border-b border-[#EADFD1] transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <!-- Brand Logo -->
          <button id="nav-brand-logo" class="flex items-center gap-3 cursor-pointer group text-left shrink-0">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#840f16] to-[#a52a2a] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
              <span class="material-symbols-outlined text-2xl font-bold">restaurant</span>
            </div>
            <span class="font-headline text-2xl font-extrabold tracking-tight text-[#231916]">
              Yoyaku
            </span>
          </button>



          <!-- Header Actions: Owner Link, Check Booking, Language & Auth -->
          <div class="flex items-center gap-2 sm:gap-3">
            
            <!-- Restaurant Owners Application Link -->
            <button
              id="nav-owner-link"
              class="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#840f16]/5 border border-[#840f16]/20 font-label text-[11px] font-bold text-[#840f16] hover:bg-[#840f16] hover:text-white transition-all cursor-pointer"
              title="${isMm ? 'ဆိုင်ပိုင်ရှင်များ' : 'For Restaurant Owners'}"
            >
              <span class="material-symbols-outlined text-sm">storefront</span>
              <span class="truncate">${isMm ? 'ဆိုင်ပိုင်ရှင်များ' : 'For Restaurant Owners'}</span>
            </button>

            <!-- Check Guest Booking Link -->
            <button
              id="nav-check-booking-link"
              class="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FBF3E2] border border-[#EADFD1] font-label text-[11px] font-bold text-[#58413f] hover:text-[#840f16] hover:border-[#840f16] transition-all cursor-pointer"
              title="${isMm ? 'စိုတ်ထားမှု စစ်ဆေးရန်' : 'Check Reservation'}"
            >
              <span class="material-symbols-outlined text-sm">confirmation_number</span>
              <span class="truncate">${isMm ? 'စိုတ်ထားမှု စစ်ဆေးရန်' : 'Check Reservation'}</span>
            </button>

            <!-- Language Selector Switcher -->
            <div class="relative inline-block text-left">
              <button
                id="lang-dropdown-btn"
                class="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-[#FBF3E2] border border-[#EADFD1] font-label text-xs font-bold text-[#58413f] hover:text-[#231916] hover:border-[#840f16] transition-colors cursor-pointer"
              >
                <span class="material-symbols-outlined text-base text-[#840f16]">language</span>
                <span>${state.currentLanguage === 'EN' ? 'EN' : 'မြန်မာ'}</span>
                <span class="material-symbols-outlined text-sm">expand_more</span>
              </button>

              <!-- Dropdown Menu -->
              <div
                id="lang-dropdown-menu"
                class="hidden absolute right-0 mt-2 w-36 rounded-2xl bg-[#FFF7E8] border border-[#EADFD1] shadow-xl z-50 overflow-hidden py-1"
              >
                <button
                  data-lang="EN"
                  class="w-full text-left px-4 py-2 font-label text-xs font-bold flex items-center justify-between cursor-pointer hover:bg-[#FBF3E2] ${
                    state.currentLanguage === 'EN' ? 'text-[#840f16]' : 'text-[#58413f]'
                  }"
                >
                  <span>English (EN)</span>
                  ${state.currentLanguage === 'EN' ? '<span class="material-symbols-outlined text-sm">check</span>' : ''}
                </button>
                <button
                  data-lang="MM"
                  class="w-full text-left px-4 py-2 font-label text-xs font-bold flex items-center justify-between cursor-pointer hover:bg-[#FBF3E2] ${
                    state.currentLanguage === 'MM' ? 'text-[#840f16]' : 'text-[#58413f]'
                  }"
                >
                  <span>မြန်မာ (MM)</span>
                  ${state.currentLanguage === 'MM' ? '<span class="material-symbols-outlined text-sm">check</span>' : ''}
                </button>
              </div>
            </div>

            ${state.isAuthenticated ? `
              <!-- Notifications Bell Icon -->
              <button
                id="nav-notif-btn"
                class="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FBF3E2] border border-[#EADFD1] hover:border-[#840f16] flex items-center justify-center text-[#58413f] hover:text-[#840f16] transition-colors cursor-pointer shrink-0"
                title="${isMm ? 'အသိပေးချက်များ' : 'Notifications'}"
              >
                <span class="material-symbols-outlined text-xl">notifications</span>
                ${unreadNotifsCount > 0 ? `
                  <span class="absolute -top-1 -right-1 w-4 h-4 bg-[#840f16] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    ${unreadNotifsCount}
                  </span>
                ` : ''}
              </button>

              <!-- Profile Avatar & Dropdown Popup -->
              <div class="relative inline-block text-left">
                <button
                  id="nav-profile-menu-btn"
                  class="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 transition-all cursor-pointer shrink-0 flex items-center justify-center font-headline font-bold text-sm bg-[#840f16] text-white ${
                    isMyPageActive
                      ? 'border-[#840f16] ring-2 ring-[#840f16]/40 shadow-md'
                      : 'border-[#EADFD1] hover:border-[#840f16]'
                  }"
                  title="${isMm ? (state.myPageData.userNameMM || state.myPageData.userName || 'Profile') : (state.myPageData.userName || 'Profile')}"
                >
                  <span class="uppercase">${(state.myPageData.userName || 'a').charAt(0)}</span>
                </button>

                <!-- Profile Dropdown Popup Menu -->
                <div
                  id="nav-profile-dropdown-menu"
                  class="hidden absolute right-0 mt-2.5 w-60 rounded-2xl bg-white border border-[#EADFD1] shadow-2xl z-50 overflow-hidden py-2 text-left"
                >
                  <!-- User Header -->
                  <div class="px-4 py-2.5">
                    <div class="font-headline font-bold text-sm text-[#231916] truncate">
                      ${isMm ? (state.myPageData.userNameMM || state.myPageData.userName || 'alex') : (state.myPageData.userName || 'alex')}
                    </div>
                    <div class="font-body text-xs text-[#8d7b75] truncate mt-0.5">
                      ${state.myPageData.userEmail || 'alex@example.com'}
                    </div>
                  </div>

                  <div class="border-t border-[#EADFD1] my-1.5"></div>

                  <!-- My Page Option -->
                  <button
                    id="profile-dropdown-mypage-btn"
                    class="w-full text-left px-4 py-2.5 font-label text-xs font-bold text-[#231916] hover:bg-[#FBF3E2] hover:text-[#840f16] flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-lg text-[#58413f]">person</span>
                    <span>${isMm ? 'ကျွန်ုပ်၏ စာမျက်နှာ' : 'My Page'}</span>
                  </button>

                  <div class="border-t border-[#EADFD1] my-1.5"></div>

                  <!-- Logout Option -->
                  <button
                    id="profile-dropdown-logout-btn"
                    class="w-full text-left px-4 py-2.5 font-label text-xs font-bold text-[#840f16] hover:bg-[#840f16]/10 flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-lg">logout</span>
                    <span>${isMm ? 'အကောင့်ထွက်ရန်' : 'Logout'}</span>
                  </button>
                </div>
              </div>
            ` : `
              <!-- Login / Sign Up buttons when unauthenticated -->
              <button
                id="nav-login-btn"
                class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#840f16] text-[#840f16] font-label text-xs font-bold hover:bg-[#840f16] hover:text-white transition-all cursor-pointer"
              >
                ${isMm ? 'အကောင့်ဝင်ရန်' : 'Login'}
              </button>
              <button
                id="nav-signup-btn"
                class="hidden sm:inline-block px-4 py-2 rounded-full bg-[#840f16] text-white font-label text-xs font-bold hover:bg-[#680b11] shadow-sm transition-all cursor-pointer"
              >
                ${isMm ? 'အကောင့်ဖွင့်ရန်' : 'Sign Up'}
              </button>
            `}

          </div>
        </div>
      </header>
    `;
  }

  function attachTopNavBarEvents() {
    // Brand logo
    const logo = document.getElementById('nav-brand-logo');
    if (logo) {
      logo.addEventListener('click', () => {
        store.setSelectedRestaurant(null);
        store.setActiveTab('discover');
      });
    }

    // Owner application link
    const ownerBtn = document.getElementById('nav-owner-link');
    if (ownerBtn) {
      ownerBtn.addEventListener('click', () => {
        store.openInfoModal('owner_application');
      });
    }

    // Check booking link
    const checkBtn = document.getElementById('nav-check-booking-link');
    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        store.openInfoModal('check_guest_booking');
      });
    }

    // Notifications button
    const notifBtn = document.getElementById('nav-notif-btn');
    if (notifBtn) {
      notifBtn.addEventListener('click', () => {
        store.openInfoModal('notifications');
      });
    }

    // Login / Signup buttons
    const loginBtn = document.getElementById('nav-login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        store.openInfoModal('auth');
      });
    }

    const signupBtn = document.getElementById('nav-signup-btn');
    if (signupBtn) {
      signupBtn.addEventListener('click', () => {
        store.openInfoModal('auth');
      });
    }

    // Nav tabs
    document.querySelectorAll('[data-nav-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-nav-tab');
        store.setSelectedRestaurant(null);
        store.setActiveTab(tab);
      });
    });

    // Profile dropdown toggle
    const profileBtn = document.getElementById('nav-profile-menu-btn');
    const profileMenu = document.getElementById('nav-profile-dropdown-menu');
    if (profileBtn && profileMenu) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close language dropdown if open
        if (langMenu) langMenu.classList.add('hidden');
        profileMenu.classList.toggle('hidden');
      });

      profileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      document.addEventListener('click', () => {
        profileMenu.classList.add('hidden');
      });
    }

    // Profile Dropdown: My Page link
    const profileMyPageBtn = document.getElementById('profile-dropdown-mypage-btn');
    if (profileMyPageBtn) {
      profileMyPageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileMenu) profileMenu.classList.add('hidden');
        store.setSelectedRestaurant(null);
        store.setActiveTab('mypage');
        store.setMyPageActiveMenu('reservations');
      });
    }

    // Profile Dropdown: Logout link
    const profileLogoutBtn = document.getElementById('profile-dropdown-logout-btn');
    if (profileLogoutBtn) {
      profileLogoutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileMenu) profileMenu.classList.add('hidden');
        const isMm = store.getState().currentLanguage === 'MM';
        store.toggleAuth(false);
        store.setActiveTab('discover');
        store.showToast(isMm ? 'အကောင့်ထွက်ပြီးပါပြီ' : 'Logged out successfully');
      });
    }

    // Language dropdown toggle
    const langBtn = document.getElementById('lang-dropdown-btn');
    const langMenu = document.getElementById('lang-dropdown-menu');
    if (langBtn && langMenu) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileMenu) profileMenu.classList.add('hidden');
        langMenu.classList.toggle('hidden');
      });

      langMenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      document.addEventListener('click', () => {
        langMenu.classList.add('hidden');
      });
    }

    // Language item select
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang');
        store.setLanguage(lang);
      });
    });
  }


  window.YoyakuComponents.renderTopNavBar = renderTopNavBar;
  window.YoyakuComponents.attachTopNavBarEvents = attachTopNavBarEvents;
})();
