import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const CTASection = () => {
  return (
    <section className="py-16 bg-blue-600 text-white text-center">
      <h4 className="text-2xl font-semibold mb-4">Start Automating Your Socials Today!</h4>
      <Link to="/register">
        <Button className="bg-white text-blue-600 hover:bg-gray-100">Create Free Account</Button>
      </Link>
    </section>
  )
}

export default CTASection
