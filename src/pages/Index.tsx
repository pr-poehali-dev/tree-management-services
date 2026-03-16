import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "Технология", href: "#technology" },
  { label: "Стоимость", href: "#pricing" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "О компании", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  {
    icon: "Axe",
    title: "Валка деревьев",
    desc: "Профессиональный спил деревьев любой сложности — аварийных, крупных, труднодоступных. Работаем с использованием современной техники и методов безопасного демонтажа.",
    features: ["Любая высота и сложность", "Аварийные деревья", "Контролируемый спил по частям"],
  },
  {
    icon: "Scissors",
    title: "Опиловка и обрезка",
    desc: "Формирование кроны, санитарная обрезка, удаление сухих и опасных веток. Придаём деревьям здоровый вид и убираем угрозы для зданий и людей.",
    features: ["Формирование кроны", "Санитарная обрезка", "Удаление сухостоя"],
  },
  {
    icon: "Recycle",
    title: "Утилизация отходов",
    desc: "Полная переработка порубочных остатков: измельчение в щепу, вывоз, переработка в удобрение или топливо. Оставляем участок абсолютно чистым.",
    features: ["Измельчение в щепу", "Вывоз древесины", "Экологичная переработка"],
  },
  {
    icon: "TreePine",
    title: "Корчевание пней",
    desc: "Механическое и химическое удаление пней, фрезерование до уровня грунта. Полная подготовка участка под строительство или озеленение.",
    features: ["Фрезерование пней", "Химическое удаление", "Подготовка под стройку"],
  },
  {
    icon: "Shield",
    title: "Аварийные работы",
    desc: "Экстренный выезд 24/7 для устранения аварийных деревьев после штормов. Быстро, безопасно, с полной ответственностью за результат.",
    features: ["Выезд за 2 часа", "Работа 24/7", "Ликвидация последствий"],
  },
  {
    icon: "Building2",
    title: "Расчистка территорий",
    desc: "Комплексная расчистка участков под строительство, сельское хозяйство или ландшафтный дизайн. Работаем с участками любой площади.",
    features: ["Участки под застройку", "Промышленные объекты", "Любая площадь"],
  },
];

const PRICING = [
  {
    category: "Валка деревьев",
    icon: "Axe",
    color: "from-forest-600 to-forest-800",
    items: [
      { name: "Дерево до 5 м", price: "от 1 500 ₽" },
      { name: "Дерево 5–10 м", price: "от 3 000 ₽" },
      { name: "Дерево 10–15 м", price: "от 5 000 ₽" },
      { name: "Дерево 15–20 м", price: "от 8 000 ₽" },
      { name: "Дерево свыше 20 м", price: "от 12 000 ₽" },
      { name: "Аварийное дерево", price: "от 6 000 ₽" },
    ],
  },
  {
    category: "Опиловка и обрезка",
    icon: "Scissors",
    color: "from-emerald-600 to-forest-700",
    items: [
      { name: "Санитарная обрезка (до 5 м)", price: "от 800 ₽" },
      { name: "Санитарная обрезка (5–10 м)", price: "от 1 500 ₽" },
      { name: "Формирование кроны", price: "от 2 000 ₽" },
      { name: "Удаление веток над кровлей", price: "от 3 000 ₽" },
      { name: "Снос кустарников (до 10 м²)", price: "от 1 200 ₽" },
      { name: "Спиливание сухостоя", price: "от 2 500 ₽" },
    ],
  },
  {
    category: "Утилизация отходов",
    icon: "Recycle",
    color: "from-lime-600 to-forest-600",
    items: [
      { name: "Измельчение веток (1 куб)", price: "от 500 ₽" },
      { name: "Вывоз щепы (1 рейс)", price: "от 3 000 ₽" },
      { name: "Вывоз стволов (1 рейс)", price: "от 4 500 ₽" },
      { name: "Корчевание пня (до 30 см)", price: "от 2 000 ₽" },
      { name: "Корчевание пня (30–60 см)", price: "от 3 500 ₽" },
      { name: "Уборка участка под ключ", price: "по договору" },
    ],
  },
];

