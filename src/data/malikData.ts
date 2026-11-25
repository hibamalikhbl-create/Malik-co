export type ProjectCategory = 'all' | 'civil' | 'highrise' | 'highways' | 'industrial';

export interface StructuralLayer {
  id: string;
  index: string;
  name: string;
  elevation: string;
  spec: string;
  summary: string;
  highlights: string[];
}

export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  kicker: string;
  description: string;
  metrics: string[];
  span: 'wide' | 'standard';
  artType: 'culverts' | 'highrise' | 'highways' | 'industrial';
}

export interface LandmarkProject {
  id: string;
  title: string;
  city: string;
  province: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  year: string;
  valuePkr: string;
  scaleMetric: string;
  concreteVolume: string;
  pecGrade: string;
  duration: string;
  imageSrc: string;
  imageAlt: string;
  imageFocus?: 'top' | 'center';
  summary: string;
  engineeringChallenge: string;
  solutionDelivered: string;
  deliverables: string[];
  artType: 'culverts' | 'highrise' | 'highways' | 'industrial';
}

export interface FieldPhotoItem {
  id: string;
  src: string;
  title: string;
  location: string;
  caption: string;
  focus: 'top' | 'center';
  featured?: boolean;
}

export interface HeritageDecade {
  year: string;
  era: string;
  title: string;
  cityFocus: string;
  milestoneMetric: string;
  description: string;
  keyArtifact: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  organization: string;
  projectRef: string;
}

export const FIELD_GALLERY: FieldPhotoItem[] = [
  {
    id: 'rcc-trunk-pipeline',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.29_AM_04fde0bc.jpeg',
    title: 'Precast RCC Trunk Sewerage & Culvert Line',
    location: 'Urban Corridor · Karachi',
    caption: 'Heavy bell-spigot reinforced concrete drainage pipes staged along commercial storefronts prior to trench lowering.',
    focus: 'center',
    featured: true,
  },
  {
    id: 'earthworks-mobilization',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.25_AM_abff1430.jpeg',
    title: 'Bulk Earthworks & Sector Grading Inspection',
    location: 'Housing & Infrastructure Sector',
    caption: 'Malik & Co. engineering supervisors reviewing sub-grade earthmoving and wheel-loader operations on site.',
    focus: 'top',
    featured: true,
  },
  {
    id: 'liaquatabad-flyover-corridor',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.26_AM_4626e167.jpeg',
    title: 'Flyover Corridor Utility & Sub-Base Works',
    location: 'Liaquatabad · Karachi',
    caption: 'On-site briefing with trenching crews beneath the elevated concrete flyover viaduct during active corridor works.',
    focus: 'top',
  },
  {
    id: 'pumping-station-turbines',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.32_AM__1__6cc60fc1.jpeg',
    title: 'Vertical Turbine Pumping Station Assembly',
    location: 'Municipal Water & Drainage',
    caption: 'Dual high-capacity vertical turbine pump motors, sluice valves, and steel discharge manifold over concrete sump.',
    focus: 'center',
  },
  {
    id: 'pumping-manifold-inspection',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.32_AM__2__e4f053ac.jpeg',
    title: 'Pump House Mechanical & Civil Retrofit',
    location: 'Municipal Sump Facility',
    caption: 'Senior engineer inspecting centrifugal booster pump coupling, suction piping, and reinforced concrete plinths.',
    focus: 'top',
  },
  {
    id: 'arterial-trench-excavation',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.28_AM_cf82b409.jpeg',
    title: 'Main Arterial Road Deep Trenching',
    location: 'Urban Trunk Road',
    caption: 'Open-cut utility trench excavation and live pipeline alignment review beside active city traffic.',
    focus: 'top',
  },
  {
    id: 'manhole-shaft-check',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.26_AM__1__dcaacfd9.jpeg',
    title: 'Deep Manhole & Sub-Surface Chamber Inspection',
    location: 'Commercial Market Lane',
    caption: 'Direct field inspection of brick-lined deep sewer shaft and sub-surface connection in dense market zone.',
    focus: 'top',
  },
  {
    id: 'field-quality-supervision',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.27_AM__1__cc6760ae.jpeg',
    title: 'Daily Roadbed & Trench Quality Control',
    location: 'Active Municipal Site',
    caption: 'Project leadership verifying backfill compaction and road restoration tolerances with field technical staff.',
    focus: 'top',
  },
  {
    id: 'street-crew-briefing',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.27_AM_ce99d27a.jpeg',
    title: 'Contractor & Foreman Coordination',
    location: 'Commercial Bazaar Sector',
    caption: 'Coordinating morning work fronts, utility truck deliveries, and shopfront access protection with site foremen.',
    focus: 'top',
  },
];

