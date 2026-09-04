import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "919993738255";
const MESSAGE = "Hello Rodio, I want to know more about your services.";

function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    MESSAGE
  )}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="
        fixed
        right-4
        bottom-4
        z-[99999]
        flex
        h-[56px]
        w-[56px]
        items-center
        justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-[0_8px_30px_rgba(37,211,102,0.35)]
        transition-all
        duration-300
        hover:shadow-[0_10px_40px_rgba(37,211,102,0.55)]
        sm:right-6
        sm:bottom-6
        sm:h-[64px]
        sm:w-auto
        sm:px-4
      "
    >
      {/* WhatsApp Icon */}
      <div className="flex flex-shrink-0 items-center justify-center">
        <FaWhatsapp
          className="text-white text-[32px] sm:text-[36px]"
        />
      </div>

      {/* Desktop Text */}
      <span
        className="
          hidden
          whitespace-nowrap
          pl-2.5
          pr-2
          text-base
          font-bold
          sm:block
        "
      >
        Chat with us
      </span>
    </motion.a>
  );
}

export default WhatsAppButton;