const PORTFOLIO = [
  {
    img: "https://cdn.poehali.dev/projects/4825f53e-c142-457b-94b5-02b8d96ce16f/files/b9164dab-49c7-4af7-84ae-c3424e1de52e.jpg",
    title: "Валка крупного ясеня",
    location: "Москва, Коломенское",
    tag: "Валка",
  },
  {
    img: "https://cdn.poehali.dev/projects/4825f53e-c142-457b-94b5-02b8d96ce16f/files/6ed39668-2a80-448d-8a69-f5804039edb7.jpg",
    title: "Обрезка городских деревьев",
    location: "Московская область",
    tag: "Опиловка",
  },
  {
    img: "https://cdn.poehali.dev/projects/4825f53e-c142-457b-94b5-02b8d96ce16f/files/48018b9d-4567-4045-8fd2-2c30648f992a.jpg",
    title: "Переработка порубочных остатков",
    location: "Подмосковье",
    tag: "Утилизация",
  },
];

const STEPS = [
  { num: "01", title: "Заявка и осмотр", desc: "Принимаем заявку, выезжаем на объект для оценки объёма работ и составления точной сметы. Бесплатно." },
  { num: "02", title: "Согласование", desc: "Оформляем договор, получаем все необходимые разрешения. Вы знаете точную стоимость заранее." },
  { num: "03", title: "Выполнение работ", desc: "Профессиональная команда с современным оборудованием выполняет работы в согласованные сроки." },
  { num: "04", title: "Уборка и сдача", desc: "Полностью убираем территорию, вывозим все отходы. Принимаем работу вместе с вами." },
];

