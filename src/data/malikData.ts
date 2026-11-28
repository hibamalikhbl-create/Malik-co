import type { EngineeringServiceId } from '../components/ServiceIsoIcons';

export interface SpecializationItem {
  id: string;
  number: string;
  title: string;
  kicker: string;
  description: string;
  services: string[];
}

export interface FieldPhotoItem {
  id: string;
  src: string;
  title: string;
  location: string;
  caption: string;
  focus: 'top' | 'upper' | 'center';
  featured?: boolean;
}

export interface FieldVideoItem {
  id: string;
  src: string;
  poster: string;
  title: string;
  tag: string;
  caption: string;
}

export interface HeritageDecade {
  year: string;
  era: string;
  leader: string;
  title: string;
  cityFocus: string;
  portraitSrc: string;
  description: string;
}

export interface ServiceDetailItem {
  id: EngineeringServiceId;
  title: string;
  discipline: string;
  description: string;
}

export const COMPANY_INFO = {
  name: 'M/S Malik & Company',
  shortName: 'Malik & Co.',
  pecRegistration: 'PEC Category CB · Achievement: Specialization Code 31 Only',
  electricalLicense: 'Government of Sindh Electrical License',
  projectsCompleted: '2,000+',
  sinceText: 'Five-Generation Engineering & Contracting Legacy',
  addressLines: [
    'Office No. 8, Mezzanine Floor, Rafi Mansion',
    'Opposite Airport Police Station',
    'Shahrah-e-Faisal Colony Gate, Near Zam Zam Lawn',
    'Karachi, Pakistan',
  ],
  cell: '0334-2199979',
  email: 'asif.maliknco@gmail.com',
  introParagraph:
    'M/S Malik & Company is a multi-generational Civil, Electrical, and Mechanical contracting firm founded on the strong legacy of craftsmanship and integrity laid down by our great-great-grandfather, Late Malik Abdul Mehtab Din Sahib, in Sialkot. Over five generations — from building mud homes to executing high-rise structures and complex infrastructure — our family has carried forward the same values of hard work, innovation, and excellence. Today, under the leadership of Muhammad Asif Malik, M/S Malik & Company operates as a one-window solution provider across our ten integrated disciplines — proudly serving Pakistan and preparing to go global.',
};

export const FIELD_VIDEOS: FieldVideoItem[] = [
  {
    id: 'asif-site-walkthrough',
    src: '/assets/aistudio/WhatsApp_Video_2026-11-27_at_3.42.09_PM_87991916.mp4',
    poster: '/assets/posters/asif-walkthrough.jpg',
    title: 'Site Walkthrough with Muhammad Asif Malik',
    tag: 'RCC Frame & Masonry Execution',
    caption: 'On-site walkthrough highlighting RCC column reinforcement, masonry, and active building execution.',
  },
  {
    id: 'construction-progression-reel',
    src: '/assets/aistudio/WhatsApp_Video_2026-11-27_at_3.41.41_PM_6851f44b.mp4',
    poster: '/assets/posters/construction-reel.jpg',
    title: 'Foundation-to-Structure Progression Reel',
    tag: 'Structural & Grey Structure Works',
    caption: 'From footing formwork and column rebar cages to multi-storey concrete deck slabs and block masonry.',
  },
  {
    id: 'pedestrian-bridge-inspection',
    src: '/assets/aistudio/Engineers_inspect_pedestrian_bridge_20261025100820__1__ed356906.mp4',
    poster: '/assets/posters/bridge-inspection.jpg',
    title: 'Elevated Pedestrian Bridge Load Sign-Off',
    tag: 'Infrastructure & Steel Bridges',
    caption: 'Civil engineers inspecting structural truss members, deck tolerances, and safety railings prior to opening.',
  },
];

