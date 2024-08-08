'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import moonImage from '../public/moon.jpg';
import hero from '../public/superhero.png';

const Home = () => {
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
        {/* Animated Stars */}
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
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300">
                Get Started
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
                  <div className="absolute -top-8 -right-8 text-black bg-white p-4 rounded-lg shadow-lg dialogue-cloud">
                    Hi there...!
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle 1.5s infinite alternate;
          opacity: 0.8;
        }

        @keyframes twinkle {
          0% {
            opacity: 0.5;
            transform: scale(1);
          }
          100% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .star:nth-child(1) { top: 10%; left: 20%; width: 5px; height: 5px; }
        .star:nth-child(2) { top: 30%; left: 40%; width: 6px; height: 6px; }
        .star:nth-child(3) { top: 15%; left: 60%; width: 4px; height: 4px; }
        .star:nth-child(4) { top: 50%; left: 70%; width: 7px; height: 7px; }
        .star:nth-child(5) { top: 80%; left: 30%; width: 3px; height: 3px; }
        .star:nth-child(6) { top: 25%; left: 80%; width: 5px; height: 5px; }
        .star:nth-child(7) { top: 60%; left: 10%; width: 6px; height: 6px; }
        .star:nth-child(8) { top: 40%; left: 50%; width: 5px; height: 5px; }
        .star:nth-child(9) { top: 70%; left: 90%; width: 4px; height: 4px; }
        .star:nth-child(10) { top: 20%; left: 30%; width: 6px; height: 6px; }

        .dialogue-cloud {
          position: absolute;
          padding: 10px 20px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .dialogue-cloud::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 20px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid white;
        }
      `}</style>
    </div>
  );
};

export default Home;
