"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   إعدادات أساسية — عدّل قبل الرفع
   ============================================================ */
const PHONE = "01029944403";
const PHONE_INTL = "+201029944403";
const WA_NUM = "201029944403";
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = waLink(
  "مرحباً، أريد الاستفسار عن أسعار مشاريع مدينة مصر (سراي / تاج سيتي / ذا باترفلاي)"
);
const WEB3FORMS_KEY = "https://madinitmasregy.org"; // TODO

const CONV_FORM = "AW-XXXXXXXXXX/FORM_LABEL"; // TODO
const CONV_WHATSAPP = "AW-XXXXXXXXXX/WA_LABEL"; // TODO
const CONV_CALL = "AW-XXXXXXXXXX/CALL_LABEL"; // TODO

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
const fire = (l: string) => window.gtag?.("event", "conversion", { send_to: l });
const trackWA = () => fire(CONV_WHATSAPP);
const trackCall = () => fire(CONV_CALL);

const COUNTRIES = [
  { c: "EG", d: "+20", n: "مصر", re: /^1[0125][0-9]{8}$/ },
  { c: "SA", d: "+966", n: "السعودية", re: /^5[0-9]{8}$/ },
  { c: "AE", d: "+971", n: "الإمارات", re: /^5[0-9]{8}$/ },
  { c: "KW", d: "+965", n: "الكويت", re: /^[0-9]{8}$/ },
  { c: "QA", d: "+974", n: "قطر", re: /^[0-9]{8}$/ },
  { c: "OM", d: "+968", n: "عُمان", re: /^[0-9]{8}$/ },
  { c: "BH", d: "+973", n: "البحرين", re: /^[0-9]{8}$/ },
  { c: "US", d: "+1", n: "أمريكا", re: /^[0-9]{10}$/ },
];

/* ============================================================
   المحتوى
   ============================================================ */
const HERO_KPIS = [
  ["3.9M", "أسعار تبدأ من (جنيه)"],
  ["5%", "مقدم حجز"],
  ["10 سنوات", "تقسيط يصل إلى"],
];

const DEV_BADGES = [
  "تأسست 1959 بقرار جمهوري",
  "مقيّدة بالبورصة المصرية EGX",
  "أكثر من 60 عامًا من التسليمات",
  "مطوّرة مدينة نصر",
];

const DEV_TIMELINE = [
  ["1959", "التأسيس بقرار جمهوري لتطوير مدينة نصر"],
  ["1996", "القيد في البورصة المصرية والخضوع للإفصاح المؤسسي"],
  ["2012", "إطلاق تاج سيتي — أول دخول لقطاع المجتمعات المتكاملة"],
  ["اليوم", "محفظة تضم سراي وتاج سيتي وذا باترفلاي وتلالا وكافانا ليك"],
];

const PROJECTS = [
  {
    id: "sarai",
    img: "/images/sarai.webp",
    img2: "/images/sarai-2.webp",
    alt2: "فيلا S-Villa في كمبوند سراي القاهرة الجديدة",
    alt: "كمبوند سراي القاهرة الجديدة من مدينة مصر — البحيرة الصناعية",
    tag: "القاهرة الجديدة — طريق السويس",
    name: "كمبوند سراي القاهرة الجديدة",
    en: "Sarai",
    accent: "text-emerald",
    badge: "أكبر لاجون سباحة في القاهرة",
    badgeTone: "bg-emerald text-white",
    desc: "أضخم مشروعات مدينة مصر على مساحة 5.5 مليون متر مربع (نحو 1,000 فدان) على طريق السويس ومحور الأمل، بجوار مدينتي وعلى بُعد دقائق من الجامعة الأمريكية والطريق الدائري. الميزة الأبرز بحيرة صناعية بمساحة 50,000 متر مربع تضم أكبر لاجون سباحة في القاهرة (10,000 م² بعمق 1.4 متر)، مع تخصيص 18% فقط للمباني و82% للمساحات الخضراء والمسطحات المائية.",
    facts: [
      ["5.5M م²", "المساحة الإجمالية"],
      ["82%", "مساحات خضراء ومائية"],
      ["50 ألف م²", "مساحة البحيرة الصناعية"],
      ["10 سنوات", "أنظمة سداد تصل إلى"],
    ],
    rows: [
      ["أقل وحدة سعرًا", "من حوالي 4,000,000 جنيه"],
      ["أنواع الوحدات", "شقق · دوبلكس · تاون هاوس · فيلات"],
      ["مراحل بارزة", "Elm Tree Park · Elan · Origami"],
      ["الموقع", "طريق السويس ومحور الأمل"],
    ],
    ideal:
      "مثالي لمن يبحث عن مساحات خضراء واسعة وحياة حول اللاجون، أو دخول باستثمار متوسط في منطقة سريعة النمو بجوار مدينتي.",
  },
  {
    id: "tajcity",
    img: "/images/tajcity.webp",
    img2: "/images/tajcity-2.webp",
    alt2: "تاون هاوس في كمبوند تاج سيتي القاهرة الجديدة",
    alt: "كمبوند تاج سيتي القاهرة الجديدة من مدينة مصر على طريق السويس",
    tag: "القاهرة الجديدة — أمام مطار القاهرة",
    name: "كمبوند تاج سيتي القاهرة الجديدة",
    en: "Taj City",
    accent: "text-gold",
    badge: "وحدات استلام فوري",
    badgeTone: "bg-gold text-white",
    desc: "المدينة الملكية — أضخم مشروع متعدد الاستخدامات لمدينة مصر على نحو 900 فدان (أكثر من 3.5 مليون م²) على طريق السويس والدائري، أمام فندق JW Marriott وعلى بُعد 5 دقائق فقط من مطار القاهرة الدولي و20 دقيقة من وسط البلد. أُطلق عام 2012 وبه مراحل مُسلَّمة ومأهولة بالفعل ووحدات استلام فوري.",
    facts: [
      ["900", "فدان — المساحة الإجمالية"],
      ["5 دقائق", "من مطار القاهرة الدولي"],
      ["2012", "سنة الإطلاق — مراحل مُسلَّمة"],
      ["12.4M", "أسعار تبدأ من (جنيه)"],
    ],
    rows: [
      ["الأسعار", "تبدأ من حوالي 12,400,000 جنيه"],
      ["أنواع الوحدات", "شقق · تاون · توين · فيلات مستقلة"],
      ["مراحل بارزة", "تاج سلطان · تاج فيلا"],
      ["ميزة خاصة", "وحدات جاهزة للاستلام الفوري"],
    ],
    ideal:
      "مثالي لمن يريد سكنًا جاهزًا للاستلام قرب مطار القاهرة ومصر الجديدة ومدينة نصر، أو استثمارًا إيجاريًا قويًا.",
  },
  {
    id: "butterfly",
    img: "/images/butterfly.webp",
    img2: "/images/butterfly-2.webp",
    alt2: "فيلات كمبوند ذا باترفلاي مدينة المستقبل",
    alt: "كمبوند ذا باترفلاي مدينة المستقبل من مدينة مصر للإسكان والتعمير",
    tag: "مدينة المستقبل — محور الأمل",
    name: "كمبوند ذا باترفلاي",
    en: "The Butterfly",
    accent: "text-emerald-2",
    badge: "أحدث المشروعات",
    badgeTone: "bg-royal text-white",
    desc: "أحدث مشروعات مدينة مصر على 238 فدانًا في مدينة المستقبل، بواجهة مباشرة على محور الأمل وبجوار كمبوند سراي مباشرة. يضم وحدات متنوعة بين شقق ودوبلكس وتاون هاوس وفيلات، محاطة بمساحات خضراء واسعة وبحيرات صناعية.",
    facts: [
      ["238", "فدان — المساحة الإجمالية"],
      ["محور الأمل", "واجهة مباشرة"],
      ["4.5M", "الفيلات تبدأ من (جنيه)"],
      ["بجوار سراي", "في قلب مدينة المستقبل"],
    ],
    rows: [
      ["الفيلات", "تبدأ من حوالي 12,500,000 جنيه"],
      ["أنواع الوحدات", "شقق · دوبلكس · تاون هاوس · فيلات"],
      ["المميزات", "بحيرات صناعية ومساحات خضراء"],
      ["الموقع", "أمام محور الأمل مباشرة"],
    ],
    ideal:
      "مثالي لمن يبحث عن سعر دخول أقل في مشروع جديد بمدينة المستقبل، مع الاستفادة من قرب سراي وخدماتها.",
  },
];

