(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;



  function renderReservationsListView(state) {
    const isMm = state.currentLanguage === 'MM';
    const reservations = state.reservations;

    return `
      <div class="space-y-8 pb-28 sm:pb-16 text-left max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        <!-- HEADER -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#EADFD1] pb-6">
          <div>
            <h1 class="font-headline text-3xl font-extrabold text-[#231916]">
              ${isMm ? 'သင်၏ ဝိုင်စိုတ်ထားမှုများ' : 'Your Reservations'}
            </h1>
            <p class="font-body text-xs sm:text-sm text-[#58413f] mt-1">
              ${isMm ? 'စိုတ်ထားသော စားပွဲဝိုင်းများကို ကြည့်ရှုစစ်ဆေးပြီး Check-in QR ပြသနိုင်ပါသည်' : 'Manage your upcoming table bookings, view instant passes, and check arrival details.'}
            </p>
          </div>

          <button
            id="resv-book-new-btn"
            class="btn-primary px-6 py-3 rounded-full font-label text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>${isMm ? 'ဝိုင်းအသစ် စိုတ်ရန်' : 'Book New Table'}</span>
            <span class="material-symbols-outlined text-sm">add</span>
          </button>
        </div>

        <!-- RESERVATIONS LIST OR EMPTY STATE -->
        ${
          reservations.length === 0
            ? `
              <div class="bg-[#FBF3E2] rounded-3xl p-12 border border-[#EADFD1] text-center space-y-4 shadow-sm my-8">
                <div class="w-16 h-16 bg-[#840f16]/10 text-[#840f16] rounded-full flex items-center justify-center mx-auto">
                  <span class="material-symbols-outlined text-3xl">calendar_today</span>
                </div>
                <h3 class="font-headline text-2xl font-bold text-[#231916]">No active reservations yet</h3>
                <p class="font-body text-xs sm:text-sm text-[#58413f] max-w-md mx-auto">
                  Discover exquisite venues across Yangon and confirm your table in seconds.
                </p>
                <button
                  id="resv-empty-discover-btn"
                  class="btn-primary px-8 py-3.5 rounded-full font-label text-xs font-semibold shadow-md inline-flex items-center gap-2 cursor-pointer mt-2"
                >
                  <span>Explore Venues</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            `
            : `
              <div class="space-y-6">
                ${reservations
                  .map(
                    b => `
                  <div class="bg-[#FBF3E2] rounded-3xl border border-[#EADFD1] p-6 shadow-md hover:shadow-lg transition-all flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                    
                    <div class="flex gap-4 items-start">
                      <div class="w-24 h-24 rounded-2xl overflow-hidden border border-[#EADFD1] shrink-0">
                        <img src="${b.restaurantImage}" alt="${b.restaurantName}" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';" class="w-full h-full object-cover" />
                      </div>
                      
                      <div class="space-y-1">
                        <div class="flex items-center gap-2">
                          <span class="bg-[#104b2b] text-white font-label text-[10px] font-bold uppercase px-2 py-0.5 rounded-md">
                            ${b.status}
                          </span>
                          <span class="font-label text-xs font-bold text-[#58413f] bg-white/80 px-2 py-0.5 rounded-full border border-[#EADFD1]">
                            ${b.reservationNo}
                          </span>
                        </div>

                        <h3
                          data-resv-select-id="${b.restaurantId}"
                          class="font-headline text-xl font-bold text-[#231916] hover:text-[#840f16] cursor-pointer transition-colors"
                        >
                          ${b.restaurantName}
                        </h3>

                        <p class="font-body text-xs text-[#58413f] flex items-center gap-1">
                          <span class="material-symbols-outlined text-sm">location_on</span>
                          <span>${b.location}</span>
                        </p>

                        <div class="font-label text-xs font-bold text-[#840f16] pt-1">
                          ${b.date} at ${b.time} • ${b.guests} Guests
                        </div>
                      </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                      <button
                        data-resv-view-pass-id="${b.id}"
                        class="btn-primary px-5 py-2.5 rounded-full font-label text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span class="material-symbols-outlined text-sm">qr_code_2</span>
                        <span>View Pass</span>
                      </button>

                      <button
                        data-resv-cancel-id="${b.id}"
                        class="px-5 py-2.5 rounded-full bg-[#FFF8F6] border border-[#EADFD1] font-label text-xs font-semibold text-[#840f16] hover:bg-[#840f16] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                      >
                        <span>Cancel</span>
                      </button>
                    </div>

                  </div>
                `
                  )
                  .join('')}
              </div>
            `
        }

        <!-- QR PASS INSPECTION MODAL -->
        ${
          state.inspectedPassBooking
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF7E8] w-full max-w-md rounded-3xl border border-[#EADFD1] shadow-2xl overflow-hidden p-6 text-center space-y-6">
                  
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <div class="font-label text-xs font-bold text-[#840f16] uppercase tracking-wider">
                      Official Check-In Pass
                    </div>
                    <button id="resv-modal-close-btn" class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#58413f] hover:text-[#840f16] cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <div class="space-y-1">
                    <h3 class="font-headline text-xl font-bold text-[#231916]">
                      ${state.inspectedPassBooking.restaurantName}
                    </h3>
                    <p class="font-body text-xs text-[#58413f]">
                      Pass #${state.inspectedPassBooking.reservationNo}
                    </p>
                  </div>

                  <!-- QR Image Box -->
                  <div class="p-4 bg-[#231916] rounded-2xl inline-block shadow-lg qr-glow my-2">
                    <img
                      src="${window.YoyakuPrototype.createQrDataUri(`YOYAKU-${state.inspectedPassBooking.reservationNo}`)}"
                      alt="QR Pass"
                      referrerpolicy="no-referrer"
                      loading="lazy"
                      class="w-40 h-40 object-contain mx-auto"
                    />
                  </div>

                  <div class="bg-[#FBF3E2] p-4 rounded-xl border border-[#EADFD1] font-label text-xs space-y-1 text-left">
                    <div class="flex justify-between">
                      <span class="text-[#58413f]">Date & Time:</span>
                      <span class="font-bold text-[#231916]">${state.inspectedPassBooking.date} at ${state.inspectedPassBooking.time}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-[#58413f]">Party Size:</span>
                      <span class="font-bold text-[#231916]">${state.inspectedPassBooking.guests} Guests</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-[#58413f]">Primary Guest:</span>
                      <span class="font-bold text-[#231916]">${state.inspectedPassBooking.guestName}</span>
                    </div>
                  </div>

                  <button
                    id="resv-modal-done-btn"
                    class="w-full btn-primary py-3 rounded-full font-label text-xs font-bold cursor-pointer"
                  >
                    Done
                  </button>

                </div>
              </div>
            `
            : ''
        }

      </div>
    `;
  }

  function attachReservationsListViewEvents(containerElement = document) {
    // Book new table button
    const bookNewBtn = containerElement.querySelector('#resv-book-new-btn');
    if (bookNewBtn) {
      bookNewBtn.addEventListener('click', () => {
        store.setActiveTab('discover');
      });
    }

    const emptyDiscoverBtn = containerElement.querySelector('#resv-empty-discover-btn');
    if (emptyDiscoverBtn) {
      emptyDiscoverBtn.addEventListener('click', () => {
        store.setActiveTab('discover');
      });
    }

    // Restaurant name click
    containerElement.querySelectorAll('[data-resv-select-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        const restId = e.currentTarget.getAttribute('data-resv-select-id');
        const { RESTAURANTS_DATA } = window.YoyakuData;
  const target = RESTAURANTS_DATA.find(r => r.id === restId);
          if (target) store.setSelectedRestaurant(target);
      });
    });

    // View Pass
    containerElement.querySelectorAll('[data-resv-view-pass-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const bId = e.currentTarget.getAttribute('data-resv-view-pass-id');
        const booking = store.getState().reservations.find(b => b.id === bId);
        if (booking) store.setInspectedPassBooking(booking);
      });
    });

    // Cancel reservation
    containerElement.querySelectorAll('[data-resv-cancel-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const bId = e.currentTarget.getAttribute('data-resv-cancel-id');
        if (confirm('Are you sure you want to cancel this reservation?')) {
          store.cancelReservation(bId);
        }
      });
    });

    // Modal close
    const closeBtn = containerElement.querySelector('#resv-modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        store.setInspectedPassBooking(null);
      });
    }

    const doneBtn = containerElement.querySelector('#resv-modal-done-btn');
    if (doneBtn) {
      doneBtn.addEventListener('click', () => {
        store.setInspectedPassBooking(null);
      });
    }
  }


  window.YoyakuComponents.renderReservationsListView = renderReservationsListView;
  window.YoyakuComponents.attachReservationsListViewEvents = attachReservationsListViewEvents;
})();
