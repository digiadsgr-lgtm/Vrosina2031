"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  SITE_CONFIG,
  HERO_KPIS,
  MASTERPLAN_HOTSPOTS,
  FOUR_PILLARS,
  THREE_SCENARIOS,
  GOVERNANCE_SHIELD,
  DATA_ROOM_DOCUMENTS,
  FAQ_ITEMS,
  REAL_VROSINA_VIDEOS,
  REAL_VS_2031_COMPARISONS,
  TV_MEDIA_APPEARANCES,
  CAMP_VIDEO_AUTOPSY,
  PUBLIC_FISCAL_BENEFIT_STUDY,
  ABOUT_US_AND_STATUS,
  WHAT_WE_DO_NOT_ASK_STATE,
  INVESTOR_RISK_AND_USE_OF_FUNDS,
  type HotspotPoint,
} from "@/data/vrosinaData";

export default function VrosinaClientApp() {
  const [heroViewMode, setHeroViewMode] = useState<"2031" | "today" | "video">(
    "2031"
  );
  const [heroVideoLoaded, setHeroVideoLoaded] = useState<boolean>(false);
  const [autopsyVideoLoaded, setAutopsyVideoLoaded] = useState<boolean>(false);
  const [loadedTvVideoIds, setLoadedTvVideoIds] = useState<
    Record<string, boolean>
  >({});
  const [activeHotspot, setActiveHotspot] = useState<HotspotPoint>(
    MASTERPLAN_HOTSPOTS[0]
  );

  // Camp Autopsy Step
  const [activeAutopsyStep, setActiveAutopsyStep] = useState<number>(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [showAllVideos, setShowAllVideos] = useState<boolean>(false);

  // Investor Simulator State
  const [investorTrack, setInvestorTrack] = useState<
    "strategic" | "agrotourism" | "benefactor" | "diaspora"
  >("strategic");
  const [investmentAmount, setInvestmentAmount] = useState<number>(150000);
  const [selectedScenarioId, setSelectedScenarioId] =
    useState<string>("baseline");

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState<boolean>(false);
  const [showAllDocs, setShowAllDocs] = useState<boolean>(false);

  // Lead Modal & Contact Form State — Default is "" ("— Επιλέξτε ποιος είστε —") per Μέρος Α #25 & Μέρος Β #3
  const [leadModalOpen, setLeadModalOpen] = useState<boolean>(false);
  const [leadRole, setLeadRole] = useState<string>("");
  const [leadOrigin, setLeadOrigin] = useState<string>(
    "Κεντρική Σελίδα «Βροσίνα 2031»"
  );
  const [leadPrefillContext, setLeadPrefillContext] = useState<string>("");
  const [leadName, setLeadName] = useState<string>("");
  const [leadEmail, setLeadEmail] = useState<string>("");
  const [leadPhone, setLeadPhone] = useState<string>("");
  const [leadMessage, setLeadMessage] = useState<string>("");
  const [gdprAccepted, setGdprAccepted] = useState<boolean>(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);
  const [leadSubmitting, setLeadSubmitting] = useState<boolean>(false);
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);
  const [inlineSubmitted, setInlineSubmitted] = useState<boolean>(false);

  const ROLE_LABELS: Record<string, string> = {
    herder: "Κτηνοτρόφος / Αμπελουργός της περιοχής (Μέλος Κοιν.Σ.Επ. / Γάλα)",
    owner: "Ιδιοκτήτης Κλειστού Σπιτιού, Καταστήματος ή Γης στη Βροσίνα",
    new_producer: "Νέος Κτηνοτρόφος / Τεχνίτης (Εγκατάσταση στη Βροσίνα)",
    business: "Επιχείρηση / Ξενώνας / Κατάστημα / Εργολάβος / Προμηθευτής",
    investor: "Στρατηγικός Επενδυτής (Μεταποίηση / Αγροτουρισμός)",
    benefactor: "Ευεργέτης / Χορηγός (ΑΜΚΕ Ταμείο Ευεργετών Βροσίνας)",
    institution: "Δημόσιος Φορέας / Δήμος / Περιφέρεια / Υπουργείο / ΜΜΕ",
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const src = params.get("source");
    if (src) {
      setLeadOrigin(`Υποσελίδα: ${src}`);
    }
  }, []);

  const openLeadModal = (
    role: string,
    originLabel: string,
    prefillContext?: string
  ) => {
    setLeadRole(role);
    setLeadOrigin(originLabel);
    if (prefillContext) {
      setLeadPrefillContext(prefillContext);
      if (!leadMessage) {
        setLeadMessage(prefillContext);
      }
    }
    setLeadSubmitted(false);
    setLeadModalOpen(true);
  };

  const submitLeadToDigiads = async (
    e: React.FormEvent,
    originOverride?: string,
    isInlineForm?: boolean
  ) => {
    e.preventDefault();
    if (!leadRole || !gdprAccepted) return;
    const finalOrigin = originOverride || leadOrigin;
    const roleLabel = ROLE_LABELS[leadRole] || leadRole;
    setLeadSubmitting(true);

    const payload: Record<string, string> = {
      _subject: `[ΒΡΟΣΙΝΑ 2031] ${roleLabel} — ${leadName} (${finalOrigin})`,
      _template: "table",
      _captcha: "false",
      Πηγή_Προέλευσης: finalOrigin,
      Σελίδα_URL:
        typeof window !== "undefined"
          ? window.location.href
          : "https://vrosina2031.vercel.app",
      Κατηγορία_Ενδιαφερομένου: roleLabel,
      Ονοματεπώνυμο_ή_Φορέας: leadName,
      Τηλέφωνο_Επικοινωνίας: leadPhone,
      Email: leadEmail || "Δεν συμπληρώθηκε",
      Πλαίσιο_Υπολογιστή: leadPrefillContext || "—",
      Μήνυμα_Ενδιαφέροντος: leadMessage || "Αίτημα τηλεφωνικής επικοινωνίας",
    };

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Fallback below
    }

    try {
      await fetch("https://formsubmit.co/ajax/digiadsgr@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch {
      // ignore
    }

    setLeadSubmitting(false);
    if (isInlineForm) {
      setInlineSubmitted(true);
    } else {
      setLeadSubmitted(true);
    }
  };

  const activeScenario = useMemo(
    () =>
      THREE_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
      THREE_SCENARIOS[1],
    [selectedScenarioId]
  );

  // Realistic Investor Simulation (6,5–8,5 years payback per Μέρος Α #31 & Μέρος Β Σελ. 3)
  const investorSimulation = useMemo(() => {
    const scenarioFactor =
      selectedScenarioId === "conservative"
        ? 0.72
        : selectedScenarioId === "optimistic"
          ? 1.28
          : 1.0;

    if (investorTrack === "strategic") {
      const grantRate = 0.65;
      const mobilizedCapex = Math.round(investmentAmount / (1 - grantRate));
      const publicGrant = mobilizedCapex - investmentAmount;
      const equityShareInSubsidiary = Math.min(
        40,
        Math.round((investmentAmount / 927500) * 35 * 10) / 10
      );
      const estimatedAnnualDividend = Math.round(
        investmentAmount * 0.135 * scenarioFactor
      );
      return {
        title: "Στρατηγικός Εταίρος Αγροδιατροφής (Τυροκομείο & Οινοποιείο)",
        subtitle:
          "Συμμετοχή στην Εμπορική Θυγατρική (έως 35%–40% καταστατικό όριο) με προτεραιότητα απορρόφησης παραγωγής.",
        grantRateLabel: "50% – 75% (Π3-73-4.2 ΣΣ ΚΑΠ & Αναπτυξιακός Ν. 4887/2022)",
        mobilizedCapex,
        publicGrant,
        annualBenefitLabel: "Εκτιμώμενο Ετήσιο Μέρισμα στην Ωριμότητα (Έτος 5)",
        annualBenefitValue: `~${estimatedAnnualDividend.toLocaleString("el-GR")} € / έτος`,
        paybackLabel:
          "Ρεαλιστικός χρόνος απόσβεσης ιδίων κεφαλαίων: ~6,5 έως 8,5 έτη από την επενδυτική εκκίνηση (συμπεριλαμβανομένων 2 ετών κατασκευής/αδειοδότησης και σταδιακής κλιμάκωσης)",
        perks: [
          `Εκτιμώμενο ποσοστό στην Εμπορική Θυγατρική: ~${equityShareInSubsidiary}% (Ανώτατο καταστατικό όριο: 40%)`,
          "Σύμβαση προτεραιότητας απορρόφησης (Off-take) σε Φέτα ΠΟΠ, Γαλοτύρι ΠΟΠ & Ντεμπίνα",
          "Μειωμένο ενεργειακό κόστος λειτουργίας μέσω της Ενεργειακής Κοινότητας 150 kWp",
          "Συμβατικά ρυθμισμένος μηχανισμός εξόδου (Exit Strategy) μετά την 5ετία",
        ],
      };
    }

    if (investorTrack === "agrotourism") {
      const grantRate = 0.65;
      const mobilizedCapex = Math.round(investmentAmount / (1 - grantRate));
      const publicGrant = mobilizedCapex - investmentAmount;
      const guesthouseUnits = Math.max(1, Math.round(mobilizedCapex / 100000));
      const annualNetCashflow = Math.round(
        guesthouseUnits * 12500 * scenarioFactor
      );
      return {
        title: "Επενδυτής Ξενώνων Αγροτουρισμού (LEADER)",
        subtitle:
          "Ανάπτυξη παραδοσιακών ξενώνων μέσω μακροχρόνιας μίσθωσης 10–15 ετών (Master Lease).",
        grantRateLabel: "Έως 65% – 80% (LEADER ΗΠΕΙΡΟΣ Α.Ε.)",
        mobilizedCapex,
        publicGrant,
        annualBenefitLabel: `Εκτιμώμενο Καθαρό Ετήσιο Αποτέλεσμα (${guesthouseUnits} ξενώνας/ες)`,
        annualBenefitValue: `~${annualNetCashflow.toLocaleString("el-GR")} € / έτος`,
        paybackLabel:
          "Εκτιμώμενη απόσβεση ιδίας συμμετοχής: ~3,5 έως 5 έτη λειτουργίας (σε μέση πληρότητα 22% / 280 διανυκτερεύσεις ανά ξενώνα)",
        perks: [
          `Ανάπτυξη ~${guesthouseUnits} παραδοσιακών ξενώνων (${guesthouseUnits * 4} κλίνες) χωρίς κόστος αγοράς οικοπέδου`,
          "Κεντρική προβολή και κρατήσεις μέσω του φορέα διαχείρισης προορισμού Βροσίνας",
          "Σύνδεση με τον παραποτάμιο πεζόδρομο Γεφυριού 1605 – Μονής Ραϊδιώτισσας",
          "Απαλλαγή δημοτικών τελών για τα πρώτα 3–5 έτη μέσω απόφασης Δ.Σ. Ζίτσας",
        ],
      };
    }

    if (investorTrack === "benefactor") {
      const leverageMultiplier = 2.7;
      const mobilizedCapex = Math.round(investmentAmount * leverageMultiplier);
      const publicGrant = mobilizedCapex - investmentAmount;
      const taxRelief = Math.round(investmentAmount * 0.22);
      return {
        title: "Δωρητής / Ευεργέτης — ΑΜΚΕ «Ταμείο Ευεργετών Βροσίνας»",
        subtitle:
          "Δεσμευμένος λογαριασμός δωρεάς ανά έργο, φορολογική έκπτωση χορηγίας & ονοματοδοσία.",
        grantRateLabel:
          "Μόχλευση 2,70x (Κάθε 1 € δωρεάς ξεκλειδώνει 1,70 € δημόσιων πόρων)",
        mobilizedCapex,
        publicGrant,
        annualBenefitLabel: "Εκτιμώμενη Φορολογική Έκπτωση Χορηγίας (Ν. 4172/2013)",
        annualBenefitValue: `έως ${taxRelief.toLocaleString("el-GR")} €`,
        paybackLabel:
          "100% διάθεση σε δεσμευμένο λογαριασμό (Escrow) για τη Σχολή Πετράδων, το Σχολείο ή τις αποκαταστάσεις κατοικιών",
        perks: [
          "Ονοματοδοσία (Naming Rights) σε υποδομή του χωριού (Σχολή Πετράδων, Κελάρι, Παραποτάμιος Πεζόδρομος)",
          "Ετήσιος ανεξάρτητος απολογισμός κοινωνικού και δημογραφικού αντικτύπου (ESG)",
          "Κάλυψη εγγυήσεων-γέφυρας για την εγκατάσταση νέων οικογενειών κτηνοτρόφων",
          "Θεσμική εκπροσώπηση στο Γνωμοδοτικό Συμβούλιο Ευεργετών της ΑΜΚΕ",
        ],
      };
    }

    const grantRate = 0.63;
    const mobilizedCapex = Math.round(investmentAmount / (1 - grantRate));
    const publicGrant = mobilizedCapex - investmentAmount;
    const annualYield = Math.round(investmentAmount * 0.095 * scenarioFactor);
    return {
      title: "Συμμετοχή Αποδήμων & Διασποράς (15% Εμπορικής Θυγατρικής)",
      subtitle:
        "Συν-επένδυση στο μετοχικό κεφάλαιο δίπλα στον Συνεταιρισμό (30%) και στον Δήμο Ζίτσας (20%).",
      grantRateLabel: "Μέση μόχλευση οικοσυστήματος: 63% Δημόσιο / 37% Ιδιωτικά",
      mobilizedCapex,
      publicGrant,
      annualBenefitLabel: "Εκτιμώμενο Ετήσιο Μέρισμα στην Ωριμότητα",
      annualBenefitValue: `~${annualYield.toLocaleString("el-GR")} € / έτος`,
      paybackLabel:
        "Εκτιμώμενη απόσβεση: ~7 έως 9 έτη με καταστατική προστασία μειοψηφίας (υπερπλειοψηφία 75%)",
      perks: [
        "Συμμετοχή στην ομάδα μετόχων Διασποράς (15% της Εμπορικής Θυγατρικής)",
        "Πλήρης προστασία από τις 6 καταστατικές δικλείδες (Κεφάλαιο 8 Business Plan)",
        "Προτεραιότητα μίσθωσης ανακαινισμένης κατοικίας στη Βροσίνα",
        "Άμεση συμβολή στη δημογραφική αναγέννηση του τόπου καταγωγής",
      ],
    };
  }, [investorTrack, investmentAmount, selectedScenarioId]);

  const audiencePathCards = [
    {
      href: "/gia-ktinotrofous",
      badge: "Για κτηνοτρόφους και κατοίκους",
      topBorderClass: "border-t-4 border-t-[#1F5C43]",
      badgeColorClass: "text-[#1F5C43]",
      buttonColorClass: "bg-[#1F5C43] hover:bg-[#174935]",
      buttonLabel: "Για κτηνοτρόφους και κατοίκους →",
      title: "Για κτηνοτρόφους και κατοίκους της Βροσίνας και της περιοχής",
      summary:
        "Στόχος μας είναι σταθερός αγοραστής για το γάλα σου, με γραπτό συμβόλαιο. Την τιμή και τους όρους θα τους μάθεις πρώτος, πριν από οποιαδήποτε δέσμευση. Ένα μέλος, μία ψήφος (ελάχιστη μερίδα 100 €, ν. 4430/2016).",
      highlights: [
        "Σταθερή ελάχιστη τιμή με γραπτό συμβόλαιο (καθορίζεται πριν από κάθε δέσμευση)",
        "Μέλος στην κοινότητα: ένα μέλος, μία ψήφος · Ελάχιστη μερίδα 100 €",
        "Οδηγός για νέους παραγωγούς & Μητρώο 25 κατοικιών προς αναζωογόνηση",
      ],
    },
    {
      href: "/gia-epicheiriseis",
      badge: "Για επιχειρήσεις",
      topBorderClass: "border-t-4 border-t-[#B85D3B]",
      badgeColorClass: "text-[#A34A2B]",
      buttonColorClass: "bg-[#A34A2B] hover:bg-[#8a3c21]",
      buttonLabel: "Ευκαιρίες για επιχειρήσεις →",
      title: "Ευκαιρίες για επιχειρήσεις στη Βροσίνα 2031",
      summary:
        "Θέλω να ανοίξω δική μου επιχείρηση (10 ξενώνες & 5 καταστήματα), θέλω να κατασκευάσω ή να προμηθεύσω (έργα αποκατάστασης κτιρίων & φωτοβολταϊκό) ή θέλω στρατηγική συνεργασία μεταποίησης.",
      highlights: [
        "10 ξενώνες (εκτίμηση του σχεδίου: περίπου 100.000 € ο καθένας) & 5 καταστήματα",
        "Αποκατάσταση κτιρίων: τρία έργα με εκτιμήσεις του σχεδίου 750.000 €, 350.000 € και 180.000 €",
        "Συνεργασίες μεταποίησης (τυροκομείο, οινοποιείο) με ανοιχτή πρόσκληση και δημόσια κριτήρια",
      ],
    },
    {
      href: "/gia-ependytes",
      badge: "Για επενδυτές",
      topBorderClass: "border-t-4 border-t-[#C89D54]",
      badgeColorClass: "text-[#85611C]",
      buttonColorClass: "bg-[#85611C] hover:bg-[#6b4d15]",
      buttonLabel: "Για επενδυτές & οικονομικό μοντέλο →",
      title: "Για Επενδυτές, Στρατηγικούς Εταίρους & Δωρητές",
      summary:
        "Κίνδυνοι και πώς τους διαχειριζόμαστε, τρία σενάρια λειτουργίας (ώστε να φαίνεται τι ισχύει και στο συντηρητικό), κανόνες διακυβέρνησης και λήψη του οικονομικού μοντέλου (.csv / Excel).",
      highlights: [
        "Εκτίμηση επένδυσης: 10,45 εκ. € (63% δημόσια και 37% ιδιωτική συμμετοχή)",
        "Έγγραφη δέσμευση παραχώρησης στρατοπέδου πριν από κάθε κατάθεση κεφαλαίου",
        "Διακυβέρνηση: πλαφόν 40% σε έναν επενδυτή και υπερπλειοψηφία 75% για τις βασικές αποφάσεις",
      ],
    },
    {
      href: "/gia-foreis",
      badge: "Για φορείς",
      topBorderClass: "border-t-4 border-t-[#14191F]",
      badgeColorClass: "text-[#14191F]",
      buttonColorClass: "bg-[#14191F] hover:bg-[#1F5C43]",
      buttonLabel: "Για φορείς και Πολιτεία →",
      title: "Για Φορείς, τον Δήμο Ζίτσας & την Πολιτεία",
      summary:
        "Δεν ζητάμε από το Δημόσιο να χρηματοδοτήσει τη λειτουργία του έργου. Ζητάμε θεσμική στήριξη και μακροχρόνια παραχώρηση ή μίσθωση του πρώην στρατοπέδου για τουλάχιστον 10 έτη.",
      highlights: [
        "Εκτίμηση άμεσων εσόδων Δημοσίου στην ωριμότητα: ~463.700 €/έτος (χωρίς ΦΠΑ)",
        "Μακροχρόνια παραχώρηση ή μίσθωση του πρώην στρατοπέδου (τουλάχιστον 10 έτη)",
        "Ο χρονικός ορίζοντας της πρόσκλησης LEADER (προθεσμία 4/2/2027) καθορίζει τη σειρά των ενεργειών",
      ],
    },
  ];

  return (
    <div
      id="top"
      className="min-h-screen bg-[#f7f5f0] text-[#14191f] font-sans pb-16 lg:pb-0"
    >
      {/* SINGLE CLEAN NAVIGATION BAR: 5 Menu Items + 1 Contact Button (Μέρος Β #1, #2, #7, #8) */}
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-stone-300 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#top"
              className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-[#14191f]"
            >
              ΒΡΟΣΙΝΑ<span className="text-[#9e4727]">2031</span>
            </a>
            <a
              href="/poioi-eimaste"
              className="hidden sm:inline-block px-2.5 py-1 rounded bg-[#f7f5f0] border border-stone-300 text-[#14191f] text-sm font-medium hover:bg-stone-200 transition whitespace-nowrap"
            >
              Ποιοι είμαστε
            </a>
          </div>

          <nav
            aria-label="Κύρια Πλοήγηση"
            className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-[#14191f]"
          >
            <a
              href="/to-schedio"
              className="px-3 py-2 rounded hover:bg-stone-200 transition whitespace-nowrap"
            >
              Το σχέδιο
            </a>
            <a
              href="/gia-ktinotrofous"
              className="px-3 py-2 rounded hover:bg-stone-200 transition whitespace-nowrap"
            >
              Για κτηνοτρόφους
            </a>
            <a
              href="/gia-epicheiriseis"
              className="px-3 py-2 rounded hover:bg-stone-200 transition whitespace-nowrap"
            >
              Για επιχειρήσεις
            </a>
            <a
              href="/gia-ependytes"
              className="px-3 py-2 rounded hover:bg-stone-200 transition whitespace-nowrap"
            >
              Για επενδυτές
            </a>
            <a
              href="/gia-foreis"
              className="px-3 py-2 rounded hover:bg-stone-200 transition whitespace-nowrap"
            >
              Για φορείς
            </a>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#dataroom"
              className="hidden sm:inline-block px-3 py-2 rounded border border-stone-400 text-[#14191f] text-sm font-semibold hover:bg-stone-200 transition whitespace-nowrap"
            >
              Έγγραφα
            </a>
            <a
              href="#contact-form"
              className="px-4 py-2 rounded bg-[#174935] text-white text-sm font-semibold hover:bg-[#123828] transition whitespace-nowrap"
            >
              Επικοινωνία
            </a>
          </div>
        </div>
      </header>

      {/* SCREEN 1: LIGHT WARM HERO — WHAT IT IS, 5-LINE HUMAN STORY, BEFORE/AFTER & 6 KPIs (Μέρος Β #5, #9, #10, Σελ. 4) */}
      <section className="bg-white border-b border-stone-300 py-8 sm:py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 6 cols: Clear Identity + 5-Line Human Story + Direct Actions */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded bg-[#f7f5f0] border border-stone-300 text-sm font-semibold text-[#9e4727]">
                <span>Δήμος Ζίτσας · Δ.Ε. Μολοσσών · Π.Ε. Ιωαννίνων</span>
                <span>·</span>
                <span className="text-[#174935]">
                  1η Πρόσκληση LEADER έως 4 Φεβρουαρίου 2027
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14191f] leading-tight">
                Βροσίνα 2031: Από τη Γη, στο Ράφι, στο Χωριό
              </h1>

              {/* Γ1: Αρχική — σύντομη ιστορία (5 γραμμές, πριν τους πίνακες) */}
              <div className="p-5 rounded-lg bg-[#F7F5F0] border-l-4 border-[#A34A2B] space-y-2">
                <p className="text-base sm:text-lg text-[#14191F] leading-relaxed font-medium">
                  Η Βροσίνα, στο Δήμο Ζίτσας των Ιωαννίνων, αδειάζει. Εμείς προτείνουμε να γίνει ξανά ζωντανή. Το σχέδιο προβλέπει αξιοποίηση του πρώην στρατοπέδου, 25 κατοικίες και περίπου 50 νέες θέσεις εργασίας, με βάση την τοπική παραγωγή. Η επένδυση εκτιμάται σε 10,45 εκ. €, με 63% δημόσια και 37% ιδιωτική συμμετοχή. Καλούμε κατοίκους, παραγωγούς, επιχειρήσεις και φορείς να ενώσουμε δυνάμεις. Ποιος είστε;
                </p>
                <div className="pt-1">
                  <a
                    href="/poioi-eimaste"
                    className="text-sm font-bold text-[#1F5C43] underline hover:text-[#174935]"
                  >
                    Διαβάστε την πλήρη ιστορία («Το χωριό που σωπαίνει») & γνωρίστε την ομάδα →
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#poios-eiste"
                  className="px-5 py-3 rounded bg-[#174935] text-white font-bold text-base hover:bg-[#123828] transition"
                >
                  Επιλέξτε Ποιος Είστε (4 Διαδρομές) ↓
                </a>
                <a
                  href="#contact-form"
                  className="px-5 py-3 rounded bg-white border-2 border-[#14191f] text-[#14191f] font-bold text-base hover:bg-stone-100 transition"
                >
                  Τηλεφωνική Επικοινωνία / Φόρμα
                </a>
                <a
                  href="/documents/Vrosina_2031_Business_Plan_v2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded bg-[#f7f5f0] border border-stone-300 text-[#14191f] font-semibold text-sm hover:bg-stone-200 transition"
                >
                  Πλήρες Σχέδιο PDF (20 σελ.) ↗
                </a>
              </div>
            </div>

            {/* Right 6 cols: Interactive Comparison "Σήμερα <-> 2031" with Hotspots */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f7f5f0] p-2.5 rounded-lg border border-stone-300">
                <span className="text-sm font-bold text-[#14191f] pl-1">
                  Οπτική Σύγκριση Βροσίνας:
                </span>
                <div className="inline-flex rounded bg-white p-1 border border-stone-300 text-sm">
                  <button
                    type="button"
                    onClick={() => setHeroViewMode("2031")}
                    className={`px-3 py-1 rounded font-semibold transition cursor-pointer ${
                      heroViewMode === "2031"
                        ? "bg-[#174935] text-white"
                        : "text-[#14191f] hover:bg-stone-100"
                    }`}
                  >
                    Όραμα 2031 (Χάρτης)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroViewMode("today")}
                    className={`px-3 py-1 rounded font-semibold transition cursor-pointer ${
                      heroViewMode === "today"
                        ? "bg-[#9e4727] text-white"
                        : "text-[#14191f] hover:bg-stone-100"
                    }`}
                  >
                    Σήμερα (Πραγματική)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroViewMode("video")}
                    className={`px-3 py-1 rounded font-semibold transition cursor-pointer ${
                      heroViewMode === "video"
                        ? "bg-[#14191f] text-white"
                        : "text-[#14191f] hover:bg-stone-100"
                    }`}
                  >
                    Βίντεο Drone
                  </button>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden border-2 border-stone-300 bg-stone-900 h-64 sm:h-80">
                {heroViewMode === "video" ? (
                  heroVideoLoaded ? (
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/tr6AsCzCH5M?autoplay=1&rel=0"
                      title="Βροσίνα Ιωαννίνων Drone"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setHeroVideoLoaded(true)}
                      className="relative w-full h-full group cursor-pointer text-left block"
                    >
                      <img
                        src="/images/real/yt-thumb-tr6AsCzCH5M.jpg"
                        alt="Εναέρια λήψη Βροσίνας Ιωαννίνων"
                        width={800}
                        height={500}
                        className="w-full h-64 sm:h-80 object-cover block"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="px-5 py-2.5 rounded bg-white text-[#14191F] font-bold text-base shadow-lg">
                          Αναπαραγωγή Βίντεο Drone (YouTube)
                        </span>
                      </div>
                    </button>
                  )
                ) : heroViewMode === "today" ? (
                  <div className="relative w-full h-64 sm:h-80">
                    <img
                      src="/images/real/real-vrosina-exploringgreece.jpg"
                      alt="Η Βροσίνα Ιωαννίνων σήμερα — Πραγματική φωτογραφία"
                      width={800}
                      height={500}
                      className="w-full h-64 sm:h-80 object-cover block"
                    />
                    <span className="absolute bottom-2 left-2 px-3 py-1 rounded bg-stone-950/85 text-white text-sm font-medium">
                      Πραγματική Φωτογραφία: Η Βροσίνα σήμερα (58 κάτοικοι, Απογραφή 2021)
                    </span>
                  </div>
                ) : (
                  <div className="relative w-full h-64 sm:h-80">
                    <img
                      src="/images/hero-masterplan.jpg"
                      alt="Ενδεικτική Αρχιτεκτονική Απεικόνιση (Concept Render) Βροσίνα 2031"
                      width={800}
                      height={500}
                      className="w-full h-64 sm:h-80 object-cover block"
                    />
                    {MASTERPLAN_HOTSPOTS.map((spot, idx) => {
                      const isSelected = activeHotspot.id === spot.id;
                      return (
                        <button
                          key={spot.id}
                          type="button"
                          onClick={() => setActiveHotspot(spot)}
                          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                          aria-label={`Σημείο ${idx + 1}: ${spot.title}`}
                          className={`-translate-x-1/2 -translate-y-1/2 absolute w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center transition cursor-pointer shadow-md ${
                            isSelected
                              ? "bg-[#A34A2B] text-white ring-4 ring-white scale-110 z-20"
                              : "bg-white text-[#14191F] hover:bg-[#1F5C43] hover:text-white z-10"
                          }`}
                        >
                          0{idx + 1}
                        </button>
                      );
                    })}
                    <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-stone-950/85 text-white text-sm font-medium border border-stone-600">
                      Ενδεικτική Αρχιτεκτονική Απεικόνιση (Concept Render)
                    </span>
                  </div>
                )}
              </div>

              {/* Active Hotspot Detail Bar with Thumbnail */}
              <div className="p-4 rounded-lg bg-[#F7F5F0] border border-stone-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <img
                    src={activeHotspot.image}
                    alt={activeHotspot.title}
                    width={96}
                    height={64}
                    className="w-24 h-16 rounded object-cover border border-stone-300 shrink-0"
                  />
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-[#A34A2B]">
                      {activeHotspot.category} · {activeHotspot.capex}
                    </div>
                    <div className="font-serif font-bold text-base text-[#14191F]">
                      {activeHotspot.title}
                    </div>
                    <p className="text-sm text-[#14191F]">
                      {activeHotspot.description}
                    </p>
                  </div>
                </div>
                <a
                  href="/to-schedio"
                  className="px-3.5 py-2 rounded bg-white border border-stone-400 text-[#14191F] text-sm font-semibold hover:bg-stone-200 transition shrink-0"
                >
                  Όλοι οι 4 Πυλώνες →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DARK ACCENT STRIP 1: THE 6 CORE KPIs (Μέρος Β #10: Το σκούρο μόνο για τονισμό KPI) */}
      <section className="bg-[#14191f] text-white py-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {HERO_KPIS.map((kpi, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-stone-900 border border-stone-700 space-y-1"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#c89d54]">
                  {kpi.value}
                </div>
                <div className="font-serif font-bold text-base text-white">
                  {kpi.label}
                </div>
                <div className="text-sm text-stone-300 leading-snug">
                  {kpi.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCREEN 2 (#poios-eiste): "ΠΟΙΟΣ ΕΙΣΤΕ;" — 4 LARGE AUDIENCE CARDS OPENING THE 4 DEDICATED PAGES (Μέρος Β #1, #12, #13, Σελ. 4) */}
      <section
        id="poios-eiste"
        className="py-12 sm:py-16 bg-[#f7f5f0] border-b border-stone-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="text-sm font-bold text-[#9e4727]">
              ΕΠΙΛΕΞΤΕ ΤΗ ΔΙΚΗ ΣΑΣ ΔΙΑΔΡΟΜΗ (4 ΕΞΕΙΔΙΚΕΥΜΕΝΕΣ ΣΕΛΙΔΕΣ ΑΝΑ ΚΟΙΝΟ)
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f]">
              Ποιος Είστε; Βρείτε Αμέσως Όσα Αφορούν Εσάς
            </h2>
            <p className="text-base text-stone-800 leading-relaxed">
              Κάθε ομάδα έχει διαφορετικά ερωτήματα. Πατήστε στην ιδιότητά σας για να ανοίξετε την αντίστοιχη αναλυτική σελίδα με τους όρους, τα ποσά και τα εκτυπώσιμα έντυπα:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {audiencePathCards.map((card) => (
              <article
                key={card.href}
                className={`bg-white rounded-lg p-6 sm:p-7 border border-stone-300 ${card.topBorderClass} shadow-xs flex flex-col justify-between space-y-5`}
              >
                <div className="space-y-3">
                  <div className={`text-sm font-bold ${card.badgeColorClass}`}>
                    {card.badge}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
                    {card.title}
                  </h3>
                  <p className="text-base text-[#14191F] leading-relaxed">
                    {card.summary}
                  </p>
                  <ul className="space-y-1.5 pt-2 border-t border-stone-200 text-sm text-[#14191F]">
                    {card.highlights.map((hl, i) => (
                      <li key={i} className="leading-relaxed">
                        • {hl}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={card.href}
                    className={`w-full sm:w-auto text-center px-5 py-3 rounded ${card.buttonColorClass} text-white font-bold text-base transition`}
                  >
                    {card.buttonLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SCREEN 3 (#masterplan): FIRST THE PLAN (4 PILLARS), THEN THE PUBLIC BENEFIT (Μέρος Β #6) */}
      <section
        id="masterplan"
        className="py-12 sm:py-16 bg-white border-b border-stone-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <div className="text-sm font-bold text-[#174935]">
                ΤΟ ΣΧΕΔΙΟ ΣΕ 4 ΠΥΛΩΝΕΣ (ΠΡΟΫΠΟΛΟΓΙΣΜΟΣ 10,45 ΕΚ. €)
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f]">
                Τι Χτίζεται στη Βροσίνα και Πώς Λειτουργεί το Οικοσύστημα
              </h2>
              <p className="text-base text-stone-800 leading-relaxed">
                Οι 4 πυλώνες λειτουργούν ως ενιαία αλυσίδα αξίας: οι κτηνοτρόφοι και οι αμπελουργοί προμηθεύουν το Τυροκομείο και το Οινοποιείο στο πρώην Στρατόπεδο, οι εργαζόμενοι κατοικούν στα 20 ανακαινισμένα σπίτια και οι επισκέπτες του Γεφυριού 1605 και της Μονής Ραϊδιώτισσας διαμένουν στους 10 ξενώνες.
              </p>
            </div>
            <a
              href="/to-schedio"
              className="px-5 py-3 rounded bg-[#14191f] text-white font-bold text-base hover:bg-[#174935] transition shrink-0"
            >
              Αναλυτική Σελίδα «Το Σχέδιο» →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FOUR_PILLARS.map((pillar) => (
              <article
                key={pillar.id}
                className="bg-[#f7f5f0] rounded-lg border border-stone-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-stone-900">
                    <img
                      src={pillar.heroImage}
                      alt={pillar.title}
                      width={500}
                      height={312}
                      loading="lazy"
                      className="w-full h-48 object-cover block"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-stone-950/85 text-[#C89D54] font-bold text-sm">
                      Πυλώνας {pillar.number}
                    </span>
                    <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-stone-950/80 text-white text-xs">
                      Concept Render
                    </span>
                  </div>
                  <div className="p-5 space-y-2.5">
                    <div className="text-sm font-bold text-[#174935]">
                      {pillar.shortBudget}
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#14191f] leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-stone-800 leading-relaxed">
                      {pillar.summary}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-4 pt-2 border-t border-stone-200 grid grid-cols-2 gap-2">
                  {pillar.kpis.slice(0, 2).map((k, i) => (
                    <div key={i} className="text-sm">
                      <strong className="block text-[#14191f]">{k.value}</strong>
                      <span className="text-stone-700">{k.label}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Concise Fiscal Proof Summary Card (After the Plan, linking to /gia-foreis — Μέρος Β #6) */}
          <div className="bg-[#f7f5f0] rounded-lg p-6 sm:p-8 border-2 border-[#174935] space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-300 pb-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-[#174935]">
                  ΔΗΜΟΣΙΟΝΟΜΙΚΟ ΙΣΟΖΥΓΙΟ (ΜΕΤΑ ΤΗΝ ΠΑΡΟΥΣΙΑΣΗ ΤΟΥ ΣΧΕΔΙΟΥ)
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
                  Τι Κερδίζει το Ελληνικό Δημόσιο: ~463.700 € / έτος σε Άμεσα Έσοδα (Απόσβεση σε 17 Έτη)
                </h3>
                <p className="text-base text-stone-800">
                  Η δημόσια συμμετοχή των 6,58 εκ. € (63% του προγράμματος) δεν είναι δαπάνη χωρίς επιστροφή: αποσβένεται από ασφαλιστικές εισφορές (327.600 €/έτος), φόρους εισοδήματος και το αντάλλαγμα 2–3% υπέρ Τ.Α.ΕΘ.Α., χωρίς καν να συνυπολογίζεται ο ΦΠΑ.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 shrink-0">
                <a
                  href="/gia-foreis"
                  className="px-4 py-2.5 rounded bg-[#174935] text-white font-bold text-sm hover:bg-[#123828] transition"
                >
                  Πλήρης Ανάλυση για Φορείς →
                </a>
                <a
                  href="/documents/Vrosina_2031_What_The_State_Gains.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded bg-white border border-stone-400 text-[#14191f] font-semibold text-sm hover:bg-stone-200 transition"
                >
                  Μελέτη PDF (3 Σελίδες) ↓
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PUBLIC_FISCAL_BENEFIT_STUDY.headlineMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded bg-white border border-stone-300 space-y-1"
                >
                  <div className="text-xl font-bold text-[#174935]">
                    {m.value}
                  </div>
                  <div className="font-serif font-bold text-base text-[#14191f]">
                    {m.label}
                  </div>
                  <p className="text-sm text-stone-700">{m.sub}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded bg-white border border-stone-300 space-y-1.5">
              <div className="text-sm font-bold text-[#9e4727]">
                ΤΙ ΔΕΝ ΖΗΤΑΜΕ ΑΠΟ ΤΟ ΚΡΑΤΟΣ:
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-stone-800">
                {WHAT_WE_DO_NOT_ASK_STATE.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SCREEN 4 (#poioi-eimaste): WHO WE ARE, WHERE WE STAND TODAY & LOCAL VOICES (Μέρος Β #11, Σελ. 4) */}
      <section
        id="poioi-eimaste"
        className="py-12 sm:py-16 bg-[#f7f5f0] border-b border-stone-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <div className="text-sm font-bold text-[#9e4727]">
                ΠΟΙΟΙ ΕΙΜΑΣΤΕ & ΠΟΥ ΒΡΙΣΚΟΜΑΣΤΕ ΣΗΜΕΡΑ
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f]">
                Το Ανθρώπινο Πρόσωπο της Πρωτοβουλίας & Η Κατάσταση Ωρίμανσης
              </h2>
              <p className="text-base text-stone-800">
                Ποιος συντονίζει το εγχείρημα, σε ποιο νομικό στάδιο βρίσκονται οι φορείς σήμερα και ποια είναι τα επόμενα βήματα με ημερομηνίες.
              </p>
            </div>
            <a
              href="/poioi-eimaste"
              className="px-5 py-3 rounded bg-[#14191f] text-white font-bold text-base hover:bg-[#174935] transition shrink-0"
            >
              Σελίδα «Ποιοι είμαστε & Ιστορία» →
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Γ6: Ποιοι είμαστε + Φωτογραφία & Εμπειρία Αθανάσιου Βούρδα */}
            <div className="lg:col-span-6 bg-white rounded-lg p-6 sm:p-7 border-2 border-[#14191F] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-stone-200 pb-4">
                <img
                  src="/images/real/athanasios-vourdas-portrait.jpg"
                  alt="Αθανάσιος Βούρδας — Εμπνευστής & Συντονιστής της Πρωτοβουλίας Βροσίνα 2031"
                  width={112}
                  height={112}
                  loading="lazy"
                  className="w-24 h-24 rounded-full object-cover object-top border-2 border-[#A34A2B] shrink-0 shadow-sm"
                />
                <div>
                  <div className="text-sm font-bold text-[#A34A2B]">
                    Ποιοι είμαστε
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
                    Αθανάσιος (Θανάσης) Βούρδας
                  </h3>
                  <div className="text-sm font-semibold text-[#1F5C43]">
                    Εμπνευστής & Συντονιστής Πρωτοβουλίας «Βροσίνα 2031»
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-base text-[#14191F] leading-relaxed">
                <p>
                  Η <strong>Βροσίνα 2031</strong> ξεκίνησε από τον{" "}
                  <strong>Θανάση Βούρδα</strong>, με καταγωγή από τη Βροσίνα και
                  εμπειρία στην επικοινωνία, το μάρκετινγκ, τον τουρισμό και την
                  επιχειρηματική ανάπτυξη.
                </p>
                <p>
                  Συγκροτείται η <strong>«Επιτροπή Βροσίνα 2031»</strong> για την
                  προώθηση του σχεδίου. Καλούμε την{" "}
                  <strong>Αδελφότητα Βροσινιωτών</strong> και{" "}
                  <strong>Βροσινιώτες επαγγελματίες</strong> (νομικούς,
                  μηχανικούς, αρχιτέκτονες και άλλους) να συμμετάσχουν
                  εθελοντικά.
                </p>
                <p>
                  Η νομική μορφή (κοινωνική συνεταιριστική επιχείρηση) βρίσκεται
                  υπό σύσταση. Το κάλεσμα για ιδρυτικά μέλη είναι ανοιχτό
                  (ελάχιστη μερίδα 100 €, ν. 4430/2016).
                </p>
                <p className="font-semibold text-[#1F5C43]">
                  Επικοινωνία:{" "}
                  <a href="#contact-form" className="underline">
                    μέσω της φόρμας του site ↓
                  </a>
                </p>
              </div>
            </div>

            {/* Γ6: Πού βρισκόμαστε τώρα (Κατάσταση έργου, Νοέμβριος 2026) + Α3 (Πώς λειτουργούμε) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white rounded-lg p-6 border-2 border-[#1F5C43] space-y-3">
                <div className="text-sm font-bold text-[#1F5C43]">
                  Πού βρισκόμαστε τώρα
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14191F]">
                  Κατάσταση έργου, Νοέμβριος 2026
                </h3>
                <ul className="space-y-2.5 text-base text-[#14191F] leading-relaxed">
                  <li className="p-3 rounded bg-[#F7F5F0] border border-stone-300">
                    <strong>✔</strong> Δημοσιεύθηκε το δελτίο τύπου και το site.
                    Δύο τηλεοπτικές παρουσιάσεις.
                  </li>
                  <li className="p-3 rounded bg-[#F7F5F0] border border-stone-300">
                    <strong>✔</strong> Ετοιμάστηκε το επιχειρησιακό σχέδιο και η
                    ανάλυση του οφέλους για το Δημόσιο.
                  </li>
                  <li className="p-3 rounded bg-[#F7F5F0] border border-stone-300">
                    <strong>✔</strong> Ετοιμάστηκε πρόταση συνεργασίας με τη
                    Γαλακτοκομική Σχολή Ιωαννίνων.
                  </li>
                  <li className="p-3 rounded bg-amber-50 border border-[#C89D54]">
                    <strong>● Σε εξέλιξη:</strong> σύσταση κοινωνικής
                    συνεταιριστικής επιχείρησης, με ανοιχτό κάλεσμα για ιδρυτικά
                    μέλη.
                  </li>
                  <li className="p-3 rounded bg-[#F7F5F0] border border-stone-300">
                    <strong>○ Επόμενο:</strong> αίτημα παραχώρησης του
                    στρατοπέδου και προετοιμασία για την πρόσκληση LEADER
                    (προθεσμία 4/2/2027).
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-5 border border-stone-300 space-y-2">
                <h3 className="font-serif font-bold text-lg text-[#14191F]">
                  Πώς λειτουργούμε
                </h3>
                <p className="text-sm text-[#14191F] leading-relaxed">
                  Η Βροσίνα 2031 είναι μια μη κομματική πρωτοβουλία για την
                  αναγέννηση του χωριού. Απευθυνόμαστε σε όλους τους φορείς,
                  ανεξάρτητα από παράταξη, με το ίδιο αίτημα και το ίδιο υλικό.
                  Δεν ζητάμε από το Δημόσιο να αναλάβει το κόστος της
                  λειτουργίας. Ζητάμε θεσμική και αδειοδοτική στήριξη για ένα
                  έργο που, με βάση τις εκτιμήσεις μας, αποδίδει στο Δημόσιο
                  έσοδα και θέσεις εργασίας. Οι αποφάσεις της κοινότητας
                  λαμβάνονται με ένα μέλος, μία ψήφο. Όλα τα έγγραφα βρίσκονται
                  στο Κέντρο Τεκμηρίωσης.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ABOUT_US_AND_STATUS.localVoices.map((v, idx) => (
              <blockquote
                key={idx}
                className="bg-white rounded-lg p-5 border border-stone-300 border-l-4 border-l-[#174935] space-y-2"
              >
                <p className="font-serif italic text-base text-stone-900 leading-relaxed">
                  {v.quote}
                </p>
                <div className="text-sm font-bold text-[#174935]">{v.role}</div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* SCREEN 5 (#autopsia-real): MILITARY CAMP AUTOPSY, VIDEO ARCHIVE & TV APPEARANCES (Μέρος Β Σελ. 4) */}
      <section
        id="autopsia-real"
        className="py-12 sm:py-16 bg-white border-b border-stone-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <div className="text-sm font-bold text-[#9e4727]">
                ΑΥΤΟΨΙΑ ΠΕΔΙΟΥ · ΣΤΡΑΤΟΠΕΔΟ «ΠΑΠΑΚΩΝΣΤΑΝΤΙΝΟΥ» (13.695 Τ.Μ.) & ΜΜΕ
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f]">
                Τα 8 Υφιστάμενα Κτίρια του Στρατοπέδου, Βίντεο Πεδίου & Τηλεόραση
              </h2>
              <p className="text-base text-stone-800">
                Δείτε την πραγματική εικόνα του πρώην Στρατοπέδου Βροσίνας σήμερα, τις τηλεοπτικές παρουσιάσεις της πρωτοβουλίας και τα βίντεο drone του χωριού.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <a
                href="/stratopedo-vrosinas"
                className="px-4 py-2.5 rounded bg-[#14191f] text-white font-semibold text-sm hover:bg-[#174935] transition"
              >
                Αναλυτική Σελίδα Στρατοπέδου →
              </a>
              <a
                href="/gefyri-vrosinas-raidiotissa"
                className="px-4 py-2.5 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] font-semibold text-sm hover:bg-stone-200 transition"
              >
                Γεφύρια 1605 & Μονή 1628 →
              </a>
            </div>
          </div>

          {/* 3 Real vs 2031 Comparisons (Explicit height so images always render cleanly) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {REAL_VS_2031_COMPARISONS.map((pair) => (
              <article
                key={pair.id}
                className="bg-[#F7F5F0] rounded-lg border border-stone-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="grid grid-cols-2 gap-0.5 bg-stone-300">
                    <div className="relative h-48 sm:h-52 bg-stone-900">
                      <img
                        src={pair.realImage}
                        alt={pair.realCaption}
                        width={400}
                        height={300}
                        loading="lazy"
                        className="w-full h-48 sm:h-52 object-cover block"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-stone-950/85 text-white text-xs font-semibold">
                        Σήμερα (Πεδίο)
                      </span>
                    </div>
                    <div className="relative h-48 sm:h-52 bg-stone-900">
                      <img
                        src={pair.visionImage}
                        alt={pair.visionCaption}
                        width={400}
                        height={300}
                        loading="lazy"
                        className="w-full h-48 sm:h-52 object-cover block"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#1F5C43] text-white text-xs font-semibold">
                        Όραμα 2031
                      </span>
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-stone-950/80 text-white text-xs">
                        Concept Render
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="text-sm font-bold text-[#A34A2B]">
                      {pair.subtitle} · {pair.capex}
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#14191F]">
                      {pair.title}
                    </h3>
                    <p className="text-sm text-[#14191F] leading-relaxed">
                      <strong>Σήμερα:</strong> {pair.realCaption}
                    </p>
                    <p className="text-sm text-[#14191F] leading-relaxed">
                      <strong>Σχέδιο 2031:</strong> {pair.visionCaption}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Interactive 8-Building Camp Tour + Video */}
          <div className="bg-[#f7f5f0] rounded-lg p-6 border border-stone-300 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-300 pb-4">
              <div>
                <div className="text-sm font-bold text-[#174935]">
                  ΒΙΝΤΕΟ ΠΕΡΙΗΓΗΣΗΣ 12:31 & ΤΑ 8 ΚΤΙΡΙΑ ΤΟΥ ΣΤΡΑΤΟΠΕΔΟΥ
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
                  {CAMP_VIDEO_AUTOPSY.title}
                </h3>
              </div>
              <a
                href={CAMP_VIDEO_AUTOPSY.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#9e4727] underline"
              >
                Πηγή Βίντεο: {CAMP_VIDEO_AUTOPSY.creator} ↗
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-6 space-y-3">
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-stone-900 border border-stone-400">
                  {autopsyVideoLoaded ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${CAMP_VIDEO_AUTOPSY.videoId}?start=${CAMP_VIDEO_AUTOPSY.steps[activeAutopsyStep].startSeconds}&autoplay=1&rel=0`}
                      title={CAMP_VIDEO_AUTOPSY.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAutopsyVideoLoaded(true)}
                      className="relative w-full h-full group cursor-pointer text-left"
                    >
                      <img
                        src="/images/real/camp-hwaJv7EIjLg-maxresdefault.jpg"
                        alt={CAMP_VIDEO_AUTOPSY.title}
                        width={640}
                        height={360}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                        <span className="px-5 py-2.5 rounded bg-white text-[#14191f] font-bold text-base shadow-lg">
                          Αναπαραγωγή Βίντεο Αυτοψίας (12:31)
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {CAMP_VIDEO_AUTOPSY.steps.map((st, idx) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        setActiveAutopsyStep(idx);
                        setAutopsyVideoLoaded(true);
                      }}
                      className={`px-3 py-1.5 rounded text-sm font-semibold transition cursor-pointer ${
                        activeAutopsyStep === idx
                          ? "bg-[#14191f] text-white"
                          : "bg-white border border-stone-300 text-[#14191f] hover:bg-stone-200"
                      }`}
                    >
                      Κτίριο {st.stepNumber} ({st.timeDisplay})
                    </button>
                  ))}
                </div>

                {(() => {
                  const st = CAMP_VIDEO_AUTOPSY.steps[activeAutopsyStep];
                  return (
                    <div className="p-5 rounded-lg bg-white border border-stone-300 space-y-3">
                      {st.imageType === "direct" ? (
                        <img
                          src={st.imageSrc}
                          alt={st.buildingTitle}
                          width={640}
                          height={320}
                          loading="lazy"
                          className="w-full h-44 object-cover rounded border border-stone-300"
                        />
                      ) : (
                        <div
                          role="img"
                          aria-label={st.buildingTitle}
                          className="w-full h-44 rounded border border-stone-300 bg-no-repeat"
                          style={{
                            backgroundImage: `url(${st.imageSrc})`,
                            backgroundSize: "300% 300%",
                            backgroundPosition: st.spritePos || "0% 0%",
                          }}
                        />
                      )}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold">
                        <span className="text-[#A34A2B]">
                          Κτίριο {st.stepNumber} · Χρόνος: {st.timeDisplay}
                        </span>
                        <span className="text-[#1F5C43]">
                          {st.capexAllocation}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-lg text-[#14191F]">
                        {st.buildingTitle}
                      </h4>
                      <p className="text-sm text-[#14191F] leading-relaxed">
                        <strong>Εικόνα Πεδίου:</strong> {st.currentAutopsy}
                      </p>
                      <p className="text-sm text-[#14191F] leading-relaxed bg-[#F7F5F0] p-3 rounded border-l-4 border-[#1F5C43]">
                        <strong>Προτεινόμενη Χρήση 2031 ({st.future2031Role}):</strong>{" "}
                        {st.future2031Details}
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* TV Media Appearances + Drone Video Archive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TV_MEDIA_APPEARANCES.map((tv) => (
              <div
                key={tv.id}
                className="bg-[#f7f5f0] rounded-lg border border-stone-300 overflow-hidden flex flex-col justify-between"
              >
                <div className="aspect-video w-full bg-stone-900">
                  {loadedTvVideoIds[tv.id] ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${tv.id}?autoplay=1&rel=0`}
                      title={tv.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setLoadedTvVideoIds((prev) => ({
                          ...prev,
                          [tv.id]: true,
                        }))
                      }
                      className="relative w-full h-full group cursor-pointer text-left"
                    >
                      <img
                        src={tv.thumbnail}
                        alt={tv.title}
                        width={640}
                        height={360}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="px-4 py-2 rounded bg-white text-[#14191f] font-bold text-sm shadow-lg">
                          Αναπαραγωγή Τηλεοπτικής Συνέντευξης
                        </span>
                      </div>
                    </button>
                  )}
                </div>
                <div className="p-5 space-y-2">
                  <div className="text-sm font-bold text-[#174935]">
                    {tv.channel} · {tv.speaker}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#14191f]">
                    {tv.title}
                  </h3>
                  <p className="text-sm text-stone-800 leading-relaxed">
                    {tv.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Field Videos Toggle */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif font-bold text-xl text-[#14191f]">
                Βίντεο Πεδίου & Drone: Πέτρινα Γεφύρια (1605) & Μονή Ραϊδιώτισσας (1628)
              </h3>
              <button
                type="button"
                onClick={() => setShowAllVideos(!showAllVideos)}
                className="px-4 py-2 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] text-sm font-semibold hover:bg-stone-200 cursor-pointer"
              >
                {showAllVideos
                  ? "Εμφάνιση 3 Βασικών Βίντεο"
                  : `Προβολή Όλων των ${REAL_VROSINA_VIDEOS.length} Βίντεο ↓`}
              </button>
            </div>

            {activeVideoId && (
              <div className="bg-stone-900 p-4 rounded-lg border border-stone-700">
                <div className="aspect-video w-full rounded overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                    title="Βίντεο Βροσίνας"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(showAllVideos
                ? REAL_VROSINA_VIDEOS
                : REAL_VROSINA_VIDEOS.slice(0, 3)
              ).map((video) => (
                <div
                  key={video.id}
                  onClick={() => setActiveVideoId(video.id)}
                  className="bg-[#f7f5f0] rounded-lg border border-stone-300 overflow-hidden cursor-pointer hover:border-stone-500 transition"
                >
                  <div className="relative aspect-video bg-stone-900">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      width={480}
                      height={270}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-white text-[#14191f] text-xs font-bold shadow">
                      Αναπαραγωγή
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <div className="text-sm font-bold text-[#9e4727]">
                      {video.category}
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#14191f]">
                      {video.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCREEN 6 (#investors): DARK ACCENT SECTION FOR INVESTOR SIMULATOR (Μέρος Β #10: Το σκούρο μόνο για τονισμό επενδυτικής ενότητας) */}
      <section
        id="investors"
        className="py-12 sm:py-16 bg-[#14191f] text-white border-b border-stone-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <div className="text-sm font-bold text-[#c89d54]">
                ΕΠΕΝΔΥΤΙΚΟΣ ΥΠΟΛΟΓΙΣΤΗΣ & 3 ΣΕΝΑΡΙΑ ΙΣΟΛΟΓΙΣΜΟΥ
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                Μόχλευση Κεφαλαίων (63% Δημόσιο / 37% Ιδιωτικά) & Ανάλυση Κινδύνων
              </h2>
              <p className="text-base text-stone-200">
                Επιλέξτε κανάλι συμμετοχής και σενάριο λειτουργίας ή ανοίξτε την πλήρη σελίδα επενδυτών για λήψη του οικονομικού μοντέλου (.csv / Excel).
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <a
                href="/gia-ependytes"
                className="px-4 py-2.5 rounded bg-[#c89d54] text-stone-950 font-bold text-sm hover:bg-amber-400 transition"
              >
                Πλήρης Σελίδα «Για Επενδυτές» →
              </a>
              <a
                href="/documents/Vrosina_2031_Financial_Model.csv"
                download
                className="px-4 py-2.5 rounded bg-stone-800 border border-stone-600 text-white font-semibold text-sm hover:bg-stone-700 transition"
              >
                Λήψη Οικονομικού Μοντέλου (.csv) ↓
              </a>
            </div>
          </div>

          <div className="bg-stone-900 border border-stone-700 rounded-lg p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  id: "strategic",
                  label: "Στρατηγικός Εταίρος (35%–40%)",
                  sub: "Τυροκομείο & Οινοποιείο · Έως 75% Επιδότηση",
                },
                {
                  id: "agrotourism",
                  label: "Ξενώνες Φιλοξενίας (LEADER)",
                  sub: "10 Παραδοσιακοί Ξενώνες · Έως 80% Επιδότηση",
                },
                {
                  id: "benefactor",
                  label: "Ταμείο Ευεργετών (ΑΜΚΕ)",
                  sub: "Δωρεά ανά Έργο, Ονοματοδοσία & ESG",
                },
                {
                  id: "diaspora",
                  label: "Επενδυτές Διασποράς (15%)",
                  sub: "Συμμετοχή στην Εμπορική Θυγατρική",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setInvestorTrack(tab.id as typeof investorTrack)
                  }
                  className={`p-4 rounded border text-left transition cursor-pointer ${
                    investorTrack === tab.id
                      ? "bg-[#c89d54] text-stone-950 border-white font-bold"
                      : "bg-stone-950 hover:bg-stone-800 text-white border-stone-700"
                  }`}
                >
                  <div className="text-base font-bold">{tab.label}</div>
                  <div
                    className={`text-sm mt-1 ${
                      investorTrack === tab.id
                        ? "text-stone-900"
                        : "text-stone-300"
                    }`}
                  >
                    {tab.sub}
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-4 border-t border-stone-800">
              <div className="lg:col-span-5 space-y-4 bg-stone-950 p-5 rounded border border-stone-700">
                <label
                  htmlFor="investor-capital-slider"
                  className="text-sm font-semibold text-stone-200 block"
                >
                  Ίδια Συμμετοχή / Κεφάλαιο που Διαθέτετε:
                </label>
                <div className="text-3xl font-bold text-[#c89d54]">
                  {investmentAmount.toLocaleString("el-GR")} €
                </div>
                <input
                  id="investor-capital-slider"
                  type="range"
                  min={25000}
                  max={1000000}
                  step={25000}
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full accent-[#c89d54] cursor-pointer"
                />
                <div className="flex justify-between text-sm text-stone-300">
                  <span>25.000 €</span>
                  <span>500.000 €</span>
                  <span>1.000.000 €</span>
                </div>
                <div className="pt-2 border-t border-stone-800 text-sm text-emerald-300">
                  {investorSimulation.grantRateLabel}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-xl font-bold text-white">
                    {investorSimulation.title}
                  </h3>
                  <div className="inline-flex rounded bg-stone-950 p-1 border border-stone-700 text-sm">
                    {THREE_SCENARIOS.map((sc) => (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => setSelectedScenarioId(sc.id)}
                        className={`px-2.5 py-1 rounded font-semibold cursor-pointer ${
                          selectedScenarioId === sc.id
                            ? "bg-[#c89d54] text-stone-950"
                            : "text-stone-200"
                        }`}
                      >
                        {sc.name.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-stone-950 border border-stone-700 rounded p-4">
                    <div className="text-sm text-stone-300">
                      Συνολική Αξία Έργου
                    </div>
                    <div className="text-xl font-bold text-white mt-1">
                      {investorSimulation.mobilizedCapex.toLocaleString("el-GR")} €
                    </div>
                  </div>
                  <div className="bg-stone-950 border border-emerald-700 rounded p-4">
                    <div className="text-sm text-emerald-300">
                      Δημόσια Επιδότηση
                    </div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">
                      +{investorSimulation.publicGrant.toLocaleString("el-GR")} €
                    </div>
                  </div>
                  <div className="bg-stone-950 border border-[#c89d54] rounded p-4">
                    <div className="text-sm text-[#c89d54]">
                      {investorSimulation.annualBenefitLabel}
                    </div>
                    <div className="text-xl font-bold text-[#c89d54] mt-1">
                      {investorSimulation.annualBenefitValue}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded bg-stone-950 border border-stone-700 text-sm text-amber-200">
                  {investorSimulation.paybackLabel}
                </div>

                {/* Α4: Υποχρεωτική Επιφύλαξη κάτω από τον υπολογιστή με ποσά */}
                <div className="p-3.5 rounded bg-stone-950 border-l-4 border-[#C89D54] text-sm text-stone-200 leading-relaxed">
                  Τα ποσά είναι ενδεικτικά και βασίζονται σε υποθέσεις. Δεν αποτελούν υπόσχεση ή εγγύηση χρηματοδότησης. Η ενίσχυση εξαρτάται από την πρόσκληση LEADER (545/07-10-2026, προθεσμία 4/2/2027), τα κριτήρια επιλογής και την έγκριση του φορέα. Πριν από κάθε απόφαση ζητήστε τη γνώμη λογιστή ή συμβούλου.
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal(
                        investorTrack === "benefactor"
                          ? "benefactor"
                          : "investor",
                        `Υπολογιστής Επενδύσεων — ${investorSimulation.title}`,
                        `Κανάλι: ${investorSimulation.title} | Ίδια Συμμετοχή: ${investmentAmount.toLocaleString("el-GR")} € | Σενάριο: ${activeScenario.name}`
                      )
                    }
                    className="px-5 py-3 rounded bg-[#c89d54] hover:bg-amber-400 text-stone-950 font-bold text-base transition cursor-pointer"
                  >
                    Εκδήλωση Επενδυτικού / Χορηγικού Ενδιαφέροντος →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Concise Governance & Risk Summary Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-900 border border-stone-700 rounded-lg p-5 space-y-2">
              <div className="text-sm font-bold text-[#c89d54]">
                ΑΝΤΙΣΥΜΒΑΛΛΟΜΕΝΟΣ ΦΟΡΕΑΣ & ΚΑΤΑΣΤΑΤΙΚΕΣ ΔΙΚΛΕΙΔΕΣ
              </div>
              <p className="text-sm text-stone-200 leading-relaxed">
                {INVESTOR_RISK_AND_USE_OF_FUNDS.counterpartyNote}
              </p>
              <p className="text-sm text-stone-300 leading-relaxed">
                • Σύνθεση Εμπορικής Θυγατρικής: 30% Συνεταιρισμός Παραγωγών, έως 35%–40% Στρατηγικός Εταίρος, έως 20% Δήμος Ζίτσας (εντός ορίου 25% ΜΜΕ), 15% Ταμείο Ευεργετών & Διασπορά ({GOVERNANCE_SHIELD.clauses.length} καταστατικές ρήτρες προστασίας).
              </p>
            </div>

            <div className="bg-stone-900 border border-stone-700 rounded-lg p-5 space-y-2">
              <div className="text-sm font-bold text-emerald-400">
                3 ΣΕΝΑΡΙΑ ΕΤΟΥΣ 5 (ΣΥΝΤΗΡΗΤΙΚΟ · ΒΑΣΙΚΟ · ΑΙΣΙΟΔΟΞΟ)
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-sm">
                {THREE_SCENARIOS.map((sc) => (
                  <div
                    key={sc.id}
                    className="p-3 rounded bg-stone-950 border border-stone-700"
                  >
                    <div className="font-bold text-white">
                      {sc.name.split(" ")[0]}
                    </div>
                    <div className="text-[#c89d54] font-bold">
                      {sc.revenueFormatted}
                    </div>
                    <div className="text-stone-300">
                      {sc.milkTons} τν · {sc.jobsYear5} θέσεις
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCREEN 7 (#dataroom): DATA ROOM DOCUMENTS & FAQ (Light Unified Theme) */}
      <section
        id="dataroom"
        className="py-12 sm:py-16 bg-white border-b border-stone-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-3xl space-y-2">
                <div className="text-sm font-bold text-[#174935]">
                  ΕΠΙΣΗΜΟ ΑΡΧΕΙΟ ΕΓΓΡΑΦΩΝ (DATA ROOM — {DATA_ROOM_DOCUMENTS.length} ΑΡΧΕΙΑ)
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f]">
                  Ανοιχτή Πρόσβαση σε Όλες τις Μελέτες, το Οικονομικό Μοντέλο & τα Έντυπα
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowAllDocs(!showAllDocs)}
                className="px-4 py-2.5 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] font-semibold text-sm hover:bg-stone-200 cursor-pointer shrink-0"
              >
                {showAllDocs
                  ? "Εμφάνιση 6 Βασικών Αρχείων"
                  : `Προβολή Όλων των ${DATA_ROOM_DOCUMENTS.length} Αρχείων ↓`}
              </button>
            </div>

            {/* Web v2.1 vs PDF v2.0 Reconciliation Notice (Μέρος Α #34γ) */}
            <div className="p-4 rounded-lg bg-[#f7f5f0] border-l-4 border-[#9e4727] text-sm text-stone-800 leading-relaxed">
              <strong>Σημείωση Έκδοσης (Διαδικτυακή Έκδοση 2.1 — Νοέμβριος 2026 vs Αρχικό PDF v2.0 — Οκτώβριος 2026):</strong>{" "}
              Τα μεγέθη στην ιστοσελίδα αποτυπώνουν την επικαιροποιημένη Έκδοση 2.1, η οποία εναρμονίζει την ποσοστιαία κατανομή σε <strong>63% δημόσιους/ΕΕ πόρους (6,58 εκ. €) / 37% ιδιωτικά & συνεταιριστικά κεφάλαια (3,87 εκ. €)</strong>, τη διάρκεια των μακροχρόνιων μισθώσεων σε <strong>10–15 έτη</strong> και τις 4 κατηγορίες προϋπολογισμού (Α: 2,25 εκ. €, Β: 3,17 εκ. €, Γ: 2,49 εκ. €, Δ: 2,54 εκ. € = 10,45 εκ. €).
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(showAllDocs
                ? DATA_ROOM_DOCUMENTS
                : DATA_ROOM_DOCUMENTS.slice(0, 6)
              ).map((doc, idx) => (
                <article
                  key={idx}
                  className="bg-[#f7f5f0] rounded-lg p-5 border border-stone-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-sm font-semibold">
                      <span className="text-[#9e4727]">{doc.category}</span>
                      <span className="px-2.5 py-0.5 rounded bg-white border border-stone-300 text-[#14191f]">
                        {doc.format} · {doc.size}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#14191f] leading-snug">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-stone-800 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-sm">
                    <span className="text-stone-700">{doc.pages}</span>
                    <a
                      href={doc.href}
                      download
                      className="font-bold text-[#174935] hover:underline"
                    >
                      Λήψη Αρχείου ↓
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Concise FAQ Accordion */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-serif text-2xl font-bold text-[#14191f]">
                Συχνές Ερωτήσεις & Ειλικρινείς Απαντήσεις
              </h2>
              <button
                type="button"
                onClick={() => setShowAllFaqs(!showAllFaqs)}
                className="px-4 py-2 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] text-sm font-semibold hover:bg-stone-200 cursor-pointer"
              >
                {showAllFaqs
                  ? "Εμφάνιση 5 Βασικών Ερωτήσεων"
                  : `Προβολή Όλων των ${FAQ_ITEMS.length} Ερωτήσεων ↓`}
              </button>
            </div>

            <div className="space-y-3">
              {(showAllFaqs ? FAQ_ITEMS : FAQ_ITEMS.slice(0, 5)).map(
                (faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-[#f7f5f0] rounded-lg border border-stone-300 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaqIndex(isOpen ? null : idx)
                        }
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#14191f] cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <span className="text-[#9e4727] font-sans text-xl shrink-0">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-stone-200 text-base text-stone-800 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SCREEN 8 (#contact-form): CONTACT SECTION — NAME, PHONE, CALL REQUEST & FORM (Μέρος Β #3, Σελ. 4) */}
      <section
        id="contact-form"
        className="py-12 sm:py-16 bg-[#f7f5f0] border-b border-stone-300"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-6 sm:p-10 border-2 border-[#14191f] shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
              <div className="space-y-1">
                <div className="text-sm font-bold text-[#9e4727]">
                  ΕΠΙΚΟΙΝΩΝΙΑ, ΣΥΜΜΕΤΟΧΗ & ΤΗΛΕΦΩΝΙΚΗ ΚΛΗΣΗ
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191f]">
                  Δηλώστε Συμμετοχή ή Ζητήστε να σας Καλέσουμε Τηλεφωνικά
                </h2>
                <p className="text-base text-stone-800">
                  Συντονιστής Πρωτοβουλίας: <strong>Αθανάσιος Βούρδας</strong> · Έδρα: Βροσίνα, Δήμος Ζίτσας Ιωαννίνων · Email:{" "}
                  <a
                    href="mailto:digiadsgr@gmail.com"
                    className="text-[#174935] font-semibold underline"
                  >
                    digiadsgr@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {inlineSubmitted ? (
              <div className="p-6 rounded-lg bg-emerald-50 border-2 border-[#1F5C43] space-y-3">
                <h3 className="font-serif text-xl font-bold text-[#1F5C43]">
                  Ευχαριστούμε. Λάβαμε το μήνυμά σας και θα επικοινωνήσουμε μαζί σας σύντομα.
                </h3>
                <button
                  type="button"
                  onClick={() => setInlineSubmitted(false)}
                  className="px-4 py-2 rounded bg-[#14191F] text-white text-sm font-semibold cursor-pointer"
                >
                  Νέο Μήνυμα
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) =>
                  submitLeadToDigiads(
                    e,
                    "Κεντρική Φόρμα Επικοινωνίας (#contact-form)",
                    true
                  )
                }
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="inline-role-select"
                      className="block text-sm font-semibold text-[#14191F] mb-1.5"
                    >
                      1. Ποιος είστε *
                    </label>
                    <select
                      id="inline-role-select"
                      required
                      value={leadRole}
                      onChange={(e) => setLeadRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded bg-[#F7F5F0] border border-stone-400 text-[#14191F] text-base font-medium focus:outline-none focus:border-[#14191F]"
                    >
                      <option value="" disabled>
                        Επιλέξτε ποιος είστε…
                      </option>
                      <option value="herder">
                        Κτηνοτρόφος / παραγωγός της περιοχής
                      </option>
                      <option value="owner">
                        Κάτοικος ή ιδιοκτήτης σπιτιού ή γης
                      </option>
                      <option value="business">
                        Επιχειρηματίας (μικρός ή μεγάλος)
                      </option>
                      <option value="investor">Επενδυτής</option>
                      <option value="institution">
                        Εκπρόσωπος φορέα ή Δήμου
                      </option>
                      <option value="journalist">Δημοσιογράφος</option>
                      <option value="other">Άλλο</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="inline-name-input"
                      className="block text-sm font-semibold text-[#14191f] mb-1.5"
                    >
                      2. Ονοματεπώνυμο ή Επωνυμία Φορέα *
                    </label>
                    <input
                      id="inline-name-input"
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="π.χ. Γιώργος Παπαδόπουλος"
                      className="w-full px-3.5 py-2.5 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] text-base focus:outline-none focus:border-[#14191f]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inline-phone-input"
                      className="block text-sm font-semibold text-[#14191f] mb-1.5"
                    >
                      3. Τηλέφωνο για να σας καλέσουμε (Κινητό ή Σταθερό) *
                    </label>
                    <input
                      id="inline-phone-input"
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="π.χ. 69XXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] text-base focus:outline-none focus:border-[#14191f]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inline-email-input"
                      className="block text-sm font-semibold text-[#14191f] mb-1.5"
                    >
                      4. Email (Προαιρετικό — αν δεν έχετε, αφήστε μόνο τηλέφωνο)
                    </label>
                    <input
                      id="inline-email-input"
                      type="email"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="π.χ. name@email.gr"
                      className="w-full px-3.5 py-2.5 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] text-base focus:outline-none focus:border-[#14191f]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inline-message-input"
                    className="block text-sm font-semibold text-[#14191f] mb-1.5"
                  >
                    5. Σύντομο Μήνυμα ή Ερώτημα (Προαιρετικό)
                  </label>
                  <textarea
                    id="inline-message-input"
                    rows={3}
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    placeholder="Γράψτε με απλά λόγια τι σας ενδιαφέρει ή ποιες ώρες προτιμάτε να σας καλέσουμε..."
                    className="w-full px-3.5 py-2.5 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] text-base focus:outline-none focus:border-[#14191f]"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <p className="text-sm text-[#14191F] bg-[#F7F5F0] p-3 rounded border border-stone-300">
                    Τα στοιχεία σας χρησιμοποιούνται μόνο για να απαντήσουμε στο αίτημά σας και δεν δίνονται σε τρίτους.
                  </p>
                  <div className="flex items-start gap-2.5">
                    <input
                      id="inline-gdpr-checkbox"
                      type="checkbox"
                      required
                      checked={gdprAccepted}
                      onChange={(e) => setGdprAccepted(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#1F5C43] cursor-pointer shrink-0"
                    />
                    <label
                      htmlFor="inline-gdpr-checkbox"
                      className="text-sm text-[#14191F] leading-relaxed cursor-pointer"
                    >
                      Συμφωνώ με την επεξεργασία των στοιχείων μου αποκλειστικά για την απάντηση στο αίτημά μου.{" "}
                      <button
                        type="button"
                        onClick={() => setPrivacyModalOpen(true)}
                        className="text-[#1F5C43] font-semibold underline cursor-pointer"
                      >
                        Πολιτική Απορρήτου
                      </button>{" "}
                      *
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={leadSubmitting || !leadRole || !gdprAccepted}
                  className="w-full sm:w-auto px-6 py-3.5 rounded bg-[#174935] hover:bg-[#123828] disabled:opacity-50 text-white font-bold text-base transition cursor-pointer"
                >
                  {leadSubmitting
                    ? "Αποστολή σε εξέλιξη..."
                    : "Αποστολή Δήλωσης & Αίτημα Τηλεφωνικής Κλήσης →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#14191f] text-stone-200 py-10 border-t border-stone-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="font-serif font-bold text-xl text-white">
                ΒΡΟΣΙΝΑ<span className="text-[#c89d54]">2031</span>
              </div>
              <p className="text-sm text-stone-300 leading-relaxed">
                Πρωτοβουλία Παραγωγικής, Οικιστικής & Δημογραφικής Αναγέννησης Βροσίνας (Υπό σύσταση Κοιν.Σ.Επ. Συλλογικής και Κοινωνικής Ωφέλειας Βροσίνας · Ν. 4430/2016).
              </p>
              <p className="text-sm text-stone-300">
                Συντονιστής: <strong>Αθανάσιος Βούρδας</strong> · {SITE_CONFIG.location}
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-white">Σελίδες ανά Κοινό</div>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <a href="/gia-ktinotrofous" className="hover:text-[#c89d54]">
                    • Για κτηνοτρόφους, αμπελουργούς & κατοίκους
                  </a>
                </li>
                <li>
                  <a href="/gia-epicheiriseis" className="hover:text-[#c89d54]">
                    • Για μικρές και μεγάλες επιχειρήσεις
                  </a>
                </li>
                <li>
                  <a href="/gia-ependytes" className="hover:text-[#c89d54]">
                    • Για επενδυτές και δωρητές (ΑΜΚΕ)
                  </a>
                </li>
                <li>
                  <a href="/gia-foreis" className="hover:text-[#c89d54]">
                    • Για δημόσιους φορείς και Πολιτεία
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-white">Κοινές Σελίδες & Έγγραφα</div>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <a href="/to-schedio" className="hover:text-[#c89d54]">
                    • Το σχέδιο (4 Πυλώνες — 10,45 εκ. €)
                  </a>
                </li>
                <li>
                  <a href="/poioi-eimaste" className="hover:text-[#c89d54]">
                    • Ποιοι είμαστε, Ιστορία & Πορεία έργου
                  </a>
                </li>
                <li>
                  <a href="/stratopedo-vrosinas" className="hover:text-[#c89d54]">
                    • Στρατόπεδο Παπακωνσταντίνου (13.695 τ.μ.)
                  </a>
                </li>
                <li>
                  <a href="/gefyri-vrosinas-raidiotissa" className="hover:text-[#c89d54]">
                    • Γεφύρια 1605 & Μονή Ραϊδιώτισσας 1628
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setPrivacyModalOpen(true)}
                    className="hover:text-[#c89d54] underline cursor-pointer"
                  >
                    • Πολιτική Απορρήτου & Προστασίας Δεδομένων (GDPR)
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-sm text-stone-300">
            <div>
              © 2026 Πρωτοβουλία «Βροσίνα 2031» (Διαδικτυακή Έκδοση 2.1).
            </div>
            <div className="flex items-center gap-4">
              <a href="/sitemap.xml" className="hover:text-white">
                sitemap.xml
              </a>
              <a href="/llms.txt" className="hover:text-white">
                llms.txt
              </a>
              <span>|</span>
              <a
                href="https://digiads.gr"
                target="_blank"
                rel="noopener"
                className="hover:text-[#c89d54]"
              >
                Designed by <strong className="text-white">DIGIADS</strong>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Navigation Bar (Κεφ. Β: Σχέδιο · Στρατόπεδο · Σπίτια · Επιχειρήσεις · Επικοινωνία) */}
      <nav
        aria-label="Κινητή Πλοήγηση"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-300 shadow-lg"
      >
        <div className="grid grid-cols-5 text-center">
          <a
            href="/to-schedio"
            className="py-2.5 px-1 text-sm font-semibold text-[#14191F] hover:bg-stone-100 truncate"
          >
            Σχέδιο
          </a>
          <a
            href="/stratopedo-vrosinas"
            className="py-2.5 px-1 text-sm font-semibold text-[#14191F] hover:bg-stone-100 truncate"
          >
            Στρατόπεδο
          </a>
          <a
            href="/gia-ktinotrofous"
            className="py-2.5 px-1 text-sm font-semibold text-[#14191F] hover:bg-stone-100 truncate"
          >
            Σπίτια
          </a>
          <a
            href="/gia-epicheiriseis"
            className="py-2.5 px-1 text-sm font-semibold text-[#14191F] hover:bg-stone-100 truncate"
          >
            Επιχειρήσεις
          </a>
          <a
            href="#contact-form"
            className="py-2.5 px-1 text-sm font-bold bg-[#1F5C43] text-white truncate"
          >
            Επικοινωνία
          </a>
        </div>
      </nav>

      {/* Floating Back-to-Top Button (Μέρος Α #24) */}
      <a
        href="#top"
        aria-label="Επιστροφή στην κορυφή της σελίδας"
        className="fixed bottom-16 lg:bottom-6 right-4 z-30 px-3.5 py-2 rounded-full bg-[#14191f] text-white text-sm font-bold shadow-lg border border-stone-600 hover:bg-[#174935] transition"
      >
        ↑ Πάνω
      </a>

      {/* Lead Modal */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 space-y-4 border-2 border-[#14191f]">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif font-bold text-xl text-[#14191f]">
                Εκδήλωση Ενδιαφέροντος — Βροσίνα 2031
              </h3>
              <button
                type="button"
                onClick={() => setLeadModalOpen(false)}
                className="px-2.5 py-1 rounded bg-stone-200 text-[#14191f] font-bold text-sm cursor-pointer"
              >
                Κλείσιμο ✕
              </button>
            </div>

            {leadSubmitted ? (
              <div className="p-4 rounded bg-emerald-50 border border-[#1F5C43] space-y-2">
                <div className="font-bold text-[#1F5C43]">
                  Ευχαριστούμε. Λάβαμε το μήνυμά σας και θα επικοινωνήσουμε μαζί σας σύντομα.
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => submitLeadToDigiads(e)}
                className="space-y-3"
              >
                <div>
                  <label
                    htmlFor="modal-role-select"
                    className="block text-sm font-semibold text-[#14191F] mb-1"
                  >
                    Ποιος είστε *
                  </label>
                  <select
                    id="modal-role-select"
                    required
                    value={leadRole}
                    onChange={(e) => setLeadRole(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#F7F5F0] border border-stone-400 text-base"
                  >
                    <option value="" disabled>
                      Επιλέξτε ποιος είστε…
                    </option>
                    <option value="herder">
                      Κτηνοτρόφος / παραγωγός της περιοχής
                    </option>
                    <option value="owner">
                      Κάτοικος ή ιδιοκτήτης σπιτιού ή γης
                    </option>
                    <option value="business">
                      Επιχειρηματίας (μικρός ή μεγάλος)
                    </option>
                    <option value="investor">Επενδυτής</option>
                    <option value="institution">
                      Εκπρόσωπος φορέα ή Δήμου
                    </option>
                    <option value="journalist">Δημοσιογράφος</option>
                    <option value="other">Άλλο</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="modal-name-input"
                    className="block text-sm font-semibold text-[#14191f] mb-1"
                  >
                    Ονοματεπώνυμο ή Φορέας *
                  </label>
                  <input
                    id="modal-name-input"
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#f7f5f0] border border-stone-400 text-base"
                  />
                </div>

                <div>
                  <label
                    htmlFor="modal-phone-input"
                    className="block text-sm font-semibold text-[#14191f] mb-1"
                  >
                    Τηλέφωνο *
                  </label>
                  <input
                    id="modal-phone-input"
                    type="tel"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#f7f5f0] border border-stone-400 text-base"
                  />
                </div>

                <div>
                  <label
                    htmlFor="modal-message-input"
                    className="block text-sm font-semibold text-[#14191f] mb-1"
                  >
                    Μήνυμα
                  </label>
                  <textarea
                    id="modal-message-input"
                    rows={3}
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#f7f5f0] border border-stone-400 text-base"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    id="modal-gdpr-checkbox"
                    type="checkbox"
                    required
                    checked={gdprAccepted}
                    onChange={(e) => setGdprAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#174935]"
                  />
                  <label
                    htmlFor="modal-gdpr-checkbox"
                    className="text-sm text-stone-800"
                  >
                    Συναινώ στην επεξεργασία των στοιχείων μου για την απάντηση στο αίτημά μου (GDPR). *
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={leadSubmitting || !leadRole || !gdprAccepted}
                  className="w-full py-3 rounded bg-[#174935] text-white font-bold text-base cursor-pointer"
                >
                  {leadSubmitting ? "Αποστολή..." : "Αποστολή Αιτήματος →"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Privacy Policy Modal (Μέρος Α #32) */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 space-y-4 border-2 border-[#14191f]">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif font-bold text-xl text-[#14191f]">
                Πολιτική Απορρήτου & Προστασίας Δεδομένων (GDPR)
              </h3>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="px-3 py-1 rounded bg-stone-200 text-[#14191f] font-bold text-sm cursor-pointer"
              >
                Κλείσιμο ✕
              </button>
            </div>
            <div className="space-y-3 text-sm text-stone-800 leading-relaxed">
              <p>
                <strong>1. Υπεύθυνος Επεξεργασίας:</strong> Πρωτοβουλία «Βροσίνα 2031» (Συντονιστής: Αθανάσιος Βούρδας, Βροσίνα Δήμου Ζίτσας Ιωαννίνων, Email: digiadsgr@gmail.com).
              </p>
              <p>
                <strong>2. Σκοπός Επεξεργασίας:</strong> Τα στοιχεία που συμπληρώνετε στις φόρμες επικοινωνίας (ονοματεπώνυμο, τηλέφωνο, email, ιδιότητα και μήνυμα) χρησιμοποιούνται αποκλειστικά για την επικοινωνία της ομάδας συντονισμού μαζί σας σχετικά με το σχέδιο «Βροσίνα 2031», τη σύσταση της Κοιν.Σ.Επ. και το Μητρώο Κλειστών Κατοικιών.
              </p>
              <p>
                <strong>3. Χρόνος Τήρησης & Δικαιώματα:</strong> Τα δεδομένα δεν διαβιβάζονται σε εμπορικούς τρίτους. Διατηρείτε δικαίωμα πρόσβασης, διόρθωσης ή οριστικής διαγραφής ανά πάσα στιγμή με απλό μήνυμα στο digiadsgr@gmail.com.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
