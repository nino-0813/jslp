import Link from "next/link"

const rows: { label: string; value: string }[] = [
  { label: "販売業者", value: "株式会社am yamashi" },
  { label: "運営統括責任者", value: "澤口 真里佳" },
  { label: "所在地", value: "〒150-0043 東京都渋谷区道玄坂１丁目１０番８号 渋谷道玄坂東急ビル２Ｆ－Ｃ" },
  { label: "電話番号", value: "お問い合わせフォームより請求があれば遅滞なく開示します" },
  { label: "メールアドレス", value: "am.yamashi@gmail.com" },
  {
    label: "商品の内容",
    value:
      "「偶然のさわでぃー南極シール」(一言メッセージ付き)、およびFacebook限定ページへのご招待(月1回程度、南極渡航の進捗を発信)。支援金額にかかわらず内容は同一です。本プロジェクトにリターンの価値と支援額との対価性はなく、南極渡航プロジェクトへの支援としての性質を持ちます。",
  },
  { label: "販売価格", value: "3,000円／10,000円／30,000円／100,000円／100万円超(税込、複数口の支援可)" },
  { label: "商品代金以外の必要料金", value: "決済手数料等の追加負担はありません(Stripeの決済手数料は当方が負担します)" },
  { label: "支払方法", value: "クレジットカード決済(Stripe)" },
  { label: "支払時期", value: "お申し込み(決済)時に即時決済されます" },
  {
    label: "商品の引渡時期",
    value:
      "決済完了後、順次「偶然のさわでぃー南極シール」を発送いたします。あわせてFacebook限定ページへご招待いたします。",
  },
  {
    label: "返品・キャンセルについて",
    value:
      "本プロジェクトはクラウドファンディング型の支援であり、リターンの対価性を持たない性質上、決済完了後のキャンセル・返金は原則お受けしておりません。",
  },
]

export default function TokushohoPage() {
  return (
    <div className="min-h-screen bg-black">
      <header className="px-4 py-4 sm:px-6 sm:py-6">
        <nav className="flex items-center justify-between text-sm font-mono tracking-wider">
          <Link href="/" className="text-white hover:text-white/60 transition-colors font-semibold">
            STUDIO PIXEL®
          </Link>
          <Link href="/" className="text-white/70 hover:text-white transition-colors text-xs tracking-widest">
            ← 一覧へ戻る
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-2xl">
        <p className="text-white/60 font-mono text-xs tracking-[0.25em] uppercase mb-3">Legal</p>
        <h1 className="text-white font-mono text-xl sm:text-2xl tracking-widest uppercase mb-10 sm:mb-12">
          特定商取引法に基づく表記
        </h1>

        <dl className="divide-y divide-white/10 border-t border-b border-white/10">
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-1 sm:gap-6 py-5">
              <dt className="text-white/50 font-mono text-xs tracking-widest uppercase">{row.label}</dt>
              <dd className="text-white/80 text-sm leading-relaxed">{row.value}</dd>
            </div>
          ))}
        </dl>
      </main>
    </div>
  )
}
