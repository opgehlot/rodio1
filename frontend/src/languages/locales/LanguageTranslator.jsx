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
// import { useEffect, useState } from "react";

// const LanguageTranslator = () => {
//   const [selectedLang, setSelectedLang] = useState("en");

//   useEffect(() => {
//     // Get Google Translate cookie
//     const getCookie = (name) => {
//       const value = `; ${document.cookie}`;
//       const parts = value.split(`; ${name}=`);
//       if (parts.length === 2) {
//         return parts.pop().split(";").shift();
//       }
//       return null;
//     };

//     const googtrans = getCookie("googtrans");

//     if (googtrans === "/en/hi") {
//       setSelectedLang("hi");
//     } else {
//       setSelectedLang("en");
//     }

//     // Google Translate Init
//     window.googleTranslateElementInit = () => {
//       if (window.google && window.google.translate) {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: "en",
//             autoDisplay: false,
//           },
//           "google_translate_element"
//         );
//       }
//     };

//     // Load Google Translate Script
//     const existingScript = document.getElementById(
//       "google-translate-script"
//     );

//     if (!existingScript) {
//       const script = document.createElement("script");

//       script.id = "google-translate-script";
//       script.src =
//         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       script.async = true;

//       document.body.appendChild(script);
//     }
//   }, []);

//   // Delete Google Translate cookie
//   const deleteGoogleTranslateCookie = () => {
//     document.cookie =
//       "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

//     document.cookie =
//       "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
//       window.location.hostname +
//       ";";
//   };

//   // Language Change
//   const handleLanguageChange = (e) => {
//     const lang = e.target.value;

//     setSelectedLang(lang);

//     if (lang === "hi") {
//       document.cookie = "googtrans=/en/hi; path=/;";
//     } else {
//       // English = remove translation cookie
//       deleteGoogleTranslateCookie();
//     }

//     window.location.reload();
//   };

//   return (
//     <div className="flex items-center">

//       {/* Invisible Google Translate Container */}
//       <div
//         id="google_translate_element"
//         style={{ display: "none" }}
//       />

//       {/* Language Dropdown */}
//       <select
//   value={selectedLang}
//   onChange={handleLanguageChange}
//   className="bg-[#2255DA] text-white text-sm font-medium rounded-lg px-3 py-1.5 border border-[#2255DA] focus:outline-none cursor-pointer"
// >
//   <option value="en" className="bg-white text-black">
//     🇬🇧 English
//   </option>

//   <option value="hi" className="bg-white text-black">
//     🇮🇳 हिन्दी
//   </option>
// </select> 

//     </div>
//   );
// };

// export default LanguageTranslator;

import { useEffect, useState } from "react";

const LanguageTranslator = () => {
  const [selectedLang, setSelectedLang] = useState("en");

  // Get cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }

    return null;
  };

  // Delete Google Translate cookie properly
  const deleteGoogleTranslateCookie = () => {
    const hostname = window.location.hostname;

    // Current domain
    document.cookie =
      "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Domain
    document.cookie =
      `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;

    // Root domain
    if (hostname.split(".").length > 1) {
      const rootDomain = "." + hostname.split(".").slice(-2).join(".");

      document.cookie =
        `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${rootDomain};`;
    }
  };

  // Google Translate initialization
  useEffect(() => {
    const googtrans = getCookie("googtrans");

    if (googtrans === "/en/hi") {
      setSelectedLang("hi");
    } else {
      setSelectedLang("en");
    }

    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    const existingScript = document.getElementById(
      "google-translate-script"
    );

    if (!existingScript) {
      const script = document.createElement("script");

      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      document.body.appendChild(script);
    }

    return () => {
      window.googleTranslateElementInit = undefined;
    };
  }, []);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;

    setSelectedLang(lang);

    if (lang === "hi") {
      // Hindi
      document.cookie = "googtrans=/en/hi; path=/;";

      window.location.reload();
    } else {
      // English
      deleteGoogleTranslateCookie();

      // Remove Google Translate generated classes
      document.documentElement.classList.remove(
        "translated-ltr",
        "translated-rtl"
      );

      document.body.classList.remove(
        "translated-ltr",
        "translated-rtl"
      );

      // Reset Google Translate select if available
      const googleSelect = document.querySelector(
        ".goog-te-combo"
      );

      if (googleSelect) {
        googleSelect.value = "en";

        googleSelect.dispatchEvent(
          new Event("change")
        );
      }

      // Small delay before reload
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  return (
    <div className="flex items-center">

      {/* Google Translate Container */}
      <div
        id="google_translate_element"
        style={{ display: "none" }}
      />

      {/* Language Dropdown */}
      <select
        value={selectedLang}
        onChange={handleLanguageChange}
        className="bg-[#2255DA] text-white text-sm font-medium rounded-lg px-3 py-1.5 border border-[#2255DA] focus:outline-none cursor-pointer"
      >
        <option
          value="en"
          className="bg-white text-black"
        >
          🇬🇧 English
        </option>

        <option
          value="hi"
          className="bg-white text-black"
        >
          🇮🇳 हिन्दी
        </option>
      </select>
    </div>
  );
};

export default LanguageTranslator;

