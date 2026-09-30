// YouTube links pasted by the owner in /admin. Imported by the AboutPage global
// (validation) as well as the page, so it must stay free of "server-only".

const VIDEO_ID = /^[\w-]{11}$/;
const YOUTUBE_HOSTS = ["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be", "www.youtube-nocookie.com"];

// The 11-character video id from a watch, share (youtu.be), embed or shorts
// link, or null when the text isn't a YouTube video link.
export function parseYouTubeId(link: string | null | undefined): string | null {
  if (!link?.trim()) return null;

  let url: URL;
  try {
    url = new URL(link.trim());
  } catch {
    return null;
  }
  if (!YOUTUBE_HOSTS.includes(url.hostname)) return null;

  const [first, second] = url.pathname.split("/").filter(Boolean);
  const id = url.hostname === "youtu.be" ? first : first === "watch" ? url.searchParams.get("v") : second;
  return id && VIDEO_ID.test(id) ? id : null;
}

// Privacy-enhanced embed: YouTube sets no cookies until the visitor presses play.
export const getYouTubeEmbedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
