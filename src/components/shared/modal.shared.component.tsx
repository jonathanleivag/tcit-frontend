import { FC } from 'react'
import { ChildrenProps } from '../../type'
import { motion } from 'framer-motion'

const ModalSharedComponent: FC<ChildrenProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50'
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className='bg-white rounded-lg p-6 w-80 shadow-lg'
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default ModalSharedComponent