export const FIELD_GALLERY: FieldPhotoItem[] = [
  {
    id: 'roof-deck-blueprint-review',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-27_at_3.49.45_PM_d251dee1.jpeg',
    title: 'Roof Deck Slab & Working Drawing Review',
    location: 'Engineering Services · High-Rise RCC',
    caption:
      'Muhammad Asif Malik and field engineers verifying structural slab reinforcement against working drawings under tower crane coverage.',
    focus: 'upper',
  },
  {
    id: 'pedestrian-bridge-stairs-inspection',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-27_at_2.39.04_PM_22090c91.jpeg',
    title: 'Pedestrian Bridge Staircase Inspection',
    location: 'Infrastructure & Leadership',
    caption:
      'Respected Malik Abdul Salam Sahib and Muhammad Asif Malik inspecting completed steel pedestrian bridge stairs and deck.',
    focus: 'upper',
  },
  {
    id: 'rcc-box-culvert-wing-walls',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-27_at_2.41.16_PM_e863b907.jpeg',
    title: 'RCC Box Culvert & Flared Wing Walls',
    location: 'Infrastructure · Cross-Drainage',
    caption:
      'Completed reinforced concrete box culvert and sloped retaining wing walls carrying roadway crossing over active channel.',
    focus: 'center',
  },
];

export const PRACTICE_DISCIPLINES: string[] = [
  'Planning & Development',
  'Demolition Works',
  'Architecture Designer',
  'Structural Design',
  'MEP Design',
  'Infrastructure Consultancy',
  'Engineering Services',
  'Construction',
  'Interior Design',
  'Renovation Works',
];

export const ALL_SERVICES: ServiceDetailItem[] = [
  {
    id: 'urban-planning',
    title: 'Planning & Development',
    discipline: 'Master Planning & Development',
    description:
      'Seasoned planners, feasibility analysts, and development coordinators who master land strategy, approvals, and phased growth.',
  },
  {
    id: 'demolish-works',
    title: 'Demolition Works',
    discipline: 'Controlled Dismantling & Clearing',
    description:
      'Trained demolition supervisors, shoring specialists, and certified machine operators skilled in safe structural dismantling and site clearing.',
  },
  {
    id: 'architecture',
    title: 'Architecture Designer',
    discipline: 'Concepts, Plans & 3D Views',
    description:
      'Creative architectural designers and 3D visualizers who master spatial proportion, natural daylight, façade balance, and working detail.',
  },
  {
    id: 'structural-analysis',
    title: 'Structural Design',
    discipline: 'Load Modeling & RCC/Steel',
    description:
      'Experienced structural engineers and steel detailers who master load behavior, foundation stability, seismic resilience, and RCC accuracy.',
  },
  {
    id: 'mep-design',
    title: 'MEP Design',
    discipline: 'HVAC, Electrical & Plumbing',
    description:
      'Licensed electrical engineers, HVAC specialists, and plumbing designers mastering code-compliant, energy-efficient building utilities.',
  },
  {
    id: 'infrastructure-consultancy',
    title: 'Infrastructure Consultancy',
    discipline: 'Roads, Culverts & Water Works',
    description:
      'Veteran civil infrastructure consultants and hydraulic engineers who master road geometry, heavy culverts, bridges, and water networks.',
  },
  {
    id: 'engineers',
    title: 'Engineering Services',
    discipline: 'Civil, Electrical & Mechanical',
    description:
      'Dedicated field engineers, surveyors, and QA/QC inspectors mastering technical supervision, quantity accuracy, and site leadership.',
  },
  {
    id: 'construction-mgmt',
    title: 'Construction',
    discipline: 'PEC Category CB Execution',
    description:
      'Master masons, steel fixers, shuttering carpenters, and PEC Category CB crews bringing hands-on building craftsmanship to every site.',
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    discipline: 'Spaces, Fit-Out & Décor',
    description:
      'Talented interior designers, bespoke joinery artisans, and finishing craftsmen who master lighting, materials, and functional living spaces.',
  },
  {
    id: 'renovation-works',
    title: 'Renovation Works',
    discipline: 'Retrofits, Remodels & Upgrades',
    description:
      'Skilled retrofitting technicians, structural repair crews, and remodeling craftsmen mastering complex upgrades in active buildings.',
  },
];