export const PRACTICE_DISCIPLINES = [
  'Architectural',
  'Structural',
  'Construction',
  'Interior Design',
  'MEP',
  'Planning & Development',
];

export interface ServiceDetailItem {
  id:
    | 'structural-analysis'
    | 'geotechnical'
    | 'concrete-tech'
    | 'steel-structures'
    | 'transportation'
    | 'environmental'
    | 'water-resources'
    | 'urban-planning'
    | 'construction-mgmt'
    | 'hydraulics'
    | 'surveying';
  title: string;
  discipline: string;
  description: string;
}

export const ALL_SERVICES: ServiceDetailItem[] = [
  {
    id: 'structural-analysis',
    title: 'Structural Analysis',
    discipline: 'Seismic & Load Modeling',
    description:
      'Finite-element frame analysis, wind/seismic lateral drift verification, and post-tensioned slab design for commercial towers and civic structures.',
  },
  {
    id: 'geotechnical',
    title: 'Geotechnical Engineering',
    discipline: 'Soil Strata & Foundations',
    description:
      'SPT borehole investigations, bearing capacity evaluation, dewatering systems, raft slabs, and bored cast-in-situ pile foundations.',
  },
  {
    id: 'concrete-tech',
    title: 'Concrete Technology',
    discipline: 'Mix Design & Rebar QA',
    description:
      'High-strength OPC/SRC concrete batching, Grade-60 steel cage detailing, slump verification, and 7/28-day cube compression testing.',
  },
  {
    id: 'steel-structures',
    title: 'Steel Structures',
    discipline: 'Bridges & Clear-Span Portals',
    description:
      'Pre-engineered steel warehouses, arched pedestrian pedestal bridges, heavy crane girders, and bolted structural steel fabrication.',
  },
  {
    id: 'transportation',
    title: 'Transportation Engineering',
    discipline: 'Highways & Interchanges',
    description:
      'Arterial road networks, NHA-grade asphaltic pavements, interchange ramps, box culverts, and heavy-axle freight corridors.',
  },
  {
    id: 'environmental',
    title: 'Environmental Engineering',
    discipline: 'Treatment & Sanitation',
    description:
      'Municipal wastewater clarifiers, industrial effluent treatment plants, solid-waste drainage protection, and site environmental compliance.',
  },
  {
    id: 'water-resources',
    title: 'Water Resources',
    discipline: 'Canals, Dams & Storage',
    description:
      'Lined irrigation channels, flood-protection embankments, stormwater detention reservoirs, and spillway headwork civil structures.',
  },
  {
    id: 'urban-planning',
    title: 'Urban Planning',
    discipline: 'Housing & Commercial Zones',
    description:
      'Master-planned housing sectors, commercial retail plaza layouts, road hierarchies, and integrated underground utility corridors.',
  },
  {
    id: 'construction-mgmt',
    title: 'Construction Management',
    discipline: 'BOQ, CPM & Site Execution',
    description:
      'End-to-end project scheduling, tender BOQ estimation, subcontractor coordination, tower-crane logistics, and HSE site safety.',
  },
  {
    id: 'hydraulics',
    title: 'Hydraulics',
    discipline: 'Pumping & Trunk Pipelines',
    description:
      'High-head pumping stations, vertical turbine manifolds, flanged gate-valve chambers, and large-diameter RCC/DI pressure mains.',
  },
  {
    id: 'surveying',
    title: 'Surveying',
    discipline: 'Total Station & Drone GIS',
    description:
      'Topographical contour mapping, drone aerial corridor surveys, plot grid chalk demarcation, and as-built laser elevation checks.',
  },
];

