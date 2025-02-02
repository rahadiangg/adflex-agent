import ReactPlayer from "react-player";
import { useAdsStore } from "@/app/stores/AdsStore";

export default function VideoPlayer() {
  const adsStore = useAdsStore();

  return (
    <div className="relative w-full min-h-screen">
      <ReactPlayer
        url={adsStore.ads[adsStore.activeIndex]?.source}
        playing
        loop
        controls={false}
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
              disablePictureInPicture: true,
              onContextMenu: (e: React.MouseEvent) => e.preventDefault()
            }
          }
        }}
        onError={(e) => console.log('Video playback error:', e)}
      />
    </div>
  );

}