import { FaTelegram as Telegram, FaTwitter as Twitter, FaDiscord as Discord, FaWhatsapp as Whatsapp } from 'react-icons/fa'

export default function SocialLinks() {
  return (
    <div className="fixed right-10 top-1/2 z-10000 -translate-y-1/2 flex flex-col space-y-8">
      <a 
        href="https://x.com/MtIsaac2"
        target='_blank'
        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-orange-50 hover:bg-white/10 transition-colors"
        aria-label="Twitter"
      >
        <Twitter className="w-5 h-5" />
      </a>
      <a 
        href="https://discordapp.com/users/1007688891161133177" 
        target='_blank'
        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-cyan-500 hover:bg-white/10 transition-colors"
        aria-label="Discord"
      >
        <Discord className="w-5 h-5" />
      </a>
      <a 
        href="https://t.me/thebot_maker" 
        target='_blank'
        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-blue-200 hover:bg-white/10 transition-colors"
        aria-label="Telegram"
      >
        <Telegram className="w-5 h-5" />
      </a>
      <a 
        href="https://wa.me/254759856000" 
        target='_blank'
        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-green-400 hover:bg-white/10 transition-colors"
        aria-label="Whatsapp"
      >
        <Whatsapp className="w-5 h-5" />
      </a>
    </div>
  )
}



