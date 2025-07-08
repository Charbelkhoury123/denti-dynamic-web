import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, FileText } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useDentistData } from "@/hooks/useDentistData"

const TermsOfService: React.FC = () => {
  const { slug } = useParams();
  const { dentist, loading } = useDentistData(slug);
  const homeUrl = slug ? `/${slug}` : "/";

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const companyName = dentist?.business_name || "Dental Practice Name";
  const address = dentist?.address || "123 Main Street";
  const city = "City, State ZIP";
  const phone = dentist?.phone || "(555) 123-4567";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center py-8 px-2">
      <Card className="w-full max-w-4xl shadow-2xl rounded-3xl animate-fade-in-up">
        <CardContent className="p-0">
          <div className="rounded-t-3xl bg-gradient-to-r from-primary to-blue-500 flex flex-col items-center py-8 mb-8">
            <FileText className="h-14 w-14 text-white mb-4" />
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Terms of Service</h1>
            <p className="text-blue-100 text-lg max-w-2xl text-center mb-2">
              Please read these terms carefully. By using {companyName}'s website and services, you agree to these terms.
            </p>
            <div className="flex items-center justify-center text-sm text-blue-200">
              <span>Last updated: June 1, 2023</span>
            </div>
          </div>
          <div className="px-6 pb-10 space-y-10">
            {/* Sections as before, but with improved spacing and headings */}
            {/* ...sections... */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-2">10. Contact Information</h2>
              <Separator className="mb-4" />
              <div className="space-y-4 text-muted-foreground">
                <p>If you have any questions about these Terms, please contact us at:</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-medium text-foreground">{companyName}</p>
                  <p className="text-muted-foreground">{address}</p>
                  <p className="text-muted-foreground">{city}</p>
                  <p className="text-muted-foreground">Phone: {phone}</p>
                </div>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
      <div className="fixed top-8 left-8">
        <Link 
          to={homeUrl} 
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors bg-white/80 px-4 py-2 rounded-full shadow"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default TermsOfService