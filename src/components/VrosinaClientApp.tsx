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
  UNIFIED_GRANT_RATE_TEXT,
  UNIFIED_CONCESSION_TEXT,
  UNIFIED_STRATEGIC_PARTNER_TEXT,
  type HotspotPoint,
} from "@/data/vrosinaData";

const STEPS = [
  {
    kicker: "Βήμα 1 · Η μηχανή",
    body: "Το πρώην στρατόπεδο γίνεται τυροκομείο και οινοποιείο. Εκεί γεννιέται το μόνιμο εισόδημα.",
    quote: "«Ένα στρατόπεδο γκρεμισμένο, στάχτη, μπορεί να γίνει ο κινητήρας.»",
  },
  {
    kicker: "Βήμα 2 · Οι άνθρωποι",
    body: "Βοσκοί και αμπελουργοί που ξέρουν από την αρχή πού θα πουλήσουν. Δίπλα τους, τεχνίτες από τη σχολή πετράδων.",
    quote: "«Ο βοσκός έχει έτοιμο πελάτη όταν έχεις δίπλα τη μονάδα.»",
  },
  {
    kicker: "Βήμα 3 · Το χωριό",
    body: "Ανοίγουν σπίτια, ξενώνες και μαγαζιά. Για να έρθει κάποιος δεν φτάνει η μονή και το γεφύρι: πρέπει να έχει να φάει, να ψωνίσει και να μείνει.",
    quote: "«Αν το χωριό δεν έχει καφενείο, δεν είναι χωριό.»",
  },
];

const FOUR_NUMBERS = [
  { n: "50", label: "νέες θέσεις εργασίας" },
  { n: "25", label: "σπίτια σε νέα χρήση" },
  { n: "10", label: "ξενώνες" },
  { n: "80–100", label: "νέοι μόνιμοι κάτοικοι" },
];

