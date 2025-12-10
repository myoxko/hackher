// src/components/ui/ZzoLogo.jsx

import React from "react";
import Heart from "../../assets/svg/zzo_heart.svg";
import "../../styles/zzo-logo.css";

/* zzo 시그니처 로고
   - ZZO 텍스트 + 픽셀 심장 조합
   - reveal, 콘솔, 헤더 등에서 재사용 가능
*/
export default function ZzoLogo({ size = "md" }) {
  return (
    <div className={["zzo-logo", `zzo-logo--${size}`].join(" ")}>
      <span className="zzo-logo-text font-m42">ZZO</span>
      <img src={Heart} alt="zzo heart" className="zzo-logo-heart" />
    </div>
  );
}
