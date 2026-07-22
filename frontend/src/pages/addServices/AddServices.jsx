import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import API from "../../api/api";

import ProgressBar from "../addservicesescomponents/ProgressBar";
import Step1BusinessInfo from "../addservicesescomponents/Step1BusinessInfo";
import Step2Address from "../addservicesescomponents/Step2Address";
import Step3Transport from "../addservicesescomponents/Step3Transport";
import Step4Contact from "../addservicesescomponents/Step4Contact";
import Step5Documents from "../addservicesescomponents/Step5Documents";
import Step6Review from "../addservicesescomponents/Step6Review";
import { useBusinessRegistration } from "../addServices/BusinessRegistrationContext";


import {
  categories,
  vehicleOptions,
} from "../addServices/constants";


const TOTAL_STEPS = 6;

export  function AddServices() {
  const { setBusinessData } = useBusinessRegistration();

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      firmName: "",
      ownerName: "",
      businessId: "",
      address: "",
      currentState: "",
      currentCity: "",
      pincode: "",
      from: "",
      to: "",
      vehicleTypes: [],
      phoneNumber: "",
      alternatePhone: "",
      email: "",
      website: "",
      acceptedTerms: false,
    },
  });

  const nextStep = async () => {
    let fields = [];

    switch (step) {
      case 1:
        fields = ["category", "firmName", "ownerName"];
        break;

      case 2:
        fields = [
          "address",
          "currentState",
          "currentCity",
          "pincode",
        ];
        break;

      case 3:
        fields = [
          "from",
          "to",
          "vehicleTypes",
        ];
        break;

      case 4:
        fields = [
          "phoneNumber",
          "email",
        ];
        break;

      case 5:
        fields = [
          "aadhaar",
          "panCard",
          "gumasta",
          "gstCertificate",
        ];
        break;

      default:
        break;
    }

    const valid = await trigger(fields);

    if (!valid) {
      toast.error("Please fill all required fields.");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

 const onSubmit = async (data) => {
  setBusinessData(data);

  navigate("/dashboard/planselection");
};

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <ProgressBar
          step={step}
          totalSteps={TOTAL_STEPS}
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8"
        >
          {step === 1 && (
            <Step1BusinessInfo
              register={register}
              errors={errors}
              nextStep={nextStep}
              categories={categories}
            />
          )}

          {step === 2 && (
            <Step2Address
              register={register}
              errors={errors}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step === 3 && (
            <Step3Transport
              register={register}
              errors={errors}
              nextStep={nextStep}
              prevStep={prevStep}
              vehicleOptions={vehicleOptions}
            />
          )}

          {step === 4 && (
            <Step4Contact
              register={register}
              errors={errors}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step === 5 && (
            <Step5Documents
              register={register}
              errors={errors}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step === 6 && (
            <Step6Review
              register={register}
              errors={errors}
              watch={watch}
              loading={loading}
              prevStep={prevStep}
            />
          )}
        </form>

      </div>

    </div>
  );
}
export default AddServices;