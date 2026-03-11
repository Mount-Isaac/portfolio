'use client'

import { useEffect, useRef } from 'react'

const tools = [
  'LangChain', 'LlamaIndex', 'GPT-4', 'Claude API', 'RAG', 'LLM',
  'FastAPI', 'Flask', 'Django', 'Python', 'Node.js', 'TypeScript',
  'Docker', 'Kubernetes', 'RabbitMQ', 'Kafka', 'Redis', 'PostgreSQL',
  'MLflow', 'Pinecone', 'Databricks', 'Hugging Face', 'AI Agents',
  'AWS', 'GCP', 'CI/CD', 'Jenkins', 'Terraform', 'Microservices',
  'React', 'Next.js', 'GraphQL', 'WebSockets', 'Embeddings', 'Vector DB',
  'MongoDB', 'Celery', 'Prompt Engineering', 'Fine-Tuning', 'NumPy',
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
    const particleCount = 55

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
        this.size = Math.random() * 7 + 7
        this.speedX = (Math.random() - 0.5) * 0.22
        this.speedY = Math.random() * 0.18 + 0.04
        this.content = tools[Math.floor(Math.random() * tools.length)]
        this.color = `rgba(255,255,255,${(Math.random() * 0.07 + 0.04).toFixed(2)})`
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

      // Draw curved lines — subtle, slow
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)'
      ctx.lineWidth = 1
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height * (i / 4 + Math.sin(Date.now() * 0.00025 + i) * 0.07))
        for (let x = 0; x < canvas.width; x += 12) {
          ctx.lineTo(x, canvas.height * (i / 4 + Math.sin(Date.now() * 0.00025 + i + x * 0.006) * 0.07))
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

