import { useState, useEffect } from "react";
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

export function AddServices() {
  const {
    businessData,
    setBusinessData,
    currentStep,
    setCurrentStep,
  } = useBusinessRegistration();

  const navigate = useNavigate();

  const [step, setStep] = useState(currentStep || 1);
  const [loading, setLoading] = useState(false);

  // Sync react-hook-form default values with persistent context data
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: businessData?.category || "",
      firmName: businessData?.firmName || "",
      ownerName: businessData?.ownerName || "",
      address: businessData?.address || "",
      currentState: businessData?.currentState || "",
      currentCity: businessData?.currentCity || "",
      pincode: businessData?.pincode || "",

      workingAreas: businessData?.workingAreas || [
        {
          state: "",
          cities: [],
        },
      ],

      vehicleTypes: businessData?.vehicleTypes || [],

      phoneNumber: businessData?.phoneNumber || "",
      alternatePhone: businessData?.alternatePhone || "",
      email: businessData?.email || "",
      website: businessData?.website || "",

      // Documents step fields default values
      identityDoc: businessData?.identityDoc || null,
      panCard: businessData?.panCard || null,
      gumasta: businessData?.gumasta || null,
      gstCertificate: businessData?.gstCertificate || null,

      acceptedTerms: businessData?.acceptedTerms || false,
    },
  });

  // Keep local step and context step synchronized
  useEffect(() => {
    if (currentStep) {
      setStep(currentStep);
    }
  }, [currentStep]);

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
        fields = ["workingAreas", "vehicleTypes"];
        break;

      case 4:
        fields = ["phoneNumber", "email"];
        break;

      case 5:
        fields = ["identityDoc", "panCard", "gumasta", "gstCertificate"];
        break;

      default:
        break;
    }

    const valid = await trigger(fields);

    if (!valid) {
      toast.error("Please fill all required fields.");
      return;
    }

    const next = step + 1;
    setStep(next);
    setCurrentStep(next);
  };

  const prevStep = () => {
    const prev = step - 1;
    setStep(prev);
    setCurrentStep(prev);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // Save full form dataset into Context
     setBusinessData(data);
      
      // If API integration is required before redirecting:
      // await API.post("/services", data);
      
      toast.success("Service registration step submitted!");
      // Navigating as per workflow chart requirement
      navigate("/dashboard/planselection");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Submission failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <ProgressBar step={step} totalSteps={TOTAL_STEPS} />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
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
              control={control}
              setValue={setValue}
              watch={watch}
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