'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const aiCode = `# AI Agent with RAG + LangChain
from langchain.agents import create_react_agent
from langchain_openai import ChatOpenAI
from langchain.tools import Tool
from langchain_pinecone import PineconeVectorStore
from langchain.chains import RetrievalQA

# Initialize LLM
llm = ChatOpenAI(model="gpt-4o", temperature=0.1)

# Vector store for semantic search
vectorstore = PineconeVectorStore(
    index_name="sports-analytics",
    embedding=OpenAIEmbeddings()
)

# RAG retrieval chain
retriever = vectorstore.as_retriever(
    search_type="similarity", k=8
)

# Build autonomous AI agent
agent = create_react_agent(
    llm=llm,
    tools=[
        Tool("search_docs", retriever.invoke,
             "Search sports analytics knowledge base"),
        Tool("predict_value", valuation_model.run,
             "Predict sponsorship deal value"),
    ],
    prompt=agent_prompt
)

# Stream agent response
async for chunk in agent.astream({
    "input": "Analyze Q4 sponsorship ROI"
}):
    yield chunk["output"]`.trim()

const keywords = ['from', 'import', 'class', 'def', 'async', 'for', 'await', 'return', 'yield', 'if', 'in']

export default function CodeAnimation() {
  const [currentLine, setCurrentLine] = useState(0)
  const lines = aiCode.split('\n')

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

    const tokens = line.split(/(\s+|[()=,\[\]{}:.]|"[^"]*"|'[^']*')/)
    return tokens.map((token, i) => {
      if (keywords.includes(token.trim()) && token.trim() !== '') {
        return <span key={i} className="text-purple-400 font-semibold">{token}</span>
      }
      if (/^["'].*["']$/.test(token)) {
        return <span key={i} className="text-amber-300">{token}</span>
      }
      if (/^[A-Z][A-Za-z0-9]*$/.test(token.trim())) {
        return <span key={i} className="text-emerald-400">{token}</span>
      }
      if (/^\d+$/.test(token.trim())) {
        return <span key={i} className="text-orange-400">{token}</span>
      }
      if (['langchain', 'openai', 'pinecone', 'langchain_openai', 'langchain_pinecone'].some(p => token.includes(p))) {
        return <span key={i} className="text-lime-400">{token}</span>
      }
      return <span key={i} className="text-slate-300">{token}</span>
    })
  }

  return (
    <div className="bg-[#0d1117] rounded-xl p-4 sm:p-5 font-mono text-xs w-full max-w-xl mx-auto border border-white/10 shadow-2xl">
      {/* Window chrome */}
      <div className="mb-4 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <span className="text-slate-500 ml-3 text-xs">ai_agent.py</span>
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
                backgroundColor: index === currentLine ? 'rgba(132, 204, 22, 0.08)' : 'transparent',
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
