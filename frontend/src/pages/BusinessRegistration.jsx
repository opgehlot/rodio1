import { useState } from "react";

import BusinessInfo from "../components/BusinessRegistration/BusinessInfo";
import AddressInfo from "../components/BusinessRegistration/AddressInfo";
import TransportInfo from "../components/BusinessRegistration/TransportInfo";
import ContactInfo from "../components/BusinessRegistration/ContactInfo";
import DocumentUpload from "../components/BusinessRegistration/DocumentUpload";
import TermsSubmit from "../components/BusinessRegistration/TermsSubmit";

export default function BusinessRegistration() {
        const [loading, setLoading] = useState(false);

 const [formData,setFormData]=useState({

   category:"",
   firmName:"",
   ownerName:"",
   linefrom:"",
   lineto:"",
   vehicleTypes:[],

   address:"",
   currentState:"",
   currentCity:"",
   pincode:"",

   phoneNumber:"",
   alternatePhone:"",
   email:"",
   website:"",
   socialMedia:"",

   businessId:"",
   referralCode:"",
   referredBy:"",

   photo:null,
   aadhaar:null,
   panCard:null,
   gumasta:null,
   gstCertificate:null,

   acceptedTerms:false

 });

 const handleChange=(e)=>{

   const {name,value,type,checked,files}=e.target;

   if(type==="checkbox"){

      if(name==="acceptedTerms"){

         setFormData(prev=>({
           ...prev,
           acceptedTerms:checked
         }));

      }else{

         const vehicles=checked
           ? [...formData.vehicleTypes,value]
           : formData.vehicleTypes.filter(v=>v!==value);

         setFormData(prev=>({
           ...prev,
           vehicleTypes:vehicles
         }));

      }

      return;
   }

   if(type==="file"){

      setFormData(prev=>({
        ...prev,
        [name]:files[0]
      }));

      return;
   }

   setFormData(prev=>({

      ...prev,

      [name]:value

   }));

 };

 const handleSubmit=(e)=>{

   e.preventDefault();

   console.log(formData);

 };

 return(

<form
onSubmit={handleSubmit}
className="max-w-7xl mx-auto space-y-8 py-10"
>

<BusinessInfo
formData={formData}
handleChange={handleChange}
/>

<AddressInfo
formData={formData}
handleChange={handleChange}
/>

<TransportInfo
formData={formData}
handleChange={handleChange}
/>

<ContactInfo
formData={formData}
handleChange={handleChange}
/>

<DocumentUpload
handleChange={handleChange}
/>

<TermsSubmit
formData={formData}
handleChange={handleChange}
/>

</form>

 );

}