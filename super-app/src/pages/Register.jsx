import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\d{10}$/;
const ALPHA_PATTERN = /^[A-Za-z\s]+$/;
const USERNAME_PATTERN = /^\S+$/;

const Register = () => {
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");

  const validateForm = () => {
    const tempErrors = {};

    if (!formData.name.trim()) {
      tempErrors.name = "Name field cannot be left blank.";
    } else if (!ALPHA_PATTERN.test(formData.name.trim())) {
      tempErrors.name = "Name should contain alphabetic characters only.";
    }

    if (!formData.username.trim()) {
      tempErrors.username = "Username field cannot be left blank.";
    } else if (!USERNAME_PATTERN.test(formData.username.trim()) || /\s/.test(formData.username)) {
      tempErrors.username = "Username must be alphanumeric with no spaces.";
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email field cannot be left blank.";
    } else if (!EMAIL_PATTERN.test(formData.email.trim())) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!formData.mobile.trim()) {
      tempErrors.mobile = "Mobile field cannot be left blank.";
    } else if (!PHONE_PATTERN.test(formData.mobile.trim())) {
      tempErrors.mobile = "Mobile number must be exactly 10 digits.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    const formValid = validateForm();
    if (!consent) {
      setConsentError("Check this box if you want to proceed");
    } else {
      setConsentError("");
    }
    if (formValid && consent) {
      setUser(formData);
      navigate("/categories");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-black">
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center relative"
        style={{
          backgroundColor: "#111",
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1506485854521-3e13d857db0b?fm=jpg&q=70&w=1200&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-12">
          <h2 className="text-white text-4xl font-bold leading-tight max-w-md">
            Discover new things on Superapp
          </h2>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-md">
          <h1 className="text-[#7ee787] text-4xl font-bold mb-2" style={{ fontFamily: "cursive" }}>
            Super app
          </h1>
          <p className="text-gray-300 mb-8 text-lg">Create your new account</p>

          <form onSubmit={handleFormSubmission} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                className={`field-input ${errors.name ? "field-error" : ""}`}
                value={formData.name}
                onChange={handleChange("name")}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div>
              <input
                type="text"
                placeholder="UserName"
                className={`field-input ${errors.username ? "field-error" : ""}`}
                value={formData.username}
                onChange={handleChange("username")}
              />
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className={`field-input ${errors.email ? "field-error" : ""}`}
                value={formData.email}
                onChange={handleChange("email")}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div>
              <input
                type="text"
                placeholder="Mobile"
                className={`field-input ${errors.mobile ? "field-error" : ""}`}
                value={formData.mobile}
                onChange={handleChange("mobile")}
              />
              {errors.mobile && <span className="error-text">{errors.mobile}</span>}
            </div>

            <label className="flex items-start gap-3 text-gray-300 text-sm pt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (e.target.checked) setConsentError("");
                }}
                className="mt-1"
              />
              Share my registration data with Superapp
            </label>
            {consentError && <span className="error-text">{consentError}</span>}

            <button type="submit" className="btn-primary mt-4">
              SIGN UP
            </button>

            <p className="text-xs text-gray-500 pt-3">
              By clicking on Sign up, you agree to Superapp{" "}
              <span className="text-[#7ee787]">Terms &amp; Conditions of Use</span>. To learn more about
              how Superapp collects, uses, and protects your data, see our{" "}
              <span className="text-[#7ee787]">Privacy Policy</span>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
