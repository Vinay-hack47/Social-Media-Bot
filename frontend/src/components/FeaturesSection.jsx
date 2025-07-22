import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

const features = [
  "Post to Instagram, Twitter, Facebook",
  "Media uploads & scheduling",
  "Easy-to-use dashboard",
  "Analytics & performance",
  "Safe and secure platform",
  "24/7 customer support",
]

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white px-6 text-center">
      <h3 className="text-3xl font-bold text-gray-800 mb-10">Why Choose Botify?</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <Card key={idx}>
            <CardContent className="p-6 flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1" />
              <p className="text-gray-700">{feature}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
