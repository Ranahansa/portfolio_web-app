'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Caveat } from 'next/font/google';
import moonImage from '../public/moon.jpg';
import hero from '../public/superhero.png';
import cloudImage from '../public/cloud1.png';
import { saveAs } from 'file-saver';

const caveat = Caveat({ subsets: ["latin"], weight: "700" });

const Home = () => {
  const [loading, setLoading] = useState(false);

  const handleResumeDownload = () => {
    setLoading(true);
    saveAs('/resume.pdf', 'my-resume-filename.pdf');
    setTimeout(() => {
      setLoading(false);
    }, 5000); 
  };

  return (
    <div className="container mx-auto px-11">
      <section className="relative bg-gray-900 text-white py-24 md:py-32 rounded-2xl mt-3 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={moonImage}
            alt="Moon Background"
            className="w-full h-full object-cover opacity-50"
            priority
          />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="stars">
            {Array.from({ length: 50 }).map((_, index) => (
              <div key={index} className={`star star-${index}`} />
            ))}
          </div>
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Elevate Your <span className="text-blue-500">Online Presence</span>
              </h1>
              <p className="text-lg md:text-xl mb-10">
                Discover the power of our cutting-edge portfolio solutions and
                transform your digital footprint.
              </p>
              <button
                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleResumeDownload}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loader"></span>
                    <span className="ml-2">Downloading...</span>
                  </>
                ) : (
                  'Download Resume'
                )}
              </button>
            </div>
            <div className="relative flex justify-center">
              <motion.div
                className="relative w-full max-w-md group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                whileHover={{
                  scale: 1.1,
                  opacity: 0.9,
                }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-xl bg-gradient-to-r from-gray-800 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  whileHover={{ opacity: 0.7, scale: 1.05 }}
                  transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
                />
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  >
                    <Image
                      src={hero}
                      alt="super"
                      className="w-full h-auto rounded-lg shadow-lg"
                      priority
                    />
                  </motion.div>
                  <div className="absolute top-[-70px] -right-4 w-48 h-32">
                    <Image
                      src={cloudImage}
                      alt="Dialogue Cloud"
                      className="w-full h-full object-contain"
                    />
                    <motion.div
                      className={`absolute top-11 left-8 text-black text-2xl font-extrabold ${caveat.className}`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      🖐🏿 Hi There..!
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;