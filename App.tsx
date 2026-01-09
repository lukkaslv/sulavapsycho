import React, { useState, useMemo, useEffect } from 'react';
import { techniques } from './data/techniques';
import { Technique, Language } from './types';

// Icons using SVG directly to avoid dependency issues
const Icons = {
  ChevronLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  ),
  Globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
      <path d="M2 12h20"/>
    </svg>
  ),
  Video: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 8-6 4 6 4V8Z"/>
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
    </svg>
  ),
  AlertTriangle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D90429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <path d="M12 9v4"/>
      <path d="M12 17h.01"/>
    </svg>
  ),
  Star: ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Shuffle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l14.2-12.6c.8-1.1 2-1.7 3.3-1.7H26"/>
      <path d="M2 6h1.4c1.3 0 2.5.6 3.3 1.7l14.2 12.6c.8 1.1 2 1.7 3.3 1.7H26"/>
    </svg>
  ),
  Download: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" x2="12" y1="15" y2="3"/>
    </svg>
  )
};

export default function App() {
  const [lang, setLang] = useState<Language>('ru');
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [filter, setFilter] = useState<'all' | 'favorites' | 'boundaries' | 'shadow' | 'aggression' | 'self-worth'>('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Automatic way
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // Manual instruction
      const msg = lang === 'ru' 
        ? "Чтобы установить приложение, нажмите на значок установки (монитор или +) в правой части адресной строки браузера."
        : "აპლიკაციის დასაყენებლად დააჭირეთ ინსტალაციის ხატულას (მონიტორი ან +) ბრაუზერის მისამართების ზოლის მარჯვენა მხარეს.";
      alert(msg);
    }
  };

  const content = {
    ru: {
      title: "FANG TOOLKIT",
      subtitle: "ТЕРАПИЯ КЛЫКОВ",
      intro: "Я работаю с теми, кто устал прятать свои клыки. Сколько раз за сегодня ты предал себя, чтобы остаться хорошим в глазах идиотов? Сколько раз ты прятал свои клыки, пока тебя медленно пожирали? Я работаю с теми, кому надоело быть кормом.",
      filters: {
        all: "Все",
        favorites: "Избранное",
        boundaries: "Границы",
        shadow: "Тень",
        aggression: "Агрессия",
        "self-worth": "Самоценность"
      },
      labels: {
        instructions: "ПРОТОКОЛ ДЕЙСТВИЙ",
        tip: "ОНЛАЙН АКЦЕНТ",
        back: "НАЗАД К АРСЕНАЛУ",
        category: "Категория",
        random: "СЛУЧАЙНЫЙ УКУС",
        emptyFav: "Арсенал пуст. Добавьте техники в избранное.",
        install: "УСТАНОВИТЬ"
      }
    },
    ka: {
      title: "FANG TOOLKIT",
      subtitle: "ეშვების თერაპია",
      intro: "მე ვმუშაობ მათთან, ვინც დაიღალა საკუთარი ეშვების დამალვით. რამდენჯერ უღალატე საკუთარ თავს დღეს, რომ იდიოტების თვალში კარგი გამოჩენილიყავი? რამდენჯერ დამალე შენი ეშვები, სანამ ნელ-ნელა გჭამდნენ? მე ვმუშაობ მათთან, ვისაც მობეზრდა საკვებად ყოფნა.",
      filters: {
        all: "ყველა",
        favorites: "რჩეული",
        boundaries: "საზღვრები",
        shadow: "ჩრდილი",
        aggression: "აგრესია",
        "self-worth": "თვიშეფასება"
      },
      labels: {
        instructions: "მოქმედების პროტოკოლი",
        tip: "ონლაინ აქცენტი",
        back: "უკან არსენალში",
        category: "კატეგორია",
        random: "შემთხვევითი ნაკბენი",
        emptyFav: "არსენალი ცარიელია. დაამატეთ ტექნიკები რჩეულებში.",
        install: "დაყენება"
      }
    }
  };

  const filteredTechniques = useMemo(() => {
    if (filter === 'all') return techniques;
    if (filter === 'favorites') return techniques.filter(t => favorites.includes(t.id));
    return techniques.filter(t => t.category === filter);
  }, [filter, favorites]);

  const toggleLang = () => {
    setLang(l => l === 'ru' ? 'ka' : 'ru');
  };

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const pickRandom = () => {
    const randomTech = techniques[Math.floor(Math.random() * techniques.length)];
    setSelectedTechnique(randomTech);
  };

  if (selectedTechnique) {
    const tContent = selectedTechnique.content[lang];
    const isFav = favorites.includes(selectedTechnique.id);
    
    return (
      <div className="min-h-screen bg-fang-dark text-gray-200 p-4 md:p-8 font-sans">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => setSelectedTechnique(null)}
            className="flex items-center text-fang-red hover:text-white transition-colors mb-8 group font-display uppercase tracking-widest text-lg"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">
              <Icons.ChevronLeft />
            </span>
            {content[lang].labels.back}
          </button>

          <div className="border-l-4 border-fang-red pl-6 mb-8 relative">
             <button 
                onClick={(e) => toggleFavorite(e, selectedTechnique.id)}
                className={`absolute right-0 top-0 p-2 hover:text-fang-red transition-colors ${isFav ? 'text-fang-red' : 'text-gray-600'}`}
              >
                <Icons.Star filled={isFav} />
              </button>
            <span className="text-gray-500 uppercase tracking-widest text-sm mb-2 block font-display">
              {content[lang].filters[selectedTechnique.category]}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 uppercase">
              {tContent.title}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              {tContent.description}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-fang-red font-display text-xl mb-4 flex items-center gap-2 uppercase tracking-wide">
                  {content[lang].labels.instructions}
                </h3>
                <ul className="space-y-4">
                  {tContent.instructions.map((inst, idx) => (
                    <li key={idx} className="flex gap-4 p-4 bg-fang-gray/30 border border-gray-800 rounded-sm hover:border-gray-600 transition-colors">
                      <span className="text-fang-red font-display font-bold text-xl">{idx + 1}</span>
                      <span className="text-gray-300">{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="sticky top-8 bg-red-950/20 border border-fang-red/50 p-6 rounded-sm">
                <div className="flex items-center gap-2 text-fang-red mb-4">
                  <Icons.Video />
                  <h4 className="font-display font-bold uppercase tracking-wide">{content[lang].labels.tip}</h4>
                </div>
                <p className="text-gray-300 italic text-sm leading-relaxed border-l-2 border-fang-red pl-3">
                  "{tContent.onlineTip}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fang-dark text-gray-200 font-sans">
      {/* Header */}
      <header className="border-b border-gray-900 bg-fang-dark/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tighter uppercase">
              <span className="text-fang-red">Fang</span> Toolkit
            </h1>
            <span className="text-xs text-gray-500 tracking-[0.3em] uppercase hidden md:block">
              {content[lang].subtitle}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {!isStandalone && (
              <button 
                onClick={handleInstallClick}
                className="flex items-center gap-2 px-3 py-1 bg-fang-red/10 text-fang-red hover:bg-fang-red hover:text-white border border-fang-red transition-all rounded-sm uppercase font-display text-sm tracking-widest"
              >
                <Icons.Download />
                <span className="hidden md:inline">{content[lang].labels.install}</span>
              </button>
            )}
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-4 py-2 border border-gray-700 hover:border-fang-red text-sm font-display tracking-widest uppercase transition-all hover:bg-fang-red/10"
            >
              <Icons.Globe />
              <span>{lang === 'ru' ? 'KA' : 'RU'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 border-b border-gray-900 flex flex-col md:flex-row justify-between gap-8">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 bg-fang-red/10 text-fang-red text-xs font-bold tracking-widest mb-6 border border-fang-red/20 uppercase">
             Psychotherapy for Predators
          </div>
          <p className="text-xl md:text-3xl font-light leading-normal md:leading-relaxed text-gray-300 border-l-4 border-fang-red pl-6 md:pl-8">
            {content[lang].intro}
          </p>
        </div>
        
        <div className="flex items-end justify-start md:justify-end">
           <button 
            onClick={pickRandom}
            className="group flex items-center gap-3 bg-fang-red text-white px-8 py-4 font-display font-bold text-lg uppercase tracking-wider hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
           >
             <span className="group-hover:rotate-180 transition-transform duration-500">
               <Icons.Shuffle />
             </span>
             {content[lang].labels.random}
           </button>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {(Object.keys(content[lang].filters) as Array<keyof typeof content.ru.filters>).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 uppercase font-display tracking-wider text-sm transition-all border flex items-center gap-2 ${
                filter === f 
                  ? 'bg-fang-red text-white border-fang-red' 
                  : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-500 hover:text-white'
              }`}
            >
              {f === 'favorites' && <Icons.Star filled={true} />}
              {content[lang].filters[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {filteredTechniques.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-gray-800 rounded-lg">
             <p className="text-gray-500 font-display text-xl uppercase">{content[lang].labels.emptyFav}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTechniques.map((tech) => {
               const isFav = favorites.includes(tech.id);
               return (
                <div 
                  key={tech.id}
                  onClick={() => setSelectedTechnique(tech)}
                  className="group relative bg-fang-gray/20 border border-gray-800 p-6 hover:border-fang-red transition-all cursor-pointer hover:bg-fang-gray/40 flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 p-4 flex gap-2">
                     <button 
                        onClick={(e) => toggleFavorite(e, tech.id)}
                        className={`hover:text-fang-red transition-colors z-10 ${isFav ? 'text-fang-red' : 'text-gray-700'}`}
                      >
                        <Icons.Star filled={isFav} />
                      </button>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-xs text-fang-red uppercase tracking-widest font-bold">
                      #{String(tech.id).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-gray-600 uppercase tracking-widest ml-3">
                      {content[lang].filters[tech.category]}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-3 uppercase group-hover:text-fang-red transition-colors">
                    {tech.content[lang].title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                    {tech.content[lang].description}
                  </p>

                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors mt-auto">
                    <span className="mr-2 border-b border-transparent group-hover:border-fang-red">
                      {lang === 'ru' ? 'Открыть' : 'გახსნა'}
                    </span>
                    →
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}