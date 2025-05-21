import React, { useState } from "react";
import { router } from "expo-router";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CheckBox } from "../../components/CheckBox";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useAppDispatch } from "@/./store/store";
import { setVendorId } from "@/store/vendorSlice";

const VendorSignUp = () => {
  const dispatch = useAppDispatch();
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

  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    const length = cleaned.length;

    if (length < 4) return cleaned;
    if (length < 7) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  };

  const handlePhoneNumberFormat = (text) => {
    const formatted = formatPhoneNumber(text);
    setFormData((prev) => ({ ...prev, phone_number: formatted }));
  };

  const handleSubmit = async () => {
    console.log("Submitting data:", formData);
    if (!validaetAll()) {
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
    let previousStep = currentStep - 1;

    if (steps[previousStep]?.isSkippable) {
      previousStep -= 1; // Skip step
    }

    if (previousStep >= 0) {
      setCurrentStep(previousStep);
    } else {
      router.push("/vendor/home"); // Go home if no previous step
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

  const validaetAll = () => {
    for (let i = 0; i < steps.length; i++) {
      if (!validateStep(i)) {
        return false;
      }
    }
    return true;
  };

  const steps = [
    {
      // label: "Step 1",
      content: (
        <View style={styles.stepContent}>
          <Text style={styles.heading}>Business Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name of Business"
            value={formData.business_name}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, business_name: text }))
            }
          />
        </View>
      ),
    },
    {
      // label: "Step 2",
      content: (
        <View style={styles.stepContent}>
          <Text style={styles.heading}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={formData.phone_number}
            onChangeText={handlePhoneNumberFormat}
          />
        </View>
      ),
    },

    {
      // label: "Step 3",
      content: (
        <ScrollView>
          <View>
            <Text style={styles.heading}>Business Hours</Text>
            {Object.keys(formData.business_hours).map((day) => (
              <View key={day}>
                <Text>{day}:</Text>
                <TextInput
                  key={day}
                  style={styles.businessInput}
                  placeholder={`${day} Hours`}
                  value={formData.business_hours[day]}
                  onChangeText={(text) =>
                    setFormData((prev) => ({
                      ...prev,
                      business_hours: {
                        ...prev.business_hours,
                        [day]: text,
                      },
                    }))
                  }
                />
              </View>
            ))}
          </View>
        </ScrollView>
      ),
    },
    {
      // label: "Skipped Step",
      content: (
        <View style={styles.socialSection}>
          <Text style={styles.heading}>Social Media</Text>
          <Text style={styles.inputLabel}>Instagram Handle:</Text>
          <View style={styles.inputContainer}>
            <Icon style={styles.icon} name="logo-instagram" />
            <Text style={styles.staticPrefix}>www.instagram.com/</Text>
            <TextInput
              style={styles.socialInput}
              value={formData.instagram_url}
              onChangeText={(text) =>
                setFormData((prev) => ({
                  ...prev,
                  instagram_url: text.toLowerCase(),
                }))
              }
              placeholder="yourhandle"
            />
          </View>
          <Text style={styles.inputLabel}>Facebook:</Text>
          <View style={styles.inputContainer}>
            <Icon style={styles.icon} name="logo-facebook" />
            <Text style={styles.staticPrefix}>www.facebook.com/</Text>
            <TextInput
              style={styles.socialInput}
              value={formData.facebook_url}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, facebook_url: text }))
              }
              placeholder="username"
            ></TextInput>
          </View>
        </View>
      ),
    },
    {
      // label: "Skipped Step",
      content: (
        <View style={styles.stepContent}>
          <Text style={styles.details}>Now, Let's add the details</Text>
        </View>
      ),
    },
    {
      // label: "Step 4",
      content: (
        <View style={styles.stepContent}>
          <Text style={styles.heading}>Location</Text>
          <Icon name="location-outline" size={400} />
          <Text style={styles.details}>
            Pin location while at establishment. This will be shown to users.
          </Text>
        </View>
      ),
    },
    {
      // label: "Step 5",
      content: (
        <View style={styles.stepContent}>
          <Text style={styles.heading}>Payment</Text>
          <Text>What form of payments do you accept?</Text>
          <CheckBox
            options={[
              { label: "Cash", value: "Cash" },
              { label: "Credit", value: "Credit / Debit Card" },
              { label: "FirstPay", value: "1st Pay" },
              { label: "CIBC", value: "CIBC Transfer" },
            ]}
            checkedValues={formData.payment_method}
            onChange={(updatedArray) =>
              setFormData((prev) => ({ ...prev, payment_method: updatedArray }))
            }
          />
        </View>
      ),
    },
    {
      // label: "Step 6",
      content: (
        <View style={styles.stepContent}>
          <Text style={styles.heading}>Ordering</Text>
          <Text>How do patrons order?</Text>
          <TextInput
            style={styles.orderInput}
            value={formData.order_intstructions}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, order_intstructions: text }))
            }
          />
        </View>
      ),
    },
    {
      // label: "Step 7",
      content: (
        <View style={styles.stepContent}>
          <Text style={styles.heading}>Cuisine</Text>
          <CheckBox
            options={[
              { label: "Traditional Bajan", value: "Traditional Bajan" },
              { label: "Caribbean", value: "Caribbean" },
              { label: "Seafood", value: "Seafood" },
              { label: "International", value: "International" },
              { label: "Fusion", value: "Fusion" },
              { label: "Vegan/Vegetarian", value: "Vegan/Vegetarian" },
              { label: "Sweets and Treats", value: "Sweets and Treats" },
              { label: "Drinks", value: "Drinks" },
            ]}
            checkedValues={formData.cuisine_type}
            onChange={(updatedArray) =>
              setFormData((prev) => ({ ...prev, cuisine_type: updatedArray }))
            }
          />
        </View>
      ),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>{steps[currentStep].label}</Text>
        {steps[currentStep].content}
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.backButton,
            currentStep === 0 && styles.disabledButton,
          ]}
          onPress={handleBack}
          // disabled={currentStep === 0}
        >
          {/* This is the back button */}
          <MaterialIcons name="arrow-back-ios-new" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === steps.length - 1 ? "DONE" : "CONTINUE"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flex: 1,
  },
  heading: {
    textAlign: "center",
    fontSize: 36.41,
    padding: 20,
  },

  stepContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  socialSection: {
    justifyContent: "center",
    paddingLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "98%",
    height: 50,
    borderRadius: 5,
    marginVertical: 0,
    marginTop: 150,
  },
  icon: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  businessInput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "98%",
    height: 50,
    borderRadius: 5,
    marginVertical: 0,
    marginBottom: 25,
    marginTop: 10,
    marginLeft: 5,
  },
  socialInput: {
    flex: 1,
  },
  orderInput: {
    borderWidth: 1,
    borderColor: "black",
    height: 100,
    padding: 10,
    width: "98%",
    borderRadius: 5,
    marginTop: 20,
  },
  details: {
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "98%",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  socialMedia: {},
  nextButton: {
    backgroundColor: "#FBBC05",
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
    marginRight: 40,
  },
  nextButtonText: {
    color: "#fff",
  },
  backButton: {
    left: 10,
    bottom: 680,
  },
  inputLabel: {
    paddingTop: 5,
    marginBottom: 5,
  },
});

export default VendorSignUp;
