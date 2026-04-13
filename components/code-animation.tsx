'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const code = `# FastAPI service with RabbitMQ + MCP agent
from fastapi import FastAPI
from rabbitmq_easy import RabbitMQClient
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.agents import create_react_agent
from langchain_openai import ChatOpenAI

app = FastAPI()
mq = RabbitMQClient(host="rabbitmq")

# MCP-connected AI agent
async def build_agent():
    async with MultiServerMCPClient({
        "onfon": {
            "url": "http://mcp-server:8001/sse",
            "transport": "sse",
        }
    }) as client:
        llm = ChatOpenAI(model="gpt-4o", temperature=0)
        tools = client.get_tools()
        return create_react_agent(llm, tools)

@app.post("/devices/{device_id}/command")
async def send_command(device_id: str, cmd: dict):
    # publish to device queue
    await mq.publish(
        queue=f"device.{device_id}",
        message={"cmd": cmd, "ts": utcnow()}
    )
    return {"status": "queued", "device": device_id}

@app.get("/health")
async def health():
    return {"status": "ok", "broker": await mq.ping()}`.trim()

const keywords = ['from', 'import', 'class', 'def', 'async', 'for', 'await',
  'return', 'with', 'if', 'in', 'True', 'False', 'None']

export default function CodeAnimation() {
  const [currentLine, setCurrentLine] = useState(0)
  const lines = code.split('\n')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % lines.length)
    }, 900)
    return () => clearInterval(interval)
  }, [lines.length])

  const highlightLine = (line: string) => {
    if (line.trim().startsWith('#')) {
      return <span className="text-slate-500 italic">{line}</span>
    }

    const tokens = line.split(/(\s+|[()=,\[\]{}:.]|"[^"]*"|'[^']*'|f"[^"]*")/)
    return tokens.map((token, i) => {
      if (keywords.includes(token.trim()) && token.trim() !== '') {
        return <span key={i} className="text-purple-400 font-semibold">{token}</span>
      }
      if (/^(f?"[^"]*"|'[^']*')$/.test(token)) {
        return <span key={i} className="text-amber-300">{token}</span>
      }
      if (/^[A-Z][A-Za-z0-9]*$/.test(token.trim())) {
        return <span key={i} className="text-emerald-400">{token}</span>
      }
      if (/^\d+(\.\d+)?$/.test(token.trim())) {
        return <span key={i} className="text-orange-400">{token}</span>
      }
      if (['rabbitmq_easy', 'langchain', 'fastapi', 'openai', 'mcp'].some(p => token.toLowerCase().includes(p))) {
        return <span key={i} className="text-lime-400">{token}</span>
      }
      return <span key={i} className="text-slate-300">{token}</span>
    })
  }

  return (
    <div className="bg-[#0d1117] rounded-xl p-4 sm:p-5 font-mono text-xs w-full max-w-xl mx-auto border border-white/10 shadow-2xl shadow-black/40">
      {/* Window chrome */}
      <div className="mb-4 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <span className="text-slate-500 ml-3 text-xs">device_service.py</span>
        <span className="ml-auto text-xs text-lime-500/70 animate-pulse">● running</span>
      </div>

      {/* Code */}
      <div className="overflow-x-hidden overflow-y-hidden max-h-[380px]">
        <pre className="text-white leading-6">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              animate={{
                opacity: index === currentLine ? 1 : index < currentLine ? 0.55 : 0.3,
                backgroundColor: index === currentLine ? 'rgba(132, 204, 22, 0.07)' : 'transparent',
              }}
              transition={{ duration: 0.25 }}
              className="px-1 rounded"
            >
              <span className="text-slate-600 mr-3 select-none text-[10px]">
                {String(index + 1).padStart(2, ' ')}
              </span>
              {highlightLine(line)}
            </motion.div>
          ))}
        </pre>
      </div>
    </div>
  )
}
