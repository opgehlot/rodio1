import { Carousel as FlowbiteCarousel } from "flowbite-react";
import { Link } from "react-router-dom";

export function HeroCarousel() {
  return (
    <section className="w-full">
      <div className="h-[300px] sm:h-[400px] md:h-[420px] lg:h-[500px] xl:h-[550px]">
        <FlowbiteCarousel slideInterval={2000} indicators={false}>
          {/* Slide 1 */}
          <div className="relative h-full">
            <img
              src="https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg"
              alt="Truck"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="max-w-7xl mx-auto px-6 text-white">
                <h1 className="text-2xl md:text-5xl font-bold">
                  India's Trusted Transport Network
                </h1>

                <p className="mt-4 text-sm md:text-xl max-w-xl">
                  Find verified transporters, brokers and contractors across
                  India.
                </p>

                <Link to="/dummydirctory">
                  <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold text-white">
                    Search Directory
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative h-full">
            <img
              src="https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg"
              alt="Logistics"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="max-w-7xl mx-auto px-6 text-white">
                <h1 className="text-2xl md:text-5xl font-bold">
                  Fast & Secure Logistics
                </h1>

                <p className="mt-4 text-sm md:text-xl">
                  Connect with trusted transport companies.
                </p>
              </div>
            </div>
          </div>
        </FlowbiteCarousel>
      </div>
    </section>
  );
}
export default HeroCarousel;
