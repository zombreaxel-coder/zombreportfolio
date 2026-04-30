/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Search, 
  Layout, 
  Palette, 
  Globe, 
  Send, 
  ChevronRight, 
  Award, 
  BookOpen, 
  Briefcase,
  Monitor,
  Rocket,
  Users,
  Target,
  Clock,
  Box,
  Menu,
  X,
  MessageCircle
} from 'lucide-react';

// --- Types ---
interface NavItem {
  id: string;
  label: string;
}

interface Skill {
  name: string;
  level: number;
}

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: ReactNode;
}

// --- Constants ---
const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Accueil' },
  { id: 'about', label: 'À Propos' },
  { id: 'skills', label: 'Compétences' },
  { id: 'projects', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
];

const STATS = [
  { value: '1', label: 'Expérience Professionnelle', icon: <Briefcase /> },
  { value: '4', label: 'Langues Maîtrisées', icon: <Globe /> },
  { value: '5+', label: 'Compétences Clés', icon: <Target /> },
  { value: '3', label: 'Formations Certifiées', icon: <Award /> },
];

const DIGITAL_SKILLS: Skill[] = [
  { name: 'Création Visuelle Publicitaire', level: 88 },
  { name: 'Community Management', level: 80 },
  { name: 'Création de Contenu Social', level: 82 },
  { name: 'Gestion Campagnes Facebook', level: 75 },
  { name: 'Création Site Web (WordPress)', level: 70 },
  { name: 'SEO / SEA', level: 72 },
];

const SOFT_SKILLS = [
  { name: 'Créativité', stars: 5 },
  { name: 'Communication', stars: 4 },
  { name: 'Travail en équipe', stars: 4 },
  { name: 'Adaptabilité', stars: 5 },
  { name: 'Rigueur', stars: 4 },
];

const EDUCATION: TimelineItem[] = [
  {
    year: '2023 - Présent',
    title: 'Licence en Marketing & Innovation Digitale',
    company: 'Institut Burkinabé des Arts et Métiers (IBAM)',
    description: '3ème année — Formation spécialisée en stratégies digitales, e-commerce, design et gestion de projets marketing.'
  },
  {
    year: '2025',
    title: 'Développement Web — HTML & CSS',
    company: 'Orange Digital Center',
    description: 'Formation certifiée en développement web frontend.'
  },
  {
    year: '2023',
    title: 'Baccalauréat Série A4',
    company: 'Lycée Privé Évangélique Nonglom',
    description: 'Spécialisation en lettres et sciences humaines.'
  }
];

const PROJECTS: Project[] = [
  {
    title: 'cfpp.site',
    subtitle: 'Plateforme Institutionnelle',
    description: 'Conception et développement web du site officiel du Centre de Formation Professionnelle et de Perfectionnement.',
    tags: ['Web Design', 'Développement', 'UI/UX'],
    icon: <Monitor className="w-10 h-10 text-emerald-400" />
  },
  {
    title: 'Sites Web Vitrines',
    subtitle: 'WordPress + Hostinger',
    description: 'Création et déploiement de sites web professionnels pour PME locales. Optimisation SEO de base.',
    tags: ['WordPress', 'SEO', 'UI Design'],
    icon: <Globe className="w-10 h-10 text-cyan-400" />
  },
  {
    title: 'Campagnes Facebook Ads',
    subtitle: 'Meta Business Suite',
    description: 'Conception et gestion de campagnes publicitaires pour accroître la visibilité de marques locales.',
    tags: ['Ciblage', 'Copywriting', 'Analytics'],
    icon: <Users className="w-10 h-10 text-blue-500" />
  },
  {
    title: 'Identité Visuelle & Branding',
    subtitle: 'Canva / Adobe Express',
    description: 'Réalisation de supports de communication: affiches, flyers, kakémonos et kits graphiques.',
    tags: ['Branding', 'Print', 'Social Media'],
    icon: <Palette className="w-10 h-10 text-orange-500" />
  },
  {
    title: 'Gestion de Communautés',
    subtitle: 'Multi-plateformes',
    description: 'Animation et modération de pages entreprises. Planification éditoriale et création de contenu.',
    tags: ['Instagram', 'Engagement', 'Planning'],
    icon: <Rocket className="w-10 h-10 text-purple-500" />
  }
];

// --- Components ---

const ProgressBar = (props: { name: string; level: number; key?: any }) => {
  const { name, level } = props;
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-gray-300 font-medium">{name}</span>
        <span className="text-cyan-400 font-mono">{level}%</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
        />
      </div>
    </div>
  );
};