export default function VrosinaClientApp() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [heroViewMode, setHeroViewMode] = useState<"2031" | "today" | "video">(
    "today"
  );
  const [letterVideoLoaded, setLetterVideoLoaded] = useState<boolean>(false);
  const [letterVideoStart, setLetterVideoStart] = useState<number>(810);
  const [activeHotspot, setActiveHotspot] = useState<HotspotPoint>(
    MASTERPLAN_HOTSPOTS[0]
  );

  // Investor Simulator State
  const [investorTrack, setInvestorTrack] = useState<
    "strategic" | "agrotourism" | "benefactor" | "diaspora"
  >("strategic");
  const [investmentAmount, setInvestmentAmount] = useState<number>(150000);
  const [selectedScenarioId, setSelectedScenarioId] =
    useState<string>("baseline");

  // FAQ & Docs State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
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
      const endpoint =
        process.env.NEXT_PUBLIC_FORMSUBMIT_URL ||
        `https://formsubmit.co/ajax/${["digiadsgr", "gmail.com"].join("@")}`;
      await fetch(endpoint, {
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
      const estimatedAnnualDividend = Math.round(
        investmentAmount * 0.135 * scenarioFactor
      );
      return {
        title: "Στρατηγικός Εταίρος Αγροδιατροφής (Τυροκομείο & Οινοποιείο)",
        subtitle: UNIFIED_STRATEGIC_PARTNER_TEXT,
        grantRateLabel:
          "Ανάλογα με την πρόσκληση (LEADER 1.1: ανώτατο 65% & 400.000 € · ΣΣ ΚΑΠ & Αναπτυξιακός: βάσει πρόσκλησης)",
        mobilizedCapex,
        publicGrant,
        annualBenefitLabel: "Εκτιμώμενο Ετήσιο Μέρισμα στην Ωριμότητα (Έτος 5)",
        annualBenefitValue: `~${estimatedAnnualDividend.toLocaleString("el-GR")} € / έτος`,
        paybackLabel:
          "Ρεαλιστικός χρόνος απόσβεσης ιδίων κεφαλαίων: ~6,5 έως 8,5 έτη από την επενδυτική εκκίνηση (συμπεριλαμβανομένων 2 ετών κατασκευής/αδειοδότησης και σταδιακής κλιμάκωσης)",
        perks: [
          UNIFIED_STRATEGIC_PARTNER_TEXT,
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
        title: "Επενδυτής Ξενώνων Αγροτουρισμού (LEADER / Αναπτυξιακός)",
        subtitle:
          "Ανάπτυξη παραδοσιακών ξενώνων μέσω μακροχρόνιας μίσθωσης 10–15 ετών (Master Lease).",
        grantRateLabel: "Ανάλογα με την πρόσκληση (LEADER ΗΠΕΙΡΟΣ Α.Ε. / Αναπτυξιακός)",
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
      badge: "Για κτηνοτρόφους, ιδιοκτήτες & αποδήμους",
      topBorderClass: "border-t-4 border-t-[#1F5C43]",
      badgeColorClass: "text-[#1F5C43]",
      buttonColorClass: "bg-[#1F5C43] hover:bg-[#174935]",
      buttonLabel: "Για κτηνοτρόφους και κατοίκους →",
      title: "Για κτηνοτρόφους, ιδιοκτήτες σπιτιών & αποδήμους",
      summary:
        "«Ο βοσκός έχει έτοιμο πελάτη όταν έχεις δίπλα τη μονάδα.» Και για τα κλειστά σπίτια: «Σε λίγα χρόνια το σπίτι του θα πέσει. Πρέπει να το καταλάβουμε.» Ένα μέλος, μία ψήφος (ελάχιστη μερίδα 100 €, ν. 4430/2016).",
      highlights: [
        "Στόχος σταθερού αγοραστή γάλακτος με γραπτό συμβόλαιο πριν από κάθε δέσμευση",
        "Μακροχρόνια μίσθωση 10–15 ετών για 25 κλειστά σπίτια/ακίνητα (η κυριότητα μένει στον ιδιοκτήτη)",
        "Οδηγός 5 βημάτων για νέους παραγωγούς & συμμετοχή στην Κοιν.Σ.Επ. (100 €)",
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
        "«Για να έρθει κάποιος δεν αρκεί ούτε η μονή ούτε το γεφύρι. Πρέπει να έχει να φάει, να ψωνίσει, να μείνει.» 10 ξενώνες, 5 καταστήματα, τεχνικά έργα αποκατάστασης και συνεργασίες μεταποίησης.",
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
        UNIFIED_STRATEGIC_PARTNER_TEXT,
      ],
    },
    {
      href: "/gia-foreis",
      badge: "Για φορείς & Πολιτεία",
      topBorderClass: "border-t-4 border-t-[#14191F]",
      badgeColorClass: "text-[#14191F]",
      buttonColorClass: "bg-[#14191F] hover:bg-[#1F5C43]",
      buttonLabel: "Για φορείς και Πολιτεία →",
      title: "Για Φορείς, τον Δήμο Ζίτσας & την Πολιτεία (Το Case Study)",
      summary:
        "«Αν δεν κάνουμε κάτι δραστικό, θα χαθεί η Βροσίνα. Βροσίνες υπάρχουν πολλές σε όλη την Ελλάδα. Θέλουμε η Βροσίνα να γίνει case study.»",
      highlights: [
        "Εκτίμηση άμεσων εσόδων Δημοσίου στην ωριμότητα: ~463.700 €/έτος (ονομαστικά ποσά, χωρίς προεξόφληση)",
        "Παραχώρηση κατά χρήση για 25 έτη (ελάχιστο 10 έτη για LEADER) με αντάλλαγμα 2% επί τζίρου (51.000 €/έτος)",
        "Ο χρονικός ορίζοντας της πρόσκλησης LEADER (προθεσμία 4/2/2027) καθορίζει τη σειρά των ενεργειών",
      ],
    },
  ];

  return (
    <div
      id="top"
      className="min-h-screen bg-[#f7f5f0] text-[#14191f] font-sans pb-16 lg:pb-0"
    >
      {/* SINGLE CLEAN NAVIGATION BAR: 5 Menu Items + 1 Contact Button + Mobile Hamburger Menu (Σ1) */}
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
              className="px-3.5 py-2 rounded bg-[#174935] text-white text-sm font-semibold hover:bg-[#123828] transition whitespace-nowrap"
            >
              Επικοινωνία
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Άνοιγμα πλήρους μενού πλοήγησης"
              className="lg:hidden px-3 py-2 rounded border border-stone-400 bg-[#f7f5f0] text-[#14191f] text-sm font-bold hover:bg-stone-200 transition cursor-pointer whitespace-nowrap"
            >
              {mobileMenuOpen ? "✕ Κλείσιμο" : "☰ Μενού"}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Πλήρες Μενού Κινητού"
            className="lg:hidden bg-white border-t border-stone-300 px-4 py-3 shadow-md"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm font-semibold text-[#14191f]">
              <a
                href="/to-schedio"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-stone-100 border border-stone-200"
              >
                1. Το σχέδιο
              </a>
              <a
                href="/gia-ktinotrofous"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-stone-100 border border-stone-200"
              >
                2. Για κτηνοτρόφους
              </a>
              <a
                href="/gia-epicheiriseis"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-stone-100 border border-stone-200"
              >
                3. Για επιχειρήσεις
              </a>
              <a
                href="/gia-ependytes"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-stone-100 border border-stone-200"
              >
                4. Για επενδυτές
              </a>
              <a
                href="/gia-foreis"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-stone-100 border border-stone-200"
              >
                5. Για φορείς
              </a>
              <a
                href="/poioi-eimaste"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-stone-100 border border-stone-200"
              >
                6. Ποιοι είμαστε
              </a>
              <a
                href="#dataroom"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded hover:bg-stone-100 border border-stone-200 sm:col-span-2"
              >
                7. Έγγραφα (Κέντρο Τεκμηρίωσης)
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* 1. FULL-BLEED HERO (#hero) — Η ΠΡΩΤΗ ΟΘΟΝΗ (Δρόμος Α: μία πραγματική φωτογραφία, χωρίς διακόπτη) */}
      <section
        id="hero"
        className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] w-full overflow-hidden bg-[#14191F] text-[#F7F5F0]"
      >
        {/* Background: real photo of Vrosina today */}
        <img
          src="/images/real/real-vrosina-exploringgreece.jpg"
          alt="Η Βροσίνα σήμερα, μέσα στην κοιλάδα του Ζαλογγίτικου"
          fetchPriority="high"
          className="vr-slow-zoom absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Dark gradient overlay — left & bottom heavy for text legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#14191F]/95 via-[#14191F]/65 to-[#14191F]/15 lg:bg-gradient-to-r lg:from-[#14191F]/95 lg:via-[#14191F]/65 lg:to-[#14191F]/10"
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] max-w-7xl flex-col justify-end px-4 pb-6 pt-10 sm:px-6 sm:pb-8 sm:pt-14 lg:pb-10 lg:pt-16">
          <div className="max-w-2xl">
            <p className="mb-2 text-[11px] sm:text-xs font-medium uppercase tracking-[0.16em] text-[#C89D54]">
              ΒΡΟΣΙΝΑ 2031 · ΠΡΩΤΟΒΟΥΛΙΑ ΓΙΑ ΕΝΑ ΖΩΝΤΑΝΟ ΧΩΡΙΟ
            </p>

            <h1 className="font-serif text-2xl leading-[1.14] font-semibold text-[#F7F5F0] sm:text-4xl lg:text-[46px]">
              Η Βροσίνα δεν χρειάζεται να ξαναγίνει αυτό που ήταν.{" "}
              <span className="text-[#C89D54]">
                Μπορεί να γίνει κάτι καλύτερο.
              </span>
            </h1>

            <p className="mt-3 sm:mt-4 max-w-xl text-sm leading-relaxed text-[#F7F5F0]/90 sm:text-lg">
              Ένα εγκαταλελειμμένο στρατόπεδο γίνεται τυροκομείο και οινοποιείο.
              Γύρω του έρχονται βοσκοί, αμπελουργοί, τεχνίτες και οικογένειες.
              Το χωριό ξαναγεμίζει με δουλειά.
            </p>

            {/* Two buttons only — compact on mobile so both fit on one line above the bar */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-4">
              <a
                href="#vima"
                className="inline-flex items-center rounded-md bg-[#C89D54] px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-[#14191F] shadow-sm transition hover:bg-[#d8ae64] focus:outline-none focus:ring-2 focus:ring-[#C89D54]"
              >
                Δες πώς γίνεται
              </a>
              <a
                href="#contact-form"
                className="inline-flex items-center rounded-md border border-[#F7F5F0]/70 bg-[#14191F]/40 px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-[#F7F5F0] backdrop-blur-sm transition hover:bg-[#F7F5F0]/15"
              >
                Θέλω να συμμετάσχω
              </a>
            </div>
          </div>

          {/* Bottom caption */}
          <div className="mt-5 sm:mt-6 border-t border-[#F7F5F0]/15 pt-3 text-[11px] sm:text-xs text-[#F7F5F0]/80">
            Φωτογραφία: Η Βροσίνα σήμερα (ExploringGreece.tv)
          </div>
        </div>
      </section>

      {/* 2. Η ΖΩΝΗ ΤΩΝ ΤΡΙΩΝ ΒΗΜΑΤΩΝ ΚΑΙ ΤΩΝ 4 ΑΡΙΘΜΩΝ (#vima — §3) */}
      <section
        id="vima"
        className="border-b border-[#14191F]/10 bg-[#F7F5F0] py-16 text-[#14191F]"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#85611C]">
              ΠΩΣ ΔΟΥΛΕΥΕΙ Η ΙΔΕΑ
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
              Τρία πράγματα, με τη σειρά.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.kicker}
                className="flex flex-col justify-between rounded-lg border border-[#14191F]/12 bg-white p-6 shadow-xs"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1F5C43]">
                    {s.kicker}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-[#14191F]">
                    {s.body}
                  </p>
                </div>
                <p className="mt-5 border-t border-[#14191F]/10 pt-3 font-serif text-sm italic text-[#4A525A]">
                  {s.quote}
                </p>
              </div>
            ))}
          </div>

          {/* 4 ανθρώπινα νούμερα — όχι ευρώ */}
          <div className="mt-12 rounded-lg bg-[#EBE6DC] p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {FOUR_NUMBERS.map((item) => (
                <div key={item.label}>
                  <p className="font-serif text-3xl font-semibold text-[#1F5C43] sm:text-4xl">
                    {item.n}
                  </p>
                  <p className="mt-1 text-sm text-[#14191F]">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#4A525A]">
              Ενδεικτικοί στόχοι 5ετίας. Πρόταση, όχι απόφαση.
            </p>
          </div>
        </div>
      </section>

      {/* 3. ΜΙΑ ΑΝΘΡΩΠΙΝΗ ΦΩΝΗ: ΤΟ ΓΡΑΜΜΑ ΚΑΙ Η ΣΥΝΕΝΤΕΥΞΗ (#akouste — §4) */}
      <section id="akouste" className="bg-[#EBE6DC] py-14 text-[#14191F]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:items-center">
          {/* Αριστερά: το γράμμα */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#85611C]">
              ΓΙΑΤΙ ΤΟ ΞΕΚΙΝΗΣΑΜΕ
            </p>
            <blockquote className="mt-3 space-y-4 font-serif text-lg leading-relaxed text-[#14191F] sm:text-xl">
              <p>
                Κατάγομαι από τη Βροσίνα. Θυμάμαι το χωριό με φούρνο, με
                καφενεία, εστιατόρια, με παιδιά στο σχολείο, με ζωή. Σήμερα το
                στρατόπεδο είναι ερείπιο και τα σπίτια σιγά σιγά ρημάζουν.
              </p>
              <p>
                Δεν θέλω η Βροσίνα να ξαναγίνει αυτό που ήταν. Θέλω να γίνει κάτι
                καλύτερο: με δουλειά, με νέες οικογένειες, με μέλλον για όσους
                γεννιούνται εκεί.
              </p>
              <p>
                Δεν γίνεται από έναν άνθρωπο. Αρκεί να το δούμε όλοι μαζί, να
                δούμε μέχρι πού μπορούμε να το φτάσουμε.
              </p>
            </blockquote>
            <p className="mt-4 text-sm font-medium text-[#4A525A]">
              — Αθανάσιος Βούρδας, Επιτροπή Βροσίνα 2031
            </p>
          </div>

          {/* Δεξιά: click-to-load βίντεο συνέντευξης (χωρίς εξωτερικό thumbnail) */}
          <div className="lg:col-span-5 space-y-3">
            {!letterVideoLoaded ? (
              <button
                type="button"
                onClick={() => {
                  setLetterVideoStart(810);
                  setLetterVideoLoaded(true);
                }}
                className="group relative flex aspect-video w-full flex-col items-center justify-center rounded-lg bg-[#14191F] p-6 text-center text-[#F7F5F0] shadow-md transition hover:bg-[#1d242c] cursor-pointer"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C89D54] text-xl font-bold text-[#14191F] transition group-hover:scale-105">
                  ▶
                </span>
                <span className="mt-4 font-serif text-lg font-medium">
                  Άκουσέ το από τον ίδιο (2 λεπτά)
                </span>
                <span className="mt-1 text-xs text-[#F7F5F0]/70">
                  Απόσπασμα από την τηλεοπτική παρουσίαση · ξεκινά στο 13:30
                </span>
              </button>
            ) : (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-black shadow-md">
                <iframe
                  className="h-full w-full border-0"
                  src={`https://www.youtube-nocookie.com/embed/addMUPWc8vg?start=${letterVideoStart}&autoplay=1&rel=0`}
                  title="Συνέντευξη για τη Βροσίνα 2031"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#4A525A]">
              <button
                type="button"
                onClick={() => {
                  setLetterVideoStart(810);
                  setLetterVideoLoaded(true);
                }}
                className="underline hover:text-[#14191F] cursor-pointer"
              >
                ▶ Απόσπασμα 13:30 («κάτι καλύτερο»)
              </button>
              <button
                type="button"
                onClick={() => {
                  setLetterVideoStart(62);
                  setLetterVideoLoaded(true);
                }}
                className="underline hover:text-[#14191F] cursor-pointer"
              >
                ▶ Απόσπασμα 01:02 («το σπίτι που σε λίγα χρόνια θα πέσει»)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ΠΟΙΟΣ ΕΙΣΤΕ; (#poios-eiste — §6: 4 κάρτες, χωρίς εισαγωγική παράγραφο) */}
      <section
        id="poios-eiste"
        className="py-12 sm:py-16 bg-[#f7f5f0] border-b border-stone-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-1">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#85611C]">
              4 ΔΙΑΔΡΟΜΕΣ ΑΝΑ ΚΟΙΝΟ
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f]">
              Ποιος είστε; Διαλέξτε τη δική σας διαδρομή.
            </h2>
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

      {/* 5. ΤΟ ΣΧΕΔΙΟ ΣΕ 4 ΠΥΛΩΝΕΣ (#masterplan — §6: εδώ ο διαδραστικός χάρτης + 4 κάρτες + κουμπί «Δες το αναλυτικό σχέδιο →») */}
      <section
        id="masterplan"
        className="py-12 sm:py-16 bg-white border-b border-stone-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <div className="text-sm font-bold text-[#174935]">
                ΤΟ ΣΧΕΔΙΟ ΣΕ 4 ΠΥΛΩΝΕΣ
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f]">
                Τι χτίζεται στη Βροσίνα και πώς συνδέονται τα 4 έργα
              </h2>
              <p className="text-base text-stone-800 leading-relaxed">
                Πατήστε πάνω στα σημεία 01–04 του χάρτη ή δείτε συνοπτικά τους τέσσερις πυλώνες του σχεδίου.
              </p>
            </div>
            <a
              href="/to-schedio"
              className="px-5 py-3 rounded bg-[#14191f] text-white font-bold text-base hover:bg-[#174935] transition shrink-0"
            >
              Δες το αναλυτικό σχέδιο →
            </a>
          </div>

          {/* Interactive Masterplan Map with Hotspots (moved from Hero per §6) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#F7F5F0] p-5 sm:p-6 rounded-lg border border-stone-300">
            <div className="lg:col-span-7 relative rounded-lg overflow-hidden border border-stone-300 bg-stone-900 h-64 sm:h-80">
              <img
                src="/images/hero-masterplan.jpg"
                alt="Ενδεικτική Αρχιτεκτονική Απεικόνιση (Concept Render) Βροσίνα 2031"
                width={800}
                height={500}
                loading="lazy"
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
                    className={`-translate-x-1/2 -translate-y-1/2 absolute w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center transition cursor-pointer shadow-md ${
                      isSelected
                        ? "bg-[#A34A2B] text-white ring-4 ring-white scale-110 z-20"
                        : "bg-white text-[#14191F] hover:bg-[#1F5C43] hover:text-white z-10"
                    }`}
                  >
                    0{idx + 1}
                  </button>
                );
              })}
              <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-stone-950/85 text-white text-xs font-medium border border-stone-600">
                Ενδεικτική απεικόνιση (concept render) · Πατήστε 01–04
              </span>
            </div>

            <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-stone-300 space-y-4">
              <div className="flex items-start gap-3">
                <img
                  src={activeHotspot.image}
                  alt={activeHotspot.title}
                  width={96}
                  height={64}
                  loading="lazy"
                  className="w-24 h-16 rounded object-cover border border-stone-300 shrink-0"
                />
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-[#A34A2B]">
                    {activeHotspot.category} · {activeHotspot.capex}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#14191F]">
                    {activeHotspot.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-[#14191F] leading-relaxed">
                {activeHotspot.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-200">
                {MASTERPLAN_HOTSPOTS.map((spot, idx) => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspot(spot)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition cursor-pointer ${
                      activeHotspot.id === spot.id
                        ? "bg-[#14191F] text-white"
                        : "bg-[#F7F5F0] text-[#14191F] border border-stone-300 hover:bg-stone-200"
                    }`}
                  >
                    0{idx + 1}. {spot.title.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FOUR_PILLARS.map((pillar) => (
              <article
                key={pillar.id}
                className="bg-[#f7f5f0] rounded-lg border border-stone-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-stone-900">
                    <img
                      src={pillar.heroImage}
                      alt={pillar.title}
                      width={500}
                      height={312}
                      loading="lazy"
                      className="w-full h-44 object-cover block"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-stone-950/85 text-[#C89D54] font-bold text-sm">
                      Πυλώνας {pillar.number}
                    </span>
                    <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-stone-950/80 text-white text-xs">
                      Concept Render
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
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

          <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-lg bg-[#F7F5F0] border border-stone-300">
            <p className="text-sm text-[#14191F]">
              Για την αναλυτική παρουσίαση της Κάτω Αγοράς στον πλάτανο, του Ι.Ν. Αγίου Γεωργίου (1607), του Μορφολογικού Κανονισμού και των 4 πυλώνων:
            </p>
            <a
              href="/to-schedio"
              className="px-5 py-2.5 rounded bg-[#1F5C43] text-white font-bold text-sm hover:bg-[#174935] transition shrink-0"
            >
              Δες το αναλυτικό σχέδιο →
            </a>
          </div>
        </div>
      </section>

      {/* 6. ΠΟΙΟΙ ΕΙΜΑΣΤΕ & ΠΟΥ ΒΡΙΣΚΟΜΑΣΤΕ ΣΗΜΕΡΑ (#poioi-eimaste — §6) */}
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
                Το πρόσωπο της πρωτοβουλίας, η κατάσταση του έργου και 2 βασικές απαντήσεις
              </h2>
            </div>
            <a
              href="/poioi-eimaste"
              className="px-5 py-3 rounded bg-[#14191f] text-white font-bold text-base hover:bg-[#174935] transition shrink-0"
            >
              Γνωρίστε την ομάδα & το χρονοδιάγραμμα →
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Αθανάσιος Βούρδας */}
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

            {/* Κατάσταση έργου, Νοέμβριος 2026 */}
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
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ABOUT_US_AND_STATUS.localVoices.map((v, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-5 border border-stone-300 border-l-4 border-l-[#174935] space-y-2"
              >
                <div className="text-sm font-bold text-[#174935]">{v.role}</div>
                <p className="font-serif text-base text-stone-900 leading-relaxed">
                  {v.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ΑΥΤΟΨΙΑ ΠΕΔΙΟΥ (#autopsia-real — §6: 3 κάρτες Πριν/Μετά και σύνδεσμος «Διάβασε την πλήρη ανάλυση →») */}
      <section
        id="autopsia-real"
        className="py-12 sm:py-16 bg-white border-b border-stone-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <div className="text-sm font-bold text-[#9e4727]">
                ΑΥΤΟΨΙΑ ΠΕΔΙΟΥ · ΣΗΜΕΡΑ ΚΑΙ ΤΟ 2031
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f]">
                Πριν και Μετά: Στρατόπεδο, Οικισμός και Περιβάλλον
              </h2>
              <p className="text-base text-stone-800">
                Τα 8 κτίρια του πρώην στρατοπέδου «Παπακωνσταντίνου» (13.695 τ.μ.) και το βίντεο αυτοψίας 12:31 παρουσιάζονται αναλυτικά στην υποσελίδα του στρατοπέδου.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <a
                href="/stratopedo-vrosinas"
                className="px-5 py-3 rounded bg-[#14191f] text-white font-bold text-sm hover:bg-[#174935] transition"
              >
                Διάβασε την πλήρη ανάλυση →
              </a>
              <a
                href="/gefyri-vrosinas-raidiotissa"
                className="px-4 py-3 rounded bg-[#f7f5f0] border border-stone-400 text-[#14191f] font-semibold text-sm hover:bg-stone-200 transition"
              >
                Γεφύρια 1605 & Μονή 1628 →
              </a>
            </div>
          </div>

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
        </div>
      </section>

      {/* 8. ΓΙΑ ΕΠΕΝΔΥΤΕΣ ΚΑΙ ΦΟΡΕΙΣ (#investors & #dataroom — Συμπυκνωμένη Ενότητα, με παραπομπή στις υποσελίδες) */}
      <section
        id="investors"
        className="py-10 sm:py-12 bg-[#14191f] text-white border-b border-stone-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-1.5">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c89d54]">
                ΓΙΑ ΕΠΕΝΔΥΤΕΣ, ΦΟΡΕΙΣ & DATA ROOM
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Οικονομικά στοιχεία, όφελος Δημοσίου και έγγραφα τεκμηρίωσης
              </h2>
              <p className="font-serif italic text-sm sm:text-base text-[#C89D54]">
                «Αν δεν κάνουμε κάτι δραστικό, θα χαθεί η Βροσίνα. Βροσίνες υπάρχουν πολλές σε όλη την Ελλάδα. Θέλουμε η Βροσίνα να γίνει case study.»
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <a
                href="/gia-ependytes"
                className="px-4 py-2 rounded bg-[#c89d54] text-stone-950 font-bold text-sm hover:bg-amber-400 transition"
              >
                Υπολογιστής & Σελίδα «Για Επενδυτές» →
              </a>
              <a
                href="/gia-foreis"
                className="px-4 py-2 rounded bg-stone-800 border border-stone-600 text-white font-semibold text-sm hover:bg-stone-700 transition"
              >
                Σελίδα «Για Φορείς» →
              </a>
            </div>
          </div>

          {/* 2 Συμπυκνωμένες Κάρτες: Αριστερά Επενδυτές/Σενάρια, Δεξιά Όφελος Δημοσίου */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Κάρτα Α: Για Επενδυτές & Χορηγούς */}
            <div className="bg-stone-900 border border-stone-700 rounded-lg p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#C89D54]">
                  4 ΚΑΝΑΛΙΑ ΣΥΜΜΕΤΟΧΗΣ & 3 ΣΕΝΑΡΙΑ ΕΤΟΥΣ 5
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Πρόγραμμα 10,45 εκ. € (63% Δημόσιοι/ΕΕ πόροι · 37% Ιδιωτικά)
                </h3>
                <ul className="space-y-1.5 text-sm text-stone-200 leading-relaxed">
                  <li>
                    • <strong>Στρατηγικός Εταίρος Μεταποίησης:</strong> Τυροκομείο & Οινοποιείο στο πρώην στρατόπεδο ({UNIFIED_STRATEGIC_PARTNER_TEXT}).
                  </li>
                  <li>
                    • <strong>Ξενώνες & Καταστήματα (LEADER):</strong> 10 ξενώνες και 5 καταστήματα.
                  </li>
                  <li>
                    • <strong>Ταμείο Ευεργετών (ΑΜΚΕ) & Διασπορά (15%):</strong> Δωρεές ανά έργο ή μετοχική συμμετοχή.
                  </li>
                </ul>
                <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                  {THREE_SCENARIOS.map((sc) => (
                    <div
                      key={sc.id}
                      className="p-2.5 rounded bg-stone-950 border border-stone-800"
                    >
                      <div className="font-bold text-white">
                        {sc.name.split(" ")[0]}
                      </div>
                      <div className="text-[#c89d54] font-bold">
                        {sc.revenueFormatted}
                      </div>
                      <div className="text-stone-300">
                        {sc.jobsYear5} θέσεις
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3 pt-2 border-t border-stone-800">
                <p className="text-xs text-stone-300 leading-relaxed">
                  {UNIFIED_GRANT_RATE_TEXT} Τα ποσά είναι ενδεικτικά και βασίζονται σε υποθέσεις (πρόσκληση LEADER 545/07-10-2026, προθεσμία 4/2/2027).
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="/gia-ependytes"
                    className="px-4 py-2 rounded bg-[#c89d54] text-stone-950 font-bold text-xs sm:text-sm hover:bg-amber-400 transition"
                  >
                    Άνοιγμα Επενδυτικού Υπολογιστή →
                  </a>
                  <a
                    href="/documents/Vrosina_2031_Financial_Model.csv"
                    download
                    className="px-3.5 py-2 rounded bg-stone-950 border border-stone-700 text-stone-200 font-semibold text-xs sm:text-sm hover:bg-stone-800 transition"
                  >
                    Οικονομικό Μοντέλο (.csv) ↓
                  </a>
                </div>
              </div>
            </div>

            {/* Κάρτα Β: Τι κερδίζει το Δημόσιο */}
            <div className="bg-stone-900 border border-stone-700 rounded-lg p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#C89D54]">
                  ΔΗΜΟΣΙΟΝΟΜΙΚΟ ΙΣΟΖΥΓΙΟ ΓΙΑ ΤΟ ΚΡΑΤΟΣ
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Τι κερδίζει το Δημόσιο: ~463.700 € / έτος σε άμεσα έσοδα
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {PUBLIC_FISCAL_BENEFIT_STUDY.headlineMetrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded bg-stone-950 border border-stone-800"
                    >
                      <div className="text-lg font-bold text-[#C89D54]">
                        {m.value}
                      </div>
                      <div className="font-serif font-bold text-xs text-white">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3 pt-2 border-t border-stone-800">
                <p className="text-xs text-stone-300 leading-relaxed">
                  Ονομαστικά ποσά, χωρίς προεξόφληση. Ο χρόνος απόσβεσης 6–10 ετών αφορά το εθνικό σκέλος με υπόθεση συγχρηματοδότησης Ε.Ε. 50–75% και δεν είναι εγγυημένος.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="/gia-foreis"
                    className="px-4 py-2 rounded bg-[#1F5C43] text-white font-bold text-xs sm:text-sm hover:bg-[#174935] transition"
                  >
                    Αναλυτική Σελίδα «Για Φορείς» →
                  </a>
                  <a
                    href="/documents/Vrosina_2031_What_The_State_Gains.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded bg-stone-950 border border-stone-700 text-stone-200 font-semibold text-xs sm:text-sm hover:bg-stone-800 transition"
                  >
                    Μελέτη Δημοσίου (PDF) ↓
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Συμπυκνωμένο Data Room & 3 Βασικές Ερωτήσεις FAQ */}
          <div id="dataroom" className="bg-[#F7F5F0] text-[#14191F] rounded-lg p-5 sm:p-6 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#174935]">
                    ΚΕΝΤΡΟ ΤΕΚΜΗΡΙΩΣΗΣ (DATA ROOM)
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
                    Βασικά Έγγραφα & Σχέδιο (έκδοση 2.0, σε αναθεώρηση)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllDocs(!showAllDocs)}
                  className="px-3.5 py-1.5 rounded bg-white border border-stone-400 text-[#14191f] font-semibold text-xs sm:text-sm hover:bg-stone-200 cursor-pointer"
                >
                  {showAllDocs
                    ? "Εμφάνιση 4 Βασικών Αρχείων"
                    : `Όλα τα ${DATA_ROOM_DOCUMENTS.length} Αρχεία ↓`}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(showAllDocs
                  ? DATA_ROOM_DOCUMENTS
                  : DATA_ROOM_DOCUMENTS.slice(0, 4)
                ).map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.href}
                    download
                    className="bg-white rounded-lg p-3.5 border border-stone-300 hover:border-[#1F5C43] transition flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#9e4727]">
                        {doc.format} · {doc.size}
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#14191f] leading-snug mt-0.5">
                        {doc.title}
                      </h4>
                    </div>
                    <div className="text-xs font-bold text-[#174935]">
                      Λήψη αρχείου ↓
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Συμπυκνωμένο FAQ (3 βασικές ερωτήσεις, κλειστές εξ ορισμού) */}
            <div className="space-y-3 pt-4 border-t border-stone-300">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#14191f]">
                  Συχνές Ερωτήσεις
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAllFaqs(!showAllFaqs)}
                  className="px-3.5 py-1.5 rounded bg-white border border-stone-400 text-[#14191f] text-xs sm:text-sm font-semibold hover:bg-stone-200 cursor-pointer"
                >
                  {showAllFaqs
                    ? "3 Βασικές Ερωτήσεις"
                    : `Όλες οι ${FAQ_ITEMS.length} Ερωτήσεις ↓`}
                </button>
              </div>

              <div className="space-y-2">
                {(showAllFaqs ? FAQ_ITEMS : FAQ_ITEMS.slice(0, 3)).map(
                  (faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded border border-stone-300 overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenFaqIndex(isOpen ? null : idx)
                          }
                          className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 font-serif font-bold text-sm sm:text-base text-[#14191f] cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <span className="text-[#9e4727] font-sans text-lg shrink-0">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-2 border-t border-stone-200 text-sm text-stone-800 leading-relaxed">
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
        </div>
      </section>

      {/* 9. ΦΟΡΜΑ ΣΥΜΜΕΤΟΧΗΣ (#contact-form — §6 & §7) */}
      <section
        id="contact-form"
        className="py-12 sm:py-16 bg-[#f7f5f0] border-b border-stone-300"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-6 sm:p-10 border-2 border-[#14191f] shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
              <div className="space-y-2">
                <div className="text-sm font-bold text-[#9e4727]">
                  «ΑΡΚΕΙ ΟΛΟΙ ΜΑΖΙ, ΟΙ ΒΡΟΣΙΝΙΩΤΕΣ, ΝΑ ΔΟΥΜΕ ΜΕΧΡΙ ΠΟΥ ΜΠΟΡΟΥΜΕ ΝΑ ΤΟ ΦΤΑΣΟΥΜΕ.»
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191f]">
                  «Σπίτια υπάρχουν, καταστήματα άδεια υπάρχουν. Θέλω να έρθω.» — Δηλώστε Συμμετοχή
                </h2>
                <p className="text-base text-stone-800">
                  Συντονιστής Πρωτοβουλίας: <strong>Αθανάσιος Βούρδας</strong> · Έδρα: Βροσίνα, Δήμος Ζίτσας Ιωαννίνων · Συμπληρώστε τη φόρμα επικοινωνίας παρακάτω και θα σας καλέσουμε άμεσα.
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
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Navigation Bar (4 διακριτά κουμπιά με κενό ανάμεσά τους ώστε να μην κολλάνε ποτέ) */}
      <nav
        aria-label="Κινητή Πλοήγηση"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-sm border-t border-stone-300 shadow-lg px-1.5 py-1.5"
      >
        <div className="grid grid-cols-4 gap-1.5 text-center">
          <a
            href="/to-schedio"
            className="py-2 px-1 rounded bg-[#F7F5F0] border border-stone-300 text-xs font-semibold text-[#14191F] truncate"
          >
            Σχέδιο
          </a>
          <a
            href="/gia-ktinotrofous"
            className="py-2 px-1 rounded bg-[#F7F5F0] border border-stone-300 text-xs font-semibold text-[#14191F] truncate"
          >
            Κτηνοτρόφοι
          </a>
          <a
            href="/gia-epicheiriseis"
            className="py-2 px-1 rounded bg-[#F7F5F0] border border-stone-300 text-xs font-semibold text-[#14191F] truncate"
          >
            Επιχειρήσεις
          </a>
          <a
            href="#contact-form"
            className="py-2 px-1 rounded bg-[#1F5C43] text-xs font-bold text-white truncate"
          >
            Επικοινωνία
          </a>
        </div>
      </nav>

      {/* Floating Back-to-Top Button (Μ6: Μικρό και διακριτικό πάνω από την κάτω μπάρα) */}
      <a
        href="#top"
        aria-label="Επιστροφή στην κορυφή της σελίδας"
        className="fixed bottom-14 lg:bottom-5 right-3 z-30 px-2.5 py-1.5 rounded-full bg-[#14191f]/90 text-white text-xs font-semibold shadow border border-stone-600 hover:bg-[#174935] transition"
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
                <strong>1. Υπεύθυνος Επεξεργασίας:</strong> Πρωτοβουλία «Βροσίνα 2031» (Συντονιστής: Αθανάσιος Βούρδας, έδρα: Βροσίνα Δήμου Ζίτσας Ιωαννίνων · επικοινωνία μέσω της επίσημης φόρμας της ιστοσελίδας).
              </p>
              <p>
                <strong>2. Σκοπός & Νομική Βάση Επεξεργασίας:</strong> Τα στοιχεία που συμπληρώνετε στις φόρμες επικοινωνίας (ονοματεπώνυμο, τηλέφωνο, προαιρετικό email, ιδιότητα και μήνυμα) συλλέγονται αποκλειστικά για την απάντηση στο αίτημά σας και την ενημέρωσή σας σχετικά με το σχέδιο «Βροσίνα 2031», τη σύσταση της Κοιν.Σ.Επ. και το Μητρώο Κλειστών Κατοικιών. Νομική βάση της επεξεργασίας είναι η ρητή <strong>συναίνεσή σας</strong> (άρθρο 6 παρ. 1 στοιχ. α΄ του Κανονισμού (ΕΕ) 2016/679 — ΓΚΠΔ).
              </p>
              <p>
                <strong>3. Χρόνος Τήρησης:</strong> Τα δεδομένα τηρούνται μόνο για το διάστημα που απαιτείται για την εξυπηρέτηση του αιτήματός σας και την ολοκλήρωση της διαβούλευσης/σύστασης των φορέων του έργου (και σε κάθε περίπτωση όχι πέραν των 24 μηνών από την υποβολή, εκτός αν ανακληθεί νωρίτερα η συναίνεση). Δεν διαβιβάζονται και δεν πωλούνται σε τρίτους.
              </p>
              <p>
                <strong>4. Δικαιώματα Υποκειμένων & Προσφυγή στην ΑΠΔΠΧ:</strong> Έχετε ανά πάσα στιγμή δικαίωμα πρόσβασης, διόρθωσης, διαγραφής («δικαίωμα στη λήθη»), περιορισμού της επεξεργασίας και ανάκλησης της συναίνεσής σας μέσω της φόρμας επικοινωνίας του site. Επίσης έχετε δικαίωμα υποβολής καταγγελίας στην <strong>Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ)</strong> (Κηφισίας 1–3, Τ.Κ. 115 23, Αθήνα, τηλ. 210 6475600, <a href="https://www.dpa.gr" target="_blank" rel="noopener noreferrer" className="text-[#174935] underline font-semibold">www.dpa.gr</a>).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
