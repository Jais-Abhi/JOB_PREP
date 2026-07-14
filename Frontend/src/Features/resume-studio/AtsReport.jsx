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
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">ATS Report</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">Resume analysis result</h1>
            <p className="mt-1 text-sm text-slate-500">Score breakdown and prioritized improvements from the latest scan.</p>
          </div>
          <Button onClick={() => navigate('/resume/ats-check')} className="text-sm bg-slate-900 text-white px-3 py-2">
            <ArrowLeft size={14} /> Back
          </Button>
        </div>

        {loading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <SkeletonBlock className="h-48" />
              <SkeletonBlock className="h-48" />
              <SkeletonBlock className="h-48" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-28" />
              ))}
            </div>
          </motion.div>
        ) : error ? (
          <div className="mx-auto max-w-2xl">
            <Card className="border border-rose-100 bg-white shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-700">
                  <AlertTriangle size={20} />
                </div>
                <h2 className="text-lg font-medium text-slate-900">Report not found</h2>
                <p className="mt-2 text-sm text-slate-500">{error}</p>
                <Button onClick={fetchReport} className="mt-4 inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-2">
                  <RefreshCcw size={14} /> Retry
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-3">
            {/* Left column: overall score + breakdown */}
            <div className="space-y-4">
              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Overall ATS Score</p>
                      <div className="mt-2 flex items-center gap-3">
                        <h2 className="text-3xl font-bold text-slate-900">{totalScore}</h2>
                        <span className="text-sm text-slate-500">/ 100</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">Completed on {formattedDate}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <svg className="h-28 w-28" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="60" className="stroke-slate-200" strokeWidth="10" fill="none" />
                        <circle cx="70" cy="70" r="60" className="stroke-slate-900/80" strokeWidth="10" strokeLinecap="round" fill="none"
                          strokeDasharray={Math.PI * 2 * 60}
                          strokeDashoffset={Math.PI * 2 * 60 * (1 - totalScore / 100)} transform="rotate(-90 70 70)" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader className="px-4 py-3">
                  <CardTitle className="text-sm font-semibold text-slate-900">Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {Object.entries(sections).map(([key, value]) => {
                    const label = normalizedLabel(key);
                    const percent = Math.round((value / sectionMax) * 100);
                    return (
                      <div key={key} className="flex items-center justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{label}</p>
                          <p className="text-xs text-slate-500">{value} pts</p>
                        </div>
                        <div className="w-24">
                          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full bg-slate-900" style={{ width: `${Math.min(100, Math.max(0, percent))}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Middle column: improvements */}
            <div className="space-y-4">
              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader className="px-4 py-3">
                  <CardTitle className="text-sm font-semibold text-slate-900">Recommended Improvements</CardTitle>
                  <CardDescription className="mt-1 text-xs text-slate-500">Prioritized fixes to improve ATS match.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {improvements.length > 0 ? (
                    improvements.map((item, idx) => {
                      const impactClass = item.impact === 'high' ? 'bg-rose-100 text-rose-700' : item.impact === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700';
                      return (
                        <div key={`${item.section}-${idx}`} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{item.section}</p>
                              <p className="mt-1 text-xs text-slate-600">{item.issue}</p>
                            </div>
                            <div className={`rounded-full px-2 py-1 text-xs font-semibold uppercase ${impactClass}`}>{item.impact}</div>
                          </div>
                          <div className="mt-3 rounded-md bg-white border border-slate-200 p-2">
                            <p className="text-sm text-slate-700">{item.suggestion}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-slate-500">No improvements available.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right column: strengths + overall feedback */}
            <div className="space-y-4">
              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader className="px-4 py-3">
                  <CardTitle className="text-sm font-semibold text-slate-900">Resume Strengths</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {strengths.length > 0 ? (
                    strengths.map((s, i) => (
                      <div key={`${s.section}-${i}`} className="flex items-start gap-3 rounded-md bg-slate-50 p-2 border border-slate-100">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                          <CheckCircle2 size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{s.section}</p>
                          <p className="text-xs text-slate-600">{s.observation}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No strengths identified.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader className="px-4 py-3">
                  <CardTitle className="text-sm font-semibold text-slate-900">Overall Feedback</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-slate-700">{overallFeedback}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AtsReport;
