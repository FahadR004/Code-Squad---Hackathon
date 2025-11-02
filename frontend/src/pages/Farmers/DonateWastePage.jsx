import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function DonateWastePage() {
  const { t } = useTranslation();
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [donationDetails, setDonationDetails] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    quantity: "",
    instructions: "",
  });

  const ngos = [
    { name: "Green Earth NGO", description: t("DonateWaste.Description") },
    { name: "Helping Hands Foundation", description: t("DonateWaste.Description") },
    { name: "Eco Warriors", description: t("DonateWaste.Description") },
  ];

  const wasteCategories = [
    "Fruits",
    "Vegetables",
    "Poultry",
    "Grains",
    "Dairy",
    "Sweeteners",
    "Spices",
    "Produce",
    "Herbs",
  ];

  const handleDonateClick = (ngo) => {
    setSelectedNGO(ngo);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationDetails({ ...donationDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Donation submitted:", donationDetails, "to", selectedNGO.name);

    setShowModal(false);
    setShowSuccess(true);

    setDonationDetails({
      name: "",
      email: "",
      phone: "",
      category: "",
      quantity: "",
      instructions: "",
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-green-100 rounded-lg p-6 mb-6 shadow-md text-center">
        <h2 className="text-3xl font-bold mb-2 text-green-800">{t("DonateWaste.Title")}</h2>
        <p className="text-green-700">{t("DonateWaste.Description")}</p>
      </div>

      <ul className="space-y-4">
        {ngos.map((ngo, index) => (
          <li
            key={index}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer bg-white"
          >
            <h3 className="text-xl font-semibold mb-1">{ngo.name}</h3>
            <p className="text-gray-600 mb-3">{ngo.description}</p>
            <button
              onClick={() => handleDonateClick(ngo)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              {t("DonateWaste.DonateNow")}
            </button>
          </li>
        ))}
      </ul>

      {/* Donation Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <h3 className="text-2xl font-bold mb-4 text-green-800">
              {t("DonateWaste.FormTitle", { ngo: selectedNGO.name })}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder={t("DonateWaste.Name")}
                value={donationDetails.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t("DonateWaste.Email")}
                value={donationDetails.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder={t("DonateWaste.Phone")}
                value={donationDetails.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />

              <div className="flex space-x-2">
                <select
                  name="category"
                  value={donationDetails.category}
                  onChange={handleChange}
                  className="w-1/2 border px-3 py-2 rounded"
                  required
                >
                  <option value="">{t("DonateWaste.Category")}</option>
                  {wasteCategories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {t(`DonateWaste.WasteCategories.${cat}`)}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  name="quantity"
                  placeholder={t("DonateWaste.Quantity")}
                  value={donationDetails.quantity}
                  onChange={handleChange}
                  className="w-1/2 border px-3 py-2 rounded"
                  required
                  min="1"
                />
              </div>

              <textarea
                name="instructions"
                placeholder={t("DonateWaste.Instructions")}
                value={donationDetails.instructions}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                >
                  {t("DonateWaste.Cancel")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  {t("DonateWaste.Submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center">
            <h3 className="text-2xl font-bold text-green-700 mb-4">
              {t("DonateWaste.SuccessTitle")}
            </h3>
            <p className="text-gray-700 mb-6">
              {t("DonateWaste.SuccessMessage", {
                quantity: donationDetails.quantity,
                category: t(`DonateWaste.WasteCategories.${donationDetails.category}`),
                ngo: selectedNGO?.name,
              })}
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              {t("DonateWaste.Cancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
