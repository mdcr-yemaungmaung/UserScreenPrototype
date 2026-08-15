(() => {
  const store = window.store;
  const { renderTopNavBar, attachTopNavBarEvents, renderBottomNavBar, attachBottomNavBarEvents, renderFooter, attachFooterEvents, renderDiscoverView, attachDiscoverViewEvents, renderResultListView, attachResultListViewEvents, renderRestaurantDetailView, attachRestaurantDetailViewEvents, renderBookingStep1, attachBookingStep1Events, renderBookingStep2, attachBookingStep2Events, renderBookingStep3, attachBookingStep3Events, renderBookingStep4, attachBookingStep4Events, renderReservationsListView, attachReservationsListViewEvents, renderFavoritesView, attachFavoritesViewEvents, renderCuratedView, attachCuratedViewEvents, renderMyPageView, attachMyPageViewEvents, renderInfoModals, attachInfoModalsEvents, renderToast } = window.YoyakuComponents;




















  function renderApp() {
    const root = document.getElementById('root');
    if (!root) return;

    const state = store.getState();

    // Determine Main View Content
    let mainContentHtml = '';

    if (state.bookingModalState.isOpen && state.bookingModalState.restaurant) {
      const step = state.bookingModalState.step;
      if (step === 1) {
        mainContentHtml = renderBookingStep1(state);
      } else if (step === 2) {
        mainContentHtml = renderBookingStep2(state);
      } else if (step === 3) {
        mainContentHtml = renderBookingStep3(state);
      } else if (step === 4) {
        mainContentHtml = renderBookingStep4(state);
      }
    } else if (state.selectedRestaurant) {
      mainContentHtml = renderRestaurantDetailView(state.selectedRestaurant, state);
    } else {
      switch (state.activeTab) {
        case 'discover':
          mainContentHtml = renderDiscoverView(state);
          break;
        case 'resultlist':
          mainContentHtml = renderResultListView(state);
          break;
        case 'reservations':
          mainContentHtml = renderReservationsListView(state);
          break;
        case 'favorites':
          mainContentHtml = renderFavoritesView(state);
          break;
        case 'curated':
          mainContentHtml = renderCuratedView(state);
          break;
        case 'mypage':
          mainContentHtml = renderMyPageView(state);
          break;
        default:
          mainContentHtml = renderDiscoverView(state);
      }
    }

    // Full Shell Assembly
    root.innerHTML = `
      <div class="min-h-screen flex flex-col justify-between pb-20 md:pb-0">
        
        <!-- Top Navigation Header -->
        ${renderTopNavBar(state)}

        <!-- Main Body Container -->
        <main class="flex-1">
          ${mainContentHtml}
        </main>

        <!-- App Footer -->
        ${renderFooter(state)}

        <!-- Toast Overlay -->
        ${renderToast(state)}

        <!-- Info & Auth Modals Overlay -->
        ${renderInfoModals(state)}

        <!-- Mobile Bottom Navigation Bar -->
        ${renderBottomNavBar(state)}

      </div>
    `;

    window.YoyakuPrototype.enhanceRuntime(root);

    // Attach All Dynamic Event Handlers
    attachTopNavBarEvents(root);
    attachBottomNavBarEvents(root);
    attachFooterEvents(root);
    attachInfoModalsEvents(root);

    if (state.bookingModalState.isOpen && state.bookingModalState.restaurant) {
      const step = state.bookingModalState.step;
      if (step === 1) {
        attachBookingStep1Events(root);
      } else if (step === 2) {
        attachBookingStep2Events(root);
      } else if (step === 3) {
        attachBookingStep3Events(root);
      } else if (step === 4) {
        attachBookingStep4Events(root);
      }
    } else if (state.selectedRestaurant) {
      attachRestaurantDetailViewEvents(root);
    } else {
      switch (state.activeTab) {
        case 'discover':
          attachDiscoverViewEvents(root);
          break;
        case 'resultlist':
          attachResultListViewEvents(root);
          break;
        case 'reservations':
          attachReservationsListViewEvents(root);
          break;
        case 'favorites':
          attachFavoritesViewEvents(root);
          break;
        case 'curated':
          attachCuratedViewEvents(root);
          break;
        case 'mypage':
          attachMyPageViewEvents(root);
          break;
      }
    }
  }


  function startApp() {
    renderApp();
    store.subscribe(renderApp);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp, { once: true });
  } else {
    startApp();
  }

  window.YoyakuPrototype.renderApp = renderApp;
})();
