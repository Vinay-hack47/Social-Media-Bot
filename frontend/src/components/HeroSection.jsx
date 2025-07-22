import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-gray-50">
      <div className="max-w-xl space-y-6">
        <h2 className="text-4xl font-bold text-gray-800">
          Automate Your <span className="text-blue-600">Social Media</span>
        </h2>
        <p className="text-gray-600">
          Schedule posts, manage platforms, track performance — all in one dashboard.
        </p>
        <Link to="/register">
          <Button size="lg">Start for Free</Button>
        </Link>
      </div>
      <img
        src="/dashboard-preview.png"
        alt="Dashboard preview"
        className="w-[500px] mt-10 md:mt-0"
      />
    </section>
  )
}

export default HeroSection
