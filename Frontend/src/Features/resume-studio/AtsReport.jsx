import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CircleDollarSign,
  FileText,
  ShieldCheck,
  Sparkles,
  Star,
  CheckCircle2,
  AlertTriangle,
  RefreshCcw,
  Briefcase,
  BookOpen,
  ClipboardList,
  FileSignature,
  TextCursor,
  Sparkles as SparklesFilled,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import api from '../../Config/api';

const statusForScore = (score) => {
  if (score >= 85) return { label: 'Excellent', tone: 'bg-emerald-100 text-emerald-700' };
  if (score >= 70) return { label: 'Good', tone: 'bg-sky-100 text-sky-700' };
  if (score >= 50) return { label: 'Fair', tone: 'bg-amber-100 text-amber-700' };
  return { label: 'Needs Improvement', tone: 'bg-rose-100 text-rose-700' };
};

const sectionIcon = (key) => {
  const mapping = {
    atsFormatting: FileText,
    contactInformation: ShieldCheck,
    resumeStructure: ClipboardList,
    skills: SparklesFilled,
    projects: Briefcase,
    experience: Briefcase,
    education: BookOpen,
    grammarAndReadability: TextCursor,
    default: Star,
  };

  return mapping[key] || mapping.default;
};

const normalizedLabel = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .replace(/And/g, 'and');
};

const SkeletonBlock = ({ className }) => (
  <div className={`rounded-3xl bg-slate-200/70 animate-pulse ${className}`} />
);

const AtsReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReport = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError('');

    try {
      const response = await api.get(`/api/resume/report/${id}`);
      const reportContainer = response.data?.report;
      if (!reportContainer) {
        throw new Error('Report data was not returned from the server.');
      }
      setReportData(reportContainer);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to fetch the report. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const report = useMemo(() => reportData?.report, [reportData]);
  const createdAt = reportData?.createdAt ? new Date(reportData.createdAt) : null;
  const formattedDate = createdAt
    ? createdAt.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : '';
  const totalScore = report?.scoreBreakdown?.totalScore ?? 0;
  const status = statusForScore(totalScore);
  const sections = report?.scoreBreakdown?.sections ?? {};
  const sectionMax = Math.max(...Object.values(sections).filter((value) => typeof value === 'number'), 1);
  const strengths = report?.feedback?.strengths ?? [];
  const improvements = report?.feedback?.improvements ?? [];
  const overallFeedback = report?.feedback?.overallFeedback ?? '';

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
              ATS Report
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Resume analysis result
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              View your score, strengths, and recommendations directly from the latest ATS report.
            </p>
          </div>
          <Button
            onClick={() => navigate('/resume/ats-check')}
            className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800"
          >
            <ArrowLeft size={16} /> Back to Analyzer
          </Button>
        </div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <SkeletonBlock className="h-72" />
              <div className="space-y-6">
                <SkeletonBlock className="h-32" />
                <SkeletonBlock className="h-32" />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-40" />
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <SkeletonBlock className="h-56" />
              <SkeletonBlock className="h-56" />
            </div>
            <SkeletonBlock className="h-44" />
          </motion.div>
        ) : error ? (
          <div className="mx-auto max-w-2xl">
            <Card className="border border-rose-100 bg-white shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-50 text-rose-700">
                  <AlertTriangle size={28} />
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">Report not found</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {error}
                </p>
                <Button
                  onClick={fetchReport}
                  className="mt-8 inline-flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800"
                >
                  <RefreshCcw size={16} /> Retry
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <Card className="overflow-hidden border border-slate-200 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                        Overall ATS Score
                      </p>
                      <h2 className="mt-4 text-5xl font-extrabold text-slate-900">
                        {totalScore}
                        <span className="ml-2 text-lg font-medium text-slate-500">/ 100</span>
                      </h2>
                      <div className={`mt-4 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-medium ${status.tone}`}>
                        <Sparkles size={16} className="text-current" />
                        {status.label}
                      </div>
                      <p className="mt-4 text-sm text-slate-500">
                        Analysis completed on {formattedDate}
                      </p>
                    </div>

                    <div className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-slate-100 shadow-sm">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-100 to-slate-50" />
                      <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-lg">
                        <div className="text-center">
                          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Score</p>
                          <p className="mt-2 text-5xl font-semibold text-slate-900">{totalScore}</p>
                          <p className="text-sm text-slate-500">out of 100</p>
                        </div>
                      </div>
                      <svg className="absolute h-full w-full" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="64" className="stroke-slate-200" strokeWidth="12" fill="none" />
                        <circle
                          cx="70"
                          cy="70"
                          r="64"
                          className="stroke-slate-900/80"
                          strokeWidth="12"
                          strokeLinecap="round"
                          fill="none"
                          strokeDasharray={Math.PI * 2 * 64}
                          strokeDashoffset={Math.PI * 2 * 64 * (1 - totalScore / 100)}
                          transform="rotate(-90 70 70)"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6">
                <Card className="border border-slate-200 bg-white shadow-xl">
                  <CardHeader className="px-6 py-6">
                    <CardTitle className="text-base font-semibold text-slate-900">Summary</CardTitle>
                    <CardDescription className="mt-1 text-sm text-slate-500">
                      A concise snapshot of what your resume does well and where it can improve.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 px-6 pb-6">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-center gap-3 text-slate-700">
                        <CircleDollarSign size={20} className="text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">ATS score context</p>
                          <p className="text-sm text-slate-500">
                            Your score is computed from formatting, structure, skills, experience, and readability.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4">
                        <div>
                          <p className="text-sm text-slate-500">Formatting</p>
                          <p className="text-sm font-medium text-slate-900">
                            {Math.round(((sections.atsFormatting ?? 0) / sectionMax) * 100)}%
                          </p>
                        </div>
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-slate-900"
                            style={{ width: `${Math.min(100, Math.max(0, ((sections.atsFormatting ?? 0) / sectionMax) * 100))}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4">
                        <div>
                          <p className="text-sm text-slate-500">Keywords & skills</p>
                          <p className="text-sm font-medium text-slate-900">
                            {Math.round(((sections.skills ?? 0) / sectionMax) * 100)}%
                          </p>
                        </div>
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-slate-900"
                            style={{ width: `${Math.min(100, Math.max(0, ((sections.skills ?? 0) / sectionMax) * 100))}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border border-slate-200 bg-white shadow-xl">
                  <CardHeader className="px-6 py-6">
                    <CardTitle className="text-base font-semibold text-slate-900">Details</CardTitle>
                    <CardDescription className="mt-1 text-sm text-slate-500">
                      See how each resume section contributed to the final ATS score.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 px-6 pb-6">
                    <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div>
                        <p className="text-sm text-slate-500">Report ID</p>
                        <p className="text-sm font-medium text-slate-900">{reportData?._id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">Created</p>
                        <p className="text-sm font-medium text-slate-900">{formattedDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {Object.entries(sections).map(([key, value]) => {
                const Icon = sectionIcon(key);
                const label = normalizedLabel(key);
                const percent = Math.round((value / sectionMax) * 100);

                return (
                  <motion.div
                    key={key}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{label}</p>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Score</p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <p className="text-3xl font-semibold text-slate-900">{value}</p>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {percent}%
                      </span>
                    </div>
                    <div className="mt-4">
                      <Progress value={Math.min(100, Math.max(0, percent))} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <Card className="border border-slate-200 bg-white shadow-xl">
                <CardHeader className="px-6 py-6">
                  <CardTitle className="text-base font-semibold text-slate-900">Resume Strengths</CardTitle>
                  <CardDescription className="mt-1 text-sm text-slate-500">
                    Highlights for what your resume already does well.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6">
                  {strengths.length > 0 ? (
                    strengths.map((item, index) => (
                      <motion.div
                        key={`${item.section}-${index}`}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                            <CheckCircle2 size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{item.section}</p>
                            <p className="mt-1 text-sm leading-6 text-slate-600">{item.observation}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No strengths were identified from this report.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-xl">
                <CardHeader className="px-6 py-6">
                  <CardTitle className="text-base font-semibold text-slate-900">Recommended Improvements</CardTitle>
                  <CardDescription className="mt-1 text-sm text-slate-500">
                    Priority recommendations to improve your resume and ATS performance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6">
                  {improvements.length > 0 ? (
                    improvements.map((item, index) => (
                      <motion.div
                        key={`${item.section}-${index}`}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{item.section}</p>
                              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                                Impact: {item.impact?.charAt(0).toUpperCase() + item.impact?.slice(1)}
                              </p>
                            </div>
                            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-600">
                              {item.impact}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">Issue</p>
                            <p className="mt-1 text-sm leading-6 text-slate-600">{item.issue}</p>
                          </div>
                          <div className="rounded-3xl border border-slate-200 bg-white p-4">
                            <p className="text-sm font-semibold text-slate-900">Suggestion</p>
                            <p className="mt-1 text-sm leading-6 text-slate-600">{item.suggestion}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No improvement suggestions are available for this report.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="border border-slate-200 bg-white shadow-xl">
              <CardHeader className="px-6 py-6">
                <CardTitle className="text-base font-semibold text-slate-900">Overall Feedback</CardTitle>
                <CardDescription className="mt-1 text-sm text-slate-500">
                  The final evaluation from the ATS report.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-8">
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-slate-700 shadow-sm">
                  <div className="mb-4 flex items-center gap-3 text-slate-900">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                      <FileSignature size={20} />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Final evaluation
                    </p>
                  </div>
                  <p className="text-base leading-8 text-slate-700">{overallFeedback}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AtsReport;
