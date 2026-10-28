import { Href, router } from 'expo-router';

// Go back when there is history; otherwise (e.g. opened from a deep link) go to a parent screen.
export function goBack(fallback: Href) {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(fallback);
  }
}
