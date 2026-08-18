(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

  // U-01 Home Page Restaurant Card (Keeps standard Reserve Table button & footer promotion tag)
  function renderRestaurantCard(restaurant, state) {
    const isFavorite = state.favorites.includes(restaurant.id);
    const isMm = state.currentLanguage === 'MM';

    return `
      <div class="w-full luxe-card group relative bg-[#FFF9EE] rounded-[28px] border border-[#EADFD1] overflow-hidden flex flex-col justify-between shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-left">
        
        <!-- Card Image & Floating Badges -->
        <div class="relative h-56 overflow-hidden cursor-pointer" data-card-select-id="${restaurant.id}">
          <img
            src="${restaurant.heroImage}"
            alt="${restaurant.name}"
            referrerpolicy="no-referrer"
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <!-- Favorite Heart Button Top Right -->
          <button
            data-card-fav-id="${restaurant.id}"
            class="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white text-[#840f16] shadow-md border border-black/5 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer z-10"
            title="Favorite"
          >
            <span class="material-symbols-outlined text-xl ${isFavorite ? 'fill-1 text-[#840f16]' : 'text-[#840f16]'}">favorite</span>
          </button>

          <!-- Rating Pill Bottom Left ON Image -->
          <div class="absolute bottom-3.5 left-3.5 bg-white px-3.5 py-1.5 rounded-full shadow-md border border-black/5 flex items-center gap-1.5 font-label text-xs font-bold text-[#231916] z-10">
            <span class="material-symbols-outlined text-sm text-[#D08E1C] fill-1">star</span>
            <span>${restaurant.rating} (${restaurant.reviewCount})</span>
          </div>
        </div>

        <!-- Card Content Body -->
        <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
          <div class="space-y-1">
            <!-- Cuisine Tag -->
            <div class="mb-2">
              <span class="bg-[#F0E6D8] text-[#840f16] font-label text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full inline-block">
                ${restaurant.cuisine}
              </span>
            </div>

            <!-- Restaurant Name -->
            <h3
              data-card-select-id="${restaurant.id}"
              class="font-headline text-xl sm:text-2xl font-bold text-[#840f16] hover:text-[#6c0c11] transition-colors cursor-pointer line-clamp-1"
            >
              ${restaurant.name}
            </h3>

            <!-- Location Row -->
            <div class="flex items-center gap-1.5 text-xs font-body text-[#58413f] font-medium pt-1">
              <span class="material-symbols-outlined text-base text-[#840f16] shrink-0">location_on</span>
              <span class="line-clamp-1">${restaurant.location}</span>
            </div>

            <!-- Price Range Row -->
            <div class="flex items-center gap-1.5 text-xs font-label font-bold text-[#231916] pt-1">
              <span class="material-symbols-outlined text-base text-[#840f16] shrink-0">payments</span>
              <span>${restaurant.priceRange}</span>
            </div>
          </div>

          <!-- Footer Row: Offer & Action Button -->
          <div class="pt-3 border-t border-[#EADFD1] flex items-center justify-between gap-2.5">
            <div class="promo-badge-yellow text-white font-label text-xs font-black px-3.5 py-1.5 rounded-full shadow-xs truncate max-w-[65%]" title="${restaurant.offerTag || '20% OFF'}">
              <span class="truncate font-extrabold text-white">${restaurant.offerTag || '20% OFF'}</span>
            </div>
            <button
              data-card-reserve-id="${restaurant.id}"
              class="bg-[#840f16] hover:bg-[#6c0c11] active:scale-95 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-label text-xs font-bold shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              ${isMm ? 'ဝိုင်းစိုတ်ရန်' : 'Reserve Table'}
            </button>
          </div>
        </div>

      </div>
    `;
  }

  // U-02 Search Result Page Restaurant Card (Promotion tag in image right beside review tag + Time Slot buttons instead of reserve table button)
  function renderSearchResultCard(restaurant, state) {
    const isFavorite = state.favorites.includes(restaurant.id);
    const isMm = state.currentLanguage === 'MM';
    
    // Available time slots for fast booking
    const defaultSlots = ['12:00', '13:00', '18:00', '18:30', '19:00', '20:00'];
    const slots = restaurant.timeSlots || defaultSlots;

    return `
      <div class="w-full luxe-card group relative bg-[#FFF9EE] rounded-[28px] border border-[#EADFD1] overflow-hidden flex flex-col justify-between shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-left">
        
        <!-- Card Image & Floating Badges -->
        <div class="relative h-56 overflow-hidden cursor-pointer" data-card-select-id="${restaurant.id}">
          <img
            src="${restaurant.heroImage}"
            alt="${restaurant.name}"
            referrerpolicy="no-referrer"
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <!-- Gradient overlay on bottom of image for readability -->
          <div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

          <!-- Favorite Heart Button Top Right -->
          <button
            data-card-fav-id="${restaurant.id}"
            class="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white text-[#840f16] shadow-md border border-black/5 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer z-10"
            title="Favorite"
          >
            <span class="material-symbols-outlined text-xl ${isFavorite ? 'fill-1 text-[#840f16]' : 'text-[#840f16]'}">favorite</span>
          </button>

          <!-- Image Bottom Tags: Review Tag on Left & Promotion Tag on Right Most -->
          <div class="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
            <!-- Review Tag (Left) -->
            <div class="bg-white px-[5px] py-0 rounded-full shadow-md border border-black/5 flex items-center gap-1.5 font-label text-xs font-bold text-[#231916]">
              <span class="material-symbols-outlined text-sm text-[#D08E1C] fill-1">star</span>
              <span>${restaurant.rating} (${restaurant.reviewCount})</span>
            </div>

            <!-- Promotion Tag (Right-most beside review tag) - Vibrant yellow background with white text -->
            ${restaurant.offerTag ? 
            `<div class="promo-badge-yellow text-white font-label text-xs font-black tracking-wide px-3.5 py-1.5 rounded-full shadow-md flex items-center shrink-0" title="${restaurant.offerTag}">
                <span class="font-extrabold text-white">Special Offer</span>
             </div>` : ''}
          </div>
        </div>

        <!-- Card Content Body -->
        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div class="space-y-1.5">
            <!-- Cuisine Tag -->
            <div>
              <span class="bg-[#F0E6D8] text-[#840f16] font-label text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full inline-block">
                ${restaurant.cuisine}
              </span>
            </div>

            <!-- Restaurant Name -->
            <h3
              data-card-select-id="${restaurant.id}"
              class="font-headline text-xl sm:text-2xl font-bold text-[#840f16] hover:text-[#6c0c11] transition-colors cursor-pointer line-clamp-1"
            >
              ${restaurant.name}
            </h3>

            <!-- Location Row -->
            <div class="flex items-center gap-1.5 text-xs font-body text-[#58413f] font-medium">
              <span class="material-symbols-outlined text-base text-[#840f16] shrink-0">location_on</span>
              <span class="line-clamp-1">${restaurant.location}</span>
            </div>

            <!-- Price Range Row -->
            <div class="flex items-center gap-1.5 text-xs font-label font-bold text-[#231916]">
              <span class="material-symbols-outlined text-base text-[#840f16] shrink-0">payments</span>
              <span>${restaurant.priceRange}</span>
            </div>
          </div>

          <!-- Time Slots Selection Section (Replaces single Reserve Table button) -->
          <div class="pt-3 border-t border-[#EADFD1] space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1 font-label text-[11px] font-bold text-[#58413f] uppercase tracking-wider">
                <span class="material-symbols-outlined text-xs text-[#840f16]">schedule</span>
                <span>${isMm ? 'ရရှိနိုင်သော အချိန်များ' : 'Available Time Slots'}</span>
              </div>
            </div>

            <!-- Time Slot Buttons Grid -->
            <div class="grid grid-cols-3 sm:grid-cols-3 gap-2">
              ${slots.slice(0, 6).map(time => `
                <button
                  type="button"
                  data-card-time-slot="${time}"
                  data-card-restaurant-id="${restaurant.id}"
                  class="py-2 px-2.5 rounded-xl font-label text-xs font-bold transition-all duration-200 cursor-pointer text-center bg-[#FFF8F6] text-[#840f16] border border-[#EADFD1] hover:bg-[#840f16] hover:text-white hover:border-[#840f16] hover:shadow-md active:scale-95 flex items-center justify-center gap-1 group/time"
                  title="${isMm ? `${time} တွင် စားပွဲဝိုင်း စိုတ်ယူမည်` : `Book table for ${time}`}"
                >
                  <span>${time}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

      </div>
    `;
  }

  function attachRestaurantCardEvents(containerElement = document) {
    // Favorite toggle buttons
    containerElement.querySelectorAll('[data-card-fav-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('data-card-fav-id');
        store.toggleFavorite(id);
      });
    });

    // Select restaurant detail
    containerElement.querySelectorAll('[data-card-select-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-card-select-id');
        const { RESTAURANTS_DATA } = window.YoyakuData;
        const target = RESTAURANTS_DATA.find(r => r.id === id);
        if (target) {
          store.setSelectedRestaurant(target);
        }
      });
    });

    // Quick reserve table button (used in U-01 Home)
    containerElement.querySelectorAll('[data-card-reserve-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('data-card-reserve-id');
        const { RESTAURANTS_DATA } = window.YoyakuData;
        const target = RESTAURANTS_DATA.find(r => r.id === id);
        if (target) {
          store.openBookingModal(target);
        }
      });
    });

    // Time Slot Instant Booking Buttons (used in U-02 Search Result Cards)
    containerElement.querySelectorAll('[data-card-time-slot]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const time = e.currentTarget.getAttribute('data-card-time-slot');
        const restId = e.currentTarget.getAttribute('data-card-restaurant-id');
        const { RESTAURANTS_DATA } = window.YoyakuData;
        const target = RESTAURANTS_DATA.find(r => r.id === restId);
        if (target) {
          const state = store.getState();
          const selectedDate = state.resultsState?.selectedDate || 'Aug 14, 2026';
          const partySizeRaw = state.resultsState?.partySize;
          const guests = (partySizeRaw && partySizeRaw !== 'All Sizes') ? parseInt(partySizeRaw, 10) || 2 : 2;
          store.openBookingModal(target, selectedDate, time, guests);
          store.showToast(`Selected ${time} table at ${target.name}`);
        }
      });
    });
  }

  window.YoyakuComponents.renderRestaurantCard = renderRestaurantCard;
  window.YoyakuComponents.renderSearchResultCard = renderSearchResultCard;
  window.YoyakuComponents.attachRestaurantCardEvents = attachRestaurantCardEvents;
})();
