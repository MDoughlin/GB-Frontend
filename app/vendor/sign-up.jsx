import React, { useState } from "react";
import { router } from "expo-router";
import { setVendorId } from "@/store/vendorSlice";
import { Button } from "../../components/Button";
import { BackButton } from "../../components/BackButton";
import { StepBusinessName } from "../../components/steps/StepBusinessName";
import { StepBusinessHours } from "../../components/steps/StepBusinessHours";
import { StepBusinessAddress } from "../../components/steps/StepBusinessAddress";
import { StepCuisine } from "../../components/steps/StepCuisine";
import { StepOrderingInstruction } from "../../components/steps/StepOrderingInstruction";
import { StepPaymentMethod } from "../../components/steps/StepPaymentMethod";
import { StepPhoneNumber } from "../../components/steps/StepPhoneNumber";
import { StepSocialMedia } from "../../components/steps/StepSocialMedia";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

const VendorSignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    business_name: "",
    phone_number: "",
    business_hours: {
      Sunday: "",
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
    },
    instagram_url: "",
    facebook_url: "",
    location: "",
    payment_method: [],
    order_intstructions: "",
    cuisine_type: [],
  });

  const handleSubmit = async () => {
    console.log("Submitting data:", formData);
    if (!validateAll()) {
      alert("Please complete all the required fields before submitting");
    }

    try {
      const response = await fetch("http://10.0.0.167:3000/vendor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }
      const data = await response.json();
      if (data?.id) {
        dispatch(setVendorId(data.id));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occured while submitting the form");
    }
  };

  const handleNext = () => {
    console.log("Current Step:", currentStep);

    if (!validateStep(currentStep)) {
      alert("Please complete the required fields on this step");
      return;
    }
    if (currentStep === steps.length - 1) {
      handleSubmit();
      console.log("Navigating to Home...");
      router.push("/vendor/home");
    } else {
      console.log("Going to next step...");
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      router.push("/");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateStep = (stepIndex) => {
    switch (stepIndex) {
      case 0: //business name
        return formData.business_name.trim() !== "";
      case 1: //phone number
        return /^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.phone_number);
      case 2: // Business Hours
        return Object.values(formData.business_hours).every((v) => {
          const val = v.trim().toLowerCase();
          return val === "closed" || val.match(/\d/); // at least one digit (e.g. "9am")
        });
      case 3: //social media
        return true;
      case 4: //skipped
        return true;
      case 5: //location
        return true;
      case 6: //payment methods
        return formData.payment_method.length > 0;
      case 7: //ordering
        return formData.order_intstructions.trim() !== "";
      case 8: //cuisine
        return formData.cuisine_type.length > 0;
      default:
        return true;
    }
  };

  const validateAll = () => {
    for (let i = 0; i < steps.length; i++) {
      if (!validateStep(i)) {
        return false;
      }
    }
    return true;
  };

  const steps = [
    {
      // label: "Business Name",
      content: (
        <StepBusinessName formData={formData} setFormData={setFormData} />
      ),
    },
    {
      // label: "Phone Number",
      content: (
        <StepPhoneNumber formData={formData} setFormData={setFormData} />
      ),
    },
    {
      // label: "Business Hours",
      content: (
        <StepBusinessHours formData={formData} setFormData={setFormData} />
      ),
    },
    {
      // label: "Social Media",
      content: (
        <StepSocialMedia formData={formData} setFormData={setFormData} />
      ),
    },
    {
      // label: "Business Address",
      content: (
        <StepBusinessAddress formData={formData} setFormData={setFormData} />
      ),
    },
    {
      // label: "Payment Methods",
      content: (
        <StepPaymentMethod formData={formData} setFormData={setFormData} />
      ),
    },
    {
      // label: "Ordering Instruction",
      content: (
        <StepOrderingInstruction
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      // label: "Cuisine",
      content: <StepCuisine formData={formData} setFormData={setFormData} />,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>{steps[currentStep].label}</Text>
        {steps[currentStep].content}
      </View>
      <View>
        <BackButton
          onPress={handleBack}
          style={[
            styles.backButton,
            currentStep === 0 && styles.disabledButton,
          ]}
        />
        <Button
          label={currentStep === steps.length - 1 ? "DONE" : "CONTINUE"}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flex: 1,
  },
  backButton: {
    left: 10,
    bottom: 680,
  },
});

export default VendorSignUp;