export const SPECIALIZATIONS: SpecializationItem[] = [
  {
    id: 'planners-developers',
    number: '01',
    title: 'Planning & Development',
    kicker: 'Master Planning & Development',
    description:
      'Strategic project planning and development management from land feasibility and approvals to final commissioning.',
    services: [
      'Feasibility Studies & Site Planning',
      'Commercial & Residential Plot Layouts',
      'Project Scheduling & Phased Rollout',
      'Municipal & Authority Clearances',
    ],
  },
  {
    id: 'demolish-works',
    number: '02',
    title: 'Demolition Works',
    kicker: 'Controlled Dismantling & Clearing',
    description:
      'Disciplined demolition and site-clearing operations engineered to protect neighboring structures and underground lines.',
    services: [
      'Selective Interior Strip-Outs',
      'Controlled Building & Slab Dismantling',
      'Adjacent Structure Shoring & Safety',
      'Debris Removal & Plot Grading',
    ],
  },
  {
    id: 'architecture',
    number: '03',
    title: 'Architecture Designer',
    kicker: 'Concepts, Plans & 3D Views',
    description:
      'Purposeful architectural solutions balancing natural daylight, ventilation, urban context, and brand presence.',
    services: [
      'Conceptual & Schematic Design',
      'Authority Submission Drawings',
      'Working & Construction Details',
      '3D Exterior & Interior Perspectives',
    ],
  },
  {
    id: 'structural',
    number: '04',
    title: 'Structural Design',
    kicker: 'Safe & Durable Frameworks',
    description:
      'Engineered reinforced concrete and structural steel systems designed for long-term stability and code compliance.',
    services: [
      'Structural Modeling & Load Analysis',
      'Raft, Pile & Isolated Foundations',
      'Reinforcement & Bar Bending Schedules',
      'Pedestrian Bridges & Clear-Span Steel',
    ],
  },
  {
    id: 'mep-design',
    number: '05',
    title: 'MEP Design',
    kicker: 'HVAC, Electrical & Plumbing',
    description:
      'Coordinated Mechanical, Electrical, and Plumbing engineering under a Government of Sindh Electrical License.',
    services: [
      'HVAC Ducting & Chilled-Water Design',
      'HT/LT Electrical Panels & Wiring',
      'Water Supply, Drainage & Pumping',
      'Fire Fighting & Life-Safety Systems',
    ],
  },
  {
    id: 'infrastructure-consultancy',
    number: '06',
    title: 'Infrastructure Consultancy',
    kicker: 'Roads, Culverts & Water Works',
    description:
      'Advisory, hydraulic engineering, and execution support for heavy civil corridors and municipal utility networks.',
    services: [
      'Box & Pipe Culvert Cross-Drainage',
      'Arterial Roads & Sub-Base Design',
      'Pumping Stations & Trunk Water Mains',
      'Canal Lining & Flood Embankments',
    ],
  },
  {
    id: 'engineers',
    number: '07',
    title: 'Engineering Services',
    kicker: 'Civil, Electrical & Mechanical',
    description:
      'Hands-on multidisciplinary engineering oversight ensuring material quality, dimensional accuracy, and site safety.',
    services: [
      'Daily Technical Site Supervision',
      'BOQ Preparation & Cost Control',
      'Concrete Cube & Material Testing',
      'Total Station Surveying & Leveling',
    ],
  },
  {
    id: 'construction',
    number: '08',
    title: 'Construction',
    kicker: 'PEC Category CB Execution',
    description:
      'Full-cycle residential, commercial, institutional, and industrial building delivery backed by dedicated site teams.',
    services: [
      'Excavation & Foundation Works',
      'RCC Grey Structure & Masonry',
      'Plaster, Flooring & Cladding Finishes',
      'Turnkey Contract Delivery',
    ],
  },
  {
    id: 'interior-designers',
    number: '09',
    title: 'Interior Design',
    kicker: 'Spaces, Fit-Out & Décor',
    description:
      'Crafting refined, functional interiors tailored to resident lifestyles, corporate offices, and retail environments.',
    services: [
      'Space Planning & Zoning',
      'Bespoke Joinery & Furniture Layouts',
      'Material & Lighting Selection',
      'Turnkey Fit-Out & Décor Execution',
    ],
  },
  {
    id: 'renovation-works',
    number: '10',
    title: 'Renovation Works',
    kicker: 'Retrofits, Remodels & Upgrades',
    description:
      'Transforming existing homes, corporate floors, shops, and institutional facilities with minimal operational downtime.',
    services: [
      'Structural Retrofitting & Strengthening',
      'Office & Residence Remodeling',
      'Electrical, Plumbing & HVAC Upgrades',
      'Exterior Façade & Waterproofing Works',
    ],
  },
];

