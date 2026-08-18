export const metadata = { title: "سياسة الخصوصية | مشاريع مدينة مصر" };
export default function Privacy() {
  return (
    <main className="min-h-screen bg-ivory text-ink/80">
      <div className="mx-auto max-w-3xl px-4 py-16 leading-relaxed space-y-5">
        <h1 className="text-3xl font-bold text-ink">سياسة الخصوصية</h1>
        <p>نلتزم بحماية خصوصية زوار هذه الصفحة. عند تسجيل بياناتك (الاسم ورقم الهاتف) فإنها تُستخدم فقط للتواصل معك بخصوص استفسارك العقاري وإرسال تفاصيل المشروع المطلوب.</p>
        <h2 className="font-bold text-xl text-ink">البيانات التي نجمعها</h2>
        <p>الاسم، رقم الهاتف وكود الدولة، والمشروع محل الاهتمام. كما نستخدم ملفات تعريف الارتباط (Cookies) وأدوات قياس مثل Google Ads لقياس أداء الحملات الإعلانية وتحسين تجربة التصفح.</p>
        <h2 className="font-bold text-xl text-ink">مشاركة البيانات</h2>
        <p>لا نبيع بياناتك ولا نشاركها مع أي طرف ثالث لأغراض تسويقية خارجية. قد تتم مشاركة بيانات التواصل مع فريق المبيعات المعتمد المختص بالمشروع لإتمام خدمتك فقط.</p>
        <h2 className="font-bold text-xl text-ink">حقوقك</h2>
        <p>يحق لك طلب حذف بياناتك أو إيقاف التواصل في أي وقت عبر <span dir="ltr">01029944403</span>.</p>
        <p><a href="/" className="text-emerald underline">العودة للصفحة الرئيسية</a></p>
      </div>
    </main>
  );
}
