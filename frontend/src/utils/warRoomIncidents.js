// AI Production War Room: Real-World Incident Library & Chaos Engine
// Simulates live P1/P2 production outages for roadmap milestones so learners
// debug real-world broken systems rather than just following passive tutorials.

export const PRODUCTION_INCIDENTS = {
  react: [
    {
      id: "INC-8102",
      severity: "P1 CRITICAL",
      service: "web-dashboard-renderer",
      topicMatch: ["hook", "effect", "state", "component", "render", "ui"],
      title: "Infinite Render Loop Crashing Client Browsers (Out of Memory)",
      symptom: "Customer browsers freezing upon navigating to Analytics view. P99 memory usage jumps to 2.4GB, browser tabs crash with Error code: STATUS_BREAKPOINT.",
      telemetry: {
        cpuUsage: "99.8%",
        memoryUsage: "2.4 GB (Leaking)",
        errorRate: "+420%",
        impactedUsers: "18,400 active sessions"
      },
      logs: [
        "[04:12:01.102 UTC] [ERROR] [Renderer] Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect without dependencies.",
        "[04:12:01.144 UTC] [WARN]  [ChromeRuntime] Page unresponsive, garbage collector thrashing (GC pause > 1200ms).",
        "[04:12:01.210 UTC] [FATAL] [V8-Engine] Fatal error in GC: Out of memory (allocation failed).",
        "[04:12:01.305 UTC] [ALERT] [Datadog] Service 'web-dashboard-renderer' health check failed 5 consecutive times."
      ],
      brokenCode: `import React, { useState, useEffect } from 'react';

export function AnalyticsFeed({ filter }) {
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState({ views: 0, clicks: 0 });

  // ⚠️ CRITICAL INCIDENT BUG: This effect triggers an infinite loop!
  useEffect(() => {
    const calculated = {
      views: data.length * 10,
      clicks: data.filter(d => d.active).length * 2
    };
    
    // Bug: Updating state on every render with unstable dependency or missing dependency check
    setMetrics(calculated);
  }); // <-- Missing dependency array causes re-render on every state update!

  return (
    <div className="analytics-card">
      <h3>Active Metrics</h3>
      <p>Views: {metrics.views} | Clicks: {metrics.clicks}</p>
    </div>
  );
}`,
      hint: "Look at the useEffect dependency array. If an effect calls setMetrics without a dependency array, updating state triggers another render, which runs the effect again indefinitely. Add the correct dependency array or compute derived state during render.",
      validateHotfix: (code) => {
        // Must include dependency array for useEffect or remove useEffect for derived state
        const hasDepArray = /useEffect\s*\(\s*\(\s*\)\s*=>\s*\{[\s\S]*?\}\s*,\s*\[\s*data\s*\]\s*\)/.test(code) ||
                            /useEffect\s*\(\s*\(\s*\)\s*=>\s*\{[\s\S]*?\}\s*,\s*\[\s*\]\s*\)/.test(code) ||
                            /const\s+metrics\s*=\s*\{/.test(code);
        const removedUnboundedEffect = !/useEffect\s*\(\s*\(\s*\)\s*=>\s*\{[\s\S]*?\}\s*\)\s*;?\s*return/.test(code);
        return hasDepArray && removedUnboundedEffect;
      },
      referenceSolution: `import React, { useState, useEffect, useMemo } from 'react';

export function AnalyticsFeed({ filter }) {
  const [data, setData] = useState([]);

  // Hotfix: Calculate derived state using useMemo instead of causing setState re-render cascades
  const metrics = useMemo(() => ({
    views: data.length * 10,
    clicks: data.filter(d => d.active).length * 2
  }), [data]);

  return (
    <div className="analytics-card">
      <h3>Active Metrics</h3>
      <p>Views: {metrics.views} | Clicks: {metrics.clicks}</p>
    </div>
  );
}`
    },
    {
      id: "INC-8109",
      severity: "P2 HIGH",
      service: "profile-form-sync",
      topicMatch: ["form", "state", "async", "fetch", "race"],
      title: "Asynchronous State Race Condition Overwriting User Profile Data",
      symptom: "Users report saving their profile settings, but stale data from prior network requests overwrites newly typed values when network latency fluctuates.",
      telemetry: {
        cpuUsage: "45.1%",
        memoryUsage: "340 MB",
        errorRate: "+18%",
        impactedUsers: "3,120 users"
      },
      logs: [
        "[03:45:10.001 UTC] [INFO]  [Network] User requested profile save (Req ID #9081)",
        "[03:45:10.050 UTC] [INFO]  [Network] Slow profile query returned after 2400ms (Req ID #9079)",
        "[03:45:10.055 UTC] [WARN]  [State] Stale state overwrite detected: Setting profile state from outdated payload #9079 over newer #9081."
      ],
      brokenCode: `import React, { useState, useEffect } from 'react';

export function UserSettings({ userId }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // ⚠️ Bug: Race condition! If userId changes quickly or response arrives out of order,
    // stale response overwrites active state with no cancellation/cleanup.
    fetch('/api/user/' + userId)
      .then(res => res.json())
      .then(data => {
        setProfile(data);
      });
  }, [userId]);

  return <div>{profile ? profile.name : 'Loading...'}</div>;
}`,
      hint: "Use an isMounted / isSubscribed flag or an AbortController in useEffect cleanup to discard responses from cancelled or stale userId requests.",
      validateHotfix: (code) => {
        const hasAbort = /AbortController/.test(code) && /signal/.test(code);
        const hasCancelledFlag = /let\s+(isCurrent|active|isMounted|cancelled|ignore)/i.test(code) && /return\s*\(\s*\)\s*=>/i.test(code);
        return hasAbort || hasCancelledFlag;
      },
      referenceSolution: `import React, { useState, useEffect } from 'react';

export function UserSettings({ userId }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let isCurrent = true;
    const controller = new AbortController();

    fetch('/api/user/' + userId, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (isCurrent) setProfile(data);
      })
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [userId]);

  return <div>{profile ? profile.name : 'Loading...'}</div>;
}`
    }
  ],

  node: [
    {
      id: "INC-9201",
      severity: "P1 CRITICAL",
      service: "auth-token-verifier",
      topicMatch: ["node", "express", "auth", "jwt", "async", "backend"],
      title: "Unhandled Promise Rejection Crashing Node.js Server Process",
      symptom: "Express server crashes completely under traffic spikes when expired or malformed JWT tokens are presented. PM2 restart loops triggered 14 times in 5 minutes.",
      telemetry: {
        cpuUsage: "100%",
        memoryUsage: "1.8 GB",
        errorRate: "100% (Process exited with code 1)",
        impactedUsers: "All downstream clients (502 Bad Gateway)"
      },
      logs: [
        "[02:15:33.401 UTC] [FATAL] [NodeRuntime] UnhandledPromiseRejection: JsonWebTokenError: jwt malformed",
        "[02:15:33.402 UTC] [FATAL] [NodeRuntime] Origin: Promise rejected at verifyTokenAsync (/app/middleware/auth.js:18:12)",
        "[02:15:33.405 UTC] [FATAL] [NodeRuntime] Node.js process terminated with exit status 1 (ERR_UNHANDLED_REJECTION).",
        "[02:15:34.000 UTC] [ALERT] [Kubelet] Container 'auth-token-verifier' CrashLoopBackOff."
      ],
      brokenCode: `import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  // ⚠️ CRITICAL BUG: jwt.verify throws synchronous & asynchronous errors
  // with zero try/catch block, crashing the entire Node.js runtime process!
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};`,
      hint: "Wrap the synchronous/asynchronous token verification in a try...catch block. If jwt.verify throws an error, catch it and return a graceful 401 Unauthorized response instead of letting the exception bubble up and kill the process.",
      validateHotfix: (code) => {
        return /try\s*\{[\s\S]*?jwt\.verify[\s\S]*?\}\s*catch/i.test(code) && /res\.status\(401\)/i.test(code);
      },
      referenceSolution: `import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  // Hotfix: Robust exception boundary protects process from unhandled crashes
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Invalid token verification attempt:', error.message);
    return res.status(401).json({ error: 'Invalid or expired authentication token' });
  }
};`
    }
  ],

  python: [
    {
      id: "INC-7402",
      severity: "P1 CRITICAL",
      service: "analytics-pipeline-worker",
      topicMatch: ["python", "django", "fastapi", "data", "database", "orm"],
      title: "N+1 Query Explosion Bringing Down PostgreSQL Production Cluster",
      symptom: "Analytics API response latency degraded from 85ms to 14,200ms. Database connection pool exhausted with 300 active connections in 'active query' state.",
      telemetry: {
        cpuUsage: "96.4%",
        memoryUsage: "7.8 GB",
        dbConnections: "300 / 300 (Max Capacity)",
        p99Latency: "14,200 ms"
      },
      logs: [
        "[01:20:10.120 UTC] [WARN]  [Postgres] Max connection limit reached: 300 active backends.",
        "[01:20:10.155 UTC] [ERROR] [FastAPI] Client timeout waiting for connection pool lease after 5000ms.",
        "[01:20:10.200 UTC] [ALERT] [PgBouncer] 1,420 pending queries queued in pool."
      ],
      brokenCode: `# ⚠️ CRITICAL INCIDENT: N+1 Database Query Explosion
# Loop queries database individually for every single user record!

def get_active_users_with_profiles(db_session):
    users = db_session.query(User).filter(User.is_active == True).all()
    
    result = []
    for user in users:
        # BUG: Executes a separate SQL query for EVERY user (N additional queries)
        profile = db_session.query(Profile).filter(Profile.user_id == user.id).first()
        result.append({
            "id": user.id,
            "email": user.email,
            "bio": profile.bio if profile else None
        })
    return result`,
      hint: "Replace the iterative per-user queries with an eager join using joinedload() or joined select_related / JOIN query so all data is fetched in a single efficient query.",
      validateHotfix: (code) => {
        const hasJoin = /joinedload|join|options/i.test(code) || /select_related/i.test(code);
        const removedLoopQuery = !/for\s+user\s+in\s+users:\s*[\s\S]*?db_session\.query\(Profile\)/i.test(code);
        return hasJoin && removedLoopQuery;
      },
      referenceSolution: `from sqlalchemy.orm import joinedload

def get_active_users_with_profiles(db_session):
    # Hotfix: Eagerly load profiles in a single optimized SQL JOIN
    users = (
        db_session.query(User)
        .options(joinedload(User.profile))
        .filter(User.is_active == True)
        .all()
    )
    
    return [
        {
            "id": user.id,
            "email": user.email,
            "bio": user.profile.bio if user.profile else None
        }
        for user in users
    ]`
    }
  ],

  devops: [
    {
      id: "INC-6301",
      severity: "P1 CRITICAL",
      service: "k8s-ingress-cluster",
      topicMatch: ["docker", "k8s", "devops", "cloud", "container", "security"],
      title: "Container OOMKilled (Exit Code 137) & Insecure Root Privilege Escalation",
      symptom: "Production pods terminating continuously with OOMKilled (Status 137). Docker security audit flagged CVE risk: containers executing as root user.",
      telemetry: {
        cpuUsage: "48%",
        memoryUsage: "512 MB / 512 MB (CGroup Limit Hit)",
        podRestarts: "48 restarts in 30 mins",
        securityAuditScore: "FAIL (Root UID 0)"
      },
      logs: [
        "[00:05:12.100 UTC] [ALERT] [Kubelet] Pod 'payment-svc-7889' memory cgroup limit exceeded: 512Mi. Sending SIGKILL (Exit 137).",
        "[00:05:12.180 UTC] [WARN]  [Trivy-Scanner] High vulnerability: Dockerfile runs container as root (UID 0). Potential container escape risk."
      ],
      brokenCode: `# ⚠️ Insecure & un-optimized production Dockerfile
FROM node:20

WORKDIR /app
COPY . .
RUN npm install

# Bug 1: Running as root user (security violation)
# Bug 2: No memory limit tuning for V8 in low-memory container
CMD ["node", "server.js"]`,
      hint: "Implement multi-stage build or non-root user (USER node) and pass --max-old-space-size to prevent node from exceeding container cgroup memory limits.",
      validateHotfix: (code) => {
        const hasUserNode = /USER\s+(node|[0-9]{3,})/.test(code);
        const hasMemoryFlag = /max-old-space-size|NODE_OPTIONS/i.test(code) || /npm\s+ci/i.test(code);
        return hasUserNode || hasMemoryFlag;
      },
      referenceSolution: `FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
# Hotfix 1: Allocate 384MB memory max to leave buffer under 512MB container limit
ENV NODE_OPTIONS="--max-old-space-size=384"

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Hotfix 2: Run as unprivileged node user
USER node

EXPOSE 3000
CMD ["node", "server.js"]`
    }
  ]
};

/**
 * Returns a tailored production incident matching the skill and topic,
 * or generates a realistic domain outage incident.
 */
export function getIncidentForTopic(skill = 'Engineering', topic = 'Core Architecture') {
  const sLower = skill.toLowerCase();
  const tLower = topic.toLowerCase();

  let pool = PRODUCTION_INCIDENTS.react;
  if (sLower.includes('node') || sLower.includes('backend') || sLower.includes('api')) {
    pool = PRODUCTION_INCIDENTS.node;
  } else if (sLower.includes('python') || sLower.includes('data') || sLower.includes('fastapi') || sLower.includes('django')) {
    pool = PRODUCTION_INCIDENTS.python;
  } else if (sLower.includes('docker') || sLower.includes('devops') || sLower.includes('k8s') || sLower.includes('cloud')) {
    pool = PRODUCTION_INCIDENTS.devops;
  }

  // Find topic match or default to first
  const match = pool.find(inc => inc.topicMatch.some(tm => tLower.includes(tm))) || pool[0];

  return {
    ...match,
    skill,
    topic,
    service: `${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}-svc`
  };
}
