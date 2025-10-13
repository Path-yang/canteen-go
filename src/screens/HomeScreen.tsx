import React from 'react';
import { useNavigate } from 'react-router-dom';
import LiquidEther from '../components/LiquidEther';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0">
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

        {/* Overlay content - only the button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={() => navigate('/menu')}
            className="pointer-events-auto bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-xl font-bold text-2xl md:text-3xl shadow-lg transition-transform duration-200 hover:scale-105"
          >
            Start Ordering
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
