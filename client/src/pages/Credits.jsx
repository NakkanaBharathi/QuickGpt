import React, { useState, useEffect } from "react";
import Loading from "../pages/Loading";

const Credits = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy data with features
  const dummyplans = [
    { id: 1, _id: "basic", name: "Basic", price: 10, credits: 100, features: ["Access to basic tools", "Email support"] },
    { id: 2, _id: "pro", name: "Pro", price: 20, credits: 250, features: ["All basic features", "Priority support", "Advanced analytics"] },
    { id: 3, _id: "premium", name: "Premium", price: 50, credits: 1000, features: ["All Pro features", "Dedicated account manager", "Custom integrations"] },
  ];

  const fetchPlans = async () => {
    setPlans(dummyplans);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800 dark:text-white">
        Credit Plans
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`border border-gray-200 dark:border-purple-700
              rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col
              ${plan._id === "pro" ? "bg-purple-50 dark:bg-purple-900" : "bg-white dark:bg-transparent"}`}
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>

              {/* Price and credits side by side */}
              <div className="flex items-baseline gap-2 mb-4">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                  ${plan.price}
                </p>
                <span className="text-base font-normal text-gray-600 dark:text-purple-200">
                  / {plan.credits} credits
                </span>
              </div>

              {/* Features list */}
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-purple-200 space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <button className="mt-6 bg-purple-600 hover:bg-purple-700
            active:bg-purple-800 text-white font-medium py-2 rounded transition-colors cursor-pointer">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credits;
