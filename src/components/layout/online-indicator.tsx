import { AnimatePresence, motion } from 'framer-motion';
import { useOnline } from '~/hooks/layouts/use-online';

export function OnlineIndicator() {
  const online = useOnline();

  return (
    <AnimatePresence>
      {!online && (
        <motion.div
          className="absolute top-0 w-full bg-red-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
            <div className="sm:px-16 sm:text-center">
              <p className="font-medium text-white">
                You appears to be offline. Please check your network.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
