import React from "react";
import { Link } from "react-router-dom";

const states = [
  {
    name: "Andhra Pradesh",
    slug: "andhra-pradesh",
    cities: [
      ["Visakhapatnam", "visakhapatnam"],
      ["Vijayawada", "vijayawada"],
      ["Guntur", "guntur"],
      ["Tirupati", "tirupati"],
      ["Nellore", "nellore"],
    ],
  },
  {
    name: "Arunachal Pradesh",
    slug: "arunachal-pradesh",
    cities: [
      ["Itanagar", "itanagar"],
      ["Naharlagun", "naharlagun"],
      ["Pasighat", "pasighat"],
    ],
  },
  {
    name: "Assam",
    slug: "assam",
    cities: [
      ["Guwahati", "guwahati"],
      ["Dibrugarh", "dibrugarh"],
      ["Silchar", "silchar"],
      ["Jorhat", "jorhat"],
      ["Nagaon", "nagaon"],
    ],
  },
  {
    name: "Bihar",
    slug: "bihar",
    cities: [
      ["Patna", "patna"],
      ["Gaya", "gaya"],
      ["Muzaffarpur", "muzaffarpur"],
      ["Bhagalpur", "bhagalpur"],
      ["Darbhanga", "darbhanga"],
    ],
  },
  {
    name: "Chhattisgarh",
    slug: "chhattisgarh",
    cities: [
      ["Raipur", "raipur"],
      ["Bhilai", "bhilai"],
      ["Bilaspur", "bilaspur"],
      ["Korba", "korba"],
      ["Durg", "durg"],
    ],
  },
  {
    name: "Goa",
    slug: "goa",
    cities: [
      ["Panaji", "panaji"],
      ["Margao", "margao"],
      ["Vasco da Gama", "vasco-da-gama"],
    ],
  },
  {
    name: "Gujarat",
    slug: "gujarat",
    cities: [
      ["Ahmedabad", "ahmedabad"],
      ["Surat", "surat"],
      ["Vadodara", "vadodara"],
      ["Rajkot", "rajkot"],
      ["Gandhinagar", "gandhinagar"],
      ["Bhavnagar", "bhavnagar"],
      ["Jamnagar", "jamnagar"],
    ],
  },
  {
    name: "Haryana",
    slug: "haryana",
    cities: [
      ["Gurugram", "gurugram"],
      ["Faridabad", "faridabad"],
      ["Panipat", "panipat"],
      ["Hisar", "hisar"],
      ["Ambala", "ambala"],
      ["Karnal", "karnal"],
    ],
  },
  {
    name: "Himachal Pradesh",
    slug: "himachal-pradesh",
    cities: [
      ["Shimla", "shimla"],
      ["Dharamshala", "dharamshala"],
      ["Solan", "solan"],
      ["Mandi", "mandi"],
    ],
  },
  {
    name: "Jharkhand",
    slug: "jharkhand",
    cities: [
      ["Ranchi", "ranchi"],
      ["Jamshedpur", "jamshedpur"],
      ["Dhanbad", "dhanbad"],
      ["Bokaro", "bokaro"],
    ],
  },
  {
    name: "Karnataka",
    slug: "karnataka",
    cities: [
      ["Bengaluru", "bengaluru"],
      ["Mysuru", "mysuru"],
      ["Mangaluru", "mangaluru"],
      ["Hubballi", "hubballi"],
      ["Belagavi", "belagavi"],
      ["Davanagere", "davanagere"],
    ],
  },
  {
    name: "Kerala",
    slug: "kerala",
    cities: [
      ["Kochi", "kochi"],
      ["Thiruvananthapuram", "thiruvananthapuram"],
      ["Kozhikode", "kozhikode"],
      ["Thrissur", "thrissur"],
      ["Kollam", "kollam"],
    ],
  },
  {
    name: "Madhya Pradesh",
    slug: "madhya-pradesh",
    cities: [
      ["Indore", "indore"],
      ["Bhopal", "bhopal"],
      ["Gwalior", "gwalior"],
      ["Jabalpur", "jabalpur"],
      ["Ujjain", "ujjain"],
      ["Dewas", "dewas"],
      ["Ratlam", "ratlam"],
      ["Sagar", "sagar"],
      ["Rewa", "rewa"],
      ["Agar Malwa", "agar-malwa"],
    ],
  },
  {
    name: "Maharashtra",
    slug: "maharashtra",
    cities: [
      ["Mumbai", "mumbai"],
      ["Pune", "pune"],
      ["Nagpur", "nagpur"],
      ["Nashik", "nashik"],
      ["Aurangabad", "aurangabad"],
      ["Thane", "thane"],
      ["Kolhapur", "kolhapur"],
    ],
  },
  {
    name: "Manipur",
    slug: "manipur",
    cities: [
      ["Imphal", "imphal"],
      ["Thoubal", "thoubal"],
    ],
  },
  {
    name: "Meghalaya",
    slug: "meghalaya",
    cities: [
      ["Shillong", "shillong"],
      ["Tura", "tura"],
    ],
  },
  {
    name: "Mizoram",
    slug: "mizoram",
    cities: [
      ["Aizawl", "aizawl"],
      ["Lunglei", "lunglei"],
    ],
  },
  {
    name: "Nagaland",
    slug: "nagaland",
    cities: [
      ["Kohima", "kohima"],
      ["Dimapur", "dimapur"],
    ],
  },
  {
    name: "Odisha",
    slug: "odisha",
    cities: [
      ["Bhubaneswar", "bhubaneswar"],
      ["Cuttack", "cuttack"],
      ["Rourkela", "rourkela"],
      ["Berhampur", "berhampur"],
      ["Sambalpur", "sambalpur"],
    ],
  },
  {
    name: "Punjab",
    slug: "punjab",
    cities: [
      ["Ludhiana", "ludhiana"],
      ["Amritsar", "amritsar"],
      ["Jalandhar", "jalandhar"],
      ["Patiala", "patiala"],
      ["Bathinda", "bathinda"],
    ],
  },
  {
    name: "Rajasthan",
    slug: "rajasthan",
    cities: [
      ["Jaipur", "jaipur"],
      ["Jodhpur", "jodhpur"],
      ["Udaipur", "udaipur"],
      ["Kota", "kota"],
      ["Ajmer", "ajmer"],
      ["Bikaner", "bikaner"],
      ["Alwar", "alwar"],
    ],
  },
  {
    name: "Sikkim",
    slug: "sikkim",
    cities: [
      ["Gangtok", "gangtok"],
      ["Namchi", "namchi"],
    ],
  },
  {
    name: "Tamil Nadu",
    slug: "tamil-nadu",
    cities: [
      ["Chennai", "chennai"],
      ["Coimbatore", "coimbatore"],
      ["Madurai", "madurai"],
      ["Salem", "salem"],
      ["Tiruchirappalli", "tiruchirappalli"],
      ["Tiruppur", "tiruppur"],
    ],
  },
  {
    name: "Telangana",
    slug: "telangana",
    cities: [
      ["Hyderabad", "hyderabad"],
      ["Warangal", "warangal"],
      ["Nizamabad", "nizamabad"],
      ["Karimnagar", "karimnagar"],
    ],
  },
  {
    name: "Tripura",
    slug: "tripura",
    cities: [
      ["Agartala", "agartala"],
      ["Udaipur", "udaipur"],
    ],
  },
  {
    name: "Uttar Pradesh",
    slug: "uttar-pradesh",
    cities: [
      ["Lucknow", "lucknow"],
      ["Kanpur", "kanpur"],
      ["Noida", "noida"],
      ["Ghaziabad", "ghaziabad"],
      ["Agra", "agra"],
      ["Varanasi", "varanasi"],
      ["Prayagraj", "prayagraj"],
      ["Meerut", "meerut"],
      ["Gorakhpur", "gorakhpur"],
    ],
  },
  {
    name: "Uttarakhand",
    slug: "uttarakhand",
    cities: [
      ["Dehradun", "dehradun"],
      ["Haridwar", "haridwar"],
      ["Haldwani", "haldwani"],
      ["Rishikesh", "rishikesh"],
    ],
  },
  {
    name: "West Bengal",
    slug: "west-bengal",
    cities: [
      ["Kolkata", "kolkata"],
      ["Howrah", "howrah"],
      ["Durgapur", "durgapur"],
      ["Siliguri", "siliguri"],
      ["Asansol", "asansol"],
    ],
  },
];

