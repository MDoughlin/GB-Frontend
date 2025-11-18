export interface FormData {
  business_name: string;
  phone_number: string;
  business_hours: {
    Sunday: string;
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
  };
  instagram_url: string;
  facebook_url: string;
  location: string;
  payment_method: string[];
  order_intstructions: string;
  cuisine_type: string[];
}

export type Vendor = {
  business_name: string;
  phone_number: string;
  instagram_url: string;
  facebook_url: string;
  location: string;
  business_hours: { [day: string]: string };
  payment_method: string[];
  order_instructions: string;
  cuisine_type: string[];
  menu: string[];
};
