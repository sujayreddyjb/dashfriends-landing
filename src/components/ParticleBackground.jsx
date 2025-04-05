import { useCallback } from 'react';
import { Engine } from 'tsparticles-engine';
import { tsParticles } from 'tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div id="tsparticles" className="absolute inset-0">
      {tsParticles.load('tsparticles', {
        background: {
          opacity: 0
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ["#4F46E5", "#9333EA", "#10B981"]
          },
          links: {
            enable: true,
            color: "#4F46E5",
            distance: 150,
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            direction: "none",
            outModes: {
              default: "bounce"
            },
            random: true,
            speed: 0.5,
            straight: false
          },
          number: {
            density: {
              enable: true,
              area: 800
            },
            value: 80
          },
          opacity: {
            value: 0.4
          },
          shape: {
            type: "circle"
          },
          size: {
            value: { min: 1, max: 3 }
          }
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab"
            }
          },
          modes: {
            grab: {
              distance: 150,
              links: {
                opacity: 0.3
              }
            }
          }
        }
      })}
    </div>
  );
};

export default ParticleBackground; 