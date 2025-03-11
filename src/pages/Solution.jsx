import { Leaf, BarChart3, Truck, Zap , ArrowRight, BookOpen, Factory, RefreshCw} from "lucide-react"
import Navbar from "../components/Navbar"
import Footor from "../components/Footor"

const SustainabilityBlogPost = () => {
  return (
    <div className="w-full min-h-screen">
    <Navbar/>
    
    <article className=" my-32 max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <header className="mb-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 mb-4">
          Sustainability Solutions
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl mb-4">
          Sustainability Best Practices to Reduce Scope 3 Emissions
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Methods and strategies for the fertilizer industry to minimize environmental impact and build a more
          sustainable future.
        </p>
      </header>

      {/* Introduction */}
      <div className="prose max-w-none mb-10">
        <p className="text-gray-700">
          Scope 3 emissions, which include all indirect emissions in a company's value chain, often represent the
          largest portion of an organization's carbon footprint. For the fertilizer industry, addressing these emissions
          is crucial for sustainable development and meeting climate goals.
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-12">
        {/* Section 1 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Sustainable Fertilizer Practices</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Switch to Bio-based Fertilizers</h3>
              <p className="text-gray-700 mb-4">
                By transitioning from conventional chemical fertilizers to bio-based alternatives (e.g., compost,
                manure, or bio-fertilizers), the fertilizer industry can significantly cut down on emissions associated
                with production and reduce soil degradation.
              </p>
              <div className="flex items-center text-sm text-green-600 font-medium">
                <span className="bg-green-50 px-2 py-1 rounded">Emission reduction potential: High</span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Precision Agriculture with VRT</h3>
              <p className="text-gray-700 mb-4">
                Implementing Variable Rate Technology allows farmers to apply fertilizers more precisely, reducing
                overuse, waste, and excess emissions. This can help cut down on fertilizer-induced N2O emissions (a
                potent greenhouse gas).
              </p>
              <div className="flex items-center text-sm text-green-600 font-medium">
                <span className="bg-green-50 px-2 py-1 rounded">Emission reduction potential: Medium</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Educational Content on Scope 3 Emissions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Improved Supply Chain Transparency</h3>
              <p className="text-gray-700 mb-4">
                Fertilizer companies can improve their Scope 3 emissions by working closely with their suppliers to
                track and reduce emissions at every step of the supply chain. Collaborative transparency allows for
                better carbon accounting and greater accountability.
              </p>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                <span className="bg-blue-50 px-2 py-1 rounded">Implementation complexity: Medium</span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Supplier Sustainability Certification</h3>
              <p className="text-gray-700 mb-4">
                Encourage suppliers to adopt sustainability certifications (like ISO 14001 or Carbon Trust), ensuring
                that all materials used in fertilizer production are sourced from low-carbon or renewable sources.
              </p>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                <span className="bg-blue-50 px-2 py-1 rounded">Implementation complexity: High</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Truck className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Real-Time Emission Reduction Tips</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Reduce Transportation Emissions</h3>
              <p className="text-gray-700 mb-4">
                Optimize logistics by shifting to electric vehicles (EVs) or hybrid delivery trucks. Reducing the carbon
                footprint of fertilizer distribution through smarter route planning and fuel-efficient vehicles can
                drastically lower Scope 3 emissions.
              </p>
              <div className="flex items-center text-sm text-amber-600 font-medium">
                <span className="bg-amber-50 px-2 py-1 rounded">Time to implement: 6-12 months</span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Adopt Circular Economy Models</h3>
              <p className="text-gray-700 mb-4">
                Use recycled materials and waste-to-resource processes in fertilizer production. By sourcing raw
                materials from waste (e.g., food waste, agricultural residue), the industry can cut down on emissions
                from traditional raw material extraction.
              </p>
              <div className="flex items-center text-sm text-amber-600 font-medium">
                <span className="bg-amber-50 px-2 py-1 rounded">Time to implement: 12-24 months</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Factory className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Interactive Carbon Emission Strategies</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Carbon Capture and Storage (CCS)</h3>
              <p className="text-gray-700 mb-4">
                Fertilizer plants can adopt carbon capture technology to capture CO2 emissions directly from the
                production process. By storing or using this captured CO2 in other industrial processes, the industry
                can significantly reduce emissions.
              </p>
              <div className="flex items-center text-sm text-purple-600 font-medium">
                <span className="bg-purple-50 px-2 py-1 rounded">Investment level: High</span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Incorporate Renewable Energy</h3>
              <p className="text-gray-700 mb-4">
                Transition fertilizer production to renewable energy (such as solar or wind) rather than relying on
                fossil fuels. Renewable energy adoption reduces the Scope 2 emissions and indirectly helps in Scope 3
                emissions reduction.
              </p>
              <div className="flex items-center text-sm text-purple-600 font-medium">
                <span className="bg-purple-50 px-2 py-1 rounded">Investment level: Medium</span>
              </div>
            </div>
          </div>
        </section>
      </div>


{/* Features Section */}
<div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Benefits of Reducing Scope 3 Emissions
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-3">Environmental Impact</h3>
              <p className="text-gray-600">
                Significant reduction in greenhouse gas emissions and environmental footprint
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-3">Operational Efficiency</h3>
              <p className="text-gray-600">
                Improved processes and reduced waste leading to cost savings and better performance
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Factory className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg mb-3">Competitive Advantage</h3>
              <p className="text-gray-600">Meet growing consumer demand for sustainable products and services</p>
            </div>
          </div>
        </div>
      </div>


      {/* Summary */}
      <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Zap className="h-5 w-5 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Key Takeaways</h2>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center rounded-full bg-green-100 h-5 w-5 text-xs text-green-600 mr-2 mt-0.5">
              1
            </span>
            <span>Bio-based fertilizers and precision agriculture can significantly reduce production emissions</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center rounded-full bg-green-100 h-5 w-5 text-xs text-green-600 mr-2 mt-0.5">
              2
            </span>
            <span>
              Supply chain transparency and supplier certification are essential for tracking and reducing Scope 3
              emissions
            </span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center rounded-full bg-green-100 h-5 w-5 text-xs text-green-600 mr-2 mt-0.5">
              3
            </span>
            <span>
              Transportation optimization and circular economy models offer practical ways to reduce emissions
            </span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center rounded-full bg-green-100 h-5 w-5 text-xs text-green-600 mr-2 mt-0.5">
              4
            </span>
            <span>
              Advanced technologies like CCS and renewable energy provide long-term solutions for sustainable production
            </span>
          </li>
        </ul>
      </div>

 
      
    </article>
    <Footor/>
    </div>
  )
}

export default SustainabilityBlogPost

