import React from 'react';
import { useNavigate } from 'react-router-dom';
import LiquidEther from '../components/LiquidEther';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-sm">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-sm mb-4">
            Welcome to CanteenGo
          </h1>
          <p className="text-white/90 max-w-2xl mb-8">
            Fresh, delicious meals from your campus canteen. Skip the queue and order in seconds.
          </p>
          <div className="pointer-events-auto">
            <button
              onClick={() => navigate('/menu')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Ordering
            </button>
          </div>
        </div>
      </div>

      {/* Content teaser */}
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Curated Menu</h3>
          <p className="text-gray-600 text-sm">Discover popular dishes and new favorites.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Zero Queue</h3>
          <p className="text-gray-600 text-sm">Order ahead and pick up when it’s ready.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Student Friendly</h3>
          <p className="text-gray-600 text-sm">Affordable options made for campus life.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

