'use client'

import { useEffect, useRef } from 'react'

const tools = [
  'React', 'Next.js', 'TypeScript', 'Python', 'Django', 'TensorFlow',
  'PyTorch', 'SQL', 'MongoDB', 'GraphQL', 'Docker', 'Kubernetes',
  'Git', 'CI/CD', 'AWS', 'Azure', 'GCP', 'Redux', 'Vue', 'Angular',
  'Node.js', 'Express', 'Flask', 'FastAPI', 'Pandas', 'NumPy',
  'Scikit-learn', 'Matplotlib', 'D3.js', 'Three.js', 'WebGL',
  'Sass', 'Tailwind CSS', 'Bootstrap', 'Webpack', 'Babel',
  'Jest', 'Cypress', 'Selenium', 'RESTful API', 'WebSockets'
]

export default function AnimatedBackgroundLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      content: string
      color: string

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.size = Math.random() * 20 + 5
        this.speedX = Math.random() * 0.9
        this.speedY = Math.random() * 0.9
        this.content = tools[Math.floor(Math.random() * tools.length)] 
        this.color = `hsl(${Math.random() * 360}, 25%, 25%)`
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvasWidth) this.x = 0
        else if (this.x < 0) this.x = canvasWidth
        if (this.y > canvasHeight) this.y = 0
        else if (this.y < 0) this.y = canvasHeight
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.font = `${this.size}px Arial`
        ctx.fillText(this.content, this.x, this.y)
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw curved lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 2
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height * (i / 5 + Math.sin(Date.now() * 0.001 + i) * 0.1))
        for (let x = 0; x < canvas.width; x += 10) {
          ctx.lineTo(x, canvas.height * (i / 5 + Math.sin(Date.now() * 0.001 + i + x * 0.01) * 0.1))
        }
        ctx.stroke()
      }

      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height)
        particle.draw(ctx)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}

