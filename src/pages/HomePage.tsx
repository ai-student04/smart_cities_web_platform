import { Link } from 'react-router-dom';
import { Building2, Zap, Bus, Wifi, Smartphone, Leaf, ArrowRight, TrendingUp } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AdoptionRatesChart } from '../components/charts/AdoptionRatesChart';
import { CityRankingsChart } from '../components/charts/CityRankingsChart';

const categories = [
  {
    name: 'Urban Planning',
    icon: Building2,
    path: '/urban-planning',
    description: 'Sustainable development and smart zoning',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    name: 'Transportation',
    icon: Bus,
    path: '/transportation',
    description: 'Intelligent traffic and mobility solutions',
    color: 'bg-green-50 text-green-600',
  },
  {
    name: 'Energy',
    icon: Zap,
    path: '/energy',
    description: 'Efficient buildings and renewable energy',
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    name: 'IoT & Connectivity',
    icon: Wifi,
    path: '/iot',
    description: 'Smart sensors and 5G infrastructure',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    name: 'Digital Services',
    icon: Smartphone,
    path: '/digital-services',
    description: 'E-government and citizen applications',
    color: 'bg-red-50 text-red-600',
  },
  {
    name: 'Sustainability',
    icon: Leaf,
    path: '/sustainability',
    description: 'Green projects and environmental monitoring',
    color: 'bg-teal-50 text-teal-600',
  },
];

export function HomePage() {
  const { projects, loading } = useProjects();
  const featuredProjects = projects.filter(p => p.impact_level === 'high').slice(0, 3);

  return (
    <div className="bg-gray-50">
      <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Building Jordan's Smart Cities Future
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 mb-8">
              Discover how innovation and technology are transforming urban life across Jordan through sustainable development and citizen-focused solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/urban-planning"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                Explore Projects
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
              <a
                href="#statistics"
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                View Statistics
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Smart City Initiatives
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive smart city programs across six key sectors
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.path}
                  to={category.path}
                  className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary-500 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center text-primary-600 font-medium">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Key Statistics
            </h2>
            <p className="text-lg text-gray-600">Measuring the impact of smart city initiatives</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200">
              <div className="inline-flex p-3 bg-primary-50 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-primary-600" aria-hidden="true" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">150+</div>
              <div className="text-gray-600">Active Projects</div>
            </div>
            <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200">
              <div className="inline-flex p-3 bg-accent-50 rounded-full mb-4">
                <Building2 className="h-8 w-8 text-accent-600" aria-hidden="true" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">12</div>
              <div className="text-gray-600">Smart Cities</div>
            </div>
            <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200">
              <div className="inline-flex p-3 bg-green-50 rounded-full mb-4">
                <Leaf className="h-8 w-8 text-green-600" aria-hidden="true" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">35%</div>
              <div className="text-gray-600">Energy Reduction</div>
            </div>
          </div>
          <div id="statistics" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AdoptionRatesChart />
            <CityRankingsChart />
          </div>
        </div>
      </section>

      {!loading && featuredProjects.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-gray-600">High-impact initiatives transforming Jordan's cities</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {loading && <LoadingSpinner fullScreen />}
    </div>
  );
}
