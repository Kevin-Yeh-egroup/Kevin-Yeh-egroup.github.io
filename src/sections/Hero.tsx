import { useRef, type CSSProperties } from 'react'
import { UiIcon } from '../components/Icons'
import { GrowingSprout } from '../components/LogoMark'
import { Sheet } from '../components/Sheet'
import { profile, type Metric } from '../data/profile'
import { useCountUp, useInView } from '../lib/motion'
import { useSheet } from '../lib/sheet'

// 第一屏：一句主張、三個證據數字、一張照片（點了看影片）。細節都在點開之後
export function Hero() {
  const { headline, oneLiner, metrics, name, nameEn, tags } = profile
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-tag">
            <GrowingSprout className="sprout-grow hero-sprout" />
            <span>
              {name} {nameEn}
              <span className="hero-tag-sub">{tags}</span>
            </span>
          </p>
          <h1 id="hero-title" className="hero-title">
            {headline.map((line) => (
              <span key={line} className="hero-line">
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-one">{oneLiner}</p>
          <ul className="metrics" aria-label="三個數字">
            {metrics.map((m, i) => (
              <li key={m.id} style={{ '--d': i } as CSSProperties}>
                <MetricCard m={m} />
              </li>
            ))}
          </ul>
        </div>
        <StoryCard />
      </div>
      <a className="scroll-cue" href="#works" aria-label="往下看作品">
        <UiIcon name="down" size={22} />
      </a>
      <VideoSheet />
    </section>
  )
}

function MetricCard({ m }: { m: Metric }) {
  const { open } = useSheet()
  const [ref, seen] = useInView<HTMLButtonElement>('0px')
  const n = useCountUp(m.value, seen, m.count === true)
  const shown = m.count ? n.toLocaleString('en-US') : m.display
  const go = (e: { currentTarget: HTMLElement }) => {
    if (m.target.startsWith('sheet:')) open(m.target.slice(6), e.currentTarget)
    else document.querySelector(m.target)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <button ref={ref} type="button" className={`metric metric-${m.id}`} onClick={go}>
      <span className="metric-num">
        <span className="metric-value">{shown}</span>
        {m.unit ? <span className="metric-unit">{m.unit}</span> : null}
        {m.icon ? (
          <span className="metric-icon" aria-hidden="true">
            <UiIcon name={m.icon} size={18} />
          </span>
        ) : null}
      </span>
      <span className="metric-label">{m.label}</span>
    </button>
  )
}

// 照片卡：看得到本人；點下去就是 2 分半的故事影片
function StoryCard() {
  const { open } = useSheet()
  const { video, photo } = profile
  return (
    <div className="hero-media" data-morph-root>
      <button type="button" className="story-card" onClick={(e) => open('video', e.currentTarget)} aria-label={`播放影片：${video.label}`}>
        <span className="story-photo" data-morph>
          <picture>
            <source type="image/webp" srcSet={`${photo.webp800} 800w, ${photo.webp1200} 1200w`} sizes="(max-width: 959px) 92vw, 520px" />
            <img src={photo.jpg} alt={photo.alt} width={photo.width} height={photo.height} fetchPriority="high" />
          </picture>
        </span>
        <span className="story-pill">
          <span className="story-play" aria-hidden="true">
            <UiIcon name="play" size={16} />
          </span>
          {video.label}
        </span>
      </button>
    </div>
  )
}

function VideoSheet() {
  const ref = useRef<HTMLVideoElement>(null)
  const { video } = profile
  return (
    <Sheet
      id="video"
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