export const HERITAGE_TIMELINE: HeritageDecade[] = [
  {
    year: '1930s – 1950s',
    era: 'The Foundation of Craftsmanship',
    leader: 'Late Malik Abdul Mehtab Din Sahib',
    title: 'Foundation of Family Craftsmanship in Sialkot',
    cityFocus: 'Sialkot',
    portraitSrc: '/assets/portraits/gen1-enhanced.jpg',
    description:
      'Our story begins in the 1930s, when Late Malik Abdul Mehtab Din Sahib laid the foundation of the family’s construction legacy in Sialkot. With humble beginnings as a skilled mason, he earned recognition for his dedication, craftsmanship, and integrity — building mud houses that stood as symbols of quality and trust within the community.',
  },
  {
    year: '1940s – 1960s',
    era: 'The Era of Resilience and Growth',
    leader: 'Late Malik Abdul Fazal Karim Sahib',
    title: 'Public Structures, Tunnels & Nation-Building',
    cityFocus: 'Sialkot · Public Works',
    portraitSrc: '/assets/portraits/gen2-enhanced.jpg',
    description:
      'Carrying forward his father’s craft, Late Malik Abdul Fazal Karim Sahib worked tirelessly with his own hands during a defining period in Pakistan’s history. In the years around Partition (1947), he worked on the construction of railways, underground tunnels, jails, and public structures, demonstrating resilience, precision, and a deep commitment to nation-building.',
  },
  {
    year: '1950s – 1980s',
    era: 'Expansion and Public Works',
    leader: 'Late Malik Abdul Ghafoor Sahib',
    title: 'Large-Scale Hospitals, Colleges & Universities',
    cityFocus: 'Toba Tek Singh',
    portraitSrc: '/assets/portraits/gen3-enhanced.jpg',
    description:
      'With a vision to expand the family trade, Late Malik Abdul Ghafoor Sahib relocated operations to Toba Tek Singh. Under his leadership, the business took on large-scale government infrastructure projects, including hospitals, colleges, and universities — establishing the family’s reputation as trusted contractors known for reliability and quality workmanship.',
  },
  {
    year: '1970s – 2000',
    era: 'The Birth of Malik & Company',
    leader: 'Respected Malik Abdul Salam Sahib',
    title: 'Modernization & Expansion to Karachi',
    cityFocus: 'Toba Tek Singh · Karachi',
    portraitSrc: '/assets/portraits/gen4-enhanced.jpg',
    description:
      'Migrating from Toba Tek Singh to Karachi in 1970, Malik Abdul Salam Sahib brought a bold vision to modernize and professionalize the family business, and in 1979 he registered Malik & Co. for the first time on the pillars of teamwork, integrity, and commitment. His leadership transformed the company into a leading name in civil, electrical, and mechanical contracting, working with major government departments and contributing to the development of Karachi’s urban landscape.',
  },
  {
    year: '2000 – Present',
    era: 'Innovation and Expansion',
    leader: 'Muhammad Asif Malik',
    title: 'PEC (CB), One-Window Consultancy & Global Vision',
    cityFocus: 'Karachi Main · Preparing for International Expansion',
    portraitSrc: '/assets/portraits/gen5-enhanced.jpg',
    description:
      'As the current generation and a qualified Civil Engineer, Muhammad Asif Malik has led Malik & Company into a new era of innovation and diversification. Under his leadership, the firm achieved PEC (CB) registration, expanded into consultancy, design, and planning services, and strengthened its presence in both government and private sectors. With an eye on the future, Malik & Company is now preparing for international expansion, continuing its proud legacy of excellence that spans nearly a century.',
  },
];

export const SITE_CITY_OPTIONS: string[] = [
  'Karachi',
  'Sialkot',
  'Other Pakistan / International',
];
