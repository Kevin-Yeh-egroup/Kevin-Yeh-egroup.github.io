import { useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Segmented, SegPanel } from '../components/Segmented'
import { demoWeek } from './demo-data'
import './workbench.css'

type Step = 'week' | 'report' | 'slides'
type ReportMode = 'brief' | 'full'

const steps: { id: Step; label: string }[] = [
  { id: 'week', label: '每週工作' },
  { id: 'report', label: '週報草稿' },
  { id: 'slides', label: '示範簡報' },
]
const reportModes: { id: ReportMode; label: string }[] = [
  { id: 'brief', label: '重點版' },
  { id: 'full', label: '完整版' },
]
const { project, dates, tasks } = demoWeek
const done = tasks.filter((task) => task.status === 'done')
const doing = tasks.filter((task) => task.status === 'doing')
const hours = tasks.reduce((total, task) => total + task.hours, 0)
const statusLabels = { done: '完成', doing: '進行中' }
const workLink = '../#work-workbench'

export function WorkbenchDemo() {
  const [step, setStep] = useState<Step>('week')
  const [selected, select] = useState(tasks[0])
  const [reportMode, setReportMode] = useState<ReportMode>('brief')
  const [slide, setSlide] = useState(0)
  const pageTabs = useId()
  const reportTabs = useId()
  const heading = useRef<HTMLHeadingElement>(null)
  const focusHeading = useRef(false)

  useLayoutEffect(() => {
    if (focusHeading.current) {
      focusHeading.current = false
      heading.current?.focus({ preventScroll: true })
      heading.current?.scrollIntoView({ block: 'nearest' })
    }
  }, [step])

  function goTo(next: Step) {
    focusHeading.current = true
    setStep(next)
  }

  function restart() {
    select(tasks[0])
    setReportMode('brief')
    setSlide(0)
    goTo('week')
  }

  function turnSlide(offset: number) {
    setSlide((current) => Math.min(slideCount - 1, Math.max(0, current + offset)))
  }

  function onSlideKey(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      turnSlide(event.key === 'ArrowLeft' ? -1 : 1)
    }
  }

  const doneList = <TaskSummaries tasks={done} selectedId={selected.id} full={reportMode === 'full'} />
  const doingList = <TaskSummaries tasks={doing} selectedId={selected.id} full={reportMode === 'full'} />
  const nextList = <ul>{demoWeek.next.map((item) => <li key={item}>{item}</li>)}</ul>
  const slides = [
    { label: '週進度報告・模擬資料', title: project, body: <p>{dates}</p> },
    { label: '本週完成', title: `完成 ${done.length} 項工作`, body: doneList },
    { label: '進行中', title: `${doing.length} 項工作進行中`, body: doingList },
    { label: '下週計畫', title: '接下來要做的事', body: nextList },
  ]
  const slideCount = slides.length
  const currentSlide = slides[slide]

  return (
    <main className="wrap workbench" aria-labelledby="workbench-title">
      <header className="workbench-header">
        <a className="button-text" href={workLink}>← 回作品區</a>
        <span className="workbench-badge">模擬資料</span>
      </header>
      <div className="workbench-intro">
        <h1 id="workbench-title">Kevin 工作檯</h1>
        <p>從虛構的市集提案開始，看看每週工作怎麼整理成週報和簡報。操作只留在這一頁。</p>
      </div>
      <div className="workbench-steps">
        <Segmented items={steps} value={step} onChange={setStep} idBase={pageTabs} label="示範步驟" />
      </div>

      <SegPanel idBase={pageTabs} id="week" show={step === 'week'} className="workbench-panel">
        <h2 ref={heading} tabIndex={-1}>{project} <span className="workbench-badge">虛構專案</span></h2>
        <p className="workbench-caption">{dates}｜{tasks.length} 筆工作 · 完成 {done.length} · 進行中 {doing.length} · 共 {hours} 小時</p>
        <div className="workbench-week">
          <ul className="workbench-tasks" aria-label="這週的模擬工作紀錄">
            {tasks.map((task) => (
              <li key={task.id}>
                <button type="button" aria-pressed={task.id === selected.id} onClick={() => select(task)}>
                  <time dateTime={task.date}>{task.day}</time>
                  <span>{task.title}</span>
                  <span className={`workbench-status status-${task.status}`}>{statusLabels[task.status]}</span>
                </button>
              </li>
            ))}
          </ul>
          <article className="workbench-detail" aria-live="polite" aria-atomic="true">
            <h3>{selected.title}</h3>
            <p>{selected.detail}</p>
            <dl>
              <dt>日期</dt><dd><time dateTime={selected.date}>2026/{selected.day}</time></dd>
              <dt>花了</dt><dd>{selected.hours} 小時</dd>
              <dt>狀態</dt><dd>{statusLabels[selected.status]}</dd>
              <dt>接下來</dt><dd>{selected.next}</dd>
            </dl>
          </article>
        </div>
        <div className="workbench-actions">
          <button className="button-primary" type="button" onClick={() => goTo('report')}>看這些工作怎麼變成週報 <span aria-hidden="true">→</span></button>
        </div>
      </SegPanel>

      <SegPanel idBase={pageTabs} id="report" show={step === 'report'} className="workbench-panel">
        <h2 ref={heading} tabIndex={-1}>週報草稿</h2>
        <p className="workbench-caption">用同一週的紀錄整理出重點。切換摘要，可在簡報看到同樣的內容。</p>
        <Segmented items={reportModes} value={reportMode} onChange={setReportMode} idBase={reportTabs} label="週報摘要" size="sm" />
        {reportModes.map(({ id }) => (
          <SegPanel key={id} idBase={reportTabs} id={id} show={reportMode === id}>
            <article className="workbench-report">
              <h3>{project}</h3>
              <p className="workbench-caption">{dates}</p>
              <p>這週完成 {done.length} 項工作，{doing.length} 項進行中，共投入 {hours} 小時。{reportMode === 'full' && demoWeek.reportNote}</p>
              <h4>本週完成</h4>
              {doneList}
              <h4>進行中</h4>
              {doingList}
              <h4>下週計畫</h4>
              {nextList}
            </article>
          </SegPanel>
        ))}
        <div className="workbench-actions">
          <button className="button-primary" type="button" onClick={() => goTo('slides')}>把這份週報放進簡報 <span aria-hidden="true">→</span></button>
          <button className="button-quiet" type="button" onClick={() => goTo('week')}><span aria-hidden="true">←</span> 回每週工作</button>
        </div>
      </SegPanel>

      <SegPanel idBase={pageTabs} id="slides" show={step === 'slides'} className="workbench-panel">
        <h2 ref={heading} tabIndex={-1}>示範簡報</h2>
        <p className="workbench-caption">同一份週報，排成 {slideCount} 頁投影片。可以按按鈕，或在投影片上按鍵盤左右鍵。</p>
        <div className="workbench-slide" role="group" tabIndex={0} aria-label={`投影片 ${slide + 1}／${slideCount}`} onKeyDown={onSlideKey}>
          <p className="workbench-slide-label">{currentSlide.label}</p>
          <h3>{currentSlide.title}</h3>
          {currentSlide.body}
        </div>
        <div className="workbench-pager">
          <button className="button-quiet" type="button" aria-disabled={slide === 0} onClick={() => turnSlide(-1)}><span aria-hidden="true">←</span> 上一頁</button>
          <p role="status">第 {slide + 1} / {slideCount} 頁</p>
          <button className="button-quiet" type="button" aria-disabled={slide === slideCount - 1} onClick={() => turnSlide(1)}>下一頁 <span aria-hidden="true">→</span></button>
        </div>
        {slide === slideCount - 1 ? (
          <div className="workbench-detail workbench-end">
            <h3>你看完這週的示範了</h3>
            <p>這份週報和簡報都來自剛才的 {tasks.length} 筆模擬工作紀錄。</p>
            <div className="workbench-actions">
              <a className="button-primary" href={workLink}>回作品區</a>
              <button className="button-quiet" type="button" onClick={restart}>從頭再看一次</button>
            </div>
          </div>
        ) : null}
        <div className="workbench-actions">
          <button className="button-quiet" type="button" onClick={() => goTo('report')}><span aria-hidden="true">←</span> 回週報草稿</button>
        </div>
      </SegPanel>
    </main>
  )
}

function TaskSummaries({ tasks, selectedId, full }: { tasks: typeof demoWeek.tasks; selectedId: string; full: boolean }) {
  return (
    <ul>
      {tasks.map(({ id, summary, detail }) => (
        <li key={id}>
          {id === selectedId ? <> <mark>{summary}</mark> <span className="workbench-badge">你選的工作</span></> : summary}
          {full ? <p className="workbench-context">{detail}</p> : null}
        </li>
      ))}
    </ul>
  )
}
