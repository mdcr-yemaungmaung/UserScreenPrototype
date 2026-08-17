(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;



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
            <div class="text-xs font-label font-bold text-[#231916] pt-1">
              ${restaurant.priceRange}
            </div>
          </div>

          <!-- Footer Row: Offer & Action Button -->
          <div class="pt-3 border-t border-[#EADFD1] flex items-center justify-between gap-2.5">
            <div class="bg-[#F5CA56] text-[#231916] font-label text-xs font-bold px-3.5 py-2 rounded-full shadow-xs truncate max-w-[65%]" title="${restaurant.offerTag || '20% OFF'}">
              ${restaurant.offerTag || '20% OFF'}
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
        const rest = store.getState().reservations; // wait, find in RESTAURANTS_DATA
        const { RESTAURANTS_DATA } = window.YoyakuData;
  const target = RESTAURANTS_DATA.find(r => r.id === id);
          if (target) {
            store.setSelectedRestaurant(target);
          }
      });
    });

    // Quick reserve table
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
  }


  window.YoyakuComponents.renderRestaurantCard = renderRestaurantCard;
  window.YoyakuComponents.attachRestaurantCardEvents = attachRestaurantCardEvents;
})();