const COMPARE = [
  ["الموقع", "طريق السويس — بجوار مدينتي", "طريق السويس — أمام المطار", "مدينة المستقبل — محور الأمل"],
  ["المساحة", "5.5 مليون م² (1000 فدان)", "900 فدان", "238 فدان"],
  ["الأسعار من", "~ 4 مليون جنيه", "~ 12.4 مليون جنيه", "~ 4.5 مليون (فيلات)"],
  ["الجاهزية", "مراحل قيد التسليم", "استلام فوري متاح", "أحدث طرح"],
  ["الأنسب لـ", "الحياة حول اللاجون", "السكن الجاهز والاستثمار", "سعر دخول أقل"],
];

const PLANS = [
  {
    tag: "النظام الأساسي",
    tagTone: "bg-emerald text-white",
    title: "مقدم 2.5% وتقسيط 12 سنه",
    rows: [
      ["مقدم الحجز", "يبدأ من 2.5%"],
      ["مدة التقسيط", "تصل إلى 12 سنه"],
      ["الأقساط", "متساوية على فترة السداد"],
    ],
  },
  {
    tag: "مراحل مختارة",
    tagTone: "bg-royal text-white",
    title: "أنظمة بدون مقدم",
    rows: [
      ["المقدم", "0% في مراحل بعينها"],
      ["مدة التقسيط", "حتى 12 سنه"],
      ["الملاحظة", "حسب المرحلة المطروحة"],
    ],
  },
  {
    tag: "السداد النقدي",
    tagTone: "bg-gold text-white",
    title: "خصومات الكاش",
    rows: [
      ["طريقة السداد", "كاش أو دفعات قصيرة"],
      ["الخصم", "يصل لنسب مرتفعة"],
      ["الملاحظة", "تختلف حسب العرض الساري"],
    ],
  },
];

const WHY = [
  [
    "مطوّر عمره أكثر من 60 عامًا",
    "مدينة مصر تأسست عام 1959 بقرار جمهوري وهي اللي طوّرت مدينة نصر نفسها — المدينة اللي بيسكنها ملايين النهاردة. ده مش مطور جديد بيجرّب، ده كيان بسجل تسليمات ممتد لستة عقود.",
  ],
  [
    "شركة مقيّدة بالبورصة المصرية",
    "الشركة مدرجة في البورصة المصرية منذ 1996، يعني خاضعة لمعايير إفصاح ورقابة مالية دورية. ده مستوى شفافية مش متوفر في أغلب المطورين الخاصين، وبيقلل مخاطر التعثر.",
  ],
  [
    "ثلاث مشروعات بثلاث ميزانيات",
    "من باترفلاي بسعر دخول أقل، لسراي بالبحيرة والمساحات، لتاج سيتي بالاستلام الفوري قرب المطار. مش لازم تختار مشروع مش مناسب لميزانيتك — فيه اختيار لكل شريحة.",
  ],
  [
    "وحدات جاهزة للمعاينة والاستلام",
    "تاج سيتي فيه مراحل مُسلَّمة ومأهولة ووحدات استلام فوري، وسراي بيسلّم مراحله تباعًا. تقدر تشوف على الطبيعة قبل ما تحجز بدل ما تشتري على الورق.",
  ],
];

