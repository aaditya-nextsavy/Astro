
import Clouds from "./Clouds";
import Stars from "./Stars";
import Beam from "./Beam";
import LightRays from "./LightRays";
import LightRayAnimation from "./LightRayAnimation";

export default function GlobalBackground() {

  return (
    <div className="global-background">

      {/* <div className="background-sky" /> */}

      <Stars />

      <Clouds />


      <div className="background-noise" />

      <div className="background-color-layer-temp"></div>

      <div className="background-gradient-layer-temp"></div>

      <div className="background-top-light-temp">
        <svg width="1920" height="1082" viewBox="0 0 1920 1082" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_1_17)">
            <ellipse cx="941.796" cy="76.6704" rx="523.669" ry="491.83" fill="#008FF5" />
          </g>
          <defs>
            <filter id="filter0_f_1_17" x="-94.5731" y="-927.859" width="2072.74" height="2009.06" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="256.35" result="effect1_foregroundBlur_1_17" />
            </filter>
          </defs>
        </svg>

      </div>

      <div className="background-topright-light-temp">
        <svg width="1285" height="1247" viewBox="0 0 1285 1247" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_1_18)">
            <ellipse cx="1036.37" cy="241.914" rx="523.669" ry="491.83" fill="#70B9EE" />
          </g>
          <defs>
            <filter id="filter0_f_1_18" x="0.000183105" y="-762.616" width="2072.74" height="2009.06" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="256.35" result="effect1_foregroundBlur_1_18" />
            </filter>
          </defs>
        </svg>

      </div>
     

      <div className="background-bottom-dark-temp">

      </div>

      <div className="background-leftRight-dark-temp">
        {/* <div className="relative w-full h-full"> */}
          <div className="info-sticky-card-section__card-noise-bg">
              
          {/* </div> */}
        </div>

      </div>


      <div style={{ position: 'relative', background: "#111", width: '100%', height: '100%' }}>

        {/* LightRays fills the background */}
        <LightRayAnimation
          raysOrigin="top-right"
          raysColor="#ffffff"
          raysSpeed={0.8}
          lightSpread={3}
          rayLength={7}
          followMouse={false}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />

      </div>



    </div>
  );

}