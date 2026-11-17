// Store links for the download buttons. Paste each URL here once the app is live in that store.
// While a link is empty, its button says "Coming soon" and does not leave the page.
window.BEAUTIVA_LINKS = {
  appStore: "",    // e.g. "https://apps.apple.com/app/beautiva/id0000000000"
  googlePlay: "",  // e.g. "https://play.google.com/store/apps/details?id=com.beautiva.app"
};

// Launch offer on the AI pack and plan price cards: a "25% off" badge and a struck-through "was" price
// (price / (1 - percent), so the badge is true). Display only: the stores charge the price shown. 0 = off.
// Fallback only: the page uses PRICE_DISCOUNT_PERCENT from the server (api.beautiva.marketingadda.com) when it can.
window.BEAUTIVA_DISCOUNT_PERCENT = 25;
// Last day of the launch offer (India time). After it the pill and struck prices hide by themselves.
window.BEAUTIVA_OFFER_ENDS = "2026-12-31";
