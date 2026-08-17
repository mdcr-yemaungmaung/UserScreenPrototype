(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;



  function renderBookingStep3(state) {
    const modalState = state.bookingModalState;
    if (!modalState.isOpen || !modalState.restaurant) return '';

    const restaurant = modalState.restaurant;
    const bData = modalState.bookingData;
    const gData = modalState.guestData;
    const isMm = state.currentLanguage === 'MM';

    const experiencePrice = 180000 * bData.guests;
    const winePairingPrice = 120000 * bData.guests;
    const promoDiscount = gData.paymentMethod === 'qr' ? 50000 : 0;
    const subtotal = experiencePrice + winePairingPrice - promoDiscount;
    const tax = Math.round(subtotal * 0.085);
    const serviceCharge = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + tax + serviceCharge;

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
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] truncate">${isMm ? 'ရက်စွဲနှင့် အချိန်' : 'Date & Schedule'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#104b2b]"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#104b2b] text-white"><span class="material-symbols-outlined text-sm font-bold">check</span></div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#8d7b75]">STEP 02</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] truncate">${isMm ? 'ဧည့်သည် အချက်အလက်' : 'Guest Details'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#104b2b]"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#840f16] text-white shadow-xs">3</div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#840f16]">STEP 03</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] truncate">${isMm ? 'အတည်ပြုမှု' : 'Confirm Order'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#840f16]"></div>
            </div>
          </div>
        </div>

        <!-- STEP 3 CONTENT -->
        <div class="bg-[#FFF7E8] rounded-3xl border border-[#EADFD1] shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
          
          <div class="border-b border-[#EADFD1] pb-4">
            <div class="text-[#840f16] font-label text-xs font-bold uppercase tracking-wider mb-1">
              ${isMm ? 'အဆင့် ၃ • စစ်ဆေးပြီး အတည်ပြုမည်' : 'Step 3 of 3 • Review & Confirm'}
            </div>
            <h2 class="font-headline text-2xl sm:text-3xl text-[#231916] font-bold">
              ${isMm ? 'ကြိုတင်မှာယူမှုကို အတည်ပြုပါ' : 'Confirm Reservation'}
            </h2>
          </div>

          <div class="relative h-36 rounded-2xl overflow-hidden shadow-sm">
            <img src="${restaurant.heroImage}" alt="${restaurant.name}" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
            <div class="absolute inset-0 p-6 flex flex-col justify-between text-white">
              <div class="font-headline text-2xl font-bold">${restaurant.name}</div>
              <div class="flex flex-wrap gap-2 font-label text-xs">
                <span class="bg-white/20 backdrop-blur-md px-3 py-1 rounded-md font-bold">${bData.date}</span>
                <span class="bg-white/20 backdrop-blur-md px-3 py-1 rounded-md font-bold">${bData.time}</span>
                <span class="bg-white/20 backdrop-blur-md px-3 py-1 rounded-md font-bold">${bData.guests} ${isMm ? 'ဦး' : 'Guests'} (${bData.seatingPreference})</span>
              </div>
            </div>
          </div>

          <div class="bg-[#FBF3E2] p-6 rounded-2xl border border-[#EADFD1] space-y-3 font-label text-xs">
            <div class="font-headline text-sm font-bold text-[#231916] border-b border-[#EADFD1] pb-2">
              ${isMm ? 'ခန့်မှန်းခြေ ကုန်ကျစရိတ် တွက်ချက်မှု' : 'Estimated Pricing Breakdown'}
            </div>
            <div class="flex justify-between text-[#58413f]">
              <span>${isMm ? 'အထူး ဟင်းပွဲ မီနူး' : 'Experience Tasting Menu'} (x${bData.guests})</span>
              <span class="font-bold text-[#231916]">${experiencePrice.toLocaleString()} MMK</span>
            </div>
            <div class="flex justify-between text-[#58413f]">
              <span>${isMm ? 'ဝိုင် တွဲဖက် သောက်သုံးမှု' : 'Sommelier Wine Pairing'} (x${bData.guests})</span>
              <span class="font-bold text-[#231916]">${winePairingPrice.toLocaleString()} MMK</span>
            </div>
            ${promoDiscount > 0
              ? `<div class="flex justify-between text-[#104b2b] font-semibold"><span>${isMm ? 'KBZPay / QR အထူး လျှော့ဈေး' : 'KBZPay / QR Instant Discount'}</span><span>-${promoDiscount.toLocaleString()} MMK</span></div>`
              : ''
            }
            <div class="flex justify-between text-[#58413f]">
              <span>${isMm ? 'ကုန်သွယ်ခွန် (၈.၅%)' : 'Commercial Tax (8.5%)'}</span>
              <span class="font-bold text-[#231916]">${tax.toLocaleString()} MMK</span>
            </div>
            <div class="flex justify-between text-[#58413f]">
              <span>${isMm ? 'ဝန်ဆောင်ခ (၁၈%)' : 'Service Charge (18%)'}</span>
              <span class="font-bold text-[#231916]">${serviceCharge.toLocaleString()} MMK</span>
            </div>
            <div class="pt-3 border-t border-[#EADFD1] flex justify-between items-center text-base">
              <span class="font-headline font-bold text-[#231916]">${isMm ? 'စုစုပေါင်း ခန့်မှန်းကုန်ကျစရိတ်' : 'Estimated Total'}</span>
              <span class="font-headline font-extrabold text-[#840f16] text-xl sm:text-2xl">${totalAmount.toLocaleString()} MMK</span>
            </div>
          </div>

          <label class="flex items-center gap-3 cursor-pointer bg-[#FBF3E2] p-4 rounded-xl border border-[#EADFD1]">
            <input type="checkbox" id="step3-terms" checked class="w-5 h-5 rounded border-[#EADFD1] text-[#840f16] cursor-pointer" />
            <span class="font-body text-xs text-[#231916] font-semibold">
              ${isMm ? 'ပယ်ဖျက်ခြင်းဆိုင်ရာ စည်းမျဉ်းများနှင့် စည်းကမ်းချက်များကို သဘောတူပါသည်။' : 'I agree to the cancellation policy and restaurant terms of service.'}
            </span>
          </label>

          <div class="pt-4 flex justify-between items-center gap-4 bg-[#FBF3E2] p-5 rounded-2xl border border-[#EADFD1]">
            <button id="step3-back-btn" class="px-6 py-3.5 rounded-full border border-[#EADFD1] font-label text-xs font-semibold text-[#58413f] hover:bg-white cursor-pointer">
              ${isMm ? 'နောက်သို့' : 'Back'}
            </button>
            <button id="step3-final-btn" class="flex-1 btn-primary py-4 rounded-full font-label text-sm font-semibold shadow-md flex items-center justify-center gap-2 cursor-pointer">
              <span>${isMm ? 'ကြိုတင်မှာယူမှု အတည်ပြုမည်' : 'Confirm Reservation'}</span>
              <span class="material-symbols-outlined text-sm">check_circle</span>
            </button>
          </div>

        </div>
      </div>
    `;
  }

  function attachBookingStep3Events(containerElement = document) {
    const step3Back = containerElement.querySelector('#step3-back-btn');
    if (step3Back) {
      step3Back.addEventListener('click', () => {
        store.setBookingStep(2);
      });
    }

    const step3Final = containerElement.querySelector('#step3-final-btn');
    if (step3Final) {
      step3Final.addEventListener('click', () => {
        const state = store.getState();
        const mState = state.bookingModalState;
        const rest = mState.restaurant;
        const bData = mState.bookingData;
        const gData = mState.guestData;

        const randomNo = `RSV-${Math.floor(100000 + Math.random() * 900000)}`;
        const expPrice = 180000 * bData.guests;
        const winePrice = 120000 * bData.guests;
        const disc = gData.paymentMethod === 'qr' ? 50000 : 0;
        const sub = expPrice + winePrice - disc;
        const tax = Math.round(sub * 0.085);
        const service = Math.round(sub * 0.18);
        const total = sub + tax + service;

        const newBooking = {
          id: `b-${Date.now()}`,
          reservationNo: randomNo,
          restaurantId: rest.id,
          restaurantName: rest.name,
          restaurantImage: rest.heroImage,
          location: rest.location,
          date: bData.date,
          time: bData.time,
          guests: bData.guests,
          seatingPreference: bData.seatingPreference,
          specialRequests: gData.specialRequests,
          guestName: gData.guestName,
          guestPhone: gData.guestPhone,
          guestEmail: gData.guestEmail,
          paymentMethod: gData.paymentMethod,
          status: 'Confirmed',
          createdAt: new Date().toISOString(),
          totalAmount: total,
          priceBreakdown: {
            experienceMenu: expPrice,
            winePairing: winePrice,
            discount: disc,
            tax,
            serviceCharge: service
          }
        };

        store.addReservation(newBooking);
        store.setBookingStep(4, { createdBooking: newBooking });
        store.showToast('Reservation confirmed!');
      });
    }
  }


  window.YoyakuComponents.renderBookingStep3 = renderBookingStep3;
  window.YoyakuComponents.attachBookingStep3Events = attachBookingStep3Events;
})();
