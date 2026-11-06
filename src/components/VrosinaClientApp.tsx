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
  CAMP_VIDEO_AUTOPSY,
} from "@/data/vrosinaData";

export default function VrosinaClientApp() {
  // Mobile navigation drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Hero toggle: "vision" (2031 reality-grounded masterplan) vs "real" (2026 real drone photo)
  const [heroMode, setHeroMode] = useState<"vision" | "real">("vision");
  const [activeHotspotId, setActiveHotspotId] = useState<string>(
    MASTERPLAN_HOTSPOTS[1]?.id || "agrofood-camp"
  );

  // Reality Before/After Comparison state
  const [selectedComparisonIdx, setSelectedComparisonIdx] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(52);

  // Camp Video Autopsy (hwaJv7EIjLg) state
  const [selectedCampStepIdx, setSelectedCampStepIdx] = useState<number>(0);
  const [campVideoStart, setCampVideoStart] = useState<number | null>(null);

  // Active YouTube Video Modal / Inline Player
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Active Pillar tab
  const [activePillarId, setActivePillarId] = useState<string>(
    FOUR_PILLARS[0].id
  );

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

  // FAQ search filter & Quick Q&A state
  const [faqQuery, setFaqQuery] = useState<string>("");
  const [quickQaIdx, setQuickQaIdx] = useState<number>(0);

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

  // Verified Investor Leverage Computation (cross-checked against Business Plan v2.0 Ch. 8, 10, 11, 12)
  const investorSimulation = useMemo(() => {
    if (investorTrack === "strategic") {
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
          "Συμμετοχή στο Τυροκομείο ΠΟΠ (1,65 εκ. €) & στο Οινοποιείο Ντεμπίνας (1,00 εκ. €) στο πρώην Στρατόπεδο Παπακωνσταντίνου",
        grantRateLabel: "Έως 75% (Αναπτυξιακός Ν. 4887/2022 + ΚΑΠ / LEADER)",
        mobilizedCapex: totalProjectCapex,
        publicGrant: stateGrant,
        annualBenefitLabel: "Εκτιμώμενο Μερίδιο Λειτουργικών Κερδών (35% EBITDA)",
        annualBenefitValue: `${estimatedAnnualEbitdaShare.toLocaleString("el-GR")} € / έτος`,
        paybackLabel: `Εκτιμώμενη Απόσβεση Ιδίων Κεφαλαίων: ~${paybackYears} έτη + 100% Εγγυημένο Off-Take ΠΟΠ/ΠΓΕ`,
        perks: [
          "Μόχλευση 1 προς 4: Με 25% ίδια συμμετοχή ενεργοποιείται παραγωγικό πάγιο τετραπλάσιας αξίας.",
          "Εγγυοδοσία Ελληνικής Αναπτυξιακής Τράπεζας (HDB) έως 80% για τον τραπεζικό δανεισμό.",
          "Σύμβαση αποκλειστικής απορρόφησης (Off-Take Agreement) εκλεκτής Φέτας ΠΟΠ & Ντεμπίνας.",
          "Θεσμική συνιδιοκτησία με τον Δήμο Ζίτσας (20%) και τον Συνεταιρισμό Παραγωγών (30%).",
        ],
      };
    }

    if (investorTrack === "agrotourism") {
      const totalProjectCapex = Math.round(investmentAmount / 0.3);
      const stateGrant = totalProjectCapex - investmentAmount;
      const annualNetIncome = Math.round(totalProjectCapex * 0.14);
      const paybackYears = (
        investmentAmount / Math.max(annualNetIncome, 1)
      ).toFixed(1);
      return {
        title: "Επενδυτής Ξενώνων 4 Εποχών & Εμπορικού Πυρήνα (LEADER)",
        subtitle:
          "Ανάπτυξη 10 Παραδοσιακών Ξενώνων (40 κλίνες συνολικά, 1,00 εκ. €) & 5–6 Χώρων Εστίασης/Πωλητηρίου (180 χιλ. €)",
        grantRateLabel: "65% έως 80% (Πρόγραμμα LEADER ΗΠΕΙΡΟΣ Α.Ε. & ΕΣΠΑ)",
        mobilizedCapex: totalProjectCapex,
        publicGrant: stateGrant,
        annualBenefitLabel: "Εκτιμώμενο Ετήσιο Καθαρό Εισόδημα Εκμετάλλευσης",
        annualBenefitValue: `${annualNetIncome.toLocaleString("el-GR")} € / έτος`,
        paybackLabel: `Εκτιμώμενη Απόσβεση Ιδίων Κεφαλαίων: ~${paybackYears} έτη (Συντηρητική–Αισιόδοξη Πληρότητα 14%–35%)`,
        perks: [
          "Επιδότηση έως 80% μέσω της 1ης Πρόσκλησης LEADER (545/07-10-2026) και των επόμενων προκηρύξεων.",
          "Μηδενικό κόστος αγοράς ακινήτου μέσω μακροχρόνιου Master Lease (9–12 έτη) από το Μητρώο Κλειστών Κατοικιών.",
          "Έτοιμη ροή 6.000–15.000 επισκεπτών/έτος από το Αγροδιατροφικό Κέντρο, το Γεφύρι 1605 και τη Μονή Ραϊδιώτισσας.",
          "Μειωμένο ενεργειακό κόστος μέσω της Ενεργειακής Κοινότητας Βροσίνας (150 kWp).",
        ],
      };
    }

    if (investorTrack === "benefactor") {
      const coTriggeredPublicFunds = Math.round(investmentAmount * 3.2);
      const taxDeductionEstimate = Math.round(investmentAmount * 0.22);
      return {
        title: "Μεγάλος Ευεργέτης / Ονοματοδοσία & Εταιρικό ESG («Ταμείο Ευεργετών Βροσίνας» ΑΜΚΕ)",
        subtitle:
          "100% Νόμιμη, Διαφανής Φοροαπαλλασσόμενη Χορηγία / Δωρεά με Εθνικό Κύρος & Θεσμικές Διασυνδέσεις",
        grantRateLabel: "Ξεκλείδωμα 3,2x Δημόσιων Πόρων (Κάλυψη Ιδίας Συμμετοχής Έργων)",
        mobilizedCapex: investmentAmount + coTriggeredPublicFunds,
        publicGrant: coTriggeredPublicFunds,
        annualBenefitLabel: "Άμεσο Φορολογικό Όφελος (ΚΦΕ Ν. 4172/2013 Άρθρα 19 & 22Α)",
        annualBenefitValue: `Έως ${taxDeductionEstimate.toLocaleString("el-GR")} € έκπτωση φόρου`,
        paybackLabel:
          "Ισόβια Ονοματοδοσία (Naming Rights) + Πιστοποιημένο Αποτύπωμα ESG + Θεσμική Αναγνώριση",
        perks: [
          "Ονοματοδοσία (Naming Rights) σε έργα-σύμβολα: Δημοτικό Σχολείο, Κελάρι Παλαίωσης, Παραποτάμιο Μονοπάτι 1605 ή Σχολή Πετράδων.",
          "Πλήρης φορολογική αναγνώριση δωρεάς/χορηγίας μέσω της ΑΜΚΕ «Ταμείο Ευεργετών Βροσίνας» με έλεγχο ορκωτού λογιστή.",
          "Θεσμική συν-παρουσία με Υπουργεία (ΥΠΕΘΑ, ΥΠΑΑΤ), Προεδρία Κυβέρνησης (Ειδική Γραμματεία Ορεινών Περιοχών) & Περιφέρεια Ηπείρου.",
          "Συνέχιση της ιστορικής παράδοσης των Μεγάλων Ηπειρωτών Ευεργετών σε ένα πρότυπο εθνικής εμβέλειας.",
        ],
      };
    }

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

  const executiveAnswers = [
    {
      label: "Πώς επενδύω με επιδότηση έως 75–80%;",
      answer:
        "Το «Βροσίνα 2031» προσφέρει 4 θεσμικά κανάλια: (1) Στρατηγικός Εταίρος (έως 35–40% στην Εμπορική Θυγατρική του Τυροκομείου 1,65 εκ. € & Οινοποιείου 1,00 εκ. €) με επιδότηση έως 75% από τον Αναπτυξιακό Νόμο 4887/2022 και εγγυοδοσία 80% από την HDB. (2) Ιδιωτική επένδυση στους 10 Παραδοσιακούς Ξενώνες (1,00 εκ. €) με επιδότηση 65–80% μέσω LEADER ΗΠΕΙΡΟΣ Α.Ε. (3) Φοροαπαλλασσόμενη Χορηγία / Δωρεά μέσω της ΑΜΚΕ «Ταμείο Ευεργετών Βροσίνας» με δικαίωμα Ονοματοδοσίας (Naming Rights) και ισχυρό ESG αποτύπωμα. (4) Συμμετοχή Επενδυτών Διασποράς (15%).",
    },
    {
      label: "Ποια είναι τα επίσημα στοιχεία της Βροσίνας σήμερα;",
      answer:
        "Η Βροσίνα (έδρα της Δ.Ε. Μολοσσών του Δήμου Ζίτσας) βρίσκεται σε υψόμετρο 117 μ. στην κοιλάδα του Ζαλογγίτικου ποταμού (παραπόταμου του Καλαμά), επί της Ε.Ο. Ιωαννίνων–Ηγουμενίτσας (43 χλμ. / 35–40 λεπτά από τα Ιωάννινα). Κατά την απογραφή ΕΛΣΤΑΤ 2021 αριθμεί 58 μόνιμους κατοίκους στον οικισμό (63 στην Τοπική Κοινότητα). Διαθέτει το ανενεργό Στρατόπεδο «Παπακωνσταντίνου» (13.695 τ.μ.), κλειστό 3θέσιο Δημοτικό Σχολείο, 6 κλειστούς επαγγελματικούς χώρους, το πέτρινο Γεφύρι της Βροσίνας, το Ζαλογγογέφυρο του 1605 και την Ιερά Μονή Παναγίας Ραϊδιώτισσας (1628).",
    },
    {
      label: "Πώς κλειδώνει η Καταστατική Ασπίδα (Κεφ. 8);",
      answer:
        "Μητρικός φορέας-θεματοφύλακας είναι η «Βροσίνα Αγροδιατροφική ΚΟΙΝΣΕΠ Συλλογικής και Κοινωνικής Ωφέλειας» (Ν. 4430/2016). Στην Εμπορική Θυγατρική συμμετέχουν: 30% Συνεταιρισμός Παραγωγών, 35% Στρατηγικός Εταίρος, 20% Δήμος Ζίτσας και 15% Ταμείο Ευεργετών/Διασπορά. Ισχύει ανώτατο όριο μετόχου 40%, υπερπλειοψηφία 75%+ για κρίσιμες αποφάσεις, δικαίωμα πρώτης άρνησης (ROFR), τεχνοκρατική διοίκηση με ανοιχτή προκήρυξη και υποχρεωτικό Κοινωνικό Μέρισμα 15% στην κοινότητα.",
    },
    {
      label: "Έχω κλειστό σπίτι στη Βροσίνα — τι κερδίζω;",
      answer:
        "Εγγράφετε το ακίνητό σας στο Μητρώο Κλειστών Κατοικιών & Καταστημάτων. Με σύμβαση Master Lease (9–12 ετών), ο φορέας αναλαμβάνει την πλήρη αποκατάσταση με 0 € δική σας επιβάρυνση (Κατηγορία Α: 20.000 €, Κατηγορία Β με λιθεπένδυση & κεραμίδι: 37.500 €, Κατηγορία Γ με γκρίζα λιθόπλακα: 50.000 €), με επιδότηση 60–80%, απαλλαγή δημοτικών τελών/ΤΑΠ και εγγυημένο εισόδημα.",
    },
  ];

  const navItems = [
    { href: "#autopsia-real", label: "Αυτοψία & Στρατόπεδο" },
    { href: "#masterplan", label: "Οι 4 Πυλώνες" },
    { href: "#investors", label: "Επενδύσεις & Χορηγίες" },
    { href: "#governance", label: "Διακυβέρνηση & Φορείς" },
    { href: "#community", label: "Κατοικία & Παραγωγοί" },
    { href: "#dataroom", label: "Data Room" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#1a2129] font-sans overflow-x-hidden">
      {/* 1. SUBTLE INSTITUTIONAL TOP BAR: LEADER CALL 545/07-10-2026 */}
      <div className="bg-[#14191f] text-stone-300 border-b border-stone-800 px-4 py-1.5 text-[11px] sm:text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono uppercase tracking-wider text-[#c89d54] font-semibold">
              ΕΝΕΡΓΗ ΠΡΟΣΚΛΗΣΗ LEADER
            </span>
            <span className="text-stone-400 hidden sm:inline">|</span>
            <span>
              ΗΠΕΙΡΟΣ Α.Ε. (Αρ. Πρωτ.{" "}
              <strong className="font-mono text-white">
                {SITE_CONFIG.leaderCall.code}
              </strong>
              ) — Προθεσμία:{" "}
              <strong className="text-white">
                {SITE_CONFIG.leaderCall.deadlineDisplay}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/documents/Vrosina_2031_Partner_LOI_LEADER_Template.docx"
              download
              className="text-[#c89d54] hover:text-amber-200 underline font-medium transition"
            >
              Λήψη Προτύπου LOI (.docx)
            </a>
            <a
              href="/documents/Vrosina_2031_Business_Plan_v2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline text-stone-300 hover:text-white underline transition"
            >
              Πλήρες Business Plan v2.0 (.pdf)
            </a>
          </div>
        </div>
      </div>

      {/* 2. CLEAN, QUIET HEADER (OPTIMIZED FOR LAPTOP & MOBILE) */}
      <header className="sticky top-0 z-40 bg-[#f7f5f0]/95 backdrop-blur-md border-b border-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          {/* Minimalist Logo: ΒΡΟΣΙΝΑ2031 */}
          <a
            href="#"
            className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-[#14191f] shrink-0"
          >
            ΒΡΟΣΙΝΑ<span className="text-[#b85d3b]">2031</span>
          </a>

          {/* Clean Laptop/Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] xl:text-sm font-medium text-stone-700">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[#14191f] hover:underline underline-offset-8 decoration-[#b85d3b] decoration-2 transition whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Single Clean CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                setLeadRole("investor");
                setLeadModalOpen(true);
              }}
              className="px-3.5 sm:px-4 py-2 rounded bg-[#14191f] text-white text-xs sm:text-[13px] font-semibold hover:bg-[#1f5c43] transition cursor-pointer whitespace-nowrap"
            >
              Συμμετοχή / Επικοινωνία
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Άνοιγμα Μενού"
              className="lg:hidden px-2.5 py-1.5 rounded border border-stone-400 text-stone-800 text-xs font-mono font-bold hover:bg-stone-200 cursor-pointer"
            >
              {mobileMenuOpen ? "✕" : "ΜΕΝΟΥ"}
            </button>
          </div>
        </div>

        {/* Responsive Mobile/Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#f7f5f0] border-b border-stone-300 px-4 py-4 space-y-2 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded bg-white border border-stone-200 text-sm font-semibold text-[#14191f] hover:border-[#b85d3b]"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="pt-2 flex flex-wrap gap-2 border-t border-stone-200 text-xs">
              <a
                href="/documents/Vrosina_2031_Business_Plan_v2.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded bg-stone-200 text-stone-900 font-semibold"
              >
                Λήψη Business Plan (PDF)
              </a>
              <a
                href="/documents/Vrosina_2031_Partner_LOI_LEADER_Template.docx"
                download
                className="px-3 py-2 rounded bg-amber-100 text-amber-950 font-semibold"
              >
                Λήψη LOI LEADER (.docx)
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION: EDITORIAL ARCHITECTURAL LAYOUT */}
      <section className="bg-[#14191f] text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Narrative & Audience Pathways */}
            <div className="lg:col-span-5 space-y-5">
              <div className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#c89d54] border-l-2 border-[#c89d54] pl-3">
                ΔΗΜΟΣ ΖΙΤΣΑΣ · Δ.Ε. ΜΟΛΟΣΣΩΝ · Π.Ε. ΙΩΑΝΝΙΝΩΝ · ΕΚΔΟΣΗ 2.0
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl xl:text-[40px] font-bold leading-[1.16] tracking-tight text-white">
                Από σύμβολο εγκατάλειψης, σε εθνικό πρότυπο αναγέννησης.
              </h1>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Ολοκληρωμένο πενταετές επιχειρησιακό σχέδιο{" "}
                <strong className="text-white">10,45 εκατ. €</strong> (63%
                δημόσιοι/ΕΕ πόροι · 37% ιδιωτικά/συνεταιριστικά κεφάλαια) στη
                Βροσίνα Ιωαννίνων (43 χλμ. από τα Ιωάννινα, υψόμετρο 117 μ.).
                Μετατρέπει το ανενεργό{" "}
                <strong className="text-amber-200">
                  Στρατόπεδο «Παπακωνσταντίνου» (13.695 τ.μ.)
                </strong>{" "}
                σε Αγροδιατροφικό Κέντρο ΠΟΠ/ΠΓΕ, αποκαθιστά{" "}
                <strong className="text-white">20 κατοικίες & 10 ξενώνες</strong>
                , επαναλειτουργεί το σχολείο και δημιουργεί{" "}
                <strong className="text-white">50 μόνιμες θέσεις εργασίας</strong>.
              </p>

              {/* Clean Architectural Index of Audiences */}
              <div className="border-t border-b border-stone-800 py-4 space-y-2.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                  ΑΠΕΥΘΕΙΑΣ ΠΡΟΣΒΑΣΗ ΑΝΑ ΕΝΔΙΑΦΕΡΟΜΕΝΟ ΜΕΡΟΣ:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <a
                    href="#investors"
                    className="flex items-center justify-between px-3 py-2.5 rounded bg-stone-900 border border-[#c89d54]/50 text-amber-100 hover:bg-stone-800 transition font-medium"
                  >
                    <span>01. Επενδυτές & Μεγάλοι Ευεργέτες</span>
                    <span className="font-mono text-[#c89d54]">→</span>
                  </a>
                  <a
                    href="#governance"
                    className="flex items-center justify-between px-3 py-2.5 rounded bg-stone-900 border border-stone-800 hover:border-stone-600 text-stone-200 transition font-medium"
                  >
                    <span>02. Υπουργεία, Αυτοδιοίκηση & Βουλευτές</span>
                    <span className="font-mono text-stone-400">→</span>
                  </a>
                  <a
                    href="#community"
                    className="flex items-center justify-between px-3 py-2.5 rounded bg-stone-900 border border-stone-800 hover:border-stone-600 text-stone-200 transition font-medium"
                  >
                    <span>03. Ιδιοκτήτες Κλειστών Κατοικιών</span>
                    <span className="font-mono text-stone-400">→</span>
                  </a>
                  <a
                    href="#community"
                    className="flex items-center justify-between px-3 py-2.5 rounded bg-stone-900 border border-stone-800 hover:border-stone-600 text-stone-200 transition font-medium"
                  >
                    <span>04. Νέοι Κτηνοτρόφοι & Αμπελουργοί</span>
                    <span className="font-mono text-stone-400">→</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#autopsia-real"
                  className="px-4 sm:px-5 py-2.5 rounded bg-[#b85d3b] hover:bg-[#a04e2f] text-white font-semibold text-xs sm:text-sm transition"
                >
                  Αυτοψία Πεδίου & Βίντεο Στρατοπέδου
                </a>
                <a
                  href="#investors"
                  className="px-4 sm:px-5 py-2.5 rounded bg-transparent hover:bg-white/5 border border-stone-600 text-stone-200 font-semibold text-xs sm:text-sm transition"
                >
                  Υπολογιστής Επιδοτήσεων (έως 80%)
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Aerial Map (Real Drone Photo vs Reality-Grounded 2031 Masterplan) */}
            <div className="lg:col-span-7">
              <div className="bg-stone-950 border border-stone-800 rounded-lg overflow-hidden shadow-xl">
                <div className="px-3 sm:px-4 py-2.5 bg-stone-900 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-stone-300 uppercase">
                    {heroMode === "vision"
                      ? "ΧΑΡΤΗΣ 2031 (ΒΑΣΙΣΜΕΝΟΣ ΣΤΗΝ ΠΡΑΓΜΑΤΙΚΗ ΑΕΡΟΦΩΤΟΓΡΑΦΙΑ)"
                      : "ΠΡΑΓΜΑΤΙΚΗ ΑΕΡΟΦΩΤΟΓΡΑΦΙΑ ΒΡΟΣΙΝΑΣ ΣΗΜΕΡΑ (DRONE)"}
                  </span>
                  <div className="inline-flex rounded bg-stone-950 p-0.5 text-[11px] border border-stone-800">
                    <button
                      onClick={() => setHeroMode("real")}
                      className={`px-2.5 py-1 rounded-xs font-semibold transition cursor-pointer ${
                        heroMode === "real"
                          ? "bg-[#b85d3b] text-white"
                          : "text-stone-400 hover:text-white"
                      }`}
                    >
                      Σήμερα (Drone)
                    </button>
                    <button
                      onClick={() => setHeroMode("vision")}
                      className={`px-2.5 py-1 rounded-xs font-semibold transition cursor-pointer ${
                        heroMode === "vision"
                          ? "bg-[#1f5c43] text-white"
                          : "text-stone-400 hover:text-white"
                      }`}
                    >
                      Σχέδιο 2031
                    </button>
                  </div>
                </div>

                {/* Image + Interactive Hotspots */}
                <div className="relative aspect-16/10 w-full bg-stone-950 overflow-hidden">
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

                  {MASTERPLAN_HOTSPOTS.map((spot, idx) => {
                    const isSelected = spot.id === activeHotspot.id;
                    return (
                      <button
                        key={spot.id}
                        onClick={() => setActiveHotspotId(spot.id)}
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform ${
                          isSelected ? "scale-125 z-20" : "hover:scale-110 z-10"
                        }`}
                        title={spot.title}
                      >
                        <span
                          className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-mono text-xs font-bold shadow-md border ${
                            isSelected
                              ? "bg-[#c89d54] text-stone-950 border-white"
                              : "bg-[#14191f]/90 text-white border-[#c89d54]"
                          }`}
                        >
                          {idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Hotspot Info Strip Below Image (Clean & Never Overlaps Mobile Image) */}
                <div className="p-3.5 sm:p-4 bg-stone-900 border-t border-stone-800 text-xs space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[#c89d54] font-bold">
                      ΣΗΜΕΙΟ ΧΑΡΤΗ: {activeHotspot.title}
                    </span>
                    <span className="font-mono text-emerald-300">
                      CAPEX: {activeHotspot.capex}
                    </span>
                  </div>
                  <p className="text-stone-300 leading-relaxed">
                    {activeHotspot.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400 pt-1 border-t border-stone-800">
                    <span>Χρηματοδότηση: {activeHotspot.funding}</span>
                    <span>Επιλέξτε τους αριθμούς (1–6) πάνω στην αεροφωτογραφία</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 KPI Counter Cards */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {HERO_KPIS.map((kpi, i) => (
              <div
                key={i}
                className="bg-stone-900/90 border border-stone-800 rounded p-3.5 sm:p-4"
              >
                <div className="font-mono text-xl sm:text-2xl font-bold text-[#c89d54]">
                  {kpi.value}
                </div>
                <div className="text-xs font-semibold text-white mt-1">
                  {kpi.label}
                </div>
                <div className="text-[11px] text-stone-400 mt-1 leading-snug">
                  {kpi.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION 1 (#autopsia-real): FIELD AUTOPSY, BEFORE/AFTER SLIDER, 8-BUILDING CAMP TOUR & 6 VIDEOS */}
      <section
        id="autopsia-real"
        className="py-12 sm:py-16 lg:py-20 bg-[#ebe6dc] border-b border-stone-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* Section Header */}
          <div className="max-w-3xl space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#b85d3b]">
              01 / ΤΕΚΜΗΡΙΩΣΗ ΠΕΔΙΟΥ, ΦΩΤΟΓΡΑΦΙΕΣ & ΑΥΤΟΨΙΑ ΣΤΡΑΤΟΠΕΔΟΥ
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f]">
              Η Πραγματική Βροσίνα Σήμερα & η Ρεαλιστική Μεταμόρφωση του 2031
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Κάθε πρόταση του σχεδίου «Βροσίνα 2031» βασίζεται{" "}
              <strong>
                αποκλειστικά στα υφιστάμενα κτίρια, τις κεραμοσκεπές, το πρώην
                Στρατόπεδο «Παπακωνσταντίνου» (13.695 τ.μ.), τα δύο ιστορικά
                πέτρινα γεφύρια και τη Μονή Παναγίας Ραϊδιώτισσας
              </strong>
              . Σύρετε τη γραμμή σύγκρισης για να εξετάσετε το «Σήμερα» δίπλα στο
              «2031».
            </p>
          </div>

          {/* Interactive Before/After Comparison Slider */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Selector Tabs on Left */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-600 font-bold mb-1">
                ΕΠΙΛΕΞΤΕ ΣΗΜΕΙΟ ΣΥΓΚΡΙΣΗΣ (4 ΤΟΠΟΘΕΣΙΕΣ):
              </div>
              {REAL_VS_2031_COMPARISONS.map((comp, idx) => {
                const active = idx === selectedComparisonIdx;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComparisonIdx(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded border transition cursor-pointer ${
                      active
                        ? "bg-[#14191f] text-white border-[#14191f] shadow-sm"
                        : "bg-white hover:bg-stone-50 text-stone-800 border-stone-300"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-mono font-bold ${
                          active ? "text-[#c89d54]" : "text-[#b85d3b]"
                        }`}
                      >
                        ΤΟΠΟΘΕΣΙΑ 0{idx + 1}
                      </span>
                      <span
                        className={`text-[11px] font-mono ${
                          active ? "text-stone-300" : "text-stone-600"
                        }`}
                      >
                        {comp.capex}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-sm sm:text-base mt-1">
                      {comp.title}
                    </h3>
                    <p
                      className={`text-xs mt-1 ${
                        active ? "text-stone-300" : "text-stone-600"
                      }`}
                    >
                      {comp.subtitle}
                    </p>
                  </button>
                );
              })}

              {/* Verified Facts Box from Appendix Γ */}
              <div className="bg-white rounded p-4 sm:p-5 border border-stone-300 space-y-2 text-xs">
                <div className="font-mono font-bold text-[#1f5c43] uppercase">
                  ΕΠΙΣΗΜΑ ΣΤΟΙΧΕΙΑ ΜΗΤΡΩΟΥ (ΠΑΡΑΡΤΗΜΑ Γ & ΕΛΣΤΑΤ):
                </div>
                <ul className="space-y-1.5 text-stone-700">
                  <li>
                    • <strong>Πληθυσμός ΕΛΣΤΑΤ 2021:</strong> 58 μόνιμοι κάτοικοι
                    στον οικισμό Βροσίνας (63 στην Τοπική Κοινότητα).
                  </li>
                  <li>
                    • <strong>Πρώην Στρατόπεδο:</strong> «Στρατόπεδο
                    Παπακωνσταντίνου», έκταση <strong>13.695 τ.μ.</strong>{" "}
                    (ιδιοκτησία Τ.Α.ΕΘ.Α.).
                  </li>
                  <li>
                    • <strong>Απόσταση:</strong> 43 χλμ. (35–40 λεπτά) από τα
                    Ιωάννινα επί της Ε.Ο. Ιωαννίνων–Ηγουμενίτσας.
                  </li>
                  <li>
                    • <strong>Ποταμός & Γεφύρια:</strong> Ζαλογγίτικος Ποταμός
                    (παραπόταμος Καλαμά), Γεφύρι της Βροσίνας (άνοιγμα 10,30 μ.)
                    & Ζαλογγογέφυρο του 1605 (άνοιγμα 11,30 μ., ύψος 8,00 μ.).
                  </li>
                </ul>
              </div>
            </div>

            {/* Interactive Split Image Viewer on Right */}
            <div className="lg:col-span-7 bg-white rounded border border-stone-300 shadow-md overflow-hidden">
              <div className="p-3.5 sm:p-4 bg-[#14191f] text-white flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-mono text-[#c89d54] block">
                    ΣΥΓΚΡΙΣΗ ΠΡΑΓΜΑΤΙΚΟΤΗΤΑΣ ΣΗΜΕΡΑ ↔ ΣΧΕΔΙΟΥ 2031
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg">
                    {activeComparison.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  <button
                    onClick={() => setSliderPosition(15)}
                    className="px-2.5 py-1 rounded-xs bg-[#1f5c43] text-white cursor-pointer"
                  >
                    2031
                  </button>
                  <button
                    onClick={() => setSliderPosition(50)}
                    className="px-2.5 py-1 rounded-xs bg-stone-700 text-white cursor-pointer"
                  >
                    50/50
                  </button>
                  <button
                    onClick={() => setSliderPosition(85)}
                    className="px-2.5 py-1 rounded-xs bg-[#b85d3b] text-white cursor-pointer"
                  >
                    Σήμερα
                  </button>
                </div>
              </div>

              {/* Before / After Container */}
              <div className="relative aspect-16/10 w-full select-none overflow-hidden bg-stone-900">
                <img
                  src={activeComparison.visionImage}
                  alt={activeComparison.visionCaption}
                  className="absolute inset-0 w-full h-full object-cover"
                />

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

                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.8)] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#14191f] text-white border-2 border-white font-mono text-xs flex items-center justify-center shadow-lg">
                    ↔
                  </div>
                </div>

                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-xs bg-[#14191f]/90 text-white text-[11px] font-mono">
                  ΣΗΜΕΡΑ
                </div>
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-xs bg-[#1f5c43]/95 text-white text-[11px] font-mono">
                  ΣΧΕΔΙΟ 2031
                </div>

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
              <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-stone-50 border-t border-stone-200 text-xs">
                <div className="p-3 bg-white border border-stone-200 border-l-4 border-l-[#b85d3b]">
                  <div className="font-mono font-bold text-[#b85d3b] mb-1">
                    ΑΥΤΟΨΙΑ ΣΗΜΕΡΑ:
                  </div>
                  <p className="text-stone-700 leading-relaxed">
                    {activeComparison.realCaption}
                  </p>
                </div>
                <div className="p-3 bg-white border border-stone-200 border-l-4 border-l-[#1f5c43]">
                  <div className="font-mono font-bold text-[#1f5c43] mb-1">
                    ΑΠΟΚΑΤΑΣΤΑΣΗ 2031:
                  </div>
                  <p className="text-stone-700 leading-relaxed">
                    {activeComparison.visionCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DEDICATED INCH-BY-INCH CAMP VIDEO AUTOPSY (hwaJv7EIjLg - 8 BUILDINGS/ZONES) */}
          <div className="bg-[#14191f] text-white rounded-lg p-5 sm:p-8 lg:p-10 border border-stone-700 shadow-xl space-y-6 sm:space-y-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-800 pb-5">
              <div className="max-w-3xl space-y-2">
                <div className="text-xs font-mono text-[#c89d54] uppercase tracking-wider">
                  ΒΙΝΤΕΟ-ΑΥΤΟΨΙΑ ΣΠΙΘΑΜΗ ΠΡΟΣ ΣΠΙΘΑΜΗ (12:31) · {CAMP_VIDEO_AUTOPSY.officialCampName}
                </div>
                <h3 className="font-serif text-xl sm:text-3xl font-bold text-white">
                  Ακτινογραφία των 8 Κτιρίων του Στρατοπέδου (13.695 τ.μ.): Σημερινή Κατάσταση & Χρήση το 2031
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {CAMP_VIDEO_AUTOPSY.executiveSummary}
                </p>
              </div>
              <div className="bg-stone-900 border border-stone-800 rounded p-3 text-xs font-mono shrink-0">
                <div className="text-[#c89d54] font-bold">ΤΕΚΜΗΡΙΟ ΠΕΔΙΟΥ:</div>
                <div className="text-white mt-0.5">{CAMP_VIDEO_AUTOPSY.creator}</div>
                <div className="text-stone-400">Διάρκεια: {CAMP_VIDEO_AUTOPSY.duration}</div>
              </div>
            </div>

            {/* 8 Timestamped Building/Zone Selector Grid */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase text-stone-400">
                ΕΠΙΛΕΞΤΕ ΚΤΙΡΙΟ / ΖΩΝΗ (ΜΕΤΑΦΕΡΕΙ ΑΥΤΟΜΑΤΑ ΤΟ ΒΙΝΤΕΟ ΣΤΟ ΑΚΡΙΒΕΣ ΛΕΠΤΟ):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {CAMP_VIDEO_AUTOPSY.steps.map((st, idx) => {
                  const isSelected = idx === selectedCampStepIdx;
                  return (
                    <button
                      key={st.id}
                      onClick={() => {
                        setSelectedCampStepIdx(idx);
                        setCampVideoStart(st.startSeconds);
                      }}
                      className={`p-3 rounded border text-left transition cursor-pointer ${
                        isSelected
                          ? "bg-[#c89d54] text-stone-950 border-white font-bold"
                          : "bg-stone-900 hover:bg-stone-800 text-stone-200 border-stone-800"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span
                          className={
                            isSelected ? "text-stone-950 font-bold" : "text-[#c89d54]"
                          }
                        >
                          ΚΤΙΡΙΟ {st.stepNumber}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded-xs ${
                            isSelected
                              ? "bg-stone-950 text-[#c89d54]"
                              : "bg-stone-800 text-stone-300"
                          }`}
                        >
                          {st.timeDisplay}
                        </span>
                      </div>
                      <div className="font-serif font-bold text-xs sm:text-sm mt-1 line-clamp-2">
                        {st.buildingTitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Split: Embedded Timestamped YouTube Player + Building Autopsy Card */}
            {(() => {
              const currentStep = CAMP_VIDEO_AUTOPSY.steps[selectedCampStepIdx];
              const embedSrc =
                campVideoStart !== null
                  ? `https://www.youtube.com/embed/${CAMP_VIDEO_AUTOPSY.videoId}?start=${campVideoStart}&autoplay=1&rel=0`
                  : `https://www.youtube.com/embed/${CAMP_VIDEO_AUTOPSY.videoId}?start=${currentStep.startSeconds}&rel=0`;
              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* Left: Embedded YouTube Player + Frame Capture */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="aspect-video w-full rounded overflow-hidden bg-black border border-stone-700">
                      <iframe
                        key={campVideoStart ?? "initial"}
                        src={embedSrc}
                        title={CAMP_VIDEO_AUTOPSY.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </div>

                    <div className="bg-stone-900 border border-stone-800 rounded p-3 flex flex-col sm:flex-row sm:items-center gap-3">
                      {currentStep.imageType === "direct" ? (
                        <img
                          src={currentStep.imageSrc}
                          alt={currentStep.buildingTitle}
                          className="w-full sm:w-32 h-32 sm:h-20 rounded object-cover border border-stone-700 shrink-0"
                        />
                      ) : (
                        <div
                          className="w-full sm:w-32 h-32 sm:h-20 rounded border border-stone-700 shrink-0 bg-no-repeat"
                          style={{
                            backgroundImage: `url(${currentStep.imageSrc})`,
                            backgroundSize: "300% 300%",
                            backgroundPosition: currentStep.spritePos || "0% 0%",
                          }}
                        />
                      )}
                      <div className="text-xs space-y-1">
                        <div className="font-mono text-[#c89d54] font-bold">
                          ΣΤΙΓΜΙΟΤΥΠΟ ΑΥΤΟΨΙΑΣ ({currentStep.timeDisplay}):
                        </div>
                        <div className="text-white font-semibold">
                          {currentStep.buildingTitle}
                        </div>
                        <div className="text-stone-400">
                          Δομική Κατάσταση: {currentStep.structuralStatus}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Detailed Building Analysis (Today vs 2031 Transformation) */}
                  <div className="lg:col-span-6 bg-stone-900 border border-stone-800 rounded p-5 sm:p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3 text-xs font-mono">
                      <span className="text-[#c89d54] font-bold">
                        ΖΩΝΗ {currentStep.stepNumber} · {currentStep.timeDisplay}
                      </span>
                      <span className="text-stone-400">
                        Πρώην Ρόλος: {currentStep.originalMilitaryRole}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg sm:text-2xl font-bold text-white">
                      {currentStep.buildingTitle}
                    </h4>

                    <div className="p-3.5 sm:p-4 bg-stone-950 border-l-4 border-[#b85d3b] space-y-1">
                      <div className="text-[11px] font-mono font-bold text-[#b85d3b] uppercase">
                        ΚΑΤΑΓΡΑΦΗ ΑΥΤΟΨΙΑΣ ΣΗΜΕΡΑ:
                      </div>
                      <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                        {currentStep.currentAutopsy}
                      </p>
                    </div>

                    <div className="p-3.5 sm:p-4 bg-stone-950 border-l-4 border-[#1f5c43] space-y-1">
                      <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase">
                        ΧΡΗΣΗ ΣΤΟ «ΒΡΟΣΙΝΑ 2031»: {currentStep.future2031Role}
                      </div>
                      <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                        {currentStep.future2031Details}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-800 text-xs font-mono">
                      <div>
                        <span className="text-stone-400">Κονδύλι CAPEX: </span>
                        <strong className="text-[#c89d54]">
                          {currentStep.capexAllocation}
                        </strong>
                      </div>
                      <button
                        onClick={() => setCampVideoStart(currentStep.startSeconds)}
                        className="px-3.5 py-1.5 rounded bg-[#b85d3b] hover:bg-[#a04e2f] text-white font-semibold transition cursor-pointer"
                      >
                        Προβολή στο {currentStep.timeDisplay.split(" ")[0]}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 6 REAL YOUTUBE DRONE & FIELD VIDEOS GRID */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
                  ΟΠΤΙΚΟΑΚΟΥΣΤΙΚΟ ΑΡΧΕΙΟ · 6 ΒΙΝΤΕΟ DRONE & ΟΔΟΙΠΟΡΙΚΑ
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f] mt-1">
                  Πτήσεις Drone πάνω από τον Οικισμό, τη Μονή Ραϊδιώτισσας & τα Γεφύρια
                </h3>
              </div>
              {activeVideoId && (
                <button
                  onClick={() => setActiveVideoId(null)}
                  className="px-3.5 py-1.5 rounded bg-stone-800 text-white text-xs font-semibold hover:bg-stone-700 cursor-pointer"
                >
                  Κλείσιμο Video Player
                </button>
              )}
            </div>

            {activeVideoId && (
              <div className="bg-[#14191f] p-3 sm:p-4 rounded border border-[#c89d54] shadow-xl">
                <div className="aspect-video w-full rounded overflow-hidden bg-black">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {REAL_VROSINA_VIDEOS.map((video) => {
                const isPlaying = activeVideoId === video.id;
                return (
                  <div
                    key={video.id}
                    className={`bg-white rounded overflow-hidden border transition flex flex-col justify-between ${
                      isPlaying
                        ? "border-[#14191f] ring-2 ring-[#c89d54]"
                        : "border-stone-300 hover:border-stone-400"
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
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition flex items-center justify-center">
                          <div className="px-3 py-1.5 rounded bg-[#14191f]/90 text-white font-mono text-xs font-semibold border border-white/30">
                            ΑΝΑΠΑΡΑΓΩΓΗ
                          </div>
                        </div>
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-xs bg-black/80 text-[#c89d54] font-mono text-[10px]">
                          {video.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#14191f] leading-snug">
                          {video.title}
                        </h4>
                        <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                          {video.description}
                        </p>
                      </div>
                    </div>
                    <div className="px-4 pb-3 pt-2 flex items-center justify-between border-t border-stone-200 text-xs">
                      <button
                        onClick={() => setActiveVideoId(video.id)}
                        className="font-semibold text-[#1f5c43] hover:underline cursor-pointer"
                      >
                        {isPlaying ? "Ενεργή προβολή" : "Προβολή στη σελίδα"}
                      </button>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-500 hover:text-stone-800 font-mono text-[11px]"
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
      <section id="masterplan" className="py-12 sm:py-16 lg:py-20 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#1f5c43]">
              02 / ΑΡΧΙΤΕΚΤΟΝΙΚΗ ΤΟΥ ΣΧΕΔΙΟΥ · 4 ΑΛΛΗΛΕΝΔΕΤΟΙ ΠΥΛΩΝΕΣ
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f]">
              Από τη Γη, στο Ράφι, στο Χωριό: Το Οικοσύστημα των 10,45 εκ. €
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Οι κτηνοτρόφοι και οι αμπελουργοί (Πυλώνας 2) τροφοδοτούν το
              Τυροκομείο και το Οινοποιείο στο πρώην Στρατόπεδο (Πυλώνας 1), οι
              εργαζόμενοι κατοικούν στα ανακαινισμένα σπίτια με ανοιχτό σχολείο
              (Πυλώνας 3), και οι επισκέπτες του Γεφυριού 1605 και της Μονής
              Ραϊδιώτισσας (Πυλώνας 4) καταναλώνουν τα προϊόντα στον τόπο
              παραγωγής τους.
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
                  className={`p-4 rounded border text-left transition cursor-pointer ${
                    active
                      ? "bg-[#14191f] text-white border-[#14191f]"
                      : "bg-white hover:bg-stone-100 text-stone-800 border-stone-300"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span
                      className={active ? "text-[#c89d54]" : "text-[#b85d3b]"}
                    >
                      ΠΥΛΩΝΑΣ {pillar.number}
                    </span>
                    <span className="font-bold">{pillar.budget}</span>
                  </div>
                  <div className="font-serif font-bold text-sm sm:text-base mt-1.5">
                    {pillar.title}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      active ? "text-stone-300" : "text-stone-500"
                    }`}
                  >
                    Ενίσχυση: {pillar.subsidyRate}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Detail Card */}
          <div className="bg-white rounded border border-stone-300 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 bg-stone-900 flex flex-col justify-between">
              <div className="relative aspect-16/11 w-full">
                <img
                  src={activePillar.heroImage}
                  alt={activePillar.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded bg-black/85 text-white text-xs">
                  <div className="font-mono text-[#c89d54] font-bold">
                    ΠΥΛΩΝΑΣ {activePillar.number} · {activePillar.budget}
                  </div>
                  <div>{activePillar.subtitle}</div>
                </div>
              </div>
              {activePillar.secondaryImage && (
                <div className="p-4 bg-[#14191f] text-white border-t border-stone-800 flex items-center gap-4">
                  <img
                    src={activePillar.secondaryImage}
                    alt={activePillar.title}
                    className="w-24 h-16 rounded object-cover border border-stone-700 shrink-0"
                  />
                  <div className="text-xs text-stone-300">
                    <strong className="text-[#c89d54] block">
                      Θεσμικό & Χρηματοδοτικό Πλαίσιο:
                    </strong>
                    {activePillar.legalFramework}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#1f5c43] font-bold uppercase">
                  ΠΡΟΫΠΟΛΟΓΙΣΜΟΣ: {activePillar.budget} · ΕΠΙΔΟΤΗΣΗ:{" "}
                  {activePillar.subsidyRate}
                </div>
                <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#14191f]">
                  {activePillar.title}
                </h3>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  {activePillar.summary}
                </p>

                <div className="space-y-2 pt-1">
                  <div className="text-xs font-mono font-bold uppercase text-stone-500">
                    ΚΥΡΙΕΣ ΠΑΡΕΜΒΑΣΕΙΣ & ΥΠΟΕΡΓΑ:
                  </div>
                  <ul className="grid grid-cols-1 gap-2">
                    {activePillar.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800 bg-stone-50 p-2.5 rounded border border-stone-200"
                      >
                        <span className="font-mono text-[#1f5c43] font-bold">
                          0{i + 1}.
                        </span>
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
                    className="bg-stone-100 rounded p-3 border border-stone-200"
                  >
                    <div className="font-mono font-bold text-sm sm:text-base text-[#14191f]">
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
          <div className="bg-white rounded p-5 sm:p-8 border border-stone-300 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono uppercase text-[#b85d3b] font-bold">
                  ΧΡΟΝΟΔΙΑΓΡΑΜΜΑ ΥΛΟΠΟΙΗΣΗΣ & ΚΛΙΜΑΚΩΣΗΣ (2026–2031)
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
                  Η Πενταετής Διαδρομή προς την Ωριμότητα (Έτος 1 έως Έτος 5)
                </h3>
              </div>
              <span className="text-xs font-mono bg-stone-100 px-3 py-1.5 rounded border border-stone-300">
                Στόχος Έτους 5: 2.550.000 € Κύκλος Εργασιών · 50 Θέσεις Εργασίας
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {FIVE_YEAR_RAMPUP.map((step, i) => (
                <div
                  key={i}
                  className="rounded p-4 bg-[#f7f5f0] border border-stone-300 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-[#1f5c43]">
                      <span>{step.year}</span>
                      <span>{step.jobs} θέσεις</span>
                    </div>
                    <div className="font-mono text-base sm:text-lg font-bold text-[#14191f] mt-1.5">
                      Έσοδα: {step.revenue}
                    </div>
                    <p className="text-xs text-stone-700 mt-2 leading-relaxed">
                      {step.milestones}
                    </p>
                  </div>
                  <div className="w-full bg-stone-300 h-1 rounded-full overflow-hidden">
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
        className="py-12 sm:py-16 lg:py-20 bg-[#14191f] text-white border-y border-stone-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#c89d54]">
              03 / ΕΠΕΝΔΥΤΙΚΟ, ΣΤΡΑΤΗΓΙΚΟ & ΧΟΡΗΓΙΚΟ DESK
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Μόχλευση Κεφαλαίου 1 προς 4, Επιδοτήσεις έως 80% & Θεσμικό Κύρος
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Είτε είστε <strong>στρατηγικός επενδυτής αγροδιατροφής</strong>{" "}
              που αναζητά πρώτη ύλη ΠΟΠ/ΠΓΕ με επιδότηση CAPEX έως 75%, είτε{" "}
              <strong>μεγάλος ευεργέτης / family office / όμιλος</strong> που
              επιδιώκει 100% νόμιμη φοροαπαλλασσόμενη χορηγία, ισόβια{" "}
              <strong>Ονοματοδοσία (Naming Rights)</strong>, πιστοποιημένο{" "}
              <strong>ESG Impact</strong> και θεσμική δικτύωση κορυφής, το
              «Βροσίνα 2031» διαθέτει έτοιμο, θωρακισμένο όχημα.
            </p>
          </div>

          {/* Interactive Grant Leverage & ROI Simulator */}
          <div className="bg-stone-900 border border-stone-800 rounded-lg p-5 sm:p-8 space-y-6">
            <div className="space-y-2.5">
              <div className="text-xs font-mono uppercase text-[#c89d54] font-bold">
                1. ΕΠΙΛΕΞΤΕ ΚΑΝΑΛΙ ΤΟΠΟΘΕΤΗΣΗΣ ΚΕΦΑΛΑΙΟΥ / ΧΟΡΗΓΙΑΣ:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {[
                  {
                    id: "strategic",
                    code: "ΚΑΝΑΛΙ Α",
                    label: "Στρατηγικός Εταίρος (35%–40%)",
                    sub: "Τυροκομείο & Οινοποιείο · Έως 75% Επιδότηση",
                  },
                  {
                    id: "agrotourism",
                    code: "ΚΑΝΑΛΙ Β",
                    label: "Ξενώνες & Εστίαση (LEADER)",
                    sub: "10 Παραδοσιακοί Ξενώνες · Έως 80% Επιδότηση",
                  },
                  {
                    id: "benefactor",
                    code: "ΚΑΝΑΛΙ Γ",
                    label: "Ταμείο Ευεργετών (ΑΜΚΕ)",
                    sub: "Φοροαπαλλαγή, Naming Rights & ESG",
                  },
                  {
                    id: "diaspora",
                    code: "ΚΑΝΑΛΙ Δ",
                    label: "Επενδυτές Διασποράς (15%)",
                    sub: "Μετοχικό Κεφάλαιο & Γέφυρα Ρευστότητας",
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() =>
                      setInvestorTrack(tab.id as typeof investorTrack)
                    }
                    className={`p-3.5 rounded border text-left transition cursor-pointer ${
                      investorTrack === tab.id
                        ? "bg-[#c89d54] text-stone-950 border-white font-bold"
                        : "bg-stone-950 hover:bg-stone-800 text-stone-200 border-stone-800"
                    }`}
                  >
                    <div className="text-[10px] font-mono uppercase opacity-80">
                      {tab.code}
                    </div>
                    <div className="text-xs sm:text-sm font-bold mt-0.5">
                      {tab.label}
                    </div>
                    <div
                      className={`text-[11px] mt-1 ${
                        investorTrack === tab.id
                          ? "text-stone-900"
                          : "text-stone-400"
                      }`}
                    >
                      {tab.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider + Output Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pt-4 border-t border-stone-800">
              <div className="lg:col-span-5 space-y-4 bg-stone-950 p-5 rounded border border-stone-800">
                <div>
                  <label className="text-[11px] font-mono uppercase text-stone-400 block">
                    2. ΙΔΙΑ ΣΥΜΜΕΤΟΧΗ / ΚΕΦΑΛΑΙΟ ΠΟΥ ΔΙΑΘΕΤΕΤΕ:
                  </label>
                  <div className="font-mono text-2xl sm:text-4xl font-bold text-[#c89d54] mt-1">
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

                <div className="flex justify-between text-[11px] font-mono text-stone-400">
                  <span>25.000 €</span>
                  <span>250.000 €</span>
                  <span>500.000 €</span>
                  <span>1.000.000 €</span>
                </div>

                <div className="pt-3 border-t border-stone-800 space-y-1 text-xs">
                  <div className="text-stone-400">
                    Καθεστώς Ενίσχυσης / Μόχλευσης:
                  </div>
                  <div className="font-mono text-emerald-400">
                    {investorSimulation.grantRateLabel}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {investorSimulation.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1">
                    {investorSimulation.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-stone-950 border border-stone-800 rounded p-3.5">
                    <div className="text-[10px] font-mono text-stone-400 uppercase">
                      ΣΥΝΟΛΙΚΗ ΑΞΙΑ ΕΡΓΟΥ ΠΟΥ ΕΝΕΡΓΟΠΟΙΕΙΤΑΙ
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-1">
                      {investorSimulation.mobilizedCapex.toLocaleString("el-GR")} €
                    </div>
                  </div>
                  <div className="bg-stone-950 border border-emerald-800/60 rounded p-3.5">
                    <div className="text-[10px] font-mono text-emerald-300 uppercase">
                      ΔΗΜΟΣΙΑ / ΕΥΡΩΠΑΪΚΗ ΕΠΙΔΟΤΗΣΗ
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
                      +{investorSimulation.publicGrant.toLocaleString("el-GR")} €
                    </div>
                  </div>
                  <div className="bg-stone-950 border border-[#c89d54]/60 rounded p-3.5">
                    <div className="text-[10px] font-mono text-[#c89d54] uppercase">
                      {investorSimulation.annualBenefitLabel}
                    </div>
                    <div className="font-mono text-lg sm:text-xl font-bold text-[#c89d54] mt-1">
                      {investorSimulation.annualBenefitValue}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded bg-stone-950 border border-stone-800 text-xs text-amber-200 font-mono">
                  {investorSimulation.paybackLabel}
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-200">
                  {investorSimulation.perks.map((perk, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 bg-stone-950/60 p-2.5 rounded border border-stone-800"
                    >
                      <span className="font-mono text-[#c89d54] font-bold">
                        0{idx + 1}.
                      </span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 3 Financial Scenarios Comparison (Conservative / Baseline / Optimistic) */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-[#c89d54] uppercase font-bold">
                  ΑΝΑΛΥΣΗ ΕΥΑΙΣΘΗΣΙΑΣ & 3 ΣΕΝΑΡΙΑ ΙΣΟΛΟΓΙΣΜΟΥ (ΚΕΦΑΛΑΙΟ 12)
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                  Βιωσιμότητα Ακόμη και στο Συντηρητικό Σενάριο (400 τόνοι γάλακτος / 14% πληρότητα)
                </h3>
              </div>

              <div className="inline-flex flex-wrap rounded bg-stone-900 p-1 text-xs border border-stone-800">
                {THREE_SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => setSelectedScenarioId(sc.id)}
                    className={`px-3 py-1.5 rounded-xs font-semibold transition cursor-pointer ${
                      selectedScenarioId === sc.id
                        ? "bg-[#c89d54] text-stone-950"
                        : "text-stone-300 hover:text-white"
                    }`}
                  >
                    {sc.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {THREE_SCENARIOS.map((sc) => {
                const isSelected = sc.id === selectedScenarioId;
                return (
                  <div
                    key={sc.id}
                    onClick={() => setSelectedScenarioId(sc.id)}
                    className={`rounded p-5 border transition cursor-pointer ${
                      isSelected
                        ? "bg-stone-900 border-[#c89d54]"
                        : "bg-stone-900/50 border-stone-800 hover:border-stone-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif font-bold text-lg text-white">
                        {sc.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-xs text-[10px] font-mono bg-stone-800 text-[#c89d54]">
                        {sc.badge}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-1.5">
                      {sc.description}
                    </p>

                    <div className="my-4 py-3 border-y border-stone-800 space-y-2.5">
                      <div>
                        <div className="text-[10px] font-mono text-stone-400">
                          ΚΥΚΛΟΣ ΕΡΓΑΣΙΩΝ ΕΤΟΥΣ 5 (ΟΙΚΟΣΥΣΤΗΜΑ)
                        </div>
                        <div className="font-mono text-xl sm:text-2xl font-bold text-[#c89d54]">
                          {sc.revenueFormatted}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-stone-400">
                          ΛΕΙΤΟΥΡΓΙΚΗ ΚΕΡΔΟΦΟΡΙΑ (EBITDA ΕΤΟΥΣ 5)
                        </div>
                        <div className="font-mono text-base sm:text-lg font-bold text-emerald-400">
                          {sc.ebitdaRange}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-300 font-mono">
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
                      <div className="flex justify-between pt-2 border-t border-stone-800 text-[#c89d54]">
                        <span>Μέρισμα 15% στην Κοινότητα:</span>
                        <strong>{sc.communityDividend15Pct}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Expandable Full CAPEX Table (10.45M €) */}
            <div className="bg-stone-900 border border-stone-800 rounded p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-white">
                    Αναλυτικός Προϋπολογισμός CAPEX 10.450.000 € & Πηγές Χρηματοδότησης
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Α. Δημόσιες Υποδομές (2,25 εκ. €) · Β. Παραγωγικές Επενδύσεις (6,14 εκ. €) · Γ. Οικισμός & Δεξιότητες (1,54 εκ. €) · Δ. Ενέργεια (0,52 εκ. €)
                  </p>
                </div>
                <button
                  onClick={() => setShowFullCapex(!showFullCapex)}
                  className="px-4 py-2 rounded bg-stone-800 hover:bg-stone-700 text-[#c89d54] text-xs font-mono font-bold cursor-pointer"
                >
                  {showFullCapex
                    ? "Απόκρυψη Αναλυτικού Πίνακα"
                    : "Προβολή Αναλυτικού Πίνακα CAPEX (10,45 εκ. €)"}
                </button>
              </div>

              {showFullCapex && (
                <div className="mt-5 space-y-5">
                  {CAPEX_BREAKDOWN.map((cat) => (
                    <div
                      key={cat.id}
                      className="border border-stone-800 rounded overflow-hidden"
                    >
                      <div className="bg-stone-950 px-4 py-2.5 flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-[#c89d54]">
                          {cat.categoryTitle}
                        </span>
                        <span className="font-mono font-bold text-sm text-white">
                          {cat.subtotalFormatted}
                        </span>
                      </div>
                      <div className="divide-y divide-stone-800 text-xs">
                        {cat.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="px-4 py-2.5 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-stone-900"
                          >
                            <div className="sm:col-span-5 font-medium text-white">
                              {item.title}
                            </div>
                            <div className="sm:col-span-2 font-mono font-bold text-amber-200">
                              {item.amountFormatted}
                            </div>
                            <div className="sm:col-span-3 text-stone-300">
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
        className="py-12 sm:py-16 lg:py-20 bg-[#ebe6dc] border-b border-stone-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="space-y-6">
            <div className="max-w-3xl space-y-2.5">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#14191f]">
                04 / ΚΕΦΑΛΑΙΟ 8 · ΝΟΜΙΚΗ & ΚΑΤΑΣΤΑΤΙΚΗ «ΑΣΠΙΔΑ ΠΡΟΣΤΑΣΙΑΣ»
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f]">
                Χτισμένο για να μην Μπορεί να Αλλοιωθεί, να Κλαπεί ή να Κομματικοποιηθεί
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Πριν ζητηθεί το πρώτο ευρώ, το «Βροσίνα 2031» κλειδώνει
                καταστατικά τη διακυβέρνησή του σε δύο επίπεδα: μητρικός
                θεματοφύλακας είναι η{" "}
                <strong>ΚΟΙΝΣΕΠ Συλλογικής και Κοινωνικής Ωφέλειας (Ν. 4430/2016)</strong>{" "}
                και εκτελεστικός βραχίονας η{" "}
                <strong>Εμπορική Θυγατρική Ειδικού Σκοπού</strong>.
              </p>
            </div>

            <div className="bg-white rounded p-5 sm:p-8 border border-stone-300 space-y-6">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-stone-500 mb-3">
                  ΜΕΤΟΧΙΚΗ ΣΥΝΘΕΣΗ ΕΜΠΟΡΙΚΗΣ ΘΥΓΑΤΡΙΚΗΣ (ΙΣΟΡΡΟΠΙΑ ΔΥΝΑΜΕΩΝ):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {GOVERNANCE_SHIELD.shareholders.map((sh, i) => (
                    <div
                      key={i}
                      className="rounded p-4 border border-stone-200 bg-stone-50"
                      style={{ borderTopWidth: "4px", borderTopColor: sh.color }}
                    >
                      <div className="font-mono text-2xl sm:text-3xl font-bold text-[#14191f]">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-4 border-t border-stone-200">
                {GOVERNANCE_SHIELD.clauses.map((cl, i) => (
                  <div
                    key={i}
                    className="p-4 rounded bg-[#f7f5f0] border border-stone-300 space-y-1"
                  >
                    <div className="font-mono text-[11px] font-bold text-[#1f5c43]">
                      ΡΗΤΡΑ 0{i + 1}
                    </div>
                    <div className="font-serif font-bold text-sm sm:text-base text-[#14191f]">
                      {cl.title}
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {cl.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Stakeholder One-Pager Briefs */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#b85d3b]">
                  ΘΕΣΜΙΚΗ & ΠΟΛΙΤΙΚΗ ΣΤΡΑΤΗΓΙΚΗ · ΕΞΑΤΟΜΙΚΕΥΜΕΝΑ ONE-PAGERS
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f] mt-1">
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
                    className={`px-3 py-1.5 rounded font-semibold transition cursor-pointer ${
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-4 space-y-1.5">
                {filteredStakeholders.map((st) => {
                  const active = st.id === activeStakeholder.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setSelectedStakeholderId(st.id)}
                      className={`w-full text-left p-3 rounded border transition cursor-pointer ${
                        active
                          ? "bg-[#14191f] text-white border-[#14191f]"
                          : "bg-white hover:bg-stone-50 text-stone-800 border-stone-300"
                      }`}
                    >
                      <div
                        className={`text-[10px] font-mono ${
                          active ? "text-[#c89d54]" : "text-stone-500"
                        }`}
                      >
                        {st.phase}
                      </div>
                      <div className="font-serif font-bold text-xs sm:text-sm mt-0.5">
                        {st.name}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-8 bg-white rounded p-5 sm:p-8 border border-stone-300 space-y-5">
                <div className="border-b border-stone-200 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-[#b85d3b] font-bold">
                      {activeStakeholder.phase}
                    </span>
                    <span className="text-stone-500">
                      Παραδοτέο: {activeStakeholder.deliverable}
                    </span>
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f] mt-1.5">
                    {activeStakeholder.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-[#1f5c43] mt-0.5">
                    Ρόλος στο «Βροσίνα 2031»: {activeStakeholder.role}
                  </p>
                </div>

                <blockquote className="p-4 bg-[#f7f5f0] border-l-4 border-[#c89d54] font-serif italic text-stone-800 text-sm sm:text-base">
                  «{activeStakeholder.hookQuote}»
                </blockquote>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
                      ΓΙΑΤΙ ΑΦΟΡΑ ΑΜΕΣΑ ΤΟΝ ΦΟΡΕΑ ΣΑΣ:
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                      {activeStakeholder.whyItMatters.map((w, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-mono text-[#1f5c43] font-bold">
                            •
                          </span>
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
                          className="flex items-start gap-2 bg-stone-50 p-2.5 rounded border border-stone-200"
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
                      className="bg-stone-100 rounded p-3 text-center"
                    >
                      <div className="font-mono font-bold text-base sm:text-lg text-[#14191f]">
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
        className="py-12 sm:py-16 lg:py-20 bg-[#f7f5f0] border-b border-stone-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#1f5c43]">
              05 / ΚΑΤΟΙΚΙΑ, ΜΗΤΡΩΟ ΑΚΙΝΗΤΩΝ & ΝΕΟΙ ΠΑΡΑΓΩΓΟΙ
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f]">
              Ανακαινίζουμε τα Κλειστά Σπίτια με 0 € Δική σας Επιβάρυνση & Δίνουμε Πρώτο Κοπάδι
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Ο <strong>Δεσμευτικός Μορφολογικός Κανονισμός</strong> επενδύει
              τις όψεις των υφιστάμενων κατοικιών (1960–1990) με φυσική
              ηπειρωτική πέτρα και αποκαθιστά τις κεραμοσκεπές (ή τοποθετεί
              γκρίζα λιθόπλακα στα εμβληματικά κτίρια) μέσω{" "}
              <strong>Master Lease 9–12 ετών</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left: Interactive Housing Morphology Categories (A, B, C) */}
            <div className="lg:col-span-7 bg-white rounded p-5 sm:p-8 border border-stone-300 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
                  Υπολογιστής Αποκατάστασης Κατοικίας (Μητρώο Κλειστών Ακινήτων)
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-stone-100 text-[#1f5c43] font-bold border border-stone-200">
                  20 Κατοικίες + 10 Ξενώνες + 5 Καταστήματα
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {HOUSING_CATEGORIES.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedHousingIdx(idx)}
                    className={`p-3.5 rounded border text-left transition cursor-pointer ${
                      selectedHousingIdx === idx
                        ? "bg-[#14191f] text-white border-[#14191f]"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-300"
                    }`}
                  >
                    <div className="text-[11px] font-mono font-bold text-[#c89d54]">
                      {cat.code}
                    </div>
                    <div className="font-serif font-bold text-sm mt-1">
                      {cat.cost}
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-4 sm:p-5 rounded bg-[#f7f5f0] border border-stone-300 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-serif font-bold text-base sm:text-lg text-[#14191f]">
                    {HOUSING_CATEGORIES[selectedHousingIdx].title}
                  </h4>
                  <span className="font-mono text-lg sm:text-xl font-bold text-[#1f5c43]">
                    {HOUSING_CATEGORIES[selectedHousingIdx].cost} / κατοικία
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {HOUSING_CATEGORIES[selectedHousingIdx].works}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-mono">
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
                className="w-full py-3 rounded bg-[#1f5c43] hover:bg-[#174632] text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
              >
                Εγγραφή Κλειστού Σπιτιού ή Καταστήματος στο Μητρώο Βροσίνας →
              </button>
            </div>

            {/* Right: "Έλα να βοσκήσεις — έλα να μείνεις" Package */}
            <div className="lg:col-span-5 bg-[#14191f] text-white rounded p-5 sm:p-8 border border-stone-800 space-y-5">
              <div className="text-xs font-mono text-[#c89d54] font-bold uppercase">
                ΠΡΟΓΡΑΜΜΑ «ΕΛΑ ΝΑ ΒΟΣΚΗΣΕΙΣ — ΕΛΑ ΝΑ ΜΕΙΝΕΙΣ»
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                12 Νέοι Κτηνοτρόφοι, 8 Αμπελουργοί & 12 Τεχνίτες Πέτρας
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Απαντάμε στο μεγαλύτερο εμπόδιο των νέων παραγωγών: την έλλειψη
                αρχικού κεφαλαίου και την καθυστέρηση εκταμίευσης των
                επιδοτήσεων.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-stone-200">
                <li className="flex items-start gap-2.5">
                  <span className="font-mono text-[#c89d54] font-bold">01.</span>
                  <span>
                    <strong>Πακέτο Πρώτου Κοπαδιού (50–80 ζώα):</strong>{" "}
                    Επιδότηση έως 80% + <strong>Προκαταβολή-Γέφυρα</strong> από
                    το Ταμείο Ευεργετών/HDB για αγορά ζώων από την 1η μέρα.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono text-[#c89d54] font-bold">02.</span>
                  <span>
                    <strong>Εγγυημένη Τιμή Γάλακτος & Σταφυλιού:</strong>{" "}
                    Πολυετής σύμβαση απορρόφησης από το Τυροκομείο και το
                    Οινοποιείο της Βροσίνας.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono text-[#c89d54] font-bold">03.</span>
                  <span>
                    <strong>Ανακαινισμένο Σπίτι & Ανοιχτό Σχολείο:</strong>{" "}
                    Επιδότηση ενοικίου για τα πρώτα 3 χρόνια και επαναλειτουργία
                    του Δημοτικού Σχολείου με ολοήμερο & τηλεϊατρική.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono text-[#c89d54] font-bold">04.</span>
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
                className="w-full py-3 rounded bg-[#b85d3b] hover:bg-[#a04e2f] text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
              >
                Αίτηση Νέου Κτηνοτρόφου / Αμπελουργού / Τεχνίτη Πέτρας →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SECTION 6 (#dataroom): OFFICIAL DATA ROOM (13 FILES), VISION SPEECH & FAQ */}
      <section id="dataroom" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#1f5c43]">
                  06 / ΕΠΙΣΗΜΟ DATA ROOM & ΒΙΒΛΙΟΘΗΚΗ ΤΕΚΜΗΡΙΩΣΗΣ
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f] mt-1">
                  Όλα τα Επίσημα Έγγραφα & Υποδείγματα του «Βροσίνα 2031»
                </h2>
              </div>
              <a
                href="/llms-full.txt"
                target="_blank"
                className="text-xs font-mono text-stone-600 hover:text-[#1f5c43] underline"
              >
                Πλήρες Αρχείο Δεδομένων (/llms-full.txt) →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DATA_ROOM_DOCUMENTS.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.href}
                  download
                  className={`group p-5 rounded border transition flex flex-col justify-between ${
                    doc.featured
                      ? "bg-[#f7f5f0] border-[#14191f]"
                      : "bg-stone-50 border-stone-200 hover:border-stone-400"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-stone-600 uppercase font-semibold">
                        {doc.category}
                      </span>
                      <span className="text-[#b85d3b] font-bold">
                        {doc.format} · {doc.size}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-[#14191f] mt-2.5 group-hover:text-[#1f5c43] transition">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs font-semibold text-[#1f5c43]">
                    <span>{doc.pages}</span>
                    <span>Λήψη Αρχείου ↓</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Executive Q&A & FAQ Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-stone-200">
            <div className="lg:col-span-5 bg-[#14191f] text-white rounded p-5 sm:p-7 border border-stone-800 space-y-4">
              <div className="text-xs font-mono text-[#c89d54] uppercase font-bold">
                ΣΥΝΟΨΗ ΚΡΙΣΙΜΩΝ ΑΠΑΝΤΗΣΕΩΝ
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                Άμεση Ενημέρωση για Επενδυτές, Φορείς & Πολίτες
              </h3>

              <div className="space-y-1.5">
                {executiveAnswers.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuickQaIdx(idx)}
                    className={`w-full text-left px-3.5 py-2.5 rounded text-xs font-medium transition cursor-pointer ${
                      quickQaIdx === idx
                        ? "bg-[#1f5c43] text-white font-semibold"
                        : "bg-stone-900 hover:bg-stone-800 text-stone-300"
                    }`}
                  >
                    0{idx + 1}. {p.label}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded bg-stone-900 border border-stone-800 text-xs sm:text-sm text-stone-200 leading-relaxed">
                <div className="font-mono text-[10px] text-[#c89d54] mb-1 uppercase">
                  ΤΕΚΜΗΡΙΩΜΕΝΗ ΑΠΑΝΤΗΣΗ (ΕΚΔΟΣΗ 2.0):
                </div>
                {executiveAnswers[quickQaIdx].answer}
              </div>

              <div className="pt-1">
                <label className="text-[11px] font-mono text-stone-400 block mb-1">
                  Αναζήτηση όρου στις Συχνές Ερωτήσεις:
                </label>
                <input
                  type="text"
                  value={faqQuery}
                  onChange={(e) => setFaqQuery(e.target.value)}
                  placeholder="π.χ. Στρατόπεδο, LEADER, ΑΜΚΕ, Master Lease..."
                  className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-700 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-[#c89d54]"
                />
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="lg:col-span-7 space-y-3.5">
              <div className="text-xs font-mono font-bold uppercase text-[#b85d3b]">
                ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ & ΑΠΑΝΤΗΣΕΙΣ
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
                Όλα Όσα Πρέπει να Γνωρίζετε για το «Βροσίνα 2031»
              </h3>

              <div className="space-y-2.5">
                {FAQ_ITEMS.filter(
                  (f) =>
                    !faqQuery.trim() ||
                    f.question.toLowerCase().includes(faqQuery.toLowerCase()) ||
                    f.answer.toLowerCase().includes(faqQuery.toLowerCase())
                ).map((faq, idx) => (
                  <details
                    key={idx}
                    open={idx === 0}
                    className="group bg-[#f7f5f0] rounded border border-stone-300 p-4"
                  >
                    <summary className="font-serif font-bold text-sm sm:text-base text-[#14191f] cursor-pointer list-none flex items-center justify-between gap-2">
                      <span>{faq.question}</span>
                      <span className="text-[#1f5c43] font-mono text-base group-open:rotate-45 transition">
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
          <div className="bg-[#14191f] text-white rounded-lg p-6 sm:p-10 border border-stone-800 space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono text-[#c89d54] uppercase">
                Ο ΛΟΓΟΣ ΤΟΥ ΟΡΑΜΑΤΟΣ · «ΤΟ ΧΩΡΙΟ ΠΟΥ ΣΩΠΑΙΝΕΙ»
              </span>
              <h3 className="font-serif text-xl sm:text-3xl font-bold">
                «Ό,τι έκλεισε μέσα σε μία γενιά, μπορεί να ξανανοίξει μέσα σε μία ακόμη. Όχι με ευχές. Με σχέδιο.»
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {VISION_SPEECH_SECTIONS.map((sec) => (
                <div
                  key={sec.roman}
                  className="bg-stone-900 border border-stone-800 rounded p-4 space-y-2.5"
                >
                  <div className="font-serif text-[#c89d54] font-bold text-base">
                    {sec.roman}. {sec.title}
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {sec.paragraphs[0]}
                  </p>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {sec.paragraphs[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-[#0d1115] text-stone-400 py-10 border-t border-stone-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2.5">
              <div className="font-serif font-bold text-lg text-white">
                ΒΡΟΣΙΝΑ<span className="text-[#b85d3b]">2031</span>
              </div>
              <p className="leading-relaxed">
                Ολοκληρωμένο Στρατηγικό & Επιχειρησιακό Σχέδιο Παραγωγικής,
                Δημογραφικής και Οικιστικής Αναγέννησης της Κοινότητας Βροσίνας
                (Δ.Ε. Μολοσσών, Δήμος Ζίτσας, Π.Ε. Ιωαννίνων, Περιφέρεια
                Ηπείρου).
              </p>
            </div>

            <div className="space-y-1.5">
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

            <div className="space-y-1.5">
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

            <div className="space-y-2.5">
              <div className="font-mono font-bold text-white uppercase">
                ΕΠΙΚΟΙΝΩΝΙΑ & ΤΕΚΜΗΡΙΩΣΗ
              </div>
              <p>Email: {SITE_CONFIG.contact.email}</p>
              <p>Investor Desk: {SITE_CONFIG.contact.investorDeskEmail}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="/llms.txt"
                  className="px-2 py-1 rounded bg-stone-900 text-[#c89d54] hover:bg-stone-800 font-mono"
                >
                  llms.txt
                </a>
                <a
                  href="/llms-full.txt"
                  className="px-2 py-1 rounded bg-stone-900 text-[#c89d54] hover:bg-stone-800 font-mono"
                >
                  llms-full.txt
                </a>
                <a
                  href="/sitemap.xml"
                  className="px-2 py-1 rounded bg-stone-900 text-stone-300 hover:bg-stone-800 font-mono"
                >
                  sitemap.xml
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
            <span>
              © 2026–2031 Πρωτοβουλία «Βροσίνα 2031» · ΚΟΙΝΣΕΠ Βροσίνας & Ταμείο
              Ευεργετών Βροσίνας.
            </span>
            <span>
              Τεκμηριωμένο με επίσημα στοιχεία ΕΛΣΤΑΤ 2021, Τ.Α.ΕΘ.Α. & ΗΠΕΙΡΟΣ
              Α.Ε.
            </span>
          </div>
        </div>
      </footer>

      {/* MODAL FOR INVESTOR / PROPERTY OWNER / PRODUCER REGISTRATION */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-[#14191f] rounded-lg max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-stone-300 space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-[#14191f] text-white font-mono text-xs font-bold">
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
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  Εκδήλωση Ενδιαφέροντος & Θεσμική Επικοινωνία
                </h3>

                <div>
                  <label className="block font-semibold mb-1">
                    Ιδιότητα / Κατηγορία Ενδιαφέροντος:
                  </label>
                  <select
                    value={leadRole}
                    onChange={(e) => setLeadRole(e.target.value)}
                    className="w-full p-2.5 rounded border border-stone-300 bg-stone-50 font-medium"
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
                      className="w-full p-2.5 rounded border border-stone-300"
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
                      className="w-full p-2.5 rounded border border-stone-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full p-2.5 rounded border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    Σύντομο Μήνυμα / Περιγραφή Ακινήτου ή Επενδυτικού Προφίλ:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Σημειώστε αν σας ενδιαφέρει το LOI για την Πρόσκληση LEADER (04/02/2027), η ΑΜΚΕ Ευεργετών ή η ένταξη ακινήτου..."
                    className="w-full p-2.5 rounded border border-stone-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded bg-[#14191f] hover:bg-[#1f5c43] text-white font-bold transition cursor-pointer"
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
                  Η Δήλωσή σας Καταχωρίστηκε
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
                    className="px-4 py-2 rounded bg-[#14191f] text-white text-xs font-semibold"
                  >
                    Λήψη Business Plan (PDF)
                  </a>
                  <button
                    onClick={() => {
                      setLeadModalOpen(false);
                      setLeadSubmitted(false);
                    }}
                    className="px-4 py-2 rounded border border-stone-300 text-xs font-semibold cursor-pointer"
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
