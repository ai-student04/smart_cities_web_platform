import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const envContent = readFileSync('.env', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    env[key.trim()] = valueParts.join('=').trim();
  }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('Starting database seeding...');

  const cities = [
    { name: 'Amman', name_ar: 'عمان', population: 4007526, innovation_rank: 1, description: 'Capital and largest city' },
    { name: 'Irbid', name_ar: 'إربد', population: 1770158, innovation_rank: 2, description: 'Second largest city in northern Jordan' },
    { name: 'Zarqa', name_ar: 'الزرقاء', population: 635160, innovation_rank: 3, description: 'Industrial hub in central Jordan' },
    { name: 'Aqaba', name_ar: 'العقبة', population: 188160, innovation_rank: 4, description: 'Red Sea port city' },
    { name: 'Madaba', name_ar: 'مادبا', population: 105353, innovation_rank: 5, description: 'Historic city known for mosaics' },
  ];

  const { data: existingCities } = await supabase.from('cities').select('name');

  if (!existingCities || existingCities.length === 0) {
    const { data: insertedCities, error: citiesError } = await supabase
      .from('cities')
      .insert(cities)
      .select();

    if (citiesError) {
      console.error('Error inserting cities:', citiesError);
      return;
    }
    console.log('Cities inserted:', insertedCities?.length);
  } else {
    console.log('Cities already exist, skipping...');
  }

  const { data: fetchedCities } = await supabase.from('cities').select('*');

  const projectTypes = [
    { name: 'Urban Planning', name_ar: 'التخطيط الحضري', description: 'Sustainable development and smart zoning', icon: 'building' },
    { name: 'Transportation', name_ar: 'النقل', description: 'Smart traffic and mobility solutions', icon: 'bus' },
    { name: 'Energy', name_ar: 'الطاقة', description: 'Efficient buildings and renewable energy', icon: 'zap' },
    { name: 'IoT & Connectivity', name_ar: 'إنترنت الأشياء', description: 'Sensors and network infrastructure', icon: 'wifi' },
    { name: 'Digital Services', name_ar: 'الخدمات الرقمية', description: 'E-government and citizen apps', icon: 'smartphone' },
    { name: 'Sustainability', name_ar: 'الاستدامة', description: 'Environmental and green projects', icon: 'leaf' },
  ];

  const { data: existingTypes } = await supabase.from('project_types').select('name');

  if (!existingTypes || existingTypes.length === 0) {
    const { data: insertedTypes, error: typesError } = await supabase
      .from('project_types')
      .insert(projectTypes)
      .select();

    if (typesError) {
      console.error('Error inserting project types:', typesError);
      return;
    }
    console.log('Project types inserted:', insertedTypes?.length);
  } else {
    console.log('Project types already exist, skipping...');
  }

  const { data: fetchedTypes } = await supabase.from('project_types').select('*');

  const cityMap = fetchedCities?.reduce((acc, city) => {
    acc[city.name] = city.id;
    return acc;
  }, {});

  const typeMap = fetchedTypes?.reduce((acc, type) => {
    acc[type.name] = type.id;
    return acc;
  }, {});

  const { data: existingProjects } = await supabase.from('projects').select('title');

  if (!existingProjects || existingProjects.length === 0) {
    const projects = [
      {
        title: 'Amman Smart Traffic Management System',
        title_ar: 'نظام إدارة المرور الذكي في عمان',
        description: 'Implementation of AI-powered traffic signal optimization across 300 intersections in Amman. The system uses real-time data from cameras and sensors to adjust signal timing, reducing congestion by 30% during peak hours. Integrated with mobile apps to provide route recommendations.',
        short_description: 'AI-powered traffic signals reducing congestion by 30%',
        project_type_id: typeMap['Transportation'],
        city_id: cityMap['Amman'],
        impact_level: 'high',
        status: 'active',
        start_date: '2023-03-15',
        budget: 12500000,
        partners: ['Greater Amman Municipality', 'Siemens', 'World Bank'],
        outcomes: { congestionReduction: 30, timeSaved: 15, co2Reduction: 20 },
        image_url: 'https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        title: 'Irbid Solar Energy Initiative',
        title_ar: 'مبادرة الطاقة الشمسية في إربد',
        description: 'Large-scale deployment of solar panels on public buildings, schools, and hospitals across Irbid. The project includes 50 installations generating 15 MW of clean energy, reducing reliance on grid power by 40% for participating facilities.',
        short_description: '50 solar installations generating 15 MW of clean energy',
        project_type_id: typeMap['Energy'],
        city_id: cityMap['Irbid'],
        impact_level: 'high',
        status: 'active',
        start_date: '2022-06-01',
        budget: 18000000,
        partners: ['Ministry of Energy', 'USAID', 'Jordan Renewable Energy'],
        outcomes: { energyGenerated: 15, co2Avoided: 8500, costSavings: 2400000 },
        image_url: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        title: 'Smart Waste Collection - Zarqa',
        title_ar: 'جمع النفايات الذكي - الزرقاء',
        description: 'Implementation of IoT-enabled waste bins with fill-level sensors across Zarqa. Collection routes are optimized using AI algorithms, reducing fuel consumption by 25% and ensuring bins never overflow. Mobile app allows citizens to report issues.',
        short_description: 'Smart bins with sensors optimizing collection routes',
        project_type_id: typeMap['Sustainability'],
        city_id: cityMap['Zarqa'],
        impact_level: 'medium',
        status: 'completed',
        start_date: '2021-09-01',
        completion_date: '2023-12-31',
        budget: 3500000,
        partners: ['Zarqa Municipality', 'Veolia', 'EU Green Fund'],
        outcomes: { fuelSavings: 25, collectionEfficiency: 40, citizenSatisfaction: 85 },
        image_url: 'https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        title: 'Aqaba Smart Port Digital Platform',
        title_ar: 'منصة ميناء العقبة الذكية',
        description: 'Digital transformation of Aqaba Port operations including automated container tracking, predictive maintenance for equipment, and blockchain-based documentation. Reduced vessel turnaround time by 35% and increased throughput capacity.',
        short_description: 'Digital platform reducing vessel turnaround by 35%',
        project_type_id: typeMap['Digital Services'],
        city_id: cityMap['Aqaba'],
        impact_level: 'high',
        status: 'active',
        start_date: '2023-01-10',
        budget: 22000000,
        partners: ['Aqaba Special Economic Zone', 'IBM', 'Maersk'],
        outcomes: { turnaroundReduction: 35, throughputIncrease: 28, costReduction: 15 },
        image_url: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        title: 'Amman Green Corridor Project',
        title_ar: 'مشروع الممر الأخضر في عمان',
        description: 'Creation of 12 km interconnected green spaces and pedestrian pathways through central Amman. Includes 15,000 new trees, smart irrigation systems, bike lanes, and public Wi-Fi. Improves air quality and provides recreational spaces.',
        short_description: '12 km green corridor with smart irrigation and bike lanes',
        project_type_id: typeMap['Urban Planning'],
        city_id: cityMap['Amman'],
        impact_level: 'high',
        status: 'active',
        start_date: '2022-04-01',
        budget: 9500000,
        partners: ['Greater Amman Municipality', 'UNDP', 'Royal Botanic Garden'],
        outcomes: { treesPlanted: 15000, airQualityImprovement: 18, publicUsage: 50000 },
        image_url: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        title: 'National E-Government Portal',
        title_ar: 'بوابة الحكومة الإلكترونية الوطنية',
        description: 'Unified digital platform providing access to over 200 government services. Citizens can apply for permits, pay taxes, access healthcare records, and register businesses online. Mobile-first design with Arabic and English support.',
        short_description: 'Unified portal with 200+ government services online',
        project_type_id: typeMap['Digital Services'],
        city_id: cityMap['Amman'],
        impact_level: 'high',
        status: 'active',
        start_date: '2021-01-15',
        budget: 28000000,
        partners: ['Ministry of Digital Economy', 'Microsoft', 'USAID'],
        outcomes: { servicesOnline: 210, usersRegistered: 2500000, timeSaved: 180 },
        image_url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        title: 'Irbid 5G Network Deployment',
        title_ar: 'نشر شبكة الجيل الخامس في إربد',
        description: 'Citywide 5G infrastructure deployment covering 95% of Irbid. Enables smart city applications including autonomous vehicles, remote healthcare, and IoT device connectivity. Partnership with telecommunications providers.',
        short_description: 'Citywide 5G coverage enabling smart applications',
        project_type_id: typeMap['IoT & Connectivity'],
        city_id: cityMap['Irbid'],
        impact_level: 'high',
        status: 'active',
        start_date: '2023-05-01',
        budget: 32000000,
        partners: ['Jordan Telecom', 'Zain Jordan', 'Huawei'],
        outcomes: { coverage: 95, connectedDevices: 125000, speedImprovement: 400 },
        image_url: 'https://images.pexels.com/photos/4458554/pexels-photo-4458554.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        title: 'Madaba Smart Water Management',
        title_ar: 'إدارة المياه الذكية في مادبا',
        description: 'IoT-based water distribution monitoring system detecting leaks in real-time. Smart meters track household consumption, and AI predicts demand patterns. Reduced water loss from 40% to 18% and improved supply reliability.',
        short_description: 'Smart meters and leak detection reducing water loss',
        project_type_id: typeMap['Sustainability'],
        city_id: cityMap['Madaba'],
        impact_level: 'high',
        status: 'completed',
        start_date: '2020-11-01',
        completion_date: '2023-03-31',
        budget: 5200000,
        partners: ['Water Authority', 'JICA', 'Suez Water'],
        outcomes: { leakReduction: 55, waterSaved: 2500000, customerSatisfaction: 88 },
        image_url: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        title: 'Zarqa Industrial Zone Smart Grid',
        title_ar: 'الشبكة الذكية في المنطقة الصناعية بالزرقاء',
        description: 'Smart electrical grid implementation for Zarqa industrial area with automated fault detection, load balancing, and renewable energy integration. Reduces power outages by 70% and enables real-time energy monitoring.',
        short_description: 'Smart grid reducing outages by 70% in industrial zone',
        project_type_id: typeMap['Energy'],
        city_id: cityMap['Zarqa'],
        impact_level: 'medium',
        status: 'active',
        start_date: '2022-08-15',
        budget: 14500000,
        partners: ['National Electric Power Company', 'ABB', 'GIZ'],
        outcomes: { outageReduction: 70, efficiencyGain: 25, renewableIntegration: 30 },
        image_url: 'https://images.pexels.com/photos/4254165/pexels-photo-4254165.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        title: 'Amman BRT Rapid Transit System',
        title_ar: 'نظام النقل السريع في عمان',
        description: 'Bus Rapid Transit system with dedicated lanes covering 35 km across Amman. Real-time tracking, digital payment, and priority signals at intersections. Moves 80,000 passengers daily with 99% on-time performance.',
        short_description: '35 km BRT system serving 80,000 daily passengers',
        project_type_id: typeMap['Transportation'],
        city_id: cityMap['Amman'],
        impact_level: 'high',
        status: 'active',
        start_date: '2021-07-01',
        budget: 45000000,
        partners: ['Greater Amman Municipality', 'World Bank', 'French Development Agency'],
        outcomes: { dailyPassengers: 80000, onTimePerformance: 99, co2Reduction: 35 },
        image_url: 'https://images.pexels.com/photos/2881234/pexels-photo-2881234.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
    ];

    const { error: projectsError } = await supabase
      .from('projects')
      .insert(projects);

    if (projectsError) {
      console.error('Error inserting projects:', projectsError);
      return;
    }

    console.log('Projects inserted:', projects.length);
  } else {
    console.log('Projects already exist, skipping...');
  }

  const { data: existingStats } = await supabase.from('statistics').select('category');

  if (!existingStats || existingStats.length === 0) {
    const statistics = [
      {
        category: 'adoption_rates',
        year: 2025,
        data: [
          { city: 'Amman', adoptionRate: 78 },
          { city: 'Irbid', adoptionRate: 65 },
          { city: 'Zarqa', adoptionRate: 58 },
          { city: 'Aqaba', adoptionRate: 72 },
          { city: 'Madaba', adoptionRate: 54 },
        ],
      },
      {
        category: 'energy_savings',
        year: 2025,
        data: [
          { year: '2020', energySaved: 2500 },
          { year: '2021', energySaved: 4200 },
          { year: '2022', energySaved: 6800 },
          { year: '2023', energySaved: 9500 },
          { year: '2024', energySaved: 12400 },
          { year: '2025', energySaved: 15800 },
        ],
      },
      {
        category: 'traffic_flow',
        year: 2025,
        data: [
          { year: '2020', timeSaved: 0, congestionReduction: 0 },
          { year: '2021', timeSaved: 3, congestionReduction: 8 },
          { year: '2022', timeSaved: 6, congestionReduction: 15 },
          { year: '2023', timeSaved: 10, congestionReduction: 24 },
          { year: '2024', timeSaved: 14, congestionReduction: 32 },
          { year: '2025', timeSaved: 18, congestionReduction: 40 },
        ],
      },
      {
        category: 'city_rankings',
        year: 2025,
        data: [
          { city: 'Amman', score: 85 },
          { city: 'Irbid', score: 72 },
          { city: 'Aqaba', score: 68 },
          { city: 'Zarqa', score: 64 },
          { city: 'Madaba', score: 58 },
        ],
      },
    ];

    const { error: statsError } = await supabase
      .from('statistics')
      .insert(statistics);

    if (statsError) {
      console.error('Error inserting statistics:', statsError);
      return;
    }

    console.log('Statistics inserted:', statistics.length);
  } else {
    console.log('Statistics already exist, skipping...');
  }

  console.log('Database seeding completed successfully!');
}

seedDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