export const STRUCTURAL_LAYERS: StructuralLayer[] = [
  {
    id: 'superstructure',
    index: '04',
    name: 'RCC Superstructure & Cladding',
    elevation: 'Upper RCC Frame',
    spec: 'Grade-60 Deformed Steel · 5,000 PSI Concrete',
    summary:
      'Seismic Zone 2B compliant moment-resisting reinforced concrete frames engineered for urban commercial towers and institutional campuses in Karachi and Sialkot.',
    highlights: [
      'Post-tensioned flat slabs reducing floor-to-floor dead load by 18%',
      'Thermal double-glazed facade integration for peak Pakistani summer loads',
      'Laser-leveled elevator shafts & shear core tolerances within ±4mm',
    ],
  },
  {
    id: 'podium',
    index: '03',
    name: 'Plinth, Podium & Pitched Annex',
    elevation: 'Ground & Podium Level',
    spec: 'Waterproofed Basement Retaining Walls',
    summary:
      'Deep basement parking decks and civic ground-level structures protected against high water-table seepage common in Sialkot plains and coastal Karachi.',
    highlights: [
      'Crystalline integral waterproofing & bentonite membrane barriers',
      'Heavy-load transfer girders supporting column-free retail lobbies',
      'Integrated fire-suppression and HVAC riser shafts',
    ],
  },
  {
    id: 'culvert',
    index: '02',
    name: 'Storm Culverts & Utility Mains',
    elevation: 'Sub-Surface Culvert Line',
    spec: 'Ø 1200mm Precast RCC Pipes · Monsoon Grade',
    summary:
      'High-capacity stormwater box culverts, precast concrete pipe conduits, and municipal sewerage trunk lines built to withstand peak July–August monsoon surges.',
    highlights: [
      'Sulfate-resistant OPC cement formulation for sub-surface longevity',
      'Rubber-ring gasketed joints tested under 2.5 bar hydrostatic pressure',
      'Laser-graded trench excavation with zero disruption to adjacent roads',
    ],
  },
  {
    id: 'foundation',
    index: '01',
    name: 'Geotechnical Piling & Raft Base',
    elevation: 'Deep Foundation Base',
    spec: 'Bored Cast-in-Situ Piles · Compaction 98% MDD',
    summary:
      'Soil-specific bearing solutions calibrated from SPT borehole logs across coastal marine clay in Karachi and alluvial clay-silt strata in Sialkot.',
    highlights: [
      'Static & dynamic pile integrity testing (PIT) on 100% of structural piles',
      'Compacted crushed-stone sub-base with geotextile separation fabric',
      'Anti-termite & salinity barrier treatment prior to blinding concrete',
    ],
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'civil-culverts',
    number: '01',
    title: 'Civil Works, Culverts & Drainage Mains',
    kicker: 'Municipal & Estate Infrastructure',
    description:
      'Precast RCC storm-drainage networks, box culverts, water-pumping stations, and underground utility corridors engineered for Pakistan’s monsoon discharge cycles and expanding housing authorities.',
    metrics: ['Up to Ø 2400mm RCC Pipe', '98% MDD Trench Compaction', 'Zero-Leak Jointing'],
    span: 'wide',
    artType: 'culverts',
  },
  {
    id: 'highrise-rcc',
    number: '02',
    title: 'Commercial Plazas & High-Rise RCC',
    kicker: 'Seismic Zone 2B/3 Structures',
    description:
      'Turnkey grey structure and architectural finishing for corporate towers, retail shops, hospitals, and multi-basement parking facilities.',
    metrics: ['4,000–6,000 PSI Mix', 'ASTM A615 Grade-60', '22+ Storeys Proven'],
    span: 'standard',
    artType: 'highrise',
  },
  {
    id: 'highways-earthworks',
    number: '03',
    title: 'Highways, Pedestal Bridges & Earthworks',
    kicker: 'PEC C-A Heavy Equipment Fleet',
    description:
      'Bulk site grading, asphaltic concrete paving, retaining walls, and pedestrian pedestal bridges executed with our in-house excavator and batching fleet.',
    metrics: ['48+ Heavy Machines', 'NHA Specification Class', 'GPS-Graded Sub-Base'],
    span: 'standard',
    artType: 'highways',
  },
  {
    id: 'industrial-portals',
    number: '04',
    title: 'Industrial Plants & Pumping Facilities',
    kicker: 'Karachi (Main) · Sialkot (Est. 1979)',
    description:
      'Wide-span pre-engineered steel portals, heavy turbine & pumping station foundations, and laser-screeded industrial floors for export factories and municipal utilities.',
    metrics: ['36m Clear-Span Trusses', 'FM2 Super-Flat Slabs', 'Rapid Delivery'],
    span: 'wide',
    artType: 'industrial',
  },
];

