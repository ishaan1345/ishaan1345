# Robot Foundation Model Labs: Training and Evaluation Bottlenecks

Scope note: about 14 tool calls, mostly WebSearch standard mode plus two WebFetch reads. Coverage is strongest for Physical Intelligence, Generalist, Skild, Dyna, Genesis and Mecka. Google DeepMind, TRI, Meta FAIR and NVIDIA GEAR were not researched in depth (see Gaps). No "No Priors", "Latent Space" or "The Robot Brains" transcripts were read. Most lab claims are company-reported and are labeled as such. Evidence strength follows the brief: strong = job postings, named-buyer quotes, contracts, budgets, headcount; medium = exec interviews, reputable press; weak = vendor marketing, aggregators, SEO pages.

## Q1. What do labs say slows them most?

### Takeaway
Labs describe data scale and data quality as the constraint on pretraining, and real-world evaluation as immature and fragmented. Their stated bottlenecks differ: Mecka's CEO stresses curated data supply, Generalist stresses teleoperation throughput, and Physical Intelligence's Sequoia interview says intelligence, not hardware, is the limit. Few labs name evaluation as the main constraint in their own words.

### Cited Findings
- Mecka CEO Josh Gao: robotics lacks free internet-scale data, "we don't have access to a large amount of this curated, processed, clean data"; the mix is converging on roughly a million hours of human data, tens of thousands of hours of robot data, and "a couple of hours" of in-domain demonstration; force and tactile hardware "takes several product cycles" to develop — [Sequoia Training Data podcast, Mecka](https://sequoiacap.com/podcast/inside-the-robot-data-factory-how-mecka-sensorizes-humans-to-train-robots) (medium, exec interview, read via WebFetch summary)
- Generalist says GEN-0 shows scaling laws with more pretraining data and compute; the pretraining set is over 270,000 hours of real-world manipulation data, growing about 10,000 hours a week; 1B-parameter models saturated early while 6B and 7B did better — [Generalist GEN-0 blog](https://generalistai.com/blog/gen-0) (company claim, primary, medium)
- Generalist says traditional teleoperation yields slower, less fluid data because of missing force feedback, latency and visibility issues; GEN-1 reportedly reaches GEN-0-level performance with roughly 10x less task-specific data — [The Robot Report on GEN-1](https://www.therobotreport.com/generalist-introduces-gen-1-general-purpose-model-for-physical-ai/) (company claim, medium)
- Sources conflict on how Generalist's GEN-0 data is collected: one Substack calls it teleop data, one 36Kr article calls it human operation video, and Generalist's own text says "real-world manipulation data" — [Substack commentary](https://theahura.substack.com/p/tech-things-robotics-has-its-gpt2); [36Kr](https://eu.36kr.com/en/p/3551715251804547). Not resolved.
- Physical Intelligence co-founders Karol Hausman and Tobi Springenberg argue on Sequoia's podcast that the limit is intelligence rather than hardware — [Sequoia / Pulse summary](https://www.pulse.bot/venture-capital/video/training-general-robots-for-any-task-physical-intelligences-karol-hausman-and-tobi-springenberg-fb54128b-7e73-455e-b2a4-cc69c1f7e517/) (medium-weak, third-party summary of a podcast)
- Physical Intelligence's pi0.7 abstract says its training data includes "potentially suboptimal (autonomous) data including failures, and data from non-robot sources"; the abstract does not give a limitations section or a real-robot eval protocol — [arXiv 2604.15483](https://arxiv.org/abs/2604.15483) (primary, read via abstract only)
- A 2026 VLA survey (582 papers, per a search snippet; the linked page was not verified as that survey) says real-world evaluation is fragmented, with no widely adopted standard, few trials per task, and lab-specific hardware, scenes, resets and success criteria — [arXiv 2604.24447 (link from search, unverified)](https://arxiv.org/html/2604.24447) (medium if confirmed; currently unverified)
- Habilis-beta paper argues VLA evaluation is "largely confined to single-trial success rates under curated resets" and proposes continuous-run metrics; its own humanoid logistics numbers are 124 TPH vs 19 TPH for pi0.5 — [arXiv 2602.18813](https://arxiv.org/html/2602.18813) (authors' own results, weak-medium)
- A vendor blog citing arXiv 2605.29710 says real-world VLA evaluations typically use 25 or fewer rollouts without confidence intervals — [vendor blog, via search](https://humansignal.com/blog/vla-robot-data-problem) (weak; secondhand; original not checked)
- Penn PAL lab ran an external "Evaluating pi0 in the Wild" study — [Penn PAL](https://penn-pal-lab.github.io/Pi0-Experiment-in-the-Wild) (academic, medium; shows external eval of a lab model exists, not what labs pay for)

### Inferences
- The labs' own language points to data supply and data quality as the top constraints. Real-world evaluation is mentioned as immature, not as the top priority. This cuts against a "eval is the burning pain" thesis for frontier labs.
- Teleop throughput and hardware (force/tactile) are named as slowing factors by Generalist and Mecka. These are areas where buyers spend money on data-collection capacity.

### Gaps
- No primary statement found from Physical Intelligence, Skild, Dyna or Genesis naming real-world eval as their main constraint.
- Did not check the pi0.6 / pi*0.6 paper's limitations section directly. Search results gave only secondhand claims.
- No quote on hardware uptime or robot fleet downtime from any lab.

## Q2. How do labs evaluate policies in the real world today? Cost in people, robots, time? Hiring?

### Takeaway
Labs run real-world evals in-house with operators and robot fleets. Job postings show paid evaluation-operator roles at roughly $30–45/hour and some evaluation-pipeline engineering roles at Skild and World Labs. No public figure exists for robot-hours or cost per real-world evaluation. Labs and academics describe small trial counts and no standard protocol.

### Cited Findings
- Skild AI Research Engineer, Post-training & Deployment posting includes building "robust testing and evaluation pipelines" for tracking model improvements and corner cases — [Resumegeni aggregator listing for Skild](https://resumegeni.com/jobs/research-engineer-post-training-deployment-skildai-careers-cd420c83a1) (strong if confirmed on Skild's Greenhouse page; aggregator text only, so medium-weak here)
- Model Evaluation Operator (Swing Shift), Milpitas, on CareerBuilder; RoboForce's posting describes an operator who evaluates, validates and improves robot AI through structured real-world testing, logs failures, and runs set reset procedures; JobGrid lists USD 30–35/hour — [CareerBuilder](https://www.careerbuilder.com/job-details/model-evaluation-operator-swing-shift-milpitas-ca--d9c2c83c-903b-497e-847d-8abc6102f250); [JobGrid](https://jobgrid.eu/en/jobs/model-evaluation-operator-swing-shift-roboforce/) (strong for existence of a paid eval-operator role; RoboForce is a robotics company, not a foundation-model lab)
- Figure humanoid operator role, San Jose, $35–45/hour, to teach robots new behaviors — [Inferencejobs](https://inferencejobs.com/companies/figure/jobs/humanoid-robot-operator) (strong-ish as a posting, aggregator copy, medium-weak)
- Physical Intelligence operator role in Brisbane listed at $52,000, framed as training the AI — [Tallo listing, search snippet](https://tallo.com/talent/job/engineering/robotics-technician/ca/brisbane/robot-operator-0ae52f7e) (weak; aggregator; the listing was not opened and its PI attribution was not confirmed)
- Mind Robotics (Palo Alto) operator posting in an Operations function mentions hiring several teleoperation leads — [Eclipse Capital job board](https://jobs.eclipse.capital/companies/mind-robotics/jobs/79265388-robot-operator) (strong-ish, posting; not a VLA lab but a robot-AI company)
- Lila Sciences (Cambridge, MA) Senior II/Staff Robotics Platform Evaluation Engineer, posted Oct 10 2026, USD 136,800–217,866 plus equity; must validate arm reachability in simulation before hardware testing — [General Catalyst job board](https://jobs.generalcatalyst.com/companies/lila-sciences-2/jobs/96544973-senior-ii-staff-robotics-platform-evaluation-engineer) (strong, posting; Lila is a science company, not a VLA lab; hardware eval is in-house)
- World Labs research engineer (robot learning) builds end-to-end training and evaluation workflows for robot policies — [EmployBL](https://www.employbl.com/jobs/research-engineer-scientist-robot-learni-world-labs-1618810) (strong-ish posting; aggregator)
- Dyna Robotics reports 99%+ success over 24 hours of non-stop operation and 16-hour-a-day customer sites; DYNA-2 at one customer reportedly 87% pass rate vs 46% for DYNA-1 — [Unite.AI / Runtime Wire / related coverage](https://www.unite.ai/dyna-robotics-trains-dyna-2-on-a-million-hours-of-human-video-no-robot-data/); [Runtime Wire](https://runtimewire.com/article/dyna-robotics-dyna-2-human-video-robotics-scaling-law) (company-reported, weak-medium; no independent audit; search found no published eval method)
- Physical Intelligence pi0.6 secondhand: 92% autonomy on a laundry robot and 165 items/hour in a warehouse, citing co-founder Sergey Levine — [Robohorizon](https://robohorizon-hugo.pages.dev/en-us/news/2026/02/physical-intelligence-ai-hits-92-autonomy-in-real-world-robot-trials) (weak; secondhand)
- Mecka's Gao says "benchmarking and evals have just started to mature across robotics" and cites a target of "four nines of reliability" in real settings without describing the method — [Sequoia podcast](https://sequoiacap.com/podcast/inside-the-robot-data-factory-how-mecka-sensorizes-humans-to-train-robots) (medium; exec interview; no eval method given)
- Vendor-side eval/benchmark companies exist (Robocurve, RoboArena, AutoEval etc.) — not re-researched per brief.

### Inferences
- Real-world eval is done with in-house operators on owned fleets. Paid operator roles are the clearest spend signal in the set (about $30–45/hour), but they are generic labor, and no posting confirms they are outsourced.
- Engineers building eval pipelines appear at Skild and World Labs. That is headcount, which is a strong buying signal for tooling, but it does not show labs paying outside vendors for eval.
- Dyna's and Genesis's claims point to a shift from research evals to customer-site validation. Their evals are self-reported.

### Gaps
- No cost figure for robot-hours or cost per real-world eval from any lab.
- No evidence found of a lab naming real-world eval as a bottleneck in an interview or blog.
- Did not verify which eval postings sit on lab Greenhouse/Lever pages versus aggregators.

## Q3. Evidence that labs buy outside services (data, eval, teleop, annotation); what they say is missing

### Takeaway
Outside data vendors serve robot labs, mainly for teleop and human-egocentric data. The clearest buyer quote is Mecka's CEO saying many "robotics foundation labs" will license data, but no named customer or price is public. Evaluation is not shown to be bought from outside vendors. Vendor spend figures found are weak or unverified.

### Cited Findings
- Mecka says it will "ultimately license a lot of the data that goes into training these robotics foundation models"; pre-training is "quite a large market"; it has not named a customer; enterprise post-training and deployment services are a future segment, not yet proven — [Sequoia podcast](https://sequoiacap.com/podcast/inside-the-robot-data-factory-how-mecka-sensorizes-humans-to-train-robots) (medium; no pricing or contract details)
- Mecka raised $60M (reported); a Sequoia-led round at about $500M valuation was reported as in talks, with sources disagreeing on whether it closed — [Runtime Wire](https://runtimewire.com/article/sequoia-mecka-ai-500m-robot-training-data); [TechFunding News](https://techfundingnews.com/mecka-ai-raises-60m-from-sequoia-and-nvidia-to-pay-people-to-teach-robots-how-humans-move/) (medium press; valuation conflicting)
- XDOF raised $70M (June 17 2026, SiliconANGLE) — [SiliconANGLE](https://siliconangle.com/2026/06/17/robotic-teleoperation-data-startup-xdof-launches-70m-funding/) (medium press)
- Mecka estimated at $100M annualized revenue by June 2026 — unverified claim from an aggregator — [StartupFortune](https://startupfortune.com/mecka-ai-turns-robot-training-data-into-a-startup-category/) (weak; aggregator-style, unverified)
- Encord says it collects teleop/egocentric data in its own facilities; per TechCrunch (July 2026), its robotics push is still partly a trial — [Encord](https://encord.com/robotics-and-humanoids/); [TechCrunch](https://techcrunch.com/2026/07/26/are-brain-waves-the-next-unlock-for-physical-ai/) (vendor marketing + medium press)
- Genesis AI piloting with LG CNS (announced June 16 2026); the joint playbook covers workflow documentation, data collection, post-training and validation — [Genesis press release](https://www.genesis.ai/press/partnering-with-lg-cns) (company, medium; partner-side pilot, not an eval purchase by a lab)
- Genesis AI says it is "engaging with partners" to deploy its data glove in real facilities and is considering third-party data collection — [Robotics247 / Genesis press release](https://www.robotics247.com/article/genesis-ai-unveils-gene-26.5-robotic-brain-that-enables-human-level-physical-manipulation/supply_chain) (company, medium)
- Scale AI reportedly combines synthetic data with real teleop capture; Meta holds a large stake — [CB Insights](https://www.cbinsights.com/esp/enterprise-tech/development/robot-demonstration-data-providers) (weak; aggregator)
- Sequoia/TechCrunch analysis suggests humanoid makers may prefer to buy data pipelines rather than rely on outside vendors if proprietary data is the moat — [TechCrunch](https://techcrunch.com/?p=3163323) (medium press; analysis, not confirmed purchasing)

### Inferences
- Data buying is the proven outside spend. Teleop and egocentric data have a market (Mecka, XDOF, Scale, Encord), though named lab customers are not public.
- Real-world eval as an outsourced service is not evidenced. Labs hire operators and eval engineers, and no lab was found saying vendors serve eval badly.
- "What is missing" from vendors (per Mecka and Generalist): force/tactile data, data quality and fraud control, deployment-grade in-domain demos. These are data-quality complaints, not eval complaints.

### Gaps
- No contract, budget or named-lab pilot for any vendor found in 2026 sources.
- Did not check Scale, micro1, Mercor or Labelbox robot offerings directly.

## Q4. Deadlines driving labs (release cadence, pilots, fundraises)

### Takeaway
Some release cadence is visible: Generalist released GEN-0 in November 2025 and GEN-1 about five months later. Genesis announced GENE-26.5 in May 2026 and an LG CNS pilot in June 2026. Fundraises are frequent (Mecka, XDOF, Dyna's $120M in Sept 2025). Customer pilot deadlines were not found in detail.

### Cited Findings
- GEN-0 blog dated Nov 4 2025; GEN-1 announced about five months later — [Generalist blog](https://generalistai.com/blog/nov-04-2025-GEN-0); [Robot Report](https://www.therobotreport.com/generalist-introduces-gen-1-general-purpose-model-for-physical-ai/) (company, medium)
- Genesis GENE-26.5 announced May 6 2026; LG CNS pilot release June 16 2026 — [Genesis press](https://www.genesis.ai/press/press-release-gene-265); [Genesis / LG CNS](https://www.genesis.ai/press/partnering-with-lg-cns) (company, medium; one source dates GENE-26.5 to 2025, conflicting)
- Dyna raised $120M (Sept 2025) — [Rocking Robots / Robotics Tomorrow](https://www.roboticstomorrow.com/news/2025/09/16/dyna-robotics-raises-120-million-to-advance-robotic-foundation-models-on-the-path-to-physical-artificial-general-intelligence/25534/) (medium press)
- Skild's Series A ($300M, 2024) was meant to fund hiring across AI, robotics and operations — [Skild blog](https://www.skild.ai/blogs/announcing-our-300m-series-a) (company, medium; dated)

### Inferences
- The most concrete deadline signal is customer-pilot validation in 2026 (Genesis/LG CNS). Pilot validation work is where paid eval demand would appear.
- Release cadence of roughly 5–6 months at Generalist implies recurring eval demand per release, but no source ties cadence to a vendor purchase.

### Gaps
- No primary source on Physical Intelligence, Skild or Dyna release calendars for 2026.
- No customer pilot deadline quoted by a lab with a dollar value.

## Q5. Which lab sub-segment has the most acute, paid pain?

### Takeaway
Best-supported hypothesis, not a proven one: labs moving from research demos to paid customer deployments (Dyna, Genesis with LG CNS, Skild's post-training and deployment team) face the most acute demand for repeatable real-world validation, and they already pay operators at about $30–45/hour and staff eval-pipeline engineers. The evidence is thin. No lab was found paying an outside vendor for eval, and the data-supply market is where paid vendor spend is visible.

### Cited Findings
- Paid operator spend exists at $30–45/hour (see Q2 sources).
- Skild posts for eval-pipeline work tied to deployment (Q2 source).
- Genesis-LG CNS pilot includes a validation step tied to a customer deployment (Q4 source).
- Dyna reports customer-site operation and per-customer pass-rate comparisons (Q2 source; company-reported).
- Mecka says enterprise post-training and deployment is a future segment, unproven (Q3 source).

### Inferences (ICP hypothesis, to test)
- Strongest candidate: post-training/deployment teams at robot foundation-model companies that have started paid customer pilots (Genesis, Dyna, Skild-type). They have a deadline (pilot acceptance), recurring need (every new customer site and robot body), and in-house headcount spending on operators and eval engineers.
- Pain is recurring and deadline-bound, which matches the brief. What is unproven: whether they pay money to outside vendors for eval, not just for data. As of this research, existing vendors (Scale, Mecka, XDOF, Encord) are shown serving data and teleop, not real-world eval, so the eval gap is plausible but not shown to be "served badly".
- Pre-training data labs (Generalist, PI) have less acute eval pain on the public record; their stated constraint is data scale and teleop quality, which vendors (Mecka, XDOF) already address.
- Strength of this ICP call: medium-weak. Two of the four burning-pain criteria (spend, deadline) have partial support. Recurrence is inferred. Vendor failure is not evidenced.

### Gaps
- Need named-buyer evidence: a lab eval contract, an RFP, or an eval-operator agency engagement.
- Need the cost of a real-world eval (robot-hours and operator-hours per model release). None found.
- Need to check whether labs outsource eval operators through staffing agencies (RoboForce-style operator roles may be contracted).
- Not researched: Google DeepMind robotics, TRI, Meta FAIR robotics, NVIDIA GEAR, podcasts (No Priors, Latent Space, The Robot Brains), conference talks, X posts.
