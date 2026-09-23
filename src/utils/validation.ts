import { IdeaCanvasData, ComplianceReport, ComplianceIssue, Stage2Deliverable, UserProfile, BoxGSelection } from '../types';
import { WORD_LIMITS, MAX_FILE_SIZE_BYTES, ELEVENLABS_STACK_COMPONENTS } from '../data/competitionData';

export function countWords(text: string | undefined): number {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// Intent phrases that signal vague statements of intent rather than technical mechanisms
const VAGUE_INTENT_PATTERNS = [
  /we will ensure/i,
  /we will try to/i,
  /we hope to/i,
  /we will follow all rules/i,
  /we plan to make sure/i,
  /our team will be careful/i,
  /we will handle this properly/i,
  /we promise to/i,
  /we will make sure users are happy/i,
  /best practices will be applied/i,
  /comply with everything/i,
];

const TECHNICAL_MECHANISM_KEYWORDS = [
  'regex', 'node', 'filter', 'rag', 'token', 'biometric', 'assertion',
  'watchdog', 'webhook', 'threshold', 'shield', 'mtls', 'redact', 'proxy',
  'escalat', 'schema', 'payload', 'deterministic', 'guardrail', 'sub-agent',
  'rate-limit', 'timeout', 'auth', 'biasing', 'scoping', 'trust context',
  'sentiment', 'fallback', 'encryption', 'aes', 'pki', 'grounding'
];

export function analyzeMechanism(mechanismText: string): { isValid: boolean; reason: string } {
  if (!mechanismText || mechanismText.trim().length < 15) {
    return {
      isValid: false,
      reason: 'Mechanism is missing or too brief. Specify a concrete technical control.'
    };
  }

  const hasVagueIntent = VAGUE_INTENT_PATTERNS.some(pattern => pattern.test(mechanismText));
  const hasTechKeyword = TECHNICAL_MECHANISM_KEYWORDS.some(kw => mechanismText.toLowerCase().includes(kw));

  if (hasVagueIntent && !hasTechKeyword) {
    return {
      isValid: false,
      reason: 'Contains vague statement of intent without specifying concrete software mechanism (e.g. regex filter, deterministic guardrail node, RAG citation filter).'
    };
  }

  if (!hasTechKeyword && countWords(mechanismText) < 8) {
    return {
      isValid: false,
      reason: 'Lacks technical implementation details (e.g., prompt assertions, validator proxy, API tokenization).'
    };
  }

  return {
    isValid: true,
    reason: 'Valid concrete technical mechanism identified.'
  };
}

export function extractNumbersAndMetrics(text: string): string[] {
  if (!text) return [];
  // Match currency, percentages, time durations, numbers with units
  const regex = /(\b(?:AED|\$|€|£)?\s*\d+(?:[.,]\d+)?(?:\s*(?:M|K|B|%|min|mins|minutes|seconds|sec|hours|days|weeks|months|years|x|fold))?\b)/gi;
  const matches = text.match(regex);
  return matches ? Array.from(new Set(matches.map(m => m.trim()))) : [];
}

export function evaluateBoxDandJAlignment(boxD: string, boxJ: string): { isAligned: boolean; warning?: string; metricsInD: string[]; metricsInJ: string[] } {
  const metricsD = extractNumbersAndMetrics(boxD);
  const metricsJ = extractNumbersAndMetrics(boxJ);

  if (metricsD.length === 0 && countWords(boxD) > 10) {
    return {
      isAligned: false,
      warning: 'Box D lacks quantitative baseline figures (e.g. baseline response time, drop-off rate, or financial cost). Add concrete metrics.',
      metricsInD: metricsD,
      metricsInJ: metricsJ
    };
  }

  if (metricsJ.length === 0 && countWords(boxJ) > 10) {
    return {
      isAligned: false,
      warning: 'Box J lacks quantitative target KPIs (e.g. % improvement, target seconds, or AED cost savings). Add measurable targets.',
      metricsInD: metricsD,
      metricsInJ: metricsJ
    };
  }

  return {
    isAligned: true,
    metricsInD: metricsD,
    metricsInJ: metricsJ
  };
}

export function evaluateBoxGArchitecture(selections: BoxGSelection[]): {
  score: number; // 0-100
  bloatWarning?: string;
  qualitySummary: string;
} {
  const totalAvailable = ELEVENLABS_STACK_COMPONENTS.length;
  const count = selections?.length || 0;

  if (count === 0) {
    return {
      score: 0,
      qualitySummary: 'No ElevenLabs components selected. Please select and justify your architectural components.'
    };
  }

  // Rule: Penalize selecting all without justification
  if (count >= totalAvailable - 2) {
    const poorJustifications = selections.filter(s => !s.justification || s.justification.trim().length < 15);
    if (poorJustifications.length > 2) {
      return {
        score: 40,
        bloatWarning: 'Selecting nearly all components without distinct technical justifications incurs an architectural bloat penalty. Curate only the components strictly needed for this use case.',
        qualitySummary: 'Over-engineered selection without sufficient modular justification.'
      };
    }
  }

  const validJustifications = selections.filter(s => s.justification && s.justification.trim().length >= 15);
  const ratio = validJustifications.length / count;

  let score = Math.round(ratio * 100);
  if (count >= 3 && count <= 9 && ratio >= 0.8) {
    score = 100; // Optimal focused architecture
  }

  return {
    score,
    qualitySummary: `${validJustifications.length} of ${count} selected components have verified technical justifications.`
  };
}

export function runFullComplianceAudit(
  canvas: IdeaCanvasData,
  deliverables: Stage2Deliverable[],
  user: UserProfile | null
): ComplianceReport {
  const issues: ComplianceIssue[] = [];
  let checksPassed = 0;
  const totalChecks = 16;

  // 1. User Registration & Single Entry Check
  if (!user || !user.ignyteId) {
    issues.push({
      id: 'rule_registration',
      boxOrRule: 'Registration',
      severity: 'error',
      title: 'Ignyte Registration Required',
      message: 'Participant must have an active Ignyte Challenges account.',
      recommendation: 'Complete your participant profile registration before submitting.'
    });
  } else {
    checksPassed++;
  }

  // 2. Prohibited Use Policy Acceptance
  if (!user?.acceptedProhibitedUsePolicy) {
    issues.push({
      id: 'rule_prohibited_policy',
      boxOrRule: 'Policy',
      severity: 'error',
      title: 'ElevenLabs Prohibited Use Policy',
      message: 'You must review and accept the ElevenLabs safety and prohibited use policy.',
      recommendation: 'Check the safety policy agreement in profile settings.'
    });
  } else {
    checksPassed++;
  }

  // 3-16. Check Word Limits for Boxes A-N
  const boxKeys = [
    { key: 'boxA_title', limit: WORD_LIMITS.boxA, name: 'Box A (Solution Title)', tab: 'page_1' },
    { key: 'boxB_persona', limit: WORD_LIMITS.boxB, name: 'Box B (Target Persona)', tab: 'page_1' },
    { key: 'boxC_problem', limit: WORD_LIMITS.boxC, name: 'Box C (Problem Statement)', tab: 'page_1' },
    { key: 'boxD_baseline', limit: WORD_LIMITS.boxD, name: 'Box D (Baseline Figures)', tab: 'page_1' },
    { key: 'boxE_voiceModality', limit: WORD_LIMITS.boxE, name: 'Box E (Voice Modality)', tab: 'page_1' },
    { key: 'boxF_agentArchitecture', limit: WORD_LIMITS.boxF, name: 'Box F (Agent Architecture)', tab: 'page_2' },
    { key: 'boxG_elevenLabsStack', limit: WORD_LIMITS.boxG, name: 'Box G (ElevenLabs Stack Overview)', tab: 'page_2' },
    { key: 'boxH_toolsAndIntegrations', limit: WORD_LIMITS.boxH, name: 'Box H (Tools & Integrations)', tab: 'page_2' },
    { key: 'boxJ_kpisAndImpact', limit: WORD_LIMITS.boxJ, name: 'Box J (KPIs & Target Impact)', tab: 'page_3' },
    { key: 'boxK_businessCaseRoi', limit: WORD_LIMITS.boxK, name: 'Box K (Business Case & ROI)', tab: 'page_3' },
    { key: 'boxL_rolloutPlan', limit: WORD_LIMITS.boxL, name: 'Box L (Rollout & Handoff)', tab: 'page_3' },
    { key: 'boxM_competitiveAdvantage', limit: WORD_LIMITS.boxM, name: 'Box M (Competitive Advantage)', tab: 'page_3' },
    { key: 'boxN_prototypeLink', limit: WORD_LIMITS.boxN, name: 'Box N (Prototype Link Text)', tab: 'page_3' },
  ];

  let wordLimitViolations = 0;
  boxKeys.forEach(box => {
    const val = (canvas as unknown as Record<string, unknown>)[box.key] as string || '';
    const count = countWords(val);
    if (count === 0) {
      issues.push({
        id: `empty_${box.key}`,
        boxOrRule: box.name,
        severity: 'error',
        title: `${box.name} is Empty`,
        message: `This required Idea Canvas box is empty.`,
        recommendation: `Fill in content within the ${box.limit}-word limit.`,
        targetTab: box.tab
      });
      wordLimitViolations++;
    } else if (count > box.limit) {
      issues.push({
        id: `limit_${box.key}`,
        boxOrRule: box.name,
        severity: 'error',
        title: `${box.name} Exceeds Word Limit`,
        message: `Current word count is ${count} words (Limit: ${box.limit} words, +${count - box.limit} over).`,
        recommendation: `Trim text to adhere to the strict ${box.limit}-word limit.`,
        targetTab: box.tab
      });
      wordLimitViolations++;
    }
  });

  if (wordLimitViolations === 0) {
    checksPassed += 4;
  }

  // Check Box D & J Alignment
  const alignment = evaluateBoxDandJAlignment(canvas.boxD_baseline, canvas.boxJ_kpisAndImpact);
  if (!alignment.isAligned) {
    issues.push({
      id: 'box_d_j_mismatch',
      boxOrRule: 'Box D & J Cross-Check',
      severity: 'warning',
      title: 'Box D & J Metric Cross-Check Warning',
      message: alignment.warning || 'Baseline metrics in Box D should correspond to target KPI metrics in Box J.',
      recommendation: 'Ensure your baseline figures (e.g. current 14 min wait time) directly match your target improvements in Box J (e.g. 45 sec target time).',
      targetTab: 'page_3'
    });
  } else {
    checksPassed += 2;
  }

  // Check Box G Component Architecture
  const boxGEval = evaluateBoxGArchitecture(canvas.boxG_selectedComponents);
  if (boxGEval.score < 60) {
    issues.push({
      id: 'box_g_bloat',
      boxOrRule: 'Box G Stack Selection',
      severity: boxGEval.bloatWarning ? 'warning' : 'error',
      title: 'Box G Component Selection & Justification',
      message: boxGEval.bloatWarning || 'Ensure all selected ElevenLabs components have concrete architectural rationales.',
      recommendation: 'Curate your selected ElevenLabs components to only what is required, providing brief reasons for each.',
      targetTab: 'page_2'
    });
  } else {
    checksPassed += 2;
  }

  // Check Box I 6-Row Guardrails
  const guardrails = canvas.boxI_guardrails || [];
  let invalidMechanisms = 0;
  if (guardrails.length < 6) {
    issues.push({
      id: 'box_i_rows_count',
      boxOrRule: 'Box I Guardrails',
      severity: 'error',
      title: 'Box I 6-Row Guardrail Matrix Incomplete',
      message: `Box I requires 6 distinct safety and failure guardrails (Currently: ${guardrails.length}).`,
      recommendation: 'Complete all 6 rows covering data leakage, impersonation, injection, hallucination, latency, and distress.',
      targetTab: 'page_2'
    });
  } else {
    guardrails.forEach((row, idx) => {
      const mechAnalysis = analyzeMechanism(row.mechanism);
      if (!mechAnalysis.isValid) {
        invalidMechanisms++;
        issues.push({
          id: `box_i_row_${idx}`,
          boxOrRule: `Box I Row ${idx + 1} (${row.riskType})`,
          severity: 'error',
          title: `Row ${idx + 1}: Vague Intent Instead of Mechanism`,
          message: mechAnalysis.reason,
          recommendation: 'State a concrete technical software mechanism (e.g., regex redaction proxy, RAG citation threshold, trust-boundary node) rather than a statement of intent.',
          targetTab: 'page_2'
        });
      }
    });
  }

  if (guardrails.length === 6 && invalidMechanisms === 0) {
    checksPassed += 3;
  }

  // Check Box N Prototype Link
  const link = canvas.boxN_prototypeLink?.trim() || '';
  if (!link || !isValidUrl(link)) {
    issues.push({
      id: 'box_n_link',
      boxOrRule: 'Box N Working Link',
      severity: 'error',
      title: 'Box N Working Prototype Link Missing or Invalid',
      message: 'A valid reachable URL to your ElevenLabs agent sandbox or live callable prototype is required.',
      recommendation: 'Enter a valid URL (e.g. https://elevenlabs.io/app/talk-to?agent_id=...)',
      targetTab: 'page_3'
    });
  } else {
    checksPassed += 2;
  }

  // Stage 2 Deliverables Size Checks
  deliverables.forEach(d => {
    if (d.fileSize && d.fileSize > MAX_FILE_SIZE_BYTES) {
      issues.push({
        id: `file_size_${d.id}`,
        boxOrRule: `Stage 2 (${d.title})`,
        severity: 'error',
        title: 'File Exceeds 40MB Competition Limit',
        message: `File ${d.fileName} is ${(d.fileSize / (1024 * 1024)).toFixed(1)}MB, exceeding the 40MB maximum allowed limit.`,
        recommendation: 'Compress the file or provide an external streaming URL (e.g., YouTube/Loom).'
      });
    }
  });

  const criticalErrors = issues.filter(i => i.severity === 'error');
  const isFullyCompliant = criticalErrors.length === 0;
  const score = Math.max(0, Math.min(100, Math.round((checksPassed / totalChecks) * 100)));

  return {
    isFullyCompliant,
    score,
    totalChecks,
    passedChecks: checksPassed,
    issues,
    checkedAt: new Date().toISOString()
  };
}
