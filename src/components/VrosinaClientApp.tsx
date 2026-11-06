"use client";

import React, { useState, useMemo } from "react";
import {
  SITE_CONFIG,
  HERO_KPIS,
  MASTERPLAN_HOTSPOTS,
  FOUR_PILLARS,
  CAPEX_BREAKDOWN,
  THREE_SCENARIOS,
  FIVE_YEAR_RAMPUP,
  HOUSING_CATEGORIES,
  GOVERNANCE_SHIELD,
  STAKEHOLDER_BRIEFS,
  DATA_ROOM_DOCUMENTS,
  FAQ_ITEMS,
  VISION_SPEECH_SECTIONS,
  REAL_VROSINA_VIDEOS,
  REAL_VS_2031_COMPARISONS,
} from "@/data/vrosinaData";

export default function VrosinaClientApp() {
  // Hero toggle: "vision" (2031 reality-grounded masterplan) vs "real" (2026 real drone photo)
  const [heroMode, setHeroMode] = useState<"vision" | "real">("vision");
  const [activeHotspotId, setActiveHotspotId] = useState<string>(
    MASTERPLAN_HOTSPOTS[1]?.id || "agrofood-camp"
  );

  // Reality Before/After Comparison state
  const [selectedComparisonIdx, setSelectedComparisonIdx] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(52);

  // Active YouTube Video Modal / Inline Player
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Active Pillar tab
  const [activePillarId, setActivePillarId] = useState<string>(FOUR_PILLARS[0].id);

  // Investor Calculator & Scenario state
  const [investorTrack, setInvestorTrack] = useState<
    "strategic" | "agrotourism" | "benefactor" | "diaspora"
  >("strategic");
  const [investmentAmount, setInvestmentAmount] = useState<number>(350000);
  const [selectedScenarioId, setSelectedScenarioId] = useState<
    "conservative" | "baseline" | "optimistic"
  >("baseline");
  const [showFullCapex, setShowFullCapex] = useState<boolean>(false);

  // Stakeholder Selector
  const [selectedStakeholderId, setSelectedStakeholderId] = useState<string>(
    STAKEHOLDER_BRIEFS[0].id
  );
  const [stakeholderFilter, setStakeholderFilter] = useState<string>("all");

  // Housing Calculator state
  const [selectedHousingIdx, setSelectedHousingIdx] = useState<number>(1); // Category B default

  // Participation / Lead Modal
  const [leadModalOpen, setLeadModalOpen] = useState<boolean>(false);
  const [leadRole, setLeadRole] = useState<string>("investor");
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);

  // AI Concierge Assistant state
  const [aiQuery, setAiQuery] = useState<string>("");
  const [aiAnswerIdx, setAiAnswerIdx] = useState<number>(0);

  const activeHotspot = useMemo(
    () =>
      MASTERPLAN_HOTSPOTS.find((h) => h.id === activeHotspotId) ||
      MASTERPLAN_HOTSPOTS[0],
    [activeHotspotId]
  );

  const activeComparison = REAL_VS_2031_COMPARISONS[selectedComparisonIdx];

  const activePillar = useMemo(
    () => FOUR_PILLARS.find((p) => p.id === activePillarId) || FOUR_PILLARS[0],
    [activePillarId]
  );

  const activeScenario = useMemo(
    () =>
      THREE_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
      THREE_SCENARIOS[1],
    [selectedScenarioId]
  );

  const filteredStakeholders = useMemo(() => {
    if (stakeholderFilter === "all") return STAKEHOLDER_BRIEFS;
    return STAKEHOLDER_BRIEFS.filter((s) => s.group === stakeholderFilter);
  }, [stakeholderFilter]);

  const activeStakeholder = useMemo(
    () =>
      STAKEHOLDER_BRIEFS.find((s) => s.id === selectedStakeholderId) ||
      STAKEHOLDER_BRIEFS[0],
    [selectedStakeholderId]
  );

  // Investor Leverage Computation
  const investorSimulation = useMemo(() => {
    if (investorTrack === "strategic") {
      // Up to 75% grant via Developmental Law 4887/2022 + LEADER
      const totalProjectCapex = Math.round(investmentAmount / 0.25);
      const stateGrant = totalProjectCapex - investmentAmount;
      const estimatedAnnualEbitdaShare = Math.round(
        activeScenario.ebitdaMidpoint * 0.35
      );
      const paybackYears = (
        investmentAmount / Math.max(estimatedAnnualEbitdaShare, 1)
      ).toFixed(1);
      return {
        title: "Στρατηγικός Εταίρος Αγροδιατροφής (έως 35%–40% Θυγατρικής)",
        subtitle:
          "Συμμετοχή στο Τυροκομείο ΠΟΠ (1,65 εκ. €) & Οινοποιείο Ντεμπίνας (1,00 εκ. €) στο πρώην Στρατόπεδο Παπακωνσταντίνου",
        grantRateLabel: "Έως 75% (Αναπτυξιακός Ν. 4887/2022 + LEADER)",
        mobilizedCapex: totalProjectCapex,
        publicGrant: stateGrant,
        annualBenefitLabel: "Εκτιμώμενο Μερίδιο Λειτουργικών Κερδών (35% EBITDA)",
        annualBenefitValue: `${estimatedAnnualEbitdaShare.toLocaleString("el-GR")} € / έτος`,
        paybackLabel: `Εκτιμώμενη Απόσβεση Ιδίων Κεφαλαίων: ~${paybackYears} έτη + 100% Εγγυημένο Off-Take ΠΟΠ/ΠΓΕ`,
        perks: [
          "Μόχλευση 1 προς 4: Με 25% ίδια συμμετοχή ελέγχετε παραγωγικό πάγιο τετραπλάσιας αξίας.",
          "Εγγυοδοσία Ελληνικής Αναπτυξιακής Τράπεζας (HDB) έως 80% για τον τραπεζικό δανεισμό.",
          "Αποκλειστικό συμβόλαιο απορρόφησης (Off-Take Agreement) εκλεκτής Φέτας ΠΟΠ & Ντεμπίνας Ζίτσας.",
          "Θεσμική θωράκιση με τον Δήμο Ζίτσας (20%) και τον Συνεταιρισμό Παραγωγών (30%).",
        ],
      };
    }

    if (investorTrack === "agrotourism") {
      // LEADER up to 65-80%
      const totalProjectCapex = Math.round(investmentAmount / 0.3);
      const stateGrant = totalProjectCapex - investmentAmount;
      const annualNetIncome = Math.round(totalProjectCapex * 0.14);
      const paybackYears = (
        investmentAmount / Math.max(annualNetIncome, 1)
      ).toFixed(1);
      return {
        title: "Επενδυτής Ξενώνων 4 Εποχών & Εμπορικού Πυρήνα (LEADER)",
        subtitle:
          "Ανάπτυξη Παραδοσιακών Ξενώνων (3–5 δωμάτια έκαστος) & Εστίασης/Γευσιγνωσίας",
        grantRateLabel: "65% έως 80% (Πρόγραμμα LEADER ΗΠΕΙΡΟΣ Α.Ε. & ΕΣΠΑ)",
        mobilizedCapex: totalProjectCapex,
        publicGrant: stateGrant,
        annualBenefitLabel: "Εκτιμώμενο Ετήσιο Καθαρό Εισόδημα Εκμετάλλευσης",
        annualBenefitValue: `${annualNetIncome.toLocaleString("el-GR")} € / έτος`,
        paybackLabel: `Εκτιμώμενη Απόσβεση Ιδίων Κεφαλαίων: ~${paybackYears} έτη (Πληρότητα 30%–52%)`,
        perks: [
          "Επιδότηση έως 80% μέσω της 1ης Πρόσκλησης LEADER (545/07-10-2026) και επόμενων προκηρύξεων.",
          "Μηδενικό κόστος αγοράς ακινήτου μέσω μακροχρόνιου Master Lease (9–12 έτη) από το Μητρώο Κλειστών Κατοικιών.",
          "Έτοιμη ροή επισκεπτών από το Αγροδιατροφικό Κέντρο, το Γεφύρι 1605 και τη Μονή Ραϊδιώτισσας.",
          "Μειωμένο ενεργειακό κόστος (-40%) μέσω της Ενεργειακής Κοινότητας Βροσίνας (150 kWp).",
        ],
      };
    }

    if (investorTrack === "benefactor") {
      // Tax-deductible sponsorship / Naming rights via AMKE
      const coTriggeredPublicFunds = Math.round(investmentAmount * 3.2);
      const taxDeductionEstimate = Math.round(investmentAmount * 0.22);
      return {
        title: "Μεγάλος Ευεργέτης / Ονοματοδοσία & Εταιρικό ESG («Ταμείο Ευεργετών Βροσίνας» ΑΜΚΕ)",
        subtitle:
          "100% Νόμιμη, Διαφανής Φοροαπαλλασσόμενη Χορηγία / Δωρεά με Εθνικό Κύρος & Διασυνδέσεις Κορυφής",
        grantRateLabel: "Ξεκλείδωμα 3,2x Δημόσιων Πόρων (Κάλυψη Ιδίας Συμμετοχής Έργων)",
        mobilizedCapex: investmentAmount + coTriggeredPublicFunds,
        publicGrant: coTriggeredPublicFunds,
        annualBenefitLabel: "Άμεσο Φορολογικό Όφελος (ΚΦΕ Ν. 4172/2013 Άρθρα 19 & 22Α)",
        annualBenefitValue: `Έως ${taxDeductionEstimate.toLocaleString("el-GR")} € έκπτωση φόρου`,
        paybackLabel:
          "Ισόβια Ονοματοδοσία (Naming Rights) + Πιστοποιημένο Αποτύπωμα ESG + Πρόσβαση σε Decision-Makers",
        perks: [
          "Ονοματοδοσία (Naming Rights) σε έργα-σύμβολα: Δημοτικό Σχολείο, Κελάρι Παλαίωσης, Παραποτάμιο Μονοπάτι 1605 ή Σχολή Πετράδων.",
          "Πλήρης φορολογική αναγνώριση δωρεάς/χορηγίας μέσω της ΑΜΚΕ «Ταμείο Ευεργετών Βροσίνας» με ορκωτό ελεγκτή.",
          "Θεσμική συν-παρουσία με Υπουργεία (ΥΠΕΘΑ, ΥΠΑΑΤ), Προεδρία Κυβέρνησης (Ειδική Γραμματεία Ορεινών Περιοχών) & Περιφέρεια Ηπείρου.",
          "Συνέχιση της ιστορικής παράδοσης των Μεγάλων Ηπειρωτών Ευεργετών σε ένα πρότυπο εθνικής εμβέλειας.",
        ],
      };
    }

    // Diaspora / Family Office (15% equity + bridge finance)
    const totalProjectCapex = Math.round(investmentAmount * 2.8);
    const stateGrant = totalProjectCapex - investmentAmount;
    const annualDividend = Math.round(investmentAmount * 0.11);
    return {
      title: "Επενδυτής Διασποράς & Family Office (Μερίδιο 15% + Γέφυρα Ρευστότητας)",
      subtitle:
        "Συν-επένδυση στο μετοχικό κεφάλαιο και χρηματοδότηση-γέφυρα (Bridge Finance) έναντι εγκεκριμένων επιδοτήσεων",
      grantRateLabel: "Μόχλευση 2,8x + Εξασφάλιση έναντι Εγκεκριμένων Επιδοτήσεων",
      mobilizedCapex: totalProjectCapex,
      publicGrant: stateGrant,
      annualBenefitLabel: "Εκτιμώμενη Ετήσια Απόδοση Μερίσματος & Κεφαλαίου",
      annualBenefitValue: `~${annualDividend.toLocaleString("el-GR")} € / έτος (9%–12%)`,
      paybackLabel:
        "Θεσμική Συμμετοχή στο Εποπτικό Συμβούλιο + Δικαίωμα Πρώτης Προτίμησης σε Νέα Έργα",
      perks: [
        "Επένδυση με πραγματικό αντίκρισμα σε γη, κτίρια, παραγωγή ΠΟΠ και τουριστικές υποδομές στην Ήπειρο.",
        "Πλήρης νομική προστασία μειοψηφίας μέσω του Καταστατικού της ΚΟΙΝΣΕΠ και της Θυγατρικής.",
        "Ετήσια έκθεση αντικτύπου (Impact Report) με μετρήσιμους δείκτες δημογραφικής και οικονομικής αναγέννησης.",
        "Δυνατότητα συνδυασμού μετοχικής συμμετοχής με ανακαίνιση οικογενειακού ακινήτου στη Βροσίνα.",
      ],
    };
  }, [investorTrack, investmentAmount, activeScenario]);

  const aiQuickPrompts = [
    {
      label: "Πώς επενδύω με επιδότηση έως 75–80%;",
      answer:
        "Το «Βροσίνα 2031» προσφέρει 4 θεσμικά κανάλια: (1) Στρατηγικός Εταίρος (έως 35–40% στην Εμπορική Θυγατρική του Τυροκομείου 1,65 εκ. € & Οινοποιείου 1,00 εκ. €) με επιδότηση έως 75% από τον Αναπτυξιακό Νόμο 4887/2022 και εγγυοδοσία 80% από την HDB. (2) Ιδιωτική επένδυση στους 10 Παραδοσιακούς Ξενώνες με επιδότηση 65–80% μέσω LEADER ΗΠΕΙΡΟΣ Α.Ε. (3) Φοροαπαλλασσόμενη Χορηγία / Δωρεά μέσω της ΑΜΚΕ «Ταμείο Ευεργετών Βροσίνας» με δικαίωμα Ονοματοδοσίας (Naming Rights) και ισχυρό ESG αποτύπωμα. (4) Συμμετοχή Επενδυτών Διασποράς (15%).",
    },
    {
      label: "Ποια είναι η πραγματική εικόνα της Βροσίνας σήμερα;",
      answer:
        "Η Βροσίνα βρίσκεται σε υψόμετρο 117 μ. στην καταπράσινη κοιλάδα του Ζαλογγίτικου ποταμού (παραπόταμου του Καλαμά), επί της Ε.Ο. Ιωαννίνων–Ηγουμενίτσας (35–40 λεπτά από τα Ιωάννινα). Κατά την απογραφή ΕΛΣΤΑΤ 2021 αριθμεί 58 μόνιμους κατοίκους στον οικισμό (63 στην Κοινότητα). Διαθέτει το ανενεργό Στρατόπεδο «Παπακωνσταντίνου» (13.695 τ.μ. με ισόγεια κτίρια κεραμοσκεπής), κλειστό 3θέσιο Δημοτικό Σχολείο, 6 κλειστά καταστήματα, το πέτρινο Γεφύρι της Βροσίνας, το Ζαλογγογέφυρο του 1605 και την Ιερά Μονή Παναγίας Ραϊδιώτισσας (1628).",
    },
    {
      label: "Πώς κλειδώνει η Καταστατική Ασπίδα (Κεφ. 8);",
      answer:
        "Για να αποκλειστεί κάθε κίνδυνος κακοδιαχείρισης, κομματικών διορισμών ή εχθρικής εξαγοράς, μητρικός φορέας είναι η ΚΟΙΝΣΕΠ Συλλογικής & Κοινωνικής Ωφέλειας (Ν. 4430/2016). Στην Εμπορική Θυγατρική συμμετέχουν: 30% Συνεταιρισμός Παραγωγών, 35% Στρατηγικός Εταίρος, 20% Δήμος Ζίτσας και 15% Ταμείο Ευεργετών/Διασπορά. Ισχύει ανώτατο όριο μετόχου 40%, υπερπλειοψηφία 75%+ για κρίσιμες αποφάσεις, δικαίωμα πρώτης άρνησης (ROFR), τεχνοκρατική διοίκηση με ανοιχτή προκήρυξη και υποχρεωτικό Κοινωνικό Μέρισμα 15% στην κοινότητα.",
    },
    {
      label: "Έχω κλειστό σπίτι στη Βροσίνα — τι κερδίζω;",
      answer:
        "Εγγράφετε το ακίνητό σας στο Μητρώο Κλειστών Κατοικιών & Καταστημάτων. Με σύμβαση Master Lease (9–12 ετών), ο φορέας αναλαμβάνει την πλήρη αποκατάσταση με 0 € δική σας επιβάρυνση (Κατηγορία Α: 20.000 €, Κατηγορία Β με λιθεπένδυση & κεραμίδι: 37.500 €, Κατηγορία Γ με γκρίζα λιθόπλακα: 50.000 €), με επιδότηση 60–80%, απαλλαγή δημοτικών τελών/ΤΑΠ και εγγυημένο εισόδημα.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#1a2129] font-sans">
      {/* 1. TOP URGENT BANNER: 1st LEADER CALL 545/07-10-2026 */}
      <div className="bg-[#14191f] text-white border-b border-[#c89d54]/40 px-4 py-2.5 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#b85d3b] text-white animate-pulse">
              ● ΕΝΕΡΓΗ ΠΡΟΣΚΛΗΣΗ LEADER
            </span>
            <span className="font-medium text-amber-200">
              {SITE_CONFIG.leaderCall.title} (Αρ. Πρωτ.{" "}
              <strong className="font-mono text-white">
                {SITE_CONFIG.leaderCall.code}
              </strong>
              )
            </span>
            <span className="hidden md:inline text-slate-300">
              — Προθεσμία Υποβολής:{" "}
              <strong className="text-white underline decoration-[#c89d54]">
                {SITE_CONFIG.leaderCall.deadlineDisplay}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/documents/Vrosina_2031_Partner_LOI_LEADER_Template.docx"
              download
              className="text-amber-300 hover:text-amber-100 underline font-medium transition"
            >
              Λήψη Προτύπου LOI Εταίρου (.docx) →
            </a>
            <button
              onClick={() => {
                setLeadRole("investor");
                setLeadModalOpen(true);
              }}
              className="hidden sm:inline-flex items-center px-3 py-1 rounded bg-[#c89d54] text-[#14191f] font-bold hover:bg-amber-400 transition"
            >
              Δήλωση Συμμετοχής
            </button>
          </div>
        </div>
      </div>

      {/* 2. STICKY HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#f7f5f0]/95 border-b border-stone-300/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#1f5c43] text-white flex flex-col items-center justify-center font-serif font-bold leading-none shadow-sm group-hover:bg-[#14191f] transition">
              <span className="text-xs tracking-wider text-amber-300">ΒΡ</span>
              <span className="text-[11px] font-mono">2031</span>
            </div>
            <div>
              <div className="font-serif font-bold text-lg tracking-tight text-[#14191f] flex items-center gap-2">
                ΒΡΟΣΙΝΑ 2031
                <span className="hidden sm:inline-block text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                  Έκδοση 2.0 · 10,45 εκ. €
                </span>
              </div>
              <p className="text-[11px] text-stone-600 hidden sm:block">
                Δήμος Ζίτσας · Π.Ε. Ιωαννίνων · Πρότυπο Αναγέννησης Ορεινής Κοινότητας
              </p>
            </div>
          </a>

          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-stone-700">
            <a
              href="#autopsia-real"
              className="hover:text-[#1f5c43] transition flex items-center gap-1 font-semibold text-[#b85d3b]"
            >
              <span>📷</span> Αυτοψία & Drone Βίντεο
            </a>
            <a href="#masterplan" className="hover:text-[#1f5c43] transition">
              Masterplan & 4 Πυλώνες
            </a>
            <a
              href="#investors"
              className="hover:text-[#1f5c43] transition font-semibold text-[#1f5c43]"
            >
              VIP Επενδυτές & Ευεργέτες
            </a>
            <a href="#governance" className="hover:text-[#1f5c43] transition">
              Ασπίδα & Πολιτικοί Φορείς
            </a>
            <a href="#community" className="hover:text-[#1f5c43] transition">
              Χωριανοί & Νέοι Παραγωγοί
            </a>
            <a href="#dataroom" className="hover:text-[#1f5c43] transition">
              Data Room (13)
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/documents/Vrosina_2031_Business_Plan_v2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-400 text-stone-800 text-xs font-semibold hover:bg-stone-200 transition"
            >
              📄 Πλήρες Σχέδιο (PDF)
            </a>
            <button
              onClick={() => {
                setLeadRole("investor");
                setLeadModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1f5c43] text-white text-xs sm:text-sm font-semibold hover:bg-[#174632] shadow-xs transition cursor-pointer"
            >
              Επενδυτικό & Θεσμικό Desk →
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION: REAL AERIAL VROSINA VS 2031 REALITY-GROUNDED MASTERPLAN */}
      <section className="relative bg-[#14191f] text-white overflow-hidden border-b-4 border-[#c89d54]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Narrative, Badges, Audience Pathways */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#1f5c43]/90 border border-emerald-400/30 text-emerald-200 text-xs font-semibold tracking-wide">
                  ΕΘΝΙΚΟΣ ΠΙΛΟΤΟΣ ΟΡΕΙΝΟΤΗΤΑΣ · ΗΠΕΙΡΟΣ
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-mono">
                  Υψόμετρο 117 μ. · 35&apos; από Ιωάννινα
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.15] tracking-tight text-white">
                Βροσίνα 2031:{" "}
                <span className="text-[#c89d54]">
                  Από σύμβολο εγκατάλειψης, σε πρότυπο αναγέννησης.
                </span>
              </h1>

              <p className="text-slate-300 text-base leading-relaxed">
                Ένα ρεαλιστικό, πλήρως κοστολογημένο επιχειρησιακό σχέδιο{" "}
                <strong className="text-white">10,45 εκατ. €</strong> (63%
                δημόσιοι/ΕΕ πόροι · 37% ιδιωτικά/συνεταιριστικά κεφάλαια) που
                μετατρέπει το ανενεργό{" "}
                <strong className="text-amber-200">
                  Στρατόπεδο «Παπακωνσταντίνου» (13.695 τ.μ.)
                </strong>{" "}
                σε Αγροδιατροφικό Κέντρο ΠΟΠ/ΠΓΕ, αναβιώνει{" "}
                <strong className="text-white">25 κατοικίες & 10 ξενώνες</strong>
                , ανοίγει ξανά το σχολείο και τριπλασιάζει τον πληθυσμό του
                χωριού.
              </p>

              {/* Audience Quick-Select Pills */}
              <div className="bg-white/5 border border-white/15 rounded-xl p-4 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-300">
                  ΕΠΙΛΕΞΤΕ ΤΟ ΠΡΟΦΙΛ ΣΑΣ ΓΙΑ ΑΜΕΣΗ ΠΛΟΗΓΗΣΗ:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <a
                    href="#investors"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#c89d54]/20 border border-[#c89d54]/50 text-amber-100 hover:bg-[#c89d54]/30 transition font-semibold"
                  >
                    <span>💼 Επενδυτές, Βιομηχανία & Ευεργέτες</span>
                    <span>→</span>
                  </a>
                  <a
                    href="#governance"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition font-medium"
                  >
                    <span>🏛️ Πολιτικοί, Υπουργεία & Αυτοδιοίκηση</span>
                    <span>→</span>
                  </a>
                  <a
                    href="#community"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition font-medium"
                  >
                    <span>🏡 Χωριανοί & Ιδιοκτήτες Ακινήτων</span>
                    <span>→</span>
                  </a>
                  <a
                    href="#community"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition font-medium"
                  >
                    <span>🐑 Νέοι Κτηνοτρόφοι & Αμπελουργοί</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#autopsia-real"
                  className="px-5 py-3 rounded-xl bg-[#b85d3b] hover:bg-[#a04e2f] text-white font-semibold text-sm shadow-lg transition flex items-center gap-2"
                >
                  <span>🎥</span> Δείτε Πραγματικές Φωτογραφίες & 6 Βίντεο Drone
                </a>
                <a
                  href="#investors"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm transition"
                >
                  Υπολογιστής Επιδοτήσεων (έως 80%)
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Aerial Map (Real Drone Photo vs Reality-Grounded 2031 Masterplan) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900/90 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
                {/* Top bar of viewer */}
                <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="text-xs font-mono text-slate-300">
                      {heroMode === "vision"
                        ? "ΡΕΑΛΙΣΤΙΚΗ ΑΠΕΙΚΟΝΙΣΗ 2031 (ΒΑΣΙΣΜΕΝΗ ΣΤΗΝ ΠΡΑΓΜΑΤΙΚΗ ΑΕΡΟΦΩΤΟΓΡΑΦΙΑ)"
                        : "ΠΡΑΓΜΑΤΙΚΗ ΑΕΡΟΦΩΤΟΓΡΑΦΙΑ ΒΡΟΣΙΝΑΣ ΣΗΜΕΡΑ (DRONE)"}
                    </span>
                  </div>
                  <div className="inline-flex rounded-lg bg-slate-800 p-0.5 text-xs">
                    <button
                      onClick={() => setHeroMode("real")}
                      className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${
                        heroMode === "real"
                          ? "bg-[#b85d3b] text-white"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      📷 Πραγματική Σήμερα
                    </button>
                    <button
                      onClick={() => setHeroMode("vision")}
                      className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${
                        heroMode === "vision"
                          ? "bg-[#1f5c43] text-white"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      ✨ Όραμα 2031 (Στο Ίδιο Ανάγλυφο)
                    </button>
                  </div>
                </div>

                {/* Image + Interactive Hotspots */}
                <div className="relative aspect-16/10 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={
                      heroMode === "vision"
                        ? "/images/hero-masterplan.jpg"
                        : "/images/real/real-vrosina-exploringgreece.jpg"
                    }
                    alt={
                      heroMode === "vision"
                        ? "Ρεαλιστικό Masterplan Βροσίνα 2031 βασισμένο στην πραγματική αεροφωτογραφία του χωριού"
                        : "Πραγματική αεροφωτογραφία της Βροσίνας Ιωαννίνων και του Ζαλογγίτικου ποταμού σήμερα"
                    }
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" />

                  {/* Hotspot Pins */}
                  {MASTERPLAN_HOTSPOTS.map((spot, idx) => {
                    const isSelected = spot.id === activeHotspot.id;
                    return (
                      <button
                        key={spot.id}
                        onClick={() => setActiveHotspotId(spot.id)}
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform ${
                          isSelected ? "scale-125 z-20" : "hover:scale-110 z-10"
                        }`}
                        title={spot.title}
                      >
                        <span
                          className={`flex items-center justify-center w-8 h-8 rounded-full font-mono text-xs font-bold shadow-lg border-2 ${
                            isSelected
                              ? "bg-[#c89d54] text-slate-950 border-white ring-4 ring-[#c89d54]/40"
                              : "bg-[#14191f]/90 text-white border-[#c89d54]"
                          }`}
                        >
                          {idx + 1}
                        </span>
                      </button>
                    );
                  })}

                  {/* Bottom overlay caption */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md border border-white/15 rounded-xl p-3.5 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-amber-300 font-semibold">
                        📍 ΕΠΙΛΕΓΜΕΝΟ ΣΗΜΕΙΟ: {activeHotspot.title}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-900/70 text-emerald-200 font-mono">
                        Προϋπολογισμός: {activeHotspot.capex}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-snug mb-2">
                      {activeHotspot.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 border-t border-slate-800 pt-1.5">
                      <span>Χρηματοδότηση: {activeHotspot.funding}</span>
                      <span className="text-amber-300">
                        Κάντε κλικ στους αριθμούς (1–6) πάνω στον χάρτη
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 KPI Counter Cards */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {HERO_KPIS.map((kpi, i) => (
              <div
                key={i}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition"
              >
                <div className="font-mono text-2xl sm:text-3xl font-bold text-[#c89d54]">
                  {kpi.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                  {kpi.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {kpi.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION 1 (#autopsia-real): REAL VROSINA PHOTOS, BEFORE/AFTER SLIDER & 6 DRONE VIDEOS */}
      <section
        id="autopsia-real"
        className="py-16 lg:py-24 bg-[#ebe6dc] border-b border-stone-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b85d3b]/15 text-[#b85d3b] text-xs font-mono font-bold uppercase">
              ΟΠΤΙΚΗ ΤΕΚΜΗΡΙΩΣΗ & ΑΥΤΟΨΙΑ ΠΕΔΙΟΥ · ΟΧΙ ΕΠΙΣΤΗΜΟΝΙΚΗ ΦΑΝΤΑΣΙΑ
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14191f]">
              Η Πραγματική Βροσίνα Σήμερα & η Ρεαλιστική Μεταμόρφωση του 2031
            </h2>
            <p className="text-stone-700 text-base leading-relaxed">
              Κάθε πρόταση του σχεδίου «Βροσίνα 2031» πατάει{" "}
              <strong>ακριβώς πάνω στα υφιστάμενα κτίρια, τις κεραμοσκεπές, το
              πρώην Στρατόπεδο «Παπακωνσταντίνου» (13.695 τ.μ.), τα δύο ιστορικά
              πέτρινα γεφύρια και τη Μονή Παναγίας Ραϊδιώτισσας</strong>. Σύρετε
              τη γραμμή σύγκρισης για να δείτε το «Σήμερα» δίπλα στο «2031».
            </p>
          </div>

          {/* Interactive Before/After Comparison Slider */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Selector Tabs on Left */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-600 font-bold mb-2">
                ΕΠΙΛΕΞΤΕ ΤΟΠΟΘΕΣΙΑ ΑΥΤΟΨΙΑΣ (4 ΣΗΜΕΙΑ):
              </div>
              {REAL_VS_2031_COMPARISONS.map((comp, idx) => {
                const active = idx === selectedComparisonIdx;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComparisonIdx(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition cursor-pointer ${
                      active
                        ? "bg-[#14191f] text-white border-[#c89d54] shadow-md"
                        : "bg-white/80 hover:bg-white text-stone-800 border-stone-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-mono font-bold ${
                          active ? "text-[#c89d54]" : "text-[#b85d3b]"
                        }`}
                      >
                        ΣΗΜΕΙΟ 0{idx + 1}
                      </span>
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                          active
                            ? "bg-white/10 text-amber-200"
                            : "bg-stone-200 text-stone-700"
                        }`}
                      >
                        {comp.capex}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base mt-1">
                      {comp.title}
                    </h3>
                    <p
                      className={`text-xs mt-1 ${
                        active ? "text-slate-300" : "text-stone-600"
                      }`}
                    >
                      {comp.subtitle}
                    </p>
                  </button>
                );
              })}

              {/* Real Facts Box from Appendix Γ */}
              <div className="bg-white rounded-xl p-5 border border-stone-300 space-y-2.5 text-xs">
                <div className="font-mono font-bold text-[#1f5c43] uppercase">
                  📌 ΕΠΙΣΗΜΑ ΣΤΟΙΧΕΙΑ ΜΗΤΡΩΟΥ (ΠΑΡΑΡΤΗΜΑ Γ):
                </div>
                <ul className="space-y-1.5 text-stone-700">
                  <li>
                    • <strong>Πληθυσμός ΕΛΣΤΑΤ 2021:</strong> 58 κάτοικοι στον
                    οικισμό Βροσίνας (63 στην Τοπική Κοινότητα).
                  </li>
                  <li>
                    • <strong>Πρώην Στρατόπεδο:</strong> «Στρατόπεδο
                    Παπακωνσταντίνου», έκταση <strong>13.695 τ.μ.</strong>{" "}
                    (ιδιοκτησία Τ.Α.ΕΘ.Α.).
                  </li>
                  <li>
                    • <strong>Ποταμός:</strong> Ζαλογγίτικος Ποταμός
                    (Ζαλογκοπόταμος), παραπόταμος του Καλαμά.
                  </li>
                  <li>
                    • <strong>Δύο Πέτρινα Γεφύρια:</strong> (1) Γεφύρι της
                    Βροσίνας εντός του χωριού (άνοιγμα 10,30 μ.) & (2)
                    Ζαλογγογέφυρο του 1605 (άνοιγμα 11,30 μ., ύψος 8,00 μ.).
                  </li>
                </ul>
              </div>
            </div>

            {/* Interactive Split Image Viewer on Right */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-300 shadow-xl overflow-hidden">
              <div className="p-4 bg-[#14191f] text-white flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono text-amber-300">
                    ΣΥΓΚΡΙΣΗ ΠΡΑΓΜΑΤΙΚΟΤΗΤΑΣ ΣΗΜΕΡΑ ↔ ΣΧΕΔΙΟΥ 2031
                  </span>
                  <h3 className="font-serif font-bold text-lg">
                    {activeComparison.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <button
                    onClick={() => setSliderPosition(15)}
                    className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white cursor-pointer"
                  >
                    Δείτε 2031
                  </button>
                  <button
                    onClick={() => setSliderPosition(50)}
                    className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white cursor-pointer"
                  >
                    50/50
                  </button>
                  <button
                    onClick={() => setSliderPosition(85)}
                    className="px-2.5 py-1 rounded bg-[#b85d3b] hover:bg-[#a04e2f] text-white cursor-pointer"
                  >
                    Δείτε Σήμερα
                  </button>
                </div>
              </div>

              {/* Before / After Container */}
              <div className="relative aspect-16/10 w-full select-none overflow-hidden bg-stone-900">
                {/* Base Layer: 2031 Vision Image */}
                <img
                  src={activeComparison.visionImage}
                  alt={activeComparison.visionCaption}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Top Clipped Layer: Real Today Image */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src={activeComparison.realImage}
                    alt={activeComparison.realCaption}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Vertical Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#c89d54] text-[#14191f] border-2 border-white font-bold flex items-center justify-center shadow-lg text-xs">
                    ↔
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#b85d3b]/95 text-white text-xs font-mono font-bold shadow">
                  ΦΩΤΟΓΡΑΦΙΑ ΣΗΜΕΡΑ
                </div>
                <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-[#1f5c43]/95 text-white text-xs font-mono font-bold shadow">
                  ΡΕΑΛΙΣΤΙΚΟ ΣΧΕΔΙΟ 2031
                </div>

                {/* Range input overlay for smooth dragging */}
                <input
                  type="range"
                  min={5}
                  max={95}
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  aria-label="Σύγκριση Σήμερα με 2031"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />
              </div>

              {/* Captions under slider */}
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 border-t border-stone-200 text-xs">
                <div className="p-3 rounded-lg bg-stone-200/70 border-l-4 border-[#b85d3b]">
                  <div className="font-mono font-bold text-[#b85d3b] mb-1">
                    📷 ΣΗΜΕΡΑ (ΑΥΤΟΨΙΑ):
                  </div>
                  <p className="text-stone-700 leading-relaxed">
                    {activeComparison.realCaption}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 border-l-4 border-[#1f5c43]">
                  <div className="font-mono font-bold text-[#1f5c43] mb-1">
                    ✨ ΤΟ ΙΔΙΟ ΣΗΜΕΙΟ ΤΟ 2031:
                  </div>
                  <p className="text-stone-700 leading-relaxed">
                    {activeComparison.visionCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 6 REAL YOUTUBE DRONE & FIELD VIDEOS GRID */}
          <div className="space-y-6 pt-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
                  🎬 6 ΠΡΑΓΜΑΤΙΚΑ ΒΙΝΤΕΟ DRONE & ΟΔΟΙΠΟΡΙΚΑ ΤΗΣ ΒΡΟΣΙΝΑΣ
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191f] mt-1">
                  Δείτε τη Βροσίνα από Drone, το Στρατόπεδο, τα Γεφύρια & τη Ραϊδιώτισσα
                </h3>
              </div>
              {activeVideoId && (
                <button
                  onClick={() => setActiveVideoId(null)}
                  className="px-3.5 py-1.5 rounded-lg bg-stone-800 text-white text-xs font-semibold hover:bg-stone-700 cursor-pointer"
                >
                  ✕ Κλείσιμο Video Player
                </button>
              )}
            </div>

            {/* Active Embedded YouTube Player */}
            {activeVideoId && (
              <div className="bg-[#14191f] p-4 rounded-2xl border-2 border-[#c89d54] shadow-2xl">
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                    title="Βίντεο Βροσίνας Ιωαννίνων"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {REAL_VROSINA_VIDEOS.map((video) => {
                const isPlaying = activeVideoId === video.id;
                return (
                  <div
                    key={video.id}
                    className={`bg-white rounded-xl overflow-hidden border transition shadow-sm flex flex-col justify-between ${
                      isPlaying
                        ? "border-[#c89d54] ring-2 ring-[#c89d54]"
                        : "border-stone-300 hover:shadow-md"
                    }`}
                  >
                    <div>
                      <div
                        onClick={() => setActiveVideoId(video.id)}
                        className="relative aspect-video bg-stone-900 cursor-pointer group overflow-hidden"
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-[#b85d3b] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition text-xl">
                            ▶
                          </div>
                        </div>
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-black/80 text-amber-300 font-mono text-[11px]">
                          {video.category}
                        </span>
                        <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[11px]">
                          {video.duration}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="font-serif font-bold text-base text-[#14191f] leading-snug">
                          {video.title}
                        </h4>
                        <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                          {video.description}
                        </p>
                      </div>
                    </div>
                    <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-stone-100 text-xs">
                      <button
                        onClick={() => setActiveVideoId(video.id)}
                        className="font-semibold text-[#1f5c43] hover:underline cursor-pointer"
                      >
                        {isPlaying ? "● Αναπαραγωγή τώρα" : "▶ Αναπαραγωγή εδώ"}
                      </button>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-500 hover:text-stone-800"
                      >
                        YouTube ↗
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 2 (#masterplan): THE 4 PILLARS + 5-YEAR RAMP-UP */}
      <section id="masterplan" className="py-16 lg:py-24 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f5c43]/15 text-[#1f5c43] text-xs font-mono font-bold uppercase">
              ΑΡΧΙΤΕΚΤΟΝΙΚΗ ΤΟΥ ΣΧΕΔΙΟΥ · 4 ΑΛΛΗΛΕΝΔΕΤΟΙ ΠΥΛΩΝΕΣ
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14191f]">
              Από τη Γη, στο Ράφι, στο Χωριό: Το Οικοσύστημα των 10,45 εκ. €
            </h2>
            <p className="text-stone-700 text-base leading-relaxed">
              Κανένας πυλώνας δεν στέκεται μόνος του: οι κτηνοτρόφοι και οι
              αμπελουργοί (Πυλώνας 2) τροφοδοτούν το Τυροκομείο και το
              Οινοποιείο στο πρώην Στρατόπεδο (Πυλώνας 1), οι εργαζόμενοι
              κατοικούν στα ανακαινισμένα σπίτια με ανοιχτό σχολείο (Πυλώνας 3),
              και οι επισκέπτες του Γεφυριού 1605 και της Μονής Ραϊδιώτισσας
              (Πυλώνας 4) αγοράζουν τα προϊόντα στον τόπο παραγωγής τους.
            </p>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FOUR_PILLARS.map((pillar) => {
              const active = pillar.id === activePillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                    active
                      ? "bg-[#1f5c43] text-white border-[#1f5c43] shadow-lg"
                      : "bg-white hover:bg-stone-100 text-stone-800 border-stone-300"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span
                      className={active ? "text-amber-300" : "text-[#b85d3b]"}
                    >
                      ΠΥΛΩΝΑΣ {pillar.number}
                    </span>
                    <span className="font-bold">{pillar.budget}</span>
                  </div>
                  <div className="font-serif font-bold text-base mt-1.5">
                    {pillar.title}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      active ? "text-emerald-100" : "text-stone-500"
                    }`}
                  >
                    Ενίσχυση: {pillar.subsidyRate}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Detail Card */}
          <div className="bg-white rounded-2xl border border-stone-300 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 bg-stone-900 flex flex-col justify-between">
              <div className="relative aspect-16/11 w-full">
                <img
                  src={activePillar.heroImage}
                  alt={activePillar.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-lg bg-black/80 backdrop-blur-xs text-white text-xs">
                  <div className="font-mono text-amber-300 font-bold">
                    ΠΥΛΩΝΑΣ {activePillar.number} · {activePillar.budget}
                  </div>
                  <div>{activePillar.subtitle}</div>
                </div>
              </div>
              {activePillar.secondaryImage && (
                <div className="p-4 bg-[#14191f] text-white border-t border-slate-800 flex items-center gap-4">
                  <img
                    src={activePillar.secondaryImage}
                    alt={activePillar.title}
                    className="w-24 h-16 rounded-lg object-cover border border-slate-700 shrink-0"
                  />
                  <div className="text-xs text-slate-300">
                    <strong className="text-amber-300 block">
                      Θεσμικό & Χρηματοδοτικό Πλαίσιο:
                    </strong>
                    {activePillar.legalFramework}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#1f5c43] font-mono text-xs font-bold">
                    Προϋπολογισμός: {activePillar.budget} · Επιδότηση:{" "}
                    {activePillar.subsidyRate}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191f]">
                  {activePillar.title}
                </h3>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  {activePillar.summary}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono font-bold uppercase text-stone-500">
                    ΚΥΡΙΕΣ ΠΑΡΕΜΒΑΣΕΙΣ & ΥΠΟΕΡΓΑ:
                  </div>
                  <ul className="grid grid-cols-1 gap-2">
                    {activePillar.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800 bg-stone-50 p-2.5 rounded-lg border border-stone-200"
                      >
                        <span className="text-[#1f5c43] font-bold">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-200">
                {activePillar.kpis.map((k, i) => (
                  <div
                    key={i}
                    className="bg-stone-100 rounded-lg p-3 border border-stone-200/80"
                  >
                    <div className="font-mono font-bold text-base sm:text-lg text-[#14191f]">
                      {k.value}
                    </div>
                    <div className="text-[11px] text-stone-600 mt-0.5">
                      {k.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5-Year Ramp-up Timeline */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-300 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono uppercase text-[#b85d3b] font-bold">
                  ΧΡΟΝΟΔΙΑΓΡΑΜΜΑ ΥΛΟΠΟΙΗΣΗΣ & ΚΛΙΜΑΚΩΣΗΣ (2026–2031)
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#14191f]">
                  Η Πενταετής Διαδρομή προς την Ωριμότητα (Έτος 1 έως Έτος 5)
                </h3>
              </div>
              <span className="text-xs font-mono bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-300">
                Στόχος Έτους 5: 2.550.000 € Κύκλος Εργασιών · 50 Θέσεις Εργασίας
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {FIVE_YEAR_RAMPUP.map((step, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 bg-[#f7f5f0] border border-stone-300 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-[#1f5c43]">
                      <span>{step.year}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                        {step.jobs} θέσεις
                      </span>
                    </div>
                    <div className="font-mono text-lg font-bold text-[#14191f] mt-2">
                      Έσοδα: {step.revenue}
                    </div>
                    <p className="text-xs text-stone-700 mt-2 leading-relaxed">
                      {step.milestones}
                    </p>
                  </div>
                  <div className="w-full bg-stone-300 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1f5c43] h-full"
                      style={{ width: `${(i + 1) * 20}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 3 (#investors): VIP INVESTOR, GRANT LEVERAGE (UP TO 80%) & BENEFACTOR DESK */}
      <section
        id="investors"
        className="py-16 lg:py-24 bg-[#14191f] text-white border-y-4 border-[#c89d54]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c89d54]/20 border border-[#c89d54]/50 text-[#c89d54] text-xs font-mono font-bold uppercase">
              VIP INVESTOR, STRATEGIC PARTNER & BENEFACTOR DESK
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Μόχλευση Κεφαλαίου 1 προς 4, Επιδοτήσεις έως 80% & Εθνικό Prestige
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Είτε είστε <strong>στρατηγικός επενδυτής αγροδιατροφής</strong>{" "}
              που αναζητά αυθεντική πρώτη ύλη ΠΟΠ/ΠΓΕ με επιδότηση CAPEX έως 75%,
              είτε <strong>μεγάλος ευεργέτης / family office / όμιλος</strong>{" "}
              που επιδιώκει 100% νόμιμη φοροαπαλλασσόμενη χορηγία, ισόβια{" "}
              <strong>Ονοματοδοσία (Naming Rights)</strong>, πιστοποιημένο{" "}
              <strong>ESG Impact</strong> και θεσμική δικτύωση κορυφής, το
              «Βροσίνα 2031» διαθέτει έτοιμο, θωρακισμένο όχημα.
            </p>
          </div>

          {/* Interactive Grant Leverage & ROI Simulator */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase text-amber-300 font-bold">
                1. ΕΠΙΛΕΞΤΕ ΚΑΝΑΛΙ ΤΟΠΟΘΕΤΗΣΗΣ ΚΕΦΑΛΑΙΟΥ / ΧΟΡΗΓΙΑΣ:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    id: "strategic",
                    label: "🏭 Στρατηγικός Εταίρος (35%–40%)",
                    sub: "Τυροκομείο & Οινοποιείο · Έως 75% Επιδότηση",
                  },
                  {
                    id: "agrotourism",
                    label: "🏨 Ξενώνες & Εστίαση (LEADER)",
                    sub: "10 Παραδοσιακοί Ξενώνες · Έως 80% Επιδότηση",
                  },
                  {
                    id: "benefactor",
                    label: "🏛️ Ταμείο Ευεργετών (ΑΜΚΕ)",
                    sub: "Φοροαπαλλαγή, Naming Rights & Κύρος Κορυφής",
                  },
                  {
                    id: "diaspora",
                    label: "🌍 Επενδυτές Διασποράς (15%)",
                    sub: "Μετοχικό Κεφάλαιο & Γέφυρα Ρευστότητας",
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setInvestorTrack(tab.id as typeof investorTrack)}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                      investorTrack === tab.id
                        ? "bg-[#c89d54] text-[#14191f] border-white font-bold shadow-lg"
                        : "bg-slate-800/90 hover:bg-slate-800 text-slate-200 border-slate-700"
                    }`}
                  >
                    <div className="text-sm font-bold">{tab.label}</div>
                    <div
                      className={`text-xs mt-1 ${
                        investorTrack === tab.id
                          ? "text-slate-900"
                          : "text-slate-400"
                      }`}
                    >
                      {tab.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider + Output Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 border-t border-slate-800">
              <div className="lg:col-span-5 space-y-5 bg-slate-950/80 p-6 rounded-xl border border-slate-800">
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block">
                    2. ΙΔΙΑ ΣΥΜΜΕΤΟΧΗ / ΚΕΦΑΛΑΙΟ ΠΟΥ ΔΙΑΘΕΤΕΤΕ:
                  </label>
                  <div className="font-mono text-3xl sm:text-4xl font-bold text-[#c89d54] mt-1">
                    {investmentAmount.toLocaleString("el-GR")} €
                  </div>
                </div>

                <input
                  type="range"
                  min={25000}
                  max={1000000}
                  step={25000}
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full accent-[#c89d54] cursor-pointer"
                />

                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>25.000 €</span>
                  <span>250.000 €</span>
                  <span>500.000 €</span>
                  <span>1.000.000 €</span>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <div className="text-slate-300 font-semibold">
                    Καθεστώς Ενίσχυσης / Μόχλευσης:
                  </div>
                  <div className="font-mono text-emerald-400">
                    {investorSimulation.grantRateLabel}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {investorSimulation.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {investorSimulation.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4">
                    <div className="text-[11px] font-mono text-slate-400 uppercase">
                      ΣΥΝΟΛΙΚΗ ΑΞΙΑ ΕΡΓΟΥ ΠΟΥ ΕΝΕΡΓΟΠΟΙΕΙΤΑΙ
                    </div>
                    <div className="font-mono text-2xl font-bold text-white mt-1">
                      {investorSimulation.mobilizedCapex.toLocaleString("el-GR")} €
                    </div>
                  </div>
                  <div className="bg-emerald-950/60 border border-emerald-700/60 rounded-xl p-4">
                    <div className="text-[11px] font-mono text-emerald-300 uppercase">
                      ΔΗΜΟΣΙΑ / ΕΥΡΩΠΑΪΚΗ ΕΠΙΔΟΤΗΣΗ
                    </div>
                    <div className="font-mono text-2xl font-bold text-emerald-400 mt-1">
                      +{investorSimulation.publicGrant.toLocaleString("el-GR")} €
                    </div>
                  </div>
                  <div className="bg-amber-950/50 border border-[#c89d54]/60 rounded-xl p-4">
                    <div className="text-[11px] font-mono text-amber-300 uppercase">
                      {investorSimulation.annualBenefitLabel}
                    </div>
                    <div className="font-mono text-xl font-bold text-[#c89d54] mt-1">
                      {investorSimulation.annualBenefitValue}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-amber-200 font-mono">
                  ⚡ {investorSimulation.paybackLabel}
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-200">
                  {investorSimulation.perks.map((perk, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 bg-slate-800/50 p-2.5 rounded-lg"
                    >
                      <span className="text-[#c89d54] font-bold">★</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 3 Financial Scenarios Comparison (Conservative / Baseline / Optimistic) */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-amber-300 uppercase font-bold">
                  ΑΝΑΛΥΣΗ ΕΥΑΙΣΘΗΣΙΑΣ & 3 ΣΕΝΑΡΙΑ ΙΣΟΛΟΓΙΣΜΟΥ (ΚΕΦΑΛΑΙΟ 12)
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  Βιωσιμότητα Ακόμη και στο Συντηρητικό Σενάριο (-35% Παραγωγή)
                </h3>
              </div>

              <div className="inline-flex rounded-xl bg-slate-800 p-1 text-xs">
                {THREE_SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => setSelectedScenarioId(sc.id)}
                    className={`px-3.5 py-2 rounded-lg font-semibold transition cursor-pointer ${
                      selectedScenarioId === sc.id
                        ? "bg-[#c89d54] text-slate-950"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {sc.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {THREE_SCENARIOS.map((sc) => {
                const isSelected = sc.id === selectedScenarioId;
                return (
                  <div
                    key={sc.id}
                    onClick={() => setSelectedScenarioId(sc.id)}
                    className={`rounded-2xl p-6 border transition cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 border-[#c89d54] ring-2 ring-[#c89d54]/50 shadow-xl"
                        : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xl text-white">
                        {sc.name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/10 text-amber-300">
                        {sc.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      {sc.description}
                    </p>

                    <div className="my-5 py-4 border-y border-slate-800 space-y-3">
                      <div>
                        <div className="text-[11px] font-mono text-slate-400">
                          ΚΥΚΛΟΣ ΕΡΓΑΣΙΩΝ ΕΤΟΥΣ 5 (ΟΙΚΟΣΥΣΤΗΜΑ)
                        </div>
                        <div className="font-mono text-2xl font-bold text-[#c89d54]">
                          {sc.revenueFormatted}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-slate-400">
                          ΛΕΙΤΟΥΡΓΙΚΗ ΚΕΡΔΟΦΟΡΙΑ (EBITDA ΕΤΟΥΣ 5)
                        </div>
                        <div className="font-mono text-lg font-bold text-emerald-400">
                          {sc.ebitdaRange}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300 font-mono">
                      <div className="flex justify-between">
                        <span>Γάλα στο Τυροκομείο:</span>
                        <strong className="text-white">{sc.milkTons} τόνοι</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Φιάλες Οίνου (Ντεμπίνα):</span>
                        <strong className="text-white">
                          {sc.wineBottles.toLocaleString("el-GR")}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Διανυκτερεύσεις ({sc.occupancyRate}):</span>
                        <strong className="text-white">
                          {sc.overnights.toLocaleString("el-GR")}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Άμεσες Θέσεις Εργασίας:</span>
                        <strong className="text-emerald-300">
                          {sc.jobsYear5} θέσεις
                        </strong>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-slate-800 text-amber-300">
                        <span>Μέρισμα 15% στην Κοινότητα:</span>
                        <strong>{sc.communityDividend15Pct}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Expandable Full CAPEX Table (10.45M €) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-bold text-xl text-white">
                    Αναλυτικός Προϋπολογισμός CAPEX 10.450.000 € & Πηγές Χρηματοδότησης
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    6,58 εκ. € (63%) Δημόσιοι/ΕΕ Πόροι · 3,87 εκ. € (37%) Ιδιωτικά / Συνεταιριστικά / Χορηγικά Κεφάλαια
                  </p>
                </div>
                <button
                  onClick={() => setShowFullCapex(!showFullCapex)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-amber-300 text-xs font-mono font-bold cursor-pointer"
                >
                  {showFullCapex
                    ? "▲ Απόκρυψη Αναλυτικού Πίνακα"
                    : "▼ Προβολή Όλων των Κωδικών CAPEX (10,45 εκ. €)"}
                </button>
              </div>

              {showFullCapex && (
                <div className="mt-6 space-y-6">
                  {CAPEX_BREAKDOWN.map((cat) => (
                    <div
                      key={cat.id}
                      className="border border-slate-800 rounded-xl overflow-hidden"
                    >
                      <div className="bg-slate-950 px-4 py-3 flex items-center justify-between">
                        <span className="font-serif font-bold text-sm sm:text-base text-amber-300">
                          {cat.categoryTitle}
                        </span>
                        <span className="font-mono font-bold text-sm text-white">
                          {cat.subtotalFormatted}
                        </span>
                      </div>
                      <div className="divide-y divide-slate-800/80 text-xs">
                        {cat.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="px-4 py-3 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-slate-900/60"
                          >
                            <div className="sm:col-span-5 font-medium text-white">
                              {item.title}
                            </div>
                            <div className="sm:col-span-2 font-mono font-bold text-amber-200">
                              {item.amountFormatted}
                            </div>
                            <div className="sm:col-span-3 text-slate-300">
                              {item.fundingSource}
                            </div>
                            <div className="sm:col-span-2 font-mono text-emerald-400 sm:text-right">
                              Ενίσχυση: {item.publicShare}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION 4 (#governance): STATUTORY SHIELD & POLITICAL/INSTITUTIONAL STAKEHOLDER DESK */}
      <section
        id="governance"
        className="py-16 lg:py-24 bg-[#ebe6dc] border-b border-stone-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Governance Shield (Chapter 8) */}
          <div className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14191f] text-amber-300 text-xs font-mono font-bold uppercase">
                ΚΕΦΑΛΑΙΟ 8 · ΝΟΜΙΚΗ & ΚΑΤΑΣΤΑΤΙΚΗ «ΑΣΠΙΔΑ ΠΡΟΣΤΑΣΙΑΣ»
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14191f]">
                Χτισμένο για να μην Μπορεί να Αλλοιωθεί, να Κλαπεί ή να Κομματικοποιηθεί
              </h2>
              <p className="text-stone-700 text-base leading-relaxed">
                Πριν ζητηθεί το πρώτο ευρώ, το «Βροσίνα 2031» κλειδώνει
                καταστατικά τη διακυβέρνησή του σε δύο επίπεδα: μητρικός
                θεματοφύλακας είναι η{" "}
                <strong>ΚΟΙΝΣΕΠ Συλλογικής και Κοινωνικής Ωφέλειας</strong> και
                εκτελεστικός βραχίονας η{" "}
                <strong>Εμπορική Θυγατρική Ειδικού Σκοπού</strong>.
              </p>
            </div>

            {/* Equity Split Bar + 6 Anti-Capture Clauses */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-300 shadow-sm space-y-8">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-stone-500 mb-3">
                  ΜΕΤΟΧΙΚΗ ΣΥΝΘΕΣΗ ΕΜΠΟΡΙΚΗΣ ΘΥΓΑΤΡΙΚΗΣ (ΙΣΟΡΡΟΠΙΑ ΔΥΝΑΜΕΩΝ):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {GOVERNANCE_SHIELD.shareholders.map((sh, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-4 border border-stone-200 bg-stone-50"
                      style={{ borderTopWidth: "5px", borderTopColor: sh.color }}
                    >
                      <div className="font-mono text-3xl font-bold text-[#14191f]">
                        {sh.percentage}%
                      </div>
                      <div className="font-serif font-bold text-sm text-[#14191f] mt-1">
                        {sh.stakeholder}
                      </div>
                      <div className="text-xs text-stone-600 mt-1.5">
                        {sh.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-stone-200">
                {GOVERNANCE_SHIELD.clauses.map((cl, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#f7f5f0] border border-stone-300/90 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 font-serif font-bold text-base text-[#14191f]">
                      <span className="text-[#1f5c43]">🛡️</span>
                      <span>{cl.title}</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {cl.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Stakeholder One-Pager Briefs (Politicians, Ministries, Local Gov, Investors) */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#b85d3b]">
                  ΘΕΣΜΙΚΗ & ΠΟΛΙΤΙΚΗ ΣΤΡΑΤΗΓΙΚΗ · ΕΞΑΤΟΜΙΚΕΥΜΕΝΑ ONE-PAGERS
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191f] mt-1">
                  Τι Ζητάμε & Τι Κερδίζει Κάθε Θεσμικός, Πολιτικός & Επενδυτικός Εταίρος
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { id: "all", label: "Όλοι οι Φορείς (9)" },
                  { id: "institutional", label: "Αυτοδιοίκηση & Φορείς" },
                  { id: "political", label: "Υπουργεία & Βουλευτές" },
                  { id: "investors", label: "Επενδυτές & Ευεργέτες" },
                  { id: "community", label: "Κάτοικοι" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setStakeholderFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                      stakeholderFilter === f.id
                        ? "bg-[#14191f] text-white"
                        : "bg-white text-stone-700 border border-stone-300 hover:bg-stone-100"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left list of stakeholders */}
              <div className="lg:col-span-4 space-y-2">
                {filteredStakeholders.map((st) => {
                  const active = st.id === activeStakeholder.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setSelectedStakeholderId(st.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition cursor-pointer ${
                        active
                          ? "bg-[#1f5c43] text-white border-[#1f5c43] shadow-md"
                          : "bg-white hover:bg-stone-50 text-stone-800 border-stone-300"
                      }`}
                    >
                      <div
                        className={`text-[11px] font-mono ${
                          active ? "text-amber-200" : "text-stone-500"
                        }`}
                      >
                        {st.phase}
                      </div>
                      <div className="font-serif font-bold text-sm sm:text-base mt-0.5">
                        {st.name}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Active Stakeholder Executive Brief */}
              <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-stone-300 shadow-lg space-y-6">
                <div className="border-b border-stone-200 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-mono text-xs font-bold">
                      {activeStakeholder.phase}
                    </span>
                    <span className="text-xs font-mono text-stone-500">
                      Παραδοτέο: {activeStakeholder.deliverable}
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#14191f] mt-2">
                    {activeStakeholder.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-[#1f5c43] mt-0.5">
                    Ρόλος στο «Βροσίνα 2031»: {activeStakeholder.role}
                  </p>
                </div>

                <blockquote className="p-4 rounded-xl bg-[#f7f5f0] border-l-4 border-[#c89d54] font-serif italic text-stone-800 text-sm sm:text-base">
                  «{activeStakeholder.hookQuote}»
                </blockquote>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
                      ΓΙΑΤΙ ΑΦΟΡΑ ΑΜΕΣΑ ΤΟΝ ΦΟΡΕΑ ΣΑΣ:
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                      {activeStakeholder.whyItMatters.map((w, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#1f5c43] font-bold">•</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-mono font-bold uppercase text-[#b85d3b]">
                      ΤΙ ΣΥΓΚΕΚΡΙΜΕΝΟ ΖΗΤΑΜΕ ΤΩΡΑ:
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                      {activeStakeholder.whatWeAsk.map((ask, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 bg-amber-50/70 p-2 rounded border border-amber-200/80"
                        >
                          <span className="font-mono font-bold text-[#b85d3b]">
                            {i + 1}.
                          </span>
                          <span>{ask}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-200">
                  {activeStakeholder.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="bg-stone-100 rounded-lg p-3 text-center"
                    >
                      <div className="font-mono font-bold text-lg text-[#14191f]">
                        {m.value}
                      </div>
                      <div className="text-[11px] text-stone-600">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECTION 5 (#community): VILLAGERS, CLOSED HOMES REGISTRY & YOUNG PRODUCERS */}
      <section
        id="community"
        className="py-16 lg:py-24 bg-[#f7f5f0] border-b border-stone-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f5c43]/15 text-[#1f5c43] text-xs font-mono font-bold uppercase">
              ΓΙΑ ΤΟΥΣ ΧΩΡΙΑΝΟΥΣ, ΙΔΙΟΚΤΗΤΕΣ ΑΚΙΝΗΤΩΝ & ΝΕΟΥΣ ΠΑΡΑΓΩΓΟΥΣ
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14191f]">
              Ανακαινίζουμε τα Κλειστά Σπίτια με 0 € Δική σας Επιβάρυνση & Δίνουμε Πρώτο Κοπάδι
            </h2>
            <p className="text-stone-700 text-base leading-relaxed">
              Η πραγματική Βροσίνα έχει σπίτια της περιόδου 1960–1990 με
              κεραμοσκεπές, σοβά και πέτρα. Ο{" "}
              <strong>Δεσμευτικός Μορφολογικός Κανονισμός</strong> δεν γκρεμίζει
              το χωριό: ντύνει τις όψεις με φυσική ηπειρωτική πέτρα, αποκαθιστά
              τις κεραμοσκεπές (ή τοποθετεί γκρίζα λιθόπλακα στα κεντρικά
              κτίρια) μέσω <strong>Master Lease 9–12 ετών</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Housing Morphology Categories (A, B, C) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-300 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-[#14191f]">
                  Υπολογιστής Αποκατάστασης Κατοικίας (Μητρώο Κλειστών Ακινήτων)
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-100 text-[#1f5c43] font-bold">
                  Στόχος: 20 Κατοικίες + 10 Ξενώνες + 5 Καταστήματα
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {HOUSING_CATEGORIES.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedHousingIdx(idx)}
                    className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                      selectedHousingIdx === idx
                        ? "bg-[#14191f] text-white border-[#c89d54]"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-300"
                    }`}
                  >
                    <div className="text-xs font-mono font-bold text-[#c89d54]">
                      {cat.code}
                    </div>
                    <div className="font-serif font-bold text-sm mt-1">
                      {cat.cost}
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-[#f7f5f0] border border-stone-300 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-serif font-bold text-lg text-[#14191f]">
                    {HOUSING_CATEGORIES[selectedHousingIdx].title}
                  </h4>
                  <span className="font-mono text-xl font-bold text-[#1f5c43]">
                    {HOUSING_CATEGORIES[selectedHousingIdx].cost} / κατοικία
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {HOUSING_CATEGORIES[selectedHousingIdx].works}
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-white border border-stone-200">
                    Επιδότηση Προγράμματος:{" "}
                    <strong className="text-[#1f5c43]">
                      {HOUSING_CATEGORIES[selectedHousingIdx].subsidy}
                    </strong>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-stone-200">
                    Ίδια Χρήματα Ιδιοκτήτη:{" "}
                    <strong className="text-[#b85d3b]">
                      {HOUSING_CATEGORIES[selectedHousingIdx].ownerOutOfPocket}
                    </strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setLeadRole("owner");
                  setLeadModalOpen(true);
                }}
                className="w-full py-3.5 rounded-xl bg-[#1f5c43] hover:bg-[#174632] text-white font-semibold text-sm shadow transition cursor-pointer"
              >
                🏡 Εγγράψτε το Κλειστό Σπίτι ή Κατάστημά σας στο Μητρώο Βροσίνας →
              </button>
            </div>

            {/* Right: "Έλα να βοσκήσεις — έλα να μείνεις" Package */}
            <div className="lg:col-span-5 bg-[#14191f] text-white rounded-2xl p-6 sm:p-8 border border-[#c89d54] space-y-5">
              <div className="inline-block px-3 py-1 rounded-full bg-[#c89d54]/20 text-amber-300 font-mono text-xs font-bold">
                ΠΡΟΓΡΑΜΜΑ «ΕΛΑ ΝΑ ΒΟΣΚΗΣΕΙΣ — ΕΛΑ ΝΑ ΜΕΙΝΕΙΣ»
              </div>
              <h3 className="font-serif text-2xl font-bold">
                12 Νέοι Κτηνοτρόφοι, 8 Αμπελουργοί & 12 Τεχνίτες Πέτρας
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Λύνουμε το μεγαλύτερο πρόβλημα των νέων παραγωγών: την έλλειψη
                αρχικού κεφαλαίου και την αναμονή εκταμίευσης των επιδοτήσεων.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">01.</span>
                  <span>
                    <strong>Πακέτο Πρώτου Κοπαδιού (50–80 ζώα):</strong>{" "}
                    Επιδότηση έως 80% + <strong>Προκαταβολή-Γέφυρα</strong> από
                    το Ταμείο Ευεργετών/HDB για αγορά ζώων από την 1η μέρα.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">02.</span>
                  <span>
                    <strong>Εγγυημένη Τιμή Γάλακτος & Σταφυλιού:</strong>{" "}
                    Πολυετής σύμβαση απορρόφησης από το Τυροκομείο και το
                    Οινοποιείο της Βροσίνας.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">03.</span>
                  <span>
                    <strong>Ανακαινισμένο Σπίτι & Ανοιχτό Σχολείο:</strong>{" "}
                    Επιδότηση ενοικίου για τα πρώτα 3 χρόνια και επαναλειτουργία
                    του Δημοτικού Σχολείου με ολοήμερο & τηλεϊατρική.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">04.</span>
                  <span>
                    <strong>Σχολή Πετράδων Βροσίνας (ΔΥΠΑ):</strong> Αμειβόμενη
                    μαθητεία στην παραδοσιακή λιθοδομή και άμεση απασχόληση στα
                    έργα του χωριού.
                  </span>
                </li>
              </ul>

              <button
                onClick={() => {
                  setLeadRole("producer");
                  setLeadModalOpen(true);
                }}
                className="w-full py-3.5 rounded-xl bg-[#b85d3b] hover:bg-[#a04e2f] text-white font-semibold text-sm shadow transition cursor-pointer"
              >
                🐑 Αίτηση Νέου Κτηνοτρόφου / Αμπελουργού / Τεχνίτη Πέτρας →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SECTION 6 (#dataroom): OFFICIAL DATA ROOM (13 FILES), VISION SPEECH, FAQ & AI CONCIERGE */}
      <section id="dataroom" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Official Data Room */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
                  ΕΠΙΣΗΜΟ DATA ROOM & ΒΙΒΛΙΟΘΗΚΗ ΤΕΚΜΗΡΙΩΣΗΣ
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14191f] mt-1">
                  Κατεβάστε Όλα τα Επίσημα Έγγραφα του «Βροσίνα 2031»
                </h2>
              </div>
              <a
                href="/llms-full.txt"
                target="_blank"
                className="text-xs font-mono text-stone-600 hover:text-[#1f5c43] underline"
              >
                🤖 Machine-Readable AI Corpus (/llms-full.txt) →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {DATA_ROOM_DOCUMENTS.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.href}
                  download
                  className={`group p-5 rounded-xl border transition flex flex-col justify-between ${
                    doc.featured
                      ? "bg-[#f7f5f0] border-[#1f5c43] shadow-sm hover:shadow-md"
                      : "bg-stone-50 border-stone-200 hover:border-stone-400"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-800 font-semibold">
                        {doc.category}
                      </span>
                      <span className="text-[#b85d3b] font-bold">
                        {doc.format} · {doc.size}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-[#14191f] mt-3 group-hover:text-[#1f5c43] transition">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs font-semibold text-[#1f5c43]">
                    <span>{doc.pages}</span>
                    <span className="group-hover:translate-x-1 transition">
                      Λήψη Αρχείου ↓
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* AI Concierge & FAQ Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-stone-200">
            {/* AI Concierge Box */}
            <div className="lg:col-span-5 bg-[#14191f] text-white rounded-2xl p-6 sm:p-8 border border-slate-700 space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded bg-[#c89d54] text-slate-950 font-mono text-xs font-bold">
                  AI CONCIERGE
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ΒΡΟΣΙΝΑ 2031 KNOWLEDGE ENGINE
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold">
                Άμεσες Απαντήσεις για Επενδυτές, Φορείς & Πολίτες
              </h3>

              <div className="space-y-2">
                {aiQuickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setAiAnswerIdx(idx)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      aiAnswerIdx === idx
                        ? "bg-[#1f5c43] text-white font-semibold"
                        : "bg-slate-800/80 hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    💬 {p.label}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <div className="font-mono text-[11px] text-amber-300 mb-1">
                  ΑΠΑΝΤΗΣΗ ΒΑΣΕΙ ΕΠΙΧΕΙΡΗΣΙΑΚΟΥ ΣΧΕΔΙΟΥ V2.0:
                </div>
                {aiQuickPrompts[aiAnswerIdx].answer}
              </div>

              <div className="pt-2">
                <label className="text-[11px] font-mono text-slate-400 block mb-1.5">
                  Ή αναζητήστε λέξη-κλειδί στο σχέδιο (π.χ. Στρατόπεδο, LEADER, ΑΜΚΕ):
                </label>
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Γράψτε ερώτηση..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#c89d54]"
                />
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono font-bold uppercase text-[#b85d3b]">
                ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ & ΑΠΑΝΤΗΣΕΙΣ (FAQ SCHEMA)
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191f]">
                Όλα Όσα Πρέπει να Γνωρίζετε για το «Βροσίνα 2031»
              </h3>

              <div className="space-y-3">
                {FAQ_ITEMS.filter(
                  (f) =>
                    !aiQuery.trim() ||
                    f.question.toLowerCase().includes(aiQuery.toLowerCase()) ||
                    f.answer.toLowerCase().includes(aiQuery.toLowerCase())
                ).map((faq, idx) => (
                  <details
                    key={idx}
                    open={idx === 0}
                    className="group bg-[#f7f5f0] rounded-xl border border-stone-300 p-4"
                  >
                    <summary className="font-serif font-bold text-base text-[#14191f] cursor-pointer list-none flex items-center justify-between gap-2">
                      <span>{faq.question}</span>
                      <span className="text-[#1f5c43] font-mono text-lg group-open:rotate-45 transition">
                        +
                      </span>
                    </summary>
                    <p className="text-xs sm:text-sm text-stone-700 mt-3 leading-relaxed border-t border-stone-200 pt-3">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Vision Speech («Το χωριό που σωπαίνει») */}
          <div className="bg-[#14191f] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#c89d54]/60 space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono text-amber-300 uppercase">
                Ο ΛΟΓΟΣ ΤΟΥ ΟΡΑΜΑΤΟΣ · «ΤΟ ΧΩΡΙΟ ΠΟΥ ΣΩΠΑΙΝΕΙ»
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold">
                «Ό,τι έκλεισε μέσα σε μία γενιά, μπορεί να ξανανοίξει μέσα σε μία ακόμη. Όχι με ευχές. Με σχέδιο.»
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {VISION_SPEECH_SECTIONS.map((sec) => (
                <div
                  key={sec.roman}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3"
                >
                  <div className="font-serif text-amber-300 font-bold text-lg">
                    {sec.roman}. {sec.title}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {sec.paragraphs[0]}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {sec.paragraphs[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER WITH FULL AI-GEO METADATA & LINKS */}
      <footer className="bg-[#0d1115] text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="font-serif font-bold text-lg text-white">
                ΒΡΟΣΙΝΑ 2031
              </div>
              <p className="leading-relaxed">
                Ολοκληρωμένο Στρατηγικό & Επιχειρησιακό Σχέδιο Παραγωγικής,
                Δημογραφικής και Οικιστικής Αναγέννησης της Κοινότητας Βροσίνας
                (Δ.Ε. Μολοσσών, Δήμος Ζίτσας, Π.Ε. Ιωαννίνων, Περιφέρεια
                Ηπείρου).
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-mono font-bold text-white uppercase">
                ΒΑΣΙΚΑ ΤΟΠΟΣΗΜΑ ΒΡΟΣΙΝΑΣ
              </div>
              <ul className="space-y-1">
                <li>• Πρώην Στρατόπεδο «Παπακωνσταντίνου» (13.695 τ.μ.)</li>
                <li>• Πέτρινο Γεφύρι της Βροσίνας (εντός οικισμού)</li>
                <li>• Ιστορικό Ζαλογγογέφυρο (1605)</li>
                <li>• Ιερά Μονή Παναγίας Ραϊδιώτισσας (1628)</li>
                <li>• Ζαλογγίτικος Ποταμός (Παραπόταμος Καλαμά)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-mono font-bold text-white uppercase">
                ΕΠΕΝΔΥΤΙΚΑ & ΘΕΣΜΙΚΑ ΕΡΓΑΛΕΙΑ
              </div>
              <ul className="space-y-1">
                <li>• 1η Πρόσκληση LEADER ΗΠΕΙΡΟΣ Α.Ε. (545/07-10-2026)</li>
                <li>• Αναπτυξιακός Νόμος 4887/2022 (έως 75%)</li>
                <li>• ΚΟΙΝΣΕΠ Συλλογικής & Κοινωνικής Ωφέλειας (Ν.4430/2016)</li>
                <li>• Ταμείο Ευεργετών Βροσίνας (ΑΜΚΕ — Naming Rights)</li>
                <li>• Ενεργειακή Κοινότητα Βροσίνας (150 kWp)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-mono font-bold text-white uppercase">
                ΑΜΕΣΗ ΕΠΙΚΟΙΝΩΝΙΑ & AI INDEXING
              </div>
              <p>Email: {SITE_CONFIG.contact.email}</p>
              <p>Investor Desk: {SITE_CONFIG.contact.investorDeskEmail}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="/llms.txt"
                  className="px-2.5 py-1 rounded bg-slate-800 text-amber-300 hover:bg-slate-700 font-mono"
                >
                  llms.txt
                </a>
                <a
                  href="/llms-full.txt"
                  className="px-2.5 py-1 rounded bg-slate-800 text-amber-300 hover:bg-slate-700 font-mono"
                >
                  llms-full.txt
                </a>
                <a
                  href="/sitemap.xml"
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 font-mono"
                >
                  sitemap.xml
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <span>
              © 2026–2031 Πρωτοβουλία «Βροσίνα 2031» · ΚΟΙΝΣΕΠ Βροσίνας & Ταμείο
              Ευεργετών Βροσίνας.
            </span>
            <span>
              Σχεδιασμένο με πραγματικά δεδομένα πεδίου (ΕΛΣΤΑΤ 2021, ΤΑΕΘΑ,
              ΗΠΕΙΡΟΣ Α.Ε.).
            </span>
          </div>
        </div>
      </footer>

      {/* MODAL FOR INVESTOR / PROPERTY OWNER / PRODUCER REGISTRATION */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-[#14191f] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-300 space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-[#1f5c43] text-white font-mono text-xs font-bold">
                ΜΗΤΡΩΟ ΣΥΜΜΕΤΟΧΗΣ «ΒΡΟΣΙΝΑ 2031»
              </span>
              <button
                onClick={() => {
                  setLeadModalOpen(false);
                  setLeadSubmitted(false);
                }}
                className="text-stone-500 hover:text-stone-900 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {!leadSubmitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setLeadSubmitted(true);
                }}
                className="space-y-4 text-xs sm:text-sm"
              >
                <h3 className="font-serif text-2xl font-bold">
                  Εκδήλωση Ενδιαφέροντος & Θεσμική Επικοινωνία
                </h3>

                <div>
                  <label className="block font-semibold mb-1">
                    Ιδιότητα / Κατηγορία Ενδιαφέροντος:
                  </label>
                  <select
                    value={leadRole}
                    onChange={(e) => setLeadRole(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 bg-stone-50 font-medium"
                  >
                    <option value="investor">
                      Στρατηγικός Επενδυτής / Family Office / Εταιρεία (35%–40% ή LEADER)
                    </option>
                    <option value="benefactor">
                      Μεγάλος Ευεργέτης / Χορηγός Ονοματοδοσίας (ΑΜΚΕ Ταμείο Ευεργετών)
                    </option>
                    <option value="institutional">
                      Θεσμικός / Πολιτικός Φορέας / Αυτοδιοίκηση
                    </option>
                    <option value="owner">
                      Ιδιοκτήτης Κλειστής Κατοικίας ή Καταστήματος στη Βροσίνα
                    </option>
                    <option value="producer">
                      Νέος Κτηνοτρόφος / Αμπελουργός / Τεχνίτης Πέτρας
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">
                      Ονοματεπώνυμο / Φορέας *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="π.χ. Γεώργιος Παπαδόπουλος"
                      className="w-full p-2.5 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Τηλέφωνο Επικοινωνίας *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="π.χ. +30 69..."
                      className="w-full p-2.5 rounded-lg border border-stone-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full p-2.5 rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    Σύντομο Μήνυμα / Περιγραφή Ακινήτου ή Επενδυτικού Προφίλ:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Σημειώστε αν σας ενδιαφέρει το LOI για την Πρόσκληση LEADER (04/02/2027), η ΑΜΚΕ Ευεργετών ή η ένταξη ακινήτου..."
                    className="w-full p-2.5 rounded-lg border border-stone-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#1f5c43] hover:bg-[#174632] text-white font-bold shadow cursor-pointer"
                >
                  Καταχώριση & Αποστολή Φακέλου →
                </button>
              </form>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1f5c43] flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h4 className="font-serif text-2xl font-bold">
                  Η Δήλωσή σας Καταχωρίστηκε!
                </h4>
                <p className="text-xs sm:text-sm text-stone-600">
                  Η ομάδα συντονισμού του «Βροσίνα 2031» θα επικοινωνήσει άμεσα
                  μαζί σας. Μπορείτε παράλληλα να κατεβάσετε το πλήρες
                  Επιχειρησιακό Σχέδιο ή το Πρότυπο LOI LEADER από το Data Room.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <a
                    href="/documents/Vrosina_2031_Business_Plan_v2.pdf"
                    download
                    className="px-4 py-2 rounded-lg bg-[#14191f] text-white text-xs font-semibold"
                  >
                    Λήψη Business Plan (PDF)
                  </a>
                  <button
                    onClick={() => {
                      setLeadModalOpen(false);
                      setLeadSubmitted(false);
                    }}
                    className="px-4 py-2 rounded-lg border border-stone-300 text-xs font-semibold cursor-pointer"
                  >
                    Κλείσιμο
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
