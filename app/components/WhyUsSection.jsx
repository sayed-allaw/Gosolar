import React from "react";
import "./WhyUsSection.css";

const WhyUsSection = () => {
  // رابط صفحة فيسبوك GoSolar
  const facebookPageUrl =
    "https://www.facebook.com/people/Go-Solar/100063821541998/?mibextid=LQQJ4d";

  return (
    <section className="why-us-section">
      <div className="why-us-content">
        <h5>WHY GOSOLAR?</h5>
        <h2>
          Choosing the right <em>partner</em> is the most important to make sure
          that you receive a durable solution on time, on budget and{" "}
          <em>quality.</em>
        </h2>
        <p>
          GoSolar is one of the leading solar energy companies in Egypt. With a
          reference of EPC in all the sectors such as automotive,
          telecommunication, petroleum, corporates buildings, farms, etc.
        </p>
        <a
          href={facebookPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          get More info
        </a>
      </div>
      {/* يمكن إضافة صورة أو عنصر مرئي هنا */}
    </section>
  );
};

export default WhyUsSection;