export const LANDMARK_PROJECTS: LandmarkProject[] = [
  {
    id: 'surjani-pumping-station-kwsb',
    title: 'Surjani Pumping Station & Chlorination Complex (KWSB)',
    city: 'Karachi',
    province: 'Sindh',
    category: 'industrial',
    categoryLabel: 'Pumping & Water Works',
    year: '2024',
    valuePkr: 'PKR 1.48 Billion',
    scaleMetric: '200,000+ Residents Served · Gadap Town',
    concreteVolume: '11,200 m³ SRC',
    pecGrade: 'PEC C-A · KWSB',
    duration: '14 Months',
    imageSrc: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.37_AM_6addf298.jpeg',
    imageAlt: 'Karachi Water and Sewerage Board Surjani Pumping Station delegation and control building',
    imageFocus: 'top',
    summary:
      'Civil pumping station building, water chlorination plant house, and bulk distribution manifold serving over 200,000 residents in Surjani and Gadap Town.',
    engineeringChallenge:
      'Executing civil tie-ins and chlorination dosing chambers alongside active municipal supply lines without interrupting water pressure.',
    solutionDelivered:
      'Phased bypass connections, sulfate-resistant concrete wet wells, and coordinated commissioning with KWSB and partner engineers.',
    deliverables: [
      'Reinforced concrete pump house & chlorination control building',
      'Bulk distribution header pipes & non-return valve chambers',
      'Full electro-mechanical commissioning & joint handover',
    ],
    artType: 'industrial',
  },
  {
    id: 'precast-box-culvert-underpass',
    title: 'Heavy Box Culvert & Flared Wing-Wall Underpass',
    city: 'Sialkot',
    province: 'Punjab',
    category: 'civil',
    categoryLabel: 'Civil & Culverts',
    year: '2023',
    valuePkr: 'PKR 1.75 Billion',
    scaleMetric: '12m Clear Span · Flared Wing Walls',
    concreteVolume: '16,500 m³ RCC',
    pecGrade: 'PEC C-A · NHA Class',
    duration: '15 Months',
    imageSrc: '/assets/aistudio/41863902_290642054857563_5548837252370530304_n_5d4fcb66.jpg',
    imageAlt: 'Completed wide-span reinforced concrete box culvert with flared retaining wing walls',
    imageFocus: 'center',
    summary:
      'High-capacity cast-in-situ and precast reinforced concrete box culvert with sloped retaining wing walls engineered for heavy highway embankments and flood discharge.',
    engineeringChallenge:
      'Supporting high-axle highway traffic loads above a wide hydraulic channel in soft alluvial clay.',
    solutionDelivered:
      'Constructed a monolithic reinforced concrete invert slab, waterproofed side walls, and structural wing-wall aprons.',
    deliverables: [
      'Monolithic RCC box culvert barrel & approach aprons',
      'External bituminous waterproofing & crushed-stone drainage',
      'Sloped wing walls with galvanized safety handrails',
    ],
    artType: 'culverts',
  },
  {
    id: 'triple-barrel-highway-culvert',
    title: 'Triple-Barrel RCC Pipe Culvert & Riprap Apron',
    city: 'Sialkot',
    province: 'Punjab',
    category: 'civil',
    categoryLabel: 'Civil & Culverts',
    year: '2023',
    valuePkr: 'PKR 940 Million',
    scaleMetric: '3 × Ø 1500mm RCC Barrels',
    concreteVolume: '8,400 m³ RCC',
    pecGrade: 'NHA Highway Spec',
    duration: '10 Months',
    imageSrc: '/assets/aistudio/41807160_290627331525702_2486948719090466816_n__1__8ce89a94.jpg',
    imageAlt: 'Triple-barrel precast concrete pipe culvert headwall with stone riprap erosion protection',
    imageFocus: 'center',
    summary:
      'Triple-barrel precast concrete highway cross-drainage culvert complete with tapered concrete headwalls, scour apron slab, and heavy stone riprap.',
    engineeringChallenge:
      'High-velocity seasonal nullah runoff threatening highway embankment erosion during monsoon peak flows.',
    solutionDelivered:
      'Installed triple parallel reinforced pipes bedded in lean concrete with extended concrete apron and interlocked rock riprap.',
    deliverables: [
      'Triple Ø 1500mm precast concrete pipe installation',
      'Cast-in-situ splayed concrete headwall & wing walls',
      'Crushed-rock riprap scour protection bed',
    ],
    artType: 'culverts',
  },
  {
    id: 'night-shift-water-main-valves',
    title: 'High-Pressure Trunk Water Main & Gate Valve Chamber',
    city: 'Karachi',
    province: 'Sindh',
    category: 'civil',
    categoryLabel: 'Civil & Utilities',
    year: '2024',
    valuePkr: 'PKR 1.32 Billion',
    scaleMetric: 'Ø 900mm Steel & DI Mains · Night Works',
    concreteVolume: '7,600 m³ RCC',
    pecGrade: 'PEC C-A · Municipal',
    duration: '12 Months',
    imageSrc: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.35_AM_cbd92730.jpeg',
    imageAlt: 'Night-shift pipeline engineers inspecting flanged blue gate valves and deep trunk water mains',
    imageFocus: 'top',
    summary:
      'Emergency and scheduled night-shift installation of large-diameter pressurized trunk water mains and flanged isolation butterfly/gate valves along urban arteries.',
    engineeringChallenge:
      'Zero daytime road closure allowed on dense city avenues while executing deep valve-pit tie-ins.',
    solutionDelivered:
      'Deployed floodlit night crews, crane-mounted valve lowering, and hydrostatic pressure testing prior to morning backfill.',
    deliverables: [
      'Large-diameter flanged pipeline & thrust-block casting',
      'Heavy-duty flanged isolation valves & bypass tees',
      'Pressure testing & trench reinstatement before dawn',
    ],
    artType: 'culverts',
  },
  {
    id: 'arterial-corridor-trunk-line',
    title: 'Arterial Highway Trunk Line & Heavy Excavation',
    city: 'Karachi',
    province: 'Sindh',
    category: 'highways',
    categoryLabel: 'Highways & Utilities',
    year: '2024',
    valuePkr: 'PKR 2.25 Billion',
    scaleMetric: '7.2 km Urban Freight Corridor',
    concreteVolume: '19,800 m³ SRC',
    pecGrade: 'PEC C-A · Arterial',
    duration: '18 Months',
    imageSrc: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.39_AM_142fe4ba.jpeg',
    imageAlt: 'Excavator and engineering team laying large-diameter trunk pipe beside active highway container traffic',
    imageFocus: 'top',
    summary:
      'Parallel utility corridor excavation, large-diameter pipe laying, and heavy-axle highway shoulder reinstatement along a major industrial freight route.',
    engineeringChallenge:
      'Working inches from continuous container-truck highway traffic while excavating 4m deep utility trenches.',
    solutionDelivered:
      'Staged Jersey-barrier separation with owned hydraulic excavators and rapid compacted granular backfill.',
    deliverables: [
      'Deep trench excavation & pipe bedding along arterial shoulder',
      'Compacted sub-base & heavy-duty asphalt shoulder repair',
      'Zero traffic-incident safety record throughout execution',
    ],
    artType: 'highways',
  },
  {
    id: 'canal-lining-embankment',
    title: 'Lined Irrigation Canal & Flood Embankment Works',
    city: 'Sialkot',
    province: 'Punjab',
    category: 'highways',
    categoryLabel: 'Canals & Embankments',
    year: '2021',
    valuePkr: 'PKR 1.60 Billion',
    scaleMetric: '9.4 km Concrete Canal Lining',
    concreteVolume: '22,300 m³ RCC',
    pecGrade: 'Irrigation Dept Class',
    duration: '15 Months',
    imageSrc: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.33_AM_39082822.jpeg',
    imageAlt: 'Senior engineers and officials inspecting completed sloped concrete canal lining',
    imageFocus: 'top',
    summary:
      'Trapezoidal concrete canal lining, embankment slope stabilization, and inspection road works minimizing seepage losses across Sialkot agricultural corridors.',
    engineeringChallenge:
      'Completing bed grading and sloped concrete panel casting within strict seasonal canal-closure windows.',
    solutionDelivered:
      'Mobilized multi-front concrete crews and continuous slope screeding supervised jointly with departmental engineers.',
    deliverables: [
      'Sloped PCC/RCC trapezoidal canal lining & expansion joints',
      'Compacted earth embankment & inspection track',
      'Joint departmental measurement & clearance',
    ],
    artType: 'highways',
  },
  {
    id: 'box-culvert-rebar-shuttering',
    title: 'Cast-in-Situ Box Culvert Rebar & Formwork',
    city: 'Karachi',
    province: 'Sindh',
    category: 'highrise',
    categoryLabel: 'RCC Structures',
    year: '2023',
    valuePkr: 'PKR 1.15 Billion',
    scaleMetric: 'Grade-60 Double-Mat Reinforcement',
    concreteVolume: '12,400 m³ RCC',
    pecGrade: 'PEC C-A · Zone 2B',
    duration: '12 Months',
    imageSrc: '/assets/aistudio/41721376_290642081524227_888061252398481408_n_6eb1bf72.jpg',
    imageAlt: 'Steel reinforcement cage and modular shuttering formwork for cast-in-situ concrete box structure',
    imageFocus: 'center',
    summary:
      'Precision-tied double-mat Grade-60 deformed rebar cages and modular steel traveling formwork for long continuous reinforced concrete culvert and basement walls.',
    engineeringChallenge:
      'Maintaining tight cover tolerances and continuous pour joints over extended structural lengths.',
    solutionDelivered:
      'Fabricated custom traveling steel tunnel shuttering enabling clean monolithic wall-and-deck pours.',
    deliverables: [
      'ASTM A615 Grade-60 reinforcement fabrication & tying',
      'Traveling modular steel formwork & waterstop joints',
      'Cube-tested 5,000 PSI structural concrete placement',
    ],
    artType: 'highrise',
  },
  {
    id: 'volvo-excavator-sector-grading',
    title: 'Mechanized Earthworks & Site Boundary Development',
    city: 'Karachi',
    province: 'Sindh',
    category: 'highways',
    categoryLabel: 'Earthworks & Grading',
    year: '2025',
    valuePkr: 'PKR 1.88 Billion',
    scaleMetric: '120 Acres Cut-and-Fill & Trenching',
    concreteVolume: '14,200 m³ RCC',
    pecGrade: 'PEC C-A · Estate Spec',
    duration: '14 Months',
    imageSrc: '/assets/aistudio/476459413_1092011002948276_9205478724468637384_n_4f3417e2.jpg',
    imageAlt: 'Volvo wheeled excavator performing bulk earthworks inside taped construction perimeter',
    imageFocus: 'center',
    summary:
      'Full-site perimeter demarcation, mechanized bulk excavation, and engineered sub-grade preparation using Malik & Co.’s owned Volvo excavator fleet.',
    engineeringChallenge:
      'Rapid clearing and deep foundation trenching across expansive industrial and housing development parcels.',
    solutionDelivered:
      'Executed surveyed cut-and-fill balancing with owned wheeled excavators and strict safety-tape perimeter control.',
    deliverables: [
      'Topographical setting-out & perimeter safety demarcation',
      'Bulk trenching and engineered soil stockpiling',
      'Compacted sub-base ready for structural pads',
    ],
    artType: 'highways',
  },
  {
    id: 'chalk-grid-foundation-layout',
    title: 'Commercial & Institutional Plot Layout & Footings',
    city: 'Sialkot',
    province: 'Punjab',
    category: 'highrise',
    categoryLabel: 'High-Rise & Shops',
    year: '2025',
    valuePkr: 'PKR 2.65 Billion',
    scaleMetric: '4.2 Kanal Plaza & Retail Plots',
    concreteVolume: '18,900 m³ RCC',
    pecGrade: 'PEC C-A · Zone 2A',
    duration: '22 Months',
    imageSrc: '/assets/aistudio/477086991_1092011329614910_5301564099664225065_n_2314b2d0.jpg',
    imageAlt: 'White chalk foundation grid markings and excavated footing pit on cleared development plot',
    imageFocus: 'center',
    summary:
      'Precision survey chalk-line grid setting-out, isolated and raft footing excavation, and structural column layout for commercial plazas and retail shops.',
    engineeringChallenge:
      'Ensuring exact column-grid alignment across multi-unit commercial shopfronts and upper tower cores.',
    solutionDelivered:
      'Total-station surveyed footing layouts verified prior to blinding concrete and anti-termite soil treatment.',
    deliverables: [
      'Total-station grid demarcation & trial pit verification',
      'Excavated structural footings & anti-termite treatment',
      'Reinforced plinth beams for ground-floor retail bays',
    ],
    artType: 'highrise',
  },
  {
    id: 'deep-utility-crossing-trench',
    title: 'Sub-Surface Cross-Utility Trenching & Pipe Jointing',
    city: 'Karachi',
    province: 'Sindh',
    category: 'civil',
    categoryLabel: 'Civil & Utilities',
    year: '2022',
    valuePkr: 'PKR 860 Million',
    scaleMetric: '3.2 km Deep Sewer & Water Tie-Ins',
    concreteVolume: '6,200 m³ RCC',
    pecGrade: 'PEC C-A · Municipal',
    duration: '11 Months',
    imageSrc: '/assets/aistudio/41633862_290641744857594_6669897143387422720_n__1__28a279c1.jpg',
    imageAlt: 'Utility crew working inside deep excavated earth trench beneath existing cross pipes',
    imageFocus: 'center',
    summary:
      'Careful hand-excavated and braced under-crossing work beneath existing pressurized utilities to connect deep municipal sewer and stormwater lines.',
    engineeringChallenge:
      'Working safely underneath live crossing water mains and telecom conduits in deep urban trenches.',
    solutionDelivered:
      'Supported existing crossing pipes and completed mortar-sealed collar joints with zero utility outages.',
    deliverables: [
      'Protected utility under-crossings & manual trench trimming',
      'Watertight pipe collar jointing & haunch concrete',
      'Layered granular backfill & surface compaction',
    ],
    artType: 'culverts',
  },
  {
    id: 'subbase-rock-excavation-site',
    title: 'Sub-Base Excavation & Boundary Infrastructure',
    city: 'Karachi',
    province: 'Sindh',
    category: 'industrial',
    categoryLabel: 'Site Infrastructure',
    year: '2022',
    valuePkr: 'PKR 1.05 Billion',
    scaleMetric: 'Rocky Strata Trenching & Retaining Walls',
    concreteVolume: '9,100 m³ RCC',
    pecGrade: 'PEC C-A · Zone 2B',
    duration: '13 Months',
    imageSrc: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.33_AM__1__5d75c8de.jpeg',
    imageAlt: 'Project leadership inspecting rocky excavation trench and utility conduits along site wall',
    imageFocus: 'top',
    summary:
      'Senior site directors overseeing rocky strata excavation, perimeter boundary retaining walls, and heavy steel/HDPE conduit installation.',
    engineeringChallenge:
      'Hard boulder and gravel strata requiring hydraulic breakers alongside existing compound walls.',
    solutionDelivered:
      'Controlled rock excavation and protective underpinning along perimeter structures with daily director oversight.',
    deliverables: [
      'Rock-trench excavation & heavy utility conduit laying',
      'Reinforced perimeter boundary wall & plinth',
      'Compacted crushed-aggregate sub-base preparation',
    ],
    artType: 'industrial',
  },
  {
    id: 'heritage-founding-leadership',
    title: 'Malik & Co. Founding Leadership & Civic Handovers',
    city: 'Sialkot',
    province: 'Punjab',
    category: 'highrise',
    categoryLabel: 'Heritage · Est. 1979',
    year: '1998',
    valuePkr: 'Institutional Archive',
    scaleMetric: 'Founding Civil & Public Works Era',
    concreteVolume: '47-Year Legacy',
    pecGrade: 'PEC Category C-A',
    duration: '1979–Present',
    imageSrc: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.39_AM__1__70df3863.jpeg',
    imageAlt: 'Archival photograph of Malik & Co. founding leadership at an official Pakistani project handover',
    imageFocus: 'top',
    summary:
      'Archival field photograph documenting Malik & Co.’s senior leadership during early landmark public-works and institutional project handovers in Pakistan.',
    engineeringChallenge:
      'Establishing mechanized civil contracting standards across Punjab and Sindh through multi-generational leadership.',
    solutionDelivered:
      'Built an enduring engineering culture rooted in direct site presence, owned machinery, and on-time municipal handovers.',
    deliverables: [
      'Multi-generational Pakistani engineering leadership since 1979',
      'Direct field supervision on every active contract',
      'Long-standing trust with public and private development boards',
    ],
    artType: 'highrise',
  },
];