const STATS = [
  { value: "500+", label: "Деревьев обработано" },
  { value: "12", label: "Лет на рынке" },
  { value: "100%", label: "Экологичная утилизация" },
  { value: "24/7", label: "Аварийный выезд" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = NAV_LINKS.map(l => l.href.replace("#", ""));
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(s); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const heroSection = useInView(0.1);
  const servicesSection = useInView(0.1);
  const techSection = useInView(0.1);
  const pricingSection = useInView(0.1);
  const portfolioSection = useInView(0.1);
  const aboutSection = useInView(0.1);
  const contactSection = useInView(0.1);

  return (
    <div className="font-golos bg-stone-950 text-white min-h-screen overflow-x-hidden">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-forest-950/95 backdrop-blur-md shadow-lg shadow-forest-900/30" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          <button onClick={() => scrollTo("#home")} className="flex items-center gap-2">
            <div className="w-9 h-9 bg-forest-500 rounded-lg flex items-center justify-center">
              <Icon name="TreePine" size={20} className="text-white" />
            </div>
            <span className="font-oswald text-xl font-bold text-white tracking-wide">ЛЕС<span className="text-forest-400">МАСТЕР</span></span>
          </button>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <button
                  onClick={() => scrollTo(l.href)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${activeSection === l.href.replace("#", "") ? "text-forest-400 bg-forest-900/50" : "text-stone-300 hover:text-white hover:bg-white/5"}`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href="tel:+79001234567" className="hidden md:flex items-center gap-2 text-forest-400 hover:text-forest-300 font-medium text-sm transition-colors">
              <Icon name="Phone" size={16} />
              +7 (900) 123-45-67
            </a>
            <button
              onClick={() => scrollTo("#contacts")}
              className="hidden md:block bg-forest-500 hover:bg-forest-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-forest-500/30"
            >
              Вызвать мастера
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-2">
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-forest-950/98 backdrop-blur-md border-t border-forest-800/50 px-4 py-4">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="block w-full text-left py-3 text-stone-300 hover:text-forest-400 font-medium border-b border-stone-800/40 last:border-0 transition-colors">
                {l.label}
              </button>
            ))}
            <a href="tel:+79001234567" className="flex items-center gap-2 mt-4 text-forest-400 font-semibold">
              <Icon name="Phone" size={16} /> +7 (900) 123-45-67
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://cdn.poehali.dev/projects/4825f53e-c142-457b-94b5-02b8d96ce16f/files/b9164dab-49c7-4af7-84ae-c3424e1de52e.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/85 via-forest-950/70 to-stone-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/60 to-transparent" />

        <div ref={heroSection.ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16">
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 bg-forest-500/20 border border-forest-500/40 rounded-full px-4 py-2 mb-6 ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.1s" }}>
              <div className="w-2 h-2 bg-forest-400 rounded-full animate-pulse" />
              <span className="text-forest-300 text-sm font-medium">Профессиональная команда арбористов</span>
            </div>

            <h1 className={`font-oswald text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.25s" }}>
              ВАЛКА И ОПИЛОВКА<br />
              <span className="text-forest-400">ДЕРЕВЬЕВ</span><br />
              <span className="text-3xl sm:text-4xl lg:text-5xl text-stone-300">ПОД КЛЮЧ</span>
            </h1>

            <p className={`text-lg text-stone-300 leading-relaxed mb-8 max-w-xl ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.4s" }}>
              Профессиональная валка, опиловка и полная утилизация древесных отходов. Работаем безопасно, быстро и экологично с 2012 года.
            </p>

            <div className={`flex flex-wrap gap-4 mb-12 ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.55s" }}>
              <button
                onClick={() => scrollTo("#contacts")}
                className="bg-forest-500 hover:bg-forest-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-2xl hover:shadow-forest-500/40 hover:scale-105 active:scale-95"
              >
                Бесплатный выезд
              </button>
              <button
                onClick={() => scrollTo("#pricing")}
                className="border-2 border-forest-500/60 hover:border-forest-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-forest-500/10"
              >
                Узнать стоимость
              </button>
            </div>

            <div className={`flex flex-wrap gap-6 ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.7s" }}>
              {[
                { icon: "Clock", text: "Выезд за 2 часа" },
                { icon: "ShieldCheck", text: "Полная ответственность" },
                { icon: "Leaf", text: "100% утилизация" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2 text-stone-400">
                  <Icon name={item.icon as "Clock"} size={16} className="text-forest-400" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-forest-400">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-forest-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-forest-500">
            {STATS.map((s, i) => (
              <div key={i} className="text-center lg:px-8">
                <div className="font-oswald text-4xl lg:text-5xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-forest-200 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-stone-950">
        <div ref={servicesSection.ref} className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-16 ${servicesSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="text-forest-400 font-medium text-sm tracking-widest uppercase mb-3 block">Что мы делаем</span>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white mb-4">НАШИ УСЛУГИ</h2>
            <p className="text-stone-400 text-lg max-w-xl mx-auto">Полный комплекс работ с деревьями — от обрезки до полной утилизации</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className={`group bg-stone-900 border border-stone-800 hover:border-forest-600/50 rounded-2xl p-6 transition-all duration-300 hover:bg-stone-800/80 hover:shadow-xl hover:shadow-forest-900/20 hover:-translate-y-1 ${servicesSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-forest-500/20 group-hover:bg-forest-500/30 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Icon name={s.icon as "Axe"} size={24} className="text-forest-400" />
                </div>
                <h3 className="font-oswald text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-stone-300">
                      <div className="w-1.5 h-1.5 bg-forest-500 rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section id="technology" className="py-24 bg-stone-900">
        <div ref={techSection.ref} className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-16 ${techSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="text-forest-400 font-medium text-sm tracking-widest uppercase mb-3 block">Как мы работаем</span>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white mb-4">ТЕХНОЛОГИЯ РАБОТ</h2>
            <p className="text-stone-400 text-lg max-w-xl mx-auto">4 шага от заявки до чистого участка</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-forest-700 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  className={`relative text-center ${techSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-forest-600 to-forest-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-forest-900/40 border-4 border-stone-900">
                    <span className="font-oswald text-2xl font-bold text-white">{step.num}</span>
                  </div>
                  <h3 className="font-oswald text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-16 bg-gradient-to-br from-forest-900/50 to-forest-950/50 border border-forest-800/40 rounded-2xl p-8 ${techSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.6s" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-oswald text-3xl font-bold text-white mb-4">ЭКОЛОГИЧНАЯ ПЕРЕРАБОТКА</h3>
                <p className="text-stone-300 leading-relaxed mb-6">
                  Все древесные отходы перерабатываются в полезные ресурсы: щепа используется как мульча, топливо или материал для компоста. Мы не просто убираем деревья — мы даём им вторую жизнь.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "Leaf", text: "Щепа для мульчирования" },
                    { icon: "Flame", text: "Топливные брикеты" },
                    { icon: "Sprout", text: "Компост для сада" },
                    { icon: "Package", text: "Деловая древесина" },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-3 text-sm text-stone-300">
                      <Icon name={item.icon as "Leaf"} size={16} className="text-forest-400 flex-shrink-0" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden h-56 lg:h-full min-h-[14rem]">
                <img
                  src="https://cdn.poehali.dev/projects/4825f53e-c142-457b-94b5-02b8d96ce16f/files/48018b9d-4567-4045-8fd2-2c30648f992a.jpg"
                  alt="Переработка древесины"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-stone-950">
        <div ref={pricingSection.ref} className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-16 ${pricingSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="text-forest-400 font-medium text-sm tracking-widest uppercase mb-3 block">Прозрачные цены</span>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white mb-4">СТОИМОСТЬ УСЛУГ</h2>
            <p className="text-stone-400 text-lg max-w-xl mx-auto">Фиксированные цены без скрытых платежей. Точная смета — бесплатно</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PRICING.map((cat, i) => (
              <div
                key={i}
                className={`bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-forest-700/50 transition-all hover:shadow-xl hover:shadow-forest-900/20 ${pricingSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className={`bg-gradient-to-r ${cat.color} p-5 flex items-center gap-3`}>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Icon name={cat.icon as "Axe"} size={20} className="text-white" />
                  </div>
                  <h3 className="font-oswald text-xl font-bold text-white">{cat.category}</h3>
                </div>
                <div className="p-5">
                  <ul className="space-y-3">
                    {cat.items.map((item, j) => (
                      <li key={j} className="flex items-center justify-between py-2 border-b border-stone-800/60 last:border-0">
                        <span className="text-stone-300 text-sm">{item.name}</span>
                        <span className="font-bold text-forest-400 text-sm whitespace-nowrap ml-2">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-8 text-center ${pricingSection.inView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
            <p className="text-stone-400 text-sm mb-6">* Окончательная стоимость рассчитывается после осмотра объекта. Выезд специалиста — бесплатно.</p>
            <button
              onClick={() => scrollTo("#contacts")}
              className="bg-forest-500 hover:bg-forest-400 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-2xl hover:shadow-forest-500/30 hover:scale-105"
            >
              Получить бесплатную смету
            </button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-stone-900">
        <div ref={portfolioSection.ref} className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-16 ${portfolioSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="text-forest-400 font-medium text-sm tracking-widest uppercase mb-3 block">Наши работы</span>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white mb-4">ПОРТФОЛИО</h2>
            <p className="text-stone-400 text-lg max-w-xl mx-auto">Примеры выполненных проектов разной сложности</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO.map((item, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer ${portfolioSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-forest-500 text-white text-xs font-bold px-3 py-1 rounded-full">{item.tag}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-oswald text-xl font-bold text-white mb-1">{item.title}</h3>
                  <div className="flex items-center gap-1 text-stone-300 text-sm">
                    <Icon name="MapPin" size={14} className="text-forest-400" />
                    {item.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-stone-950">
        <div ref={aboutSection.ref} className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`${aboutSection.inView ? "animate-slide-in-left" : "opacity-0"}`}>
              <span className="text-forest-400 font-medium text-sm tracking-widest uppercase mb-3 block">Кто мы</span>
              <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white mb-6">О КОМПАНИИ<br /><span className="text-forest-400">ЛЕСМАСТЕР</span></h2>
              <p className="text-stone-300 leading-relaxed mb-6">
                С 2012 года мы выполняем профессиональные работы по валке и опиловке деревьев, обслуживая частные домовладения, предприятия и муниципальные объекты по всей Московской области.
              </p>
              <p className="text-stone-400 leading-relaxed mb-8">
                В команде работают сертифицированные арбористы с опытом от 5 лет. Мы используем только профессиональное оборудование европейских брендов и строго соблюдаем все нормы безопасности.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Award", title: "Лицензированная компания", desc: "Все необходимые разрешения" },
                  { icon: "Users", title: "Команда профессионалов", desc: "Сертифицированные арбористы" },
                  { icon: "Truck", title: "Собственная техника", desc: "Парк спецавтотехники" },
                  { icon: "FileCheck", title: "Договор и гарантия", desc: "Официальное оформление" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-forest-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={item.icon as "Award"} size={18} className="text-forest-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{item.title}</div>
                      <div className="text-stone-500 text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative ${aboutSection.inView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/projects/4825f53e-c142-457b-94b5-02b8d96ce16f/files/6ed39668-2a80-448d-8a69-f5804039edb7.jpg"
                  alt="Команда ЛесМастер"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-forest-600 rounded-2xl p-6 shadow-2xl">
                <div className="font-oswald text-4xl font-bold text-white">12+</div>
                <div className="text-forest-200 text-sm">лет опыта</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-stone-900 border border-stone-700 rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-sm">★</span>)}
                </div>
                <div className="text-white text-sm font-semibold">500+ клиентов</div>
                <div className="text-stone-400 text-xs">довольны работой</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-stone-900">
        <div ref={contactSection.ref} className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-16 ${contactSection.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="text-forest-400 font-medium text-sm tracking-widest uppercase mb-3 block">Свяжитесь с нами</span>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white mb-4">КОНТАКТЫ</h2>
            <p className="text-stone-400 text-lg max-w-xl mx-auto">Оставьте заявку — перезвоним в течение 15 минут</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className={`space-y-6 ${contactSection.inView ? "animate-slide-in-left" : "opacity-0"}`}>
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (900) 123-45-67", href: "tel:+79001234567" },
                { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "+7 (900) 123-45-67", href: "https://wa.me/79001234567" },
                { icon: "Mail", label: "Email", value: "info@lesmaster.ru", href: "mailto:info@lesmaster.ru" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Вс: 08:00–20:00. Аварийный: 24/7", href: null },
                { icon: "MapPin", label: "Регион работы", value: "Москва и Московская область", href: null },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-forest-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as "Phone"} size={20} className="text-forest-400" />
                  </div>
                  <div>
                    <div className="text-stone-500 text-sm mb-1">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-white font-semibold hover:text-forest-400 transition-colors">{item.value}</a>
                    ) : (
                      <div className="text-white font-semibold">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-4 flex gap-4 flex-wrap">
                {[
                  { icon: "MessageCircle", label: "WhatsApp" },
                  { icon: "Send", label: "Telegram" },
                  { icon: "Phone", label: "Позвонить" },
                ].map(btn => (
                  <button key={btn.label} className="flex items-center gap-2 bg-stone-800 hover:bg-forest-700 border border-stone-700 hover:border-forest-600 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all">
                    <Icon name={btn.icon as "Phone"} size={16} />
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={`bg-stone-950 border border-stone-800 rounded-2xl p-8 ${contactSection.inView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
              <h3 className="font-oswald text-2xl font-bold text-white mb-6">ОСТАВИТЬ ЗАЯВКУ</h3>
              <form className="space-y-4">
                <div>
                  <label className="text-stone-400 text-sm mb-2 block">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full bg-stone-900 border border-stone-700 focus:border-forest-500 rounded-xl px-4 py-3 text-white placeholder-stone-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-stone-400 text-sm mb-2 block">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-stone-900 border border-stone-700 focus:border-forest-500 rounded-xl px-4 py-3 text-white placeholder-stone-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-stone-400 text-sm mb-2 block">Услуга</label>
                  <select className="w-full bg-stone-900 border border-stone-700 focus:border-forest-500 rounded-xl px-4 py-3 text-white outline-none transition-colors">
                    <option value="">Выберите услугу</option>
                    <option>Валка дерева</option>
                    <option>Опиловка / обрезка</option>
                    <option>Утилизация отходов</option>
                    <option>Корчевание пня</option>
                    <option>Аварийный выезд</option>
                    <option>Расчистка территории</option>
                  </select>
                </div>
                <div>
                  <label className="text-stone-400 text-sm mb-2 block">Комментарий</label>
                  <textarea
                    placeholder="Опишите задачу..."
                    rows={3}
                    className="w-full bg-stone-900 border border-stone-700 focus:border-forest-500 rounded-xl px-4 py-3 text-white placeholder-stone-600 outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-forest-500 hover:bg-forest-400 text-white py-4 rounded-xl font-bold text-lg transition-all hover:shadow-2xl hover:shadow-forest-500/30"
                >
                  Отправить заявку
                </button>
                <p className="text-stone-600 text-xs text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-950 border-t border-stone-800/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-forest-500 rounded-lg flex items-center justify-center">
                <Icon name="TreePine" size={16} className="text-white" />
              </div>
              <span className="font-oswald text-lg font-bold text-white">ЛЕС<span className="text-forest-400">МАСТЕР</span></span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-500">
              {NAV_LINKS.map(l => (
                <button key={l.href} onClick={() => scrollTo(l.href)} className="hover:text-forest-400 transition-colors">{l.label}</button>
              ))}
            </div>
            <div className="text-stone-600 text-sm">© 2024 ЛесМастер</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
