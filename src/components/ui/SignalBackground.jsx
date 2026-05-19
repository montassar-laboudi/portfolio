import { useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Neural Signal Propagation — full-page fixed background
// 4-layer network [4 → 6 → 6 → 3] with sine-wave edges and glowing pulses
// ─────────────────────────────────────────────────────────────────────────────
const LAYER_SIZES     = [4, 6, 6, 3]
const PAD_X           = 0.13   // fraction of width kept as margin each side
const PAD_Y           = 0.12   // fraction of height kept as margin each side
const EDGE_AMP        = 7      // px — perpendicular wave amplitude
const EDGE_AMP_RDM    = 2      // px — reduced motion amplitude
const EDGE_FREQ       = 1.5    // sine cycles along each edge
const PHASE_SPEED     = 0.008  // rad / frame — breathing speed
const NODE_R_REST     = 3.5    // px — neuron radius at rest
const NODE_R_ACTIVE   = 7.5    // px — neuron radius at peak activation
const PULSE_INTERVAL  = 2000   // ms between auto-spawns
const PULSE_DURATION  = 620    // ms to travel one inter-layer hop
const PULSE_STAGGER   = 75     // ms between fanned-out pulses on arrival
const MAX_PULSES      = 10
const TRAIL_LEN       = 0.13   // fraction of edge for streak tail
const TRAIL_PTS       = 7

const easeInOutSine = t => (1 - Math.cos(Math.PI * t)) / 2

function layerStart(li) {
  return LAYER_SIZES.slice(0, li).reduce((a, b) => a + b, 0)
}

export default function SignalBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId
    let nodes = [], edges = [], pulses = []
    let lastPulse  = 0
    let rgb        = [20, 184, 166]
    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Accent color from CSS variable ──────────────────────────────────────
    const readAccent = () => {
      const hex = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim()
      if (/^#[0-9a-f]{6}$/i.test(hex)) {
        rgb = [
          parseInt(hex.slice(1, 3), 16),
          parseInt(hex.slice(3, 5), 16),
          parseInt(hex.slice(5, 7), 16),
        ]
      }
    }
    readAccent()
    document.addEventListener('themechange', readAccent)

    // ── Determine global opacity scale (light mode is much dimmer) ──────────
    const getScale = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim() === '#0d9488' ? 0.38 : 1.0

    let scale = getScale()
    document.addEventListener('themechange', () => { scale = getScale() })

    // ── Build stable network ─────────────────────────────────────────────────
    const buildNetwork = () => {
      const W = canvas.width, H = canvas.height
      const x0 = W * PAD_X,      x1 = W * (1 - PAD_X)
      const y0 = H * PAD_Y,      y1 = H * (1 - PAD_Y)
      const usableW = x1 - x0,  usableH = y1 - y0

      nodes = []
      for (let li = 0; li < LAYER_SIZES.length; li++) {
        const count = LAYER_SIZES[li]
        const x     = x0 + (li / (LAYER_SIZES.length - 1)) * usableW
        for (let ni = 0; ni < count; ni++) {
          const baseY = count === 1
            ? H / 2
            : y0 + (ni / (count - 1)) * usableH
          // deterministic jitter — stable across frames / resizes
          const jitter = Math.sin(li * 17 + ni * 31) * 14
          nodes.push({
            x, y: baseY + jitter,
            layer: li,
            r:       NODE_R_REST,
            opacity: 0.35,
            anim:  0,    // 0 rest · 1 growing · 2 returning
            aStart:  0,
          })
        }
      }

      edges = []
      let seed = 0
      for (let li = 0; li < LAYER_SIZES.length - 1; li++) {
        const aS = layerStart(li), bS = layerStart(li + 1)
        for (let ai = 0; ai < LAYER_SIZES[li]; ai++) {
          for (let bi = 0; bi < LAYER_SIZES[li + 1]; bi++) {
            edges.push({
              from: aS + ai,
              to:   bS + bi,
              fromLayer: li,
              phase: (seed++ * 0.43) % (Math.PI * 2),
            })
          }
        }
      }

      pulses = []
    }

    // ── Resize with 150 ms debounce ──────────────────────────────────────────
    let resizeTimer
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      buildNetwork()
    }
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150) }
    resize()
    window.addEventListener('resize', onResize)

    // ── Skip work when canvas is off-screen ──────────────────────────────────
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)

    // ── Wave point sampler ───────────────────────────────────────────────────
    const wave = (edge, t, amp) => {
      const a = nodes[edge.from], b = nodes[edge.to]
      const dx = b.x - a.x, dy = b.y - a.y
      const len = Math.hypot(dx, dy) || 1
      const px = -dy / len, py = dx / len   // perpendicular unit vector
      const d  = amp * Math.sin(2 * Math.PI * EDGE_FREQ * t + edge.phase)
      return { x: a.x + dx * t + px * d, y: a.y + dy * t + py * d }
    }

    // ── Pulse management ─────────────────────────────────────────────────────
    const spawnInput = (now) => {
      const srcIdx   = Math.floor(Math.random() * LAYER_SIZES[0])
      const outEdges = edges.filter(e => e.from === srcIdx)
      if (!outEdges.length || pulses.length >= MAX_PULSES) return
      const edge = outEdges[Math.floor(Math.random() * outEdges.length)]
      pulses.push({ edge, t0: now })
    }

    const spawnOnward = (nodeIdx, now) => {
      edges
        .filter(e => e.from === nodeIdx)
        .forEach((edge, i) => {
          if (pulses.length < MAX_PULSES)
            pulses.push({ edge, t0: now + i * PULSE_STAGGER })
        })
    }

    const activateNode = (idx, now) => {
      const n = nodes[idx]
      n.anim = 1; n.aStart = now
    }

    // ── Draw loop ────────────────────────────────────────────────────────────
    const draw = (now) => {
      animId = requestAnimationFrame(draw)
      if (!visible) return

      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      ctx.shadowBlur = 0

      const [r, g, b] = rgb
      const s  = scale
      const ac = a => `rgba(${r},${g},${b},${(a * s).toFixed(3)})`
      const amp = reduced ? EDGE_AMP_RDM : EDGE_AMP

      // ── Advance wave phases ─────────────────────────────────────────────
      edges.forEach(e => { e.phase += PHASE_SPEED })

      // ── Draw edges ──────────────────────────────────────────────────────
      edges.forEach(edge => {
        ctx.beginPath()
        ctx.lineWidth   = 0.9
        ctx.strokeStyle = ac(0.085)
        for (let i = 0; i <= 40; i++) {
          const p = wave(edge, i / 40, amp)
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
      })

      // ── Pulses ──────────────────────────────────────────────────────────
      if (!reduced) {
        const keep = []
        for (const pulse of pulses) {
          const elapsed = now - pulse.t0
          if (elapsed < 0) { keep.push(pulse); continue }

          const rawT = elapsed / PULSE_DURATION
          if (rawT >= 1.0) {
            activateNode(pulse.edge.to, now)
            if (nodes[pulse.edge.to].layer < LAYER_SIZES.length - 1)
              spawnOnward(pulse.edge.to, now)
            continue
          }
          keep.push(pulse)

          const head = easeInOutSine(rawT)
          ctx.shadowColor = ac(1)
          ctx.shadowBlur  = 18

          for (let ti = 0; ti < TRAIL_PTS; ti++) {
            const t1 = Math.max(0, head - (ti       / TRAIL_PTS) * TRAIL_LEN)
            const t2 = Math.max(0, head - ((ti + 1) / TRAIL_PTS) * TRAIL_LEN)
            const p1 = wave(pulse.edge, t1, amp)
            const p2 = wave(pulse.edge, t2, amp)
            const a  = 0.95 * (1 - ti / TRAIL_PTS)
            ctx.beginPath()
            ctx.strokeStyle = ac(a)
            ctx.lineWidth   = 2.8 * (1 - (ti / TRAIL_PTS) * 0.55)
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
          ctx.shadowBlur = 0
        }
        pulses = keep
      }

      // ── Nodes ────────────────────────────────────────────────────────────
      nodes.forEach(n => {
        if (n.anim === 1) {
          const t = Math.min((now - n.aStart) / 250, 1)
          n.r       = NODE_R_REST + (NODE_R_ACTIVE - NODE_R_REST) * easeInOutSine(t)
          n.opacity = 0.35 + 0.65 * easeInOutSine(t)
          if (t >= 1) { n.anim = 2; n.aStart = now }
        } else if (n.anim === 2) {
          const t = Math.min((now - n.aStart) / 420, 1)
          n.r       = NODE_R_ACTIVE - (NODE_R_ACTIVE - NODE_R_REST) * easeInOutSine(t)
          n.opacity = 1.0 - 0.65 * easeInOutSine(t)
          if (t >= 1) { n.anim = 0; n.r = NODE_R_REST; n.opacity = 0.35 }
        }

        // Outer glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4.5)
        grd.addColorStop(0,   ac(n.opacity * 0.55))
        grd.addColorStop(0.5, ac(n.opacity * 0.18))
        grd.addColorStop(1,   ac(0))
        ctx.beginPath()
        ctx.fillStyle = grd
        ctx.arc(n.x, n.y, n.r * 4.5, 0, Math.PI * 2)
        ctx.fill()

        // Core dot
        ctx.shadowBlur  = 12
        ctx.shadowColor = ac(0.65)
        ctx.beginPath()
        ctx.fillStyle = ac(n.opacity)
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // ── Layer labels ─────────────────────────────────────────────────────
      const LABELS = ['INPUT', 'HIDDEN', 'HIDDEN', 'OUTPUT']
      ctx.font      = '9px monospace'
      ctx.textAlign = 'center'
      ctx.fillStyle = ac(0.18)
      for (let li = 0; li < LAYER_SIZES.length; li++) {
        const n = nodes[layerStart(li)]
        if (n) ctx.fillText(LABELS[li], n.x, H * (1 - PAD_Y * 0.35))
      }

      // ── Auto-spawn ───────────────────────────────────────────────────────
      if (!reduced && now - lastPulse >= PULSE_INTERVAL) {
        lastPulse = now
        spawnInput(now)
      }
    }

    animId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('themechange', readAccent)
      io.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
