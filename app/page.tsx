'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SocialLinks from '@/components/social-links'
import CodeAnimation from '@/components/code-animation'
import AnimatedBackgroundLines from '@/components/animated-background-lines'
import { Download } from 'lucide-react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="relative min-h-screen bg-[#252730] overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url("/images/pattern.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Animated background lines */}
      <AnimatedBackgroundLines />
      <SocialLinks />

      <div className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen max-w-7xl mx-auto px-6 pt-20 lg:pt-0 mt-10">
        <div className="w-full lg:w-4/13 mb-12 lg:mb-0 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="lg:max-w-lg mx-auto lg:mx-0"
          >
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 via-orange-500 to-indigo-500">
              <span className="block text-5xl sm:text-7xl md:text-8xl font-serif mb-6">
                Isaac Kyalo
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              A Full-stack developer, Machine learning Engineer and a DevOps specialist.
            </p>

            <div className="flex justify-center lg:justify-start items-center space-x-8">
                <a target='_blank' href='https://drive.google.com/file/d/1yQldAQoWaIK0B2TtMm0EJiUeFX_pKMIg/view?usp=sharing'>
              <button className="bg-[#3a3d4a] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center space-x-2 hover:bg-gray-200 hover:text-[#252730] transition-colors text-base sm:text-lg font-semibold">
                <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Get Resume</span> 
              </button>
                </a>
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:flex justify-center lg:justify-end w-full lg:w-9/13 mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full"
          >
            <CodeAnimation />
          </motion.div>
        </div>
      </div>
    </main>
  )
}