export const HERITAGE_TIMELINE: HeritageDecade[] = [
  {
    year: '1979',
    era: 'Foundation Era',
    title: 'Establishment in Sialkot',
    cityFocus: 'Sialkot · 1979 Founding Office',
    milestoneMetric: 'First 12 Municipal Culverts Delivered',
    description:
      'Founded in 1979 in Sialkot as a civil engineering and contracting firm, M/S Malik & Company built its reputation on durable culverts, sewerage mains, and public infrastructure works.',
    keyArtifact: 'Manual transit theodolites & first crawler excavator unit',
  },
  {
    year: '1989',
    era: 'Mechanization',
    title: 'In-House Heavy Earthmoving Fleet in Sialkot',
    cityFocus: 'Sialkot Regional Operations',
    milestoneMetric: '18 Heavy Excavators & Graders',
    description:
      'Expanded from labor-intensive civil works into mechanized earthworks, irrigation canal linings, and arterial road rehabilitation without relying on third-party equipment rentals.',
    keyArtifact: 'Proprietary crushing & concrete batching yard in Sialkot',
  },
  {
    year: '1999',
    era: 'Structural Scale',
    title: 'PEC Category C-A & Expansion to Karachi',
    cityFocus: 'Sialkot · Karachi',
    milestoneMetric: 'No-Limit Project Eligibility',
    description:
      'Achieved top-tier Pakistan Engineering Council registration, scaling from our Sialkot roots into major coastal civil infrastructure and commercial RCC buildings in Karachi.',
    keyArtifact: 'In-house concrete testing laboratory & tower crane fleet',
  },
  {
    year: '2011',
    era: 'Karachi Main Operations',
    title: 'Karachi Main Hub: Pumping Stations & Trunk Lines',
    cityFocus: 'Karachi Main · Sialkot',
    milestoneMetric: 'Major SRC Marine & Trunk Works',
    description:
      'Established Karachi as our main headquarters for coastal sulfate-resistant drainage mains, KWSB municipal pumping stations, arterial corridor works, and industrial plants.',
    keyArtifact: 'Dedicated mobile batching plants & dewatering pump skids',
  },
  {
    year: '2026',
    era: 'Modern Engineering',
    title: 'Karachi Main HQ & 47-Year Sialkot Heritage',
    cityFocus: 'Karachi (Main) · Sialkot (Est. 1979)',
    milestoneMetric: '420+ Projects · 47 Years Continuous Legacy',
    description:
      'Operating from our main headquarters in Karachi with our founding base in Sialkot, M/S Malik & Company delivers full architectural, structural, MEP, and civil engineering.',
    keyArtifact: 'PEC C-A · ISO 9001:2015 · HSE Zero-LTI Site Protocols',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'Replacing live trunk sewerage lines through active commercial shops in Karachi requires tight crew coordination and rapid shoring. Malik & Co. maintained shop access and handed over clean road surfaces ahead of target.',
    author: 'Engr. Nadeem Akhter',
    role: 'Project Director',
    organization: 'Sindh Urban Infrastructure Associates, Karachi',
    projectRef: 'Surjani Pumping Station & Trunk Works',
  },
  {
    quote:
      'Their dewatering, reinforced box culverts, and commercial plaza foundations in Sialkot saved weeks on our critical path. Daily cube-crushing reports and transparent BOQ billing set them apart.',
    author: 'Engr. Tariq Mehmood',
    role: 'Director Technical',
    organization: 'Sialkot Commercial Developments',
    projectRef: 'Sialkot Box Culvert & Commercial Plaza',
  },
  {
    quote:
      'Completing arterial corridor excavation, deep utility tie-ins, and coastal concrete works on schedule in Karachi required disciplined fleet mobilization. Malik & Co. delivered with zero structural NCRs.',
    author: 'Engr. Sajid Hussain Qureshi',
    role: 'Chief Project Coordinator',
    organization: 'Karachi Drainage & Highway Consultants',
    projectRef: 'Arterial Trunk Corridor & Valve Chambers',
  },
];

export interface CityFactor {
  name: string;
  multiplier: number;
  seismicZone: string;
  soilNote: string;
}

export const PAKISTAN_CITIES: CityFactor[] = [
  {
    name: 'Karachi',
    multiplier: 1.12,
    seismicZone: 'Zone 2B',
    soilNote: 'Main Headquarters · Coastal salinity requiring SRC cement & piling',
  },
  {
    name: 'Sialkot',
    multiplier: 1.0,
    seismicZone: 'Zone 2B',
    soilNote: '1979 Founding Base · Alluvial clay-silt & seasonal nullah drainage',
  },
];
