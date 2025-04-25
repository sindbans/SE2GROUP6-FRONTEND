import { useEffect, useRef } from "react";

const GoogleAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.hasAttribute("data-loaded")) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adRef.current.setAttribute("data-loaded", "true");
      } catch (e) {
        console.error("Adsense error:", e);
      }
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3185979883345935"
      data-ad-slot="8354716284"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default GoogleAd;
