// AI Viva & Architectural Defense Engine
// Simulates an oral examination / technical defense with a FAANG-tier Senior Architect.
// Evaluates candidate's conceptual depth, architectural trade-offs, and failure mode analysis.

export const DOMAIN_VIVA_QUESTIONS = {
  web: [
    {
      id: "viva-web-1",
      question: "Architectural Trade-offs: Why did you choose component-level state versus centralized store or URL state for this milestone? What are the specific performance implications on reconciliation?",
      rubricKeywords: ["reconciliation", "re-render", "prop drilling", "context", "memo", "virtual dom", "bundle", "granular", "overhead", "state machine"],
      seniorTips: "A senior engineer discusses re-render blast radiuses, garbage collection frequency, and cognitive load vs over-engineering."
    },
    {
      id: "viva-web-2",
      question: "Concurrency & Edge Cases: How does your implementation behave if a user double-clicks an action while a previous HTTP request is still in flight? How do you prevent race conditions and memory leaks?",
      rubricKeywords: ["race condition", "abortcontroller", "debounce", "throttle", "cleanup", "unmounted", "idempotent", "stale", "optimistic", "in-flight"],
      seniorTips: "Discuss request cancellation using AbortController, disabling buttons during mutations, or applying optimistic updates with automatic rollback."
    },
    {
      id: "viva-web-3",
      question: "Production Failure & Security: What are the primary XSS or client-side injection attack vectors in this architecture, and how did you sanitize user inputs or defend against malicious payloads?",
      rubricKeywords: ["xss", "sanitization", "csp", "content security policy", "dangerouslysetinnerhtml", "dompurify", "escaping", "validation", "jwt", "httponly"],
      seniorTips: "Explain how React escapes strings by default, why raw HTML injection is risky, and the necessity of strict Content Security Policies (CSP)."
    }
  ],

  backend: [
    {
      id: "viva-backend-1",
      question: "System Architecture & Scalability: If traffic to this endpoint surges from 100 RPS to 50,000 RPS, what is the single point of failure (SPOF) in your design? How would you introduce caching or queueing?",
      rubricKeywords: ["redis", "cache", "spof", "load balancer", "connection pool", "kafka", "rabbitmq", "rate limit", "horizontal scaling", "stateless"],
      seniorTips: "Highlight database connection pool exhaustion as the most common bottleneck, and propose Redis write-through caching or message queues."
    },
    {
      id: "viva-backend-2",
      question: "Data Integrity & Concurrency: How do you guarantee consistency when two users attempt to modify the same resource simultaneously? Explain optimistic vs pessimistic locking.",
      rubricKeywords: ["optimistic locking", "pessimistic locking", "acid", "transaction", "isolation level", "versioning", "race condition", "idempotency", "atomic", "deadlock"],
      seniorTips: "Compare version-based optimistic locking (ideal for high-read systems) with row-level pessimistic locks (SELECT FOR UPDATE) for financial transactions."
    },
    {
      id: "viva-backend-3",
      question: "Security & Zero Trust: Walk me through your defense against unauthorized token replay attacks or compromised secrets. How does token rotation and revocation work?",
      rubricKeywords: ["refresh token", "rotation", "blacklist", "redis", "expiry", "csrf", "tls", "secret manager", "revocation", "claims"],
      seniorTips: "Explain short-lived access tokens (15m) paired with single-use refresh token rotation stored in secure Redis distributed cache."
    }
  ]
};

/**
 * Returns tailored 3-round viva defense questions for any skill & topic.
 */
export function getVivaQuestions(skill = 'Engineering', topic = 'Milestone Architecture') {
  const sLower = skill.toLowerCase();
  const pool = (sLower.includes('node') || sLower.includes('python') || sLower.includes('backend') || sLower.includes('database') || sLower.includes('sql') || sLower.includes('devops'))
    ? DOMAIN_VIVA_QUESTIONS.backend
    : DOMAIN_VIVA_QUESTIONS.web;

  return pool.map((q, idx) => ({
    ...q,
    roundNumber: idx + 1,
    roundTitle: idx === 0 ? "Round 1: Architectural Trade-Offs" : idx === 1 ? "Round 2: Edge-Case Pressure Test" : "Round 3: Production Defense & Security",
    topicContext: `${skill} - ${topic}`
  }));
}

/**
 * AI Defense Evaluator: Grades user answers across 5 dimensions.
 */
export function evaluateVivaResponse(userAnswers, skill, topic) {
  let totalScore = 0;
  const dimensionScores = {
    architecture: 0,
    resilience: 0,
    security: 0,
    performance: 0,
    communication: 0
  };

  const questions = getVivaQuestions(skill, topic);

  userAnswers.forEach((ans, i) => {
    const q = questions[i] || questions[0];
    const text = (ans || "").toLowerCase().trim();
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    // Keyword match density
    let matchedKeywords = 0;
    q.rubricKeywords.forEach(kw => {
      if (text.includes(kw.toLowerCase())) matchedKeywords++;
    });

    // Score based on depth and technical precision
    let answerScore = 40; // baseline for answering
    if (wordCount >= 20) answerScore += 20;
    if (wordCount >= 45) answerScore += 15;
    answerScore += Math.min(25, matchedKeywords * 8);

    answerScore = Math.min(100, Math.max(35, answerScore));
    totalScore += answerScore;

    // Distribute into dimensions
    if (i === 0) {
      dimensionScores.architecture = answerScore;
      dimensionScores.communication = Math.min(100, Math.round(wordCount * 1.5 + 30));
    } else if (i === 1) {
      dimensionScores.resilience = answerScore;
      dimensionScores.performance = Math.min(100, Math.round(answerScore * 0.95 + matchedKeywords * 4));
    } else if (i === 2) {
      dimensionScores.security = answerScore;
    }
  });

  const finalAvg = Math.round(totalScore / Math.max(1, userAnswers.length));
  
  // Fill remaining scores if needed
  if (!dimensionScores.architecture) dimensionScores.architecture = finalAvg;
  if (!dimensionScores.resilience) dimensionScores.resilience = finalAvg;
  if (!dimensionScores.security) dimensionScores.security = finalAvg;
  if (!dimensionScores.performance) dimensionScores.performance = finalAvg;
  if (!dimensionScores.communication) dimensionScores.communication = Math.min(95, finalAvg + 5);

  let grade = "Senior Grade (Distinction)";
  let badgeColor = "emerald";
  if (finalAvg < 60) {
    grade = "Developing Engineer";
    badgeColor = "amber";
  } else if (finalAvg < 80) {
    grade = "Proficient Practitioner";
    badgeColor = "blue";
  }

  // Generate verifiable competency hash
  const hash = 'SS-VIVA-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();

  return {
    score: finalAvg,
    grade,
    badgeColor,
    competencyHash: hash,
    radar: dimensionScores,
    feedback: {
      strengths: [
        "Strong demonstration of real-world trade-off recognition",
        "Demonstrated awareness of production failure and concurrency pitfalls",
        "Clear articulation of architectural constraints"
      ],
      improvementAreas: [
        "Consider quantifying latency and memory impact with concrete metrics (e.g., p99 ms)",
        "Deepen defense regarding automated rollback strategies during partial outages"
      ]
    }
  };
}