const unionTerritories = [
  {
    name: "Delhi",
    slug: "delhi",
    cities: [
      ["New Delhi", "new-delhi"],
      ["Delhi", "delhi"],
    ],
  },
  {
    name: "Chandigarh",
    slug: "chandigarh",
    cities: [["Chandigarh", "chandigarh"]],
  },
  {
    name: "Jammu and Kashmir",
    slug: "jammu-and-kashmir",
    cities: [
      ["Srinagar", "srinagar"],
      ["Jammu", "jammu"],
    ],
  },
  {
    name: "Ladakh",
    slug: "ladakh",
    cities: [
      ["Leh", "leh"],
      ["Kargil", "kargil"],
    ],
  },
  {
    name: "Puducherry",
    slug: "puducherry",
    cities: [["Puducherry", "puducherry"]],
  },
  {
    name: "Andaman and Nicobar Islands",
    slug: "andaman-and-nicobar-islands",
    cities: [["Port Blair", "port-blair"]],
  },
  {
    name: "Dadra and Nagar Haveli and Daman and Diu",
    slug: "dadra-and-nagar-haveli-and-daman-and-diu",
    cities: [
      ["Daman", "daman"],
      ["Silvassa", "silvassa"],
    ],
  },
  {
    name: "Lakshadweep",
    slug: "lakshadweep",
    cities: [["Kavaratti", "kavaratti"]],
  },
];

const SEODirectoryLinks = ({
  category = "transporter",
  title = "Transporters in India",
  showCities = true,
}) => {
  const categorySlug = category.toLowerCase().replace(/\s+/g, "-");

  const allLocations = [...states, ...unionTerritories];

  return (
    <section
      aria-labelledby="seo-directory-links-title"
      className="w-full bg-white py-10 px-4"
    >
      <div className="max-w-7xl mx-auto">

        {/* Main SEO Heading */}
        <h2
          id="seo-directory-links-title"
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
        >
          {title}
        </h2>

        <p className="text-gray-600 max-w-4xl mb-8">
          Find {category} services across major cities and states in India.
          Browse local transport businesses and discover services available
          in your preferred location.
        </p>

        {/* States */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {category} Services by State
          </h3>

          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {allLocations.map((location) => (
              <React.Fragment key={location.slug}>
                <Link
                  to={`/directory/${location.slug}/${categorySlug}`}
                  className="text-gray-600 hover:text-blue-600 hover:underline transition"
                >
                  {category} in {location.name}
                </Link>

                <span className="text-gray-300">|</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Cities */}
        {showCities && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Popular Cities for {category}
            </h3>

            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {allLocations.flatMap((state) =>
                state.cities.map(([cityName, citySlug]) => (
                  <React.Fragment key={`${state.slug}-${citySlug}`}>
                    <Link
                      to={`/directory/${state.slug}/${citySlug}/${categorySlug}`}
                      className="text-gray-600 hover:text-blue-600 hover:underline transition"
                    >
                      {category} in {cityName}
                    </Link>

                    <span className="text-gray-300">|</span>
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SEODirectoryLinks;