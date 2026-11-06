"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
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
  TV_MEDIA_APPEARANCES,
  REAL_VROSINA_VIDEOS,
  REAL_VS_2031_COMPARISONS,
  CAMP_VIDEO_AUTOPSY,
  ZERO_CAPITAL_HERDER_GUIDE,
  MORPHOLOGICAL_REGULATION_GUIDE,
  PRACTICAL_SOLUTIONS_MATRIX,
  INSTITUTIONAL_ROLES_MATRIX,
  FOURTEEN_FUNDING_TOOLS_DOC,
  KOINSEP_MASTER_GUIDE,
  PUBLIC_FISCAL_BENEFIT_STUDY,
} from "@/data/vrosinaData";

export default function VrosinaClientApp() {
  // Mobile navigation drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Hero interactive role tab ("Τι σημαίνει για εσάς σε 30''") & Hero media mode
  const [heroRoleTab, setHeroRoleTab] = useState<
    "owner" | "investor" | "producer" | "citizen"
  >("owner");
  const [heroMediaView, setHeroMediaView] = useState<
    "map" | "tv1" | "tv2" | "camp"
  >("map");

  // Hero toggle: "vision" (2031 reality-grounded masterplan) vs "real" (2026 real drone photo)
  const [heroMode, setHeroMode] = useState<"vision" | "real">("vision");
  const [activeHotspotId, setActiveHotspotId] = useState<string>(
    MASTERPLAN_HOTSPOTS[1]?.id || "agrofood-camp"
  );

  // Progressive disclosure states to prevent mobile scroll fatigue while keeping all content 1-click accessible
  const [showAllVideos, setShowAllVideos] = useState<boolean>(false);
  const [showAllDataRoom, setShowAllDataRoom] = useState<boolean>(false);
  const engagedTrackedRef = useRef<boolean>(false);

  const registerEngagement = (
    action: string,
    sectionSlug: string,
    label?: string
  ) => {
    try {
      track(action, { section: sectionSlug, label: label || "" });
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("section", sectionSlug);
        window.history.pushState({ section: sectionSlug }, "", url.toString());
      }
    } catch {
      // ignore analytics errors
    }
  };

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

  // Mega-Guides state (Zero-Capital Herder 5-Step Guide & Morphological / Urban Planning Guide)
  const [activeMegaGuideTab, setActiveMegaGuideTab] = useState<
    "herder" | "morphology"
  >("herder");
  const [activeHerderStepIdx, setActiveHerderStepIdx] = useState<number>(0);

  // Practical Solutions & Full Documentation Center state
  const [activePracticalTab, setActivePracticalTab] = useState<
    "fiscal" | "koinsep" | "playbooks" | "institutions" | "funding14"
  >("fiscal");
  const [selectedPlaybookIdx, setSelectedPlaybookIdx] = useState<number>(0);

  // Participation / Lead Modal & Form state (delivers to digiadsgr@gmail.com with exact origin tracking)
  const [leadModalOpen, setLeadModalOpen] = useState<boolean>(false);
  const [leadRole, setLeadRole] = useState<string>("investor");
  const [leadOrigin, setLeadOrigin] = useState<string>(
    "Κεντρική Σελίδα — Γενική Φόρμα Συμμετοχής"
  );
  const [leadContextDetails, setLeadContextDetails] = useState<string>(
    "Απευθείας συμπλήρωση φόρμας ενδιαφέροντος"
  );
  const [leadName, setLeadName] = useState<string>("");
  const [leadPhone, setLeadPhone] = useState<string>("");
  const [leadEmail, setLeadEmail] = useState<string>("");
  const [leadMessage, setLeadMessage] = useState<string>("");
  const [leadSubmitting, setLeadSubmitting] = useState<boolean>(false);
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);
  const [inlineSubmitted, setInlineSubmitted] = useState<boolean>(false);

  const ROLE_LABELS: Record<string, string> = {
    investor:
      "Στρατηγικός Επενδυτής / Family Office / Εταιρεία (35%–40% ή LEADER)",
    benefactor:
      "Μεγάλος Ευεργέτης / Χορηγός Ονοματοδοσίας (ΑΜΚΕ Ταμείο Ευεργετών)",
    institutional: "Θεσμικός / Πολιτικός Φορέας / Αυτοδιοίκηση",
    owner: "Ιδιοκτήτης Κλειστής Κατοικίας ή Καταστήματος στη Βροσίνα",
    producer: "Νέος Κτηνοτρόφος / Αμπελουργός / Τεχνίτης Πέτρας",
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const src = params.get("source");
      const roleParam = params.get("role");
      if (src) {
        setLeadOrigin(`Θεματική Υποσελίδα SEO: ${src}`);
        setLeadContextDetails(`Προέλευση από υποσελίδα: ${src}`);
      }
      if (roleParam && ROLE_LABELS[roleParam]) {
        setLeadRole(roleParam);
      }

      const handleScrollEngage = () => {
        if (engagedTrackedRef.current) return;
        if (window.scrollY > 380) {
          engagedTrackedRef.current = true;
          registerEngagement("engaged_scroll", "explore-masterplan", "Scroll > 380px");
        }
      };
      window.addEventListener("scroll", handleScrollEngage, { passive: true });
      return () => window.removeEventListener("scroll", handleScrollEngage);
    }
  }, []);

  const openLeadModal = (
    role: string,
    originLabel: string,
    contextInfo: string
  ) => {
    setLeadRole(role);
    setLeadOrigin(originLabel);
    setLeadContextDetails(contextInfo);
    setLeadSubmitted(false);
    setLeadModalOpen(true);
    registerEngagement("open_lead_modal", `form-${role}`, originLabel);
  };

  const buildMailtoHref = (originOverride?: string) => {
    const finalOrigin = originOverride || leadOrigin;
    const roleLabel = ROLE_LABELS[leadRole] || leadRole;
    const subject = encodeURIComponent(
      `[ΒΡΟΣΙΝΑ 2031] ${roleLabel} | Πηγή: ${finalOrigin} (${leadName || "Νέο Αίτημα"})`
    );
    const body = encodeURIComponent(
      `ΝΕΟ ΑΙΤΗΜΑ ΑΠΟ ΤΗΝ ΠΛΑΤΦΟΡΜΑ «ΒΡΟΣΙΝΑ 2031»\n` +
        `==================================================\n` +
        `• Πηγή / Κουμπί Προέλευσης: ${finalOrigin}\n` +
        `• Σελίδα URL: ${typeof window !== "undefined" ? window.location.href : "https://vrosina2031.vercel.app"}\n` +
        `• Κατηγορία / Ιδιότητα: ${roleLabel}\n` +
        `• Ονοματεπώνυμο / Φορέας: ${leadName}\n` +
        `• Τηλέφωνο: ${leadPhone}\n` +
        `• Email: ${leadEmail}\n` +
        `• Παράμετροι Ενότητας / Υπολογιστή: ${leadContextDetails}\n` +
        `• Μήνυμα: ${leadMessage || "(Χωρίς επιπλέον σχόλιο)"}\n` +
        `• Ημερομηνία & Ώρα: ${new Date().toLocaleString("el-GR")}\n`
    );
    return `mailto:digiadsgr@gmail.com?subject=${subject}&body=${body}`;
  };

  const submitLeadToDigiads = async (
    e: React.FormEvent,
    originOverride?: string,
    isInlineForm?: boolean
  ) => {
    e.preventDefault();
    const finalOrigin = originOverride || leadOrigin;
    const roleLabel = ROLE_LABELS[leadRole] || leadRole;
    setLeadSubmitting(true);

    const pageUrl =
      typeof window !== "undefined"
        ? window.location.href
        : "https://vrosina2031.vercel.app";
    const referrer =
      typeof document !== "undefined"
        ? document.referrer || "Απευθείας Επίσκεψη (Direct)"
        : "Direct";

    const payload = {
      name: leadName,
      email: leadEmail,
      phone: leadPhone,
      roleLabel,
      origin: finalOrigin,
      pageUrl,
      referrer,
      contextDetails: leadContextDetails,
      message: leadMessage || "(Χωρίς επιπλέον μήνυμα)",
      "01_Έργο": "ΒΡΟΣΙΝΑ 2031 (vrosina2031.vercel.app)",
      "02_Πηγή_Φόρμας_Ενότητα": finalOrigin,
      "03_Σελίδα_URL": pageUrl,
      "04_Referrer": referrer,
      "05_Κατηγορία_Ενδιαφέροντος": roleLabel,
      "06_Ονοματεπώνυμο_ή_Φορέας": leadName,
      "07_Τηλέφωνο_Επικοινωνίας": leadPhone,
      "08_Email": leadEmail,
      "09_Στοιχεία_Υπολογιστή_ή_Ενότητας": leadContextDetails,
      "10_Μήνυμα_Ενδιαφερόμενου": leadMessage || "(Χωρίς επιπλέον μήνυμα)",
      "11_Ημερομηνία_Ώρα": new Date().toLocaleString("el-GR"),
    };

    // 1. Save backup in browser localStorage so 0 leads are ever lost
    try {
      if (typeof window !== "undefined") {
        const existing = JSON.parse(
          localStorage.getItem("vrosina2031_leads_vault") || "[]"
        );
        existing.push(payload);
        localStorage.setItem(
          "vrosina2031_leads_vault",
          JSON.stringify(existing)
        );
      }
    } catch {
      // ignore storage errors
    }

    // 2. Primary Channel: Direct Google SMTP via /api/lead (digiadsgr@gmail.com)
    let deliveredViaSmtp = false;
    try {
      const smtpRes = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const smtpData = await smtpRes.json().catch(() => ({}));
      if (smtpRes.ok && smtpData.smtpSent) {
        deliveredViaSmtp = true;
      }
    } catch {
      deliveredViaSmtp = false;
    }

    // 3. Redundant Client Fallback: Central DIGIADS Lead Endpoint (Zero client secrets)
    if (!deliveredViaSmtp) {
      try {
        await fetch("https://www.digiads.gr/api/send-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${leadName} [ΒΡΟΣΙΝΑ 2031]`,
            email: leadEmail,
            phone: leadPhone,
            service: `🎯 [ΒΡΟΣΙΝΑ 2031] ${roleLabel} | Πηγή: ${finalOrigin}`,
            chatSummary: `Πηγή: ${finalOrigin}\nΣτοιχεία Ενότητας: ${leadContextDetails}\nΜήνυμα: ${leadMessage || "—"}\nΣελίδα: ${pageUrl}`,
          }),
        });
      } catch {
        // ignore network error
      }
    }

    setLeadSubmitting(false);
    if (isInlineForm) {
      setInlineSubmitted(true);
    } else {
      setLeadSubmitted(true);
    }
  };

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
    {
      href: "#praktikes-lyseis",
      shortLabel: "🤝 Κοιν.Σ.Επ. & Λύσεις",
      label: "00. Κοιν.Σ.Επ. (Ν.4430/2016) & Πρακτικές Λύσεις (Πώς/Πού)",
      badge: "ΝΕΟ · ΒΑΣΙΚΟΣ ΟΔΗΓΟΣ",
    },
    {
      href: "#autopsia-real",
      shortLabel: "🎥 Στρατόπεδο & TV",
      label: "01. Αυτοψία 8 Κτιρίων Στρατοπέδου, Drone & Τηλεόραση",
      badge: "8 ΒΙΝΤΕΟ & ΠΡΙΝ/ΜΕΤΑ",
    },
    {
      href: "#masterplan",
      shortLabel: "🏛️ 4 Πυλώνες",
      label: "02. Οι 4 Πυλώνες & 5ετές Χρονοδιάγραμμα (10,45 εκ. €)",
      badge: "MASTERPLAN",
    },
    {
      href: "#investors",
      shortLabel: "💶 Επενδύσεις 80%",
      label: "03. Υπολογιστής Επενδύσεων, LEADER & Ταμείο Ευεργετών",
      badge: "ΕΩΣ 80% ΕΠΙΔΟΤΗΣΗ",
    },
    {
      href: "#governance",
      shortLabel: "🛡️ Διακυβέρνηση",
      label: "04. Καταστατική Ασπίδα & 9 Φάκελοι Φορέων (One-Pagers)",
      badge: "ΚΕΦ. 8 & ΦΟΡΕΙΣ",
    },
    {
      href: "#community",
      shortLabel: "🏡 Σπίτια 0€ & Παραγωγοί",
      label: "05. Κλειστά Σπίτια (0€ Master Lease) & Νέοι Παραγωγοί",
      badge: "ΚΑΤΟΙΚΙΑ & ΚΟΠΑΔΙ",
    },
    {
      href: "#mega-guides",
      shortLabel: "🗺️ Οδηγοί 43.100€ / Σ.Α.",
      label: "06. Mega-Guides: Από Άνεργος Κτηνοτρόφος (43.100€) & Πολεοδομία Σ.Α.",
      badge: "2 ΠΛΗΡΕΙΣ ΟΔΗΓΟΙ",
    },
    {
      href: "#dataroom",
      shortLabel: "📂 Data Room",
      label: "07. Επίσημο Data Room (13 Έγγραφα), Ομιλία & FAQ",
      badge: "13 ΑΡΧΕΙΑ PDF/DOCX",
    },
  ];

  const subpageLinks = [
    {
      href: "/katoikia-neoi-paragogoi",
      label: "Σελίδα: Οδηγός 0€ Κεφάλαιο (43.100€), Κατοικίες & Σ.Α. Ιωαννίνων",
    },
    {
      href: "/stratopedo-vrosinas",
      label: "Σελίδα: Στρατόπεδο Παπακωνσταντίνου (13.695 τ.μ.) & 8 Κτίρια",
    },
    {
      href: "/ependyseis-epidotiseis",
      label: "Σελίδα: Επενδύσεις, 14 Χρηματοδοτικά Εργαλεία & ΑΜΚΕ Ευεργετών",
    },
    {
      href: "/gefyri-vrosinas-raidiotissa",
      label: "Σελίδα: Γεφύρι Βροσίνας 1605 & Ιερά Μονή Ραϊδιώτισσας",
    },
    {
      href: "/ai-knowledge-base",
      label: "Σελίδα: AI Knowledge Base & Bilingual Fact Sheet (EL/EN)",
    },
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

      {/* 2. 100% RESPONSIVE TWO-TIER HEADER + UNIVERSAL MEGA-MENU (ZERO OVERFLOW ON LAPTOP, TABLET & MOBILE) */}
      <header className="sticky top-0 z-40 bg-[#f7f5f0]/98 backdrop-blur-md border-b border-stone-300 shadow-xs">
        {/* Tier 1: Brand + Compact Laptop Nav + Universal Mega-Menu Button + CTA */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-2">
          {/* Minimalist Logo: ΒΡΟΣΙΝΑ2031 */}
          <a
            href="#"
            className="font-serif font-bold text-lg sm:text-2xl tracking-tight text-[#14191f] shrink-0"
          >
            ΒΡΟΣΙΝΑ<span className="text-[#b85d3b]">2031</span>
          </a>

          {/* Compact Desktop/Laptop Primary Links (never overflows on 1280px+ screens) */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-stone-800">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() =>
                  registerEngagement("header_nav_click", item.href, item.shortLabel)
                }
                className="px-2.5 py-1.5 rounded hover:bg-[#14191f] hover:text-[#c89d54] transition whitespace-nowrap"
              >
                {item.shortLabel}
              </a>
            ))}
          </nav>

          {/* Right Actions: Universal Index/Mega-Menu Button (visible on ALL screens including laptops!) + Primary CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Άνοιγμα Πλήρους Μενού Ενοτήτων & Οδηγών"
              className={`px-2.5 sm:px-3 py-1.5 rounded border text-xs font-mono font-bold transition cursor-pointer flex items-center gap-1.5 ${
                mobileMenuOpen
                  ? "bg-[#14191f] text-[#c89d54] border-[#14191f]"
                  : "bg-white hover:bg-stone-200 text-[#14191f] border-stone-400"
              }`}
            >
              <span>{mobileMenuOpen ? "✕" : "☰"}</span>
              <span className="hidden sm:inline">Όλες οι Ενότητες & Οδηγοί</span>
              <span className="sm:hidden">ΜΕΝΟΥ</span>
            </button>

            <button
              type="button"
              onClick={() =>
                openLeadModal(
                  "investor",
                  "Κεφαλίδα (Header CTA) — Κουμπί Συμμετοχή / Επικοινωνία",
                  "Γενική εκδήλωση ενδιαφέροντος από την Κεφαλίδα της σελίδας"
                )
              }
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-[#1f5c43] text-white text-xs font-semibold hover:bg-[#174632] transition cursor-pointer whitespace-nowrap"
            >
              Συμμετοχή / Επικοινωνία
            </button>
          </div>
        </div>

        {/* Tier 2: Always-Visible Quick-Jump Bar for Laptop (1024-1366px), Tablet & Mobile — ZERO LOST CONTENT */}
        <div className="bg-[#14191f] text-stone-200 border-t border-stone-800">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-1.5 flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[10px] font-mono uppercase text-[#c89d54] font-bold shrink-0 pr-1 hidden sm:inline">
              ΑΜΕΣΗ ΜΕΤΑΒΑΣΗ:
            </span>
            <a
              href="#praktikes-lyseis"
              onClick={() => {
                setActivePracticalTab("fiscal");
                registerEngagement("subbar_click", "fiscal-benefit", "Τι Κερδίζει το Δημόσιο 463.700€");
              }}
              className="px-2.5 py-1 rounded bg-[#1f5c43] hover:bg-emerald-700 text-white text-[11px] font-bold whitespace-nowrap transition shrink-0 border border-emerald-400/50"
            >
              🏛️ Τι Κερδίζει το Δημόσιο (463.700€/έτος)
            </a>
            <a
              href="#praktikes-lyseis"
              onClick={() => {
                setActivePracticalTab("koinsep");
                registerEngagement("subbar_click", "koinsep-guide", "Κοιν.Σ.Επ. 100€");
              }}
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-[#1f5c43] text-amber-200 hover:text-white text-[11px] font-semibold whitespace-nowrap transition shrink-0"
            >
              🤝 Κοιν.Σ.Επ. (Ν.4430/2016 · 100€)
            </a>
            <a
              href="#praktikes-lyseis"
              onClick={() => {
                setActivePracticalTab("playbooks");
                registerEngagement("subbar_click", "playbooks-7", "7 Πρακτικοί Οδηγοί");
              }}
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-[#1f5c43] text-stone-200 hover:text-white text-[11px] font-semibold whitespace-nowrap transition shrink-0"
            >
              🧭 Πώς/Από Πού (7 Οδηγοί)
            </a>
            <a
              href="#praktikes-lyseis"
              onClick={() => {
                setActivePracticalTab("institutions");
                registerEngagement("subbar_click", "institutions-roles", "Δήμος/Κοινότητα/ΚΟΙΝΣΕΠ");
              }}
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-[#1f5c43] text-stone-200 hover:text-white text-[11px] font-semibold whitespace-nowrap transition shrink-0"
            >
              🏛️ Ποιος Κάνει Τι (Δήμος/ΚΟΙΝΣΕΠ)
            </a>
            <a
              href="#praktikes-lyseis"
              onClick={() => {
                setActivePracticalTab("funding14");
                registerEngagement("subbar_click", "funding-14", "14 Χρηματοδοτικά Εργαλεία");
              }}
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-[#1f5c43] text-stone-200 hover:text-white text-[11px] font-semibold whitespace-nowrap transition shrink-0"
            >
              📜 14 Νόμοι & Προγράμματα
            </a>
            <a
              href="#mega-guides"
              onClick={() => {
                setActiveMegaGuideTab("herder");
                registerEngagement("subbar_click", "herder-43100", "0€ Κεφάλαιο 43.100€");
              }}
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-[#b85d3b] text-emerald-300 hover:text-white text-[11px] font-semibold whitespace-nowrap transition shrink-0"
            >
              🗺️ 0€ Κεφάλαιο → 43.100€ (5 Βήματα)
            </a>
            <a
              href="#mega-guides"
              onClick={() => {
                setActiveMegaGuideTab("morphology");
                registerEngagement("subbar_click", "morphology-sa", "Πολεοδομία & Σ.Α.");
              }}
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-[#b85d3b] text-stone-200 hover:text-white text-[11px] font-semibold whitespace-nowrap transition shrink-0"
            >
              🪨 Πολεοδομία & Σ.Α. Ιωαννίνων
            </a>
            <a
              href="#autopsia-real"
              onClick={() =>
                registerEngagement("subbar_click", "camp-autopsy", "Στρατόπεδο & 8 Βίντεο")
              }
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-[11px] font-semibold whitespace-nowrap transition shrink-0"
            >
              🎥 Στρατόπεδο & 8 Βίντεο
            </a>
            <a
              href="#investors"
              onClick={() =>
                registerEngagement("subbar_click", "investors-calc", "Επενδύσεις 80%")
              }
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-[11px] font-semibold whitespace-nowrap transition shrink-0"
            >
              💶 Επενδύσεις & Ευεργέτες
            </a>
            <a
              href="#dataroom"
              onClick={() =>
                registerEngagement("subbar_click", "dataroom-13", "Data Room 13 Αρχεία")
              }
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-[11px] font-semibold whitespace-nowrap transition shrink-0"
            >
              📂 Data Room (13 Αρχεία)
            </a>
          </div>
        </div>

        {/* Universal Mega-Menu Drawer (Works on Laptop, Desktop, Tablet & Smartphone) */}
        {mobileMenuOpen && (
          <div className="bg-[#f7f5f0] border-b-2 border-[#14191f] px-4 sm:px-6 lg:px-8 py-5 shadow-2xl max-h-[82vh] overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex items-center justify-between border-b border-stone-300 pb-2.5">
                <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
                  ΠΛΗΡΗΣ ΧΑΡΤΗΣ ΠΛΟΗΓΗΣΗΣ «ΒΡΟΣΙΝΑ 2031» (ΟΛΕΣ ΟΙ ΕΝΟΤΗΤΕΣ, ΟΙ ΟΔΗΓΟΙ & ΟΙ ΣΕΛΙΔΕΣ)
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-mono font-bold text-[#b85d3b] hover:underline cursor-pointer"
                >
                  Κλείσιμο Μενού ✕
                </button>
              </div>

              {/* 8 Main Page Sections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded bg-white border border-stone-300 hover:border-[#14191f] hover:shadow-sm transition flex flex-col justify-between gap-1"
                  >
                    <span className="text-[10px] font-mono font-bold text-[#b85d3b]">
                      {item.badge}
                    </span>
                    <span className="text-xs sm:text-sm font-serif font-bold text-[#14191f] leading-snug">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>

              {/* 5 Dedicated Thematic SEO Subpages + Key Downloads */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-3 border-t border-stone-300 items-center">
                <div className="lg:col-span-8 space-y-1.5">
                  <div className="text-[11px] font-mono font-bold uppercase text-stone-500">
                    ΑΝΕΞΑΡΤΗΤΕΣ ΘΕΜΑΤΙΚΕΣ ΣΕΛΙΔΕΣ ΕΜΒΑΘΥΝΣΗΣ:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {subpageLinks.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className="px-2.5 py-1.5 rounded bg-stone-200/80 hover:bg-[#14191f] text-stone-900 hover:text-white text-xs font-medium transition"
                      >
                        {sub.label} ↗
                      </a>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-2 text-xs">
                  <a
                    href="/documents/Vrosina_2031_Business_Plan_v2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded bg-[#14191f] text-[#c89d54] font-semibold hover:bg-stone-800"
                  >
                    📄 Business Plan v2.0 (PDF)
                  </a>
                  <a
                    href="/documents/Vrosina_2031_Partner_LOI_LEADER_Template.docx"
                    download
                    className="px-3 py-2 rounded bg-amber-100 border border-amber-300 text-amber-950 font-semibold hover:bg-amber-200"
                  >
                    📝 Πρότυπο LOI LEADER (.docx)
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION: HUMAN-FIRST, INSTANT ROLE SELECTOR & MULTI-MODE MEDIA / MAP VIEWER */}
      <section className="bg-[#14191f] text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* Left Column: Clear Human Story & Instant 30-Second Role Selector */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <div className="inline-flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#c89d54] bg-stone-900/90 border border-stone-800 px-3 py-1.5 rounded">
                <span>ΒΡΟΣΙΝΑ ΙΩΑΝΝΙΝΩΝ (35' ΑΠΟ ΙΩΑΝΝΙΝΑ)</span>
                <span className="text-stone-600">·</span>
                <span className="text-emerald-400 font-bold">
                  58 ΚΑΤΟΙΚΟΙ (ΕΛΣΤΑΤ 2021) → 140–160 ΤΟ 2031 (+80–100 ΝΕΟΙ)
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl xl:text-[38px] font-bold leading-[1.16] tracking-tight text-white">
                Από σύμβολο εγκατάλειψης, σε ζωντανό πρότυπο αναγέννησης της ελληνικής υπαίθρου.
              </h1>

              <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed">
                Ένα καταπράσινο χωριό στον Δήμο Ζίτσας παίρνει ξανά ζωή με ένα{" "}
                <strong className="text-white">
                  έτοιμο, κοστολογημένο σχέδιο 10,45 εκατ. € (έως 75% επιδοτήσεις)
                </strong>
                : το ανενεργό{" "}
                <strong className="text-amber-200">
                  Στρατόπεδο «Παπακωνσταντίνου» (13.695 τ.μ.)
                </strong>{" "}
                μετατρέπεται σε Αγροδιατροφικό Κέντρο,{" "}
                <strong className="text-white">
                  30 κτίρια (20 κλειστά σπίτια & 10 ξενώνες) ανακαινίζονται με 0 € κόστος
                </strong>{" "}
                για τους ιδιοκτήτες, το σχολείο ξανανοίγει και δημιουργούνται{" "}
                <strong className="text-emerald-300">
                  50 μόνιμες θέσεις εργασίας (463.700 €/έτος έσοδα Δημοσίου)
                </strong>
                .
              </p>

              {/* INTERACTIVE 30-SECOND ROLE SELECTOR RIGHT IN THE HERO */}
              <div className="bg-stone-900/95 border border-stone-700 rounded-lg p-3.5 sm:p-4 space-y-3 shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#c89d54] font-bold">
                    ΕΠΙΛΕΞΤΕ ΠΟΙΟΙ ΕΙΣΤΕ — ΔΕΙΤΕ ΤΙ ΚΕΡΔΙΖΕΤΕ ΣΕ 30'':
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {[
                    {
                      id: "owner" as const,
                      label: "🏡 Έχω Σπίτι / Γη στη Βροσίνα",
                    },
                    {
                      id: "investor" as const,
                      label: "💶 Επενδυτής / Ευεργέτης",
                    },
                    {
                      id: "producer" as const,
                      label: "🐑 Νέος Παραγωγός / Τεχνίτης",
                    },
                    {
                      id: "citizen" as const,
                      label: "🏛️ Πολίτης / Φορέας / ΜΜΕ",
                    },
                  ].map((tab) => {
                    const active = heroRoleTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setHeroRoleTab(tab.id);
                          registerEngagement(
                            "select_hero_role",
                            `role-${tab.id}`,
                            tab.label
                          );
                        }}
                        className={`px-2.5 py-2 rounded border text-left font-semibold transition cursor-pointer ${
                          active
                            ? "bg-[#c89d54] text-stone-950 border-white shadow-xs"
                            : "bg-stone-950 hover:bg-stone-800 text-stone-200 border-stone-800"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic 30-second answer per selected audience */}
                {heroRoleTab === "owner" && (
                  <div className="p-3 rounded bg-stone-950 border border-stone-800 space-y-2.5 text-xs">
                    <div className="font-serif font-bold text-sm text-amber-200">
                      Έχετε κλειστό σπίτι, μαγαζί ή χωράφι στη Βροσίνα;
                    </div>
                    <ul className="space-y-1 text-stone-300 leading-relaxed">
                      <li>
                        • <strong>0 € δική σας επιβάρυνση:</strong> Πλήρης ανακαίνιση με πέτρα & κεραμοσκεπή (20.000 € έως 50.000 €) μέσω 9–12ετούς Master Lease.
                      </li>
                      <li>
                        • <strong>Κρατάτε 100% την κυριότητα:</strong> Το ακίνητο δεν πωλείται, αποκτά υπεραξία, απαλλάσσεται από δημοτικά τέλη και σας αποδίδει εισόδημα.
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href="#community"
                        onClick={() =>
                          registerEngagement(
                            "hero_jump",
                            "housing-calculator",
                            "Υπολογιστής Σπιτιού"
                          )
                        }
                        className="px-3 py-1.5 rounded bg-[#1f5c43] hover:bg-emerald-700 text-white font-semibold"
                      >
                        Υπολογιστής Αποκατάστασης Σπιτιού ↓
                      </a>
                      <a
                        href="#mega-guides"
                        onClick={() => {
                          setActiveMegaGuideTab("morphology");
                          registerEngagement(
                            "hero_jump",
                            "guide-morphological-regulation",
                            "Μορφολογικός Κανονισμός & Σ.Α. Ιωαννίνων"
                          );
                        }}
                        className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-amber-200 font-semibold"
                      >
                        🏛️ Οδηγός Πολεοδομίας & Σ.Α. Ιωαννίνων ↓
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          openLeadModal(
                            "owner",
                            "Hero 30'' Selector — Ιδιοκτήτης Κλειστού Σπιτιού / Γης",
                            "Ενδιαφέρον για ένταξη κλειστής κατοικίας / καταστήματος στο Master Lease (0 € ίδια συμμετοχή)"
                          )
                        }
                        className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-[#c89d54] font-semibold cursor-pointer"
                      >
                        Δήλωση Ακινήτου →
                      </button>
                    </div>
                  </div>
                )}

                {heroRoleTab === "investor" && (
                  <div className="p-3 rounded bg-stone-950 border border-stone-800 space-y-2.5 text-xs">
                    <div className="font-serif font-bold text-sm text-amber-200">
                      Επιδότηση έως 75%, Μόχλευση 1 € → 2,70 € & Φοροαπαλλαγή Ευεργετών
                    </div>
                    <ul className="space-y-1 text-stone-300 leading-relaxed">
                      <li>
                        • <strong>Στρατηγικός Εταίρος (35%–40%):</strong> Τυροκομείο ΠΟΠ & Οινοποιείο στο Στρατόπεδο με επιδότηση έως 75% (Ν. 4887/2022).
                      </li>
                      <li>
                        • <strong>Ξενώνες LEADER & ΑΜΚΕ Ευεργετών:</strong> Ενεργή Πρόσκληση έως 04/02/2027 ή Χορηγία Ονοματοδοσίας (Naming Rights).
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href="#investors"
                        onClick={() =>
                          registerEngagement(
                            "hero_jump",
                            "investor-simulator",
                            "Υπολογιστής Επενδύσεων"
                          )
                        }
                        className="px-3 py-1.5 rounded bg-[#c89d54] hover:bg-amber-400 text-stone-950 font-bold"
                      >
                        Υπολογιστής Επιδοτήσεων (έως 80%) ↓
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          openLeadModal(
                            "investor",
                            "Hero 30'' Selector — Επενδυτής / Μεγάλος Ευεργέτης",
                            "Αίτημα για Φάκελο Επενδυτή / LOI LEADER / ΑΜΚΕ Ευεργετών"
                          )
                        }
                        className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-white font-semibold cursor-pointer"
                      >
                        Λήψη Φακέλου / LOI →
                      </button>
                    </div>
                  </div>
                )}

                {heroRoleTab === "producer" && (
                  <div className="p-3 rounded bg-stone-950 border border-stone-800 space-y-2.5 text-xs">
                    <div className="font-serif font-bold text-sm text-amber-200">
                      Πρόγραμμα «Έλα να βοσκήσεις — έλα να μείνεις»
                    </div>
                    <ul className="space-y-1 text-stone-300 leading-relaxed">
                      <li>
                        • <strong>Πρώτο Κοπάδι (50–80 ζώα) & Αμπελώνας:</strong> Έως 80% επιδότηση + προκαταβολή-γέφυρα από την 1η μέρα.
                      </li>
                      <li>
                        • <strong>Εγγυημένη απορρόφηση + Σπίτι:</strong> Συμβόλαιο με το Τυροκομείο/Οινοποιείο, ανακαινισμένη κατοικία & αμειβόμενη Σχολή Πετράδων ΔΥΠΑ.
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href="#mega-guides"
                        onClick={() => {
                          setActiveMegaGuideTab("herder");
                          registerEngagement(
                            "hero_jump",
                            "guide-zero-capital-herder",
                            "Οδηγός 0€ Κεφάλαιο 43.100€"
                          );
                        }}
                        className="px-3 py-1.5 rounded bg-[#b85d3b] hover:bg-[#a04e2f] text-white font-semibold"
                      >
                        🗺️ Οδηγός 0 € Κεφάλαιο (43.100 € σε 5 Βήματα) ↓
                      </a>
                      <a
                        href="#community"
                        onClick={() =>
                          registerEngagement(
                            "hero_jump",
                            "young-producers",
                            "Πακέτο Παραγωγών"
                          )
                        }
                        className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-amber-200 font-semibold"
                      >
                        Πακέτο Παραγωγών ↓
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          openLeadModal(
                            "producer",
                            "Hero 30'' Selector — Νέος Κτηνοτρόφος / Αμπελουργός / Τεχνίτης",
                            "Ενδιαφέρον για Πακέτο Πρώτου Κοπαδιού / Αμπελώνα / Σχολή Πετράδων"
                          )
                        }
                        className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-[#c89d54] font-semibold cursor-pointer"
                      >
                        Αίτηση Συμμετοχής →
                      </button>
                    </div>
                  </div>
                )}

                {heroRoleTab === "citizen" && (
                  <div className="p-3 rounded bg-stone-950 border border-stone-800 space-y-2.5 text-xs">
                    <div className="font-serif font-bold text-sm text-amber-200">
                      Ξενάγηση Πεδίου, Τηλεοπτικές Παρουσίες & Θεσμικά Έγγραφα
                    </div>
                    <ul className="space-y-1 text-stone-300 leading-relaxed">
                      <li>
                        • <strong>Αυτοψία Σπιθαμή προς Σπιθαμή:</strong> Δείτε τα 8 κτίρια του Στρατοπέδου «Παπακωνσταντίνου» (13.695 τ.μ.) σήμερα & το 2031.
                      </li>
                      <li>
                        • <strong>2 Τηλεοπτικές Συνεντεύξεις:</strong> Ο Αθανάσιος Βούρδας παρουσιάζει το σχέδιο στα κανάλια της Ηπείρου.
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href="#autopsia-real"
                        onClick={() =>
                          registerEngagement(
                            "hero_jump",
                            "camp-tour-8-buildings",
                            "Ξενάγηση Στρατοπέδου"
                          )
                        }
                        className="px-3 py-1.5 rounded bg-[#b85d3b] hover:bg-[#a04e2f] text-white font-semibold"
                      >
                        Ξενάγηση στα 8 Κτίρια Στρατοπέδου ↓
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setHeroMediaView("tv1");
                          registerEngagement(
                            "hero_play_tv1",
                            "hero-tv-player",
                            "Τηλεοπτική Παρουσίαση 1"
                          );
                        }}
                        className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-[#c89d54] font-semibold cursor-pointer"
                      >
                        ▶ Παίξτε το Βίντεο Τηλεόρασης εδώ
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Multi-Mode Interactive Media Showcase (Aerial Map + TV Broadcasts + Camp Video right Above the Fold!) */}
            <div className="lg:col-span-7 space-y-3">
              {/* Top Media Mode Switcher */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  {
                    id: "map" as const,
                    badge: "ΔΙΑΔΡΑΣΤΙΚΟΣ ΧΑΡΤΗΣ",
                    label: "🗺️ Χάρτης Σήμερα ↔ 2031",
                  },
                  {
                    id: "tv1" as const,
                    badge: "ΤΗΛΕΟΡΑΣΗ #1",
                    label: "📺 Παρουσίαση Σχεδίου",
                  },
                  {
                    id: "tv2" as const,
                    badge: "EPIRUS TV1",
                    label: "📺 Συνέντευξη Α. Βούρδα",
                  },
                  {
                    id: "camp" as const,
                    badge: "ΑΥΤΟΨΙΑ 12:31",
                    label: "🎥 Βίντεο Στρατοπέδου",
                  },
                ].map((m) => {
                  const active = heroMediaView === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setHeroMediaView(m.id);
                        registerEngagement(
                          "switch_hero_media",
                          `hero-${m.id}`,
                          m.label
                        );
                      }}
                      className={`p-2 sm:p-2.5 rounded border text-left transition cursor-pointer ${
                        active
                          ? "bg-[#c89d54] text-stone-950 border-white font-bold shadow-sm"
                          : "bg-stone-900/90 hover:bg-stone-800 text-stone-200 border-stone-800"
                      }`}
                    >
                      <div
                        className={`text-[9px] font-mono uppercase ${
                          active ? "text-stone-900 font-bold" : "text-[#c89d54]"
                        }`}
                      >
                        {m.badge}
                      </div>
                      <div className="text-[11px] sm:text-xs font-semibold truncate mt-0.5">
                        {m.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="bg-stone-950 border border-stone-800 rounded-lg overflow-hidden shadow-xl">
                {heroMediaView === "map" ? (
                  <>
                    <div className="px-3 sm:px-4 py-2.5 bg-stone-900 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-stone-300 uppercase">
                        {heroMode === "vision"
                          ? "ΧΑΡΤΗΣ 2031 (ΒΑΣΙΣΜΕΝΟΣ ΣΤΗΝ ΠΡΑΓΜΑΤΙΚΗ ΑΕΡΟΦΩΤΟΓΡΑΦΙΑ)"
                          : "ΠΡΑΓΜΑΤΙΚΗ ΑΕΡΟΦΩΤΟΓΡΑΦΙΑ ΒΡΟΣΙΝΑΣ ΣΗΜΕΡΑ (DRONE)"}
                      </span>
                      <div className="inline-flex rounded bg-stone-950 p-0.5 text-[11px] border border-stone-800">
                        <button
                          type="button"
                          onClick={() => {
                            setHeroMode("real");
                            registerEngagement(
                              "toggle_hero_map",
                              "map-real-drone",
                              "Σήμερα (Drone)"
                            );
                          }}
                          className={`px-2.5 py-1 rounded-xs font-semibold transition cursor-pointer ${
                            heroMode === "real"
                              ? "bg-[#b85d3b] text-white"
                              : "text-stone-400 hover:text-white"
                          }`}
                        >
                          Σήμερα (Drone)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setHeroMode("vision");
                            registerEngagement(
                              "toggle_hero_map",
                              "map-vision-2031",
                              "Σχέδιο 2031"
                            );
                          }}
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
                            type="button"
                            onClick={() => {
                              setActiveHotspotId(spot.id);
                              registerEngagement(
                                "select_map_hotspot",
                                `hotspot-${spot.id}`,
                                spot.title
                              );
                            }}
                            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform ${
                              isSelected
                                ? "scale-125 z-20"
                                : "hover:scale-110 z-10"
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

                    {/* Hotspot Info Strip Below Image */}
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
                        <span>
                          Πατήστε τους αριθμούς (1–6) ή επιλέξτε Τηλεόραση / Βίντεο πάνω
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  (() => {
                    const videoMeta =
                      heroMediaView === "tv1"
                        ? {
                            id: TV_MEDIA_APPEARANCES[0].id,
                            title: TV_MEDIA_APPEARANCES[0].title,
                            sub: `${TV_MEDIA_APPEARANCES[0].channel} · ${TV_MEDIA_APPEARANCES[0].speaker}`,
                            desc: TV_MEDIA_APPEARANCES[0].summary,
                          }
                        : heroMediaView === "tv2"
                          ? {
                              id: TV_MEDIA_APPEARANCES[1].id,
                              title: TV_MEDIA_APPEARANCES[1].title,
                              sub: `${TV_MEDIA_APPEARANCES[1].channel} · ${TV_MEDIA_APPEARANCES[1].speaker}`,
                              desc: TV_MEDIA_APPEARANCES[1].summary,
                            }
                          : {
                              id: CAMP_VIDEO_AUTOPSY.videoId,
                              title: CAMP_VIDEO_AUTOPSY.title,
                              sub: `${CAMP_VIDEO_AUTOPSY.officialCampName} · Διάρκεια ${CAMP_VIDEO_AUTOPSY.duration}`,
                              desc: CAMP_VIDEO_AUTOPSY.executiveSummary,
                            };
                    return (
                      <>
                        <div className="px-3 sm:px-4 py-2.5 bg-stone-900 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-mono text-[#c89d54] font-bold uppercase truncate">
                            {videoMeta.sub}
                          </span>
                          <button
                            type="button"
                            onClick={() => setHeroMediaView("map")}
                            className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-xs text-white font-semibold cursor-pointer"
                          >
                            ← Επιστροφή στον Χάρτη 2031
                          </button>
                        </div>
                        <div className="aspect-video w-full bg-black">
                          <iframe
                            key={videoMeta.id}
                            src={`https://www.youtube.com/embed/${videoMeta.id}?autoplay=1&rel=0`}
                            title={videoMeta.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full border-0"
                          />
                        </div>
                        <div className="p-3.5 sm:p-4 bg-stone-900 border-t border-stone-800 text-xs space-y-2">
                          <div className="font-serif font-bold text-sm sm:text-base text-white">
                            {videoMeta.title}
                          </div>
                          <p className="text-stone-300 leading-relaxed">
                            {videoMeta.desc}
                          </p>
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                            <a
                              href="#autopsia-real"
                              className="text-[#c89d54] hover:underline font-semibold"
                            >
                              Μετάβαση στην πλήρη ξενάγηση των 8 κτιρίων του Στρατοπέδου ↓
                            </a>
                            <button
                              type="button"
                              onClick={() => setHeroMediaView("map")}
                              className="text-stone-400 hover:text-white font-mono text-[11px] cursor-pointer"
                            >
                              Προβολή Χάρτη 6 Σημείων
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })()
                )}
              </div>
            </div>
          </div>

          {/* 6 KPI Counter Cards + Instant "What the State Gains" Proof Strip */}
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

          {/* Direct Proof Banner: What the State Gains from the 6,58M € Public/EU Investment */}
          <div className="mt-4 bg-stone-900/95 border border-emerald-500/40 rounded-lg p-3.5 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="space-y-0.5 text-xs">
              <div className="font-mono font-bold text-emerald-400 uppercase">
                🏛️ ΤΙ ΚΕΡΔΙΖΕΙ ΤΟ ΔΗΜΟΣΙΟ ΑΠΟ ΤΑ 6,58 ΕΚ. € (63% ΔΗΜΟΣΙΟΙ / Ε.Ε. ΠΟΡΟΙ):
              </div>
              <p className="text-stone-200 leading-relaxed">
                <strong>463.700 € / έτος</strong> άμεσα έσοδα σε πλήρη λειτουργία (ΕΦΚΑ 327.600 € + ΦΜΥ 45.500 € + Φόρος Ν.Π. 39.600 € + Αντάλλαγμα Τ.Α.ΕΘ.Α. 51.000 €, <em>χωρίς καν να μετρήσουμε ΦΠΑ</em>) · <strong>Απόσβεση εθνικού σκέλους σε 6–10 έτη</strong> (ή 17 έτη αν 100% εθνικό κόστος) · <strong>1,6× επιστροφή (10,53 εκ. €) σε 25 έτη</strong> · <strong>0 € κόστος συντήρησης Στρατοπέδου για το ΥΠΕΘΑ</strong>.
              </p>
            </div>
            <a
              href="#praktikes-lyseis"
              onClick={() => {
                setActivePracticalTab("fiscal");
                registerEngagement(
                  "hero_fiscal_proof_click",
                  "fiscal-benefit-study",
                  "Τι Κερδίζει το Δημόσιο 463.700€"
                );
              }}
              className="px-4 py-2 rounded bg-[#1f5c43] hover:bg-emerald-700 text-white font-mono text-xs font-bold whitespace-nowrap transition shrink-0 text-center"
            >
              Αναλυτική Απόδειξη Εσόδων Δημοσίου ↓
            </a>
          </div>
        </div>
      </section>

      {/* 3.5 SECTION 00 (#praktikes-lyseis): PRACTICAL SOLUTIONS, FISCAL PROOF & 100% DOCUMENTATION CENTER */}
      <section
        id="praktikes-lyseis"
        className="py-12 sm:py-16 bg-[#f7f5f0] border-b-2 border-[#14191f]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#1f5c43]">
                00 / ΚΕΝΤΡΟ ΤΕΚΜΗΡΙΩΣΗΣ, ΔΗΜΟΣΙΟΝΟΜΙΚΟΥ ΟΦΕΛΟΥΣ & ΠΡΑΚΤΙΚΩΝ ΛΥΣΕΩΝ
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#14191f]">
                Τι Κερδίζει το Κράτος (463.700 €/έτος), Πώς Λειτουργεί η Κοιν.Σ.Επ. & Πρακτικές Απαντήσεις για Κάθε Ενδιαφερόμενο
              </h2>
              <p className="text-stone-700 text-xs sm:text-base leading-relaxed">
                Κάθε αριθμός, πρόγραμμα και δράση στο <strong>«Βροσίνα 2031»</strong> τεκμηριώνεται με αριθμούς που αντέχουν σε έλεγχο αξιολογητή, τον ακριβή νόμο (ΦΕΚ), την ενεργή πρόσκληση και τον υπεύθυνο φορέα.
              </p>
            </div>

            {/* 5-Mode Switcher for Fiscal Study, KOINSEP & Practical Center */}
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                {
                  id: "fiscal" as const,
                  label:
                    "🏛️ 1. Τι Κερδίζει το Δημόσιο (463.700 €/έτος · Απόσβεση 6–17 έτη · 1,6×)",
                },
                {
                  id: "koinsep" as const,
                  label:
                    "🤝 2. Οδηγός Κοιν.Σ.Επ. Βροσίνας (Ν. 4430/2016 · Μερίδα 100€ · 11 Ερωτήσεις)",
                },
                {
                  id: "playbooks" as const,
                  label: "🧭 3. Πρακτικές Λύσεις ανά Ενδιαφερόμενο (7 Οδηγοί)",
                },
                {
                  id: "institutions" as const,
                  label: "⚙️ 4. Ποιος Εκπονεί Τι (Δήμος · Κοινότητα · ΚΟΙΝΣΕΠ)",
                },
                {
                  id: "funding14" as const,
                  label: "📜 5. Τα 14 Χρηματοδοτικά Εργαλεία & Νόμοι (ΦΕΚ)",
                },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setActivePracticalTab(t.id);
                    registerEngagement(
                      "switch_practical_tab",
                      `practical-${t.id}`,
                      t.label
                    );
                  }}
                  className={`px-3.5 py-2.5 rounded font-semibold transition cursor-pointer ${
                    activePracticalTab === t.id
                      ? "bg-[#14191f] text-[#c89d54] ring-2 ring-[#c89d54]"
                      : "bg-white text-stone-800 border border-stone-300 hover:bg-stone-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* MODE FISCAL (DEFAULT): WHAT THE STATE GAINS (463.700 €/YEAR FISCAL & NON-FISCAL PROOF) */}
          {activePracticalTab === "fiscal" && (
            <div className="space-y-8">
              {/* Top Executive Banner + 4 Headline Metrics */}
              <div className="bg-[#14191f] text-white rounded-lg p-5 sm:p-8 border-2 border-[#c89d54] space-y-5 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                  <span className="text-xs font-mono font-bold uppercase text-[#c89d54]">
                    {PUBLIC_FISCAL_BENEFIT_STUDY.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold">
                    6,58 εκ. € Δημόσιο/Ε.Ε. (63%) + 3,87 εκ. € Ιδιωτικά (37%) = 10,45 εκ. €
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-3xl font-bold text-white leading-snug">
                  {PUBLIC_FISCAL_BENEFIT_STUDY.title}
                </h3>

                <blockquote className="p-4 rounded bg-stone-900 border-l-4 border-[#c89d54] font-serif italic text-amber-200 text-sm sm:text-base">
                  «{PUBLIC_FISCAL_BENEFIT_STUDY.subtitle}»
                </blockquote>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
                  {PUBLIC_FISCAL_BENEFIT_STUDY.headlineMetrics.map((hm, idx) => (
                    <div
                      key={idx}
                      className="bg-stone-900 rounded p-4 border border-stone-700 space-y-1"
                    >
                      <div className="font-mono text-2xl sm:text-3xl font-bold text-[#c89d54]">
                        {hm.value}
                      </div>
                      <div className="font-serif font-bold text-sm text-white">
                        {hm.label}
                      </div>
                      <p className="text-xs text-stone-300 leading-snug">
                        {hm.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 1: Annual Revenue Breakdown (463.700 €) + What We Deliberately Exclude */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left 7 cols: The 463.700 € / year Breakdown Table */}
                <div className="lg:col-span-7 bg-white rounded-lg p-5 sm:p-6 border-2 border-[#14191f] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
                    <div>
                      <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
                        ΑΝΑΛΥΣΗ ΕΤΗΣΙΩΝ ΑΜΕΣΩΝ ΕΣΟΔΩΝ ΔΗΜΟΣΙΟΥ (ΕΤΟΣ 5 · ΒΑΣΙΚΟ ΣΕΝΑΡΙΟ)
                      </div>
                      <h4 className="font-serif text-lg sm:text-2xl font-bold text-[#14191f]">
                        Πώς Προκύπτουν τα 463.700 € / Έτος (Χωρίς ΦΠΑ)
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded bg-emerald-50 border border-emerald-300 font-mono text-sm font-bold text-[#1f5c43]">
                      {PUBLIC_FISCAL_BENEFIT_STUDY.annualRevenueTotal}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b-2 border-stone-300 bg-stone-100 font-mono text-[11px] uppercase text-stone-700">
                          <th className="p-2.5">Πηγή Εσόδου Δημοσίου</th>
                          <th className="p-2.5">Βάση Υπολογισμού (Συντηρητικά)</th>
                          <th className="p-2.5 text-right">Ετήσιο Ποσό</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {PUBLIC_FISCAL_BENEFIT_STUDY.annualRevenueBreakdown.map(
                          (row, idx) => (
                            <tr key={idx} className="hover:bg-stone-50">
                              <td className="p-2.5 font-serif font-bold text-[#14191f]">
                                {row.source}
                              </td>
                              <td className="p-2.5 text-stone-700 font-mono text-xs">
                                {row.calculationBasis}
                              </td>
                              <td className="p-2.5 text-right font-mono font-bold text-[#1f5c43] whitespace-nowrap">
                                {row.annualAmount}
                              </td>
                            </tr>
                          )
                        )}
                        <tr className="bg-[#14191f] text-white font-bold">
                          <td className="p-3 font-serif" colSpan={2}>
                            ΣΥΝΟΛΟ ΑΜΕΣΩΝ ΕΤΗΣΙΩΝ ΕΣΟΔΩΝ ΔΗΜΟΣΙΟΥ (ΒΑΣΙΚΟ ΣΕΝΑΡΙΟ)
                          </td>
                          <td className="p-3 text-right font-mono text-[#c89d54] text-base whitespace-nowrap">
                            {PUBLIC_FISCAL_BENEFIT_STUDY.annualRevenueTotal}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-[11px] text-stone-600 bg-[#f7f5f0] p-3 rounded border border-stone-300 leading-relaxed">
                    {PUBLIC_FISCAL_BENEFIT_STUDY.transparencyNote}
                  </p>
                </div>

                {/* Right 5 cols: What We Deliberately Do NOT Count + Evaluator Metrics */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="bg-white rounded-lg p-5 sm:p-6 border-2 border-[#b85d3b] space-y-3">
                    <div className="text-xs font-mono font-bold uppercase text-[#b85d3b]">
                      ΘΩΡΑΚΙΣΗ ΑΞΙΟΠΙΣΤΙΑΣ ΑΠΕΝΑΝΤΙ ΣΕ ΑΞΙΟΛΟΓΗΤΕΣ
                    </div>
                    <h4 className="font-serif text-base sm:text-xl font-bold text-[#14191f]">
                      {PUBLIC_FISCAL_BENEFIT_STUDY.deliberatelyExcludedTitle}
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-700">
                      {PUBLIC_FISCAL_BENEFIT_STUDY.deliberatelyExcluded.map(
                        (ex, idx) => (
                          <li
                            key={idx}
                            className="p-3 rounded bg-[#f7f5f0] border border-stone-200 leading-relaxed"
                          >
                            • {ex}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* The 2 Evaluator Ratios */}
                  <div className="bg-[#14191f] text-white rounded-lg p-5 border border-stone-800 space-y-3">
                    <div className="text-xs font-mono font-bold uppercase text-[#c89d54]">
                      ΟΙ 2 ΔΕΙΚΤΕΣ ΠΟΥ ΚΟΙΤΑΖΕΙ ΚΑΘΕ ΑΞΙΟΛΟΓΗΤΗΣ (ΜΕ ΟΛΕΣ ΤΙΣ ΥΠΟΔΟΜΕΣ)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PUBLIC_FISCAL_BENEFIT_STUDY.evaluatorMetrics.map(
                        (em, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded bg-stone-900 border border-stone-700 space-y-1 text-xs"
                          >
                            <div className="text-[11px] font-mono text-stone-400">
                              {em.title}
                            </div>
                            <div className="font-mono text-lg font-bold text-[#c89d54]">
                              {em.value}
                            </div>
                            <div className="text-[11px] text-emerald-400 font-mono">
                              {em.range}
                            </div>
                            <p className="text-[11px] text-stone-300 leading-snug pt-1">
                              {em.explanation}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: 3 Scenarios Table (10 & 25 Years) + National vs EU Co-Financing Sensitivity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left 7 cols: 3 Scenarios Fiscal Return Table */}
                <div className="lg:col-span-7 bg-white rounded-lg p-5 sm:p-6 border border-stone-300 space-y-4">
                  <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
                    ΣΥΓΚΡΙΣΗ 3 ΣΕΝΑΡΙΩΝ ΣΕ ΟΡΙΖΟΝΤΑ 10 & 25 ΕΤΩΝ (ΠΑΡΑΧΩΡΗΣΗ ΣΤΡΑΤΟΠΕΔΟΥ)
                  </div>
                  <h4 className="font-serif text-lg sm:text-2xl font-bold text-[#14191f]">
                    Πόσα Εισπράττει το Δημόσιο σε 10 και 25 Έτη ανά Σενάριο
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b-2 border-stone-300 bg-stone-100 font-mono text-[11px] uppercase text-stone-700">
                          <th className="p-2.5">Μέγεθος / Δείκτης</th>
                          <th className="p-2.5 text-right">Συντηρητικό</th>
                          <th className="p-2.5 text-right bg-emerald-50 text-[#1f5c43]">
                            Βασικό (Σχεδιασμού)
                          </th>
                          <th className="p-2.5 text-right">Αισιόδοξο</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {PUBLIC_FISCAL_BENEFIT_STUDY.threeScenariosFiscal.map(
                          (r, idx) => (
                            <tr key={idx} className="hover:bg-stone-50">
                              <td className="p-2.5 font-medium text-[#14191f]">
                                {r.metric}
                              </td>
                              <td className="p-2.5 text-right font-mono text-stone-700">
                                {r.conservative}
                              </td>
                              <td className="p-2.5 text-right font-mono font-bold bg-emerald-50/60 text-[#1f5c43]">
                                {r.baseline}
                              </td>
                              <td className="p-2.5 text-right font-mono text-stone-800">
                                {r.optimistic}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-stone-700 bg-amber-50 p-3.5 rounded border border-amber-300 leading-relaxed">
                    {PUBLIC_FISCAL_BENEFIT_STUDY.discountRateHonestyNote}
                  </p>
                </div>

                {/* Right 5 cols: National vs EU Share Sensitivity Table */}
                <div className="lg:col-span-5 bg-white rounded-lg p-5 sm:p-6 border border-stone-300 space-y-4">
                  <div className="text-xs font-mono font-bold uppercase text-[#b85d3b]">
                    ΕΘΝΙΚΟΣ ΠΡΟΫΠΟΛΟΓΙΣΜΟΣ VS ΕΥΡΩΠΑΪΚΟΙ ΠΟΡΟΙ (Ε.Ε.)
                  </div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#14191f]">
                    Πόσο Γρήγορα Αποσβένεται η Καθαρή Εθνική Συμμετοχή (6 έως 10 Έτη)
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {PUBLIC_FISCAL_BENEFIT_STUDY.nationalVsEuSensitivityIntro}
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b-2 border-stone-300 bg-stone-100 font-mono text-[10px] uppercase text-stone-700">
                          <th className="p-2">Παραδοχή Εθνικού Σκέλους</th>
                          <th className="p-2 text-right">Εθνικό Κόστος</th>
                          <th className="p-2 text-right">Συντ.</th>
                          <th className="p-2 text-right text-[#1f5c43]">Βασικό</th>
                          <th className="p-2 text-right">Αισιόδ.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 font-mono">
                        {PUBLIC_FISCAL_BENEFIT_STUDY.nationalVsEuSensitivityTable.map(
                          (s, idx) => (
                            <tr key={idx} className="hover:bg-stone-50">
                              <td className="p-2 font-sans font-semibold text-[#14191f]">
                                {s.assumption}
                              </td>
                              <td className="p-2 text-right text-stone-800 font-bold">
                                {s.nationalBudgetBurden}
                              </td>
                              <td className="p-2 text-right text-stone-600">
                                {s.paybackConservative}
                              </td>
                              <td className="p-2 text-right font-bold text-[#1f5c43] bg-emerald-50">
                                {s.paybackBaseline}
                              </td>
                              <td className="p-2 text-right text-stone-800">
                                {s.paybackOptimistic}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Row 3: The 6 Non-Fiscal National Benefits + 3 Ready Interview Quotes */}
              <div className="bg-white rounded-lg p-5 sm:p-8 border border-stone-300 space-y-6">
                <div className="border-b border-stone-200 pb-3">
                  <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
                    ΠΕΡΑ ΑΠΟ ΤΟΥΣ ΦΟΡΟΥΣ & ΤΙΣ ΕΙΣΦΟΡΕΣ · ΤΑ 6 ΜΗ ΔΗΜΟΣΙΟΝΟΜΙΚΑ ΕΘΝΙΚΑ ΟΦΕΛΗ
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
                    Τι Αγοράζει η Πολιτεία που Δεν Αποτυπώνεται Μόνο στον Κρατικό Προϋπολογισμό
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PUBLIC_FISCAL_BENEFIT_STUDY.sixNonFiscalBenefits.map(
                    (nf) => (
                      <div
                        key={nf.num}
                        className="p-4 rounded bg-[#f7f5f0] border border-stone-300 space-y-1.5"
                      >
                        <div className="text-xs font-mono font-bold text-[#b85d3b]">
                          ΟΦΕΛΟΣ {nf.num}
                        </div>
                        <div className="font-serif font-bold text-sm sm:text-base text-[#14191f]">
                          {nf.title}
                        </div>
                        <p className="text-xs text-stone-700 leading-relaxed">
                          {nf.desc}
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* 3 Ready Interview Quotes Box */}
                <div className="bg-[#14191f] text-white rounded-lg p-5 sm:p-6 space-y-3">
                  <div className="text-xs font-mono font-bold uppercase text-[#c89d54]">
                    ΟΙ 3 ΕΤΟΙΜΕΣ ΑΠΑΝΤΗΣΕΙΣ ΓΙΑ ΣΥΝΕΝΤΕΥΞΗ, ΥΠΟΥΡΓΕΙΑ & ΔΗΜΟΣΙΟ ΔΙΑΛΟΓΟ:
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs sm:text-sm">
                    {PUBLIC_FISCAL_BENEFIT_STUDY.interviewQuotes.map(
                      (q, idx) => (
                        <blockquote
                          key={idx}
                          className="p-4 rounded bg-stone-900 border-l-4 border-[#c89d54] font-serif italic text-stone-100 leading-relaxed"
                        >
                          {q}
                        </blockquote>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODE 0 (DEFAULT): COMPLETE KOINSEP MASTER GUIDE (LAW 4430/2016) */}
          {activePracticalTab === "koinsep" && (
            <div className="space-y-8">
              {/* Top Hero Banner of KOINSEP Guide */}
              <div className="bg-[#14191f] text-white rounded-lg p-5 sm:p-8 border-2 border-[#c89d54] space-y-5 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                  <span className="text-xs font-mono font-bold uppercase text-[#c89d54]">
                    {KOINSEP_MASTER_GUIDE.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold">
                    Ν. 4430/2016 (Άρθρα 14, 16, 17, 18 & 21)
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-3xl font-bold text-white leading-snug">
                  {KOINSEP_MASTER_GUIDE.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {KOINSEP_MASTER_GUIDE.introPlainLanguage}
                </p>

                <blockquote className="p-4 rounded bg-stone-900 border-l-4 border-[#c89d54] font-serif italic text-amber-200 text-sm sm:text-base">
                  {KOINSEP_MASTER_GUIDE.coreMotto}
                </blockquote>

                {/* 4 Statutory Pillars of Law 4430/2016 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
                  {KOINSEP_MASTER_GUIDE.legalPillars.map((lp, idx) => (
                    <div
                      key={idx}
                      className="bg-stone-900 rounded p-4 border border-stone-700 space-y-1.5"
                    >
                      <div className="text-[11px] font-mono font-bold text-[#c89d54]">
                        {lp.article}
                      </div>
                      <div className="font-serif font-bold text-sm text-white">
                        {lp.title}
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {lp.plainText}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section A: How KOINSEP Becomes the Key Player (6 Core Competencies) & Why Everyone Benefits */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left 7 cols: The 6 Roles of the Key Player */}
                <div className="lg:col-span-7 bg-white rounded-lg p-5 sm:p-6 border border-stone-300 space-y-4">
                  <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
                    Ο ΜΑΕΣΤΡΟΣ ΤΟΥ ΣΧΕΔΙΟΥ · ΟΙ 6 ΑΡΜΟΔΙΟΤΗΤΕΣ ΤΗΣ ΚΟΙΝ.Σ.ΕΠ.
                  </div>
                  <h4 className="font-serif text-lg sm:text-2xl font-bold text-[#14191f]">
                    {KOINSEP_MASTER_GUIDE.whyKeyPlayerTitle}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {KOINSEP_MASTER_GUIDE.keyPlayerRoles.map((role, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded bg-[#f7f5f0] border border-stone-300 space-y-1"
                      >
                        <div className="text-[10px] font-mono font-bold text-[#b85d3b]">
                          {role.code}
                        </div>
                        <div className="font-serif font-bold text-xs sm:text-sm text-[#14191f]">
                          {role.title}
                        </div>
                        <p className="text-xs text-stone-700 leading-relaxed">
                          {role.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right 5 cols: Why Everyone Benefits */}
                <div className="lg:col-span-5 bg-white rounded-lg p-5 sm:p-6 border border-stone-300 space-y-4">
                  <div className="text-xs font-mono font-bold uppercase text-[#b85d3b]">
                    ΑΜΟΙΒΑΙΟ ΟΦΕΛΟΣ (WIN-WIN ΓΙΑ ΟΛΟΥΣ)
                  </div>
                  <h4 className="font-serif text-lg sm:text-2xl font-bold text-[#14191f]">
                    {KOINSEP_MASTER_GUIDE.whyEveryoneBenefitsTitle}
                  </h4>
                  <div className="space-y-2.5">
                    {KOINSEP_MASTER_GUIDE.benefitsByGroup.map((b, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded bg-stone-50 border border-stone-200 space-y-0.5 text-xs"
                      >
                        <div className="font-serif font-bold text-sm text-[#1f5c43]">
                          {b.group}
                        </div>
                        <p className="text-stone-700 leading-relaxed">
                          {b.benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section B: The 11 Honest Questions & Answers ("Τι είναι και τι ρισκάρω; Οι ερωτήσεις που θα ακούσεις") */}
              <div className="bg-white rounded-lg p-5 sm:p-8 border-2 border-[#1f5c43] space-y-5">
                <div className="border-b border-stone-200 pb-4 space-y-1">
                  <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
                    ΕΡΩΤΗΣΕΙΣ & ΑΠΑΝΤΗΣΕΙΣ ΜΕ ΒΑΣΗ ΤΟΝ Ν. 4430/2016
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
                    {KOINSEP_MASTER_GUIDE.elevenQuestionsTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {KOINSEP_MASTER_GUIDE.elevenQuestionsSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {KOINSEP_MASTER_GUIDE.elevenQuestions.map((item) => (
                    <div
                      key={item.num}
                      className="p-4 rounded bg-[#f7f5f0] border border-stone-300 space-y-1.5"
                    >
                      <div className="font-serif font-bold text-sm sm:text-base text-[#14191f]">
                        <span className="font-mono text-[#b85d3b] mr-1.5">
                          {item.num}.
                        </span>
                        {item.q}
                      </div>
                      <p className="text-xs text-stone-800 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section C: Realistic 30-Day Launch Timeline + 5 Working Teams + 3 Protection Rules */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left 6 cols: First 30 Days & Until Feb 4, 2027 */}
                <div className="lg:col-span-6 bg-[#14191f] text-white rounded-lg p-5 sm:p-6 border border-stone-800 space-y-4">
                  <div className="text-xs font-mono font-bold uppercase text-[#c89d54]">
                    ΡΕΑΛΙΣΤΙΚΟ ΧΡΟΝΟΔΙΑΓΡΑΜΜΑ ΕΚΚΙΝΗΣΗΣ
                  </div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                    {KOINSEP_MASTER_GUIDE.realTimelineTitle}
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed bg-stone-900 p-3.5 rounded border border-stone-700">
                    {KOINSEP_MASTER_GUIDE.realTimelineNote}
                  </p>

                  <div className="space-y-2.5">
                    {KOINSEP_MASTER_GUIDE.first30Days.map((w, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded bg-stone-900 border border-stone-800 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between font-mono">
                          <span className="text-[#c89d54] font-bold">
                            {w.week}
                          </span>
                          <span className="text-emerald-400">{w.owner}</span>
                        </div>
                        <p className="text-stone-200 leading-relaxed">
                          {w.tasks}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right 6 cols: 5 Working Teams + 3 Rules that Protect the Project */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="bg-white rounded-lg p-5 sm:p-6 border border-stone-300 space-y-3">
                    <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
                      ΟΙ 5 ΟΜΑΔΕΣ ΕΡΓΑΣΙΑΣ & ΟΙ ΕΙΔΙΚΟΤΗΤΕΣ ΠΟΥ ΧΡΕΙΑΖΟΜΑΣΤΕ
                    </div>
                    <div className="divide-y divide-stone-200 text-xs">
                      {KOINSEP_MASTER_GUIDE.fiveWorkingTeams.map((t, idx) => (
                        <div key={idx} className="py-2.5 space-y-0.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <strong className="font-serif text-sm text-[#14191f]">
                              {t.team}
                            </strong>
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#1f5c43] font-mono font-semibold text-[11px]">
                              {t.specialistsNeeded}
                            </span>
                          </div>
                          <p className="text-stone-600">{t.scope}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-5 sm:p-6 border-2 border-[#b85d3b] space-y-3">
                    <div className="text-xs font-mono font-bold uppercase text-[#b85d3b]">
                      ΟΙ 3 ΚΑΝΟΝΕΣ ΠΟΥ ΠΡΟΣΤΑΤΕΥΟΥΝ ΤΟ ΕΓΧΕΙΡΗΜΑ
                    </div>
                    {KOINSEP_MASTER_GUIDE.threeProtectionRules.map((r, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded bg-[#f7f5f0] border border-stone-200 space-y-1 text-xs"
                      >
                        <div className="font-serif font-bold text-[#14191f]">
                          <span className="font-mono text-[#b85d3b] mr-1.5">
                            {r.num}:
                          </span>
                          {r.title}
                        </div>
                        <p className="text-stone-700 leading-relaxed">
                          {r.desc}
                        </p>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        openLeadModal(
                          "producer",
                          "Οδηγός Κοιν.Σ.Επ. Βροσίνας (Ν. 4430/2016) — Δήλωση Ενδιαφέροντος Μέλους (100€) ή Ομάδας Εργασίας",
                          "Δωρεάν & μη δεσμευτική Δήλωση Ενδιαφέροντος για συμμετοχή στην Κοιν.Σ.Επ. Βροσίνας (μερίδα 100€ κατά την ίδρυση) ή προσφορά ειδικότητας στις 5 Ομάδες Εργασίας"
                        )
                      }
                      className="w-full py-3 rounded bg-[#1f5c43] hover:bg-[#174632] text-white font-bold text-xs sm:text-sm transition cursor-pointer"
                    >
                      Δωρεάν Δήλωση Ενδιαφέροντος στην Κοιν.Σ.Επ. Βροσίνας (Μέλος ή Ειδικότητα) →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODE 1: 7 PRACTICAL PLAYBOOKS BY ROLE */}
          {activePracticalTab === "playbooks" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Selector: 7 Interested Profiles */}
              <div className="lg:col-span-4 space-y-2">
                <div className="text-[11px] font-mono font-bold uppercase text-stone-500 px-1">
                  ΕΠΙΛΕΞΤΕ ΤΟ ΠΡΟΦΙΛ ΣΑΣ (7 ΚΑΤΗΓΟΡΙΕΣ):
                </div>
                {PRACTICAL_SOLUTIONS_MATRIX.map((pb, idx) => {
                  const isActive = selectedPlaybookIdx === idx;
                  return (
                    <button
                      key={pb.id}
                      type="button"
                      onClick={() => {
                        setSelectedPlaybookIdx(idx);
                        registerEngagement(
                          "select_practical_playbook",
                          pb.id,
                          pb.roleBadge
                        );
                      }}
                      className={`w-full text-left p-3.5 rounded border transition cursor-pointer ${
                        isActive
                          ? "bg-[#14191f] text-white border-[#14191f] ring-2 ring-[#c89d54]"
                          : "bg-white hover:bg-stone-100 text-stone-800 border-stone-300"
                      }`}
                    >
                      <div
                        className={`text-[10px] font-mono font-bold ${
                          isActive ? "text-[#c89d54]" : "text-[#1f5c43]"
                        }`}
                      >
                        {pb.roleBadge}
                      </div>
                      <div className="font-serif font-bold text-xs sm:text-sm mt-1 leading-snug">
                        {pb.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Card: Full Practical Breakdown (How, Where From, Cost, Disbursement, Obligations, Municipality/Community/KOINSEP, Legal Ref) */}
              {(() => {
                const pb = PRACTICAL_SOLUTIONS_MATRIX[selectedPlaybookIdx];
                return (
                  <div className="lg:col-span-8 bg-white rounded-lg p-5 sm:p-8 border-2 border-[#14191f] shadow-md space-y-5">
                    <div className="border-b border-stone-200 pb-4 space-y-1.5">
                      <div className="text-xs font-mono font-bold text-[#b85d3b]">
                        {pb.roleBadge}
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f]">
                        {pb.title}
                      </h3>
                      <p className="text-xs text-stone-600">
                        <strong>Σε ποιους απευθύνεται:</strong> {pb.targetAudience}
                      </p>
                    </div>

                    {/* Top Highlight Box: What You Get */}
                    <div className="p-4 rounded bg-emerald-50 border-l-4 border-[#1f5c43] space-y-1">
                      <div className="text-[11px] font-mono font-bold uppercase text-[#1f5c43]">
                        ✓ ΣΥΝΟΠΤΙΚΑ — ΤΙ ΚΕΡΔΙΖΕΤΕ ΣΤΗΝ ΠΡΑΞΗ:
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-stone-900 leading-relaxed">
                        {pb.whatYouGetSummary}
                      </p>
                    </div>

                    {/* 1. Πώς γίνεται (Βήμα-Προς-Βήμα) */}
                    <div className="space-y-2">
                      <div className="text-xs font-mono font-bold uppercase text-[#14191f]">
                        1. ΠΩΣ ΓΙΝΕΤΑΙ ΒΗΜΑ-ΠΡΟΣ-ΒΗΜΑ:
                      </div>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-stone-800 bg-[#f7f5f0] p-4 rounded border border-stone-300">
                        {pb.howItWorksSteps.map((step, sIdx) => (
                          <li key={sIdx} className="leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Grid of 4 Core Financial/Practical Questions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded bg-stone-50 border border-stone-200 space-y-1.5">
                        <div className="text-[11px] font-mono font-bold uppercase text-[#1f5c43]">
                          2. ΑΠΟ ΠΟΥ & ΠΟΙΟ ΠΡΟΓΡΑΜΜΑ ΥΠΑΡΧΕΙ:
                        </div>
                        <p className="text-xs text-stone-800 leading-relaxed">
                          {pb.whereFromAndProgram}
                        </p>
                      </div>

                      <div className="p-4 rounded bg-stone-50 border border-stone-200 space-y-1.5">
                        <div className="text-[11px] font-mono font-bold uppercase text-[#b85d3b]">
                          3. ΜΕ ΤΙ ΚΟΣΤΟΣ & ΜΕ ΤΙ ΧΡΗΜΑΤΑ:
                        </div>
                        <p className="text-xs text-stone-800 leading-relaxed">
                          {pb.costAndFundingSource}
                        </p>
                      </div>

                      <div className="p-4 rounded bg-stone-50 border border-stone-200 space-y-1.5">
                        <div className="text-[11px] font-mono font-bold uppercase text-[#1f5c43]">
                          4. ΠΩΣ ΘΑ ΤΑ ΠΑΡΩ (ΕΚΤΑΜΙΕΥΣΗ):
                        </div>
                        <p className="text-xs text-stone-800 leading-relaxed">
                          {pb.howYouReceiveIt}
                        </p>
                      </div>

                      <div className="p-4 rounded bg-stone-50 border border-stone-200 space-y-1.5">
                        <div className="text-[11px] font-mono font-bold uppercase text-[#b85d3b]">
                          5. ΤΙ ΘΑ ΔΩΣΩ (ΥΠΟΧΡΕΩΣΕΙΣ / ΣΥΜΜΕΤΟΧΗ):
                        </div>
                        <p className="text-xs text-stone-800 leading-relaxed">
                          {pb.whatYouGive}
                        </p>
                      </div>
                    </div>

                    {/* 3-Column Institutional Support: What Municipality, Community & KOINSEP do for YOU */}
                    <div className="bg-[#14191f] text-white rounded p-4 sm:p-5 space-y-3">
                      <div className="text-xs font-mono font-bold uppercase text-[#c89d54]">
                        6. ΠΟΙΟΣ ΚΑΝΕΙ ΤΙ ΓΙΑ ΕΣΑΣ (ΔΗΜΟΣ ΖΙΤΣΑΣ · ΚΟΙΝΟΤΗΤΑ ΒΡΟΣΙΝΑΣ · ΚΟΙΝΣΕΠ):
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 rounded bg-stone-900 border border-stone-800 space-y-1">
                          <strong className="text-[#c89d54] block font-mono">
                            🏛️ ΤΙ ΕΚΠΟΝΕΙ Ο ΔΗΜΟΣ ΖΙΤΣΑΣ:
                          </strong>
                          <p className="text-stone-300 leading-relaxed">
                            {pb.whatMunicipalityDoes}
                          </p>
                        </div>
                        <div className="p-3 rounded bg-stone-900 border border-stone-800 space-y-1">
                          <strong className="text-emerald-400 block font-mono">
                            🏡 ΤΙ ΚΑΝΕΙ Η ΚΟΙΝΟΤΗΤΑ:
                          </strong>
                          <p className="text-stone-300 leading-relaxed">
                            {pb.whatCommunityDoes}
                          </p>
                        </div>
                        <div className="p-3 rounded bg-stone-900 border border-stone-800 space-y-1">
                          <strong className="text-amber-300 block font-mono">
                            ⚙️ ΤΙ ΑΝΑΛΑΜΒΑΝΕΙ Η ΚΟΙΝΣΕΠ:
                          </strong>
                          <p className="text-stone-300 leading-relaxed">
                            {pb.whatKoinsepDoes}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Legal & Institutional Documentation Footer + Action Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-stone-200">
                      <div className="text-[11px] font-mono text-stone-600">
                        <strong className="text-[#14191f]">
                          7. Νομική & Θεσμική Τεκμηρίωση:
                        </strong>{" "}
                        {pb.legalDocumentation}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          openLeadModal(
                            pb.leadRoleKey,
                            `Κέντρο Πρακτικών Λύσεων (#praktikes-lyseis) — ${pb.roleBadge}`,
                            `Αίτημα Εφαρμογής Playbook: ${pb.title} | Πρόγραμμα: ${pb.whereFromAndProgram}`
                          )
                        }
                        className="px-5 py-2.5 rounded bg-[#b85d3b] hover:bg-[#a04e2f] text-white font-semibold text-xs sm:text-sm shrink-0 cursor-pointer"
                      >
                        Εκδήλωση Ενδιαφέροντος για αυτό το Σχέδιο →
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* MODE 2: INSTITUTIONAL ROLES MATRIX (ΔΗΜΟΣ ΖΙΤΣΑΣ vs ΚΟΙΝΟΤΗΤΑ ΒΡΟΣΙΝΑΣ vs ΚΟΙΝΣΕΠ vs ΠΕΡΙΦΕΡΕΙΑ/ΗΠΕΙΡΟΣ Α.Ε.) */}
          {activePracticalTab === "institutions" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {INSTITUTIONAL_ROLES_MATRIX.map((inst, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-5 sm:p-6 border-2 border-stone-300 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
                        <span className="px-2.5 py-1 rounded bg-[#14191f] text-[#c89d54] font-mono text-xs font-bold">
                          {inst.entityCode}
                        </span>
                        <span className="text-xs font-mono font-semibold text-[#1f5c43]">
                          {inst.shareInSubsidiary}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#14191f]">
                        {inst.entityName}
                      </h3>
                      <p className="text-xs font-medium text-[#b85d3b]">
                        {inst.roleSubtitle}
                      </p>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 pt-1">
                        {inst.whatItExecutes.map((item, i) => (
                          <li
                            key={i}
                            className="p-3 rounded bg-[#f7f5f0] border border-stone-200 leading-relaxed"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODE 3: THE 14 DOCUMENTED FUNDING TOOLS & LAWS (ΦΕΚ / ΠΡΟΣΚΛΗΣΕΙΣ) */}
          {activePracticalTab === "funding14" && (
            <div className="bg-white rounded-lg border-2 border-[#14191f] overflow-hidden shadow-md">
              <div className="bg-[#14191f] text-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-bold text-[#c89d54]">
                    ΜΗΤΡΩΟ ΤΕΚΜΗΡΙΩΣΗΣ 14 ΧΡΗΜΑΤΟΔΟΤΙΚΩΝ & ΘΕΣΜΙΚΩΝ ΕΡΓΑΛΕΙΩΝ
                  </div>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold mt-1">
                    Κάθε Ευρώ από τα 10,45 εκ. € Συνδεδεμένο με Νόμο, Πρόσκληση & Δικαιούχο
                  </h3>
                </div>
                <a
                  href="/documents/Vrosina_2031_Business_Plan_v2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded bg-[#c89d54] text-stone-950 font-mono text-xs font-bold hover:bg-amber-400"
                >
                  Λήψη Πλήρους Business Plan v2.0 (PDF) ↗
                </a>
              </div>

              <div className="divide-y divide-stone-200">
                {FOURTEEN_FUNDING_TOOLS_DOC.map((f) => (
                  <div
                    key={f.num}
                    className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center hover:bg-stone-50 text-xs"
                  >
                    <div className="lg:col-span-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#14191f] text-[#c89d54] font-mono font-bold">
                          #{f.num}
                        </span>
                        <span className="font-serif font-bold text-sm text-[#14191f]">
                          {f.toolName}
                        </span>
                      </div>
                      <div className="font-mono text-[11px] text-stone-500">
                        Νομική Βάση: {f.legalRef}
                      </div>
                    </div>

                    <div className="lg:col-span-3 text-stone-800">
                      <strong className="block text-[10px] font-mono uppercase text-stone-500">
                        Τι Χρηματοδοτεί στη Βροσίνα:
                      </strong>
                      {f.targetProject}
                    </div>

                    <div className="lg:col-span-2">
                      <strong className="block text-[10px] font-mono uppercase text-stone-500">
                        Ποσοστό / Ύψος Ενίσχυσης:
                      </strong>
                      <span className="font-mono font-bold text-[#1f5c43]">
                        {f.grantRate}
                      </span>
                    </div>

                    <div className="lg:col-span-3 text-stone-700">
                      <strong className="block text-[10px] font-mono uppercase text-stone-500">
                        Ποιος Υποβάλλει / Εκπονεί:
                      </strong>
                      {f.whoApplies}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
                        registerEngagement(
                          "select_camp_building",
                          `camp-building-${st.stepNumber}`,
                          st.buildingTitle
                        );
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

          {/* TV MEDIA APPEARANCES SHOWCASE (2 TELEVISION BROADCASTS) */}
          <div
            id="tv-media"
            className="bg-[#14191f] text-white rounded-lg p-5 sm:p-8 border border-stone-800 shadow-lg space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-stone-800 pb-5">
              <div className="space-y-1.5 max-w-3xl">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#c89d54]">
                  ΤΗΛΕΟΠΤΙΚΕΣ ΠΑΡΟΥΣΙΕΣ · ΤΟ «ΒΡΟΣΙΝΑ 2031» ΣΤΑ ΜΜΕ ΤΗΣ ΗΠΕΙΡΟΥ
                </div>
                <h3 className="font-serif text-xl sm:text-3xl font-bold text-white">
                  Δημόσιος Διάλογος & Τηλεοπτικές Συνεντεύξεις για την Αναγέννηση της Βροσίνας
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Παρακολουθήστε τις δύο τηλεοπτικές παρουσιάσεις της πρωτοβουλίας{" "}
                  <strong>«Βροσίνα 2031»</strong> με τον εμπνευστή και συντονιστή επικοινωνίας{" "}
                  <strong>Αθανάσιο Βούρδα</strong>, όπως προβλήθηκαν στα τηλεοπτικά δίκτυα της Ηπείρου (
                  <em>EPIRUS TV1 / Epirus TV News</em>).
                </p>
              </div>
              <div className="text-xs font-mono text-stone-400">
                2 Τηλεοπτικά Αφιερώματα · Άμεση Αναπαραγωγή
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {TV_MEDIA_APPEARANCES.map((tv) => (
                <div
                  key={tv.id}
                  className="bg-stone-900 border border-stone-800 rounded overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video w-full bg-black relative">
                      <iframe
                        src={`https://www.youtube.com/embed/${tv.id}?rel=0`}
                        title={tv.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </div>
                    <div className="p-4 sm:p-5 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                        <span className="text-[#c89d54] font-bold">
                          {tv.badge} · {tv.channel}
                        </span>
                        <a
                          href={tv.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-300 hover:text-white underline"
                        >
                          Προβολή στο YouTube ↗
                        </a>
                      </div>
                      <h4 className="font-serif text-base sm:text-xl font-bold text-white leading-snug">
                        {tv.title}
                      </h4>
                      <div className="text-xs font-mono text-emerald-400">
                        {tv.speaker}
                      </div>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                        {tv.summary}
                      </p>
                      <ul className="space-y-1 pt-1 text-xs text-stone-400">
                        {tv.keyTopics.map((topic, idx) => (
                          <li key={idx}>• {topic}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="px-4 sm:px-5 py-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setActiveVideoId(tv.id)}
                      className="text-[#c89d54] hover:underline font-semibold cursor-pointer"
                    >
                      Μεγέθυνση Player στη σελίδα
                    </button>
                    <a
                      href={tv.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-stone-400 hover:text-white"
                    >
                      {tv.shortUrl} ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8 REAL YOUTUBE VIDEOS GRID (2 TV APPEARANCES + 6 DRONE & FIELD VIDEOS) */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
                  ΟΠΤΙΚΟΑΚΟΥΣΤΙΚΟ ΑΡΧΕΙΟ · 8 ΒΙΝΤΕΟ (ΤΗΛΕΟΠΤΙΚΕΣ ΠΑΡΟΥΣΙΕΣ, DRONE & ΑΥΤΟΨΙΕΣ)
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14191f] mt-1">
                  Τηλεοπτικά Αφιερώματα, Πτήσεις Drone, Μονή Ραϊδιώτισσας & Ιστορικά Γεφύρια
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
              {(showAllVideos
                ? REAL_VROSINA_VIDEOS
                : REAL_VROSINA_VIDEOS.slice(0, 3)
              ).map((video) => {
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
                        onClick={() => {
                          setActiveVideoId(video.id);
                          registerEngagement(
                            "play_video_gallery",
                            `video-${video.id}`,
                            video.title
                          );
                        }}
                        className="relative aspect-video bg-stone-900 cursor-pointer group overflow-hidden"
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition flex items-center justify-center">
                          <div className="px-3 py-1.5 rounded bg-[#14191f]/90 text-white font-mono text-xs font-semibold border border-white/30">
                            ▶ ΑΝΑΠΑΡΑΓΩΓΗ
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
                        onClick={() => {
                          setActiveVideoId(video.id);
                          registerEngagement(
                            "play_video_gallery",
                            `video-${video.id}`,
                            video.title
                          );
                        }}
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

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowAllVideos(!showAllVideos);
                  registerEngagement(
                    "toggle_all_videos",
                    "video-gallery-all",
                    showAllVideos ? "collapse" : "expand"
                  );
                }}
                className="px-5 py-2.5 rounded bg-[#14191f] hover:bg-[#1f5c43] text-white text-xs sm:text-sm font-semibold transition cursor-pointer"
              >
                {showAllVideos
                  ? "Σύμπτυξη Λίστας Βίντεο (Εμφάνιση 3 Κύριων)"
                  : `Προβολή Όλων των ${REAL_VROSINA_VIDEOS.length} Βίντεο Πεδίου & Drone (+${REAL_VROSINA_VIDEOS.length - 3} βίντεο) ↓`}
              </button>
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

          {/* Explicit 10,45M € Arithmetic Reconciliation Card (Pillars + Shared Infrastructure = 10,45M €) */}
          <div className="bg-white rounded-lg p-5 sm:p-6 border-2 border-[#14191f] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#1f5c43]">
                  ΑΡΙΘΜΗΤΙΚΗ ΣΥΜΦΩΝΙΑ ΠΡΟΫΠΟΛΟΓΙΣΜΟΥ · ΠΩΣ ΣΥΜΠΛΗΡΩΝΟΝΤΑΙ ΤΑ 10,45 ΕΚΑΤ. €
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#14191f]">
                  4 Κύριοι Πυλώνες (8,63 εκ. €) + Κοινές Υποδομές, Ενέργεια & Ωρίμανση (1,82 εκ. €) = 10,45 εκ. €
                </h3>
              </div>
              <span className="px-3 py-1 rounded bg-[#14191f] text-[#c89d54] font-mono text-xs font-bold">
                100% Επαληθεύσιμο Άθροισμα: 10.450.000 €
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b-2 border-stone-300 bg-stone-100 font-mono text-[11px] uppercase text-stone-700">
                    <th className="p-2.5">Πυλώνας / Οριζόντια Κατηγορία</th>
                    <th className="p-2.5 text-right">Άμεσος Πυλώνας</th>
                    <th className="p-2.5">Κοινές Υποδομές / Οριζόντια Έργα</th>
                    <th className="p-2.5 text-right">Σύνολο με Υποδομές</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {PUBLIC_FISCAL_BENEFIT_STUDY.capexArithmeticReconciliation.map(
                    (row, idx) => (
                      <tr key={idx} className="hover:bg-stone-50">
                        <td className="p-2.5 font-serif font-bold text-[#14191f]">
                          {row.item}
                        </td>
                        <td className="p-2.5 text-right font-mono text-stone-700 whitespace-nowrap">
                          {row.pillarDirect}
                        </td>
                        <td className="p-2.5 font-mono text-stone-600">
                          {row.sharedInfraAdded}
                        </td>
                        <td className="p-2.5 text-right font-mono font-bold text-[#1f5c43] whitespace-nowrap">
                          {row.totalWithInfra}
                        </td>
                      </tr>
                    )
                  )}
                  <tr className="bg-[#14191f] text-white font-mono font-bold">
                    <td className="p-2.5 font-serif">
                      ΓΕΝΙΚΟ ΣΥΝΟΛΟ ΕΠΕΝΔΥΤΙΚΟΥ ΠΡΟΓΡΑΜΜΑΤΟΣ (2026–2031)
                    </td>
                    <td className="p-2.5 text-right text-stone-300 whitespace-nowrap">
                      8,63 εκ. €
                    </td>
                    <td className="p-2.5 text-[#c89d54]">
                      + 1,82 εκ. € (Υποδομές, Δίκτυα, Φ/Β 150 kWp & Μελέτες)
                    </td>
                    <td className="p-2.5 text-right text-[#c89d54] text-sm whitespace-nowrap">
                      10,45 εκ. €
                    </td>
                  </tr>
                </tbody>
              </table>
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
              Μόχλευση 63% Δημόσιο / 37% Ιδιωτικά (1 € → 2,70 €), Επιδοτήσεις έως 75% & Θεσμικό Κύρος
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

                <div className="pt-2">
                  <button
                    onClick={() =>
                      openLeadModal(
                        investorTrack === "benefactor" ? "benefactor" : "investor",
                        `Υπολογιστής Επενδύσεων & Επιδοτήσεων (#investors) — ${investorSimulation.title}`,
                        `Κανάλι: ${investorSimulation.title} | Ίδια Συμμετοχή: ${investmentAmount.toLocaleString("el-GR")} € | Συνολικό Έργο CAPEX: ${investorSimulation.mobilizedCapex.toLocaleString("el-GR")} € | Δημόσια Επιδότηση: +${investorSimulation.publicGrant.toLocaleString("el-GR")} € | Σενάριο: ${activeScenario.name}`
                      )
                    }
                    className="w-full py-3 rounded bg-[#c89d54] hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition cursor-pointer"
                  >
                    Αποστολή Επενδυτικού / Χορηγικού Αιτήματος με Αυτές τις Παραμέτρους →
                  </button>
                </div>
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
                καταστατικά τη διακυβέρνησή του: βασικός φορέας-θεματοφύλακας
                είναι η{" "}
                <strong>
                  Κοιν.Σ.Επ. Συλλογικής και Παραγωγικής Σκοπιμότητας Βροσίνας
                  (Ν. 4430/2016, άρθρα 14–21)
                </strong>{" "}
                με την αρχή <strong>«Ένα Μέλος – Μία Ψήφος»</strong>, ελάχιστη
                υποχρεωτική μερίδα <strong>100 €</strong> (άρθρο 16) και
                υποχρεωτική διάθεση των κερδών της Κοιν.Σ.Επ. σε{" "}
                <strong>
                  5% τακτικό αποθεματικό, έως 35% στους εργαζόμενους και 60%+ σε
                  νέες θέσεις εργασίας και ανάπτυξη της παραγωγής στο χωριό
                </strong>{" "}
                (άρθρο 21), σε συνδυασμό με το επιχειρηματικό σχήμα συνεργασίας
                με τον Δήμο Ζίτσας και τους στρατηγικούς εταίρους.
              </p>
              <div className="pt-1 flex flex-wrap gap-2.5 text-xs">
                <a
                  href="#praktikes-lyseis"
                  onClick={() => {
                    setActivePracticalTab("koinsep");
                    registerEngagement(
                      "governance_jump_koinsep",
                      "practical-koinsep",
                      "Πλήρης Οδηγός Κοιν.Σ.Επ. & 11 Ερωτήσεις"
                    );
                  }}
                  className="px-4 py-2 rounded bg-[#14191f] hover:bg-[#1f5c43] text-[#c89d54] font-bold transition"
                >
                  🤝 Δείτε τον Πλήρη Οδηγό της Κοιν.Σ.Επ. & τις 11 Ερωτήσεις («Τι είναι & τι ρισκάρω;») ↑
                </a>
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal(
                      "producer",
                      "Ενότητα Διακυβέρνησης (#governance) — Δήλωση Ενδιαφέροντος Κοιν.Σ.Επ. Βροσίνας",
                      "Δωρεάν Δήλωση Ενδιαφέροντος για συμμετοχή στην Κοιν.Σ.Επ. Βροσίνας (μερίδα 100€) ή στις 5 Ομάδες Εργασίας"
                    )
                  }
                  className="px-4 py-2 rounded bg-[#1f5c43] hover:bg-[#174632] text-white font-semibold transition cursor-pointer"
                >
                  Δωρεάν Δήλωση Ενδιαφέροντος στην Κοιν.Σ.Επ. →
                </button>
              </div>
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

                <div className="pt-2">
                  <button
                    onClick={() =>
                      openLeadModal(
                        activeStakeholder.group === "investors"
                          ? "investor"
                          : activeStakeholder.group === "community"
                            ? "owner"
                            : "institutional",
                        `Θεσμικός Φάκελος One-Pager (#governance) — ${activeStakeholder.name}`,
                        `Επιλεγμένος Φορέας: ${activeStakeholder.name} (${activeStakeholder.phase}) | Παραδοτέο: ${activeStakeholder.deliverable}`
                      )
                    }
                    className="w-full py-2.5 rounded bg-[#14191f] hover:bg-[#1f5c43] text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
                  >
                    Εκδήλωση Ενδιαφέροντος / Αίτημα Συνάντησης για: {activeStakeholder.name} →
                  </button>
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
                onClick={() =>
                  openLeadModal(
                    "owner",
                    `Μητρώο Κλειστών Κατοικιών (#community) — ${HOUSING_CATEGORIES[selectedHousingIdx].code}`,
                    `Επιλεγμένη Κατηγορία Αποκατάστασης: ${HOUSING_CATEGORIES[selectedHousingIdx].title} | Κόστος: ${HOUSING_CATEGORIES[selectedHousingIdx].cost} | Επιδότηση: ${HOUSING_CATEGORIES[selectedHousingIdx].subsidy} | Ίδια Χρήματα Ιδιοκτήτη: ${HOUSING_CATEGORIES[selectedHousingIdx].ownerOutOfPocket}`
                  )
                }
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
                onClick={() =>
                  openLeadModal(
                    "producer",
                    "Πρόγραμμα Νέων Παραγωγών (#community) — «Έλα να βοσκήσεις, έλα να μείνεις»",
                    "Αίτηση για Πακέτο Πρώτου Κοπαδιού (50–80 ζώα, έως 80% επιδότηση) / Αμπελώνα Ντεμπίνας / Σχολή Πετράδων ΔΥΠΑ"
                  )
                }
                className="w-full py-3 rounded bg-[#b85d3b] hover:bg-[#a04e2f] text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
              >
                Αίτηση Νέου Κτηνοτρόφου / Αμπελουργού / Τεχνίτη Πέτρας →
              </button>
            </div>
          </div>

          {/* INTERACTIVE DUAL MEGA-GUIDE SWITCHER:
              1. "Από Άνεργος, Κτηνοτρόφος στο Βουνό με 0€ Αρχικό Κεφάλαιο (43.100€ σε 5 Βήματα)"
              2. "Τι είναι ο Δεσμευτικός Μορφολογικός Κανονισμός & Τι Ισχύει Πολεοδομικά στη Βροσίνα (Σ.Α. Ιωαννίνων)" */}
          <div
            id="mega-guides"
            className="bg-white rounded-lg border-2 border-[#14191f] shadow-lg overflow-hidden"
          >
            {/* Header & Tab Switcher */}
            <div className="bg-[#14191f] text-white p-5 sm:p-8 space-y-5">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div className="space-y-1.5 max-w-3xl">
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#c89d54]">
                    ΠΡΑΚΤΙΚΟΙ ΟΔΗΓΟΙ ΕΦΑΡΜΟΓΗΣ · ΑΠΑΝΤΗΣΕΙΣ ΣΕ ΚΡΙΣΙΜΑ ΕΡΩΤΗΜΑΤΑ ΠΕΡΙΗΓΗΣΗΣ
                  </div>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold text-white">
                    Πώς Ξεκινάς Χωρίς Κεφάλαιο στο Βουνό & Τι Ισχύει Πολεοδομικά στη Βροσίνα
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                    Επιλέξτε έναν από τους δύο αναλυτικούς οδηγούς βήμα-προς-βήμα για να δείτε πώς συνδυάζονται τα 4 κρατικά/ευρωπαϊκά προγράμματα (<strong>43.100 € άμεση ενίσχυση</strong>) και πώς λειτουργεί ο <strong>Δεσμευτικός Μορφολογικός Κανονισμός & το Συμβούλιο Αρχιτεκτονικής (Σ.Α.) Ιωαννίνων</strong> στη Βροσίνα.
                  </p>
                </div>
                <a
                  href="/katoikia-neoi-paragogoi"
                  className="text-xs font-mono text-[#c89d54] hover:underline shrink-0"
                >
                  Άνοιγμα σε Ανεξάρτητη Σελίδα Οδηγού ↗
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveMegaGuideTab("herder");
                    registerEngagement(
                      "select_mega_guide",
                      "guide-zero-capital-herder",
                      "Από Άνεργος Κτηνοτρόφος 43.100€"
                    );
                  }}
                  className={`p-4 rounded border text-left transition cursor-pointer flex items-start justify-between gap-3 ${
                    activeMegaGuideTab === "herder"
                      ? "bg-[#1f5c43] border-[#c89d54] text-white shadow-md"
                      : "bg-stone-900 border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono font-bold uppercase text-[#c89d54]">
                      ΟΔΗΓΟΣ 01 · ΝΕΟΙ ΠΑΡΑΓΩΓΟΙ (5 ΒΗΜΑΤΑ)
                    </div>
                    <div className="font-serif font-bold text-sm sm:text-base">
                      🗺️ Από Άνεργος, Κτηνοτρόφος στο Βουνό (Χωρίς Αρχικό Κεφάλαιο — 43.100 €)
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-[11px] text-[#c89d54] shrink-0">
                    5 Βήματα
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveMegaGuideTab("morphology");
                    registerEngagement(
                      "select_mega_guide",
                      "guide-morphological-regulation",
                      "Μορφολογικός Κανονισμός & Σ.Α. Ιωαννίνων"
                    );
                  }}
                  className={`p-4 rounded border text-left transition cursor-pointer flex items-start justify-between gap-3 ${
                    activeMegaGuideTab === "morphology"
                      ? "bg-[#1f5c43] border-[#c89d54] text-white shadow-md"
                      : "bg-stone-900 border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono font-bold uppercase text-[#c89d54]">
                      ΟΔΗΓΟΣ 02 · ΙΔΙΟΚΤΗΤΕΣ & ΜΗΧΑΝΙΚΟΙ
                    </div>
                    <div className="font-serif font-bold text-sm sm:text-base">
                      🏛️ Δεσμευτικός Μορφολογικός Κανονισμός & Όροι Δόμησης Βροσίνας (Σ.Α. Ιωαννίνων)
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-[11px] text-[#c89d54] shrink-0">
                    Πολεοδομία
                  </span>
                </button>
              </div>
            </div>

            {/* TAB 1 CONTENT: ZERO-CAPITAL HERDER 5-STEP MEGA-GUIDE */}
            {activeMegaGuideTab === "herder" ? (
              <div className="p-5 sm:p-8 space-y-8 bg-[#f7f5f0]">
                <div className="bg-white rounded p-5 sm:p-6 border border-stone-300 space-y-2">
                  <div className="text-xs font-mono font-bold text-[#1f5c43]">
                    {ZERO_CAPITAL_HERDER_GUIDE.badge}
                  </div>
                  <h4 className="font-serif text-lg sm:text-2xl font-bold text-[#14191f]">
                    {ZERO_CAPITAL_HERDER_GUIDE.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {ZERO_CAPITAL_HERDER_GUIDE.subtitle}
                  </p>
                </div>

                {/* Interactive 5-Step Selector */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h5 className="font-serif text-base sm:text-xl font-bold text-[#14191f]">
                      {ZERO_CAPITAL_HERDER_GUIDE.roadmapTitle}
                    </h5>
                    <span className="text-xs font-mono text-stone-600">
                      Πατήστε σε κάθε βήμα (1 έως 5) ή δείτε όλη τη ροή παρακάτω
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {ZERO_CAPITAL_HERDER_GUIDE.steps.map((st, idx) => {
                      const isStepActive = activeHerderStepIdx === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setActiveHerderStepIdx(idx);
                            registerEngagement(
                              "select_herder_step",
                              `herder-step-${idx + 1}`,
                              st.title
                            );
                          }}
                          className={`p-3 rounded border text-left transition cursor-pointer ${
                            isStepActive
                              ? "bg-[#14191f] text-white border-[#14191f] ring-2 ring-[#c89d54]"
                              : "bg-white hover:bg-stone-100 text-stone-800 border-stone-300"
                          }`}
                        >
                          <div className="text-[11px] font-mono font-bold text-[#c89d54]">
                            {st.stepNumber}
                          </div>
                          <div className="font-serif font-bold text-xs sm:text-sm mt-1 line-clamp-2">
                            {st.title}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Highlighted Active Step Detail Card */}
                  {(() => {
                    const currentStep =
                      ZERO_CAPITAL_HERDER_GUIDE.steps[activeHerderStepIdx];
                    return (
                      <div className="bg-white rounded-lg p-5 sm:p-6 border-2 border-[#1f5c43] space-y-4 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded bg-[#14191f] text-[#c89d54] font-mono text-xs font-bold">
                              {currentStep.stepNumber}
                            </span>
                            <span className="text-xs font-mono text-stone-600 font-semibold">
                              {currentStep.programBadge}
                            </span>
                          </div>
                          <span className="px-3 py-1 rounded bg-emerald-50 border border-emerald-300 text-[#1f5c43] font-mono text-xs font-bold">
                            {currentStep.amountBadge}
                          </span>
                        </div>

                        <h5 className="font-serif text-lg sm:text-2xl font-bold text-[#14191f]">
                          {currentStep.title}
                        </h5>
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                          {currentStep.summary}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                          <div className="p-3.5 rounded bg-stone-50 border border-stone-200 space-y-1">
                            <div className="text-[11px] font-mono font-bold uppercase text-[#b85d3b]">
                              • ΤΙ ΚΑΝΕΙΣ:
                            </div>
                            <p className="text-xs text-stone-800 leading-relaxed">
                              {currentStep.whatYouDo}
                            </p>
                          </div>

                          <div className="p-3.5 rounded bg-emerald-50/70 border border-emerald-200 space-y-1">
                            <div className="text-[11px] font-mono font-bold uppercase text-[#1f5c43]">
                              • ΤΟ ΚΕΡΔΟΣ ΣΟΥ:
                            </div>
                            <p className="text-xs text-stone-800 leading-relaxed">
                              {currentStep.yourGain}
                            </p>
                          </div>

                          <div className="p-3.5 rounded bg-[#14191f] text-white space-y-1">
                            <div className="text-[11px] font-mono font-bold uppercase text-[#c89d54]">
                              • ΠΩΣ ΣΕ ΚΑΛΥΠΤΕΙ ΤΟ «ΒΡΟΣΙΝΑ 2031»:
                            </div>
                            <p className="text-xs text-stone-200 leading-relaxed">
                              {currentStep.vrosinaAdvantage}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Financial Summary Table (43.100 €) + 3 Golden Rules */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left: Financial Breakdown Table */}
                  <div className="lg:col-span-6 bg-[#14191f] text-white rounded p-5 sm:p-6 border border-stone-800 space-y-4">
                    <h5 className="font-serif text-base sm:text-xl font-bold text-[#c89d54]">
                      {ZERO_CAPITAL_HERDER_GUIDE.financialSummaryTitle}
                    </h5>
                    <div className="divide-y divide-stone-800 border border-stone-800 rounded overflow-hidden text-xs">
                      <div className="grid grid-cols-12 bg-stone-950 px-3.5 py-2.5 font-mono text-stone-400 font-bold">
                        <div className="col-span-6">Πρόγραμμα</div>
                        <div className="col-span-3">Είδος</div>
                        <div className="col-span-3 text-right">Ποσό</div>
                      </div>
                      {ZERO_CAPITAL_HERDER_GUIDE.financialTable.map((row, i) => (
                        <div
                          key={i}
                          className={`grid grid-cols-12 px-3.5 py-3 items-center ${
                            row.isTotal
                              ? "bg-[#1f5c43] text-white font-bold"
                              : "bg-stone-900 text-stone-200"
                          }`}
                        >
                          <div className="col-span-6 pr-2">{row.program}</div>
                          <div className="col-span-3 font-mono text-[11px] text-stone-300">
                            {row.type}
                          </div>
                          <div className="col-span-3 text-right font-mono font-bold text-sm text-[#c89d54]">
                            {row.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed bg-stone-900 p-3.5 rounded border border-stone-800">
                      {ZERO_CAPITAL_HERDER_GUIDE.secondYearBonus}
                    </p>
                  </div>

                  {/* Right: The 3 Golden Rules */}
                  <div className="lg:col-span-6 bg-white rounded p-5 sm:p-6 border border-stone-300 space-y-4">
                    <h5 className="font-serif text-base sm:text-xl font-bold text-[#14191f]">
                      {ZERO_CAPITAL_HERDER_GUIDE.goldenRulesTitle}
                    </h5>
                    <div className="space-y-3">
                      {ZERO_CAPITAL_HERDER_GUIDE.goldenRules.map((rule, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded bg-[#f7f5f0] border border-stone-300 space-y-1"
                        >
                          <div className="font-serif font-bold text-xs sm:text-sm text-[#14191f]">
                            <span className="font-mono text-[#b85d3b] mr-1.5">
                              {rule.number}.
                            </span>
                            {rule.title}
                          </div>
                          <p className="text-xs text-stone-700 leading-relaxed">
                            {rule.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openLeadModal(
                          "producer",
                          "Οδηγός 0€ Αρχικό Κεφάλαιο (#mega-guides) — Αίτηση Καθοδήγησης Νέου Κτηνοτρόφου (43.100€)",
                          "Ενδιαφέρον για τον Οδικό Χάρτη 5 Βημάτων (Μετεγκατάσταση 10.000€ + Μικροπίστωση HDB 25.000€ + Νέοι Γεωργοί Π3-75.1 32.500€ + Πακέτο Πρώτου Κοπαδιού Βροσίνας)"
                        )
                      }
                      className="w-full py-3 rounded bg-[#1f5c43] hover:bg-[#174632] text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
                    >
                      Αίτηση Καθοδήγησης για τα 5 Βήματα (43.100 €) στη Βροσίνα →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* TAB 2 CONTENT: BINDING MORPHOLOGICAL REGULATION & VROSINA URBAN PLANNING */
              <div className="p-5 sm:p-8 space-y-8 bg-[#f7f5f0]">
                <div className="bg-white rounded p-5 sm:p-6 border border-stone-300 space-y-2">
                  <div className="text-xs font-mono font-bold text-[#b85d3b]">
                    {MORPHOLOGICAL_REGULATION_GUIDE.badge}
                  </div>
                  <h4 className="font-serif text-lg sm:text-2xl font-bold text-[#14191f]">
                    {MORPHOLOGICAL_REGULATION_GUIDE.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {MORPHOLOGICAL_REGULATION_GUIDE.subtitle}
                  </p>
                </div>

                {/* 4 Regulated Elements */}
                <div className="space-y-3">
                  <h5 className="font-serif text-base sm:text-xl font-bold text-[#14191f]">
                    {MORPHOLOGICAL_REGULATION_GUIDE.whatItRegulatesTitle}
                  </h5>
                  <p className="text-xs sm:text-sm text-stone-700">
                    {MORPHOLOGICAL_REGULATION_GUIDE.whatItRegulatesIntro}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {MORPHOLOGICAL_REGULATION_GUIDE.regulatedElements.map(
                      (el, i) => (
                        <div
                          key={i}
                          className="bg-white rounded p-4 border border-stone-300 space-y-1.5"
                        >
                          <div className="font-mono text-xs font-bold text-[#b85d3b]">
                            ΚΑΝΟΝΑΣ {el.code}
                          </div>
                          <div className="font-serif font-bold text-sm text-[#14191f]">
                            {el.title}
                          </div>
                          <p className="text-xs text-stone-700 leading-relaxed">
                            {el.details}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* What specifically applies in Vrosina (Municipality of Zitsa / SA Ioannina) */}
                <div className="bg-[#14191f] text-white rounded p-5 sm:p-6 border border-stone-800 space-y-5">
                  <div className="space-y-1.5">
                    <h5 className="font-serif text-base sm:text-xl font-bold text-[#c89d54]">
                      {MORPHOLOGICAL_REGULATION_GUIDE.vrosinaSpecificsTitle}
                    </h5>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {MORPHOLOGICAL_REGULATION_GUIDE.vrosinaSpecificsIntro}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {MORPHOLOGICAL_REGULATION_GUIDE.vrosinaAxes.map(
                      (ax, idx) => (
                        <div
                          key={idx}
                          className="bg-stone-900 rounded p-4 border border-stone-700 space-y-2"
                        >
                          <div className="text-xs font-mono font-bold text-[#c89d54]">
                            {ax.axisNumber}
                          </div>
                          <div className="font-serif font-bold text-sm sm:text-base text-white">
                            {ax.title}
                          </div>
                          <p className="text-xs text-stone-300 leading-relaxed whitespace-pre-line">
                            {ax.description}
                          </p>
                        </div>
                      )
                    )}
                  </div>

                  <div className="p-4 rounded bg-stone-950 border-l-4 border-emerald-400 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                      {MORPHOLOGICAL_REGULATION_GUIDE.howVrosina2031SolvesIt}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        openLeadModal(
                          "owner",
                          "Πολεοδομικός & Μορφολογικός Οδηγός (#mega-guides) — Έγκριση Σ.Α. Ιωαννίνων & Master Lease",
                          "Αίτημα Ιδιοκτήτη για Δωρεάν Αρχιτεκτονική Μελέτη Όψεων (Σ.Α. Ιωαννίνων / ΥΔΟΜ Ζίτσας) & Ανακαίνιση με 0€ Επιβάρυνση"
                        )
                      }
                      className="px-4 py-2.5 rounded bg-[#c89d54] hover:bg-[#b5893f] text-stone-950 font-semibold text-xs shrink-0 cursor-pointer"
                    >
                      Αίτηση Αποκατάστασης & Άδειας Σ.Α. →
                    </button>
                  </div>
                </div>
              </div>
            )}
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
              {(showAllDataRoom
                ? DATA_ROOM_DOCUMENTS
                : DATA_ROOM_DOCUMENTS.slice(0, 3)
              ).map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.href}
                  download
                  onClick={() =>
                    registerEngagement(
                      "download_dataroom_doc",
                      `doc-${idx + 1}`,
                      doc.title
                    )
                  }
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

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowAllDataRoom(!showAllDataRoom);
                  registerEngagement(
                    "toggle_all_dataroom",
                    "dataroom-all",
                    showAllDataRoom ? "collapse" : "expand"
                  );
                }}
                className="px-5 py-2.5 rounded bg-[#14191f] hover:bg-[#1f5c43] text-white text-xs sm:text-sm font-semibold transition cursor-pointer"
              >
                {showAllDataRoom
                  ? "Σύμπτυξη Data Room (Εμφάνιση 3 Βασικών Εγγράφων)"
                  : `Προβολή Όλων των ${DATA_ROOM_DOCUMENTS.length} Επίσημων Εγγράφων & Υποδειγμάτων (+${DATA_ROOM_DOCUMENTS.length - 3} μελέτες) ↓`}
              </button>
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

          {/* INLINE PARTICIPATION & CONTACT FORM SECTION (#contact-form) */}
          <div
            id="contact-form"
            className="bg-[#f7f5f0] rounded-lg p-6 sm:p-10 border border-stone-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono font-bold uppercase text-[#b85d3b]">
                07 / ΑΜΕΣΗ ΕΠΙΚΟΙΝΩΝΙΑ & ΜΗΤΡΩΟ ΣΥΜΜΕΤΟΧΗΣ
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14191f]">
                Δηλώστε Συμμετοχή ως Επενδυτής, Ευεργέτης, Ιδιοκτήτης Ακινήτου ή Νέος Παραγωγός
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Κάθε αίτημα αποστέλλεται άμεσα στην ομάδα συντονισμού του{" "}
                <strong>«Βροσίνα 2031»</strong> με πλήρη ένδειξη της κατηγορίας
                και της ενότητας ενδιαφέροντος, ώστε να λάβετε τον αντίστοιχο
                εξατομικευμένο φάκελο (LOI LEADER, Καταστατικό ΚΟΙΝΣΕΠ/ΑΜΚΕ ή
                Όρους Master Lease).
              </p>
              <div className="p-4 rounded bg-white border border-stone-300 space-y-1.5 text-xs font-mono">
                <div className="text-stone-500 uppercase">
                  ΕΠΙΣΗΜΟ DESK ΥΠΟΔΟΧΗΣ ΑΙΤΗΜΑΤΩΝ:
                </div>
                <div className="font-bold text-[#14191f]">
                  {SITE_CONFIG.contact.email}
                </div>
                <div className="text-stone-600">
                  Προθεσμία 1ης Πρόσκλησης LEADER:{" "}
                  <strong>{SITE_CONFIG.leaderCall.deadlineDisplay}</strong>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded p-5 sm:p-8 border border-stone-300 shadow-xs">
              {!inlineSubmitted ? (
                <form
                  onSubmit={(e) =>
                    submitLeadToDigiads(
                      e,
                      `Ενσωματωμένη Φόρμα Σελίδας (#contact-form) — Προέλευση: ${leadOrigin}`,
                      true
                    )
                  }
                  className="space-y-4 text-xs sm:text-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-200">
                    <span className="font-mono text-[11px] font-bold text-[#1f5c43] uppercase">
                      ΦΟΡΜΑ ΕΚΔΗΛΩΣΗΣ ΕΝΔΙΑΦΕΡΟΝΤΟΣ «ΒΡΟΣΙΝΑ 2031»
                    </span>
                    <span className="font-mono text-[11px] text-stone-500">
                      Πηγή: {leadOrigin}
                    </span>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-[#14191f]">
                      Ιδιότητα / Κατηγορία Ενδιαφέροντος *
                    </label>
                    <select
                      value={leadRole}
                      onChange={(e) => setLeadRole(e.target.value)}
                      className="w-full p-2.5 rounded border border-stone-300 bg-stone-50 font-medium text-[#14191f]"
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
                      <label className="block font-semibold mb-1 text-[#14191f]">
                        Ονοματεπώνυμο / Φορέας *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="π.χ. Γεώργιος Παπαδόπουλος"
                        className="w-full p-2.5 rounded border border-stone-300 text-[#14191f]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 text-[#14191f]">
                        Τηλέφωνο Επικοινωνίας *
                      </label>
                      <input
                        type="tel"
                        required
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="π.χ. +30 69..."
                        className="w-full p-2.5 rounded border border-stone-300 text-[#14191f]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-[#14191f]">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full p-2.5 rounded border border-stone-300 text-[#14191f]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-[#14191f]">
                      Μήνυμα / Περιγραφή Ακινήτου ή Επενδυτικού Προφίλ
                    </label>
                    <textarea
                      rows={3}
                      value={leadMessage}
                      onChange={(e) => setLeadMessage(e.target.value)}
                      placeholder="Σημειώστε αν σας ενδιαφέρει το LOI για την Πρόσκληση LEADER (04/02/2027), η ΑΜΚΕ Ευεργετών ή η ένταξη ακινήτου..."
                      className="w-full p-2.5 rounded border border-stone-300 text-[#14191f]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="w-full py-3 rounded bg-[#14191f] hover:bg-[#1f5c43] disabled:opacity-60 text-white font-bold transition cursor-pointer"
                  >
                    {leadSubmitting
                      ? "Αποστολή Αιτήματος..."
                      : "Αποστολή Αιτήματος στο Συντονιστικό Desk →"}
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1f5c43] flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#14191f]">
                    Το Αίτημά σας Εστάλη Επιτυχώς
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                    Το αίτημά σας παραδόθηκε απευθείας στο{" "}
                    <strong>digiadsgr@gmail.com</strong> με ένδειξη προέλευσης:{" "}
                    <span className="font-mono text-[#14191f] font-semibold">
                      Ενσωματωμένη Φόρμα Σελίδας (#contact-form) — {leadOrigin}
                    </span>
                    .
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <a
                      href={buildMailtoHref(
                        `Ενσωματωμένη Φόρμα Σελίδας (#contact-form) — ${leadOrigin}`
                      )}
                      className="px-4 py-2 rounded bg-[#1f5c43] text-white text-xs font-semibold"
                    >
                      Αποστολή Αντιγράφου μέσω Email Client ↗
                    </a>
                    <button
                      onClick={() => setInlineSubmitted(false)}
                      className="px-4 py-2 rounded border border-stone-300 text-xs font-semibold cursor-pointer text-[#14191f]"
                    >
                      Νέο Αίτημα
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-[#0d1115] text-stone-400 py-10 pb-24 lg:pb-10 border-t border-stone-800 text-xs">
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
                ΘΕΜΑΤΙΚΕΣ ΣΕΛΙΔΕΣ ΤΕΚΜΗΡΙΩΣΗΣ
              </div>
              <ul className="space-y-1">
                <li>
                  •{" "}
                  <a
                    href="/stratopedo-vrosinas"
                    className="hover:text-white underline decoration-stone-700"
                  >
                    Στρατόπεδο «Παπακωνσταντίνου» (13.695 τ.μ.)
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="/ependyseis-epidotiseis"
                    className="hover:text-white underline decoration-stone-700"
                  >
                    Επενδύσεις, Επιδοτήσεις 80% & ΑΜΚΕ Ευεργετών
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="/gefyri-vrosinas-raidiotissa"
                    className="hover:text-white underline decoration-stone-700"
                  >
                    Γεφύρι Βροσίνας, Ζαλογγογέφυρο 1605 & Ραϊδιώτισσα
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="/katoikia-neoi-paragogoi"
                    className="hover:text-white underline decoration-stone-700"
                  >
                    Αποκατάσταση Κατοικιών & Νέοι Παραγωγοί
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="/ai-knowledge-base"
                    className="hover:text-white underline decoration-stone-700"
                  >
                    AI Knowledge Base & Fact Sheet (EL/EN)
                  </a>
                </li>
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
            <div className="flex flex-wrap items-center gap-4">
              <span>
                Τεκμηριωμένο με επίσημα στοιχεία ΕΛΣΤΑΤ 2021, Τ.Α.ΕΘ.Α. & ΗΠΕΙΡΟΣ
                Α.Ε.
              </span>
              <span className="text-stone-700">|</span>
              <a
                href="https://digiads.gr"
                target="_blank"
                rel="noopener"
                className="text-stone-400 hover:text-[#c89d54] transition font-mono text-[11px]"
              >
                Designed by <strong className="text-white">DIGIADS</strong>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM QUICK-ACTION BAR (1-THUMB NAVIGATION FOR SMARTPHONE VISITORS) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#14191f]/98 backdrop-blur-md border-t border-stone-700 px-1.5 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
        <div className="grid grid-cols-5 gap-1 max-w-lg mx-auto text-[10px] sm:text-[11px] font-semibold">
          <a
            href="#praktikes-lyseis"
            onClick={() =>
              registerEngagement(
                "mobile_bar_click",
                "practical-solutions",
                "Πώς/Από Πού"
              )
            }
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded bg-stone-900 border border-[#c89d54]/60 text-amber-200 text-center"
          >
            <span>🧭 Πώς/Πού</span>
          </a>
          <a
            href="#autopsia-real"
            onClick={() =>
              registerEngagement(
                "mobile_bar_click",
                "camp-autopsy",
                "Στρατόπεδο & Τουρ"
              )
            }
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded bg-stone-900 border border-stone-700 text-stone-200 text-center"
          >
            <span>🎥 Στρατόπεδο</span>
          </a>
          <a
            href="#community"
            onClick={() =>
              registerEngagement(
                "mobile_bar_click",
                "housing-calculator",
                "Σπίτια 0€"
              )
            }
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded bg-stone-900 border border-stone-700 text-stone-200 text-center"
          >
            <span>🏡 Σπίτια 0€</span>
          </a>
          <a
            href="#investors"
            onClick={() =>
              registerEngagement(
                "mobile_bar_click",
                "investor-simulator",
                "Επιδότηση 80%"
              )
            }
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded bg-stone-900 border border-[#c89d54]/50 text-[#c89d54] text-center"
          >
            <span>💶 Επιδότηση</span>
          </a>
          <button
            type="button"
            onClick={() =>
              openLeadModal(
                "owner",
                "Κινητή Μπάρα Άμεσης Δράσης (Mobile Bottom Bar)",
                "Άμεση εκδήλωση ενδιαφέροντος από κινητή συσκευή"
              )
            }
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded bg-[#1f5c43] text-white font-bold text-center cursor-pointer"
          >
            <span>✉️ Συμμετοχή</span>
          </button>
        </div>
      </div>

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
                onSubmit={(e) => submitLeadToDigiads(e, leadOrigin, false)}
                className="space-y-4 text-xs sm:text-sm"
              >
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  Εκδήλωση Ενδιαφέροντος & Θεσμική Επικοινωνία
                </h3>

                <div className="p-2.5 rounded bg-stone-100 border border-stone-300 text-[11px] font-mono space-y-1">
                  <div>
                    <span className="text-stone-500">ΠΗΓΗ ΑΙΤΗΜΑΤΟΣ: </span>
                    <strong className="text-[#1f5c43]">{leadOrigin}</strong>
                  </div>
                  {leadContextDetails && (
                    <div className="text-stone-600">{leadContextDetails}</div>
                  )}
                </div>

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
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
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
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
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
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
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
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    placeholder="Σημειώστε αν σας ενδιαφέρει το LOI για την Πρόσκληση LEADER (04/02/2027), η ΑΜΚΕ Ευεργετών ή η ένταξη ακινήτου..."
                    className="w-full p-2.5 rounded border border-stone-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={leadSubmitting}
                  className="w-full py-3 rounded bg-[#14191f] hover:bg-[#1f5c43] disabled:opacity-60 text-white font-bold transition cursor-pointer"
                >
                  {leadSubmitting
                    ? "Αποστολή στο digiadsgr@gmail.com..."
                    : "Καταχώριση & Αποστολή Φακέλου →"}
                </button>
              </form>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1f5c43] flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h4 className="font-serif text-2xl font-bold">
                  Η Δήλωσή σας Εστάλη Επιτυχώς
                </h4>
                <p className="text-xs sm:text-sm text-stone-600">
                  Το αίτημά σας παραδόθηκε απευθείας στο{" "}
                  <strong>digiadsgr@gmail.com</strong> με ένδειξη προέλευσης:{" "}
                  <span className="font-mono text-[#14191f] font-semibold">
                    {leadOrigin}
                  </span>
                  .
                </p>
                <div className="flex flex-wrap justify-center gap-2.5 pt-2">
                  <a
                    href={buildMailtoHref(leadOrigin)}
                    className="px-4 py-2 rounded bg-[#1f5c43] text-white text-xs font-semibold"
                  >
                    Αποστολή Αντιγράφου μέσω Email Client ↗
                  </a>
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