const AMENITIES = [
  ["بحيرة صناعية 50 ألف م²", "بداخلها أكبر لاجون سباحة في القاهرة"],
  ["مساحات خضراء واسعة", "نسبة المباني منخفضة لصالح اللاند سكيب والمسطحات المائية"],
  ["نوادٍ ومراكز رياضية", "كلوب هاوس وجيم وملاعب داخل المشروعات"],
  ["مناطق تجارية ومطاعم", "مولات وخدمات تجارية داخل كل مشروع"],
  ["مدارس ومراكز طبية", "خدمات تعليمية وصحية داخل المجتمعات"],
  ["قرب المطار والمحاور", "الدائري وطريق السويس ومحور الأمل"],
  ["مسارات مشي ودراجات", "ممرات آمنة وسط الخضرة"],
  ["أمن وحراسة 24/7", "بوابات مؤمّنة وكاميرات مراقبة"],
];

const GALLERY: [string, string][] = [
  ["/images/gallery-1.webp", "فيلا مستقلة في كمبوند تاج سيتي القاهرة الجديدة"],
  ["/images/gallery-2.webp", "تاون هاوس كمبوند تاج سيتي على طريق السويس"],
  ["/images/gallery-3.webp", "عمارات كمبوند تاج سيتي القاهرة الجديدة — استلام فوري"],
  ["/images/gallery-4.webp", "وحدات سكنية مكتملة بكمبوند تاج سيتي"],
  ["/images/gallery-5.webp", "صف فيلات S-Villa في كمبوند سراي القاهرة الجديدة"],
  ["/images/gallery-6.webp", "فيلا S-Villa بكمبوند سراي — مدينة مصر"],
  ["/images/gallery-7.webp", "عمارات سكنية بكمبوند سراي القاهرة الجديدة"],
  ["/images/gallery-8.webp", "اللاند سكيب والنافورة بكمبوند ذا باترفلاي مدينة المستقبل"],
  ["/images/gallery-9.webp", "تاون هاوس كمبوند ذا باترفلاي المستقبل سيتي"],
  ["/images/gallery-10.webp", "عمارات كمبوند ذا باترفلاي مدينة المستقبل"],
];

const FAQS = [
  {
    q: "ما هي أسعار مشاريع مدينة مصر 2026؟",
    a: "تبدأ الأسعار الاسترشادية في مشروعات مدينة مصر من حوالي 3,900,000 جنيه. وتفصيلًا: أقل وحدة في كمبوند سراي تبدأ من حوالي 4,000,000 جنيه بسعر متر يبدأ من 70,000 جنيه، وفيلات ذا باترفلاي من حوالي 4,500,000 جنيه، بينما تبدأ أسعار تاج سيتي من حوالي 12,400,000 جنيه. الأسعار تختلف حسب المشروع والمرحلة ونوع الوحدة وتتغير باستمرار — سجل بياناتك لتصلك القائمة الرسمية المحدثة.",
  },
  {
    q: "ما هو نظام السداد في مشاريع مدينة مصر؟",
    a: "النظام الأساسي هو مقدم يبدأ من 5% وتقسيط يصل إلى 10 سنوات على أقساط متساوية. وتطرح الشركة في مراحل بعينها أنظمة بدون مقدم مع تقسيط حتى 10 سنوات، بالإضافة إلى خصومات مرتفعة عند السداد النقدي. تختلف التفاصيل حسب المشروع والمرحلة المطروحة وقت الحجز.",
  },
  {
    q: "أنهي مشروع أنسب: سراي ولا تاج سيتي ولا ذا باترفلاي؟",
    a: "لو بتدور على الحياة حول بحيرة ومساحات خضراء واسعة بسعر دخول متوسط، فسراي هو اختيارك. ولو عايز وحدة جاهزة للاستلام الفوري قريبة من مطار القاهرة ومصر الجديدة ومدينة نصر، فتاج سيتي أنسب. ولو هدفك أقل سعر دخول في مشروع جديد بمدينة المستقبل، فذا باترفلاي. سجل بياناتك وهيساعدك مستشارنا يختار حسب ميزانيتك وهدفك.",
  },
  {
    q: "أين يقع كمبوند سراي وما مساحته؟",
    a: "يقع كمبوند سراي على طريق مصر - السويس ومحور الأمل، بجوار مدينتي وقريبًا من مدينة المستقبل والعاصمة الإدارية، وعلى بُعد دقائق من الجامعة الأمريكية والطريق الدائري. ويمتد على 5.5 مليون متر مربع (نحو 1,000 فدان) بنسبة مبانٍ 18% فقط و82% مساحات خضراء ومسطحات مائية، ويضم بحيرة صناعية بمساحة 50,000 متر مربع بداخلها أكبر لاجون سباحة في القاهرة بمساحة 10,000 متر مربع وعمق 1.4 متر.",
  },
  {
    q: "أين يقع كمبوند تاج سيتي بالظبط؟",
    a: "يقع تاج سيتي على طريق السويس والطريق الدائري بالقاهرة الجديدة، أمام فندق JW Marriott، على بُعد حوالي 5 دقائق من مطار القاهرة الدولي و20 دقيقة من وسط البلد، وقريب جدًا من مدينة نصر ومصر الجديدة وشارع التسعين. ويمتد على نحو 900 فدان (أكثر من 3.5 مليون متر مربع).",
  },
  {
    q: "ما هو كمبوند ذا باترفلاي وأين يقع؟",
    a: "ذا باترفلاي The Butterfly من أحدث مشروعات مدينة مصر، يمتد على 238 فدانًا في مدينة المستقبل بواجهة مباشرة على محور الأمل وبجوار كمبوند سراي. يضم شققًا ودوبلكس وتاون هاوس وفيلات محاطة بمساحات خضراء وبحيرات صناعية، وتبدأ أسعار الفيلات فيه من حوالي 4,500,000 جنيه.",
  },
  {
    q: "هل توجد وحدات استلام فوري في مشاريع مدينة مصر؟",
    a: "نعم — يوفر كمبوند تاج سيتي وحدات جاهزة للاستلام الفوري في مراحله المُسلَّمة والمأهولة بالسكان بالفعل، وهو ما يتيح لك معاينة الوحدة على الطبيعة قبل الشراء. كما يسلّم كمبوند سراي مراحله تباعًا.",
  },
  {
    q: "من هي شركة مدينة مصر للإسكان والتعمير؟",
    a: "مدينة مصر للتطوير العقاري (مدينة نصر للإسكان والتعمير سابقًا) تأسست عام 1959 بقرار جمهوري لتطوير مدينة نصر، وهي من أعرق شركات التطوير العقاري في مصر والشرق الأوسط بأكثر من 60 عامًا من الخبرة. الشركة مقيّدة بالبورصة المصرية منذ عام 1996، ومن محفظتها: تاج سيتي وسراي وذا باترفلاي وتلالا وكافانا ليك وأوريجامي وإيلان.",
  },
];

