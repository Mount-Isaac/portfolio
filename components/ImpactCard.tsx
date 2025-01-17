import { ImpactCardProps } from "./types"
import { motion } from 'framer-motion'


const ImpactCard: React.FC<ImpactCardProps> = ({ icon: Icon, title, description }) => (
    <motion.div
      className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Icon className="w-12 h-12 text-purple-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )


export default ImpactCard