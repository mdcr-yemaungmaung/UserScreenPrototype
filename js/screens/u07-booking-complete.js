(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;



  function renderBookingStep4(state) {
    const modalState = state.bookingModalState;
    if (!modalState.isOpen || !modalState.restaurant) return '';

    const step = modalState.step;
    const cBooking = modalState.createdBooking;
    const isMm = state.currentLanguage === 'MM';

    if (step !== 4 || !cBooking) return '';

    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-28 sm:pb-12 space-y-6 text-left animate-fadeIn">
        
        <!-- STEPPER PROGRESS BAR -->
        <div class="bg-[#FFF8EE] border border-[#EADFD1] rounded-2xl p-4 sm:p-5 shadow-2xs">
          <div class="grid grid-cols-3 gap-3 text-left">
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#104b2b] text-white"><span class="material-symbols-outlined text-sm font-bold">check</span></div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#8d7b75]">STEP 01</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] truncate stepper-step-title">${isMm ? 'ရက်စွဲနှင့် အချိန်' : 'Date & Schedule'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#104b2b]"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#104b2b] text-white"><span class="material-symbols-outlined text-sm font-bold">check</span></div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#8d7b75]">STEP 02</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] truncate stepper-step-title">${isMm ? 'ဧည့်သည် အချက်အလက်' : 'Guest Details'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#104b2b]"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#104b2b] text-white"><span class="material-symbols-outlined text-sm font-bold">check</span></div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#8d7b75]">STEP 03</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] truncate stepper-step-title">${isMm ? 'အတည်ပြုချက်' : 'Confirm Reservation'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#104b2b]"></div>
            </div>
          </div>
        </div>

        <!-- STEP 4 CONTENT -->
        <div class="bg-[#FFF7E8] rounded-3xl border border-[#EADFD1] shadow-2xl p-6 sm:p-10 space-y-8">
          
          <div class="text-center space-y-3">
            <div class="w-20 h-20 bg-[#104b2b] text-white rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <span class="material-symbols-outlined text-4xl font-bold">check</span>
            </div>
            <h2 class="font-headline text-3xl sm:text-4xl text-[#231916] font-extrabold">
              ${isMm ? 'ကြိုတင်မှာယူမှု အောင်မြင်ပါသည်။' : 'Reservation Confirmed!'}
            </h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            <div class="lg:col-span-7 bg-[#FBF3E2] p-6 rounded-3xl border border-[#EADFD1] flex flex-col justify-between space-y-4 shadow-sm">
              <div>
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <span class="text-[#840f16] font-label text-[10px] font-bold uppercase bg-[#840f16]/10 px-2.5 py-1 rounded-md border border-[#840f16]/20">
                      ${isMm ? 'အတည်ပြုပြီး' : 'Confirmed'}
                    </span>
                    <h3 class="font-headline text-xl text-[#231916] font-bold mt-2">${cBooking.restaurantName}</h3>
                  </div>
                  <span class="font-label text-xs font-bold text-[#58413f] bg-white px-3 py-1.5 rounded-full border border-[#EADFD1]">${cBooking.reservationNo}</span>
                </div>

                <div class="grid grid-cols-2 gap-3 text-xs font-label">
                  <div class="bg-[#FFF8F6] p-3.5 rounded-2xl border border-[#EADFD1]">
                    <div class="text-[#58413f] text-[10px] uppercase font-bold">${isMm ? 'ရက်စွဲနှင့် အချိန်' : 'Date & Time'}</div>
                    <div class="font-bold text-[#231916] mt-0.5">${cBooking.date} at ${cBooking.time}</div>
                  </div>
                  <div class="bg-[#FFF8F6] p-3.5 rounded-2xl border border-[#EADFD1]">
                    <div class="text-[#58413f] text-[10px] uppercase font-bold">${isMm ? 'လူဦးရေ' : 'Party Size'}</div>
                    <div class="font-bold text-[#231916] mt-0.5">${cBooking.guests} ${isMm ? 'ဦး' : 'Guests'}</div>
                  </div>
                </div>
              </div>

              <div class="pt-2 border-t border-[#EADFD1] flex justify-between items-center text-xs font-label">
                <span class="text-[#58413f]">${isMm ? 'ဧည့်သည် အမည်:' : 'Guest Name:'}</span>
                <span class="font-bold text-[#231916]">${cBooking.guestName}</span>
              </div>
            </div>

            <div class="lg:col-span-5 bg-[#231916] text-white p-6 rounded-3xl flex flex-col items-center justify-between text-center relative overflow-hidden shadow-xl">
              <div class="font-label text-[10px] text-[#D08E1C] font-bold uppercase tracking-widest">
                ${isMm ? 'စာပွဲ အဝင် လက်မှတ် (Check-In Pass)' : 'Check-In Pass'}
              </div>
              <div class="my-4 p-3.5 bg-white rounded-2xl qr-glow shadow-inner">
                <img
                  src="${window.YoyakuPrototype.createQrDataUri(`YOYAKU-${cBooking.reservationNo}`)}"
                  alt="QR Pass"
                  referrerpolicy="no-referrer"
                  loading="lazy"
                  class="w-40 h-40 object-contain"
                />
              </div>
              <div class="font-body text-[11px] text-amber-200/80">
                ${isMm ? 'ဆိုင်သို့ ရောက်ရှိပါက ဤ QR ကုဒ်ကို ပြသပါ' : 'Show QR code upon arrival at restaurant'}
              </div>
            </div>

          </div>

          <div class="flex flex-col sm:flex-row gap-4 pt-2">
            <button id="step4-home-btn" class="flex-1 py-4 rounded-full border border-[#EADFD1] font-label text-sm font-semibold text-[#58413f] hover:bg-[#FBF3E2] cursor-pointer">
              ${isMm ? 'ပင်မ စာမျက်နှာသို့ ပြန်သွားမည်' : 'Return to Discover'}
            </button>
            <button id="step4-view-all-btn" class="flex-1 btn-primary py-4 rounded-full font-label text-sm font-semibold shadow-md cursor-pointer flex items-center justify-center gap-2">
              <span>${isMm ? 'မှာယူထားသည်များ အားလုံး ကြည့်မည်' : 'View All Reservations'}</span>
              <span class="material-symbols-outlined text-sm">calendar_month</span>
            </button>
          </div>

        </div>
      </div>
    `;
  }

  function attachBookingStep4Events(containerElement = document) {
    const step4Home = containerElement.querySelector('#step4-home-btn');
    if (step4Home) {
      step4Home.addEventListener('click', () => {
        store.closeBookingModal();
        store.setSelectedRestaurant(null);
        store.setActiveTab('discover');
      });
    }

    const step4ViewAll = containerElement.querySelector('#step4-view-all-btn');
    if (step4ViewAll) {
      step4ViewAll.addEventListener('click', () => {
        store.closeBookingModal();
        store.setSelectedRestaurant(null);
        store.setActiveTab('reservations');
      });
    }
  }


  window.YoyakuComponents.renderBookingStep4 = renderBookingStep4;
  window.YoyakuComponents.attachBookingStep4Events = attachBookingStep4Events;
})();
