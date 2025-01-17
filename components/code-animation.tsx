'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const pythonCode = `
# Django REST imports
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models Customer
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
 
class CustomerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=50, write_only=True, required=True
    )
    
    class Meta:
        model = Customer
        fields = [
            'email',  'first_name', 'last_name', 
            'phone_number', 'password', 'image'
        ]
    
    def validate(self, data):
        if len(data['password']) < 8:
            raise ValidationError(
            {
               "Password": "Password must be more than 6 characters"
            }
        )
        return data
`.trim()

const keywords = ['class', 'def', 'from', 'import', 'if', 'else', 'return']
const builtins = ['authenticate']

export default function CodeAnimation() {
  const [currentLine, setCurrentLine] = useState(0)
  const lines = pythonCode.split('\n')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prevLine) => (prevLine + 1) % lines.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [lines.length])

  const highlightSyntax = (line: string) => {
    if (line.trim() === '') {
      return <span className="inline-block h-4 w-full"></span>
    }

    return line.split(/(\s+)/).map((part, index) => {
      if (keywords.includes(part.trim())) {
        return <span key={index} className="text-purple-400">{part}</span>
      } else if (builtins.includes(part.trim())) {
        return <span key={index} className="text-yellow-300">{part}</span>
      } else if (part.match(/^[A-Z][A-Za-z0-9]*$/)) {
        return <span key={index} className="text-green-400">{part}</span>
      } else if (part.match(/^['"].*['"]$/)) {
        return <span key={index} className="text-orange-300">{part}</span>
      } else if (part.startsWith('#')) {
        return <span key={index} className="text-purple-500">{part}</span>
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 sm:p-6 font-mono text-xs sm:text-sm w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-8 lg:mt-0" style={{borderRadius: 6, overflowX: 'hidden', maxHeight: 'calc(100vh - 200px)'}}>
      <div className="mb-4 flex items-center space-x-2">
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
        <span className="text-gray-400 ml-2 text-xs sm:text-sm">Django authentication</span>
      </div>
      <div className="bg-black bg-opacity-50 p-2 sm:p-4 rounded-md overflow-x-auto" style={{overflowX: 'hidden'}}>
        <pre className="text-white">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.5 }}
              animate={{ 
                opacity: index === currentLine ? 1 : 0.5,
                backgroundColor: index === currentLine ? 'rgba(59, 130, 246, 0.2)' : 'transparent'
              }}
              transition={{ duration: 0.3 }}
            >
              {highlightSyntax(line)}
            </motion.div>
          ))}
        </pre>
      </div>
    </div>
  )
}

