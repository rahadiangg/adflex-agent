import { checkValidUrl } from "./CheckValidUrl";

const extensions = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'],
  video: ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'],
}

export function checkValidMedia(url: string): string|boolean {
  const validUrl = checkValidUrl(url);
  if (!validUrl) return false;

  const extension = url.split('.').pop()?.toLocaleLowerCase();
  if (!extension) return false;

  if (extensions.image.includes(extension)) return 'image';
  if (extensions.video.includes(extension)) return 'video';

  return false;
}