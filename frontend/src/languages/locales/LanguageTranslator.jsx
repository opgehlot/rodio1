// import { useEffect, useState } from 'react';

// const LanguageTranslator = () => {
//   const [selectedLang, setSelectedLang] = useState('en');

//   useEffect(() => {
//     // Check cookie on load
//     const getCookie = (name) => {
//       const value = `; ${document.cookie}`;
//       const parts = value.split(`; ${name}=`);
//       if (parts.length === 2) return parts.pop().split(';').shift();
//     };

//     const googtrans = getCookie('googtrans');
//     if (googtrans && googtrans.includes('/hi')) {
//       setSelectedLang('hi');
//     } else {
//       setSelectedLang('en');
//     }

//     // Google Init
//     window.googleTranslateElementInit = () => {
//       if (window.google && window.google.translate) {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             autoDisplay: false,
//           },
//           'google_translate_element'
//         );
//       }
//     };

//     // Load Script
//     const existingScript = document.getElementById('google-translate-script');
//     if (!existingScript) {
//       const script = document.createElement('script');
//       script.id = 'google-translate-script';
//       script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }, []);

//   // Language switch handler
//   const handleLanguageChange = (e) => {
//     const lang = e.target.value;
//     setSelectedLang(lang);
    
//     if (lang === 'hi') {
//       document.cookie = "googtrans=/en/hi; path=/;";
//     } else {
//       document.cookie = "googtrans=/en/en; path=/;";
//     }
    
//     window.location.reload();
//   };

//   return (
//     <div className="flex items-center">
//       {/* Invisible Translate Container */}
//       <div id="google_translate_element" style={{ display: 'none' }} />

//       {/* Stylized Dropdown Menu */}
//       <select
//         value={selectedLang}
//         onChange={handleLanguageChange}
//         className="bg-gray-800 text-white text-sm font-medium rounded-lg px-3 py-1.5 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//       >
//         <option value="en">🇬🇧 English</option>
//         <option value="hi">🇮🇳 हिन्दी</option>
//       </select>
//     </div>
//   );
// };

// export default LanguageTranslator;
import { useEffect, useState } from "react";

const LanguageTranslator = () => {
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    // Get Google Translate cookie
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
      return null;
    };

    const googtrans = getCookie("googtrans");

    if (googtrans === "/en/hi") {
      setSelectedLang("hi");
    } else {
      setSelectedLang("en");
    }

    // Google Translate Init
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // Load Google Translate Script
    const existingScript = document.getElementById(
      "google-translate-script"
    );

    if (!existingScript) {
      const script = document.createElement("script");

      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      document.body.appendChild(script);
    }
  }, []);

  // Delete Google Translate cookie
  const deleteGoogleTranslateCookie = () => {
    document.cookie =
      "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.cookie =
      "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
      window.location.hostname +
      ";";
  };

  // Language Change
  const handleLanguageChange = (e) => {
    const lang = e.target.value;

    setSelectedLang(lang);

    if (lang === "hi") {
      document.cookie = "googtrans=/en/hi; path=/;";
    } else {
      // English = remove translation cookie
      deleteGoogleTranslateCookie();
    }

    window.location.reload();
  };

  return (
    <div className="flex items-center">

      {/* Invisible Google Translate Container */}
      <div
        id="google_translate_element"
        style={{ display: "none" }}
      />

      {/* Language Dropdown */}
      <select
        value={selectedLang}
        onChange={handleLanguageChange}
        className="bg-gray-800 text-white text-sm font-medium rounded-lg px-3 py-1.5 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        <option value="en">🇬🇧 English</option>
        <option value="hi">🇮🇳 हिन्दी</option>
      </select>

    </div>
  );
};

export default LanguageTranslator;