/* ============================================================ */

export default function Page() {
  const [annOpen, setAnnOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [cookiesOk, setCookiesOk] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [slide, setSlide] = useState(0);
  const popupShown = useRef(false);

  useEffect(() => {
    const show = () => {
      if (popupShown.current || sessionStorage.getItem("mm_popup")) return;
      popupShown.current = true;
      sessionStorage.setItem("mm_popup", "1");
      setPopupOpen(true);
    };
    const t = setTimeout(show, 18000);
    const onScroll = () => {
      const sc =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      if (sc >= 0.55) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => setCookiesOk(!!localStorage.getItem("mm_cookies")), []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ============ Announcement ============ */}
      {annOpen && (
        <div className="fixed top-0 inset-x-0 z-50 bg-gold text-white text-center text-xs sm:text-sm py-2 px-9">
          <span className="ann-pulse font-semibold">
            مشاريع مدينة مصر — مقدم 5% وتقسيط حتى 10 سنوات · وحدات استلام فوري
          </span>
          <button
            aria-label="إغلاق الشريط"
            onClick={() => setAnnOpen(false)}
            className="absolute top-1.5 left-3 text-white/70 hover:text-white text-lg leading-none"
          >
            ✕
          </button>
        </div>
      )}

      {/* ============ Header ============ */}
      <header
        className={`fixed inset-x-0 z-40 bg-ink/95 backdrop-blur border-b border-white/10 transition-all ${
          annOpen ? "top-9" : "top-0"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3">
          <a href="#top" className="text-white font-bold text-base sm:text-lg leading-tight shrink-0">
            مشاريع{" "}
            <span className="font-latin italic text-gold-2 text-lg sm:text-xl">
              Madinet Masr
            </span>
            <span className="block text-[10px] font-normal text-white/50">
              فريق مبيعات معتمد
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-5 text-sm text-white/80">
            <a href="#sarai" className="hover:text-gold-2 transition-colors">سراي</a>
            <a href="#tajcity" className="hover:text-gold-2 transition-colors">تاج سيتي</a>
            <a href="#butterfly" className="hover:text-gold-2 transition-colors">ذا باترفلاي</a>
            <a href="#compare" className="hover:text-gold-2 transition-colors">مقارنة</a>
            <a href="#plans" className="hover:text-gold-2 transition-colors">أنظمة السداد</a>
            <a href="#faq" className="hover:text-gold-2 transition-colors">أسئلة شائعة</a>
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener"
              onClick={trackWA}
              className="hidden sm:inline-flex rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
            >
              واتساب
            </a>
            <a
              href={`tel:${PHONE_INTL}`}
              onClick={trackCall}
              className="hidden xl:inline-flex rounded-full bg-gold px-4 py-2 text-sm font-semibold text-white"
            >
              {PHONE}
            </a>
            <button
              aria-label="القائمة"
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden text-white p-2"
            >
              <span className="block w-6 h-0.5 bg-white mb-1.5" />
              <span className="block w-6 h-0.5 bg-white mb-1.5" />
              <span className="block w-6 h-0.5 bg-white" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="lg:hidden bg-ink border-t border-white/10 px-4 py-3 flex flex-col gap-3 text-white/90">
            {[
              ["sarai", "سراي"],
              ["tajcity", "تاج سيتي"],
              ["butterfly", "ذا باترفلاي"],
              ["compare", "مقارنة"],
              ["plans", "أنظمة السداد"],
              ["faq", "أسئلة شائعة"],
            ].map(([id, l]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {l}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ============ HERO + form ============ */}
      <section
        id="top"
        className={`relative ${annOpen ? "pt-28" : "pt-20"} pb-14 md:pb-20`}
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(20,32,28,.9), rgba(20,32,28,.74) 45%, rgba(20,32,28,.95)), url(/images/hero.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-[1.12fr_1fr] gap-10 items-start">
          <div className="text-white pt-3">
            <p className="inline-block rounded-full border border-gold/60 bg-gold/15 px-4 py-1.5 text-xs sm:text-sm text-gold-2 mb-6">
              مدينة مصر للإسكان والتعمير — منذ 1959
            </p>
            <h1 className="text-[26px] sm:text-4xl lg:text-5xl font-extrabold leading-[1.35] mb-5">
              مشاريع مدينة مصر 2026
              <span className="block mt-2 text-gold-2 text-xl sm:text-3xl font-semibold">
                سراي · تاج سيتي · ذا باترفلاي
              </span>
            </h1>
            <p className="text-white/85 md:text-lg leading-relaxed mb-8 max-w-xl">
              ثلاثة مجتمعات متكاملة من شركة عمرها أكثر من 60 عامًا ومقيّدة
              بالبورصة المصرية — من بحيرة سراي القابلة للسباحة، إلى تاج سيتي على
              بُعد 5 دقائق من مطار القاهرة، إلى ذا باترفلاي بمدينة المستقبل.
              كلها في القاهرة الجديدة ومدينة المستقبل، بأسعار تبدأ من 3.9
              مليون جنيه ومقدم 5% وتقسيط حتى 10 سنوات.
            </p>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-8 max-w-lg">
              {HERO_KPIS.map(([v, l]) => (
                <div
                  key={l}
                  className="rounded-xl bg-white/8 border border-white/15 px-2 py-4 text-center backdrop-blur-sm"
                >
                  <div className="text-base sm:text-2xl font-extrabold text-gold-2">
                    {v}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/70 mt-1 leading-tight">
                    {l}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#lead"
                className="rounded-full bg-gold px-7 py-3 font-bold text-white hover:bg-gold-2 transition-colors"
              >
                اطلب قائمة الأسعار
              </a>
              <a
                href={WA_DEFAULT}
                target="_blank"
                rel="noopener"
                onClick={trackWA}
                className="rounded-full border border-white/35 px-7 py-3 font-bold text-white hover:bg-white/10 transition-colors"
              >
                واتساب مباشر
              </a>
            </div>
          </div>

          <div id="lead" className="scroll-mt-28">
            <div className="rounded-2xl bg-white shadow-2xl p-6 sm:p-7">
              <h2 className="text-lg sm:text-xl font-bold text-ink mb-1.5">
                سجل اهتمامك واستلم البروشور وقائمة الأسعار
              </h2>
              <p className="text-sm text-ink/55 mb-5 leading-relaxed">
                سيتواصل معك مستشار عقاري ويساعدك تختار بين سراي وتاج سيتي وذا
                باترفلاي حسب ميزانيتك
              </p>
              <LeadForm formLocation="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ Developer ============ */}
      <section className="bg-royal text-white py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center reveal">
          <p className="font-latin text-gold-2 tracking-[0.25em] text-xs sm:text-sm mb-3">
            MADINET MASR · EST. 1959
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-5">
            عن شركة مدينة مصر للإسكان والتعمير
          </h2>
          <p className="text-white/75 leading-relaxed max-w-3xl mx-auto mb-8">
            مدينة مصر للتطوير العقاري (مدينة نصر للإسكان والتعمير سابقًا) ليست
            مطورًا عقاريًا تقليديًا — بل مؤسسة تأسست عام 1959 بقرار جمهوري
            لتطوير مدينة نصر، المدينة التي يسكنها الملايين اليوم. الشركة مقيّدة
            بالبورصة المصرية منذ 1996 وتخضع لمعايير الإفصاح المؤسسي، وتضم
            محفظتها: تاج سيتي وسراي وذا باترفلاي وتلالا وكافانا ليك وأوريجامي
            وإيلان.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-right">
            {DEV_TIMELINE.map(([y, t]) => (
              <div
                key={y}
                className="rounded-xl bg-white/5 border border-white/15 p-5"
              >
                <div className="font-latin text-2xl text-gold-2 mb-1.5">{y}</div>
                <p className="text-xs text-white/70 leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2.5 text-sm">
            {DEV_BADGES.map((b) => (
              <span
                key={b}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-white/85"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Projects ============ */}
      {PROJECTS.map((p, idx) => (
        <section
          key={p.id}
          id={p.id}
          className={`py-16 md:py-20 scroll-mt-24 ${
            idx % 2 === 0 ? "bg-ivory" : "bg-ivory-2"
          }`}
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="reveal mb-9">
              <p className={`text-sm font-semibold ${p.accent} mb-2`}>{p.tag}</p>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b hairline pb-5">
                <h2 className="text-2xl md:text-4xl font-extrabold text-ink">
                  {p.name}
                </h2>
                <span className="font-latin italic text-xl text-ink/45">
                  {p.en}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div className="reveal space-y-6">
                <p className="text-ink/75 leading-relaxed">{p.desc}</p>
                <div className="grid grid-cols-2 gap-4">
                  {p.facts.map(([v, l]) => (
                    <div key={l} className="border-r-2 border-gold pr-3">
                      <div className="text-lg sm:text-xl font-extrabold text-ink">
                        {v}
                      </div>
                      <div className="text-xs text-ink/55 mt-1 leading-tight">
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-ink/60 italic border-r-2 border-emerald/40 pr-3">
                  {p.ideal}
                </p>
              </div>

              <div className="reveal">
                <div className="relative rounded-2xl overflow-hidden shadow-lg mb-5">
                  <img
                    src={p.img}
                    alt={p.alt}
                    className="w-full h-56 sm:h-64 object-cover"
                    loading="lazy"
                  />
                  <span
                    className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold shadow ${p.badgeTone}`}
                  >
                    {p.badge}
                  </span>
                </div>
                <img
                  src={p.img2}
                  alt={p.alt2}
                  className="w-full h-40 sm:h-44 object-cover rounded-2xl shadow-lg mb-5"
                  loading="lazy"
                />
                <div className="rounded-2xl bg-white border hairline p-6">
                  <ul className="space-y-2.5">
                    {p.rows.map(([a, v]) => (
                      <li
                        key={a}
                        className="flex justify-between gap-3 text-sm border-b hairline pb-2.5 last:border-0"
                      >
                        <span className="text-ink/65">{a}</span>
                        <span className="text-ink font-semibold text-left">
                          {v}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#lead"
                    className="mt-6 block text-center rounded-xl bg-ink text-white py-3 font-semibold hover:bg-royal transition-colors"
                  >
                    اطلب أسعار {p.name}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ============ Comparison ============ */}
      <section id="compare" className="py-16 md:py-20 bg-white scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-emerald font-semibold text-sm mb-2 reveal">
            مقارنة سريعة
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-4 reveal">
            أنهي مشروع يناسبك؟ سراي ولا تاج سيتي ولا ذا باترفلاي
          </h2>
          <p className="text-center text-ink/60 max-w-2xl mx-auto mb-10 reveal leading-relaxed">
            الثلاثة من نفس المطور وفي نطاق القاهرة الجديدة ومدينة المستقبل،
            بس مختلفين تمامًا في الموقع والميزانية والجاهزية. دي أهم الفروق في
            سطور.
          </p>

          <div className="reveal overflow-x-auto rounded-2xl border hairline">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead>
                <tr className="bg-royal text-white">
                  <th className="p-4 text-right font-semibold">المقارنة</th>
                  <th className="p-4 text-right font-semibold">سراي</th>
                  <th className="p-4 text-right font-semibold">تاج سيتي</th>
                  <th className="p-4 text-right font-semibold">ذا باترفلاي</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr
                    key={row[0]}
                    className={i % 2 ? "bg-ivory" : "bg-white"}
                  >
                    <td className="p-4 font-semibold text-ink/70 border-t hairline">
                      {row[0]}
                    </td>
                    <td className="p-4 text-ink border-t hairline">{row[1]}</td>
                    <td className="p-4 text-ink border-t hairline">{row[2]}</td>
                    <td className="p-4 text-ink border-t hairline">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8 reveal">
            <a
              href="#lead"
              className="inline-block rounded-full bg-emerald px-8 py-3 font-bold text-white hover:bg-emerald-2 transition-colors"
            >
              مش عارف تختار؟ كلّم مستشار عقاري
            </a>
          </div>
        </div>
      </section>

      {/* ============ Payment plans ============ */}
      <section id="plans" className="py-16 md:py-20 bg-ivory scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-emerald font-semibold text-sm mb-2 reveal">
            أنظمة السداد
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-10 reveal">
            أنظمة سداد وتقسيط مشاريع مدينة مصر
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((p) => (
              <div
                key={p.title}
                className="reveal rounded-2xl bg-white border hairline p-6 flex flex-col shadow-sm"
              >
                <span
                  className={`self-start rounded-full px-3 py-1 text-xs font-semibold mb-4 ${p.tagTone}`}
                >
                  {p.tag}
                </span>
                <h3 className="font-bold text-lg text-ink mb-5">{p.title}</h3>
                <dl className="space-y-3 flex-1">
                  {p.rows.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between gap-3 text-sm border-b hairline pb-3 last:border-0"
                    >
                      <dt className="text-ink/60">{k}</dt>
                      <dd className="text-ink font-bold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="#lead"
                  className="mt-6 block text-center rounded-xl border-2 border-emerald text-emerald py-2.5 font-semibold hover:bg-emerald hover:text-white transition-colors"
                >
                  اطلب تفاصيل النظام
                </a>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink/45 text-center mt-6 leading-relaxed max-w-3xl mx-auto">
            * جميع الأسعار وأنظمة السداد استرشادية وقابلة للتغيير وفقًا
            لتحديثات الشركة المطورة والمرحلة المطروحة وتوافر الوحدات وقت الحجز.
          </p>
        </div>
      </section>

      {/* ============ Amenities ============ */}
      <section className="py-16 md:py-20 bg-ivory-2">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-emerald font-semibold text-sm mb-2 reveal">
            الخدمات والمرافق
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-10 reveal">
            خدمات ومرافق كمبوندات مدينة مصر بالقاهرة الجديدة
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AMENITIES.map(([t, d]) => (
              <div
                key={t}
                className="reveal rounded-xl bg-white border hairline p-5 hover:border-emerald/40 transition-colors"
              >
                <div className="w-9 h-0.5 bg-gold mb-3" />
                <h3 className="font-bold text-ink mb-1.5">{t}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Why ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-center text-emerald font-semibold text-sm mb-2 reveal">
            مميزات الشراء
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-10 reveal">
            لماذا تشتري من مدينة مصر للإسكان والتعمير؟
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {WHY.map(([t, d], i) => (
              <div key={t} className="reveal flex gap-4">
                <div className="shrink-0 grid place-items-center w-10 h-10 rounded-full bg-emerald text-white font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-ink mb-1.5">{t}</h3>
                  <p className="text-sm text-ink/65 leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Gallery ============ */}
      <section id="gallery" className="py-16 md:py-20 bg-ink scroll-mt-24">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-center text-gold-2 font-semibold text-sm mb-2 reveal">
            معرض الصور
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-9 reveal">
            صور كمبوندات مدينة مصر بالقاهرة الجديدة — سراي وتاج سيتي وذا باترفلاي
          </h2>

          <div className="reveal relative rounded-2xl overflow-hidden shadow-2xl bg-white">
            <img
              src={GALLERY[slide][0]}
              alt={GALLERY[slide][1]}
              className="w-full h-[240px] sm:h-[480px] object-cover"
              loading="lazy"
            />
            <button
              aria-label="الصورة السابقة"
              onClick={() => setSlide((s) => (s - 1 + GALLERY.length) % GALLERY.length)}
              className="absolute top-1/2 -translate-y-1/2 right-3 grid place-items-center w-11 h-11 rounded-full bg-white/90 text-ink text-xl hover:bg-white shadow"
            >
              ❯
            </button>
            <button
              aria-label="الصورة التالية"
              onClick={() => setSlide((s) => (s + 1) % GALLERY.length)}
              className="absolute top-1/2 -translate-y-1/2 left-3 grid place-items-center w-11 h-11 rounded-full bg-white/90 text-ink text-xl hover:bg-white shadow"
            >
              ❮
            </button>
            <p className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/90 to-transparent text-white text-xs sm:text-sm px-4 pt-8 pb-3 text-center">
              {GALLERY[slide][1]}
            </p>
          </div>

          <div className="flex justify-center gap-2 mt-5 flex-wrap">
            {GALLERY.map((g, i) => (
              <button
                key={g[0]}
                aria-label={`صورة ${i + 1}`}
                onClick={() => setSlide(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === slide ? "w-7 bg-gold" : "w-2.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <div className="text-center mt-8 reveal">
            <a
              href="#lead"
              className="inline-block rounded-full bg-gold px-8 py-3 font-bold text-white hover:bg-gold-2 transition-colors"
            >
              اطلب البروشور وقائمة الأسعار
            </a>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="py-16 md:py-20 bg-ivory scroll-mt-24">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-9">
            أسئلة شائعة عن مشاريع مدينة مصر
          </h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                className="reveal rounded-xl bg-white border hairline overflow-hidden"
              >
                <button
                  className="w-full text-right px-5 py-4 font-semibold text-ink flex justify-between items-center gap-3"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="text-emerald shrink-0 text-lg">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-5 text-ink/65 leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Final CTA ============ */}
      <section className="py-16 md:py-20 bg-emerald text-white">
        <div className="mx-auto max-w-3xl px-4 text-center reveal">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            جاهز لاختيار وحدتك في مشاريع مدينة مصر؟
          </h2>
          <p className="text-white/85 mb-8 leading-relaxed">
            تواصل معنا الآن لمعرفة الوحدات المتاحة في سراي وتاج سيتي وذا
            باترفلاي وأحدث الأسعار وأنظمة السداد.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${PHONE_INTL}`}
              onClick={trackCall}
              className="rounded-full bg-white text-emerald px-7 py-3 font-bold hover:bg-ivory transition-colors"
            >
              اتصل بالمستشار العقاري
            </a>
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener"
              onClick={trackWA}
              className="rounded-full bg-[#25D366] px-7 py-3 font-bold text-white"
            >
              تحدث عبر واتساب
            </a>
            <a
              href="#lead"
              className="rounded-full border border-white/50 px-7 py-3 font-bold hover:bg-white/10 transition-colors"
            >
              احجز وحدتك الآن
            </a>
          </div>
        </div>
      </section>

      {/* ============ Footer ============ */}
      <footer className="bg-ink border-t border-white/10 text-white/60 text-sm">
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-5">
          <p className="leading-relaxed">
            منصة معلومات واستفسارات عقارية مستقلة يديرها فريق مبيعات معتمد لدى
            كبرى شركات التطوير العقاري في مصر. هذه الصفحة ليست الموقع الرسمي
            لشركة مدينة مصر للإسكان والتعمير (Madinet Masr) ولا تتبعها إداريًا،
            وجميع الأسماء والعلامات التجارية مملوكة لأصحابها. الأسعار والمساحات
            الواردة استرشادية وقابلة للتغيير وفق أحدث تحديثات المطور.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/about/" className="hover:text-gold-2">من نحن</a>
            <a href="/privacy/" className="hover:text-gold-2">سياسة الخصوصية</a>
            <a href="/disclaimer/" className="hover:text-gold-2">إخلاء المسئولية</a>
            <a href={`tel:${PHONE_INTL}`} onClick={trackCall} className="hover:text-gold-2">
              {PHONE}
            </a>
          </div>
          <p>© 2026 جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      {/* ============ Floating ============ */}
      <div className="fixed bottom-24 md:bottom-8 left-4 z-40 flex flex-col gap-3">
        <a
          href={WA_DEFAULT}
          target="_blank"
          rel="noopener"
          onClick={trackWA}
          aria-label="تواصل واتساب"
          className="wa-pulse grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden>
            <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.33 4.95L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.83 9.83 0 0 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.34c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
          </svg>
        </a>
        <a
          href={`tel:${PHONE_INTL}`}
          onClick={trackCall}
          aria-label="اتصال هاتفي"
          className="grid place-items-center w-14 h-14 rounded-full bg-gold text-white shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3.5a1 1 0 0 1 1-1H7.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2Z" />
          </svg>
        </a>
      </div>

      {/* ============ Mobile bar ============ */}
      <div className="fixed md:hidden bottom-0 inset-x-0 z-40 bg-ink border-t border-white/10 grid grid-cols-3 text-center text-sm text-white">
        <a href={`tel:${PHONE_INTL}`} onClick={trackCall} className="py-3.5 font-semibold">
          اتصال
        </a>
        <a
          href={WA_DEFAULT}
          target="_blank"
          rel="noopener"
          onClick={trackWA}
          className="py-3.5 font-semibold bg-[#25D366]"
        >
          واتساب
        </a>
        <a href="#lead" className="py-3.5 font-semibold bg-gold">
          الأسعار
        </a>
      </div>

      {/* ============ Popup ============ */}
      {popupOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4"
          onClick={() => setPopupOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="إغلاق"
              className="absolute top-3 left-3 text-ink/40 text-xl"
              onClick={() => setPopupOpen(false)}
            >
              ✕
            </button>
            <span className="inline-block rounded-full bg-gold/20 text-gold px-3 py-1 text-xs font-semibold mb-3">
              مقدم 5% وتقسيط 10 سنوات
            </span>
            <h3 className="text-xl font-bold text-ink mb-1.5">
              برايس ليست مشاريع مدينة مصر 2026
            </h3>
            <p className="text-sm text-ink/55 mb-5">
              سراي · تاج سيتي · ذا باترفلاي — تصلك على واتساب
            </p>
            <LeadForm formLocation="popup" compact />
          </div>
        </div>
      )}

      {/* ============ Cookies ============ */}
      {!cookiesOk && (
        <div className="fixed bottom-16 md:bottom-4 inset-x-4 md:inset-x-auto md:left-4 md:max-w-sm z-50 rounded-xl bg-white shadow-2xl border hairline p-4 text-sm text-ink/70">
          نستخدم ملفات تعريف الارتباط لتحسين تجربتك وقياس أداء الحملات
          الإعلانية.{" "}
          <a href="/privacy/" className="text-emerald underline">
            سياسة الخصوصية
          </a>
          <button
            className="mt-3 w-full rounded-lg bg-ink text-white py-2 font-semibold"
            onClick={() => {
              localStorage.setItem("mm_cookies", "1");
              setCookiesOk(true);
            }}
          >
            موافق
          </button>
        </div>
      )}
    </main>
  );
}

/* ============================================================
   Lead form
   ============================================================ */
function LeadForm({
  formLocation,
  compact = false,
}: {
  formLocation: string;
  compact?: boolean;
}) {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const [dial, setDial] = useState("+20");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    if (fd.get("botcheck")) return;

    const name = String(fd.get("name") || "").trim();
    const raw = String(fd.get("phone") || "").replace(/[\s\-()]/g, "");
    const local = raw.replace(/^0+/, "");
    const country = COUNTRIES.find((c) => c.d === dial)!;

    if (name.length < 2) return setErr("من فضلك اكتب الاسم بالكامل");
    if (!country.re.test(local))
      return setErr(`رقم غير صحيح — تأكد من رقم ${country.n}`);

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Lead جديد — مشاريع مدينة مصر",
          from_name: "Madinet Masr Landing",
          name,
          phone: `${dial}${local}`,
          country: country.n,
          project: fd.get("project") || "—",
          source: formLocation,
          page: "madinet-masr-projects",
        }),
      });
      const data = await res.json();
      if (data.success) {
        fire(CONV_FORM);
        setDone(true);
      } else {
        setErr("حدث خطأ، حاول مرة أخرى أو تواصل عبر واتساب");
      }
    } catch {
      setErr("تعذر الإرسال — تأكد من الاتصال بالإنترنت");
    } finally {
      setSending(false);
    }
  }

  if (done)
    return (
      <div className="text-center py-4">
        <div className="mx-auto grid place-items-center w-14 h-14 rounded-full bg-emerald text-white text-2xl mb-4">
          ✓
        </div>
        <h3 className="text-lg font-bold text-ink mb-2">
          تم استلام طلبك بنجاح!
        </h3>
        <p className="text-sm text-ink/60 leading-relaxed mb-5">
          شكرًا لتواصلك — سيتصل بك مستشار عقاري هاتفيًا أو عبر واتساب بتفاصيل
          الوحدات المتاحة والأسعار.
        </p>
        <a
          href={WA_DEFAULT}
          target="_blank"
          rel="noopener"
          onClick={trackWA}
          className="block rounded-xl bg-[#25D366] text-white py-3 font-bold"
        >
          تواصل عبر واتساب مباشرة
        </a>
        <p className="text-[11px] text-ink/40 mt-4">
          خصوصية تامة — بياناتك تُستخدم فقط للتواصل بخصوص استفسارك العقاري
        </p>
      </div>
    );

  return (
    <form onSubmit={submit} className="space-y-3.5" noValidate>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <input
        name="name"
        placeholder="الاسم بالكامل"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-ink placeholder:text-ink/40 focus:outline-none focus:border-emerald"
      />

      <div className="flex gap-2" dir="rtl">
        <select
          aria-label="كود الدولة"
          value={dial}
          onChange={(e) => setDial(e.target.value)}
          className="w-28 shrink-0 rounded-xl border border-slate-300 px-2 py-3 bg-white text-ink text-sm focus:outline-none focus:border-emerald"
        >
          {COUNTRIES.map((c) => (
            <option key={c.c} value={c.d}>
              {c.c} {c.d}
            </option>
          ))}
        </select>
        <input
          name="phone"
          inputMode="tel"
          dir="ltr"
          placeholder="رقم الموبايل"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 bg-white text-ink placeholder:text-ink/40 text-right focus:outline-none focus:border-emerald"
        />
      </div>

      {!compact && (
        <select
          name="project"
          defaultValue=""
          className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-ink/70 focus:outline-none focus:border-emerald"
        >
          <option value="" disabled>
            المشروع المطلوب
          </option>
          <option>كمبوند سراي</option>
          <option>كمبوند تاج سيتي</option>
          <option>كمبوند ذا باترفلاي</option>
          <option>مش عارف — عايز مساعدة في الاختيار</option>
        </select>
      )}

      {err && <p className="text-red-600 text-sm font-semibold">{err}</p>}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-gold py-3.5 font-bold text-white hover:bg-gold-2 transition-colors disabled:opacity-60"
      >
        {sending ? "جاري الإرسال..." : "احجز وحدتك الآن"}
      </button>

      <p className="text-[11px] text-ink/45 text-center leading-relaxed">
        بالضغط على إرسال أنت توافق على{" "}
        <a href="/privacy/" className="underline">سياسة الخصوصية</a> — بياناتك
        تُستخدم فقط للتواصل بخصوص استفسارك العقاري.
      </p>
    </form>
  );
}
