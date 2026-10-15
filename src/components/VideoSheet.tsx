import { useRef } from 'react'
import { Sheet } from './Sheet'

export type VideoInfo = {
  label: string
  wide: string
  tall: string
  poster: string
  posterTall: string
}

// 影片面板：電腦播橫式、手機直拿播直式；點了才載入，不會拖慢首頁
export function VideoSheet({ id, video }: { id: string; video: VideoInfo }) {
  const ref = useRef<HTMLVideoElement>(null)
  return (
    <Sheet
      id={id}
      label={video.label}
      className="sheet-video"
      onOpen={() => {
        const v = ref.current
        if (!v) return
        const tall = window.matchMedia('(max-width: 719px) and (orientation: portrait)').matches
        const src = tall ? video.tall : video.wide
        if (!v.src.endsWith(src)) {
          v.poster = tall ? video.posterTall : video.poster
          v.src = src
        }
        v.classList.toggle('is-tall', tall)
        v.play().catch(() => {})
      }}
      onClosed={() => ref.current?.pause()}
    >
      <div className="video-frame" data-morph-target>
        <video ref={ref} controls playsInline preload="none" poster={video.poster}>
          你的瀏覽器不能播放影片。
        </video>
      </div>
    </Sheet>
  )
}
