import type { Variants } from 'framer-motion'

export const createPulseVariants = (
  speed = 2,
  startColor = '#EDF2F7',
  endColor = '#A0AEC0',
): Variants => ({
  pulse: {
    background: [
      `linear-gradient(90deg, ${startColor}, ${endColor})`,
      `linear-gradient(90deg, ${endColor}, ${startColor})`,
    ],
    backgroundSize: '200% 100%',
    backgroundPosition: ['100% 50%', '0% 50%'],
    transition: {
      duration: speed,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
})
