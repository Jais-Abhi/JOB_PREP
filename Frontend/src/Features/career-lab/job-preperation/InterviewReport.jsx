import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCcw, AlertTriangle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import api from '../../../Config/api';

const SkeletonBlock = ({ className = '' }) => (
  <div className={`rounded-2xl bg-slate-200/70 animate-pulse ${className}`} />
);

const statusForScore = (score) => {
  if (score >= 85) return { label: 'Excellent', tone: 'bg-emerald-100 text-emerald-700' };
  if (score >= 70) return { label: 'Good', tone: 'bg-sky-100 text-sky-700' };
  if (score >= 50) return { label: 'Fair', tone: 'bg-amber-100 text-amber-700' };
  return { label: 'Needs Improvement', tone: 'bg-rose-100 text-rose-700' };
};

const QuestionAccordion = ({ idx, item }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between p-4" onClick={() => setOpen((v) => !v)}>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-50 text-slate-700 font-semibold">{idx + 1}</div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-900">{item.question}</p>
            <p className="text-xs text-slate-500 truncate">{item.intension}</p>
          </div>
        </div>
        <ChevronDown className={`text-slate-500 ${open ? 'rotate-180' : ''}`} />
      </div>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="border-t border-slate-100 p-4">
          <p className="text-xs font-semibold text-slate-700">Interviewer Intention</p>
          <p className="mt-1 text-sm text-slate-600">{item.intension}</p>
          <p className="mt-3 text-xs font-semibold text-slate-700">Suggested Answer</p>
          <p className="mt-1 text-sm text-slate-600">{item.answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

const SkillGapCard = ({ gap }) => {
  const severity = (gap.severity || '').toLowerCase();
  const cls = severity === 'high' ? 'bg-rose-100 text-rose-700' : severity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700';

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
      <div>
        <p className="text-sm font-semibold text-slate-900">{gap.skill}</p>
      </div>
      <div className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${cls}`}>{gap.severity}</div>
    </div>
  );
};

const PreparationPlanCard = ({ plan }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-slate-200 bg-white p-3">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-900">Day {plan.day}</p>
        <p className="text-xs text-slate-500">{plan.focusArea}</p>
      </div>
      <div className="text-xs text-slate-500">{plan.tasks.length} tasks</div>
    </div>
    <ul className="mt-3 space-y-2">
      {plan.tasks.map((t, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
          <span className="mt-0.5 text-emerald-600">✓</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const InterviewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [report, setReport] = useState(null);

  const fetchReport = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/api/interview/report/${id}`);
      const container = res.data?.report;
      if (!container) throw new Error('Report missing');
      setReport(container);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load report.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchReport(); }, [fetchReport]);

  const createdAt = useMemo(() => (report?.createdAt ? new Date(report.createdAt) : null), [report]);
  const formattedDate = createdAt ? createdAt.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const matchScore = report?.matchScore ?? 0;
  const status = statusForScore(matchScore);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Interview Preparation</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">{report?.title || 'Interview Report'}</h1>
            <p className="mt-1 text-sm text-slate-500">Match score and tailored preparation plan.</p>
          </div>
          <Button onClick={() => navigate(-1)} className="text-sm bg-slate-900 text-white px-3 py-2">
            <ArrowLeft size={14} /> Back
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <SkeletonBlock className="h-40" />
              <SkeletonBlock className="h-40" />
              <SkeletonBlock className="h-40" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <SkeletonBlock className="h-52" />
              <SkeletonBlock className="h-52" />
            </div>
          </div>
        ) : error ? (
          <div className="mx-auto max-w-2xl">
            <Card className="border border-rose-100 bg-white shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-700">
                  <AlertTriangle size={20} />
                </div>
                <h2 className="text-lg font-medium text-slate-900">Unable to load report</h2>
                <p className="mt-2 text-sm text-slate-500">{error}</p>
                <Button onClick={fetchReport} className="mt-4 inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-2">
                  <RefreshCcw size={14} /> Retry
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-3">
            <div className="space-y-4">
              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Match Score</p>
                      <div className="mt-2 flex items-center gap-3">
                        <h2 className="text-3xl font-bold text-slate-900">{matchScore}</h2>
                        <span className="text-sm text-slate-500">/ 100</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">Generated on {formattedDate}</p>
                      <div className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${status.tone}`}>{status.label}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <svg className="h-28 w-28" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="60" className="stroke-slate-200" strokeWidth="10" fill="none" />
                        <circle cx="70" cy="70" r="60" className="stroke-slate-900/80" strokeWidth="10" strokeLinecap="round" fill="none"
                          strokeDasharray={Math.PI * 2 * 60}
                          strokeDashoffset={Math.PI * 2 * 60 * (1 - matchScore / 100)} transform="rotate(-90 70 70)" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader className="px-4 py-3">
                  <CardTitle className="text-sm font-semibold text-slate-900">Skill Gaps</CardTitle>
                  <CardDescription className="mt-1 text-xs text-slate-500">Areas to improve before interviews.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {report?.skillGaps?.length > 0 ? (
                    report.skillGaps.map((g, i) => <SkillGapCard key={i} gap={g} />)
                  ) : (
                    <p className="text-sm text-slate-500">No skill gaps identified.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader className="px-4 py-3">
                  <CardTitle className="text-sm font-semibold text-slate-900">Technical Interview Questions</CardTitle>
                  <CardDescription className="mt-1 text-xs text-slate-500">Click to reveal intention and suggested answer.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {report?.technicalQuestions?.map((q, i) => (
                    <QuestionAccordion key={i} idx={i} item={q} />
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader className="px-4 py-3">
                  <CardTitle className="text-sm font-semibold text-slate-900">Behavioral Questions</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {report?.behaviourQuestions?.map((q, i) => (
                    <QuestionAccordion key={i} idx={i} item={q} />
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader className="px-4 py-3">
                  <CardTitle className="text-sm font-semibold text-slate-900">Preparation Plan</CardTitle>
                  <CardDescription className="mt-1 text-xs text-slate-500">Daily plan to prepare for the interview.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {report?.preparationPlans?.map((p, i) => (
                    <PreparationPlanCard key={i} plan={p} />
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader className="px-4 py-3">
                  <CardTitle className="text-sm font-semibold text-slate-900">Job Description</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-slate-700">{report?.jobDescription}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InterviewReport;
