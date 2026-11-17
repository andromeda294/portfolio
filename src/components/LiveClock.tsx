import { useEffect, useState } from 'react'
import './LiveClock.css'

const monthFormatter = new Intl.DateTimeFormat('pt-PT', {
  month: 'short',
  timeZone: 'Africa/Luanda',
})
const timeFormatter = new Intl.DateTimeFormat('pt-PT', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
  timeZone: 'Africa/Luanda',
})

function LiveClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  const day = String(now.getDate()).padStart(2, '0')
  const month = monthFormatter.format(now).replace(/\.$/, '')

  return (
    <time
      aria-label="Data e hora locais de Luanda"
      className="live-clock"
      dateTime={now.toISOString()}
    >
      <span className="live-clock-label">LUANDA · ANGOLA</span>
      <span className="live-clock-date">{day} {month}</span>
      <span className="live-clock-time">{timeFormatter.format(now)}</span>
    </time>
  )
}

export default LiveClock