const SectionTitle = (props: { title: string; subtitle?: string }) => {
  const { title, subtitle } = props;
  return (
    <div className="mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="text-cyan-400 font-mono text-sm uppercase tracking-widest">{subtitle}</p>
      )}
      <div className="h-1 w-20 bg-orange-500 mt-4" />
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    setMobileMenuOpen(false);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white selection:bg-cyan-500/30 selection:text-cyan-400">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-orange-500 z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f1d]/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-10 h-10 rounded-full border-2 border-cyan-500/50 overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-slate-800 flex items-center justify-center">
              <img 
                src="/profile.png" 
                alt="Axel Zombré" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">AXEL ZOMBRÉ</span>
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 ${activeSection === item.id ? 'text-cyan-400' : 'text-gray-400'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: mobileMenuOpen ? 1 : 0,
            height: mobileMenuOpen ? 'auto' : 0
          }}
          className="md:hidden overflow-hidden bg-[#0a0f1d]/95 backdrop-blur-xl border-b border-white/5"
        >
          <div className="px-6 py-8 flex flex-col gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-lg font-bold text-left transition-colors ${activeSection === item.id ? 'text-cyan-400' : 'text-white'}`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => scrollTo('contact')}
              className="mt-4 w-full py-4 bg-orange-500 text-white font-bold rounded-xl"
            >
              Me contacter
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -mr-20 -mt-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full -ml-20 -mb-20" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-10 relative"
          >
            {/* Styled Avatar for Hero */}
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white/10 p-2 relative z-10 backdrop-blur-sm bg-slate-900/50 flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                <img 
                  src="/profile.png" 
                  alt="Axel Zombré" 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-orange-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          </motion.div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6 mx-auto">
                <Box className="w-4 h-4" />
                <span>Disponible pour de nouveaux défis</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
                Transformons Votre <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Impact Digital
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Étudiant en 3ème année Marketing & Innovation Digitale, passionné par la fusion entre stratégie data-driven et créativité visuelle.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => scrollTo('projects')}
                  className="px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-900/20 flex items-center gap-2 group text-lg"
                >
                  Voir mes services
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollTo('contact')}
                  className="px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-white/5 text-lg"
                >
                  Me contacter
                </button>
              </div>
              
              <div className="mt-16 text-sm">
                <span className="text-white font-bold">10+ Projets</span> réalisés
                <span className="text-gray-500 mx-2">•</span>
                <span className="text-gray-500">Approche orientée résultats</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <SectionTitle title="Mon Profil" subtitle="Qui suis-je ?" />
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Étudiant en 3ème année à l'Institut Burkinabé des Arts et Métiers, je me spécialise en Marketing et Innovation Digitale. Mon parcours est guidé par une passion pour les stratégies digitales qui permettent d'accroître les ventes et la visibilité des entreprises.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-cyan-500/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold mb-2">Stratégie</h4>
                  <p className="text-gray-400 text-sm">Approche data-driven pour maximiser le ROI de vos campagnes.</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-orange-500/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <Palette className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold mb-2">Créativité</h4>
                  <p className="text-gray-400 text-sm">Solutions visuelles innovantes adaptées à l'ADN de votre marque.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900/50 rounded-3xl p-8 border border-white/5">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Award className="text-orange-500" />
                Parcours Académique
              </h3>
              <div className="space-y-8 relative">
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-800" />
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 border-orange-500 bg-[#0a0f1d] z-10" />
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{edu.year}</span>
                    <h4 className="font-bold text-white mt-1">{edu.title}</h4>
                    <p className="text-orange-500/80 text-sm font-medium mb-2">{edu.company}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-slate-900/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle title="Compétences & Outils" subtitle="Expertise Technique" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Monitor className="text-cyan-400" />
                Compétences Digitales
              </h3>
              {DIGITAL_SKILLS.map((skill, i) => (
                <ProgressBar key={i} name={skill.name} level={skill.level} />
              ))}
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Users className="text-orange-400" />
                Soft Skills & Outils
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {SOFT_SKILLS.map((skill, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-800/40 flex justify-between items-center border border-white/5">
                    <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => (
                        <div key={star} className={`w-2 h-2 rounded-full ${star <= skill.stars ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-slate-700'}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5">
                <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-6">Stack Technologique</h4>
                <div className="flex flex-wrap gap-3">
                  {['WordPress', 'Canva', 'Adobe Express', 'Google Analytics', 'SEO Tools', 'Meta Business', 'Hostinger', 'HTML5', 'CSS3'].map((tool, i) => (
                    <span key={i} className="px-4 py-2 rounded-lg bg-slate-700/50 text-white text-sm font-medium border border-white/10 hover:bg-slate-700 transition-colors">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <SectionTitle title="Projets & Réalisations" subtitle="Mon Impact" />
            <div className="flex gap-4">
              <div className="p-3 rounded-full bg-slate-800 border border-white/10 cursor-pointer hover:bg-slate-700 transition-colors">
                <ChevronRight className="w-5 h-5 rotate-180" />
              </div>
              <div className="p-3 rounded-full bg-orange-500 shadow-lg shadow-orange-900/20 cursor-pointer hover:bg-orange-600 transition-colors text-white font-bold">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                <div className="relative p-10 rounded-3xl bg-slate-900 border border-white/5 group-hover:border-white/20 transition-all overflow-hidden h-full">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-orange-500 text-sm font-mono uppercase tracking-widest mb-4">{project.subtitle}</p>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 text-gray-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Block (Extra focus on CHROSY) */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-br from-slate-900 to-black p-12 rounded-[3rem] border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4">
                <div className="w-20 h-20 rounded-3xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6">
                  <Briefcase className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Expérience de Terrain</h3>
                <p className="text-gray-400 mb-6">
                  Mon passage chez <span className="text-white font-bold">Entreprise CHROSY</span> m'a permis de concrétiser mes acquis académiques.
                </p>
                <div className="flex items-center gap-4 text-sm text-cyan-400 font-mono">
                  <Clock className="w-4 h-4" />
                  Août 2025 – Octobre 2025
                </div>
              </div>
              
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Graphisme & Delivery", desc: "Création de supports graphiques : affiches, flyers, kakémonos." },
                  { title: "Rédaction Stratégique", desc: "Élaboration de lettres de manifestation d'intérêts pour marchés publics." },
                  { title: "Coordination Logistique", desc: "Gestion des flux de documents officiels et coordination logistique." },
                  { title: "Adaptabilité", desc: "Excellence dans l'exécution sous contraintes de délais." }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-start group hover:bg-white/10 transition-colors">
                    <div className="mt-1">
                      <ChevronRight className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goal Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionTitle title="Mes Objectifs" subtitle="Vision Future" />
          <div className="p-10 rounded-[2.5rem] bg-cyan-500/5 border border-cyan-500/20 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-1 w-1 bg-cyan-500 rounded-full blur-xl" />
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed italic">
              "Mon ambition est de devenir une référence incontournable dans le domaine du marketing digital en Afrique. Chaque projet est pour moi une étape vers l'excellence : créer, mesurer, optimiser — et laisser une empreinte durable."
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionTitle title="Restons en Contact" subtitle="Contact" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
              Vous avez un projet en tête ou souhaitez simplement échanger ? <br />
              N'hésitez pas à me joindre via l'un des canaux ci-dessous.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Mail />, label: "Email", value: "wenkuni20@outlook.com", link: "mailto:wenkuni20@outlook.com", color: "cyan" },
              { icon: <MessageCircle />, label: "WhatsApp", value: "+226 74 44 26 51", link: "https://wa.me/22674442651", color: "green" },
              { icon: <Phone />, label: "Appel", value: "+226 05 74 23 94", link: "tel:+22605742394", color: "orange" },
              { icon: <MapPin />, label: "Localisation", value: "Ouagadougou, Burkina Faso", color: "blue" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-slate-800/40 border border-white/5 hover:border-cyan-500/30 transition-all group flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-all shadow-lg group-hover:scale-110 ${
                  item.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white' :
                  item.color === 'green' ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white' :
                  item.color === 'orange' ? 'bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-white' :
                  'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white'
                }`}>
                  {item.icon}
                </div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">{item.label}</p>
                {item.link ? (
                  <a href={item.link} className="text-white font-bold text-lg hover:text-cyan-400 transition-colors break-all">{item.value}</a>
                ) : (
                  <p className="text-white font-bold text-lg">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm font-medium italic">ZOMBRÉ WENKUNI AXEL EBENEZER</span>
          </div>
          
          <p className="text-gray-600 text-xs font-mono">
            © {new Date().getFullYear()} Axel Zombré • IBAM Burkina Faso
          </p>
        </div>
      </footer>
    </div>
  );
}
