# Robot Training Data Vendors: Buyer Failures and Vendor Pain

Research date: 2026-11-07. Search tool: WebSearch (standard mode), 12 searches, no Exa, no WebFetch. Most results were secondary (aggregators, SEO blogs, vendor marketing). Evidence strength labels: strong (job postings, named quotes, filings, budgets), medium (exec interviews, reputable press), weak (vendor marketing, SEO/aggregator blogs, unverified Reddit summaries).

Important coverage limit: I did not open any Reddit, Glassdoor, or X thread directly. All worker-community claims below come from third-party summaries and are marked as such.

## Q1. Where vendors fail buyers (complaints, quality, churn, lawsuits)

### Takeaway
The best-documented buyer-side failure is quality and throughput, not fraud. Figure's public statement that outside vendors "couldn't hit the throughput, diversity, or quality bar" is the clearest buyer-side signal, and it led to an in-house replacement. Documented vendor-side failures are mostly labor and data-handling issues (misclassification, pay cuts, breach), which affect the workforce more than the buyer. I found no named buyer churn figures or buyer lawsuits against vendors.

### Cited Findings
- Figure says it tried buying data first and that vendors "couldn't hit the throughput, diversity, or quality bar Helix requires, so we built the pipeline ourselves." Figure's Index app launched publicly 2026-08-25 and Figure says it has paid Creators $15M to date. Strength: medium (company claim, quoted in secondary coverage) — [ArcWeb](https://www.arcweb.com/blog/humanoid-robot-company-figure-reveals-crowdsourced-robot-training-tool); [HowAIWorks](https://howaiworks.ai/figure-index-robot-training-dataset-2026/)
- Figure's own account says even its in-house pipeline needs "extensive filtering, fraud detection, deduplication, rebalancing, and annotation pipelines"; commentary notes Figure published no benchmarks against a model trained without Index data. Strength: medium/weak — [HowAIWorks](https://howaiworks.ai/figure-index-robot-training-dataset-2026/)
- A robotics data founder reports that after hiring contractors to collect human video, only about half the submitted footage was usable. Strength: weak (secondhand, unnamed founder) — [Prismax blog](https://www.prismax.ai/blog/not-all-robotics-data-is-created-equal) (cited via search result; not fetched)
- A founder postmortem (Sam Padilla, Eidon AI) reports that no two buyers want the same dataset, which made pre-collection bets risky, and that a supplier that misses spec can be replaced by one of "a dozen other suppliers." Strength: weak (republished on an aggregator, youmind.com). Source: [Youmind repost of "robotics data broken business"](https://youmind.com/landing/x-viral-articles/robotics-data-broken-business)
- Scale AI / Outlier: multiple suits — misclassification (California class of roughly 10,000–20,000 workers per one summary), a Jan 2025 mental-health negligence class action over disturbing content, a Oct 2024 layoff suit alleging no 60-day notice for 500+ workers, and a noyb privacy complaint over worker surveillance. A 2026 Euronews piece also reports allegations that Scale spied on AI trainers. Settlement of several California underpayment/misclassification suits reported but undated. Strength: medium for existence of suits (court filings/reputable press); weak on current status. Sources: [TechCrunch 2025-01-22](https://techcrunch.com/2025/01/22/scale-ai-is-facing-a-third-worker-lawsuit-in-about-a-month); [TechCrunch 2025-01-09](https://techcrunch.com/2025/01/09/scale-ai-hit-by-its-second-employee-wage-lawsuit-in-less-than-a-month); [The Register 2025-01-24](https://www.theregister.com/2025/01/24/scale_ai_outlier_sued_over/); [The Record, noyb](https://therecord.media/noyb-sues-scale-ai-for-worker-surveillance); [Euronews 2026-10-27](https://www.euronews.com/2026/10/27/why-should-big-tech-know-what-youre-working-on-scale-ai-accused-of-spying-on-ai-trainers); [Bloomberg Law layoffs suit](https://news.bloomberglaw.com/litigation/scale-ai-outlier-ai-hit-with-class-lawsuit-over-mass-layoffs)
- Mercor: Nov 2025 pay cut on a Meta-linked project (Nova, $16/hr, $5 less than the prior rate per Business Insider as relayed); Mercor disputes "inaccurate" claims. White v. Mercor.io Corporation (N.D. Tex., filed 2026-05-08) alleges more than 30,000 workers were misclassified; allegation only, no ruling found. Strength: medium for filing, weak for the rest of the pay story. Sources: [AOL/Business Insider](https://www.aol.com/articles/worlds-youngest-self-made-billionaires-204308445.html); [Law360](https://www.law360.com/tax-authority/articles/2475907)
- Mercor breach-related suits: at least seven contractor suits after a late-March 2026 LiteLLM supply-chain attack, per one aggregator. Strength: weak (aggregator) — [Pulse.bot](https://www.pulse.bot/legaltech/news/mercor-faces-five-contractor-lawsuits-over-alleged-dataprivacy-breach-cb1b8229-a021-44a9-be37-3b7bcc419582/). Note: the user lists the Mercor breach lawsuits as already known; this adds only the count.
- Mercor "Project L" mass offboarding (May 2026), with workers reportedly offered a similar project at lower pay. Strength: weak (single blog, breakingeven.online). — [Breaking Even](https://breakingeven.online/blog/mercor-project-l-mass-offboarding-may-2026)
- Micro1 (worker side, via third-party reviews): complaints center on screening (AI interview, Ava proctoring, generic rejections with no feedback), uneven work volume after placement, hourly roles restructured to pay-per-task, offboarding without explanation, and unresponsive support. One Reddit-based analysis reports non-payment is reported far less often than gatekeeping complaints. Strength: weak. None of the sources link to specific Reddit threads. — [Annotation Academy](https://annotation.academy/blog/is-micro1-legit); [Remote Work Union](https://www.remoteworkunion.com/blog/micro1-reviews-remote-workers-2026)
- Egocentric collection in India: reporting says factory workers film tasks on head-mounted phones for about 250 rupees (~$2.40)/hour; one post names Objectways as the collection firm with a subcontractor (Qanat Consulting Services) reportedly managing 2,000 workers with tracking bands. Subcontractor claim unverified. Consent reportedly obtained via factory management, not from workers. MIT Technology Review notes review of footage may not filter sensitive info beyond obvious identifiers. Strength: medium (press) for pay and consent; weak for the subcontractor figure. Sources: [Gulf News](https://gulfnews.com/amp/story/world%2Fasia%2Findia%2Ffrom-kitchens-to-factories-indians-train-future-robots-1.500571023); [MIT Technology Review 2026-04-01](https://www.technologyreview.com/2026/04/01/1134863/); [eWeek](https://www.eweek.com/news/factory-workers-cameras-ai-robot-training/); [Bitcoin.com/news reprint](https://news.bitcoin.com/everyday-chores-filmed-for-mere-pennies-an-hour-are-helping-to-refine-ai-technology-49201/)
- Chores-for-pay gig coverage (CNN syndicated, 2026-04-04) covers the general model. Strength: medium. — [ABC17/CNN](https://abc17news.com/money/cnn-business-consumer/2026/04/04/how-filming-your-chores-could-train-the-android-butlers-of-the-future/)

### Inferences
- Buyer pain is most visible where they build in-house after failing with vendors (Figure). The failure mode named is throughput, diversity, and quality, not price.
- Vendor-side lawsuits (misclassification, breach, surveillance) create legal exposure for vendors, and possibly for buyers who depend on them, but no buyer-side suit was found.

### Gaps
- No named buyer churn rates, contract-termination data, or buyer-side complaints beyond Figure's statement.
- Could not read Reddit, Glassdoor, or X directly; worker-side sentiment is from third-party summaries only.
- Did not verify whether Scale/Outlier settlement terms or current case status apply in 2026.
- No direct evidence of fake or recycled footage at a named vendor (see Q3).

## Q2. Vendor count, competition, spend, and hiring (2026)

### Takeaway
Vendor count is large and rising. The market is split: generic egocentric chore video is crowded and price-pressured, while buyers still pay for specialized, high-scale data. Vendors are hiring data quality and annotation-QA managers, not collector-fraud staff. No vendor-specific spend figures or headcount data were found.

### Cited Findings
- Vendor lists in 2026 include Encord, Claru, CloudPano, Unidata, Shaip, Prismax, Labelbox, Objectways, Micro1, Mecka, Scale/Outlier, Mercor, and others; comparison pages claim "the top" options. Strength: weak (vendor-authored best-of lists) — [Encord](https://encord.com/blog/best-data-collection-services/); [CloudPano](https://www.cloudpano.com/blog/the-9-best-data-collection-companies-for-robotics-and-physical-ai-2026); [Unidata](https://unidata.pro/blog/best-egocentric-data-providers-for-robotics/)
- Claru markets 500,000+ clips from 10,000+ contributors in 100+ cities, sample packs from $500, campaigns of 500+ clips in 2–4 weeks. Strength: weak (self-reported marketing) — [Claru](https://claru.ai/egocentric-video-datasets); [Claru pricing/timing](https://claru.ai/solutions/egocentric-video-data)
- Mecka AI is a New York startup (founded 2024) that gathers human demonstrations via paid gig operators with body sensors and iPhones; it is reportedly nearing a round led by Sequoia at about $500M (unconfirmed). Co-leads EgoVerse (April 2026; 79,692 episodes, 2,087 demonstrators per third-party guide). Strength: medium (podcast, job posting); valuation weak. — [Sequoia podcast](https://sequoiacap.com/podcast/inside-the-robot-data-factory-how-mecka-sensorizes-humans-to-train-robots); [Labellerr EgoVerse guide](https://www.labellerr.com/blog/egoverse-egocentric-robot-learning-dataset/)
- Objectways: 500M+ labels and 2,200+ annotators claimed by a competitor's comparison page (weak). A US remote VLA annotator posting pays $25/hr full-time (strong for pay, weak for scale). — [Remotive posting](https://remotive.com/remote/jobs/data/vision-language-action-vla-annotator-4548433); [CareerPlug posting](https://objectway-technologies-llc.careerplug.com/jobs/3343555)
- XDOF: a trade article says some labs already pay XDOF to collect robot training data; the only detailed source is promotional (aicerts.ai) and describes subscription and marketplace revenue. Strength: weak. — [Robot Today](https://robottoday.com/industry-briefing/collecting-robot-training-data-is-dirty-unglamorous-work-some-ai-labs-are-already-paying-xdof-to-do-it/6129); [AI Certs](https://www.aicerts.ai/news/?p=33930)
- Micro1: an "Interview for Ava" proctoring system, reported by review sites. Strength: weak.
- Hiring (strong, job postings, 2026):
  - Figure AI, Data Quality Manager (San Jose): build and lead a labeling team, own quality and throughput; $140K–$200K/yr; 5–10 yrs leading ops or data teams. — [Jobera](https://jobera.com/job/figureai-data-quality-manager-46668360/)
  - Mecka AI, Lead Data Quality (NYC): owns QA team and quality standards for robot training data; 5+ yrs data quality, 2+ yrs managing reviewers/auditors. — [TheLadders](https://www.theladders.com/job/human-data-architect-quality-mecka-ai-new-york-ny_87155009)
  - Nimble Robotics, Manager Data Quality & Annotation: $100K–$140K + equity; prefers candidates who have selected and managed offshore annotation vendors or stood up offshore teams. — [Accel jobs](https://jobs.accel.com/companies/nimble-robotics-2/jobs/91061356-data-quality-annotation-manager)
  - Instawork Robotics Labs, Head of QA (YC): 10+ yrs in manufacturing/robotics. — [YC listing](https://www.ycombinator.com/companies/instawork/jobs/mQmOdXL-head-of-quality-assurance-instawork-robotics-labs)
  - Labelbox, Robotics Data Pipeline & QA Engineer: automated QA using heuristics, statistics, and LLM-based validation (engineering-led QA). — [Labelbox Greenhouse](https://job-boards.greenhouse.io/labelbox/jobs/5003648007)
  - Mind Robotics, QA Reviewer (Palo Alto): 2–4 yrs annotation QA. — [a16z jobs](https://jobs.a16z.com/jobs/mind-robotics/fedfb4f0-42b7-43e1-a83a-01f2c53eda75--qa-reviewer-data-annotation)
- Hiring pattern inference: buyers and vendors both hire QA leads with annotation-vendor management experience. Nobody in the postings we found is hiring for collector fraud, hardware logistics, or payouts specifically.
- Figure's in-house Index: $15M paid to Creators to date (company claim). — [HowAIWorks](https://howaiworks.ai/figure-index-robot-training-dataset-2026/)

### Inferences
- Vendors' most visible spend is on QA and annotation-management leadership, which implies quality control is a recurring cost they carry.
- The "commoditized" framing is supported for generic chore video (vendor pricing and crowded lists), but a few sources say the number of vendors able to deliver high-scale, diverse egocentric data is small, which suggests a gap in the high-end.

### Gaps
- No headcount, tooling spend, or hardware-cost figures for any vendor.
- No job postings found for collector recruiting, fraud/trust-and-safety, or hardware logistics roles at these vendors. Not confirmed absent; my searches did not target those specifically.
- Count of 2026 robot-data vendors not established; the lists above are vendor-authored and overlapping.

## Q3. Build vs buy tooling, and fraud in crowdsourced collection

### Takeaway
Fraud by collectors (fake, recycled, or low-effort footage) was NOT documented in any source I found. The only quality evidence is generic (about half of footage unusable; Figure's need for filtering and dedup). Vendors describe AI plus human review as the main check. Figure built its collection app in-house. No vendor's tool stack was named.

### Cited Findings
- MIT Technology Review reports videos are reviewed by AI and a human and either accepted or rejected. — [MIT TR 2026-04-01](https://www.technologyreview.com/2026/04/01/1134863/)
- Figure's Index pipeline is described as including "fraud detection, deduplication, rebalancing" (company-described). — [HowAIWorks](https://howaiworks.ai/figure-index-robot-training-dataset-2026/)
- Labelbox is hiring for automated QA flows using heuristics, statistics, and LLM validation. — [Labelbox Greenhouse](https://job-boards.greenhouse.io/labelbox/jobs/5003648007)
- Mecka describes its pipeline as using body sensors and iPhones with a head strap (EgoVerse capture spec). — [Labellerr EgoVerse guide](https://www.labellerr.com/blog/egoverse-egocentric-robot-learning-dataset/)
- Several vendors (CloudPano, Claru) say footage is delivered with faces, plates, and screens blurred. Strength: weak (marketing). — [CloudPano](https://www.cloudpano.com/blog/why-robotics-labs-are-buying-egocentric-video)

### Inferences
- The fraud problem is plausible given the crowd model (paid gig collectors, per-clip pay) and the known usable-footage rate, but I have no named case. Treat "fake footage" as a hypothesis, not a documented pain.
- Build vs buy: at least Figure built in-house; vendors appear to buy or assemble review and annotation tooling (Labelbox, others). No vendor-specific tool list was found.

### Gaps
- No documented case of fake, recycled, or duplicate submissions at a named vendor. Searches for "fake footage" and "fraud" returned only general coverage.
- Could not establish fraud rate, reject rate, or per-vendor QA cost.
- Unknown what collector-side tooling (ID verification, duplicate detection, device attestation) vendors buy.

## Q4. Which side has the more burning, badly served pain

### Takeaway
On current evidence, the buyer side has the stronger pain signal (quality and throughput failures prompting in-house builds, with QA leadership hiring), while the vendor side's most visible pain is legal and labor exposure (misclassification, breach, pay cuts), not a tool gap a startup could sell into. Neither side shows clear spend on a painful workaround that a new tool would replace; the buyer side is the better-supported candidate, but the buyer pool is small.

### Cited Findings
- Figure: vendors failed its quality/throughput bar; built in-house (medium). — see Q1.
- Quality/QA hiring at Figure, Mecka, Nimble (strong, job postings). — see Q2.
- A founder reports the buyer network is "a couple hundred" people globally who approve spend on such data (weak, aggregator). — [Youmind repost](https://youmind.com/landing/x-viral-articles/robotics-data-broken-business)
- Vendor legal exposure: Scale/Outlier suits, Mercor misclassification (30,000 workers alleged) and breach suits (medium for filing, weak for current status). — see Q1.

### Inferences (for ICP work)
- Buyer side: the burning pain is "collected data doesn't meet spec, at volume, and needs filtering" (quality, throughput, diversity). Evidence of spend: QA leadership salaries of $100K–$200K, and an in-house pipeline built by at least one lab. Urgency is tied to model training cycles (inferred, not sourced). Existing vendors serve it poorly per Figure's claim. Small buyer count is the main risk.
- Vendor side: labor and legal pain (misclassification, pay disputes, breach) is burning and recurring, but a startup product that fixes it would be compliance/HR, not robot-data tooling. Vendor QA and collector management pain is plausible from the QA-hiring pattern but not directly evidenced with spend or deadlines.
- Candidate ICP (provisional, to be weighed by the lead): robot labs and mid-size humanoid/embodied companies that already fund a QA or data-ops team and have tried outside vendors. Vendor-side candidates: mid-size collection vendors that run crowd collectors and must prove quality to buyers, but evidence is thinner.

### Gaps
- No vendor-side budget or contract data.
- No evidence of deadlines tied to specific vendor pain beyond general model-training timelines.
- Worker-community sentiment rests on third-party summaries; direct Reddit, Glassdoor, and X review was not performed.

## Source quality summary
- Strong: job postings (Figure, Mecka, Nimble, Labelbox, Mind Robotics, Objectways VLA annotator); court filings and suit reports (Scale/Outlier, Mercor White v. Mercor.io via Law360 summary).
- Medium: TechCrunch, The Register, Bloomberg Law, MIT Technology Review, Gulf News, eWeek, ArcWeb reprint of Figure statement, Sequoia podcast.
- Weak: vendor marketing (Claru, CloudPano, Encord, Unidata, Prismax), SEO and affiliate reviews (Annotation Academy, Remote Work Union, Micro1 review sites), aggregators (Youmind, Pulse.bot, Breaking Even), XDOF promotional page.
